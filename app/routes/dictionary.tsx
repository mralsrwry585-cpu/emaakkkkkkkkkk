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
} from "@tabler/icons-react";

const categories = ["الكل", "التحية", "المشاعر", "الاحتياجات", "الأفعال"];
const signs = [
  { word: "صباح الخير", meta: "التحية · أساسي", tint: "sand" },
  { word: "شكرًا", meta: "التواصل · أساسي", tint: "lilac" },
  { word: "أحتاج مساعدة", meta: "الاحتياجات · متوسط", tint: "blue" },
];

function BottomNav() {
  const navigate = useNavigate();
  const items = [
    { label: "الرئيسية", icon: IconHome2, href: "/" },
    { label: "الترجمة", icon: IconMessageCircle2, href: "/translate" },
    { label: "محادثة", icon: IconVideo, href: "/conversation" },
    { label: "التعلّم", icon: IconBook2, href: "/learning" },
    { label: "حسابي", icon: IconUserCircle, href: "/" },
  ];
  return <nav className="eemaa-bottom-nav" aria-label="التنقل الرئيسي">{items.map((item) => { const Icon = item.icon; const active = item.label === "القاموس"; return <button key={item.label} type="button" onClick={() => navigate(item.href)} className={`eemaa-nav-item ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}><Icon size={20} stroke={active ? 2.3 : 1.8} /><span>{item.label}</span></button>; })}</nav>;
}

export function meta() {
  return [{ title: "القاموس | Eemaa" }, { name: "description", content: "اكتشفي إشارات لغة الإشارة العربية" }];
}

export default function DictionaryRoute() {
  const [category, setCategory] = useState("الكل");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const filteredSigns = signs.filter((sign) => !query || sign.word.includes(query));

  return (
    <div className="eemaa-page min-h-full" dir="rtl">
      <div className="eemaa-shell mx-auto max-w-[1240px] px-5 pb-32 pt-5 sm:px-8 lg:px-10 lg:pb-10">
        <header className="flex items-center justify-between gap-4">
          <Link to="/" className="flex size-10 items-center justify-center rounded-2xl text-[#555c89] transition-colors hover:bg-white" aria-label="العودة للرئيسية"><IconArrowRight size={20} /></Link>
          <div className="flex items-center gap-2.5"><div className="eemaa-logo-mark"><span /><span /><span /></div><span className="text-[15px] font-extrabold tracking-[-0.04em] text-[#252c54]">القاموس</span></div>
          <button type="button" className="eemaa-icon-button" aria-label="الإشعارات"><IconBell size={19} stroke={1.8} /><span className="eemaa-notification-dot" /></button>
        </header>

        <main className="mx-auto mt-8 max-w-4xl lg:mt-14">
          <div className="flex items-end justify-between gap-5">
            <div><p className="eemaa-kicker">اكتشفي لغة أقرب</p><h1 className="mt-2 text-[30px] font-extrabold tracking-[-0.04em] text-[#252c54] sm:text-[38px]">كل إشارة تفتح حوارًا</h1></div>
            <span className="hidden rounded-full bg-[#e6e8f4] px-3 py-2 text-[11px] font-bold text-[#777b9b] sm:block">١٢٠ إشارة</span>
          </div>

          <div className="relative mt-7"><IconSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9598ad]" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} className="h-14 w-full rounded-[19px] border border-[#e3e4ed] bg-white pr-12 text-sm text-[#252c54] outline-none transition-shadow placeholder:text-[#9da0b4] focus:shadow-[0_0_0_4px_rgba(85,92,137,.12)]" placeholder="ابحثي عن إشارة..." aria-label="البحث في القاموس" /></div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="تصنيفات القاموس">{categories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2.5 text-[11px] font-extrabold transition-colors ${category === item ? "bg-[#252c54] text-white" : "border border-[#e2e3ed] bg-white text-[#777b9b]"}`}>{item}</button>)}</div>

          <section className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <button type="button" className="eemaa-dictionary-feature text-right"><div className="relative z-10 flex min-h-[275px] flex-col justify-between p-6"><div><span className="rounded-full bg-[#d8f577] px-3 py-1.5 text-[10px] font-extrabold text-[#252c54]">إشارة اليوم</span><h2 className="mt-5 text-[28px] font-bold leading-[1.35] text-white">السلام<br />عليكم</h2></div><div className="flex items-center justify-between"><span className="text-[12px] font-semibold text-[#bbc4e9]">التحية الأولى في كل لقاء</span><span className="flex size-11 items-center justify-center rounded-full bg-white/10 text-[#d8f577]"><IconPlayerPlayFilled size={15} /></span></div></div><div className="eemaa-dictionary-gesture"><IconHandFinger size={90} stroke={1.1} /></div></button>
            <div className="rounded-[28px] border border-[#e3e4ed] bg-[#e9e8f5] p-5"><div className="flex items-center justify-between"><div><span className="eemaa-section-label">اقتراح لك</span><h2 className="mt-2 text-[21px] font-bold text-[#252c54]">عبارات مفيدة</h2></div><IconChevronLeft size={19} className="text-[#777b9b]" /></div><div className="mt-5 space-y-3">{["كيف حالك؟", "إلى اللقاء", "أين الحمام؟"].map((word, index) => <div key={word} className="flex items-center justify-between rounded-2xl bg-white/60 px-4 py-3"><div className="flex items-center gap-3"><span className="text-[11px] font-bold text-[#a0a2b5]">0{index + 1}</span><span className="text-[14px] font-bold text-[#444a70]">{word}</span></div><IconChevronLeft size={15} className="text-[#9da0b4]" /></div>)}</div></div>
          </section>

          <section className="mt-10"><div className="flex items-center justify-between"><h2 className="text-[20px] font-bold text-[#252c54]">الأكثر مشاهدة</h2><button type="button" className="text-[11px] font-bold text-[#777b9b]">عرض الكل</button></div><div className="mt-4 grid gap-3 sm:grid-cols-3">{filteredSigns.map((sign) => { const isSaved = saved.includes(sign.word); return <div key={sign.word} className="rounded-[23px] border border-[#e3e4ed] bg-white p-3"><div className={`eemaa-sign-card-visual ${sign.tint}`}><IconHandFinger size={45} stroke={1.1} /><button type="button" onClick={() => setSaved((current) => isSaved ? current.filter((item) => item !== sign.word) : [...current, sign.word])} className={`absolute left-3 top-3 flex size-8 items-center justify-center rounded-xl bg-white/70 ${isSaved ? "text-[#65713a]" : "text-[#8b8da4]"}`} aria-label={isSaved ? `إزالة ${sign.word}` : `حفظ ${sign.word}`}><IconBookmark size={15} fill={isSaved ? "currentColor" : "none"} /></button><span className="absolute bottom-3 right-3 rounded-full bg-white/70 px-2 py-1 text-[9px] font-extrabold text-[#777b9b]">{sign.meta.split(" · ")[1]}</span></div><p className="mt-3 text-[15px] font-bold text-[#252c54]">{sign.word}</p><p className="mt-1 text-[11px] text-[#9698ad]">{sign.meta.split(" · ")[0]}</p></div>; })}</div>{filteredSigns.length === 0 && <div className="rounded-[24px] border border-dashed border-[#cfd2e0] py-12 text-center text-sm font-bold text-[#777b9b]">لم نجد إشارة بهذه الكلمة</div>}</section>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
