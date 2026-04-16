import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { Code, Palette, TrendingUp, Languages, ArrowUpRight, ArrowUp, Zap, BarChart3, Sun, Moon, MapPin, Brush, Bot, Camera, Phone } from "lucide-react";
import logoLight from "../../public/imgs/seedream.jpg";
import logoDark from "../../public/imgs/logo.jpeg";
import { ServiceCard } from "./components/ServiceCard";
import { FooterVideo } from "./components/FooterVideo";

type Language = 'ar' | 'en';
type Theme = 'dark' | 'light';

const PHONE_NUMBER = "966504764145";
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}`;
const PHONE_URL = `tel:+${PHONE_NUMBER}`;
const NAV_OFFSET = 96;

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>('dark');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string>('');
  const [showFloatingWA, setShowFloatingWA] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contactActionsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const isDark = theme === 'dark';
  const logoImg = isDark ? logoDark : logoLight;

  useEffect(() => {
    document.title = 'Afaq';
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = logoImg;
  }, [logoImg]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloatingWA(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (contactActionsRef.current) observer.observe(contactActionsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeVideoModal = () => { setVideoModalOpen(false); setCurrentVideo(''); };

  const StatCounter = ({ value, label, isDark }: { value: string; label: string; isDark: boolean }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const finalNumber = parseInt(value.replace(/[^0-9]/g, ""));
    const suffix = value.replace(/[0-9]/g, "");
    const [displayValue, setDisplayValue] = useState(0);
    const [animating, setAnimating] = useState(false);
    useEffect(() => {
      if (isInView && !animating) {
        setAnimating(true);
        let step = 0;
        const timer = setInterval(() => {
          step++;
          setDisplayValue(Math.floor(Math.random() * finalNumber * 1.5));
          if (step >= 100) { clearInterval(timer); setDisplayValue(finalNumber); }
        }, 10);
        return () => clearInterval(timer);
      }
    }, [isInView, finalNumber]);
    return (
      <div ref={ref} className="text-center">
        <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-[#1E5FA0] to-[#F48120] bg-clip-text text-transparent flex justify-center">
          <span>{displayValue.toLocaleString()}</span><span>{suffix}</span>
        </div>
        <div className={`text-sm md:text-base mt-2 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{label}</div>
      </div>
    );
  };

  const featureCards = {
    ar: [
      { title: "هويّة بصرية تصنع الفارق", desc: "نصمم لك براند احترافي يرسخ في ذهن عملائك ويمنحك التميز الذي تستحقه.", icon: "🎨" },
      { title: "حلول تقنية تريح بالك", desc: "نحول تعقيدات البرمجة إلى أدوات سهلة تزيد من كفاءة وإيرادات مشروعك.", icon: "⚡" },
      { title: "شريك تقني تعتمد عليه", desc: "لسنا مجرد شركة تنفيذ، نحن فريقك التقني الذي يدعم نموّك خطوة بخطوة.", icon: "🤝" },
    ],
    en: [
      { title: "Visual Identity That Makes a Difference", desc: "We craft a professional brand that sticks in your customers' minds and gives you the distinction you deserve.", icon: "🎨" },
      { title: "Tech Solutions That Give You Peace of Mind", desc: "We turn complex code into simple tools that boost your project's efficiency and revenue.", icon: "⚡" },
      { title: "A Tech Partner You Can Rely On", desc: "We're not just an agency — we're your dedicated tech team, supporting your growth every step of the way.", icon: "🤝" },
    ],
  };

  const content = {
    ar: {
      nav: { home: "الرئيسية", services: "خدماتنا", contact: "تواصل" },
      hero: { badge: "وكالة تقنية رائدة", title: "نفتح لك آفاق جديدة", highlight: "في عالم التقنية", cta: "تواصل معنا الآن" },
      stats: [
        { number: "200+", label: "مشروع منجز" },
        { number: "95%", label: "رضا العملاء" },
        { number: "5+", label: "سنوات خبرة" },
      ],
      services: {
        title: "مجالاتنا",
        items: [
          { title: "هندسة برمجية بمعايير عالمية", description: "نبني تطبيقات ومواقع فائقة السرعة بأحدث التقنيات، لنمنح مشروعك بنية تحتية رقمية قوية تتوسع معك بلا حدود.", icon: Code, videoUrl: "videos/coding.webm" },
          { title: "أتمتة ذكية تضاعف إنتاجيتك", description: "نستبدل المهام المتكررة بأنظمة ذكية تعمل بالنيابة عنك، لتقليل الأخطاء البشرية وتوفير وقتك للإنجازات التي تهمك فعلاً.", icon: Zap, videoUrl: "videos/automation.webm" },
          { title: "تصاميم ملهمة تدمج الجمال بالوظيفة", description: "نمزج بين الفن الرقمي وسهولة الاستخدام لنخلق واجهات بصرية ساحرة، لا تكتفي بجذب الأنظار بل تحول الزوار إلى عملاء دائمين.", icon: Palette, videoUrl: "videos/design.webm" },
          { title: "محتوى مرئي يأسر الجمهور ويحقق النتائج", description: "نصنع فيديوهات إعلانية سينمائية مصممة بذكاء تسويقي، لضمان أعلى عائد على استثمارك وتحويل علامتك التجارية إلى قصة تُلهم الملايين.", icon: Camera, videoUrl: "videos/camera.webm" },
          { title: "استراتيجيات نمو تضمن لك الصدارة", description: "لا نكتفي بإطلاق الحملات، بل نبني لك منظومة تسويقية شاملة تستهدف جمهورك بدقة وتنمّي حصتك السوقية لتعزيز حضورك الرقمي في قلب المنافسة.", icon: TrendingUp, videoUrl: "videos/marketing.webm" },
          { title: "تحليلات ذكية لرؤية مستقبلية واضحة", description: "نحول أرقامك الضخمة إلى رؤى استراتيجية مفهومة، مما يمنحك القدرة على اتخاذ قرارات دقيقة مبنية على الحقائق، لتقليل المخاطر واقتناص الفرص قبل الجميع.", icon: BarChart3, videoUrl: "videos/data.webm" },
          { title: "رقابة ذكية لإدارة عملياتك الميدانية بدقة", description: "نمنحك السيطرة الكاملة عبر أنظمة تتبع حية تمكنك من مراقبة فريقك في الوقت الفعلي، لتحسين مسارات التوصيل، تقليل التكاليف التشغيلية، وضمان أعلى مستويات رضا العملاء.", icon: MapPin, videoUrl: "videos/location.webm" },
          { title: "هوية بصرية تروي قصة نجاحك", description: "لا نصمم مجرد رموز، بل نبني لعلامتك التجارية لغة بصرية متكاملة تعكس قيمك وتترك أثراً ذهنياً لا يُنسى، لتضمن لبراندك الهيبة والتميز في سوق لا يتوقف عن المنافسة.", icon: Brush, videoUrl: "videos/logo.webm" },
          { title: "ذكاء اصطناعي يمنح عملائك رداً فورياً على مدار الساعة", description: "نطور بوتات محادثة ذكية تفهم احتياجات عملائك وتجيبهم في ثوانٍ، لضمان استمرارية تواصلك وبناء علاقة موثوقة مع جمهورك دون توقف أو انتظار.", icon: Bot, videoUrl: "videos/pot.webm" },
        ],
      },
      cta: { title: "جاهز لبدء مشروعك القادم؟", subtitle: "دعنا نحول رؤيتك إلى واقع رقمي", button: "تواصل معنا الآن" },
      footer: {
        tagline: "نفتح لك آفاق جديدة",
        videoTitle: "لننطلق سوياً نحو هدفك ..",
        contact: "تواصل معنا",
        location: "الرياض، المملكة العربية السعودية",
        copyright: "جميع الحقوق محفوظة",
        callUs: "اتصل بنا",
        whatsapp: "واتساب",
        contactNow: "تواصل معنا الآن",
      },
    },
    en: {
      nav: { home: "Home", services: "Services", contact: "Contact" },
      hero: { badge: "Leading Tech Agency", title: "Opening New Horizons", highlight: "In Technology", cta: "Contact Us Now" },
      stats: [
        { number: "200+", label: "Projects Done" },
        { number: "95%", label: "Client Satisfaction" },
        { number: "5+", label: "Years Experience" },
      ],
      services: {
        title: "Our Services",
        items: [
          { title: "Global-Standard Software Engineering", description: "We engineer high-performance applications and websites using world-class technologies, providing your project with a robust and infinitely scalable digital infrastructure.", icon: Code, videoUrl: "videos/coding.webm" },
          { title: "Intelligent Automation to Scale Productivity", description: "We replace repetitive tasks with smart, autonomous systems that work on your behalf, eliminating human error and reclaiming your time for the goals that truly matter.", icon: Zap, videoUrl: "videos/automation.webm" },
          { title: "Creative Design & Inspiring User Experiences", description: "We blend digital artistry with seamless functionality to create captivating interfaces that don't just look stunning, but strategically turn visitors into loyal customers.", icon: Palette, videoUrl: "videos/design.webm" },
          { title: "Visual Production & Impactful Campaigns", description: "We craft cinematic ad content engineered with marketing intelligence to ensure maximum ROI, turning your brand into an inspiring story that resonates with millions.", icon: Camera, videoUrl: "videos/camera.webm" },
          { title: "Strategic Digital Marketing & Growth", description: "We don't just launch campaigns; we build a comprehensive marketing ecosystem that precisely targets your audience and grows your market share to dominate the digital landscape.", icon: TrendingUp, videoUrl: "videos/marketing.webm" },
          { title: "Data Analytics & Business Intelligence", description: "We transform your raw data into actionable strategic insights, empowering you to make precision-driven decisions based on facts to mitigate risks and seize opportunities ahead of the curve.", icon: BarChart3, videoUrl: "videos/data.webm" },
          { title: "Smart Fleet & Field Force Tracking", description: "Gain absolute control with real-time tracking systems that allow you to monitor your field team instantly, optimizing delivery routes, reducing operational costs, and ensuring peak customer satisfaction.", icon: MapPin, videoUrl: "videos/location.webm" },
          { title: "Visual Identity & Brand Strategy", description: "We don't just design logos; we build a comprehensive visual language that reflects your core values and leaves an unforgettable impression, ensuring your brand commands authority and stands out.", icon: Brush, videoUrl: "videos/logo.webm" },
          { title: "AI Chatbots & Automated Customer Engagement", description: "We develop intelligent chatbots that understand your customers' needs and respond instantly, ensuring 24/7 engagement and building reliable relationships without downtime or delays.", icon: Bot, videoUrl: "videos/pot.webm" },
        ],
      },
      cta: { title: "Ready to Start Your Next Project?", subtitle: "Let's transform your vision into digital reality", button: "Contact Us Now" },
      footer: {
        tagline: "Opening New Horizons",
        videoTitle: "Watch Our Success Story",
        contact: "Contact Us",
        location: "Riyadh, Saudi Arabia",
        copyright: "All Rights Reserved",
        callUs: "Call Us",
        whatsapp: "WhatsApp",
        contactNow: "Contact Us Now",
      },
    },
  };

  const t = content[lang];
  const isRTL = lang === 'ar';
  const cards = featureCards[lang];

  const colors = [
    { bg: 'bg-[#1E5FA0]/20', text: 'text-[#1E5FA0]', gradient: 'from-[#1E5FA0]/20' },
    { bg: 'bg-[#F48120]/20', text: 'text-[#F48120]', gradient: 'from-[#F48120]/20' },
    { bg: 'bg-[#1E5FA0]/20', text: 'text-[#1E5FA0]', gradient: 'from-[#1E5FA0]/20' },
    { bg: 'bg-[#F48120]/20', text: 'text-[#F48120]', gradient: 'from-[#F48120]/20' },
    { bg: 'bg-[#1E5FA0]/20', text: 'text-[#1E5FA0]', gradient: 'from-[#1E5FA0]/20' },
    { bg: 'bg-[#F48120]/20', text: 'text-[#F48120]', gradient: 'from-[#F48120]/20' },
    { bg: 'bg-[#1E5FA0]/20', text: 'text-[#1E5FA0]', gradient: 'from-[#1E5FA0]/20' },
    { bg: 'bg-[#F48120]/20', text: 'text-[#F48120]', gradient: 'from-[#F48120]/20' },
    { bg: 'bg-[#1E5FA0]/20', text: 'text-[#1E5FA0]', gradient: 'from-[#1E5FA0]/20' },
  ];

  return (
    <div
      ref={containerRef}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-gray-900'} overflow-x-hidden relative transition-colors duration-500`}
      style={{ fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}
    >
      {videoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={closeVideoModal}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
            <video src={currentVideo} controls autoPlay className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>
      )}

      {/* ===== Floating Buttons Stack ===== */}
      <div className="fixed bottom-6 left-6 z-[90] flex flex-col gap-3 items-center">
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showFloatingWA ? 1 : 0, scale: showFloatingWA ? 1 : 0, pointerEvents: showFloatingWA ? 'auto' : 'none' }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/40"
        >
          <WhatsAppIcon className="w-7 h-7 text-white" />
        </motion.a>

        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0, pointerEvents: showScrollTop ? 'auto' : 'none' }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all
            ${isDark ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border border-black/10 text-gray-800 hover:bg-black/20'}`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Mesh Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <motion.div style={{ y: parallaxY }} className={`absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full ${isDark ? 'bg-[#1E5FA0]/30' : 'bg-[#1E5FA0]/20'} blur-[120px]`} />
          <motion.div style={{ y: parallaxY }} className={`absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full ${isDark ? 'bg-[#F48120]/20' : 'bg-[#F48120]/15'} blur-[120px]`} />
          <motion.div style={{ y: parallaxY }} className={`absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full ${isDark ? 'bg-[#1E5FA0]/20' : 'bg-[#1E5FA0]/15'} blur-[100px]`} />
        </div>
      </div>

      {/* ===== Navbar ===== */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
      >
        <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border rounded-full px-4 md:px-8 py-3 flex items-center justify-between shadow-2xl`}>
          <motion.img whileHover={{ scale: 1.05 }} src={logoImg} alt="Afaq" className="h-9 md:h-11 w-auto object-contain rounded-xl flex-shrink-0" />

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {[
              { id: 'home', label: t.nav.home },
              { id: 'services', label: t.nav.services },
              { id: 'footer-contact', label: t.nav.contact },
            ].map(({ id, label }) => (
              <motion.button
                key={id}
                onClick={() => scrollToId(id)}
                whileHover={{ scale: 1.05 }}
                className="relative text-sm font-medium transition-colors group px-3 py-1.5 rounded-full"
              >
                <motion.span className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/10'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <span className="relative z-10 group-hover:text-[#1E5FA0] transition-colors">{label}</span>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-black/5 hover:bg-black/10 border-black/10'} border transition-all`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className={`flex items-center gap-2 px-3 py-2 rounded-full ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-black/5 hover:bg-black/10 border-black/10'} border transition-all`}
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              <span className="text-xs font-semibold">{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ===== Hero ===== */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#1E5FA0]/20 to-[#F48120]/20 border ${isDark ? 'border-white/10' : 'border-black/10'}`}
            >
              <span className="text-sm font-semibold">{t.hero.badge}</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[1.1] tracking-tight">
                {t.hero.title}
              </h1>
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-[#1E5FA0] via-[#F48120] to-[#1E5FA0] bg-clip-text pb-4 text-transparent"
                style={{ backgroundSize: '200% auto' }}
              >
                {t.hero.highlight}
              </motion.h2>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto px-4"
            >
              {cards.map((item, index) => (
                <div
                  key={index}
                  className={`relative group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2
                    ${isDark ? 'bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10' : 'bg-black/5 border-black/10 backdrop-blur-md hover:bg-black/10'}`}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>{item.desc}</p>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#1E5FA0] to-[#F48120] transition-all duration-500 group-hover:w-full rounded-b-2xl" />
                </div>
              ))}
            </motion.div>

            {/* CTA button — hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center justify-center pt-4"
            >
              <motion.button
                onClick={() => scrollToId('footer-contact')}
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(244, 129, 32, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-[#F48120] to-[#F48120]/80 text-white rounded-full font-bold text-lg flex items-center gap-3 shadow-xl shadow-[#F48120]/30 cursor-pointer"
              >
                <span>{t.hero.cta}</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto"
            >
              {t.stats.map((stat, i) => (
                <StatCounter key={i} value={stat.number} label={stat.label} isDark={isDark} />
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className={`w-6 h-10 border-2 ${isDark ? 'border-white/20' : 'border-black/20'} rounded-full flex items-start justify-center p-2`}
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }}
              className={`w-1.5 h-1.5 ${isDark ? 'bg-white' : 'bg-black'} rounded-full`}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Services ===== */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-16 text-center"
          >
            {t.services.title}
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((service, i) => (
              <ServiceCard
                key={i}
                title={service.title}
                description={service.description}
                videoUrl={service.videoUrl}
                icon={service.icon}
                color={colors[i]}
                index={i}
                isDark={isDark}
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">{t.cta.title}</h2>
          <p className={`text-xl md:text-2xl ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{t.cta.subtitle}</p>
          {/* ===== Contact Actions ===== */}
          <motion.div
            ref={contactActionsRef}
            id="footer-contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center mb-16"
          >
            {/* Label + two icon-only buttons */}
            <div className={`flex items-center gap-4 px-8 py-4 rounded-full
              ${isDark
                ? 'bg-gradient-to-r from-[#1E5FA0]/20 to-[#F48120]/20 border border-white/10'
                : 'bg-gradient-to-r from-[#1E5FA0]/10 to-[#F48120]/10 border border-black/10'
              }`}
            >
              <span className="font-bold text-xl">{t.footer.contactNow}</span>

              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(37,211,102,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 flex-shrink-0"
                title={t.footer.whatsapp}
              >
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </motion.a>

              <motion.a
                href={PHONE_URL}
                whileHover={{ scale: 1.15, boxShadow: "0 0 20px rgba(30,95,160,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 bg-[#1E5FA0] rounded-full flex items-center justify-center shadow-lg shadow-[#1E5FA0]/30 flex-shrink-0"
                title={t.footer.callUs}
              >
                <Phone className="w-5 h-5 text-white" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== Footer ===== */}
      <footer id="contact" className={`relative py-16 px-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className={`absolute inset-0 backdrop-blur-3xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <FooterVideo videoUrl="videos/go.webm" title={t.footer.videoTitle} isDark={isDark} isRTL={isRTL} />

          

          {/* Footer Grid */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-4">
              <img src={logoImg} alt="Afaq" className="h-14 w-auto object-contain rounded-2xl" />
              <p className={isDark ? 'text-white/50' : 'text-gray-500'}>{t.footer.tagline}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.footer.contact}</h4>
              <div className={`space-y-2 ${isDark ? 'text-white/60' : 'text-gray-600'} text-sm`}>
                <p>{t.footer.location}</p>
                <a href="mailto:info@afaq.sa" className="block hover:text-[#1E5FA0] transition-colors">info@afaq.sa</a>
                <a href={PHONE_URL} className="block hover:text-[#1E5FA0] transition-colors" dir="ltr">+966 50 476 4145</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.nav.services}</h4>
              <div className={`space-y-2 ${isDark ? 'text-white/60' : 'text-gray-600'} text-sm`}>
                {t.services.items.map((s, i) => (
                  <p key={i} className="hover:text-[#1E5FA0] transition-colors cursor-pointer">{s.title}</p>
                ))}
              </div>
            </div>
          </div>

          <div className={`pt-8 border-t ${isDark ? 'border-white/10 text-white/40' : 'border-black/10 text-gray-400'} text-center text-sm`}>
            <p>&copy; 2026 AFAQ. {t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}