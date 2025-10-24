#!/usr/bin/env tsx

import { seedDatabase } from './src/lib/seed';

async function main() {
  try {
    console.log('🚀 Starting VIKAAS database seeding...');
    const results = await seedDatabase();
    console.log('📊 Seeding results:', results);
    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

main();