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
  IconMenu2,
  IconMessageCircle2,
  IconMicrophone,
  IconPlayerPlayFilled,
  IconSearch,
  IconSettings,
  IconUserCircle,
  IconVideo,
  IconX,
} from "@tabler/icons-react";

const navItems = [
  { label: "الرئيسية", icon: IconHome2, href: "/" },
  { label: "الترجمة", icon: IconMessageCircle2, href: "/translate" },
  { label: "محادثة", icon: IconVideo, href: "/conversation" },
  { label: "التعلّم", icon: IconBook2, href: "/learning" },
  { label: "حسابي", icon: IconUserCircle, href: "/" },
];

function Brand() {
  return <div className="flex items-center gap-2.5" dir="ltr"><div className="eemaa-logo-mark" aria-hidden="true"><span /><span /><span /></div><div className="leading-none"><p className="text-[15px] font-extrabold tracking-[-0.04em] text-[#23322d]">Eemaa</p><p className="mt-1 text-[9px] font-bold tracking-[0.14em] text-[#7d8a83]">إيماء</p></div></div>;
}

function BottomNav() {
  const navigate = useNavigate();
  return <nav className="eemaa-bottom-nav" aria-label="التنقل الرئيسي">{navItems.map((item, index) => { const Icon = item.icon; const active = index === 0; return <button key={item.label} type="button" onClick={() => navigate(item.href)} className={`eemaa-nav-item ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}><Icon size={19} stroke={active ? 2.1 : 1.7} /><span>{item.label}</span></button>; })}</nav>;
}

function Drawer({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const items = [
    { label: "الرئيسية", icon: IconHome2, href: "/" },
    { label: "الترجمة", icon: IconMessageCircle2, href: "/translate" },
    { label: "المحادثة", icon: IconVideo, href: "/conversation" },
    { label: "القاموس", icon: IconSearch, href: "/dictionary" },
    { label: "رحلة التعلّم", icon: IconBook2, href: "/learning" },
  ];
  return <div className="eemaa-drawer-layer" role="presentation"><button type="button" className="eemaa-drawer-backdrop" onClick={onClose} aria-label="إغلاق القائمة" /><aside className="eemaa-drawer" role="dialog" aria-label="قائمة إيماء"><div className="flex items-center justify-between"><Brand /><button type="button" onClick={onClose} className="eemaa-soft-icon" aria-label="إغلاق القائمة"><IconX size={19} /></button></div><div className="eemaa-drawer-profile mt-8"><div className="eemaa-profile-avatar">ن</div><div><p className="text-sm font-extrabold text-[#23322d]">نورة أحمد</p><p className="mt-1 text-[11px] text-[#78877e]">رحلة تعلّم مستمرة</p></div><IconChevronLeft size={16} className="mr-auto text-[#9aa59e]" /></div><div className="mt-8 space-y-1">{items.map((item, index) => { const Icon = item.icon; return <button key={item.label} type="button" onClick={() => { navigate(item.href); onClose(); }} className={`eemaa-drawer-item ${index === 0 ? "is-active" : ""}`}><Icon size={19} /><span>{item.label}</span></button>; })}</div><div className="mt-8 border-t border-[#e5e9e3] pt-6"><p className="eemaa-drawer-label">مساحة شخصية</p><button type="button" className="eemaa-drawer-item"><IconBookmark size={19} /><span>المحفوظات</span></button><button type="button" className="eemaa-drawer-item"><IconSettings size={19} /><span>الإعدادات وإمكانية الوصول</span></button></div><div className="mt-auto rounded-[22px] bg-[#edf2e8] p-4"><p className="text-[13px] font-extrabold text-[#41564d]">تواصلي بطريقتك</p><p className="mt-2 text-[11px] leading-5 text-[#789084]">نحن هنا لنجعل كل إشارة مفهومة.</p></div></aside></div>;
}

export function meta() {
  return [{ title: "Eemaa | إيماء" }, { name: "description", content: "منصة إيماء للترجمة والتواصل بلغة الإشارة" }];
}

export default function HomeRoute() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return <div className="eemaa-page min-h-full" dir="rtl">
    <div className="eemaa-shell mx-auto max-w-[1120px] px-5 pb-32 pt-3 sm:px-8 lg:px-10 lg:pb-10">
      <header className="eemaa-topbar"><button type="button" onClick={() => setDrawerOpen(true)} className="eemaa-soft-icon" aria-label="فتح القائمة"><IconMenu2 size={20} /></button><Brand /><div className="flex items-center gap-2"><button type="button" className="eemaa-soft-icon" aria-label="الإشعارات"><IconBell size={19} /><span className="eemaa-notification-dot" /></button><button type="button" className="eemaa-profile-avatar small" aria-label="فتح الحساب">ن</button></div></header>

      <main className="mx-auto mt-7 max-w-[760px] lg:mt-10">
        <section className="flex items-end justify-between gap-5"><div><p className="eemaa-kicker">الأربعاء، ٢٤ أبريل</p><h1 className="mt-2 text-[28px] font-extrabold leading-[1.35] tracking-[-0.04em] text-[#23322d] sm:text-[36px]">مساء الخير، نورة</h1></div><button type="button" className="hidden rounded-full p-2 text-[#718078] transition-colors hover:bg-white sm:block" aria-label="الإعدادات"><IconSettings size={20} /></button></section>

        <section className="eemaa-home-hero mt-7"><div className="eemaa-home-hero-image"><img src="https://images.pexels.com/photos/33647890/pexels-photo-33647890.jpeg" alt="يدان تلتقيان في لحظة تواصل" /></div><div className="eemaa-home-hero-copy"><div><span className="eemaa-eyebrow-pill"><span /> جاهزة للاستماع</span><h2 className="mt-5 max-w-[240px] text-[27px] font-extrabold leading-[1.35] tracking-[-0.04em] text-[#23322d]">كل إشارة<br />تستحق أن تُفهم.</h2><p className="mt-3 max-w-[220px] text-[12px] leading-6 text-[#68786f]">ابدئي ترجمة فورية بلغة قريبة منك.</p></div><button type="button" onClick={() => navigate("/translate")} className="eemaa-primary-button mt-7 w-fit">ابدئي الترجمة <IconArrowUpLeft size={17} /></button></div></section>

        <section className="mt-5"><div className="eemaa-section-heading"><h2>تواصلي بطريقتك</h2><span>اختاري نقطة البداية</span></div><div className="eemaa-mode-rail"><button type="button" onClick={() => navigate("/translate")} className="eemaa-mode-tile is-featured"><span className="eemaa-mode-icon"><IconHandFinger size={21} /></span><span><strong>إشارة إلى نص</strong><small>ترجمة مباشرة</small></span><IconArrowUpLeft size={16} /></button><button type="button" onClick={() => navigate("/translate?mode=voice")} className="eemaa-mode-tile"><span className="eemaa-mode-icon"><IconMicrophone size={20} /></span><span><strong>صوت إلى إشارة</strong><small>افهمي المعنى بصريًا</small></span></button><button type="button" onClick={() => navigate("/translate?mode=text")} className="eemaa-mode-tile"><span className="eemaa-mode-icon"><IconVideo size={20} /></span><span><strong>نص إلى إشارة</strong><small>شاهدي التعبير</small></span></button><button type="button" onClick={() => navigate("/conversation")} className="eemaa-mode-tile"><span className="eemaa-mode-icon"><IconMessageCircle2 size={20} /></span><span><strong>محادثة مباشرة</strong><small>ترجمة أثناء الاتصال</small></span></button></div></section>

        <section className="mt-8 grid gap-4 sm:grid-cols-[1.1fr_.9fr]"><div className="eemaa-light-module"><div className="flex items-start justify-between gap-3"><div><span className="eemaa-section-label">رحلة التعلّم</span><h2 className="mt-2 text-[19px] font-extrabold text-[#23322d]">خطوة صغيرة، أثر كبير</h2></div><span className="eemaa-progress-value">٦٨<small>%</small></span></div><div className="eemaa-progress-track mt-5"><span /></div><div className="mt-3 flex items-center justify-between text-[11px] font-bold text-[#819087]"><span>٤ من ٦ جلسات</span><button type="button" onClick={() => navigate("/learning")} className="flex items-center gap-1 text-[#496157]">تابعي الرحلة <IconChevronLeft size={14} /></button></div></div><button type="button" onClick={() => setSaved(!saved)} className="eemaa-sign-note text-right"><div className="eemaa-sign-note-art"><IconHandFinger size={38} /></div><div className="min-w-0 flex-1"><span className="eemaa-section-label">إشارة اليوم</span><p className="mt-2 text-[17px] font-extrabold text-[#23322d]">صباح الخير</p><p className="mt-1 text-[11px] text-[#7c8a82]">التحية التي تبدأ بها يومًا أفضل</p></div><IconBookmark size={18} className={saved ? "text-[#5e7437]" : "text-[#9ca79f"} fill={saved ? "currentColor" : "none"} /></button></section>

        <section className="mt-8 flex items-center justify-between border-t border-[#e1e7e0] pt-5"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-2xl bg-[#e9efe7] text-[#5a7065]"><IconClock size={18} /></div><div><p className="text-[13px] font-extrabold text-[#46584f]">آخر نشاط</p><p className="mt-1 text-[11px] text-[#87948c]">ترجمة “أحتاج مساعدة”</p></div></div><IconChevronLeft size={17} className="text-[#9da8a1]" /></section>
      </main>
    </div>
    <BottomNav />
    {drawerOpen ? <Drawer onClose={() => setDrawerOpen(false)} /> : null}
  </div>;
}
