const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

// Utility to fetch a block by collection and item ID
async function fetchBlockContent(collection, itemId) {
  const res = await fetch(`${DIRECTUS_URL}/items/${collection}/${itemId}`);
  const json = await res.json();
  return json?.data || null;
}

export async function getStaticProps() {
  // If DIRECTUS_URL is not set, return empty data
  if (!DIRECTUS_URL) {
    return { props: { page: null, blocks: [], missingConfig: true }, revalidate: 60 };
  }

  try {
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
      const blocksRes = await fetch(`${DIRECTUS_URL}/items/page_blocks`);
      const blocksJson = await blocksRes.json();
      // Filter to only include blocks that belong to this page
      pageBlocks = (blocksJson?.data || []).filter(pb => blockIds.includes(pb.id));
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
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { page: null, blocks: [], error: true }, revalidate: 60 };
  }
}

// Helper to get image URL
function getImageUrl(imageId) {
  if (!imageId) return null;
  return `${DIRECTUS_URL}/assets/${imageId}`;
}

export default function Home({ page, blocks, missingConfig, error }) {
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

  if (error) return <p>Error loading page data.</p>;
  if (!page) return <p>No page data found.</p>;

  return (
    <main style={{ fontFamily: "Arial, sans-serif", color: "#222", padding: 40, maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontSize: 48, marginBottom: 40 }}>{page.title}</h1>

      {blocks.length === 0 && <p>No blocks found</p>}

      {blocks.map((block) => (
        <section
          key={block.id}
          style={{
            marginBottom: 60,
            padding: 30,
            backgroundColor: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          {/* Block Hero */}
          {block.collection === "block_hero" && (
            <div style={{ textAlign: "center" }}>
              {block.title && <h2 style={{ fontSize: 36, marginBottom: 15 }}>{block.title}</h2>}
              {block.headline && <div dangerouslySetInnerHTML={{ __html: block.headline }} style={{ fontSize: 18, color: "#666", marginBottom: 20 }} />}
              {block.content && <p style={{ fontSize: 16, color: "#888" }}>{block.content}</p>}
              {block.image && (
                <img
                  src={getImageUrl(block.image)}
                  alt={block.title || "Hero Image"}
                  style={{ maxWidth: "100%", marginTop: 20, borderRadius: 8 }}
                />
              )}
              {block.button_group && Array.isArray(block.button_group) && (
                <div style={{ marginTop: 20 }}>
                  {block.button_group.map((btn, i) => (
                    <a
                      key={i}
                      href={btn.url || btn.link || "#"}
                      style={{
                        display: "inline-block",
                        marginRight: 10,
                        padding: "12px 24px",
                        backgroundColor: "#0070f3",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: 6,
                        fontWeight: "bold",
                      }}
                    >
                      {btn.label || btn.text || "Button"}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Block Richtext */}
          {block.collection === "block_richtext" && (
            <div>
              {block.title && <h2 style={{ fontSize: 32, marginBottom: 10 }}>{block.title}</h2>}
              {block.headline && <h3 style={{ fontSize: 20, color: "#666", marginBottom: 20 }}>{block.headline}</h3>}
              {block.content && (
                <div 
                  dangerouslySetInnerHTML={{ __html: block.content }} 
                  style={{ lineHeight: 1.8, fontSize: 16 }}
                />
              )}
            </div>
          )}

          {/* Block Quote */}
          {block.collection === "block_quote" && (
            <blockquote style={{ 
              borderLeft: "4px solid #0070f3", 
              paddingLeft: 20, 
              margin: 0,
              fontStyle: "italic"
            }}>
              {block.content && <div dangerouslySetInnerHTML={{ __html: block.content }} style={{ fontSize: 20, marginBottom: 15 }} />}
              <footer style={{ color: "#666" }}>
                {block.title && <strong>{block.title}</strong>}
                {block.subtitle && <span> — {block.subtitle}</span>}
              </footer>
            </blockquote>
          )}

          {/* Block FAQs */}
          {block.collection === "block_faqs" && (
            <div>
              {block.title && <h2 style={{ fontSize: 32, marginBottom: 20 }}>{block.title}</h2>}
              {block.faqs && Array.isArray(block.faqs) && block.faqs.map((faq, i) => (
                <div key={i} style={{ marginBottom: 20, padding: 15, backgroundColor: "#f9f9f9", borderRadius: 8 }}>
                  <strong style={{ fontSize: 18 }}>{faq.question}</strong>
                  <p style={{ marginTop: 10, color: "#666" }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          )}

          {/* Block Video */}
          {block.collection === "block_video" && (
            <div style={{ textAlign: "center" }}>
              {block.title && <h2 style={{ fontSize: 32, marginBottom: 20 }}>{block.title}</h2>}
              {block.headline && <p style={{ color: "#666", marginBottom: 20 }}>{block.headline}</p>}
              {(block.video_url || block.url) && (
                <video controls style={{ maxWidth: "100%", borderRadius: 8 }}>
                  <source src={block.video_url || block.url} type="video/mp4" />
                </video>
              )}
            </div>
          )}

          {/* Block Steps */}
          {block.collection === "block_steps" && (
            <div>
              {block.title && <h2 style={{ fontSize: 32, marginBottom: 20 }}>{block.title}</h2>}
              {block.steps && Array.isArray(block.steps) && (
                <ol style={{ paddingLeft: 20 }}>
                  {block.steps.map((s, i) => (
                    <li key={i} style={{ marginBottom: 15, fontSize: 16 }}>
                      {s.title && <strong>{s.title}: </strong>}
                      {s.content || s.description || s.text}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}

          {/* Block Gallery */}
          {block.collection === "block_gallery" && (
            <div>
              {block.title && <h2 style={{ fontSize: 32, marginBottom: 20 }}>{block.title}</h2>}
              {block.images && Array.isArray(block.images) && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 15 }}>
                  {block.images.map((img, i) => (
                    <img 
                      key={i} 
                      src={typeof img === "string" ? getImageUrl(img) : getImageUrl(img?.directus_files_id)} 
                      alt={`Gallery image ${i + 1}`} 
                      style={{ width: "100%", borderRadius: 8 }} 
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Block Logocloud */}
          {block.collection === "block_logocloud" && (
            <div>
              {block.title && <h2 style={{ fontSize: 32, marginBottom: 20, textAlign: "center" }}>{block.title}</h2>}
              {block.logos && Array.isArray(block.logos) && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 30, justifyContent: "center", alignItems: "center" }}>
                  {block.logos.map((logo, i) => (
                    <img 
                      key={i} 
                      src={typeof logo === "string" ? getImageUrl(logo) : getImageUrl(logo?.directus_files_id || logo?.image)} 
                      alt={logo?.name || `Logo ${i + 1}`} 
                      style={{ maxWidth: 120, maxHeight: 60, objectFit: "contain" }} 
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Block Form */}
          {block.collection === "block_form" && (
            <div>
              {block.title && <h2 style={{ fontSize: 32, marginBottom: 20 }}>{block.title}</h2>}
              {block.headline && <p style={{ color: "#666", marginBottom: 20 }}>{block.headline}</p>}
              <form style={{ maxWidth: 500 }}>
                {block.fields && Array.isArray(block.fields) && block.fields.map((f, i) => (
                  <div key={i} style={{ marginBottom: 15 }}>
                    <label style={{ display: "block", marginBottom: 5, fontWeight: "bold" }}>{f.label || f.name}</label>
                    <input 
                      type={f.type || "text"} 
                      name={f.name} 
                      placeholder={f.placeholder}
                      style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, fontSize: 16 }}
                    />
                  </div>
                ))}
                <button 
                  type="submit"
                  style={{ 
                    padding: "12px 24px", 
                    backgroundColor: "#0070f3", 
                    color: "#fff", 
                    border: "none", 
                    borderRadius: 6,
                    fontSize: 16,
                    cursor: "pointer"
                  }}
                >
                  {block.submit_label || "Submit"}
                </button>
              </form>
            </div>
          )}

          {/* Block Team */}
          {block.collection === "block_team" && (
            <div>
              {block.title && <h2 style={{ fontSize: 32, marginBottom: 20, textAlign: "center" }}>{block.title}</h2>}
              {block.team_members && Array.isArray(block.team_members) && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 30 }}>
                  {block.team_members.map((m, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      {m.image && <img src={getImageUrl(m.image)} alt={m.name} style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginBottom: 10 }} />}
                      {m.name && <h4 style={{ marginBottom: 5 }}>{m.name}</h4>}
                      {(m.role || m.title) && <p style={{ color: "#666", fontSize: 14 }}>{m.role || m.title}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Block Testimonials */}
          {block.collection === "block_testimonials" && (
            <div>
              {block.title && <h2 style={{ fontSize: 32, marginBottom: 20, textAlign: "center" }}>{block.title}</h2>}
              {block.testimonials && Array.isArray(block.testimonials) && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                  {block.testimonials.map((t, i) => (
                    <div key={i} style={{ padding: 20, backgroundColor: "#f9f9f9", borderRadius: 8 }}>
                      {(t.content || t.quote || t.text) && <p style={{ fontStyle: "italic", marginBottom: 15 }}>"{t.content || t.quote || t.text}"</p>}
                      {(t.name || t.author) && <strong>— {t.name || t.author}</strong>}
                      {(t.title || t.role) && <span style={{ color: "#666" }}>, {t.title || t.role}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Block Columns */}
          {block.collection === "block_columns" && (
            <div>
              {block.title && <h2 style={{ fontSize: 32, marginBottom: 20 }}>{block.title}</h2>}
              {block.rows && Array.isArray(block.rows) && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 30 }}>
                  {block.rows.map((col, i) => (
                    <div key={i}>
                      {col.title && <h4 style={{ marginBottom: 10 }}>{col.title}</h4>}
                      {col.content && <div dangerouslySetInnerHTML={{ __html: col.content }} />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Block CTA */}
          {block.collection === "block_cta" && (
            <div style={{ textAlign: "center", padding: 40, backgroundColor: "#f0f4ff", borderRadius: 12 }}>
              {block.title && <h2 style={{ fontSize: 36, marginBottom: 15 }}>{block.title}</h2>}
              {block.headline && <h3 style={{ fontSize: 24, color: "#666", marginBottom: 15 }}>{block.headline}</h3>}
              {block.content && <div dangerouslySetInnerHTML={{ __html: block.content }} style={{ marginBottom: 20 }} />}
              {block.button_group && Array.isArray(block.button_group) && (
                <div>
                  {block.button_group.map((btn, i) => (
                    <a
                      key={i}
                      href={btn.url || btn.link || "#"}
                      style={{
                        display: "inline-block",
                        marginRight: 10,
                        padding: "14px 28px",
                        backgroundColor: "#0070f3",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: 6,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {btn.label || btn.text || "Button"}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
