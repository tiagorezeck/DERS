import React from 'react';
import { Activity, Target, BookOpen, History, FileText, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'test' | 'report' | 'guide' | 'science' | 'history';
  setActiveTab: (tab: 'test' | 'report' | 'guide' | 'science' | 'history') => void;
  hasResults: boolean;
  onResetTest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  hasResults,
  onResetTest
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand title (single text element, 1 line) */}
          <button
            onClick={() => setActiveTab('test')}
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <Activity className="w-5 h-5" />
            </div>
            <span>DERS-36 Completo</span>
          </button>

          {/* Zone 2: 4-5 single-line navigation links focused on Self-Knowledge & Full DERS */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium">
            <button
              onClick={() => setActiveTab('test')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'test'
                  ? 'bg-slate-800 text-teal-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Questionário (36 Itens)</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'report'
                  ? 'bg-slate-800 text-teal-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Relatório & Gráficos</span>
              {hasResults && (
                <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-slate-800 text-teal-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Target className="w-4 h-4 text-teal-400" />
              <span>Guia de Autorregulação</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'history'
                  ? 'bg-slate-800 text-teal-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Histórico</span>
            </button>

            <button
              onClick={() => setActiveTab('science')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'science'
                  ? 'bg-slate-800 text-teal-400 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Metodologia</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onResetTest}
              className="px-4 py-2 text-xs font-semibold text-slate-900 bg-teal-400 rounded-lg hover:bg-teal-300 transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Novo Teste</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-800 px-4 py-2 gap-2 text-xs scrollbar-none">
        <button
          onClick={() => setActiveTab('test')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'test' ? 'bg-teal-500/20 text-teal-300 font-bold' : 'text-slate-300'
          }`}
        >
          36 Itens
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'report' ? 'bg-teal-500/20 text-teal-300 font-bold' : 'text-slate-300'
          }`}
        >
          Relatório {hasResults && '•'}
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'guide' ? 'bg-teal-500/20 text-teal-300 font-bold' : 'text-slate-300'
          }`}
        >
          Guia Autorregulação
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'history' ? 'bg-teal-500/20 text-teal-300 font-bold' : 'text-slate-300'
          }`}
        >
          Histórico
        </button>
        <button
          onClick={() => setActiveTab('science')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'science' ? 'bg-teal-500/20 text-teal-300 font-bold' : 'text-slate-300'
          }`}
        >
          Metodologia
        </button>
      </div>
    </header>
  );
};
