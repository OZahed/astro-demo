import type { APIRoute } from "astro"
import { db, Todo } from "astro:db";


export const prerender = false;

export const GET: APIRoute = async ({ }) => {
    const todos = await db.select().from(Todo);
    return new Response(JSON.stringify({ message: 'GET todos', todos }))
}