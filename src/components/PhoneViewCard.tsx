import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Bookmark,
  Share2,
  Copy,
  Check,
  Sparkles,
  Droplets,
  Heart,
  Upload,
  Download,
} from 'lucide-react';
import { WhisperItem } from '../data/whispers';
import { AudioPlayerBar } from './AudioPlayerBar';

interface PhoneViewCardProps {
  whisper: WhisperItem;
  currentIndex: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
  onRandom: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenShare: () => void;
  onOpenCustomScripture?: () => void;
  onOpenInstallModal?: () => void;
}

export const PhoneViewCard: React.FC<PhoneViewCardProps> = ({
  whisper,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
  onRandom,
  isBookmarked,
  onToggleBookmark,
  onOpenShare,
  onOpenCustomScripture,
  onOpenInstallModal,
}) => {
  const [activeTab, setActiveTab] = useState<'scripture' | 'whisper' | 'meditation' | 'prayer'>('scripture');
  const [copied, setCopied] = useState(false);

  const handleCopyText = async () => {
    const textToCopy = `【${whisper.reference}】\n${whisper.chineseText}\n\n${whisper.referenceEn}\n${whisper.englishText}\n\n🕊️ 天父耳語：\n${whisper.whisperThought}\n\n🙏 今日宣告：\n${whisper.keyDeclaration}\n\n——「唯喜愛耶和華的法則，晝夜思想，此人便為有福！」(詩篇 1:2)`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F5] text-[#2C2724] select-none">
      {/* Phone Header Toolbar */}
      <div className="shrink-0 flex items-center justify-between px-3 sm:px-4 py-2 border-b border-[#EBE4D8] bg-[#FAF8F5]/95">
        <div className="flex items-center gap-1.5 text-xs text-[#7A6A55]">
          <span className="font-semibold text-[#4A3E2F]">{whisper.reference}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums text-[11px] text-[#9E8E7A]">
            {currentIndex + 1} / {totalCount}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {onOpenInstallModal && (
            <button
              type="button"
              onClick={onOpenInstallModal}
              className="px-2 py-1 rounded-lg bg-[#2D5A38] text-white text-[11px] font-semibold flex items-center gap-1 hover:bg-[#23472C] transition-colors"
              title="安裝App到手機"
            >
              <Download className="h-3 w-3" />
              <span>安裝App</span>
            </button>
          )}
          {onOpenCustomScripture && (
            <button
              type="button"
              onClick={onOpenCustomScripture}
              className="p-1.5 rounded-lg text-[#6A5A48] hover:bg-[#EFE9DE] transition-colors"
              title="上傳經句"
            >
              <Upload className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onRandom}
            className="p-1.5 rounded-lg text-[#6A5A48] hover:bg-[#EFE9DE] transition-colors"
            title="隨機抽一則"
          >
            <Shuffle className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleCopyText}
            className="p-1.5 rounded-lg text-[#6A5A48] hover:bg-[#EFE9DE] transition-colors"
            title="複製經文與耳語"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked ? 'text-[#8A5528] bg-[#F3EAE0]' : 'text-[#6A5A48] hover:bg-[#EFE9DE]'
            }`}
            title={isBookmarked ? '已收藏' : '加入收藏'}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button
            type="button"
            onClick={onOpenShare}
            className="p-1.5 rounded-lg text-[#6A5A48] hover:bg-[#EFE9DE] transition-colors"
            title="分享金句卡片"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Core Concept Banner */}
      <div className="shrink-0 bg-[#F2EDE4] px-3.5 py-1.5 border-b border-[#E8DFD3] flex items-center justify-between text-[11px] text-[#786754]">
        <div className="flex items-center gap-1.5 truncate">
          <Droplets className="h-3 w-3 text-[#5A7B5A] shrink-0" />
          <span className="truncate font-medium">晝夜思想 · 如樹栽在溪水旁，按時結果，葉不枯乾</span>
        </div>
        <span className="shrink-0 text-[10px] text-[#9C8B77] ml-2">詩 1:2-3</span>
      </div>

      {/* Main Single-View Content Panel */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {/* Navigation Arrows & Theme */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onPrev}
            className="flex items-center gap-1 text-xs text-[#8A7966] hover:text-[#4A3E2F] py-1 px-2 rounded hover:bg-[#EFE8DE] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>上一則</span>
          </button>

          <span className="text-xs font-semibold text-[#5C4F3E] text-center px-2 py-0.5 bg-[#EFE9DE] rounded-md truncate max-w-[180px]">
            {whisper.theme}
          </span>

          <button
            type="button"
            onClick={onNext}
            className="flex items-center gap-1 text-xs text-[#8A7966] hover:text-[#4A3E2F] py-1 px-2 rounded hover:bg-[#EFE8DE] transition-colors"
          >
            <span>下一則</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Tab switcher for phone one-screen experience */}
        <div className="flex items-center p-1 bg-[#EBE4D8] rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('scripture')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${
              activeTab === 'scripture'
                ? 'bg-white text-[#3A3025] shadow-xs font-semibold'
                : 'text-[#6F604F] hover:text-[#3A3025]'
            }`}
          >
            金句對照
          </button>
          <button
            onClick={() => setActiveTab('whisper')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${
              activeTab === 'whisper'
                ? 'bg-white text-[#3A3025] shadow-xs font-semibold'
                : 'text-[#6F604F] hover:text-[#3A3025]'
            }`}
          >
            天父耳語
          </button>
          <button
            onClick={() => setActiveTab('meditation')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${
              activeTab === 'meditation'
                ? 'bg-white text-[#3A3025] shadow-xs font-semibold'
                : 'text-[#6F604F] hover:text-[#3A3025]'
            }`}
          >
            晝夜思想
          </button>
          <button
            onClick={() => setActiveTab('prayer')}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${
              activeTab === 'prayer'
                ? 'bg-white text-[#3A3025] shadow-xs font-semibold'
                : 'text-[#6F604F] hover:text-[#3A3025]'
            }`}
          >
            禱告宣告
          </button>
        </div>

        {/* Dynamic Tab Body */}
        {activeTab === 'scripture' && (
          <div className="space-y-3 animate-fadeIn">
            {/* Scripture Parallel Card */}
            <div className="rounded-2xl border border-[#E8DFD4] bg-white p-4 shadow-xs space-y-3.5">
              {/* Chinese Scripture */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#9A8B78] pb-1">
                  <span>中文聖經金句</span>
                  <span>和合本修訂</span>
                </div>
                <p className="font-serif-tc text-base sm:text-lg leading-relaxed text-[#2C2724] font-medium tracking-wide">
                  「{whisper.chineseText}」
                </p>
                <div className="text-right text-xs text-[#7A6A55] font-serif-tc font-semibold mt-1">
                  —— {whisper.reference}
                </div>
              </div>

              <div className="h-px bg-[#EFE9DF]" />

              {/* English Scripture */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#9A8B78] pb-1">
                  <span>English Scripture Parallel</span>
                  <span>{whisper.referenceEn}</span>
                </div>
                <p className="font-en-serif text-sm sm:text-base leading-relaxed text-[#4A423B] italic">
                  "{whisper.englishText}"
                </p>
              </div>
            </div>

            {/* Quick Whisper Preview Strip */}
            <div
              onClick={() => setActiveTab('whisper')}
              className="cursor-pointer rounded-xl bg-[#F6F2EA] border border-[#E6DDCE] p-3 text-xs text-[#5C4F3E] hover:bg-[#EFE8DC] transition-colors flex items-start gap-2"
            >
              <Sparkles className="h-4 w-4 text-[#8A6A45] shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block text-[#4A3D2F] mb-0.5">點此傾聽天父對你說的耳語：</span>
                <p className="line-clamp-2 text-[#6D5E4C] leading-normal font-serif-tc">
                  {whisper.whisperThought}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'whisper' && (
          <div className="rounded-2xl border border-[#E8DFD4] bg-gradient-to-b from-[#FBF9F5] to-white p-4 shadow-xs space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5A4B3A]">
              <Sparkles className="h-4 w-4 text-[#9C7948]" />
              <span>今日天父溫柔耳語 · 啟示加力</span>
            </div>

            <div className="rounded-xl bg-[#F5EFE4]/80 p-3.5 border-l-3 border-[#8C7150]">
              <p className="font-serif-tc text-sm sm:text-base leading-relaxed text-[#362E25] tracking-wide">
                {whisper.whisperThought}
              </p>
            </div>

            <div className="pt-1 border-t border-[#EFE9DF]">
              <div className="text-[11px] text-[#9A8B78] mb-1 font-sans-ui">Father's Whisper in English:</div>
              <p className="font-en-serif text-xs sm:text-sm text-[#5A5147] leading-relaxed italic">
                {whisper.whisperThoughtEn}
              </p>
            </div>

            <div className="rounded-lg bg-[#EFE9DE]/70 px-3 py-2 text-xs text-[#6A5946] flex items-center justify-between">
              <span>核心默想金句：</span>
              <span className="font-serif-tc font-semibold">{whisper.reference}</span>
            </div>
          </div>
        )}

        {activeTab === 'meditation' && (
          <div className="rounded-2xl border border-[#E8DFD4] bg-white p-4 shadow-xs space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5A4B3A]">
              <Droplets className="h-4 w-4 text-[#4E7A5A]" />
              <span>晝夜思想默想指引 · 連於活水清泉</span>
            </div>

            <p className="text-xs text-[#7A6A55] leading-relaxed">
              「唯喜愛耶和華的法則，晝夜思想，此人便為有福！他要像一棵樹栽在溪水旁，按時結果子，葉子也不枯乾。」（詩篇 1:2-3）
            </p>

            <div className="rounded-xl bg-[#F4F7F4] border border-[#DCE6DC] p-3.5 space-y-2">
              <span className="text-xs font-semibold text-[#2D5A38] block">今日心靈練習：</span>
              <p className="font-serif-tc text-xs sm:text-sm leading-relaxed text-[#26442E]">
                {whisper.meditationPrompt}
              </p>
            </div>

            <div className="rounded-xl bg-[#F8F5EE] border border-[#EAE2D2] p-3">
              <span className="text-[11px] font-semibold text-[#7A6A55] block mb-1">今日加力反思問答：</span>
              <ul className="text-xs text-[#5D5042] space-y-1.5 list-disc list-inside">
                <li>今天有哪一句話特別觸動你的心？</li>
                <li>你是否願意在此刻將手上的憂慮放進溪水中，讓天父來掌管？</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'prayer' && (
          <div className="rounded-2xl border border-[#E8DFD4] bg-white p-4 shadow-xs space-y-3.5 animate-fadeIn">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5A4B3A] mb-2">
                <Heart className="h-4 w-4 text-[#8A4A4A]" />
                <span>我的禱告回應 · 與天父交心</span>
              </div>
              <div className="rounded-xl bg-[#FBF7F2] border border-[#EFE4D6] p-3.5">
                <p className="font-serif-tc text-xs sm:text-sm leading-relaxed text-[#3D332B]">
                  {whisper.prayer}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5A4B3A] mb-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#A07A3E]" />
                <span>今日信心宣告</span>
              </div>
              <div className="rounded-xl bg-[#F6F1E6] border border-[#E5DAC6] p-3">
                <p className="font-serif-tc text-xs sm:text-sm font-semibold text-[#4F3E2B] leading-relaxed">
                  「{whisper.keyDeclaration}」
                </p>
              </div>
            </div>

            <div className="text-[11px] text-[#9A8B78] text-center pt-1">
              {whisper.tag}
            </div>
          </div>
        )}

        {/* Audio Narration Bar in Phone Mode */}
        <div className="pt-1">
          <AudioPlayerBar whisper={whisper} isMobileCompact={true} />
        </div>
      </div>

      {/* Phone Footer Status Strip */}
      <div className="shrink-0 px-4 py-2 border-t border-[#EBE4D8] bg-[#FAF8F5] text-center">
        <span className="text-[10px] text-[#A39380]">
          天父耳語 · 唯喜愛耶和華的法則，晝夜思想，凡所做的盡都順利
        </span>
      </div>
    </div>
  );
};
