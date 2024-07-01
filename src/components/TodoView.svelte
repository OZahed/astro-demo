<script lang="ts">
    import { onMount } from 'svelte';
    import type { TodoType } from './types/todos';
    import Todo from './Todo.svelte';

    let value = "";
    let error = false;

    let todos: TodoType[] = [];
    onMount(async () => {
       todos = await getTodos();
    });


    async function getTodos(): Promise<TodoType[]> {
        let res = await fetch('/todos/api/todos');
        return (await res.json()).todos as TodoType[];
    }

    async function addTodo() {
        try{
            await fetch('/todos/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: value, done: false }),
            });

            todos = await getTodos();
        }catch(e){
            error = true;
        }
    }


    
  let lastTyped: Date;
  function updateTodo() {
    if (value.length >= 20) {
      value = value.slice(0, 20);
      return;
    }

    let typedAt = new Date();
    checkBounce(typedAt);
    lastTyped = typedAt;
  }

  function checkBounce(typedAt: Date) {
    setTimeout(() => {
      if (lastTyped.getTime() - typedAt.getTime() === 0) {
        addTodo();
        value = "";
      }
    }, 1000);
  }
</script>

<div class="flex flex-col gap-4">
    <input type="text" class="my-4 text-2xl border-2 rounded-xl p-2 {error? ' border-red-700' : 'border-gray-500'}" bind:value={value} on:input={updateTodo} placeholder="write the Task title here and wait...">
    {#each todos as todo (todo.id)}
        <Todo {todo} />
    {/each}
</div>
