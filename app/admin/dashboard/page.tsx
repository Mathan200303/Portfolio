'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaHome, 
  FaUser, 
  FaCode, 
  FaGraduationCap, 
  FaFolderOpen, 
  FaEnvelope,
  FaSignOutAlt,
  FaEdit
} from 'react-icons/fa'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('adminAuthenticated')
      if (auth !== 'true') {
        router.push('/admin/login')
      } else {
        setIsAuthenticated(true)
      }
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return null
  }

  const sections = [
    { name: 'Hero Section', icon: FaHome, href: '/admin/hero', color: 'from-pink-500 to-purple-500' },
    { name: 'About Section', icon: FaUser, href: '/admin/about', color: 'from-teal-500 to-cyan-500' },
    { name: 'Skills', icon: FaCode, href: '/admin/skills', color: 'from-blue-500 to-indigo-500' },
    { name: 'Education', icon: FaGraduationCap, href: '/admin/education', color: 'from-green-500 to-emerald-500' },
    { name: 'Projects', icon: FaFolderOpen, href: '/admin/projects', color: 'from-orange-500 to-red-500' },
    { name: 'Contact', icon: FaEnvelope, href: '/admin/contact', color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-card border-b border-primary-purple/30 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text-teal">Admin Dashboard</h1>
          <div className="flex gap-4 items-center">
            <Link
              href="/"
              target="_blank"
              className="text-white/80 hover:text-primary-teal transition-colors flex items-center gap-2"
            >
              <FaEdit /> View Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-white/80 hover:text-red-400 transition-colors flex items-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Manage Portfolio Content</h2>
          <p className="text-white/60">Select a section to edit</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <Link key={section.name} href={section.href}>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-dark-card rounded-xl p-6 border border-primary-purple/30 hover:border-primary-purple/60 transition-all cursor-pointer group"
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center text-3xl text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{section.name}</h3>
                  <p className="text-white/60 text-sm">Click to edit content</p>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
