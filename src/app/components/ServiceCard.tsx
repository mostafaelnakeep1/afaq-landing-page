import { motion, useInView } from "motion/react";
import { useRef, useEffect } from "react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  videoUrl: string;
  icon: LucideIcon;
  color: {
    bg: string;
    text: string;
    gradient: string;
  };
  index: number;
  isDark: boolean;
  isRTL: boolean;
}

export function ServiceCard({ title, description, videoUrl, icon: Icon, color, index, isDark, isRTL }: ServiceCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {
          // Autoplay prevented, will try again on interaction
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
    >
      <div className={`relative h-full min-h-[450px] rounded-3xl backdrop-blur-xl ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/5 border-black/10 hover:border-black/20'} border transition-all duration-300 overflow-hidden`}>

        {/* Video Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Video Autoplay */}
          <video
            ref={videoRef}
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />

          {/* Dark Overlay */}
          <div className={`absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300`} />

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} to-transparent opacity-30`} />
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

          <h4 className="text-2xl font-bold">{title}</h4>
          <p className={`${isDark ? 'text-white/60' : 'text-gray-600'} leading-relaxed`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
