import sequelize from "@/config/database";
import { Employee } from "@/models";

export async function DELETE(request) {
  const reqBody = await request.json();
  const { ids } = reqBody;
  try {
    await sequelize.transaction(async (t) => {
      await Employee.destroy({
        where: { id: ids },
        transaction: t,
      });
    });

    return Response.json({ success: true });
  } catch (error) {
    const message =
      ids?.length > 1
        ? "Employees could not be deleted"
        : "Employee could not be deleted";

    return new Response(message, {
      status: 500,
    });
  }
}
