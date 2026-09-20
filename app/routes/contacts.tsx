import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  IconArrowRight,
  IconBook2,
  IconHome2,
  IconMessageCircle2,
  IconPhone,
  IconSearch,
  IconUserCircle,
  IconUserPlus,
  IconVideo,
} from "@tabler/icons-react";

const contacts = [
  { name: "سارة محمد", detail: "متصلة الآن", initial: "س", tone: "", online: true },
  { name: "خالد علي", detail: "متصل منذ ١٥ دقيقة", initial: "خ", tone: "violet", online: true },
  { name: "ريم أحمد", detail: "آخر ظهور أمس", initial: "ر", tone: "coral", online: false },
  { name: "عبدالله سالم", detail: "متصل هذا الصباح", initial: "ع", tone: "", online: true },
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
  return <nav className="eemaa-bottom-nav" aria-label="التنقل الرئيسي">{items.map((item) => { const Icon = item.icon; return <button key={item.label} type="button" onClick={() => navigate(item.href)} className="eemaa-nav-item"><Icon size={19} /><span>{item.label}</span></button>; })}</nav>;
}

export function meta() {
  return [{ title: "جهات الاتصال | Eemaa" }, { name: "description", content: "تواصلي مع جهاتك المفضلة عبر إيماء" }];
}

export default function ContactsRoute() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("الكل");
  const navigate = useNavigate();
  const visibleContacts = contacts.filter((contact) => (!query || contact.name.includes(query)) && (filter === "الكل" || (filter === "متصل الآن" ? contact.online : !contact.online)));

  return <div className="eemaa-page min-h-full" dir="rtl"><div className="eemaa-shell mx-auto max-w-[760px] px-5 pb-32 pt-4 sm:px-8 lg:pb-10">
    <header className="eemaa-topbar"><Link to="/conversation" className="eemaa-soft-icon" aria-label="العودة للمحادثة"><IconArrowRight size={19} /></Link><div><p className="text-[14px] font-extrabold text-[#e1eeff]">جهات الاتصال</p><p className="mt-1 text-[9px] font-bold text-[#829cbb]">اختاري شخصاً لبدء التواصل</p></div><button type="button" className="eemaa-soft-icon" aria-label="إضافة جهة اتصال"><IconUserPlus size={18} /></button></header>
    <main className="mt-7"><div className="relative"><IconSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7898be]" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحثي عن شخص..." aria-label="البحث في جهات الاتصال" className="h-14 w-full rounded-[18px] border border-[#223b5c] bg-[#101e32] pr-11 text-[12px] text-[#e1eeff] outline-none placeholder:text-[#6f89aa] focus:border-[#4388cf]" /></div><div className="eemaa-contacts-tabs mt-4" role="tablist" aria-label="فلترة جهات الاتصال">{["الكل", "متصل الآن", "غير متصل"].map((item) => <button key={item} type="button" role="tab" aria-selected={filter === item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="mt-7 flex items-end justify-between"><div><p className="eemaa-kicker">دائرتك القريبة</p><h1 className="mt-2 text-[26px] font-extrabold text-[#e9f3ff]">ابدئي محادثة</h1></div><span className="text-[10px] font-bold text-[#7898be]">{visibleContacts.length} جهات</span></div><section className="eemaa-contacts-list mt-5">{visibleContacts.map((contact) => <article key={contact.name} className="eemaa-contact-row"><div className={`eemaa-contact-photo ${contact.tone}`}><span>{contact.initial}</span><i className={`eemaa-status-dot ${contact.online ? "" : "offline"}`} /></div><div className="min-w-0"><p className="truncate text-[13px] font-extrabold text-[#e1eeff]">{contact.name}</p><p className="mt-1 text-[10px] font-bold text-[#7898be]">{contact.detail}</p></div><div className="eemaa-contact-actions"><button type="button" className="eemaa-contact-action" onClick={() => navigate("/conversation")} aria-label={`مكالمة صوتية مع ${contact.name}`}><IconPhone size={16} /></button><button type="button" className="eemaa-contact-action video" onClick={() => navigate("/call")} aria-label={`مكالمة فيديو مع ${contact.name}`}><IconVideo size={16} /></button></div></article>)}{visibleContacts.length === 0 && <div className="rounded-[22px] border border-dashed border-[#2b4a6d] py-12 text-center text-[12px] font-bold text-[#7898be]">لم نجد جهة بهذا الاسم</div>}</section></main>
  </div><BottomNav /></div>;
}
