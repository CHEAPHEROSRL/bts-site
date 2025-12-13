const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export async function getStaticProps() {
  // 1. Fetch Home page
  const res = await fetch(`${DIRECTUS_URL}/items/pages?filter[title][_eq]=Home`);
  const json = await res.json();
  const page = json?.data?.[0] || null;

  if (!page) {
    return { props: { page: null, blocks: [] }, revalidate: 60 };
  }

  // 2. Fetch blocks — FIXED
  const blockIds = Array.isArray(page.blocks) ? page.blocks : [];

  let blocks = [];
if (blockIds.length > 0) {
  const blocksRes = await fetch(
    `${DIRECTUS_URL}/items/page_blocks?filter[id][_in]=${blockIds.join(",")}`
  );
  const blocksJson = await blocksRes.json();
  blocks = blocksJson?.data || [];
}

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
          {block.title && <h2>{block.title}</h2>}
          {block.content && <p>{block.content}</p>}
        </div>
      ))}
    </main>
  );
}
