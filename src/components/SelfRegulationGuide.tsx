import React, { useState } from 'react';
import { EmotionalFocusArea, DERSResults } from '../types/ders';
import { Target, BookOpen, CheckCircle2, Sparkles, HeartPulse, Brain, Zap, Shield, HelpCircle, ArrowRight } from 'lucide-react';

interface SelfRegulationGuideProps {
  results?: DERSResults | null;
}

export const SelfRegulationGuide: React.FC<SelfRegulationGuideProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<'focus' | 'techniques' | 'plan'>('focus');

  // Use focus areas from results if available, otherwise fallback to defaults
  const focusAreas: EmotionalFocusArea[] = results?.focusAreas || [
    {
      id: 'default-impulse',
      title: '1. Controle de Impulsos e Pausa Comportamental',
      priority: 'Alta',
      subscaleRelated: 'Controle de Impulsos',
      symptoms: ['Falar sem pensar sob raiva', 'Decisões impetuosas em conflitos'],
      recommendedTechniques: [
        {
          name: 'Técnica STOP (DBT)',
          framework: 'DBT',
          summary: 'Pare, Tome distância, Observe sem julgar e Proceda com consciência.',
          instructions: [
            'S (Stop): Pare imediatamente no momento do pico de raiva/frustração.',
            'T (Take a step back): Dê um passo atrás fisicamente ou expire devagar.',
            'O (Observe): Observe o que está acontecendo dentro de você sem agir.',
            'P (Proceed mindfully): Pergunte: "Qual ação vai me ajudar a longo prazo?"'
          ]
        }
      ]
    },
    {
      id: 'default-compassion',
      title: '2. Autocompaixão & Desconstrução da Autocrítica',
      priority: 'Média',
      subscaleRelated: 'Aceitação das Emoções',
      symptoms: ['Vergonha ao sentir tristeza/ansiedade', 'Rótulo interno de fraqueza'],
      recommendedTechniques: [
        {
          name: 'Pausa de Autocompaixão',
          framework: 'CBT',
          summary: 'Acolhimento somático em momentos de autocrítica.',
          instructions: [
            'Coloque a mão sobre o peito e diga a si mesmo(a): "Este é um momento de sofrimento."',
            'Lembre-se: "O sofrimento faz parte da experiência humana comum; não estou sozinho(a)."',
            'Conclua: "Que eu possa ser gentil comigo mesmo(a) neste instante."'
          ]
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-semibold">
          <Target className="w-4 h-4" />
          <span>Guia Prático de Autoconhecimento & Autorregulação</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Quais Pontos Emocionais Focar para a Autorregulação
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          A regulação emocional não é sobre reprimir sentimentos, mas sobre desenvolver repertório para navegar a angústia sem ser dominado(a) por ela. Explore técnicas validadas de DBT, CBT e ACT.
        </p>

        {/* Navigation Switch */}
        <div className="flex overflow-x-auto gap-2 border-t border-slate-800 pt-4 text-xs font-semibold scrollbar-none">
          <button
            onClick={() => setActiveTab('focus')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'focus'
                ? 'bg-teal-400 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Pontos Prioritários do Seu Perfil</span>
          </button>

          <button
            onClick={() => setActiveTab('techniques')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'techniques'
                ? 'bg-teal-400 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Biblioteca de Técnicas (DBT/CBT/ACT)</span>
          </button>

          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'plan'
                ? 'bg-teal-400 text-slate-950 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Plano de Ação Semanal de Diário</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Targeted Focus Areas */}
      {activeTab === 'focus' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Seus Pontos Emocionais Prioritários
            </h3>
            {results && (
              <span className="text-xs font-mono text-teal-600 dark:text-teal-400">
                Personalizado a partir do seu teste
              </span>
            )}
          </div>

          <div className="space-y-6">
            {focusAreas.map((area, idx) => (
              <div
                key={area.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-600 dark:text-teal-400 font-mono font-bold text-xs flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {area.title}
                    </h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    area.priority === 'Alta'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300'
                  }`}>
                    Prioridade: {area.priority}
                  </span>
                </div>

                {/* Symptoms / Triggers */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-1 text-xs">
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Manifestações Típicas a Observar:
                  </span>
                  <ul className="list-disc pl-5 space-y-0.5 text-slate-600 dark:text-slate-300">
                    {area.symptoms.map((sym, i) => (
                      <li key={i}>{sym}</li>
                    ))}
                  </ul>
                </div>

                {/* Recommended Techniques Cards */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                    Técnicas Recomendadas para Prática:
                  </span>

                  {area.recommendedTechniques.map((tech, i) => (
                    <div
                      key={i}
                      className="p-4 bg-teal-50/40 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 rounded-xl space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-teal-900 dark:text-teal-200 text-sm">
                          {tech.name}
                        </span>
                        <span className="px-2 py-0.5 bg-teal-200/60 dark:bg-teal-900/60 text-teal-900 dark:text-teal-200 rounded font-mono font-semibold">
                          {tech.framework}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        {tech.summary}
                      </p>

                      <div className="space-y-1 pt-1 border-t border-teal-200/50 dark:border-teal-900/40">
                        <span className="font-semibold text-slate-900 dark:text-slate-200 block">Passos de Aplicação:</span>
                        <ol className="list-decimal pl-5 space-y-1 text-slate-600 dark:text-slate-300">
                          {tech.instructions.map((inst, j) => (
                            <li key={j}>{inst}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Full Technique Library */}
      {activeTab === 'techniques' && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Biblioteca de Ferramentas Baseadas em Evidências
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: DBT TIPP */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
                <HeartPulse className="w-5 h-5 text-teal-500" />
                <span>Habilidade TIPP (DBT — Terapia Comportamental Dialética)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Para momentos de crise extrema e surto de raiva/ansiedade (nível de estresse &gt; 8/10).
              </p>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-4">
                <li><strong>T (Temperatura):</strong> Molhar o rosto com água gelada para ativar o reflexo de mergulho mamífero e desacelerar os batimentos cardíacos.</li>
                <li><strong>I (Exercício Intenso):</strong> Fazer 2 minutos de polichinelos para descarregar a adrenalina do corpo.</li>
                <li><strong>P (Respiração Pausada):</strong> Exalar por mais tempo do que inala (informa o cérebro que a ameaça passou).</li>
                <li><strong>P (Relaxamento Pareado):</strong> Contrair e relaxar grupos musculares intencionalmente.</li>
              </ul>
            </div>

            {/* Card 2: CBT Cognitive Reappraisal */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <Brain className="w-5 h-5 text-indigo-500" />
                <span>Reavaliação Cognitiva (CBT)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Para reestruturar pensamentos catastrofistas ou interpretações rígidas.
              </p>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-4">
                <li><strong>Identificar o Pensamento:</strong> "Qual é a história que meu cérebro está contando agora?"</li>
                <li><strong>Examinar as Evidências:</strong> "Quais são os fatos objetivos que provam ou desmentem essa ideia?"</li>
                <li><strong>Perspectiva Alternativa:</strong> "Existe uma forma mais equilibrada e útil de encarar esta situação?"</li>
              </ul>
            </div>

            {/* Card 3: ACT Cognitive Defusion */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Desfusão Cognitiva (ACT — Aceitação e Compromisso)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Para não se fundir nem brigar com pensamentos dolorosos ou autocríticos.
              </p>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-4">
                <li><strong>Rotular como Evento Mental:</strong> "Eu estou percebendo a presença do pensamento de que vou falhar."</li>
                <li><strong>Agradecer à Mente:</strong> "Obrigado(a) mente por tentar me proteger, mas eu cuido disso."</li>
                <li><strong>Foco nos Valores:</strong> "Apesar deste desconforto, qual ação está alinhada com quem eu quero ser?"</li>
              </ul>
            </div>

            {/* Card 4: Emotion Wheel & Labeling */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <Shield className="w-5 h-5 text-rose-500" />
                <span>Rotulagem de Granularidade Emocional</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Para clarear sentimentos vagos e reduzir o impacto neurofisiológico da perturbação.
              </p>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-4">
                <li>Substituir expressões genéricas ("estou mal") por 3 qualificadores específicos (ex: decepcionado, sobrecarregado, inseguro).</li>
                <li>Mapear onde no corpo a emoção está se manifestando (peito apertado, nó na garganta, tensão nos ombros).</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Weekly Action Plan & Diário */}
      {activeTab === 'plan' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Modelo de Diário de Auto-Observação & Regulação
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Guia para registrar episódios emocionais difíceis e acompanhar seu progresso semanal de autoconhecimento:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                  <th className="p-3 font-bold">1. Gatilho / Situação</th>
                  <th className="p-3 font-bold">2. Emoção Nomeada</th>
                  <th className="p-3 font-bold">3. Reação Impulsiva</th>
                  <th className="p-3 font-bold">4. Técnica Aplicada</th>
                  <th className="p-3 font-bold">5. Resultado & Aprendizado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-medium">Feedback duro do chefe às 17h</td>
                  <td className="p-3 text-rose-600 dark:text-rose-400 font-semibold">Vergonha + Insegurança</td>
                  <td className="p-3">Vontade de fechar o laptop e fechar a cara</td>
                  <td className="p-3">Técnica STOP + Respiração 4-7-8</td>
                  <td className="p-3 text-teal-600 dark:text-teal-400 font-semibold">Consegui responder educadamente no dia seguinte</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Trânsito parado a caminho de compromisso</td>
                  <td className="p-3 text-amber-600 dark:text-amber-400 font-semibold">Frustração + Raiva</td>
                  <td className="p-3">Xingar e buzinar com raiva</td>
                  <td className="p-3">Desfusão ACT ("pensamento de atraso")</td>
                  <td className="p-3 text-teal-600 dark:text-teal-400 font-semibold">Avisou o atraso por áudio calmo e ligou o podcast</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
