'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { User, Mail, Calendar, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
      router.push('/')
    } catch (error) {
      toast.error('Error signing out')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto transition-opacity duration-500">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                    <User className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-sm text-gray-400">Full Name</p>
                      <p className="text-white">{user.user_metadata?.full_name || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                    <Mail className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-sm text-gray-400">Member Since</p>
                      <p className="text-white">
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Account Status</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-sm text-gray-400">Email Verification</p>
                    <p className={`font-medium ${user.email_confirmed_at ? 'text-emerald-400' : 'text-yellow-400'}`}>
                      {user.email_confirmed_at ? 'Verified' : 'Pending Verification'}
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-sm text-gray-400">Last Sign In</p>
                    <p className="text-white">
                      {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => router.push('/')}
                  className="p-4 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors text-left"
                >
                  <h3 className="font-medium">Back to Home</h3>
                  <p className="text-sm text-emerald-300">Return to main site</p>
                </button>
                
                <button className="p-4 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-left">
                  <h3 className="font-medium">Update Profile</h3>
                  <p className="text-sm text-purple-300">Edit your information</p>
                </button>
                
                <button className="p-4 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-left">
                  <h3 className="font-medium">Settings</h3>
                  <p className="text-sm text-blue-300">Manage preferences</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
