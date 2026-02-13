import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const { priceId } = req.body;
    console.log("CREATE CHECKOUT BODY:", req.body);

    if (!priceId) {
      return res.status(400).json({ error: "Missing priceId" });
    }

    // 🔥 Key fix: detect whether this price is recurring or not
    const price = await stripe.prices.retrieve(priceId);
    const isRecurring = !!price.recurring;

    const session = await stripe.checkout.sessions.create({
      mode: isRecurring ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],

      // ✅ This makes the coupon/promo box show up in Stripe Checkout
      allow_promotion_codes: true,

      success_url: "https://www.mrplumberman.com/thank-you?session_id={CHECKOUT_SESSION_ID}",
cancel_url: "https://www.mrplumberman.com/?canceled=true",

    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: err.message });
  }
}
