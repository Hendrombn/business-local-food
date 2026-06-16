import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

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

  console.log(`${categories.length} categories seeded`);

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

  console.log(`Users seeded: ${admin.email}, ${owner.email}, ${user.email}`);

  // ===== BUSINESSES =====
  const padangCategory = categories.find((c) => c.slug === 'padang')!;
  const cafeCategory = categories.find((c) => c.slug === 'cafe')!;
  const seafoodCategory = categories.find((c) => c.slug === 'seafood')!;

  const business1 = await prisma.business.upsert({
    where: { id: 'business-1' },
    update: {},
    create: {
      id: 'business-1',
      userId: owner.id,
      name: 'Warung Padang Sederhana',
      categoryId: padangCategory.id,
      address: 'Jl. Sudirman No. 12, Jakarta Selatan',
      lat: -6.2088,
      lng: 106.8456,
      phone: '08123456789',
      description:
        'Warung Padang authentic dengan cita rasa asli Minang sejak 1985.',
      openTime: '08:00',
      closeTime: '22:00',
      operatingDays: 'Senin - Minggu',
      status: 'ACTIVE',
    },
  });

  const business2 = await prisma.business.upsert({
    where: { id: 'business-2' },
    update: {},
    create: {
      id: 'business-2',
      userId: owner.id,
      name: 'Anomali Coffee Kebayoran',
      categoryId: cafeCategory.id,
      address: 'Jl. Kemang Raya No. 5, Jakarta Selatan',
      lat: -6.2615,
      lng: 106.8106,
      phone: '08198765432',
      description:
        'Specialty coffee dengan biji kopi pilihan dari seluruh Indonesia.',
      openTime: '07:00',
      closeTime: '22:00',
      operatingDays: 'Senin - Minggu',
      status: 'ACTIVE',
    },
  });

  const business3 = await prisma.business.upsert({
    where: { id: 'business-3' },
    update: {},
    create: {
      id: 'business-3',
      userId: owner.id,
      name: 'Seafood 99 Muara Baru',
      categoryId: seafoodCategory.id,
      address: 'Jl. Pluit Selatan No. 88, Jakarta Utara',
      lat: -6.1275,
      lng: 106.7942,
      phone: '08111234567',
      description:
        'Seafood segar langsung dari nelayan dengan harga terjangkau.',
      openTime: '10:00',
      closeTime: '23:00',
      operatingDays: 'Senin - Minggu',
      status: 'ACTIVE',
    },
  });

  console.log('Businesses seeded');

  // ===== MENUS =====
  await prisma.menu.createMany({
    skipDuplicates: true,
    data: [
      {
        businessId: business1.id,
        name: 'Rendang Sapi',
        description: 'Rendang sapi empuk dengan bumbu rempah khas Minang',
        price: 35000,
        isAvailable: true,
      },
      {
        businessId: business1.id,
        name: 'Ayam Pop',
        description: 'Ayam goreng khas Padang dengan sambal hijau',
        price: 28000,
        isAvailable: true,
      },
      {
        businessId: business1.id,
        name: 'Gulai Ikan',
        description: 'Gulai ikan segar dengan kuah santan yang kaya rempah',
        price: 32000,
        isAvailable: true,
      },
      {
        businessId: business2.id,
        name: 'Perfect Pour Over Latte',
        description: 'Espresso Toraja Arabica dengan warm microfoam',
        price: 42000,
        isAvailable: true,
      },
      {
        businessId: business2.id,
        name: 'Cold Brew',
        description: 'Cold brew 12 jam dengan biji kopi Flores',
        price: 38000,
        isAvailable: true,
      },
      {
        businessId: business3.id,
        name: 'Kepiting Saus Padang',
        description: 'Kepiting segar dengan saus padang pedas',
        price: 120000,
        isAvailable: true,
      },
      {
        businessId: business3.id,
        name: 'Udang Bakar',
        description: 'Udang jumbo bakar dengan bumbu special',
        price: 85000,
        isAvailable: true,
      },
    ],
  });

  console.log('Menus seeded');

  // ===== REVIEWS =====
  await prisma.review.createMany({
    skipDuplicates: true,
    data: [
      {
        businessId: business1.id,
        userId: user.id,
        rating: 5,
        comment: 'Rendang terenak yang pernah aku makan! Recommended banget.',
      },
      {
        businessId: business2.id,
        userId: user.id,
        rating: 5,
        comment: 'Kopinya enak banget, tempatnya nyaman untuk kerja.',
      },
      {
        businessId: business3.id,
        userId: user.id,
        rating: 4,
        comment: 'Seafood segar, harga reasonable. Parkir agak susah.',
      },
    ],
  });

  console.log('Reviews seeded');
  console.log(' Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
