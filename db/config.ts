import { column, defineDb, defineTable } from 'astro:db';

const Todo = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    done: column.boolean()
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { Todo }
});