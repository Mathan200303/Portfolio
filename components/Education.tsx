'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { IoPerson } from 'react-icons/io5'
import { getPortfolioData } from '@/lib/data'
import type { PortfolioData } from '@/lib/data'

type EducationData = PortfolioData['education']

export default function Education() {
  // ✅ change: ref to section (mobile-la render aagum)
  const ref = useRef<HTMLElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [educationData, setEducationData] = useState<EducationData>({
    imageUrl: '',
    educations: [],
  })

  useEffect(() => {
    const load = () => setEducationData(getPortfolioData().education)

    load()
    const onStorage = () => load()
    window.addEventListener('storage', onStorage)

    const interval = setInterval(load, 1000)

    return () => {
      window.removeEventListener('storage', onStorage)
      clearInterval(interval)
    }
  }, [])

  return (
    // ✅ change: add ref here
    <section ref={ref} id="education" className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section - Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8, rotate: -5 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, scale: 1, rotate: 0 }
                : { opacity: 0, x: -100, scale: 0.8, rotate: -5 }
            }
            transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="hidden md:block"
          >
            <motion.div className="relative w-full h-[500px] rounded-lg overflow-hidden">
              {educationData.imageUrl ? (
                <img
                  src={educationData.imageUrl}
                  alt="Education"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-pink/20 via-primary-purple/20 to-primary-teal/20 rounded-lg flex items-center justify-center">
                  <div className="text-8xl">🎓</div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Section - Education List */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text-pink">
              Education
            </h2>

            <div className="space-y-4">
              {educationData.educations.map((edu, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}

    // ✅ hover animation add
    whileHover={{
      scale: 1.03,
      y: -6,
    }}
    whileTap={{ scale: 0.98 }}

    className="bg-dark-card/60 border border-white/10 rounded-lg p-5
               transition-all duration-300 hover:border-white/25 hover:shadow-lg"
  >
    <div className="text-sm text-white/70">{edu.period}</div>
    <div className="text-xl font-semibold text-white mt-1">{edu.degree}</div>
    <div className="text-white/80 mt-1 flex items-center gap-2">
      <IoPerson />
      {edu.institution}
    </div>
  </motion.div>
))}

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
