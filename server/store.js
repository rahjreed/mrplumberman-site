export const catalog = {
 p:{payment:'price_1SwvOSKFN6WMOhlF5xerUfID',subscription:'price_1SwvhCKFN6WMOhlFqFQiSYH6'},
 t:{payment:'price_1SwvR8KFN6WMOhlFXD9hxqXi',subscription:'price_1SwvkOKFN6WMOhlFRkxiPaPq'},
 c:{payment:'price_1SwvX4KFN6WMOhlFXU8Bs0lt',subscription:'price_1SwvmEKFN6WMOhlFzNkPcl3U'}
};
export function checkoutConfig(env=process.env) {
 const preview=env.VERCEL_ENV!=='production';
 const key=preview?env.STRIPE_TEST_SECRET_KEY:env.STRIPE_SECRET_KEY;
 if(!key || !(preview?/^(sk|rk)_test_/:/^(sk|rk)_live_/).test(key)) throw Error('Checkout configuration unavailable');
 const prices=preview?JSON.parse(env.STRIPE_TEST_PRICE_MAP||'{}'):catalog;
 const origin=preview?(env.VERCEL_URL?'https://'+env.VERCEL_URL:'http://localhost:5173'):'https://www.mrplumberman.com';
 return {key,prices,origin,preview};
}
export function selectPrice(body,prices) {
 const {product,mode}=body||{};
 if(!Object.hasOwn(catalog,product)||!['payment','subscription'].includes(mode)) return null;
 const id=prices[product]?.[mode];
 return typeof id==='string'&&/^price_[A-Za-z0-9]+$/.test(id)?id:null;
}
export function orderStatus(session) {
 if(session.metadata?.store!=='mrplumberman') return 'unverified';
 return session.status==='complete'&&session.payment_status==='paid'?'paid':session.status==='expired'?'unverified':'pending';
}
export function validateLead(body) {
 const {name,email,consent}=body||{};
 if(typeof name!=='string'||typeof email!=='string'||consent!==true) return null;
 const n=name.trim(),e=email.trim().toLowerCase();
 return n.length>0&&n.length<=100&&e.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)?{name:n,email:e}:null;
}
