exports.seed = function (knex) {
  return knex('users').then(function () {
    return knex('users').insert([
      { username: 'bethisawesome', password: 'moomoo23' },
    ]);
  });
};
