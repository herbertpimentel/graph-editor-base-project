import { pgTable, serial, varchar, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('usuarios', {
  id: serial('id').primaryKey(),
  username: varchar('username').notNull(),
  name: varchar('nome').notNull(),
  active: boolean('ativo').notNull().default(true),
});
