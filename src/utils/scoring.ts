import { DERSResults, SubscaleKey, SubscaleScore, EmotionalFocusArea } from '../types/ders';
import { SUBSCALE_METADATA, DERS36_ITEMS } from '../data/dersData';

export function calculateDERS36(rawAnswers: Record<number, number>, presetName?: string, notes?: string): DERSResults {
  const completeRawAnswers: Record<number, number> = {};
  const calculatedAnswers: Record<number, number> = {};

  // Step 1: Ensure all 36 items exist and process item inversion
  DERS36_ITEMS.forEach(item => {
    const rawVal = rawAnswers[item.id] && rawAnswers[item.id] >= 1 && rawAnswers[item.id] <= 5
      ? rawAnswers[item.id]
      : 1;
    
    completeRawAnswers[item.id] = rawVal;

    // Apply Reverse Scoring if flagged: (6 - rawVal)
    if (item.isReversed) {
      calculatedAnswers[item.id] = 6 - rawVal;
    } else {
      calculatedAnswers[item.id] = rawVal;
    }
  });

  // Step 2: Calculate Subscales using calculated (adjusted) answers
  const subscales: Record<SubscaleKey, SubscaleScore> = {
    consciencia: calculateSubscale('consciencia', [2, 6, 8, 10, 17, 34], 6, 30, calculatedAnswers),
    clareza: calculateSubscale('clareza', [1, 4, 5, 7, 9, 25], 5, 25, calculatedAnswers),
    metas: calculateSubscale('metas', [13, 18, 20, 26, 33], 5, 25, calculatedAnswers),
    impulso: calculateSubscale('impulso', [3, 14, 19, 24, 27, 32], 6, 30, calculatedAnswers),
    estrategias: calculateSubscale('estrategias', [15, 16, 22, 28, 30, 31, 35, 36], 8, 40, calculatedAnswers),
    naoAceitacao: calculateSubscale('naoAceitacao', [11, 12, 21, 23, 29], 5, 25, calculatedAnswers)
  };

  // Step 3: Compute DERS-36 Total Score (Sum of all 36 calculated answers)
  let totalScore36 = 0;
  for (let i = 1; i <= 36; i++) {
    totalScore36 += calculatedAnswers[i];
  }

  const minTotal36 = 36;
  const maxTotal36 = 180;
  const normalizedPercentage36 = Math.round(((totalScore36 - minTotal36) / (maxTotal36 - minTotal36)) * 100);

  // Step 4: Dominant Pattern and Tailored Focus Areas
  const dominantPattern = determineDominantPattern(subscales);
  const focusAreas = generateFocusAreas(subscales);

  return {
    answers: completeRawAnswers,
    calculatedAnswers,
    totalScore36,
    minTotal36,
    maxTotal36,
    normalizedPercentage36,
    subscales,
    dominantPattern,
    focusAreas,
    completedAt: new Date().toISOString(),
    presetName,
    notes
  };
}

function calculateSubscale(
  key: SubscaleKey,
  itemIds: number[],
  min: number,
  max: number,
  calculatedAnswers: Record<number, number>
): SubscaleScore {
  const meta = SUBSCALE_METADATA[key];
  const score = itemIds.reduce((sum, id) => sum + (calculatedAnswers[id] || 1), 0);
  const percentage = Math.round(((score - min) / (max - min)) * 100);

  return {
    key,
    name: meta.name,
    score,
    min,
    max,
    percentage,
    description: meta.description,
    nonClinicalAvg: meta.nonClinicalAvg,
    clinicalAvg: meta.clinicalAvg
  };
}

