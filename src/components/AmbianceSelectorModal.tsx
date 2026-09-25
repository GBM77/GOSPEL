import React from 'react';
import {
  X,
  Droplets,
  Wind,
  Waves,
  Mountain,
  CloudRain,
  Volume2,
  VolumeX,
  Check,
} from 'lucide-react';
import { AMBIANCE_TRACKS, AmbianceType, ambianceEngine } from '../utils/audioSpeech';

interface AmbianceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: AmbianceType;
  isPlaying: boolean;
  onSelectTrack: (track: AmbianceType) => void;
  onTogglePlay: () => void;
  volume: number;
  onChangeVolume: (vol: number) => void;
}

export const AmbianceSelectorModal: React.FC<AmbianceSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
  volume,
  onChangeVolume,
}) => {
  if (!isOpen) return null;

  const getIcon = (iconName: string, isSelected: boolean) => {
    const iconClass = `h-5 w-5 ${isSelected ? 'text-[#3E5C41]' : 'text-[#7D6E5D]'}`;
    switch (iconName) {
      case 'Droplets':
        return <Droplets className={iconClass} />;
      case 'Wind':
        return <Wind className={iconClass} />;
      case 'Waves':
        return <Waves className={iconClass} />;
      case 'Mountain':
        return <Mountain className={iconClass} />;
      case 'CloudRain':
        return <CloudRain className={iconClass} />;
      default:
        return <Droplets className={iconClass} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md rounded-3xl bg-[#FAF8F5] border border-[#E4DBD0] p-6 shadow-2xl space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7B68] hover:bg-[#EFE9DF] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C6E5A] bg-[#E9EFE8] px-2.5 py-0.5 rounded-full">
            <Droplets className="h-3.5 w-3.5 text-[#3A6B3E]" />
            <span>舒緩大自然靈修氛圍</span>
          </div>
          <h3 className="font-serif-tc text-xl font-bold text-[#2C2724]">
            選取背景音檔 (輕柔舒服)
          </h3>
          <p className="text-xs text-[#7A6A55]">
            專為心靈默想調製的五種自然底韻，融合清澈音場與微音和弦，營造如溪水旁的安歇聖所。
          </p>
        </div>

        {/* Track List */}
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
          {AMBIANCE_TRACKS.map((track) => {
            const isSelected = currentTrack === track.id;
            return (
              <div
                key={track.id}
                onClick={() => {
                  onSelectTrack(track.id);
                  if (!isPlaying) onTogglePlay();
                }}
                className={`cursor-pointer rounded-2xl p-3.5 border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#EBF1EB] border-[#BDD4BE] shadow-xs'
                    : 'bg-white hover:bg-[#F5EFE6] border-[#E8DFD4]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-[#D9E6DA]' : 'bg-[#F2ECE1]'
                    }`}
                  >
                    {getIcon(track.icon, isSelected)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif-tc text-sm font-bold text-[#342D25]">
                        {track.name}
                      </span>
                      <span className="text-[11px] font-sans-ui text-[#8B7C6C]">
                        {track.nameEn}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B5C4B] mt-0.5 leading-snug">
                      {track.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  {isSelected && (
                    <div className="h-6 w-6 rounded-full bg-[#4A724E] flex items-center justify-center text-white">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Play/Stop & Volume Slider Bar */}
        <div className="rounded-2xl bg-[#EFECE4] p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#54483B]">音量調節</span>
            <span className="text-xs text-[#7A6A55] tabular-nums">
              {Math.round(volume * 100)}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <VolumeX className="h-4 w-4 text-[#8C7B68]" />
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.02"
              value={volume}
              onChange={(e) => onChangeVolume(parseFloat(e.target.value))}
              className="flex-1 accent-[#4A724E] cursor-pointer"
            />
            <Volume2 className="h-4 w-4 text-[#4A724E]" />
          </div>

          <div className="pt-1 flex items-center justify-between">
            <button
              type="button"
              onClick={onTogglePlay}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                isPlaying
                  ? 'bg-[#3A5E3E] text-white hover:bg-[#325235]'
                  : 'bg-[#2C2724] text-white hover:bg-[#433B36]'
              }`}
            >
              {isPlaying ? (
                <>
                  <Volume2 className="h-4 w-4" />
                  <span>背景音播放中 (點擊靜音)</span>
                </>
              ) : (
                <>
                  <Droplets className="h-4 w-4" />
                  <span>開始播放背景音</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="text-xs text-[#7A6B5B] hover:text-[#4A3E31] font-medium"
          >
            完成並返回
          </button>
        </div>
      </div>
    </div>
  );
};
