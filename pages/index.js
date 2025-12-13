export async function getStaticProps() {
  const res = await fetch(
    "https://bts-agencyos-003-u62227.vm.elestio.app/items/pages?filter[title][_eq]=Home"
  );
  const json = await res.json();

  return {
    props: {
      page: json.data[0] || null,
    },
  };
}

export default function Home({ page }) {
  if (!page) return <p>No page data found.</p>;

  return (
    <main style={{ padding: 40 }}>
      <h1>{page.title}</h1>
      <pre>{JSON.stringify(page.blocks, null, 2)}</pre>
    </main>
  );
}
