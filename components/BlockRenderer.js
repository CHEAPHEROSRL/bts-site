const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

function getImageUrl(imageId) {
  if (!imageId) return null;
  return `${DIRECTUS_URL}/assets/${imageId}`;
}

function RenderHTML({ html, style = {} }) {
  if (!html) return null;
  return <div dangerouslySetInnerHTML={{ __html: html }} style={style} />;
}

export default function BlockRenderer({ blocks }) {
  const sectionStyle = { marginBottom: 80, padding: "40px 20px" };
  const titleStyle = { fontSize: 36, fontWeight: 700, marginBottom: 10, color: "#1a1a2e" };
  const headlineStyle = { fontSize: 18, color: "#666", marginBottom: 30, lineHeight: 1.6 };

  return (
    <>
      {blocks.map((block) => (
        <section key={block.id} style={sectionStyle}>
          
          {/* HERO BLOCK */}
          {block.collection === "block_hero" && (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              {block.title && <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 20, color: "#1a1a2e" }}>{block.title}</h1>}
              <RenderHTML html={block.headline} style={{ fontSize: 20, color: "#666", marginBottom: 20, maxWidth: 700, margin: "0 auto 20px" }} />
              {block.content && <p style={{ fontSize: 16, color: "#888", marginBottom: 30 }}>{block.content}</p>}
              {block.image && (
                <img src={getImageUrl(block.image)} alt={block.title || "Hero"} style={{ maxWidth: "100%", borderRadius: 12, marginTop: 30, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }} />
              )}
            </div>
          )}

          {/* RICHTEXT BLOCK */}
          {block.collection === "block_richtext" && (
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              {block.title && <h2 style={titleStyle}>{block.title}</h2>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              <RenderHTML html={block.content} style={{ fontSize: 17, lineHeight: 1.8, color: "#444" }} />
            </div>
          )}

          {/* QUOTE BLOCK */}
          {block.collection === "block_quote" && (
            <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px", background: "#f8f9fa", borderRadius: 12, borderLeft: "4px solid #667eea" }}>
              <RenderHTML html={block.content} style={{ fontSize: 22, fontStyle: "italic", lineHeight: 1.6, color: "#333", marginBottom: 20 }} />
              <div style={{ fontSize: 16, color: "#666" }}>
                <strong>{block.title}</strong>
                {block.subtitle && <span> — {block.subtitle}</span>}
              </div>
            </div>
          )}

          {/* FAQ BLOCK */}
          {block.collection === "block_faqs" && (
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              {block.title && <h2 style={{ ...titleStyle, textAlign: block.alignment || "left" }}>{block.title}</h2>}
              <RenderHTML html={block.headline} style={{ ...headlineStyle, textAlign: block.alignment || "left" }} />
              {block.faqs?.map((faq, i) => (
                <div key={i} style={{ marginBottom: 25, padding: 25, background: "#fff", borderRadius: 10, border: "1px solid #eee" }}>
                  <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: "#1a1a2e" }}>{faq.title}</h4>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "#666", margin: 0 }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          )}

          {/* VIDEO BLOCK */}
          {block.collection === "block_video" && (
            <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
              {block.title && <h2 style={titleStyle}>{block.title}</h2>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              {block.video_url && (
                block.video_url.includes("loom.com") ? (
                  <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 12, overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}>
                    <iframe src={block.video_url.replace("/share/", "/embed/")} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }} allowFullScreen />
                  </div>
                ) : (
                  <video controls style={{ width: "100%", borderRadius: 12 }}>
                    <source src={block.video_url} type="video/mp4" />
                  </video>
                )
              )}
            </div>
          )}

          {/* STEPS BLOCK */}
          {block.collection === "block_steps" && (
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              {block.title && <h2 style={titleStyle}>{block.title}</h2>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              {block.steps_data?.length > 0 ? (
                block.steps_data.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 20, marginBottom: 30, alignItems: "flex-start" }}>
                    {block.show_step_numbers && <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#667eea", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>}
                    <div>
                      {step.title && <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{step.title}</h4>}
                      <RenderHTML html={step.content} style={{ color: "#666", lineHeight: 1.6 }} />
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#999", fontStyle: "italic" }}>Process steps coming soon...</p>
              )}
            </div>
          )}

          {/* GALLERY BLOCK */}
          {block.collection === "block_gallery" && (
            <div>
              {block.title && <h2 style={titleStyle}>{block.title}</h2>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 15 }}>
                {block.gallery_items_data?.map((item, i) => (
                  <img key={i} src={getImageUrl(item.directus_files_id)} alt={`Gallery ${i + 1}`} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 10 }} />
                ))}
              </div>
            </div>
          )}

          {/* LOGOCLOUD BLOCK */}
          {block.collection === "block_logocloud" && (
            <div style={{ textAlign: "center" }}>
              {block.title && <h2 style={titleStyle}>{block.title}</h2>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "center", alignItems: "center", padding: "20px 0" }}>
                {block.logos_data?.map((logo, i) => (
                  <img key={i} src={getImageUrl(logo.directus_files_id)} alt={`Logo ${i + 1}`} style={{ maxWidth: 100, maxHeight: 50, objectFit: "contain", opacity: 0.7 }} />
                ))}
              </div>
            </div>
          )}

          {/* FORM BLOCK */}
          {block.collection === "block_form" && (
            <div style={{ maxWidth: 600, margin: "0 auto", padding: 40, background: "#f8f9fa", borderRadius: 12 }}>
              {block.title && <h2 style={titleStyle}>{block.title}</h2>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              <form style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <input type="text" placeholder="Your Name" style={{ padding: 15, border: "1px solid #ddd", borderRadius: 8, fontSize: 16 }} />
                <input type="email" placeholder="Your Email" style={{ padding: 15, border: "1px solid #ddd", borderRadius: 8, fontSize: 16 }} />
                <textarea placeholder="Your Message" rows={4} style={{ padding: 15, border: "1px solid #ddd", borderRadius: 8, fontSize: 16, resize: "vertical" }} />
                <button type="submit" style={{ padding: 15, background: "#667eea", color: "#fff", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Send Message</button>
              </form>
            </div>
          )}

          {/* TEAM BLOCK */}
          {block.collection === "block_team" && (
            <div style={{ textAlign: "center" }}>
              {block.title && <h2 style={titleStyle}>{block.title}</h2>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              <RenderHTML html={block.content} style={{ maxWidth: 700, margin: "0 auto", color: "#666", lineHeight: 1.7 }} />
            </div>
          )}

          {/* TESTIMONIALS BLOCK */}
          {block.collection === "block_testimonials" && (
            <div style={{ textAlign: "center" }}>
              {block.title && <h2 style={titleStyle}>{block.title}</h2>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              {block.testimonials_data?.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 25 }}>
                  {block.testimonials_data.map((t, i) => (
                    <div key={i} style={{ padding: 30, background: "#fff", borderRadius: 12, border: "1px solid #eee", textAlign: "left" }}>
                      <RenderHTML html={t.content || t.quote} style={{ fontStyle: "italic", marginBottom: 15, lineHeight: 1.6 }} />
                      <div><strong>{t.name}</strong>{t.title && <span style={{ color: "#666" }}> — {t.title}</span>}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#999", fontStyle: "italic" }}>Testimonials coming soon...</p>
              )}
            </div>
          )}

          {/* COLUMNS BLOCK */}
          {block.collection === "block_columns" && (
            <div>
              {block.title && <h2 style={{ ...titleStyle, textAlign: "center" }}>{block.title}</h2>}
              <RenderHTML html={block.headline} style={{ ...headlineStyle, textAlign: "center" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
                {block.rows_data?.map((row, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: row.image_position === "right" ? "column" : "column", gap: 20 }}>
                    {row.image && <img src={getImageUrl(row.image)} alt={row.title} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 12 }} />}
                    <div>
                      {row.title && <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8, color: "#1a1a2e" }}>{row.title}</h3>}
                      {row.headline && <p style={{ color: "#667eea", fontWeight: 500, marginBottom: 10 }}>{row.headline}</p>}
                      <RenderHTML html={row.content} style={{ color: "#666", lineHeight: 1.7 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA BLOCK */}
          {block.collection === "block_cta" && (
            <div style={{ textAlign: "center", padding: "80px 40px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: 20, color: "#fff" }}>
              {block.title && <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 15 }}>{block.title}</h2>}
              <RenderHTML html={block.headline} style={{ fontSize: 20, marginBottom: 20, opacity: 0.9 }} />
              <RenderHTML html={block.content} style={{ maxWidth: 600, margin: "0 auto 30px", opacity: 0.85, lineHeight: 1.7 }} />
              <a href="/contact-us" style={{ display: "inline-block", padding: "16px 40px", background: "#fff", color: "#667eea", borderRadius: 8, fontWeight: 700, fontSize: 18, textDecoration: "none" }}>Get Started</a>
            </div>
          )}

        </section>
      ))}
    </>
  );
}
