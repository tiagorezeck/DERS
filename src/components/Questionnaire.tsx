import React, { useState } from 'react';
import { DERS36_ITEMS, SCALE_ANCHORS, PRESET_PROFILES } from '../data/dersData';
import { DERSResults, SubscaleKey } from '../types/ders';
import { calculateDERS36 } from '../utils/scoring';
import { Check, ArrowRight, ArrowLeft, RefreshCw, Sparkles, Layers, RotateCcw, Info } from 'lucide-react';

interface QuestionnaireProps {
  onComplete: (results: DERSResults) => void;
  initialAnswers?: Record<number, number>;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({
  onComplete,
  initialAnswers = {}
}) => {
  const [answers, setAnswers] = useState<Record<number, number>>(initialAnswers);
  const [mode, setMode] = useState<'guided' | 'full'>('guided');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [presetUsed, setPresetUsed] = useState<string | undefined>();
  const [selectedSubscaleFilter, setSelectedSubscaleFilter] = useState<'all' | SubscaleKey>('all');

  const totalItemsCount = 36;
  const answeredCount = Object.keys(answers).filter(k => answers[Number(k)] >= 1).length;
  const progressPct = Math.round((answeredCount / totalItemsCount) * 100);
  const isComplete = answeredCount === totalItemsCount;

  const handleSelectAnswer = (itemId: number, value: number) => {
    const updated = { ...answers, [itemId]: value };
    setAnswers(updated);

    if (mode === 'guided' && currentIndex < DERS36_ITEMS.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 150);
    }
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = PRESET_PROFILES.find(p => p.id === presetId);
    if (preset) {
      setAnswers({ ...preset.answers });
      setPresetUsed(preset.name);
    }
  };

  const handleClear = () => {
    setAnswers({});
    setCurrentIndex(0);
    setPresetUsed(undefined);
  };

  const handleSubmit = () => {
    if (!isComplete) {
      alert(`Por favor, responda a todas as 36 questões para gerar o relatório completo (atualmente ${answeredCount}/36).`);
      return;
    }
    const results = calculateDERS36(answers, presetUsed);
    onComplete(results);
  };

  const currentItem = DERS36_ITEMS[currentIndex];

  const filteredItems = selectedSubscaleFilter === 'all'
    ? DERS36_ITEMS
    : DERS36_ITEMS.filter(item => item.subscale === selectedSubscaleFilter);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Header & Presets Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 font-mono">
              <span>DERS-36 Completo (Versão Original Integrativa)</span>
              <span>·</span>
              <span>36 Questões</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Escala de Dificuldades na Regulação Emocional
            </h2>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setMode('guided')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                mode === 'guided'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Passo a Passo
            </button>
            <button
              onClick={() => setMode('full')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                mode === 'full'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Lista Completa (36 Itens)
            </button>
          </div>
        </div>

        {/* Presets Quick Fill */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-medium">Preencher Exemplo:</span>
            {PRESET_PROFILES.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 rounded-md border border-slate-200 dark:border-slate-700 transition-colors"
                title={preset.description}
              >
                {preset.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleClear}
            className="text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 font-medium transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span>Progresso Geral (36 Questões)</span>
            <span className="font-mono">{answeredCount} de 36 respondidos ({progressPct}%)</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Mode 1: Guided / Step-by-Step */}
      {mode === 'guided' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          <div className="flex items-center justify-between text-xs">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono rounded-md font-bold">
              Questão {currentIndex + 1} de 36
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-semibold rounded-full">
                {currentItem.subscaleName}
              </span>
              {currentItem.isReversed && (
                <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-mono rounded flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" />
                  Item Invertido
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
              "{currentItem.text}"
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentItem.description}
            </p>
          </div>

          {/* Scale Buttons 1-5 */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4">
            {SCALE_ANCHORS.map(anchor => {
              const isSelected = answers[currentItem.id] === anchor.value;
              return (
                <button
                  key={anchor.value}
                  onClick={() => handleSelectAnswer(currentItem.id, anchor.value)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 group ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/40 ring-2 ring-teal-500/20 text-slate-900 dark:text-white shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs font-mono ${
                      isSelected ? 'bg-teal-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {anchor.value}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                  </div>

                  <div>
                    <span className="block text-xs font-bold leading-tight">
                      {anchor.label}
                    </span>
                    <span className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                      {anchor.percentage}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="flex items-center gap-2">
              {currentIndex < DERS36_ITEMS.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(DERS36_ITEMS.length - 1, prev + 1))}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Próxima Questão</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isComplete}
                  className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar Análise Completa DERS-36</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Full List */}
      {mode === 'full' && (
        <div className="space-y-6">
          {/* Subscale Category Filter */}
          <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium scrollbar-none">
            <button
              onClick={() => setSelectedSubscaleFilter('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedSubscaleFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Todas (36)
            </button>
            <button
              onClick={() => setSelectedSubscaleFilter('consciencia')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedSubscaleFilter === 'consciencia'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Consciência (6)
            </button>
            <button
              onClick={() => setSelectedSubscaleFilter('clareza')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedSubscaleFilter === 'clareza'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Clareza (6)
            </button>
            <button
              onClick={() => setSelectedSubscaleFilter('metas')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedSubscaleFilter === 'metas'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Metas (5)
            </button>
            <button
              onClick={() => setSelectedSubscaleFilter('impulso')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedSubscaleFilter === 'impulso'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Impulso (6)
            </button>
            <button
              onClick={() => setSelectedSubscaleFilter('estrategias')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedSubscaleFilter === 'estrategias'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Estratégias (8)
            </button>
            <button
              onClick={() => setSelectedSubscaleFilter('naoAceitacao')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedSubscaleFilter === 'naoAceitacao'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Não Aceitação (5)
            </button>
          </div>

          <div className="space-y-4">
            {filteredItems.map(item => {
              const currentVal = answers[item.id];
              return (
                <div
                  key={item.id}
                  className={`bg-white dark:bg-slate-900 rounded-xl p-5 border transition-all ${
                    currentVal ? 'border-slate-200 dark:border-slate-800' : 'border-amber-200 dark:border-amber-900/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {item.id}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                            {item.text}
                          </h4>
                          {item.isReversed && (
                            <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-mono rounded shrink-0">
                              Item Invertido
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Subescala: {item.subscaleName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
                    {SCALE_ANCHORS.map(anchor => {
                      const isSelected = currentVal === anchor.value;
                      return (
                        <button
                          key={anchor.value}
                          onClick={() => handleSelectAnswer(item.id, anchor.value)}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-500 text-teal-950 dark:text-teal-200 font-bold'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <span className="block font-medium">{anchor.value}. {anchor.label}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{anchor.percentage}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!isComplete}
              className="px-8 py-3 bg-teal-400 hover:bg-teal-300 disabled:opacity-40 text-slate-950 font-bold rounded-xl transition-all shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Gerar Relatório Completo DERS-36</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
