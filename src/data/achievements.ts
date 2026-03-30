export interface Achievement {
  id: string
  icon: string
  title: string
  description: string
}

export const achievements = [
  {
    id: 'competition-winner',
    icon: 'Trophy',
    title: 'Competition Winner',
    description: 'IPCS Global Mini Project Competition',
  },
  {
    id: 'enterprise-products',
    icon: 'Building2',
    title: 'Enterprise Products',
    description: '6+ shipped across UAE',
  },
  {
    id: 'engagement-growth',
    icon: 'TrendingUp',
    title: '40% Growth',
    description: 'Engagement uplift at West Avenue',
  },
  {
    id: 'agri-accuracy',
    icon: 'Sprout',
    title: '92.53% Accuracy',
    description: 'AGRI DOCTOR CNN model',
  },
  {
    id: 'privacy-first',
    icon: 'Shield',
    title: 'Privacy-First AI',
    description: 'On-premise systems for sensitive data',
  },
  {
    id: 'uae-market',
    icon: 'Globe',
    title: 'UAE Market',
    description: 'Active AI deployment across industries',
  },
]
