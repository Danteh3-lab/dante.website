'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthForm from '@/components/AuthForm'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/dashboard')
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
  }

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center px-4">
      <AuthForm 
        mode={mode} 
        onSuccess={handleSuccess}
        onToggleMode={toggleMode}
      />
    </div>
  )
}
