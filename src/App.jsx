import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  History,
  Loader2,
  Star,
  ShieldCheck,
  Wrench,
  Droplets,
  Award,
  Package,
  Ticket,
  FlaskConical,
  Scale,
  X,
  Minimize2,
  Send,
  XCircle,
  Home,
  Network,
  ChevronDown,
  Quote,
  Truck,
  RefreshCcw,
  User,
  Mail
} from 'lucide-react';

// API Key set to empty string per environment security protocols
const apiKey = "";

// --- Recent Purchases Data (50 Locations) ---
const purchaseData = [
  { city: "Chicago", state: "IL", product: "OVERHAUL COMBO", time: "2 mins ago" },
  { city: "Houston", state: "TX", product: "PRIME TIME", time: "5 mins ago" },
  { city: "Phoenix", state: "AZ", product: "PRESSURE", time: "12 mins ago" },
  { city: "Philadelphia", state: "PA", product: "OVERHAUL COMBO", time: "18 mins ago" },
  { city: "San Antonio", state: "TX", product: "PRIME TIME", time: "24 mins ago" },
  { city: "San Diego", state: "CA", product: "PRESSURE", time: "31 mins ago" },
  { city: "Dallas", state: "TX", product: "OVERHAUL COMBO", time: "45 mins ago" },
  { city: "Austin", state: "TX", product: "PRIME TIME", time: "1 hour ago" },
  { city: "Jacksonville", state: "FL", product: "OVERHAUL COMBO", time: "1 hour ago" },
  { city: "Fort Worth", state: "TX", product: "PRESSURE", time: "2 hours ago" },
  { city: "Columbus", state: "OH", product: "PRIME TIME", time: "2 hours ago" },
  { city: "Charlotte", state: "NC", product: "PRESSURE", time: "3 hours ago" },
  { city: "Seattle", state: "WA", product: "OVERHAUL COMBO", time: "3 hours ago" },
  { city: "Denver", state: "CO", product: "PRIME TIME", time: "4 hours ago" },
  { city: "Boston", state: "MA", product: "OVERHAUL COMBO", time: "4 hours ago" },
  { city: "Nashville", state: "TN", product: "PRESSURE", time: "5 hours ago" },
  { city: "Las Vegas", state: "NV", product: "PRIME TIME", time: "5 hours ago" },
  { city: "Baltimore", state: "MD", product: "PRESSURE", time: "6 hours ago" },
  { city: "Louisville", state: "KY", product: "OVERHAUL COMBO", time: "6 hours ago" },
  { city: "Milwaukee", state: "WI", product: "PRESSURE", time: "7 hours ago" },
  { city: "Albuquerque", state: "NM", product: "PRIME TIME", time: "7 hours ago" },
  { city: "Tucson", state: "AZ", product: "PRESSURE", time: "8 hours ago" },
  { city: "Fresno", state: "CA", product: "OVERHAUL COMBO", time: "8 hours ago" },
  { city: "Sacramento", state: "CA", product: "PRIME TIME", time: "9 hours ago" },
  { city: "Kansas City", state: "MO", product: "OVERHAUL COMBO", time: "9 hours ago" },
  { city: "Atlanta", state: "GA", product: "PRESSURE", time: "10 hours ago" },
  { city: "Omaha", state: "NE", product: "PRIME TIME", time: "10 hours ago" },
  { city: "Raleigh", state: "NC", product: "PRESSURE", time: "11 hours ago" },
  { city: "Miami", state: "FL", product: "OVERHAUL COMBO", time: "11 hours ago" },
  { city: "Minneapolis", state: "MN", product: "PRESSURE", time: "12 hours ago" },
  { city: "Cleveland", state: "OH", product: "PRIME TIME", time: "12 hours ago" },
  { city: "Tampa", state: "FL", product: "OVERHAUL COMBO", time: "13 hours ago" },
  { city: "Pittsburgh", state: "PA", product: "PRESSURE", time: "14 hours ago" },
  { city: "Boise", state: "ID", product: "PRIME TIME", time: "15 hours ago" },
  { city: "Portland", state: "OR", product: "OVERHAUL COMBO", time: "16 hours ago" },
  { city: "Salt Lake City", state: "UT", product: "PRESSURE", time: "17 hours ago" },
  { city: "Little Rock", state: "AR", product: "PRIME TIME", time: "18 hours ago" },
  { city: "Birmingham", state: "AL", product: "PRESSURE", time: "19 hours ago" },
  { city: "Des Moines", state: "IA", product: "OVERHAUL COMBO", time: "20 hours ago" },
  { city: "Jackson", state: "MS", product: "PRESSURE", time: "21 hours ago" },
  { city: "Baton Rouge", state: "LA", product: "PRIME TIME", time: "22 hours ago" },
  { city: "Tulsa", state: "OK", product: "PRESSURE", time: "23 hours ago" },
  { city: "Wichita", state: "KS", product: "OVERHAUL COMBO", time: "Yesterday" },
  { city: "Knoxville", state: "TN", product: "PRESSURE", time: "Yesterday" },
  { city: "Charleston", state: "SC", product: "PRIME TIME", time: "Yesterday" },
  { city: "Savannah", state: "GA", product: "PRESSURE", time: "Yesterday" },
  { city: "Orlando", state: "FL", product: "OVERHAUL COMBO", time: "Yesterday" },
  { city: "Reno", state: "NV", product: "PRIME TIME", time: "Yesterday" },
  { city: "Providence", state: "RI", product: "OVERHAUL COMBO", time: "Yesterday" },
  { city: "Grand Rapids", state: "MI", product: "PRESSURE", time: "Yesterday" }
];

