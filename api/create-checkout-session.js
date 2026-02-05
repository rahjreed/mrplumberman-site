import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment', // change to 'subscription' for subs
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'https://www.mrplumberman.com',
      cancel_url: 'https://www.mrplumberman.com',
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
