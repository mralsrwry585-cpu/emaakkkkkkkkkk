import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  IconArrowRight,
  IconBookmark,
  IconCamera,
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

function EemaaMark() {
  return (
    <div className="flex items-center gap-2" dir="ltr">
      <div className="eemaa-logo-mark small" aria-hidden="true"><span /><span /><span /></div>
      <span className="text-[14px] font-extrabold tracking-[-0.04em] text-white">Eemaa</span>
    </div>
  );
}

function TextMode({ mode }: { mode: Exclude<Mode, "sign"> }) {
  const voice = mode === "voice";
  const [processing, setProcessing] = useState(false);
  const [played, setPlayed] = useState(false);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 px-5 pb-6 pt-8 sm:px-8">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-bold tracking-[0.08em] text-[#aeb7df]">{voice ? "صوت إلى إشارة" : "نص إلى إشارة"}</p>
          <h1 className="mt-3 text-[30px] font-bold leading-[1.35] tracking-[-0.04em] text-white">{voice ? "تحدثي، وسنوقّع المعنى." : "اكتبي، وسنوقّع المعنى."}</h1>
          <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.07] p-5">
            <div className="flex min-h-[160px] flex-col justify-between">
              <p className="text-[16px] leading-8 text-[#e0e5ff]">{processing ? "جاري فهم الجملة وتحضير الإشارة..." : voice ? "اضغطي على الميكروفون وابدئي الحديث بالعربية" : "اكتبي جملة قصيرة لنحوّلها إلى إشارة"}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className={`text-xs ${processing ? "text-[#d8f577]" : "text-[#8d96bd]"}`}>{processing ? "يفهم الآن" : "العربية"}</span>
                <button type="button" className={`flex size-14 items-center justify-center rounded-full ${voice ? "bg-[#d8f577] text-[#252c54]" : "bg-white text-[#252c54]"}`} onClick={() => { setProcessing(true); window.setTimeout(() => setProcessing(false), 1200); }} aria-label={voice ? "بدء التسجيل" : "ترجمة النص"}>
                  {voice ? <IconMicrophone size={22} /> : <IconArrowRight size={22} />}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-[28px] bg-[#e9e8f5] text-[#252c54]">
            <div className="flex items-center justify-between border-b border-[#d9d9e8] px-5 py-4">
              <span className="text-xs font-bold text-[#777b9b]">تمثيل الإشارة</span>
              <span className="flex items-center gap-2 text-[11px] font-bold text-[#758044]"><span className="size-2 rounded-full bg-[#b6d93d]" /> جاهز</span>
            </div>
            <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_25%,#c4c8df_0%,#e9e8f5_55%)]">
              <div className="absolute bottom-[-68px] size-44 rounded-full bg-[#252c54]" />
              <div className="relative z-10 flex size-32 items-center justify-center rounded-full border-[10px] border-[#252c54] bg-[#b5bddb] text-[#252c54]">
                <IconHandFinger size={54} stroke={1.1} />
              </div>
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[11px] font-semibold text-[#777b9b]"><span>٠:٠٠</span><button type="button" onClick={() => setPlayed(!played)} className="flex size-9 items-center justify-center rounded-full bg-white text-[#252c54] shadow-sm" aria-label={played ? "إيقاف" : "تشغيل"}>{played ? <span className="flex gap-0.5"><i className="h-3 w-0.5 bg-current" /><i className="h-3 w-0.5 bg-current" /></span> : <IconPlayerPlayFilled size={12} />}</button><span>٠:١٢</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 sm:px-8"><button type="button" className="mx-auto flex w-full max-w-xl items-center justify-center gap-2 rounded-full bg-[#d8f577] px-6 py-4 text-sm font-extrabold text-[#252c54] transition-transform hover:-translate-y-0.5">تشغيل الإشارة <IconPlayerPlayFilled size={15} /></button></div>
    </div>
  );
}

export function meta() {
  return [{ title: "الترجمة | Eemaa" }, { name: "description", content: "تجربة الترجمة الفورية في إيماء" }];
}

