import { useState } from "react";
import { Link } from "react-router";
import {
  IconArrowRight,
  IconAward,
  IconCheck,
  IconChevronLeft,
  IconClock,
  IconHandFinger,
  IconPlayerPlayFilled,
  IconRefresh,
  IconX,
} from "@tabler/icons-react";

const questions = [
  { prompt: "ما معنى هذه الإشارة؟", answer: "شكرًا", options: ["صباح الخير", "شكرًا", "أحتاج مساعدة", "إلى اللقاء"] },
  { prompt: "أي عبارة تناسب بداية اللقاء؟", answer: "السلام عليكم", options: ["السلام عليكم", "أين الحمام؟", "أنا بخير", "إلى اللقاء"] },
  { prompt: "اختاري الإشارة الأقرب لطلب الدعم.", answer: "أحتاج مساعدة", options: ["شكرًا", "أفهمك", "أحتاج مساعدة", "صباح الخير"] },
];

export function meta() {
  return [{ title: "اختبار الإشارات | Eemaa" }, { name: "description", content: "اختبار تفاعلي لتثبيت تعلّم لغة الإشارة" }];
}

export default function QuizRoute() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const question = questions[questionIndex];

  const choose = (option: string) => {
    if (!selected) setSelected(option);
  };
  const next = () => {
    if (!selected) return;
    const nextScore = score + (selected === question.answer ? 1 : 0);
    if (questionIndex === questions.length - 1) {
      setScore(nextScore);
      setComplete(true);
      return;
    }
    setScore(nextScore);
    setQuestionIndex((current) => current + 1);
    setSelected(null);
  };
  const restart = () => {
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setComplete(false);
  };

  return <div className="eemaa-page min-h-full" dir="rtl"><div className="eemaa-shell mx-auto max-w-[760px] px-5 pb-10 pt-3 sm:px-8">
    <header className="eemaa-topbar"><Link to="/learning" className="eemaa-soft-icon" aria-label="العودة إلى التعلّم"><IconArrowRight size={19} /></Link><div className="text-center"><p className="text-[14px] font-extrabold text-[#173258]">تحدّي اليوم</p><span className="text-[9px] font-bold text-[#7890ac]">أساسيات التواصل</span></div><Link to="/learning" className="eemaa-soft-icon" aria-label="إغلاق الاختبار"><IconX size={18} /></Link></header>
    {!complete ? <main className="mt-7"><div className="flex items-center justify-between"><span className="text-[11px] font-extrabold text-[#4777b5]">السؤال {questionIndex + 1} من {questions.length}</span><span className="flex items-center gap-1.5 text-[10px] font-bold text-[#8ca0bb]"><IconClock size={14} /> ٠:٤٨</span></div><div className="eemaa-quiz-progress mt-3"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div><section className="eemaa-quiz-stage mt-7 p-5 sm:p-7"><div className="flex min-h-[178px] flex-col items-center justify-center rounded-[23px] bg-gradient-to-br from-[#e1f6f3] to-[#e7efff] text-center"><div className="flex size-24 items-center justify-center rounded-full border border-[#75cbc9] bg-white/60 text-[#2771be] shadow-[0_0_0_16px_rgba(110,224,213,.08)]"><IconHandFinger size={55} stroke={1.1} /></div><span className="mt-3 rounded-full bg-white/70 px-3 py-1 text-[9px] font-extrabold text-[#4e78a5]">معاينة الإشارة</span></div><h1 className="mt-7 text-center text-[21px] font-extrabold leading-[1.6] text-[#173258]">{question.prompt}</h1><div className="mt-5 grid gap-3">{question.options.map((option, index) => { const isSelected = selected === option; const isCorrect = isSelected && selected === question.answer; const isWrong = isSelected && selected !== question.answer; return <button key={option} type="button" onClick={() => choose(option)} className={`eemaa-answer ${isSelected ? "is-selected" : ""} ${isCorrect ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}`}><span className="eemaa-answer-key">{String.fromCharCode(1571 + index)}</span><span className="flex-1 text-[12px] font-extrabold">{option}</span>{isCorrect ? <IconCheck size={17} className="text-[#1d9b93]" /> : isWrong ? <IconX size={17} className="text-[#da6d63]" /> : <IconChevronLeft size={16} className="text-[#9db1c7]" />}</button>; })}</div></section><button type="button" onClick={next} disabled={!selected} className="eemaa-primary-button mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50">{questionIndex === questions.length - 1 ? "عرض النتيجة" : "السؤال التالي"} <IconChevronLeft size={16} /></button></main> : <main className="mt-8"><section className="eemaa-quiz-hero px-6 py-9 text-center"><div className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-2xl bg-white/15 text-[#a9f0e8]"><IconAward size={30} /></div><p className="relative z-10 mt-5 text-[11px] font-bold text-[#cde6ff]">أحسنتِ، أنهيتِ التحدي</p><h1 className="relative z-10 mt-2 text-[31px] font-extrabold">{score} / {questions.length}</h1><p className="relative z-10 mt-2 text-[11px] text-[#d9edff]">استمري بهذا الإيقاع، مهارتك تنمو مع كل إشارة.</p></section><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-[22px] border border-[#d9e5f1] bg-white p-4 text-center"><p className="text-[24px] font-extrabold text-[#245fb3]">{Math.round((score / questions.length) * 100)}٪</p><p className="mt-1 text-[10px] font-bold text-[#8ca0bb]">دقة الإجابات</p></div><div className="rounded-[22px] border border-[#d9e5f1] bg-white p-4 text-center"><p className="text-[24px] font-extrabold text-[#178a8c]">+١٢٠</p><p className="mt-1 text-[10px] font-bold text-[#8ca0bb]">نقطة تعلّم</p></div></div><div className="mt-5 flex gap-3"><button type="button" onClick={restart} className="eemaa-primary-button flex-1 justify-center"><IconRefresh size={16} /> إعادة الاختبار</button><Link to="/learning" className="flex flex-1 items-center justify-center gap-2 rounded-[15px] border border-[#d5e3f1] bg-white text-[11px] font-extrabold text-[#35669e]">العودة للتعلّم</Link></div></main>}
  </div></div>;
}
