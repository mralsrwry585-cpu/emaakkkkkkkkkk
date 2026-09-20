import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  IconArrowRight,
  IconCamera,
  IconCameraRotate,
  IconMessageCircle2,
  IconMicrophone,
  IconPhoneCall,
  IconRefresh,
  IconVolume,
  IconX,
} from "@tabler/icons-react";

type CallState = "connecting" | "connected" | "reconnecting" | "ended";

export function meta() {
  return [{ title: "مكالمة فيديو | Eemaa" }, { name: "description", content: "مكالمة فيديو مترجمة عبر إيماء" }];
}

export default function CallRoute() {
  const navigate = useNavigate();
  const [callState, setCallState] = useState<CallState>("connecting");
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [captionOn, setCaptionOn] = useState(true);
  const [frontCamera, setFrontCamera] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setCallState("connected"), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const reconnect = () => {
    setCallState("reconnecting");
    window.setTimeout(() => setCallState("connected"), 1100);
  };

  return <div className="eemaa-call-screen" dir="rtl"><header className="relative z-10 flex items-center justify-between px-5 pb-3 pt-4"><Link to="/conversation" className="eemaa-soft-icon" aria-label="العودة للمحادثة"><IconArrowRight size={19} /></Link><div className="text-center"><p className="text-[13px] font-extrabold text-white">مكالمة مع سارة</p><span className="text-[9px] font-bold text-[#8fb1d4]">إيماء · ترجمة مباشرة</span></div><button type="button" className="eemaa-soft-icon" onClick={() => navigate("/conversation")} aria-label="إنهاء الشاشة"><IconX size={18} /></button></header><main className="relative z-10 px-4 pb-5"><section className="eemaa-call-video mt-3"><div className="eemaa-call-profile"><div className="eemaa-call-avatar"><span>س</span><i className="eemaa-status-dot" /></div><div className="eemaa-call-meta"><strong>سارة محمد</strong><span><i className="size-1.5 rounded-full bg-[#63ded1]" /> {callState === "connecting" ? "جاري الاتصال" : callState === "reconnecting" ? "إعادة الاتصال" : "متصلة الآن"}</span></div></div><div className="absolute inset-0 flex items-center justify-center"><div className="relative flex size-44 items-center justify-center rounded-full border border-[#72e5d9]/35 bg-[#5ab4d5]/10 text-[#75e5d8] shadow-[0_0_0_24px_rgba(108,218,212,.05)]"><IconMessageCircle2 size={54} stroke={1.1} /><span className="absolute -bottom-7 rounded-full bg-[#0b2038]/75 px-3 py-1.5 text-[9px] font-bold text-[#bce9ff]">{callState === "connecting" ? "نجهّز الاتصال..." : callState === "reconnecting" ? "نبحث عن اتصال أفضل" : "الكاميرا متاحة"}</span></div></div>{cameraOn && <div className="eemaa-self-preview" aria-label="معاينة الكاميرا الذاتية" />}{captionOn && callState === "connected" && <div className="eemaa-call-caption"><span>ترجمة فورية</span><p>أهلًا نورة، كيف حالك اليوم؟</p></div>}<div className="eemaa-call-toolbar"><button type="button" onClick={() => setMuted(!muted)} className={muted ? "is-active" : ""} aria-label={muted ? "تشغيل الميكروفون" : "كتم الميكروفون"}><IconMicrophone size={18} /></button><button type="button" onClick={() => setCameraOn(!cameraOn)} className={!cameraOn ? "is-active" : ""} aria-label={cameraOn ? "إيقاف الكاميرا" : "تشغيل الكاميرا"}><IconCamera size={18} /></button><button type="button" onClick={() => setSpeakerOn(!speakerOn)} className={speakerOn ? "is-active" : ""} aria-label={speakerOn ? "إيقاف مكبر الصوت" : "تشغيل مكبر الصوت"}><IconVolume size={18} /></button><button type="button" onClick={() => setFrontCamera(!frontCamera)} aria-label="تبديل الكاميرا"><IconCameraRotate size={18} /></button><button type="button" onClick={() => setCallState("ended")} className="is-danger" aria-label="إنهاء المكالمة"><IconPhoneCall size={18} /></button></div></section><div className="eemaa-call-status"><span>{callState === "connected" ? "٠٣:٢٨" : callState === "ended" ? "انتهت المكالمة" : "--:--"}</span><strong>{cameraOn ? "الكاميرا تعمل" : "الكاميرا متوقفة"}</strong></div>{callState === "reconnecting" && <div className="eemaa-call-notice"><IconRefresh size={15} /> نعيد الاتصال تلقائيًا...</div>}{callState === "ended" && <div className="eemaa-call-notice"><IconPhoneCall size={15} /> انتهت المكالمة في النموذج التجريبي</div>}<div className="eemaa-call-choice"><button type="button" className={captionOn ? "is-active" : ""} onClick={() => setCaptionOn(!captionOn)}><IconMessageCircle2 size={14} /> الترجمة</button><button type="button" onClick={reconnect}><IconRefresh size={14} /> إعادة الاتصال</button></div></main></div>;
}
