import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedPointPackages() {
  console.log("🌱 Seeding point packages...");

  try {
    // Delete existing packages (optional - comment out if you want to keep existing data)
    await prisma.pointPackage.deleteMany();
    console.log("✅ Cleared existing packages");

    // Create the 3 packages
    const packages = [
      {
        name: "Starter Pack",
        description: "Perfect for getting started with book exchanges",
        price: 9.99,
        points: 500,
        bonusPoints: 0,
        features: [
          "500 Exchange Points",
          "Valid for 6 months",
          "Basic support",
        ],
        validityMonths: 6,
        isActive: true,
        sortOrder: 1,
        badge: null,
      },
      {
        name: "Popular Pack",
        description: "Best value for regular book enthusiasts",
        price: 19.99,
        points: 1000,
        bonusPoints: 200, // Bonus: 200 extra points
        features: [
          "1,200 Exchange Points",
          "Valid for 12 months",
          "Priority support",
          "Bonus: 200 extra points",
        ],
        validityMonths: 12,
        isActive: true,
        sortOrder: 2,
        badge: "Best Value - Save 17%",
      },
      {
        name: "Bulk Pack",
        description: "Maximum value for avid readers and collectors",
        price: 44.99,
        points: 2500,
        bonusPoints: 500, // Bonus: 500 extra points
        features: [
          "3,000 Exchange Points",
          "Valid for 18 months",
          "VIP support",
          "Bonus: 500 extra points",
          "Early access to new books",
        ],
        validityMonths: 18,
        isActive: true,
        sortOrder: 3,
        badge: "Save 25%",
      },
    ];

    // Insert packages
    for (const pkg of packages) {
      const created = await prisma.pointPackage.create({
        data: pkg,
      });
      console.log(
        `✅ Created package: ${created.name} (${
          created.points + created.bonusPoints
        } total points)`
      );
    }

    console.log("\n🎉 Successfully seeded point packages!");
    console.log(`Total packages created: ${packages.length}`);
  } catch (error) {
    console.error("❌ Error seeding packages:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedPointPackages().catch((error) => {
  console.error(error);
  process.exit(1);
});
