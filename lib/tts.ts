"use client";

export function speakUrdu(text: string): void {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);

  // Try to find an Urdu or Hindi voice
  const voices = window.speechSynthesis.getVoices();
  const urduVoice = voices.find(
    (v) => v.lang === "ur-PK" || v.lang === "ur" || v.lang.startsWith("ur-")
  );
  const fallbackVoice = voices.find(
    (v) => v.lang === "hi-IN" || v.lang.startsWith("hi-")
  );

  if (urduVoice) {
    utt.voice = urduVoice;
    utt.lang = "ur-PK";
  } else if (fallbackVoice) {
    utt.voice = fallbackVoice;
    utt.lang = "hi-IN";
  } else {
    utt.lang = "ur-PK";
  }

  utt.rate = 0.85;
  utt.pitch = 1;
  window.speechSynthesis.speak(utt);
}

// Ensure voices are loaded (browsers load them async)
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") { resolve([]); return; }
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) { resolve(voices); return; }
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };
  });
}