export function getNormativeBand36(totalScore: number): {
  label: string;
  badgeColor: string;
  description: string;
  percentileEstimate: string;
} {
  // Gratz & Roemer (2004) normative benchmarks for DERS-36:
  // Non-clinical community sample mean ~ 78.0 (SD ~ 18.5)
  // Clinical sample mean ~ 118.5 (SD ~ 24.2)
  if (totalScore <= 68) {
    return {
      label: 'Faixa de Alto Equilíbrio (Média Comunitária Saudável)',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      description: 'Pontuação refletindo elevada consciência, clareza e autorregulação funcional diante das vicissitudes da vida.',
      percentileEstimate: 'Percentil estimado ~ 10º a 30º (Comunitário)'
    };
  } else if (totalScore <= 98) {
    return {
      label: 'Faixa Intermediária (Média Comunitária Habitual)',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      description: 'Dificuldades ocasionais em regular o estresse em períodos de alta exigência ou fadiga acumulada.',
      percentileEstimate: 'Percentil estimado ~ 35º a 65º (Comunitário)'
    };
  } else if (totalScore <= 130) {
    return {
      label: 'Faixa Elevada (Fronteira Clínico-Emocional)',
      badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-300 dark:border-orange-800',
      description: 'Pontuação alinhada a indivíduos em busca de psicoterapia por alto desgaste emocional ou ansiedade.',
      percentileEstimate: 'Percentil estimado ~ 70º a 88º (Comunitário) / ~ 45º (Clínico)'
    };
  } else {
    return {
      label: 'Faixa Alta (Perfil Clínico Acentuado de Desregulação)',
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      description: 'Significativo sofrimento emocional, desatenção afetiva, reatividade impulsiva e fraco repertório de estratégias.',
      percentileEstimate: 'Percentil estimado > 90º (Comunitário) / ~ 75º (Clínico)'
    };
  }
}

