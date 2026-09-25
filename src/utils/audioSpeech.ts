/**
 * Audio Ambiance & Realistic Human-Like Speech Engine
 * 1. Multi-Soundscape Ambiance:
 *    - 溪水潺潺 (Gentle Brook)
 *    - 和煦微風 (Gentle Breeze & Rustling Leaves)
 *    - 寧靜海浪 (Gentle Ocean Waves)
 *    - 舒緩瀑布 (Soothing Waterfall Mist)
 *    - 柔和雨聲 (Soft Forest Rain)
 *    All generated procedurally via Web Audio API with smooth filters & pentatonic chimes!
 *
 * 2. Gentle Realistic Human-Like Voice Narration:
 *    - Priority 1: Gemini AI TTS (gemini-3.8-flash-lite-tts, prebuilt warm voices 'Kore' / 'Zephyr')
 *      Plays 24kHz raw PCM via Web Audio API, extremely realistic and gentle.
 *    - Priority 2: High quality system natural speech synthesis with gentle pitch/speed tuning
 */

import { WhisperItem } from '../data/whispers';

export type AmbianceType = 'stream' | 'breeze' | 'ocean' | 'waterfall' | 'rain';

export interface AmbianceTrack {
  id: AmbianceType;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
}

export const AMBIANCE_TRACKS: AmbianceTrack[] = [
  {
    id: 'stream',
    name: '溪水潺潺',
    nameEn: 'Gentle Brook',
    description: '如樹栽在溪水旁，清澈甘泉在卵石間流淌',
    icon: 'Droplets',
  },
  {
    id: 'breeze',
    name: '和煦微風',
    nameEn: 'Gentle Breeze',
    description: '如聖靈微風吹拂橄欖樹葉，帶來平靜安息',
    icon: 'Wind',
  },
  {
    id: 'ocean',
    name: '寧靜海浪',
    nameEn: 'Gentle Ocean',
    description: '輕柔海潮拍打細沙，深沉規律的呼吸節奏',
    icon: 'Waves',
  },
  {
    id: 'waterfall',
    name: '舒緩瀑布',
    nameEn: 'Misty Waterfall',
    description: '遠方山澗瀑布的水霧輕落，洗滌凡塵喧擾',
    icon: 'Mountain',
  },
  {
    id: 'rain',
    name: '柔和甘霖',
    nameEn: 'Soft Forest Rain',
    description: '滋潤心田的細雨點滴，滴在青草地上的清脆',
    icon: 'CloudRain',
  },
];

/**
 * Procedural Realistic Ambient Soundscape Generator
 */
class MultiAmbianceEngine {
  private ctx: AudioContext | null = null;
  private currentTrack: AmbianceType = 'stream';
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private activeNodes: Array<{ stop?: () => void; disconnect: () => void }> = [];
  private chimeTimer: any = null;
  private oceanInterval: any = null;
  private volume: number = 0.35;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getCurrentTrack(): AmbianceType {
    return this.currentTrack;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume() {
    return this.volume;
  }

  public play(track: AmbianceType = this.currentTrack) {
    this.initCtx();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying && this.currentTrack === track) {
      return;
    }

    this.stopInternal();
    this.currentTrack = track;
    this.isPlaying = true;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 1.2);
    this.masterGain.connect(this.ctx.destination);

    switch (track) {
      case 'stream':
        this.buildStreamSound();
        break;
      case 'breeze':
        this.buildBreezeSound();
        break;
      case 'ocean':
        this.buildOceanSound();
        break;
      case 'waterfall':
        this.buildWaterfallSound();
        break;
      case 'rain':
        this.buildRainSound();
        break;
      default:
        this.buildStreamSound();
    }

