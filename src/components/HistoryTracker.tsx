import React, { useState, useEffect } from 'react';
import { DERSResults } from '../types/ders';
import { getNormativeBand36 } from '../utils/scoring';
import { History, Trash2, Eye, Calendar } from 'lucide-react';

interface HistoryTrackerProps {
  onSelectResult: (results: DERSResults) => void;
}

export const HistoryTracker: React.FC<HistoryTrackerProps> = ({ onSelectResult }) => {
  const [history, setHistory] = useState<DERSResults[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const stored = localStorage.getItem('ders36_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Erro ao carregar histórico:', e);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Tem certeza de que deseja apagar todo o histórico de avaliações salvas?')) {
      localStorage.removeItem('ders36_history');
      setHistory([]);
    }
  };

  const handleDeleteItem = (index: number) => {
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    localStorage.setItem('ders36_history', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 font-mono font-semibold">
            <History className="w-4 h-4" />
            <span>Registro Local de Avaliações</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Histórico de Avaliações DERS-36
          </h2>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Histórico</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <History className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Nenhuma avaliação salva ainda
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Ao finalizar o teste DERS-36 e clicar em "Salvar Resultado", o histórico de acompanhamento aparecerá registrado aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item, idx) => {
            const normative = getNormativeBand36(item.totalScore36);
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-teal-500" />
                    <span>{new Date(item.completedAt).toLocaleString('pt-BR')}</span>
                    {item.presetName && (
                      <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[10px]">
                        {item.presetName}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xl font-extrabold font-mono text-teal-600 dark:text-teal-400">
                      DERS-36: {item.totalScore36}/180
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${normative.badgeColor}`}>
                      {normative.label}
                    </span>
                  </div>

                  {item.notes && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                      "{item.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectResult(item)}
                    className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Ver Relatório Completo</span>
                  </button>
                  <button
                    onClick={() => handleDeleteItem(idx)}
                    className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="Excluir este registro"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
