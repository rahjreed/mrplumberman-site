import Stripe from 'stripe';
import {catalog,checkoutConfig,selectPrice} from '../server/store.js';

const amounts={p:3900,t:5900,c:9700};

export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const {product,mode}=req.body||{};
 if(typeof product!=='string'||!Object.hasOwn(catalog,product)||!['payment','subscription'].includes(mode))return res.status(400).json({error:'Invalid product or purchase option.'});
 try{
  const {key,prices,origin,preview}=checkoutConfig();
  const priceId=selectPrice({product,mode},prices);
  if(!priceId)return res.status(503).json({error:'Checkout is not configured for this environment.'});
  const stripe=new Stripe(key);
  const price=await stripe.prices.retrieve(priceId);
  if(!price.active||price.livemode===preview||price.currency!=='usd'||Boolean(price.recurring)!==(mode==='subscription')||typeof price.unit_amount!=='number'||price.unit_amount<=0||(!preview&&mode==='payment'&&price.unit_amount!==amounts[product]))return res.status(503).json({error:'This purchase option is temporarily unavailable.'});
  const metadata={store:'mrplumberman',product,purchase_mode:mode};
  const session=await stripe.checkout.sessions.create({
   mode,line_items:[{price:priceId,quantity:1}],metadata,
   ...(mode==='subscription'?{subscription_data:{metadata}}:{payment_intent_data:{metadata}}),
   billing_address_collection:'required',shipping_address_collection:{allowed_countries:['US']},phone_number_collection:{enabled:true},
   allow_promotion_codes:true,
   success_url:origin+'/thank-you?session_id={CHECKOUT_SESSION_ID}',
   cancel_url:origin+'/?canceled=true'
  });
  if(!session.url)return res.status(503).json({error:'Checkout is temporarily unavailable.'});
  return res.status(200).json({url:session.url});
 }catch(err){
  console.error('Checkout creation failed',err?.type||err?.name||'Error');
  return res.status(503).json({error:'Unable to start checkout. Please try again or contact support.'});
 }
}
