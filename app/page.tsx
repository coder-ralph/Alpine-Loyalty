"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  Download,
  Milk,
  Share2,
  Sparkles,
} from "lucide-react";
import { toPng } from "html-to-image";

const ALPINE_IMAGE = "/alpine-can.png";
const SITE_URL = "https://alphine-loyalty.vercel.app/";
const THREADS_URL = "https://www.threads.com/";
const SHARE_MESSAGE = `Claim your Alpine Loyalty card: ${SITE_URL}`;

type Theme = {
  name: string;
  accent: string;
  accentSoft: string;
  background: string;
};

const themes: Theme[] = [
  {
    name: "Classic",
    accent: "#ef4444",
    accentSoft: "#fecaca",
    background: "#17100e",
  },
  {
    name: "Cream",
    accent: "#f59e0b",
    accentSoft: "#fde68a",
    background: "#18130e",
  },
  {
    name: "Mountain",
    accent: "#60a5fa",
    accentSoft: "#bfdbfe",
    background: "#0d1318",
  },
];

const SIZES = ["154 mL", "370 mL"];

function getLevel(cans: number) {
  if (cans <= 1) {
    return {
      title: "Casual Sipper",
      description: "Just getting creamy.",
      points: 120,
    };
  }

  if (cans <= 3) {
    return {
      title: "Alpine Enjoyer",
      description: "A true fan of the creamy life.",
      points: 340,
    };
  }

  if (cans <= 5) {
    return {
      title: "Alpine Enthusiast",
      description: "Now that's dedication.",
      points: 680,
    };
  }

  return {
    title: "Alpine Legend",
    description: "Certified creaminess expert.",
    points: 1000,
  };
}

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null);
  const sizeMenuRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("Maxpein Den");
  const [cans, setCans] = useState(4);
  const [size, setSize] = useState("370 mL");
  const [sizeOpen, setSizeOpen] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [showCustomize, setShowCustomize] = useState(false);

  const theme = themes[themeIndex];
  const level = useMemo(() => getLevel(cans), [cans]);

  const memberId = useMemo(() => {
    const cleanName = name
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, 4)
      .toUpperCase();

    return `ALP-${cleanName || "MILK"}-${String(cans * 127).padStart(4, "0")}`;
  }, [name, cans]);

  const pips = Math.min(cans, 10);
  const overflow = Math.max(0, cans - 10);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  // Close the size menu on outside click / Escape.
  useEffect(() => {
    if (!sizeOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!sizeMenuRef.current?.contains(event.target as Node)) {
        setSizeOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSizeOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [sizeOpen]);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: theme.background,
      });

      const link = document.createElement("a");
      link.download = `alpine-loyalty-${name
        .toLowerCase()
        .replace(/\s+/g, "-")}.png`;

      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Unable to generate card:", error);
      setToast("Card export failed. Try again.");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_MESSAGE);
    } catch {
      // Clipboard unavailable — still open Threads.
    }

    setToast("Share message copied");
    window.open(THREADS_URL, "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_MESSAGE);

      setCopied(true);
      setToast("Share message copied");

      setTimeout(() => setCopied(false), 2000);
    } catch {
      setToast("Copy failed. Check clipboard permissions.");
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080808] text-white">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-red-500/10 blur-[140px]" />
        <div className="absolute bottom-[-300px] right-[-200px] h-[500px] w-[500px] rounded-full bg-orange-400/5 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-12">
        {/* Header */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
              <Milk size={19} />
            </div>

            <div>
              <div className="text-sm font-semibold tracking-tight">
                Alpine Loyalty
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                Membership Generator
              </div>
            </div>
          </div>

          <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/50 sm:block">
            Certified Alpine Enjoyer™
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-3xl pb-8 pt-14 text-center sm:pb-12 sm:pt-24">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-400/5 px-3 py-1.5 text-xs text-red-300">
            <Sparkles size={13} />
            Your dedication deserves a card.
          </div>

          <h1 className="text-4xl font-bold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Alpine
            <span className="text-white/30"> Loyalty</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
            Create your own personalized Alpine membership card. Customize your
            stats, choose a theme, and show off your cream-powered dedication.
          </p>
        </section>

        {/* Workspace */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-8">
          {/* Card preview */}
          <div className="flex min-h-0 items-center justify-center rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-3 sm:rounded-[32px] sm:p-8 lg:min-h-[560px]">
            {/* Container-query root: every measurement inside the card scales
                with the card's own width, so nothing clips at any viewport. */}
            <div className="w-full max-w-[720px] [container-type:inline-size]">
              <div
                ref={cardRef}
                className="relative aspect-[1.586/1] w-full overflow-hidden rounded-[4cqi] border border-white/10 shadow-2xl"
                style={{
                  background: `
                    radial-gradient(
                      circle at 85% 20%,
                      ${theme.accent}25,
                      transparent 35%
                    ),
                    radial-gradient(
                      circle at 10% 90%,
                      ${theme.accent}15,
                      transparent 30%
                    ),
                    ${theme.background}
                  `,
                }}
              >
                {/* Decorative rings */}
                <div
                  className="pointer-events-none absolute -right-[10cqi] -top-[10cqi] h-[36cqi] w-[36cqi] rounded-full border opacity-40"
                  style={{ borderColor: `${theme.accent}33` }}
                />
                <div
                  className="pointer-events-none absolute -right-[4cqi] -top-[4cqi] h-[22cqi] w-[22cqi] rounded-full border opacity-30"
                  style={{ borderColor: `${theme.accent}22` }}
                />

                {/* Alpine ridge */}
                <svg
                  viewBox="0 0 800 220"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] w-full"
                  aria-hidden="true"
                >
                  <path
                    d="M0 190 L70 132 L118 160 L188 88 L246 142 L318 62 L386 138 L452 96 L520 150 L596 104 L664 158 L732 120 L800 168 L800 220 L0 220 Z"
                    fill={`${theme.accent}12`}
                  />
                  <path
                    d="M0 190 L70 132 L118 160 L188 88 L246 142 L318 62 L386 138 L452 96 L520 150 L596 104 L664 158 L732 120 L800 168"
                    fill="none"
                    stroke={`${theme.accent}59`}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M0 214 L96 176 L164 198 L240 150 L322 196 L404 158 L488 200 L566 164 L648 202 L740 170 L800 196"
                    fill="none"
                    stroke="#ffffff1a"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Perforation + notches */}
                <div
                  className="pointer-events-none absolute inset-y-0 right-[13.5%] border-l border-dashed"
                  style={{ borderColor: "#ffffff26" }}
                />
                <div className="pointer-events-none absolute -top-[1.4cqi] right-[13.5%] h-[2.8cqi] w-[2.8cqi] -translate-x-1/2 rounded-full bg-[#080808]" />
                <div className="pointer-events-none absolute -bottom-[1.4cqi] right-[13.5%] h-[2.8cqi] w-[2.8cqi] -translate-x-1/2 rounded-full bg-[#080808]" />

                {/* Vertical stub */}
                <div className="absolute inset-y-0 right-0 flex w-[13.5%] items-center justify-center">
                  <div
                    className="flex items-center gap-[1.6cqi] whitespace-nowrap text-[1.5cqi] font-medium uppercase tracking-[0.28em] text-white/45"
                    style={{ transform: "rotate(90deg)" }}
                  >
                    <span style={{ color: theme.accentSoft }}>{memberId}</span>
                    <span className="text-white/20">/</span>
                    <span>{level.title}</span>
                    <span className="text-white/20">/</span>
                    <span>{level.points} pts</span>
                  </div>
                </div>

                {/* Product can */}
                <img
                  src={ALPINE_IMAGE}
                  alt="Alpine Full Cream Evaporated Milk"
                  className="pointer-events-none absolute bottom-0 right-[15%] w-[26%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]"
                />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col justify-between p-[5cqi] pr-[18cqi]">
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-[3cqi]">
                    <div>
                      <div
                        className="text-[2.1cqi] font-bold uppercase leading-none tracking-[0.28em]"
                        style={{ color: theme.accentSoft }}
                      >
                        Alpine
                      </div>
                      <div className="mt-[1cqi] text-[1.6cqi] uppercase leading-none tracking-[0.2em] text-white/40">
                        Loyalty Membership
                      </div>
                    </div>

                    <div className="flex h-[6.5cqi] w-[6.5cqi] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                      <Milk className="h-[3.2cqi] w-[3.2cqi]" />
                    </div>
                  </div>

                  {/* Dedication meter */}
                  <div className="max-w-[62%]">
                    <div className="flex items-center gap-[1.1cqi]">
                      {Array.from({ length: pips }).map((_, index) => (
                        <span
                          key={index}
                          className="h-[1.7cqi] w-[1.7cqi] rounded-[0.5cqi]"
                          style={{ backgroundColor: theme.accent }}
                        />
                      ))}
                      {Array.from({ length: Math.max(0, 10 - pips) }).map(
                        (_, index) => (
                          <span
                            key={`empty-${index}`}
                            className="h-[1.7cqi] w-[1.7cqi] rounded-[0.5cqi] bg-white/10"
                          />
                        )
                      )}
                      {overflow > 0 && (
                        <span
                          className="ml-[1cqi] text-[1.6cqi] font-bold leading-none"
                          style={{ color: theme.accentSoft }}
                        >
                          +{overflow}
                        </span>
                      )}
                    </div>

                    <div className="mt-[1.6cqi] text-[1.6cqi] uppercase leading-none tracking-[0.2em] text-white/35">
                      {cans} can{cans === 1 ? "" : "s"} a week · {size}
                    </div>
                  </div>

                  {/* Identity block */}
                  <div className="max-w-[62%]">
                    <div className="mb-[1.2cqi] text-[1.4cqi] font-medium uppercase leading-none tracking-[0.25em] text-white/40">
                      Certified Member
                    </div>

                    <div className="truncate text-[6.2cqi] font-extrabold leading-[1.1] tracking-tight">
                      {name || "Your Name"}
                    </div>

                    <div
                      className="mt-[1.8cqi] inline-flex rounded-full border px-[2.4cqi] py-[0.9cqi] text-[1.5cqi] font-semibold uppercase leading-none tracking-[0.12em]"
                      style={{
                        color: theme.accentSoft,
                        borderColor: `${theme.accent}55`,
                        backgroundColor: `${theme.accent}15`,
                      }}
                    >
                      {level.title}
                    </div>

                    <div className="my-[2.4cqi] w-full border-t border-dashed border-white/15" />

                    <div className="grid grid-cols-3 gap-[2cqi]">
                      <div>
                        <div className="text-[1.2cqi] font-medium uppercase leading-none tracking-[0.18em] text-white/35">
                          Member ID
                        </div>
                        <div className="mt-[1cqi] font-mono text-[1.6cqi] font-medium leading-none text-white/75">
                          {memberId}
                        </div>
                      </div>

                      <div>
                        <div className="text-[1.2cqi] font-medium uppercase leading-none tracking-[0.18em] text-white/35">
                          Weekly
                        </div>
                        <div className="mt-[1cqi] text-[1.6cqi] font-bold leading-none text-white/90">
                          {cans} × {size}
                        </div>
                      </div>

                      <div>
                        <div className="text-[1.2cqi] font-medium uppercase leading-none tracking-[0.18em] text-white/35">
                          Points
                        </div>
                        <div className="mt-[1cqi] text-[1.6cqi] font-bold leading-none text-white/90">
                          {level.points} XP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom accent glow bar */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 h-[0.5cqi] w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
                  }}
                />

                {/* Surface noise */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#fff_0.7px,transparent_0.7px)] [background-size:8px_8px]" />
              </div>
            </div>
          </div>

          {/* Controls */}
          <aside className="rounded-[24px] border border-white/[0.07] bg-white/[0.025] p-5 sm:rounded-[28px] sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Create your card</h2>
              <p className="mt-1 text-xs leading-5 text-white/35">
                Enter your details and watch your membership card update.
              </p>
            </div>

            {/* Name */}
            <label className="block">
              <span className="mb-2 block text-xs font-medium text-white/55">
                Member name
              </span>

              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={28}
                placeholder="Your name"
                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm outline-none transition placeholder:text-white/20 focus:border-white/25 focus:bg-white/[0.06]"
              />
            </label>

            {/* Consumption */}
            <div className="mt-5">
              <span className="mb-2 block text-xs font-medium text-white/55">
                Alpine dedication
              </span>

              <div className="grid grid-cols-[1fr_120px] gap-2">
                {/* Native spinners stay enabled. The suffix is a sibling of the
                    input rather than an overlay, so the spin buttons sit at the
                    input's own right edge and the label clears them. */}
                <div className="flex h-11 items-center rounded-xl border border-white/10 bg-white/[0.04] pr-3 transition focus-within:border-white/25">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={20}
                    value={cans}
                    onChange={(event) =>
                      setCans(
                        Math.min(
                          20,
                          Math.max(1, Number(event.target.value) || 1)
                        )
                      )
                    }
                    className="h-full w-full min-w-0 flex-1 rounded-l-xl bg-transparent px-3 text-sm outline-none"
                  />

                  <span className="ml-2 select-none whitespace-nowrap text-xs text-white/25">
                    cans/week
                  </span>
                </div>

                {/* Themed dropdown — native <option> styling is not reliably
                    controllable across browsers, so this is a custom menu. */}
                <div className="relative" ref={sizeMenuRef}>
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={sizeOpen}
                    onClick={() => setSizeOpen((value) => !value)}
                    className="flex h-11 w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm outline-none transition hover:bg-white/[0.06] focus-visible:border-white/25"
                  >
                    {size}
                    <ChevronDown
                      size={14}
                      className={`text-white/30 transition-transform ${
                        sizeOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {sizeOpen && (
                    <ul
                      role="listbox"
                      className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-xl border border-white/10 bg-[#141414] py-1 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                    >
                      {SIZES.map((option) => (
                        <li key={option}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={size === option}
                            onClick={() => {
                              setSize(option);
                              setSizeOpen(false);
                            }}
                            className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition hover:bg-white/[0.08] ${
                              size === option ? "text-white" : "text-white/60"
                            }`}
                          >
                            {option}
                            {size === option && <Check size={13} />}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Level */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                  Current level
                </span>

                <span
                  className="text-xs font-semibold"
                  style={{ color: theme.accentSoft }}
                >
                  {level.points} pts
                </span>
              </div>

              <div className="mt-2 text-lg font-semibold">{level.title}</div>

              <p className="mt-1 text-xs text-white/35">{level.description}</p>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, level.points / 10)}%`,
                    backgroundColor: theme.accent,
                  }}
                />
              </div>
            </div>

            {/* Customize */}
            <button
              onClick={() => setShowCustomize((value) => !value)}
              className="mt-5 flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm transition hover:bg-white/[0.06]"
            >
              <span>Customize appearance</span>

              <ChevronDown
                size={16}
                className={`text-white/30 transition-transform ${
                  showCustomize ? "rotate-180" : ""
                }`}
              />
            </button>

            {showCustomize && (
              <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                  Card theme
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {themes.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => setThemeIndex(index)}
                      className={`rounded-xl border p-2 text-left transition ${
                        themeIndex === index
                          ? "border-white/30 bg-white/[0.08]"
                          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                      }`}
                    >
                      <div
                        className="mb-2 h-7 rounded-lg"
                        style={{
                          background: `linear-gradient(135deg, ${item.background}, ${item.accent})`,
                        }}
                      />

                      <div className="text-[10px] font-medium">{item.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                onClick={handleDownload}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-black transition hover:bg-white/90"
              >
                <Download size={15} />
                Download
              </button>

              <button
                onClick={handleShare}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium transition hover:bg-white/[0.08]"
              >
                <Share2 size={15} />
                Share
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs text-white/40 transition hover:bg-white/[0.04] hover:text-white/70"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy message"}
            </button>

            <p className="mt-6 text-center text-[9px] leading-4 text-white/20">
              Personal fan-made project. Not an official Alpine membership
              program or loyalty card.
            </p>
          </aside>
        </section>

        {/* Stats */}
        <section className="mx-auto mt-6 grid max-w-5xl gap-3 sm:mt-8 sm:grid-cols-3">
          {[
            { label: "Your Level", value: level.title },
            { label: "Weekly Dedication", value: `${cans} × ${size}` },
            { label: "Membership Points", value: `${level.points} XP` },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5"
            >
              <div className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                {item.label}
              </div>

              <div className="mt-2 text-sm font-semibold">{item.value}</div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="py-10 text-center text-[10px] uppercase tracking-[0.2em] text-white/20 sm:py-12">
          Alpine Loyalty • Made for the creamy life
        </footer>
      </div>

      {/* Toast */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:inset-x-auto sm:right-6 sm:justify-end"
      >
        {toast && (
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#141414] px-4 py-3 text-sm text-white/85 shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
            <Check size={15} className="text-emerald-400" />
            {toast}
          </div>
        )}
      </div>
    </main>
  );
}