// --- Purchase Notification Pill ---
const PurchasePill = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const cycle = () => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % purchaseData.length);
        setFade(true);
      }, 500);
    };
    const interval = setInterval(cycle, 10000); 
    return () => clearInterval(interval);
  }, []);

  const item = purchaseData[index];

  return (
    <div className="fixed bottom-6 left-6 z-[90] pointer-events-none">
      <div className="bg-[#1a0f0a]/95 border border-[#c58158]/30 px-3 py-2 rounded-lg shadow-xl flex items-center gap-3 max-w-[240px] backdrop-blur-sm">
        <div className={`transition-opacity duration-500 shrink-0 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-7 h-7 bg-[#c58158]/20 rounded flex items-center justify-center border border-[#c58158]/20">
            <Package size={14} className="text-[#c58158]" />
          </div>
        </div>
        <div className={`flex flex-col transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2">
            <span className="text-white text-[8px] font-black uppercase italic tracking-wider leading-none">Order Dispatch</span>
            <span className="text-[#c58158] text-[7px] font-bold uppercase opacity-60 tracking-widest">• {item.time}</span>
          </div>
          <p className="text-[#f4e4bc]/80 text-[9px] font-bold uppercase tracking-tight leading-tight mt-1 truncate">
            {item.city}, {item.state} secured <span className="text-[#d4af37]">{item.product}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Testimonials Data ---
const testimonials = [
  {
    name: "James T.",
    location: "Chicago, IL",
    text: "I've tried every drugstore saw palmetto bottle on the shelf. Zero results. Two weeks on PRESSURE and I'm finally sleeping through the night like I'm 20 again.",
    product: "PRESSURE",
    rating: 5
  },
  {
    name: "Robert M.",
    location: "Houston, TX",
    text: "System torque is back. Prime Time gave me that edge back in the bedroom and the gym. It's night and day compared to those mass-market fillers.",
    product: "PRIME TIME",
    rating: 5
  },
  {
    name: "Mike D.",
    location: "Phoenix, AZ",
    text: "My flow was like a leaky faucet. Now the pressure is actually back to professional standards. No more waking up 3 times a night to check the lines.",
    product: "PRESSURE",
    rating: 5
  },
  {
    name: "David L.",
    location: "Austin, TX",
    text: "The wife noticed the difference first. Everything is running smoother, harder, and longer. This kit is the real deal for anyone needing a performance overhaul.",
    product: "PRIME TIME",
    rating: 5
  },
  {
    name: "Thomas W.",
    location: "Jacksonville, FL",
    text: "Don't waste money on generic prostate support. I did that for a year with zero change. PRESSURE is the only formula that actually cleared the pipes.",
    product: "PRESSURE",
    rating: 5
  },
  {
    name: "Gary H.",
    location: "Denver, CO",
    text: "Reignited my energy levels. I was hitting the snooze button on life until I started the Prime Time protocol. Now I'm ready for the shift before it starts.",
    product: "PRIME TIME",
    rating: 5
  },
  {
    name: "Steven P.",
    location: "Nashville, TN",
    text: "Rock-solid reliability. I finally did an 8-hour shift in bed without a single trip to the bathroom. My sleep quality has completely transformed.",
    product: "PRESSURE",
    rating: 5
  },
  {
    name: "Mark S.",
    location: "Baltimore, MD",
    text: "Harder erections and way more drive. It feels like my internal engine got a complete overhaul. I feel pressurized and primed every morning.",
    product: "PRIME TIME",
    rating: 5
  },
  {
    name: "Paul R.",
    location: "Tucson, AZ",
    text: "I spent hundreds on 'natural' solutions that did nothing. Standardized extract is the secret. The flow is unstoppable now. Absolute industrial quality.",
    product: "PRESSURE",
    rating: 5
  },
  {
    name: "Anthony G.",
    location: "Atlanta, GA",
    text: "The OVERHAUL COMBO is the way to go. Flow is clear and the torque is high. No more apologies needed in the bedroom or on the job site.",
    product: "COMBO",
    rating: 5
  },
  {
    name: "Larry B.",
    location: "Miami, FL",
    text: "Nightly system checks are a thing of the past. One solid sleep, high pressure in the morning. Exactly what the specialist ordered for my pipes.",
    product: "PRESSURE",
    rating: 5
  },
  {
    name: "Kevin J.",
    location: "Las Vegas, NV",
    text: "Tried Nugenix and it felt like a placebo. Prime Time actually delivers the torque it promises. Harder, stronger, and more energy throughout the day.",
    product: "PRIME TIME",
    rating: 5
  }
];

// --- Discount Popup ---
const DiscountPopup = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = "https://f.convertkit.com/ckjs/ck.5.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-[#1a0f0a] border-[4px] border-[#c58158] shadow-[0_0_100px_rgba(197,129,88,0.3)] overflow-hidden rounded-sm p-1">
        <div className="bg-[#2a1b15] border border-[#c58158]/30 p-8 md:p-12 text-center relative overflow-hidden">
          <button onClick={onClose} className="absolute top-4 right-4 text-[#c58158] hover:text-[#d4af37] transition-colors p-2 z-10"><X /></button>
          
          <div className="relative z-10 space-y-6 text-center flex flex-col items-center">
            <div className="inline-block p-4 bg-[#c58158]/10 rounded-full">
              <Ticket className="w-12 h-12 text-[#d4af37] rotate-12" />
            </div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">WANT THE <span className="text-[#d4af37]">BEST DEALS?</span></h2>
            <p className="text-[#f4e4bc]/60 font-bold uppercase tracking-widest text-xs italic text-center">Join the dispatch list and take <span className="text-white">15% OFF</span> your next haul.</p>
            
            <form 
              action="https://app.kit.com/forms/9033723/subscriptions" 
              className="seva-form formkit-form space-y-4 w-full text-left" 
              method="post" 
              data-sv-form="9033723" 
              data-uid="6b0b0fa093" 
              data-format="inline" 
              data-version="5"
            >
              <div data-element="fields" className="seva-fields formkit-fields space-y-4 w-full">
                <div className="formkit-field relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c58158]">
                    <User size={16} />
                  </div>
                  <input 
                    className="formkit-input w-full bg-[#1a0f0a] border-2 border-[#c58158]/30 px-12 py-4 text-xs font-black tracking-widest text-white focus:outline-none focus:border-[#d4af37] italic" 
                    aria-label="First Name" 
                    name="fields[first_name]" 
                    placeholder="First Name" 
                    type="text" 
                  />
                </div>
                <div className="formkit-field relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c58158]">
                    <Mail size={16} />
                  </div>
                  <input 
                    className="formkit-input w-full bg-[#1a0f0a] border-2 border-[#c58158]/30 px-12 py-4 text-xs font-black tracking-widest text-white focus:outline-none focus:border-[#d4af37] italic" 
                    name="email_address" 
                    aria-label="Email Address" 
                    placeholder="Email Address" 
                    required 
                    type="email" 
                  />
                </div>
                <button 
                  data-element="submit" 
                  className="formkit-submit w-full bg-[#c58158] text-[#1a0f0a] py-5 font-black uppercase tracking-[0.3em] text-sm hover:bg-[#d4af37] shadow-[0_8px_0_#8c5a3d] active:translate-y-[8px] active:shadow-none italic transition-all relative"
                >
                  <div className="formkit-spinner hidden absolute inset-0 flex items-center justify-center"><div></div><div></div><div></div></div>
                  <span className="">Claim Discount</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ChatBot Component ---
const ChatBot = ({ messages, setMessages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const callGemini = async (userQuery, retryCount = 0) => {
    const userMsgCount = messages.filter(m => m.role === 'user').length + 1;
    
    let nudgeInstruction = "";
    if (userMsgCount % 2 === 0) {
       nudgeInstruction = "\n\nREQUIRED ACTION: Acting as the expert strategist, identify their 'leak' and recommend the correct part (PRESSURE, PRIME TIME, or OVERHAUL kit) to restore their system. Direct them to the Supply Depot.";
    }

    const systemPrompt = `You are the Lead Strategist for Mr. Plumber Man Nutrition. Tone: Professional tradesman, authoritative, helpful. Metaphors: Biology is plumbing (pipes, clogs, torque).

    STRICT RULE: MAXIMUM 2 SENTENCES PER RESPONSE. 

    KNOWLEDGE:
    - PRESSURE ($39): Fixes prostate clogs and nightly urination leaks using Standardized Saw Palmetto. Standardized extracts guarantee potency compared to mass raw powders.
    - PRIME TIME ($59): Restores testosterone torque with high-torque Magnesium Glycinate & Zinc Picolinate. Much more bioavailable than cheap Oxide fillers used in Nugenix.
    - OVERHAUL COMBO ($97): Total restoration kit. 
    - SHIPPING: Free express shipping sitewide.
    - SUBSCRIBE & SAVE: 5% discount on refills.
    
    MISSION: 
    1. Identify the 'leak' (Nightly urination trips vs Sexual performance).
    2. Edge them towards a purchase by acting as an expert fixing a system failure. 
    3. Instruct them to go to the Supply Depot. Never tell them to email.
    ${nudgeInstruction}
    
    FORMATTING:
    - PLAIN TEXT ONLY. No markdown, no bolding, no hashtags.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: userQuery }] }], systemInstruction: { parts: [{ text: systemPrompt }] } })
      });
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "System clog. Secure your kit at the Supply Depot.";
      return rawText.replace(/[#*_|]/g, '');
    } catch (e) {
      if (retryCount < 2) return callGemini(userQuery, retryCount + 1);
      return "Connection leak detected. Secure your order at the Supply Depot below.";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setMessages(p => [...p, { role: 'user', text: msg }]);
    setInput('');
    setIsLoading(true);
    const aiRes = await callGemini(msg);
    setMessages(p => [...p, { role: 'assistant', text: aiRes }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen ? (
        <div className="w-[320px] md:w-[380px] h-[500px] bg-[#1a0f0a] border-2 border-[#c58158]/50 rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 text-left">
          <div className="p-5 bg-[#2a1b15] border-b border-[#c58158]/20 flex justify-between items-center text-white font-black italic text-xs tracking-widest uppercase">
            <span>Flow Dispatch</span>
            <button onClick={() => setIsOpen(false)}><Minimize2 className="w-4 h-4" /></button>
          </div>
          <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-4 bg-[#1a0f0a]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-[#c58158] text-[#1a0f0a] font-bold' : 'bg-[#2a1b15] text-[#f4e4bc] border border-[#c58158]/10 shadow-md'}`}>{m.text}</div>
              </div>
            ))}
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#c58158] m-4" />}
          </div>
          <div className="p-4 bg-[#2a1b15] border-t border-[#c58158]/20 flex space-x-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Urination trips or performance torque?" className="flex-grow bg-[#1a0f0a] border border-[#c58158]/30 rounded-full px-4 py-2 text-xs text-white outline-none" />
            <button onClick={handleSend} className="p-2 bg-[#c58158] rounded-full text-[#1a0f0a] transition-transform hover:scale-110"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-14 h-14 bg-[#1a0f0a] border-2 border-[#c58158] rounded-full flex items-center justify-center shadow-2xl group relative transition-transform hover:scale-110">
          <div className="absolute inset-0 bg-[#c58158]/10 rounded-full animate-ping group-hover:animate-none" />
          <Wrench className="w-6 h-6 text-[#c58158]" />
        </button>
      )}
    </div>
  );
};

