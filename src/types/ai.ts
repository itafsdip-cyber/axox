/** AI Search Agent — request/response types (evolve backend without redesign) */

export interface AISearchContext {
  location?: string;
  budgetMin?: number;
  budgetMax?: number;
}

export interface AISearchPayload {
  query: string;
  context?: AISearchContext;
  answers?: Record<string, string>;
  constraints?: string[];
}

export interface ExtractedIntent {
  goal?: string;
  space?: string;
  budget?: string;
  priorities?: string[];
}

export interface AISearchResponse {
  intent: ExtractedIntent;
  clarifyingQuestions?: { id: string; question: string; options?: string[] }[];
  recommendations: { productId: string; explanation: string }[];
  alternatives?: { productId: string; reason: string }[];
  whyThese?: string;
}

/** AI Purchase Assistant — product advice */

export interface ProductAdvicePayload {
  productId: string;
  userContext?: { roomSize?: string; doorWidth?: string; powerNeeds?: string };
}

export interface ProductAdviceResponse {
  fitNotes?: { label: string; value: string; ok: boolean }[];
  bestFor?: string[];
  notIdealFor?: string[];
  alternatives?: { productId: string; reason: string }[];
  addOns?: { productId: string; reason: string }[];
}
