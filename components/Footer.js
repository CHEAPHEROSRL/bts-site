import { useState, useEffect } from "react";
import Link from "next/link";

const socialIcons = {
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  youtube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  discord: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
    </svg>
  ),
  twitter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
};

export default function Footer({ navigation, globals, newsletterForm }) {
  const [isDark, setIsDark] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription:", formValues);
    setFormValues({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleFieldChange = (fieldName, value) => {
    setFormValues(prev => ({ ...prev, [fieldName]: value }));
  };

  const navItems = navigation?.items || [];
  const midpoint = Math.ceil(navItems.length / 2);
  const menuColumn1 = navItems.slice(0, midpoint);
  const menuColumn2 = navItems.slice(midpoint);

  const siteTitle = globals?.title || "Agency OS";
  const tagline = globals?.tagline || "The hackable agency operating system";
  const socialLinks = globals?.social_links || [];

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    fontSize: 14,
    border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
    borderRadius: 8,
    background: isDark ? "#1e293b" : "#f8fafc",
    color: isDark ? "#f1f5f9" : "#0f172a",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <footer style={{
      background: isDark ? "#0f172a" : "#ffffff",
      color: isDark ? "#f1f5f9" : "#0f172a",
      padding: "40px 32px 32px",
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
          marginBottom: 40,
        }}>
          <div>
            <Link href="/" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
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
                {siteTitle}
              </span>
            </Link>
            <p style={{
              color: isDark ? "#94a3b8" : "#64748b",
              fontSize: 14,
              lineHeight: 1.6,
              marginTop: 10,
            }}>
              {tagline}
            </p>
          </div>

          <button
            onClick={toggleDarkMode}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              background: isDark ? "#1e293b" : "#f1f5f9",
              border: "none",
              cursor: "pointer",
              color: isDark ? "#94a3b8" : "#64748b",
              borderRadius: 8,
              transition: "color 0.2s, background 0.2s",
            }}
            aria-label="Toggle dark mode"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--primary-500)";
              e.currentTarget.style.background = isDark ? "#334155" : "#e2e8f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isDark ? "#94a3b8" : "#64748b";
              e.currentTarget.style.background = isDark ? "#1e293b" : "#f1f5f9";
            }}
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

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          marginBottom: 40,
        }}>
          <div>
            <h4 style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--primary-500)",
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "var(--font-display)",
            }}>
              Menu
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <ul style={{ listStyle: "none" }}>
                {menuColumn1.map((item) => (
                  <li key={item.id} style={{ marginBottom: 10 }}>
                    <Link
                      href={item.href}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noopener noreferrer" : undefined}
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
              <ul style={{ listStyle: "none" }}>
                {menuColumn2.map((item) => (
                  <li key={item.id} style={{ marginBottom: 10 }}>
                    <Link
                      href={item.href}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={item.openInNewTab ? "noopener noreferrer" : undefined}
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
          </div>

          {newsletterForm && (
            <div>
              {newsletterForm.title && (
                <h4 style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: isDark ? "#f1f5f9" : "#0f172a",
                  marginBottom: 20,
                  fontFamily: "var(--font-display)",
                }}
                dangerouslySetInnerHTML={{ __html: newsletterForm.title }}
                />
              )}
              {submitted && newsletterForm.success_message ? (
                <p style={{ color: "var(--primary-500)", fontSize: 14 }}>{newsletterForm.success_message}</p>
              ) : (
                <form onSubmit={handleSubscribe}>
                  {newsletterForm.schema?.map((field, index) => {
                    const isHalfWidth = field.width === 'half';
                    const isInRow = isHalfWidth && newsletterForm.schema[index + 1]?.width === 'half';
                    const isPrevHalf = index > 0 && newsletterForm.schema[index - 1]?.width === 'half';
                    
                    if (isPrevHalf && isHalfWidth) return null;
                    
                    if (isInRow) {
                      const nextField = newsletterForm.schema[index + 1];
                      return (
                        <div key={field.name} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                          <input
                            type={field.type || "text"}
                            name={field.name}
                            placeholder={field.placeholder || field.label}
                            value={formValues[field.name] || ""}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            required={field.validation?.required}
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "var(--primary-500)"}
                            onBlur={(e) => e.target.style.borderColor = isDark ? "#334155" : "#e2e8f0"}
                          />
                          <input
                            type={nextField.type || "text"}
                            name={nextField.name}
                            placeholder={nextField.placeholder || nextField.label}
                            value={formValues[nextField.name] || ""}
                            onChange={(e) => handleFieldChange(nextField.name, e.target.value)}
                            required={nextField.validation?.required}
                            style={inputStyle}
                            onFocus={(e) => e.target.style.borderColor = "var(--primary-500)"}
                            onBlur={(e) => e.target.style.borderColor = isDark ? "#334155" : "#e2e8f0"}
                          />
                        </div>
                      );
                    }
                    
                    if (field.type === 'textarea') {
                      return (
                        <textarea
                          key={field.name}
                          name={field.name}
                          placeholder={field.placeholder || field.label}
                          value={formValues[field.name] || ""}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          required={field.validation?.required}
                          rows={4}
                          style={{ ...inputStyle, marginBottom: 12, resize: "vertical", fontFamily: "var(--font-sans)" }}
                          onFocus={(e) => e.target.style.borderColor = "var(--primary-500)"}
                          onBlur={(e) => e.target.style.borderColor = isDark ? "#334155" : "#e2e8f0"}
                        />
                      );
                    }
                    
                    return (
                      <input
                        key={field.name}
                        type={field.type || "text"}
                        name={field.name}
                        placeholder={field.placeholder || field.label}
                        value={formValues[field.name] || ""}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        required={field.validation?.required}
                        style={{ ...inputStyle, marginBottom: 12 }}
                        onFocus={(e) => e.target.style.borderColor = "var(--primary-500)"}
                        onBlur={(e) => e.target.style.borderColor = isDark ? "#334155" : "#e2e8f0"}
                      />
                    );
                  })}
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#fff",
                      background: "var(--primary-500)",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                      transition: "background 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "var(--primary-600)";
                      e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "var(--primary-500)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    {newsletterForm.submit_label}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <div style={{
          borderTop: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
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
              marginBottom: 6,
            }}>
              Copyright © 1988 - {currentYear}{" "}
              <Link href="/" style={{ color: "inherit", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--primary-500)"} onMouseLeave={(e) => e.target.style.color = "#64748b"}>
                {siteTitle}
              </Link>. All rights reserved.
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
              <a href="https://www.directus.io" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", borderBottom: isDark ? "1px solid #334155" : "1px solid #e2e8f0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--primary-500)"} onMouseLeave={(e) => e.target.style.color = "#64748b"}>
                Directus
              </a>
              {" "}and{" "}
              <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", borderBottom: isDark ? "1px solid #334155" : "1px solid #e2e8f0", transition: "color 0.2s" }} onMouseEnter={(e) => e.target.style.color = "var(--primary-500)"} onMouseLeave={(e) => e.target.style.color = "#64748b"}>
                Next.js
              </a>.
            </p>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {socialLinks.map((social, index) => {
              const icon = socialIcons[social.service];
              if (!icon) return null;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: isDark ? "#64748b" : "#94a3b8",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary-500)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = isDark ? "#64748b" : "#94a3b8"}
                >
                  {icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
