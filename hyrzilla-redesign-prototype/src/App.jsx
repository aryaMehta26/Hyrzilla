import { useState } from 'react';
import {
  ArrowRight, Calculator, Check, ChevronRight, CirclePlay, FileText, Handshake,
  Menu, MessageCircle, Moon, MoveUpRight, RefreshCcw, Sliders, Sparkles, Sun, Target, UserRound, UsersRound, X, Zap
} from 'lucide-react';

const outcomes = [
  ['01', 'Clarify your signal', 'Turn real experience into a story hiring teams can instantly understand.'],
  ['02', 'Build interview muscle', 'Practice the conversations that decide your next opportunity.'],
  ['03', 'Move with intent', 'Target the right roles, run a focused search, and negotiate from strength.'],
];

function App() {
  const [menu, setMenu] = useState(false);
  const [audience, setAudience] = useState('talent');
  const [service, setService] = useState(0);
  const [salary, setSalary] = useState(140000);
  const [plan, setPlan] = useState(1);
  const [notice, setNotice] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [dark, setDark] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatReply, setChatReply] = useState('');
  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3200);
  };
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return <main className={dark ? 'dark' : ''}>
    <div className="announcement"><Sparkles size={14} /> New: private career strategy sessions are now open <button onClick={() => scrollTo('apply')}>Explore availability <ArrowRight size={13}/></button></div>
    <nav className="nav">
      <button className="brand" onClick={() => scrollTo('top')} aria-label="Go to top"><span>H</span>Hyrzilla</button>
      <div className="navlinks"><button onClick={() => scrollTo('services')}>Career Services</button><button onClick={() => scrollTo('pricing')}>Candidate Plans</button><button onClick={() => scrollTo('results')}>Our Approach</button><button onClick={() => scrollTo('companies')}>Hiring Teams</button></div>
      <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle color mode">{dark ? <Sun size={16}/> : <Moon size={16}/>}</button>
      <button className="nav-cta" onClick={() => scrollTo('apply')}>Start your search <ArrowRight size={15}/></button>
      <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X/> : <Menu/>}</button>
      {menu && <div className="mobile-menu"><button onClick={() => scrollTo('services')}>Career Services</button><button onClick={() => scrollTo('pricing')}>Candidate Plans</button><button onClick={() => scrollTo('results')}>Our Approach</button><button onClick={() => scrollTo('companies')}>Hiring Teams</button><button onClick={() => scrollTo('apply')}>Start your search</button></div>}
    </nav>

    <section className="hero" id="top">
      <div className="grid-lines" />
      <div className="hero-copy">
        <p className="eyebrow"><span /> Career strategy for ambitious technologists</p>
        <h1>Your next role<br/>should change <em>everything.</em></h1>
        <p className="lede">Hyrzilla pairs rigorous career strategy with hands-on execution, so remarkable people move into work that matches their potential.</p>
        <div className="hero-actions"><button className="button primary" onClick={() => scrollTo('apply')}>Build my next move <ArrowRight size={18}/></button><button className="watch" onClick={() => showNotice('The founder story video is coming soon.')}><CirclePlay size={20}/> See the Hyrzilla approach</button></div>
        <div className="trust"><div className="faces"><i>AM</i><i>RJ</i><i>SK</i><i>+</i></div><span>Trusted by talent from high-growth teams<br/><strong>and global technology companies</strong></span></div>
      </div>
      <div className="hero-art" aria-label="Career progression dashboard">
        <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
        <div className="profile-card glass"><div className="profile-top"><span className="avatar">A</span><span><b>Arjun Mehta</b><small>Platform Engineer</small></span><b className="progress">82%</b></div><div className="progress-line"><i/></div><div className="skill-row"><span>Career narrative</span><b>Strong</b></div><div className="skill-row"><span>Interview readiness</span><b className="warm">Building</b></div></div>
        <div className="offer-card glass"><small>OFFER MOMENTUM</small><div><b>3</b><span>active<br/>conversations</span></div><div className="tiny-bars"><i/><i/><i/><i/></div></div>
        <div className="signal-card"><span><Zap size={16}/></span><div><small>YOUR SIGNAL IS RISING</small><b>Ready for the right room.</b></div></div>
        <div className="compass"><span>◎</span><small>NEXT<br/>NORTH</small></div>
      </div>
    </section>

    <section className="proof" id="results"><p>NOT A JOB BOARD. A BETTER WAY FORWARD.</p><div><strong>1:1</strong><span>senior advisor<br/>per engagement</span></div><div><strong>4 weeks</strong><span>to a sharper<br/>career signal</span></div><div><strong>100%</strong><span>built around<br/>your goals</span></div></section>

    <section className="method section" id="method"><div className="section-label">THE HYRZILLA METHOD <span>01</span></div><div className="method-head"><h2>Less noise.<br/><em>More direction.</em></h2><p>You are more than a résumé. We take the time to understand where you have been, where you want to go, and what it will take to get there.</p></div><div className="outcomes">{outcomes.map(([number,title,body]) => <article key={number}><span>{number}</span><div className="outcome-icon">{number === '01' ? <Target/> : number === '02' ? <UserRound/> : <MoveUpRight/>}</div><h3>{title}</h3><p>{body}</p><button onClick={() => scrollTo('apply')}>Explore this step <ChevronRight size={16}/></button></article>)}</div></section>

    <section className="services section" id="services"><div className="section-label">CAREER SERVICES <span>02</span></div><div className="service-intro"><div><p className="eyebrow"><span/> Built around how hiring really works</p><h2>The support behind a <em>stronger yes.</em></h2></div><p>Every engagement combines the parts of a job search that normally live in separate silos — so your narrative, preparation, outreach, and offer strategy work together.</p></div><ServiceExplorer service={service} setService={setService} scrollTo={scrollTo}/></section>

    <FitFinder setPlan={setPlan} scrollTo={scrollTo}/>

    <section className="specialties section"><div className="section-label">BUILT FOR TECH CAREERS <span>03</span></div><div className="specialty-head"><h2>Technical work deserves a <em>technical search.</em></h2><p>We do not use one generic playbook. Each career narrative is shaped around the language, outcomes, and hiring patterns of your domain.</p></div><div className="specialty-grid"><Specialty title="Cloud & DevOps" roles="DevOps Engineer · Cloud Architect · SRE" keywords="Infrastructure scale, uptime, automation, reliability"/><Specialty title="Software Engineering" roles="Backend · Full-stack · Frontend · Platform" keywords="System design, performance, product impact, scale"/><Specialty title="Data & AI" roles="Data Engineer · ML Engineer · Analytics" keywords="Pipelines, model quality, data reliability, business outcomes"/><Specialty title="Cybersecurity" roles="AppSec · IAM · SOC · Security Architecture" keywords="Risk reduction, compliance, incident readiness, trust"/></div></section>

    <section className="split-story"><div className="story-image"><div className="quote">“I finally stopped applying to jobs and started choosing an actual path.”<span>— Nisha, data platform leader</span></div></div><div className="story-copy"><p className="eyebrow"><span/> A different kind of support</p><h2>We work on the move, not just the materials.</h2><p>A great résumé gets a conversation. A clear point of view, honest preparation, and a thoughtful search earn the offer. Hyrzilla helps you build the whole system.</p><button className="text-link" onClick={() => scrollTo('apply')}>Meet your next career partner <ArrowRight size={17}/></button></div></section>

    <section className="company section" id="companies"><div className="company-copy"><p className="eyebrow"><span/> For teams that care who they hire</p><h2>Great hiring starts with <em>better alignment.</em></h2><p>Build a more considered talent pipeline with people who are ready to make a meaningful impact from day one.</p><button className="button dark" onClick={() => showNotice('Company partner enquiries are open — the form will be added in the next prototype iteration.')}>Partner with Hyrzilla <ArrowRight size={17}/></button></div><div className="talent-board"><div className="board-head"><b>Talent signal</b><span>Live network <i/></span></div><div className="candidate"><span className="avatar blue">RK</span><div><b>Riya Kapoor</b><small>Cloud Security · Bengaluru</small></div><em>Strong fit</em></div><div className="candidate"><span className="avatar orange">PS</span><div><b>Pranav Shah</b><small>Product Design · Mumbai</small></div><em>Strong fit</em></div><div className="candidate"><span className="avatar green">VL</span><div><b>Varun Lal</b><small>Data Engineering · Remote</small></div><em>New signal</em></div><button onClick={() => showNotice('Talent intelligence view selected.')}>View talent intelligence <ArrowRight size={15}/></button></div></section>

    <section className="pricing section" id="pricing"><div className="section-label">CANDIDATE PLANS <span>03</span></div><div className="pricing-head"><div><p className="eyebrow"><span/> Transparent, human-led support</p><h2>Choose the<br/><em>right level of help.</em></h2></div><p>All prices are in USD. Each program pairs a defined upfront investment with a success fee, due only after you start a new role. We make activity commitments—not interview or job-offer promises.</p></div><PricingCards plan={plan} setPlan={setPlan} scrollTo={scrollTo}/><PlanComparison/><AddOns/><div className="fee-tool"><div className="fee-copy"><span className="calc-icon"><Calculator size={20}/></span><h3>See your success fee, clearly.</h3><p>Adjust the expected annual salary. This is an estimate of the success fee due after you start, based on your selected plan.</p></div><div className="calculator"><div className="salary-value"><span>Target annual salary (USD)</span><b>${salary.toLocaleString()}</b></div><input aria-label="Target annual salary" type="range" min="90000" max="280000" step="5000" value={salary} onChange={(e) => setSalary(Number(e.target.value))}/><div className="calc-result"><span>{[14,12,10,10][plan]}% success fee<br/><small>after your job start</small></span><strong>${Math.round(salary * [14,12,10,10][plan] / 100).toLocaleString()}</strong></div></div></div><p className="pricing-note">The exact scope, target criteria, application activity, success-fee trigger, and payment timing must be confirmed in your signed service agreement. Background checks or drug tests requested by a hiring company remain third-party costs.</p></section>

    <section className="faq section"><div className="section-label">BEFORE WE TALK <span>04</span></div><div className="faq-layout"><h2>Questions worth asking <em>before you start.</em></h2><div><Faq question="Is Hyrzilla a job board or staffing agency?" answer="Neither, exactly. For candidates, we are a career strategy and placement partner. For companies, we run a high-context search focused on technical fit, career intent, and long-term alignment."/><Faq question="Who is a good fit for Hyrzilla?" answer="Technologists who are ready to make a thoughtful move — from strong individual contributors to Staff, Principal, and engineering leaders — as well as teams hiring for meaningful technical roles."/><Faq question="What happens after I submit this form?" answer="A real person reviews your details, identifies the right starting point, and follows up with the next step. There is no automated sales sequence and no obligation."/><Faq question="Can companies hire through Hyrzilla?" answer="Yes. We partner with hiring teams to understand the role, present relevant pre-vetted talent, coordinate the process, and support both sides through the start date."/></div></div></section>

    <section className="apply" id="apply"><div><p className="eyebrow"><span/> Your move starts here</p><h2>Let’s make the<br/><em>right introduction.</em></h2><p>Share a few details. We’ll review them personally and point you toward the most useful next conversation.</p><div className="next-steps"><span>01</span> You share the context <span>02</span> We review the fit <span>03</span> We come back with a clear next step</div></div><InquiryForm audience={audience} setAudience={setAudience} submitted={submitted} setSubmitted={setSubmitted} plan={plan}/></section>
    <footer><button className="brand" onClick={() => scrollTo('top')}><span>H</span>Hyrzilla</button><p>Career momentum, engineered.</p><div><button onClick={() => showNotice('LinkedIn link to be connected.')}>LinkedIn</button><button onClick={() => showNotice('Instagram link to be connected.')}>Instagram</button><button onClick={() => showNotice('Email link to be connected.')}>Email</button></div></footer>
    {notice && <div className="toast"><Check size={17}/>{notice}</div>}
    <button className="back-top" onClick={() => scrollTo('top')} aria-label="Back to top">↑</button>
    <div className={chatOpen ? 'chat open' : 'chat'}>{chatOpen && <div className="chat-panel"><div><span>H</span><b>Hyrzilla guide</b><button onClick={() => setChatOpen(false)}><X size={15}/></button></div><p>Hi — I can help you find the right place to start.</p><button onClick={() => setChatReply('Hyrzilla supports candidates with positioning, managed applications, interview coordination, and offer strategy. Every plan shows what is included.')}>What does Hyrzilla do?</button><button onClick={() => setChatReply('Our candidate programs begin at $500 USD plus a post-hire success fee. Review the plan comparison for complete scope details.')}>How does pricing work?</button><button onClick={() => setChatReply('Select “I’m building a team” in the inquiry form. We will hold the company-service redesign until the company requirements are finalized.')}>I’m hiring a team</button>{chatReply && <small>{chatReply}</small>}</div>}<button className="chat-launch" onClick={() => setChatOpen(!chatOpen)} aria-label="Open Hyrzilla guide"><MessageCircle size={19}/><span>Ask Hyrzilla</span></button></div>
  </main>;
}
export default App;

