import React from 'react';
import { SubscaleKey, SubscaleScore } from '../types/ders';

interface RadarChartProps {
  subscales: Record<SubscaleKey, SubscaleScore>;
}

export const RadarChart: React.FC<RadarChartProps> = ({ subscales }) => {
  const keys: SubscaleKey[] = ['consciencia', 'clareza', 'metas', 'impulso', 'estrategias', 'naoAceitacao'];
  const labels = ['Consciência', 'Clareza', 'Metas', 'Impulso', 'Estratégias', 'Não Aceitação'];

  // Radar geometry calculations
  const size = 340;
  const center = size / 2;
  const radius = 110;
  const total = keys.length; // 6 axes!

  // Calculate coordinates for a polygon given normalized percentages (0-100)
  const getCoordinates = (values: number[]) => {
    return values.map((val, i) => {
      const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
      const r = (val / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  // User values (percentages 0..100)
  const userValues = keys.map(k => subscales[k] ? subscales[k].percentage : 0);

  // Non-clinical average percentages normalized for DERS-36 (min..max)
  // Consciência: (12.8-6)/24 = 28.3%, Clareza: (10.2-5)/20 = 26%, Metas: (12.4-5)/20 = 37%, Impulso: (10.6-6)/24 = 19.1%, Estratégias: (15.8-8)/32 = 24.3%, NãoAceitação: (10.8-5)/20 = 29%
  const nonClinicalValues = [28.3, 26.0, 37.0, 19.1, 24.3, 29.0];

  // Clinical average percentages normalized for DERS-36
  // Consciência: (19.5-6)/24 = 56.2%, Clareza: (17.8-5)/20 = 64%, Metas: (19.2-5)/20 = 71%, Impulso: (18.9-6)/24 = 53.7%, Estratégias: (28.4-8)/32 = 63.7%, NãoAceitação: (20.1-5)/20 = 75.5%
  const clinicalValues = [56.2, 64.0, 71.0, 53.7, 63.7, 75.5];

  // Axis grid rings (20%, 40%, 60%, 80%, 100%)
  const rings = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
      <div className="text-center mb-4">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Perfil Perceptual das 6 Subescalas (Radar DERS-36)
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Visualização radar completa de vulnerabilidades autorregulatórias vs. normas comunitárias e clínicas
        </p>
      </div>

      <div className="relative w-full max-w-[350px] aspect-square flex items-center justify-center">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          {/* Concentric rings */}
          {rings.map((ring, idx) => {
            const r = radius * ring;
            const points = keys.map((_, i) => {
              const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            }).join(' ');
            return (
              <polygon
                key={idx}
                points={points}
                fill="none"
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeDasharray={idx === rings.length - 1 ? 'none' : '2,2'}
                strokeWidth="1"
              />
            );
          })}

          {/* Radial Axis Lines */}
          {keys.map((_, i) => {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1"
              />
            );
          })}

          {/* Benchmark: Non-Clinical Community Sample (Green Dashed Area) */}
          <polygon
            points={getCoordinates(nonClinicalValues)}
            fill="rgba(16, 185, 129, 0.12)"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Benchmark: Clinical Sample (Rose Dashed Area) */}
          <polygon
            points={getCoordinates(clinicalValues)}
            fill="rgba(244, 63, 94, 0.08)"
            stroke="#f43f5e"
            strokeWidth="1.5"
            strokeDasharray="3,3"
          />

          {/* User Results (Solid Teal Polygon) */}
          <polygon
            points={getCoordinates(userValues)}
            fill="rgba(20, 184, 166, 0.35)"
            stroke="#0d9488"
            strokeWidth="2.5"
          />

          {/* User Value Dots */}
          {userValues.map((val, i) => {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const r = (val / 100) * radius;
            const cx = center + r * Math.cos(angle);
            const cy = center + r * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="4"
                className="fill-teal-600 dark:fill-teal-400 stroke-white dark:stroke-slate-900"
                strokeWidth="2"
              />
            );
          })}

          {/* Labels */}
          {labels.map((label, i) => {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const labelRadius = radius + 22;
            const lx = center + labelRadius * Math.cos(angle);
            const ly = center + labelRadius * Math.sin(angle);

            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            if (Math.cos(angle) > 0.3) textAnchor = 'start';
            if (Math.cos(angle) < -0.3) textAnchor = 'end';

            return (
              <text
                key={i}
                x={lx}
                y={ly}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                className="text-[11px] font-bold fill-slate-700 dark:fill-slate-300 font-sans"
              >
                {label} ({userValues[i]}%)
              </text>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-teal-500/80 border border-teal-600 inline-block" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">Sua Pontuação</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t-2 border-dashed border-emerald-500 inline-block" />
          <span className="text-slate-600 dark:text-slate-400">Média Comunitária (~78)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t-2 border-dashed border-rose-500 inline-block" />
          <span className="text-slate-600 dark:text-slate-400">Média Clínica (~118)</span>
        </div>
      </div>
    </div>
  );
};
