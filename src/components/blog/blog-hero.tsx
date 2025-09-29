'use client'

import { Badge } from "@/components/ui/badge"
import { FileText, Users, Target } from "lucide-react"

export default function BlogHero() {
  return (
    <section className="bg-gradient-to-br from-[#0a1728] via-[#0f2640] to-[#1a3a5c] text-white pt-20 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#001122]/80 via-[#003366]/60 to-[#004488]/40 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
          <div className="mb-6 animate-fade-in-scale">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30 mb-6">
              Steel Motion Insights
            </Badge>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up-delay-1">
            Technology Insights from
            <span className="block text-[#00F2FF]">Veteran Leaders</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay-2">
            Discover practical insights on AI transformation, cybersecurity, cloud infrastructure,
            and technology leadership from our experienced veteran team.
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up-delay-3">
            <div className="text-center">
              <FileText className="w-8 h-8 text-[#00F2FF] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-white/80">Technical Articles</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-[#00F2FF] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">10+</div>
              <div className="text-sm text-white/80">Veteran Authors</div>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-[#00F2FF] mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-sm text-white/80">Core Topics</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-1 {
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-2 {
          animation: fadeInUp 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-fade-in-up-delay-3 {
          animation: fadeInUp 0.8s ease-out 0.8s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}