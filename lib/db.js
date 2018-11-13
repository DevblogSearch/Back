const Sequelize = require('sequelize');
const db_config = require('../config/db_config.json');

const sequelize = new Sequelize(
  db_config.database,
  db_config.user,
  db_config.password, {
    'host': db_config.host,
    'dialect': 'mysql'
  }
);

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  displayName: {
    type: Sequelize.STRING
  }
});

const Blog = sequelize.define('blog', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING
  },
  weight: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

const LikeEvent = sequelize.define('like_event', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const PingEvent = sequelize.define('ping_event', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  blog_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.belongsToMany(LikeEvent, {
  through: 'user_id'
});
User.belongsToMany(PingEvent, {
  through: 'user_id'
});
Blog.belongsToMany(PingEvent, {
  through: 'blog_id'
});

sequelize.sync();

module.exports = { sequelize, User, Blog, LikeEvent, PingEvent };