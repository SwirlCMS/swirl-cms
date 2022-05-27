const {v4 : uuidv4} = require('uuid')
const { Page, ComponentCategory, ComponentType } = require('./models')

function getPageById(id) {
  return Page.findByPk(id);
}

function getPageBySlug(slug) {
  return Page.findOne({ where: { slug } });
}

async function getComponentSelection() {
  const categories = await ComponentCategory.findAll()
  const types = await ComponentType.findAll()

  return categories.map(category => {
    const typesInCategory = types.filter(type => type.categoryId === category.id)
    return {
      ...category.dataValues,
      componentTypes: typesInCategory.map(type => type.dataValues)
    }
  })
}

async function createPage({components, label, slug}) {
  await Page.sync()
  let componentsWithIds

  if (components) {
    componentsWithIds = components.map(component => ({
      ...component,
      id: uuidv4()
    }))
  }

  return Page.create({ components: componentsWithIds || {}, label, slug })
}

async function createComponentCategories(categories) {
  await ComponentCategory.sync()

  return ComponentCategory.bulkCreate(categories)
}

async function createComponentTypes(types) {
  await ComponentType.sync()

  return ComponentType.bulkCreate(types)
}

async function createComponentSchemas(schemas) {
  const schemasWithIds = schemas.map(categories => {
    const categoryId = uuidv4()
    const componentTypes = categories.componentTypes.map(type => ({
      ...type,
      categoryId,
    }))

    return {
      ...categories,
      id: categoryId,
      componentTypes
    }
  })

  const categories = schemasWithIds.map(({label, order, id}) => ({
    id,
    label,
    order
  }))
  const types = schemasWithIds.map(({componentTypes}) => componentTypes).flat()

  const categoriesResults = await createComponentCategories(categories)
    .catch(err => console.log(err))
  console.log(categoriesResults)
  const typesResults = await createComponentTypes(types)
    .catch(err => console.log(err))

  return [categoriesResults, typesResults]
}

module.exports = {
  createPage,
  createComponentSchemas,
  getComponentSelection,
  getPageById,
  getPageBySlug
}