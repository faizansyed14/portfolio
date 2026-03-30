export interface Project {
  id: string
  title: string
  category: 'enterprise-ai' | 'ml-cv' | 'web-platform' | 'automation'
  categoryLabel: string
  impact: string
  description: string
  tech: string[]
  stat?: string
  statLabel?: string
  featured?: boolean
  image?: string
}

export const projects: Project[] = [
  {
    id: 'cv-analyzer',
    title: 'AI-Based CV Analyzer',
    category: 'enterprise-ai',
    categoryLabel: 'Enterprise AI',
    impact: 'Automated recruitment screening from inbox to shortlist.',
    description:
      'An intelligent recruitment pipeline that automatically pulls resumes from email and job portals, scores candidates using custom matching logic, and drastically reduces manual screening time for HR teams.',
    tech: ['Python', 'LangChain', 'FastAPI', 'Email APIs'],
    stat: 'Hours saved',
    statLabel: 'per hire cycle',
    featured: true,
    image: '/projects/cv-analyzer.png',
  },
  {
    id: 'text-to-sql',
    title: 'Text-to-SQL Engine',
    category: 'enterprise-ai',
    categoryLabel: 'Enterprise AI',
    impact: 'Plain English → SQL for non-technical teams. Schema-only, privacy-first.',
    description:
      'A natural language interface that converts plain English queries into SQL, enabling non-technical teams to access database insights without writing code. Designed with enterprise-grade data privacy — schema-only access with zero raw data exposure.',
    tech: ['LLMs', 'LangChain', 'FastAPI', 'PostgreSQL'],
    stat: 'Zero',
    statLabel: 'raw data exposure',
    featured: true,
    image: '/projects/text-to-sql.png',
  },
  {
    id: 'rag-search',
    title: 'Enterprise RAG Search',
    category: 'enterprise-ai',
    categoryLabel: 'Enterprise AI',
    impact: 'Instant, accurate answers from large internal knowledge bases.',
    description:
      'A vector-powered knowledge retrieval system designed for enterprise-scale internal corpora. Delivers fast, accurate, and contextually grounded answers from vast document collections.',
    tech: ['LlamaIndex', 'Vector DB', 'Python', 'FastAPI'],
    stat: 'Enterprise-scale',
    statLabel: 'retrieval',
    image: '/projects/rag-search.png',
  },
  {
    id: 'document-extraction',
    title: 'AI Document Extraction Engine',
    category: 'enterprise-ai',
    categoryLabel: 'Enterprise AI',
    impact: 'Replaced manual data entry with AI+OCR extraction from any document.',
    description:
      'An intelligent document processing system that ingests PDFs, scans, and images via AI-powered OCR to extract structured data, completely eliminating manual data entry workflows.',
    tech: ['OCR', 'LLMs', 'Python', 'PDF Processing'],
    stat: 'Manual entry →',
    statLabel: 'zero',
    image: '/projects/doc-extraction.png',
  },
  {
    id: 'contract-analyzer',
    title: 'AI Contract Analyzer',
    category: 'enterprise-ai',
    categoryLabel: 'Enterprise AI',
    impact: 'On-premise LLM contract review. Sensitive docs, zero cloud exposure.',
    description:
      'An on-premise LLM-powered legal document review system that ensures sensitive contracts never leave the organization. Provides compliance automation and risk analysis for enterprise legal teams.',
    tech: ['Ollama', 'LlamaIndex', 'Python', 'RAG'],
    stat: 'Privacy-first',
    statLabel: 'legal automation',
    image: '/projects/contract-analyzer.png',
  },
  {
    id: 'west-avenue-platform',
    title: 'West Avenue Services Platform',
    category: 'web-platform',
    categoryLabel: 'Web & Platform',
    impact: 'Full AI travel platform with in-house chatbot and 40% engagement lift.',
    description:
      'A comprehensive AI-powered visa and travel platform built from scratch, featuring an in-house chatbot with zero external APIs, a global passport index, and ML-driven UX features.',
    tech: ['React', 'Node.js', 'Python', 'NLP'],
    stat: '40%',
    statLabel: 'engagement uplift',
    featured: true,
    image: '/projects/west-avenue.png',
  },
  {
    id: 'agri-doctor',
    title: 'AGRI DOCTOR',
    category: 'ml-cv',
    categoryLabel: 'ML/CV',
    impact: '92.53% accurate crop disease diagnosis. Built for real farmers.',
    description:
      'A CNN-powered crop disease diagnosis system trained on 5,000+ images. Built specifically for farmers with an intuitive interface, providing accurate disease identification and treatment recommendations.',
    tech: ['CNN', 'FastAPI', 'React', 'NLP', 'TTS'],
    stat: '92.53%',
    statLabel: 'accuracy',
  },
  {
    id: 'linkedin-automator',
    title: 'LinkedIn Job Automator',
    category: 'automation',
    categoryLabel: 'Automation',
    impact: 'End-to-end LinkedIn Easy Apply automation with smart filtering.',
    description:
      'An intelligent automation tool that handles the entire LinkedIn Easy Apply process with smart filtering, resume customization, and application tracking — saving hours every week.',
    tech: ['Python', 'Selenium', 'Automation'],
    stat: 'Hours saved',
    statLabel: 'weekly',
  },
  {
    id: 'nizams-cafe',
    title: "The Nizam's Cafe",
    category: 'web-platform',
    categoryLabel: 'Web & Platform',
    impact: 'Clean, modern responsive website for a cafe client.',
    description:
      'A beautifully designed, fully responsive website for a local cafe, featuring smooth animations, online menu display, and contact integration.',
    tech: ['HTML', 'CSS', 'JS', 'Responsive Design'],
  },
]

export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'enterprise-ai', label: 'Enterprise AI' },
  { id: 'ml-cv', label: 'ML/CV' },
  { id: 'web-platform', label: 'Web & Platform' },
]
