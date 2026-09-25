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
  Volume2,
  BookOpen,
  Sun,
  Search,
  Upload,
} from 'lucide-react';
import { WhisperItem, CATEGORIES } from '../data/whispers';
import { AudioPlayerBar } from './AudioPlayerBar';

interface DesktopViewProps {
  whisper: WhisperItem;
  currentIndex: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
  onRandom: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenShare: () => void;
  whisperList: WhisperItem[];
  onSelectWhisper: (whisper: WhisperItem) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenCustomScripture: () => void;
}

export const DesktopView: React.FC<DesktopViewProps> = ({
  whisper,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
  onRandom,
  isBookmarked,
  onToggleBookmark,
  onOpenShare,
  whisperList,
  onSelectWhisper,
  selectedCategory,
  onSelectCategory,
  onOpenCustomScripture,
}) => {
  const [copied, setCopied] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleCopyText = async () => {
    const textToCopy = `【${whisper.reference}】\n${whisper.chineseText}\n\n${whisper.referenceEn}\n${whisper.englishText}\n\n🕊️ 天父耳語啟示：\n${whisper.whisperThought}\n\n🙏 今日宣告：\n${whisper.keyDeclaration}\n\n——「唯喜愛耶和華的法則，晝夜思想，此人便為有福！」(詩篇 1:2)`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // fallback
    }
  };

  const filteredWhispers = whisperList.filter((item) => {
    if (!searchKeyword.trim()) return true;
    const kw = searchKeyword.toLowerCase();
    return (
      item.reference.toLowerCase().includes(kw) ||
      item.chineseText.toLowerCase().includes(kw) ||
      item.englishText.toLowerCase().includes(kw) ||
      item.theme.toLowerCase().includes(kw) ||
      item.whisperThought.toLowerCase().includes(kw)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Hero Banner: Psalm 1:2-3 The Core Anchor */}
      <section className="relative overflow-hidden rounded-3xl border border-[#E4DBD0] bg-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px]">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between z-10 bg-gradient-to-r from-white via-white/95 to-white/70">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#7A6A55]">
                <Droplets className="h-4 w-4 text-[#4D754F]" />
                <span>天父耳語 · 核心啟示思想</span>
                <span aria-hidden="true">·</span>
                <span className="font-serif-tc text-[#948370]">詩篇 1:2-3</span>
              </div>

              <h1 className="font-serif-tc text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#241F1C] leading-snug">
                像一棵樹栽在溪水旁，
                <br />
                <span className="text-[#6D5D4B]">晝夜思想，凡所做的盡都順利</span>
              </h1>

              <p className="font-serif-tc text-sm sm:text-base text-[#52463B] leading-relaxed max-w-2xl">
                「唯喜愛耶和華的法則，晝夜思想，此人便為有福！他要像一棵樹栽在溪水旁，按時結果子，葉子也不枯乾。凡他所做的都順利。」
              </p>

              <p className="font-en-serif text-xs sm:text-sm text-[#7D7063] italic max-w-2xl leading-relaxed">
                "He is like a tree planted by streams of water that yields its fruit in its season, and its leaf does not wither. In all that he does, he prospers."
              </p>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onRandom}
                className="flex items-center gap-2 rounded-xl bg-[#2C2724] px-4 py-2.5 text-xs sm:text-sm font-medium text-white hover:bg-[#433B36] transition-all shadow-sm"
              >
                <Shuffle className="h-4 w-4" />
                <span>抽取今日天父耳語 (自動尋索)</span>
              </button>

              <button
                type="button"
                onClick={onOpenCustomScripture}
                className="flex items-center gap-1.5 rounded-xl border border-[#D5C9B8] bg-[#F7F4EE] px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#4A3E2F] hover:bg-[#EFE8DC] transition-colors"
              >
                <Upload className="h-4 w-4 text-[#8A6A45]" />
                <span>自行上傳聖經經句</span>
              </button>
            </div>
          </div>

          {/* Hero Right Image Asset */}
          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full">
            <img
              src="/src/assets/images/tree_by_streams_1790301842480.jpg"
              alt="栽在溪水旁的繁盛綠樹與清澈晨光"
              className="absolute inset-0 h-full w-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white/30 lg:to-transparent" />
            <div className="absolute bottom-3 right-4 text-right text-[11px] text-white/90 drop-shadow-md">
              <span className="font-serif-tc">詩篇 1:3 溪水旁的祝福</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#3A332C] text-white shadow-xs'
                  : 'bg-[#F2ECE1] text-[#635544] hover:bg-[#EBE2D4] border border-[#E4DAD0]'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </section>

      {/* Main Content Grid: Left Active Whisper + Right Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Primary Whisper Display & Narration */}
        <div className="lg:col-span-8 space-y-6">
          {/* Whisper Main Card */}
          <article className="rounded-3xl border border-[#E6DDD0] bg-white p-6 sm:p-8 shadow-xs space-y-6">
            {/* Top Card Bar: Topic & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EFE9DF]">
              <div className="flex items-center gap-2">
                <span className="font-serif-tc text-sm sm:text-base font-bold text-[#3B3228]">
                  {whisper.reference}
                </span>
                <span aria-hidden="true" className="text-[#C4B7A5]">·</span>
                <span className="text-xs sm:text-sm font-medium text-[#7A6A55] bg-[#F4EFE6] px-2.5 py-0.5 rounded-md">
                  {whisper.theme}
                </span>
              </div>

              {/* Navigation & Affordances */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onPrev}
                  className="p-1.5 rounded-lg text-[#6A5A48] hover:bg-[#F2ECE1] transition-colors"
                  title="上一篇"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <span className="text-xs text-[#9E8E7A] tabular-nums px-1">
                  {currentIndex + 1} / {totalCount}
                </span>

                <button
                  type="button"
                  onClick={onNext}
                  className="p-1.5 rounded-lg text-[#6A5A48] hover:bg-[#F2ECE1] transition-colors"
                  title="下一篇"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <div className="h-4 w-px bg-[#E6DDD0] mx-1" />

                <button
                  type="button"
                  onClick={handleCopyText}
                  className="p-1.5 rounded-lg text-[#6A5A48] hover:bg-[#F2ECE1] transition-colors"
                  title="複製經文與耳語"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>

                <button
                  type="button"
                  onClick={onToggleBookmark}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isBookmarked ? 'text-[#8A5528] bg-[#F4EAE0]' : 'text-[#6A5A48] hover:bg-[#F2ECE1]'
                  }`}
                  title={isBookmarked ? '已收藏' : '加入收藏'}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={onOpenShare}
                  className="p-1.5 rounded-lg text-[#6A5A48] hover:bg-[#F2ECE1] transition-colors"
                  title="製作分享圖卡"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scripture Parallel */}
            <div className="space-y-5">
              {/* Chinese Scripture */}
              <div className="rounded-2xl bg-[#FCFAF7] border border-[#EFEAE2] p-5 sm:p-6 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8A7966]">
                  <span className="font-semibold flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-[#7A6A55]" />
                    中文聖經金句
                  </span>
                  <span className="text-[11px] text-[#A69784]">和合本修訂 / 深研思想</span>
                </div>
                <p className="font-serif-tc text-lg sm:text-xl md:text-2xl text-[#221C18] leading-relaxed font-semibold tracking-wide">
                  「{whisper.chineseText}」
                </p>
                <div className="text-right font-serif-tc text-xs text-[#7A6A55] font-semibold">
                  —— {whisper.reference}
                </div>
              </div>

              {/* English Scripture Parallel */}
              <div className="rounded-2xl bg-[#F7F4EE]/80 border border-[#EAE2D5] p-5 sm:p-6 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8A7966]">
                  <span className="font-semibold flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-[#7A6A55]" />
                    English Parallel Scripture
                  </span>
                  <span className="text-[11px] text-[#A69784] font-en-serif">{whisper.referenceEn}</span>
                </div>
                <p className="font-en-serif text-base sm:text-lg md:text-xl text-[#3A332B] leading-relaxed italic">
                  "{whisper.englishText}"
                </p>
              </div>
            </div>

            {/* Audio Gentle Reading Player Bar */}
            <AudioPlayerBar whisper={whisper} />

            {/* Section 1: Father's Whisper Revelation */}
            <div className="rounded-2xl bg-gradient-to-br from-[#FAF6EF] to-[#F5ECE0] border border-[#E2D5C3] p-5 sm:p-7 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#4F3F2E]">
                <Sparkles className="h-4 w-4 text-[#9E7845]" />
                <span>天父的溫柔耳語 · 啟示加力</span>
              </div>

              <div className="rounded-xl bg-white/70 backdrop-blur-xs p-4 sm:p-5 border-l-4 border-[#8C6F4B]">
                <p className="font-serif-tc text-sm sm:text-base text-[#2E251E] leading-relaxed tracking-wide">
                  {whisper.whisperThought}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-sans-ui text-[#8A7966] block mb-1">
                  In English Meditation:
                </span>
                <p className="font-en-serif text-xs sm:text-sm text-[#54483C] leading-relaxed italic">
                  {whisper.whisperThoughtEn}
                </p>
              </div>
            </div>

            {/* Section 2: Day & Night Meditation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Day & Night Reflection */}
              <div className="rounded-2xl bg-[#F7F9F7] border border-[#D9E5D9] p-5 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2A5232]">
                  <Droplets className="h-4 w-4 text-[#3D7448]" />
                  <span>晝夜思想默想 · 心靈練習</span>
                </div>
                <p className="font-serif-tc text-xs sm:text-sm leading-relaxed text-[#233F28]">
                  {whisper.meditationPrompt}
                </p>
              </div>

              {/* Prayerful Response & Declaration */}
              <div className="rounded-2xl bg-[#FCF8F5] border border-[#EDE1D3] p-5 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#5C3F2B]">
                  <Heart className="h-4 w-4 text-[#8C4A4A]" />
                  <span>今日禱告與宣告</span>
                </div>
                <p className="font-serif-tc text-xs sm:text-sm leading-relaxed text-[#3B2C21]">
                  {whisper.prayer}
                </p>
                <div className="pt-2 border-t border-[#E8DACB]">
                  <span className="text-[11px] font-bold text-[#6D492A] block mb-0.5">信心宣告：</span>
                  <p className="font-serif-tc text-xs font-semibold text-[#4A321D]">
                    「{whisper.keyDeclaration}」
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Meta Tags */}
            <div className="flex items-center justify-between text-xs text-[#9C8C7A] pt-2">
              <span>{whisper.tag}</span>
              <span className="font-serif-tc">每日加力靈糧 · 讓愛充滿心房</span>
            </div>
          </article>
        </div>

        {/* Right Column (4 cols): Directory & Quick Exploration */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Card: Core Psalm 1:2-3 Truth Card */}
          <div className="rounded-3xl border border-[#DFD5C6] bg-[#F8F5EE] p-6 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#544332]">
              <Sun className="h-4 w-4 text-[#A87B38]" />
              <span>蒙福法則 · 核心真理</span>
            </div>

            <blockquote className="font-serif-tc text-sm text-[#382E24] leading-relaxed pl-3 border-l-2 border-[#8A7150]">
              「唯喜愛耶和華的法則，晝夜思想，此人便為有福！他要像一棵樹栽在溪水旁，按時結果子，葉子也不枯乾。凡他所做的都順利。」
            </blockquote>

            <p className="text-xs text-[#6B5A47] leading-relaxed">
              神的話不是重擔，而是流過生命根基的活水清泉。每一次默想，都是讓樹根往深處吸取源源不絕的滋養。
            </p>
          </div>

          {/* Quick Drawer / List of Whispers */}
          <div className="rounded-3xl border border-[#E6DDD0] bg-white p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#4A3D2F] flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-[#7A6A55]" />
                <span>金句耳語寶庫</span>
                <span className="text-[11px] text-[#9A8B78] tabular-nums">
                  ({filteredWhispers.length})
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenCustomScripture}
                className="text-xs text-[#7A5B36] hover:text-[#523A1E] font-medium flex items-center gap-1"
              >
                <Upload className="h-3 w-3" />
                <span>+ 上傳</span>
              </button>
            </div>

            {/* Quick search input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#9E8F7E]" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="搜尋經文、書卷或關鍵字..."
                className="w-full rounded-xl border border-[#E4DBD0] bg-[#FAF8F5] pl-9 pr-3 py-1.5 text-xs text-[#332B25] placeholder-[#A69888] focus:outline-none focus:ring-1 focus:ring-[#6E5C47]"
              />
            </div>

            {/* Scrollable list */}
            <div className="max-h-[380px] overflow-y-auto space-y-1.5 pr-1">
              {filteredWhispers.map((item) => {
                const isSelected = item.id === whisper.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectWhisper(item)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#3A3229] text-white shadow-xs'
                        : 'bg-[#F9F6F0] hover:bg-[#F0E9DC] text-[#4A3E2F]'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-xs font-semibold truncate">
                        <span className="truncate">{item.reference}</span>
                        <span className={`text-[10px] truncate ${isSelected ? 'text-[#D0C2AF]' : 'text-[#8C7A65]'}`}>
                          · {item.theme}
                        </span>
                      </div>
                      <p className={`text-[11px] line-clamp-1 font-serif-tc mt-0.5 ${isSelected ? 'text-[#E5DCCE]' : 'text-[#6E5F4E]'}`}>
                        {item.chineseText}
                      </p>
                    </div>
                  </button>
                );
              })}

              {filteredWhispers.length === 0 && (
                <div className="text-center py-6 text-xs text-[#9C8B77]">
                  未找到符合「{searchKeyword}」的耳語金句
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
