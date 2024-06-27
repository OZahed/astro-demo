import { db, Todo } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(Todo).values([
		{
			id: 1,
			title: "Hello World",
			done: false
		},
		{
			id: 2,
			title: "First Task",
			done: true
		},
		{
			id: 3,
			title: "Another Task",
			done: true
		},
		{
			id: 4,
			title: "Keep going",
			done: true
		},
		{
			id: 5,
			title: "this is a test",
			done: false
		},
		{
			id: 6,
			title: "test task #15",
			done: false
		},
		{
			id: 7,
			title: "test Title #16",
			done: false
		}
	])
}
