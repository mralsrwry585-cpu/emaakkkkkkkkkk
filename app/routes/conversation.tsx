import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  IconArrowRight,
  IconCheck,
  IconDots,
  IconLink,
  IconMessageCircle2,
  IconMicrophone,
  IconPlayerPlayFilled,
  IconSend,
  IconVideo,
  IconVolume,
} from "@tabler/icons-react";

export function meta() {
  return [
    { title: "المحادثة | Eemaa" },
    { name: "description", content: "محادثة مرئية مع ترجمة فورية" },
  ];
}

export default function ConversationRoute() {
  const navigate = useNavigate();
  const [translationOn, setTranslationOn] = useState(true);
  const [composer, setComposer] = useState("");
  const [sent, setSent] = useState(false);

  const sendMessage = () => {
    if (!composer.trim()) return;
    setComposer("");
    setSent(true);
  };

  return (
    <div className="eemaa-page min-h-full" dir="rtl">
      <div className="eemaa-shell eemaa-conversation-shell mx-auto max-w-[760px] px-5 pb-10 pt-3 sm:px-8">
        <header className="eemaa-conversation-header">
          <Link
            to="/contacts"
            className="eemaa-soft-icon"
            aria-label="العودة إلى جهات الاتصال"
          >
            <IconArrowRight size={19} />
          </Link>
          <div className="eemaa-conversation-contact">
            <div className="eemaa-avatar eemaa-avatar-sara">
              س
              <i className="eemaa-status-dot" />
            </div>
            <div>
              <p>سارة محمد</p>
              <span>
                <i /> متصلة الآن
              </span>
            </div>
          </div>
          <button
            type="button"
            className="eemaa-soft-icon"
            aria-label="خيارات المحادثة"
          >
            <IconDots size={19} />
          </button>
        </header>

        <main className="eemaa-conversation-main">
          <div className="eemaa-conversation-toolbar" aria-label="إجراءات التواصل">
            <button
              type="button"
              className="is-primary"
              onClick={() => navigate("/call")}
            >
              <IconVideo size={16} />
              مكالمة فيديو
            </button>
            <button type="button" className="is-secondary">
              <IconMicrophone size={16} />
              مكالمة صوتية
            </button>
            <button
              type="button"
              className={`is-translation ${translationOn ? "is-on" : ""}`}
              onClick={() => setTranslationOn((value) => !value)}
            >
              <IconMessageCircle2 size={16} />
              {translationOn ? "الترجمة مفعلة" : "تفعيل الترجمة"}
            </button>
          </div>

          <section className="eemaa-message-stream" aria-label="محادثة سارة">
            <div className="eemaa-stream-date">اليوم · ٧:٤٢ م</div>

            <div className="eemaa-message-group is-incoming">
              <div className="eemaa-message-avatar eemaa-avatar-sara">س</div>
              <div className="eemaa-message-content">
                <div className="eemaa-modern-bubble">
                  <p>أهلًا نورة، هل نبدأ جلسة اليوم؟</p>
                  <span>٧:٤٢</span>
                </div>
                {translationOn ? (
                  <button type="button" className="eemaa-translation-line">
                    <IconVolume size={14} />
                    <span>أهلًا نورة، هل نبدأ جلسة اليوم؟</span>
                  </button>
                ) : null}
              </div>
            </div>

            <div className="eemaa-message-group is-outgoing">
              <div className="eemaa-message-content">
                <div className="eemaa-modern-bubble">
                  <p>نعم، أريد مراجعة إشارات التحية أولًا.</p>
                  <span>
                    ٧:٤٣ <IconCheck size={12} />
                  </span>
                </div>
              </div>
            </div>

            <div className="eemaa-audio-message">
              <button type="button" aria-label="تشغيل الرسالة الصوتية">
                <IconPlayerPlayFilled size={12} />
              </button>
              <div className="eemaa-audio-wave" aria-hidden="true">
                {Array.from({ length: 20 }).map((_, index) => (
                  <i key={index} style={{ height: `${8 + (index % 5) * 4}px` }} />
                ))}
              </div>
              <span>٠:١٢</span>
            </div>

            <div className="eemaa-typing-state">
              <div className="eemaa-message-avatar eemaa-avatar-sara">س</div>
              <span className="eemaa-typing-dots">
                <i />
                <i />
                <i />
              </span>
              <span>سارة تكتب الآن</span>
            </div>
          </section>

          {translationOn ? (
            <section className="eemaa-translation-strip">
              <div className="eemaa-translation-strip-icon">
                <IconMessageCircle2 size={17} />
              </div>
              <div>
                <p>مساعد التواصل</p>
                <span>ترجمة صوت سارة إلى نص واضح</span>
              </div>
              <button
                type="button"
                className="eemaa-toggle is-on"
                onClick={() => setTranslationOn(false)}
                aria-label="إيقاف الترجمة"
              >
                <span />
              </button>
              <div className="eemaa-translation-result">
                <IconVolume size={16} />
                <strong>هل نبدأ جلسة اليوم؟</strong>
                <IconCheck size={15} />
              </div>
            </section>
          ) : null}

          <div className="eemaa-composer eemaa-modern-composer">
            <button type="button" className="eemaa-composer-icon" aria-label="إرفاق ملف">
              <IconLink size={18} />
            </button>
            <input
              value={composer}
              onChange={(event) => setComposer(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") sendMessage();
              }}
              placeholder="اكتبي رسالة لسارة..."
              aria-label="رسالة جديدة"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="eemaa-send-button"
              aria-label="إرسال الرسالة"
            >
              <IconSend size={17} />
            </button>
          </div>
          {sent ? (
            <p className="eemaa-send-confirmation">تم إرسال الرسالة محليًا في النموذج التجريبي</p>
          ) : null}
        </main>
      </div>
    </div>
  );
}
