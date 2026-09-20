import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  IconArrowRight,
  IconCamera,
  IconCheck,
  IconChevronLeft,
  IconDotsVertical,
  IconLink,
  IconMessageCircle2,
  IconMicrophone,
  IconPlayerPlayFilled,
  IconRefresh,
  IconSend,
  IconVideo,
  IconVolume,
  IconX,
} from "@tabler/icons-react";

export function meta() {
  return [{ title: "المحادثة | Eemaa" }, { name: "description", content: "محادثة مرئية مع ترجمة فورية" }];
}

export default function ConversationRoute() {
  const navigate = useNavigate();
  const [translationOn, setTranslationOn] = useState(true);
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [composer, setComposer] = useState("");
  const [sent, setSent] = useState(false);

  return <div className="eemaa-page min-h-full" dir="rtl">
    <div className="eemaa-shell mx-auto max-w-[760px] px-5 pb-10 pt-3 sm:px-8">
      <header className="eemaa-topbar"><Link to="/" className="eemaa-soft-icon" aria-label="العودة للرئيسية"><IconArrowRight size={19} /></Link><div className="flex items-center gap-3"><div className="eemaa-contact-avatar">س</div><div><p className="text-[13px] font-extrabold text-[#173258]">سارة محمد</p><span className="flex items-center gap-1.5 text-[9px] font-bold text-[#2b9e9d]"><i className="size-1.5 rounded-full bg-[#2db7ad]" /> متصلة الآن</span></div></div><button type="button" className="eemaa-soft-icon" aria-label="خيارات المحادثة"><IconDotsVertical size={18} /></button></header>

      <div className="eemaa-conversation-actions mt-6"><button type="button" className="is-primary" onClick={() => navigate("/call")}><IconVideo size={16} /> مكالمة فيديو</button><button type="button" onClick={() => setTranslationOn(!translationOn)} className={translationOn ? "is-on" : ""}><IconMessageCircle2 size={16} /> {translationOn ? "الترجمة مفعلة" : "تفعيل الترجمة"}</button></div>

      <section className="eemaa-chat-thread mt-5" aria-label="محادثة سارة"><div className="eemaa-thread-date">اليوم · ٧:٤٢ م</div><div className="eemaa-message-row is-them"><div className="eemaa-mini-avatar">س</div><div><div className="eemaa-message-bubble">أهلًا نورة، هل نبدأ جلسة اليوم؟<span className="eemaa-message-time">٧:٤٢</span></div><button type="button" className="eemaa-message-translation"><IconVolume size={14} /> أهلًا نورة، هل نبدأ جلسة اليوم؟</button></div></div><div className="eemaa-message-row is-me"><div><div className="eemaa-message-bubble">نعم، أريد مراجعة إشارات التحية أولًا.<span className="eemaa-message-time">٧:٤٣ <IconCheck size={12} /></span></div></div></div><div className="eemaa-voice-message"><button type="button" className="eemaa-voice-play" aria-label="تشغيل الرسالة الصوتية"><IconPlayerPlayFilled size={13} /></button><div className="eemaa-voice-wave" aria-hidden="true">{Array.from({ length: 18 }).map((_, index) => <i key={index} style={{ height: `${8 + (index % 5) * 4}px` }} />)}</div><span>٠:١٢</span></div><div className="eemaa-typing"><span className="eemaa-mini-avatar">س</span><span className="eemaa-typing-dots"><i /><i /><i /></span><span>سارة تكتب الآن</span></div></section>

      {translationOn && <section className="eemaa-live-translation mt-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="flex size-8 items-center justify-center rounded-xl bg-[#e1f7f5] text-[#16868a]"><IconMessageCircle2 size={16} /></div><div><p className="text-[11px] font-extrabold text-[#24558e]">مساعد التواصل</p><p className="mt-1 text-[9px] text-[#7890ac]">يترجم صوت سارة إلى نص واضح</p></div></div><button type="button" onClick={() => setTranslationOn(false)} className="eemaa-toggle is-on" aria-label="إيقاف الترجمة"><span /></button></div><div className="mt-4 flex items-center gap-3 border-t border-[#dfeaf5] pt-3"><IconVolume size={17} className="text-[#3775bd]" /><p className="flex-1 text-[13px] font-extrabold text-[#294b78]">هل نبدأ جلسة اليوم؟</p><IconCheck size={16} className="text-[#28a89e]" /></div></section>}

      <section className="eemaa-call-stage mt-5"><div className="eemaa-call-remote"><div className="eemaa-call-light" /><div className="eemaa-call-person"><div className="eemaa-call-face"><span /></div><div className="eemaa-call-shoulders" /></div><div className="eemaa-call-name"><span className="size-2 rounded-full bg-[#2db7ad]" /> سارة محمد</div><div className="eemaa-call-quality">اتصال ممتاز</div></div><div className="eemaa-call-self"><div className="eemaa-self-avatar">ن</div><span>أنتِ</span></div><div className="eemaa-call-caption"><span className="eemaa-caption-label">ترجمة فورية</span><p>أهلًا نورة، كيف حالك اليوم؟</p></div></section>

      <div className="mt-5 flex items-center justify-center gap-3"><button type="button" onClick={() => setMuted(!muted)} className={`eemaa-call-control ${muted ? "is-active" : ""}`} aria-label={muted ? "تشغيل الميكروفون" : "كتم الميكروفون"}><IconMicrophone size={19} /></button><button type="button" onClick={() => setCameraOn(!cameraOn)} className={`eemaa-call-control ${!cameraOn ? "is-active" : ""}`} aria-label={cameraOn ? "إيقاف الكاميرا" : "تشغيل الكاميرا"}><IconCamera size={19} /></button><button type="button" className="eemaa-call-control" aria-label="إعادة الاتصال"><IconRefresh size={19} /></button><button type="button" className="eemaa-call-end" aria-label="إنهاء المكالمة"><IconX size={20} /></button></div>

      <div className="eemaa-composer mt-5"><button type="button" className="eemaa-composer-icon" aria-label="إرفاق ملف"><IconLink size={18} /></button><input value={composer} onChange={(event) => setComposer(event.target.value)} placeholder="اكتبي رسالة لسارة..." aria-label="رسالة جديدة" /><button type="button" onClick={() => { if (composer.trim()) { setComposer(""); setSent(true); } }} className="eemaa-send-button" aria-label="إرسال الرسالة"><IconSend size={17} /></button></div>{sent && <p className="mt-3 text-center text-[10px] font-bold text-[#2aa49f]">تم إرسال الرسالة محليًا في النموذج التجريبي</p>}
    </div>
  </div>;
}
