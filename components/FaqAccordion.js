import { useState } from "react";

export default function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 5;

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  const visibleFaqs = showAll ? faqs : faqs.slice(0, INITIAL_COUNT);
  const hasMore = faqs.length > INITIAL_COUNT;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {visibleFaqs.map((faq, i) => {
        const isOpen = openIndex === i;
        
        return (
          <div key={i}>
            <button
              onClick={() => toggleFaq(i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                background: isOpen ? "var(--primary-100)" : "var(--section-bg)",
                borderRadius: "var(--radius-card)",
                border: "none",
                borderLeft: isOpen ? "4px solid var(--primary-500)" : "4px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                fontFamily: "var(--font-sans)",
              }}
            >
              <span style={{
                fontSize: 15,
                fontWeight: 500,
                color: "var(--foreground)",
              }}>
                {faq.title}
              </span>
              <span style={{
                fontSize: 20,
                color: "var(--primary-500)",
                fontWeight: 300,
                marginLeft: 16,
                flexShrink: 0,
                transition: "transform 0.2s",
              }}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            
            {isOpen && (
              <div style={{
                padding: "16px 24px 24px",
                fontSize: 14,
                lineHeight: 1.7,
                color: "var(--text-muted)",
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
      
      {hasMore && !showAll && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button
            onClick={() => setShowAll(true)}
            style={{
              padding: "12px 24px",
              background: "transparent",
              border: "1px solid var(--primary-500)",
              borderRadius: "var(--radius-button)",
              color: "var(--primary-500)",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--primary-50)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
