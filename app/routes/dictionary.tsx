import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  IconArrowRight,
  IconBell,
  IconBookmark,
  IconBook2,
  IconChevronLeft,
  IconHandFinger,
  IconHome2,
  IconMessageCircle2,
  IconPlayerPlayFilled,
  IconSearch,
  IconUserCircle,
  IconVideo,
  IconVolume,
} from "@tabler/icons-react";

const categories = ["الكل", "التحية", "المشاعر", "الاحتياجات", "الأفعال"];
const signs = [
  { word: "ماء", category: "الاحتياجات", meta: "أساسي", tint: "blue", meaning: "طلب الماء أو الإشارة إلى الحاجة للشرب.", method: "ضمّي أطراف الأصابع ثم حرّكي اليد قرب الفم كأنك تشربين." },
  { word: "صباح الخير", category: "التحية", meta: "أساسي", tint: "sand", meaning: "تحية لطيفة لبداية اليوم.", method: "ارفعي اليد بتحية هادئة ثم افتحيها للأعلى." },
  { word: "شكرًا", category: "المشاعر", meta: "أساسي", tint: "lilac", meaning: "التعبير عن الامتنان والتقدير.", method: "ضعي أطراف الأصابع قرب الذقن ثم حرّكي اليد إلى الأمام." },
  { word: "أحتاج مساعدة", category: "الاحتياجات", meta: "متوسط", tint: "blue", meaning: "طلب الدعم أو المساعدة.", method: "ارفعي اليدين أمام الصدر بإشارة واضحة ومفتوحة." },
  { word: "إلى اللقاء", category: "التحية", meta: "أساسي", tint: "sand", meaning: "وداع مؤقت حتى اللقاء القادم.", method: "لوّحي باليد بحركة قصيرة وواضحة." },
  { word: "أفهمك", category: "المشاعر", meta: "متوسط", tint: "lilac", meaning: "إظهار فهمك لما يقوله الطرف الآخر.", method: "أشيري إلى نفسك ثم حرّكي اليد بإيماءة تأكيد." },
];

type Sign = (typeof signs)[number];

function BottomNav() {
  const navigate = useNavigate();
  const items = [{ label: "الرئيسية", icon: IconHome2, href: "/" }, { label: "الترجمة", icon: IconMessageCircle2, href: "/translate" }, { label: "محادثة", icon: IconVideo, href: "/conversation" }, { label: "التعلّم", icon: IconBook2, href: "/learning" }, { label: "حسابي", icon: IconUserCircle, href: "/" }];
  return <nav className="eemaa-bottom-nav" aria-label="التنقل الرئيسي">{items.map((item) => { const Icon = item.icon; return <button key={item.label} type="button" onClick={() => navigate(item.href)} className="eemaa-nav-item"><Icon size={19} /><span>{item.label}</span></button>; })}</nav>;
}

export function meta() {
  return [{ title: "القاموس | Eemaa" }, { name: "description", content: "مرجع سريع لمعاني إشارات لغة الإشارة العربية" }];
}

