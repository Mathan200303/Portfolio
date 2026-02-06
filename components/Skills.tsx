'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  SiOpenjdk,
  SiPython,  
  SiPhp,
  SiHtml5, 
  SiCss3, 
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiMysql
} from 'react-icons/si'

const skills = [
  { name: 'Java', icon: SiOpenjdk, color: 'from-orange-500 to-orange-600' },
  { name: 'Python', icon: SiPython, color: 'from-blue-500 to-yellow-500' },
  { name: 'PHP', icon: SiPhp, color: 'from-indigo-500 to-indigo-700' },
  { name: 'HTML', icon: SiHtml5, color: 'from-orange-500 to-orange-600' },
  { name: 'CSS', icon: SiCss3, color: 'from-blue-500 to-blue-600' },
  { name: 'Javascript', icon: SiJavascript, color: 'from-yellow-400 to-yellow-500' },
  { name: 'React', icon: SiReact, color: 'from-cyan-400 to-blue-500' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'from-green-500 to-green-600' },
  { name: 'MongoDB', icon: SiMongodb, color: 'from-green-500 to-green-600' },
  { name: 'MySQL', icon: SiMysql, color: 'from-blue-500 to-blue-600' },
]


export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold gradient-text-teal mb-4"
          >
            Skills
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            // Different animation delays for each skill to create wave effect
            const floatDelay = index * 0.2
            const rotationDelay = index * 0.15
            
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 80, scale: 0.5, rotate: -180, filter: "blur(10px)" }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: [0, -20, 0],
                        scale: 1,
                        rotate: [0, 8, -8, 0],
                        filter: "blur(0px)",
                      }
                    : { opacity: 0, y: 80, scale: 0.5, rotate: -180, filter: "blur(10px)" }
                }
                transition={{
                  // Initial entrance animation
                  opacity: {
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: [0.6, -0.05, 0.01, 0.99],
                  },
                  scale: {
                    delay: index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                  },
                  filter: {
                    delay: index * 0.1,
                    duration: 0.6,
                  },
                  // Continuous floating animation (starts after entrance)
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: floatDelay + index * 0.1 + 0.6,
                  },
                  // Continuous rotation animation (starts after entrance)
                  rotate1: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: rotationDelay + index * 0.1 + 0.6,
                  },
                }}
                whileHover={{
                  scale: 1.2,
                  y: -20,
                  rotate: 15,
                  boxShadow: "0 20px 40px rgba(139, 92, 246, 0.5)",
                  transition: { duration: 0.3 },
                }}
                className="bg-dark-card rounded-xl p-6 border border-primary-purple/30 hover:border-primary-purple/60 transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-purple/0 via-primary-purple/20 to-primary-purple/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? {
                      rotate: [0, 360],
                      scale: [1, 1.15, 1],
                    } : { scale: 0, rotate: -180 }}
                    transition={{
                      // Initial entrance
                      scale: {
                        delay: index * 0.1 + 0.3,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                      },
                      rotate: {
                        delay: index * 0.1 + 0.3,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                      },

                      // Continuous rotation
                      rotate1: {
                        duration: 10,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: index * 0.2 + 0.8,
                      },
                      scale1: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.15 + 0.8,
                      },
                    }}
                    whileHover={{
                      rotate: 360,
                      scale: 1.3,
                      transition: { duration: 0.5 },
                    }}
                    className={`w-16 h-16 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center text-3xl group-hover:shadow-lg group-hover:shadow-primary-purple/50 transition-all`}
                  >
                    <Icon  className="text-white" />
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? {
                      opacity: 1,
                      y: [0, -8, 0],
                    } : { opacity: 0, y: 10 }}
                    transition={{
                      // Initial entrance
                      opacity: {
                        delay: index * 0.1 + 0.5,
                        duration: 0.4,
                      },
                      y: {
                        delay: index * 0.1 + 0.5,
                        duration: 0.4,
                      },
                    
                      y1: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.1 + 1,
                      },
                    }}
                    className="text-white font-semibold text-sm text-center"
                  >
                    {skill.name}
                  </motion.span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