export default function TranslateRoute() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode");
  const [mode, setMode] = useState<Mode>(initialMode === "text" || initialMode === "voice" ? initialMode : "sign");
  const [captureState, setCaptureState] = useState<CaptureState>("ready");
  const [saved, setSaved] = useState(false);

  const startCapture = () => {
    if (captureState === "ready") {
      setCaptureState("tracking");
      window.setTimeout(() => setCaptureState("result"), 1400);
    } else {
      setCaptureState("ready");
    }
  };

  return (
    <div className="eemaa-translate min-h-full text-white" dir="rtl">
      <header className="flex items-center justify-between px-5 pb-3 pt-5 sm:px-8">
        <Link to="/" className="flex size-10 items-center justify-center rounded-full border border-white/10 text-[#d8defb] transition-colors hover:bg-white/10" aria-label="العودة للرئيسية"><IconArrowRight size={19} /></Link>
        <EemaaMark />
        <button type="button" className="flex size-10 items-center justify-center rounded-full border border-white/10 text-[#d8defb] transition-colors hover:bg-white/10" aria-label="إغلاق"><IconX size={19} /></button>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-3xl flex-col">
        <div className="px-5 pt-3 sm:px-8">
          <div className="eemaa-mode-switch" role="tablist" aria-label="طريقة الترجمة">
            {modes.map((item) => {
              const Icon = item.icon;
              return <button key={item.key} type="button" role="tab" aria-selected={mode === item.key} onClick={() => setMode(item.key as Mode)} className={mode === item.key ? "is-active" : ""}><Icon size={16} />{item.label}</button>;
            })}
          </div>
        </div>

        {mode !== "sign" ? <TextMode mode={mode} /> : (
          <div className="flex flex-1 flex-col px-5 pb-5 pt-8 sm:px-8">
            <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold tracking-[0.08em] text-[#aeb7df]">إشارة إلى نص وصوت</p>
                  <h1 className="mt-3 text-[30px] font-bold leading-[1.35] tracking-[-0.04em] text-white">أظهري إشارتك،<br />وسنترجمها.</h1>
                </div>
                <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-[#d8f577]"><span className="size-2 rounded-full bg-[#b6d93d] shadow-[0_0_0_4px_rgba(182,217,61,0.14)]" /> الكاميرا جاهزة</div>
              </div>

              <div className={`eemaa-camera-stage mt-8 ${captureState === "tracking" ? "is-tracking" : ""} ${captureState === "result" ? "has-result" : ""}`}>
                <div className="eemaa-camera-noise" />
                <div className="eemaa-camera-corner corner-tl" /><div className="eemaa-camera-corner corner-tr" /><div className="eemaa-camera-corner corner-bl" /><div className="eemaa-camera-corner corner-br" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/20 px-3 py-2 text-[10px] font-bold text-white/70 backdrop-blur-sm"><IconCamera size={14} /> الكاميرا الأمامية</div>
                <div className="relative z-10 flex flex-col items-center justify-center px-8 text-center">
                  <div className="eemaa-hand-frame"><IconHandFinger size={70} stroke={1.15} /></div>
                  {captureState === "ready" && <p className="mt-7 text-[13px] font-semibold leading-6 text-[#d8defb]">ضعي يديك داخل الإطار<br /><span className="font-normal text-white/50">وسنخبرك عندما نكون مستعدين</span></p>}
                  {captureState === "tracking" && <p className="mt-7 text-[13px] font-semibold leading-6 text-[#d8f577]">نحن نتابع الحركة...<br /><span className="font-normal text-white/60">ثبّتي الإشارة للحظة</span></p>}
                  {captureState === "result" && <div className="mt-7"><p className="text-xs font-semibold text-[#d8f577]">فهمنا إشارتك</p><p className="mt-2 text-[27px] font-bold text-white">السلام عليكم</p></div>}
                </div>
                {captureState === "tracking" && <div className="eemaa-scan-line" />}
                {captureState === "result" && <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md"><span className="text-xs font-semibold text-white/80">ثقة الترجمة</span><span className="text-sm font-bold text-[#d8f577]">٩٧٪</span></div>}
              </div>

              {captureState === "result" ? (
                <div className="mt-5 rounded-[24px] bg-[#e9e8f5] p-5 text-[#252c54]">
                  <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold text-[#777b9b]">الترجمة العربية</p><p className="mt-2 text-[22px] font-bold">السلام عليكم</p></div><button type="button" className="flex size-11 items-center justify-center rounded-full bg-[#252c54] text-[#d8f577]" aria-label="استمع للترجمة"><IconVolume size={20} /></button></div>
                  <div className="mt-5 flex gap-2 border-t border-[#d9d9e8] pt-4"><button type="button" onClick={() => setSaved(!saved)} className="eemaa-result-action"><IconBookmark size={16} fill={saved ? "currentColor" : "none"} /> {saved ? "تم الحفظ" : "حفظ"}</button><button type="button" className="eemaa-result-action"><IconCopy size={16} /> نسخ</button><button type="button" className="eemaa-result-action"><IconShare3 size={16} /> مشاركة</button></div>
                </div>
              ) : null}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse sm:justify-center"><button type="button" onClick={startCapture} className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-extrabold transition-transform hover:-translate-y-0.5 sm:w-auto sm:min-w-[220px] ${captureState === "tracking" ? "bg-white/10 text-white" : "bg-[#d8f577] text-[#252c54]"}`}>{captureState === "ready" ? <><IconCamera size={18} /> ابدئي التعرّف</> : captureState === "tracking" ? "جارٍ التعرّف..." : <><IconRefresh size={17} /> جرّبي مرة أخرى</>}</button>{captureState === "result" && <button type="button" className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-bold text-[#d8defb]"><IconPlayerPlayFilled size={15} /> استمع للصوت</button>}</div>
          </div>
        )}
      </div>
    </div>
  );
}
