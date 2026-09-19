import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  IconArrowRight,
  IconBookmark,
  IconCamera,
  IconCheck,
  IconCopy,
  IconHandFinger,
  IconMicrophone,
  IconPlayerPlayFilled,
  IconRefresh,
  IconShare3,
  IconVolume,
  IconX,
} from "@tabler/icons-react";

const modes = [
  { key: "sign", label: "إشارة", icon: IconHandFinger },
  { key: "text", label: "نص", icon: IconCopy },
  { key: "voice", label: "صوت", icon: IconMicrophone },
] as const;
type Mode = (typeof modes)[number]["key"];
type CaptureState = "ready" | "tracking" | "result";

function ModeSwitch({ mode, setMode }: { mode: Mode; setMode: (mode: Mode) => void }) {
  return <div className="eemaa-translation-tabs" role="tablist" aria-label="طريقة الترجمة">{modes.map((item) => { const Icon = item.icon; return <button key={item.key} type="button" role="tab" aria-selected={mode === item.key} onClick={() => setMode(item.key)} className={mode === item.key ? "is-active" : ""}><Icon size={16} />{item.label}</button>; })}</div>;
}

function AvatarStage({ voice }: { voice: boolean }) {
  const [playing, setPlaying] = useState(false);
  return <div className="eemaa-avatar-stage"><div className="flex items-center justify-between border-b border-[#e1e7df] px-4 py-3"><span className="text-[11px] font-extrabold text-[#53645a]">تمثيل الإشارة</span><span className="flex items-center gap-2 text-[10px] font-bold text-[#6d8056]"><span className="size-2 rounded-full bg-[#a8c85e]" /> جاهز للعرض</span></div><div className="eemaa-avatar-canvas"><div className="eemaa-avatar-shadow" /><div className="eemaa-avatar-head"><span /></div><div className="eemaa-avatar-body"><IconHandFinger size={52} stroke={1.1} /></div><div className="eemaa-avatar-caption">{voice ? "أهلًا بك" : "السلام عليكم"}</div></div><div className="flex items-center gap-4 px-4 py-3 text-[10px] font-bold text-[#829087]"><span>٠:٠٠</span><div className="h-1 flex-1 rounded-full bg-[#dce5da]"><span className="block h-full w-[35%] rounded-full bg-[#9fbf58]" /></div><span>٠:١٢</span><button type="button" onClick={() => setPlaying(!playing)} className="flex size-9 items-center justify-center rounded-full bg-[#edf3e9] text-[#496157]" aria-label={playing ? "إيقاف" : "تشغيل"}>{playing ? <span className="flex gap-0.5"><i className="h-3 w-0.5 bg-current" /><i className="h-3 w-0.5 bg-current" /></span> : <IconPlayerPlayFilled size={12} />}</button></div></div>;
}

function TextMode({ mode }: { mode: Exclude<Mode, "sign"> }) {
  const voice = mode === "voice";
  const [processing, setProcessing] = useState(false);
  return <div className="flex flex-1 flex-col"><div className="mt-8"><p className="eemaa-kicker">{voice ? "صوت إلى إشارة" : "نص إلى إشارة"}</p><h1 className="mt-2 text-[27px] font-extrabold leading-[1.4] tracking-[-0.04em] text-[#23322d]">{voice ? "تحدثي، وسنوقّع المعنى." : "اكتبي، وسنوقّع المعنى."}</h1></div><div className="eemaa-input-panel mt-7"><div className="flex min-h-[150px] flex-col justify-between"><p className="text-[15px] leading-8 text-[#56675d]">{processing ? "جاري فهم الجملة وتحضير الإشارة..." : voice ? "اضغطي على الميكروفون وابدئي الحديث بالعربية" : "اكتبي جملة قصيرة لنحوّلها إلى إشارة"}</p><div className="flex items-center justify-between"><span className="text-[11px] font-bold text-[#8c9a91]">{processing ? "يفهم الآن" : "العربية"}</span><button type="button" onClick={() => { setProcessing(true); window.setTimeout(() => setProcessing(false), 1200); }} className={`flex size-12 items-center justify-center rounded-2xl ${voice ? "bg-[#28453c] text-[#eef6e9]" : "bg-[#dceeb0] text-[#3e5a4d]"}`} aria-label={voice ? "بدء التسجيل" : "ترجمة النص"}>{voice ? <IconMicrophone size={20} /> : <IconArrowRight size={20} />}</button></div></div></div><AvatarStage voice={voice} /><button type="button" className="eemaa-primary-button mx-auto mt-5">تشغيل الإشارة <IconPlayerPlayFilled size={13} /></button></div>;
}

export function meta() { return [{ title: "الترجمة | Eemaa" }, { name: "description", content: "تجربة الترجمة الفورية في إيماء" }]; }

