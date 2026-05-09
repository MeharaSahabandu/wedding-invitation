import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const guests = [
    { name: "Mehara Sahabandu", slug: "mehara", email: "mehara@gmail.com", phone: "72 685 6154" },
    { name: "Amara Silva",      slug: "amara",  email: "amara@gmail.com",  phone: "71 234 5678" },
    { name: "Kasun Perera",     slug: "kasun",  email: "kasun@gmail.com",  phone: "77 345 6789" },
    { name: "Dilani Fernando",  slug: "dilani", email: "dilani@gmail.com", phone: "76 456 7890" },
    { name: "Nuwan Rajapaksa",  slug: "nuwan",  email: "nuwan@gmail.com",  phone: "70 567 8901" },
  ];

  for (const guest of guests) {
    await prisma.guest.upsert({
      where: { slug: guest.slug },
      update: { email: guest.email, phone: guest.phone },
      create: guest,
    });
  }

  console.log("✅ Guests seeded:");
  for (const g of guests) {
    console.log(`  /invite/${g.slug}  →  ${g.name}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
