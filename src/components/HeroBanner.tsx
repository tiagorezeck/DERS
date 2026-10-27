import React from 'react';
import { Play, Target, BookOpen } from 'lucide-react';

interface HeroBannerProps {
  onStartTest: () => void;
  onOpenGuide: () => void;
  onOpenScience: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onStartTest,
  onOpenGuide,
  onOpenScience
}) => {
  return (
    <div className="relative overflow-hidden bg-slate-900 border-b border-slate-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Text & Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs text-teal-400 font-mono tracking-wide">
            <span>Versão Completa Oficial (36 Questões)</span>
            <span aria-hidden="true">·</span>
            <span>Gratz & Roemer (2004)</span>
            <span aria-hidden="true">·</span>
            <span>6 Dimensões</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Escala Completa DERS-36 de Regulação Emocional
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            Acesse o potencial máximo do instrumento original DERS de 36 itens. Avalie suas 6 dimensões psicométricas incluindo Consciência, Clareza, Metas, Impulsos, Estratégias e Aceitação com ajuste automático para itens invertidos.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-xs">
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="block text-slate-400 font-medium">Itens Totais</span>
              <span className="text-lg font-bold text-teal-400 font-mono">36 Questões</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="block text-slate-400 font-medium">Subescalas</span>
              <span className="text-lg font-bold text-teal-400 font-mono">6 Fatores</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="block text-slate-400 font-medium">Intervalo Total</span>
              <span className="text-lg font-bold text-teal-400 font-mono">36 a 180</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60">
              <span className="block text-slate-400 font-medium">Inversão</span>
              <span className="text-lg font-bold text-indigo-400 font-mono">11 Invertidos</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartTest}
              className="px-6 py-3 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-xl transition-all shadow-lg hover:shadow-teal-500/20 flex items-center gap-2 text-sm"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Iniciar Avaliação Completa (36 Itens)</span>
            </button>

            <button
              onClick={onOpenGuide}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 font-semibold rounded-xl transition-all flex items-center gap-2 text-sm"
            >
              <Target className="w-4 h-4 text-teal-400" />
              <span>Guia de Autorregulação</span>
            </button>

            <button
              onClick={onOpenScience}
              className="px-4 py-3 bg-transparent hover:bg-slate-800/50 text-slate-300 font-medium rounded-xl transition-all flex items-center gap-2 text-sm"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Metodologia DERS-36</span>
            </button>
          </div>
        </div>

        {/* Right Column: Visual illustration */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950 group">
            <img
              src="/src/assets/images/ders16_mindfulness_hero_1793042378589.jpg"
              alt="Ilustração de Regulação Emocional Completa DERS-36"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800 text-xs text-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-teal-400">Modelo Gratz & Roemer (2004)</span>
                <span className="text-[10px] text-slate-400">Potencial Máximo</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Inclui a subescala de Consciência Emocional (Awareness) e inversão de itens para máxima precisão diagnóstica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
