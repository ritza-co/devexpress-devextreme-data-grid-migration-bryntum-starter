import { Employee } from '@/models';

export async function GET() {
    try {
        const employees = await Employee.findAll();
        return Response.json(employees);
    }
    catch (error) {
        return new Response('Loading employees data failed', {
            status : 500
        });
    }
}
