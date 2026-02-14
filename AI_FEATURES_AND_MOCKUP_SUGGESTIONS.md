# AI features & mockup-inspired suggestions

## Implemented AI features (premium rule: no spam popups)

### 6.1 AI Search Agent — `/search`

- **Entry:** Header search icon and nav **Expert Consult** both open the Search page.
- **UI:**
  - Hero: “What are you building today?” (mockup-style) + **conversational search input** and **Search** button.
  - **Quick category cards:** Home Gym, Commercial Gym, Performance Space, Sports & Recreation, Help Me Decide (intent starters).
  - **State machine:** `idle` → `understanding` (skeleton) → `needs_clarification` (up to 3 questions) → `recommendations_ready` | `no_results` | `error`.
  - **AI understanding summary:** Extracted intent (goal, space, budget).
  - **Clarifying questions:** Only when needed; max 3; optional answers.
  - **Curated recommendations:** 3–6 product cards with explanation snippet.
  - **“Why these”** block.
  - **CTAs:** Compare, Talk to expert, Show alternatives.
- **Data flow:** Frontend calls `POST /api/ai/search` with `{ query, context, answers, constraints }`. On 4xx/5xx or missing backend, a **mock** returns intent + recommendations so the UI always works. Frontend is structured so the AI can evolve without redesign.

### 6.2 AI Purchase Assistant — on product page

- **Placement:** One calm **“Is this right for you?”** module below the main actions (no chatbot).
- **Content:** Best for / Not ideal for, **Fit check** (room size, door width, power), **Ownership** (warranty, installation), **Alternatives** (compact/quiet/commercial, max 3), **Add-on recommendations** (max 3).
- **Data flow:** `POST /api/ai/product-advice` with `{ productId, userContext }`. Mock used when backend is unavailable.

### 6.3 AI Checkout Confidence Checks — on checkout

- **Placement:** On the **Payment** step only; minimal block above payment method.
- **Content:** Three confirmations: delivery constraints, installation readiness, warranty selection. Checkboxes; no upsell, no popups.

---

## Mockup-inspired suggestions (ELITE ENGINEERING reference)

Already applied where it fits:

1. **Search hero** — Centred headline “What are you building today?” (italic, display font), subtitle “Engineering excellence”, single search bar with placeholder like “e.g. Home treadmill under 10k AED…”.
2. **Category cards** — Row of 5 cards below search (Home Gym, Commercial Gym, Performance Space, Sports & Recreation, Help Me Decide) as intent starters.
3. **Nav** — “Expert Consult” in the main nav (like “EXPERT CONSULT” in the mockup) linking to `/search`; search icon also opens `/search`.

Optional next steps (not implemented):

- **Dynamic search placeholder** — Rotate or suggest intent-based placeholders as the user types.
- **Refinement chips below search** — After a query, show 3–5 refinement chips (from backend or derived from intent) to narrow without classic filters.
- **“Why these” expandable** — Short AI summary; optional “See why” that expands a sentence or two.
- **Subtle AI cue** — Small “AI-assisted” or icon near the search bar or recommendations header to signal intent-based results without being loud.

---

## Backend contracts (for when you add APIs)

- **POST /api/ai/search**  
  Body: `{ query: string, context?: { location?, budgetMin?, budgetMax? }, answers?: Record<string, string>, constraints?: string[] }`  
  Response: `{ intent: { goal?, space?, budget?, priorities? }, clarifyingQuestions?: { id, question, options? }[], recommendations: { productId, explanation }[], alternatives?: { productId, reason }[], whyThese?: string }`

- **POST /api/ai/product-advice**  
  Body: `{ productId: string, userContext?: { roomSize?, doorWidth?, powerNeeds? } }`  
  Response: `{ fitNotes?: { label, value, ok }[], bestFor?: string[], notIdealFor?: string[], alternatives?: { productId, reason }[], addOns?: { productId, reason }[] }`

Checkout confidence is frontend-only (no dedicated API); you can later send confirmations in the same payload as place order if needed.
