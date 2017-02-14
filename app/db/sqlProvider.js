const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

const sqlProvider = {
  users: {
    all: sql('./sql/user/all.sql'),
    find: sql('./sql/user/find.sql'),
    create: sql('./sql/user/create.sql'),
    save: sql('./sql/user/save.sql'),
    delete: sql('./sql/user/delete.sql'),
  },
  usersTrailers: {
    all: sql('./sql/userTrailer/all.sql'),
    create: sql('./sql/userTrailer/create.sql'),
  },
};

module.exports = sqlProvider;
