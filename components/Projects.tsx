'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
      name: 'Ecommerce Website',
      tools: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT'],
      role: 'Full Stack Developer',
      description: '',
    },
    {
      name: 'Spotify Clone',
      tools: ['React'],
      role: 'Full Stack Developer',
      description: ''
    },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const formatCode = (project: typeof projects[0]) => {
    const toolsStr = project.tools.map(t => `'${t}'`).join(', ')
    return `const project = {
  name: '${project.name}',
  tools: [${toolsStr}],
  myRole: '${project.role}'${project.description ? `,
  Description: ${project.description}` : ''}
};`
  }

  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold gradient-text-teal mb-4"
          >
            PROJECTS
          </motion.h2>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              formatCode={formatCode}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, formatCode }: { 
  project: typeof projects[0], 
  index: number,
  formatCode: (project: typeof projects[0]) => string
}) {
  const projectRef = useRef(null)
  const projectInView = useInView(projectRef, { once: true, margin: '-50px' })
  
  return (
            <motion.div
              ref={projectRef}
              initial={{ opacity: 0, y: 100, scale: 0.8, filter: "blur(15px)", rotateX: 15 }}
              animate={projectInView ? { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                filter: "blur(0px)",
                rotateX: 0
              } : { 
                opacity: 0, 
                y: 100, 
                scale: 0.8, 
                filter: "blur(15px)",
                rotateX: 15
              }}
              transition={{ 
                delay: index * 0.2, 
                duration: 1.2,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              whileHover={{ 
                scale: 1.05,
                y: -15,
                rotateY: 2,
                boxShadow: "0 25px 70px rgba(139, 92, 246, 0.5)",
                transition: { duration: 0.4 }
              }}
              className="code-window relative overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 border-2 border-primary-purple/50 rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(139, 92, 246, 0)",
                    "0 0 40px rgba(139, 92, 246, 0.3)",
                    "0 0 20px rgba(139, 92, 246, 0)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {/* Window Controls */}
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              {/* Project Title */}
              <motion.h3
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={projectInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -30, scale: 0.9 }}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="text-2xl font-bold text-primary-teal mb-4"
              >
                {project.name}
              </motion.h3>

              {/* Code Block */}
              <div className="text-sm md:text-base overflow-x-auto font-mono">
                {formatCode(project).split('\n').map((line, lineIndex) => {
                  // Parse line for syntax highlighting
                  const parts: Array<{ text: string; color: string }> = []
                  let remaining = line
                  
                  // Highlight 'const'
                  if (remaining.includes('const')) {
                    const constIndex = remaining.indexOf('const')
                    if (constIndex > 0) {
                      parts.push({ text: remaining.substring(0, constIndex), color: 'text-white' })
                    }
                    parts.push({ text: 'const', color: 'text-purple-400' })
                    remaining = remaining.substring(constIndex + 5)
                  }
                  
                  // Highlight strings (content in single quotes)
                  const stringRegex = /'([^']+)'/g
                  let match
                  let lastIndex = 0
                  
                  while ((match = stringRegex.exec(remaining)) !== null) {
                    if (match.index > lastIndex) {
                      parts.push({ text: remaining.substring(lastIndex, match.index), color: 'text-white' })
                    }
                    parts.push({ text: match[0], color: 'text-orange-400' })
                    lastIndex = match.index + match[0].length
                  }
                  
                  if (lastIndex < remaining.length) {
                    parts.push({ text: remaining.substring(lastIndex), color: 'text-white' })
                  }
                  
                  if (parts.length === 0) {
                    parts.push({ text: line, color: 'text-white' })
                  }

                  return (
                    <motion.div
                      key={lineIndex}
                      initial={{ opacity: 0, x: -40, filter: "blur(8px)", y: 10 }}
                      animate={projectInView ? { 
                        opacity: 1, 
                        x: 0, 
                        filter: "blur(0px)",
                        y: 0
                      } : { 
                        opacity: 0, 
                        x: -40, 
                        filter: "blur(8px)",
                        y: 10
                      }}
                      transition={{ 
                        delay: 0.5 + index * 0.2 + lineIndex * 0.1, 
                        duration: 0.7,
                        ease: [0.6, -0.05, 0.01, 0.99]
                      }}
                      className="whitespace-pre"
                    >
                      {parts.map((part, partIndex) => (
                        <motion.span
                          key={partIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={projectInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ 
                            delay: 0.6 + index * 0.2 + lineIndex * 0.1 + partIndex * 0.03,
                            duration: 0.4
                          }}
                          className={part.color}
                        >
                          {part.text}
                        </motion.span>
                      ))}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
  )
}
