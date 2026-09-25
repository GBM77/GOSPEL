import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

/**
 * 1. AI API: 自動於網上/聖經真理庫尋找或解析重要聖經金句，並生成天父耳語每日靈糧
 */
app.post('/api/gemini/whisper-revelation', async (req, res) => {
  try {
    const { topic, customInput } = req.body;

    const prompt = `
你是一位精通聖經和合本修訂版與ESV/NIV英文聖經的屬靈導師與牧者。
請依據使用者需求，產出一則具有深度加力、安慰與啟示的「天父耳語」每日靈糧。
核心精神為詩篇1:2-3「唯喜愛耶和華的法則，晝夜思想，此人便為有福！他要像一棵樹栽在溪水旁，按時結果子，葉子也不枯乾。凡他所做的都順利。」

需求內容：
${customInput ? `使用者提供的自訂聖經金句或書卷靈感：「${customInput}」` : `請在聖經中自動尋找一則極具啟示、安撫心靈、加添力量的關鍵聖經金句（主題靈感或心境：${topic || '隨機聖靈感動與加力'}）。`}

請嚴格以純 JSON 格式回傳（不要包含任何 markdown 標記如 \`\`\`json 等），包含以下欄位：
{
  "reference": "書卷 章:節 (例如: 詩篇 23:1-3 或 以賽亞書 40:29-31)",
  "referenceEn": "English Book Chapter:Verse (e.g., Psalm 23:1-3 (ESV))",
  "theme": "主題名稱（約8-14字，溫暖有力量）",
  "category": "stream 或 peace 或 strength 或 love 或 guidance 或 grace 或 hope",
  "chineseText": "中文聖經金句完整經文（和合本修訂版風格，嚴謹準確）",
  "englishText": "English scripture verse text (Accurate ESV or NIV translation)",
  "whisperThought": "天父以第一人稱（「孩子…我…」）對他/她說的溫柔耳語啟示（約120-180字，極溫柔、具體撫慰並帶來信心）",
  "whisperThoughtEn": "Father's gentle whisper in English corresponding to the message (about 50-80 words)",
  "meditationPrompt": "晝夜思想的默想指引與呼吸沉靜練習（約50-80字，如何將重擔置於活水泉旁）",
  "prayer": "回應天父的禱告詞（約60-90字，真誠交心）",
  "keyDeclaration": "一句簡短有力、朗朗上口的信心宣告詞（約20-35字）",
  "tag": "2-3個標籤，例如 #詩篇 #平安安息 #加添力量"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    let textResponse = response.text || '';
    // Clean up potential markdown wrapper
    textResponse = textResponse.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();

    const data = JSON.parse(textResponse);
    return res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error generating whisper revelation:', error);
    return res.status(500).json({
      success: false,
      error: error.message || '生成耳語靈糧時發生錯誤',
    });
  }
});

/**
 * 2. AI API: 生成溫柔自然逼真的中文/英文語音 (Gemini TTS)
 */
app.post('/api/gemini/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Kore', stylePrompt } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ success: false, error: 'Text is required' });
    }

    // Limit text length to prevent timeouts
    const clippedText = text.slice(0, 500);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: clippedText,
              speechMetadata: {
                style: stylePrompt || 'Gentle, very soothing, compassionate, peaceful whisper tone, slow and loving',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' },
          },
        },
      },
    });

    const base64Audio =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error('未能取得音訊資料');
    }

    return res.json({
      success: true,
      audioBase64: base64Audio,
      mimeType: 'audio/pcm;rate=24000',
    });
  } catch (error: any) {
    console.error('Error in Gemini TTS:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'TTS 生成失敗',
    });
  }
});

// Serve frontend in production or through Vite in dev
async function setupServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // When run via node server.ts from root or dist/server.js
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

setupServer();
