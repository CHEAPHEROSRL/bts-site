import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Navbar({ navigation, globals, ctaButtons }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const closeTimeoutRef = useRef(null);

  const handleMouseEnter = (itemId) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(itemId);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.setAttribute("data-theme", shouldBeDark ? "dark" : "light");
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
  };

  const navItems = navigation?.items || [];
  const siteTitle = globals?.title || "AgencyOS";

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      width: "100%",
      maxWidth: 1280,
      margin: "0 auto",
      padding: "16px 32px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      background: "var(--background)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          flex: 1,
          background: "#0f172a",
          padding: "8px 24px",
          borderRadius: "var(--radius-card)",
          minWidth: 0,
        }}>
          <Link href="/" style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            padding: "8px 0",
            flexShrink: 0,
          }}>
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ color: "#fff" }}>
              <rect width="32" height="32" rx="6" fill="currentColor"/>
              <path d="M8 22L16 10L24 22H8Z" fill="#0f172a"/>
            </svg>
            <span style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#fff",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.01em",
            }}>
              {siteTitle}
            </span>
          </Link>

          <nav style={{
            display: "none",
            gap: 24,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            alignItems: "center",
          }} className="desktop-nav">
            {navItems.map((item) => (
              <div key={item.id} style={{ position: "relative", display: "flex", alignItems: "center", height: 20 }}>
                {item.hasChildren ? (
                  <div
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                    style={{ display: "flex", alignItems: "center", height: "100%", position: "relative" }}
                  >
                    <span
                      style={{
                        color: "#e2e8f0",
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        lineHeight: "20px",
                        height: 20,
                      }}
                    >
                      {item.title}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </span>
                    {openDropdown === item.id && item.children?.length > 0 && (
                      <div style={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        paddingTop: 12,
                      }}>
                        <div style={{
                          background: "#1e293b",
                          borderRadius: 16,
                          padding: "20px 24px",
                          minWidth: 380,
                          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                          display: "flex",
                          flexDirection: "column",
                          gap: 0,
                        }}>
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            target={child.openInNewTab ? "_blank" : undefined}
                            rel={child.openInNewTab ? "noopener noreferrer" : undefined}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 16,
                              color: "#e2e8f0",
                              textDecoration: "none",
                              padding: "16px 8px",
                              borderRadius: 8,
                              transition: "background 0.2s",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                          >
                            <div style={{
                              width: 48,
                              height: 48,
                              borderRadius: 10,
                              background: "var(--primary-500)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}>
                              {(child.icon === "file" || child.icon === "description") && (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                  <polyline points="14 2 14 8 20 8"/>
                                  <line x1="16" y1="13" x2="8" y2="13"/>
                                  <line x1="16" y1="17" x2="8" y2="17"/>
                                </svg>
                              )}
                              {(child.icon === "users" || child.icon === "person_pin") && (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                  <circle cx="12" cy="7" r="4"/>
                                </svg>
                              )}
                              {(child.icon === "help-circle" || child.icon === "support") && (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"/>
                                  <circle cx="12" cy="12" r="4"/>
                                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
                                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
                                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
                                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
                                </svg>
                              )}
                              {!child.icon && (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                  <circle cx="12" cy="12" r="10"/>
                                </svg>
                              )}
                            </div>
                            <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
                              <div style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#fff",
                                marginBottom: 4,
                                letterSpacing: "-0.01em",
                              }}>
                                {child.title}
                              </div>
                              {(child.description || child.label) && (
                                <div style={{
                                  fontSize: 14,
                                  color: "#94a3b8",
                                  lineHeight: 1.5,
                                }}>
                                  {child.description || child.label}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    style={{
                      color: "#e2e8f0",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 500,
                      transition: "color 0.2s",
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "20px",
                      height: 20,
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#94a3b8"}
                    onMouseLeave={(e) => e.target.style.color = "#e2e8f0"}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={toggleDarkMode}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#e2e8f0",
                borderRadius: "var(--radius-md)",
                transition: "color 0.2s",
              }}
              className="dark-mode-toggle-desktop"
              aria-label="Toggle dark mode"
              onMouseEnter={(e) => e.currentTarget.style.color = "#94a3b8"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#e2e8f0"}
            >
              {isDark ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zm9-6a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zM5 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm14.071-5.071a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM7.05 16.95a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm12.02.707a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM7.05 7.05a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
                </svg>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#fff",
              }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div style={{
          display: "none",
          gap: 12,
        }} className="desktop-cta">
          {ctaButtons?.map((btn) => (
            <Link
              key={btn.id}
              href={btn.url}
              target={btn.openInNewTab ? "_blank" : undefined}
              rel={btn.openInNewTab ? "noopener noreferrer" : undefined}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "12px 24px",
                background: btn.variant === 'primary' ? "var(--primary-600)" : "transparent",
                color: btn.variant === 'primary' ? "#fff" : "var(--primary-600)",
                borderRadius: "var(--radius-button)",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                transition: "background 0.2s, transform 0.15s",
                fontFamily: "var(--font-sans)",
              }}
            >
              {btn.text}
            </Link>
          ))}
        </div>
      </div>

      {mobileMenuOpen && (
        <div style={{
          background: "#0f172a",
          borderRadius: "var(--radius-card)",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }} className="mobile-menu">
          {navItems.map((item) => (
            <div key={item.id}>
              {item.hasChildren ? (
                <>
                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: 13,
                      fontWeight: 600,
                      padding: "12px 16px 8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.title}
                  </div>
                  {item.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href}
                      target={child.openInNewTab ? "_blank" : undefined}
                      rel={child.openInNewTab ? "noopener noreferrer" : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        color: "#e2e8f0",
                        textDecoration: "none",
                        fontSize: 15,
                        fontWeight: 500,
                        padding: "10px 16px 10px 24px",
                        borderRadius: "var(--radius-md)",
                        display: "block",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "rgba(255,255,255,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                      }}
                    >
                      {child.title}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: "#e2e8f0",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 500,
                    padding: "12px 16px",
                    borderRadius: "var(--radius-md)",
                    display: "block",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                  }}
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
          <div style={{ borderTop: "1px solid #334155", margin: "8px 0" }} />
          {ctaButtons?.map((btn) => (
            <Link
              key={btn.id}
              href={btn.url}
              target={btn.openInNewTab ? "_blank" : undefined}
              rel={btn.openInNewTab ? "noopener noreferrer" : undefined}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 24px",
                marginBottom: 8,
                background: btn.variant === 'primary' ? "var(--primary-600)" : "transparent",
                color: btn.variant === 'primary' ? "#fff" : "var(--primary-600)",
                borderRadius: "var(--radius-button)",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              {btn.text}
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .mobile-menu {
            display: none !important;
          }
          .dark-mode-toggle-desktop {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
