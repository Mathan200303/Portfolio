'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaSave, FaPlus, FaTrash, FaImage, FaUpload } from 'react-icons/fa'
import { getPortfolioData, savePortfolioData, type PortfolioData } from '@/lib/data'

export default function EditEducation() {
  const router = useRouter()
  const [data, setData] = useState<PortfolioData['education'] | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('adminAuthenticated')
      if (auth !== 'true') {
        router.push('/admin/login')
        return
      }
      const portfolioData = getPortfolioData()
      setData(portfolioData.education)
    }
  }, [router])

  const handleSave = () => {
    if (data) {
      const portfolioData = getPortfolioData()
      portfolioData.education = data
      savePortfolioData(portfolioData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const addEducation = () => {
    if (data) {
      setData({
        ...data,
        educations: [...data.educations, { period: '', degree: '', institution: '' }]
      })
    }
  }

  const removeEducation = (index: number) => {
    if (data) {
      setData({
        ...data,
        educations: data.educations.filter((_, i) => i !== index)
      })
    }
  }

  const updateEducation = (index: number, field: string, value: string) => {
    if (data) {
      const updated = [...data.educations]
      updated[index] = { ...updated[index], [field]: value }
      setData({ ...data, educations: updated })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && data) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setData({ ...data, imageUrl: base64String })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUrlChange = (url: string) => {
    if (data) {
      setData({ ...data, imageUrl: url })
    }
  }

  const removeImage = () => {
    if (data) {
      setData({ ...data, imageUrl: '' })
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
            <h1 className="text-3xl font-bold gradient-text-teal">Edit Education</h1>
            <button
              onClick={addEducation}
              className="btn-outline flex items-center gap-2"
            >
              <FaPlus /> Add Education
            </button>
          </div>

          {/* Image Upload Section */}
          <div className="mb-6">
            <label className="block text-white/80 mb-2 font-semibold flex items-center gap-2">
              <FaImage className="text-primary-teal" />
              Education Illustration Image
            </label>
            
            <div className="space-y-4">
              <div className="bg-dark-bg rounded-lg p-4 border border-primary-purple/20">
                <label className="block text-white/60 text-sm mb-2">Upload Image File</label>
                <div className="flex gap-4 items-center">
                  <label className="btn-outline flex items-center gap-2 cursor-pointer">
                    <FaUpload /> Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-white/40 text-xs">Max 10MB (JPG, PNG, etc.)</span>
                </div>
              </div>

              <div className="bg-dark-bg rounded-lg p-4 border border-primary-purple/20">
                <label className="block text-white/60 text-sm mb-2">Or Enter Image URL</label>
                <input
                  type="text"
                  value={data.imageUrl && !data.imageUrl.startsWith('data:') ? data.imageUrl : ''}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  className="input-field w-full"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {data.imageUrl && (
                <div className="bg-dark-bg rounded-lg p-4 border border-primary-purple/20">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-white/60 text-sm">Preview</label>
                    <button
                      onClick={removeImage}
                      className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                    >
                      <FaTrash /> Remove Image
                    </button>
                  </div>
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border border-primary-purple/30">
                    <img
                      src={data.imageUrl}
                      alt="Education preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%231a1a3e" width="400" height="400"/%3E%3Ctext fill="%23ffffff" font-family="Arial" font-size="20" x="150" y="200"%3EImage not found%3C/text%3E%3C/svg%3E'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {data.educations.map((edu, index) => (
              <div key={index} className="bg-dark-bg rounded-lg p-4 border border-primary-purple/20">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-white/60 text-sm">Education {index + 1}</span>
                  <button
                    onClick={() => removeEducation(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-white/60 text-sm mb-1">Period</label>
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) => updateEducation(index, 'period', e.target.value)}
                      className="input-field text-sm"
                      placeholder="2021 - 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-1">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      className="input-field text-sm"
                      placeholder="ADVANCED LEVEL"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-1">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      className="input-field text-sm"
                      placeholder="College Name"
                    />
                  </div>
                </div>
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
