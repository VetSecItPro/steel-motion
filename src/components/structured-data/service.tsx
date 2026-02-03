import Script from 'next/script';

interface ServiceSchemaProps {
  service: {
    name: string;
    description: string;
    url: string;
  };
}

const ServiceSchema = ({ service }: ServiceSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.name,
    'description': service.description,
    'url': service.url,
    'provider': {
      '@type': 'Corporation',
      'name': 'Steel Motion LLC',
      'url': 'https://www.steelmotionllc.com',
    },
  };

  return (
    <Script
      id={`service-schema-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default ServiceSchema;
