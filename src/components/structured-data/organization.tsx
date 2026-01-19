import Script from 'next/script';

const OrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    'name': 'Steel Motion LLC',
    'url': 'https://www.steelmotionllc.com',
    'logo': 'https://www.steelmotionllc.com/images/steel-motion-hero-logo.svg',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+1-555-555-5555', // Add a real phone number when available
      'contactType': 'customer service',
    },
    'sameAs': [
      'https://www.linkedin.com/in/vetsecitpro',
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default OrganizationSchema;
