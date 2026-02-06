// Data storage and management
export interface PortfolioData {
  hero: {
    greeting: string
    name: string
    title: string
    socialLinks: Array<{
      name: string
      url: string
      icon: string
    }>
  }
  about: {
    title: string
    paragraphs: string[]
    imageUrl: string
  }
  skills: Array<{
    name: string
    icon: string
    color: string
  }>
  education: {
    imageUrl: string
    educations: Array<{
      period: string
      degree: string
      institution: string
    }>
  }
  projects: Array<{
    name: string
    tools: string[]
    role: string
    description: string
  }>
  contact: {
    email: string
    phone: string
    location: string
    socialLinks: Array<{
      name: string
      url: string
      icon: string
    }>
  }
}

const defaultData: PortfolioData = {
  hero: {
    greeting: 'Hello,',
    name: 'Jeyakumar Narmathan',
    title: 'Software Developer',
    socialLinks: [
      { name: 'GitHub', url: 'https://github.com/Mathan200303', icon: 'FaGithub' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/narmathan-lk/', icon: 'FaLinkedin' },
      { name: 'Instagram', url: 'https://www.instagram.com/mathanofficial03', icon: 'FaInstagram' },
      { name: 'Email', url: 'mathan19764@gmail.com', icon: 'FaEnvelope' },
     
    ],
  },
  about: {
    title: 'WHO I AM?',
    paragraphs: [
      'I am a motivated software developer skilled in the MERN stack and Spring Boot, capable of building full-stack applications, REST APIs, and clean front-end interfaces. I work confidently with Git and GitHub for version control and collaboration. I enjoy learning new technologies, writing efficient code, and improving my skills every day to build better software.'
    ],
    imageUrl: 'https://mathandev.vercel.app/1000673187-01.jpeg',
  },
  skills: [
    { name: 'Java', icon: 'SiJava', color: 'from-orange-500 to-orange-600' },
    { name: 'Python', icon: 'SiPython', color: 'from-blue-500 to-yellow-500' },
    { name: 'PHP', icon: 'SiPhp', color: 'from-blue-500 to-black' },
    { name: 'HTML', icon: 'SiHtml5', color: 'from-orange-500 to-orange-600' },
    { name: 'CSS', icon: 'SiCss3', color: 'from-blue-500 to-blue-600' },
    { name: 'Javascript', icon: 'SiJavascript', color: 'from-yellow-400 to-yellow-500' },
    { name: 'React', icon: 'SiReact', color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', icon: 'SiNodedotjs', color: 'from-green-500 to-green-600' },
    { name: 'MongoDB', icon: 'SiMongodb', color: 'from-green-500 to-green-600' },
    { name: 'MySQL', icon: 'SiMysql', color: 'from-blue-500 to-blue-600' },
  ],
  education: {
    imageUrl: '',
    educations: [
      {
        period: '2024 December - Present',
        degree: 'Software Developer',
        institution: 'College Of Technology Jaffna',
      },
      {
        period: '2020 - 2022',
        degree: 'ADVANCED LEVEL',
        institution: 'J/Chavakachcheri Hindu College',
      },
      {
        period: '2019 ',
        degree: 'ORDINARY LEVEL',
        institution: 'J/Chavakachcheri Hindu College',
      },
    ],
  },
  projects: [
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
    }],
  contact: {
    email: 'mathan19764@gmail.com',
    phone: '0764885031',
    location: 'Jaffna, Sri Lanka',
    socialLinks: [
      { name: 'GitHub', url: 'https://github.com/Mathan200303', icon: 'FaGithub' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/narmathan-lk/', icon: 'FaLinkedin' },
      { name: 'Instagram', url: 'https://www.instagram.com/mathanofficial03', icon: 'FaInstagram' },
    ],
  },
}

export const getPortfolioData = (): PortfolioData => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolioData')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        // Migrate old education format (array) to new format (object with educations array)
        if (Array.isArray(data.education)) {
          data.education = {
            imageUrl: '',
            educations: data.education
          }
          // Save migrated data
          savePortfolioData(data)
        }
        // Ensure all required fields exist
        if (!data.education?.educations) {
          data.education = defaultData.education
        }
        return data
      } catch (e) {
        return defaultData
      }
    }
  }
  return defaultData
}

export const savePortfolioData = (data: PortfolioData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolioData', JSON.stringify(data))
  }
}

export const resetPortfolioData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolioData', JSON.stringify(defaultData))
  }
}