export default function TranslateRoute() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode");
  const [mode, setMode] = useState<Mode>(initialMode === "text" || initialMode === "voice" ? initialMode : "sign");
  const [captureState, setCaptureState] = useState<CaptureState>("ready");
  const [saved, setSaved] = useState(false);
  const startCapture = () => { if (captureState === "ready") { setCaptureState("tracking"); window.setTimeout(() => setCaptureState("result"), 1400); } else setCaptureState("ready"); };
  return <div className="eemaa-page min-h-full" dir="rtl"><div className="eemaa-shell mx-auto max-w-[760px] px-5 pb-8 pt-3 sm:px-8"><header className="eemaa-topbar"><Link to="/" className="eemaa-soft-icon" aria-label="العودة للرئيسية"><IconArrowRight size={19} /></Link><div className="text-[14px] font-extrabold tracking-[-0.04em] text-[#23322d]">ترجمة <span className="text-[#8ba654]">إيماء</span></div><Link to="/" className="eemaa-soft-icon" aria-label="إغلاق"><IconX size={18} /></Link></header><ModeSwitch mode={mode} setMode={setMode} />{mode !== "sign" ? <TextMode mode={mode} /> : <div className="flex flex-1 flex-col"><div className="mt-8 flex items-end justify-between gap-4"><div><p className="eemaa-kicker">إشارة إلى نص وصوت</p><h1 className="mt-2 text-[27px] font-extrabold leading-[1.4] tracking-[-0.04em] text-[#23322d]">أظهري إشارتك،<br />وسنترجمها.</h1></div><span className="eemaa-camera-ready"><i /> الكاميرا جاهزة</span></div><div className={`eemaa-light-camera mt-7 ${captureState === "tracking" ? "is-tracking" : ""} ${captureState === "result" ? "has-result" : ""}`}><div className="eemaa-camera-corner corner-tl" /><div className="eemaa-camera-corner corner-tr" /><div className="eemaa-camera-corner corner-bl" /><div className="eemaa-camera-corner corner-br" /><div className="eemaa-camera-device-label"><IconCamera size={14} /> الكاميرا الأمامية</div><div className="relative z-10 flex flex-col items-center text-center"><div className="eemaa-hand-orb"><IconHandFinger size={70} stroke={1.1} /></div>{captureState === "ready" && <p className="mt-6 text-[13px] font-bold leading-6 text-[#56675d]">ضعي يديك داخل الإطار<br /><span className="font-normal text-[#8b9a91]">سنخبرك عندما نكون مستعدين</span></p>}{captureState === "tracking" && <p className="mt-6 text-[13px] font-bold leading-6 text-[#617d42]">نحن نتابع الحركة...<br /><span className="font-normal text-[#8b9a91]">ثبّتي الإشارة للحظة</span></p>}{captureState === "result" && <div className="mt-6"><p className="text-[11px] font-bold text-[#6c8a4d]">فهمنا إشارتك</p><p className="mt-2 text-[25px] font-extrabold text-[#23322d]">السلام عليكم</p></div>}</div>{captureState === "tracking" && <div className="eemaa-light-scan" />}{captureState === "result" && <div className="eemaa-confidence"><span>ثقة الترجمة</span><strong>٩٧٪</strong></div>}</div>{captureState === "result" && <div className="eemaa-result-panel mt-5"><div className="flex items-center justify-between gap-3"><div><span className="text-[10px] font-bold text-[#819087]">الترجمة العربية</span><p className="mt-2 text-[21px] font-extrabold text-[#23322d]">السلام عليكم</p></div><button type="button" className="flex size-11 items-center justify-center rounded-2xl bg-[#28453c] text-[#e2f3c1]" aria-label="استمع للترجمة"><IconVolume size={19} /></button></div><div className="mt-4 flex flex-wrap gap-2 border-t border-[#e1e7df] pt-4"><button type="button" onClick={() => setSaved(!saved)} className="eemaa-result-action"><IconBookmark size={15} fill={saved ? "currentColor" : "none"} /> {saved ? "تم الحفظ" : "حفظ"}</button><button type="button" className="eemaa-result-action"><IconCopy size={15} /> نسخ</button><button type="button" className="eemaa-result-action"><IconShare3 size={15} /> مشاركة</button></div></div>}{captureState === "result" && <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-[#708077]"><IconCheck size={15} className="text-[#7fa14c]" /> الترجمة جاهزة للمشاركة</div>}<button type="button" onClick={startCapture} className={`eemaa-primary-button mx-auto mt-6 ${captureState === "tracking" ? "is-processing" : ""}`}>{captureState === "ready" ? <><IconCamera size={17} /> ابدئي التعرّف</> : captureState === "tracking" ? "جارٍ التعرّف..." : <><IconRefresh size={16} /> جرّبي مرة أخرى</>}</button></div>}</div></div>;
}
