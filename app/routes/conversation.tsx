import { useState } from "react";
import { Link } from "react-router";
import {
  IconArrowRight,
  IconCamera,
  IconCheck,
  IconMessageCircle2,
  IconMicrophone,
  IconRefresh,
  IconVolume,
  IconX,
} from "@tabler/icons-react";

export function meta() { return [{ title: "المحادثة | Eemaa" }, { name: "description", content: "محادثة مرئية مع ترجمة فورية" }]; }

export default function ConversationRoute() {
  const [translationOn, setTranslationOn] = useState(true);
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  return <div className="eemaa-page min-h-full" dir="rtl"><div className="eemaa-shell mx-auto max-w-[760px] px-5 pb-8 pt-3 sm:px-8"><header className="eemaa-topbar"><Link to="/" className="eemaa-soft-icon" aria-label="العودة للرئيسية"><IconArrowRight size={19} /></Link><div className="text-center"><p className="text-[13px] font-extrabold text-[#29483d]">محادثة مباشرة</p><span className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-[#7c9282]"><i className="size-1.5 rounded-full bg-[#a8c765]" /> متصل الآن</span></div><button type="button" className="eemaa-soft-icon" aria-label="إنهاء الشاشة"><IconX size={18} /></button></header>

<section className="eemaa-call-stage mt-7"><div className="eemaa-call-remote"><div className="eemaa-call-light" /><div className="eemaa-call-person"><div className="eemaa-call-face"><span /></div><div className="eemaa-call-shoulders" /></div><div className="eemaa-call-name"><span className="size-2 rounded-full bg-[#a8c765]" /> سارة محمد</div><div className="eemaa-call-quality">اتصال ممتاز</div></div><div className="eemaa-call-self"><div className="eemaa-self-avatar">ن</div><span>أنتِ</span></div><div className="eemaa-call-caption"><span className="eemaa-caption-label">سارة · ترجمة فورية</span><p>أهلًا نورة، كيف حالك اليوم؟</p></div></section>

<section className="eemaa-live-translation mt-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="flex size-8 items-center justify-center rounded-xl bg-[#e5efdc] text-[#6b8b4d]"><IconMessageCircle2 size={16} /></div><div><p className="text-[11px] font-extrabold text-[#41584b]">طبقة الترجمة</p><p className="mt-1 text-[9px] text-[#88968d]">تظهر لكلا الطرفين</p></div></div><button type="button" onClick={() => setTranslationOn(!translationOn)} className={`eemaa-toggle ${translationOn ? "is-on" : ""}`} aria-label="تفعيل الترجمة"><span /></button></div>{translationOn && <div className="mt-4 flex items-center gap-3 border-t border-[#e1e8df] pt-3"><div className="flex size-9 items-center justify-center rounded-xl bg-[#f2f6ed] text-[#779354]"><IconVolume size={17} /></div><div className="min-w-0 flex-1"><p className="text-[13px] font-extrabold text-[#324d40]">أهلًا نورة، كيف حالك اليوم؟</p><p className="mt-1 text-[10px] text-[#87958c]">من الصوت إلى النص العربي</p></div><IconCheck size={16} className="text-[#7ea14e]" /></div>}</section>

<div className="mt-7 flex items-center justify-center gap-3"><button type="button" onClick={() => setMuted(!muted)} className={`eemaa-call-control ${muted ? "is-active" : ""}`} aria-label={muted ? "تشغيل الميكروفون" : "كتم الميكروفون"}><IconMicrophone size={19} /></button><button type="button" onClick={() => setCameraOn(!cameraOn)} className={`eemaa-call-control ${!cameraOn ? "is-active" : ""}`} aria-label={cameraOn ? "إيقاف الكاميرا" : "تشغيل الكاميرا"}><IconCamera size={19} /></button><button type="button" className="eemaa-call-control" aria-label="إعادة الاتصال"><IconRefresh size={19} /></button><button type="button" className="eemaa-call-end" aria-label="إنهاء المكالمة"><IconX size={20} /></button></div><p className="mt-4 text-center text-[10px] font-bold text-[#93a098]">٠٣:٢٨</p></div></div>;
}
