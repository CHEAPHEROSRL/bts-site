import BlockRenderer from "@/components/BlockRenderer";
import { fetchPageBlocks } from "@/lib/directus";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export async function getStaticPaths() {
  if (!DIRECTUS_URL) {
    return { paths: [], fallback: "blocking" };
  }

  try {
    const res = await fetch(`${DIRECTUS_URL}/items/pages`);
    const json = await res.json();
    const pages = json?.data || [];

    const paths = pages
      .filter(page => page.permalink && page.permalink !== "/")
      .map(page => ({
        params: { slug: page.permalink.replace(/^\//, "").split("/") }
      }));

    return { paths, fallback: "blocking" };
  } catch (e) {
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  if (!DIRECTUS_URL) {
    return { props: { page: null, blocks: [], missingConfig: true }, revalidate: 60 };
  }

  const slug = params?.slug?.join("/") || "";
  const permalink = `/${slug}`;

  try {
    const res = await fetch(`${DIRECTUS_URL}/items/pages?filter[permalink][_eq]=${encodeURIComponent(permalink)}`);
    const json = await res.json();
    const page = json?.data?.[0] || null;

    if (!page) {
      return { notFound: true };
    }

    const blocks = await fetchPageBlocks(page);
    return { props: { page, blocks }, revalidate: 60 };
  } catch (error) {
    console.error("Error fetching page data:", error);
    return { props: { page: null, blocks: [], error: true }, revalidate: 60 };
  }
}

export default function DynamicPage({ page, blocks, missingConfig, error }) {
  /* System/error states below use hardcoded messages - these are intentional
     as they represent application-level errors, not CMS content */
  if (missingConfig) {
    return (
      <main style={{ fontFamily: "Inter, Arial, sans-serif", color: "#fff", padding: 60, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: 40, borderRadius: 10, maxWidth: 500, textAlign: "center" }}>
          <h1 style={{ fontSize: 32, marginBottom: 20 }}>Setup Required</h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 15 }}>This site needs a Directus CMS connection to work.</p>
          <div style={{ background: "rgba(255, 255, 255, 0.15)", padding: 15, borderRadius: 6, marginBottom: 20, fontFamily: "monospace", fontSize: 14 }}>
            <code>NEXT_PUBLIC_DIRECTUS_URL</code>
          </div>
        </div>
      </main>
    );
  }

  if (error) return <p style={{ padding: 40 }}>Error loading page data.</p>;
  if (!page) return <p style={{ padding: 40 }}>No page data found.</p>;

  return (
    <main style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: "#333", maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <BlockRenderer blocks={blocks} />
    </main>
  );
}
