import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

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

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "Team", href: "/team" },
    { title: "Manifesto", href: "/manifesto" },
  ];

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      width: "100%",
      maxWidth: 1200,
      margin: "0 auto",
      padding: "20px",
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
          flex: 1,
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          padding: "12px 24px",
          borderRadius: 16,
          minWidth: 0,
        }}>
          <Link href="/" style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            padding: "8px 0",
            flexShrink: 0,
          }}>
            <div style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              color: "#fff",
              fontSize: 18,
            }}>
              A
            </div>
            <span style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}>
              AgencyOS
            </span>
          </Link>

          <nav style={{
            display: "none",
            gap: 32,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }} className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: 16,
                  fontWeight: 600,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={toggleDarkMode}
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
                borderRadius: 8,
                transition: "background 0.2s",
              }}
              className="dark-mode-toggle"
              aria-label="Toggle dark mode"
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
              onMouseLeave={(e) => e.target.style.background = "transparent"}
            >
              {isDark ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zm9-6a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zM5 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm14.071-5.071a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM7.05 16.95a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm12.02.707a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM7.05 7.05a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
          <Link
            href="/contact-us"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 28px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.4)";
            }}
          >
            Let's Talk
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderRadius: 16,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }} className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: "#ffffff",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 600,
                padding: "12px 16px",
                borderRadius: 8,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
              }}
            >
              {item.title}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", margin: "8px 0" }} />
          <Link
            href="/contact-us"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 28px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Let's Talk
          </Link>
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
        }
      `}</style>
    </header>
  );
}
