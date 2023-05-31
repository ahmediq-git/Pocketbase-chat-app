migrate((db) => {
  const collection = new Collection({
    "id": "2ww4oz5291mk3cq",
    "created": "2023-05-30 16:51:51.837Z",
    "updated": "2023-05-30 16:51:51.837Z",
    "name": "users_email",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zxi1kmw3",
        "name": "Email",
        "type": "email",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "zn7oop7o",
        "name": "Username",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2ww4oz5291mk3cq");

  return dao.deleteCollection(collection);
})
