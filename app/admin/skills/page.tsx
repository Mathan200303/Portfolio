'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa'
import { getPortfolioData, savePortfolioData, type PortfolioData } from '@/lib/data'

export default function EditSkills() {
  const router = useRouter()
  const [data, setData] = useState<PortfolioData['skills'] | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('adminAuthenticated')
      if (auth !== 'true') {
        router.push('/admin/login')
        return
      }
      const portfolioData = getPortfolioData()
      setData(portfolioData.skills)
    }
  }, [router])

  const handleSave = () => {
    if (data) {
      const portfolioData = getPortfolioData()
      portfolioData.skills = data
      savePortfolioData(portfolioData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const addSkill = () => {
    if (data) {
      setData([...data, { name: '', icon: 'SiReact', color: 'from-blue-500 to-purple-500' }])
    }
  }

  const removeSkill = (index: number) => {
    if (data) {
      setData(data.filter((_, i) => i !== index))
    }
  }

  const updateSkill = (index: number, field: string, value: string) => {
    if (data) {
      const updated = [...data]
      updated[index] = { ...updated[index], [field]: value }
      setData(updated)
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold gradient-text-teal">Edit Skills</h1>
            <button
              onClick={addSkill}
              className="btn-outline flex items-center gap-2"
            >
              <FaPlus /> Add Skill
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {data.map((skill, index) => (
              <div key={index} className="bg-dark-bg rounded-lg p-4 border border-primary-purple/20">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-1">Name</label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(index, 'name', e.target.value)}
                      className="input-field text-sm"
                      placeholder="React"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-1">Icon</label>
                    <input
                      type="text"
                      value={skill.icon}
                      onChange={(e) => updateSkill(index, 'icon', e.target.value)}
                      className="input-field text-sm"
                      placeholder="SiReact"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-1">Color</label>
                    <input
                      type="text"
                      value={skill.color}
                      onChange={(e) => updateSkill(index, 'color', e.target.value)}
                      className="input-field text-sm"
                      placeholder="from-blue-500 to-purple-500"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeSkill(index)}
                  className="mt-3 text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            ))}
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
              className="mt-4 bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-green-400"
            >
              Changes saved successfully!
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
