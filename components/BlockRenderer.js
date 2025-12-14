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
  const sectionStyle = { 
    marginBottom: 64, 
    padding: "48px 0" 
  };
  
  const titleStyle = { 
    fontSize: 14, 
    fontWeight: 600, 
    marginBottom: 8, 
    color: "var(--primary-500)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    fontFamily: "var(--font-sans)",
  };
  
  const headlineStyle = { 
    fontSize: 32, 
    fontWeight: 700, 
    color: "var(--foreground)", 
    marginBottom: 16, 
    lineHeight: 1.2,
    fontFamily: "var(--font-display)",
  };

  const proseStyle = {
    fontSize: 16,
    lineHeight: 1.7,
    color: "var(--text-muted)",
    fontFamily: "var(--font-sans)",
  };

  return (
    <>
      {blocks.map((block) => (
        <section key={block.id} style={sectionStyle}>
          
          {/* HERO BLOCK */}
          {block.collection === "block_hero" && (
            <>
              <div className="hero-block" style={{ 
                display: "grid",
                gap: 48,
                alignItems: "center",
              }}>
                <div className="hero-content" style={{ 
                  order: block.image_position === "left" ? 2 : 1,
                  paddingTop: 48,
                }}>
                  {block.title && (
                    <p style={titleStyle}>{block.title}</p>
                  )}
                  <RenderHTML 
                    html={block.headline} 
                    style={{ 
                      fontSize: 48, 
                      fontWeight: 700, 
                      color: "var(--foreground)", 
                      marginBottom: 24,
                      lineHeight: 1.1,
                      fontFamily: "var(--font-display)",
                    }} 
                  />
                  <RenderHTML 
                    html={block.content} 
                    style={{ 
                      fontSize: 18, 
                      color: "var(--text-muted)", 
                      lineHeight: 1.6,
                      fontFamily: "var(--font-display)",
                      marginBottom: 24,
                    }} 
                  />
                </div>
                {block.image && (
                  <div className="hero-image" style={{ 
                    overflow: "hidden", 
                    borderRadius: "var(--radius-card)",
                    border: "1px solid var(--card-border)",
                    order: block.image_position === "left" ? 1 : 2,
                  }}>
                    <img 
                      src={getImageUrl(block.image)} 
                      alt={block.title || "Hero"} 
                      style={{ 
                        width: "100%", 
                        height: "100%",
                        maxHeight: 700,
                        objectFit: "cover",
                      }} 
                    />
                  </div>
                )}
              </div>
              <style jsx>{`
                .hero-block {
                  grid-template-columns: 1fr;
                }
                @media (min-width: 768px) {
                  .hero-block {
                    grid-template-columns: 2fr 1fr;
                  }
                  .hero-image {
                    margin-right: -64px;
                  }
                }
              `}</style>
            </>
          )}

          {/* RICHTEXT BLOCK */}
          {block.collection === "block_richtext" && (
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              {block.title && <p style={titleStyle}>{block.title}</p>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              <RenderHTML html={block.content} style={proseStyle} />
            </div>
          )}

          {/* QUOTE BLOCK */}
          {block.collection === "block_quote" && (
            <div style={{ 
              maxWidth: 800, 
              margin: "0 auto", 
              padding: 32, 
              background: "var(--section-bg)", 
              borderRadius: "var(--radius-card)", 
              borderLeft: "4px solid var(--primary-500)" 
            }}>
              <RenderHTML 
                html={block.content} 
                style={{ 
                  fontSize: 20, 
                  fontStyle: "italic", 
                  lineHeight: 1.6, 
                  color: "var(--foreground)", 
                  marginBottom: 16,
                  fontFamily: "var(--font-display)",
                }} 
              />
              <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
                <strong>{block.title}</strong>
                {block.subtitle && <span> — {block.subtitle}</span>}
              </div>
            </div>
          )}

          {/* FAQ BLOCK */}
          {block.collection === "block_faqs" && (
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              {block.title && <p style={{ ...titleStyle, textAlign: block.alignment || "left" }}>{block.title}</p>}
              <RenderHTML html={block.headline} style={{ ...headlineStyle, textAlign: block.alignment || "left" }} />
              {block.faqs?.map((faq, i) => (
                <div key={i} style={{ 
                  marginBottom: 16, 
                  padding: 24, 
                  background: "var(--card-bg)", 
                  borderRadius: "var(--radius-card)", 
                  border: "1px solid var(--card-border)",
                  transition: "border-color 0.2s",
                }}>
                  <h4 style={{ 
                    fontSize: 16, 
                    fontWeight: 600, 
                    marginBottom: 8, 
                    color: "var(--foreground)",
                    fontFamily: "var(--font-display)",
                  }}>
                    {faq.title}
                  </h4>
                  <p style={{ 
                    fontSize: 14, 
                    lineHeight: 1.7, 
                    color: "var(--text-muted)", 
                    margin: 0 
                  }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* VIDEO BLOCK */}
          {block.collection === "block_video" && (
            <div style={{ textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
              {block.title && <p style={titleStyle}>{block.title}</p>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              {block.video_url && (
                block.video_url.includes("loom.com") ? (
                  <div style={{ 
                    position: "relative", 
                    paddingBottom: "56.25%", 
                    height: 0, 
                    borderRadius: "var(--radius-card)", 
                    overflow: "hidden",
                    border: "1px solid var(--card-border)",
                  }}>
                    <iframe 
                      src={block.video_url.replace("/share/", "/embed/")} 
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }} 
                      allowFullScreen 
                    />
                  </div>
                ) : (
                  <video controls style={{ width: "100%", borderRadius: "var(--radius-card)" }}>
                    <source src={block.video_url} type="video/mp4" />
                  </video>
                )
              )}
            </div>
          )}

          {/* STEPS BLOCK */}
          {block.collection === "block_steps" && (
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              {block.title && <p style={titleStyle}>{block.title}</p>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              {block.steps_data?.length > 0 ? (
                block.steps_data.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 20, marginBottom: 24, alignItems: "flex-start" }}>
                    {block.show_step_numbers && (
                      <div style={{ 
                        width: 36, 
                        height: 36, 
                        borderRadius: "var(--radius-button)", 
                        background: "var(--primary-500)", 
                        color: "#fff", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        fontWeight: 600, 
                        flexShrink: 0,
                        fontSize: 14,
                      }}>
                        {i + 1}
                      </div>
                    )}
                    <div>
                      {step.title && (
                        <h4 style={{ 
                          fontSize: 16, 
                          fontWeight: 600, 
                          marginBottom: 6, 
                          color: "var(--foreground)",
                          fontFamily: "var(--font-display)",
                        }}>
                          {step.title}
                        </h4>
                      )}
                      <RenderHTML html={step.content} style={{ color: "var(--text-muted)", lineHeight: 1.6, fontSize: 14 }} />
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>Process steps coming soon...</p>
              )}
            </div>
          )}

          {/* GALLERY BLOCK */}
          {block.collection === "block_gallery" && (
            <div>
              {block.title && <p style={titleStyle}>{block.title}</p>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                {block.gallery_items_data?.map((item, i) => (
                  <img 
                    key={i} 
                    src={getImageUrl(item.directus_files_id)} 
                    alt={`Gallery ${i + 1}`} 
                    style={{ 
                      width: "100%", 
                      height: 220, 
                      objectFit: "cover", 
                      borderRadius: "var(--radius-card)",
                      border: "1px solid var(--card-border)",
                    }} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* LOGOCLOUD BLOCK */}
          {block.collection === "block_logocloud" && (
            <div style={{ textAlign: "center" }}>
              {block.title && <p style={titleStyle}>{block.title}</p>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "center", alignItems: "center", padding: "24px 0" }}>
                {block.logos_data?.map((logo, i) => (
                  <img 
                    key={i} 
                    src={getImageUrl(logo.directus_files_id)} 
                    alt={`Logo ${i + 1}`} 
                    style={{ maxWidth: 120, maxHeight: 48, objectFit: "contain", opacity: 0.6, transition: "opacity 0.2s" }} 
                  />
                ))}
              </div>
            </div>
          )}

          {/* FORM BLOCK */}
          {block.collection === "block_form" && (
            <div style={{ 
              maxWidth: 560, 
              margin: "0 auto", 
              padding: 32, 
              background: "var(--section-bg)", 
              borderRadius: "var(--radius-panel)" 
            }}>
              {block.title && <p style={titleStyle}>{block.title}</p>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  style={{ 
                    padding: "12px 16px", 
                    border: "1px solid var(--card-border)", 
                    borderRadius: "var(--radius-lg)", 
                    fontSize: 14, 
                    background: "var(--card-bg)", 
                    color: "var(--foreground)",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }} 
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  style={{ 
                    padding: "12px 16px", 
                    border: "1px solid var(--card-border)", 
                    borderRadius: "var(--radius-lg)", 
                    fontSize: 14, 
                    background: "var(--card-bg)", 
                    color: "var(--foreground)",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }} 
                />
                <textarea 
                  placeholder="Your Message" 
                  rows={4} 
                  style={{ 
                    padding: "12px 16px", 
                    border: "1px solid var(--card-border)", 
                    borderRadius: "var(--radius-lg)", 
                    fontSize: 14, 
                    resize: "vertical", 
                    background: "var(--card-bg)", 
                    color: "var(--foreground)",
                    outline: "none",
                    transition: "border-color 0.2s",
                    fontFamily: "var(--font-sans)",
                  }} 
                />
                <button 
                  type="submit" 
                  style={{ 
                    padding: "12px 24px", 
                    background: "var(--primary-600)", 
                    color: "#fff", 
                    border: "none", 
                    borderRadius: "var(--radius-button)", 
                    fontSize: 14, 
                    fontWeight: 600, 
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          )}

          {/* TEAM BLOCK */}
          {block.collection === "block_team" && (
            <div style={{ textAlign: "center" }}>
              {block.title && <p style={titleStyle}>{block.title}</p>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              <RenderHTML html={block.content} style={{ maxWidth: 700, margin: "0 auto", ...proseStyle }} />
            </div>
          )}

          {/* TESTIMONIALS BLOCK */}
          {block.collection === "block_testimonials" && (
            <div>
              {block.title && <p style={titleStyle}>{block.title}</p>}
              <RenderHTML html={block.headline} style={headlineStyle} />
              {block.testimonials_data?.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                  {block.testimonials_data.map((t, i) => (
                    <div key={i} style={{ 
                      padding: 24, 
                      background: "var(--card-bg)", 
                      borderRadius: "var(--radius-card)", 
                      border: "1px solid var(--card-border)",
                      transition: "border-color 0.2s",
                    }}>
                      <RenderHTML 
                        html={t.content || t.quote} 
                        style={{ 
                          fontStyle: "italic", 
                          marginBottom: 16, 
                          lineHeight: 1.6, 
                          color: "var(--foreground)",
                          fontSize: 14,
                        }} 
                      />
                      <div style={{ fontSize: 14 }}>
                        <strong style={{ color: "var(--foreground)" }}>{t.name}</strong>
                        {t.title && <span style={{ color: "var(--text-muted)" }}> — {t.title}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>Testimonials coming soon...</p>
              )}
            </div>
          )}

          {/* COLUMNS BLOCK */}
          {block.collection === "block_columns" && (
            <div>
              {block.title && <p style={{ ...titleStyle, textAlign: "center" }}>{block.title}</p>}
              <RenderHTML html={block.headline} style={{ ...headlineStyle, textAlign: "center" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginTop: 32 }}>
                {block.rows_data?.map((row, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {row.image && (
                      <img 
                        src={getImageUrl(row.image)} 
                        alt={row.title} 
                        style={{ 
                          width: "100%", 
                          height: 200, 
                          objectFit: "cover", 
                          borderRadius: "var(--radius-card)",
                          border: "1px solid var(--card-border)",
                        }} 
                      />
                    )}
                    <div>
                      {row.title && (
                        <h3 style={{ 
                          fontSize: 20, 
                          fontWeight: 600, 
                          marginBottom: 8, 
                          color: "var(--foreground)",
                          fontFamily: "var(--font-display)",
                        }}>
                          {row.title}
                        </h3>
                      )}
                      {row.headline && (
                        <p style={{ color: "var(--primary-500)", fontWeight: 500, marginBottom: 8, fontSize: 14 }}>
                          {row.headline}
                        </p>
                      )}
                      <RenderHTML html={row.content} style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: 14 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA BLOCK */}
          {block.collection === "block_cta" && (
            <div style={{ 
              textAlign: "center", 
              padding: "64px 40px", 
              background: "var(--primary-600)", 
              borderRadius: "var(--radius-panel)", 
              color: "#fff" 
            }}>
              {block.title && (
                <h2 style={{ 
                  fontSize: 36, 
                  fontWeight: 700, 
                  marginBottom: 12,
                  fontFamily: "var(--font-display)",
                }}>
                  {block.title}
                </h2>
              )}
              <RenderHTML html={block.headline} style={{ fontSize: 18, marginBottom: 16, opacity: 0.9 }} />
              <RenderHTML html={block.content} style={{ maxWidth: 560, margin: "0 auto 24px", opacity: 0.85, lineHeight: 1.7, fontSize: 16 }} />
              <a 
                href="/contact-us" 
                style={{ 
                  display: "inline-block", 
                  padding: "14px 32px", 
                  background: "#fff", 
                  color: "var(--primary-600)", 
                  borderRadius: "var(--radius-button)", 
                  fontWeight: 600, 
                  fontSize: 15, 
                  textDecoration: "none",
                  transition: "transform 0.15s",
                }}
              >
                Get Started
              </a>
            </div>
          )}

        </section>
      ))}
    </>
  );
}
