import { Employee, State } from "@/models";

export async function GET() {
  try {
    const statesPromise = await State.findAll();
    const employeesPromise = await Employee.findAll();

    const [states, employees] = await Promise.all([
      statesPromise,
      employeesPromise,
    ]);
    // populate the employees with their states
    employees.forEach((employee) => {
      employee.state = states.find((state) => state.id === employee.stateId);
    });
    return Response.json({ employees });
  } catch (error) {
    return new Response("Loading employees data failed", {
      status: 500,
    });
  }
}
