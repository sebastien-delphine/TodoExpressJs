FORMAT: 1A

# TodoBackend

TodoBackend is a todo storage backend for [TodoMVC](https://docs.google.com/document/d/1tj_MuyutV6_vzfDpYeEvTuy4n_9ceKPAX8T5lStg2h0/edit#heading=h.1ckta8owmpjv).

## Todos collection [/todos]

### Create a Todo [POST]

Allows to create a Todo.

Returns a 201 "Created" response if the todo has been created successfully. **Make sure that to be RFC-compliant, the Location header must be set with the URL field as a value.**

Returns a 400 "Bad Request" response if the data passed as a request body doesn't pass validation checks.

Returns a 409 "Conflict" if the "title" field has a value which another todo's title has, we forbid duplicate titles !

+ Request
    + Headers

            Accept: application/json
            Content-Type: application/json

    + Body

            {
                "title": "dredd"
            }

    + Schema

            {
                "type: "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "The title of the todo",
                        "pattern": "^(?!\s*$).+"
                    }
                },
                "additionalProperties": false,
                "required": ["title"]
            }

+ Response 201

    + Headers

            Content-Type: application/json
            Location: http://my.server/todos/9707fbdd-da74-4998-a532-9444ccf83d9e
    
    + Body

            {
                "id": "9707fbdd-da74-4998-a532-9444ccf83d9e",
                "title": "dredd",
                "completed": false,
                "order": 1,
                "url": "http://my.server/todos/9707fbdd-da74-4998-a532-9444ccf83d9e"
            }

    + Schema

            {
                "type: "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The ID of the todo, typically a UUID"
                    },
                    "title": {
                        "type": "string",
                        "description": "The title of the todo"
                    },
                    "completed": {
                        "type": "boolean",
                        "description: "The todo's completion status"
                    },
                    "order": {
                        "type": "number",
                        "description": "The order of the todo"
                    },
                    "url": {
                        "type": "string",
                        "description": "The URL of the todo resource, depending on the deployed server"
                    }
                },
                "additionalProperties": false,
                "required": ["id", "title", "completed", "order", "url"]
            }

+ Response 400
+ Response 409

### List Todos [GET]

Allows to fetch all stored todos.

It should return a 200 "Ok" response if the todos have been fetched successfully, with the todos list as a body. **The todos must be ordered in ascending order, using their 'order' field.**

+ Request
    + Headers

            Accept: application/json

+ Response 200

    + Headers
            
            Content-Type: application/json

    + Body

            [
                {
                    "id": "9707fbdd-da74-4998-a532-9444ccf83d9e",
                    "title": "dredd",
                    "completed": false,
                    "order": 1,
                    "url": "http://my.server/todos/9707fbdd-da74-4998-a532-9444ccf83d9e"
                }
            ]
    
    + Schema

            {
                "type: "array",
                "items": {
                    "$ref": "/schemas/todo"
                },
                "$defs": {
                    "todo": {
                        "type: "object",
                        "properties": {
                            "id": {
                                "type": "string",
                                "description": "The ID of the todo, typically a UUID"
                            },
                            "title": {
                                "type": "string",
                                "description": "The title of the todo"
                            },
                            "completed": {
                                "type": "boolean",
                                "description: "The todo's completion status"
                            },
                            "order": {
                                "type": "number",
                                "description": "The order of the todo"
                            },
                            "url": {
                                "type": "string",
                                "description": "The URL of the todo resource, depending on the deployed server"
                            }
                        },
                        "additionalProperties": false,
                        "required": ["id", "title", "completed", "order", "url"]
                    }
                }
            }

### Delete all todos [DELETE]

Allows to delete all stored todos.

+ Response 204

## Completed todos collection [/todos/completed]
### Delete all completed todos [DELETE]

Allows to delete all stored todos which are marked as completed.

+ Response 204

## Todo [/todos/{id}]

+ Parameters
    + id (required, string, `9707fbdd-da74-4998-a532-9444ccf83d9e`)

### Get a Todo [GET]

Allows to find a specific todo, using its id.

Returns a 200 "Ok" response if the todo has been found successfully.

Returns a 404 "Not Found" response if the id points to a non-existing todo.

+ Request
    + Headers

            Accept: application/json

+ Response 200

    + Headers

            Content-Type: application/json

    + Body

            {
                "id": "9707fbdd-da74-4998-a532-9444ccf83d9e",
                "title": "dredd",
                "completed": false,
                "order": 1,
                "url": "http://my.server/todos/9707fbdd-da74-4998-a532-9444ccf83d9e"
            }
    
    + Schema

            {
                "type: "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The ID of the todo, typically a UUID"
                    },
                    "title": {
                        "type": "string",
                        "description": "The title of the todo"
                    },
                    "completed": {
                        "type": "boolean",
                        "description: "The todo's completion status"
                    },
                    "order": {
                        "type": "number",
                        "description": "The order of the todo"
                    },
                    "url": {
                        "type": "string",
                        "description": "The URL of the todo resource, depending on the deployed server"
                    }
                },
                "additionalProperties": false,
                "required": ["id", "title", "completed", "order", "url"]
            }

+ Response 404

### Update a Todo [PUT]

Allows to update a specific todo, using its id.

Returns a 200 "Ok" response if the todo has been found and updated successfully.

Returns a 404 "Not Found" response if the id points to a non-existing todo.

Returns a 409 "Conflict" if the "title" field has a value which another todo's title has, we forbid duplicate titles !

Returns a 400 "Bad Request" response if the data passed as a request body doesn't pass validation checks.

**That this endpoint should not support partial updates.**
**The "url" field cannot be updated, it's a read-only field.**

+ Request
    + Headers

            Accept: application/json
            Content-Type: application/json

    + Body

            {
                "title": "dredd",
                "completed": true,
                "order": 1,
            }

    + Schema

            {
                "type: "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "The title of the todo",
                        "pattern": "^(?!\s*$).+"
                    },
                    "completed": {
                        "type": "boolean",
                        "description: "The todo's completion status"
                    },
                    "order": {
                        "type": "number",
                        "description": "The order of the todo",
                        "minimum": 1
                    }
                },
                "additionalProperties": false,
                "required": ["title", "completed", "order"]
            }

+ Response 200

    + Headers

            Content-Type: application/json

    + Body

            {
                "id": "9707fbdd-da74-4998-a532-9444ccf83d9e",
                "title": "dredd",
                "completed": true,
                "order": 1,
                "url": "http://my.server/todos/9707fbdd-da74-4998-a532-9444ccf83d9e"
            }
    
    + Schema

            {
                "type: "object",
                "properties": {
                    "id": {
                        "type": "string",
                        "description": "The ID of the todo, typically a UUID"
                    },
                    "title": {
                        "type": "string",
                        "description": "The title of the todo"
                    },
                    "completed": {
                        "type": "boolean",
                        "description: "The todo's completion status"
                    },
                    "order": {
                        "type": "number",
                        "description": "The order of the todo"
                    },
                    "url": {
                        "type": "string",
                        "description": "The URL of the todo resource, depending on the deployed server"
                    }
                },
                "additionalProperties": false,
                "required": ["id", "title", "completed", "order", "url"]
            }

+ Response 404
+ Response 409
+ Response 400

### Delete a Todo [DELETE]

Allow to delete a specific todo, using its id.

Returns a 204 "No Content" response if the todo has been found and deleted successfully.

Returns a 404 "Not Found" response if the id points to a non-existing todo.

+ Response 204
+ Response 404