import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  IconArrowRight,
  IconCamera,
  IconCameraOff,
  IconCameraRotate,
  IconMicrophone,
  IconMicrophoneOff,
  IconPhoneCall,
  IconUserCircle,
  IconVideo,
  IconVolume,
  IconVolumeOff,
  IconX,
} from "@tabler/icons-react";

type CallState = "connecting" | "connected" | "reconnecting" | "ended";

const selfCameraImage = "https://images.pexels.com/photos/9017429/pexels-photo-9017429.jpeg";

const toArabicDigits = (value: string) =>
  value.replace(/[0-9]/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);

export function meta() {
  return [
    { title: "مكالمة فيديو | Eemaa" },
    { name: "description", content: "مكالمة فيديو مترجمة عبر إيماء" },
  ];
}

export default function CallRoute() {
  const navigate = useNavigate();
  const [callState, setCallState] = useState<CallState>("connecting");
  const [muted, setMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [captionOn, setCaptionOn] = useState(true);
  const [frontCamera, setFrontCamera] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setCallState("connected"), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (callState !== "connected") return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [callState]);

  const reconnect = () => {
    setCallState("reconnecting");
    window.setTimeout(() => setCallState("connected"), 1100);
  };

  const statusLabel = {
    connecting: "جاري الاتصال",
    connected: "متصلة الآن",
    reconnecting: "إعادة الاتصال",
    ended: "انتهت المكالمة",
  }[callState];

  const timerLabel = toArabicDigits(
    `00:${String(elapsed).padStart(2, "0")}`,
  );

  return (
    <div className="eemaa-call-screen eemaa-live-call" dir="rtl">
      <header className="eemaa-call-header">
        <Link
          to="/conversation"
          className="eemaa-soft-icon"
          aria-label="العودة إلى المحادثة"
        >
          <IconArrowRight size={19} />
        </Link>
        <div>
          <p>مكالمة فيديو</p>
          <span>إيماء · ترجمة مباشرة</span>
        </div>
        <button
          type="button"
          className="eemaa-soft-icon"
          onClick={() => setCallState("ended")}
          aria-label="إنهاء المكالمة"
        >
          <IconX size={18} />
        </button>
      </header>

      <main className="eemaa-live-call-main">
        <section className="eemaa-main-video" aria-label="الكاميرا الأمامية">
          <div className="eemaa-main-video-image">
            {cameraOn ? (
              <img src={selfCameraImage} alt="صورتك أثناء المكالمة" />
            ) : (
              <div className="eemaa-camera-off-state">
                <div className="eemaa-camera-off-avatar">ن</div>
                <span>الكاميرا متوقفة</span>
              </div>
            )}
          </div>
          <div className="eemaa-video-vignette" />

          <div className="eemaa-remote-preview">
            <div className="eemaa-remote-preview-visual">
              <div className="eemaa-remote-preview-avatar">
                س
                <i className="eemaa-status-dot" />
              </div>
            </div>
            <div className="eemaa-remote-preview-copy">
              <strong>سارة محمد</strong>
              <span>
                <i /> {statusLabel}
              </span>
            </div>
          </div>

          <div className="eemaa-self-camera-label">
            <span className="eemaa-live-dot" />
            {cameraOn ? "أنتِ · الكاميرا تعمل" : "أنتِ · الكاميرا متوقفة"}
          </div>

          {captionOn && callState === "connected" ? (
            <div className="eemaa-live-caption">
              <span>ترجمة فورية</span>
              <p>أهلًا نورة، كيف حالك اليوم؟</p>
            </div>
          ) : null}

          <button
            type="button"
            className="eemaa-participant-button"
            aria-label="عرض المشاركين"
          >
            <IconUserCircle size={20} />
            <span>٢</span>
          </button>

          <div className="eemaa-live-call-controls" aria-label="أدوات المكالمة">
            <button
              type="button"
              className={muted ? "is-active" : ""}
              onClick={() => setMuted((value) => !value)}
              aria-label={muted ? "تشغيل الميكروفون" : "كتم الميكروفون"}
            >
              {muted ? <IconMicrophoneOff size={19} /> : <IconMicrophone size={19} />}
            </button>
            <button
              type="button"
              className={!cameraOn ? "is-active" : ""}
              onClick={() => setCameraOn((value) => !value)}
              aria-label={cameraOn ? "إيقاف الكاميرا" : "تشغيل الكاميرا"}
            >
              {cameraOn ? <IconCamera size={19} /> : <IconCameraOff size={19} />}
            </button>
            <button
              type="button"
              className={!speakerOn ? "is-active" : ""}
              onClick={() => setSpeakerOn((value) => !value)}
              aria-label={speakerOn ? "كتم الصوت" : "تشغيل الصوت"}
            >
              {speakerOn ? <IconVolume size={19} /> : <IconVolumeOff size={19} />}
            </button>
            <button
              type="button"
              className={frontCamera ? "" : "is-active"}
              onClick={() => setFrontCamera((value) => !value)}
              aria-label="تبديل الكاميرا"
            >
              <IconCameraRotate size={19} />
            </button>
            <button
              type="button"
              className="is-danger"
              onClick={() => setCallState("ended")}
              aria-label="إنهاء المكالمة"
            >
              <IconPhoneCall size={19} />
            </button>
          </div>
        </section>

        <div className="eemaa-live-call-status">
          <div>
            <span className="eemaa-status-pulse" />
            <strong>{statusLabel}</strong>
          </div>
          <span>{callState === "connected" ? timerLabel : "—"}</span>
        </div>

        {callState === "reconnecting" ? (
          <div className="eemaa-call-notice">
            الاتصال غير مستقر. نحاول العودة إلى المكالمة...
          </div>
        ) : null}
        {callState === "ended" ? (
          <div className="eemaa-call-notice is-ended">
            انتهت المكالمة التجريبية. يمكنك العودة إلى المحادثة أو إعادة الاتصال.
          </div>
        ) : null}

        <div className="eemaa-call-actions">
          {callState === "ended" || callState === "reconnecting" ? (
            <button type="button" onClick={reconnect} className="is-primary">
              <IconPhoneCall size={16} />
              {callState === "ended" ? "إعادة الاتصال" : "المحاولة مرة أخرى"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setCaptionOn((value) => !value)}
            className={captionOn ? "is-active" : ""}
          >
            <IconVideo size={16} />
            {captionOn ? "الترجمة مفعلة" : "تفعيل الترجمة"}
          </button>
        </div>
      </main>
    </div>
  );
}
