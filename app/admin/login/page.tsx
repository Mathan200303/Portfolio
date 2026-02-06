'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaLock, FaUser } from 'react-icons/fa'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  // Default admin credentials (change these in production!)
  const ADMIN_USERNAME = 'admin'
  const ADMIN_PASSWORD = 'admin123'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuthenticated', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-dark-card rounded-2xl p-8 w-full max-w-md border border-primary-purple/30 shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold gradient-text-teal mb-2">Admin Panel</h1>
          <p className="text-white/60">Login to manage your portfolio</p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white/80 mb-2 font-semibold flex items-center gap-2">
              <FaUser className="text-primary-teal" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field w-full"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2 font-semibold flex items-center gap-2">
              <FaLock className="text-primary-teal" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field w-full"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary w-full text-white"
          >
            Login
          </motion.button>
        </form>

        <div className="mt-6 text-center text-white/40 text-sm">
          <p>Default: admin / admin123</p>
        </div>
      </motion.div>
    </div>
  )
}
