import { NOW, column, defineDb, defineTable } from 'astro:db';

const Todo = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text({unique: true}),
    done: column.boolean(),
    created_at: column.date({default: NOW}),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { Todo }
});