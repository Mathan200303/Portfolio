'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa'
import { getPortfolioData, savePortfolioData, type PortfolioData } from '@/lib/data'

export default function EditContact() {
  const router = useRouter()
  const [data, setData] = useState<PortfolioData['contact'] | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('adminAuthenticated')
      if (auth !== 'true') {
        router.push('/admin/login')
        return
      }
      const portfolioData = getPortfolioData()
      setData(portfolioData.contact)
    }
  }, [router])

  const handleSave = () => {
    if (data) {
      const portfolioData = getPortfolioData()
      portfolioData.contact = data
      savePortfolioData(portfolioData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const addSocialLink = () => {
    if (data) {
      setData({
        ...data,
        socialLinks: [...data.socialLinks, { name: '', url: '', icon: 'FaGithub' }],
      })
    }
  }

  const removeSocialLink = (index: number) => {
    if (data) {
      setData({
        ...data,
        socialLinks: data.socialLinks.filter((_, i) => i !== index),
      })
    }
  }

  const updateSocialLink = (index: number, field: string, value: string) => {
    if (data) {
      const updated = [...data.socialLinks]
      updated[index] = { ...updated[index], [field]: value }
      setData({ ...data, socialLinks: updated })
    }
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-dark-bg p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-white/80 hover:text-primary-teal mb-6 transition-colors"
        >
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card rounded-xl p-8 border border-primary-purple/30"
        >
          <h1 className="text-3xl font-bold gradient-text-teal mb-6">Edit Contact Section</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-white/80 mb-2 font-semibold">Email</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="input-field w-full"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2 font-semibold">Phone</label>
              <input
                type="text"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="input-field w-full"
                placeholder="+1234567890"
              />
            </div>

            <div>
              <label className="block text-white/80 mb-2 font-semibold">Location</label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => setData({ ...data, location: e.target.value })}
                className="input-field w-full"
                placeholder="City, Country"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-white/80 font-semibold">Social Links</label>
                <button
                  onClick={addSocialLink}
                  className="btn-outline text-sm py-2 px-4 flex items-center gap-2"
                >
                  <FaPlus /> Add Link
                </button>
              </div>
              <div className="space-y-4">
                {data.socialLinks.map((link, index) => (
                  <div key={index} className="bg-dark-bg rounded-lg p-4 border border-primary-purple/20">
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <label className="block text-white/60 text-sm mb-1">Name</label>
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) => updateSocialLink(index, 'name', e.target.value)}
                          className="input-field text-sm"
                          placeholder="GitHub"
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-1">URL</label>
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                          className="input-field text-sm"
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-white/60 text-sm mb-1">Icon</label>
                        <input
                          type="text"
                          value={link.icon}
                          onChange={(e) => updateSocialLink(index, 'icon', e.target.value)}
                          className="input-field text-sm"
                          placeholder="FaGithub"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeSocialLink(index)}
                      className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 text-white"
            >
              <FaSave /> Save Changes
            </motion.button>

            {saved && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-400"
              >
                Changes saved successfully!
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
