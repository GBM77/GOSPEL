import React, { useState } from 'react';
import { X, Copy, Check, Share2, Sparkles, Download } from 'lucide-react';
import { WhisperItem } from '../data/whispers';
import treeImg from '../assets/images/tree_by_streams_1790301842480.jpg';

interface ShareModalProps {
  whisper: WhisperItem;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  whisper,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const quoteShareText = `【天父耳語 · 每日靈糧】\n\n「${whisper.chineseText}」\n—— ${whisper.reference}\n\n"${whisper.englishText}"\n—— ${whisper.referenceEn}\n\n🕊️ 天父耳語啟示：\n${whisper.whisperThought}\n\n🙏 今日宣告：\n「${whisper.keyDeclaration}」\n\n🌿 晝夜思想，他要像一棵樹栽在溪水旁，按時結果子，葉子也不枯乾。（詩篇 1:2-3）`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quoteShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#FAF8F5] border border-[#E2D8CC] p-5 sm:p-7 shadow-2xl space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C7B68] hover:bg-[#EFE9DF] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A6A55] bg-[#EFE8DD] px-3 py-0.5 rounded-full">
            <Share2 className="h-3 w-3 text-[#7A6A55]" />
            <span>分享祝福金句卡片</span>
          </div>
          <h3 className="font-serif-tc text-xl font-bold text-[#2C2724]">
            傳遞天父的愛與耳語
          </h3>
        </div>

        {/* Visual Share Card Preview */}
        <div className="relative overflow-hidden rounded-2xl border border-[#DFD3C3] shadow-md bg-white">
          {/* Card Top Image Strip */}
          <div className="relative h-28 w-full overflow-hidden">
            <img
              src={treeImg}
              alt="栽在溪水旁的繁盛綠樹"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-3">
              <span className="text-xs font-serif-tc text-white font-medium drop-shadow-sm">
                天父耳語 · 詩篇 1:2-3 溪水旁的長青生命
              </span>
            </div>
          </div>

          {/* Card Content Body */}
          <div className="p-4 sm:p-5 space-y-3.5 bg-[#FAF7F2]">
            <div className="flex items-center justify-between text-xs text-[#8A7966]">
              <span className="font-bold text-[#4A3E2F]">{whisper.reference}</span>
              <span className="text-[11px] text-[#A69784] font-en-serif">{whisper.referenceEn}</span>
            </div>

            <div>
              <p className="font-serif-tc text-sm sm:text-base font-semibold text-[#2C2724] leading-relaxed">
                「{whisper.chineseText}」
              </p>
              <p className="font-en-serif text-xs text-[#63594F] italic mt-1 leading-relaxed">
                "{whisper.englishText}"
              </p>
            </div>

            <div className="rounded-xl bg-white p-3 border-l-3 border-[#8C704D] text-xs text-[#3E3328] font-serif-tc leading-relaxed">
              <span className="font-bold text-[#5A4B3A] block mb-0.5">🕊️ 天父耳語：</span>
              {whisper.whisperThought}
            </div>

            <div className="rounded-lg bg-[#EFE9DE]/80 p-2.5 text-xs text-[#4A3D2E] font-serif-tc">
              <span className="font-bold block mb-0.5">今日宣告：</span>
              「{whisper.keyDeclaration}」
            </div>

            <div className="text-center text-[10px] text-[#A89885] pt-1">
              唯喜愛耶和華的法則，晝夜思想，此人便為有福！
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#2C2724] py-2.5 px-4 text-xs sm:text-sm font-semibold text-white hover:bg-[#433B36] transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span>已複製卡片文字！</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>複製經文與宣告文字</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#DFD5C8] bg-white py-2.5 px-4 text-xs sm:text-sm font-medium text-[#5E5140] hover:bg-[#F5EFE4] transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
