import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const guests = [
    { name: "Mehara Sahabandu", slug: "mehara" },
    { name: "Amara Silva", slug: "amara" },
    { name: "Kasun Perera", slug: "kasun" },
    { name: "Dilani Fernando", slug: "dilani" },
    { name: "Nuwan Rajapaksa", slug: "nuwan" },
  ];

  for (const guest of guests) {
    await prisma.guest.upsert({
      where: { slug: guest.slug },
      update: {},
      create: guest,
    });
  }

  console.log("✅ Guests seeded. Share these links:");
  for (const g of guests) {
    console.log(`  http://localhost:3000/invite/${g.slug}  →  ${g.name}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
