import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .max(320, 'Email must be less than 320 characters'), // SECURITY: Email max length — FIX-008
  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  fax: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const validateContactForm = (data: unknown) => {
  return contactFormSchema.safeParse(data);
};