function ServiceExplorer({ service, setService, scrollTo }) {
  const items = [
    { icon: <FileText/>, label: '01', title: 'Resume rebuild', short: 'A high-signal story, not a prettier template.', body: 'We rebuild your résumé around measurable impact, role-specific language, and the work a hiring manager needs to see first.', points: ['Metrics-driven accomplishment writing', 'Keyword and ATS optimization', 'LinkedIn and GitHub alignment'] },
    { icon: <Target/>, label: '02', title: 'Interview preparation', short: 'Practice the moments that decide the room.', body: 'Real mock interviews for behavioral, technical, and system-design conversations — with direct feedback on what to strengthen next.', points: ['System design walkthroughs', 'Behavioral story coaching', 'Honest feedback on weak spots'] },
    { icon: <Sliders/>, label: '03', title: 'Application support', short: 'A focused search, built around fit.', body: 'We help you target roles that match your experience, prioritize the right outreach, and move through the process with intention.', points: ['Targeted role matching', 'Referral and outreach strategy', 'Application tracking'] },
    { icon: <Handshake/>, label: '04', title: 'Offer strategy', short: 'Know what to ask for — and why.', body: 'When the offer arrives, we help you evaluate base, equity, bonus, and growth opportunity before you make the most important call.', points: ['Compensation benchmarking', 'Counter-offer strategy', 'Onboarding transition support'] },
  ];
  const current = items[service];
  return <div className="service-explorer"><div className="service-tabs">{items.map((item, index) => <button key={item.title} onClick={() => setService(index)} className={service === index ? 'active' : ''}><span>{item.label}</span>{item.title}<ChevronRight size={16}/></button>)}</div><div className="service-detail"><div className="service-icon">{current.icon}</div><p className="service-number">SERVICE {current.label}</p><h3>{current.short}</h3><p>{current.body}</p><ul>{current.points.map(point => <li key={point}><Check size={15}/>{point}</li>)}</ul><button className="text-link" onClick={() => scrollTo('apply')}>Talk through your search <ArrowRight size={17}/></button></div></div>;
}

