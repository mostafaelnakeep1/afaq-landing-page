import { motion, useScroll, useTransform } from "motion/react";
import { Code, Palette, TrendingUp, Globe, Languages, ArrowUpRight, Sparkles, Play, Zap, BarChart3, Sun, Moon } from "lucide-react";
import { useState, useRef } from "react";
import logoImg from "../imports/seedream-4.0_A_high-end_ultra-minimalist_3D_background_for_a_website_footer._A_dark_sleek_sur-0.jpg";

type Language = 'ar' | 'en';
type Theme = 'dark' | 'light';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>('dark');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const isDark = theme === 'dark';

  const content = {
    ar: {
      nav: {
        home: "الرئيسية",
        services: "خدماتنا",
        contact: "تواصل"
      },
      hero: {
        badge: "وكالة تقنية رائدة",
        title: "نفتح لك آفاق جديدة",
        highlight: "في عالم التقنية",
        description: "نحول أفكارك إلى منتجات رقمية استثنائية",
        cta: "ابدأ مشروعك",
        watchVideo: "شاهد الفيديو"
      },
      stats: [
        { number: "200+", label: "مشروع منجز" },
        { number: "95%", label: "رضا العملاء" },
        { number: "5+", label: "سنوات خبرة" }
      ],
      services: {
        title: "مجالاتنا",
        items: [
          {
            title: "البرمجة",
            description: "تطوير تطبيقات الجوال ومواقع الويب باستخدام أحدث التقنيات العالمية",
            icon: Code,
            videoUrl: "/videos/coding.webm"
          },
          {
            title: "الأتمتة",
            description: "حلول أتمتة ذكية تحسن كفاءة الأعمال وتوفر الوقت والجهد",
            icon: Zap,
            videoUrl: "/videos/automation.webm"
          },
          {
            title: "التصميمات",
            description: "تصاميم إبداعية وعصرية تجمع بين الجمال والوظيفة",
            icon: Palette,
            videoUrl: "/videos/design.webm"
          },
          {
            title: "الإعلانات الممولة",
            description: "حملات إعلانية احترافية بعائد استثمار مضمون",
            icon: TrendingUp,
            videoUrl: "/videos/marketing.webm"
          },
          {
            title: "التسويق الرقمي",
            description: "استراتيجيات تسويقية شاملة لتعزيز حضورك الرقمي",
            icon: Globe,
            videoUrl: "/videos/design.webm"
          },
          {
            title: "تحليل البيانات",
            description: "تحليلات متقدمة تساعدك على اتخاذ قرارات مبنية على البيانات",
            icon: BarChart3,
            videoUrl: "/videos/coding.webm"
          }
        ]
      },
      cta: {
        title: "جاهز لبدء مشروعك القادم؟",
        subtitle: "دعنا نحول رؤيتك إلى واقع رقمي",
        button: "تواصل معنا الآن"
      },
      footer: {
        tagline: "نفتح لك آفاق جديدة",
        videoTitle: "شاهد قصة نجاحنا",
        contact: "تواصل معنا",
        location: "الرياض، السعودية",
        copyright: "جميع الحقوق محفوظة"
      }
    },
    en: {
      nav: {
        home: "Home",
        services: "Services",
        contact: "Contact"
      },
      hero: {
        badge: "Leading Tech Agency",
        title: "Opening New Horizons",
        highlight: "In Technology",
        description: "Transforming ideas into exceptional digital products",
        cta: "Start Your Project",
        watchVideo: "Watch Video"
      },
      stats: [
        { number: "200+", label: "Projects Done" },
        { number: "95%", label: "Client Satisfaction" },
        { number: "5+", label: "Years Experience" }
      ],
      services: {
        title: "Our Services",
        items: [
          {
            title: "Programming",
            description: "Mobile and web application development using cutting-edge global technologies",
            icon: Code,
            videoUrl: "/videos/coding.webm"
          },
          {
            title: "Automation",
            description: "Smart automation solutions that improve business efficiency and save time",
            icon: Zap,
            videoUrl: "/videos/automation.webm"
          },
          {
            title: "Design",
            description: "Creative modern designs combining beauty with functionality",
            icon: Palette,
            videoUrl: "/videos/design.webm"
          },
          {
            title: "Paid Advertising",
            description: "Professional ad campaigns with guaranteed ROI",
            icon: TrendingUp,
            videoUrl: "/videos/marketing.webm"
          },
          {
            title: "Digital Marketing",
            description: "Comprehensive marketing strategies to boost your digital presence",
            icon: Globe,
            videoUrl: "/videos/marketing.webm"
          },
          {
            title: "Data Analysis",
            description: "Advanced analytics to help you make data-driven decisions",
            icon: BarChart3,
            videoUrl: "/videos/coding.webm"
          }
        ]
      },
      cta: {
        title: "Ready to Start Your Next Project?",
        subtitle: "Let's transform your vision into digital reality",
        button: "Contact Us Now"
      },
      footer: {
        tagline: "Opening New Horizons",
        videoTitle: "Watch Our Success Story",
        contact: "Contact Us",
        location: "Riyadh, Saudi Arabia",
        copyright: "All Rights Reserved"
      }
    }
  };

  const t = content[lang];
  const isRTL = lang === 'ar';

  return (
    <div
      ref={containerRef}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-gray-900'} overflow-x-hidden relative transition-colors duration-500`}
      style={{ fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}
    >
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <motion.div
            style={{ y: parallaxY }}
            className={`absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full ${isDark ? 'bg-[#1E5FA0]/30' : 'bg-[#1E5FA0]/20'} blur-[120px]`}
          />
          <motion.div
            style={{ y: parallaxY }}
            className={`absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full ${isDark ? 'bg-[#F48120]/20' : 'bg-[#F48120]/15'} blur-[120px]`}
          />
          <motion.div
            style={{ y: parallaxY }}
            className={`absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full ${isDark ? 'bg-[#1E5FA0]/20' : 'bg-[#1E5FA0]/15'} blur-[100px]`}
          />
        </div>
      </div>

      {/* Floating Nav */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
      >
        <div className={`backdrop-blur-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border rounded-full px-6 md:px-8 py-4 flex items-center justify-between shadow-2xl`}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={logoImg}
            alt="Afaq"
            className="h-10 md:h-12 w-auto object-contain"
          />

          <div className="hidden md:flex items-center gap-8">
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className={`relative text-sm font-medium transition-colors group px-3 py-1.5 rounded-full`}
            >
              <motion.span
                className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/10'} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <span className={`relative z-10 ${isDark ? 'group-hover:text-[#1E5FA0]' : 'group-hover:text-[#1E5FA0]'}`}>
                {t.nav.home}
              </span>
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              className={`relative text-sm font-medium transition-colors group px-3 py-1.5 rounded-full`}
            >
              <motion.span
                className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/10'} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <span className={`relative z-10 ${isDark ? 'group-hover:text-[#1E5FA0]' : 'group-hover:text-[#1E5FA0]'}`}>
                {t.nav.services}
              </span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className={`relative text-sm font-medium transition-colors group px-3 py-1.5 rounded-full`}
            >
              <motion.span
                className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/10'} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <span className={`relative z-10 ${isDark ? 'group-hover:text-[#1E5FA0]' : 'group-hover:text-[#1E5FA0]'}`}>
                {t.nav.contact}
              </span>
            </motion.a>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-black/5 hover:bg-black/10 border-black/10'} border transition-all`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-black/5 hover:bg-black/10 border-black/10'} border transition-all`}
            >
              <Languages className="w-4 h-4" />
              <span className="text-xs font-semibold">{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#1E5FA0]/20 to-[#F48120]/20 border ${isDark ? 'border-white/10' : 'border-black/10'}`}
            >
              <Sparkles className="w-4 h-4 text-[#F48120]" />
              <span className="text-sm font-semibold">{t.hero.badge}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[1.1] tracking-tight">
                {t.hero.title}
              </h1>
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-[#1E5FA0] via-[#F48120] to-[#1E5FA0] bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto' }}
              >
                {t.hero.highlight}
              </motion.h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`text-xl md:text-2xl ${isDark ? 'text-white/60' : 'text-gray-600'} max-w-3xl mx-auto`}
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(244, 129, 32, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-gradient-to-r from-[#F48120] to-[#F48120]/80 text-white rounded-full font-bold text-lg flex items-center gap-3 shadow-xl shadow-[#F48120]/30"
              >
                <span>{t.hero.cta}</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-10 py-5 ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'} backdrop-blur-xl border rounded-full font-bold text-lg flex items-center gap-3 transition-all`}
              >
                <Play className="w-5 h-5" />
                <span>{t.hero.watchVideo}</span>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto"
            >
              {t.stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-5xl font-black bg-gradient-to-r from-[#1E5FA0] to-[#F48120] bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className={`text-sm md:text-base ${isDark ? 'text-white/50' : 'text-gray-500'} mt-2`}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`w-6 h-10 border-2 ${isDark ? 'border-white/20' : 'border-black/20'} rounded-full flex items-start justify-center p-2`}
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-1.5 h-1.5 ${isDark ? 'bg-white' : 'bg-black'} rounded-full`}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid - All Equal */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-16 text-center"
          >
            {t.services.title}
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((service, i) => {
              const Icon = service.icon;
              const colors = [
                { bg: 'bg-[#1E5FA0]/20', text: 'text-[#1E5FA0]', gradient: 'from-[#1E5FA0]/20' },
                { bg: 'bg-[#F48120]/20', text: 'text-[#F48120]', gradient: 'from-[#F48120]/20' },
                { bg: 'bg-[#1E5FA0]/20', text: 'text-[#1E5FA0]', gradient: 'from-[#1E5FA0]/20' },
                { bg: 'bg-[#F48120]/20', text: 'text-[#F48120]', gradient: 'from-[#F48120]/20' },
                { bg: 'bg-[#1E5FA0]/20', text: 'text-[#1E5FA0]', gradient: 'from-[#1E5FA0]/20' },
                { bg: 'bg-[#F48120]/20', text: 'text-[#F48120]', gradient: 'from-[#F48120]/20' }
              ];
              const color = colors[i];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative"
                >
                  <div className={`relative h-full min-h-[450px] rounded-3xl backdrop-blur-xl ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/5 border-black/10 hover:border-black/20'} border transition-all duration-300 overflow-hidden`}>

                    {/* Video Container */}
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} to-transparent`} />

                      {/* Video Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(30, 95, 160, 0.4)",
                              "0 0 0 15px rgba(30, 95, 160, 0)",
                              "0 0 0 0 rgba(30, 95, 160, 0)",
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`w-16 h-16 rounded-full bg-gradient-to-br from-[#1E5FA0] to-[#F48120] flex items-center justify-center shadow-2xl cursor-pointer`}
                        >
                          <Play className="w-6 h-6 text-white fill-white" style={{ marginLeft: isRTL ? 0 : '3px', marginRight: isRTL ? '3px' : 0 }} />
                        </motion.button>
                      </div>

                      {/* Animated Particles */}
                      {[...Array(4)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          className={`absolute w-2 h-2 rounded-full ${color.bg} blur-sm`}
                          animate={{
                            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{
                            duration: 4 + idx,
                            repeat: Infinity,
                            delay: idx * 0.5
                          }}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-16 h-16 rounded-2xl ${color.bg} flex items-center justify-center`}
                      >
                        <Icon className={`w-8 h-8 ${color.text}`} />
                      </motion.div>

                      <h4 className="text-2xl font-bold">{service.title}</h4>
                      <p className={`${isDark ? 'text-white/60' : 'text-gray-600'} leading-relaxed`}>
                        {service.description}
                      </p>

                      {/* Video URL Comment */}
                      <div className={`text-xs ${isDark ? 'text-white/30' : 'text-gray-400'} pt-2 font-mono`}>
                        {service.videoUrl}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            {t.cta.title}
          </h2>
          <p className={`text-xl md:text-2xl ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
            {t.cta.subtitle}
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(244, 129, 32, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-gradient-to-r from-[#F48120] to-[#F48120]/80 text-white rounded-full font-bold text-xl shadow-2xl shadow-[#F48120]/40 inline-flex items-center gap-3"
          >
            <span>{t.cta.button}</span>
            <ArrowUpRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </section>

      {/* Glass Footer with Video */}
      <footer id="contact" className={`relative py-16 px-6 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        <div className={`absolute inset-0 backdrop-blur-3xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Footer Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">{t.footer.videoTitle}</h3>
            <div className="max-w-3xl mx-auto">
              <div className={`relative aspect-video rounded-3xl overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border backdrop-blur-xl`}>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(30, 95, 160, 0.5)",
                        "0 0 0 25px rgba(30, 95, 160, 0)",
                        "0 0 0 0 rgba(30, 95, 160, 0)",
                      ]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1E5FA0] to-[#F48120] flex items-center justify-center shadow-2xl cursor-pointer"
                  >
                    <Play className="w-10 h-10 text-white fill-white" style={{ marginLeft: isRTL ? 0 : '4px', marginRight: isRTL ? '4px' : 0 }} />
                  </motion.button>
                </div>
                <div className={`text-xs ${isDark ? 'text-white/30' : 'text-gray-400'} absolute bottom-4 left-1/2 -translate-x-1/2 font-mono`}>
                  YOUR_FOOTER_VIDEO_URL_HERE
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="space-y-4">
              <img src={logoImg} alt="Afaq" className="h-14 w-auto object-contain" />
              <p className={isDark ? 'text-white/50' : 'text-gray-500'}>{t.footer.tagline}</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">{t.footer.contact}</h4>
              <div className={`space-y-2 ${isDark ? 'text-white/60' : 'text-gray-600'} text-sm`}>
                <p>{t.footer.location}</p>
                <p>info@afaq.sa</p>
                <p>+966 XX XXX XXXX</p>
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