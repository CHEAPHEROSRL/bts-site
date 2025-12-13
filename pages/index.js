export async function getStaticProps() {
  // Fetch the Home page
  const res = await fetch(
    "https://bts-agencyos-003-u62227.vm.elestio.app/items/pages?filter[title][_eq]=Home"
  );
  const json = await res.json();
  const page = json.data[0];

  if (!page) {
    return { props: { page: null, blocks: [] } };
  }

  // Fetch full block data
  const blockIds = page.blocks || [];
  let blocks = [];

  if (blockIds.length > 0) {
    const blocksRes = await fetch(
      `https://bts-agencyos-003-u62227.vm.elestio.app/items/blocks?filter[id][_in]=${blockIds.join(",")}`
    );
    const blocksJson = await blocksRes.json();
    blocks = blocksJson.data || [];
  }

  return { props: { page, blocks } };
}

export default function Home({ page, blocks }) {
  if (!page) return <p>No page data found.</p>;

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 36, marginBottom: 20 }}>{page.title}</h1>

      {blocks.map((block) => (
        <section
          key={block.id}
          style={{
            marginBottom: 30,
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 8,
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          {block.title && <h2 style={{ fontSize: 24 }}>{block.title}</h2>}
          {block.content && <p style={{ fontSize: 16 }}>{block.content}</p>}
          {block.image && (
            <img
              src={block.image}
              alt={block.title || "Block image"}
              style={{ maxWidth: "100%", marginTop: 10, borderRadius: 6 }}
            />
          )}
        </section>
      ))}
    </main>
  );
}
