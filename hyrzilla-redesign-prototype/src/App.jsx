import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronRight, CircleHelp, FileText, Handshake, Menu, MessageCircle, Moon, Search, Send, Sparkles, Sun, X } from 'lucide-react';
import { supabase } from './lib/supabase';

const businessEmail = import.meta.env.VITE_HYRZILLA_CONTACT_EMAIL?.trim();
const inquiryFunctionEnabled = import.meta.env.VITE_INQUIRY_FUNCTION_ENABLED === 'true';
const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim();
const emailHref = (subject) => businessEmail ? `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}` : null;

const plans = [
  { slug: 'starter', name: 'Starter Strategy', upfront: '$500', fee: '14%', audience: 'Early-career and focused searches', features: ['ATS-ready master résumé', 'Search strategy intake', 'Up to 50 managed applications', 'Application tracker', 'Interview coordination support'] },
  { slug: 'professional', name: 'Professional Core', upfront: '$1,000', fee: '12%', audience: 'Professionals building search momentum', popular: true, features: ['Everything in Starter', 'Up to 150 tailored applications', 'LinkedIn profile optimization', 'Two cover-letter variants', 'Interview preparation session'] },
  { slug: 'elite', name: 'Elite Search Partner', upfront: '$1,800', fee: '10%', audience: 'Senior and specialist technical searches', features: ['Everything in Professional', 'Up to 300 tailored applications', 'Dedicated search coordinator', 'Recruiter-message coordination', 'Mock behavioral interview', '8-month restart support with no new upfront fee'] },
  { slug: 'executive', name: 'Executive Concierge', upfront: '$3,000', fee: '10%', audience: 'Directors, VPs, and executive searches', features: ['Everything in Elite', '90-day high-touch scope', 'Multi-channel role research', 'Hiring-manager outreach support', 'Offer and contract strategy', '8-month restart support with no new upfront fee'] },
];

const professionalServices = [
  ['Career positioning', 'Tell a clear, credible story about the work you have already done.', 'Résumé rebuild, LinkedIn positioning, ATS alignment, and target-role clarity.'],
  ['Managed search', 'Keep the right opportunities moving without turning your search into a second full-time job.', 'Role sourcing, tailored applications, tracker visibility, and search coordination.'],
  ['Interview readiness', 'Prepare for the conversations that materially change your options.', 'Behavioral preparation, practical interview practice, feedback, and follow-up strategy.'],
  ['Offer strategy', 'Assess the full offer, then make your decision with context.', 'Compensation context, negotiation preparation, and transition support.'],
];

const employerServices = [
  ['Role discovery', 'Turn the role, team, location, and success measures into a clear brief.', 'Hiring priorities, compensation context, timeline, and interview approach.'],
  ['Targeted sourcing', 'Focus the search on relevant professionals instead of a volume-first shortlist.', 'Market mapping, outreach support, and fit-led profile review.'],
  ['Thoughtful introductions', 'Share profiles with consent and enough context for a useful first conversation.', 'Professional profiles, interview coordination, and feedback rhythm.'],
  ['Placement support', 'Keep the process clear through offer, acceptance, and start.', 'Practical coordination and the agreed placement process.'],
];

const insights = [
  { category: 'For Professionals', time: '5 min read', title: 'A job search is a system, not a sprint', excerpt: 'How positioning, opportunity selection, and preparation reinforce one another when the stakes are high.' },
  { category: 'For Employers', time: '4 min read', title: 'What a useful role brief actually includes', excerpt: 'The context that helps a recruitment conversation begin with fewer assumptions and better signal.' },
  { category: 'For Professionals', time: '6 min read', title: 'Activity is not the same as momentum', excerpt: 'A better way to review a search without relying on promises that no one can control.' },
  { category: 'Hyrzilla Updates', time: '3 min read', title: 'Why Hyrzilla starts with clarity', excerpt: 'The operating principle behind a more deliberate career and recruitment experience.' },
  { category: 'For Employers', time: '5 min read', title: 'A better shortlist begins before sourcing', excerpt: 'Why role clarity, consent, and feedback make introductions more useful for everyone.' },
  { category: 'Hyrzilla Updates', time: '4 min read', title: 'Building human-led recruitment support', excerpt: 'Where technology helps the work—and where people should remain at the centre.' },
];

const metadata = {
  '/': ['Hyrzilla — Clearer signal. Better next moves.', 'Human-led career strategy and recruitment partnerships for professionals and employers.'],
  '/professionals': ['For Professionals | Hyrzilla', 'Career positioning, managed search, interview readiness, and offer strategy.'],
  '/employers': ['For Employers | Hyrzilla', 'A considered recruitment partnership from role brief to start date.'],
  '/pricing': ['Pricing | Hyrzilla', 'Four clear Hyrzilla professional programs, all priced in USD.'],
  '/insights': ['Insights | Hyrzilla', 'Thoughtful notes for professionals and employers making high-stakes decisions.'],
  '/about': ['About Hyrzilla', 'Why Hyrzilla is building a more deliberate recruitment experience.'],
  '/contact': ['Start a conversation | Hyrzilla', 'Share context for a useful human follow-up.'],
  '/privacy': ['Privacy Policy | Hyrzilla', 'Hyrzilla privacy policy framework pending legal review.'],
  '/terms': ['Terms & Conditions | Hyrzilla', 'Hyrzilla terms and conditions framework pending legal review.'],
};

