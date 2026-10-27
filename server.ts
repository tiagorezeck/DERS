import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Endpoint for AI Deep Self-Knowledge & Psychoeducational Reflection (DERS-36)
app.post('/api/reflect', async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: 'Chave da API Gemini não configurada no servidor.'
      });
    }

    const { results, userNotes } = req.body;
    if (!results) {
      return res.status(400).json({ error: 'Dados dos resultados não fornecidos.' });
    }

    const prompt = `
Você é um psicólogo clínico sênior e especialista no teste DERS-36 (Difficulties in Emotion Regulation Scale de 36 itens de Gratz & Roemer, 2004) e em Terapias Cognitivo-Comportamentais de 3ª onda (CBT, DBT, ACT, Mindfulness).

Analise os resultados da escala DERS-36 de 36 questões do usuário para gerar um relatório profundo e prático de AUTOCONHECIMENTO:

**1. Métricas da Escala DERS-36 Completa:**
- Pontuação Total DERS-36: ${results.totalScore36} de 180 (Ajustado pós-inversão de itens, Posição relativa: ${results.normalizedPercentage36}%)
- Média Comunitária Saudável de Referência: ~78.0 | Média Clínica: ~118.5

**2. Padrão Dominante Identificado:**
- Título: ${results.dominantPattern?.title || 'Padrão Geral'}
- Descrição: ${results.dominantPattern?.description || ''}

**3. As 6 Subescalas Psicométricas Oficiais:**
- 1. Consciência Emocional (Awareness): ${results.subscales.consciencia?.score || 0} / 30 (Média Comunitária: 12.8, Clínica: 19.5)
- 2. Clareza Emocional (Clarity): ${results.subscales.clareza?.score || 0} / 25 (Média Comunitária: 10.2, Clínica: 17.8)
- 3. Engajamento em Metas (Goals): ${results.subscales.metas?.score || 0} / 25 (Média Comunitária: 12.4, Clínica: 19.2)
- 4. Controle de Impulsos (Impulse): ${results.subscales.impulso?.score || 0} / 30 (Média Comunitária: 10.6, Clínica: 18.9)
- 5. Acesso a Estratégias (Strategies): ${results.subscales.estrategias?.score || 0} / 40 (Média Comunitária: 15.8, Clínica: 28.4)
- 6. Não Aceitação Emocional (Non-acceptance): ${results.subscales.naoAceitacao?.score || 0} / 25 (Média Comunitária: 10.8, Clínica: 20.1)

${userNotes ? `**Notas Pessoais e Contexto Fornecido pelo Usuário:** "${userNotes}"` : ''}

Forneça um relatório de autoconhecimento profundo, empático e acionável em Markdown contendo:

1. **🌟 Análise Holística do seu Momento Emocional (DERS-36):**
   - Interpretação empática do seu resultado global (36–180) e do seu padrão dominante.
   - Destaque para a dimensão de Consciência Emocional (se você tende a prestar atenção ou a desconectar-se do corpo).

2. **🎯 Quais Pontos Emocionais Focar Prioritariamente:**
   - Identificação dos 2 ou 3 principais pontos cegos que mais trazem sofrimento ou desgaste interpessoal/pessoal.

3. **🛠️ Kit de Ferramentas de Autorregulação (Exercícios Práticos CBT/DBT/ACT):**
   - 3 a 4 exercícios práticos e passo-a-passo (ex: TIPP ou STOP para impulsos, Rastreamento Somático para Consciência, Desfusão Cognitiva para Não Aceitação, Ancoragem 5-4-3-2-1 para Metas).

4. **📓 Perguntas para o seu Diário de Autorreflexão:**
   - 3 perguntas terapêuticas profundas para o usuário refletir ao longo da semana.

Escreva em português brasileiro fluido, acolhedor, estruturado e com riqueza em Markdown.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({ text: response.text });
  } catch (err: any) {
    console.error('Erro na API de reflexão Gemini:', err);
    return res.status(500).json({
      error: 'Ocorreu um erro ao processar a reflexão com IA.',
      details: err?.message || String(err),
    });
  }
});

// Setup Vite in Dev or Static files in Production
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await import('vite');
    const viteDevServer = await vite.createServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'custom',
    });
    app.use(viteDevServer.middlewares);

    app.use('*', async (req, res, next) => {
      if (req.originalUrl.startsWith('/api')) return next();
      try {
        const fs = await import('fs');
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await viteDevServer.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        viteDevServer.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor DERS-36 Completo rodando na porta ${PORT}`);
  });
}

setupServer();