function FitFinder({ setPlan, scrollTo }) {
  const questions = [
    { prompt: 'Where are you in your search?', choices: ['I need to get ready', 'I am actively interviewing', 'I am targeting senior leadership'] },
    { prompt: 'What would be most valuable right now?', choices: ['A stronger résumé and LinkedIn', 'Interview practice and application support', 'A dedicated strategic partner'] },
  ];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const result = answers.length === questions.length ? (answers.includes(2) ? 3 : answers.includes(1) ? 2 : answers.includes(0) ? 1 : 0) : null;
  const answer = (choice) => { const next = [...answers, choice]; setAnswers(next); if (next.length < questions.length) setStep(step + 1); };
  const choose = () => { setPlan(result); scrollTo('pricing'); };
  return <section className="finder"><div className="finder-inner"><div><p className="eyebrow"><span/> A useful place to begin</p><h2>Find your best<br/><em>starting point.</em></h2><p>Two quick questions, no email required. Get a sensible recommendation for the level of support that fits your next move.</p></div><div className="finder-card">{result === null ? <><div className="finder-progress"><span>CAREER FIT FINDER</span><b>{step + 1} / {questions.length}</b></div><h3>{questions[step].prompt}</h3><div className="choice-list">{questions[step].choices.map((choice, index) => <button key={choice} onClick={() => answer(index)}><span>0{index + 1}</span>{choice}<ArrowRight size={16}/></button>)}</div></> : <div className="finder-result"><span><Check size={22}/></span><p>YOUR STARTING POINT</p><h3>{['Starter Strategy', 'Professional Core', 'Elite Search Partner', 'Executive Concierge'][result]}</h3><small>{['Establish a clear, market-ready foundation before you begin.', 'Create steady, structured momentum across an active search.', 'Bring a higher-touch search partner into your specialist search.', 'A discreet, high-context program for your most consequential move.'][result]}</small><div><button className="button primary" onClick={choose}>View the plan <ArrowRight size={16}/></button><button className="reset" onClick={() => {setAnswers([]);setStep(0)}}><RefreshCcw size={14}/> Start again</button></div></div>}</div></div></section>;
}