function useRoute() {
  const current = () => `${window.location.pathname || '/'}${window.location.search}`;
  const [route, setRoute] = useState(current);
  useEffect(() => { const pop = () => setRoute(current()); window.addEventListener('popstate', pop); return () => window.removeEventListener('popstate', pop); }, []);
  const go = (to) => { window.history.pushState({}, '', to); setRoute(current()); window.scrollTo({ top: 0, behavior: 'auto' }); };
  return [route, go];
}

function useReveal(route) {
  useEffect(() => {
    const nodes = [...document.querySelectorAll('.reveal')];
    if (!('IntersectionObserver' in window)) { nodes.forEach((node) => node.classList.add('is-visible')); return undefined; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [route]);
}

function App() {
  const [route, go] = useRoute();
  const path = route.split('?')[0];
  const [dark, setDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  useReveal(route);
  useEffect(() => { const [title, description] = metadata[path] || ['Hyrzilla', 'Human-led career strategy and recruitment partnerships.']; document.title = title; const meta = document.querySelector('meta[name="description"]'); if (meta) meta.setAttribute('content', description); }, [path]);
  const navigate = (to) => { setMobileOpen(false); go(to); };
  const page = path === '/' ? <Home go={navigate} />
    : path === '/professionals' || path === '/candidates' || path.startsWith('/candidates/') ? <ProfessionalsPage go={navigate} />
    : path === '/employers' || path === '/hiring-teams' || path.startsWith('/hiring-teams/') ? <EmployersPage go={navigate} />
    : path === '/pricing' ? <PricingPage go={navigate} />
    : path === '/insights' ? <InsightsPage />
    : path === '/about' ? <AboutPage go={navigate} />
    : path === '/contact' ? <ContactPage go={navigate} route={route} />
    : path === '/privacy' ? <LegalPage type="privacy" go={navigate} />
    : path === '/terms' ? <LegalPage type="terms" go={navigate} />
    : path === '/agreements/professional' ? <AgreementPage type="professional" go={navigate} />
    : path === '/agreements/employer' ? <AgreementPage type="employer" go={navigate} />
    : <NotFound go={navigate} />;
  return <main className={dark ? 'app dark' : 'app'}>
    <div className="announcement"><Sparkles size={14}/> Clear scope. Human support. <button onClick={() => navigate('/contact')}>Start a conversation <ArrowRight size={13}/></button></div>
    <Header go={navigate} path={path} dark={dark} setDark={setDark} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
    {page}
    <Footer go={navigate}/>
    <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
    <div className="chat">{chatOpen && <div className="chat-panel"><div><span>H</span><b>Hyrzilla guide</b><button aria-label="Close guide" onClick={() => setChatOpen(false)}><X size={16}/></button></div><p>Choose the path that fits your next decision.</p><button onClick={() => navigate('/professionals')}>I am planning a career move</button><button onClick={() => navigate('/employers')}>I am planning a hire</button></div>}<button className="chat-launch" onClick={() => setChatOpen(!chatOpen)} aria-expanded={chatOpen}><MessageCircle size={18}/><span>Ask Hyrzilla</span></button></div>
  </main>;
}

function Header({ go, path, dark, setDark, mobileOpen, setMobileOpen }) {
  const [open, setOpen] = useState(null);
  const headerRef = useRef(null);
  const activeProfessional = path === '/professionals' || path.startsWith('/candidates');
  const activeEmployer = path === '/employers' || path.startsWith('/hiring-teams');
  const menus = [
    { key: 'professionals', label: 'For Professionals', path: '/professionals', active: activeProfessional, links: [['Overview', '/professionals'], ['Services', '/professionals#services'], ['How it works', '/professionals#process'], ['Pricing', '/pricing'], ['FAQs', '/professionals#faq']] },
    { key: 'employers', label: 'For Employers', path: '/employers', active: activeEmployer, links: [['Overview', '/employers'], ['Services', '/employers#services'], ['How it works', '/employers#process'], ['Partnership principles', '/employers#partnership'], ['FAQs', '/employers#faq']] },
  ];
  const navigate = (to) => { setOpen(null); const [nextPath, hash] = to.split('#'); go(nextPath); if (hash) window.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30); };
  useEffect(() => { const outside = (event) => { if (!headerRef.current?.contains(event.target)) setOpen(null); }; const escape = (event) => { if (event.key === 'Escape') { setOpen(null); setMobileOpen(false); } }; document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape); return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); }; }, [setMobileOpen]);
  return <header ref={headerRef} className="site-header"><nav className="nav"><button className="brand" onClick={() => navigate('/')} aria-label="Hyrzilla home"><span>H</span>Hyrzilla</button><div className="desktop-nav"><button className={path === '/' ? 'active' : ''} onClick={() => navigate('/')}>Home</button>{menus.map((menu) => <div className="nav-menu" key={menu.key}><button className={menu.active ? 'active' : ''} aria-expanded={open === menu.key} onClick={() => setOpen(open === menu.key ? null : menu.key)} onMouseEnter={() => setOpen(menu.key)}>{menu.label}<ChevronDown size={14}/></button>{open === menu.key && <div className="dropdown" onMouseLeave={() => setOpen(null)}>{menu.links.map(([label, to]) => <button key={label} onClick={() => navigate(to)}>{label}<ChevronRight size={14}/></button>)}</div>}</div>)}<button className={path === '/pricing' ? 'active' : ''} onClick={() => navigate('/pricing')}>Pricing</button><button className={path === '/insights' ? 'active' : ''} onClick={() => navigate('/insights')}>Insights</button><button className={path === '/about' ? 'active' : ''} onClick={() => navigate('/about')}>About Us</button></div><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">{dark ? <Sun size={16}/> : <Moon size={16}/>}</button><button className="nav-cta" onClick={() => navigate('/contact')}>Start a conversation <ArrowRight size={15}/></button><button className="menu-button" aria-label="Toggle menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X/> : <Menu/>}</button>{mobileOpen && <div className="mobile-nav"><button onClick={() => navigate('/')}>Home</button><b>For Professionals</b>{menus[0].links.map(([label, to]) => <button key={label} onClick={() => navigate(to)}>{label}</button>)}<b>For Employers</b>{menus[1].links.map(([label, to]) => <button key={label} onClick={() => navigate(to)}>{label}</button>)}<button onClick={() => navigate('/pricing')}>Pricing</button><button onClick={() => navigate('/insights')}>Insights</button><button onClick={() => navigate('/about')}>About Us</button><button className="mobile-cta" onClick={() => navigate('/contact')}>Start a conversation</button></div>}</nav></header>;
}

