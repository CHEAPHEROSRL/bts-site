const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

// Utility to fetch a block by collection and item ID
async function fetchBlockContent(collection, itemId) {
  const res = await fetch(`${DIRECTUS_URL}/items/${collection}?filter[id][_eq]=${itemId}`);
  const json = await res.json();
  return json?.data?.[0] || null;
}

export async function getStaticProps() {
  // 1. Fetch Home page
  const res = await fetch(`${DIRECTUS_URL}/items/pages?filter[title][_eq]=Home`);
  const json = await res.json();
  const page = json?.data?.[0] || null;

  if (!page) {
    return { props: { page: null, blocks: [] }, revalidate: 60 };
  }

  // 2. Fetch page_blocks linking table
  const blockIds = Array.isArray(page.blocks) ? page.blocks : [];
  let pageBlocks = [];
  if (blockIds.length > 0) {
    const blocksRes = await fetch(
      `${DIRECTUS_URL}/items/page_blocks?filter[id][_in]=${blockIds.join(",")}`
    );
    const blocksJson = await blocksRes.json();
    pageBlocks = blocksJson?.data || [];
  }

  // 3. Fetch full content for each block
  const blocks = [];
  for (const pb of pageBlocks) {
    if (pb.hide_block) continue; // skip hidden blocks
    const blockContent = await fetchBlockContent(pb.collection, pb.item);
    if (blockContent) {
      blocks.push({
        ...blockContent,
        collection: pb.collection, // keep track of block type
        sort: pb.sort,
      });
    }
  }

  // Sort blocks by sort field
  blocks.sort((a, b) => a.sort - b.sort);

  return {
    props: { page, blocks },
    revalidate: 60,
  };
}

export default function Home({ page, blocks }) {
  if (!page) return <p>No page data found.</p>;

  return (
    <main style={{ fontFamily: "Arial, sans-serif", color: "#222", padding: 40 }}>
      <h1>{page.title}</h1>

      {blocks.length === 0 && <p>No blocks found</p>}

      {blocks.map((block) => (
        <div
          key={block.id}
          style={{
            border: "1px solid red",
            marginBottom: 20,
            padding: 20,
          }}
        >
          {/* Dynamic rendering based on available fields */}
          {block.Title && <h2>{block.Title}</h2>}
          {block.Headline && <h3>{block.Headline}</h3>}
          {block.Content && <p>{block.Content}</p>}
          {block.Image && (
            <img
              src={block.Image}
              alt={block.Title || block.Headline || "Block image"}
              style={{
                maxWidth: "100%",
                display: "block",
                marginTop: 10,
                marginBottom: 10,
                objectFit: "cover",
              }}
            />
          )}
          {block.ButtonGroup && Array.isArray(block.ButtonGroup) && (
            <div style={{ marginTop: 10 }}>
              {block.ButtonGroup.map((btn, index) => (
                <a
                  key={index}
                  href={btn.link || "#"}
                  style={{
                    display: "inline-block",
                    marginRight: 10,
                    padding: "8px 16px",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: 4,
                  }}
                >
                  {btn.label || "Button"}
                </a>
              ))}
            </div>
          )}

          {/* DEBUG: show collection name */}
          <small style={{ display: "block", marginTop: 10, color: "#888" }}>
            Block type: {block.collection}
          </small>
        </div>
      ))}
    </main>
  );
}