export default function DictionaryRoute() {
  const [category, setCategory] = useState("الكل");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [selectedWord, setSelectedWord] = useState("ماء");
  const [playing, setPlaying] = useState(false);
  const filteredSigns = signs.filter((sign) => (category === "الكل" || sign.category === category) && (!query || sign.word.includes(query)));
  const selectedSign: Sign = signs.find((sign) => sign.word === selectedWord) ?? signs[0];
  const similarSigns = signs.filter((sign) => sign.word !== selectedSign.word && sign.category === selectedSign.category).slice(0, 2);

  return <div className="eemaa-page min-h-full" dir="rtl"><div className="eemaa-shell mx-auto max-w-[1240px] px-5 pb-32 pt-5 sm:px-8 lg:px-10 lg:pb-10">
    <header className="flex items-center justify-between gap-4"><Link to="/" className="eemaa-soft-icon" aria-label="العودة للرئيسية"><IconArrowRight size={20} /></Link><div className="flex items-center gap-2.5"><div className="eemaa-logo-mark"><span /><span /><span /></div><span className="text-[15px] font-extrabold tracking-[-0.04em] text-[#e1eeff]">القاموس</span></div><button type="button" className="eemaa-soft-icon" aria-label="الإشعارات"><IconBell size={19} /></button></header>
    <main className="mx-auto mt-8 max-w-4xl lg:mt-12"><div className="flex items-end justify-between gap-5"><div><p className="eemaa-kicker">مرجع سريع للإشارة</p><h1 className="mt-2 text-[30px] font-extrabold tracking-[-0.04em] text-[#e1eeff] sm:text-[38px]">ابحثي عن معنى واضح</h1></div><span className="hidden rounded-full bg-[#16365b] px-3 py-2 text-[11px] font-bold text-[#75e1d7] sm:block">١٢٠ إشارة</span></div>
      <div className="relative mt-7"><IconSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7f9dc3]" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} className="h-14 w-full rounded-[19px] border border-[#223b5c] bg-[#101e32] pr-12 text-sm text-[#e1eeff] outline-none transition-shadow placeholder:text-[#758eaf] focus:shadow-[0_0_0_4px_rgba(66,135,211,.14)]" placeholder="ابحثي عن إشارة مثل ماء..." aria-label="البحث في القاموس" /></div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="تصنيفات القاموس">{categories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2.5 text-[11px] font-extrabold transition-colors ${category === item ? "bg-[#255fae] text-white shadow-[0_8px_16px_rgba(32,100,188,.22)]" : "border border-[#263f60] bg-[#101e32] text-[#819cbd]"}`}>{item}</button>)}</div>
      <section className="eemaa-sign-detail mt-7"><div className="eemaa-sign-detail-visual"><div className={`eemaa-sign-card-visual ${selectedSign.tint}`}><IconHandFinger size={66} stroke={1.05} /><span className="eemaa-sign-detail-tag">معاينة الإشارة</span></div><button type="button" onClick={() => setSaved((current) => current.includes(selectedSign.word) ? current.filter((word) => word !== selectedSign.word) : [...current, selectedSign.word])} className={`eemaa-sign-detail-save ${saved.includes(selectedSign.word) ? "is-saved" : ""}`} aria-label="حفظ الإشارة"><IconBookmark size={17} fill={saved.includes(selectedSign.word) ? "currentColor" : "none"} /></button></div><div className="eemaa-sign-detail-copy"><div className="flex items-start justify-between gap-3"><div><span className="eemaa-section-label">{selectedSign.category} · {selectedSign.meta}</span><h2 className="mt-2 text-[25px] font-extrabold text-[#e9f3ff]">{selectedSign.word}</h2></div><button type="button" onClick={() => setPlaying(!playing)} className={`eemaa-audio-button ${playing ? "is-playing" : ""}`} aria-label={playing ? "إيقاف النطق" : "تشغيل النطق العربي"}><IconVolume size={17} /> {playing ? "يُنطق الآن" : "النطق العربي"}</button></div><div className="mt-5 grid gap-3"><div><span className="eemaa-detail-label">المعنى</span><p className="mt-1 text-[12px] leading-6 text-[#b3c8e2]">{selectedSign.meaning}</p></div><div><span className="eemaa-detail-label">طريقة الأداء</span><p className="mt-1 text-[12px] leading-6 text-[#b3c8e2]">{selectedSign.method}</p></div></div></div></section>
      <section className="mt-6 grid gap-4 sm:grid-cols-2"><div className="eemaa-reference-strip"><div className="flex items-center justify-between"><h2>إشارات مشابهة</h2><IconChevronLeft size={16} /></div><div className="mt-3 flex gap-2">{similarSigns.map((sign) => <button key={sign.word} type="button" onClick={() => setSelectedWord(sign.word)} className="eemaa-reference-chip"><span>{sign.word}</span><IconChevronLeft size={13} /></button>)}</div></div><div className="eemaa-reference-strip"><div className="flex items-center justify-between"><h2>الإشارات الأخيرة</h2><IconChevronLeft size={16} /></div><div className="mt-3 flex gap-2"><button type="button" onClick={() => setSelectedWord("ماء")} className="eemaa-reference-chip"><span>ماء</span><IconPlayerPlayFilled size={11} /></button><button type="button" onClick={() => setSelectedWord("صباح الخير")} className="eemaa-reference-chip"><span>صباح الخير</span><IconPlayerPlayFilled size={11} /></button></div></div></section>
      <section className="mt-10"><div className="flex items-center justify-between"><h2 className="text-[20px] font-bold text-[#e1eeff]">كل الإشارات</h2><span className="text-[11px] font-bold text-[#7f9dc3]">{filteredSigns.length} نتائج</span></div><div className="mt-4 grid gap-3 sm:grid-cols-3">{filteredSigns.map((sign) => { const isSaved = saved.includes(sign.word); return <button type="button" key={sign.word} onClick={() => setSelectedWord(sign.word)} className="rounded-[23px] border border-[#223b5c] bg-[#101e32] p-3 text-right shadow-[0_8px_18px_rgba(0,0,0,.16)]"><div className={`eemaa-sign-card-visual ${sign.tint}`}><IconHandFinger size={45} stroke={1.1} /><span className="absolute bottom-3 right-3 rounded-full bg-[#09182b]/70 px-2 py-1 text-[9px] font-extrabold text-[#b9d3ef]">{sign.meta}</span></div><div className="mt-3 flex items-start justify-between gap-2"><div><p className="text-[15px] font-bold text-[#e1eeff]">{sign.word}</p><p className="mt-1 text-[11px] text-[#819cbd]">{sign.category}</p></div><span className={`flex size-8 items-center justify-center rounded-xl bg-[#172d4b] ${isSaved ? "text-[#70e1d5]" : "text-[#7898be]"}`}><IconBookmark size={15} fill={isSaved ? "currentColor" : "none"} /></span></div></button>; })}</div>{filteredSigns.length === 0 && <div className="rounded-[24px] border border-dashed border-[#2b4a6d] py-12 text-center text-sm font-bold text-[#819cbd]">لم نجد إشارة بهذه الكلمة</div>}</section>
    </main>
  </div><BottomNav /></div>;
}
