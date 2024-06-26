<script lang="ts">
  import type { TodoType } from './types/todos';

  export let todo: TodoType;

  function deleteTodo(id: number) {
    // delete todo
    fetch(`/todos/api/todos/${id}`, { method: 'DELETE' });
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
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        });
      }
    }, 2000);
  }

  function doneTodo(id: number) {
    todo.done = !todo.done;
    fetch(`/todos/api/todos/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
  }
</script>

<div
  class="flex w-full flex-row items-center justify-around gap-4 mx-4 my-2 px-4 shadow-md border border-gray-50"
>
  <input
    type="checkbox"
    class="px-4 text-center text-xl text-gray-700 w-1/8"
    bind:checked={todo.done}
  />
  <input
    class="px-4 text-center text-xl text-gray w-2/3 border-b border-b-gray-500 {todo.done
      ? 'line-through'
      : ''}"
    on:input={() => {
      updateTodo(todo.id);
    }}
    bind:value={todo.title}
  />

  <div class="w-1/4 flex flex-row gap-2 items-start justify-between">
    <button
      disabled={todo.done}
      on:click={() => {
        deleteTodo(todo.id);
      }}
      class="font-bold py-4 rounded-md w-1/2 {!todo.done
        ? 'text-red-800 underline underline-offset-4'
        : 'text-gray-400'}">Delete</button
    >
    <button
      on:click={() => {
        doneTodo(todo.id);
      }}
      disabled={todo.done}
      class="py-4 rounded-md w-1/2 {!todo.done
        ? 'text-blue-800 underline underline-offset-4'
        : 'text-gray-400'}">Done</button
    >
  </div>
</div>
