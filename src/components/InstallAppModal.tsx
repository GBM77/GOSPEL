import React, { useState } from 'react';
import {
  X,
  Download,
  Smartphone,
  Monitor,
  Share,
  PlusSquare,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  HardDrive,
  Copy,
  Check,
} from 'lucide-react';
import { usePWAInstall } from '../utils/usePWAInstall';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'mobile' | 'desktop'>('mobile');
  const [copiedUrl, setCopiedUrl] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleNativeInstall = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) {
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#FAF8F5] border border-[#E2D8CC] p-5 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7B68] hover:bg-[#EFE9DF] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#53654E] bg-[#E9EFE8] px-3 py-0.5 rounded-full">
            <Monitor className="h-3.5 w-3.5 text-[#3A6B3E]" />
            <span>免安裝 · 任何瀏覽器直接開啟使用</span>
          </div>
          <h3 className="font-serif-tc text-xl sm:text-2xl font-bold text-[#2C2724]">
            網頁版直接開啟與書籤儲存
          </h3>
          <p className="text-xs text-[#7A6A55] leading-relaxed">
            本應用程式為標準 Web 網頁版，<strong>無需下載任何安裝檔或 App</strong>。只要用手機或電腦的任何瀏覽器（Chrome, Safari, Edge, LINE 內建等）打開網址即可完全使用所有靈糧金句朗讀與背景音！
          </p>
        </div>

        {/* Quick Direct Link Copy */}
        <div className="rounded-2xl bg-[#F7F4EE] border border-[#E3D9CB] p-4 space-y-2">
          <span className="text-xs font-bold text-[#4A3E2F] block">
            🔗 複製網址加入瀏覽器書籤：
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 bg-white border border-[#DDD0BF] rounded-xl px-3 py-1.5 text-xs text-[#5C4F3E] select-all font-mono"
            />
            <button
              type="button"
              onClick={handleCopyUrl}
              className="flex items-center gap-1 bg-[#2C2724] text-white px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-[#433B36] transition-colors shrink-0"
            >
              {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedUrl ? '已複製' : '複製網址'}</span>
            </button>
          </div>
          <p className="text-[11px] text-[#8E7E6C]">
            💡 建議直接將此網址加入瀏覽器「我的最愛 / 書籤」或加到手機主畫面，每日靈修一點即開！
          </p>
        </div>

        {/* Tab Switcher: Mobile vs Desktop */}
        <div className="flex items-center p-1 bg-[#EBE4D8] rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'mobile'
                ? 'bg-white text-[#2C2724] shadow-xs'
                : 'text-[#6F604F] hover:text-[#2C2724]'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>安裝至手機 (Android / iOS)</span>
          </button>
          <button
            onClick={() => setActiveTab('desktop')}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'desktop'
                ? 'bg-white text-[#2C2724] shadow-xs'
                : 'text-[#6F604F] hover:text-[#2C2724]'
            }`}
          >
            <Monitor className="h-4 w-4" />
            <span>安裝至電腦 (Windows / Mac / Chrome)</span>
          </button>
        </div>

        {/* Direct One-Click Install Button if Browser Supports beforeinstallprompt */}
        {isInstallable && (
          <div className="rounded-2xl bg-[#E8EFE8] border border-[#BDD4BE] p-4 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#244528] block">
                檢測到瀏覽器支援一鍵直接安裝
              </span>
              <span className="text-[11px] text-[#4A6E4E]">
                點擊下方按鈕，系統將自動於桌面/主畫面生成應用圖示。
              </span>
            </div>
            <button
              type="button"
              onClick={handleNativeInstall}
              className="shrink-0 flex items-center gap-1.5 rounded-xl bg-[#2D5A38] text-white px-4 py-2 text-xs font-bold hover:bg-[#23472C] transition-all shadow-xs"
            >
              <Download className="h-4 w-4" />
              <span>立即安裝</span>
            </button>
          </div>
        )}

        {/* Mobile Tab Content */}
        {activeTab === 'mobile' && (
          <div className="space-y-4 text-xs text-[#4A3D2F]">
            {/* Android Phone (APK Alternative) */}
            <div className="rounded-2xl bg-white border border-[#E4DBD0] p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-[#EBF1EB] text-[#3E6843] flex items-center justify-center font-bold text-xs">
                  A
                </span>
                <span className="font-serif-tc text-sm font-bold text-[#2C2724]">
                  Android 手機 (Chrome / Edge 瀏覽器)
                </span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-[#5A4C3C] leading-relaxed pl-1">
                <li>
                  使用手機瀏覽器開啟本網址。
                </li>
                <li>
                  點擊瀏覽器右上角選單（<strong>三個點 ⋮</strong> 或上方出現的<strong>「加到主畫面」</strong>按鈕）。
                </li>
                <li>
                  選擇<strong>「加到主畫面」</strong>或<strong>「安裝應用程式」</strong>。
                </li>
                <li>
                  桌面將立刻出現<strong>「天父耳語」獨立 App 圖示</strong>，點擊即可全螢幕如原生 App 般順暢運行！
                </li>
              </ol>
            </div>

            {/* Apple iPhone / iPad */}
            <div className="rounded-2xl bg-white border border-[#E4DBD0] p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-[#F3EDE2] text-[#7A5B36] flex items-center justify-center font-bold text-xs">
                  i
                </span>
                <span className="font-serif-tc text-sm font-bold text-[#2C2724]">
                  Apple iPhone / iPad (Safari 瀏覽器)
                </span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-[#5A4C3C] leading-relaxed pl-1">
                <li>
                  在 iPhone 上使用 <strong>Safari</strong> 瀏覽器開啟。
                </li>
                <li>
                  點擊底部工具列中間的<strong>「分享」圖示</strong>（帶向上箭頭的方框 <Share className="inline h-3.5 w-3.5 text-blue-600 mx-0.5" />）。
                </li>
                <li>
                  往下滑動找到並點擊<strong>「加入主畫面」</strong>（<PlusSquare className="inline h-3.5 w-3.5 text-gray-700 mx-0.5" />）。
                </li>
                <li>
                  點擊右上角<strong>「新增」</strong>，即可完成安裝！
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Desktop Tab Content */}
        {activeTab === 'desktop' && (
          <div className="space-y-4 text-xs text-[#4A3D2F]">
            <div className="rounded-2xl bg-white border border-[#E4DBD0] p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-[#5C4F3E]" />
                <span className="font-serif-tc text-sm font-bold text-[#2C2724]">
                  Windows / Mac / 電腦 Chrome / Edge
                </span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-[#5A4C3C] leading-relaxed pl-1">
                <li>
                  在電腦 Chrome 或 Edge 瀏覽器頂端<strong>網址列最右側</strong>，會看到一個<strong>「安裝」小圖示</strong>（或提示「安裝天父耳語」）。
                </li>
                <li>
                  點擊<strong>「安裝」</strong>後，系統會生成獨立桌面捷徑視窗，免去瀏覽器分頁干擾，擁有獨立程式視窗。
                </li>
                <li>
                  日後可直接從<strong>開始功能表</strong>、<strong>工作列</strong>或<strong>桌面捷徑</strong>一鍵啟動！
                </li>
              </ol>
            </div>

            <div className="rounded-2xl bg-[#F6F1E6] border border-[#E8DFC9] p-3.5 space-y-2">
              <span className="font-bold text-[#5A4833] block">
                ⭐ 現代 PWA 相比傳統 .exe / .apk 的核心優勢：
              </span>
              <ul className="space-y-1 text-[#6B5741] list-disc list-inside">
                <li><strong>極度輕量</strong>：無需下載上百 MB 安裝包，秒級安裝，不佔手機與電腦儲存空間。</li>
                <li><strong>安全無虞</strong>：完全沙盒防護，無木馬病毒與惡意存取風險。</li>
                <li><strong>自動更新</strong>：每次發布新靈糧與經句，啟動自動保持最新版本。</li>
              </ul>
            </div>
          </div>
        )}

        {/* Copy App URL for Phone Access */}
        <div className="rounded-2xl bg-[#EFECE4] p-3 flex items-center justify-between gap-2">
          <div className="truncate text-xs text-[#5D5042] flex items-center gap-1.5">
            <ExternalLink className="h-3.5 w-3.5 text-[#7A6A55] shrink-0" />
            <span className="truncate">在手機開啟本網址即可安裝：</span>
          </div>
          <button
            type="button"
            onClick={handleCopyUrl}
            className="shrink-0 flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-[#4A3D2F] border border-[#DCD1C2] hover:bg-[#F8F4EE] transition-colors shadow-2xs"
          >
            {copiedUrl ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>已複製</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>複製網址</span>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-1">
          <button
            onClick={onClose}
            className="rounded-xl bg-[#2C2724] px-6 py-2 text-xs font-semibold text-white hover:bg-[#433B36] transition-colors"
          >
            我知道了，關閉
          </button>
        </div>
      </div>
    </div>
  );
};
