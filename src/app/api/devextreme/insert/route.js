import { Employee } from "@/models";

export async function POST(request) {
  const reqBody = await request.json();

  try {
    const employee = await Employee.create(reqBody);
    // Get the default values from the model's attributes
    const allFields = {};
    Object.keys(Employee.getAttributes()).forEach((field) => {
      allFields[field] = employee[field] !== undefined ? employee[field] : null;
    });
    return Response.json(allFields);
  } catch (error) {
    return new Response("Adding employee failed", {
      status: 500,
    });
  }
}
