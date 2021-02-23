exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments();
    tbl.string('username', 128).notnullable().unique();
    tbl.string('password', 256).notnullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
