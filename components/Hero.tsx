'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'
import { IoPerson } from 'react-icons/io5'
import { getPortfolioData } from '@/lib/data'
import type { PortfolioData } from '@/lib/data'

type HeroData = PortfolioData['hero']

const iconMap: { [key: string]: any } = {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData>({
    greeting: 'Hello,',
    name: 'Jeyakumar Narmathan',
    title: 'Software Developer',
    socialLinks: [],
  })

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setHeroData(getPortfolioData().hero)

    const handleStorageChange = () => {
      setHeroData(getPortfolioData().hero)
    }
    window.addEventListener('storage', handleStorageChange)

    const interval = setInterval(() => {
      setHeroData(getPortfolioData().hero)
    }, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const codeSnippet = `const coder = {
  name: 'Jeyakumar Narmathan',
  skills: ['React', 'NodeJs', 'Express', 'JavaScript',
           'MySql', 'MongoDB', 'Git', 'AWS'],
  hardworker: true,
  quickLearner: true,
  problemSolver: true,
  hireable: function() {
    return (
      this.hardworker &&
      this.problemSolver &&
      this.skills.length >= 5
    );
  }
};`

  const socialLinks = heroData.socialLinks.map((link) => ({
    icon: iconMap[link.icon] || FaGithub,
    href: link.url,
    color: 'text-white',
  }))

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    // ✅ mobile padding fix
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20"
    >
      {/* ✅ grid-cols-1 for mobile */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            // ✅ mobile font size fix
            className="text-4xl sm:text-5xl md:text-7xl font-bold"
          >
            {heroData.greeting}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            // ✅ mobile font size fix
            className="text-3xl sm:text-4xl md:text-6xl font-bold"
          >
            This is{' '}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="gradient-text inline-block"
            >
              {heroData.name}
            </motion.span>
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.7,
              duration: 0.8,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            // ✅ mobile font size fix
            className="text-2xl sm:text-3xl md:text-5xl font-bold"
          >
            I'm a Professional{' '}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="gradient-text-green inline-block"
            >
              {heroData.title}.
            </motion.span>
          </motion.h3>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            // ✅ wrap on mobile
            className="flex flex-wrap gap-3 sm:gap-4 pt-4"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 1.2 + index * 0.1,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.2,
                    y: -8,
                    rotate: 360,
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gradient-to-br from-primary-pink to-primary-purple rounded-lg flex items-center justify-center text-white hover:shadow-lg hover:shadow-primary-purple/50 transition-all"
                >
                  <Icon className="text-xl" />
                </motion.a>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.4,
              duration: 0.8,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            // ✅ stack on mobile
            className="flex flex-col sm:flex-row flex-wrap gap-4 pt-6"
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                x: 5,
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              // ✅ full width on mobile
              className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2 text-white"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <IoPerson className="text-lg" />
              </motion.div>
              CONTACT ME
            </motion.button>

            <motion.a
              href="http://192.168.1.137:3000/narmathan.pdf"
              download
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              // ✅ full width on mobile
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 text-white"
            >
              GET RESUME
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <HiArrowDown className="text-lg" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Section - Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
          // ✅ mobile spacing + width
          className="relative w-full mt-10 md:mt-0"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
            // ✅ ensure full width
            className="code-window w-full"
          >
            <motion.div
              className="flex gap-2 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <motion.div className="w-3 h-3 rounded-full bg-red-500" whileHover={{ scale: 1.2 }} />
              <motion.div className="w-3 h-3 rounded-full bg-yellow-500" whileHover={{ scale: 1.2 }} />
              <motion.div className="w-3 h-3 rounded-full bg-green-500" whileHover={{ scale: 1.2 }} />
            </motion.div>

            <pre className="text-sm md:text-base overflow-x-auto">
              <code className="text-primary-teal">
                {codeSnippet.split('\n').map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{
                      delay: 1.6 + index * 0.15,
                      duration: 0.6,
                      ease: [0.6, -0.05, 0.01, 0.99],
                    }}
                  >
                    {line}
                  </motion.div>
                ))}
              </code>
            </pre>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
