import React, { useState } from 'react';
import { BookOpen, CheckCircle, AlertTriangle, Layers, FileText, Bookmark, ExternalLink } from 'lucide-react';

export const ScientificDoc: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(1);

  const sections = [
    { id: 1, title: '1. Conceito & Teoria' },
    { id: 2, title: '2. Propriedades Psicométricas' },
    { id: 3, title: '3. Os 16 Itens Autênticos' },
    { id: 4, title: '4. Lógica de Pontuação' },
    { id: 5, title: '5. Interpretação Normativa' },
    { id: 6, title: '6. Contexto de Recrutamento' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Title & Bibliographic Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 font-mono font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>Referência Acadêmica de Psicometria Clinica</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          DERS-16 — Manual de Referência e Validação
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Escala de Dificuldades na Regulação Emocional (versão de 16 itens). Bjureberg, Ljótsson, Tull, et al. (2016), <em>Journal of Psychopathology and Behavioral Assessment</em>, 38, 284–296. DOI: 10.1007/s10862-015-9514-x.
        </p>

        {/* Section Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 border-t border-slate-100 dark:border-slate-800 pt-4 scrollbar-none">
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeSection === sec.id
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
        {activeSection === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">
              1. Conceito e teoria — o que está sendo efetivamente medido
            </h3>
            <p>
              Na teoria de Gratz e Roemer (2004), modelo no qual o DERS se baseia, a regulação emocional é o conjunto de processos pelos quais uma pessoa monitora, avalia e modula suas reações emocionais para atingir objetivos — e não a ausência de emoções negativas. O modelo considera as emoções como funcionais e adaptativas; o construto de interesse é a dificuldade que as pessoas têm em lidar com suas emoções.
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-slate-900 dark:text-white block">Três Pontos Essenciais do Modelo:</span>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>
                  <strong>Mede dificuldade, não competência:</strong> É uma escala de déficit. Quanto maior a pontuação, maior a desregulação. Ela não mede "inteligência emocional" ou "resiliência".
                </li>
                <li>
                  <strong>Instrumento clínico:</strong> Foi desenvolvido e validado em amostras clínicas e comunitárias para discriminar populações clínicas de não clínicas.
                </li>
                <li>
                  <strong>Dimensional, não diagnóstico:</strong> Não existe um ponto de corte absoluto que classifique alguém como "regulado" ou "desregulado".
                </li>
              </ol>
            </div>

            <h4 className="font-bold text-slate-900 dark:text-white pt-2">As 5 Dimensões do DERS-16:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-teal-600 dark:text-teal-400 block">Clareza</span>
                Falta de clareza emocional — capacidade de compreender e nomear o que se sente.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-teal-600 dark:text-teal-400 block">Metas</span>
                Dificuldade em se engajar em comportamentos direcionados a objetivos quando em sofrimento.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-teal-600 dark:text-teal-400 block">Impulso</span>
                Dificuldade em controlar comportamentos impulsivos sob estresse.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-teal-600 dark:text-teal-400 block">Estratégias</span>
                Crença de que pouco pode ser feito para regular as emoções após estarem chateados.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-200 dark:border-slate-800 sm:col-span-2">
                <span className="font-bold text-teal-600 dark:text-teal-400 block">Não Aceitação</span>
                Reações negativas e autocríticas secundárias ao próprio sofrimento emocional.
              </div>
            </div>
            <p className="text-xs text-slate-500 italic">
              * Nota: O DERS-16 excluiu deliberadamente a subescala "Consciência" (Awareness) do instrumento original de 36 itens por não ser considerada uma estratégia direta de regulação.
            </p>
          </div>
        )}

        {activeSection === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">
              2. Propriedades psicométricas
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li><strong>Confiabilidade:</strong> Excelente consistência interna (alfa de Cronbach &gt; 0,92) e forte confiabilidade teste-reteste (ICC ~ 0,91).</li>
              <li><strong>Validade de Construto:</strong> Desempenho comparável à versão original completa de 36 itens do DERS, retendo excelente poder discriminativo entre amostras clínicas e comunitárias.</li>
              <li>
                <strong>Correlatos Empíricos de Pontuações Elevadas:</strong>
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg mt-1 text-rose-900 dark:text-rose-200">
                  Pontuações altas correlacionam-se diretamente com: inflexibilidade psicológica, sensibilidade à ansiedade, impulsividade emocional, traços de personalidade borderline, depressão, ansiedade, transtornos alimentares e comportamentos de automutilação.
                </div>
              </li>
              <li>
                <strong>O que a literatura NÃO estabelece:</strong> Qualquer ligação entre as pontuações do DERS-16 e o desempenho no trabalho. O instrumento nunca foi validado como ferramenta preditiva de produtividade laboral.
              </li>
            </ul>
          </div>
        )}

        {activeSection === 3 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">
              3. Os 16 itens autênticos e escala de resposta
            </h3>
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Escala de Resposta de 1 a 5:</span>
              <div>1 = Quase nunca (0–10%)</div>
              <div>2 = Às vezes (11–35%)</div>
              <div>3 = Aproximadamente metade das vezes (36–65%)</div>
              <div>4 = Na maioria das vezes (66–90%)</div>
              <div>5 = Quase sempre (91–100%)</div>
            </div>

            <div className="space-y-2 text-xs pt-2">
              <span className="font-bold text-slate-900 dark:text-white block">Regra de Inversão de Pontuação:</span>
              <p className="text-slate-600 dark:text-slate-300">
                <strong>Não há itens com pontuação invertida.</strong> Ao contrário do DERS de 36 itens, o DERS-16 não possui inversões. Cada item é somado exatamente como pontuado (1 a 5).
              </p>
            </div>
          </div>
        )}

        {activeSection === 4 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">
              4. Lógica de pontuação e verificações de integridade
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                    <th className="p-2 font-bold">Subescala</th>
                    <th className="p-2 font-bold">Itens</th>
                    <th className="p-2 font-bold">Mínimo</th>
                    <th className="p-2 font-bold">Máximo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  <tr><td className="p-2 font-sans font-medium">Clareza</td><td className="p-2">1, 2</td><td className="p-2">2</td><td className="p-2">10</td></tr>
                  <tr><td className="p-2 font-sans font-medium">Metas</td><td className="p-2">3, 7, 15</td><td className="p-2">3</td><td className="p-2">15</td></tr>
                  <tr><td className="p-2 font-sans font-medium">Impulso</td><td className="p-2">4, 8, 11</td><td className="p-2">3</td><td className="p-2">15</td></tr>
                  <tr><td className="p-2 font-sans font-medium">Estratégias</td><td className="p-2">5, 6, 12, 14, 16</td><td className="p-2">5</td><td className="p-2">25</td></tr>
                  <tr><td className="p-2 font-sans font-medium">Não Aceitação</td><td className="p-2">9, 10, 13</td><td className="p-2">3</td><td className="p-2">15</td></tr>
                  <tr className="bg-teal-50/50 dark:bg-teal-950/40 font-bold"><td className="p-2 font-sans">TOTAL</td><td className="p-2">Todos os 16</td><td className="p-2">16</td><td className="p-2">80</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-xs text-amber-900 dark:text-amber-200">
              <strong>Importante:</strong> A pontuação total varia de 16 a 80 (e não de 0 a 80). Renderize barras e porcentagens sempre em relação ao limite 16-80 para não subestimar pontuações baixas.
            </div>
          </div>
        )}

        {activeSection === 5 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">
              5. Interpretação dimensional
            </h3>
            <p className="text-xs">
              O DERS-16 é dimensional e não possui pontos de corte diagnósticos oficiais. A interpretação correta é normativa — comparando a pontuação com a distribuição de percentis de uma população de referência.
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-slate-900 dark:text-white block">Pontos de Referência Literários:</span>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Adultos não clínicos:</strong> Agrupam-se na faixa baixa a média (Média ~25.8).</li>
                <li><strong>Amostras clínicas:</strong> Apresentam pontuações significativamente mais altas (Média ~52.4).</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === 6 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">
              6. Contexto de recrutamento e conformidade jurídica
            </h3>
            <p className="text-xs leading-relaxed">
              O uso do DERS-16 em contexto de recrutamento deve ser evitado. Por se tratar de uma escala clínica de saúde mental, seu uso como filtro em processos seletivos viola a ADA (Americans with Disabilities Act) nos EUA, a EEOC, regras da UE (GDPR Art. 22) e da LGPD no Brasil referentes ao tratamento de dados de saúde e decisões automatizadas.
            </p>
          </div>
        )}

        {/* Primary Source Reference Box */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
          <span className="font-bold text-slate-900 dark:text-white block">Fonte Primária:</span>
          <p className="text-slate-600 dark:text-slate-300">
            Bjureberg, J., Ljótsson, B., Tull, M. T., Hedman, E., Sahlin, H., Lundh, L.-G., Bjärehed, J., DiLillo, D., Messman-Moore, T., Gumpert, C. H., & Gratz, K. L. (2016). Development and Validation of a Brief Version of the Difficulties in Emotion Regulation Scale: The DERS-16. <em>Journal of Psychopathology and Behavioral Assessment</em>, 38, 284–296.
          </p>
        </div>
      </div>
    </div>
  );
};
