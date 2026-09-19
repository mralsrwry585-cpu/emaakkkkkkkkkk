import { useState } from "react";
import { useNavigate } from "react-router";
import {
  IconArrowUpLeft,
  IconBell,
  IconBook2,
  IconBookmark,
  IconChevronLeft,
  IconClock,
  IconHandFinger,
  IconHome2,
  IconMessageCircle2,
  IconMicrophone,
  IconPlayerPlayFilled,
  IconSearch,
  IconSettings,
  IconUserCircle,
  IconVideo,
} from "@tabler/icons-react";

const navItems = [
  { label: "الرئيسية", icon: IconHome2, href: "/" },
  { label: "الترجمة", icon: IconMessageCircle2, href: "/translate" },
  { label: "القاموس", icon: IconSearch, href: "/" },
  { label: "التعلّم", icon: IconBook2, href: "/" },
  { label: "حسابي", icon: IconUserCircle, href: "/" },
];

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5" dir="ltr">
      <div className="eemaa-logo-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="leading-none">
        <p className="text-[15px] font-extrabold tracking-[-0.04em] text-[#252c54]">Eemaa</p>
        <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#777b9b]">إيماء</p>
      </div>
    </div>
  );
}

function BottomNav() {
  const navigate = useNavigate();
  return (
    <nav className="eemaa-bottom-nav" aria-label="التنقل الرئيسي">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const active = index === 0;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => navigate(item.href)}
            className={`eemaa-nav-item ${active ? "is-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={20} stroke={active ? 2.3 : 1.8} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function SignalVisual() {
  return (
    <div className="eemaa-signal-visual" aria-hidden="true">
      <div className="eemaa-orbit eemaa-orbit-one" />
      <div className="eemaa-orbit eemaa-orbit-two" />
      <div className="eemaa-signal-core">
        <IconHandFinger size={84} stroke={1.2} />
      </div>
      <span className="eemaa-signal-dot dot-one" />
      <span className="eemaa-signal-dot dot-two" />
      <span className="eemaa-signal-dot dot-three" />
    </div>
  );
}

export function meta() {
  return [
    { title: "Eemaa | إيماء" },
    { name: "description", content: "منصة إيماء للترجمة والتواصل بلغة الإشارة" },
  ];
}

export default function HomeRoute() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  return (
    <div className="eemaa-page min-h-full" dir="rtl">
      <div className="eemaa-shell mx-auto max-w-[1240px] px-5 pb-32 pt-5 sm:px-8 lg:px-10 lg:pb-10">
        <header className="flex items-center justify-between gap-4">
          <LogoMark />
          <div className="flex items-center gap-2">
            <button className="eemaa-icon-button" type="button" aria-label="الإشعارات">
              <IconBell size={19} stroke={1.8} />
              <span className="eemaa-notification-dot" />
            </button>
            <button className="eemaa-avatar" type="button" aria-label="فتح الحساب">
              ن
            </button>
          </div>
        </header>

        <main className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-12 lg:pt-8">
          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eemaa-kicker">الأربعاء، ٢٤ أبريل</p>
                <h1 className="mt-2 text-[29px] font-extrabold leading-[1.25] tracking-[-0.04em] text-[#252c54] sm:text-[34px]">
                  مساء الخير، نورة
                </h1>
              </div>
              <button className="hidden rounded-full p-2 text-[#777b9b] transition-colors hover:bg-white hover:text-[#252c54] sm:block" type="button" aria-label="الإعدادات">
                <IconSettings size={21} stroke={1.8} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigate("/translate")}
              className="eemaa-hero-action group mt-7 w-full text-right"
            >
              <div className="relative z-10 flex min-h-[292px] flex-col justify-between p-6 sm:min-h-[325px] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="eemaa-live-pill"><span /> متصل الآن</span>
                    <h2 className="mt-5 max-w-[270px] text-[25px] font-bold leading-[1.3] tracking-[-0.03em] text-white sm:text-[30px]">
                      خلّينا نفهم<br /> إشارتك.
                    </h2>
                  </div>
                  <div className="rounded-full border border-white/15 bg-white/10 p-3 text-[#d9e1ff] backdrop-blur-sm">
                    <IconArrowUpLeft size={22} stroke={1.8} />
                  </div>
                </div>
                <div className="flex items-end justify-between gap-4">
                  <p className="max-w-[190px] text-[13px] leading-6 text-[#bfc8ec]">
                    ترجمة فورية من لغة الإشارة إلى العربية والصوت
                  </p>
                  <span className="eemaa-hero-cta group-hover:bg-[#d8f577]">ابدأ الترجمة</span>
                </div>
              </div>
              <SignalVisual />
            </button>

            <div className="mt-5 flex items-center gap-3 overflow-x-auto pb-1">
              <button type="button" onClick={() => navigate("/translate")} className="eemaa-quick-action eemaa-quick-action-primary">
                <IconHandFinger size={19} />
                <span>إشارة إلى نص</span>
              </button>
              <button type="button" onClick={() => navigate("/translate?mode=voice")} className="eemaa-quick-action">
                <IconMicrophone size={18} />
                <span>صوت إلى إشارة</span>
              </button>
              <button type="button" onClick={() => navigate("/translate?mode=text")} className="eemaa-quick-action">
                <IconVideo size={18} />
                <span>نص إلى إشارة</span>
              </button>
            </div>
          </section>

          <section className="space-y-5 lg:pt-[73px]">
            <div className="eemaa-progress-panel">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="eemaa-section-label">رحلتك هذا الأسبوع</span>
                  <h2 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-[#252c54]">خطوة صغيرة، أثر كبير</h2>
                </div>
                <div className="eemaa-progress-number">68<span>%</span></div>
              </div>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#e8e9f4]">
                <div className="h-full w-[68%] rounded-full bg-[#b6d93d]" />
              </div>
              <div className="mt-4 flex items-center justify-between text-[12px] font-semibold text-[#777b9b]">
                <span>٤ من ٦ جلسات مكتملة</span>
                <button type="button" className="flex items-center gap-1 text-[#545b89]">تابعي الرحلة <IconChevronLeft size={15} /></button>
              </div>
            </div>

            <div className="eemaa-discovery-panel">
              <div className="flex items-center justify-between">
                <div>
                  <span className="eemaa-section-label">اكتشاف اليوم</span>
                  <h2 className="mt-2 text-[22px] font-bold tracking-[-0.03em] text-[#252c54]">إشارات تشبه يومك</h2>
                </div>
                <button type="button" className="rounded-full p-2 text-[#777b9b] transition-colors hover:bg-[#f0eff9]" aria-label="فتح القاموس">
                  <IconChevronLeft size={20} />
                </button>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <div className="eemaa-sign-thumbnail">
                  <IconHandFinger size={40} stroke={1.25} />
                  <span>اليوم</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[19px] font-bold text-[#252c54]">صباح الخير</p>
                  <p className="mt-1 text-[12px] leading-5 text-[#777b9b]">التحية التي تبدأ بها يومًا أفضل</p>
                  <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-[#9799ae]">
                    <IconPlayerPlayFilled size={10} /> ٠:٢٨ · أساسي
                  </div>
                </div>
                <button type="button" onClick={() => setSaved(!saved)} className={`eemaa-save-button ${saved ? "is-saved" : ""}`} aria-label={saved ? "إزالة من المحفوظات" : "حفظ الإشارة"}>
                  <IconBookmark size={18} fill={saved ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#e2e3ee] pt-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-[#e8e6f4] text-[#555c8b]"><IconClock size={18} /></div>
                <div>
                  <p className="text-[13px] font-bold text-[#3d4264]">آخر نشاط</p>
                  <p className="mt-1 text-[12px] text-[#8b8da4]">ترجمة “أحتاج مساعدة”</p>
                </div>
              </div>
              <IconChevronLeft size={17} className="text-[#a2a3b6]" />
            </div>
          </section>
        </main>

        <section className="mt-10 hidden rounded-[28px] bg-[#e9e8f5] p-5 lg:block">
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#252c54] text-[#d8f577]"><IconVideo size={22} /></div>
              <div>
                <p className="text-[15px] font-bold text-[#252c54]">تواصلي بشكل أوضح</p>
                <p className="mt-1 text-[12px] text-[#777b9b]">مكالمة مباشرة مع ترجمة الإشارة مفعّلة</p>
              </div>
            </div>
            <button type="button" className="flex items-center gap-2 rounded-full bg-[#252c54] px-5 py-3 text-[12px] font-bold text-white transition-transform hover:-translate-y-0.5">ابدئي محادثة <IconArrowUpLeft size={16} /></button>
          </div>
        </section>
      </div>
      <BottomNav />
    </div>
  );
}
