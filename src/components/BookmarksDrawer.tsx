import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { WhisperItem } from '../data/whispers';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedWhispers: WhisperItem[];
  onSelectWhisper: (whisper: WhisperItem) => void;
  onRemoveBookmark: (id: string) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedWhispers,
  onSelectWhisper,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#FAF8F5] border border-[#E2D8CC] p-5 sm:p-7 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE1D5]">
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-[#8A5528] fill-current" />
            <h3 className="font-serif-tc text-lg font-bold text-[#2C2724]">
              我珍藏的天父耳語
            </h3>
            <span className="text-xs text-[#8E7E6C] tabular-nums">
              ({savedWhispers.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8C7B68] hover:bg-[#EFE9DF] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* List of Saved Whispers */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2.5 pr-1">
          {savedWhispers.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#E8DFD4] bg-white p-3.5 sm:p-4 shadow-xs hover:border-[#D5C7B5] transition-all flex items-start justify-between gap-3 group"
            >
              <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                  onSelectWhisper(item);
                  onClose();
                }}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#4A3D2F]">
                  <span>{item.reference}</span>
                  <span className="text-[11px] text-[#8C7B68]">· {item.theme}</span>
                </div>
                <p className="font-serif-tc text-xs sm:text-sm text-[#2C2724] line-clamp-2 mt-1 leading-relaxed">
                  「{item.chineseText}」
                </p>
                <p className="font-en-serif text-[11px] text-[#73675B] italic line-clamp-1 mt-0.5">
                  "{item.englishText}"
                </p>
              </div>

              <div className="flex flex-col items-center gap-1.5 shrink-0 pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    onSelectWhisper(item);
                    onClose();
                  }}
                  className="p-1.5 rounded-lg bg-[#F5EFE6] text-[#5C4D3D] hover:bg-[#EBE3D4] transition-colors"
                  title="閱讀與聆聽"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onRemoveBookmark(item.id)}
                  className="p-1.5 rounded-lg text-[#A89885] hover:text-[#913B3B] hover:bg-[#FBEAEA] transition-colors"
                  title="移除收藏"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}

          {savedWhispers.length === 0 && (
            <div className="text-center py-12 space-y-2">
              <Bookmark className="h-8 w-8 text-[#C4B6A3] mx-auto" />
              <p className="font-serif-tc text-sm text-[#6C5B48]">
                尚無收藏的耳語金句
              </p>
              <p className="text-xs text-[#9E8E7C] max-w-xs mx-auto">
                在閱讀任何經文時點擊書籤圖標，即可珍藏天父給你的每日話語。
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#EAE1D5] flex items-center justify-between text-xs text-[#8C7A67]">
          <span>按時結果子，葉子也不枯乾</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-[#EFE9DE] px-3 py-1 font-medium text-[#4A3D2F] hover:bg-[#E4DBCF]"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
