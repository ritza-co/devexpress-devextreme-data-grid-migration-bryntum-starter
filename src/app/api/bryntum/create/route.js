import { Employee } from '@/models';

export async function POST(request) {
    const reqBody = await request.json();

    try {
        const employee = await Employee.create(reqBody);
        return Response.json([employee]);
    }
    catch (error) {
        return new Response('Adding employee failed', {
            status : 500
        });
    }
}
