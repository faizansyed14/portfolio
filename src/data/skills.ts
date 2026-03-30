export interface SkillCategory {
  id: string
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'llm-ai',
    title: 'LLM & Agentic AI',
    skills: [
      'LangChain',
      'LlamaIndex',
      'OpenAI API',
      'RAG',
      'Multi-Agent',
      'Prompt Engineering',
      'Ollama',
      'Hugging Face',
    ],
  },
  {
    id: 'ml-cv',
    title: 'ML & Computer Vision',
    skills: [
      'PyTorch',
      'TensorFlow',
      'CNN',
      'NLP',
      'OCR',
      'Scikit-learn',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    skills: ['Python', 'FastAPI', 'Node.js', 'REST APIs', 'SQL'],
  },
  {
    id: 'vector-data',
    title: 'Vector & Data',
    skills: ['Pinecone', 'Chroma', 'FAISS', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    skills: ['Docker', 'Kubernetes', 'Git', 'CI/CD', 'Vercel', 'Azure'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
]

export const marqueeSkills = [
  'LangChain',
  'LlamaIndex',
  'RAG',
  'Agentic AI',
  'FastAPI',
  'LLMs',
  'Vector DBs',
  'Docker',
  'Kubernetes',
  'PyTorch',
  'Hugging Face',
  'Ollama',
  'Python',
  'Next.js',
  'TypeScript',
  'LangChain',
  'LlamaIndex',
  'RAG',
  'Agentic AI',
  'FastAPI',
]
