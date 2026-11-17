import Stripe from 'stripe';
import {checkoutConfig,orderStatus} from '../server/store.js';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const id=req.body?.sessionId;
 if(typeof id!=='string'||!/^cs_(test|live)_[A-Za-z0-9]{10,240}$/.test(id))return res.status(400).json({error:'Invalid session'});
 try{
 const {key,preview}=checkoutConfig();
 if(!id.startsWith(preview?'cs_test_':'cs_live_'))return res.status(400).json({error:'Invalid session'});
 const session=await new Stripe(key).checkout.sessions.retrieve(id);
 const status=orderStatus(session);
 return res.status(200).json({status,reference:status==='paid'?'MPM-'+session.id.slice(-10).toUpperCase():null});
 }catch{return res.status(503).json({error:'Unable to verify payment. Contact support if you paid.'});}
}
