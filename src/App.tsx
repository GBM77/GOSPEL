/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WHISPER_ITEMS, WhisperItem } from './data/whispers';
import { ambianceEngine, speechEngine, AmbianceType } from './utils/audioSpeech';
import { Header } from './components/Header';
import { DesktopView } from './components/DesktopView';
import { PhoneViewCard } from './components/PhoneViewCard';
import { PhoneSimulatorFrame } from './components/PhoneSimulatorFrame';
import { DrawWhisperModal } from './components/DrawWhisperModal';
import { ShareModal } from './components/ShareModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AmbianceSelectorModal } from './components/AmbianceSelectorModal';
import { CustomScriptureModal } from './components/CustomScriptureModal';
import { InstallAppModal } from './components/InstallAppModal';

export default function App() {
  const [whispers, setWhispers] = useState<WhisperItem[]>(() => {
    try {
      const custom = localStorage.getItem('fathers_whispers_custom_pool');
      if (custom) {
        const parsed = JSON.parse(custom);
        return [...parsed, ...WHISPER_ITEMS];
      }
    } catch (e) {
      // fallback
    }
    return WHISPER_ITEMS;
  });

  const [currentWhisperId, setCurrentWhisperId] = useState<string>('psalm-1-2-3');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(false);

  // Background Ambiance State
  const [isAmbiancePlaying, setIsAmbiancePlaying] = useState<boolean>(false);
  const [currentAmbiance, setCurrentAmbiance] = useState<AmbianceType>('stream');
  const [ambianceVolume, setAmbianceVolume] = useState<number>(0.35);

  // Modals
  const [isAmbianceModalOpen, setIsAmbianceModalOpen] = useState(false);
  const [isCustomScriptureModalOpen, setIsCustomScriptureModalOpen] = useState(false);
  const [isDrawModalOpen, setIsDrawModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fathers_whispers_bookmarks');
      return saved ? JSON.parse(saved) : ['psalm-1-2-3'];
    } catch {
      return ['psalm-1-2-3'];
    }
  });

  // Mobile viewport detection
  const [isActualMobile, setIsActualMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsActualMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Save bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('fathers_whispers_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      // ignore
    }
  }, [bookmarkedIds]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      speechEngine.stop();
      ambianceEngine.stop();
    };
  }, []);

  const currentWhisper =
    whispers.find((w) => w.id === currentWhisperId) || whispers[0];

  const currentWhisperIndex = whispers.findIndex(
    (w) => w.id === currentWhisper.id
  );

  const handlePrev = () => {
    speechEngine.stop();
    const prevIdx =
      currentWhisperIndex <= 0 ? whispers.length - 1 : currentWhisperIndex - 1;
    setCurrentWhisperId(whispers[prevIdx].id);
  };

  const handleNext = () => {
    speechEngine.stop();
    const nextIdx =
      currentWhisperIndex >= whispers.length - 1 ? 0 : currentWhisperIndex + 1;
    setCurrentWhisperId(whispers[nextIdx].id);
  };

  const handleRandom = () => {
    speechEngine.stop();
    let randIdx = Math.floor(Math.random() * whispers.length);
    if (randIdx === currentWhisperIndex && whispers.length > 1) {
      randIdx = (randIdx + 1) % whispers.length;
    }
    setCurrentWhisperId(whispers[randIdx].id);
  };

  const handleToggleBookmark = () => {
    setBookmarkedIds((prev) =>
      prev.includes(currentWhisper.id)
        ? prev.filter((id) => id !== currentWhisper.id)
        : [...prev, currentWhisper.id]
    );
  };

  // Background Ambiance Controls
  const handleToggleAmbiance = () => {
    if (isAmbiancePlaying) {
      ambianceEngine.stop();
      setIsAmbiancePlaying(false);
    } else {
      ambianceEngine.play(currentAmbiance);
      setIsAmbiancePlaying(true);
    }
  };

  const handleSelectAmbianceTrack = (track: AmbianceType) => {
    setCurrentAmbiance(track);
    ambianceEngine.play(track);
    setIsAmbiancePlaying(true);
  };

  const handleChangeAmbianceVolume = (vol: number) => {
    setAmbianceVolume(vol);
    ambianceEngine.setVolume(vol);
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (cat !== 'all') {
      const firstInCat = whispers.find((w) => w.category === cat);
      if (firstInCat) {
        setCurrentWhisperId(firstInCat.id);
      }
    }
  };

  // Save new custom / online scripture to state & localStorage
  const handleSaveNewWhisper = (newWhisper: WhisperItem) => {
    setWhispers((prev) => {
      const updated = [newWhisper, ...prev];
      try {
        const customItems = updated.filter((w) => w.id.startsWith('custom-') || w.id.startsWith('online-'));
        localStorage.setItem('fathers_whispers_custom_pool', JSON.stringify(customItems));
      } catch (e) {
        // ignore
      }
      return updated;
    });
    setCurrentWhisperId(newWhisper.id);
  };

  const savedWhisperObjects = whispers.filter((w) =>
    bookmarkedIds.includes(w.id)
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2724] flex flex-col font-sans-ui">
      {/* Top Header Navigation */}
      <Header
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame((prev) => !prev)}
        isStreamAmbiancePlaying={isAmbiancePlaying}
        onToggleStreamAmbiance={handleToggleAmbiance}
        savedCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onSelectCategory={handleSelectCategory}
        activeCategory={selectedCategory}
        onDrawRandom={() => setIsDrawModalOpen(true)}
        currentAmbiance={currentAmbiance}
        onOpenAmbianceSelector={() => setIsAmbianceModalOpen(true)}
        onOpenCustomScripture={() => setIsCustomScriptureModalOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isActualMobile ? (
          <div className="h-[calc(100vh-65px)]">
            <PhoneViewCard
              whisper={currentWhisper}
              currentIndex={currentWhisperIndex}
              totalCount={whispers.length}
              onPrev={handlePrev}
              onNext={handleNext}
              onRandom={handleRandom}
              isBookmarked={bookmarkedIds.includes(currentWhisper.id)}
              onToggleBookmark={handleToggleBookmark}
              onOpenShare={() => setIsShareModalOpen(true)}
              onOpenCustomScripture={() => setIsCustomScriptureModalOpen(true)}
              onOpenInstallModal={() => setIsInstallModalOpen(true)}
            />
          </div>
        ) : isPhoneFrame ? (
          <PhoneSimulatorFrame onExitPhoneMode={() => setIsPhoneFrame(false)}>
            <PhoneViewCard
              whisper={currentWhisper}
              currentIndex={currentWhisperIndex}
              totalCount={whispers.length}
              onPrev={handlePrev}
              onNext={handleNext}
              onRandom={handleRandom}
              isBookmarked={bookmarkedIds.includes(currentWhisper.id)}
              onToggleBookmark={handleToggleBookmark}
              onOpenShare={() => setIsShareModalOpen(true)}
              onOpenCustomScripture={() => setIsCustomScriptureModalOpen(true)}
              onOpenInstallModal={() => setIsInstallModalOpen(true)}
            />
          </PhoneSimulatorFrame>
        ) : (
          <DesktopView
            whisper={currentWhisper}
            currentIndex={currentWhisperIndex}
            totalCount={whispers.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onRandom={handleRandom}
            isBookmarked={bookmarkedIds.includes(currentWhisper.id)}
            onToggleBookmark={handleToggleBookmark}
            onOpenShare={() => setIsShareModalOpen(true)}
            whisperList={whispers}
            onSelectWhisper={(w) => setCurrentWhisperId(w.id)}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onOpenCustomScripture={() => setIsCustomScriptureModalOpen(true)}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
          />
        )}
      </main>

      {/* Footer in Desktop */}
      {!isActualMobile && !isPhoneFrame && (
        <footer className="border-t border-[#E8DFD4] bg-[#FAF8F5] py-8 text-center text-xs text-[#8A7966]">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p className="font-serif-tc text-sm text-[#4E4133]">
              「唯喜愛耶和華的法則，晝夜思想，此人便為有福！他要像一棵樹栽在溪水旁，按時結果子，葉子也不枯乾。凡他所做的都順利。」
            </p>
            <div className="flex items-center justify-center gap-4 text-[11px] text-[#A39280] pt-1">
              <span>天父耳語 · 每日靈糧與金句朗讀</span>
              <span>·</span>
              <button
                type="button"
                onClick={() => setIsInstallModalOpen(true)}
                className="underline hover:text-[#524434] transition-colors"
              >
                下載與安裝本程式 (手機/電腦)
              </button>
            </div>
          </div>
        </footer>
      )}

      {/* 1. Ambiance Soundscape Selector Modal */}
      <AmbianceSelectorModal
        isOpen={isAmbianceModalOpen}
        onClose={() => setIsAmbianceModalOpen(false)}
        currentTrack={currentAmbiance}
        isPlaying={isAmbiancePlaying}
        onSelectTrack={handleSelectAmbianceTrack}
        onTogglePlay={handleToggleAmbiance}
        volume={ambianceVolume}
        onChangeVolume={handleChangeAmbianceVolume}
      />

      {/* 2. Custom Scripture Upload Modal */}
      <CustomScriptureModal
        isOpen={isCustomScriptureModalOpen}
        onClose={() => setIsCustomScriptureModalOpen(false)}
        onSaveNewWhisper={handleSaveNewWhisper}
      />

      {/* 3. Draw Daily Whisper (with auto-online scripture search) */}
      <DrawWhisperModal
        isOpen={isDrawModalOpen}
        onClose={() => setIsDrawModalOpen(false)}
        onSelectWhisper={(chosen) => {
          setCurrentWhisperId(chosen.id);
        }}
        onAddNewToPool={handleSaveNewWhisper}
      />

      {/* 4. Share Quote Card Modal */}
      <ShareModal
        whisper={currentWhisper}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* 5. Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedWhispers={savedWhisperObjects}
        onSelectWhisper={(w) => setCurrentWhisperId(w.id)}
        onRemoveBookmark={(id) =>
          setBookmarkedIds((prev) => prev.filter((item) => item !== id))
        }
      />

      {/* 6. Install App Modal (PWA / Mobile & Desktop) */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />
    </div>
  );
}
