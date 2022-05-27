const { Sequelize, DataTypes } = require('sequelize');

const user = 'postgres'
const host = 'localhost'
const database = 'test-db'
const password = 'password'
const port = '5432'

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false,
})

const Page = sequelize.define('page', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  slug: {
    type: DataTypes.STRING,
  },
  components: {
    type: DataTypes.JSONB,
  },
  label: {
    type: DataTypes.STRING,
  },
},{
  sequelize,
  modelName: 'page',
})

const ComponentType = sequelize.define('componentType', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING,
  },
  order: {
    type: DataTypes.INTEGER,
  },
  categoryId: {
    type: DataTypes.UUID,
  },
  icon: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'componentType',
})

const ComponentCategory = sequelize.define('componentCategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING,
  },
  order: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize,
  modelName: 'componentCategory',
})

module.exports = {
  sequelize,
  Page,
  ComponentType,
  ComponentCategory,
}