function Home({ go }) { return <>
  <section className="hero"><div className="hero-copy reveal"><p className="eyebrow"><span/> Human-led job-search support</p><h1>Your job search,<br/><em>with a team behind it.</em></h1><p>Hyrzilla helps professionals shape their story, manage a focused search, prepare for interviews, and assess offers with clear support at every step.</p><div className="hero-actions"><button className="button primary" onClick={() => go('/professionals')}>Explore support and pricing <ArrowRight size={17}/></button><button className="button ghost" onClick={() => go('/employers')}>For employers <ArrowRight size={17}/></button></div><div className="hero-note"><i/> Clear scope before work begins. No job or interview outcome is promised.</div></div><SupportPanel/></section>
  <section className="section sage reveal"><SectionLabel number="01">IS HYRZILLA RIGHT FOR YOU?</SectionLabel><p className="section-intro">Hyrzilla is for professionals who want practical, hands-on support—not a generic job board or a promise that someone else can control the outcome.</p><div className="fit-grid"><article><span>GOOD FIT</span><h2>You want a clearer search.</h2><p>You have a target direction, but need help turning it into a well-positioned, organised search.</p></article><article><span>GOOD FIT</span><h2>You value preparation.</h2><p>You want thoughtful support for your résumé, applications, interviews, and offer decisions.</p></article><article><span>NOT A FIT</span><h2>You want a guaranteed offer.</h2><p>No ethical recruitment partner can promise interviews, an offer, a salary, or an exact timeline.</p></article></div></section>
  <section className="split-choices reveal"><article><p className="eyebrow"><span/> For professionals</p><h2>A more deliberate<br/><em>career search.</em></h2><p>Positioning, search coordination, interview preparation, and offer strategy—one clear path.</p><button className="text-link" onClick={() => go('/professionals')}>Explore professional support <ArrowRight size={16}/></button></article><article><p className="eyebrow"><span/> For employers</p><h2>Hiring that begins<br/><em>with context.</em></h2><p>Role clarity, purposeful introductions, and a transparent agreement before work begins.</p><button className="text-link" onClick={() => go('/employers')}>Explore employer support <ArrowRight size={16}/></button></article></section>
  <section className="proof-band reveal"><p>HOW HYRZILLA OPERATES</p><div><b>01</b><span>Clear scope and fees</span></div><div><b>02</b><span>Agreement before work</span></div><div><b>03</b><span>Human communication</span></div></section>
</>; }

