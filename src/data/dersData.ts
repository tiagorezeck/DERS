import { DERSItem, ScaleAnchor, SubscaleKey, PresetProfile } from '../types/ders';

export const SCALE_ANCHORS: ScaleAnchor[] = [
  { value: 1, label: 'Quase nunca', percentage: '0–10%', description: 'Raramente ou quase nunca se aplica a mim.' },
  { value: 2, label: 'Às vezes', percentage: '11–35%', description: 'Aplica-se a mim de vez em quando em situações de estresse.' },
  { value: 3, label: 'Aproximadamente metade das vezes', percentage: '36–65%', description: 'Ocorre cerca de metade das vezes sob tensão.' },
  { value: 4, label: 'Na maioria das vezes', percentage: '66–90%', description: 'Ocorre com grande frequência quando chateado(a).' },
  { value: 5, label: 'Quase sempre', percentage: '91–100%', description: 'Quase sempre se aplica a mim em momentos de perturbação.' }
];

export const SUBSCALE_METADATA: Record<SubscaleKey, {
  name: string;
  items: number[];
  min: number;
  max: number;
  description: string;
  nonClinicalAvg: number;
  clinicalAvg: number;
}> = {
  consciencia: {
    name: 'Consciência Emocional',
    items: [2, 6, 8, 10, 17, 34],
    min: 6,
    max: 30,
    description: 'Tendência a prestar atenção e valorizar as próprias emoções (Itens invertidos: maior pontuação indica desatenção/negligência afetiva).',
    nonClinicalAvg: 12.8,
    clinicalAvg: 19.5
  },
  clareza: {
    name: 'Clareza Emocional',
    items: [1, 4, 5, 7, 9, 25],
    min: 5,
    max: 25,
    description: 'Capacidade de compreender e identificar exatamente qual emoção se está vivenciando.',
    nonClinicalAvg: 10.2,
    clinicalAvg: 17.8
  },
  metas: {
    name: 'Engajamento em Metas',
    items: [13, 18, 20, 26, 33],
    min: 5,
    max: 25,
    description: 'Dificuldade em manter o foco e executar condutas direcionadas a objetivos quando chateado(a).',
    nonClinicalAvg: 12.4,
    clinicalAvg: 19.2
  },
  impulso: {
    name: 'Controle de Impulsos',
    items: [3, 14, 19, 24, 27, 32],
    min: 6,
    max: 30,
    description: 'Dificuldade em manter o controle comportamental e conter reações impulsivas sob forte angústia.',
    nonClinicalAvg: 10.6,
    clinicalAvg: 18.9
  },
  estrategias: {
    name: 'Acesso a Estratégias',
    items: [15, 16, 22, 28, 30, 31, 35, 36],
    min: 8,
    max: 40,
    description: 'Crença de que pouco pode ser feito para regular eficazmente as emoções depois de estar chateado(a).',
    nonClinicalAvg: 15.8,
    clinicalAvg: 28.4
  },
  naoAceitacao: {
    name: 'Não Aceitação Emocional',
    items: [11, 12, 21, 23, 29],
    min: 5,
    max: 25,
    description: 'Reações negativas e autocríticas secundárias (vergonha, culpa, raiva de si) em relação ao próprio sofrimento.',
    nonClinicalAvg: 10.8,
    clinicalAvg: 20.1
  }
};

