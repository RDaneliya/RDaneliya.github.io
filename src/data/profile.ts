export type ContactId = 'email' | 'github' | 'linkedin'

export type ContactChannel = {
  id: ContactId
  labelKey: ContactId
  href: string
  display: string
}

export const profile = {
  name: 'Roman Daneliya',
  email: 'rdaneliya@yandex.ru',
  github: 'https://github.com/RDaneliya',
  linkedin: 'https://www.linkedin.com/in/roman-daneliya',
  /** Static home fallback when visitor geo is off or failed */
  homeCoords: "56°29'N 84°57'E",
  idCode: 'us.dc.00000',
} as const

export const contacts: ContactChannel[] = [
  {
    id: 'email',
    labelKey: 'email',
    href: `mailto:${profile.email}`,
    display: profile.email,
  },
  {
    id: 'github',
    labelKey: 'github',
    href: profile.github,
    display: profile.github,
  },
  {
    id: 'linkedin',
    labelKey: 'linkedin',
    href: profile.linkedin,
    display: profile.linkedin,
  },
]
