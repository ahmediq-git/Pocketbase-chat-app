migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uddcr7uttu8562i")

  collection.listRule = ""

  // remove
  collection.schema.removeField("ojcyrfzq")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uddcr7uttu8562i")

  collection.listRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ojcyrfzq",
    "name": "Timestamp",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
