import type { AISearchPayload, AISearchResponse } from '@/types/ai';
import type { ProductAdvicePayload, ProductAdviceResponse } from '@/types/ai';
import { products, getProductById } from '@/data/products';

const API_BASE = '';

/** AI Search Agent — POST /api/ai/search */
export async function postAISearch(payload: AISearchPayload): Promise<AISearchResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/ai/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  } catch {
    return getMockSearchResponse(payload);
  }
}

/** Mock when backend not ready: intent-based suggestions */
function getMockSearchResponse(payload: AISearchPayload): AISearchResponse {
  const q = (payload.query || '').toLowerCase();
  const hasHome = /home|apartment|small|compact|personal/.test(q);
  const hasCommercial = /gym|commercial|studio|facility/.test(q);
  const hasBudget = /budget|cheap|affordable|under/.test(q);

  const intent = {
    goal: hasCommercial ? 'Commercial facility' : hasHome ? 'Home gym' : 'Fitness equipment',
    space: q.includes('small') ? 'Limited space' : q.includes('large') ? 'Large space' : undefined,
    budget: hasBudget ? 'Budget-conscious' : undefined,
    priorities: [] as string[],
  };

  let recs = products;
  if (hasHome) recs = recs.filter((p) => p.type === 'home');
  if (hasCommercial) recs = recs.filter((p) => p.type === 'commercial');
  if (hasBudget) recs = recs.sort((a, b) => a.price - b.price);

  const recommendations = recs.slice(0, 5).map((p) => ({
    productId: p.id,
    explanation: `${p.name} — ${p.description.slice(0, 80)}…`,
  }));

  const clarifyingQuestions =
    !hasHome && !hasCommercial && recs.length > 4
      ? [
          { id: 'space', question: 'Where will you use it?', options: ['Home', 'Commercial gym / studio', 'Both'] },
          { id: 'priority', question: 'What matters most?', options: ['Performance', 'Space-saving', 'Budget'] },
        ]
      : undefined;

  return {
    intent,
    clarifyingQuestions,
    recommendations,
    alternatives: recs.length > 3 ? [{ productId: recs[3]?.id ?? 'ax-7000', reason: 'Similar performance, different price point' }] : undefined,
    whyThese: 'Picked based on your goal and space. All include installation and warranty support.',
  };
}

/** AI Purchase Assistant — POST /api/ai/product-advice */
export async function postAIProductAdvice(payload: ProductAdvicePayload): Promise<ProductAdviceResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/ai/product-advice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Advice failed');
    return res.json();
  } catch {
    return getMockProductAdvice(payload);
  }
}

function getMockProductAdvice(payload: ProductAdvicePayload): ProductAdviceResponse {
  const product = getProductById(payload.productId);
  const isCommercial = product?.type === 'commercial';
  const homeProducts = products.filter((p) => p.type === 'home' && p.id !== payload.productId);

  return {
    fitNotes: [
      { label: 'Room size', value: 'Min 2.5m × 1.5m recommended', ok: true },
      { label: 'Door width', value: 'Fits through 80cm+ door', ok: true },
      { label: 'Power', value: 'Standard 220V outlet', ok: true },
    ],
    bestFor: isCommercial
      ? ['Gyms & studios', 'Hotels', 'Corporate wellness']
      : ['Serious home training', 'Long-term durability', 'Data-driven workouts'],
    notIdealFor: isCommercial
      ? ['Very small home spaces', 'Occasional use only']
      : ['Tight apartments without space', 'Light use only'],
    alternatives: homeProducts.slice(0, 3).map((p) => ({ productId: p.id, reason: p.description.slice(0, 50) + '…' })),
    addOns: products.filter((p) => p.category === 'accessories').slice(0, 2).map((p) => ({ productId: p.id, reason: 'Often bought together' })),
  };
}