    this.schedulePeacefulChimes();
  }

  private stopInternal() {
    if (this.chimeTimer) {
      clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
    }
    if (this.oceanInterval) {
      clearInterval(this.oceanInterval);
      this.oceanInterval = null;
    }
    this.activeNodes.forEach((node) => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {
        // ignore
      }
    });
    this.activeNodes = [];
  }

  public stop() {
    this.isPlaying = false;
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.stopInternal();
        }, 550);
      } catch {
        this.stopInternal();
      }
    } else {
      this.stopInternal();
    }
  }

  private createPinkNoiseBuffer(durationSec: number = 3): AudioBuffer | null {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * durationSec;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  // 1. 溪水潺潺 (Gentle Brook)
  private buildStreamSound() {
    if (!this.ctx || !this.masterGain) return;
    const buffer = this.createPinkNoiseBuffer(3);
    if (!buffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.85, this.ctx.currentTime);

    // LFO for water brook natural rippling
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.25, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const streamGain = this.ctx.createGain();
    streamGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(streamGain);
    streamGain.connect(this.masterGain);

    lfo.start();
    noise.start();
    this.activeNodes.push(noise, filter, lfo, lfoGain, streamGain);
  }

  // 2. 和煦微風 (Gentle Breeze)
  private buildBreezeSound() {
    if (!this.ctx || !this.masterGain) return;
    const buffer = this.createPinkNoiseBuffer(4);
    if (!buffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // Breeze wind sweep modulation (very slow, graceful rise and fall)
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(200, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const breezeGain = this.ctx.createGain();
    breezeGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(breezeGain);
    breezeGain.connect(this.masterGain);

    lfo.start();
    noise.start();
    this.activeNodes.push(noise, filter, lfo, lfoGain, breezeGain);
  }

  // 3. 寧靜海浪 (Gentle Ocean Waves)
  private buildOceanSound() {
    if (!this.ctx || !this.masterGain) return;
    const buffer = this.createPinkNoiseBuffer(4);
    if (!buffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, this.ctx.currentTime);

    const waveGain = this.ctx.createGain();
    waveGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.masterGain);

    noise.start();
    this.activeNodes.push(noise, filter, waveGain);

    // Wave swell cycle: rise over 3.5s, fall over 4.5s
    const triggerWave = () => {
      if (!this.ctx || !this.isPlaying || this.currentTrack !== 'ocean') return;
      const now = this.ctx.currentTime;
      filter.frequency.linearRampToValueAtTime(750, now + 3.2);
      waveGain.gain.linearRampToValueAtTime(0.45, now + 3.2);

      filter.frequency.linearRampToValueAtTime(240, now + 8.0);
      waveGain.gain.linearRampToValueAtTime(0.06, now + 8.0);
    };

    triggerWave();
    this.oceanInterval = setInterval(triggerWave, 8200);
  }

  // 4. 舒緩瀑布 (Soothing Waterfall Mist)
  private buildWaterfallSound() {
    if (!this.ctx || !this.masterGain) return;
    const buffer = this.createPinkNoiseBuffer(3);
    if (!buffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Rich dual-filter for waterfall water roar + mist
    const filterLow = this.ctx.createBiquadFilter();
    filterLow.type = 'lowpass';
    filterLow.frequency.setValueAtTime(580, this.ctx.currentTime);

    const filterHigh = this.ctx.createBiquadFilter();
    filterHigh.type = 'highpass';
    filterHigh.frequency.setValueAtTime(120, this.ctx.currentTime);

    const waterfallGain = this.ctx.createGain();
    waterfallGain.gain.setValueAtTime(0.38, this.ctx.currentTime);

    noise.connect(filterLow);
    filterLow.connect(filterHigh);
    filterHigh.connect(waterfallGain);
    waterfallGain.connect(this.masterGain);

    noise.start();
    this.activeNodes.push(noise, filterLow, filterHigh, waterfallGain);
  }

  // 5. 柔和甘霖 (Soft Forest Rain)
  private buildRainSound() {
    if (!this.ctx || !this.masterGain) return;
    const buffer = this.createPinkNoiseBuffer(3);
    if (!buffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.5, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.28, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(rainGain);
    rainGain.connect(this.masterGain);

    noise.start();
    this.activeNodes.push(noise, filter, rainGain);
  }

  // Peaceful Spiritual Pentatonic Chimes
  private schedulePeacefulChimes() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const playChime = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const freqs = [392.0, 440.0, 523.25, 587.33, 659.25, 783.99, 880.0];
      const freq = freqs[Math.floor(Math.random() * freqs.length)];

      const osc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      chimeGain.gain.setValueAtTime(0, this.ctx.currentTime);
      chimeGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 0.2);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.8);

      osc.connect(chimeGain);
      chimeGain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 3.9);

      const nextDelay = 7000 + Math.random() * 9000;
      this.chimeTimer = setTimeout(playChime, nextDelay);
    };

    this.chimeTimer = setTimeout(playChime, 3500);
  }
}

export const ambianceEngine = new MultiAmbianceEngine();

/**
 * 2. Realistic Gentle Human Voice Narration Engine
 * Supports Gemini AI Neural Voice (extremely human-like, warm and gentle)
 * with seamless graceful fallback to fine-tuned browser SpeechSynthesis.
 */
