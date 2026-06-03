"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CreditCard, Brain, Timer, AlertCircle, CheckSquare, LayoutDashboard, ListChecks, Trophy, GraduationCap } from "lucide-react";
import { LevelBadge } from "./LevelBadge";

const NAV = [
  { href: "/", label: "Дашборд", icon: LayoutDashboard },
  { href: "/plan", label: "План 16 дней", icon: ListChecks },
  { href: "/lessons", label: "Уроки", icon: BookOpen },
  { href: "/flashcards", label: "Карточки", icon: CreditCard },
  { href: "/exercises", label: "Упражнения", icon: Brain },
  { href: "/exam", label: "Экзамен", icon: GraduationCap },
  { href: "/achievements", label: "Достижения", icon: Trophy },
  { href: "/timer", label: "Pomodoro", icon: Timer },
  { href: "/error-journal", label: "Ошибки", icon: AlertCircle },
  { href: "/checklist", label: "Чек-лист", icon: CheckSquare },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-full w-56 bg-slate-900 border-r border-slate-800 flex flex-col z-50">
      <div className="p-4 border-b border-slate-800">
        <Link href="/" className="block">
          <h1 className="text-lg font-bold text-amber-400">اردو</h1>
          <p className="text-xs text-slate-400 mt-0.5">Самоучитель урду</p>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-amber-500/20 text-amber-400 border-r-2 border-amber-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </div>
      <div className="p-3 border-t border-slate-800">
        <LevelBadge compact />
      </div>
    </nav>
  );
}
