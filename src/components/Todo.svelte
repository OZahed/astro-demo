<script lang="ts">
    import type { TodoType } from "./types/todos";

    export let todo: TodoType;

    let deleted = false;

    async function deleteTodo(id: number) {
        // delete todo
        try {
            await fetch(`/todos/api/todos/${id}`, { method: "DELETE" });
            deleted = true;
        } catch (e) {
            console.error(e);
        }
    }

    let lastTyped: Date;
    function updateTodo(id: number) {
        if (todo.title.length >= 20) {
            todo.title = todo.title.slice(0, 20);
            return;
        }

        let typedAt = new Date();
        checkBounce(typedAt);

        lastTyped = typedAt;
    }

    function checkBounce(typedAt: Date) {
        setTimeout(() => {
            if (lastTyped.getTime() - typedAt.getTime() === 0) {
                fetch(`/todos/api/todos/${todo.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(todo),
                });
            }
        }, 2000);
    }

    function doneTodo(id: number) {
        todo.done = !todo.done;
        fetch(`/todos/api/todos/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });
    }
</script>

<div
    class="flex w-full flex-row items-center justify-around gap-4 mx-auto my-2 border {todo.id %
    2
        ? 'bg-gray-100'
        : ''} {deleted ? 'hidden' : ''}"
>
    <input
        class="px-4 py-2 mb-2 text-xl text-gray-700 w-2/3 border-b-2 border-b-gray-500 rounded-sm {todo.done
            ? 'line-through'
            : ''} {todo.id % 2 ? 'bg-gray-100' : ''}"
        on:input={() => {
            updateTodo(todo.id);
        }}
        bind:value={todo.title}
    />

    <div class="flex flex-row gap-2 items-start my-2 justify-between">
        <button
            disabled={todo.done}
            on:click={() => {
                deleteTodo(todo.id);
            }}
            class="font-bold rounded-md py-1 px-4 {!todo.done
                ? 'text-red-800 bg-red-100 '
                : 'text-gray-400'}">Delete</button
        >

        <button
            on:click={() => {
                doneTodo(todo.id);
            }}
            disabled={todo.done}
            class="font-bold rounded-md py-1 px-4 {!todo.done
                ? 'text-blue-800 bg-blue-100'
                : 'text-gray-400'}">Done</button
        >
    </div>
</div>