function determineDominantPattern(subscales: Record<SubscaleKey, SubscaleScore>): {
  title: string;
  subtitle: string;
  description: string;
  keyRisk: string;
  strength: string;
} {
  const highestSubscale = Object.values(subscales).reduce((prev, current) =>
    current.percentage > prev.percentage ? current : prev
  );

  if (highestSubscale.key === 'consciencia' && highestSubscale.percentage >= 45) {
    return {
      title: 'Perfil de Negligência ou Desconexão Afetiva (Pouca Consciência)',
      subtitle: 'Foco prioritário: Atenção Plena Somática & Escuta Interna (Mindfulness)',
      description: 'Sua maior vulnerabilidade está na desatenção em relação ao que sente. Você tende a ignorar os sinais do corpo e das emoções até que elas estourem de forma incontrolável.',
      keyRisk: 'Somatização física (dores, fadiga) e descompensação emocional súbita.',
      strength: 'Capacidade de focar na resolução prática do mundo externo sem se paralisar por qualquer desconforto.'
    };
  } else if (highestSubscale.key === 'naoAceitacao' && highestSubscale.percentage >= 45) {
    return {
      title: 'Perfil Autocrítico & Reatividade ao Sofrimento',
      subtitle: 'Foco prioritário: Autocompaixão e Aceitação Emocional (ACT/DBT)',
      description: 'Ao vivenciar angústia, você tende a se criticar ou sentir vergonha por estar assim, alimentando um ciclo de sofrimento secundário ("raiva por estar com raiva", "culpa por sentir tristeza").',
      keyRisk: 'Esgotamento por autopunição e rigidez na autoimagem.',
      strength: 'Elevada exigência pessoal e busca constante por aperfeiçoamento.'
    };
  } else if (highestSubscale.key === 'impulso' && highestSubscale.percentage >= 45) {
    return {
      title: 'Perfil Reativo de Alta Impulsividade sob Estresse',
      subtitle: 'Foco prioritário: Pausa Comportamental e Tolerância ao Mal-Estar (DBT STOP/TIPP)',
      description: 'Sob intensa emoção, a capacidade de inibir condutas impetuosas é temporariamente sequestrada, levando a reações verbais ou comportamentos de esquiva sem reflexão prévia.',
      keyRisk: 'Arrependimento por atitudes impetuosas em conflitos interpessoais.',
      strength: 'Espontaneidade e coragem para agir rapidamente em situações decisivas.'
    };
  } else if (highestSubscale.key === 'metas' && highestSubscale.percentage >= 45) {
    return {
      title: 'Perfil de Disrupção Atencional e Paralisação',
      subtitle: 'Foco prioritário: Ancoragem Atencional & Micro-metas (CBT)',
      description: 'Em momentos de estresse, a emoção consome sua memória de trabalho e energia mental, tornando muito difícil manter o foco em tarefas produtivas ou objetivos prioritários.',
      keyRisk: 'Acúmulo de prazos, procrastinação defensiva e sensação de sobrecarga.',
      strength: 'Grande sensibilidade para perceber alterações no clima ao redor.'
    };
  } else if (highestSubscale.key === 'estrategias' && highestSubscale.percentage >= 45) {
    return {
      title: 'Perfil de Impotência Regulatória e Ruminação',
      subtitle: 'Foco prioritário: Expansão de Repertório & Reavaliação Cognitiva (CBT)',
      description: 'Diante do sofrimento, predomina a crença de que nada pode ser feito para aliviar o estado negativo, gerando uma sensação prolongada de desamparo e resignação passiva.',
      keyRisk: 'Manutenção prolongada do humor triste ou ansioso sem busca ativa de alívio.',
      strength: 'Capacidade de acolher e vivenciar sentimentos profundos sem fingimento.'
    };
  } else if (highestSubscale.key === 'clareza' && highestSubscale.percentage >= 45) {
    return {
      title: 'Perfil de Névoa e Ambiguidade Emocional',
      subtitle: 'Foco prioritário: Rotulagem de Granularidade Emocional (CBT)',
      description: 'Você frequentemente experimenta sentimentos confusos ou indiferenciados, o que dificulta comunicar aos outros o que precisa ou escolher a estratégia adequada de alívio.',
      keyRisk: 'Sensação de desalinhamento interno e ruídos de comunicação interpessoal.',
      strength: 'Abertura para explorar novos significados pessoais.'
    };
  } else {
    return {
      title: 'Perfil de Fluidez e Elevado Equilíbrio Autorregulatório',
      subtitle: 'Foco prioritário: Manutenção da Higiene Regulatória Preventiva',
      description: 'Suas pontuações demonstram boa integração entre consciência, clareza e estratégias. Você compreende seus limites e utiliza ferramentas eficazes para retornar ao centro.',
      keyRisk: 'Subestimar o desgaste de fases prolongadas de privação de sono ou estresse.',
      strength: 'Excelente adaptabilidade e inteligência emocional pragmática.'
    };
  }
}

