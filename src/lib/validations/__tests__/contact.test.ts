import { describe, it, expect } from 'vitest'
import { contactFormSchema, validateContactForm } from '../contact'

describe('contactFormSchema', () => {
  describe('valid inputs', () => {
    it('should accept valid form data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Inc',
        message: 'This is a test message with enough characters.',
      }

      const result = contactFormSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should accept valid form data without company', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        company: '',
        message: 'This is a test message with enough characters.',
      }

      const result = contactFormSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should trim whitespace from name', () => {
      const validData = {
        name: '  John Doe  ',
        email: 'john@example.com',
        message: 'This is a test message with enough characters.',
      }

      const result = contactFormSchema.safeParse(validData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.name).toBe('John Doe')
      }
    })
  })

  describe('name validation', () => {
    it('should reject name shorter than 2 characters', () => {
      const invalidData = {
        name: 'A',
        email: 'john@example.com',
        message: 'This is a test message with enough characters.',
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject name longer than 100 characters', () => {
      const invalidData = {
        name: 'A'.repeat(101),
        email: 'john@example.com',
        message: 'This is a test message with enough characters.',
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('email validation', () => {
    it('should reject invalid email format', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'This is a test message with enough characters.',
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject empty email', () => {
      const invalidData = {
        name: 'John Doe',
        email: '',
        message: 'This is a test message with enough characters.',
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('message validation', () => {
    it('should reject message shorter than 10 characters', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short',
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject message longer than 2000 characters', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'A'.repeat(2001),
      }

      const result = contactFormSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})

describe('validateContactForm', () => {
  it('should return success true for valid data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a valid test message.',
    }

    const result = validateContactForm(validData)
    expect(result.success).toBe(true)
  })

  it('should return success false for invalid data', () => {
    const invalidData = {
      name: '',
      email: 'invalid',
      message: 'short',
    }

    const result = validateContactForm(invalidData)
    expect(result.success).toBe(false)
  })
})
