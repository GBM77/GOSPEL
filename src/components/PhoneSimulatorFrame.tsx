import React from 'react';
import { Wifi, Battery, Signal, ArrowLeft, Maximize2 } from 'lucide-react';

interface PhoneSimulatorFrameProps {
  children: React.ReactNode;
  onExitPhoneMode: () => void;
}

export const PhoneSimulatorFrame: React.FC<PhoneSimulatorFrameProps> = ({
  children,
  onExitPhoneMode,
}) => {
  const currentTime = new Date().toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="flex flex-col items-center justify-center py-4 px-2 sm:py-8 sm:px-4 min-h-[calc(100vh-65px)] bg-[#EDE7DF]/60">
      {/* Phone Mode Banner & Exit affordance */}
      <div className="mb-4 flex items-center justify-between w-full max-w-[420px] px-2 text-xs text-[#6B5C4B]">
        <button
          onClick={onExitPhoneMode}
          className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 font-medium text-[#4A3E2F] hover:bg-white shadow-xs border border-[#DFD6C8] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>返回電腦全幅模式</span>
        </button>

        <span className="text-[11px] text-[#8E7E6C]">
          手機單頁視窗模式 (390×844)
        </span>
      </div>

      {/* Realistic Smartphone Shell */}
      <div className="relative w-full max-w-[400px] h-[780px] max-h-[85vh] rounded-[44px] bg-[#1E1B18] p-3 shadow-2xl ring-1 ring-black/20 flex flex-col">
        {/* Outer Phone Bezel Buttons (Visual flair) */}
        <div className="absolute -left-1 top-24 h-10 w-1 rounded-l-sm bg-[#3A3530]" />
        <div className="absolute -left-1 top-38 h-12 w-1 rounded-l-sm bg-[#3A3530]" />
        <div className="absolute -right-1 top-28 h-16 w-1 rounded-r-sm bg-[#3A3530]" />

        {/* Screen Bezel */}
        <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-[#FAF8F5] flex flex-col border border-[#2E2822]/30">
          {/* iOS Style Status Bar */}
          <div className="shrink-0 h-10 bg-[#FAF8F5] flex items-center justify-between px-6 pt-1 text-xs text-[#2C2724] select-none">
            <span className="font-semibold text-[13px] tracking-tight">{currentTime}</span>

            {/* Dynamic Island / Notch */}
            <div className="h-4 w-24 rounded-full bg-[#1A1816] flex items-center justify-end pr-2">
              <div className="h-2 w-2 rounded-full bg-[#2E2822]" />
            </div>

            <div className="flex items-center gap-1.5 text-[#2C2724]">
              <Signal className="h-3.5 w-3.5" />
              <Wifi className="h-3.5 w-3.5" />
              <Battery className="h-4 w-4" />
            </div>
          </div>

          {/* Actual Child Content inside Phone Screen */}
          <div className="flex-1 overflow-hidden flex flex-col">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="shrink-0 h-5 bg-[#FAF8F5] flex items-center justify-center pb-1">
            <div className="h-1 w-28 rounded-full bg-[#2C2724]/20" />
          </div>
        </div>
      </div>
    </div>
  );
};
