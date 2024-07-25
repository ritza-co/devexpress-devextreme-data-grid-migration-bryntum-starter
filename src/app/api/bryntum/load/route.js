import { Employee } from "@/models";

export async function GET() {
  try {
    const employees = await Employee.findAll();
    return Response.json({
      success: true,
      data: employees,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Loading employee data failed",
    }).status(500);
  }
}