function PricingCards({ plan, setPlan, scrollTo }) {
  const tiers = [
    { name: 'Starter Strategy', upfront: '$500', fee: '14%', description: 'A focused foundation for early-career candidates and targeted searches.', features: ['ATS-ready master résumé', 'Role and search-strategy intake', 'Up to 50 managed applications', 'Application tracker access', 'Interview coordination support'] },
    { name: 'Professional Core', upfront: '$1,000', fee: '12%', description: 'A hands-on search program for professionals building momentum.', features: ['Everything in Starter', 'Up to 150 tailored applications', 'LinkedIn profile optimization', 'Two cover-letter variants', 'Interview preparation session'], popular: true },
    { name: 'Elite Search Partner', upfront: '$1,800', fee: '10%', description: 'Higher-touch support for senior and specialized technical searches.', features: ['Everything in Professional', 'Up to 300 tailored applications', 'Dedicated search coordinator', 'Recruiter-message coordination', 'Mock behavioral interview'], },
    { name: 'Executive Concierge', upfront: '$3,000', fee: '10%', description: 'A discreet, high-context search for directors, VPs, and executives.', features: ['Everything in Elite', '90-day high-touch search scope', 'Multi-channel opportunity research', 'Hiring-manager outreach support', 'Offer and contract strategy'], },
  ];
  return <div className="price-grid">{tiers.map((tier, index) => <article key={tier.name} className={plan === index ? 'chosen' : ''}>{tier.popular && <span className="popular">MOST CHOSEN</span>}<span className="tier">TIER 0{index + 1}</span><h3>{tier.name}</h3><p>{tier.description}</p><div className="price"><b>{tier.upfront}</b><span>upfront investment</span><small>+ {tier.fee} after you start</small></div><ul>{tier.features.map(feature => <li key={feature}><Check size={14}/>{feature}</li>)}</ul><button onClick={() => {setPlan(index); scrollTo('apply')}}>{plan === index ? 'Selected plan' : `Choose ${tier.name}`} <ArrowRight size={15}/></button></article>)}</div>;
}

