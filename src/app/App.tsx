import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import { Code, Palette, TrendingUp, Languages, ArrowUpRight, ArrowUp, Zap, BarChart3, Sun, Moon, MapPin, Brush, Bot, Camera, Phone, Menu, X, Star, Quote } from "lucide-react";
import logoLight from "../../public/imgs/seedream.jpg";
import logoDark from "../../public/imgs/logo.jpeg";
import { ServiceCard } from "./components/ServiceCard";
import { FooterVideo } from "./components/FooterVideo";

type Language = 'ar' | 'en';
type Theme = 'dark' | 'light';

const PHONE_NUMBER = "966577570217";
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}`;
const PHONE_URL = `tel:+${PHONE_NUMBER}`;
const NAV_OFFSET = 96;



const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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

// ── Infinite Marquee ──────────────────────────────────────────────────────
function ClientsMarquee({ isDark, isRTL }: { isDark: boolean; isRTL: boolean }) {
  const baseLogos = ["/imgs/1.jpg", "/imgs/2.jpg", "/imgs/3.jpg", "/imgs/4.jpg", "/imgs/5.jpg", "/imgs/6.jpg", "/imgs/7.jpg"];
  
  // تكرار المصفوفة 4 مرات (7 * 4 = 28 صورة) لضمان شريط طويل جداً
  const logos = [...baseLogos, ...baseLogos, ...baseLogos, ...baseLogos];
  const direction = isRTL ? 1 : -1;

  return (
    <div className="relative w-full overflow-hidden py-16">
      {/* الشريط الزجاجي (Glassmorphism) */}
      <div className={`absolute inset-y-4 inset-x-0 z-0 border-y backdrop-blur-xl
        ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.03] border-black/10'} 
      `}></div>

      {/* التظليل الجانبي (لإخفاء الدخول والخروج) */}
      <div className={`absolute inset-y-0 left-0 w-48 z-30 pointer-events-none bg-gradient-to-r ${isDark ? 'from-[#050505]' : 'from-white'} to-transparent`} />
      <div className={`absolute inset-y-0 right-0 w-48 z-30 pointer-events-none bg-gradient-to-l ${isDark ? 'from-[#050505]' : 'from-white'} to-transparent`} />

      <div className="relative flex items-center justify-center h-28">
        <motion.div
          className="flex items-center gap-16 px-8"
          style={{ width: 'max-content' }}
          animate={{ 
            // التحريك بمقدار بكسلات ثابتة (مثلاً عرض 7 صور + المسافات بينهم)
            x: direction === -1 ? [0, -1400] : [-1400, 0] 
          }}
          transition={{
            duration: 25, // سرعة هادئة
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {logos.map((src, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 flex items-center justify-center w-32 h-20" // مساحة ثابتة للوجو
            >
              <img
                src={src}
                alt="client"
                className={`max-h-full max-w-full object-contain rounded-xl transition-all duration-500
                  ${isDark ? 'opacity-60 hover:opacity-100 brightness-110' : 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}
                  hover:scale-110`}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
// ── Testimonial Card ──────────────────────────────────────────────────────
function TestimonialCard({ name, role, text, rating, isDark, delay }: {
  name: string; role: string; text: string; rating: number; isDark: boolean; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`relative p-7 rounded-3xl border flex flex-col gap-4 group
        ${isDark
          ? 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
          : 'bg-black/4 border-black/8 hover:bg-black/8 hover:border-black/15'
        } backdrop-blur-sm transition-all duration-300`}
    >
      {/* Quote icon */}
      <div className="absolute top-5 right-5 opacity-15 group-hover:opacity-30 transition-opacity">
        <Quote className="w-10 h-10 text-[#F48120]" />
      </div>

      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#F48120] text-[#F48120]" />
        ))}
      </div>

      <p className={`text-sm leading-relaxed flex-1 ${isDark ? 'text-white/75' : 'text-gray-600'}`}>"{text}"</p>

      <div className="flex items-center gap-3 pt-2 border-t border-white/10">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E5FA0] to-[#F48120] flex items-center justify-center font-black text-white text-lg flex-shrink-0">
          {name[0]}
        </div>
        <div>
          <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{name}</p>
          <p className={`text-xs ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>('dark');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string>('');
  const [showFloatingWA, setShowFloatingWA] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contactActionsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const isDark = theme === 'dark';
  const isRTL = lang === 'ar';
  const logoImg = isDark ? logoDark : logoLight;

  // ── SEO meta tags ──────────────────────────────────────────────────────
  useEffect(() => {
    document.title = lang === 'ar'
      ? 'آفاق | وكالة تقنية رائدة في الرياض'
      : 'Afaq | Leading Tech Agency in Riyadh';

    // Favicon
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = logoImg;

    // Description
    let desc = document.querySelector("meta[name='description']") as HTMLMetaElement | null;
    if (!desc) { desc = document.createElement('meta'); desc.name = 'description'; document.head.appendChild(desc); }
    desc.content = lang === 'ar'
      ? 'آفاق وكالة تقنية رائدة في الرياض تقدم خدمات البرمجة، التصميم، التسويق الرقمي، الذكاء الاصطناعي، والأتمتة. نفتح لك آفاق جديدة في عالم التقنية.'
      : 'Afaq is a leading tech agency in Riyadh offering software engineering, design, digital marketing, AI chatbots, and automation solutions.';

    // Keywords
    let kw = document.querySelector("meta[name='keywords']") as HTMLMetaElement | null;
    if (!kw) { kw = document.createElement('meta'); kw.name = 'keywords'; document.head.appendChild(kw); }
    kw.content = lang === 'ar'
      ? 'وكالة تقنية, برمجة, تصميم مواقع, تسويق رقمي, ذكاء اصطناعي, أتمتة, الرياض, السعودية, تطبيقات, هوية بصرية'
      : 'tech agency, software development, web design, digital marketing, AI, automation, Riyadh, Saudi Arabia';

    // OG
    const setMeta = (prop: string, val: string) => {
      let el = document.querySelector(`meta[property='${prop}']`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el); }
      el.content = val;
    };
    setMeta('og:title', document.title);
    setMeta('og:description', desc.content);
    setMeta('og:type', 'website');
    setMeta('og:locale', lang === 'ar' ? 'ar_SA' : 'en_US');

    // Lang
    document.documentElement.lang = lang;
  }, [lang, logoImg]);

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

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
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
      nav: { home: "الرئيسية", services: "خدماتنا", about: "من نحن", testimonials: "آراء العملاء", contact: "تواصل" },
      hero: { badge: "آفاق ... وكالة تقنية رائدة", title: "نفتح لك آفاق جديدة", highlight: "في عالم التقنية", cta: "تواصل معنا الآن" },
      stats: [
        { number: "200+", label: "مشروع منجز" },
        { number: "95%", label: "رضا العملاء" },
        { number: "5+", label: "سنوات خبرة" },
      ],
      about: {
        title: "من نحن",
        subtitle: "نحن آفاق",
        description: "وكالة تقنية سعودية متكاملة تأسست في الرياض بشغف حقيقي نحو الابتكار الرقمي. نؤمن بأن التقنية ليست مجرد أداة، بل هي الجسر الذي يوصل رؤيتك إلى واقع ملموس.",
        mission: "مهمتنا",
        missionText: "تمكين الشركات السعودية والعربية من الريادة في العصر الرقمي، من خلال حلول تقنية مبتكرة تجمع بين الجمال البصري والكفاءة الوظيفية.",
        vision: "رؤيتنا",
        visionText: "أن نكون الشريك التقني الأول الذي يختاره كل رائد أعمال يسعى للتميز والنمو المستدام في السوق السعودي والخليجي.",
        values: [
          { icon: "🚀", title: "الابتكار", desc: "نفكر خارج الصندوق ونقدم حلولاً لم تخطر على بالك" },
          { icon: "💎", title: "الجودة", desc: "كل تفصيلة نصنعها تعكس معيار احترافي لا تنازل عنه" },
          { icon: "🤝", title: "الشراكة", desc: "نجاحك هو نجاحنا، ونلتزم بك في كل خطوة من رحلتك" },
          { icon: "⚡", title: "السرعة", desc: "نسلّم في الوقت المحدد دون المساس بجودة الإنجاز" },
        ],
        team: "فريقنا",
        teamDesc: "نخبة من المطورين والمصممين ومتخصصي التسويق الذين يجمعهم شغف واحد: بناء مستقبل رقمي أفضل للمملكة.",
      },
      testimonials: {
        title: "ماذا يقول عملاؤنا",
        subtitle: "ثقتهم هي شهادتنا الحقيقية",
        items: [
          { name: "أحمد العمري", role: "مدير تنفيذي، شركة الفجر", text: "آفاق غيّرت مفهومي عن الوكالات التقنية. فريق محترف، تسليم في الوقت، ونتائج تفوق التوقعات بمراحل.", rating: 5 },
          { name: "سارة الزهراني", role: "مؤسسة متجر إلكتروني", text: "الهوية البصرية التي صمّموها لمتجري جعلته مميزاً بين المنافسين. عملاؤنا دائماً يسألون: من صمّم لكم؟", rating: 5 },
          { name: "محمد الشمري", role: "رائد أعمال", text: "نظام الأتمتة الذي طوّروه لنا وفّر علينا أكثر من 30 ساعة عمل أسبوعياً. استثمار حقيقي يستحق كل ريال.", rating: 5 },
          { name: "نورة القحطاني", role: "مديرة تسويق", text: "الحملات الرقمية التي أطلقوها ضاعفت مبيعاتنا خلال ثلاثة أشهر فقط. أرقام حقيقية لا كلام.", rating: 5 },
          { name: "خالد السبيعي", role: "مدير عمليات", text: "نظام التتبع الميداني أعطانا رؤية كاملة على فريقنا. وفّر علينا تكاليف تشغيلية كبيرة وحسّن رضا عملائنا.", rating: 5 },
          { name: "ريم العسيري", role: "صاحبة علامة تجارية", text: "تعاملت مع عدة وكالات قبل آفاق. الفرق شاسع في الاحترافية والفهم الحقيقي لاحتياجات عملي.", rating: 5 },
        ],
      },
      clients: { title: "عملاؤنا", subtitle: "شركاء النجاح" },
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
      nav: { home: "Home", services: "Services", about: "About", testimonials: "Reviews", contact: "Contact" },
      hero: { badge: "Leading Tech Agency", title: "Opening New Horizons", highlight: "In Technology", cta: "Contact Us Now" },
      stats: [
        { number: "200+", label: "Projects Done" },
        { number: "95%", label: "Client Satisfaction" },
        { number: "5+", label: "Years Experience" },
      ],
      about: {
        title: "About Us",
        subtitle: "We Are Afaq",
        description: "A full-service Saudi tech agency founded in Riyadh with a genuine passion for digital innovation. We believe technology is not just a tool — it's the bridge that turns your vision into tangible reality.",
        mission: "Our Mission",
        missionText: "Empowering Saudi and Arab businesses to lead in the digital age through innovative tech solutions that combine visual beauty with functional excellence.",
        vision: "Our Vision",
        visionText: "To become the first-choice tech partner for every entrepreneur seeking distinction and sustainable growth in the Saudi and Gulf markets.",
        values: [
          { icon: "🚀", title: "Innovation", desc: "We think outside the box and deliver solutions you haven't imagined yet" },
          { icon: "💎", title: "Quality", desc: "Every detail we craft reflects an uncompromising professional standard" },
          { icon: "🤝", title: "Partnership", desc: "Your success is our success — we stay committed every step of the way" },
          { icon: "⚡", title: "Speed", desc: "We deliver on time without compromising on the quality of execution" },
        ],
        team: "Our Team",
        teamDesc: "An elite squad of developers, designers, and marketing specialists united by one passion: building a better digital future for the Kingdom.",
      },
      testimonials: {
        title: "What Our Clients Say",
        subtitle: "Their trust is our true credential",
        items: [
          { name: "Ahmed Al-Omari", role: "CEO, Al-Fajr Company", text: "Afaq changed my whole perspective on tech agencies. Professional team, on-time delivery, and results that far exceed expectations.", rating: 5 },
          { name: "Sara Al-Zahrani", role: "E-commerce Founder", text: "The visual identity they designed for my store made it stand out among competitors. Customers always ask: who designed this for you?", rating: 5 },
          { name: "Mohammed Al-Shamri", role: "Entrepreneur", text: "The automation system they built saves us over 30 working hours weekly. A real investment worth every riyal.", rating: 5 },
          { name: "Noura Al-Qahtani", role: "Marketing Director", text: "The digital campaigns they launched doubled our sales within just three months. Real numbers, not just talk.", rating: 5 },
          { name: "Khalid Al-Subaie", role: "Operations Manager", text: "The field tracking system gave us complete visibility over our team, saving significant operational costs and improving customer satisfaction.", rating: 5 },
          { name: "Reem Al-Asiri", role: "Brand Owner", text: "I worked with several agencies before Afaq. The gap in professionalism and genuine understanding of business needs is enormous.", rating: 5 },
        ],
      },
      clients: { title: "Our Clients", subtitle: "Partners in Success" },
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
  const cards = featureCards[lang];

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'about', label: t.nav.about },
    { id: 'testimonials', label: t.nav.testimonials },
    { id: 'footer-contact', label: t.nav.contact },
  ];

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
      {/* ── Video Modal ───────────────────────────────────────────────── */}
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

      {/* ── Floating Buttons ─────────────────────────────────────────── */}
      <div className="fixed bottom-6 left-6 z-[90] flex flex-col gap-3 items-center">
        <motion.a
          href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showFloatingWA ? 1 : 0, scale: showFloatingWA ? 1 : 0, pointerEvents: showFloatingWA ? 'auto' : 'none' }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/40"
        >
          <WhatsAppIcon className="w-7 h-7 text-white" />
        </motion.a>
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0, pointerEvents: showScrollTop ? 'auto' : 'none' }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all
            ${isDark ? 'bg-white/10 border border-white/20 text-white hover:bg-white/20' : 'bg-black/10 border border-black/10 text-gray-800 hover:bg-black/20'}`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      </div>

      {/* ── Mesh Gradient ────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <motion.div style={{ y: parallaxY }} className={`absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full ${isDark ? 'bg-[#1E5FA0]/30' : 'bg-[#1E5FA0]/20'} blur-[120px]`} />
          <motion.div style={{ y: parallaxY }} className={`absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full ${isDark ? 'bg-[#F48120]/20' : 'bg-[#F48120]/15'} blur-[120px]`} />
          <motion.div style={{ y: parallaxY }} className={`absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full ${isDark ? 'bg-[#1E5FA0]/20' : 'bg-[#1E5FA0]/15'} blur-[100px]`} />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
      >
        <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border rounded-full px-4 md:px-8 py-3 flex items-center justify-between shadow-2xl`}>
          <motion.img whileHover={{ scale: 1.05 }} src={logoImg} alt="Afaq" className="h-9 md:h-11 w-auto object-contain rounded-xl flex-shrink-0" />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map(({ id, label }) => (
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

          {/* Controls + Mobile hamburger */}
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

            {/* Hamburger — mobile only */}
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden flex items-center justify-center w-9 h-9 rounded-full ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-black/5 hover:bg-black/10 border-black/10'} border transition-all`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className={`mt-3 mx-auto w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl border backdrop-blur-2xl
                ${isDark ? 'bg-[#0a0a0a]/95 border-white/10' : 'bg-white/95 border-black/10'}`}
            >
              <div className="flex flex-col py-3">
                {navItems.map(({ id, label }, idx) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    onClick={() => { scrollToId(id); setMobileMenuOpen(false); }}
                    className={`px-6 py-3.5 text-right font-semibold text-sm transition-all
                      ${isDark ? 'hover:bg-white/8 hover:text-[#F48120]' : 'hover:bg-black/5 hover:text-[#1E5FA0]'}`}
                    style={{ textAlign: isRTL ? 'right' : 'left' }}
                  >
                    {label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
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

            {/* CTA button */}
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

      {/* ══════════════════════════════════════════════════════════════
          ABOUT US
      ══════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 relative overflow-hidden">
        {/* Subtle section background glow */}
        <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-b from-transparent via-[#1E5FA0]/5 to-transparent' : 'bg-gradient-to-b from-transparent via-[#1E5FA0]/3 to-transparent'}`} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-gradient-to-r from-[#1E5FA0]/20 to-[#F48120]/20 border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <span className="text-sm font-semibold text-[#F48120]">{t.about.title}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6">{t.about.subtitle}</h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
              {t.about.description}
            </p>
          </motion.div>

          {/* Mission + Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {[
              { label: t.about.mission, text: t.about.missionText, icon: "🎯", accent: '#1E5FA0' },
              { label: t.about.vision, text: t.about.visionText, icon: "🌟", accent: '#F48120' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className={`relative p-8 rounded-3xl border overflow-hidden group
                  ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/4 border-black/10'}`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${item.accent}15, transparent 60%)` }}
                />
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="text-2xl font-black mb-4" style={{ color: item.accent }}>{item.label}</h3>
                <p className={`leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20"
          >
            {t.about.values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl text-center border transition-all
                  ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/8' : 'bg-black/4 border-black/8 hover:bg-black/7'}`}
              >
                <div className="text-4xl mb-3">{val.icon}</div>
                <h4 className="font-bold mb-2 text-[#F48120]">{val.title}</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Team Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-center"
            style={{ background: 'linear-gradient(135deg, #1E5FA0 0%, #0a3060 40%, #F48120 100%)' }}
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">{t.about.team}</h3>
            <p className="text-white/85 text-lg max-w-2xl mx-auto relative z-10 leading-relaxed">{t.about.teamDesc}</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
        <div className={`absolute inset-0 pointer-events-none ${isDark ? 'bg-gradient-to-b from-transparent via-[#F48120]/4 to-transparent' : 'bg-gradient-to-b from-transparent via-[#F48120]/3 to-transparent'}`} />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-gradient-to-r from-[#F48120]/20 to-[#1E5FA0]/20 border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <Star className="w-4 h-4 text-[#F48120] fill-[#F48120]" />
              <span className="text-sm font-semibold text-[#F48120]">{t.testimonials.subtitle}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black">{t.testimonials.title}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.testimonials.items.map((item, i) => (
              <TestimonialCard
                key={i}
                name={item.name}
                role={item.role}
                text={item.text}
                rating={item.rating}
                isDark={isDark}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CLIENTS MARQUEE
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 overflow-hidden"> {/* أضفنا overflow-hidden لمنع ظهور الشريط الجانبي */}
  <div className="max-w-7xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-gradient-to-r from-[#1E5FA0]/20 to-[#F48120]/20 border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <span className="text-sm font-semibold">{t.clients.subtitle}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-black">{t.clients.title}</h2>
    </motion.div>
  </div>

  {/* شريط اللوجوهات المنساب */}
  <ClientsMarquee isDark={isDark} isRTL={isRTL} />
</section>

      {/* ══════════════════════════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">{t.cta.title}</h2>
          <p className={`text-xl md:text-2xl ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{t.cta.subtitle}</p>

          {/* Contact Actions */}
          <motion.div
            ref={contactActionsRef}
            id="footer-contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center mb-16"
          >
            <div className={`flex items-center gap-4 px-8 py-4 rounded-full
              ${isDark
                ? 'bg-gradient-to-r from-[#1E5FA0]/20 to-[#F48120]/20 border border-white/10'
                : 'bg-gradient-to-r from-[#1E5FA0]/10 to-[#F48120]/10 border border-black/10'
              }`}
            >
              <span className="font-bold text-xl">{t.footer.contactNow}</span>
              <motion.a
                href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
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

      {/* ══════════════════════════════════════════════════════════════
          FOOTER  — background image: seedream.jpg
      ══════════════════════════════════════════════════════════════ */}
      <footer id="contact" className="relative py-16 px-6 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('imgs/seedream.jpg')` }}
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#050505]/82 backdrop-blur-sm" />

        {/* Top border shimmer */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E5FA0] to-[#F48120]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <FooterVideo videoUrl="videos/go.webm" title={t.footer.videoTitle} isDark={true} isRTL={isRTL} />

          {/* Footer Grid */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <img src={logoDark} alt="Afaq" className="h-14 w-auto object-contain rounded-2xl" />
              <p className="text-white/65 text-sm leading-relaxed">{t.footer.tagline}</p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4 text-white text-lg border-b border-white/15 pb-3">{t.footer.contact}</h4>
              <div className="space-y-2.5 text-white/70 text-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F48120] flex-shrink-0" />
                  {t.footer.location}
                </p>
                <a href="mailto:info@afaq.sa" className="block hover:text-[#F48120] transition-colors">info@afaq.sa</a>
                <a href={PHONE_URL} className="block hover:text-[#F48120] transition-colors" dir="ltr">+966 50 476 4145</a>
              </div>
            </div>

            {/* Services list */}
            <div>
              <h4 className="font-bold mb-4 text-white text-lg border-b border-white/15 pb-3">{t.nav.services}</h4>
              <div className="space-y-1.5 text-white/65 text-sm">
                {t.services.items.map((s, i) => (
                  <p key={i} className="hover:text-[#F48120] transition-colors cursor-pointer leading-snug">{s.title}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 text-center text-sm text-white/40">
            <p>&copy; 2026 AFAQ. {t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}