import React, { useState } from 'react';
import { ShieldAlert, AlertOctagon, CheckCircle, Scale, FileText, ArrowRight, Info, UserX, Gavel, Lock } from 'lucide-react';

export const HiringCompliance: React.FC = () => {
  // Simulator State
  const [hasSecretCutoff, setHasSecretCutoff] = useState<boolean>(true);
  const [isPreOffer, setIsPreOffer] = useState<boolean>(true);
  const [isSecretToCandidate, setIsSecretToCandidate] = useState<boolean>(true);
  const [noJobValidation, setNoJobValidation] = useState<boolean>(true);
  const [isAutomatedRejection, setIsAutomatedRejection] = useState<boolean>(true);

  // Calculate Risk Score
  let riskPoints = 0;
  if (hasSecretCutoff) riskPoints += 25;
  if (isPreOffer) riskPoints += 30;
  if (isSecretToCandidate) riskPoints += 15;
  if (noJobValidation) riskPoints += 20;
  if (isAutomatedRejection) riskPoints += 10;

  const getRiskStatus = () => {
    if (riskPoints >= 70) {
      return {
        level: 'CRÍTICO — Alto Risco Jurídico e Trabalhista',
        color: 'bg-rose-950/80 border-rose-800 text-rose-300',
        badge: 'bg-rose-500 text-white',
        summary: 'Sua arquitetura de seleção atual viola múltiplas leis trabalhistas e de proteção de dados. Uma pontuação clínica usada secretamente como filtro de contratação é indefensável perante auditoria.'
      };
    } else if (riskPoints >= 35) {
      return {
        level: 'ALTO — Vulnerabilidade Legal Expressiva',
        color: 'bg-amber-950/80 border-amber-800 text-amber-300',
        badge: 'bg-amber-500 text-slate-950',
        summary: 'Existem lacunas graves de validade e transparência. Sem validação de cargo ou consentimento informado, a decisão de eliminação pode ser questionada.'
      };
    } else {
      return {
        level: 'BAIXO — Modelo Alinhado às Boas Práticas',
        color: 'bg-emerald-950/80 border-emerald-800 text-emerald-300',
        badge: 'bg-emerald-500 text-slate-950',
        summary: 'Seu processo mantém instrumentos clínicos fora da seleção e prioriza métodos defensáveis e transparentes.'
      };
    }
  };

  const riskStatus = getRiskStatus();

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-10">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
          <ShieldAlert className="w-4 h-4" />
          <span>Diretrizes Éticas e Jurídicas para RH / Recrutamento (Seção 6)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Por que NUNCA usar o DERS-16 como Filtro Oculto de Seleção
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Integrar cálculos psicométricos clínicos em uma lógica oculta de rejeição gera uma vulnerabilidade jurídica bem projetada. O DERS-16 mede déficit emocional e saúde mental — não competência ou inteligência emocional para o trabalho.
        </p>
      </div>

      {/* Interactive Risk Simulator */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-500" />
            <span>Simulador de Risco Jurídico do Processo Seletivo</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Marque os parâmetros hipotéticos ou reais do seu fluxo de contratação para calcular o nível de vulnerabilidade legal:
          </p>
        </div>

        {/* Checkbox Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
            isPreOffer ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
          }`}>
            <input
              type="checkbox"
              checked={isPreOffer}
              onChange={(e) => setIsPreOffer(e.target.checked)}
              className="mt-1 text-amber-500 rounded focus:ring-amber-400"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Aplicação do teste ANTES da oferta formal de emprego (Pré-oferta)
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                A ADA proíbe exames de saúde mental antes da proposta condicional de trabalho.
              </span>
            </div>
          </label>

          <label className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
            hasSecretCutoff ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
          }`}>
            <input
              type="checkbox"
              checked={hasSecretCutoff}
              onChange={(e) => setHasSecretCutoff(e.target.checked)}
              className="mt-1 text-amber-500 rounded focus:ring-amber-400"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Uso de nota de corte de desregulação para eliminar candidatos
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                Pontuações altas correlacionam-se empiricamente com depressão e ansiedade (grupo protegido).
              </span>
            </div>
          </label>

          <label className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
            isSecretToCandidate ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
          }`}>
            <input
              type="checkbox"
              checked={isSecretToCandidate}
              onChange={(e) => setIsSecretToCandidate(e.target.checked)}
              className="mt-1 text-amber-500 rounded focus:ring-amber-400"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Resultado mantido oculto do candidato (Sem transparência)
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                Elimina consentimento informado e impede pedido de adaptação razoável de deficiência.
              </span>
            </div>
          </label>

          <label className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
            noJobValidation ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
          }`}>
            <input
              type="checkbox"
              checked={noJobValidation}
              onChange={(e) => setNoJobValidation(e.target.checked)}
              className="mt-1 text-amber-500 rounded focus:ring-amber-400"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Ausência de estudo interno de validação de desempenho na função
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                Não há literatura que comprove relação entre pontuação DERS-16 e produtividade laboral.
              </span>
            </div>
          </label>

          <label className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 md:col-span-2 ${
            isAutomatedRejection ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
          }`}>
            <input
              type="checkbox"
              checked={isAutomatedRejection}
              onChange={(e) => setIsAutomatedRejection(e.target.checked)}
              className="mt-1 text-amber-500 rounded focus:ring-amber-400"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Rejeição totalmente automatizada por sistema sem revisão humana
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                Viola expressamente o Art. 22 do GDPR (UE) e o Art. 20 da LGPD (Brasil) sobre decisões automatizadas de perfil.
              </span>
            </div>
          </label>
        </div>

        {/* Risk Output Result Card */}
        <div className={`p-6 rounded-2xl border ${riskStatus.color} space-y-3`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">{riskStatus.level}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${riskStatus.badge}`}>
              Índice de Risco: {riskPoints}%
            </span>
          </div>
          <p className="text-xs leading-relaxed">
            {riskStatus.summary}
          </p>
        </div>
      </div>

      {/* Detailed Analysis of the 5 Legal Risk Pillars */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Análise Detalhada das 5 Vulnerabilidades Principais
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <Gavel className="w-4 h-4" />
              <span>1. Enquadramento como Exame Médico/Psicológico</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Nos EUA (ADA Title I) e em diversas legislações estaduais/nacionais, exames médicos e psicológicos clínicos são expressamente proibidos na fase que antecede a oferta condicional de trabalho. O DERS-16 mede dificuldades clínicas relevantes e se enquadra nessa restrição legal.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <UserX className="w-4 h-4" />
              <span>2. Discriminação por Impacto Desproporcional</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Estudos científicos ligam pontuações elevadas no DERS-16 à ansiedade, depressão e traços de personalidade. Eliminar pessoas com pontuações altas exclui desproporcionalmente indivíduos com histórico de saúde mental — gerando ações de classe por discriminação contra PCDs.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <FileText className="w-4 h-4" />
              <span>3. Ausência de Validade para Desempenho no Trabalho</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A literatura acadêmica NUNCA estabeleceu qualquer ligação entre as pontuações do DERS-16 e a produtividade no trabalho. Utilizar um instrumento sem validade de critério violará os testes básicos de necessidade de negócio exigidos pela EEOC e tribunais trabalhistas.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <Lock className="w-4 h-4" />
              <span>4. Ocultamento e Decisões Automatizadas (GDPR / LGPD)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ocultar a pontuação elimina o consentimento informado. Tanto o GDPR (Artigo 22) quanto a LGPD (Artigo 20) garantem ao titular o direito de explicação e revisão humana de decisões automatizadas que afetem seu perfil profissional ou direitos.
            </p>
          </div>
        </div>
      </div>

      {/* What to Build Instead: Defensible Recruitment Blueprint */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-teal-400 font-bold">
            Arquitetura Recomendada e Defensável
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            O que construir em vez de filtros clínicos ocultos
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Princípio fundamental: Mantenha os instrumentos clínicos fora do processo de seleção. Meça o comportamento laboral de forma direta, transparente e com consentimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 font-bold font-mono text-xs flex items-center justify-center">01</span>
            <h4 className="text-sm font-bold text-white">Testes de Julgamento Situacional (SJTs)</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crie cenários reais do cotidiano da função. Avalie resoluções comportamentais práticas e resiliência profissional direta, métodos cientificamente válidos para seleção.
            </p>
          </div>

          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 font-bold font-mono text-xs flex items-center justify-center">02</span>
            <h4 className="text-sm font-bold text-white">Entrevistas Estruturadas com Rubrica</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Utilize perguntas comportamentais padronizadas com escalas ancoradas de avaliação aplicadas por avaliadores humanos treinados.
            </p>
          </div>

          <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 font-bold font-mono text-xs flex items-center justify-center">03</span>
            <h4 className="text-sm font-bold text-white">Separação Total do Bem-Estar</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ferramentas como o DERS-16 podem ser oferecidas como recursos 100% voluntários de autoconhecimento pós-contratação, com resultados mostrados apenas ao colaborador e NUNCA compartilhados com o RH.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
