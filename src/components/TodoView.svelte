<script lang="ts">
    import { onMount } from 'svelte';
    import type { TodoType } from './types/todos';
    import Todo from './Todo.svelte';

    let todos: TodoType[] = [];
    onMount(async () => {
        let res = await fetch('/todos/api/todos');
        todos = (await res.json()).todos;
    });
</script>

<div class="flex flex-col gap-4">
    {#each todos as todo (todo.id)}
        <Todo {todo} />
    {/each}
</div>
