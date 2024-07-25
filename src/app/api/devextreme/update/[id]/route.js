import { Employee } from "@/models";

export async function PUT(request, { params }) {
  const id = params.id;
  const reqBody = await request.json();

  try {
    await Employee.update(reqBody, { where: { id } });
    const updatedEmployee = await Employee.findByPk(id);

    return Response.json(updatedEmployee);
  } catch (error) {
    return new Response("Updating employees data failed", {
      status: 500,
    });
  }
}
