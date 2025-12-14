import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "Team", href: "/team" },
    { title: "Manifesto", href: "/manifesto" },
  ];

  return (
    <header style={{
      width: "100%",
      background: "#0d0d1a",
      padding: "16px 24px",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
          background: "linear-gradient(90deg, #1a1a2e 0%, #1e1e3a 50%, #1a1a2e 100%)",
          padding: "10px 20px",
          borderRadius: 50,
          border: "1px solid rgba(255,255,255,0.05)",
        }}>
          <Link href="/" style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}>
            <div style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "#fff",
              fontSize: 16,
            }}>
              A
            </div>
            <span style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#fff",
              letterSpacing: "-0.01em",
            }}>
              AgencyOS
            </span>
          </Link>

          <nav style={{
            display: "none",
            alignItems: "center",
            gap: 32,
          }} className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: "#9ca3af",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 400,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.color = "#fff"}
                onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
              >
                {item.title}
              </Link>
            ))}
          </nav>

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

        <Link
          href="/contact-us"
          className="desktop-cta"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 24px",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
            color: "#fff",
            borderRadius: 50,
            fontWeight: 500,
            fontSize: 14,
            textDecoration: "none",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)",
            border: "1px solid rgba(255,255,255,0.1)",
            whiteSpace: "nowrap",
          }}
        >
          Let's Talk
        </Link>
      </div>

      {mobileMenuOpen && (
        <div style={{
          maxWidth: 1200,
          margin: "16px auto 0",
          background: "linear-gradient(90deg, #1a1a2e 0%, #1e1e3a 50%, #1a1a2e 100%)",
          borderRadius: 20,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          border: "1px solid rgba(255,255,255,0.05)",
        }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: "#9ca3af",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 400,
                padding: "12px 16px",
                borderRadius: 8,
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255,255,255,0.05)";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#9ca3af";
              }}
            >
              {item.title}
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
              padding: "12px 24px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              color: "#fff",
              borderRadius: 50,
              fontWeight: 500,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)",
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
        }
      `}</style>
    </header>
  );
}
