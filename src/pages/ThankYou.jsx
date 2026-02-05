import React from "react";

export default function ThankYou() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 20px" }}>
      <h1 style={{ fontSize: 40, marginBottom: 12 }}>✅ Order received!</h1>

      <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.9 }}>
        Thanks for supporting <strong>Mr Plumber Man Nutrition</strong>. You’ll get a receipt in your email shortly.
      </p>

      <section style={{ marginTop: 28, padding: 18, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>What happens next</h2>
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
          <li>We process your order and prepare it for shipment.</li>
          <li>You’ll receive tracking as soon as it’s available.</li>
          <li>If you have questions, reach out anytime.</li>
        </ul>
      </section>

      <section style={{ marginTop: 20, padding: 18, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 12 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Need help?</h2>
        <p style={{ margin: 0, lineHeight: 1.7 }}>
          Email: <a href="mailto:hello@mrplumberman.com">hello@mrplumberman.com</a>
        </p>
      </section>

      <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            textDecoration: "none",
          }}
        >
          ← Back to Home
        </a>

        <a
          href="/#products"
          style={{
            display: "inline-block",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            textDecoration: "none",
          }}
        >
          Shop more
        </a>
      </div>
    </main>
  );
}
