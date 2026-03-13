'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { motion as m } from '@/tokens'

export default function AuthPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGoogleAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: authError } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/upload')
  }

  return (
    <div className="min-h-screen bg-tempo-page flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-sm bg-tempo-card rounded-[var(--radius-card)] border border-tempo-border p-8"
        style={{ boxShadow: 'var(--shadow-elevated)' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: m.spring.gentle.stiffness,
          damping: m.spring.gentle.damping,
          mass: m.spring.gentle.mass,
        }}
      >
        <h1 className="font-[family-name:var(--font-display)] text-[32px] font-bold text-tempo-primary text-center mb-8">
          Tempo
        </h1>

        <motion.button
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 py-3 px-4
            border border-tempo-border rounded-[var(--radius-button)]
            text-tempo-primary font-[family-name:var(--font-body)] text-[15px]
            hover:border-tempo-border-hover cursor-pointer
            focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent"
          whileTap={{ scale: m.micro.press }}
          whileHover={{ scale: m.micro.select }}
          transition={{
            type: 'spring',
            stiffness: m.spring.snappy.stiffness,
            damping: m.spring.snappy.damping,
            mass: m.spring.snappy.mass,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </motion.button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-[1px] bg-tempo-border" />
          <span className="font-[family-name:var(--font-body)] text-[11px] text-tempo-tertiary">or</span>
          <div className="flex-1 h-[1px] bg-tempo-border" />
        </div>

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
          <label htmlFor="auth-email" className="sr-only">Email address</label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full bg-tempo-panel text-tempo-primary
              font-[family-name:var(--font-body)] text-[16px]
              rounded-[var(--radius-button)] py-3 px-4
              border border-tempo-border
              placeholder:text-tempo-disabled
              focus:border-tempo-accent focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent"
          />
          <label htmlFor="auth-password" className="sr-only">Password</label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            className="w-full bg-tempo-panel text-tempo-primary
              font-[family-name:var(--font-body)] text-[16px]
              rounded-[var(--radius-button)] py-3 px-4
              border border-tempo-border
              placeholder:text-tempo-disabled
              focus:border-tempo-accent focus:outline-2 focus:outline-offset-2 focus:outline-tempo-accent"
          />

          <div role="alert" aria-live="polite">
            {error && (
              <div className="border-l-[3px] border-l-tempo-error pl-3">
                <p className="font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary">
                  {error}
                </p>
              </div>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Loading...' : isSignUp ? 'Create account' : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-center font-[family-name:var(--font-body)] text-[14px] text-tempo-secondary">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(null) }}
            className="text-tempo-accent hover:underline cursor-pointer"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}
