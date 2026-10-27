import React, { useState } from 'react';
import { DERSResults } from '../types/ders';
import { getNormativeBand36 } from '../utils/scoring';
import { RadarChart } from './RadarChart';
import { Sparkles, Printer, Download, Save, RefreshCw, AlertTriangle, Info, ArrowRight, Target, Brain, HeartPulse } from 'lucide-react';

interface ResultsReportProps {
  results: DERSResults;
  onSaveToHistory: (results: DERSResults) => void;
  onNewTest: () => void;
  onOpenGuide: () => void;
}

export const ResultsReport: React.FC<ResultsReportProps> = ({
  results,
  onSaveToHistory,
  onNewTest,
  onOpenGuide
}) => {
  const [userNotes, setUserNotes] = useState<string>(results.notes || '');
  const [aiReflection, setAiReflection] = useState<string | null>(results.aiReflection || null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const normativeInfo = getNormativeBand36(results.totalScore36);

  const handleFetchAiReflection = async () => {
    setIsLoadingAi(true);
    setAiError(null);
    try {
      const res = await fetch('/api/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          results,
          userNotes
        })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Erro ao gerar reflexão.');
      }
      setAiReflection(data.text);
    } catch (err: any) {
      setAiError(err.message || 'Não foi possível conectar ao assistente de reflexão com IA.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleSaveHistory = () => {
    const updated = { ...results, notes: userNotes, aiReflection: aiReflection || undefined };
    onSaveToHistory(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ders36_completo_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 font-mono font-semibold">
              <span>Relatório Psicométrico DERS-36 Completo (Gratz & Roemer, 2004)</span>
              <span>·</span>
              <span>{new Date(results.completedAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Mapa Psicométrico & Diagnóstico das 6 Dimensões
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <button
              onClick={handleSaveHistory}
              className="px-3.5 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-teal-500" />
              <span>{savedSuccess ? 'Salvo no Histórico!' : 'Salvar Resultado'}</span>
            </button>
            <button
              onClick={handleDownloadJSON}
              className="px-3.5 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onNewTest}
              className="px-3.5 py-2 text-xs font-bold bg-teal-400 hover:bg-teal-300 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refazer</span>
            </button>
          </div>
        </div>

        {/* Dominant Pattern Header Card */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono tracking-wider text-teal-400 font-bold flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-teal-400" />
              <span>Padrão Emocional Dominante (Versão 36 Itens)</span>
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-white">
            {results.dominantPattern.title}
          </h3>
          <p className="text-xs text-teal-300 font-medium">
            {results.dominantPattern.subtitle}
          </p>

          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            {results.dominantPattern.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
              <span className="font-bold text-rose-400 block mb-0.5">Risco de Ponto Cego:</span>
              <span className="text-slate-300">{results.dominantPattern.keyRisk}</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60">
              <span className="font-bold text-teal-400 block mb-0.5">Recurso / Ponto Forte:</span>
              <span className="text-slate-300">{results.dominantPattern.strength}</span>
            </div>
          </div>
        </div>

        {/* Total Score Display Section (DERS-36 Range 36 to 180) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
              Pontuação Total DERS-36 (36 a 180)
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-extrabold font-mono text-teal-400 tracking-tight">
                {results.totalScore36}
              </span>
              <span className="text-slate-500 font-mono text-lg font-bold">/ 180</span>
            </div>

            <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden my-1">
              <div
                className="bg-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${results.normalizedPercentage36}%` }}
              />
            </div>

            <div className="flex justify-between w-full text-[10px] font-mono text-slate-400">
              <span>Mínimo: 36</span>
              <span>Posição: {results.normalizedPercentage36}%</span>
              <span>Máximo: 180</span>
            </div>
          </div>

          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${normativeInfo.badgeColor}`}>
                {normativeInfo.label}
              </span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {normativeInfo.description}
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <span className="font-semibold text-slate-900 dark:text-slate-200 block">
                Estimativa Normativa para DERS-36:
              </span>
              <p>{normativeInfo.percentileEstimate}</p>
              <p className="text-[11px] text-slate-500 italic">
                * Média não-clínica de referência (Gratz & Roemer, 2004): ~78.0 (DP ~18.5) | Média clínica de referência: ~118.5 (DP ~24.2).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscales Breakdown & Radar Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: All 6 Subscales List */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Detalhamento das 6 Subescalas Psicométricas (DERS-36)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Informa o nível relativo de cada dimensão ajustada pós-inversão de itens
            </p>
          </div>

          <div className="space-y-4">
            {Object.values(results.subscales).map(sub => (
              <div
                key={sub.key}
                className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {sub.name}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">
                      (Intervalo {sub.min}–{sub.max})
                    </span>
                  </div>
                  <div className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400">
                    {sub.score} / {sub.max} <span className="text-xs text-slate-500">({sub.percentage}%)</span>
                  </div>
                </div>

                <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all duration-300"
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {sub.description}
                </p>

                <div className="flex items-center gap-4 text-[10px] text-slate-500 dark:text-slate-400 font-mono pt-1">
                  <span>Média Não-Clínica: {sub.nonClinicalAvg}</span>
                  <span>·</span>
                  <span>Média Clínica: {sub.clinicalAvg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Columns: 6-Axis Radar Chart */}
        <div className="lg:col-span-5">
          <RadarChart subscales={results.subscales} />
        </div>
      </div>

      {/* Targeted Emotional Focus Areas Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 font-mono font-semibold">
              <Target className="w-4 h-4" />
              <span>Plano de Foco de Autorregulação</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              Quais Pontos Emocionais Focar para Sua Autorregulação
            </h3>
          </div>

          <button
            onClick={onOpenGuide}
            className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>Ver Guia Completo de Técnicas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.focusAreas.map(area => (
            <div
              key={area.id}
              className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {area.title}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  area.priority === 'Alta' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                }`}>
                  {area.priority}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                Subescala Relacionada: <strong>{area.subscaleRelated}</strong>
              </p>

              {area.recommendedTechniques.length > 0 && (
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-teal-600 dark:text-teal-400 block">
                    Técnica Recomendada: {area.recommendedTechniques[0].name} ({area.recommendedTechniques[0].framework})
                  </span>
                  <p className="text-slate-700 dark:text-slate-300">
                    {area.recommendedTechniques[0].summary}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Deep Psychoeducational Assistant Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-lg space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-teal-400 font-mono font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Análise Profunda DERS-36 com IA (Gemini 3.8 Flash)</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Sua Análise Psicoeducativa de Autoconhecimento
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Obtenha um plano de reflexão completo com diretrizes para o seu diário de autorregulação emocional.
            </p>
          </div>
        </div>

        {/* Optional User Context */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300">
            Adicionar notas pessoais ou situações recentes para a IA contextualizar (Opcional):
          </label>
          <textarea
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Ex: 'Tenho sentido muita cobrança no trabalho...' ou 'Quero melhorar meu autocontrole em conversas com meu parceiro...'"
            className="w-full h-20 p-3 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
        </div>

        <div>
          <button
            onClick={handleFetchAiReflection}
            disabled={isLoadingAi}
            className="px-6 py-3 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-xl transition-all shadow-md flex items-center gap-2 text-xs disabled:opacity-50"
          >
            {isLoadingAi ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Gerando Análise Profunda com IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-slate-950" />
                <span>{aiReflection ? 'Regerar Análise com IA' : 'Gerar Análise Profunda DERS-36 com IA'}</span>
              </>
            )}
          </button>
        </div>

        {aiError && (
          <div className="p-4 bg-rose-950/60 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{aiError}</span>
          </div>
        )}

        {aiReflection && (
          <div className="p-6 bg-slate-950/90 border border-slate-800 rounded-xl space-y-4 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
            {aiReflection}
          </div>
        )}

        <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 italic flex items-center gap-2">
          <Info className="w-4 h-4 text-teal-400 shrink-0" />
          <span>
            Aviso de Isenção: Esta análise destina-se exclusivamente para autoconhecimento pessoal e psicoeducação. Não substitui psicoterapia nem diagnostica condições de saúde mental.
          </span>
        </div>
      </div>
    </div>
  );
};
