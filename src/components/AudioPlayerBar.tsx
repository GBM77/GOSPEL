import React, { useState, useEffect } from 'react';
import {
  Volume2,
  Square,
  Play,
  Pause,
  RefreshCw,
  Sparkles,
  SlidersHorizontal,
  Bot,
  UserCheck,
  Loader2,
} from 'lucide-react';
import { WhisperItem } from '../data/whispers';
import { speechEngine } from '../utils/audioSpeech';

interface AudioPlayerBarProps {
  whisper: WhisperItem;
  className?: string;
  isMobileCompact?: boolean;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  whisper,
  className = '',
  isMobileCompact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [voiceEngineChoice, setVoiceEngineChoice] = useState<'ai' | 'browser'>('ai');
  const [rate, setRate] = useState<number>(0.84); // Extra gentle pace
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Stop playback if current whisper changes
    speechEngine.stop();
    setIsPlaying(false);
    setIsLoadingAudio(false);
    setActiveMode(null);
  }, [whisper.id]);

  const handleStop = () => {
    speechEngine.stop();
    setIsPlaying(false);
    setIsLoadingAudio(false);
    setActiveMode(null);
  };

  /**
   * Speak Chinese verse with realistic gentle voice
   */
  const handlePlayChinese = async () => {
    handleStop();
    setActiveMode('zh');
    setIsLoadingAudio(true);

    if (voiceEngineChoice === 'ai') {
      const ok = await speechEngine.speakAI(whisper.chineseText, {
        voiceName: 'Kore', // Warm, soothing feminine persona
        stylePrompt:
          'Deeply gentle, compassionate, soft motherly or fatherly whisper, comforting, tranquil tempo',
        onStart: () => {
          setIsLoadingAudio(false);
          setIsPlaying(true);
        },
        onEnd: () => {
          setIsPlaying(false);
          setActiveMode(null);
        },
        onError: () => {
          setIsLoadingAudio(false);
          setIsPlaying(false);
          setActiveMode(null);
        },
      });

      if (!ok) {
        // Fallback to browser gentle voice
        speechEngine.speakBrowser(whisper.chineseText, 'zh', {
          rate: rate,
          onStart: () => {
            setIsLoadingAudio(false);
            setIsPlaying(true);
          },
          onEnd: () => {
            setIsPlaying(false);
            setActiveMode(null);
          },
        });
      }
    } else {
      setIsLoadingAudio(false);
      setIsPlaying(true);
      speechEngine.speakBrowser(whisper.chineseText, 'zh', {
        rate: rate,
        onEnd: () => {
          setIsPlaying(false);
          setActiveMode(null);
        },
      });
    }
  };

  /**
   * Speak English verse
   */
  const handlePlayEnglish = async () => {
    handleStop();
    setActiveMode('en');
    setIsLoadingAudio(true);

    if (voiceEngineChoice === 'ai') {
      const ok = await speechEngine.speakAI(whisper.englishText, {
        voiceName: 'Zephyr', // Soothing warm persona
        stylePrompt:
          'Warm, gentle, reassuring, slow, meditative pastoral whisper tone',
        onStart: () => {
          setIsLoadingAudio(false);
          setIsPlaying(true);
        },
        onEnd: () => {
          setIsPlaying(false);
          setActiveMode(null);
        },
        onError: () => {
          setIsLoadingAudio(false);
          setIsPlaying(false);
          setActiveMode(null);
        },
      });

      if (!ok) {
        speechEngine.speakBrowser(whisper.englishText, 'en', {
          rate: rate,
          onStart: () => {
            setIsLoadingAudio(false);
            setIsPlaying(true);
          },
          onEnd: () => {
            setIsPlaying(false);
            setActiveMode(null);
          },
        });
      }
    } else {
      setIsLoadingAudio(false);
      setIsPlaying(true);
      speechEngine.speakBrowser(whisper.englishText, 'en', {
        rate: rate,
        onEnd: () => {
          setIsPlaying(false);
          setActiveMode(null);
        },
      });
    }
  };

  /**
   * Speak Bilingual
   */
  const handlePlayBilingual = async () => {
    handleStop();
    setActiveMode('bilingual');
    setIsLoadingAudio(true);

    const fullScript = `${whisper.chineseText}。 ${whisper.englishText}`;
    if (voiceEngineChoice === 'ai') {
      const ok = await speechEngine.speakAI(fullScript, {
        voiceName: 'Kore',
        stylePrompt:
          'Gentle, heartfelt, tender pastoral tone, slow and peaceful cadence',
        onStart: () => {
          setIsLoadingAudio(false);
          setIsPlaying(true);
        },
        onEnd: () => {
          setIsPlaying(false);
          setActiveMode(null);
        },
      });

      if (!ok) {
        speechEngine.speakBrowser(whisper.chineseText, 'zh', {
          rate: rate,
          onStart: () => {
            setIsLoadingAudio(false);
            setIsPlaying(true);
          },
          onEnd: () => {
            setTimeout(() => {
              speechEngine.speakBrowser(whisper.englishText, 'en', {
                rate: rate,
                onEnd: () => {
                  setIsPlaying(false);
                  setActiveMode(null);
                },
              });
            }, 500);
          },
        });
      }
    } else {
      setIsLoadingAudio(false);
      setIsPlaying(true);
      speechEngine.speakBrowser(whisper.chineseText, 'zh', {
        rate: rate,
        onEnd: () => {
          setTimeout(() => {
            speechEngine.speakBrowser(whisper.englishText, 'en', {
              rate: rate,
              onEnd: () => {
                setIsPlaying(false);
                setActiveMode(null);
              },
            });
          }, 500);
        },
      });
    }
  };

  /**
   * Speak Father's Personal Whisper Revelation
   */
  const handlePlayWhisperRevelation = async () => {
    handleStop();
    setActiveMode('whisper');
    setIsLoadingAudio(true);

    if (voiceEngineChoice === 'ai') {
      const ok = await speechEngine.speakAI(whisper.whisperThought, {
        voiceName: 'Kore',
        stylePrompt:
          'Extremely gentle, affectionate whisper of a loving Father speaking softly to His beloved child, peaceful and unhurried',
        onStart: () => {
          setIsLoadingAudio(false);
          setIsPlaying(true);
        },
        onEnd: () => {
          setIsPlaying(false);
          setActiveMode(null);
        },
        onError: () => {
          setIsLoadingAudio(false);
          setIsPlaying(false);
          setActiveMode(null);
        },
      });

      if (!ok) {
        speechEngine.speakBrowser(whisper.whisperThought, 'zh', {
          rate: rate * 0.94,
          onStart: () => {
            setIsLoadingAudio(false);
            setIsPlaying(true);
          },
          onEnd: () => {
            setIsPlaying(false);
            setActiveMode(null);
          },
        });
      }
    } else {
      setIsLoadingAudio(false);
      setIsPlaying(true);
      speechEngine.speakBrowser(whisper.whisperThought, 'zh', {
        rate: rate * 0.94,
        onEnd: () => {
          setIsPlaying(false);
          setActiveMode(null);
        },
      });
    }
  };

  return (
    <div
      className={`rounded-2xl border border-[#E8DFD4] bg-[#F7F4EE]/90 p-3 sm:p-4 backdrop-blur-md transition-all ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-[#E8DFD4]/70">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EFE9DF] text-[#7A6A55]">
            <Volume2 className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#5C4F3E] flex items-center gap-1.5">
              <span>溫柔金句語音朗讀</span>
              <span className="text-[10px] bg-[#EFE4D6] text-[#785934] px-1.5 py-0.2 rounded-full font-medium flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5" />
                {voiceEngineChoice === 'ai' ? '真人級AI溫暖擬真' : '裝置溫和語音'}
              </span>

              {isLoadingAudio && (
                <span className="flex items-center gap-1 text-[11px] font-normal text-[#8A7861]">
                  <Loader2 className="h-3 w-3 animate-spin text-[#8A6A45]" />
                  <span>調製溫柔人聲中...</span>
                </span>
              )}

              {isPlaying && (
                <span className="flex items-center gap-1 text-[11px] font-normal text-[#8A7861]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8A7861] animate-pulse"></span>
                  {activeMode === 'zh' && '朗讀中文金句中...'}
                  {activeMode === 'en' && '朗讀英文金句中...'}
                  {activeMode === 'bilingual' && '中英雙語連續朗讀中...'}
                  {activeMode === 'whisper' && '聆聽天父耳語啟示中...'}
                </span>
              )}
            </div>
            <div className="text-[11px] text-[#9A8B78]">
              特別優化自然柔和音韻，如親人在耳畔輕聲訴說恩典
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Engine Selector */}
          <button
            type="button"
            onClick={() =>
              setVoiceEngineChoice(voiceEngineChoice === 'ai' ? 'browser' : 'ai')
            }
            className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs transition-colors border ${
              voiceEngineChoice === 'ai'
                ? 'bg-[#EFE8DC] text-[#4A3D2E] border-[#D9CDBC] font-medium'
                : 'bg-white text-[#786958] border-[#E8DFD4]'
            }`}
            title="切換真人級AI人聲 / 離線系統語音"
          >
            {voiceEngineChoice === 'ai' ? (
              <>
                <Sparkles className="h-3 w-3 text-[#9A7038]" />
                <span className="text-[11px]">高擬真真人音</span>
              </>
            ) : (
              <>
                <Bot className="h-3 w-3 text-[#8A7868]" />
                <span className="text-[11px]">標準柔和音</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="調整朗讀語速"
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs transition-colors ${
              showSettings
                ? 'bg-[#E5DDCF] text-[#4A3E2F] font-medium'
                : 'text-[#85745E] hover:bg-[#EFE9DF]'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">語速</span>
            <span className="text-[11px]">{rate.toFixed(2)}x</span>
          </button>

          {(isPlaying || isLoadingAudio) && (
            <button
              type="button"
              onClick={handleStop}
              className="flex items-center gap-1 rounded-lg bg-[#EAE2D5] px-2.5 py-1 text-xs font-medium text-[#7D3C3C] hover:bg-[#E6D4D4] transition-colors"
              title="停止"
            >
              <Square className="h-3.5 w-3.5" />
              <span className="text-[11px]">停止</span>
            </button>
          )}
        </div>
      </div>

      {/* Speed Slider Popdown */}
      {showSettings && (
        <div className="pt-2 pb-1 border-b border-[#E8DFD4]/70 flex items-center justify-between text-xs text-[#6F604D]">
          <span>語速調整 (更溫柔緩慢 / 標準)：</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRate(0.78)}
              className={`px-2 py-0.5 rounded text-[11px] ${rate === 0.78 ? 'bg-[#5C4F3E] text-white' : 'bg-[#EAE2D5]'}`}
            >
              極溫柔 (0.78x)
            </button>
            <button
              onClick={() => setRate(0.84)}
              className={`px-2 py-0.5 rounded text-[11px] ${rate === 0.84 ? 'bg-[#5C4F3E] text-white' : 'bg-[#EAE2D5]'}`}
            >
              舒緩推薦 (0.84x)
            </button>
            <button
              onClick={() => setRate(0.95)}
              className={`px-2 py-0.5 rounded text-[11px] ${rate === 0.95 ? 'bg-[#5C4F3E] text-white' : 'bg-[#EAE2D5]'}`}
            >
              標準 (0.95x)
            </button>
          </div>
        </div>
      )}

      {/* Voice Play Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5">
        <button
          type="button"
          onClick={handlePlayChinese}
          disabled={isLoadingAudio}
          className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-medium transition-all ${
            activeMode === 'zh' && isPlaying
              ? 'bg-[#5C4F3E] text-white shadow-sm ring-2 ring-[#5C4F3E]/20'
              : 'bg-white/80 text-[#4A3E2F] hover:bg-white hover:shadow-xs border border-[#E4DBD0]'
          }`}
        >
          <Volume2 className="h-3.5 w-3.5 shrink-0 text-[#7A6A55]" />
          <span className="truncate">溫柔念中文金句</span>
        </button>

        <button
          type="button"
          onClick={handlePlayEnglish}
          disabled={isLoadingAudio}
          className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-medium transition-all ${
            activeMode === 'en' && isPlaying
              ? 'bg-[#5C4F3E] text-white shadow-sm ring-2 ring-[#5C4F3E]/20'
              : 'bg-white/80 text-[#4A3E2F] hover:bg-white hover:shadow-xs border border-[#E4DBD0]'
          }`}
        >
          <Volume2 className="h-3.5 w-3.5 shrink-0 text-[#7A6A55]" />
          <span className="truncate">Gentle English</span>
        </button>

        <button
          type="button"
          onClick={handlePlayBilingual}
          disabled={isLoadingAudio}
          className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-medium transition-all ${
            activeMode === 'bilingual' && isPlaying
              ? 'bg-[#5C4F3E] text-white shadow-sm ring-2 ring-[#5C4F3E]/20'
              : 'bg-white/80 text-[#4A3E2F] hover:bg-white hover:shadow-xs border border-[#E4DBD0]'
          }`}
        >
          <RefreshCw className="h-3.5 w-3.5 shrink-0 text-[#7A6A55]" />
          <span className="truncate">中英雙語連續朗讀</span>
        </button>

        <button
          type="button"
          onClick={handlePlayWhisperRevelation}
          disabled={isLoadingAudio}
          className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-medium transition-all ${
            activeMode === 'whisper' && isPlaying
              ? 'bg-[#6D5D4B] text-white shadow-sm ring-2 ring-[#6D5D4B]/20'
              : 'bg-[#F2ECE0] text-[#4A3E2F] hover:bg-[#EAE2D3] border border-[#DDD3C4]'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#8F744E]" />
          <span className="truncate">傾聽天父耳語啟示</span>
        </button>
      </div>
    </div>
  );
};
