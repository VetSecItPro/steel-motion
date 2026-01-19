import Script from 'next/script';

const PersonSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Anouar K. Bencheqroun',
    'jobTitle': 'Founder & CEO',
    'worksFor': {
      '@type': 'Corporation',
      'name': 'Steel Motion LLC',
    },
    'url': 'https://www.steelmotionllc.com/about',
    'image': 'https://www.steelmotionllc.com/images/profile-picture.jpg',
    'sameAs': [
      'https://www.linkedin.com/in/vetsecitpro',
    ],
    'alumniOf': [
      {
        '@type': 'CollegeOrUniversity',
        'name': 'Purdue University',
      },
    ],
    'knowsAbout': [
      'Cybersecurity',
      'Artificial Intelligence',
      'Cloud Computing',
      'SaaS',
      'Enterprise Systems',
      'IT Mission Management',
    ],
  };

  return (
    <Script
      id="person-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default PersonSchema;
