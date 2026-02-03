import { z } from 'zod';

export const partnershipFormSchema = z.object({
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
  organization: z
    .string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(200, 'Organization name must be less than 200 characters'),
  partnershipType: z.enum(
    ['referral', 'overflow-subcontracting', 'complementary-services', 'product-integration', 'veteran-network', 'other'],
    { message: 'Please select a partnership type' }
  ),
  message: z
    .string()
    .min(20, 'Please provide more details (at least 20 characters)')
    .max(3000, 'Message must be less than 3000 characters'),
  fax: z.string().optional(),
});

export type PartnershipFormData = z.infer<typeof partnershipFormSchema>;

export const validatePartnershipForm = (data: unknown) => {
  return partnershipFormSchema.safeParse(data);
};
