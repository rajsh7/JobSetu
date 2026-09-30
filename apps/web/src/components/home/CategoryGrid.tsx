import Link from 'next/link'

const categories = [
  {
    label: 'Latest Jobs',
    href: '/latest-jobs',
    emoji: '🏛️',
    color: 'bg-green-50 border-green-200 text-green-800',
    iconBg: 'bg-green-100',
  },
  {
    label: 'Results',
    href: '/results',
    emoji: '📋',
    color: 'bg-red-50 border-red-200 text-red-800',
    iconBg: 'bg-red-100',
  },
  {
    label: 'Admit Cards',
    href: '/admit-cards',
    emoji: '🪪',
    color: 'bg-cyan-50 border-cyan-200 text-cyan-800',
    iconBg: 'bg-cyan-100',
  },
  {
    label: 'Private Jobs',
    href: '/private-jobs',
    emoji: '💼',
    color: 'bg-purple-50 border-purple-200 text-purple-800',
    iconBg: 'bg-purple-100',
  },
  {
    label: 'Top Exams',
    href: '/top-exams',
    emoji: '🏆',
    color: 'bg-amber-50 border-amber-200 text-amber-800',
    iconBg: 'bg-amber-100',
  },
  {
    label: 'Answer Keys',
    href: '/answer-keys',
    emoji: '🔑',
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    iconBg: 'bg-blue-100',
  },
]

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {categories.map((cat) => (
        <Link
          key={cat.href}
          href={cat.href}
          className={`job-card flex flex-col items-center gap-2 border px-3 py-4 text-center transition-all ${cat.color}`}
        >
          <span className={`flex h-10 w-10 items-center justify-center rounded-full text-xl ${cat.iconBg}`}>
            {cat.emoji}
          </span>
          <span className="text-xs font-semibold leading-tight">{cat.label}</span>
        </Link>
      ))}
    </div>
  )
}
