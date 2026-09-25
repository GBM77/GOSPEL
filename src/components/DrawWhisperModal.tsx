import React, { useState } from 'react';
import {
  X,
  Sparkles,
  RefreshCw,
  Droplets,
  ArrowRight,
  Globe,
  Loader2,
  BookOpen,
} from 'lucide-react';
import { WhisperItem, WHISPER_ITEMS } from '../data/whispers';

interface DrawWhisperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWhisper: (whisper: WhisperItem) => void;
  onAddNewToPool?: (whisper: WhisperItem) => void;
}

export const DrawWhisperModal: React.FC<DrawWhisperModalProps> = ({
  isOpen,
  onClose,
  onSelectWhisper,
  onAddNewToPool,
}) => {
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);
  const [shuffledCards, setShuffledCards] = useState<WhisperItem[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoSearchingOnline, setIsAutoSearchingOnline] = useState(false);
  const [onlineTopic, setOnlineTopic] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      // Pick 3 random distinct whispers from base pool
      const shuffled = [...WHISPER_ITEMS].sort(() => 0.5 - Math.random());
      setShuffledCards(shuffled.slice(0, 3));
      setSelectedCardIdx(null);
      setIsFlipped(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePickCard = (idx: number) => {
    setSelectedCardIdx(idx);
    setIsFlipped(true);
  };

  const handleReshuffle = () => {
    const shuffled = [...WHISPER_ITEMS].sort(() => 0.5 - Math.random());
    setShuffledCards(shuffled.slice(0, 3));
    setSelectedCardIdx(null);
    setIsFlipped(false);
  };

  /**
   * Feature 3: 自動上網/雲端尋找重要的聖經經句並生成天父耳語
   */
  const handleAutoSearchOnline = async (specificTopic?: string) => {
    setIsAutoSearchingOnline(true);
    try {
      const res = await fetch('/api/gemini/whisper-revelation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: specificTopic || onlineTopic.trim() || '如溪水旁的樹、加添心力、釋放憂慮、得勝平安',
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        const item: WhisperItem = {
          id: `online-${Date.now()}`,
          reference: json.data.reference,
          referenceEn: json.data.referenceEn,
          theme: json.data.theme,
          category: json.data.category || 'stream',
          chineseText: json.data.chineseText,
          englishText: json.data.englishText,
          whisperThought: json.data.whisperThought,
          whisperThoughtEn: json.data.whisperThoughtEn,
          meditationPrompt: json.data.meditationPrompt,
          prayer: json.data.prayer,
          keyDeclaration: json.data.keyDeclaration,
          tag: json.data.tag || '#聖靈感動 #每日靈糧',
        };

        if (onAddNewToPool) {
          onAddNewToPool(item);
        }

        // Put as front revealed card
        setShuffledCards([item, ...shuffledCards.slice(0, 2)]);
        setSelectedCardIdx(0);
        setIsFlipped(true);
      }
    } catch (e) {
      console.error('Online scripture search failed:', e);
    } finally {
      setIsAutoSearchingOnline(false);
    }
  };

  const chosenWhisper = selectedCardIdx !== null ? shuffledCards[selectedCardIdx] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#FAF8F5] border border-[#E4DBD0] p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7B68] hover:bg-[#EFE9DF] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A6A55] bg-[#EFE8DD] px-3 py-1 rounded-full">
            <Sparkles className="h-3.5 w-3.5 text-[#A67E42]" />
            <span>心靈抽卡 · 每日甘霖</span>
          </div>
          <h2 className="font-serif-tc text-2xl font-bold text-[#2C2724]">
            抽取今日天父耳語
          </h2>
          <p className="text-xs text-[#7A6A55] max-w-md mx-auto">
            安靜心神，深呼吸。隨心翻開一張卡片，或點選「自動上網探詢金句」即時尋索啟示。
          </p>
        </div>

        {/* Automatic Online Verse Fetch Bar (Feature 3 Requested) */}
        <div className="rounded-2xl bg-[#EFE8DC]/80 border border-[#DDD0BF] p-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#7A5F3B] shrink-0" />
            <span className="font-semibold text-[#4A3D2F]">聯網智能尋索：</span>
          </div>
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              type="button"
              disabled={isAutoSearchingOnline}
              onClick={() => handleAutoSearchOnline()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-[#594936] text-white px-3.5 py-1.5 font-medium hover:bg-[#433625] transition-colors disabled:opacity-50"
            >
              {isAutoSearchingOnline ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>網上尋索經句中...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>自動上網尋找聖經金句</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3 Interactive Cards */}
        {!isFlipped ? (
          <div className="grid grid-cols-3 gap-3 sm:gap-4 py-2">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => handlePickCard(idx)}
                className="group relative aspect-[3/4] rounded-2xl border-2 border-[#D8CABE] bg-gradient-to-br from-[#EDE4D5] to-[#DFD3C1] p-3 shadow-md hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between text-center cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#7A6A55] shadow-xs">
                  <Droplets className="h-4 w-4 text-[#5A7B5A]" />
                </div>
                <div className="space-y-1">
                  <span className="font-serif-tc text-xs sm:text-sm font-bold text-[#4A3D2F] block">
                    天父耳語
                  </span>
                  <span className="text-[10px] text-[#7A6A55] block">
                    點擊翻開
                  </span>
                </div>
                <div className="text-[9px] text-[#8C7B68] tracking-widest uppercase">
                  Father's Whisper
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Card Revealed State */
          chosenWhisper && (
            <div className="rounded-2xl border border-[#D8CABE] bg-white p-5 sm:p-6 shadow-sm space-y-4 animate-scaleUp">
              <div className="flex items-center justify-between text-xs text-[#8A7966] pb-2 border-b border-[#EFE9DF]">
                <span className="font-bold text-[#4A3E2F]">{chosenWhisper.reference}</span>
                <span className="bg-[#F4EFE6] px-2 py-0.5 rounded text-[11px] font-medium text-[#7A6A55]">
                  {chosenWhisper.theme}
                </span>
              </div>

              <div>
                <p className="font-serif-tc text-base sm:text-lg font-semibold text-[#2C2724] leading-relaxed">
                  「{chosenWhisper.chineseText}」
                </p>
                <p className="font-en-serif text-xs sm:text-sm text-[#5C5348] italic mt-1 leading-relaxed">
                  "{chosenWhisper.englishText}"
                </p>
              </div>

              <div className="rounded-xl bg-[#FAF5EC] border-l-3 border-[#8C704D] p-3 text-xs sm:text-sm text-[#3E3328] font-serif-tc leading-relaxed">
                <span className="font-bold text-[#5A4B3A] block mb-1">🕊️ 耳語啟示：</span>
                {chosenWhisper.whisperThought}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleReshuffle}
                  className="flex items-center gap-1 text-xs text-[#7A6A55] hover:text-[#4A3E2F] py-1.5 px-3 rounded-lg hover:bg-[#EFE8DD] transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>重新抽一張</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSelectWhisper(chosenWhisper);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-[#2C2724] px-4 py-2 text-xs font-semibold text-white hover:bg-[#433B36] transition-all shadow-xs"
                >
                  <span>進入深讀與聆聽</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )
        )}

        {/* Footer info */}
        <div className="text-center text-[11px] text-[#A69784]">
          詩篇 1:2-3 · 晝夜思想祂的話語，一生長青、凡事順利
        </div>
      </div>
    </div>
  );
};
