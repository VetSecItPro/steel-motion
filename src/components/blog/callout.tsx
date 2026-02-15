import { AlertCircle, AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react'

const variants = {
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: AlertCircle,
    iconColor: 'text-blue-600',
  },
  warning: {
    bg: 'bg-amber-50 border-amber-200',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
  },
  success: {
    bg: 'bg-green-50 border-green-200',
    icon: CheckCircle,
    iconColor: 'text-green-600',
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    icon: XCircle,
    iconColor: 'text-red-600',
  },
  tip: {
    bg: 'bg-purple-50 border-purple-200',
    icon: Lightbulb,
    iconColor: 'text-purple-600',
  },
}

interface CalloutProps {
  type?: keyof typeof variants
  title?: string
  children: React.ReactNode
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const variant = variants[type]
  const Icon = variant.icon

  return (
    <div className={`rounded-lg border p-4 my-6 ${variant.bg}`}>
      <div className="flex gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${variant.iconColor}`} />
        <div className="min-w-0">
          {title && (
            <p className="font-semibold text-sm-text-primary mb-1">{title}</p>
          )}
          <div className="text-sm text-sm-text-secondary [&>p]:m-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
