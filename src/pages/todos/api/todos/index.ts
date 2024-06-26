import type { APIRoute } from "astro"
import { readFile } from "fs/promises"


export const prerender = false;

export const GET: APIRoute = async ({ }) => {

    const todos = await getTodosFile()
    return new Response(JSON.stringify({ message: 'GET todos', todos }))
}


async function getTodosFile() {
    let val = await readFile('./todos.json')
    return JSON.parse(val.toString())
}