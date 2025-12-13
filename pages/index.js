const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

// Utility to fetch a block by collection and item ID
async function fetchBlockContent(collection, itemId) {
  const res = await fetch(`${DIRECTUS_URL}/items/${collection}?filter[id][_eq]=${itemId}`);
  const json = await res.json();
  return json?.data?.[0] || null;
}

export async function getStaticProps() {
  // If DIRECTUS_URL is not set, return empty data
  if (!DIRECTUS_URL) {
    return { props: { page: null, blocks: [], missingConfig: true }, revalidate: 60 };
  }

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
        collection: pb.collection,
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

export default function Home({ page, blocks, missingConfig }) {
  if (missingConfig) {
    return (
      <main style={{ 
        fontFamily: "Arial, sans-serif", 
        color: "#fff", 
        padding: 60,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ 
          background: "rgba(0, 0, 0, 0.3)", 
          padding: 40, 
          borderRadius: 10,
          maxWidth: 500,
          textAlign: "center"
        }}>
          <h1 style={{ fontSize: 32, marginBottom: 20 }}>⚙️ Setup Required</h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 15 }}>
            This site needs a Directus CMS connection to work.
          </p>
          <div style={{ 
            background: "rgba(255, 255, 255, 0.15)", 
            padding: 15, 
            borderRadius: 6,
            marginBottom: 20,
            fontFamily: "monospace",
            fontSize: 14
          }}>
            <code>NEXT_PUBLIC_DIRECTUS_URL</code>
          </div>
          <p style={{ fontSize: 14, opacity: 0.9 }}>
            Set this environment variable to your Directus instance URL.
          </p>
        </div>
      </main>
    );
  }

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
          {/* Render block based on type */}
          {block.collection === "block_hero" && (
            <>
              {block.Title && <h2>{block.Title}</h2>}
              {block.Headline && <h3>{block.Headline}</h3>}
              {block.Image && (
                <img
                  src={block.Image}
                  alt={block.Title || block.Headline || "Hero Image"}
                  style={{ maxWidth: "100%", marginTop: 10, marginBottom: 10 }}
                />
              )}
              {block.ButtonGroup && Array.isArray(block.ButtonGroup) && (
                <div style={{ marginTop: 10 }}>
                  {block.ButtonGroup.map((btn, i) => (
                    <a
                      key={i}
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
            </>
          )}

          {block.collection === "block_richtext" && block.Content && (
            <div dangerouslySetInnerHTML={{ __html: block.Content }} />
          )}

          {block.collection === "block_quote" && (
            <>
              {block.Quote && <blockquote>{block.Quote}</blockquote>}
              {block.Author && <cite>{block.Author}</cite>}
            </>
          )}

          {block.collection === "block_faqs" && block.Questions && Array.isArray(block.Questions) && (
            <div>
              {block.Questions.map((q, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <strong>{q.Question}</strong>
                  <p>{q.Answer}</p>
                </div>
              ))}
            </div>
          )}

          {block.collection === "block_video" && block.VideoUrl && (
            <video controls style={{ maxWidth: "100%" }}>
              <source src={block.VideoUrl} type="video/mp4" />
            </video>
          )}

          {block.collection === "block_steps" && block.Steps && Array.isArray(block.Steps) && (
            <ol>
              {block.Steps.map((s, i) => (
                <li key={i}>{s.StepText}</li>
              ))}
            </ol>
          )}

          {block.collection === "block_gallery" && block.Images && Array.isArray(block.Images) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {block.Images.map((img, i) => (
                <img key={i} src={img} alt={img.alt || "Gallery Image"} style={{ maxWidth: "200px" }} />
              ))}
            </div>
          )}

          {block.collection === "block_logocloud" && block.Logos && Array.isArray(block.Logos) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {block.Logos.map((logo, i) => (
                <img key={i} src={logo.Image} alt={logo.Name || "Logo"} style={{ maxWidth: "100px" }} />
              ))}
            </div>
          )}

          {block.collection === "block_form" && block.FormFields && Array.isArray(block.FormFields) && (
            <form>
              {block.FormFields.map((f, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <label>{f.Label}</label>
                  <input type={f.Type || "text"} name={f.Name} />
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          )}

          {block.collection === "block_team" && block.Members && Array.isArray(block.Members) && (
            <div>
              {block.Members.map((m, i) => (
                <div key={i}>
                  {m.Name && <h4>{m.Name}</h4>}
                  {m.Role && <p>{m.Role}</p>}
                </div>
              ))}
            </div>
          )}

          {block.collection === "block_testimonials" &&
            block.Testimonials &&
            Array.isArray(block.Testimonials) && (
              <div>
                {block.Testimonials.map((t, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    {t.Text && <p>"{t.Text}"</p>}
                    {t.Author && <strong>- {t.Author}</strong>}
                  </div>
                ))}
              </div>
            )}

          {block.collection === "block_columns" && block.Columns && Array.isArray(block.Columns) && (
            <div style={{ display: "flex", gap: 10 }}>
              {block.Columns.map((col, i) => (
                <div key={i} style={{ flex: 1 }}>
                  {col.Title && <h4>{col.Title}</h4>}
                  {col.Content && <p>{col.Content}</p>}
                </div>
              ))}
            </div>
          )}

          {block.collection === "block_cta" && (
            <>
              {block.Headline && <h3>{block.Headline}</h3>}
              {block.Content && <p>{block.Content}</p>}
              {block.ButtonGroup && Array.isArray(block.ButtonGroup) && (
                <div>
                  {block.ButtonGroup.map((btn, i) => (
                    <a
                      key={i}
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
            </>
          )}

          {/* Optional: show collection for debugging */}
          <small style={{ display: "block", marginTop: 10, color: "#888" }}>
            Block type: {block.collection}
          </small>
        </div>
      ))}
    </main>
  );
}