function generateFocusAreas(subscales: Record<SubscaleKey, SubscaleScore>): EmotionalFocusArea[] {
  const areas: EmotionalFocusArea[] = [];

  // Consciência
  if (subscales.consciencia.percentage >= 30) {
    areas.push({
      id: 'awareness-focus',
      title: '1. Consciência Emocional & Escuta Somática',
      priority: subscales.consciencia.percentage >= 50 ? 'Alta' : 'Média',
      subscaleRelated: 'Consciência Emocional',
      symptoms: [
        'Desatenção aos sinais físicos do corpo antes da explosão de estresse',
        'Tendência a desvalorizar ou engolir sentimentos desconfortáveis',
        'Lavar a mente com distrações para não ter que notar o que sente'
      ],
      recommendedTechniques: [
        {
          name: 'Check-in Somático de 2 Minutos (Mindfulness)',
          framework: 'Mindfulness',
          summary: 'Técnica de escuta sem julgamento para religar a consciência corporal.',
          instructions: [
            'Feche os olhos por 2 minutos e faça um rastreamento da cabeça aos pés.',
            'Note onde há tensão muscular, respiração curta ou aperto no peito.',
            'Diga a si mesmo(a): "Eu dou permissão para que o meu corpo sinta essa sensação sem tentar mudá-la agora."'
          ]
        }
      ]
    });
  }

  // Impulsos
  if (subscales.impulso.percentage >= 30) {
    areas.push({
      id: 'impulse-focus',
      title: '2. Controle de Impulsos & Pausa Comportamental',
      priority: subscales.impulso.percentage >= 50 ? 'Alta' : 'Média',
      subscaleRelated: 'Controle de Impulsos',
      symptoms: [
        'Reações verbais impetuosas sob irritação',
        'Impulso de mandar mensagens bruscas ou tomar decisões precipitadas',
        'Dificuldade de conter reações corporais sob provocação'
      ],
      recommendedTechniques: [
        {
          name: 'Técnica STOP (DBT)',
          framework: 'DBT',
          summary: 'Ferramenta de emergência para criar um espaço entre o estímulo e a reação.',
          instructions: [
            'S (Stop): Pare imediatamente ao notar o aumento da raiva.',
            'T (Take a step back): Dê um passo atrás fisicamente ou expire devagar.',
            'O (Observe): Observe o que está acontecendo sem agir no impulso.',
            'P (Proceed mindfully): Aja com foco no que trará paz a longo prazo.'
          ]
        }
      ]
    });
  }

  // Aceitação
  if (subscales.naoAceitacao.percentage >= 30) {
    areas.push({
      id: 'acceptance-focus',
      title: '3. Autocompaixão & Aceitação das Próprias Emoções',
      priority: subscales.naoAceitacao.percentage >= 50 ? 'Alta' : 'Média',
      subscaleRelated: 'Não Aceitação Emocional',
      symptoms: [
        'Ficar irritado(a) ou com vergonha de si mesmo(a) por sentir ansiedade/tristeza',
        'Rotular-se como "fraco(a)" ao passar por momentos difíceis',
        'Culpa secundária após chorar ou expressar vulnerabilidade'
      ],
      recommendedTechniques: [
        {
          name: 'Desfusão Cognitiva & Autocompaixão (ACT/CBT)',
          framework: 'ACT',
          summary: 'Separar quem você é do conteúdo dos pensamentos críticos.',
          instructions: [
            'Diga mentalmente: "Estou tendo o pensamento de que sou fraco, mas um pensamento não é um fato."',
            'Coloque a mão sobre o peito e acolha: "Sentir dor emocional é parte da humanidade; que eu seja gentil comigo."'
          ]
        }
      ]
    });
  }

  // Metas
  if (subscales.metas.percentage >= 30) {
    areas.push({
      id: 'goals-focus',
      title: '4. Engajamento em Metas sob Estresse',
      priority: subscales.metas.percentage >= 50 ? 'Alta' : 'Média',
      subscaleRelated: 'Engajamento em Metas',
      symptoms: [
        'Paralisação ou procrastinação defensiva ao sentir sobrecarga',
        'Perda do fio da meada em tarefas importantes durante momentos de tensão'
      ],
      recommendedTechniques: [
        {
          name: 'Ancoragem 5-4-3-2-1 e Micro-Passos (Mindfulness/CBT)',
          framework: 'CBT',
          summary: 'Reduzir a paralisia através do foco sensorial e da menor unidade de ação.',
          instructions: [
            'Use os 5 sentidos para ancorar no presente.',
            'Escolha o menor passo físico possível para iniciar a tarefa por apenas 5 minutos.'
          ]
        }
      ]
    });
  }

  if (areas.length === 0) {
    areas.push({
      id: 'general-prevention',
      title: '5. Higiene Regulatória Preventiva',
      priority: 'Preventiva',
      subscaleRelated: 'Acesso a Estratégias',
      symptoms: ['Manutenção da energia emocional em fases intensas'],
      recommendedTechniques: [
        {
          name: 'Diário de Bordo Emocional',
          framework: 'Mindfulness',
          summary: 'Registro breve de reflexão diária.',
          instructions: ['Dedique 2 minutos antes de dormir para registrar seus estados internos.']
        }
      ]
    });
  }

  return areas;
}