export const DERS36_ITEMS: DERSItem[] = [
  {
    id: 1,
    text: 'Tenho clareza sobre meus sentimentos.',
    subscale: 'clareza',
    subscaleName: 'Clareza Emocional',
    isReversed: true,
    description: 'Item Invertido: Mede o discernimento direto dos estados afetivos internos.'
  },
  {
    id: 2,
    text: 'Presto atenção em como me sinto.',
    subscale: 'consciencia',
    subscaleName: 'Consciência Emocional',
    isReversed: true,
    description: 'Item Invertido: Avalia a atenção atenta voltada para o mundo emocional somático.'
  },
  {
    id: 3,
    text: 'Sinto minhas emoções como avassaladoras e fora de controle.',
    subscale: 'impulso',
    subscaleName: 'Controle de Impulsos',
    description: 'Mede a percepção de intensidade emocional que sobrecarrega a capacidade de contenção.'
  },
  {
    id: 4,
    text: 'Sei exatamente como estou me sentindo.',
    subscale: 'clareza',
    subscaleName: 'Clareza Emocional',
    isReversed: true,
    description: 'Item Invertido: Capacidade de nomear a emoção sem ambiguidade.'
  },
  {
    id: 5,
    text: 'Tenho dificuldade em dar sentido aos meus sentimentos.',
    subscale: 'clareza',
    subscaleName: 'Clareza Emocional',
    description: 'Dificuldade de integração e interpretação do significado das emoções.'
  },
  {
    id: 6,
    text: 'Sou atento(a) aos meus sentimentos.',
    subscale: 'consciencia',
    subscaleName: 'Consciência Emocional',
    isReversed: true,
    description: 'Item Invertido: Grau de sensibilidade e escuta aos sinais afetivos.'
  },
  {
    id: 7,
    text: 'Sei exatamente o que estou sentindo.',
    subscale: 'clareza',
    subscaleName: 'Clareza Emocional',
    isReversed: true,
    description: 'Item Invertido: Mapeamento pontual dos afetos de fundo.'
  },
  {
    id: 8,
    text: 'Me importo com o que estou sentindo.',
    subscale: 'consciencia',
    subscaleName: 'Consciência Emocional',
    isReversed: true,
    description: 'Item Invertido: Valorização e relevância atribuída às próprias vivências emocionais.'
  },
  {
    id: 9,
    text: 'Estou confuso(a) sobre como me sinto.',
    subscale: 'clareza',
    subscaleName: 'Clareza Emocional',
    description: 'Presença de névoa e sobreposição indiferenciada de emoções.'
  },
  {
    id: 10,
    text: 'Quando estou chateado(a), levo um tempo para reconhecer o que sinto.',
    subscale: 'consciencia',
    subscaleName: 'Consciência Emocional',
    isReversed: true,
    description: 'Item Invertido: Agilidade em identificar o surgimento da perturbação emocional.'
  },
  {
    id: 11,
    text: 'Quando estou chateado(a), fico irritado(a) comigo mesmo(a) por me sentir assim.',
    subscale: 'naoAceitacao',
    subscaleName: 'Não Aceitação',
    description: 'Irritação e rejeição secundária gerada contra as próprias emoções.'
  },
  {
    id: 12,
    text: 'Quando estou chateado(a), sinto vergonha de mim mesmo(a) por me sentir assim.',
    subscale: 'naoAceitacao',
    subscaleName: 'Não Aceitação',
    description: 'Vergonha ou desvalorização moral por experimentar vulnerabilidade.'
  },
  {
    id: 13,
    text: 'Quando estou chateado(a), tenho dificuldade em me concentrar no trabalho/tarefas.',
    subscale: 'metas',
    subscaleName: 'Engajamento em Metas',
    description: 'Interferência do sofrimento no foco em atividades cognitivas e obrigações.'
  },
  {
    id: 14,
    text: 'Quando estou chateado(a), perco o controle sobre meu comportamento.',
    subscale: 'impulso',
    subscaleName: 'Controle de Impulsos',
    description: 'Dificuldade prática em conter ações impulsivas sob tensão.'
  },
  {
    id: 15,
    text: 'Quando estou chateado(a), acredito que permanecerei assim por muito tempo.',
    subscale: 'estrategias',
    subscaleName: 'Acesso a Estratégias',
    description: 'Sensação de rigidez e inalterabilidade temporal do afeto negativo.'
  },
  {
    id: 16,
    text: 'Quando estou chateado(a), acredito que acabarei me sentindo muito deprimido(a).',
    subscale: 'estrategias',
    subscaleName: 'Acesso a Estratégias',
    description: 'Expectativa de aprofundamento do desamparo e tristeza.'
  },
  {
    id: 17,
    text: 'Quando estou chateado(a), acredito que meus sentimentos são válidos e importantes.',
    subscale: 'consciencia',
    subscaleName: 'Consciência Emocional',
    isReversed: true,
    description: 'Item Invertido: Validação e legitimidade concedida ao próprio sofrimento.'
  },
  {
    id: 18,
    text: 'Quando estou chateado(a), tenho dificuldade em focar em objetivos prioritários.',
    subscale: 'metas',
    subscaleName: 'Engajamento em Metas',
    description: 'Disrupção do planejamento de longo prazo durante episódios estressantes.'
  },
  {
    id: 19,
    text: 'Quando estou chateado(a), sinto que perco o controle de mim mesmo(a).',
    subscale: 'impulso',
    subscaleName: 'Controle de Impulsos',
    description: 'Sensação de desgoverno pessoal e sequestro emocional.'
  },
  {
    id: 20,
    text: 'Quando estou chateado(a), consigo realizar as coisas que preciso fazer.',
    subscale: 'metas',
    subscaleName: 'Engajamento em Metas',
    isReversed: true,
    description: 'Item Invertido: Capacidade de manter o funcionamento prático sob estresse.'
  },
  {
    id: 21,
    text: 'Quando estou chateado(a), sinto-me envergonhado(a) por ter essas emoções.',
    subscale: 'naoAceitacao',
    subscaleName: 'Não Aceitação',
    description: 'Embaraço social ou autocritica pela expressão involuntária de sentimentos.'
  },
  {
    id: 22,
    text: 'Quando estou chateado(a), sei que acabarei me sentindo melhor depois de um tempo.',
    subscale: 'estrategias',
    subscaleName: 'Acesso a Estratégias',
    isReversed: true,
    description: 'Item Invertido: Confiança na impermanência natural do sofrimento.'
  },
  {
    id: 23,
    text: 'Quando estou chateado(a), sinto que sou fraco(a).',
    subscale: 'naoAceitacao',
    subscaleName: 'Não Aceitação',
    description: 'Atribuição de fraqueza à própria identidade quando em sofrimento.'
  },
  {
    id: 24,
    text: 'Quando estou chateado(a), sinto que consigo manter o controle sobre meu comportamento.',
    subscale: 'impulso',
    subscaleName: 'Controle de Impulsos',
    isReversed: true,
    description: 'Item Invertido: Autonomia comportamental sob fortes sobressaltos.'
  },
  {
    id: 25,
    text: 'Tenho dificuldade em compreender exatamente o que sinto.',
    subscale: 'clareza',
    subscaleName: 'Clareza Emocional',
    description: 'Dificuldade de discriminação entre estados como ansiedade, tristeza e raiva.'
  },
  {
    id: 26,
    text: 'Quando estou chateado(a), tenho dificuldade em me concentrar em outras coisas.',
    subscale: 'metas',
    subscaleName: 'Engajamento em Metas',
    description: 'Dificuldade de redirecionamento atencional durante crises.'
  },
  {
    id: 27,
    text: 'Quando estou chateado(a), tenho dificuldade em controlar minhas ações.',
    subscale: 'impulso',
    subscaleName: 'Controle de Impulsos',
    description: 'Dificuldade na inibição de reações motoras e verbais impetuosas.'
  },
  {
    id: 28,
    text: 'Quando estou chateado(a), acredito que não há nada que eu possa fazer para me sentir melhor.',
    subscale: 'estrategias',
    subscaleName: 'Acesso a Estratégias',
    description: 'Sensação de impotência e escassez de repertório de acalmia.'
  },
  {
    id: 29,
    text: 'Quando estou chateado(a), fico irritado(a) comigo mesmo(a) por ter reações emocionais.',
    subscale: 'naoAceitacao',
    subscaleName: 'Não Aceitação',
    description: 'Rejeição sistemática e auto-irritação com a própria sensibilidade.'
  },
  {
    id: 30,
    text: 'Quando estou chateado(a), começo a me sentir muito mal comigo mesmo(a).',
    subscale: 'estrategias',
    subscaleName: 'Acesso a Estratégias',
    description: 'Erosão da autoimagem desencadeada pelo mal-estar passageiro.'
  },
  {
    id: 31,
    text: 'Quando estou chateado(a), me entrego à tristeza porque acho que é tudo o que posso fazer.',
    subscale: 'estrategias',
    subscaleName: 'Acesso a Estratégias',
    description: 'Passividade e resignação perante o abalo emocional.'
  },
  {
    id: 32,
    text: 'Quando estou chateado(a), perco a capacidade de controlar o que faço.',
    subscale: 'impulso',
    subscaleName: 'Controle de Impulsos',
    description: 'Sensação de paralisia da vontade deliberada.'
  },
  {
    id: 33,
    text: 'Quando estou chateado(a), tenho dificuldade em manter minha mente focada no que importa.',
    subscale: 'metas',
    subscaleName: 'Engajamento em Metas',
    description: 'Disrupção da memória de trabalho e atenção concentrada.'
  },
  {
    id: 34,
    text: 'Levo em consideração o que estou sentindo antes de agir.',
    subscale: 'consciencia',
    subscaleName: 'Consciência Emocional',
    isReversed: true,
    description: 'Item Invertido: Integração entre escuta emocional e tomada de decisão.'
  },
  {
    id: 35,
    text: 'Quando estou chateado(a), leva muito tempo para eu me sentir melhor.',
    subscale: 'estrategias',
    subscaleName: 'Acesso a Estratégias',
    description: 'Longo período refratário e lentidão na recuperação do equilíbrio.'
  },
  {
    id: 36,
    text: 'Quando estou chateado(a), sinto que meus sentimentos tomam conta de mim.',
    subscale: 'estrategias',
    subscaleName: 'Acesso a Estratégias',
    description: 'Sensação de ter o espaço interno inundado pelas emoções.'
  }
];

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'non-clinical',
    name: 'Perfil de Alta Regulação Emocional (Média Comunitária ~58)',
    tagline: 'Excelente consciência, clareza e controle de impulsos em momentos de estresse',
    description: 'Demonstra elevado conhecimento sobre o que sente, excelente atenção somática e rápido retorno ao equilíbrio sem autocrítica severa.',
    answers: {
      1: 5, 2: 5, 3: 1, 4: 5, 5: 1, 6: 5, 7: 5, 8: 5, 9: 1, 10: 5,
      11: 1, 12: 1, 13: 2, 14: 1, 15: 1, 16: 1, 17: 5, 18: 2, 19: 1, 20: 5,
      21: 1, 22: 5, 23: 1, 24: 5, 25: 1, 26: 2, 27: 1, 28: 1, 29: 1, 30: 1,
      31: 1, 32: 1, 33: 2, 34: 5, 35: 2, 36: 1
    }
  },
  {
    id: 'moderate',
    name: 'Perfil de Dificuldade Moderada (Pontuação ~96)',
    tagline: 'Flutuação sazonal em períodos de estresse, com certa rigidez nas estratégias',
    description: 'Apresenta boa consciência no dia a dia, mas experimenta lentidão na recuperação e perda ocasional de foco sob demandas excessivas.',
    answers: {
      1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 3,
      11: 3, 12: 2, 13: 3, 14: 2, 15: 3, 16: 3, 17: 3, 18: 3, 19: 2, 20: 3,
      21: 2, 22: 3, 23: 2, 24: 3, 25: 3, 26: 3, 27: 2, 28: 3, 29: 3, 30: 3,
      31: 2, 32: 2, 33: 3, 34: 3, 35: 3, 36: 3
    }
  },
  {
    id: 'clinical-high',
    name: 'Perfil Clínico Elevado (Pontuação ~142)',
    tagline: 'Elevado sofrimento, desatenção afetiva e forte não aceitação das emoções',
    description: 'Reflete forte vulnerabilidade autorregulatória, desconexão com o que se sente, reatividade impulsiva e intensa autocrítica.',
    answers: {
      1: 1, 2: 1, 3: 5, 4: 1, 5: 4, 6: 1, 7: 1, 8: 1, 9: 5, 10: 1,
      11: 5, 12: 5, 13: 4, 14: 4, 15: 5, 16: 5, 17: 1, 18: 4, 19: 5, 20: 1,
      21: 5, 22: 1, 23: 5, 24: 1, 25: 5, 26: 4, 27: 4, 28: 5, 29: 5, 30: 5,
      31: 4, 32: 4, 33: 4, 34: 1, 35: 5, 36: 4
    }
  }
];
