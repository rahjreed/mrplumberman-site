import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  try {
    const { priceId, mode } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: "Missing priceId" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: mode || "payment", // <-- this is the key change
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: "https://www.mrplumberman.com/thank-you?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://www.mrplumberman.com/?canceled=true",
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
