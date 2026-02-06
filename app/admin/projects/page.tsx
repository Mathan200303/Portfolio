'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa'
import { getPortfolioData, savePortfolioData, type PortfolioData } from '@/lib/data'

export default function EditProjects() {
  const router = useRouter()
  const [data, setData] = useState<PortfolioData['projects'] | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('adminAuthenticated')
      if (auth !== 'true') {
        router.push('/admin/login')
        return
      }
      const portfolioData = getPortfolioData()
      setData(portfolioData.projects)
    }
  }, [router])

  const handleSave = () => {
    if (data) {
      const portfolioData = getPortfolioData()
      portfolioData.projects = data
      savePortfolioData(portfolioData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const addProject = () => {
    if (data) {
      setData([...data, { name: '', tools: [], role: '', description: '' }])
    }
  }

  const removeProject = (index: number) => {
    if (data) {
      setData(data.filter((_, i) => i !== index))
    }
  }

  const updateProject = (index: number, field: string, value: string | string[]) => {
    if (data) {
      const updated = [...data]
      updated[index] = { ...updated[index], [field]: value }
      setData(updated)
    }
  }

  const addTool = (projectIndex: number) => {
    if (data) {
      const updated = [...data]
      updated[projectIndex].tools = [...updated[projectIndex].tools, '']
      setData(updated)
    }
  }

  const removeTool = (projectIndex: number, toolIndex: number) => {
    if (data) {
      const updated = [...data]
      updated[projectIndex].tools = updated[projectIndex].tools.filter((_, i) => i !== toolIndex)
      setData(updated)
    }
  }

  const updateTool = (projectIndex: number, toolIndex: number, value: string) => {
    if (data) {
      const updated = [...data]
      updated[projectIndex].tools[toolIndex] = value
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
            <h1 className="text-3xl font-bold gradient-text-teal">Edit Projects</h1>
            <button
              onClick={addProject}
              className="btn-outline flex items-center gap-2"
            >
              <FaPlus /> Add Project
            </button>
          </div>

          <div className="space-y-6 mb-6">
            {data.map((project, index) => (
              <div key={index} className="bg-dark-bg rounded-lg p-6 border border-primary-purple/20">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-white/60 text-sm">Project {index + 1}</span>
                  <button
                    onClick={() => removeProject(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-1">Project Name</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateProject(index, 'name', e.target.value)}
                      className="input-field text-sm"
                      placeholder="Project Name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-1">Role</label>
                    <input
                      type="text"
                      value={project.role}
                      onChange={(e) => updateProject(index, 'role', e.target.value)}
                      className="input-field text-sm"
                      placeholder="Full Stack Developer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-white/60 text-sm">Tools</label>
                      <button
                        onClick={() => addTool(index)}
                        className="text-primary-teal hover:text-primary-teal/80 text-sm"
                      >
                        + Add Tool
                      </button>
                    </div>
                    <div className="space-y-2">
                      {project.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={tool}
                            onChange={(e) => updateTool(index, toolIndex, e.target.value)}
                            className="input-field text-sm flex-1"
                            placeholder="React"
                          />
                          <button
                            onClick={() => removeTool(index, toolIndex)}
                            className="text-red-400 hover:text-red-300 px-3"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-1">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateProject(index, 'description', e.target.value)}
                      className="input-field text-sm resize-none"
                      rows={4}
                      placeholder="Project description..."
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
