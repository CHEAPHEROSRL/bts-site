import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [isDark, setIsDark] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
  };

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "Team", href: "/team" },
    { title: "Manifesto", href: "/manifesto" },
    { title: "Contact Us", href: "/contact-us" },
    { title: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <footer style={{
      background: isDark ? "#0f172a" : "#ffffff",
      color: isDark ? "#f1f5f9" : "#0f172a",
      padding: "32px 32px 24px",
      marginTop: 64,
      borderRadius: "var(--radius-panel)",
      maxWidth: 1280,
      margin: "64px auto 0",
      transition: "background 0.3s, color 0.3s",
    }}>
      <div style={{ margin: "0 auto" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 24,
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <Link href="/" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ color: isDark ? "#fff" : "#0f172a" }}>
                <rect width="32" height="32" rx="6" fill="currentColor"/>
                <path d="M8 22L16 10L24 22H8Z" fill={isDark ? "#0f172a" : "#ffffff"}/>
              </svg>
              <span style={{
                fontSize: 20,
                fontWeight: 600,
                color: isDark ? "#fff" : "#0f172a",
                fontFamily: "var(--font-display)",
              }}>
                AgencyOS
              </span>
            </Link>
            <p style={{
              color: isDark ? "#94a3b8" : "#64748b",
              fontSize: 14,
              lineHeight: 1.6,
              marginTop: 8,
              maxWidth: 280,
            }}>
              Building beautiful, performant web applications for forward-thinking businesses.
            </p>
          </div>

          <button
            onClick={toggleDarkMode}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: isDark ? "#94a3b8" : "#64748b",
              borderRadius: "var(--radius-md)",
              transition: "color 0.2s",
            }}
            aria-label="Toggle dark mode"
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary-500)"}
            onMouseLeave={(e) => e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b"}
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
        </div>

        <nav style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 32,
          marginTop: 32,
        }}>
          <div>
            <h4 style={{
              fontSize: 14,
              fontWeight: 600,
              color: isDark ? "#f1f5f9" : "#0f172a",
              marginBottom: 12,
              fontFamily: "var(--font-display)",
            }}>
              Menu
            </h4>
            <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      color: isDark ? "#e2e8f0" : "#334155",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 500,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => e.target.style.color = "var(--primary-500)"}
                    onMouseLeave={(e) => e.target.style.color = isDark ? "#e2e8f0" : "#334155"}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div style={{
          borderTop: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
          marginTop: 24,
          paddingTop: 24,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}>
          <div>
            <p style={{
              color: isDark ? "#64748b" : "#64748b",
              fontSize: 13,
              marginBottom: 8,
            }}>
              Copyright © 1988 - {currentYear} <Link href="/" style={{ color: "inherit", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--primary-500)"} onMouseLeave={(e) => e.target.style.color = isDark ? "#64748b" : "#64748b"}>AgencyOS</Link>. All rights reserved.
            </p>
            <p style={{
              color: isDark ? "#64748b" : "#64748b",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--primary-500)">
                <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z"/>
              </svg>
              Site powered by{" "}
              <a href="https://www.directus.io" target="_blank" rel="noopener noreferrer" style={{ borderBottom: isDark ? "1px solid #334155" : "1px solid #e2e8f0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--primary-500)"} onMouseLeave={(e) => e.target.style.color = isDark ? "#64748b" : "#64748b"}>
                Directus
              </a>
              {" "}and{" "}
              <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" style={{ borderBottom: isDark ? "1px solid #334155" : "1px solid #e2e8f0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--primary-500)"} onMouseLeave={(e) => e.target.style.color = isDark ? "#64748b" : "#64748b"}>
                Next.js
              </a>.
            </p>
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: isDark ? "#334155" : "#94a3b8", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.target.style.opacity = "0.7"} onMouseLeave={(e) => e.target.style.opacity = "1"}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: isDark ? "#334155" : "#94a3b8", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.target.style.opacity = "0.7"} onMouseLeave={(e) => e.target.style.opacity = "1"}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: isDark ? "#334155" : "#94a3b8", transition: "opacity 0.2s" }} onMouseEnter={(e) => e.target.style.opacity = "0.7"} onMouseLeave={(e) => e.target.style.opacity = "1"}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
