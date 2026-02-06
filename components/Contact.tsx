'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa'
import { HiPaperAirplane } from 'react-icons/hi'

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/Mathan200303', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/narmathan-lk/', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://www.instagram.com/mathanofficial03', label: 'Instagram' },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Message sent! (This is a demo)')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Section - Contact Form */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold gradient-text-teal"
            >
              CONTACT WITH ME
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/90 text-lg leading-relaxed"
            >
              If you have any questions or concerns, please don't hesitate to contact me. 
              I am open to any work opportunities that align with my skills and interests.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <label className="block text-white/80 mb-2 font-semibold">Your Name:</label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02, borderColor: "#8B5CF6" }}
                  className="input-field"
                  placeholder="Enter your name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <label className="block text-white/80 mb-2 font-semibold">Your Email:</label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.02, borderColor: "#8B5CF6" }}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <label className="block text-white/80 mb-2 font-semibold">Your Message:</label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  whileFocus={{ scale: 1.02, borderColor: "#8B5CF6" }}
                  className="input-field resize-none"
                  placeholder="Enter your message"
                />
              </motion.div>

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2 text-white w-full md:w-auto"
              >
                SEND MESSAGE
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <HiPaperAirplane className="text-lg" />
                </motion.div>
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Right Section - Contact Info & Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-purple to-primary-pink rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-white text-xl" />
                </div>
                <span className="text-white text-lg">mathan19764@gmail.com</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-purple to-primary-pink rounded-lg flex items-center justify-center">
                  <FaPhone className="text-white text-xl" />
                </div>
                <span className="text-white text-lg">0764885031</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-purple to-primary-pink rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <span className="text-white text-lg">Jaffna, Sri Lanka</span>
              </motion.div>
            </div>

            {/* Social Media Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex gap-4 flex-wrap"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-dark-card rounded-full border border-primary-purple/30 hover:border-primary-purple/60 flex items-center justify-center text-white/80 hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="text-xl" />
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-primary-purple/30 text-center"
        >
          <p className="text-white/60">©2026 Jeyakumar Narmathan</p>
        </motion.div>
      </div>

      {/* Vertical Label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
      >
        <div className="bg-dark-card px-4 py-8 rounded-lg border border-primary-purple/30">
          <div className="writing-vertical text-white font-bold text-sm uppercase tracking-wider">
            CONTACT
          </div>
        </div>
      </motion.div>
    </section>
  )
}
