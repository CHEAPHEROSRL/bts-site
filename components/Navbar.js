import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { title: "Services", href: "/services" },
    { title: "Projects", href: "/projects" },
    { title: "About", href: "/about", hasDropdown: true },
    { title: "Articles", href: "/articles" },
  ];

  return (
    <header style={{
      width: "100%",
      background: "#0f0f1a",
      padding: "16px 24px",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
          background: "#1a1a2e",
          padding: "12px 24px",
          borderRadius: 50,
        }}>
          <Link href="/" style={{
            display: "flex",
            alignItems: "baseline",
            textDecoration: "none",
          }}>
            <span style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "-0.01em",
            }}>
              Agency
            </span>
            <span style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#8b5cf6",
              marginLeft: 1,
              position: "relative",
              top: -4,
            }}>
              OS
            </span>
          </Link>

          <nav style={{
            display: "none",
            alignItems: "center",
            gap: 28,
          }} className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 400,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}
              >
                {item.title}
                {item.hasDropdown && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </Link>
            ))}
          </nav>

          <button
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#9ca3af",
              transition: "color 0.2s",
            }}
            className="desktop-darkmode"
            aria-label="Toggle dark mode"
            onMouseEnter={(e) => e.currentTarget.style.color = "#fff"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
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

        <div className="desktop-cta" style={{
          display: "none",
          alignItems: "center",
          gap: 16,
        }}>
          <Link
            href="/contact-us"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 20px",
              background: "#8b5cf6",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.background = "#7c3aed"}
            onMouseLeave={(e) => e.target.style.background = "#8b5cf6"}
          >
            Let's Talk
          </Link>
          <Link
            href="/login"
            style={{
              color: "#8b5cf6",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.color = "#a78bfa"}
            onMouseLeave={(e) => e.target.style.color = "#8b5cf6"}
          >
            Login
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div style={{
          maxWidth: 1200,
          margin: "16px auto 0",
          background: "#1a1a2e",
          borderRadius: 20,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                color: "#9ca3af",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 400,
                padding: "12px 16px",
                borderRadius: 8,
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              {item.title}
              {item.hasDropdown && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              )}
            </Link>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", margin: "8px 0" }} />
          <Link
            href="/contact-us"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 20px",
              background: "#8b5cf6",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Let's Talk
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 20px",
              color: "#8b5cf6",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Login
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
          .desktop-darkmode {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
