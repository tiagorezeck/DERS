/**
 * DERS-36 Completo (Escala de Dificuldades na Regulação Emocional de 36 Itens - Gratz & Roemer, 2004)
 * Tipos Psicométricos & Estrutura de Autoconhecimento
 */

export type SubscaleKey = 'consciencia' | 'clareza' | 'metas' | 'impulso' | 'estrategias' | 'naoAceitacao';

export interface DERSItem {
  id: number;
  text: string;
  subscale: SubscaleKey;
  subscaleName: string;
  isReversed?: boolean; // Se true, pontuação e.g. 1 vira 5, 2 vira 4, etc.
  description: string;
}

export interface ScaleAnchor {
  value: number;
  label: string;
  percentage: string;
  description: string;
}

export interface SubscaleScore {
  key: SubscaleKey;
  name: string;
  score: number;
  min: number;
  max: number;
  percentage: number; // Normalizado estritamente em min..max
  description: string;
  nonClinicalAvg: number;
  clinicalAvg: number;
}

export interface EmotionalFocusArea {
  id: string;
  title: string;
  priority: 'Alta' | 'Média' | 'Preventiva';
  subscaleRelated: string;
  symptoms: string[];
  recommendedTechniques: {
    name: string;
    framework: 'DBT' | 'CBT' | 'ACT' | 'Mindfulness';
    summary: string;
    instructions: string[];
  }[];
}

export interface DERSResults {
  answers: Record<number, number>; // Respostas brutas 1 a 5
  calculatedAnswers: Record<number, number>; // Respostas ajustadas pós-inversão
  
  // DERS-36 Core Metrics
  totalScore36: number; // 36 a 180
  minTotal36: number; // 36
  maxTotal36: number; // 180
  normalizedPercentage36: number; // ((total - 36) / 144) * 100
  
  subscales: Record<SubscaleKey, SubscaleScore>;
  
  // Self-Knowledge Insights
  dominantPattern: {
    title: string;
    subtitle: string;
    description: string;
    keyRisk: string;
    strength: string;
  };
  focusAreas: EmotionalFocusArea[];
  
  completedAt: string;
  presetName?: string;
  notes?: string;
  aiReflection?: string;
}

export interface PresetProfile {
  id: string;
  name: string;
  tagline: string;
  description: string;
  answers: Record<number, number>;
}
