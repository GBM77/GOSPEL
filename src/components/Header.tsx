import React from 'react';
import {
  Smartphone,
  Monitor,
  Droplets,
  VolumeX,
  Bookmark,
  Upload,
  Wind,
  Waves,
  Mountain,
  CloudRain,
  ChevronDown,
  Download,
} from 'lucide-react';
import { AmbianceType, AMBIANCE_TRACKS } from '../utils/audioSpeech';

interface HeaderProps {
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  isStreamAmbiancePlaying: boolean;
  onToggleStreamAmbiance: () => void;
  savedCount: number;
  onOpenBookmarks: () => void;
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
  onDrawRandom: () => void;
  currentAmbiance: AmbianceType;
  onOpenAmbianceSelector: () => void;
  onOpenCustomScripture: () => void;
  onOpenInstallModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isPhoneFrame,
  onTogglePhoneFrame,
  isStreamAmbiancePlaying,
  onToggleStreamAmbiance,
  savedCount,
  onOpenBookmarks,
  onSelectCategory,
  activeCategory,
  onDrawRandom,
  currentAmbiance,
  onOpenAmbianceSelector,
  onOpenCustomScripture,
  onOpenInstallModal,
}) => {
  const currentTrackObj =
    AMBIANCE_TRACKS.find((t) => t.id === currentAmbiance) || AMBIANCE_TRACKS[0];

  const renderAmbianceIcon = () => {
    switch (currentAmbiance) {
      case 'breeze':
        return <Wind className="h-3.5 w-3.5 text-[#4D7A5E]" />;
      case 'ocean':
        return <Waves className="h-3.5 w-3.5 text-[#3A6B7A]" />;
      case 'waterfall':
        return <Mountain className="h-3.5 w-3.5 text-[#5A6F4E]" />;
      case 'rain':
        return <CloudRain className="h-3.5 w-3.5 text-[#4E6B7A]" />;
      default:
        return <Droplets className="h-3.5 w-3.5 text-[#3A6B3E]" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#E8DFD4] bg-[#FAF8F5]/90 px-3 sm:px-6 py-2.5 sm:py-3 backdrop-blur-md">
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
          }}
          className="font-serif-tc text-base sm:text-xl font-bold tracking-tight text-[#2C2724] hover:text-[#5C4F3E] transition-colors whitespace-nowrap"
        >
          天父耳語 · 每日靈糧
        </a>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-medium text-[#6B5D4D]">
        <button
          onClick={() => onSelectCategory('stream')}
          className={`hover:text-[#2C2724] transition-colors relative py-1 ${
            activeCategory === 'stream' ? 'text-[#2C2724] font-semibold' : ''
          }`}
        >
          溪水旁的樹（核心）
        </button>

        <button
          onClick={() => onSelectCategory('all')}
          className={`hover:text-[#2C2724] transition-colors relative py-1 ${
            activeCategory === 'all' ? 'text-[#2C2724] font-semibold' : ''
          }`}
        >
          金句總覽
        </button>

        <button
          onClick={onDrawRandom}
          className="hover:text-[#2C2724] transition-colors relative py-1"
        >
          抽取今日耳語
        </button>

        <button
          onClick={onOpenCustomScripture}
          className="hover:text-[#2C2724] transition-colors relative py-1 flex items-center gap-1"
        >
          <Upload className="h-3.5 w-3.5 text-[#8A6A45]" />
          <span>上傳經句</span>
        </button>

        <button
          onClick={onOpenBookmarks}
          className="hover:text-[#2C2724] transition-colors relative py-1 flex items-center gap-1.5"
        >
          <span>已收藏</span>
          {savedCount > 0 && (
            <span className="text-[11px] font-sans-ui bg-[#E5DDCF] text-[#4A3E2F] px-1.5 py-0.2 rounded-full tabular-nums">
              {savedCount}
            </span>
          )}
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Background Sound Selector Dropdown */}
        <div className="flex items-center rounded-lg border border-[#DCD3C5] bg-[#F3ECE1] shadow-2xs overflow-hidden">
          <button
            type="button"
            onClick={onToggleStreamAmbiance}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isStreamAmbiancePlaying
                ? 'bg-[#E5EDE5] text-[#2C4A2E]'
                : 'text-[#6B5D4D] hover:bg-[#EBE2D4]'
            }`}
            title={
              isStreamAmbiancePlaying
                ? `靜音背景音 (${currentTrackObj.name})`
                : `播放背景音 (${currentTrackObj.name})`
            }
          >
            {isStreamAmbiancePlaying ? (
              <>
                <span className="animate-pulse">{renderAmbianceIcon()}</span>
                <span className="hidden md:inline font-semibold">{currentTrackObj.name}中</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 opacity-70" />
                <span className="hidden md:inline">{currentTrackObj.name}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenAmbianceSelector}
            className="px-1.5 py-1.5 text-[#6B5D4D] hover:bg-[#E8DFD0] border-l border-[#D8CEC0] transition-colors"
            title="更換背景自然音 (微風、海浪、瀑布、甘霖)"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Browser Access & Bookmark Info */}
        <button
          type="button"
          onClick={onOpenInstallModal}
          className="flex items-center gap-1.5 rounded-lg bg-[#EFE8DD] text-[#4A3E2F] border border-[#DDD3C4] px-2.5 sm:px-3 py-1.5 text-xs font-semibold hover:bg-[#E5DDCF] transition-all shadow-xs"
          title="免安裝直接使用說明與主畫面捷徑"
        >
          <Monitor className="h-3.5 w-3.5 text-[#6D5D4B]" />
          <span className="whitespace-nowrap">瀏覽器直接開啟</span>
        </button>

        {/* Upload Custom Scripture */}
        <button
          type="button"
          onClick={onOpenCustomScripture}
          className="hidden sm:flex items-center gap-1 rounded-lg bg-[#F3ECE1] px-2.5 py-1.5 text-xs font-medium text-[#6B5D4D] border border-[#E3D9CB] hover:bg-[#EBE2D4] transition-colors"
          title="自行上傳經句"
        >
          <Upload className="h-3.5 w-3.5 text-[#8A6A45]" />
          <span>上傳經句</span>
        </button>

        {/* Saved Items mobile */}
        <button
          type="button"
          onClick={onOpenBookmarks}
          className="lg:hidden flex items-center gap-1 rounded-lg bg-[#F3ECE1] px-2 py-1.5 text-xs font-medium text-[#6B5D4D] border border-[#E3D9CB]"
          title="我的收藏"
        >
          <Bookmark className="h-3.5 w-3.5" />
          {savedCount > 0 && (
            <span className="text-[10px] tabular-nums font-bold text-[#4A3E2F]">
              {savedCount}
            </span>
          )}
        </button>

        {/* Mobile / Desktop Switcher */}
        <button
          type="button"
          onClick={onTogglePhoneFrame}
          className={`flex items-center gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 text-xs font-medium transition-all shadow-xs ${
            isPhoneFrame
              ? 'bg-[#5C4F3E] text-white hover:bg-[#4B4031]'
              : 'bg-[#2C2724] text-white hover:bg-[#3D3733]'
          }`}
          title={isPhoneFrame ? '切換為電腦滿版檢視' : '切換為手機模擬器/單頁檢視'}
        >
          {isPhoneFrame ? (
            <>
              <Monitor className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">電腦滿版</span>
            </>
          ) : (
            <>
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">手機版面</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
