import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  IconArrowRight,
  IconBell,
  IconBook2,
  IconCheck,
  IconChevronLeft,
  IconHome2,
  IconMessageCircle2,
  IconPlayerPlayFilled,
  IconRefresh,
  IconSearch,
  IconUserCircle,
  IconVideo,
} from "@tabler/icons-react";

function BottomNav() {
  const navigate = useNavigate();
  const items = [
    { label: "الرئيسية", icon: IconHome2, href: "/" },
    { label: "الترجمة", icon: IconMessageCircle2, href: "/translate" },
    { label: "محادثة", icon: IconVideo, href: "/conversation" },
    { label: "التعلّم", icon: IconBook2, href: "/learning" },
    { label: "حسابي", icon: IconUserCircle, href: "/" },
  ];
  return <nav className="eemaa-bottom-nav" aria-label="التنقل الرئيسي">{items.map((item) => { const Icon = item.icon; const active = item.label === "التعلّم"; return <button key={item.label} type="button" onClick={() => navigate(item.href)} className={`eemaa-nav-item ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}><Icon size={20} stroke={active ? 2.3 : 1.8} /><span>{item.label}</span></button>; })}</nav>;
}

export function meta() {
  return [{ title: "التعلّم | Eemaa" }, { name: "description", content: "رحلة تعلّم لغة الإشارة مع Eemaa" }];
}

export default function LearningRoute() {
  const [started, setStarted] = useState(false);
  return (
    <div className="eemaa-page min-h-full" dir="rtl">
      <div className="eemaa-shell mx-auto max-w-[1240px] px-5 pb-32 pt-5 sm:px-8 lg:px-10 lg:pb-10">
        <header className="flex items-center justify-between gap-4"><Link to="/" className="flex size-10 items-center justify-center rounded-2xl text-[#555c89] transition-colors hover:bg-white" aria-label="العودة للرئيسية"><IconArrowRight size={20} /></Link><div className="flex items-center gap-2.5"><div className="eemaa-logo-mark"><span /><span /><span /></div><span className="text-[15px] font-extrabold tracking-[-0.04em] text-[#252c54]">رحلة التعلّم</span></div><button type="button" className="eemaa-icon-button" aria-label="الإشعارات"><IconBell size={19} stroke={1.8} /><span className="eemaa-notification-dot" /></button></header>

        <main className="mx-auto mt-8 max-w-4xl lg:mt-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="eemaa-kicker">المستوى الأول · أساسيات التواصل</p><h1 className="mt-2 text-[30px] font-extrabold leading-[1.3] tracking-[-0.04em] text-[#252c54] sm:text-[38px]">تعلّمي بإيقاعك،<br />وتواصلي بثقة.</h1></div><div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3"><span className="text-[25px] font-extrabold text-[#252c54]">٤</span><span className="text-[10px] font-bold leading-4 text-[#8d8fa7]">أيام<br />متتالية</span></div></div>

          <section className="eemaa-learning-hero mt-8"><div className="relative z-10 flex min-h-[220px] flex-col justify-between p-6 sm:p-8"><div><span className="rounded-full bg-[#d8f577] px-3 py-1.5 text-[10px] font-extrabold text-[#252c54]">الدرس التالي</span><h2 className="mt-5 text-[25px] font-bold text-white">التحيات الأساسية</h2><p className="mt-2 text-[12px] text-[#bcc5e9]">٥ دقائق · ٤ إشارات جديدة</p></div><button type="button" onClick={() => setStarted(!started)} className="flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-[11px] font-extrabold text-[#252c54] transition-transform hover:-translate-y-0.5">{started ? "الدرس مفتوح" : "ابدئي الدرس"} <IconPlayerPlayFilled size={13} /></button></div><div className="eemaa-learning-orbit"><div className="eemaa-learning-ring" /><IconBook2 size={68} stroke={1.15} /></div></section>

          <section className="mt-7 rounded-[26px] border border-[#e3e4ed] bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><div><span className="eemaa-section-label">تقدم المستوى</span><h2 className="mt-2 text-[20px] font-bold text-[#252c54]">تقدّم ثابت</h2></div><span className="text-[28px] font-extrabold tracking-[-0.05em] text-[#252c54]">٦٨<span className="text-[13px] text-[#9295aa]">٪</span></span></div><div className="mt-5 grid grid-cols-6 gap-2">{["تم", "تم", "تم", "تم", "اليوم", "بعد"].map((label, index) => <div key={`${label}-${index}`} className={`flex h-16 flex-col items-center justify-center rounded-2xl ${index < 4 ? "bg-[#e5edba] text-[#65713a]" : index === 4 ? "border-2 border-[#b6d93d] bg-[#f7f9e8] text-[#65713a]" : "bg-[#f0f1f7] text-[#a2a4b5]"}`}><span className="text-[10px] font-extrabold">{index < 4 ? <IconCheck size={15} /> : label}</span><span className="mt-1 text-[9px] font-bold">{index + 1}</span></div>)}</div></section>

          <section className="mt-9"><div className="flex items-center justify-between"><h2 className="text-[20px] font-bold text-[#252c54]">طريقك هذا الأسبوع</h2><button type="button" className="text-[11px] font-bold text-[#777b9b]">كل الدروس</button></div><div className="relative mt-5 space-y-3 before:absolute before:bottom-8 before:right-[20px] before:top-8 before:w-px before:bg-[#d8dbe7]">{[{title: "التحيات الأساسية", meta: "مكتمل · ٤ إشارات", state: "done"}, {title: "التعريف بالنفس", meta: "الدرس الحالي · ٦ دقائق", state: "current"}, {title: "المشاعر اليومية", meta: "يفتح بعد إكمال الدرس", state: "locked"}].map((lesson) => <div key={lesson.title} className="relative flex items-center gap-4 rounded-[22px] bg-white px-4 py-4"><div className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-2xl ${lesson.state === "done" ? "bg-[#d8f577] text-[#4d5a27]" : lesson.state === "current" ? "bg-[#252c54] text-[#d8f577]" : "bg-[#eef0f6] text-[#a2a4b5]"}`}>{lesson.state === "done" ? <IconCheck size={18} /> : lesson.state === "current" ? <IconPlayerPlayFilled size={14} /> : <IconRefresh size={17} />}</div><div className="min-w-0 flex-1"><p className="text-[14px] font-bold text-[#3d4264]">{lesson.title}</p><p className="mt-1 text-[11px] text-[#9698ad]">{lesson.meta}</p></div><IconChevronLeft size={16} className="text-[#a2a4b5]" /></div>)}</div></section>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
