const REGIONS = [
  { name: 'North America', latMin: 25, latMax: 50, lngMin: -125, lngMax: -70 },
  { name: 'Europe', latMin: 35, latMax: 60, lngMin: -10, lngMax: 40 },
  { name: 'Asia', latMin: 10, latMax: 50, lngMin: 60, lngMax: 140 },
  { name: 'Australia', latMin: -40, latMax: -12, lngMin: 110, lngMax: 155 }
];

const SECTORS = [
  { name: 'Education', names: ['Global Academy', 'Digital Library', 'Science Hub', 'Primary School Improvement', 'Education Tech Platform'] },
  { name: 'Healthcare', names: ['Community Hospital', 'Wellness Center', 'Medical Research Lab', 'Telemedicine App', 'Vaccine Distribution'] },
  { name: 'Infrastructure', names: ['Bypass Bridge', 'Smart Highway', 'Renewable Power Plant', 'Urban Metro Extension', 'Water Treatment Facility'] },
  { name: 'Environment', names: ['Rainforest Preservation', 'Ocean Cleanup', 'Solar Park', 'Carbon Capture Lab', 'Wildlife Sanctuary'] },
  { name: 'Technology', names: ['AI Ethics Center', 'Cloud Computing Hub', 'Cybersecurity Initiative', 'Startup Incubator', 'Quantum Computing Lab'] }
];

const STATUSES = ['Active', 'Pending', 'Completed', 'On Hold'];

export const generateData = (count = 5000) => {
  return Array.from({ length: count }, (_, i) => {
    const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
    const sector = SECTORS[Math.floor(Math.random() * SECTORS.length)];
    const baseName = sector.names[Math.floor(Math.random() * sector.names.length)];
    
    return {
      id: i + 1,
      projectName: `${baseName} - Phase ${Math.floor(i / 100) + 1}`,
      category: sector.name,
      latitude: Math.random() * (region.latMax - region.latMin) + region.latMin,
      longitude: Math.random() * (region.lngMax - region.lngMin) + region.lngMin,
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      lastUpdated: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365).toISOString(),
      region: region.name
    };
  });
};

const database = generateData(5000);

export const fetchProjects = async () => {
  await new Promise(r => setTimeout(r, 200));
  return database;
};

export const getStatuses = () => STATUSES;
