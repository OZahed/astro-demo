import type { APIRoute } from "astro"
import { db, eq, isDbError, Todo } from "astro:db";
import type { TodoType } from "../../../../components/types/todos";


// GET tasks
export const GET: APIRoute = async ({ params, request }) => {
    try {
        const res = await db.select().from(Todo).where(eq(Todo.id, Number(params.id!)));
        return new Response(JSON.stringify({ res }))
    }catch(e){
        return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
    }
    
}

// POST tasks
export const POST: APIRoute = async ({ params, request }) => {
    try{
        const body:TodoType = await request.json();
        
        if (`${body.id}` !== params.id) return new Response(JSON.stringify({ message: 'ID is auto-generated' }), { status: 400 });
        
        await db.update(Todo).set({ title: body.title, done:body.done }).where(eq(Todo.id, Number(params.id!)));
        return new Response(JSON.stringify({ message: 'Todo added', id: params.id }))
    }catch(e){
        return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
    }
}

// DELETE tasks
export const DELETE: APIRoute = async ({ params }) => {
    try{
        await db.delete(Todo).where(eq(Todo.id, Number(params.id!) ));
        return new Response(JSON.stringify({ message: 'Todo deleted', id: params.id }))
    }catch(e){
        return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
    }
}

// change name
export const PUT: APIRoute = async ({ params, request }) => {
    try {
        const body:TodoType = await request?.json();
        let res:TodoType = (await db.select().from(Todo).where(eq(Todo.id, Number(params.id!)))).at(0) as TodoType;
        if (!res) {
            return new Response(JSON.stringify({ message: 'Todo not found' }), { status: 404 });
        }

        res.title = body.title;
        res.done = body.done;
        await db.update(Todo).set({ ...res }).where(eq(Todo.id, Number(params.id!)));

        return new Response(JSON.stringify({ message: 'Todo updated', id: params.id }))
    } catch (e) {
        if (isDbError(e)) {
            return new Response(JSON.stringify({ message: e.message }), { status: 400 });
        }
        return new Response(JSON.stringify({ message: 'An error occurred' }), { status: 500 });
    }
}