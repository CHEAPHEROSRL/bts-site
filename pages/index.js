const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export async function getStaticProps() {
  // 1. Fetch Home page
  const res = await fetch(`${DIRECTUS_URL}/items/pages?filter[title][_eq]=Home`);
  const json = await res.json();
  const page = json?.data?.[0] || null;

  if (!page) {
    return { props: { page: null, blocks: [] }, revalidate: 60 };
  }

  // 2. Fetch blocks from the correct collection
  const blockIds = Array.isArray(page.blocks) ? page.blocks : [];

  let blocks = [];
  if (blockIds.length > 0) {
    const blocksRes = await fetch(
      `${DIRECTUS_URL}/items/page_blocks?filter[id][_in]=${blockIds.join(",")}`
    );
    const blocksJson = await blocksRes.json();
    blocks = blocksJson?.data || [];
  }

  // DEBUG: log blocks to see exact field names
  console.log("Fetched blocks:", blocks);

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
          {/* DEBUG: show full block data */}
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>
            {JSON.stringify(block, null, 2)}
          </pre>

          {/* Title */}
          {block.Title && <h2>{block.Title}</h2>}

          {/* Headline */}
          {block.Headline && <h3>{block.Headline}</h3>}

          {/* Content */}
          {block.Content && <p>{block.Content}</p>}

          {/* Image */}
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

          {/* Button Group */}
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
        </div>
      ))}
    </main>
  );
}