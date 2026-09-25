import React, { useState } from 'react';
import {
  X,
  Upload,
  BookOpen,
  Sparkles,
  Loader2,
  Check,
  PlusCircle,
  AlertCircle,
} from 'lucide-react';
import { WhisperItem } from '../data/whispers';

interface CustomScriptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveNewWhisper: (whisper: WhisperItem) => void;
}

export const CustomScriptureModal: React.FC<CustomScriptureModalProps> = ({
  isOpen,
  onClose,
  onSaveNewWhisper,
}) => {
  const [reference, setReference] = useState('');
  const [referenceEn, setReferenceEn] = useState('');
  const [chineseText, setChineseText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [theme, setTheme] = useState('');
  const [whisperThought, setWhisperThought] = useState('');
  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false);
  const [quickInput, setQuickInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Let AI automatically expand any verse reference into full bilingual & father whisper
  const handleAIExpand = async () => {
    if (!quickInput.trim() && !chineseText.trim()) {
      setErrorMsg('請先輸入經文章節 (例如: 約翰福音 3:16) 或貼上經文');
      return;
    }
    setErrorMsg('');
    setIsGeneratingWithAI(true);

    try {
      const res = await fetch('/api/gemini/whisper-revelation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customInput: quickInput.trim() || `${reference} ${chineseText}`,
        }),
      });

      const json = await res.json();
      if (!json.success || !json.data) {
        throw new Error(json.error || '解析失敗');
      }

      const d = json.data;
      setReference(d.reference || '');
      setReferenceEn(d.referenceEn || '');
      setChineseText(d.chineseText || '');
      setEnglishText(d.englishText || '');
      setTheme(d.theme || '');
      setWhisperThought(d.whisperThought || '');
    } catch (e: any) {
      setErrorMsg(e.message || 'AI 擴展經文失敗，請手動填寫');
    } finally {
      setIsGeneratingWithAI(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference.trim() || !chineseText.trim()) {
      setErrorMsg('請填寫出處與中文經文內容');
      return;
    }

    const newWhisper: WhisperItem = {
      id: `custom-${Date.now()}`,
      reference: reference.trim(),
      referenceEn: referenceEn.trim() || `${reference.trim()} (ESV)`,
      theme: theme.trim() || '自訂聖經靈修啟示',
      category: 'stream',
      chineseText: chineseText.trim(),
      englishText:
        englishText.trim() ||
        'The Lord is faithful, and He will strengthen you and protect you.',
      whisperThought:
        whisperThought.trim() ||
        `孩子，我在這句經文裡向你顯明我的同在。將我的話藏在心裡，如同一棵樹栽在溪水旁，我的恩典必時常覆庇你。`,
      whisperThoughtEn:
        'My child, rest in my living word. As a tree by quiet streams, your soul shall find flourishing life in my love.',
      meditationPrompt:
        '安靜呼吸，在心中默想這句金句三次，將此話語深刻烙印在靈魂之中。',
      prayer: `親愛的天父，感謝祢賜下「${reference}」的話語，願祢的真理引導我今日的腳步。阿們。`,
      keyDeclaration: `神的話語是我腳前的燈、路上的光，我晝夜思想，凡所做的盡都順利！`,
      tag: '#自訂靈修經文 #天父耳語 #生命活水',
    };

    onSaveNewWhisper(newWhisper);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#FAF8F5] border border-[#E2D8CC] p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7B68] hover:bg-[#EFE9DF] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#665440] bg-[#EFE7DC] px-2.5 py-0.5 rounded-full">
            <Upload className="h-3.5 w-3.5 text-[#8A6A45]" />
            <span>自訂經文上傳</span>
          </div>
          <h3 className="font-serif-tc text-xl sm:text-2xl font-bold text-[#2C2724]">
            上傳與新增聖經金句
          </h3>
          <p className="text-xs text-[#7A6A55]">
            輸入你所喜愛的聖經經句或經節，可一鍵讓天父耳語生成引擎為你自動補齊中英對照、天父耳語與禱告宣告！
          </p>
        </div>

        {/* AI Quick Auto-Complete Box */}
        <div className="rounded-2xl bg-[#F4EFE6] border border-[#E2D6C5] p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#504030] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#9E7740]" />
              快速智慧辨識與擴展（可只輸入經節）
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="例如：約翰福音 15:5、詩篇 23:1 或 貼上一段經文..."
              className="flex-1 rounded-xl border border-[#D9CDBE] bg-white px-3 py-1.5 text-xs text-[#2C2724] focus:outline-none focus:ring-1 focus:ring-[#735D43]"
            />
            <button
              type="button"
              onClick={handleAIExpand}
              disabled={isGeneratingWithAI}
              className="rounded-xl bg-[#5C4D3B] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#473B2C] disabled:opacity-50 transition-colors flex items-center gap-1 shrink-0"
            >
              {isGeneratingWithAI ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>解析中...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>自動擴展對照</span>
                </>
              )}
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Manual Detailed Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#544534] mb-1">
                中文出處 (必填)
              </label>
              <input
                type="text"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="例如: 詩篇 23:1"
                className="w-full rounded-xl border border-[#E0D5C7] bg-white px-3 py-1.5 text-xs text-[#2C2724] focus:outline-none focus:ring-1 focus:ring-[#735D43]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#544534] mb-1">
                English Reference (選填)
              </label>
              <input
                type="text"
                value={referenceEn}
                onChange={(e) => setReferenceEn(e.target.value)}
                placeholder="e.g. Psalm 23:1 (ESV)"
                className="w-full rounded-xl border border-[#E0D5C7] bg-white px-3 py-1.5 text-xs text-[#2C2724] focus:outline-none focus:ring-1 focus:ring-[#735D43]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544534] mb-1">
              主題意涵 (選填)
            </label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="例如: 耶和華是我的牧者 · 一無所缺"
              className="w-full rounded-xl border border-[#E0D5C7] bg-white px-3 py-1.5 text-xs text-[#2C2724] focus:outline-none focus:ring-1 focus:ring-[#735D43]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544534] mb-1">
              中文聖經經文 (必填)
            </label>
            <textarea
              required
              rows={2}
              value={chineseText}
              onChange={(e) => setChineseText(e.target.value)}
              placeholder="貼上或輸入中文經文..."
              className="w-full rounded-xl border border-[#E0D5C7] bg-white p-2.5 text-xs font-serif-tc text-[#2C2724] focus:outline-none focus:ring-1 focus:ring-[#735D43]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544534] mb-1">
              English Scripture Text (選填)
            </label>
            <textarea
              rows={2}
              value={englishText}
              onChange={(e) => setEnglishText(e.target.value)}
              placeholder="English Scripture text (ESV/NIV)..."
              className="w-full rounded-xl border border-[#E0D5C7] bg-white p-2.5 text-xs font-en-serif text-[#2C2724] focus:outline-none focus:ring-1 focus:ring-[#735D43]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#544534] mb-1">
              天父耳語啟示 (第一人稱溫柔對話，選填)
            </label>
            <textarea
              rows={2}
              value={whisperThought}
              onChange={(e) => setWhisperThought(e.target.value)}
              placeholder="孩子，我在這裡與你同在..."
              className="w-full rounded-xl border border-[#E0D5C7] bg-white p-2.5 text-xs font-serif-tc text-[#2C2724] focus:outline-none focus:ring-1 focus:ring-[#735D43]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#D8CCBD] bg-white px-4 py-2 text-xs font-medium text-[#6B5A49] hover:bg-[#F5EFE7] transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#2C2724] px-5 py-2 text-xs font-semibold text-white hover:bg-[#433B36] transition-all shadow-xs flex items-center gap-1.5"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>儲存並立即加入靈糧</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
