# Mr. Plumber Man store modernization

Preview only until owner approves. Production checkout uses existing six price IDs (verify in the live Stripe account before release). Preview strictly requires STRIPE_TEST_SECRET_KEY and STRIPE_TEST_PRICE_MAP (JSON mapping p/t/c to payment and subscription price IDs). Never use live keys in preview. Verify test checkout, canceled/declined payments, subscriptions, and receipts on desktop/mobile. The verified return page does not fulfill orders: configure and test signed Stripe webhook delivery and idempotent fulfillment (including renewals and async payments), or document the existing manual fulfillment procedure before release.

Email opt-in requires KIT_API_KEY and KIT_FORM_ID in production, KIT_TEST_API_KEY and KIT_TEST_FORM_ID in preview; configure a dedicated form with appropriate consent and confirmation settings. No credentials should be exposed to client code. Verify actual recipient, coupon validity, double opt-in, unsubscribe, and provider behavior for previously unsubscribed subscribers; add durable rate limiting/bot protection before public activation. The form fails closed when not configured.

Policy copy is a draft: owner must confirm refund eligibility/windows, shipping terms, business identity/contact, privacy retention and recipients, tax, subscription cancellation details and claims substantiation. Review product photos/labels and all marketing claims with qualified counsel. No health measurements are collected by the store.

Run npm test and npm run build. Browser end-to-end tests need sandbox configuration. No live purchases are necessary for verification. Existing Vercel environment variables must be scoped appropriately before release.
