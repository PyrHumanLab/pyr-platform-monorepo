// /web/components/login/FeatureList.tsx - COMPLETE REPLACEMENT FILE

'use client'

import { BrainCircuit, BookOpen, Drama, Microscope } from 'lucide-react'

// The 'group' class is essential for the hover effects on children
const FeatureItem = ({ icon, title, delay }: { icon: React.ReactNode, title: string, delay: string }) => (
  <a href="#" className="group flex items-start gap-4 p-4 -m-4 rounded-lg transition-colors duration-300 hover:bg-white/5">
    <div 
      className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-flame/10 transition-all duration-300 group-hover:bg-flame/20 group-hover:scale-110"
      style={{ animationDelay: delay }}
    >
      {icon}
    </div>
    <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: delay }}>
      <h4 className="font-semibold text-text-primary">{title}</h4>
      <p className="text-sm text-text-secondary mt-1">
        {
          title === 'AI Tutor' ? "Personalized guidance as you learn complex historical concepts." :
          title === 'Full Immersion' ? "Experience ancient sites with immersive audio and video." :
          title === 'Narrative History' ? "History as the greatest story, alive with heroes and villains." :
          "Practical wisdom from the past, timeless principles for today."
        }
      </p>
    </div>
  </a>
)

export default function FeatureList() {
  return (
    <div className="w-full max-w-lg text-center lg:text-left">
      <h1 
        className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white opacity-0 animate-fade-in-up"
        style={{ animationDelay: '100ms' }}
      >
        <span className="block">Explore the</span>
        <span className="block bg-gradient-flame bg-clip-text text-transparent">Epic Journey</span>
      </h1>
      <p 
        className="mt-4 text-lg text-text-secondary opacity-0 animate-fade-in-up"
        style={{ animationDelay: '200ms' }}
      >
        Dive into history as a laboratory of human experience. Learn from the triumphs and failures of our ancestors to better understand our world today.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mt-10">
        <FeatureItem delay="300ms" icon={<BrainCircuit className="w-6 h-6 text-flame" />} title="AI Tutor" />
        <FeatureItem delay="400ms" icon={<Microscope className="w-6 h-6 text-flame" />} title="Full Immersion" />
        <FeatureItem delay="500ms" icon={<BookOpen className="w-6 h-6 text-flame" />} title="Narrative History" />
        <FeatureItem delay="600ms" icon={<Drama className="w-6 h-6 text-flame" />} title="Human Flourishing" />
      </div>

      <div 
        className="mt-12 flex items-center justify-center lg:justify-start gap-4 opacity-0 animate-fade-in-up"
        style={{ animationDelay: '700ms' }}
      >
        <div className="flex -space-x-4 group">
          <div className="w-10 h-10 rounded-full bg-red-200 text-red-800 border-2 border-lab-blue flex items-center justify-center font-bold text-sm transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:-translate-y-1 group-hover:rotate-[-10deg]">AB</div>
          <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-800 border-2 border-lab-blue flex items-center justify-center font-bold text-sm transition-transform duration-300 ease-out delay-75 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-[-5deg]">CD</div>
          <div className="w-10 h-10 rounded-full bg-green-200 text-green-800 border-2 border-lab-blue flex items-center justify-center font-bold text-sm transition-transform duration-300 ease-out delay-150 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:rotate-[8deg]">EF</div>
        </div>
        <p className="text-sm text-text-secondary">
          Join <span className="font-bold text-flame">thousands of students</span> learning in the great lab.
        </p>
      </div>
    </div>
  )
}