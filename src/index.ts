import { eq } from "drizzle-orm";
import { index } from "./db/index.js";
import { departments } from "./db/schema/index.js";

async function main() {
  try {
    console.log("Performing CRUD operations...");

    const [newDepartment] = await index
      .insert(departments)
      .values({ code: "ADM", name: "Administration", description: "Admin department" })
      .returning();

    if (!newDepartment) {
      throw new Error("Failed to create department");
    }

    console.log("✅ CREATE: New department created:", newDepartment);

    const foundDepartment = await index
      .select()
      .from(departments)
      .where(eq(departments.id, newDepartment.id));
    console.log("✅ READ: Found department:", foundDepartment[0]);

    const [updatedDepartment] = await index
      .update(departments)
      .set({ name: "Administration Updated" })
      .where(eq(departments.id, newDepartment.id))
      .returning();

    if (!updatedDepartment) {
      throw new Error("Failed to update department");
    }

    console.log("✅ UPDATE: Department updated:", updatedDepartment);

    await index.delete(departments).where(eq(departments.id, newDepartment.id));
    console.log("✅ DELETE: Department deleted.");

    console.log("\nCRUD operations completed successfully.");
  } catch (error) {
    console.error("❌ Error performing CRUD operations:", error);
    process.exit(1);
  }
}

main();