import type { APIRoute } from "astro"


// GET tasks
export const GET: APIRoute = async ({ params, request }) => {
    let body = await request?.json()

    console.log("GET: ", body);

    return new Response(JSON.stringify({ message: 'GET todos', id: params.id, body }))
}

// POST tasks
export const POST: APIRoute = ({ params }) => {
    return new Response(JSON.stringify({ message: 'POST todos', id: params.id }))
}

// DELETE tasks
export const DELETE: APIRoute = ({ params }) => {
    return new Response(JSON.stringify({ message: 'DELETE todos', id: params.id }))
}

// change name
export const PUT: APIRoute = async ({ params, request }) => {
    let body = await request.json()

    console.log("PUT: ", body);

    return new Response(JSON.stringify({ message: 'PUT todos', id: params.id, body }))
}