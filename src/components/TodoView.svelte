<script lang="ts">
    import { onMount } from "svelte";
    import type { TodoType } from "./types/todos";
    import Todo from "./Todo.svelte";

    let value = "";
    let error = false;
    let errorMsg = "";

    let todos: TodoType[] = [];
    onMount(async () => {
        todos = await getTodos();
    });

    async function getTodos(): Promise<TodoType[]> {
        let res = await fetch("/todos/api/todos");
        return (await res.json()).todos as TodoType[];
    }

    async function addTodo() {
        let val = value;
        value = "";
        try {
            if (val.trim().length === 0) {
                error = true;
                errorMsg = "Todo Title is required";
                return;
            }
            await fetch("/todos/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: val, done: false }),
            });

            todos = await getTodos();
        } catch (e) {
            error = true;
        }
    }

    function updateTodo() {
        error = false;
        errorMsg = "";

        if (value.length >= 30) {
            value = value.slice(0, 30);
            return;
        }

        if (value.includes("\n")) {
            value = value.replace("\n", "");
            addTodo();
        }
    }
</script>

<div class="flex flex-col gap-4 my-4 px-4 py-8">
    <div class="flex flex-row gap-4 items-stretch {!error ? 'my-4' : 'my-1'}">
        <textarea
            rows="1"
            cols="60"
            class="text-2xl w-3/4 border-2 rounded-xl p-2 {error
                ? ' border-red-700'
                : 'border-gray-500'}"
            bind:value
            on:keyup={updateTodo}
            placeholder="press Enter to add todo"
        />
        <button
            class="w-1/4 bg-blue-100 text-blue-700 border-blue-700 border rounded-xl hover:bg-blue-700 hover:text-white p-2"
            on:click={addTodo}
        >
            Add
        </button>
    </div>
    <span
        class="{!error
            ? 'hidden'
            : 'visible'} text-red-700 font-sans bg-red-100 py-3 px-4"
    >
        {errorMsg}
    </span>
    {#each todos as todo (todo.id)}
        <Todo {todo} />
    {/each}
</div>
