'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { getPortfolioData } from '@/lib/data'
import type { PortfolioData } from '@/lib/data'

type AboutData = PortfolioData['about']

export default function About() {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [aboutData, setAboutData] = useState<AboutData>({
    title: 'WHO I AM?',
    paragraphs: [],
    imageUrl: '',
  })

  useEffect(() => {
    const load = () => setAboutData(getPortfolioData().about)

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
    <section id="about" className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Section - Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="text-4xl md:text-5xl font-bold gradient-text-green"
            >
              {aboutData.title}
            </motion.h2>

            {aboutData.paragraphs.map((para, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="text-lg text-white/90 leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* Right Section - Image */}
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8, rotate: 5 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1, rotate: 0 } : { opacity: 0, x: 100, scale: 0.8, rotate: 5 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="relative"
          >
            <motion.div
              className="relative w-full h-[500px] rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.4 }}
            >
              {aboutData.imageUrl ? (
                <motion.img
                  initial={{ scale: 0.8, opacity: 0, rotate: -15, filter: 'blur(10px)' }}
                  animate={
                    isInView
                      ? { scale: 1, opacity: 1, rotate: 0, filter: 'blur(0px)' }
                      : { scale: 0.8, opacity: 0, rotate: -15, filter: 'blur(10px)' }
                  }
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                  src={aboutData.imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    const fallback = target.nextElementSibling as HTMLElement | null
                    if (fallback) fallback.style.display = 'flex'
                  }}
                />
              ) : null}

              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.8, opacity: 0, rotate: -10 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
                className={`w-full h-full bg-gradient-to-br from-primary-purple/20 to-primary-pink/20 rounded-lg flex items-center justify-center relative ${
                  aboutData.imageUrl ? 'hidden' : ''
                }`}
              >
                <motion.div
                  className="text-6xl text-white/30"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  👤
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex justify-center mt-12 pt-12 border-t border-primary-purple/30"
        >
          <motion.button
            onClick={() => {
              const element = document.getElementById('skills')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-dark-card px-8 py-3 rounded-lg border border-primary-purple/30 text-white font-semibold hover:bg-primary-purple/10 transition-colors"
          >
            Skills
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
