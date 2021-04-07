const Sequelize = require('sequelize');

// Defconsole.log(process.env);
const db = new Sequelize({
  host: 'localhost',
  database: 'realworlddb',
  username: 'root',
  password: '',
  dialect: 'mysql',

});

const Users = db.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
    unique: true,
    allNull: false,
  },
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  bio: Sequelize.STRING,
  image: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Articles = db.define('article', {
  slug: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(100),
  },
  body: Sequelize.STRING,
});

const Comments = db.define('comment', {
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Tags = db.define('tag', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
});

// setting relationship
// comments -> arrticles
Comments.belongsTo(Articles);
Articles.hasMany(Comments);

// comments -> Users @author
Comments.belongsTo(Users, { as: 'author' });

// articles -> user @autor
Articles.belongsTo(Users, { as: 'author' });
Users.hasMany(Articles);

// articles -- Users @favourites
Articles.belongsToMany(Users, { through: 'favourites' });
Users.belongsToMany(Articles, { through: 'favourites' });

// articles -- tags @article_tags
Articles.belongsToMany(Tags, { through: 'article_tags' });
Tags.belongsToMany(Articles, { through: 'article_tags' });

module.exports = {
  db,
  Users,
  Articles,
  Comments,
  Tags,
};