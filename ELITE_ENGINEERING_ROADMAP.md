# State of the Art Roadmap: "Elite Engineering" Transformation

Based on the [reference design](https://stitch.withgoogle.com/preview/3299546646030749790?node-id=706f4a189cb3476c8957a7ca9e7ffdef), here is the roadmap to elevate **Axox Fitness** from a "Premium Store" to an "Elite Engineering Brand".

## 1. Core Concept Shift: "Intent-First" vs "Product-First"

**Current State:**
- **Hero:** Generic full-width treadmill image.
- **Message:** "Engineered Without Compromise" (Statement).
- **Action:** "Explore Collection" (Passive navigation).

**State of the Art (Reference):**
- **Hero:** Pitch black, text-focused, minimal.
- **Message:** *"What are you building today?"* (Question/Engagement).
- **Action:** Interactive Search + Visual Intent Cards (Active participation).

**Suggestion:**
Replace the current `HomePage` hero with the **Agentic Search Interface** seen in the mockup. This positions the brand as a *consultant* and *partner*, not just a vendor.

---

## 2. Aesthetic & Typography Upgrade

The reference achieves its "luxury" feel through **Contrast**.

| Feature | Current (Axox) | Reference (Elite) | Recommendation |
| :--- | :--- | :--- | :--- |
| **Headline Font** | **Sora** (Geometric Sans) | **Italic Serif** (Editorial/Human) | Adopt an italic serif (e.g., *Fraunces*, *Newsreader*, or *Playfair Display*) for the "Human" voice ("What are you building?"). Keep **Sora** for the "Engineering" voice (Specs, UI). |
| **Background** | Image + Gradient Overlay | **Deep Black / Void** | Use solid `#050505` or `#000000` for the hero background to let the text breathe. Contain images within cards. |
| **Accent Color** | **Primary Red** (`#D7263D`) | **Teal/Mint** (Subtle) | The Red is strong, but use it sparingly (e.g., only on active states or the "dot" notification). Consider desaturating slightly for a "Technical" red rather than "Sports" red. |

---

## 3. Layout & Architecture Changes

### A. The "Cinema" Hero
Instead of a background image, use a **Typographic Centerpiece**.
1. **Headline:** Large, centered, italic serif.
2. **Input:** "Minimal intent-based search..." bar. Matte dark gray background, subtle border.
3. **The Deck:** 5 Vertical Cards below the search.
   - **Home Gym** (Wood/Warm interior)
   - **Commercial Gym** (Dark/Concrete)
   - **Performance Space** (Track/Turf)
   - **Sports & Recreation** (Court)
   - **Help Me Decide** (Abstract Icon)

### B. Navigation Simplification
"State of the Art" brands don't clutter the header with product categories.

**Change:**
- `Cardio | Strength | Weight` -> **COLLECTIONS** (Dropdown)
- Add **PHILOSOPHY** (Brand Story)
- Add **SUSTAINABILITY** (Modern Luxury requirement)
- Keep **EXPERT CONSULT** (High value service)

### C. The "Concierge" Experience
The "Help Me Decide" card shouldn't just be a link; it should trigger the AI Agent mode (which we have partially in `SearchPage`).

---

## 4. Technical Implementation Steps

### Phase 1: Typography & Global Styles
1. Install a serif font (e.g., `@fontsource/fraunces`).
2. Update `tailwind.config.js` to include `font-serif`.
3. Update `index.css` to refine the base black from `#0F0F10` to a richer black/void.

### Phase 2: Navigation Refactor
1. Update `Header.tsx` to group products into "Collections".
2. Add "Philosophy" link (can scroll to the Philosophy section).

### Phase 3: Homepage Reconstruction
1. **Migrate `SearchPage` Hero** logic to `HomePage`.
2. **Refine the Cards:** Use `aspect-[3/4]` or `aspect-[9/16]` vertical cards with cinematic grading (dimmed until hover).
3. **Implement "The Question":** Use the new Serif font for *"What are you building today?"*.

### Phase 4: Micro-Interactions (The "Wow" Factor)
1. **Card Hover:** When hovering a card, the others should dim slightly (Focus effect).
2. **Search Focus:** When clicking the search bar, the background creates a spotlight effect or dims the rest of the page.
3. **Smooth Scroll:** Ensure lenis-like smooth scrolling.

---

## Summary Recommendation
To match the reference: **Delete the current full-screen image hero.** It feels generic. Replace it with the **Type + Search + Card Grid** layout. This is the single biggest change to achieve "State of the Art" status.
