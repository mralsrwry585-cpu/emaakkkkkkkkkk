import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  IconArrowRight,
  IconAward,
  IconBell,
  IconBook2,
  IconCheck,
  IconChevronLeft,
  IconHome2,
  IconMessageCircle2,
  IconPlayerPlayFilled,
  IconUserCircle,
  IconVideo,
} from "@tabler/icons-react";

function BottomNav() {
  const navigate = useNavigate();
  const items = [{ label: "الرئيسية", icon: IconHome2, href: "/" }, { label: "الترجمة", icon: IconMessageCircle2, href: "/translate" }, { label: "محادثة", icon: IconVideo, href: "/conversation" }, { label: "التعلّم", icon: IconBook2, href: "/learning" }, { label: "حسابي", icon: IconUserCircle, href: "/" }];
  return <nav className="eemaa-bottom-nav" aria-label="التنقل الرئيسي">{items.map((item) => { const Icon = item.icon; const active = item.label === "التعلّم"; return <button key={item.label} type="button" onClick={() => navigate(item.href)} className={`eemaa-nav-item ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}><Icon size={19} stroke={active ? 2.2 : 1.8} /><span>{item.label}</span></button>; })}</nav>;
}

export function meta() {
  return [{ title: "التعلّم | Eemaa" }, { name: "description", content: "رحلة تعلّم لغة الإشارة مع Eemaa" }];
}

export default function LearningRoute() {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  return <div className="eemaa-page min-h-full" dir="rtl"><div className="eemaa-shell mx-auto max-w-[1240px] px-5 pb-32 pt-5 sm:px-8 lg:px-10 lg:pb-10">
    <header className="flex items-center justify-between gap-4"><Link to="/" className="eemaa-soft-icon" aria-label="العودة للرئيسية"><IconArrowRight size={20} /></Link><div className="flex items-center gap-2.5"><div className="eemaa-logo-mark"><span /><span /><span /></div><span className="text-[15px] font-extrabold tracking-[-0.04em] text-[#173258]">رحلة التعلّم</span></div><button type="button" className="eemaa-soft-icon" aria-label="الإشعارات"><IconBell size={19} /></button></header>
    <main className="mx-auto mt-8 max-w-4xl lg:mt-12"><div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="eemaa-kicker">المستوى الأول · أساسيات التواصل</p><h1 className="mt-2 text-[30px] font-extrabold leading-[1.3] tracking-[-0.04em] text-[#173258] sm:text-[38px]">تعلّمي بإيقاعك،<br />وتواصلي بثقة.</h1></div><div className="flex items-center gap-3 rounded-2xl border border-[#d9e5f1] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(36,82,143,.05)]"><span className="text-[25px] font-extrabold text-[#245fb3]">٤</span><span className="text-[10px] font-bold leading-4 text-[#8ca0bb]">أيام<br />متتالية</span></div></div>
      <section className="eemaa-learning-hero mt-8"><div className="relative z-10 flex min-h-[220px] flex-col justify-between p-6 sm:p-8"><div><span className="rounded-full bg-[#72e2d7] px-3 py-1.5 text-[10px] font-extrabold text-[#173b7b]">الدرس التالي</span><h2 className="mt-5 text-[25px] font-bold text-white">التحيات الأساسية</h2><p className="mt-2 text-[12px] text-[#c8e4ff]">٥ دقائق · ٤ إشارات جديدة</p></div><button type="button" onClick={() => setStarted(!started)} className="flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-[11px] font-extrabold text-[#2459a5] transition-transform hover:-translate-y-0.5">{started ? "الدرس مفتوح" : "ابدئي الدرس"} <IconPlayerPlayFilled size={13} /></button></div><div className="eemaa-learning-orbit"><div className="eemaa-learning-ring" /><IconBook2 size={68} stroke={1.15} /></div></section>
      <section className="mt-7 rounded-[26px] border border-[#d9e5f1] bg-white p-5 shadow-[0_10px_24px_rgba(36,82,143,.05)] sm:p-6"><div className="flex items-center justify-between"><div><span className="eemaa-section-label">تقدم المستوى</span><h2 className="mt-2 text-[20px] font-bold text-[#20477e]">تقدّم ثابت</h2></div><span className="text-[28px] font-extrabold tracking-[-0.05em] text-[#245fb3]">٦٨<span className="text-[13px] text-[#8ca0bb]">٪</span></span></div><div className="mt-5 grid grid-cols-6 gap-2">{["تم", "تم", "تم", "تم", "اليوم", "بعد"].map((label, index) => <div key={`${label}-${index}`} className={`flex h-16 flex-col items-center justify-center rounded-2xl ${index < 4 ? "bg-[#dff6f2] text-[#16878b]" : index === 4 ? "border-2 border-[#4ebcc0] bg-[#effbf9] text-[#16878b]" : "bg-[#edf3fa] text-[#a2b2c4]"}`}><span className="text-[10px] font-extrabold">{index < 4 ? <IconCheck size={15} /> : label}</span><span className="mt-1 text-[9px] font-bold">{index + 1}</span></div>)}</div></section>
      <section className="mt-5 grid gap-4 sm:grid-cols-[1.15fr_.85fr]"><button type="button" onClick={() => navigate("/quiz")} className="eemaa-quiz-hero flex items-center justify-between gap-4 p-5 text-right"><div className="relative z-10"><span className="text-[10px] font-bold text-[#a9f0e8]">تثبيت المهارة</span><h2 className="mt-2 text-[17px] font-extrabold">اختبار سريع بعد الدرس</h2><p className="mt-2 text-[10px] text-[#cde6ff]">اختبري فهمك واحصلي على شارة</p></div><div className="relative z-10 flex size-11 items-center justify-center rounded-2xl bg-white/15 text-[#a9f0e8]"><IconAward size={20} /></div></button><div className="rounded-[25px] border border-[#ddd7f5] bg-gradient-to-br from-[#f0edff] to-[#f8f6ff] p-5"><div className="flex items-center justify-between"><span className="eemaa-section-label">إنجازاتك</span><IconAward size={20} className="text-[#7b6bc8]" /></div><p className="mt-3 text-[22px] font-extrabold text-[#4f488d]">٣ شارات</p><p className="mt-1 text-[11px] text-[#817ca9]">خطوة أخرى وتفتح شارة جديدة</p></div></section>
      <section className="mt-9"><div className="flex items-center justify-between"><h2 className="text-[20px] font-bold text-[#20477e]">طريقك هذا الأسبوع</h2><button type="button" className="text-[11px] font-bold text-[#6e89a9]">كل الدروس</button></div><div className="relative mt-5 space-y-3 before:absolute before:bottom-8 before:right-[20px] before:top-8 before:w-px before:bg-[#d5e2ef]">{[{ title: "التحيات الأساسية", meta: "مكتمل · ٤ إشارات", state: "done" }, { title: "التعريف بالنفس", meta: "الدرس الحالي · ٦ دقائق", state: "current" }, { title: "المشاعر اليومية", meta: "يفتح بعد إكمال الدرس", state: "locked" }].map((lesson) => <div key={lesson.title} className="relative flex items-center gap-4 rounded-[22px] border border-[#dce7f2] bg-white px-4 py-4 shadow-[0_7px_16px_rgba(36,82,143,.04)]"><div className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-2xl ${lesson.state === "done" ? "bg-[#d8f6f1] text-[#15878a]" : lesson.state === "current" ? "bg-[#2869bc] text-white" : "bg-[#edf3fa] text-[#a2b2c4]"}`}>{lesson.state === "done" ? <IconCheck size={18} /> : lesson.state === "current" ? <IconPlayerPlayFilled size={14} /> : <IconChevronLeft size={17} />}</div><div className="min-w-0 flex-1"><p className="text-[14px] font-bold text-[#365982]">{lesson.title}</p><p className="mt-1 text-[11px] text-[#8ca0bb]">{lesson.meta}</p></div><IconChevronLeft size={16} className="text-[#a2b2c4]" /></div>)}</div></section>
    </main>
  </div><BottomNav /></div>;
}