class RealisticSpeechEngine {
  private audioCtx: AudioContext | null = null;
  private currentSourceNode: AudioBufferSourceNode | null = null;
  private isAIPeaking: boolean = false;
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  private initAudioCtx() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
  }

  public stop() {
    // Stop Web Audio playback
    if (this.currentSourceNode) {
      try {
        this.currentSourceNode.stop();
        this.currentSourceNode.disconnect();
      } catch (e) {
        // ignore
      }
      this.currentSourceNode = null;
    }
    this.isAIPeaking = false;

    // Stop Web SpeechSynthesis
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  /**
   * Decode base64 PCM 24000Hz (from Gemini TTS) into AudioBuffer
   */
  private decodePcm24k(base64: string): AudioBuffer | null {
    this.initAudioCtx();
    if (!this.audioCtx) return null;

    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // 16-bit PCM little endian
    const int16Array = new Int16Array(bytes.buffer);
    const sampleRate = 24000;
    const audioBuffer = this.audioCtx.createBuffer(1, int16Array.length, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    for (let i = 0; i < int16Array.length; i++) {
      channelData[i] = int16Array[i] / 32768.0;
    }

    return audioBuffer;
  }

  /**
   * Speak using Gemini AI High-Fidelity TTS
   */
  public async speakAI(
    text: string,
    options?: {
      voiceName?: 'Kore' | 'Zephyr' | 'Puck' | 'Fenrir' | 'Charon';
      stylePrompt?: string;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ): Promise<boolean> {
    this.stop();
    this.initAudioCtx();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    try {
      options?.onStart?.();
      const res = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voiceName: options?.voiceName || 'Kore',
          stylePrompt:
            options?.stylePrompt ||
            'Gentle, deeply loving, warm, comforting and peaceful whispering tone, speaking slowly to soothe the listener.',
        }),
      });

      if (!res.ok) {
        throw new Error(`TTS server error: ${res.status}`);
      }

      const json = await res.json();
      if (!json.success || !json.audioBase64) {
        throw new Error(json.error || 'No audio returned');
      }

      const buffer = this.decodePcm24k(json.audioBase64);
      if (!buffer || !this.audioCtx) {
        throw new Error('Could not decode audio PCM buffer');
      }

      const source = this.audioCtx.createBufferSource();
      source.buffer = buffer;

      // Gentle gain ramp
      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.9, this.audioCtx.currentTime);

      source.connect(gain);
      gain.connect(this.audioCtx.destination);

      source.onended = () => {
        this.currentSourceNode = null;
        this.isAIPeaking = false;
        options?.onEnd?.();
      };

      this.currentSourceNode = source;
      this.isAIPeaking = true;
      source.start();
      return true;
    } catch (err) {
      console.warn('AI TTS failed, falling back to gentle browser voice:', err);
      return false;
    }
  }

  /**
   * Speak using Browser SpeechSynthesis with warm gentle tuning
   */
  public speakBrowser(
    text: string,
    lang: 'zh' | 'en',
    options?: {
      rate?: number;
      pitch?: number;
      volume?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (e: any) => void;
    }
  ) {
    if (!this.synth) return;
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = this.synth.getVoices();

    if (lang === 'zh') {
      const zhVoices = voices.filter(
        (v) =>
          v.lang.startsWith('zh') ||
          v.lang.includes('cmn') ||
          v.lang.includes('TW') ||
          v.lang.includes('HK')
      );
      const gentleVoice =
        zhVoices.find(
          (v) =>
            v.name.includes('Natural') ||
            v.name.includes('Mei-Jia') ||
            v.name.includes('Hanhan') ||
            v.name.includes('Google') ||
            v.name.includes('Tingting') ||
            v.name.includes('Hsiao-Chen')
        ) || zhVoices[0];
      if (gentleVoice) utterance.voice = gentleVoice;
      utterance.lang = 'zh-TW';
      utterance.rate = options?.rate ?? 0.85;
      utterance.pitch = options?.pitch ?? 0.95;
    } else {
      const enVoices = voices.filter((v) => v.lang.startsWith('en'));
      const naturalEn =
        enVoices.find(
          (v) =>
            v.name.includes('Natural') ||
            v.name.includes('Samantha') ||
            v.name.includes('Karen') ||
            v.name.includes('Google US')
        ) || enVoices[0];
      if (naturalEn) utterance.voice = naturalEn;
      utterance.lang = 'en-US';
      utterance.rate = options?.rate ?? 0.88;
      utterance.pitch = options?.pitch ?? 0.96;
    }

    utterance.volume = options?.volume ?? 0.95;

    utterance.onstart = () => {
      options?.onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      options?.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      options?.onError?.(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  /**
   * Unified Speak Method: Tries AI realistic voice first, falls back smoothly to gentle browser engine
   */
  public async speak(
    text: string,
    lang: 'zh' | 'en',
    options?: {
      preferAI?: boolean;
      voiceName?: 'Kore' | 'Zephyr' | 'Puck' | 'Fenrir' | 'Charon';
      rate?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    }
  ) {
    const preferAI = options?.preferAI ?? true;

    if (preferAI) {
      const success = await this.speakAI(text, {
        voiceName: options?.voiceName || (lang === 'zh' ? 'Kore' : 'Zephyr'),
        onStart: options?.onStart,
        onEnd: options?.onEnd,
        onError: options?.onError,
      });

      if (success) {
        return;
      }
    }

    // Fallback to browser
    this.speakBrowser(text, lang, {
      rate: options?.rate,
      onStart: options?.onStart,
      onEnd: options?.onEnd,
      onError: options?.onError,
    });
  }

  public isSpeaking(): boolean {
    return this.isAIPeaking || !!(this.synth && this.synth.speaking);
  }
}

export const speechEngine = new RealisticSpeechEngine();
