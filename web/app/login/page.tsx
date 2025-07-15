// /web/app/login/page.tsx - COMPLETE REPLACEMENT FILE

import FeatureList from "@/components/login/FeatureList";
import LoginForm from "@/components/login/LoginForm";
import FloatingEmojis from "@/components/login/FloatingEmojis";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-lab-blue font-sans text-text-primary antialiased relative isolate overflow-hidden">
      {/* --- THIS IS THE FIX: Increased overlay opacity from /10 to /25 --- */}
      <div className="absolute inset-0 bg-black/25 -z-20" aria-hidden="true" />
      <div className="fixed inset-0 -z-30 bg-ambient-glow animate-ambient-shift" aria-hidden="true" />
      <FloatingEmojis />

      <main className="flex flex-1 items-center justify-center min-h-screen p-6 lg:p-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16">
          
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <FeatureList />
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
             <div className="w-full max-w-md opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <LoginForm />
            </div>
          </div>
          
        </div>
      </main>
    </div>
  )
}