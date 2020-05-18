exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("password_recovery_token");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
