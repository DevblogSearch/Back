const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ users: [] }).write();

const Sequelize = require('sequelize');
var db_config  = require('./config/db-config.json');
const sequelize = new Sequelize(
    db_config.database,		
    db_config.user,
    db_config.password,
    {
        'host':db_config.database,
        'dialect':'mysql'
    }
);

const User = Sequelize.define('user', {
    id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.String,
        isEmail: true,
        unique: true
    },
    displayName: {
        type: Sequelize.String
    }
});

const Blog = Sequelize.define('blog', {
    id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false 
    },
    url: {
        type: Sequelize.String
    },
    weight: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

const LikeEvent = Sequelize.define('like_event', {
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
    }
});

User.belongsToMany(LikeEvent, { through: 'user_id' });
Blog.belongsToMany(LikeEvent, { through: 'blog_id' });

module.exports = db;
