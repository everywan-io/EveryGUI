module.exports = {
    "openapi": "3.0.0",
    "info": {
        "title": "everywan",
        "description": "everywan app",
        "version": "0.1.6"
    },
    "servers": [
        {
            "url": "http://localhost",
            "description": "Local development server"
        }
    ],
    "tags": [
        {
            "name": "Authentication",
            "description": "Authentication related calls"
        },
        {
            "name": "Users",
            "description": "User related calls"
        }
    ],
    "paths": {
        "/auth/signup": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Register a user",
                "description": "Register a user",
                "operationId": "Authentication.signup",
                "requestBody": {
                    "description": "User request body. The required fields are only for signup.",
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "required": [
                                    "birthplace",
                                    "device",
                                    "dob",
                                    "email",
                                    "gender",
                                    "name",
                                    "resident",
                                    "surname"
                                ],
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "surname": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string",
                                        "format": "email"
                                    },
                                    "fiscal_code": {
                                        "type": "string"
                                    },
                                    "phone_country": {
                                        "type": "string"
                                    },
                                    "phone_main": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "info": {
                                        "type": "string"
                                    },
                                    "emergency_contacts": {
                                        "type": "string"
                                    },
                                    "gender": {
                                        "type": "string",
                                        "enum": [
                                            "m",
                                            "f"
                                        ]
                                    },
                                    "resident": {
                                        "type": "boolean"
                                    },
                                    "residential_address": {
                                        "type": "string"
                                    },
                                    "location": {
                                        "type": "object",
                                        "properties": {
                                            "latitude": {
                                                "type": "string"
                                            },
                                            "longitude": {
                                                "type": "string"
                                            },
                                            "name": {
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "birthplace": {
                                        "type": "string"
                                    },
                                    "dob": {
                                        "type": "string"
                                    },
                                    "avatar": {
                                        "type": "string",
                                        "description": "attached img",
                                        "format": "binary"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "The request is successfull",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_201"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "The request is malformed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/signup/link/{token}": {
            "get": {
                "tags": [
                    "Authentication"
                ],
                "description": "Confirm a user registration",
                "operationId": "Authentication.activation",
                "parameters": [
                    {
                        "name": "token",
                        "in": "path",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "The request is successfull",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_201"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "The request is malformed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/signin": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Autenticates a user",
                "description": "By passing a valid e-mail and password the system return access token",
                "operationId": "Authentication.signin",
                "requestBody": {
                    "description": "User request body. The required fields are only for signup.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "client_id",
                                    "client_secret",
                                    "grant_type",
                                    "password",
                                    "scope",
                                    "username"
                                ],
                                "type": "object",
                                "properties": {
                                    "grant_type": {
                                        "type": "string"
                                    },
                                    "client_id": {
                                        "type": "string",
                                        "example": "2"
                                    },
                                    "client_secret": {
                                        "type": "string",
                                        "example": "12345678"
                                    },
                                    "username": {
                                        "type": "string",
                                        "example": "user@dummy.it"
                                    },
                                    "password": {
                                        "type": "string",
                                        "example": "12345678"
                                    },
                                    "scope": {
                                        "type": "string",
                                        "example": "*"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "The operator is now authenticated into the system",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_200"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/signout": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Logout a user",
                "description": "Logout a user, return void on success",
                "operationId": "Authentication.signout",
                "responses": {
                    "204": {
                        "description": "The request is successfull",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_201"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            }
        },
        "/auth/operator/signin": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Autenticates a Operator",
                "description": "By passing a valid e-mail and password the system return access token",
                "operationId": "Authentication.Operators.signin",
                "requestBody": {
                    "description": "User request body. The required fields are only for signup.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "client_id",
                                    "client_secret",
                                    "grant_type",
                                    "password",
                                    "scope",
                                    "username"
                                ],
                                "type": "object",
                                "properties": {
                                    "grant_type": {
                                        "type": "string"
                                    },
                                    "client_id": {
                                        "type": "string",
                                        "example": "2"
                                    },
                                    "client_secret": {
                                        "type": "string",
                                        "example": "12345678"
                                    },
                                    "username": {
                                        "type": "string",
                                        "example": "user@dummy.it"
                                    },
                                    "password": {
                                        "type": "string",
                                        "example": "12345678"
                                    },
                                    "scope": {
                                        "type": "string",
                                        "example": "*"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "The operator is now authenticated into the system",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_200_1"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/operator/signout": {
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Logout a Operator",
                "description": "Logout a Operator, return void on success",
                "operationId": "Authentication.Operators.signout",
                "responses": {
                    "204": {
                        "description": "The request is successfull",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_201"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            }
        },
        "/auth/password/recover": {
            "put": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Change the user password",
                "operationId": "Authentication.Password.reset",
                "requestBody": {
                    "description": "User/Operator password put request body.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "email",
                                    "password",
                                    "token"
                                ],
                                "type": "object",
                                "properties": {
                                    "token": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string",
                                        "format": "email"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "The request is successfull",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_201"
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Request a password reset link",
                "operationId": "Authentication.Password.requestRecover",
                "requestBody": {
                    "description": "User/Operator password recover request body.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "email"
                                ],
                                "type": "object",
                                "properties": {
                                    "email": {
                                        "type": "string",
                                        "format": "email"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "The request is successfull",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_201"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/operator/recover/check": {
            "get": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Verifica che il token fornito sia ancora valido per effettuare un reset",
                "operationId": "Authentication.Operators.Password.checkRecoverToken",
                "parameters": [
                    {
                        "name": "Password recovery query parameters",
                        "in": "query",
                        "description": "Password recovery query parameters",
                        "required": true,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Password recovery query parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The request is successfull",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_201"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/operator/recover": {
            "put": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Change the user password",
                "operationId": "Authentication.Operators.Password.reset",
                "requestBody": {
                    "description": "User/Operator password put request body.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "email",
                                    "password",
                                    "token"
                                ],
                                "type": "object",
                                "properties": {
                                    "token": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string",
                                        "format": "email"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "The request is successfull",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_201"
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Request a password reset link",
                "operationId": "Authentication.Operators.Password.requestRecover",
                "requestBody": {
                    "description": "User/Operator password recover request body.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "email"
                                ],
                                "type": "object",
                                "properties": {
                                    "email": {
                                        "type": "string",
                                        "format": "email"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "The request is successfull",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_201"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/password/recover/check": {
            "get": {
                "tags": [
                    "Authentication"
                ],
                "summary": "Check if a recover token and e-mail are valid",
                "operationId": "Authentication.Password.checkRecoverToken",
                "parameters": [
                    {
                        "name": "Password recovery query parameters",
                        "in": "query",
                        "description": "Password recovery query parameters",
                        "required": true,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Password recovery query parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "The request is successfull",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/inline_response_201"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/devices": {
            "get": {
                "tags": [
                    "Devices"
                ],
                "summary": "Get a list of Devices",
                "operationId": "Devices.fetch",
                "parameters": [
                    {
                        "name": "Device search query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Device",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Device search query parameters"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of Devices",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Device"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/notices": {
            "get": {
                "tags": [
                    "Notices"
                ],
                "summary": "Get a list of Notices",
                "operationId": "Notices.fetch",
                "parameters": [
                    {
                        "name": "Notice search query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Notices",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Notice search query parameters"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of Notices",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Notice"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            },
            "post": {
                "tags": [
                    "Notices"
                ],
                "summary": "Create a Notice",
                "operationId": "Notices.create",
                "requestBody": {
                    "description": "Notice request body.",
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "attachments": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "description": "attached file",
                                            "format": "binary"
                                        }
                                    },
                                    "title": {
                                        "type": "string"
                                    },
                                    "body": {
                                        "type": "string"
                                    },
                                    "title_preview": {
                                        "type": "string"
                                    },
                                    "body_preview": {
                                        "type": "string"
                                    },
                                    "type": {
                                        "type": "string",
                                        "enum": [
                                            "normal",
                                            "scheduled"
                                        ]
                                    },
                                    "frequency_date": {
                                        "type": "string"
                                    },
                                    "frequency_time": {
                                        "type": "string"
                                    },
                                    "category": {
                                        "type": "string",
                                        "description": "category id"
                                    },
                                    "recipients_group": {
                                        "type": "string",
                                        "description": "group id"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Returns the new Notice",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Notice"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "The request is malformed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/notices/myhistory": {
            "get": {
                "tags": [
                    "Notices"
                ],
                "summary": "Reperisce una Notice a partire dal suo id",
                "operationId": "Notices.myHistory",
                "parameters": [
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of Notices",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/NoticeUser"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/notices/{id}": {
            "get": {
                "tags": [
                    "Notices"
                ],
                "summary": "Reperisce una Notice a partire dal suo id",
                "operationId": "Notices.get",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Notice è stato trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Notice"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/notices/{id}/feeds": {
            "get": {
                "tags": [
                    "Notices"
                ],
                "summary": "Reperisce la list dei Notice feeds",
                "operationId": "Notices.getFeeds",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "Notice feeds query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Feeds",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Notice feeds query parameters"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Notice è stato trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/NoticeFeed"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/notices/{id}/stats": {
            "get": {
                "tags": [
                    "Notices"
                ],
                "summary": "Reperisce statistiche della notice",
                "operationId": "Notices.getStats",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Notice è stato trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/NoticeStats"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/notices/{id}/resend": {
            "post": {
                "tags": [
                    "Notices"
                ],
                "summary": "Forza reinvio Notice",
                "operationId": "Notices.reSend",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "requestBody": {
                    "description": "Notice feedback request body.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": {
                                        "type": "string",
                                        "enum": [
                                            "delivered",
                                            "readed"
                                        ]
                                    },
                                    "date": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Returns the new Notice",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Notice"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "The request is malformed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/notices/{id}/feedback": {
            "post": {
                "tags": [
                    "Notices"
                ],
                "summary": "Invia feedback sulla ricezione e lettura",
                "operationId": "Notices.sendFeedback",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "requestBody": {
                    "description": "Notice feedback request body.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": {
                                        "type": "string",
                                        "enum": [
                                            "delivered",
                                            "readed"
                                        ]
                                    },
                                    "date": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Notice è stato trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Notice"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/notices/feedback": {
            "post": {
                "tags": [
                    "Notices"
                ],
                "summary": "Invia feedback multipli sulla ricezione",
                "operationId": "Notices.sendMultipleFeedback",
                "requestBody": {
                    "description": "Notice feedback multipli request body.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "notices": {
                                        "type": "array",
                                        "description": "list of notice id",
                                        "items": {
                                            "type": "string"
                                        }
                                    },
                                    "status": {
                                        "type": "string",
                                        "enum": [
                                            "delivered",
                                            "readed",
                                            "with_response"
                                        ]
                                    },
                                    "date": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Feedback inviati",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/NoticeUser"
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/notices/{id}/details": {
            "get": {
                "tags": [
                    "Notices"
                ],
                "summary": "Reperisce una Notice a partire dal suo id",
                "operationId": "Notices.details",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of Notices",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/NoticeUser"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/inquiry": {
            "get": {
                "tags": [
                    "Inquiry"
                ],
                "summary": "Get a list of Inquirylike GeoClaim, AreYouFine",
                "operationId": "Inquiry.fetch",
                "parameters": [
                    {
                        "name": "Inquiry search query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Inquiry",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Inquiry search query parameters"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of Inquiry",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Inquiry"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            },
            "post": {
                "tags": [
                    "Inquiry"
                ],
                "summary": "Create a Inquiry",
                "operationId": "Inquiry.create",
                "requestBody": {
                    "description": "Inquiry request body.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "recipients",
                                    "type"
                                ],
                                "type": "object",
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "enum": [
                                            "areyoufine",
                                            "geoclaim"
                                        ]
                                    },
                                    "recipients_group": {
                                        "type": "string",
                                        "description": "group id"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Returns the new Inquiry",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Inquiry"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "The request is malformed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/inquiry/pending": {
            "get": {
                "tags": [
                    "Inquiry"
                ],
                "summary": "Get a list of Inquirylike GeoClaim, AreYouFine",
                "operationId": "Inquiry.getPending",
                "parameters": [
                    {
                        "name": "Inquiry search query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Inquiry",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Inquiry search query parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of Inquiry",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/InquiryUser"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/inquiry/{id}": {
            "get": {
                "tags": [
                    "Inquiry"
                ],
                "summary": "Reperisce una Notice a partire dal suo id",
                "operationId": "Inquiry.get",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Inquiry è stata trovata",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Inquiry"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/inquiry/{id}/resend": {
            "post": {
                "tags": [
                    "Inquiry"
                ],
                "summary": "Re Invia",
                "operationId": "Inquiry.reSend",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "requestBody": {
                    "description": "Notice request body.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": {
                                        "type": "string",
                                        "enum": [
                                            "delivered",
                                            "readed",
                                            "with_response"
                                        ]
                                    },
                                    "payload": {
                                        "type": "object"
                                    },
                                    "date": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Returns the Inquiry",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Inquiry"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/inquiry/{id}/feeds": {
            "get": {
                "tags": [
                    "Inquiry"
                ],
                "summary": "Reperisce la list delle Inquiry feeds",
                "operationId": "Inquiry.getFeeds",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "Notice feeds query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Feeds",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Notice feeds query parameters_1"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Inquiry è stato trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/InquiryFeed"
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/inquiry/{id}/stats": {
            "get": {
                "tags": [
                    "Inquiry"
                ],
                "summary": "Reperisce statistiche",
                "operationId": "Inquiry.getStats",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Inquiry è stato trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/InquiryStats"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/inquiry/{id}/feedback": {
            "post": {
                "tags": [
                    "Inquiry"
                ],
                "summary": "Invia feedback sulla ricezione e lettura",
                "operationId": "Inquiry.sendFeedback",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "requestBody": {
                    "description": "Notice request body.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": {
                                        "type": "string",
                                        "enum": [
                                            "delivered",
                                            "readed",
                                            "with_response"
                                        ]
                                    },
                                    "payload": {
                                        "type": "object"
                                    },
                                    "date": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Inquiry è stato trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Inquiry"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/users": {
            "get": {
                "tags": [
                    "Users"
                ],
                "summary": "Get a list ofUsers",
                "operationId": "Users.fetch",
                "parameters": [
                    {
                        "name": "User search query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Users",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/User search query parameters"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of Users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/users/{id}": {
            "get": {
                "tags": [
                    "Users"
                ],
                "summary": "Reperisce un User a partire dal suo id",
                "operationId": "Users.get",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User è stato trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            },
            "put": {
                "tags": [
                    "Users"
                ],
                "summary": "Update user a partire del sue id",
                "description": "Return the current logged User",
                "operationId": "Users.update",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "requestBody": {
                    "description": "User request body. The required fields are only for signup.",
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "required": [
                                    "dob",
                                    "email",
                                    "gender",
                                    "name",
                                    "surname"
                                ],
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "surname": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string",
                                        "format": "email"
                                    },
                                    "fiscal_code": {
                                        "type": "string"
                                    },
                                    "phone_country": {
                                        "type": "string"
                                    },
                                    "phone_main": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "info": {
                                        "type": "string"
                                    },
                                    "emergency_contacts": {
                                        "type": "string"
                                    },
                                    "gender": {
                                        "type": "string",
                                        "enum": [
                                            "m",
                                            "f"
                                        ]
                                    },
                                    "dob": {
                                        "type": "string"
                                    },
                                    "avatar": {
                                        "type": "string",
                                        "description": "attached img",
                                        "format": "binary"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User returned",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            },
            "delete": {
                "tags": [
                    "Users"
                ],
                "summary": "Cancella User a partire dal suo id",
                "operationId": "Users.delete",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "User è stato eliminato"
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/users/stats": {
            "get": {
                "tags": [
                    "Users"
                ],
                "summary": "Get users stats",
                "description": "Return users stats",
                "operationId": "Users.stats",
                "responses": {
                    "200": {
                        "description": "Users stats returned",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/StatsUser"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            }
        },
        "/users/locations": {
            "get": {
                "tags": [
                    "Users"
                ],
                "summary": "Get a list of Users with location",
                "operationId": "Users.fetchLocations",
                "parameters": [
                    {
                        "name": "User search query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Users",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/User search query parameters"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of UserLocation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/UserLocation"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/users/me": {
            "get": {
                "tags": [
                    "Users"
                ],
                "summary": "Get the current logged User Model",
                "description": "Return the current logged User",
                "operationId": "Users.refresh",
                "responses": {
                    "200": {
                        "description": "User returned",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            },
            "put": {
                "tags": [
                    "Users"
                ],
                "summary": "Update the current logged User Model",
                "description": "Return the current logged User",
                "operationId": "Users.Me.update",
                "requestBody": {
                    "description": "User request body. The required fields are only for signup.",
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "required": [
                                    "birthplace",
                                    "device",
                                    "dob",
                                    "email",
                                    "gender",
                                    "name",
                                    "resident",
                                    "surname"
                                ],
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "surname": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string",
                                        "format": "email"
                                    },
                                    "fiscal_code": {
                                        "type": "string"
                                    },
                                    "phone_country": {
                                        "type": "string"
                                    },
                                    "phone_main": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "info": {
                                        "type": "string"
                                    },
                                    "emergency_contacts": {
                                        "type": "string"
                                    },
                                    "gender": {
                                        "type": "string",
                                        "enum": [
                                            "m",
                                            "f"
                                        ]
                                    },
                                    "resident": {
                                        "type": "boolean"
                                    },
                                    "residential_address": {
                                        "type": "string"
                                    },
                                    "location": {
                                        "type": "object",
                                        "properties": {
                                            "latitude": {
                                                "type": "string"
                                            },
                                            "longitude": {
                                                "type": "string"
                                            },
                                            "name": {
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "birthplace": {
                                        "type": "string"
                                    },
                                    "dob": {
                                        "type": "string"
                                    },
                                    "avatar": {
                                        "type": "string",
                                        "description": "attached img",
                                        "format": "binary"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User returned",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            }
        },
        "/users/me/device": {
            "put": {
                "tags": [
                    "Devices"
                ],
                "summary": "Update the current logged User Device Model",
                "description": "Return the current logged User",
                "operationId": "Users.Me.Device.update",
                "requestBody": {
                    "description": "Device request body.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "fcm",
                                    "model",
                                    "name",
                                    "platform_name",
                                    "platform_version"
                                ],
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "model": {
                                        "type": "string"
                                    },
                                    "platform_name": {
                                        "type": "string"
                                    },
                                    "platform_version": {
                                        "type": "string"
                                    },
                                    "fcm": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User returned",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            }
        },
        "/groups": {
            "get": {
                "tags": [
                    "UserGroup"
                ],
                "summary": "Get a list of UserGroup",
                "operationId": "UserGroup.fetch",
                "parameters": [
                    {
                        "name": "UserGroup search query parameters",
                        "in": "query",
                        "description": "The parameters are used to search UserGroup",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/UserGroup search query parameters"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of UsersGroup",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/UserGroup"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            },
            "post": {
                "tags": [
                    "UserGroup"
                ],
                "summary": "Create a UserGroup",
                "operationId": "UserGroup.create",
                "requestBody": {
                    "description": "UserGroup post request body",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "description",
                                    "filters",
                                    "name"
                                ],
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Nome"
                                    },
                                    "description": {
                                        "type": "string"
                                    },
                                    "filters": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Returns the new UserGroup",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/UserGroup"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "The request is malformed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/groups/{id}": {
            "get": {
                "tags": [
                    "UserGroup"
                ],
                "summary": "Reperisce un UserGrpup a partire dal suo id",
                "operationId": "UserGroup.get",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "UserGroup è stato trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/UserGroup"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            },
            "put": {
                "tags": [
                    "UserGroup"
                ],
                "summary": "Update a UserGroup",
                "operationId": "UserGroup.update",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "requestBody": {
                    "description": "UserGroup post request body",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "description",
                                    "filters",
                                    "name"
                                ],
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Nome"
                                    },
                                    "description": {
                                        "type": "string"
                                    },
                                    "filters": {
                                        "type": "object"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Returns the new UserGroup",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/UserGroup"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "The request is malformed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            },
            "delete": {
                "tags": [
                    "UserGroup"
                ],
                "summary": "Cancella UserGroup a partire dal suo id",
                "operationId": "UserGroup.delete",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "UserGroup è stato eliminato"
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/groups/{id}/users": {
            "get": {
                "tags": [
                    "UserGroup"
                ],
                "summary": "Reperisce gli Users di un UserGrpup a partire dal suo id",
                "operationId": "UserGroup.getUsers",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "UserGroup è stato trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/operators": {
            "get": {
                "tags": [
                    "Operator"
                ],
                "summary": "Get a list of Operators",
                "operationId": "Operators.fetch",
                "parameters": [
                    {
                        "name": "Operator search query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Operators",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Operator search query parameters"
                        }
                    },
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of Operators",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Operator"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            },
            "post": {
                "tags": [
                    "Operator"
                ],
                "summary": "Create a Operator",
                "operationId": "Operators.create",
                "requestBody": {
                    "description": "Operator request body. The required fields are only for signup.",
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "required": [
                                    "email",
                                    "fiscal_code",
                                    "name",
                                    "password",
                                    "surname"
                                ],
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "surname": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string",
                                        "format": "email"
                                    },
                                    "fiscal_code": {
                                        "type": "string"
                                    },
                                    "phone_country": {
                                        "type": "string"
                                    },
                                    "phone_main": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "info": {
                                        "type": "string"
                                    },
                                    "avatar": {
                                        "type": "string",
                                        "description": "attached img",
                                        "format": "binary"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Returns the new Operator",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Operator"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/operators/{id}": {
            "get": {
                "tags": [
                    "Operator"
                ],
                "summary": "Get a  Operator",
                "operationId": "Operators.get",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Operator returned",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Operator"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            },
            "put": {
                "tags": [
                    "Operator"
                ],
                "summary": "Update the current logged Operator Model",
                "description": "Return the current logged Operator",
                "operationId": "Operators.update",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "requestBody": {
                    "description": "Operator request body. The required fields are only for signup.",
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "required": [
                                    "email",
                                    "fiscal_code",
                                    "name",
                                    "password",
                                    "surname"
                                ],
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "surname": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string",
                                        "format": "email"
                                    },
                                    "fiscal_code": {
                                        "type": "string"
                                    },
                                    "phone_country": {
                                        "type": "string"
                                    },
                                    "phone_main": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "info": {
                                        "type": "string"
                                    },
                                    "avatar": {
                                        "type": "string",
                                        "description": "attached img",
                                        "format": "binary"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Operator returned",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Operator"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            },
            "delete": {
                "tags": [
                    "Operator"
                ],
                "summary": "Get a  Operator",
                "operationId": "Operators.delete",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Categoria eliminata"
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/operators/me": {
            "get": {
                "tags": [
                    "Operator"
                ],
                "summary": "Get the current logged Operator Model",
                "description": "Return the current logged UsOperatorer",
                "operationId": "Operators.Me.get",
                "responses": {
                    "200": {
                        "description": "Operator returned",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Operator"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            },
            "put": {
                "tags": [
                    "Operator"
                ],
                "summary": "Update the Operator Model",
                "description": "Return the current logged Operator",
                "operationId": "Operators.Me.update",
                "requestBody": {
                    "description": "Operator request body. The required fields are only for signup.",
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "required": [
                                    "email",
                                    "fiscal_code",
                                    "name",
                                    "password",
                                    "surname"
                                ],
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string"
                                    },
                                    "surname": {
                                        "type": "string"
                                    },
                                    "email": {
                                        "type": "string",
                                        "format": "email"
                                    },
                                    "fiscal_code": {
                                        "type": "string"
                                    },
                                    "phone_country": {
                                        "type": "string"
                                    },
                                    "phone_main": {
                                        "type": "string"
                                    },
                                    "password": {
                                        "type": "string"
                                    },
                                    "info": {
                                        "type": "string"
                                    },
                                    "avatar": {
                                        "type": "string",
                                        "description": "attached img",
                                        "format": "binary"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Operator returned",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Operator"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            }
        },
        "/categories": {
            "get": {
                "tags": [
                    "Categories"
                ],
                "summary": "Lista di tutte le categorie",
                "operationId": "Categories.fetch",
                "parameters": [
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    },
                    {
                        "name": "Category search query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Category",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Category search query parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Lista delle categorie trovate",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Category"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            },
            "post": {
                "tags": [
                    "Categories"
                ],
                "summary": "Creazione categoria",
                "operationId": "Categories.create",
                "requestBody": {
                    "description": "Category request body",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "description",
                                    "name"
                                ],
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Nome"
                                    },
                                    "description": {
                                        "type": "string",
                                        "description": "Description"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Creazione effettuata con successo",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Category"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "The request is malformed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            }
        },
        "/categories/{id}": {
            "get": {
                "tags": [
                    "Categories"
                ],
                "operationId": "Categories.get",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Category trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Category"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            },
            "put": {
                "tags": [
                    "Categories"
                ],
                "summary": "Update di una categoria",
                "operationId": "Categories.update",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "requestBody": {
                    "description": "Category request body",
                    "content": {
                        "application/json": {
                            "schema": {
                                "required": [
                                    "description",
                                    "name"
                                ],
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "type": "string",
                                        "description": "Nome"
                                    },
                                    "description": {
                                        "type": "string",
                                        "description": "Description"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Update effettuata con successo",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Category"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            },
            "delete": {
                "tags": [
                    "Categories"
                ],
                "summary": "Delete di una categoria",
                "operationId": "Categories.delete",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Categoria eliminata"
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/signals": {
            "get": {
                "tags": [
                    "Signals"
                ],
                "summary": "Lista di tutte le Signals ricevute",
                "operationId": "Signals.fetch",
                "parameters": [
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    },
                    {
                        "name": "Signal search query parameters",
                        "in": "query",
                        "description": "The parameters are used to search Signals",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Signal search query parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Lista delle Signals trovate",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/Signal"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            },
            "post": {
                "tags": [
                    "Signals"
                ],
                "summary": "Creazione Signal",
                "operationId": "Signals.create",
                "requestBody": {
                    "description": "Signal request body.",
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "attachments": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "description": "attached file",
                                            "format": "binary"
                                        }
                                    },
                                    "object": {
                                        "type": "string"
                                    },
                                    "body": {
                                        "type": "string"
                                    },
                                    "location": {
                                        "type": "object",
                                        "properties": {
                                            "latitude": {
                                                "type": "string"
                                            },
                                            "longitude": {
                                                "type": "string"
                                            }
                                        }
                                    },
                                    "category": {
                                        "type": "string",
                                        "description": "category id"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Creazione effettuata con successo",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Signal"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "The request is malformed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "BearerAuthentication": []
                    }
                ]
            }
        },
        "/signals/myhistory": {
            "get": {
                "tags": [
                    "Signals"
                ],
                "summary": "Reperisce history delle signal inviate dall'utente",
                "operationId": "Signals.myHistory",
                "parameters": [
                    {
                        "name": "Pagination parameters",
                        "in": "query",
                        "description": "The parameters are used to create pagination",
                        "required": false,
                        "style": "form",
                        "explode": true,
                        "schema": {
                            "$ref": "#/components/schemas/Pagination parameters"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Returns a list of Signals",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/SignalUser"
                                    }
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/signals/myhistory/{id}": {
            "get": {
                "tags": [
                    "Signals"
                ],
                "operationId": "Signals.getMySignal",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Signal trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/SignalUser"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/signals/{id}": {
            "get": {
                "tags": [
                    "Signals"
                ],
                "operationId": "Signals.get",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Signal trovato",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Signal"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized, Invalid credentials (client or user)",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "The specified resource was not found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "JWTAuth": []
                    }
                ]
            }
        },
        "/signals/{id}/response": {
            "post": {
                "tags": [
                    "Response"
                ],
                "summary": "Create a response",
                "operationId": "Signals.createResponse",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "description": "Resource id identifier",
                        "required": true,
                        "style": "simple",
                        "explode": false,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "requestBody": {
                    "description": "Reponse request body.",
                    "content": {
                        "multipart/form-data": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "attachments": {
                                        "type": "array",
                                        "items": {
                                            "type": "string",
                                            "description": "attached file",
                                            "format": "binary"
                                        }
                                    },
                                    "body": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": {
                        "description": "Returns the SignalResponse",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Response"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/audit": {
            "get": {
                "tags": [
                    "Audit"
                ],
                "summary": "Get Audit parameters",
                "operationId": "Audit.get",
                "responses": {
                    "200": {
                        "description": "Returns the Audit parameters",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Audit"
                                }
                            }
                        }
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        },
        "/app/version": {
            "get": {
                "tags": [
                    "App"
                ],
                "operationId": "App.getVersion",
                "responses": {
                    "200": {
                        "description": "Returns Version information",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Version"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/support/contact": {
            "post": {
                "tags": [
                    "Support"
                ],
                "summary": "Support contact",
                "operationId": "Support.contact",
                "requestBody": {
                    "description": "Support contact request body",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "subject": {
                                        "type": "string"
                                    },
                                    "content": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "204": {
                        "description": "ok nocontent"
                    }
                },
                "security": [
                    {
                        "bearerAuthentication": []
                    }
                ]
            }
        }
    },
    "components": {
        "schemas": {
            "ErrorResponse": {
                "type": "object",
                "properties": {
                    "code": {
                        "type": "string",
                        "description": "Identificativo human-readable dell errore (es. 'PageNotFound', 'BadArguments')"
                    },
                    "message": {
                        "type": "string",
                        "description": "Messaggio d errore leggibile che può essere mostrato direttamente all utente nella lingua specificata nel campo Accept-Language del request header"
                    },
                    "target": {
                        "type": "string",
                        "description": "Contesto nel quale l'errore è stato generato"
                    },
                    "details": {
                        "type": "array",
                        "description": "Dettaglio sui singoli errori che hanno generato l errore in oggetto. Può essere costituito anche da un solo elemento",
                        "items": {
                            "$ref": "#/components/schemas/ErrorResponse_details"
                        }
                    }
                },
                "description": "Rappresentazione di un errore"
            },
            "Token": {
                "required": [
                    "email",
                    "token",
                    "type"
                ],
                "type": "object",
                "properties": {
                    "token": {
                        "type": "string",
                        "description": "Token"
                    },
                    "type": {
                        "type": "string",
                        "description": "Tipo del token",
                        "enum": [
                            "activation",
                            "reset"
                        ]
                    },
                    "email": {
                        "type": "string",
                        "description": "Email dell'utente a cui è associato il token",
                        "format": "email"
                    }
                },
                "description": "Rappresentazione di un token per l'attivazione di un utente o del reset della password"
            },
            "CompactDevice": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "fcm": {
                        "type": "string",
                        "description": "Firebase identification token"
                    },
                    "created_at": {
                        "type": "integer"
                    },
                    "updated_at": {
                        "type": "integer"
                    }
                },
                "description": "Rappresentazione del Device Utente"
            },
            "Device": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "fcm": {
                        "type": "string",
                        "description": "Firebase identification token"
                    },
                    "model": {
                        "type": "string"
                    },
                    "platform_name": {
                        "type": "string",
                        "enum": [
                            "ios",
                            "android"
                        ]
                    },
                    "platform_version": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "user": {
                        "$ref": "#/components/schemas/CompactUser"
                    },
                    "created_at": {
                        "type": "string"
                    },
                    "updated_at": {
                        "type": "string"
                    }
                },
                "description": "Rappresentazione del Device Utente"
            },
            "Inquiry": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "recipients_group_name": {
                        "type": "string"
                    },
                    "created_at": {
                        "type": "string"
                    },
                    "updated_at": {
                        "type": "string"
                    }
                },
                "description": "Rappresentazione di una Inquiry"
            },
            "Notice": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "body": {
                        "type": "string"
                    },
                    "title_preview": {
                        "type": "string"
                    },
                    "body_preview": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string",
                        "enum": [
                            "normal",
                            "scheduled"
                        ]
                    },
                    "frequency_date": {
                        "type": "string"
                    },
                    "frequency_time": {
                        "type": "string"
                    },
                    "category": {
                        "$ref": "#/components/schemas/Category"
                    },
                    "recipients_group_name": {
                        "type": "string"
                    },
                    "attachments": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/NoticeAttachmentMeta"
                        }
                    }
                },
                "description": "Rappresentazione di una Notice"
            },
            "InquiryUser": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string",
                        "enum": [
                            "areyoufine",
                            "geoclaim"
                        ]
                    },
                    "actions": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/InquiryUser_actions"
                        }
                    }
                },
                "description": "Rappresentazione di una Inquiry per User"
            },
            "NoticeUser": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "body": {
                        "type": "string"
                    },
                    "category": {
                        "type": "string"
                    },
                    "status": {
                        "$ref": "#/components/schemas/NoticeUser_status"
                    },
                    "attachments": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/NoticeAttachmentMeta"
                        }
                    }
                },
                "description": "Rappresentazione di una Notice per User"
            },
            "SignalUser": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "object": {
                        "type": "string"
                    },
                    "body": {
                        "type": "string"
                    },
                    "category": {
                        "$ref": "#/components/schemas/Category"
                    },
                    "responses": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Response"
                        }
                    },
                    "attachments": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/SignalAttachmentMeta"
                        }
                    },
                    "sender": {
                        "$ref": "#/components/schemas/CompactUser"
                    },
                    "created_at": {
                        "type": "integer"
                    },
                    "updated_at": {
                        "type": "integer"
                    },
                    "status": {
                        "$ref": "#/components/schemas/NoticeUser_status"
                    }
                },
                "description": "Rappresentazione di una Signal per User"
            },
            "InquiryFeed": {
                "type": "object",
                "properties": {
                    "receiver": {
                        "$ref": "#/components/schemas/CompactUser"
                    },
                    "status": {
                        "type": "string",
                        "enum": [
                            "sent",
                            "delivered",
                            "readed",
                            "with_response"
                        ]
                    },
                    "receiver_payload": {
                        "$ref": "#/components/schemas/InquiryFeed_receiver_payload"
                    },
                    "logs": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/NoticeUser_status"
                        }
                    },
                    "updated_at": {
                        "type": "string"
                    }
                },
                "description": "Rappresentazione di Inquiry Feed, dettagli sul destinatario e lo stato e del payload"
            },
            "InquiryStats": {
                "type": "object",
                "properties": {
                    "receivers": {
                        "type": "string"
                    },
                    "with_response": {
                        "$ref": "#/components/schemas/InquiryStats_with_response"
                    },
                    "readed": {
                        "$ref": "#/components/schemas/InquiryStats_with_response"
                    },
                    "delivered": {
                        "$ref": "#/components/schemas/InquiryStats_with_response"
                    },
                    "sent": {
                        "$ref": "#/components/schemas/InquiryStats_with_response"
                    }
                },
                "description": "Rappresentazione di Inquiry stats"
            },
            "NoticeFeed": {
                "type": "object",
                "properties": {
                    "receiver": {
                        "$ref": "#/components/schemas/CompactUser"
                    },
                    "status": {
                        "type": "string",
                        "enum": [
                            "sent",
                            "delivered",
                            "readed"
                        ]
                    },
                    "logs": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/NoticeUser_status"
                        }
                    },
                    "updated_at": {
                        "type": "string"
                    }
                },
                "description": "Rappresentazione di Notice Feed, dettagli sul destinatario e lo stato"
            },
            "NoticeStats": {
                "type": "object",
                "properties": {
                    "receivers": {
                        "type": "string"
                    },
                    "readed": {
                        "$ref": "#/components/schemas/InquiryStats_with_response"
                    },
                    "delivered": {
                        "$ref": "#/components/schemas/InquiryStats_with_response"
                    },
                    "sent": {
                        "$ref": "#/components/schemas/InquiryStats_with_response"
                    }
                },
                "description": "Rappresentazione di Notice statistiche"
            },
            "NoticeAttachmentMeta": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "url": {
                        "type": "string"
                    }
                },
                "description": "Rappresentazione di un Attachment"
            },
            "SignalAttachmentMeta": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "url": {
                        "type": "string"
                    }
                },
                "description": "Rappresentazione di un Attachment"
            },
            "Signal": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "object": {
                        "type": "string"
                    },
                    "body": {
                        "type": "string"
                    },
                    "location": {
                        "$ref": "#/components/schemas/Signal_location"
                    },
                    "category": {
                        "$ref": "#/components/schemas/Category"
                    },
                    "responses": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/Response"
                        }
                    },
                    "attachments": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/SignalAttachmentMeta"
                        }
                    },
                    "sender": {
                        "$ref": "#/components/schemas/CompactUser"
                    },
                    "created_at": {
                        "type": "integer"
                    },
                    "updated_at": {
                        "type": "integer"
                    }
                },
                "description": "Rappresentazione di una Signal"
            },
            "Response": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "body": {
                        "type": "string"
                    },
                    "sender": {
                        "$ref": "#/components/schemas/CompactOperator"
                    },
                    "created_at": {
                        "type": "integer"
                    },
                    "updated_at": {
                        "type": "integer"
                    }
                },
                "description": "Rappresentazione di una Signal"
            },
            "UserGroup": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string",
                        "description": "Nome"
                    },
                    "description": {
                        "type": "string"
                    },
                    "filters": {
                        "$ref": "#/components/schemas/UserFilters"
                    },
                    "created_at": {
                        "type": "integer"
                    },
                    "updated_at": {
                        "type": "integer"
                    }
                },
                "description": "Rappresentazione di un Gruppo di utenti"
            },
            "User": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string",
                        "description": "Nome"
                    },
                    "surname": {
                        "type": "string"
                    },
                    "gender": {
                        "type": "string",
                        "enum": [
                            "m",
                            "f"
                        ]
                    },
                    "account": {
                        "type": "string",
                        "enum": [
                            "pending",
                            "active",
                            "deactive"
                        ]
                    },
                    "fiscal_code": {
                        "type": "string"
                    },
                    "phone_country": {
                        "type": "string"
                    },
                    "phone_main": {
                        "type": "string"
                    },
                    "info": {
                        "type": "string"
                    },
                    "emergency_contacts": {
                        "type": "string"
                    },
                    "residential_address": {
                        "type": "string"
                    },
                    "resident": {
                        "type": "boolean"
                    },
                    "location": {
                        "$ref": "#/components/schemas/User_location"
                    },
                    "birthplace": {
                        "type": "string",
                        "description": "url to user avatar"
                    },
                    "avatar": {
                        "type": "string"
                    },
                    "dob": {
                        "type": "string",
                        "description": "ISO Date della data di nascita"
                    },
                    "created_at": {
                        "type": "integer"
                    },
                    "updated_at": {
                        "type": "integer"
                    }
                },
                "description": "Rappresentazione dell'utente"
            },
            "CompactUser": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "full_name": {
                        "type": "string"
                    },
                    "avatar": {
                        "type": "string",
                        "description": "url to user avatar"
                    }
                }
            },
            "UserLocation": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "full_name": {
                        "type": "string"
                    },
                    "avatar": {
                        "type": "string",
                        "description": "url to user avatar"
                    },
                    "location": {
                        "$ref": "#/components/schemas/User_location"
                    }
                }
            },
            "StatsUser": {
                "type": "object",
                "properties": {
                    "locations": {
                        "$ref": "#/components/schemas/StatsUser_locations"
                    }
                }
            },
            "Operator": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "role": {
                        "type": "string",
                        "enum": [
                            "admin",
                            "operator"
                        ]
                    },
                    "name": {
                        "type": "string"
                    },
                    "surname": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string",
                        "format": "email"
                    },
                    "fiscal_code": {
                        "type": "string"
                    },
                    "avatar": {
                        "type": "string"
                    },
                    "phone_country": {
                        "type": "string"
                    },
                    "phone_main": {
                        "type": "string"
                    },
                    "created_at": {
                        "type": "string"
                    }
                }
            },
            "CompactOperator": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "full_name": {
                        "type": "string"
                    },
                    "avatar": {
                        "type": "string",
                        "description": "url to user avatar"
                    }
                }
            },
            "Version": {
                "type": "object",
                "properties": {
                    "branch": {
                        "type": "string"
                    },
                    "build": {
                        "type": "string"
                    },
                    "date": {
                        "type": "string"
                    }
                }
            },
            "Audit": {
                "type": "object",
                "properties": {
                    "operator": {
                        "$ref": "#/components/schemas/Audit_operator"
                    },
                    "users": {
                        "$ref": "#/components/schemas/Audit_users"
                    },
                    "groups": {
                        "$ref": "#/components/schemas/Audit_users"
                    },
                    "notices": {
                        "$ref": "#/components/schemas/Audit_notices"
                    },
                    "inquiry": {
                        "$ref": "#/components/schemas/Audit_inquiry"
                    },
                    "signals": {
                        "$ref": "#/components/schemas/Audit_signals"
                    },
                    "devices": {
                        "$ref": "#/components/schemas/Audit_users"
                    }
                }
            },
            "Category": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string",
                        "description": "Nome della categoria"
                    },
                    "description": {
                        "type": "string",
                        "description": "Nome della categoria"
                    },
                    "color": {
                        "type": "string",
                        "description": "exadecimal color string"
                    }
                },
                "description": "Rappresentazione di una categoria"
            },
            "UserFilters": {
                "type": "object",
                "properties": {
                    "platform_name": {
                        "type": "string"
                    },
                    "term": {
                        "type": "string"
                    },
                    "gender": {
                        "type": "string"
                    },
                    "from_date_dob": {
                        "type": "string"
                    },
                    "to_date_dob": {
                        "type": "string"
                    },
                    "resident": {
                        "type": "boolean"
                    }
                },
                "description": "Rappresentazione di un insieme di filtri"
            },
            "inline_response_201": {
                "type": "object",
                "properties": {
                    "success": {
                        "type": "boolean"
                    }
                }
            },
            "inline_response_200": {
                "type": "object",
                "properties": {
                    "token_type": {
                        "type": "string",
                        "example": "Bearer"
                    },
                    "expires_in": {
                        "type": "string",
                        "description": "iso-string"
                    },
                    "access_token": {
                        "type": "string"
                    },
                    "refresh_token": {
                        "type": "string"
                    },
                    "user": {
                        "$ref": "#/components/schemas/User"
                    }
                }
            },
            "inline_response_200_1": {
                "type": "object",
                "properties": {
                    "token_type": {
                        "type": "string",
                        "example": "Bearer"
                    },
                    "expires_in": {
                        "type": "string",
                        "description": "iso-string"
                    },
                    "access_token": {
                        "type": "string"
                    },
                    "refresh_token": {
                        "type": "string"
                    },
                    "user": {
                        "$ref": "#/components/schemas/Operator"
                    }
                }
            },
            "Password recovery query parameters": {
                "type": "object",
                "properties": {
                    "token": {
                        "type": "string"
                    },
                    "email": {
                        "type": "string",
                        "format": "email"
                    }
                }
            },
            "Device search query parameters": {
                "type": "object",
                "properties": {
                    "platform_name": {
                        "type": "string",
                        "description": "type of device Android or iOS"
                    },
                    "from_date": {
                        "type": "string",
                        "description": "ISO string date"
                    },
                    "to_date": {
                        "type": "string",
                        "description": "ISO string date"
                    },
                    "term": {
                        "type": "string",
                        "description": "Search string for name"
                    }
                }
            },
            "Pagination parameters": {
                "type": "object",
                "properties": {
                    "offset": {
                        "type": "integer",
                        "description": "FROM pagination"
                    },
                    "limit": {
                        "type": "integer",
                        "description": "COUNT pagination"
                    }
                }
            },
            "Notice search query parameters": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "description": "type of notice normal or scheduled"
                    },
                    "group_id": {
                        "type": "string",
                        "description": "filter based on GroupUser id"
                    },
                    "from_date": {
                        "type": "string",
                        "description": "ISO string date"
                    },
                    "to_date": {
                        "type": "string",
                        "description": "ISO string date"
                    }
                }
            },
            "Notice feeds query parameters": {
                "type": "object",
                "properties": {
                    "status": {
                        "type": "string",
                        "description": "status"
                    }
                }
            },
            "Inquiry search query parameters": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "description": "type of notice normal or scheduled"
                    },
                    "from_date": {
                        "type": "string",
                        "description": "ISO string date"
                    },
                    "to_date": {
                        "type": "string",
                        "description": "ISO string date"
                    }
                }
            },
            "Notice feeds query parameters_1": {
                "type": "object",
                "properties": {
                    "status": {
                        "type": "string",
                        "description": "status"
                    }
                }
            },
            "User search query parameters": {
                "type": "object",
                "properties": {
                    "term": {
                        "type": "string",
                        "description": "Search string for name OR surname OR email"
                    },
                    "gender": {
                        "type": "string",
                        "enum": [
                            "m",
                            "f"
                        ]
                    },
                    "from_date_dob": {
                        "type": "string"
                    },
                    "to_date_dob": {
                        "type": "string"
                    },
                    "group": {
                        "type": "string"
                    },
                    "compact": {
                        "type": "boolean"
                    }
                }
            },
            "UserGroup search query parameters": {
                "type": "object",
                "properties": {
                    "term": {
                        "type": "string",
                        "description": "Search string for name"
                    }
                }
            },
            "Operator search query parameters": {
                "type": "object",
                "properties": {
                    "term": {
                        "type": "string",
                        "description": "Search string for name OR surname OR email"
                    },
                    "role": {
                        "type": "string",
                        "enum": [
                            "admin",
                            "operator"
                        ]
                    }
                }
            },
            "Category search query parameters": {
                "type": "object",
                "properties": {
                    "term": {
                        "type": "string",
                        "description": "name of Category"
                    }
                }
            },
            "Signal search query parameters": {
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "filter based on User id"
                    },
                    "from_date": {
                        "type": "string",
                        "description": "ISO string date"
                    },
                    "to_date": {
                        "type": "string",
                        "description": "ISO string date"
                    }
                }
            },
            "ErrorResponse_details": {
                "type": "object",
                "properties": {
                    "code": {
                        "type": "string"
                    },
                    "target": {
                        "type": "string"
                    },
                    "message": {
                        "type": "string"
                    }
                }
            },
            "InquiryUser_actions": {
                "type": "object",
                "properties": {
                    "action": {
                        "type": "string"
                    },
                    "title": {
                        "type": "string"
                    },
                    "clear": {
                        "type": "boolean"
                    }
                }
            },
            "NoticeUser_status": {
                "type": "object",
                "properties": {
                    "status": {
                        "type": "string"
                    },
                    "date": {
                        "type": "string"
                    }
                }
            },
            "InquiryFeed_receiver_payload": {
                "type": "object",
                "properties": {
                    "status": {
                        "type": "string",
                        "enum": [
                            "YES",
                            "NO"
                        ]
                    },
                    "latitude": {
                        "type": "string"
                    },
                    "longitude": {
                        "type": "string"
                    }
                }
            },
            "InquiryStats_with_response": {
                "type": "object",
                "properties": {
                    "amount": {
                        "type": "string"
                    },
                    "percentage": {
                        "type": "string"
                    }
                }
            },
            "Signal_location": {
                "type": "object",
                "properties": {
                    "latitude": {
                        "type": "string"
                    },
                    "longitude": {
                        "type": "string"
                    }
                }
            },
            "User_location": {
                "type": "object",
                "properties": {
                    "latitude": {
                        "type": "string"
                    },
                    "longitude": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string",
                        "description": "nome città data da reverseGeocoder"
                    }
                }
            },
            "StatsUser_locations": {
                "type": "object",
                "properties": {
                    "registered": {
                        "$ref": "#/components/schemas/InquiryStats_with_response"
                    },
                    "unregistered": {
                        "$ref": "#/components/schemas/InquiryStats_with_response"
                    }
                }
            },
            "Audit_operator": {
                "type": "object",
                "properties": {
                    "operators": {
                        "type": "number"
                    },
                    "administrators": {
                        "type": "number"
                    }
                }
            },
            "Audit_users": {
                "type": "object",
                "properties": {
                    "registered": {
                        "type": "number"
                    }
                }
            },
            "Audit_notices": {
                "type": "object",
                "properties": {
                    "sent": {
                        "type": "number"
                    }
                }
            },
            "Audit_inquiry": {
                "type": "object",
                "properties": {
                    "geoclaim": {
                        "$ref": "#/components/schemas/Audit_notices"
                    },
                    "areyoufine": {
                        "$ref": "#/components/schemas/Audit_notices"
                    }
                }
            },
            "Audit_signals": {
                "type": "object",
                "properties": {
                    "received": {
                        "type": "number"
                    }
                }
            }
        },
        "responses": {
            "OAuthResponse": {
                "description": "The user is now authenticated into the system",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "token_type": {
                                    "type": "string",
                                    "example": "Bearer"
                                },
                                "expires_in": {
                                    "type": "string",
                                    "description": "iso-string"
                                },
                                "access_token": {
                                    "type": "string"
                                },
                                "refresh_token": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            },
            "UserSigninResponse": {
                "description": "The operator is now authenticated into the system",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/inline_response_200"
                        }
                    }
                }
            },
            "OperatorSigninResponse": {
                "description": "The operator is now authenticated into the system",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/inline_response_200_1"
                        }
                    }
                }
            },
            "SuccessResponse": {
                "description": "The request is successfull",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/inline_response_201"
                        }
                    }
                }
            },
            "DeleteResponse": {
                "description": "The resource has been deleted",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "success": {
                                    "type": "boolean"
                                }
                            }
                        }
                    }
                }
            },
            "BadRequestResponse": {
                "description": "The request is malformed",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                }
            },
            "NotFoundResponse": {
                "description": "The specified resource was not found",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                }
            },
            "UnauthorizedResponse": {
                "description": "Unauthorized, Invalid credentials (client or user)",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                }
            },
            "ServerErrorResponse": {
                "description": "Internal Server Error",
                "content": {
                    "application/json": {
                        "schema": {
                            "$ref": "#/components/schemas/ErrorResponse"
                        }
                    }
                }
            }
        },
        "parameters": {
            "ResourceIdPathParameter": {
                "name": "id",
                "in": "path",
                "description": "Resource id identifier",
                "required": true,
                "style": "simple",
                "explode": false,
                "schema": {
                    "type": "integer"
                }
            },
            "DeviceSearchQueryParameters": {
                "name": "Device search query parameters",
                "in": "query",
                "description": "The parameters are used to search Device",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Device search query parameters"
                }
            },
            "CategorySearchQueryParameters": {
                "name": "Category search query parameters",
                "in": "query",
                "description": "The parameters are used to search Category",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Category search query parameters"
                }
            },
            "SignalsSearchQueryParameters": {
                "name": "Signal search query parameters",
                "in": "query",
                "description": "The parameters are used to search Signals",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Signal search query parameters"
                }
            },
            "InquirySearchQueryParameters": {
                "name": "Inquiry search query parameters",
                "in": "query",
                "description": "The parameters are used to search Inquiry",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Inquiry search query parameters"
                }
            },
            "NoticeSearchQueryParameters": {
                "name": "Notice search query parameters",
                "in": "query",
                "description": "The parameters are used to search Notices",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Notice search query parameters"
                }
            },
            "NoticeFeedsQueryParameters": {
                "name": "Notice feeds query parameters",
                "in": "query",
                "description": "The parameters are used to search Feeds",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Notice feeds query parameters"
                }
            },
            "InquiryFeedsQueryParameters": {
                "name": "Notice feeds query parameters",
                "in": "query",
                "description": "The parameters are used to search Feeds",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Notice feeds query parameters_1"
                }
            },
            "UserGroupSearchQueryParameters": {
                "name": "UserGroup search query parameters",
                "in": "query",
                "description": "The parameters are used to search UserGroup",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/UserGroup search query parameters"
                }
            },
            "UserSearchQueryParameters": {
                "name": "User search query parameters",
                "in": "query",
                "description": "The parameters are used to search Users",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/User search query parameters"
                }
            },
            "OperatorSearchQueryParameters": {
                "name": "Operator search query parameters",
                "in": "query",
                "description": "The parameters are used to search Operators",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Operator search query parameters"
                }
            },
            "PaginationQueryParameters": {
                "name": "Pagination parameters",
                "in": "query",
                "description": "The parameters are used to create pagination",
                "required": false,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Pagination parameters"
                }
            },
            "PasswordRecoverCheckQueryParameters": {
                "name": "Password recovery query parameters",
                "in": "query",
                "description": "Password recovery query parameters",
                "required": true,
                "style": "form",
                "explode": true,
                "schema": {
                    "$ref": "#/components/schemas/Password recovery query parameters"
                }
            }
        },
        "requestBodies": {
            "OAuth2AccessTokenRequestBody": {
                "description": "User request body. The required fields are only for signup.",
                "content": {
                    "application/json": {
                        "schema": {
                            "required": [
                                "client_id",
                                "client_secret",
                                "grant_type",
                                "password",
                                "scope",
                                "username"
                            ],
                            "type": "object",
                            "properties": {
                                "grant_type": {
                                    "type": "string"
                                },
                                "client_id": {
                                    "type": "string",
                                    "example": "2"
                                },
                                "client_secret": {
                                    "type": "string",
                                    "example": "12345678"
                                },
                                "username": {
                                    "type": "string",
                                    "example": "user@dummy.it"
                                },
                                "password": {
                                    "type": "string",
                                    "example": "12345678"
                                },
                                "scope": {
                                    "type": "string",
                                    "example": "*"
                                }
                            }
                        }
                    }
                }
            },
            "SupportContactRequestBody": {
                "description": "Support contact request body",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "subject": {
                                    "type": "string"
                                },
                                "content": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            },
            "PasswordRecoverRequestBody": {
                "description": "User/Operator password recover request body.",
                "content": {
                    "application/json": {
                        "schema": {
                            "required": [
                                "email"
                            ],
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "format": "email"
                                }
                            }
                        }
                    }
                }
            },
            "UserGroupRequestBody": {
                "description": "UserGroup post request body",
                "content": {
                    "application/json": {
                        "schema": {
                            "required": [
                                "description",
                                "filters",
                                "name"
                            ],
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "Nome"
                                },
                                "description": {
                                    "type": "string"
                                },
                                "filters": {
                                    "type": "object"
                                }
                            }
                        }
                    }
                }
            },
            "CategoryRequestBody": {
                "description": "Category request body",
                "content": {
                    "application/json": {
                        "schema": {
                            "required": [
                                "description",
                                "name"
                            ],
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "Nome"
                                },
                                "description": {
                                    "type": "string",
                                    "description": "Description"
                                }
                            }
                        }
                    }
                }
            },
            "PasswordPutRequestBody": {
                "description": "User/Operator password put request body.",
                "content": {
                    "application/json": {
                        "schema": {
                            "required": [
                                "email",
                                "password",
                                "token"
                            ],
                            "type": "object",
                            "properties": {
                                "token": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string",
                                    "format": "email"
                                }
                            }
                        }
                    }
                }
            },
            "ResponseRequestBody": {
                "description": "Reponse request body.",
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "attachments": {
                                    "type": "array",
                                    "items": {
                                        "type": "string",
                                        "description": "attached file",
                                        "format": "binary"
                                    }
                                },
                                "body": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            },
            "InquiryFeedBackBody": {
                "description": "Notice request body.",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "status": {
                                    "type": "string",
                                    "enum": [
                                        "delivered",
                                        "readed",
                                        "with_response"
                                    ]
                                },
                                "payload": {
                                    "type": "object"
                                },
                                "date": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            },
            "NoticeFeedBackBody": {
                "description": "Notice feedback request body.",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "status": {
                                    "type": "string",
                                    "enum": [
                                        "delivered",
                                        "readed"
                                    ]
                                },
                                "date": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            },
            "NoticeFeedBacksBody": {
                "description": "Notice feedback multipli request body.",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "notices": {
                                    "type": "array",
                                    "description": "list of notice id",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "status": {
                                    "type": "string",
                                    "enum": [
                                        "delivered",
                                        "readed",
                                        "with_response"
                                    ]
                                },
                                "date": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            },
            "NoticeRequestBody": {
                "description": "Notice request body.",
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "attachments": {
                                    "type": "array",
                                    "items": {
                                        "type": "string",
                                        "description": "attached file",
                                        "format": "binary"
                                    }
                                },
                                "title": {
                                    "type": "string"
                                },
                                "body": {
                                    "type": "string"
                                },
                                "title_preview": {
                                    "type": "string"
                                },
                                "body_preview": {
                                    "type": "string"
                                },
                                "type": {
                                    "type": "string",
                                    "enum": [
                                        "normal",
                                        "scheduled"
                                    ]
                                },
                                "frequency_date": {
                                    "type": "string"
                                },
                                "frequency_time": {
                                    "type": "string"
                                },
                                "category": {
                                    "type": "string",
                                    "description": "category id"
                                },
                                "recipients_group": {
                                    "type": "string",
                                    "description": "group id"
                                }
                            }
                        }
                    }
                }
            },
            "InquiryRequestBody": {
                "description": "Inquiry request body.",
                "content": {
                    "application/json": {
                        "schema": {
                            "required": [
                                "recipients",
                                "type"
                            ],
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": [
                                        "areyoufine",
                                        "geoclaim"
                                    ]
                                },
                                "recipients_group": {
                                    "type": "string",
                                    "description": "group id"
                                }
                            }
                        }
                    }
                }
            },
            "DeviceRequestBody": {
                "description": "Device request body.",
                "content": {
                    "application/json": {
                        "schema": {
                            "required": [
                                "fcm",
                                "model",
                                "name",
                                "platform_name",
                                "platform_version"
                            ],
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "model": {
                                    "type": "string"
                                },
                                "platform_name": {
                                    "type": "string"
                                },
                                "platform_version": {
                                    "type": "string"
                                },
                                "fcm": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            },
            "UserEditOperatorRequestBody": {
                "description": "User request body. The required fields are only for signup.",
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "required": [
                                "dob",
                                "email",
                                "gender",
                                "name",
                                "surname"
                            ],
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "surname": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string",
                                    "format": "email"
                                },
                                "fiscal_code": {
                                    "type": "string"
                                },
                                "phone_country": {
                                    "type": "string"
                                },
                                "phone_main": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "info": {
                                    "type": "string"
                                },
                                "emergency_contacts": {
                                    "type": "string"
                                },
                                "gender": {
                                    "type": "string",
                                    "enum": [
                                        "m",
                                        "f"
                                    ]
                                },
                                "dob": {
                                    "type": "string"
                                },
                                "avatar": {
                                    "type": "string",
                                    "description": "attached img",
                                    "format": "binary"
                                }
                            }
                        }
                    }
                }
            },
            "UserRequestBody": {
                "description": "User request body. The required fields are only for signup.",
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "required": [
                                "birthplace",
                                "device",
                                "dob",
                                "email",
                                "gender",
                                "name",
                                "resident",
                                "surname"
                            ],
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "surname": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string",
                                    "format": "email"
                                },
                                "fiscal_code": {
                                    "type": "string"
                                },
                                "phone_country": {
                                    "type": "string"
                                },
                                "phone_main": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "info": {
                                    "type": "string"
                                },
                                "emergency_contacts": {
                                    "type": "string"
                                },
                                "gender": {
                                    "type": "string",
                                    "enum": [
                                        "m",
                                        "f"
                                    ]
                                },
                                "resident": {
                                    "type": "boolean"
                                },
                                "residential_address": {
                                    "type": "string"
                                },
                                "location": {
                                    "type": "object",
                                    "properties": {
                                        "latitude": {
                                            "type": "string"
                                        },
                                        "longitude": {
                                            "type": "string"
                                        },
                                        "name": {
                                            "type": "string"
                                        }
                                    }
                                },
                                "birthplace": {
                                    "type": "string"
                                },
                                "dob": {
                                    "type": "string"
                                },
                                "avatar": {
                                    "type": "string",
                                    "description": "attached img",
                                    "format": "binary"
                                }
                            }
                        }
                    }
                }
            },
            "OperatorRequestBody": {
                "description": "Operator request body. The required fields are only for signup.",
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "required": [
                                "email",
                                "fiscal_code",
                                "name",
                                "password",
                                "surname"
                            ],
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string"
                                },
                                "surname": {
                                    "type": "string"
                                },
                                "email": {
                                    "type": "string",
                                    "format": "email"
                                },
                                "fiscal_code": {
                                    "type": "string"
                                },
                                "phone_country": {
                                    "type": "string"
                                },
                                "phone_main": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "info": {
                                    "type": "string"
                                },
                                "avatar": {
                                    "type": "string",
                                    "description": "attached img",
                                    "format": "binary"
                                }
                            }
                        }
                    }
                }
            },
            "SignalRequestBody": {
                "description": "Signal request body.",
                "content": {
                    "multipart/form-data": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "attachments": {
                                    "type": "array",
                                    "items": {
                                        "type": "string",
                                        "description": "attached file",
                                        "format": "binary"
                                    }
                                },
                                "object": {
                                    "type": "string"
                                },
                                "body": {
                                    "type": "string"
                                },
                                "location": {
                                    "type": "object",
                                    "properties": {
                                        "latitude": {
                                            "type": "string"
                                        },
                                        "longitude": {
                                            "type": "string"
                                        }
                                    }
                                },
                                "category": {
                                    "type": "string",
                                    "description": "category id"
                                }
                            }
                        }
                    }
                }
            }
        },
        "securitySchemes": {
            "JWTAuth": {
                "type": "http",
                "scheme": "bearer"
            }
        }
    }
}
