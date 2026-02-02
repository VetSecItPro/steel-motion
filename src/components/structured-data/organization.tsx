import Script from 'next/script';

const OrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    'name': 'Steel Motion LLC',
    'url': 'https://steelmotionllc.com',
    'logo': 'https://steelmotionllc.com/images/steel-motion-hero-logo.svg',
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
