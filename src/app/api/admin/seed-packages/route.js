import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/admin/seed-packages
 * Seed the database with point packages
 * This is an admin endpoint - add authentication in production
 */
export async function POST(request) {
  try {
    console.log("🌱 Seeding point packages...");

    // Delete existing packages (optional)
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
    const createdPackages = [];
    for (const pkg of packages) {
      const created = await prisma.pointPackage.create({
        data: pkg,
      });
      createdPackages.push(created);
      console.log(
        `✅ Created package: ${created.name} (${
          created.points + created.bonusPoints
        } total points)`
      );
    }

    console.log("\n🎉 Successfully seeded point packages!");
    console.log(`Total packages created: ${packages.length}`);

    return NextResponse.json(
      {
        success: true,
        message: "Point packages seeded successfully",
        packagesCreated: createdPackages.length,
        packages: createdPackages.map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          totalPoints: pkg.points + pkg.bonusPoints,
        })),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error seeding packages:", error);
    return NextResponse.json(
      {
        error: "Failed to seed packages",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/seed-packages
 * Check if packages exist
 */
export async function GET(request) {
  try {
    const count = await prisma.pointPackage.count();
    const packages = await prisma.pointPackage.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({
      success: true,
      packagesCount: count,
      packages: packages.map((pkg) => ({
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        points: pkg.points,
        bonusPoints: pkg.bonusPoints,
        totalPoints: pkg.points + pkg.bonusPoints,
        isActive: pkg.isActive,
      })),
    });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch packages",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
