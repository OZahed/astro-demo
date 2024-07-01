import type { APIRoute } from "astro"
import { db, desc, Todo } from "astro:db";


export const prerender = false;

export const GET: APIRoute = async ({ }) => {
    const todos = await db.select().from(Todo).orderBy(desc(Todo.created_at)).all();
    return new Response(JSON.stringify({ todos }))
}

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const todo = await db.insert(Todo).values(body).returning();
    return new Response(JSON.stringify(todo))
}