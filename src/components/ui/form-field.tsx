'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from './input'
import { Textarea } from './textarea'
import { motion, AnimatePresence } from 'framer-motion'
import { slideInDownShort } from '@/lib/animations'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  error?: string
  required?: boolean
  className?: string
  inputClassName?: string
  rows?: number
  children?: React.ReactNode // For select options
  tabIndex?: number
  autoComplete?: string
}

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  className,
  inputClassName,
  rows = 4,
  children,
  tabIndex,
  autoComplete,
}: FormFieldProps) {
  const inputId = `field-${name}`
  const errorId = `${inputId}-error`
  const hasError = Boolean(error)

  const baseInputClasses = cn(
    'bg-sm-surface-elevated border-sm-border-default text-sm-text-primary placeholder:text-sm-text-muted',
    'focus:border-sm-accent-primary focus:ring-sm-accent-primary/20',
    'transition-all duration-200',
    hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500/20 animate-shake',
    inputClassName
  )

  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-sm-text-secondary"
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <Textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={baseInputClasses}
          tabIndex={tabIndex}
          autoComplete={autoComplete}
        />
      ) : type === 'select' ? (
        <div className="relative">
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={cn(
              'flex h-10 w-full rounded-md border px-3 pr-10 py-2 text-sm appearance-none',
              baseInputClasses
            )}
            tabIndex={tabIndex}
            autoComplete={autoComplete}
          >
            {children}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sm-text-muted"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      ) : (
        <Input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={baseInputClasses}
          tabIndex={tabIndex}
          autoComplete={autoComplete}
        />
      )}

      <AnimatePresence mode="wait">
        {hasError && (
          <motion.p
            id={errorId}
            {...slideInDownShort}
            className="text-sm text-red-400 flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// Add shake animation to globals.css
// This component expects the following CSS:
// @keyframes shake {
//   0%, 100% { transform: translateX(0); }
//   25% { transform: translateX(-4px); }
//   75% { transform: translateX(4px); }
// }
// .animate-shake { animation: shake 0.3s ease-in-out; }
