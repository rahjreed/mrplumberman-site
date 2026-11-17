import {validateLead} from '../server/store.js';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const lead=validateLead(req.body);
 if(!lead)return res.status(400).json({error:'Enter your name, valid email and consent.'});
 if(req.body.website)return res.status(400).json({error:'Unable to process submission.'});
 const preview=process.env.VERCEL_ENV!=='production';
 const key=preview?process.env.KIT_TEST_API_KEY:process.env.KIT_API_KEY;
 const form=preview?process.env.KIT_TEST_FORM_ID:process.env.KIT_FORM_ID;
 if(!key||!/^\d+$/.test(form||''))return res.status(503).json({error:'Email offers are temporarily unavailable. You can still shop.'});
 try{
 const headers={'Content-Type':'application/json','X-Kit-Api-Key':key};
 const created=await fetch('https://api.kit.com/v4/subscribers',{method:'POST',headers,body:JSON.stringify({email_address:lead.email,first_name:lead.name}),signal:AbortSignal.timeout(10000)});
 if(!created.ok)throw Error('Provider rejected subscription');
 const {subscriber}=await created.json();
 if(!subscriber?.id)throw Error('Missing subscriber');
 const added=await fetch('https://api.kit.com/v4/forms/'+form+'/subscribers/'+subscriber.id,{method:'POST',headers,signal:AbortSignal.timeout(10000)});
 if(!added.ok)throw Error('Provider rejected form');
 return res.status(200).json({ok:true});
 }catch{return res.status(503).json({error:'Could not complete signup. Please try again later.'});}
}
