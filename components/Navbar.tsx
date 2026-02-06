'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = ['home', 'about', 'skills', 'education', 'projects', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-bg/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold gradient-text-green cursor-pointer"
          onClick={() => scrollToSection('home')}
        >
          Mathan
        </motion.div>
        
        <div className="hidden md:flex gap-8">
          {['ABOUT', 'SKILLS', 'EDUCATION', 'PROJECTS'].map((item) => {
            const id = item.toLowerCase()
            return (
              <motion.button
                key={item}
                onClick={() => scrollToSection(id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`text-sm font-semibold uppercase transition-colors ${
                  activeSection === id
                    ? 'text-primary-teal'
                    : 'text-white/80 hover:text-primary-teal'
                }`}
              >
                {item}
              </motion.button>
            )
          })}
          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`text-sm font-semibold uppercase transition-colors ${
              activeSection === 'contact'
                ? 'text-primary-teal'
                : 'text-white/80 hover:text-primary-teal'
            }`}
          >
            CONTACT
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
