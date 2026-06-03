"use client";

// Кэш голосов: getVoices() часто возвращает пустой массив при первом вызове,
// пока браузер не загрузит голоса асинхронно. Держим их здесь.
let cachedVoices: SpeechSynthesisVoice[] = [];

function refreshVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const v = window.speechSynthesis.getVoices();
  if (v.length > 0) cachedVoices = v;
}

// Подписываемся один раз на загрузку голосов
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

function pickVoice(): { voice: SpeechSynthesisVoice | null; lang: string } {
  const voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices();
  const urdu = voices.find(
    (v) => v.lang === "ur-PK" || v.lang === "ur" || v.lang.startsWith("ur-")
  );
  if (urdu) return { voice: urdu, lang: urdu.lang };
  // Хинди — ближайший фонетически язык, почти всегда есть в системе
  const hindi = voices.find((v) => v.lang === "hi-IN" || v.lang.startsWith("hi-"));
  if (hindi) return { voice: hindi, lang: hindi.lang };
  return { voice: null, lang: "ur-PK" };
}

export function speakUrdu(text: string): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel();

  const speak = () => {
    const utt = new SpeechSynthesisUtterance(text);
    const { voice, lang } = pickVoice();
    if (voice) utt.voice = voice;
    utt.lang = lang;
    utt.rate = 0.8;
    utt.pitch = 1;
    synth.speak(utt);
  };

  // Если голоса ещё не подгрузились — ждём события, иначе говорим сразу
  if (cachedVoices.length === 0 && synth.getVoices().length === 0) {
    const handler = () => {
      refreshVoices();
      synth.removeEventListener("voiceschanged", handler);
      speak();
    };
    synth.addEventListener("voiceschanged", handler);
    // Подстраховка: некоторые браузеры не диспатчат событие — пробуем через таймаут
    setTimeout(() => {
      synth.removeEventListener("voiceschanged", handler);
      refreshVoices();
      speak();
    }, 300);
  } else {
    refreshVoices();
    speak();
  }
}

export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve([]);
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    };
  });
}

export function isTtsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