// --- Reusable Scroll Reveal ---
const ScrollReveal = ({ children }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => { if (ref.current) obs.unobserve(ref.current); };
  }, []);
  return <div ref={ref} className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>{children}</div>;
};

// --- Main App ---
const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: "Systems check. To get the right specs for your haul, tell me what's leaking: Are you dealing with nightly urination trips or a drop in sexual performance torque?" }
  ]);

  const teardownRef = useRef(null);
  const depotRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('mp_pop_v5')) { setShowPopup(true); sessionStorage.setItem('mp_pop_v5', 't'); }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const Header = () => (
    <nav className="fixed top-0 left-0 w-full z-[80] p-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center bg-[#2a1b15]/95 backdrop-blur-md border border-[#c58158]/30 rounded-full px-6 py-3 shadow-2xl">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Wrench size={18} className="text-[#c58158]" />
          <img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-6 md:h-7 w-auto object-contain" alt="Mr. Plumber Man" />
        </div>
        <div className="flex gap-6 items-center">
          <button onClick={() => scrollTo(teardownRef)} className="hidden sm:block text-[10px] font-black uppercase tracking-[0.3em] text-[#f4e4bc] hover:text-[#d4af37] transition">The Teardown</button>
          <button onClick={() => scrollTo(depotRef)} className="bg-[#c58158] text-[#1a0f0a] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-[#d4af37] transition italic">Supply Depot</button>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="bg-[#1a0f0a] text-[#f4e4bc] font-serif relative overflow-x-hidden min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20 overflow-hidden text-left">
        <div 
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
                backgroundImage: `url("https://images.travelprox.com/mrplumberman/herowall.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.25,
                maskImage: 'linear-gradient(to right, transparent 5%, black 95%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 95%)'
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f0a] via-transparent to-[#1a0f0a] z-10" />
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')] z-10" />

        <div className="max-w-6xl mx-auto relative z-20 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <ScrollReveal>
              <div className="flex flex-col items-center lg:items-start text-left">
                {/* Elevated Word Logo in Hero */}
                <div className="mb-8 animate-in slide-in-from-left duration-1000">
                  <img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-16 md:h-24 w-auto object-contain" alt="Mr. Plumber Man Nutrition" />
                </div>
                
                <div className="inline-flex items-center space-x-3 px-6 py-2 mb-8 text-[10px] font-black uppercase tracking-[0.5em] text-[#d4af37] border-y border-[#c58158]/30 italic">
                  <Award size={14} /><span>INDUSTRIAL-GRADE VITALITY</span>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] uppercase italic text-white drop-shadow-2xl text-left w-full">MASTER YOUR FLOW.</h1>
                
                <div className="space-y-4 max-w-xl text-left">
                  <p className="text-xl md:text-2xl text-[#f4e4bc]/70 leading-relaxed font-bold italic">Performance engineered for men who like everything running smoothly.</p>
                  <div className="flex items-center gap-2 justify-start text-[#d4af37]">
                    <Truck size={14} />
                    <p className="text-sm font-bold uppercase tracking-widest italic">All orders include free express shipping.</p>
                  </div>
                </div>
                
                <div className="mt-12 relative flex items-center justify-start">
                  <div className="absolute w-40 h-40 bg-[#d4af37]/20 blur-2xl rounded-full -z-10 animate-pulse"></div>
                  <button onClick={() => scrollTo(depotRef)} className="bg-[#c58158] text-[#1a0f0a] px-12 py-5 font-black uppercase tracking-[0.2em] shadow-[0_10px_0_#8c5a3d] hover:translate-y-[2px] active:translate-y-[8px] transition-all flex items-center gap-3 italic">
                    TURN THE PRESSURE UP <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="relative group lg:mt-0 mt-12">
            <ScrollReveal>
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] mx-auto max-w-[500px] border-8 border-[#3d291f] shadow-2xl overflow-hidden bg-[#2a1b15]">
                <img 
                  src="https://images.travelprox.com/mrplumberman/symbol.png" 
                  alt="Mr. Plumber Man Symbol" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-[2s] ease-out" 
                />
                <div className="absolute inset-0 border-[2px] border-[#c58158]/20 m-4 pointer-events-none"></div>
                <div className="absolute bottom-4 right-4 bg-[#1a0f0a] border-2 border-[#c58158]/40 p-4 rounded-md shadow-xl z-20 text-left">
                  <div className="flex flex-col gap-1 mb-2 text-xs font-bold uppercase tracking-widest">
                    <span className="text-white italic leading-none">PRESSURE</span>
                    <span className="text-[#d4af37] text-[10px] leading-none">Prostate Support</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 pt-1 text-left">
                    <span className="text-[#c58158] font-black text-lg leading-none">$39</span>
                    <button onClick={() => scrollTo(depotRef)} className="bg-[#c58158] text-[#1a0f0a] px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest italic hover:bg-[#d4af37]">Shop Now</button>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent z-10 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4af37] italic">"Fix Your Flow Like A Pro"</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30 cursor-pointer z-30" onClick={() => scrollTo(teardownRef)}>
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Blueprint Teardown */}
      <section ref={teardownRef} className="px-6 py-24 md:py-40 bg-[#1a0f0a]">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto text-left">
            <div className="mb-16 space-y-6 text-center">
              <h2 className="text-xs font-black uppercase tracking-[0.6em] text-[#c58158] font-black text-center">Blueprint Analysis</h2>
              <h3 className="text-5xl md:text-9xl font-black tracking-tighter uppercase mb-8 leading-none italic text-white text-center">SYSTEM <span className="text-[#d4af37]">TEARDOWN</span>.</h3>
              <p className="text-[#f4e4bc]/50 text-xl md:text-2xl font-bold max-w-3xl leading-relaxed italic uppercase tracking-widest mx-auto text-center">Nugenix built recognition. Mr. Plumber Man builds results. Engineering always wins over advertising.</p>
            </div>
            <div className="grid grid-cols-4 w-full mb-4 px-10 text-[10px] uppercase tracking-widest text-[#c58158]/60 font-black hidden lg:grid">
              <span>Formula Type</span>
              <span>Mineral Form</span>
              <span>Herbal Standardization</span>
              <span>Dose Strength</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-stretch relative">
              <div className="bg-[#2a1b15]/40 p-10 md:p-14 border-2 border-[#c58158]/10 relative z-10 shadow-lg group grayscale opacity-85 hover:opacity-100 transition-all duration-500 text-right">
                <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest text-[#c58158]/60 text-left">Mass Market Formula</div>
                <h4 className="text-xl font-black text-[#c58158] mb-12 flex items-center uppercase tracking-[0.2em] italic opacity-50 justify-end"><XCircle className="w-6 h-6 mr-3 text-red-900" /> NUGENIX TOTAL-T</h4>
                <div className="space-y-8 italic">
                  {[
                    { l: "Price Comparison", v: "$79+ (Retail Bloat)" },
                    { l: "Magnesium Form", v: "Oxide (Gastro Filler)" },
                    { l: "Zinc Form", v: "Oxide (Low Absorption)" },
                    { l: "Tongkat Ali", v: "50mg Raw Root Powder" },
                    { l: "Saw Palmetto", v: "50mg Raw Berries" },
                    { l: "Extract Type", v: "Non-Standardized" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-[#c58158]/10 pb-4 text-right">
                      <p className="text-[10px] text-[#c58158]/60 uppercase font-black tracking-widest text-left">{row.l}</p>
                      <p className="text-sm text-[#f4e4bc]/40 font-bold uppercase text-right">{row.v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative bg-[#1a0f0a] p-10 md:p-14 border-[3px] border-[#c58158] shadow-[0_0_100px_rgba(197,129,88,0.15)] z-20 overflow-hidden text-right">
                <h4 className="text-xl font-black text-white mb-12 flex items-center relative z-10 uppercase tracking-[0.2em] italic justify-end text-right"><ShieldCheck className="w-6 h-6 mr-3 text-[#d4af37]" /> MR. PLUMBER MAN</h4>
                <div className="space-y-8 relative z-10 italic">
                  {[
                    { l: "Price Comparison", v: "$59 (Direct Value)" },
                    { l: "Magnesium Form", v: "Glycinate (High Torque)" },
                    { l: "Zinc Form", v: "Picolinate (Bioavailable)" },
                    { l: "Tongkat Ali", v: "200mg Standardized" },
                    { l: "Saw Palmetto", v: "100mg Standardized" },
                    { l: "Extract Type", v: "Potency Guaranteed" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-[#c58158]/20 pb-4 text-right">
                      <p className="text-[10px] text-[#d4af37] uppercase font-black tracking-widest text-left">{row.l}</p>
                      <p className="text-sm text-white font-black uppercase text-right">{row.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="px-6 py-24 md:py-32 bg-[#140b08] border-y border-[#c58158]/10 text-left">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 space-y-4">
               <h2 className="text-[#c58158] font-black uppercase tracking-[0.5em] text-xs underline decoration-1 text-center">Verified Logistics</h2>
               <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none text-center">THE <span className="text-[#d4af37]">TESTIMONIAL</span> DEPT</h1>
               <p className="text-[#f4e4bc]/50 font-bold uppercase tracking-widest italic text-center">Real results from tradesmen in the field.</p>
            </div>
            
            <div className="flex flex-col gap-12">
               {/* Shift 1: Testimonials 1-4 */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {testimonials.slice(0, 4).map((t, idx) => (
                   <TestimonialCard key={idx} testimonial={t} />
                 ))}
               </div>

               {/* Famous Quote 1 */}
               <div className="py-12 border-y-2 border-[#c58158]/20 relative overflow-hidden bg-[#2a1b15]/20 px-8">
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }}></div>
                  <div className="max-w-4xl mx-auto text-center relative z-10">
                     <Quote className="text-[#d4af37] w-10 h-10 mx-auto mb-6 opacity-40" />
                     <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-[0.95] mb-6 text-center">"Take care of your body. It's the only place you have to live."</h2>
                     <p className="text-[#c58158] font-black uppercase tracking-[0.4em] text-xs text-center">— Jim Rohn, Vitality Strategist</p>
                  </div>
               </div>

               {/* Shift 2: Testimonials 5-8 */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {testimonials.slice(4, 8).map((t, idx) => (
                   <TestimonialCard key={idx} testimonial={t} />
                 ))}
               </div>

               {/* Cheeky Quote 2 */}
               <div className="py-12 border-y-2 border-[#c58158]/20 relative overflow-hidden bg-[#2a1b15]/20 px-8">
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/carbon-fibre.png")` }}></div>
                  <div className="max-w-4xl mx-auto text-center relative z-10">
                     <Quote className="text-[#d4af37] w-10 h-10 mx-auto mb-6 opacity-40" />
                     <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-[#d4af37] leading-[0.95] mb-6 text-center">"Clear pipes and high torque. Because a man's performance shouldn't have a 'Closed for Maintenance' sign."</h2>
                     <p className="text-white font-black uppercase tracking-[0.4em] text-xs text-center">— The Plumber's Secret to Domestic Harmony</p>
                  </div>
               </div>

               {/* Shift 3: Testimonials 9-12 */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {testimonials.slice(8, 12).map((t, idx) => (
                   <TestimonialCard key={idx} testimonial={t} />
                 ))}
               </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Proof Strip */}
      <section className="bg-[#1a0f0a] py-12 border-y border-[#c58158]/10 text-center">
        <div className="max-w-6xl mx-auto px-6 italic">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            <div className="flex flex-col items-center gap-3">
              <Star className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#f4e4bc]/70">Trusted by thousands</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#c58158]" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#f4e4bc]/70">Bioavailable mineral forms</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FlaskConical className="w-5 h-5 text-[#d4af37]" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#f4e4bc]/70">Standardized extracts</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Package className="w-5 h-5 text-[#c58158]" />
              <span className="text-[10px] uppercase tracking-widest font-black text-[#f4e4bc]/70">Fast shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade CTA Bar */}
      <section className="bg-[#1a0f0a] py-24 px-6 border-b border-[#c58158]/10 text-center">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tighter leading-none text-center">STOP BUYING POWDERED FILLER. <br /><span className="text-[#c58158]">UPGRADE YOUR SYSTEM.</span></h2>
            <button onClick={() => scrollTo(depotRef)} className="bg-[#c58158] text-[#1a0f0a] px-12 py-5 font-black uppercase tracking-[0.2em] shadow-[0_10px_0_#8c5a3d] hover:translate-y-[2px] active:translate-y-[8px] transition-all mx-auto text-center flex justify-center items-center">Shop The Supply Depot</button>
          </div>
        </ScrollReveal>
      </section>

      {/* Supply Depot */}
      <section ref={depotRef} className="px-6 py-24 md:py-32 bg-[#140b08] text-center">
       <div className="max-w-7xl mx-auto italic">
          <ScrollReveal>
            <div className="mb-20 space-y-4 text-center">
               <h2 className="text-[#c58158] font-black uppercase tracking-[0.5em] text-xs underline decoration-1 text-center">Supply Inventory</h2>
               <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none text-center">THE <span className="text-[#d4af37]">SUPPLY</span> DEPOT</h1>
               <div className="flex items-center gap-2 justify-center text-[#d4af37] animate-pulse">
                 <Truck size={16} />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">All orders include free express shipping</span>
               </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { id: 'p', name: "PRESSURE", sub: "Prostate Support", price: 39, imgOverride: "https://images.travelprox.com/mrplumberman/pressure.png", desc: "Clear the lines and restore factory-spec flow rate." },
                 { id: 't', name: "PRIME TIME", sub: "T-Formula", price: 59, imgOverride: "https://images.travelprox.com/mrplumberman/primeheat.png", desc: "High-torque energy and maximum drive restoration." },
                 { id: 'c', name: "THE OVERHAUL", sub: "Combo Pack", price: 97, imgOverride: "https://images.travelprox.com/mrplumberman/symbol.png", desc: "The ultimate blueprint. Secure both formulas for total system performance.", tag: "Best Value" }
               ].map(p => (
                 <div key={p.id} className="bg-[#2a1b15]/40 border-2 border-[#c58158]/20 p-8 hover:border-[#d4af37] transition duration-500 flex flex-col items-center group rounded-sm shadow-2xl relative overflow-hidden text-center">
                    {p.tag && (
                      <div className="absolute top-4 left-[-30px] bg-[#d4af37] text-[#1a0f0a] px-10 py-1 text-[8px] font-black uppercase tracking-widest -rotate-45 shadow-lg">
                        {p.tag}
                      </div>
                    )}
                    <div className="w-full aspect-square bg-[#1a0f0a] border border-[#c58158]/20 mb-8 flex items-center justify-center relative shadow-inner overflow-hidden">
                       <img src={p.imgOverride} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase mb-2 leading-none text-center">{p.name}</h3>
                    <p className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[9px] mb-4 text-center">{p.sub}</p>
                    <p className="text-[#f4e4bc]/50 font-bold uppercase tracking-widest text-xs mb-8 italic leading-relaxed h-12 text-center">{p.desc}</p>
                    
                    <div className="mt-auto w-full space-y-4 pt-6 border-t border-[#c58158]/20 text-center">
                       <div className="flex flex-col items-center gap-1 text-center">
                          <p className="text-3xl font-black italic text-white">${p.price}</p>
                          <span className="text-[8px] text-[#c58158] font-black uppercase tracking-widest">Free Express Shipping</span>
                       </div>
                       <div className="space-y-3">
                         <button className="w-full bg-[#c58158] text-[#1a0f0a] py-4 font-black uppercase tracking-widest text-xs hover:bg-[#d4af37] shadow-[0_6px_0_#8c5a3d] active:translate-y-[6px] transition-all">Add To Kit</button>
                         <button className="w-full border border-[#c58158]/40 bg-transparent text-[#d4af37] py-2 font-black uppercase tracking-[0.3em] text-[9px] hover:bg-[#c58158]/10 transition-all italic flex items-center justify-center gap-2">
                           <RefreshCcw size={10} /> Subscribe & Save 5%
                         </button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </ScrollReveal>
       </div>
      </section>

      <footer className="bg-[#0f0a08] py-20 px-6 text-center italic border-t border-[#c58158]/10 text-center">
         <div className="max-w-5xl mx-auto space-y-10 flex flex-col items-center">
            <div className="opacity-40 grayscale hover:opacity-100 transition-opacity mb-4">
              <img src="https://images.travelprox.com/mrplumberman/plumlogo.png" className="h-10 w-auto" alt="Mr. Plumber Man Logo" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c58158]/30 leading-relaxed max-w-2xl mx-auto italic text-center">
               * These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Comparison based on available label specifications. Nugenix Total-T is a registered trademark of its respective owner.
            </p>
         </div>
      </footer>

      {/* Floating UI */}
      <PurchasePill />
      <ChatBot messages={chatMessages} setMessages={setChatMessages} />
      <DiscountPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

// --- Sub-component for individual Testimonial Cards ---
const TestimonialCard = ({ testimonial }) => (
  <div className="bg-[#2a1b15]/40 border-2 border-[#c58158]/20 p-8 flex flex-col hover:border-[#d4af37] transition duration-300 relative rounded-sm shadow-xl h-full text-left">
    <div className="absolute top-4 right-4 opacity-10"><Quote size={40} className="text-[#c58158]" /></div>
    <div className="flex gap-1 mb-6">
      {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={14} className="fill-[#d4af37] text-[#d4af37]" />)}
    </div>
    <p className="text-[#f4e4bc] font-bold italic leading-relaxed text-sm mb-8 relative z-10">"{testimonial.text}"</p>
    <div className="mt-auto border-t border-[#c58158]/10 pt-6">
      <p className="text-[#d4af37] font-black uppercase tracking-widest text-xs italic">{testimonial.name}</p>
      <div className="flex justify-between items-center mt-1 text-left">
        <p className="text-[#c58158]/60 font-bold uppercase text-[9px] tracking-widest">{testimonial.location}</p>
        <span className="text-[8px] font-black bg-[#c58158]/10 px-2 py-0.5 border border-[#c58158]/20 text-[#c58158] rounded-full">{testimonial.product}</span>
      </div>
    </div>
  </div>
);

const GenerateImage = ({ prompt, hero = false }) => {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchImg = async () => {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ instances: { prompt }, parameters: { sampleCount: 1 } })
        });
        const data = await res.json();
        if (data.predictions?.[0]?.bytesBase64Encoded) setUrl(`data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchImg();
  }, [prompt]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full bg-[#1a0f0a] p-8 text-center text-center">
      <Loader2 className="animate-spin text-[#c58158] mb-2" size={hero ? 40 : 24} />
      <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#c58158]/40 italic">Assembling Schematic...</span>
    </div>
  );

  return url ? (
    <img src={url} alt="Brand Asset" className={`w-full h-full ${hero ? 'object-cover' : 'object-contain mix-blend-screen'} group-hover:scale-105 transition duration-[2s] ease-out`} />
  ) : (
    <div className="flex items-center justify-center h-full"><Package className="text-[#c58158]/20" size={hero ? 60 : 32} /></div>
  );
};

export default App;
