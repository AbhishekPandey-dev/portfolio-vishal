export interface Project {
  id: string
  title: string
  category: string
  year: string
  description: string
  tags: string[]
  coverImage: string
  url?: string
}

export interface Service {
  id: string
  title: string
  description: string
  tags: string[]
  icon?: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface NavItem {
  label: string
  href: string
}