function ProfessionalsPage({ go }) { return <>
  <PageHero eyebrow="FOR PROFESSIONALS" title={<>A career move with <em>more direction.</em></>} text="Hands-on support for the work around a job search: your positioning, applications, interviews, and offer decisions. You stay in control of the important choices." cta="Explore support and pricing" onCta={() => go('/pricing')} aside={<SignalPanel label="YOUR SEARCH, MADE CLEAR" rows={['Positioning → focus', 'Search → visibility', 'Preparation → readiness']}/>}/>
  <section className="section ink reveal"><SectionLabel number="01">WHO THIS HELPS</SectionLabel><p className="section-intro light">Choose Hyrzilla when you want a structured search and a clear partner—not an automated job board or a guarantee that someone else controls.</p><div className="trust-strip"><span>Clear responsibilities</span><span>Agreement before work</span><span>You approve key decisions</span></div></section>
  <section id="services" className="section sage reveal"><SectionLabel number="02">PROFESSIONAL SERVICES</SectionLabel><p className="section-intro">Each service has a simple purpose: help you present your work clearly, pursue the right roles, and feel prepared for each decision.</p><ServiceGrid items={professionalServices}/></section>
  <section id="process" className="section ink reveal"><SectionLabel number="03">HOW IT WORKS</SectionLabel><Process steps={[['Share your context', 'Tell us about target roles, experience, location, salary goals, and constraints.'], ['Confirm the scope', 'Review the selected program, your responsibilities, and the placement-fee terms.'], ['Receive your agreement', 'Hyrzilla sends a formal agreement PDF for signature before onboarding begins.'], ['Build and run the search', 'Create the foundation, keep agreed activity visible, and stay in control of key decisions.'], ['Prepare and decide', 'Get ready for interviews, assess offers, and move forward with context.']]}/><div className="callout"><CircleHelp size={18}/><p>Hyrzilla can commit to the agreed work and communication. Interview invitations, offers, and hiring decisions remain outside our control.</p></div></section>
  <section className="section sage reveal"><SectionLabel number="04">FEES, BEFORE YOU DECIDE</SectionLabel><div className="clarity-grid"><InfoCard title="Upfront investment" body="Your selected program’s upfront fee and payment timing are confirmed in writing before work begins."/><InfoCard title="Placement fee" body="The published percentage applies only after the qualifying job-start trigger set out in your signed agreement."/><InfoCard title="Restart support" body="Elite Search Partner and Executive Concierge include the published 8-month restart support without a new upfront fee."/></div><div className="action-row"><button className="button primary" onClick={() => go('/pricing')}>View programs and pricing <ArrowRight size={17}/></button></div></section>
  <section id="faq" className="section ink reveal"><FAQ type="professional" number="05"/><div className="action-row"><button className="button primary" onClick={() => go('/contact')}>Start a conversation <ArrowRight size={16}/></button><button className="text-link light" onClick={() => go('/agreements/professional')}>Read agreement template <FileText size={16}/></button></div></section>
</>; }

function EmployersPage({ go }) { return <>
  <PageHero eyebrow="FOR EMPLOYERS" title={<>Recruitment with <em>more context.</em></>} text="For roles across the US and Canada, Hyrzilla starts with your role brief, aligns scope in writing, and introduces relevant professionals with permission." cta="Share a role brief" onCta={() => go('/contact?audience=employer')} aside={<SignalPanel label="PARTNERSHIP SIGNAL" rows={['Role brief → alignment', 'Agreement → trust', 'Introduction → momentum']}/>}/>
  <section id="services" className="section sage reveal"><SectionLabel number="01">EMPLOYER SERVICES</SectionLabel><p className="section-intro">A considered recruitment partnership has four practical parts. Each is clear before the work begins.</p><ServiceGrid items={employerServices}/></section>
  <section id="process" className="section ink reveal"><SectionLabel number="02">HOW IT WORKS</SectionLabel><Process steps={[['Share a role brief', 'Set the role, team, location, compensation context, timeline, and what success looks like.'], ['Confirm the partnership', 'Agree the scope, introduction rules, commercial terms, and communication rhythm.'], ['Receive your agreement', 'Hyrzilla sends a formal agreement PDF to both parties for signature before recruitment work begins.'], ['Meet aligned professionals', 'Review introductions made with permission and coordinate the next conversation.'], ['Support the start', 'Complete the agreed placement process when an introduced professional starts.']]}/><div className="callout"><Handshake size={18}/><p>No hire is guaranteed. Employers make all selection, compensation, and employment decisions independently.</p></div></section>
  <section id="partnership" className="section sage reveal"><SectionLabel number="03">PARTNERSHIP PRINCIPLES</SectionLabel><div className="principles"><InfoCard title="Signed before work" body="The service agreement is signed before sourcing, recruitment work, or introductions begin."/><InfoCard title="Purposeful introductions" body="Profiles are shared with appropriate permission and a defined hiring purpose."/><InfoCard title="Clear start-date trigger" body="The placement fee follows the agreed commercial terms when an introduced professional starts."/></div></section>
  <section id="faq" className="section ink reveal"><FAQ type="employer"/><div className="action-row"><button className="button primary" onClick={() => go('/contact?audience=employer')}>Share a role brief <ArrowRight size={16}/></button><button className="text-link light" onClick={() => go('/agreements/employer')}>Read agreement template <FileText size={16}/></button></div></section>
</>; }

function PricingPage({ go }) { return <><PageHero eyebrow="PRICING" title={<>Clear scope.<br/><em>Real support.</em></>} text="All prices are in USD. Each program combines an upfront investment with a placement fee triggered after a qualifying job start, subject to the signed agreement." cta="Start a conversation" onCta={() => go('/contact')} /><section className="section sage reveal"><SectionLabel number="01">CHOOSE YOUR PROGRAM</SectionLabel><div className="price-grid">{plans.map((plan, index) => <article key={plan.slug} className={plan.popular ? 'price-card featured' : 'price-card'}>{plan.popular && <span className="popular">MOST CHOSEN</span>}<span className="tier">PROGRAM 0{index + 1}</span><h2>{plan.name}</h2><p>{plan.audience}</p><div className="price"><b>{plan.upfront}</b><span>upfront investment</span><small>+ {plan.fee} placement fee after job start</small></div><ul>{plan.features.map((feature) => <li key={feature}><Check size={14}/>{feature}</li>)}</ul><button className="text-link" onClick={() => go(`/contact?plan=${plan.slug}`)}>Discuss this program <ArrowRight size={15}/></button></article>)}</div></section><section className="section ink reveal"><SectionLabel number="02">COMPARE THE SCOPE</SectionLabel><div className="comparison-wrap"><table><thead><tr><th>Support area</th>{plans.map((plan) => <th key={plan.slug}>{plan.name}</th>)}</tr></thead><tbody><tr><td>Upfront investment</td>{plans.map((plan) => <td key={plan.slug}>{plan.upfront}</td>)}</tr><tr><td>Placement fee</td>{plans.map((plan) => <td key={plan.slug}>{plan.fee}</td>)}</tr><tr><td>Managed applications</td><td>Up to 50</td><td>Up to 150</td><td>Up to 300</td><td>90-day high-touch scope</td></tr><tr><td>Interview preparation</td><td>Coordination support</td><td>Preparation session</td><td>Mock behavioral interview</td><td>Offer and contract strategy</td></tr><tr><td>Restart support</td><td>—</td><td>—</td><td>8 months</td><td>8 months</td></tr></tbody></table></div></section><section className="section sage reveal"><FAQ type="pricing"/><div className="action-row"><button className="button primary" onClick={() => go('/contact')}>Discuss your next move <ArrowRight size={16}/></button></div></section></>; }

