import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2, MessageCircle, Shuffle, ArrowRightLeft } from 'lucide-react';
import { postAISearch } from '@/lib/ai-api';
import type { AISearchPayload, AISearchResponse } from '@/types/ai';
import { getProductById } from '@/data/products';
import { useScrollReveal } from '@/hooks/useScrollReveal';


type SearchState = 'idle' | 'understanding' | 'needs_clarification' | 'recommendations_ready' | 'no_results' | 'error';

const QUICK_CARDS = [
  { id: 'home', label: 'Home Gym', image: '/category_cardio.jpg' },
  { id: 'commercial', label: 'Commercial Gym', image: '/category_strength.jpg' },
  { id: 'performance', label: 'Performance Space', image: '/product_treadmill.jpg' },
  { id: 'sports', label: 'Sports & Recreation', image: '/category_weight.jpg' },
  { id: 'help', label: 'Help Me Decide', image: '/category_accessories.jpg' },
];

interface SearchPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function SearchPage({ onNavigate }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [state, setState] = useState<SearchState>('idle');
  const [data, setData] = useState<AISearchResponse | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [refinementChips] = useState<string[]>([]);
  const resultsRef = useScrollReveal(0.05);

  const runSearch = useCallback(async (searchQuery: string, extraAnswers?: Record<string, string>) => {
    const q = (searchQuery || query).trim();
    if (!q && !extraAnswers) return;
    setState('understanding');
    setData(null);
    try {
      const payload: AISearchPayload = {
        query: q || 'Help me decide',
        answers: { ...answers, ...extraAnswers },
      };
      const res = await postAISearch(payload);
      setData(res);
      if (res.clarifyingQuestions && res.clarifyingQuestions.length > 0 && !extraAnswers) {
        setState('needs_clarification');
      } else if (res.recommendations.length === 0) {
        setState('no_results');
      } else {
        setState('recommendations_ready');
      }
    } catch {
      setState('error');
    }
  }, [query, answers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
  };

  const handleQuickCard = (id: string) => {
    if (id === 'help') {
      setQuery('Help me decide what equipment I need');
      runSearch('Help me decide what equipment I need');
    } else {
      const label = QUICK_CARDS.find((c) => c.id === id)?.label ?? id;
      setQuery(label);
      runSearch(label);
    }
  };

  const handleClarifyingAnswer = (questionId: string, value: string) => {
    const next = { ...answers, [questionId]: value };
    setAnswers(next);
    runSearch(query, { [questionId]: value });
  };

  const handleCompare = () => {
    if (data?.recommendations?.length) {
      onNavigate('compare');
    }
  };

  const handleTalkToExpert = () => onNavigate('quote');
  const handleShowAlternatives = () => runSearch(query);

  return (
    <div className="min-h-screen bg-[#0F0F10] pt-24 pb-20">
      {/* Hero: mockup-style */}
      <section className="px-6 lg:px-16 xl:px-24 pt-12 pb-16">
        <p className="text-center text-[#9A9A9A] text-sm uppercase tracking-[0.2em] mb-4">
          Engineering excellence
        </p>
        <h1 className="font-hero-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#F4F4F4] text-center mb-2 italic">
          What are you building today?
        </h1>
        <p className="text-center text-[#9A9A9A] text-sm mb-8 max-w-md mx-auto">
          Intent-based search — describe your goal, space, or budget. No filters, just answers.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center bg-[#17181A] rounded-2xl border border-white/10 focus-within:border-[#D7263D]/50 transition-colors">
            <Search className="absolute left-5 h-5 w-5 text-[#9A9A9A]" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Home treadmill under 10k AED, or small apartment setup..."
              className="flex-1 border-0 bg-transparent pl-12 pr-4 py-4 h-14 text-[#F4F4F4] placeholder:text-[#9A9A9A] text-base focus-visible:ring-0"
              disabled={state === 'understanding'}
            />
            <Button
              type="submit"
              className="m-2 bg-[#D7263D] hover:bg-[#b91d32] text-white rounded-xl h-10 px-6"
              disabled={state === 'understanding'}
            >
              {state === 'understanding' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
            </Button>
          </div>
        </form>

        {/* Quick category cards (mockup reference) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {QUICK_CARDS.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => handleQuickCard(card.id)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#17181A] border border-white/10 hover:border-[#D7263D]/40 transition-colors text-left"
            >
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: `url(${card.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F10] via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <span className="text-[#F4F4F4] font-medium text-sm">{card.label}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* State-driven content */}
      {state === 'understanding' && (
        <div className="px-6 lg:px-16 xl:px-24 max-w-3xl mx-auto">
          <div className="bg-[#17181A] rounded-2xl p-8 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-3/4 mb-4" />
            <div className="h-3 bg-white/10 rounded w-1/2 mb-2" />
            <div className="h-3 bg-white/10 rounded w-2/3" />
            <p className="text-[#9A9A9A] text-sm mt-6">Understanding your goal…</p>
          </div>
        </div>
      )}

      {state === 'needs_clarification' && data?.clarifyingQuestions && (
        <div className="px-6 lg:px-16 xl:px-24 max-w-2xl mx-auto space-y-6">
          <h2 className="text-xl font-semibold text-[#F4F4F4] font-['Sora']">A few quick questions</h2>
          {data.clarifyingQuestions.slice(0, 3).map((q) => (
            <div key={q.id} className="bg-[#17181A] rounded-2xl p-6">
              <p className="text-[#F4F4F4] mb-4">{q.question}</p>
              <div className="flex flex-wrap gap-2">
                {q.options?.map((opt) => (
                  <Button
                    key={opt}
                    variant="outline"
                    size="sm"
                    onClick={() => handleClarifyingAnswer(q.id, opt)}
                    className={answers[q.id] === opt ? 'border-[#D7263D] bg-[#D7263D]/10 text-[#F4F4F4]' : 'border-white/20 text-[#9A9A9A]'}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {state === 'recommendations_ready' && data && (
        <section ref={resultsRef} className="reveal-on-scroll px-6 lg:px-16 xl:px-24 pb-16">
          <div className="max-w-5xl mx-auto">
            {/* Intent summary */}
            <div className="bg-[#17181A] rounded-2xl p-6 mb-8 border border-white/5">
              <h3 className="text-[#9A9A9A] text-xs uppercase tracking-wider mb-3">AI understanding</h3>
              <ul className="flex flex-wrap gap-4 text-sm">
                {data.intent.goal && <li><span className="text-[#9A9A9A]">Goal:</span> <span className="text-[#F4F4F4]">{data.intent.goal}</span></li>}
                {data.intent.space && <li><span className="text-[#9A9A9A]">Space:</span> <span className="text-[#F4F4F4]">{data.intent.space}</span></li>}
                {data.intent.budget && <li><span className="text-[#9A9A9A]">Budget:</span> <span className="text-[#F4F4F4]">{data.intent.budget}</span></li>}
              </ul>
            </div>

            {/* Refinement chips (optional, from data later) */}
            {refinementChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {refinementChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="px-4 py-2 rounded-full bg-[#17181A] border border-white/10 text-[#9A9A9A] text-sm hover:border-[#D7263D]/40 hover:text-[#F4F4F4]"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Curated recommendations */}
            <h2 className="text-2xl font-bold text-[#F4F4F4] font-['Sora'] mb-6">Curated for you</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {data.recommendations.slice(0, 6).map((rec) => {
                const product = getProductById(rec.productId);
                if (!product) return null;
                return (
                  <div
                    key={rec.productId}
                    className="bg-[#17181A] rounded-2xl overflow-hidden border border-white/5 hover:border-[#D7263D]/30 transition-colors group cursor-pointer"
                    onClick={() => onNavigate('product', rec.productId)}
                  >
                    <div className="aspect-square bg-[#0F0F10] overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-[#F4F4F4] font-medium mb-1">{product.name}</h3>
                      <p className="text-[#D7263D] font-semibold">AED {product.price.toLocaleString()}</p>
                      <p className="text-[#9A9A9A] text-sm mt-2 line-clamp-2">{rec.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Why these */}
            {data.whyThese && (
              <div className="bg-[#17181A]/60 rounded-2xl p-6 mb-8 border border-white/5">
                <h3 className="text-[#F4F4F4] font-medium mb-2">Why these</h3>
                <p className="text-[#9A9A9A] text-sm">{data.whyThese}</p>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleCompare} variant="outline" className="border-white/20 text-[#F4F4F4] rounded-full">
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Compare
              </Button>
              <Button onClick={handleTalkToExpert} variant="outline" className="border-white/20 text-[#F4F4F4] rounded-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Talk to expert
              </Button>
              <Button onClick={handleShowAlternatives} variant="ghost" className="text-[#9A9A9A]">
                <Shuffle className="h-4 w-4 mr-2" />
                Show alternatives
              </Button>
            </div>
          </div>
        </section>
      )}

      {state === 'no_results' && (
        <div className="px-6 lg:px-16 xl:px-24 max-w-xl mx-auto text-center py-12">
          <p className="text-[#F4F4F4] mb-4">No exact match. Try adjusting your goal or budget.</p>
          <Button onClick={() => setState('idle')} variant="outline" className="border-white/20 text-[#F4F4F4] rounded-full">
            Start over
          </Button>
        </div>
      )}

      {state === 'error' && (
        <div className="px-6 lg:px-16 xl:px-24 max-w-xl mx-auto text-center py-12">
          <p className="text-[#9A9A9A] mb-4">Something went wrong. Please try again.</p>
          <Button onClick={() => { setState('idle'); setData(null); }} variant="outline" className="border-white/20 text-[#F4F4F4] rounded-full">
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}