function PlanComparison() {
  const rows = [
    ['Best for', 'Early-career / focused search', '3–7 years / active search', 'Senior specialist / manager', 'Director, VP, executive'],
    ['Managed applications', 'Up to 50', 'Up to 150', 'Up to 300', 'Defined in service scope'],
    ['Résumé & positioning', 'Master résumé', 'Résumé + LinkedIn', 'Advanced positioning', 'Executive narrative & bio'],
    ['Interview support', 'Coordination', 'Preparation session', 'Mock behavioral interview', 'High-touch preparation'],
    ['Search support', 'Tracker and guidance', 'Targeted application support', 'Dedicated coordinator', 'Multi-channel, strategic search'],
  ];
  return <div className="comparison"><div className="comparison-head"><div><p className="eyebrow"><span/> Compare the scope</p><h3>Every plan makes the next step visible.</h3></div><p>Application limits are a scope ceiling, not an outcome guarantee. We only commit to the work that Hyrzilla directly controls.</p></div><div className="comparison-scroll"><table><thead><tr><th>Service</th><th>Starter</th><th>Professional</th><th>Elite</th><th>Executive</th></tr></thead><tbody>{rows.map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div></div>;
}

function AddOns() {
  const addOns = [['Professional résumé rewrite', '$299', 'A targeted, editable résumé with one revision round.'], ['LinkedIn profile transformation', '$179', 'Headline, summary, experience, and keyword guidance.'], ['Cover-letter suite', '$99', 'Two tailored templates for your priority industries.'], ['100 managed-application block', '$350', 'Additional reviewed application activity on an active plan.'], ['Executive interview simulation', '$199', 'A 60-minute recorded interview practice session.']];
  return <div className="addons"><div><p className="eyebrow"><span/> Flexible upgrades</p><h3>Standalone support, when a full search is not the right fit.</h3><p>These are practical add-ons—not artificial upsells. They can be purchased independently or scoped into an active program.</p></div><div className="addon-list">{addOns.map(([name, price, description]) => <article key={name}><div><b>{name}</b><span>{description}</span></div><strong>{price}</strong></article>)}</div></div>;
}

function Specialty({ title, roles, keywords }) {
  return <article><span className="specialty-dot"/><h3>{title}</h3><p>{roles}</p><small>{keywords}</small></article>;
}

function Faq({ question, answer }) {
  const [open, setOpen] = useState(false);
  return <article className={open ? 'open' : ''}><button onClick={() => setOpen(!open)} aria-expanded={open}><span>{question}</span><b>{open ? '−' : '+'}</b></button>{open && <p>{answer}</p>}</article>;
}

function InquiryForm({ audience, setAudience, submitted, setSubmitted, plan }) {
  const title = audience === 'talent' ? 'Tell us where you are now.' : 'Tell us who you are looking for.';
  const selectedPlan = ['Starter Strategy', 'Professional Core', 'Elite Search Partner', 'Executive Concierge'][plan];
  const submit = (event) => { event.preventDefault(); setSubmitted(true); };
  return <div className="apply-card"><div className="toggle" role="tablist"><button className={audience === 'talent' ? 'selected' : ''} onClick={() => {setAudience('talent');setSubmitted(false)}}><UserRound size={16}/> I’m growing my career</button><button className={audience === 'company' ? 'selected' : ''} onClick={() => {setAudience('company');setSubmitted(false)}}><UsersRound size={16}/> I’m building a team</button></div>{submitted ? <div className="success-state"><span><Check size={24}/></span><h3>We’ve got it.</h3><p>Thanks for reaching out. This prototype does not submit data externally, but the final Hyrzilla site can send this directly to the team or a CRM.</p><button onClick={() => setSubmitted(false)}>Submit another inquiry</button></div> : <form onSubmit={submit}><h3>{title}</h3>{audience === 'talent' && <div className="plan-handoff"><span>Recommended plan</span><b>{selectedPlan}</b></div>}<p className="form-intro">{audience === 'talent' ? 'Your details stay private and help us prepare a more useful first conversation.' : 'A few specifics let us respond with the right talent partner and a realistic search plan.'}</p><div className="form-grid"><label>Full name<input required placeholder="Your name"/></label><label>{audience === 'talent' ? 'Email or WhatsApp' : 'Work email'}<input required type="email" placeholder={audience === 'talent' ? 'you@email.com' : 'name@company.com'}/></label><label>{audience === 'talent' ? 'Current role' : 'Company name'}<input required placeholder={audience === 'talent' ? 'e.g. Senior Backend Engineer' : 'Your company'}/></label><label>{audience === 'talent' ? 'Experience' : 'Roles you are hiring for'}{audience === 'talent' ? <select defaultValue=""><option value="" disabled>Select experience</option><option>0–3 years</option><option>4–7 years</option><option>8–12 years</option><option>12+ years</option></select> : <input required placeholder="e.g. DevOps, Backend Lead"/>}</label></div><label className="wide-label">{audience === 'talent' ? 'What would make your next move meaningful?' : 'What would a great hire change for your team?'}<textarea required rows="3" placeholder={audience === 'talent' ? 'The role, company type, location, or challenge you are working toward…' : 'Your stack, seniority, timeline, and what success looks like…'}/></label><button type="submit" className="button primary full">{audience === 'talent' ? 'Request a career conversation' : 'Start a hiring conversation'} <ArrowRight size={17}/></button><small>By sending this, you agree to a thoughtful follow-up from Hyrzilla. No spam.</small></form>}</div>;
}
