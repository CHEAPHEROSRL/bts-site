export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerStyle = {
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    color: "#fff",
    padding: "60px 20px 30px",
    marginTop: 80,
  };

  const containerStyle = {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 40,
  };

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  };

  const headingStyle = {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 10,
    color: "#fff",
  };

  const linkStyle = {
    color: "#a0a0a0",
    textDecoration: "none",
    fontSize: 14,
    transition: "color 0.2s",
  };

  const bottomStyle = {
    maxWidth: 1200,
    margin: "40px auto 0",
    paddingTop: 30,
    borderTop: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={sectionStyle}>
          <h3 style={{ ...headingStyle, fontSize: 24, color: "#667eea" }}>AgencyOS</h3>
          <p style={{ color: "#a0a0a0", fontSize: 14, lineHeight: 1.6 }}>
            Building beautiful, performant, and secure web and mobile applications for forward-thinking businesses.
          </p>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>Quick Links</h4>
          <a href="/" style={linkStyle}>Home</a>
          <a href="/services" style={linkStyle}>Services</a>
          <a href="/team" style={linkStyle}>Team</a>
          <a href="/manifesto" style={linkStyle}>Manifesto</a>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>Resources</h4>
          <a href="/contact-us" style={linkStyle}>Contact Us</a>
          <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>Connect</h4>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub</a>
        </div>
      </div>

      <div style={bottomStyle}>
        <p style={{ color: "#666", fontSize: 13 }}>
          © {currentYear} AgencyOS. All rights reserved.
        </p>
        <p style={{ color: "#666", fontSize: 13 }}>
          Powered by Directus & Next.js
        </p>
      </div>
    </footer>
  );
}
