import { AudioButton } from "./AudioButton";

type Props = {
  urdu: string;
  translit?: string;
  translation?: string;
  showTranslit?: boolean;
  showTranslation?: boolean;
  audio?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
};

const SIZE_CLASSES = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

export function UrduText({
  urdu,
  translit,
  translation,
  showTranslit = true,
  showTranslation = true,
  audio = true,
  size = "md",
}: Props) {
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        {audio && <AudioButton text={urdu} />}
        <span
          dir="rtl"
          lang="ur"
          className={`font-urdu ${SIZE_CLASSES[size]} leading-relaxed text-white`}
          style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}
        >
          {urdu}
        </span>
      </div>
      {showTranslit && translit && (
        <span className="text-sm text-amber-300/80 font-mono">{translit}</span>
      )}
      {showTranslation && translation && (
        <span className="text-sm text-gray-300">{translation}</span>
      )}
    </div>
  );
}
