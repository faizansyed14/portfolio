export interface ProjectDetail {
  name: string
  description: string
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  location: string
  summary: string
  projects: ProjectDetail[]
}

export const experiences: Experience[] = [
  {
    id: 'alpha-data',
    company: 'Alpha Data',
    role: 'AI Software Engineer',
    period: 'Jul 2025 – Present',
    location: 'Abu Dhabi, UAE',
    summary:
      'Building and shipping enterprise AI products for clients across the UAE — from intelligent recruitment tools to privacy-first contract analysis systems.',
    projects: [
      {
        name: 'AI-Based CV Analyzer',
        description:
          'Automated recruitment pipeline that pulls resumes from email and portals, scores candidates with custom matching logic, and cuts manual screening time drastically.',
      },
      {
        name: 'Text-to-SQL Engine',
        description:
          'Natural language → SQL for non-technical teams. Schema-only access. Zero raw data exposure. Enterprise-grade data privacy.',
      },
      {
        name: 'RAG Enterprise Search',
        description:
          'Vector-powered knowledge retrieval system for large internal corpora. Fast, accurate, contextually grounded answers at scale.',
      },
      {
        name: 'AI Document Extraction Engine',
        description:
          'PDF, scan, and image ingestion via AI+OCR to structured data output. Eliminated manual data entry workflows entirely.',
      },
      {
        name: 'AI Contract Analyzer',
        description:
          'On-premise LLM-powered legal doc review. Sensitive contracts never leave the org. Compliance automation for enterprise legal teams.',
      },
      {
        name: 'Bulk Data Framework',
        description:
          'Automated Excel → DB pipeline for clean, deduplicated, synced enterprise datasets.',
      },
    ],
  },
  {
    id: 'west-avenue',
    company: 'West Avenue Services',
    role: 'ML Engineer',
    period: 'Jan 2024 – Jun 2025',
    location: 'Dubai, UAE',
    summary:
      'Designed and shipped an AI-powered visa and travel platform from scratch — including an in-house chatbot (zero external APIs), a global passport index, and ML-driven UX features that increased user engagement by 40%.',
    projects: [
      {
        name: 'AI Travel Platform',
        description:
          'Full-stack platform with intelligent visa guidance, document checklists, and application tracking.',
      },
      {
        name: 'In-House Chatbot',
        description:
          'Custom NLP chatbot built without external APIs, handling visa queries with high accuracy.',
      },
      {
        name: 'Global Passport Index',
        description:
          'Interactive data visualization of visa-free travel access across 199+ passports.',
      },
      {
        name: 'ML-Driven UX Features',
        description:
          'Personalized recommendations and smart form filling that increased engagement by 40%.',
      },
    ],
  },
]