function InsightsPage() { const [category, setCategory] = useState('All'); const [query, setQuery] = useState(''); const categories = ['All', 'For Professionals', 'For Employers', 'Hyrzilla Updates']; const filtered = insights.filter((item) => (category === 'All' || item.category === category) && `${item.title} ${item.excerpt}`.toLowerCase().includes(query.toLowerCase())); return <><PageHero eyebrow="INSIGHTS" title={<>Signal over <em>noise.</em></>} text="Practical notes for people making high-stakes career and hiring decisions." cta="Explore all notes" onCta={() => document.getElementById('insight-library')?.scrollIntoView({ behavior: 'smooth' })}/><section id="insight-library" className="section sage reveal"><div className="library-tools"><div className="category-filter" aria-label="Filter insights">{categories.map((item) => <button key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search"><Search size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search insights" aria-label="Search insights"/></label></div><p className="result-count">Showing {filtered.length} {filtered.length === 1 ? 'note' : 'notes'}.</p><div className="insight-grid">{filtered.map((item) => <article key={item.title}><div className="insight-art"><span>{item.category === 'For Employers' ? 'E' : item.category === 'For Professionals' ? 'P' : 'H'}</span></div><small>{item.category} · {item.time}</small><h2>{item.title}</h2><p>{item.excerpt}</p><button className="text-link">Read note <ArrowRight size={15}/></button></article>)}</div>{filtered.length === 0 && <div className="empty-state">No notes match that search. Try another word or category.</div>}</section></>; }

function AboutPage({ go }) { return <><PageHero eyebrow="ABOUT HYRZILLA" title={<>More deliberate<br/><em>career momentum.</em></>} text="Hyrzilla was built around a simple belief: a career move or important hire deserves more thought than a generic platform can offer." cta="Start a conversation" onCta={() => go('/contact')}/><section className="section sage reveal"><SectionLabel number="01">WHY WE STARTED</SectionLabel><div className="story"><h2>People make the decision.<br/><em>Context makes it better.</em></h2><p>Career and hiring decisions are personal, expensive, and often rushed. Hyrzilla exists to make the work around them more visible, structured, and human—without pretending to control the outcome.</p></div></section><section className="section ink reveal"><SectionLabel number="02">OUR OPERATING PRINCIPLES</SectionLabel><div className="principles"><InfoCard title="Human-led" body="Technology can reduce busywork, but it should not erase the judgement and care behind an important decision."/><InfoCard title="Clear before clever" body="We make scope, responsibilities, fees, and the next action easy to understand before the process starts."/><InfoCard title="Better signal" body="The goal is not more activity. It is more considered conversations with the right context behind them."/></div></section><section className="section sage reveal"><SectionLabel number="03">WHAT MAKES US DIFFERENT</SectionLabel><div className="difference-list"><span>01</span><p>Defined programs rather than vague promises.</p><span>02</span><p>Agreements before work, not after confusion.</p><span>03</span><p>Support built around real decisions, not vanity metrics.</p></div></section></>; }

function Turnstile({ onVerify, onExpire }) {
  const container = useRef(null);

  useEffect(() => {
    if (!turnstileSiteKey || !container.current) return undefined;
    let widgetId;
    let cancelled = false;
    const render = () => {
      if (cancelled || !container.current || !window.turnstile) return;
      widgetId = window.turnstile.render(container.current, {
        sitekey: turnstileSiteKey,
        theme: 'auto',
        callback: onVerify,
        'expired-callback': onExpire,
        'error-callback': onExpire,
      });
    };
    const existing = document.querySelector('script[data-hyrzilla-turnstile]');
    if (window.turnstile) render();
    else if (existing) existing.addEventListener('load', render, { once: true });
    else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.hyrzillaTurnstile = 'true';
      script.addEventListener('load', render, { once: true });
      document.head.appendChild(script);
    }
    return () => {
      cancelled = true;
      if (widgetId !== undefined && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onExpire, onVerify]);

  return <div className="turnstile-wrap"><div ref={container}/></div>;
}

function ContactPage({ go, route }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const params = new URLSearchParams(route.split('?')[1] || '');
  const employer = params.get('audience') === 'employer';
  const plan = plans.find((item) => item.slug === params.get('plan'));
  const directEmail = emailHref(employer ? 'Hyrzilla employer role brief' : 'Hyrzilla professional support inquiry');

  const submitInquiry = async (event) => {
    event.preventDefault();
    setError('');
    if (!supabase) {
      setError('The inquiry service is not configured yet. Please use the direct email option once it is available.');
      return;
    }

    const data = new FormData(event.currentTarget);
    const roleOrCurrent = data.get('roleOrCurrent')?.toString().trim();
    const locationOrExperience = data.get('locationOrExperience')?.toString().trim();
    const message = data.get('message')?.toString().trim();
    const payload = {
      full_name: data.get('fullName')?.toString().trim(),
      email: data.get('email')?.toString().trim(),
      phone: data.get('phone')?.toString().trim(),
      selected_plan: employer ? 'employer_role_brief' : plan?.slug || 'professional_inquiry',
      tech_domain: roleOrCurrent,
      experience_years: locationOrExperience,
      message: employer
        ? `Employer role brief | Role/team: ${roleOrCurrent} | Location: ${locationOrExperience} | ${message}`
        : `Professional inquiry | Current role: ${roleOrCurrent} | Experience: ${locationOrExperience} | ${message}`,
      status: employer ? 'Employer Inquiry' : 'Professional Inquiry',
    };

    if (inquiryFunctionEnabled && !turnstileToken) {
      setError('Please complete the security check before sending your inquiry.');
      return;
    }

    setSubmitting(true);
    if (inquiryFunctionEnabled) {
      const { error: functionError } = await supabase.functions.invoke('submit-inquiry', {
        body: { inquiry: payload, turnstileToken, honeypot: data.get('website')?.toString().trim() || '' },
      });
      setSubmitting(false);
      if (functionError) {
        setError('We could not send your inquiry. Please try again shortly or email Hyrzilla directly.');
        return;
      }
      setSubmitted(true);
      return;
    }

    let lastError;
    for (const table of ['candidates_prod', 'candidates_test']) {
      const { error: insertError } = await supabase.from(table).insert([payload]);
      if (!insertError) {
        setSubmitting(false);
        setSubmitted(true);
        return;
      }
      lastError = insertError;
    }
    setSubmitting(false);
    setError(lastError?.message || 'We could not send your inquiry. Please try again shortly.');
  };

  return <>
    <PageHero
      eyebrow="START A CONVERSATION"
      title={<>Context first.<br/><em>Then momentum.</em></>}
      text={directEmail ? 'Email Hyrzilla with a little context and expect a human reply within one business day. You can also send your inquiry using the form below.' : 'Share enough context for a useful human follow-up. Hyrzilla will reply within one business day.'}
      cta={directEmail ? 'Email Hyrzilla' : employer ? 'Share a role brief' : 'Talk through your next move'}
      onCta={() => directEmail ? window.location.assign(directEmail) : document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
    />
    <section className="section contact-section reveal">
      <div>
        <p className="eyebrow"><span/> {employer ? 'Employer partnership' : 'Professional program'}</p>
        <h2>{employer ? 'Tell us about the role.' : 'Tell us about the move.'}</h2>
        <p>{employer ? 'Role, team, location, and timing are enough for a useful first conversation.' : 'Your current role, target direction, and what feels difficult are enough to begin.'}</p>
        {directEmail && <a className="direct-contact" href={directEmail}>Email {businessEmail} <ArrowRight size={16}/></a>}
        <small className="reply-note">Human reply within one business day.</small>
      </div>
      {submitted ? <div className="form-card success">
        <Check size={28}/><h2>Inquiry received.</h2>
        <p>{inquiryFunctionEnabled ? 'Your inquiry is with Hyrzilla. A confirmation has been sent to your email, and a human will reply within one business day.' : 'Your context has been sent to Hyrzilla. Expect a human reply within one business day.'}</p>
        <button className="text-link" onClick={() => setSubmitted(false)}>Send another inquiry <ArrowRight size={15}/></button>
      </div> : <form id="contact-form" className="form-card" onSubmit={submitInquiry}>
        <div className="form-context"><small>YOUR CONTEXT</small><b>{plan ? `${plan.name} · terms confirmed before starting` : employer ? 'Employer partnership · agreement before recruitment begins' : 'Professional program · outcomes are never guaranteed'}</b></div>
        <div className="form-grid">
          <label>Full name<input name="fullName" required placeholder="Your name"/></label>
          <label>Email address<input name="email" required type="email" placeholder="name@email.com"/></label>
          <label>Phone / WhatsApp<input name="phone" required type="tel" placeholder="Your preferred contact number"/></label>
          <label>{employer ? 'Role / team' : 'Current role'}<input name="roleOrCurrent" required placeholder={employer ? 'e.g. Platform Engineering' : 'e.g. Senior Backend Engineer'}/></label>
          <label>{employer ? 'Hiring location' : 'Experience level'}<input name="locationOrExperience" required placeholder={employer ? 'e.g. Toronto, Canada' : 'e.g. 4–7 years'}/></label>
        </div>
        <label>What would make the next step meaningful?<textarea name="message" required rows="4" placeholder={employer ? 'Role context, timeline, and hiring goals…' : 'Context, timeline, and goals…'}/></label>
        <label className="honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex="-1" autoComplete="off"/></label>
        {inquiryFunctionEnabled && <Turnstile onVerify={setTurnstileToken} onExpire={setTurnstileToken}/>}
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button primary full" type="submit" disabled={submitting}>{submitting ? 'Sending inquiry…' : 'Send inquiry'} <Send size={16}/></button>
        <small className="form-note">Your inquiry is sent securely to Hyrzilla. No payment is taken here.</small>
      </form>}
    </section>
  </>;
}

function FAQ({ type, number = '04' }) { const items = type === 'pricing' ? [['When is the upfront fee charged?', 'The upfront investment and payment timing are confirmed in the signed service agreement before work begins.'], ['What does the placement fee mean?', 'The published percentage is a placement fee triggered after a qualifying job start, on the salary basis and timeline stated in the agreement.'], ['Are upfront fees refundable?', 'Except where mandatory law requires otherwise, the signed agreement states that the upfront fee is non-refundable after work begins.'], ['Can I change programs?', 'Program changes can be discussed before work begins. Any revised scope and fee terms must be confirmed in writing.'], ['What is the restart benefit?', 'Elite Search Partner and Executive Concierge include the published 8-month restart support benefit without a new upfront fee.']] : type === 'employer' ? [['When does the partnership begin?', 'After both parties sign the service agreement. No recruitment work or introduction begins before then.'], ['Are hires guaranteed?', 'No. Employers and professionals make all hiring and employment decisions. Hyrzilla does not guarantee a hire.'], ['When is the placement fee due?', 'The agreement sets the fee and payment mechanics. The trigger is the introduced professional’s start date, subject to signed terms.'], ['Can Hyrzilla support every role?', 'Hyrzilla can discuss roles across the US and Canada. Scope and fit are confirmed in the role brief and agreement.']] : [['Is a job offer guaranteed?', 'No. Hyrzilla does not guarantee interviews, offers, salary outcomes, or employer responses.'], ['When is the placement fee due?', 'The signed agreement defines the trigger, salary basis, invoice timing, and payment terms for the selected program.'], ['Can I restart my search?', 'Elite Search Partner and Executive Concierge include the published 8-month restart support benefit without a new upfront fee.'], ['Will you apply without my involvement?', 'You retain control over the important decisions. Activity, boundaries, and approval points are agreed before the program begins.']]; return <><SectionLabel number={number}>FREQUENTLY ASKED QUESTIONS</SectionLabel><div className="faq-grid">{items.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{text}</p></article>)}</div></>; }

function Process({ steps }) { return <div className="process-grid">{steps.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><i className="pulse"/><h2>{title}</h2><p>{text}</p></article>)}</div>; }
function ServiceGrid({ items }) { return <div className="service-grid">{items.map(([title, intro, details], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{intro}</p><small>{details}</small></article>)}</div>; }
function SectionLabel({ children, number }) { return <div className="section-label"><span>{children}</span><i>{number}</i></div>; }
function SignalPanel({ label, rows }) { return <aside className="signal-panel"><small>{label}</small>{rows.map((row) => <b key={row}>{row}</b>)}</aside>; }
function SupportPanel() { return <aside className="signal-board reveal"><div className="signal-head"><span>YOUR SUPPORT PLAN</span><i>●</i></div><div className="signal-row"><span className="avatar blue">01</span><div><b>Shape your story</b><small>Résumé, LinkedIn, and target-role clarity</small></div><em>Positioning</em></div><div className="signal-row"><span className="avatar orange">02</span><div><b>Run a focused search</b><small>Applications, tracking, and coordination</small></div><em>Search</em></div><div className="signal-row"><span className="avatar green">03</span><div><b>Prepare to decide</b><small>Interviews, offers, and next steps</small></div><em>Readiness</em></div><div className="signal-footer">Clear scope → shared momentum <ArrowRight size={15}/></div></aside>; }
function PageHero({ eyebrow, title, text, cta, onCta, aside }) { return <section className="page-hero"><div className="reveal"><p className="eyebrow"><span/> {eyebrow}</p><h1>{title}</h1><p>{text}</p><button className="button primary" onClick={onCta}>{cta} <ArrowRight size={16}/></button></div>{aside && <div className="reveal">{aside}</div>}</section>; }
function InfoCard({ title, body }) { return <article><h2>{title}</h2><p>{body}</p></article>; }

const legalContent = { privacy: { eyebrow: 'PRIVACY POLICY', title: <>Privacy with <em>purpose.</em></>, intro: 'Framework document pending legal review. This policy describes how Hyrzilla expects to handle information in its services.', sections: [['Scope and purpose', 'This policy applies to information Hyrzilla collects through the website, direct conversations, service inquiries, and agreed recruitment or career-support services.'], ['Information we may collect', 'Information may include contact details, professional history, résumés, LinkedIn details, target roles, compensation preferences, interview availability, employer role requirements, and communications you choose to provide.'], ['How information is used', 'Information is used to respond to inquiries, assess service fit, prepare agreements, deliver agreed services, coordinate introductions or interviews, improve operations, and meet legal obligations. Hyrzilla does not sell personal information.'], ['Sharing and retention', 'Professional information is shared with an employer only with appropriate permission and a defined hiring purpose. Information is retained only as long as needed for the stated purpose, legitimate operations, or legal requirements.'], ['Your choices', 'Depending on your location, you may have rights to request access, correction, deletion, restriction, objection, or portability. Contact Hyrzilla to make a request.']] }, terms: { eyebrow: 'TERMS & CONDITIONS', title: <>Clarity before <em>commitment.</em></>, intro: 'Framework document pending legal review. A signed service agreement controls any paid engagement, payment obligation, or service scope.', sections: [['Website purpose', 'This website provides general information about Hyrzilla’s professional-support and employer-partnership services. It is not legal, tax, immigration, employment, or financial advice.'], ['No outcome guarantees', 'Hyrzilla does not guarantee interviews, job offers, salary levels, employer responses, hires, retention, or any other employment outcome.'], ['Service agreements control', 'Before paid services or recruitment work begins, the relevant parties use a written agreement describing scope, responsibilities, fees, payment triggers, confidentiality, and data handling.'], ['Fees and payment', 'Published program pricing is informational and remains subject to the signed agreement. Upfront fee, placement fee, salary basis, payment timing, and taxes must be confirmed in writing.'], ['Acceptable use', 'Do not copy, scrape, interfere with, or use this website for unlawful, fraudulent, discriminatory, or harmful purposes.']] } };
function LegalPage({ type, go }) { const page = legalContent[type]; return <><PageHero eyebrow={page.eyebrow} title={page.title} text={page.intro} cta="Start a conversation" onCta={() => go('/contact')}/><section className="section sage legal reveal"><div className="legal-note"><CircleHelp size={18}/><p>Obtain advice from a qualified lawyer in the relevant jurisdiction before relying on this framework.</p></div>{page.sections.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{text}</p></article>)}</section></>; }
const agreements = { professional: ['Professional service agreement template', 'This template is a framework only and must be reviewed by qualified counsel before use.', [['Parties and selected program', 'The agreement identifies Hyrzilla, the professional client, the selected program, upfront investment, and published placement-fee percentage.'], ['No job or interview guarantee', 'Hyrzilla does not guarantee offers, interviews, recruiter responses, salary level, applications outcomes, or a particular timeline.'], ['Upfront fee and no-refund rule', 'Except where mandatory law requires otherwise, the upfront fee is non-refundable once the agreement is signed and work has begun.'], ['Placement fee due in full', 'The placement fee is due in full once the agreed trigger condition occurs: the professional starts a qualifying role, subject to the exact salary basis and timing in the signed schedule.'], ['Responsibilities and privacy', 'The professional provides accurate information, communicates material offers, and both parties protect confidential information.']]], employer: ['Employer service agreement template', 'This template is a framework only and must be reviewed by qualified counsel before use.', [['Parties, role, and scope', 'The agreement identifies each role, location, recruitment scope, and any exclusions before Hyrzilla begins work.'], ['Agreement before recruitment begins', 'No sourcing, recruitment work, or professional introduction begins until the agreement and commercial schedule are signed.'], ['No guarantee of hire or outcome', 'Hyrzilla does not guarantee the number of introductions, interviews, offers, time-to-fill, performance, retention, or any hiring outcome.'], ['Professional introductions and consent', 'Profiles are shared with appropriate permission for a defined purpose and handled as confidential.'], ['Placement fee and start-date trigger', 'The employer pays the placement fee agreed in the commercial schedule when an introduced professional starts, subject to signed terms.']]] };
function AgreementPage({ type, go }) { const [title, intro, sections] = agreements[type]; return <><PageHero eyebrow="AGREEMENT TEMPLATE" title={<>{title.split(' template')[0]}.<br/><em>Nothing hidden.</em></>} text={intro} cta="Start a conversation" onCta={() => go(`/contact${type === 'employer' ? '?audience=employer' : ''}`)}/><section className="section sage legal reveal"><div className="legal-note"><FileText size={18}/><p>Template / framework only. It is not legal advice and should not be signed until adapted by qualified counsel.</p></div>{sections.map(([heading, body], index) => <article key={heading}><span>0{index + 1}</span><h2>{heading}</h2><p>{body}</p></article>)}</section></>; }
function NotFound({ go }) { return <section className="not-found"><p className="eyebrow"><span/> 404</p><h1>This page has moved.</h1><button className="button primary" onClick={() => go('/')}>Return home <ArrowRight size={16}/></button></section>; }
function Footer({ go }) { const directEmail = emailHref('Hyrzilla website inquiry'); return <footer><div className="footer-brand"><button className="brand" onClick={() => go('/')}><span>H</span>Hyrzilla</button><p>Clearer signal. Better next moves.</p>{directEmail && <a href={directEmail}>Reply within one business day</a>}</div><div><b>Explore</b><button onClick={() => go('/professionals')}>For Professionals</button><button onClick={() => go('/employers')}>For Employers</button><button onClick={() => go('/pricing')}>Pricing</button></div><div><b>Company</b><button onClick={() => go('/insights')}>Insights</button><button onClick={() => go('/about')}>About Us</button><button onClick={() => go('/contact')}>Contact</button></div><div><b>Legal</b><button onClick={() => go('/privacy')}>Privacy</button><button onClick={() => go('/terms')}>Terms</button><button onClick={() => go('/agreements/professional')}>Agreement templates</button></div><div className="newsletter"><b>Newsletter</b><p>Thoughtful notes, soon.</p><span>Coming soon</span></div></footer>; }

export default App;
