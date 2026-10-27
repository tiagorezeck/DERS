/**
 * DERS-36 Completo — Escala de Dificuldades na Regulação Emocional (Gratz & Roemer, 2004)
 * Aplicação Web com Potencial Psicométrico Máximo
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { Questionnaire } from './components/Questionnaire';
import { ResultsReport } from './components/ResultsReport';
import { SelfRegulationGuide } from './components/SelfRegulationGuide';
import { ScientificDoc } from './components/ScientificDoc';
import { HistoryTracker } from './components/HistoryTracker';
import { DERSResults } from './types/ders';
import { calculateDERS36 } from './utils/scoring';
import { PRESET_PROFILES } from './data/dersData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'test' | 'report' | 'guide' | 'science' | 'history'>('test');
  const [currentResults, setCurrentResults] = useState<DERSResults | null>(null);

  // Default initial result loaded so the report tab displays rich sample data if opened directly
  useEffect(() => {
    const defaultRes = calculateDERS36(PRESET_PROFILES[0].answers, PRESET_PROFILES[0].name);
    setCurrentResults(defaultRes);
  }, []);

  const handleCompleteTest = (results: DERSResults) => {
    setCurrentResults(results);
    saveToLocalStorage(results);
    setActiveTab('report');
  };

  const saveToLocalStorage = (results: DERSResults) => {
    try {
      const existingStr = localStorage.getItem('ders36_history');
      const existing: DERSResults[] = existingStr ? JSON.parse(existingStr) : [];
      const updated = [results, ...existing.filter(r => r.completedAt !== results.completedAt)];
      localStorage.setItem('ders36_history', JSON.stringify(updated));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  };

  const handleResetTest = () => {
    setCurrentResults(null);
    setActiveTab('test');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-slate-950">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasResults={currentResults !== null}
        onResetTest={handleResetTest}
      />

      <main className="flex-1">
        {activeTab === 'test' && (
          <>
            <HeroBanner
              onStartTest={() => {
                const element = document.getElementById('questionnaire-root');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenGuide={() => setActiveTab('guide')}
              onOpenScience={() => setActiveTab('science')}
            />
            <div id="questionnaire-root" className="bg-slate-900/50 py-4">
              <Questionnaire
                onComplete={handleCompleteTest}
                initialAnswers={currentResults?.answers}
              />
            </div>
          </>
        )}

        {activeTab === 'report' && currentResults && (
          <ResultsReport
            results={currentResults}
            onSaveToHistory={saveToLocalStorage}
            onNewTest={handleResetTest}
            onOpenGuide={() => setActiveTab('guide')}
          />
        )}

        {activeTab === 'report' && !currentResults && (
          <div className="max-w-md mx-auto py-16 text-center space-y-4">
            <p className="text-slate-400">Nenhum teste respondido ainda.</p>
            <button
              onClick={() => setActiveTab('test')}
              className="px-6 py-2.5 bg-teal-400 text-slate-950 font-bold rounded-xl"
            >
              Responder às 36 Questões
            </button>
          </div>
        )}

        {activeTab === 'guide' && (
          <SelfRegulationGuide results={currentResults} />
        )}

        {activeTab === 'science' && <ScientificDoc />}

        {activeTab === 'history' && (
          <HistoryTracker
            onSelectResult={(res) => {
              setCurrentResults(res);
              setActiveTab('report');
            }}
          />
        )}
      </main>

      {/* Footer focused on Full DERS-36 */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-slate-300">
              DERS-36 Completo — Escala de Dificuldades na Regulação Emocional (Gratz & Roemer, 2004)
            </p>
            <p className="text-[11px] text-slate-500">
              Versão original de 36 itens cobrindo as 6 dimensões psicométricas: Consciência, Clareza, Metas, Impulso, Estratégias e Aceitação.
            </p>
          </div>

          <div className="text-[11px] text-slate-500 text-center md:text-right space-y-0.5">
            <p>Plataforma para autoconhecimento pessoal e desenvolvimento de competências autorregulatórias.</p>
            <p>Uso estritamente psicoeducativo (não substitui psicoterapia).</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
