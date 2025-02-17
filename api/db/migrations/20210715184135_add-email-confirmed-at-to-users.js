const TABLE_NAME = 'users';
const COLUMN_NAME = 'emailConfirmedAt';

const up = function (knex) {
  return knex.schema.table(TABLE_NAME, function (table) {
    table.dateTime(COLUMN_NAME);
  });
};

const down = function (knex) {
  return knex.schema.table(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
};

export { down, up };
