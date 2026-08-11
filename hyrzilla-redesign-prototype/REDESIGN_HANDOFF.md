# Hyrzilla Redesign — Review Handoff

This document separates what is built in the redesign prototype from what still needs a business decision.

## What is built now

The redesign is a separate app and branch. It does not change the original Hyrzilla site on `main`.

### Real pages

| URL | Purpose |
| --- | --- |
| `/` | Hyrzilla homepage and choice between candidate and hiring-team journeys |
| `/candidates` | Candidate overview |
| `/candidates/services` | Detailed candidate-service page |
| `/candidates/plans` | Candidate plans, service scope, and USD fee calculator |
| `/hiring-teams` | Initial employer/recruitment overview |
| `/contact` | Separate contact page and prototype inquiry form |
| `/about` | Brand story and operating principles |
| `/insights` | Resource-hub structure for future articles |

### Candidate product structure

All candidate prices are currently presented in USD.

| Program | Upfront | Success fee after job start | Intended level |
| --- | ---: | ---: | --- |
| Starter Strategy | $500 | 14% | Early-career or focused search |
| Professional Core | $1,000 | 12% | Active professional search |
| Elite Search Partner | $1,800 | 10% | Senior or specialist technical search |
| Executive Concierge | $3,000 | 10% | Director, VP, or executive search |

The higher programs add more defined support, rather than cosmetic naming changes:

- Starter: résumé, search intake, up to 50 managed applications, tracker, interview coordination.
- Professional: adds LinkedIn work, up to 150 tailored applications, cover-letter variants, and interview preparation.
- Elite: adds up to 300 tailored applications, a search coordinator, recruiter-message coordination, and a mock behavioral interview.
- Executive: adds a 90-day high-touch scope, multi-channel research, hiring-manager outreach support, and offer/contract strategy.

The design explicitly avoids promising interviews, offers, salary outcomes, or anything Hyrzilla cannot control. It describes work scope and application activity instead.

### Candidate experience and UI mechanics

- Candidate services and plans are real pages, not homepage-only sections.
- Plan comparison and a success-fee calculator are interactive.
- Contact page switches between candidate and company inquiry context.
- Form validation and a success state are implemented locally.
- FAQ-style guidance is built into the experience.
- Light and dark modes use different high-contrast text and surface colors.
- Floating back-to-top and on-page Hyrzilla guide/chat UI are included.
- Mobile navigation and responsive page layouts are included.

## What is intentionally Phase 2

These are designed for, but not connected yet:

- Supabase / CRM lead capture
- Email confirmations
- Calendar booking
- WhatsApp integration
- Real AI chatbot
- Candidate portal and application tracker login
- Payment checkout
- Legal agreements and e-signature

The current form does not send any data externally. That is intentional for this prototype phase.

## Company-side product: decisions needed before build

The current `/hiring-teams` page is deliberately an overview. It should not be treated as the final employer product until these points are confirmed.

### 1. Client type

- Are you approaching direct employers, staffing agencies, startups, or all three?
- Which country or market is primary: United States, India, remote/global, or a mix?
- What technical roles will Hyrzilla actually support first?

### 2. Employer service scope

Confirm exactly what Hyrzilla will do:

- Source and screen candidates?
- Share résumé profiles only after a signed agreement?
- Schedule interviews and follow up with both sides?
- Help with offers and candidate joining?
- Offer a replacement period if a candidate leaves? If yes, what are the limits?

### 3. Company pricing and agreement

Before showing prices publicly, confirm:

- Fee percentage or fixed fee by role/seniority
- Whether the fee is calculated from base salary only or total compensation
- When payment is due: acceptance, first day, or after a guarantee period
- Replacement / refund policy
- Required agreement before résumé sharing

### 4. Candidate consent and privacy

Before sending candidate résumés to companies, define:

- Candidate approval process
- Which candidate information may be shared
- Data retention and deletion policy
- Who owns interview coordination and employer communication

## Recommended company-side pages once approved

1. `/hiring-teams` — employer landing page and value proposition
2. `/hiring-teams/how-it-works` — requirements → agreement → vetted profiles → interview → placement
3. `/hiring-teams/terms` — placement fee, payment trigger, replacement policy, and candidate-introduction terms
4. `/hiring-teams/contact` — role-brief form for companies

## Questions for Dhruv to answer

1. Are the four candidate plans, application limits, and success-fee percentages approved as public offers?
2. Do we want a monthly model, a fixed upfront + success-fee model, or both?
3. What is the minimum number of people available to manually manage applications and candidate communication?
4. Are candidate application limits achievable every month with that team?
5. What will be the company placement fee and replacement policy?
6. Is the company focus US-only, India-only, or international?
7. Which integrations should be first in Phase 2: CRM/Supabase, Calendly, email, WhatsApp, payment, or e-sign?

## Deployment status

- Original site: `main` branch, unchanged.
- Redesign: `prototype/hyrzilla-redesign` branch.
- Vercel: use the redesign branch preview link to review updates safely.

