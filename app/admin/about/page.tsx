'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaSave, FaPlus, FaTrash, FaImage, FaUpload } from 'react-icons/fa'
import { getPortfolioData, savePortfolioData, type PortfolioData } from '@/lib/data'

export default function EditAbout() {
  const router = useRouter()
  const [data, setData] = useState<PortfolioData['about'] | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('adminAuthenticated')
      if (auth !== 'true') {
        router.push('/admin/login')
        return
      }
      const portfolioData = getPortfolioData()
      setData(portfolioData.about)
    }
  }, [router])

  const handleSave = () => {
    if (data) {
      const portfolioData = getPortfolioData()
      portfolioData.about = data
      savePortfolioData(portfolioData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const addParagraph = () => {
    if (data) {
      setData({
        ...data,
        paragraphs: [...data.paragraphs, ''],
      })
    }
  }

  const removeParagraph = (index: number) => {
    if (data) {
      setData({
        ...data,
        paragraphs: data.paragraphs.filter((_, i) => i !== index),
      })
    }
  }

  const updateParagraph = (index: number, value: string) => {
    if (data) {
      const updated = [...data.paragraphs]
      updated[index] = value
      setData({ ...data, paragraphs: updated })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && data) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB')
        return
      }
      
      // Check file type
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
          <h1 className="text-3xl font-bold gradient-text-teal mb-6">Edit About Section</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-white/80 mb-2 font-semibold">Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="input-field w-full"
                placeholder="e.g., WHO I AM?"
              />
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-white/80 mb-2 font-semibold flex items-center gap-2">
                <FaImage className="text-primary-teal" />
                Profile Photo
              </label>
              
              <div className="space-y-4">
                {/* Option 1: Upload Image */}
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

                {/* Option 2: Image URL */}
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

                {/* Image Preview */}
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
                        alt="Profile preview"
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

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-white/80 font-semibold">Paragraphs</label>
                <button
                  onClick={addParagraph}
                  className="btn-outline text-sm py-2 px-4 flex items-center gap-2"
                >
                  <FaPlus /> Add Paragraph
                </button>
              </div>
              <div className="space-y-4">
                {data.paragraphs.map((para, index) => (
                  <div key={index} className="bg-dark-bg rounded-lg p-4 border border-primary-purple/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white/60 text-sm">Paragraph {index + 1}</span>
                      <button
                        onClick={() => removeParagraph(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <textarea
                      value={para}
                      onChange={(e) => updateParagraph(index, e.target.value)}
                      className="input-field w-full resize-none"
                      rows={4}
                      placeholder="Enter paragraph text..."
                    />
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
