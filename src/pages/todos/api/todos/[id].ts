import type { APIRoute } from "astro"
import { db, eq, Todo } from "astro:db";


// GET tasks
export const GET: APIRoute = async ({ params, request }) => {
    const res = await db.select().from(Todo).where(eq(Todo.id, Number(params.id!)));
    return new Response(JSON.stringify({ res }))
}

// POST tasks
export const POST: APIRoute = async ({ params, request }) => {
    const body = await request?.json();
    await db.update(Todo).set({ ...body }).where(eq(Todo.id, Number(params.id!)));
    return new Response(JSON.stringify({ message: 'Todo added', id: params.id }))
}

// DELETE tasks
export const DELETE: APIRoute = async ({ params }) => {
    await db.delete(Todo).where(eq(Todo.id, Number(params.id!) ));
    return new Response(JSON.stringify({ message: 'Todo deleted', id: params.id }))
}

// change name
export const PUT: APIRoute = async ({ params, request }) => {
    const body = await request?.json();
    await db.update(Todo).set({ ...body }).where(eq(Todo.id, Number(params.id!)));
    return new Response(JSON.stringify({ message: 'Todo updated', id: params.id }))
}