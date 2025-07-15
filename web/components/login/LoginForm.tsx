// /web/components/login/LoginForm.tsx - COMPLETE REPLACEMENT FILE

'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { ChevronRight, Eye, EyeOff } from 'lucide-react'
import { GoogleIcon, AppleIcon } from '@/components/ui/SocialIcons'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [formType, setFormType] = useState<'signIn' | 'signUp'>('signIn')
  const [formAnimation, setFormAnimation] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setIsSubmitting(true); setError(null); setMessage(null); setFormAnimation('');
    const action = formType === 'signIn' ? supabase.auth.signInWithPassword({ email, password }) : supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/auth/callback` } });
    const { error: authError } = await action;
    if (authError) { setError(authError.message); setFormAnimation('animate-shake'); } 
    else { if (formType === 'signUp') { setMessage('Check your email for a confirmation link!'); } else { router.push('/dashboard'); router.refresh(); } }
    setIsSubmitting(false);
  }

  const handleToggleForm = () => {
    setFormType(prev => prev === 'signIn' ? 'signUp' : 'signIn'); setError(null); setMessage(null);
  };
  
  const isSignIn = formType === 'signIn';

  return (
    <div className={`bg-papyrus rounded-2xl p-6 sm:p-10 shadow-xl border border-white/10 w-full ${formAnimation}`} onAnimationEnd={() => setFormAnimation('')}>
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">
          <span className="block text-xl font-medium bg-gradient-subtle-text bg-clip-text text-transparent">
            {isSignIn ? "Welcome Back," : "Join the Great Lab,"}
          </span>
          <span className="block text-3xl sm:text-4xl mt-1 bg-gradient-flame bg-clip-text text-transparent">
            {isSignIn ? "Human Scientist!" : "Begin Today!"}
          </span>
        </h2>
        <p className="text-text-light-bg-secondary mt-2 text-sm">{isSignIn ? "Continue your exploration" : "Create your account to start"}</p>
      </div>
      
      {error && <p className="mb-4 text-center text-sm text-error bg-error/10 border border-error/20 rounded-md p-3 animate-fade-in-up">{error}</p>}
      {message && <p className="mb-4 text-center text-sm text-success bg-success/10 border border-success/20 rounded-md p-3 animate-fade-in-up">{message}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-light-bg-secondary mb-1">Email Address</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white border border-form-input-border rounded-md p-3 text-light-bg-primary shadow-inner focus:border-flame focus:ring-2 focus:ring-flame/20 outline-none transition-all" placeholder="your@email.com" required autoComplete="username" />
          </div>
          <div>
             <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-text-light-bg-secondary">Password</label>
              {isSignIn && <a href="#" className="text-sm text-flame hover:underline">Forgot password?</a>}
            </div>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white border border-form-input-border rounded-md p-3 text-light-bg-primary shadow-inner focus:border-flame focus:ring-2 focus:ring-flame/20 outline-none transition-all pr-10" placeholder="••••••••" required autoComplete="current-password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center px-3 text-light-bg-secondary hover:text-light-bg-primary" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="group mt-8 w-full h-12 relative flex items-center justify-center rounded-full bg-gradient-flame text-white font-semibold shadow-lg hover:shadow-flame/40 hover:-translate-y-1 active:translate-y-0.5 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:-translate-y-0 overflow-hidden">
          <span className="relative z-10 flex items-center">{isSubmitting ? <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> : <span className="flex items-center">{isSignIn ? "Login to The Lab" : "Create Account"} <ChevronRight size={20} className="ml-1" /></span>}</span>
          <div className="absolute inset-0 z-0" aria-hidden="true"><div className="emoji-bubbles"><div className="emoji-bubble">🏛️</div><div className="emoji-bubble">📜</div><div className="emoji-bubble">⚔️</div><div className="emoji-bubble">🧠</div></div></div>
        </button>
        
        <p className="text-center text-sm text-text-light-bg-secondary mt-6">{isSignIn ? "New to Pyr?" : "Already have an account?"}<button type="button" onClick={handleToggleForm} className="font-semibold text-flame hover:underline ml-1">{isSignIn ? "Create an account" : "Sign In"}</button></p>
      </form>

      <div className="mt-8 pt-8 border-t border-form-input-border">
          <div className="space-y-4">
            <button className="w-full h-12 flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:-translate-y-0.5 transition-transform"><GoogleIcon className="w-5 h-5"/>Continue with Google</button>
            <button className="w-full h-12 flex items-center justify-center gap-3 bg-black text-white rounded-md shadow-sm hover:bg-gray-800 hover:-translate-y-0.5 transition-transform"><AppleIcon className="w-5 h-5"/>Continue with Apple</button>
          </div>
      </div>
    </div>
  )
}