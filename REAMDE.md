Here's the README for your prototype:

---

# CreditIQ Akure — Prototype README

## Project Overview

This is a frontend prototype for **CreditIQ**, an AI-powered credit scoring and business transaction platform designed for small business owners in Akure, Nigeria. The prototype is built with plain HTML, CSS, and JavaScript — no frameworks or dependencies required — and is intended to demonstrate the complete user journey of the platform to academic supervisors and stakeholders.

---

## What the Prototype Demonstrates

The prototype simulates the end-to-end flow a business owner experiences on the platform, from first opening the app to receiving a loan decision. It is not connected to a real backend or ML model — all scores and decisions are simulated with JavaScript logic to illustrate how the system would behave in production.

---

## Screens / Pages in the Flow

**1. Splash / Landing Screen**
Introduces the platform with the name, tagline, and a "Get Started" call to action.

**2. Registration Screen**
Business owner signs up with their name, business name, business type, and phone number. They also select whether they have a bank account (routes them to the formal model path) or operate mostly in cash (routes them to the informal/trust model path).

**3. Dashboard**
The main home screen showing the user's current credit score (displayed as a circular gauge), a summary of recent transactions, and quick-action buttons for logging a transaction, viewing score breakdown, or applying for a loan.

**4. Log a Transaction**
A simple form where the business owner records a sale, expense, or supplier payment. After submission, a confirmation appears and the credit score updates slightly to reflect new activity — simulating real-time score improvement.

**5. Credit Score Breakdown**
A visual breakdown screen showing what factors are contributing to the user's score — transaction consistency, spending behaviour during good periods, peer endorsements (for the informal path), and repayment history.

**6. Loan Application Screen**
The user selects a loan amount and repayment period. The system evaluates their score and displays an instant loan decision — approved (with terms) or referred for manual review.

**7. Peer Endorsement Screen** *(Informal/Cash path only)*
Business owners on the cash-based path can request or give endorsements to other users they transact with in the community, simulating the word-of-mouth trust scoring system.

---

## User Paths

The prototype splits into two distinct journeys based on the answer given at registration:

- **Formal Path** — User has a bank account. Score is driven by uploaded/simulated bank data and in-app transactions.
- **Informal Path** — User is cash-based. Score is built from in-app transaction logs, peer endorsements, and community ratings.

Both paths converge at the Dashboard, Loan Application, and Score Breakdown screens.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom, mobile-first) |
| Logic | Vanilla JavaScript (ES6+) |
| Charts/Gauge | Canvas API or inline SVG |
| Navigation | Single-page app (SPA) pattern using JS screen switching — no routing library |

---

## File Structure

```
creditiq-prototype/
│
├── index.html          # Single HTML file containing all screens
├── style.css           # All styling — mobile-first, clean fintech UI
└── app.js              # Screen navigation logic, form handling, score simulation
```

---

## How to Run

No installation needed. Simply open `index.html` in any modern web browser. The prototype is fully self-contained and works offline.

---

## Design Notes

- The UI is designed to feel like a mobile app — narrow card layout, bottom navigation bar, and touch-friendly buttons — even when viewed in a desktop browser.
- The colour scheme uses deep green and white to reflect trust, finance, and growth, appropriate for a Nigerian fintech context.
- All Nigerian Naira (₦) is used as the currency throughout.
- Names, business types, and sample data are localised to Akure (e.g., fabric sellers, provision store owners, artisans).

---

## Limitations of the Prototype

- No real backend — all credit score calculations are simulated in JavaScript.
- No actual ML model is running; score changes are rule-based approximations.
- Data does not persist between sessions (no localStorage or database).
- Bank statement upload UI is shown but not functionally processed.

---

## Intended Audience

This prototype is designed for **academic supervisor review** to demonstrate the conceptual flow and user experience of the CreditIQ platform as described in the feasibility report.

---

Want me to go ahead and build the actual prototype now based on this spec?