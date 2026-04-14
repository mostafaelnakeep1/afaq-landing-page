import { motion, useInView } from "motion/react";
import { useRef, useEffect } from "react";

interface FooterVideoProps {
  videoUrl: string;
  title: string;
  isDark: boolean;
  isRTL: boolean;
}

export function FooterVideo({ videoUrl, title, isDark, isRTL }: FooterVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

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
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12 text-center"
    >
      <h3 className="text-2xl md:text-3xl font-bold mb-6">{title}</h3>
      <div className="max-w-3xl mx-auto">
        <div className={`relative aspect-video rounded-3xl overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border backdrop-blur-xl group`}>

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
        </div>
      </div>
    </motion.div>
  );
}
