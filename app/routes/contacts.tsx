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
  { name: "سارة محمد", detail: "متصلة الآن", initial: "س", tone: "sara", online: true },
  { name: "خالد علي", detail: "متصل منذ ١٥ دقيقة", initial: "خ", tone: "violet", online: true },
  { name: "ريم أحمد", detail: "آخر ظهور أمس", initial: "ر", tone: "coral", online: false },
  { name: "عبدالله سالم", detail: "متصل هذا الصباح", initial: "ع", tone: "ocean", online: true },
];

const navItems = [
  { label: "الرئيسية", icon: IconHome2, href: "/" },
  { label: "الترجمة", icon: IconMessageCircle2, href: "/translate" },
  { label: "محادثة", icon: IconVideo, href: "/conversation" },
  { label: "التعلّم", icon: IconBook2, href: "/learning" },
  { label: "حسابي", icon: IconUserCircle, href: "/" },
];

function BottomNav() {
  const navigate = useNavigate();

  return (
    <nav className="eemaa-bottom-nav" aria-label="التنقل الرئيسي">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => navigate(item.href)}
            className={`eemaa-nav-item ${item.label === "محادثة" ? "is-active" : ""}`}
          >
            <Icon size={19} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export function meta() {
  return [
    { title: "جهات الاتصال | Eemaa" },
    { name: "description", content: "تواصلي مع جهاتك المفضلة عبر إيماء" },
  ];
}

export default function ContactsRoute() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("الكل");
  const navigate = useNavigate();
  const filters = ["الكل", "متصل الآن", "غير متصل"];

  const visibleContacts = contacts.filter(
    (contact) =>
      (!query || contact.name.includes(query)) &&
      (filter === "الكل" ||
        (filter === "متصل الآن" ? contact.online : !contact.online)),
  );

  return (
    <div className="eemaa-page min-h-full" dir="rtl">
      <div className="eemaa-shell eemaa-contacts-shell mx-auto max-w-[760px] px-5 pb-32 pt-4 sm:px-8 lg:pb-10">
        <header className="eemaa-page-header">
          <Link
            to="/conversation"
            className="eemaa-soft-icon"
            aria-label="العودة إلى المحادثة"
          >
            <IconArrowRight size={19} />
          </Link>
          <div>
            <p className="eemaa-page-title">جهات الاتصال</p>
            <p className="eemaa-page-subtitle">اختاري شخصًا لبدء التواصل</p>
          </div>
          <button type="button" className="eemaa-soft-icon" aria-label="إضافة جهة اتصال">
            <IconUserPlus size={18} />
          </button>
        </header>

        <main className="eemaa-contacts-main">
          <label className="eemaa-contact-search">
            <IconSearch size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحثي عن شخص..."
              aria-label="البحث في جهات الاتصال"
            />
          </label>

          <div className="eemaa-contacts-tabs" role="tablist" aria-label="فلترة جهات الاتصال">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                className={filter === item ? "is-active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="eemaa-contacts-heading">
            <div>
              <p className="eemaa-kicker">دائرتك القريبة</p>
              <h1>ابدئي محادثة</h1>
            </div>
            <span>{visibleContacts.length} جهات</span>
          </div>

          <section className="eemaa-contacts-list" aria-label="قائمة جهات الاتصال">
            {visibleContacts.map((contact) => (
              <article key={contact.name} className="eemaa-contact-row">
                <div className={`eemaa-contact-photo ${contact.tone}`}>
                  <span>{contact.initial}</span>
                  <i className={`eemaa-status-dot ${contact.online ? "" : "offline"}`} />
                </div>
                <div className="eemaa-contact-copy">
                  <p>{contact.name}</p>
                  <span className={contact.online ? "is-online" : ""}>
                    <i /> {contact.detail}
                  </span>
                </div>
                <div className="eemaa-contact-actions">
                  <button
                    type="button"
                    className="eemaa-contact-action"
                    onClick={() => navigate("/conversation")}
                    aria-label={`اتصال صوتي مع ${contact.name}`}
                  >
                    <IconPhone size={16} />
                  </button>
                  <button
                    type="button"
                    className="eemaa-contact-action video"
                    onClick={() => navigate("/call")}
                    aria-label={`مكالمة فيديو مع ${contact.name}`}
                  >
                    <IconVideo size={16} />
                  </button>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
