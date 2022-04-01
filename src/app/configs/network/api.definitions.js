module.exports = {
  "openapi": "3.0.0",
  "info": {
    "title": "EveryWAN",
    "description": "EveryWAN app",
    "version": "0.1"
  },
  "servers": [{
    "url": "http://localhost",
    "description": "Local development server"
  }],
  "tags": [{
    "name": "Authentication",
    "description": "Authentication related calls"
  }, {
    "name": "Users",
    "description": "User related calls"
  }],
  "paths": {
    "/dashboard/": {
      "get": {
        "tags": ["Dashboard"],
        "summary": "Get data of Dashboard",
        "operationId": "Dashboard.get",
        "responses": {
          "200": {
            "description": "Returns a object",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Dashboard"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/auth/signin": {
      "post": {
        "tags": ["Authentication"],
        "summary": "Autenticates a Operator",
        "description": "By passing a valid e-mail and password the system return access token",
        "operationId": "Authentication.Operators.signin",
        "requestBody": {
          "$ref": "#/components/requestBodies/OAuth2AccessTokenRequestBody"
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
        "tags": ["Authentication"],
        "summary": "Logout a Operator",
        "description": "Logout a Operator, return void on success",
        "operationId": "Authentication.Operators.signout",
        "responses": {
          "204": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "BearerAuthentication": []
        }]
      }
    },
    "/auth/register": {
      "post": {
        "tags": ["Users"],
        "description": "Register a user",
        "summary": "Register a user",
        "operationId": "Users.register",
        "responses": {
          "200": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_200"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/operators": {
      "get": {
        "tags": ["Operator"],
        "summary": "Get a list of Operators",
        "operationId": "Operators.fetch",
        "parameters": [{
          "name": "Operator search query parameters",
          "in": "query",
          "description": "The parameters are used to search Operators",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/Operator search query parameters"
          }
        }, {
          "name": "Pagination parameters",
          "in": "query",
          "description": "The parameters are used to create pagination",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/Pagination parameters"
          }
        }],
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
        "security": [{
          "bearerAuthentication": []
        }]
      },
      "post": {
        "tags": ["Operator"],
        "summary": "Create a Operator",
        "operationId": "Operators.create",
        "requestBody": {
          "$ref": "#/components/requestBodies/OperatorRequestBody"
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
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/operators/{id}": {
      "get": {
        "tags": ["Operator"],
        "summary": "Get a  Operator",
        "operationId": "Operators.get",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
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
        "security": [{
          "bearerAuthentication": []
        }]
      },
      "put": {
        "tags": ["Operator"],
        "summary": "Update the current logged Operator Model",
        "description": "Return the current logged Operator",
        "operationId": "Operators.update",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "requestBody": {
          "$ref": "#/components/requestBodies/OperatorRequestBody"
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
        "security": [{
          "BearerAuthentication": []
        }]
      },
      "delete": {
        "tags": ["Operator"],
        "summary": "Get a  Operator",
        "operationId": "Operators.delete",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
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
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/operators/me": {
      "get": {
        "tags": ["Operator"],
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
        "security": [{
          "BearerAuthentication": []
        }]
      },
      "put": {
        "tags": ["Operator"],
        "summary": "Update the Operator Model",
        "description": "Return the current logged Operator",
        "operationId": "Operators.Me.update",
        "requestBody": {
          "$ref": "#/components/requestBodies/OperatorRequestBody"
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
        "security": [{
          "BearerAuthentication": []
        }]
      }
    },
    "/devices/": {
      "get": {
        "tags": ["Devices"],
        "summary": "Get list of devices",
        "operationId": "Devices.fetch",
        "parameters": [{
          "name": "Device search query parameters",
          "in": "query",
          "description": "The parameters are used to search Devices",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/Device search query parameters"
          }
        }, {
          "name": "Pagination parameters",
          "in": "query",
          "description": "The parameters are used to create pagination",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/Pagination parameters"
          }
        }],
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
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/devices/interfaces": {
      "get": {
        "tags": ["Devices"],
        "summary": "Get list of Interfaces",
        "operationId": "Devices.fetchInterfaces",
        "parameters": [{
          "name": "Interface search query parameters",
          "in": "query",
          "description": "The parameters are used to search Interfaces",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/Interface search query parameters"
          }
        }, {
          "name": "Pagination parameters",
          "in": "query",
          "description": "The parameters are used to create pagination",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/Pagination parameters"
          }
        }],
        "responses": {
          "200": {
            "description": "Returns a list of Interfaces",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Interface"
                  }
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/devices/{id}": {
      "get": {
        "tags": ["Devices"],
        "summary": "Get Devices",
        "operationId": "Devices.get",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "responses": {
          "200": {
            "description": "Returns a Device",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Device"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      },
      "post": {
        "tags": ["Devices"],
        "summary": "Configure devices",
        "operationId": "Devices.configure",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "requestBody": {
          "$ref": "#/components/requestBodies/DeviceConfigureRequestBody"
        },
        "responses": {
          "200": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/devices/{id}/enable": {
      "post": {
        "tags": ["Devices"],
        "summary": "Configure devices",
        "operationId": "Devices.enable",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "requestBody": {
          "$ref": "#/components/requestBodies/DeviceConfigureRequestBody"
        },
        "responses": {
          "200": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/devices/{id}/disable": {
      "post": {
        "tags": ["Devices"],
        "summary": "Configure devices",
        "operationId": "Devices.disable",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "requestBody": {
          "$ref": "#/components/requestBodies/DeviceConfigureRequestBody"
        },
        "responses": {
          "200": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/devices/{id}/delete": {
      "post": {
        "tags": ["Devices"],
        "summary": "Delete devices",
        "operationId": "Devices.delete",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "requestBody": {
          "$ref": "#/components/requestBodies/DeviceConfigureRequestBody"
        },
        "responses": {
          "200": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/measurement_sessions/": {
      "get": {
        "tags": ["Measurements"],
        "summary": "Get list of sessions",
        "operationId": "Measurements.fetch",
        "parameters": [{
          "name": "Sessions search query parameters",
          "in": "query",
          "description": "The parameters are used to search Sessions",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/Measurement search query parameters"
          }
        }, {
          "name": "Pagination parameters",
          "in": "query",
          "description": "The parameters are used to create pagination",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/Pagination parameters"
          }
        }],
        "responses": {
          "200": {
            "description": "Returns a list of Sessions",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Measurement"
                  }
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      },
      "post": {
        "tags": ["Measurements"],
        "summary": "Create Measurement Sessions",
        "operationId": "Measurements.create",
        "requestBody": {
          "$ref": "#/components/requestBodies/MeasurementConfigureRequestBody"
        },
        "responses": {
          "200": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/measurement_sessions/{sessionId}": {
      "get": {
        "tags": ["Measurements"],
        "summary": "Get Sessions",
        "operationId": "Measurements.get",
        "parameters": [{
          "name": "sessionId",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "responses": {
          "200": {
            "description": "Returns a Measurement Sessions",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Measurement"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      },
      "put": {
        "tags": ["Measurements"],
        "summary": "Update the Measurement Session's status",
        "description": "Return the Measurement Session's status",
        "operationId": "Measurements.putRunStop",
        "parameters": [{
          "name": "sessionId",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }, {
          "in": "query",
          "name": "command",
          "description": "The command to RUN or STOP a session",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "type": "string"
          }
        }],
        "requestBody": {
          "$ref": "#/components/requestBodies/MeasurementRequestBody"
        },
        "responses": {
          "200": {
            "description": "Status changed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "BearerAuthentication": []
        }]
      },
      "delete": {
        "tags": ["Measurements"],
        "summary": "Delete Measurement",
        "operationId": "Measurements.deleteMeasurement",
        "parameters": [{
          "name": "sessionId",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "responses": {
          "201": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/measurement_sessions/{sessionId}/results": {
      "get": {
        "tags": ["Measurements"],
        "summary": "Get Sessions",
        "operationId": "Measurements.getResults",
        "parameters": [{
          "name": "sessionId",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "responses": {
          "200": {
            "description": "Returns a Measurement Sessions",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Measurement"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/measurement_sessions/sidlists": {
      "get": {
        "tags": ["Measurements"],
        "summary": "Get SID Lists",
        "operationId": "Measurements.getSidLists",
        "parameters": [{
          "name": "senderId",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        },
        {
          "name": "reflectorId",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "responses": {
          "200": {
            "description": "Returns the available SID Lists between two devices",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SIDLists"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },

    "/overlay_nets/": {
      "get": {
        "tags": ["Overlay Networks"],
        "summary": "Get list of Overlay Networks",
        "operationId": "Overlays.fetch",
        "parameters": [{
          "name": "Overlay search query parameters",
          "in": "query",
          "description": "The parameters are used to search Overlay",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/Overlay search query parameters"
          }
        }, {
          "name": "Pagination parameters",
          "in": "query",
          "description": "The parameters are used to create pagination",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/Pagination parameters"
          }
        }],
        "responses": {
          "200": {
            "description": "Returns a Device",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/OverlayNet"
                  }
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      },
      "post": {
        "tags": ["Overlay Networks"],
        "summary": "Create Overlay Network",
        "operationId": "Overlays.create",
        "requestBody": {
          "$ref": "#/components/requestBodies/DeviceConfigureRequestBody"
        },
        "responses": {
          "200": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/overlay_nets/{id}": {
      "get": {
        "tags": ["Overlay Networks"],
        "summary": "Get Overlay",
        "operationId": "Overlays.get",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "responses": {
          "200": {
            "description": "Returns a Device",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/OverlayNet"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      },
      "delete": {
        "tags": ["Overlay Networks"],
        "summary": "Delete Overlay Network",
        "operationId": "Overlays.delete",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "responses": {
          "201": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/overlay_nets/{id}/slices": {
      "post": {
        "tags": ["Overlay Networks"],
        "summary": "Assign slice to Overlay Network",
        "operationId": "Overlays.assign_slice",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "requestBody": {
          "$ref": "#/components/requestBodies/DeviceConfigureRequestBody"
        },
        "responses": {
          "201": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/overlay_nets/{id}/slices/{s_id}": {
      "delete": {
        "tags": ["Overlay Networks"],
        "summary": "REmove slice from Overlay Network",
        "operationId": "Overlays.remove_slice",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }, {
          "name": "s_id",
          "in": "path",
          "description": "Slice identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "integer"
          }
        }],
        "responses": {
          "201": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/tenants": {
      "get": {
        "tags": ["Tenants"],
        "summary": "Get list of Tenant",
        "operationId": "Tenants.fetch",
        "parameters": [{
          "name": "Pagination parameters",
          "in": "query",
          "description": "The parameters are used to create pagination",
          "required": false,
          "style": "form",
          "explode": true,
          "schema": {
            "$ref": "#/components/schemas/Pagination parameters"
          }
        }],
        "responses": {
          "200": {
            "description": "Returns a list of Tenant",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Tenant"
                  }
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      },
      "post": {
        "tags": ["Tenants"],
        "summary": "Create Tenant",
        "operationId": "Tenants.crete",
        "requestBody": {
          "$ref": "#/components/requestBodies/TenantRequestBody"
        },
        "responses": {
          "200": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/tenants/{id}": {
      "get": {
        "tags": ["Tenants"],
        "summary": "Get list of Tenant",
        "operationId": "Tenants.get",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "responses": {
          "200": {
            "description": "Returns a list of Tenant",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Tenant"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      },
      "delete": {
        "tags": ["Tenants"],
        "summary": "Delete Tenant",
        "operationId": "Tenants.delete",
        "parameters": [{
          "name": "id",
          "in": "path",
          "description": "Resource id identifier",
          "required": true,
          "style": "simple",
          "explode": false,
          "schema": {
            "type": "string"
          }
        }],
        "responses": {
          "201": {
            "description": "The request is successfull",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/inline_response_204"
                }
              }
            }
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
      }
    },
    "/app/version": {
      "get": {
        "tags": ["App"],
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
        "tags": ["Support"],
        "summary": "Support contact",
        "operationId": "Support.contact",
        "requestBody": {
          "$ref": "#/components/requestBodies/SupportContactRequestBody"
        },
        "responses": {
          "204": {
            "description": "ok nocontent"
          }
        },
        "security": [{
          "bearerAuthentication": []
        }]
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
        "required": ["email", "token", "type"],
        "type": "object",
        "properties": {
          "token": {
            "type": "string",
            "description": "Token"
          },
          "type": {
            "type": "string",
            "description": "Tipo del token",
            "enum": ["activation", "reset"]
          },
          "email": {
            "type": "string",
            "description": "Email dell'utente a cui è associato il token",
            "format": "email"
          }
        },
        "description": "Rappresentazione di un token per l'attivazione di un utente o del reset della password"
      },
      "Dashboard": {
        "type": "object",
        "properties": {
          "tenants": {
            "type": "object"
          },
          "devices": {
            "type": "object"
          },
          "overlays": {
            "type": "object"
          },
          "operators": {
            "type": "object"
          }
        }
      },
      "SIDLists": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "tenantid": {
              "type": "string"
            },
            "overlayid": {
              "type": "string"
            },
            "overlay_name": {
              "type": "string"
            },
            "direct_sid_list": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "return_sid_list": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
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
            "enum": ["admin", "operator"]
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
      "Measurement": {
        "type": "object",
        "properties": {
          "sessionId": {
            "type": "string"
          },
          "sessionDescription": {
            "type": "string"
          },
          "senderName": {
            "type": "string"
          },
          "reflectorName": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": ["Running", "Stopped"]
          },
          "delayDirectPath": {
            "type": "number"
          },
          "delayReturnPath": {
            "type": "number"
          },
          "results": {
            "type": "object",
            "properties": {
              "delayDirectPath": {
                "type": "object",
                "properties": {
                  "delays": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number"
                        },
                        "timestamp": {
                          "type": "number"
                        },
                        "value": {
                          "type": "number"
                        },
                      }
                    },
                    "averageDelay": {
                      "type": "number"
                    }
                  }
                }
              },
              "delayReturnPath": {
                "type": "object",
                "properties": {
                  "delays": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "number"
                        },
                        "timestamp": {
                          "type": "number"
                        },
                        "value": {
                          "type": "number"
                        },
                      }
                    },
                    "averageDelay": {
                      "type": "number"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "Device": {
        "type": "object",
        "properties": {
          "device_id": {
            "type": "string"
          },
          "interfaces": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Interface"
            }
          },
          "features": {
            "type": "object"
          },
          "loopbackip": {
            "type": "string"
          },
          "loopbacknet": {
            "type": "string"
          },
          "mgmtip": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": ["router"]
          },
          "nat_type": {
            "type": "string",
            "enum": ["Open", "Full-cone NAT", "Restricted-cone NAT", "Restricted-port NAT", "Symmetric NAT", "UDP Firewall", "Blocked"]
          },
          "registration_timestamp": {
            "type": "string"
          },
          "status": {
            "type": "string",
            "enum": ["Connected", "Running", "Not Connected"]
          },
          "tenantid": {
            "type": "string"
          },
          "tunnel_info": {
            "type": "string"
          },
          "tunnel_mode": {
            "type": "string"
          }
        }
      },
      "Tenant": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "domain_id": {
            "type": "string"
          },
          "id": {
            "type": "string"
          },
          "conf": {
            "$ref": "#/components/schemas/Tenant_conf"
          },
          "token": {
            "type": "string"
          }
        }
      },
      "Interface": {
        "type": "object",
        "properties": {
          "ifindex": {
            "type": "string"
          },
          "ifname": {
            "type": "string"
          },
          "ipaddr": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "macaddr": {
            "type": "string"
          },
          "state": {
            "type": "string",
            "enum": ["UP", "DOWN"]
          }
        }
      },
      "ConfigurationInterface": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": ["lan", "wan", "unknown"]
          },
          "subnets": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "addrs": {
            "type": "array",
            "items": {
              "type": "string"
            }
          }
        }
      },
      "OverlayNet": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          }
        }
      },
      "Slice": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "table_id": {
            "type": "string"
          },
          "interfaces": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/Interface"
            }
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
            "$ref": "#/components/schemas/Operator"
          }
        }
      },
      "inline_response_204": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
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
            "enum": ["admin", "operator"]
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
      "Device search query parameters": {
        "type": "object",
        "properties": {
          "term": {
            "type": "string",
            "description": "Search string for name"
          }
        }
      },
      "Measurement search query parameters": {
        "type": "object",
        "properties": {
          "term": {
            "type": "string",
            "description": "Search string for name"
          }
        }
      },
      "Interface search query parameters": {
        "type": "object",
        "properties": {
          "term": {
            "type": "string",
            "description": "Search string for name"
          },
          "type": {
            "type": "string",
            "enum": ["lan", "wan"]
          },
          "available": {
            "type": "boolean"
          }
        }
      },
      "Overlay search query parameters": {
        "type": "object",
        "properties": {
          "term": {
            "type": "string",
            "description": "Search string for name"
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
      "Tenant_conf": {
        "type": "object",
        "properties": {
          "port": {
            "type": "string"
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
      "OperatorSigninResponse": {
        "description": "The operator is now authenticated into the system",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/inline_response_200"
            }
          }
        }
      },
      "SuccessResponse": {
        "description": "The request is successfull",
        "content": {
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/inline_response_204"
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
          "type": "string"
        }
      },

      "MeasurementIdPathParameter": {
        "name": "sessionId",
        "in": "path",
        "description": "Resource id identifier",
        "required": true,
        "style": "simple",
        "explode": false,
        "schema": {
          "type": "string"
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
      "DeviceSearchQueryParameters": {
        "name": "Device search query parameters",
        "in": "query",
        "description": "The parameters are used to search Devices",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "$ref": "#/components/schemas/Device search query parameters"
        }
      },
      "MeasurementSearchQueryParameters": {
        "name": "Measurement search query parameters",
        "in": "query",
        "description": "The parameters are used to search Sessions",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "$ref": "#/components/schemas/Measurement search query parameters"
        }
      },
      "DeviceInterfaceSearchQueryParameters": {
        "name": "Interface search query parameters",
        "in": "query",
        "description": "The parameters are used to search Interfaces",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "$ref": "#/components/schemas/Interface search query parameters"
        }
      },
      "OverlaySearchQueryParameters": {
        "name": "Overlay search query parameters",
        "in": "query",
        "description": "The parameters are used to search Overlay",
        "required": false,
        "style": "form",
        "explode": true,
        "schema": {
          "$ref": "#/components/schemas/Overlay search query parameters"
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
        }
      }
    },
    "requestBodies": {
      "OAuth2AccessTokenRequestBody": {
        "description": "User request body. The required fields are only for signup.",
        "content": {
          "application/json": {
            "schema": {
              "required": ["client_id", "client_secret", "grant_type", "password", "scope", "username"],
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
      "RegistrationConfigureRequestBody": {
        "description": "Registration Configure request body.",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "domain": {
                  "type": "string"
                },
                "username": {
                  "type": "string"
                },
                "email": {
                  "type": "string"
                },
                "password": {
                  "type": "string"
                },
                "confirmPassword": {
                  "type": "string"
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
              "required": ["email"],
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
      "OverlayCreationRequestBody": {
        "description": "User/Operator password recover request body.",
        "content": {
          "application/json": {
            "schema": {
              "required": ["encap", "intefaces", "name", "type"],
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "id": {
                  "type": "string"
                },
                "type": {
                  "type": "string",
                  "enum": ["IPv4Overlay", "IPv6Overlay"]
                },
                "encap": {
                  "type": "string"
                },
                "interfaces": {
                  "type": "array",
                  "items": {
                    "type": "object"
                  }
                }
              }
            }
          }
        }
      },
      "TenantRequestBody": {
        "description": "New tenant request body.",
        "content": {
          "application/json": {
            "schema": {
              "required": ["conf", "description", "domain", "name"],
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "conf": {
                  "type": "object",
                  "properties": {
                    "port": {
                      "type": "string"
                    }
                  }
                },
                "domain": {
                  "type": "string"
                },
                "description": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "SliceAssignRequestBody": {
        "description": "New Slice request body.",
        "content": {
          "application/json": {
            "schema": {
              "required": ["interfaces", "name"],
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "interfaces": {
                  "type": "array",
                  "items": {
                    "type": "object"
                  }
                }
              }
            }
          }
        }
      },
      "DeviceConfigureRequestBody": {
        "description": "Device Configure request body.",
        "content": {
          "application/json": {
            "schema": {
              "required": ["tenantid"],
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "id": {
                  "type": "number"
                },
                "description": {
                  "type": "string"
                },
                "tenantid": {
                  "type": "string"
                },
                "interfaces": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ConfigurationInterface"
                  }
                }
              }
            }
          }
        }
      },
      "SIDListsRequestBody": {
        "description": "GetSidLists request body.",
        "content": {
          "application/json": {
            "schema": {
              "required": ["tenantid"],
              "type": "object",
              "properties": {
                "ingressDeviceID": {
                  "type": "string"
                },
                "egressDeviceID": {
                  "type": "string"
                },
                "tenantid": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "MeasurementConfigureRequestBody": {
        "description": "Measurement Configure request body.",
        "content": {
          "application/json": {
            "schema": {
              "required": ["sessionId"],
              "type": "object",
              "properties": {
                "sessionId": {
                  "type": "number"
                },
                "sessionDescription": {
                  "type": "string"
                },
                "tenantid": {
                  "type": "string"
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
              "required": ["email", "password", "token"],
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
      "OperatorRequestBody": {
        "description": "Operator request body. The required fields are only for signup.",
        "content": {
          "multipart/form-data": {
            "schema": {
              "required": ["email", "fiscal_code", "name", "password", "surname"],
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