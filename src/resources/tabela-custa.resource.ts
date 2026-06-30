import { defineResource } from 'nest-drizzle-api-kit';
import { tabelaCusta } from '../modules/custas/database/tables';

export const tabelaCustaResource = defineResource({
  name: 'tabelaCusta',
  table: tabelaCusta,
  query: {
    pagination: true,
    filters: [{ field: 'descricao', operators: ['ilike'] }],
  },
});
