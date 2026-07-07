import { Link } from 'react-router-dom'
import { GraduationCap, Users, Award, Sparkles, ArrowRight, ShieldCheck, PlayCircle } from 'lucide-react'
import { cmsApi } from '../../../api/cmsApi'
import { useFetch } from '../../../components/useFetch'
import CountUp from '../../../components/CountUp'

const STAT_CARDS = [
  { key: 'Students', Icon: GraduationCap, fallback: '6,500+', label: 'Students', accent: 'from-accent to-orange-600' },
  { key: 'Teachers', Icon: Users, fallback: '350+', label: 'Teachers', accent: 'from-secondary to-emerald-600' },
  { key: 'Board Results', Icon: Award, fallback: '98%', label: 'Board Results', accent: 'from-highlight to-amber-500' },
]

export default function HeroBanner() {
  const { data: stats } = useFetch(cmsApi.getStats, [])

  return (
    <section className="relative overflow-hidden text-white min-h-[88vh] flex items-center bg-primary">
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-105 contrast-110 saturate-110"
        src="/videos/school-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Warm orange-tinted scrim, left side only — right side of the video stays clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/85 via-accent/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/50 via-transparent to-transparent" />

      <div className="absolute top-10 left-10 w-72 h-72 bg-highlight/25 rounded-full blur-3xl" />

      {/* No max-w-7xl/mx-auto here — content hugs the true left edge of the viewport */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 py-20">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 font-subheading font-semibold text-highlight mb-6 uppercase tracking-wider text-xs bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
            <Sparkles size={14} /> Inspiring Minds. Building Futures.
          </p>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] mb-6 tracking-tight">
            Where Academic
            <span className="block bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent">
              Excellence Meets
            </span>
            Digital Innovation
          </h1>

          <p className="font-body text-white/85 mb-8 text-base md:text-lg leading-relaxed">
            CBSE &amp; Cambridge curricula, AI-powered learning analytics, and a
            100% digital campus — educating {statValue(stats, 'Students') || '6,500+'} students
            across EduNova Global Academy.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              to="/admissions"
              className="group inline-flex items-center gap-2 bg-accent hover:bg-orange-600 text-white font-subheading font-bold px-7 py-4 rounded-xl shadow-xl shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Application
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-white/90 font-subheading font-semibold px-2 py-4 hover:text-highlight transition-colors"
            >
              <span className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center group-hover:border-highlight">
                <PlayCircle size={20} />
              </span>
              Learn More
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {STAT_CARDS.map(({ key, Icon, fallback, label, accent }) => (
              <div
                key={key}
                className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full pl-1.5 pr-4 py-1.5"
              >
                <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${accent} flex items-center justify-center shrink-0`}>
                  <Icon size={14} className="text-white" />
                </span>
                <span className="leading-tight">
                  <span className="block font-numbers font-extrabold text-sm">
                    <CountUp value={statValue(stats, key) || fallback} />
                  </span>
                  <span className="block text-[10px] text-white/70 font-body">{label}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70 font-body border-t border-white/15 pt-4">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} className="text-secondary" /> CBSE &amp; Cambridge Accredited
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} className="text-secondary" /> Established 2015
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function statValue(stats, label) {
  return stats?.find((s) => s.label === label)?.value
}