import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // ===== CATEGORIES =====
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'padang' },
      update: {},
      create: { name: 'Padang', slug: 'padang' },
    }),
    prisma.category.upsert({
      where: { slug: 'bakso' },
      update: {},
      create: { name: 'Bakso', slug: 'bakso' },
    }),
    prisma.category.upsert({
      where: { slug: 'seafood' },
      update: {},
      create: { name: 'Seafood', slug: 'seafood' },
    }),
    prisma.category.upsert({
      where: { slug: 'cafe' },
      update: {},
      create: { name: 'Cafe', slug: 'cafe' },
    }),
    prisma.category.upsert({
      where: { slug: 'street-food' },
      update: {},
      create: { name: 'Street Food', slug: 'street-food' },
    }),
    prisma.category.upsert({
      where: { slug: 'chinese' },
      update: {},
      create: { name: 'Chinese', slug: 'chinese' },
    }),
    prisma.category.upsert({
      where: { slug: 'japanese' },
      update: {},
      create: { name: 'Japanese', slug: 'japanese' },
    }),
    prisma.category.upsert({
      where: { slug: 'western' },
      update: {},
      create: { name: 'Western', slug: 'western' },
    }),
  ]);

  console.log(`✅ ${categories.length} categories seeded`);

  // ===== USERS =====
  const adminPassword = await bcrypt.hash('admin123', 12);
  const ownerPassword = await bcrypt.hash('owner123', 12);
  const userPassword = await bcrypt.hash('user123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@kulinerlokal.com' },
    update: {},
    create: {
      name: 'Admin Kuliner Lokal',
      email: 'admin@kulinerlokal.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const owner = await prisma.user.upsert({
    where: { email: 'owner@kulinerlokal.com' },
    update: {},
    create: {
      name: 'Budi Santoso',
      email: 'owner@kulinerlokal.com',
      password: ownerPassword,
      role: 'OWNER',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@kulinerlokal.com' },
    update: {},
    create: {
      name: 'Anita Rahma',
      email: 'user@kulinerlokal.com',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log(`✅ Users seeded: ${admin.email}, ${owner.email}, ${user.email}`);

  // ===== BUSINESSES =====
  const padangCategory = categories.find((c) => c.slug === 'padang')!;
  const cafeCategory = categories.find((c) => c.slug === 'cafe')!;
  const seafoodCategory = categories.find((c) => c.slug === 'seafood')!;

  // ... sisanya sama aja
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
