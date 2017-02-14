const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

const sqlProvider = {
  users: {
    all: sql('./sql/user/all.sql'),
    where: sql('./sql/user/where.sql'),
    find: sql('./sql/user/find.sql'),
    create: sql('./sql/user/create.sql'),
    save: sql('./sql/user/save.sql'),
    delete: sql('./sql/user/delete.sql'),
  },
  trailers: {
    all: sql('./sql/trailer/all.sql'),
    find: sql('./sql/trailer/find.sql'),
    create: sql('./sql/trailer/create.sql'),
    save: sql('./sql/trailer/save.sql'),
    delete: sql('./sql/trailer/delete.sql'),
  },
};

module.exports = sqlProvider;
