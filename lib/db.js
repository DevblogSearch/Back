const Sequelize = require('sequelize');
const db_config = require('../config/db_config.json');

const sequelize = new Sequelize(
  db_config.database,
  db_config.user,
  db_config.password, {
	timestamps: true,
    paranoid: true,
    charset:'utf8',
    collate:'utf8_general_ci',
    host: db_config.host,
    dialect: 'mysql'
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
}, {
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
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
  preview_id: {
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
  blog_id: {
    type: Sequelize.INTEGER,
    allowNull: false 
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const PagePreview = sequelize.define('page_preview', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    }
}, {
  charset: 'utf8',
    collate: 'utf8_unicode_ci'
});

User.belongsToMany(LikeEvent, {
  through: 'user_id'
});
Blog.belongsToMany(PingEvent, {
  through: 'blog_id'
});

sequelize.sync();

module.exports = { sequelize, User, Blog, LikeEvent, PingEvent, PagePreview };
