### Compra de Fretes API Request Example

Source: https://docs.melhorenvio.com.br/reference/compra-de-fretes-1

This example demonstrates the structure of a request to purchase shipping. Ensure all required headers, including Authorization and User-Agent, are correctly set.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/shipment/checkout": {
      "post": {
        "summary": "Compra de fretes",
        "description": "Pagamento de envios (Checkout)",
        "operationId": "compra-de-fretes-1",
        "parameters": [
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Content-Type",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "orders"
                ],
                "properties": {
                  "orders": {
                    "type": "array",
                    "description": "Pedidos",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              },
              "examples": {
                "Request Example": {
                  "value": {
                    "orders": [
                      "{{id}}"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": {
                      "order_id": "{{id}}",
                      "shipping_order_id": "{{id}}",
                      "status": "generated",
                      "tracking_code": "{{tracking_code}}",
                      "payment_url": "{{payment_url}}",
                      "agency": "{{agency}}",
                      "created_at": "{{date}}",
                      "updated_at": "{{date}}",
                      "total_price": "{{price}}",
                      "postage_price": "{{price}}",
                      "custom_price": "{{price}}",
                      "insurance_price": "{{price}}",
                      "label_price": "{{price}}",
                      "collection_price": "{{price}}",
                      "options": {
                        "insurance": "{{price}}",
                        "receipt": true,
                        "own_hand": true,
                        "platform": "{{platform}}",
                        "tags": [
                          "{{tag}}"
                        ]
                      },
                      "volumes": [
                        {
                          "service_code": "{{service_code}}",
                          "code": "{{code}}",
                          "amount": 1,
                          "description": "{{description}}",
                          "weight": 0.5,
                          "volume": {
                            "width": 10,
                            "height": 10,
                            "length": 10
                          }
                        }
                      ],
                      "buyer": {
                        "name": "{{name}}",
                        "document": "{{document}}",
                        "email": "{{email}}",
                        "phone": "{{phone}}",
                        "country": "{{country}}",
                        "state": "{{state}}",
                        "city": "{{city}}",
                        "street": "{{street}}",
                        "number": "{{number}}",
                        "complement": "{{complement}}",
                        "district": "{{district}}",
                        "postal_code": "{{postal_code}}",
                        "notes": "{{notes}}"
                      },
                      "recipient": {
                        "name": "{{name}}",
                        "document": "{{document}}",
                        "email": "{{email}}",
                        "phone": "{{phone}}",
                        "country": "{{country}}",
                        "state": "{{state}}",
                        "city": "{{city}}",
                        "street": "{{street}}",
                        "number": "{{number}}",
                        "complement": "{{complement}}",
                        "district": "{{district}}",
                        "postal_code": "{{postal_code}}",
                        "notes": "{{notes}}"
                      },
                      "sender": {
                        "name": "{{name}}",
                        "document": "{{document}}",
                        "email": "{{email}}",
                        "phone": "{{phone}}",
                        "country": "{{country}}",
                        "state": "{{state}}",
                        "city": "{{city}}",
                        "street": "{{street}}",
                        "number": "{{number}}",
                        "complement": "{{complement}}",
                        "district": "{{district}}",
                        "postal_code": "{{postal_code}}",
                        "notes": "{{notes}}"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

--------------------------------

### Example Response for SEDEX with Insurance

Source: https://docs.melhorenvio.com.br/discuss/67ae194c9c0e48006fc7cddb

This is an example response for a SEDEX quote, showing how insurance values might be reflected. Note that the provided snippet is incomplete.

```json
{
    "id": 2,
    "name": "SEDEX",
    "price": "30.70",
    "custom_price": "30.70",

```

--------------------------------

### Product Schema Example

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

Defines the structure for product information, including ID, quantity, and other relevant properties.

```json
{
  "id": "pequeno",
  "quantity": 1
}
```

--------------------------------

### OpenAPI Definition - 200 OK Example

Source: https://docs.melhorenvio.com.br/reference/inserir-saldo-na-carteira-do-usuario

This example shows a successful response (200 OK) for an API operation, including details about the order and shipping information.

```json
{
  "object": {
    "id": 12345,
    "order_number": "ABC123456789",
    "order_id": "12345",
    "created_at": "2021-06-22 12:17:00",
    "updated_at": "2021-06-22 12:17:38"
  },
  "redirect": "https://sandbox.melhorenvio.com.br/checkout/notify/2",
  "message": "",
  "digitable": {}
}
```

--------------------------------

### Freight Calculation Request - Product Example

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

An example request body for calculating freight costs based on multiple products. It includes origin and destination postal codes, and a list of products with their respective attributes.

```json
{
  "from": {
    "postal_code": "96020360"
  },
  "to": {
    "postal_code": "01018020"
  },
  "products": [
    {
      "id": "x",
      "width": 11,
      "height": 17,
      "length": 11,
      "weight": 0.3,
      "insurance_value": 10.1,
      "quantity": 1
    },
    {
      "id": "y",
      "width": 16,
      "height": 25,
      "length": 11,
      "weight": 0.3,
      "insurance_value": 55.05,
      "quantity": 2
    },
    {
      "id": "z",
      "width": 22,
      "height": 30,
      "length": 11,
      "weight": 1,
      "insurance_value": 30,
      "quantity": 1
    }
  ]
}
```

--------------------------------

### Curl Request Example

Source: https://docs.melhorenvio.com.br/discuss/66855006aa47fd0018911d32

This example demonstrates how to make a POST request to the Melhor Envio API's cart endpoint using curl. It includes headers for authentication and content type, and a JSON payload with shipping details and volume information.

```bash
curl --location 'https://sandbox.melhorenvio.com.br/api/v2/me/cart' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer ...' \
--data-raw '{ 
"service": 2, 
"from": { 
"name": "Fulano de Tal", 
"phone": "", 
"email": "", 
"document": "", 
"company_document": "", 
"state_register": "", 
"address": "Rua Teste", 
"complement": "SL 1405", 
"number": "123", 
"district": "", 
"city": "São Paulo", 
"state_abbr": "SP", 
"country_id": "BR", 
"postal_code": "", 
"note": "Pedido: 996003" 
}, 
"to": { 
"name": "Usuário de Teste", 
"phone": "", 
"email": "teste@teste.com.br", 
"document": "", 
"company_document": "", 
"state_register": "", 
"address": "", 
"complement": "", 
"number": "150", 
"district": "", 
"city": "São Paulo", 
"state_abbr": "SP", 
"country_id": "BR", 
"postal_code": "", 
"note": "Pedido: 996003" 
}, 
"products": [ 
{
"id": "29379", 
"name": "Teste dimensoes | Cor: Laranja - Tamanho: P", 
"quantity": "1", 
"unitary_value": "10.00" 
} 
], 
"volumes": [ 
{
"width": 11,
"height": 2,
"length": 18,
"weight": 0.01
}
], 
"options": { 
"insurance_value": 10.0, 
"receipt": false, 
"own_hand": false, 
"reverse": false, 
"non_commercial": true, 
"invoice": { 
"key": "" 
}
}
}'
```

--------------------------------

### Webhook Request Header Example

Source: https://docs.melhorenvio.com.br/docs/webhooks

This is an example of the JSON structure for the header of a webhook request. Ensure your server is configured to accept these headers.

```json
{
  "user-agent": "Melhor Envio Webhooks/1.0",
  "accept": "application/json, text/plain, */*",
  "accept-encoding": "gzip, compress, deflate, br",
  "x-me-signature": "eW/6UEmwJ7vH13kMsrhjMVzek3Yg0Oa5TDsUSeLVFoM=",
  "content-type": "application/json"
}
```

--------------------------------

### Additional Services Schema Example

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

Illustrates the schema for configuring additional shipping services such as receipt, own-hand delivery, and collection.

```json
{
  "receipt": true,
  "own_hand": true,
  "collect": false
}
```

--------------------------------

### Company Schema Example

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

Shows the structure for specifying shipping company details, including ID, name, and picture URL.

```json
{
  "id": 1,
  "name": "Correios",
  "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png"
}
```

--------------------------------

### Listar Informações de uma Etiqueta (OpenAPI)

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-de-uma-etiqueta

Definição OpenAPI para a operação GET /api/v2/me/orders/{id}. Detalha os parâmetros de requisição, incluindo o ID da ordem e cabeçalhos obrigatórios como User-Agent e Authorization. Apresenta um exemplo da estrutura JSON da resposta para um status 'posted'.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/orders/{id}": {
      "get": {
        "summary": "Listar informações de uma etiqueta",
        "description": "",
        "operationId": "listar-informacoes-de-uma-etiqueta",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Id da order correspondente à etiqueta de envio",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header',
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": \"34105e98-bb32-4e85-8b0f-8bd2c888eb31\",\n  \"protocol\": \"ORD-20220395517\",\n  \"service_id\": 1,\n  \"agency_id\": null,\n  \"contract\": \"9912415671\",\n  \"service_code\": null,\n  \"quote\": 31.13,\n  \"price\": 31.13,\n  \"coupon\": null,\n  \"discount\": 4.15,\n  \"delivery_min\": 8,\n  \"delivery_max\": 9,\n  \"status\": \"posted\",\n  \"reminder\": null,\n  \"insurance_value\": 50,\n  \"weight\": null,\n  \"width\": null,\n  \"height\": null,\n  \"length\": null,\n  \"diameter\": null,\n  \"format\": \"box\",\n  \"billed_weight\": 3.5,\n  \"receipt\": false,\n  \"own_hand\": false,\n  \"collect\": false,\n  \"collect_scheduled_at\": null,\n  \"reverse\": false,\n  \"non_commercial\": false,\n  \"authorization_code\": \"2022032920\",\n  \"tracking\": \"ME220021P96BR\",\n  \"self_tracking\": \"ME220021P96BR\",\n  \"delivery_receipt\": null,\n  \"additional_info\": null,\n  \"cte_key\": null,\n  \"paid_at\": \"2022-03-29 20:43:37\",\n  \"generated_at\": \"2022-03-29 20:43:50\",\n  \"posted_at\": \"2022-03-29 21:00:06\",\n  \"delivered_at\": null,\n  \"canceled_at\": null,\n  \"suspended_at\": null,\n  \"expired_at\": null,\n  \"created_at\": \"2022-03-29 20:24:51\",\n  \"updated_at\": \"2022-03-29 21:00:06\",\n  \"parse_pi_at\": null,\n  \"from\": {\n    \"name\": \"Teste ME\",\n    \"phone\": \"5598105050\",\n    \"email\": \"melhorenvio@teste.com\",\n    \"document\": \"16571478358\",\n    \"company_document\": \"04517623000197\",\n    \"state_register\": \"563025255115\",\n    \"postal_code\": \"7110000\",\n    \"address\": \"Rua Teste\",\n    \"location_number\": \"100\",\n    \"complement\": \"CASA\",\n    \"district\": \"Bairro Teste\",\n    \"city\": \"Guarulhos\",\n    \"state_abbr\": \"SP\",\n    \"country_id\": \"BR\",\n    \"latitude\": null,\n    \"longitude\": null,\n    \"note\": \"observação\"\n  },\n  \"to\": {\n    \"name\": \"Melhor Envio Teste\",\n    \"phone\": \"1999999999\",\n    \"email\": \"melhorenvio@teste.com\",\n    \"document\": \"73646548010\",\n    \"company_document\": \"89794131000100\",\n    \"state_register\": \"123456\",\n    \"postal_code\": \"26210000\",\n    \"address\": \"Avenida Marechal Floriano Peixoto\",\n    \"location_number\": \"123\",\n    \"complement\": \"Ap 2\",\n    \"district\": \"Centro\",\n    \"city\": \"Nova Iguacu\",\n    \"state_abbr\": \"RJ\",\n    \"country_id\": \"BR\",\n    \"latitude\": null,\n    \"longitude\": null,\n    \"note\": \"observação\"\n  },\n  \"service\": {\n    \"id\": 1,\n    \"name\": \"PAC\",\n    \"status\": \"available\",\n    \"type\": \"normal\",\n    \"range\": \"interstate\",\n    \"restrictions\": \"{\\\"insurance_value\\\":{\\\"min\\\":0,\\\"max\\\":3000},\\\"formats\\\":{\\\"box\\\":{\\\"weight\\\":{\\\"min\\\":0.001,\\\"max\\\":30},\\\"width\\\":{\\\"min\\\":11,\\\"max\\\":105},\\\"height\\\":{\\\"min\\\":2,\\\"max\\\":105},\\\"length\\\":{\\\"min\\\":16,\\\"max\\\":105},\\\"sum\\\":200},\\\"roll\\\":{\\\"weight\\\":{\\\"min\\\":0.001,\\\"max\\\":30},\\\"diameter\\\":{\\\"min\\\":5,\\\"max\\\":91},\\\"length\\\":{\\\"min\\\":18,\\\"max\\\":105},\\\"sum\\\":200},\\\"letter\\\":{\\\"weight\\\":{\\\"min\\\"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

--------------------------------

### Freight Calculation Request - Package Example

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

An example request body for calculating freight costs based on a single package. It includes origin and destination postal codes, and package dimensions and weight.

```json
{
  "from": {
    "postal_code": "01002001"
  },
  "to": {
    "postal_code": "90570020"
  },
  "package": {
    "height": 4,
    "width": 12,
    "length": 17,
    "weight": 0.3
  }
}
```

--------------------------------

### Listar endereços do usuário (OpenAPI)

Source: https://docs.melhorenvio.com.br/reference/listar-enderecos-do-usuario

Definição OpenAPI para o endpoint que lista os endereços do usuário. Inclui detalhes sobre a requisição GET, parâmetros de cabeçalho e exemplos de respostas.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/addresses": {
      "get": {
        "summary": "Listar endereços do usuário",
        "description": "Informações do usuário",
        "operationId": "listar-enderecos-do-usuario",
        "parameters": [
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"current_page\": 1,\n  \"data\": [\n    {\n      \"id\": 28xxx,\n      \"label\": \"Minha Loja teste\",\n      \"postal_code\": \"xxxxxxx\",\n      \"address\": \"Rua teste\",\n      \"number\": \"100\",\n      \"complement\": null,\n      \"district\": \"Centro Teste\",\n      \"latitude\": null,\n      \"longitude\": null,\n      \"confirmed_at\": null,\n      \"created_at\": \"2021-06-22 12:17:38\",\n      \"updated_at\": \"2021-06-22 12:17:38\",\n      \"city\": {\n        \"id\": 4xxx,\n        \"city\": \"Pelotas\",\n        \"state\": {\n          \"id\": xx,\n          \"state\": \"Rio Grande do Sul\",\n          \"state_abbr\": \"RS\",\n          \"country\": {\n            \"id\": \"BR\",\n            \"country\": \"Brazil\"\n          }\n        }\n      }\n    }\n  ],
  \"first_page_url\": \"https://sandbox.melhorenvio.com.br/api/v2/me/addresses?page=1\",\n  \"from\": 1,\n  \"last_page\": 1,\n  \"last_page_url\": \"https://sandbox.melhorenvio.com.br/api/v2/me/addresses?page=1\",\n  \"next_page_url\": null,\n  \"path\": \"https://sandbox.melhorenvio.com.br/api/v2/me/addresses\",\n  \"per_page\": 10,\n  \"prev_page_url\": null,\n  \"to\": 1,\n  \"total\": 1\n}"
                  }
                }
              }
            }
          },
          "401": {
            "description": "401",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"message\": \"Unauthenticated.\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Unauthenticated."
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

--------------------------------

### Example of a 422 Unprocessable Entity Response

Source: https://docs.melhorenvio.com.br/reference/compra-de-fretes-1

This example shows the structure of a 422 error response, indicating invalid data was provided. It details the general message and specific errors related to orders.

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "orders": [
      "Existe uma ou mais orders que já foram pagas."
    ]
  }
}
```

--------------------------------

### Listar Etiquetas - Requisição

Source: https://docs.melhorenvio.com.br/reference/listar-etiquetas

Define o endpoint GET para listar etiquetas. Inclui parâmetros obrigatórios como Accept, Authorization e User-Agent, além de um parâmetro opcional 'status'.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/orders": {
      "get": {
        "summary": "Listar etiquetas",
        "description": "",
        "operationId": "listar-etiquetas",
        "parameters": [
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "{Pending | Released | Posted | Delivered | Canceled | Not Delivered}",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"current_page\": 1,\n  \"data\": [],\n  \"first_page_url\": \"https://sandbox.melhorenvio.com.br/api/v2/me/orders?page=1\",\n  \"from\": null,\n  \"last_page\": 1,\n  \"last_page_url\": \"https://sandbox.melhorenvio.com.br/api/v2/me/orders?page=1\",\n  \"next_page_url\": null,\n  \"path\": \"https://sandbox.melhorenvio.com.br/api/v2/me/orders\",\n  \"per_page\": 10,\n  \"prev_page_url\": null,\n  \"to\": null,\n  \"total\": 0\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "current_page": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {}
                      }
                    },
                    "first_page_url": {
                      "type": "string",
                      "example": "https://sandbox.melhorenvio.com.br/api/v2/me/orders?page=1"
                    },
                    "from": {},
                    "last_page": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "last_page_url": {
                      "type": "string",
                      "example": "https://sandbox.melhorenvio.com.br/api/v2/me/orders?page=1"
                    },
                    "next_page_url": {},
                    "path": {
                      "type": "string",
                      "example": "https://sandbox.melhorenvio.com.br/api/v2/me/orders"
                    },
                    "per_page": {
                      "type": "integer",
                      "example": 10,
                      "default": 0
                    },
                    "prev_page_url": {},
                    "to": {},
                    "total": {
                      "type": "integer",
                      "example": 0,
                      "default": 0
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "401",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"message\": \"Unauthenticated.\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Unauthenticated."
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

--------------------------------

### Validation Error Example (422)

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

Provides an example of a 422 Unprocessable Entity response, detailing validation errors for required fields like postal codes.

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "from.postal_code": [
      "O campo from.postal code é obrigatório."
    ],
    "to.postal_code": [
      "O campo to.postal code é obrigatório."
    ]
  }
}
```

--------------------------------

### PHP API Request for Shipping Calculation

Source: https://docs.melhorenvio.com.br/discuss/623331988fdab1002c61e3ec

Example of how to construct an API request in PHP, including setting headers and the JSON payload for shipping calculation. Ensure the URL is correct and all headers are properly formatted.

```php
$url = "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate";
$headers = array(); 
$headers[] = 'Accept: application/json'; 
$headers[] = 'Authorization: Bearer ' . $_token;
$headers[] = 'Content-Type: application/json'; 
$headers[] = 'User-Agent: Aplicação roberto_si@outlook.com';
$jsonSend = array(
  "from" => array(
    "postal_code" => "11350010"
  ),
  "to" => array(
    "postal_code" => "01310930"
  ),
  "products" => array(
    array(
      "id" => "12",
      "width" => 11,
      "height" => 17,
      "length" => 11,
      "weight" => 0.3,
      "insurance_value" => 10,
      "quantity" => 1
    )
  )
);
```

--------------------------------

### OpenAPI Schema for Created/Updated At

Source: https://docs.melhorenvio.com.br/reference/inserir-logistica-reversa-no-carrinho

This snippet shows the schema definition for 'created_at' and 'updated_at' fields, specifying them as strings with an example format.

```json
{
                          "created_at": {
                            "type": "string",
                            "example": "2022-03-29 12:50:19"
                          },
                          "updated_at": {
                            "type": "string",
                            "example": "2022-03-29 12:50:19"
                          }
                        }
```

--------------------------------

### Exibir Informações de Item do Carrinho - OpenAPI

Source: https://docs.melhorenvio.com.br/reference/exibir-informacoes-de-item-do-carrinho

Define o endpoint GET para exibir informações de um item do carrinho, incluindo parâmetros de requisição e estrutura de resposta.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/cart/{id}": {
      "get": {
        "summary": "Exibir informações de item do carrinho",
        "description": "Carrinho de Compras",
        "operationId": "exibir-informacoes-de-item-do-carrinho",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID do Pedido",
            "schema": {
              "type": "string",
              "default": "id"
            },
            "required": true
          },
          {
            "name": "Accept",
            "in": "header",
            "description": "application/json",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obritatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": \"c7e6f6a1-88a2-4b76-95e1-eb9f344f2885\",\n  \"protocol\": \"ORD-20220397320\",\n  \"service_id\": 3,\n  \"agency_id\": 49,\n  \"contract\": null,\n  \"service_code\": null,\n  \"quote\": 25.35,\n  \"price\": 25.35,\n  \"coupon\": null,\n  \"discount\": 5.71,\n  \"delivery_min\": 5,\n  \"delivery_max\": 6,\n  \"status\": \"pending\",\n  \"reminder\": null,\n  \"insurance_value\": 50,\n  \"weight\": null,\n  \"width\": null,\n  \"height\": null,\n  \"length\": null,\n  \"diameter\": null,\n  \"format\": \"box\",\n  \"billed_weight\": 3.5,\n  \"receipt\": false,\n  \"own_hand\": false,\n  \"collect\": false,\n  \"collect_scheduled_at\": null,\n  \"reverse\": false,\n  \"non_commercial\": false,\n  \"authorization_code\": null,\n  \"tracking\": null,\n  \"self_tracking\": null,\n  \"delivery_receipt\": null,\n  \"additional_info\": null,\n  \"cte_key\": null,\n  \"paid_at\": null,\n  \"generated_at\": null,\n  \"posted_at\": null,\n  \"delivered_at\": null,\n  \"canceled_at\": null,\n  \"suspended_at\": null,\n  \"expired_at\": null,\n  \"created_at\": \"2022-03-29 14:17:08\",\n  \"updated_at\": \"2022-03-29 14:17:08\",\n  \"parse_pi_at\": null,\n  \"from\": {\n    \"name\": \"Teste Magento\",\n    \"phone\": \"5598105050\",\n    \"email\": \"melhorenvio@teste.com\",\n    \"document\": \"16571478358\",\n    \"company_document\": \"04517623000197\",\n    \"state_register\": \"563025255115\",\n    \"postal_code\": \"7110000\",\n    \"address\": \"Rua Teste\",\n    \"location_number\": \"100\",\n    \"complement\": \"CASA\",\n    \"district\": \"Bairro teste\",\n    \"city\": \"Guarulhos\",\n    \"state_abbr\": \"SP\",\n    \"country_id\": \"BR\",\n    \"latitude\": null,\n    \"longitude\": null,\n    \"note\": \"observação\"\n  },\n  \"to\": {\n    \"name\": \"Melhor Envio\",\n    \"phone\": \"1999999999\",\n    \"email\": \"melhorenvio@teste.com\",\n    \"document\": \"73646548010\",\n    \"company_document\": \"89794131000100\",\n    \"state_register\": \"123456\",\n    \"postal_code\": \"26210000\",\n    \"address\": \"Avenida Marechal Floriano Peixoto\",\n    \"location_number\": \"123\",\n    \"complement\": \"ap 2\",\n    \"district\": \"Centro\",\n    \"city\": \"Nova Iguacu\",\n    \"state_abbr\": \"RJ\",\n    \"country_id\": \"BR\",\n    \"latitude\": null,\n    \"longitude\": null,\n    \"note\": \"Observação\"\n  },\n  \"service\": {\n    \"id\": 3,\n    \"name\": ".Package",\n    \"status\": \"available\",\n    \"type\": \"normal\",\n    \"range\": \"interstate\",\n    \"restrictions\": \"{\\\"insurance_value\\\":{\\\"min\\\":0,\\\"max\\\":29900},\\\"formats\\\":{\\\"box\\\":{\\\"weight\\\":{\\\"min\\\":0.001,\\\"max\\\":120},\\\"width\\\":{\\\"min\\\":1,\\\"max\\\":105},\\\"height\\\":{\\\"min\\\":1,\\\"max\\\":100},\\\"length\\\":{\\\"min\\\":1,\\\"max\\\":181},\\\"sum\\\":386}}}\",\n    \"requirements\": \"[\\\"names\\\",\\\"phones\\\",\\\"addresses\\\",\\\"documents\\\",\\\"invoice\\\"]\",\n    \"optionals\": \"[\\\"AR\\\",\\\"VD\\\"]\",\n    \"company\": {\n      \"id\": 2,\n      \"name\": \"Jadlog\",\n      \"status\": "
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

--------------------------------

### Corrected Shipping Quote Request Using 'insurance' per Package

Source: https://docs.melhorenvio.com.br/discuss/67ae194c9c0e48006fc7cddb

This example shows the correct way to specify insurance for individual packages by using the 'insurance' field within each package object in the 'package' array.

```json
{
  "from": {
    "postal_code": "96055-710"
  },
  "to": {
    "postal_code": "26210000"
  },
  "package": [
    {
      "width":1,
      "height":5,
      "length":10,
      "weight":0.1,
      "insurance":50
    },
    {
      "width":1,
      "height":5,
      "length":10,
      "weight":0.1,
      "insurance":50
    }
  ]
}
```

--------------------------------

### Order Posted Event Body Example

Source: https://docs.melhorenvio.com.br/docs/webhooks

This JSON structure represents the body of a webhook notification for the 'order.posted' event. It contains details about the order and associated tags.

```json
{
    "event": "order.posted",
    "data": {
        "id": "0000aaaa-aa00-00aa-aa00-000000aaaaaa",
        "protocol": "ORD-2024XXXXXXXXXX",
        "status": "posted",
        "tracking": null,
        "self_tracking": null,
        "user_id": "0000111",
        "tags": [
            {
                "tag": "tag1",
                "url": "www.url1.com"
            }
        ],
        "created_at": "2024-03-29T23:49:26+00:00",
        "paid_at": null,
        "generated_at": null,
        "posted_at": "2024-03-29T23:55:00+00:00",
        "delivered_at": null,
        "canceled_at": null,
        "expired_at": null,
        "tracking_url": "https: //www.melhorrastreio.com.br/rastreio/XXXXXXXXX"
    }
}
```

--------------------------------

### Token Request Payload

Source: https://docs.melhorenvio.com.br/discuss/64ebd9e3a51f76000b490e73

This is an example of the payload used to request an access token using the authorization code. The 'code' parameter is obtained from the authorization flow.

```json
{
  "grant_type": "authorization_code",
  "client_id": 15...,
  "client_secret": "irTPycPlyLhTYmht3CWmeE....",
  "redirect_uri": "https://teste.com.br",
  "code": "????"
}
```

--------------------------------

### API Response with Billed Weight

Source: https://docs.melhorenvio.com.br/discuss/66855006aa47fd0018911d32

This is an example of a response from the Melhor Envio API after a cart request. The 'billed_weight' field indicates how the API interpreted the provided weight, which can differ from the sent value if not formatted correctly.

```json
{
"id": "9c6f363e-f03a-451e-b198-a24c5be735fb",
"protocol": "ORD-202407210331",
"service_id": 2,
"agency_id": null,
"contract": null,
"service_code": null,
"quote": 10.78,
"price": 10.78,
"coupon": null,
"discount": 10.22,
"delivery_min": 1,
"delivery_max": 2,
"status": "pending",
"reminder": null,
"insurance_value": 10,
"weight": null,
"width": null,
"height": null,
"length": null,
"diameter": null,
"format": "box",
"billed_weight": 0.1,
"receipt": false,
"own_hand": false,
"collect": false,
"collect_scheduled_at": null,
"reverse": 0,
"non_commercial": true,
"authorization_code": null,
"tracking": null,
"self_tracking": null,
"delivery_receipt": null,
"additional_info": null,
"cte_key": null,
"paid_at": null,
"generated_at": null,
"posted_at": null,
"delivered_at": null,
"canceled_at": null,
"suspended_at": null,
"expired_at": null,
"created_at": "2024-07-03 13:50:53",
"updated_at": "2024-07-03 13:50:53",
"parse_pi_at": null,
"received_at": null,
"user": {
"id": "ee072e4b-0232-4cbe-b49b-ae75e4065513",
"protocol": "USR-202002472",
"firstname": "",
"lastname": "",
"email": "",
"picture": null,
"thumbnail": null,
"document_name": null,
"document_type": "cpf",
"document": "",
"birthdate": "1985-05-09T00:00:00.000000Z",
"email_confirmed_at": "2020-02-19T22:27:37.000000Z",
"imported": 0,
"access_at": "2024-07-03T13:16:26.000000Z",
"created_at": "2020-02-19T22:27:37.000000Z",
"updated_at": "2024-07-03T13:16:26.000000Z",
"app_id": 1
},
"products": [
{
"name": "Teste dimensoes | Cor: Laranja - Tamanho: P",
"quantity": 1,
"unitary_value": 10,
"weight": null
}
],
"volumes": [
{
"id": 215839,
"height": "2.00",
"width": "11.00",
"length": "18.00",
"diameter": "0.00",
"weight": "0.10",
"format": "box",
"created_at": "2024-07-03 13:50:54",
"updated_at": "2024-07-03 13:50:54"
}
]
}
```

--------------------------------

### Get Cart Item Details

Source: https://docs.melhorenvio.com.br/reference/exibir-informacoes-de-item-do-carrinho

Retrieves detailed information about a specific item within the shopping cart. This includes product name, quantity, unit value, and weight.

```APIDOC
## GET /cart/items/{itemId}

### Description
Retrieves detailed information about a specific item within the shopping cart.

### Endpoint
`/cart/items/{itemId}`

### Parameters
#### Path Parameters
- **itemId** (string) - Required - The unique identifier of the cart item.

### Response
#### Success Response (200)
- **products** (array) - List of products in the cart item.
  - **name** (string) - The name of the product.
  - **quantity** (integer) - The quantity of the product.
  - **unitary_value** (number) - The price of a single unit of the product.
  - **weight** (number) - The weight of the product.
- **volumes** (array) - Information about the volumes associated with the cart item.
  - **height** (string) - The height of the volume.
  - **width** (string) - The width of the volume.
  - **length** (string) - The length of the volume.
  - **weight** (string) - The weight of the volume.

#### Response Example
```json
{
  "products": [
    {
      "name": "Papel adesivo para etiquetas 1",
      "quantity": 3,
      "unitary_value": 100,
      "weight": null
    },
    {
      "name": "Papel adesivo para etiquetas 2",
      "quantity": 1,
      "unitary_value": 700,
      "weight": null
    }
  ],
  "volumes": [
    {
      "height": "10.00",
      "width": "15.00",
      "length": "20.00",
      "weight": "3.50"
    }
  ]
}
```
```

--------------------------------

### Decode JWT Token in PHP

Source: https://docs.melhorenvio.com.br/discuss?isFAQ=true&page=2&perPage=10

Use this PHP snippet to decode a JWT token and retrieve its validity information. Ensure you have the necessary JWT decoding libraries installed.

```php
<?php

// Example of how to decode a JWT token in PHP

$jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function base64UrlDecode($string) {
    return base64_decode(strtr($string, '-_', '+/') . str_repeat('=', 3 - (3 + strlen($string)) % 3));
}

$tokenParts = explode('.', $jwt);
$payload = base64UrlDecode($tokenParts[1]);

$decodedPayload = json_decode($payload, true);

print_r($decodedPayload);

?>
```

--------------------------------

### OpenAPI Error Structure for Phone Numbers

Source: https://docs.melhorenvio.com.br/reference/cadastrar-telefones-de-uma-loja

This snippet details the OpenAPI schema for handling errors related to phone numbers, specifying that the 'phone' field should be an array of strings and providing an example error message.

```json
{
  "errors": {
    "type": "object",
    "properties": {
      "phone": {
        "type": "array",
        "items": {
          "type": "string",
          "example": "O campo phone não pode ser superior a 11 caracteres."
        }
      }
    }
  }
}
```

--------------------------------

### OpenAPI Definition for Visualizar Loja

Source: https://docs.melhorenvio.com.br/reference/visualizar-loja

This is the complete OpenAPI 3.1.0 definition for the 'Visualizar loja' API endpoint. It specifies the server URL, request parameters, and example responses for both success (200) and not found (404) scenarios.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/companies/{storeId}": {
      "get": {
        "summary": "Visualizar loja",
        "description": "Cadastro e informações das lojas",
        "operationId": "visualizar-loja",
        "parameters": [
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          },
          {
            "name": "storeId",
            "in": "path",
            "description": "ID da loja",
            "schema": {
              "type": "string"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": \"781f86be-c3be-47e7-9bef-70b8675a55c3\",\n  \"protocol\": \"COM-2022035242\",\n  \"name\": \"Melhor Loja\",\n  \"email\": \"contato@melhorloja.me\",\n  \"website\": null,\n  \"picture\": null,\n  \"thumbnail\": null,\n  \"description\": \"Descrição da loja\",\n  \"company_name\": \"Nome da Loja\",\n  \"document\": \"89157108000104\",\n  \"state_register\": \"476210979481\",\n  \"created_at\": \"2022-03-30 16:53:56\",\n  \"updated_at\": \"2022-03-30 16:53:56\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "781f86be-c3be-47e7-9bef-70b8675a55c3"
                    },
                    "protocol": {
                      "type": "string",
                      "example": "COM-2022035242"
                    },
                    "name": {
                      "type": "string",
                      "example": "Melhor Loja"
                    },
                    "email": {
                      "type": "string",
                      "example": "contato@melhorloja.me"
                    },
                    "website": {},
                    "picture": {},
                    "thumbnail": {},
                    "description": {
                      "type": "string",
                      "example": "Descrição da loja"
                    },
                    "company_name": {
                      "type": "string",
                      "example": "Nome da Loja"
                    },
                    "document": {
                      "type": "string",
                      "example": "89157108000104"
                    },
                    "state_register": {
                      "type": "string",
                      "example": "476210979481"
                    },
                    "created_at": {
                      "type": "string",
                      "example": "2022-03-30 16:53:56"
                    },
                    "updated_at": {
                      "type": "string",
                      "example": "2022-03-30 16:53:56"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "404",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"message\": \"No query results for model [App\\Company].\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "No query results for model [App\Company]."
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

--------------------------------

### Listar informações de aplicativo (JSON)

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-de-aplicativo

Retorna as configurações cadastradas pelo usuário no aplicativo. Inclui detalhes como transportadoras, taxas, dimensões e outras configurações de envio. É necessário incluir os cabeçalhos 'Accept', 'Authorization' e 'User-Agent'.

```json
{
  "settings": {
    "weight": 0.x,
    "collect": true,
    "receipt": false,
    "own_hand": true,
    "services": [
      1,
      2,
      3,
      4,
      17
    ],
    "addresses": [],
    "dimensions": {
      "width": x,
      "height": x,
      "length": x
    },
    "jadlog_agency": 9xx,
    "insurance_value": "all",
    "jadlog_agencies": null,
    "delivery_time_extra": 1x,
    "shipment_modify_type": "add-fixed",
    "shipment_modify_value": "10.00",
    "state_register_default": "1xxxxxxxxxxx",
    "insurance_value_default": "9.xx",
    "company_document_default": "1xxxxxxxxxxxxx"
  }
}
```

--------------------------------

### Listar informações de aplicativo

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-de-aplicativo

Recupere as configurações do seu aplicativo, como transportadoras, taxas e dimensões.

```APIDOC
## GET /api/v2/me/shipment/app-settings

### Description
Esta rota retorna as configurações cadastradas pelo usuário no seu aplicativo. Dentre as informações retornadas estão configurações como transportadoras, taxas, dimensões, entre outras.

### Method
GET

### Endpoint
/api/v2/me/shipment/app-settings

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obritatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

### Response
#### Success Response (200)
- **settings** (object) - Contém as configurações do aplicativo.
  - **weight** (number)
  - **collect** (boolean)
  - **receipt** (boolean)
  - **own_hand** (boolean)
  - **services** (array of numbers)
  - **addresses** (array)
  - **dimensions** (object)
    - **width** (number)
    - **height** (number)
    - **length** (number)
  - **jadlog_agency** (number)
  - **insurance_value** (string)
  - **jadlog_agencies** (null)
  - **delivery_time_extra** (number)
  - **shipment_modify_type** (string)
  - **shipment_modify_value** (string)
  - **state_register_default** (string)
  - **insurance_value_default** (string)
  - **company_document_default** (string)

#### Response Example (200)
```json
{
  "settings": {
    "weight": 0.x,
    "collect": true,
    "receipt": false,
    "own_hand": true,
    "services": [
      1,
      2,
      3,
      4,
      17
    ],
    "addresses": [],
    "dimensions": {
      "width": x,
      "height": x,
      "length": x
    },
    "jadlog_agency": 9xx,
    "insurance_value": "all",
    "jadlog_agencies": null,
    "delivery_time_extra": 1x,
    "shipment_modify_type": "add-fixed",
    "shipment_modify_value": "10.00",
    "state_register_default": "1xxxxxxxxxxx",
    "insurance_value_default": "9.xx",
    "company_document_default": "1xxxxxxxxxxxxx"
  }
}
```

#### Error Response (404)
- **error** (boolean) - Indica se ocorreu um erro.
- **message** (string) - Mensagem de erro.

#### Response Example (404)
```json
{
  "error": true,
  "message": "Não há configurações salvas"
}
```
```

--------------------------------

### Exemplo de Requisição JSON para Cotação por Produto

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

Utilize este formato para enviar informações unitárias de produtos para cotação de frete. Certifique-se de que as dimensões estejam em cm, peso em kg e o valor segurado em BRL com duas casas decimais.

```json
{
    "from": {
        "postal_code": "96020360"
    },
    "to": {
        "postal_code": "01018020"
    },
    "products": [
        {
            "id": "Produto A",
            "width": 11, //cm
            "height": 17, //cm
            "length": 11, //cm
            "weight": 1, //kg
            "insurance_value": 10.1, //BRL
            "quantity": 1 //unidade de produto
        },
        {
            "id": "Produto B",
            "width": 10,
            "height": 10,
            "length": 12,
            "weight": 0.2,
            "insurance_value": 10.1,
            "quantity": 5
        }
    ],
    "options": {
        "receipt": false,
        "own_hand": false
    },
    "services": "1,2,18"
  }
```

--------------------------------

### Exemplo de URL de Autorização Sandbox Simplificada

Source: https://docs.melhorenvio.com.br/discuss/675c1f63c0286a00743be1c9

Uma versão simplificada da URL de autorização para o ambiente de sandbox, focando em um escopo menor. Substitua 'x' pelos seus valores.

```URL
https://sandbox.melhorenvio.com.br/oauth/authorize?client_id=x&redirect_uri=x&response_type=code&scope=cart-read
```

--------------------------------

### Exemplo de URL de Autorização com Parâmetros

Source: https://docs.melhorenvio.com.br/discuss/675c1f63c0286a00743be1c9

Modelo genérico para a URL de autorização, onde {{url}}, {{client_id}}, e {{callback}} devem ser substituídos pelos seus dados específicos do ambiente (sandbox ou produção).

```URL
{{url}}/oauth/authorize?client_id={{client_id}}&redirect_uri={{callback}}&response_type=code&scope=cart-read cart-write companies-read companies-write coupons-read coupons-write notifications-read orders-read products-read products-write purchases-read shipping-calculate shipping-cancel shipping-checkout shipping-companies shipping-generate shipping-preview shipping-print shipping-share shipping-tracking ecommerce-shipping transactions-read users-read users-write
```

--------------------------------

### Pré-visualização de Etiquetas

Source: https://docs.melhorenvio.com.br/reference/pre-visualizacao-de-etiquetas

Este endpoint permite pré-visualizar etiquetas de envio. É necessário ter comprado as etiquetas previamente. O rastreio e a autorização de postagem não estarão disponíveis neste momento.

```APIDOC
## POST /api/v2/me/shipment/preview

### Description
Permite pré-visualizar etiquetas de envio antes de gerá-las.

### Method
POST

### Endpoint
/api/v2/me/shipment/preview

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

#### Request Body
- **orders** (array) - Required - Lista de IDs das etiquetas a serem pré-visualizadas.
  - items: (string)

### Request Example
```json
{
  "orders": [
    "{{id}}"
  ]
}
```

### Response
#### Success Response (200)
- **url** (string) - URL para pré-visualização da etiqueta.

#### Response Example
```json
{
  "url": "https://sandbox.melhorenvio.com.br/pre-impressao/Xvi2N2ImijM6"
}
```

#### Error Response (404)
- **error** (string) - Mensagem de erro.

#### Response Example
```json
{
    "error": "Não é possível imprimir etiquetas com o pagamento ainda não processado. Favor aguarde."
}
```
```

--------------------------------

### Exemplo de Requisição OpenAPI para Pré-visualização de Etiquetas

Source: https://docs.melhorenvio.com.br/reference/pre-visualizacao-de-etiquetas

Este é um exemplo de como a definição OpenAPI descreve a requisição POST para pré-visualizar etiquetas. Ele especifica os cabeçalhos necessários e o formato do corpo da requisição, que inclui um array de IDs de pedidos.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/shipment/preview": {
      "post": {
        "summary": "Pré-visualização de etiquetas",
        "description": "Etiquetas",
        "operationId": "pre-visualizacao-de-etiquetas",
        "parameters": [
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Content-Type",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "orders"
                ],
                "properties": {
                  "orders": {
                    "type": "array",
                    "description": "Pedidos",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              },
              "examples": {
                "Pré visualização de etiquetas": {
                  "value": {
                    "orders": [
                      "{{id}}"
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"url\": \"https://sandbox.melhorenvio.com.br/pre-impressao/Xvi2N2ImijM6\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "url": {
                      "type": "string",
                      "example": "https://sandbox.melhorenvio.com.br/pre-impressao/Xvi2N2ImijM6"
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "404",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n    \"error\": \"Não é possível imprimir etiquetas com o pagamento ainda não processado. Favor aguarde.\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "error": {
                      "type": "string",
                      "example": "Não é possível imprimir etiquetas com o pagamento ainda não processado. Favor aguarde."
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

--------------------------------

### Exemplo de URL de Autorização Sandbox

Source: https://docs.melhorenvio.com.br/discuss/675c1f63c0286a00743be1c9

Utilize este formato para solicitar autorização no ambiente de sandbox. Certifique-se de substituir 'X' pelos seus valores de client_id e redirect_uri.

```URL
https://sandbox.melhorenvio.com.br/oauth/authorize?client_id=X&redirect_uri=X&response_type=code&scope=cart-read%20cart-write%20companies-read%20companies-write%20coupons-read%20coupons-write%20notifications-read%20orders-read%20products-read%20products-write%20purchases-read%20shipping-calculate%20shipping-cancel%20shipping-checkout%20shipping-companies%20shipping-generate%20shipping-preview%20shipping-print%20shipping-share%20shipping-tracking%20ecommerce-shipping%20transactions-read%20users-read%20users-write
```

--------------------------------

### Configuração do WebClient para API Melhor Envio

Source: https://docs.melhorenvio.com.br/discuss/651083c34fd729000d9ff4ba

Configura um WebClient para interagir com a API do Melhor Envio, definindo a URL base, headers de conteúdo, aceitação e User-Agent. Use este serviço para fazer chamadas à API.

```java
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class MelhorEnvioService {
    private final WebClient webClient;

    public MelhorEnvioService() {
        this.webClient = WebClient.builder()
                .baseUrl(ApiTokenIntegracao.URL_MELHOR_ENVIO_SAND_BOX + "api/v2/me/shipment")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.USER_AGENT, "jfernandine@gmail.com")
                .build();
    }

    public Mono<MelhorEnvioResponse> calculateShipping() {
        MelhorEnvioRequest request = new MelhorEnvioRequest();

        try {
            return webClient.post()
                    .uri("/calculate")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + ApiTokenIntegracao.TOKEN_MELHOR_ENVIO)
                    .body(BodyInserters.fromValue(request))
                    .exchange()
                    .flatMap(response -> response.bodyToMono(MelhorEnvioResponse.class))
                    .doOnSuccess(response -> System.out.println(response.toString()));

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
```

--------------------------------

### OpenAPI Definition

Source: https://docs.melhorenvio.com.br/reference/verificar-se-etiqueta-pode-ser-cancelada

This is a sample OpenAPI definition.

```json
{
  "x-readme-fauxas": true
}
```

--------------------------------

### Exemplo de Requisição JSON para Cotação por Pacotes

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

Envie os dados de pacotes individuais para cotação de frete. As dimensões devem estar em cm, peso em kg e o valor segurado em BRL com duas casas decimais. O valor segurado total é calculado pela API.

```json
{
    "from": {
        "postal_code": "96020360"
    },
    "to": {
        "postal_code": "01018020"
    },
    "volumes": [
        {
            "width": 11,
            "height": 17,
            "length": 11,
            "weight": 0.3,
            "insurance": 10.1
        },
        {
            "width": 20,
            "height": 25,
            "length": 25,
            "weight": 1.5,
            "insurance": 1000
        }
    ],
    "options": {
        "receipt": false,
        "own_hand": false
    },
    "services": "1,2,18"
  }
```

--------------------------------

### Exemplo de Resposta de Sucesso (200 OK)

Source: https://docs.melhorenvio.com.br/reference/impressao-de-etiquetas

Esta é a resposta esperada quando a impressão de etiquetas é bem-sucedida. Contém a URL para acessar as etiquetas impressas.

```json
{
  "url": "https://sandbox.melhorenvio.com.br/imprimir/ixQLaqqjmb2E"
}
```

--------------------------------

### Exemplo de Logística Reversa para Envio Original (ME)

Source: https://docs.melhorenvio.com.br/reference/inserir-logistica-reversa-no-carrinho

Este exemplo demonstra a estrutura de dados necessária para configurar uma solicitação de logística reversa para um envio original, utilizando o serviço 'ME'.

```json
{
  "service": 1,
  "new_sender_mail": "remetente@melhorenvio.com",
  "new_sender_phone": "99 99999-9999",
  "insurance_value": 2.9,
  "order_id": "9c79c7bb-e365-4d92-8553-255d60bc28d0",
  "package": {
    "weight": 1.2,
    "height": 2,
    "width": 5,
    "length": 12
  },
  "options": {
    "own_hand": false,
    "receipt": false
  }
}
```

--------------------------------

### Exemplo de Resposta de Sucesso (200)

Source: https://docs.melhorenvio.com.br/reference/geracao-de-etiquetas

Este exemplo demonstra a estrutura de uma resposta bem-sucedida ao gerar uma etiqueta de envio. O ID do envio é retornado como chave, com o status e uma mensagem de sucesso.

```json
{
  "b1ad6622-50b0-4e96-b395-730544e60085": {
    "status": true,
    "message": "Envio gerado com sucesso"
  }
}
```

--------------------------------

### Exemplo de Requisição para Impressão de Etiquetas

Source: https://docs.melhorenvio.com.br/reference/impressao-de-etiquetas

Este exemplo demonstra como formatar a requisição para imprimir etiquetas. É necessário incluir o modo e uma lista de IDs de pedidos.

```json
{
  "mode": "",
  "orders": [
    "{{id}}"
  ]
}
```

--------------------------------

### Pesquisar Etiqueta com Parâmetros

Source: https://docs.melhorenvio.com.br/reference/pesquisar-etiqueta

Utilize este endpoint para pesquisar etiquetas de envio. É obrigatório incluir o cabeçalho User-Agent com o nome da sua aplicação e um email de contato. O parâmetro 'q' pode ser o código de autorização, protocolo, código de rastreio, ID do envio ou documento.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/orders/search": {
      "get": {
        "summary": "Pesquisar etiqueta",
        "description": "",
        "operationId": "pesquisar-etiqueta",
        "parameters": [
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Content-type",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          },
          {
            "name": "q",
            "in": "query",
            "description": "Informar o código de autorização, protocolo, código de rastreio, ID do envio ou documento.",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "[
  {
    "id": "04c13ada-68e6-41df-a2c6-ff5f3e7560f8",
    "protocol": "ORD-20220395512",
    "service_id": 3,
    "contract": null,
    "service_code": null,
    "quote": 25.35,
    "price": 25.35,
    "coupon": null,
    "discount": 5.71,
    "delivery_min": 5,
    "delivery_max": 6,
    "status": "released",
    "reminder": null,
    "insurance_value": 50,
    "weight": null,
    "width": null,
    "height": null,
    "length": null,
    "diameter": null,
    "format": "box",
    "billed_weight": 3.5,
    "receipt": false,
    "own_hand": false,
    "collect": false,
    "collect_scheduled_at": null,
    "reverse": false,
    "non_commercial": false,
    "authorization_code": "2022032921",
    "tracking": "ME220021P41BR",
    "self_tracking": "ME220021P41BR",
    "delivery_receipt": null,
    "additional_info": null,
    "cte_key": null,
    "paid_at": "2022-03-29 21:17:26",
    "generated_at": "2022-03-29 21:38:30",
    "posted_at": null,
    "delivered_at": null,
    "canceled_at": null,
    "suspended_at": null,
    "expired_at": null,
    "created_at": "2022-03-29 20:24:17",
    "updated_at": "2022-03-29 21:38:30",
    "details": {
      "balance": 0,
      "gateway": "25.35",
      "discount": "0.00",
      "subtotal": "25.35",
      "total": "25.35"
    },
    "receipt_code": null,
    "from": {
      "name": "Teste ME",
      "phone": "5598105050",
      "email": "melhorenvio@teste.com",
      "document": "16571478358",
      "company_document": "04517623000197",
      "state_register": "563025255115",
      "postal_code": "7110000",
      "address": "Rua Teste",
      "location_number": "100",
      "complement": "CASA",
      "district": "Bairro Teste",
      "city": "Guarulhos",
      "state_abbr": "SP",
      "country_id": "BR",
      "latitude": null,
      "longitude": null,
      "note": "observação"
    },
    "to": {
      "name": "Melhor Envio Teste",
      "phone": "1999999999",
      "email": "melhorenvio@teste.com",
      "document": "73646548010",
      "company_document": "89794131000100",
      "state_register": "123456",
      "postal_code": "26210000",
      "address": "Avenida Marechal Floriano Peixoto",
      "location_number": "123",
      "complement": "Ap 2",
      "district": "Centro",
      "city": "Nova Iguacu",
      "state_abbr": "RJ",
      "country_id": "BR",
      "latitude": null,
      "longitude": null,
      "note": "observação"
    },
    "service": {
      "id": 3,
      "name": ".Package",
      "type": "normal",
      "range": "interstate",
      "company": "melhorenvio"
    }
  }
]"
```

--------------------------------

### Consultar saldo do usuário

Source: https://docs.melhorenvio.com.br/reference/saldo-do-usuario

Use este endpoint para consultar o saldo atual na carteira do usuário. É obrigatório incluir os cabeçalhos Authorization e User-Agent.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/balance": {
      "get": {
        "summary": "Saldo do usuário",
        "description": "Informações do usuário",
        "operationId": "saldo-do-usuario",
        "parameters": [
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"balance\": 1624.9,\n  \"reserved\": 0,\n  \"debts\": 87\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "balance": {
                      "type": "number",
                      "example": 1624.9,
                      "default": 0
                    },
                    "reserved": {
                      "type": "integer",
                      "example": 0,
                      "default": 0
                    },
                    "debts": {
                      "type": "integer",
                      "example": 87,
                      "default": 0
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "401",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"message\": \"Unauthenticated.\"\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Unauthenticated."
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

--------------------------------

### Listar Informações de uma Etiqueta por ID

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-de-uma-etiqueta

Recupera informações detalhadas de uma etiqueta de envio existente usando seu ID. Inclui dados como status, detalhes de serviço, e informações de remetente/destinatário.

```APIDOC
## GET /api/v2/me/orders/{id}

### Description
Recupera informações detalhadas de uma etiqueta de envio específica usando seu ID.

### Method
GET

### Endpoint
/api/v2/me/orders/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - Id da order correspondente à etiqueta de envio

#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

### Response
#### Success Response (200)
- **id** (string) - ID da etiqueta.
- **protocol** (string) - Protocolo da ordem.
- **service_id** (integer) - ID do serviço de envio.
- **agency_id** (any) - ID da agência (pode ser nulo).
- **contract** (string) - Número do contrato.
- **service_code** (any) - Código do serviço (pode ser nulo).
- **quote** (number) - Valor orçado do frete.
- **price** (number) - Preço final do frete.
- **coupon** (any) - Cupom de desconto aplicado (pode ser nulo).
- **discount** (number) - Valor do desconto.
- **delivery_min** (integer) - Prazo mínimo de entrega em dias úteis.
- **delivery_max** (integer) - Prazo máximo de entrega em dias úteis.
- **status** (string) - Status atual da etiqueta (ex: "posted", "delivered").
- **reminder** (any) - Lembrete (pode ser nulo).
- **insurance_value** (number) - Valor do seguro.
- **weight** (any) - Peso da encomenda (pode ser nulo).
- **width** (any) - Largura da embalagem (pode ser nulo).
- **height** (any) - Altura da embalagem (pode ser nulo).
- **length** (any) - Comprimento da embalagem (pode ser nulo).
- **diameter** (any) - Diâmetro da embalagem (para rolos, pode ser nulo).
- **format** (string) - Formato da embalagem (ex: "box", "roll", "letter").
- **billed_weight** (number) - Peso faturado.
- **receipt** (boolean) - Indica se o comprovante foi recebido.
- **own_hand** (boolean) - Indica se a coleta é feita na mão.
- **collect** (boolean) - Indica se a coleta está agendada.
- **collect_scheduled_at** (any) - Data e hora agendada para coleta (pode ser nulo).
- **reverse** (boolean) - Indica se é uma etiqueta de devolução.
- **non_commercial** (boolean) - Indica se o envio é não comercial.
- **authorization_code** (string) - Código de autorização.
- **tracking** (string) - Código de rastreamento.
- **self_tracking** (string) - Código de rastreamento interno.
- **delivery_receipt** (any) - Comprovante de entrega (pode ser nulo).
- **additional_info** (any) - Informações adicionais (pode ser nulo).
- **cte_key** (any) - Chave de acesso do CT-e (pode ser nulo).
- **paid_at** (string) - Data e hora do pagamento.
- **generated_at** (string) - Data e hora de geração da etiqueta.
- **posted_at** (string) - Data e hora de postagem.
- **delivered_at** (any) - Data e hora de entrega (pode ser nulo).
- **canceled_at** (any) - Data e hora de cancelamento (pode ser nulo).
- **suspended_at** (any) - Data e hora de suspensão (pode ser nulo).
- **expired_at** (any) - Data e hora de expiração (pode ser nulo).
- **created_at** (string) - Data e hora de criação do registro.
- **updated_at** (string) - Data e hora da última atualização do registro.
- **parse_pi_at** (any) - Data e hora de processamento da PI (pode ser nulo).
- **from** (object) - Objeto com informações do remetente.
  - **name** (string)
  - **phone** (string)
  - **email** (string)
  - **document** (string)
  - **company_document** (string)
  - **state_register** (string)
  - **postal_code** (string)
  - **address** (string)
  - **location_number** (string)
  - **complement** (string)
  - **district** (string)
  - **city** (string)
  - **state_abbr** (string)
  - **country_id** (string)
  - **latitude** (any)
  - **longitude** (any)
  - **note** (string)
- **to** (object) - Objeto com informações do destinatário.
  - **name** (string)
  - **phone** (string)
  - **email** (string)
  - **document** (string)
  - **company_document** (string)
  - **state_register** (string)
  - **postal_code** (string)
  - **address** (string)
  - **location_number** (string)
  - **complement** (string)
  - **district** (string)
  - **city** (string)
  - **state_abbr** (string)
  - **country_id** (string)
  - **latitude** (any)
  - **longitude** (any)
  - **note** (string)
- **service** (object) - Objeto com informações do serviço de envio.
  - **id** (integer)
  - **name** (string)
  - **status** (string)
  - **type** (string)
  - **range** (string)
  - **restrictions** (string)

#### Response Example
{
  "id": "34105e98-bb32-4e85-8b0f-8bd2c888eb31",
  "protocol": "ORD-20220395517",
  "service_id": 1,
  "agency_id": null,
  "contract": "9912415671",
  "service_code": null,
  "quote": 31.13,
  "price": 31.13,
  "coupon": null,
  "discount": 4.15,
  "delivery_min": 8,
  "delivery_max": 9,
  "status": "posted",
  "reminder": null,
  "insurance_value": 50,
  "weight": null,
  "width": null,
  "height": null,
  "length": null,
  "diameter": null,
  "format": "box",
  "billed_weight": 3.5,
  "receipt": false,
  "own_hand": false,
  "collect": false,
  "collect_scheduled_at": null,
  "reverse": false,
  "non_commercial": false,
  "authorization_code": "2022032920",
  "tracking": "ME220021P96BR",
  "self_tracking": "ME220021P96BR",
  "delivery_receipt": null,
  "additional_info": null,
  "cte_key": null,
  "paid_at": "2022-03-29 20:43:37",
  "generated_at": "2022-03-29 20:43:50",
  "posted_at": "2022-03-29 21:00:06",
  "delivered_at": null,
  "canceled_at": null,
  "suspended_at": null,
  "expired_at": null,
  "created_at": "2022-03-29 20:24:51",
  "updated_at": "2022-03-29 21:00:06",
  "parse_pi_at": null,
  "from": {
    "name": "Teste ME",
    "phone": "5598105050",
    "email": "melhorenvio@teste.com",
    "document": "16571478358",
    "company_document": "04517623000197",
    "state_register": "563025255115",
    "postal_code": "7110000",
    "address": "Rua Teste",
    "location_number": "100",
    "complement": "CASA",
    "district": "Bairro Teste",
    "city": "Guarulhos",
    "state_abbr": "SP",
    "country_id": "BR",
    "latitude": null,
    "longitude": null,
    "note": "observação"
  },
  "to": {
    "name": "Melhor Envio Teste",
    "phone": "1999999999",
    "email": "melhorenvio@teste.com",
    "document": "73646548010",
    "company_document": "89794131000100",
    "state_register": "123456",
    "postal_code": "26210000",
    "address": "Avenida Marechal Floriano Peixoto",
    "location_number": "123",
    "complement": "Ap 2",
    "district": "Centro",
    "city": "Nova Iguacu",
    "state_abbr": "RJ",
    "country_id": "BR",
    "latitude": null,
    "longitude": null,
    "note": "observação"
  },
  "service": {
    "id": 1,
    "name": "PAC",
    "status": "available",
    "type": "normal",
    "range": "interstate",
    "restrictions": "{\"insurance_value\":{\"min\":0,\"max\":3000},\"formats\":{\"box\":{\"weight\":{\"min\":0.001,\"max\":30},\"width\":{\"min\":11,\"max\":105},\"height\":{\"min\":2,\"max\":105},\"length\":{\"min\":16,\"max\":105},\"sum\":200},\"roll\":{\"weight\":{\"min\":0.001,\"max\":30},\"diameter\":{\"min\":5,\"max\":91},\"length\":{\"min\":18,\"max\":105},\"sum\":200},\"letter\":{\"weight\":{\"min
```

--------------------------------

### Requisição cURL para Adicionar ao Carrinho

Source: https://docs.melhorenvio.com.br/discuss/69de49c479d5f77187d9a3bf

Exemplo de requisição cURL para adicionar um produto ao carrinho via API do Melhor Envio. Inclui headers de autenticação, conteúdo e corpo da requisição com detalhes do remetente, destinatário, produto e volumes.

```shell
curl -X POST 'https://sandbox.melhorenvio.com.br/api/v2/me/cart' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer aaaaaa' \
--header 'Content-Type: application/json' \
--header 'User-Agent: Real Deal (victor.robinson@al.infnet.edu.br)' \
--body '{  
"service": 4,  
"from": {  
"name": "Guilherme Duques",  
"phone": "21974735995",  
"email": "guiduques@gmail.com",  
"document": "86516229538",  
"address": "Rua bolivar",  
"complement": "1001",  
"number": "84",  
"district": "",  
"city": "Rio de Janeiro",  
"country_id": "BR",  
"postal_code": "22061020",  
"state_abbr": "RJ",  
"note": ""  
},  
"to": {  
"name": "Victor Manuel",  
"phone": "21993908281",  
"email": "victor.robinson@al.infnet.edu.br",  
"document": "19671758703",  
"address": "Rua Marquês de Olinda",  
"complement": "Bloco 1, 603",  
"number": "61",  
"district": "",  
"city": "Rio de Janeiro",  
"country_id": "BR",  
"postal_code": "22251040",  
"state_abbr": "RJ",  
"note": ""  
},  
"products": [  
{  
"name": "TESTE DUKES",  
"quantity": "1",  
"unitary_value": "1.00"  
}  
],  
"volumes": [  
{  
"height": 6,  
"width": 22,  
"length": 28,  
"weight": 0.4  
}  
],  
"options": {  
"insurance_value": 1,  
"receipt": false,  
"own_hand": false,  
"reverse": false,  
"non_commercial": true  
}  
}

```

--------------------------------

### Exemplo de Resposta de Sucesso (200 OK)

Source: https://docs.melhorenvio.com.br/reference/cadastrar-telefones-de-uma-loja

Esta é uma resposta de exemplo quando um telefone é cadastrado com sucesso. Ela inclui os detalhes do telefone registrado, como tipo, número, IDs e timestamps.

```json
{
  "type": "mobile",
  "phone": "5530203020",
  "country_id": "BR",
  "updated_at": "2022-03-30 20:28:52",
  "created_at": "2022-03-30 20:28:52",
  "id": 42303
}
```

--------------------------------

### Listar Itens do Carrinho - Exemplo de Resposta

Source: https://docs.melhorenvio.com.br/reference/listar-itens-do-carrinho

Exemplo de resposta JSON ao listar os itens do carrinho. Contém informações detalhadas sobre cada item, como ID, protocolo, serviço, preços, dimensões e dados de remetente e destinatário.

```json
{
  "current_page": 1,
  "data": [
    {
      "id": "4d9a896c-9057-490d-94ea-abb23565463c",
      "protocol": "ORD-20220397315",
      "service_id": 2,
      "agency_id": null,
      "contract": "9912415671",
      "service_code": null,
      "quote": 50.93,
      "price": 50.93,
      "coupon": null,
      "discount": 10.95,
      "delivery_min": 3,
      "delivery_max": 4,
      "status": "pending",
      "reminder": null,
      "insurance_value": 50,
      "weight": null,
      "width": null,
      "height": null,
      "length": null,
      "diameter": null,
      "format": "box",
      "billed_weight": 3.5,
      "receipt": false,
      "own_hand": false,
      "collect": false,
      "collect_scheduled_at": null,
      "reverse": false,
      "non_commercial": false,
      "authorization_code": null,
      "tracking": null,
      "self_tracking": null,
      "delivery_receipt": null,
      "additional_info": null,
      "cte_key": null,
      "paid_at": null,
      "generated_at": null,
      "posted_at": null,
      "delivered_at": null,
      "canceled_at": null,
      "suspended_at": null,
      "expired_at": null,
      "created_at": "2022-03-29 13:17:46",
      "updated_at": "2022-03-29 13:17:46",
      "parse_pi_at": null,
      "from": {
        "name": "Teste ME",
        "phone": "5598105050",
        "email": "melhorenvio@teste.com",
        "document": "16571478358",
        "company_document": "04517623000197",
        "state_register": "563025255115",
        "postal_code": "7110000",
        "address": "Rua Teste",
        "location_number": "100",
        "complement": "CASA",
        "district": "Bairro Teste",
        "city": "Guarulhos",
        "state_abbr": "SP",
        "country_id": "BR",
        "latitude": null,
        "longitude": null,
        "note": "Teste ME"
      },
      "to": {
        "name": "ME Teste",
        "phone": "1999999999",
        "email": "melhorenvio@teste.com",
        "document": "73646548010",
        "company_document": "89794131000100",
        "state_register": "123456",
        "postal_code": "26210000",
        "address": "Avenida Marechal Floriano Peixoto",
        "location_number": "123",
        "complement": "Ap 2",
        "district": "Centro",
        "city": "Nova Iguacu",
        "state_abbr": "RJ",
        "country_id": "BR",
        "latitude": null,
        "longitude": null,
        "note": "ME Teste"
      },
      "service": {
        "id": 2,
        "name": "SEDEX",
        "status": "available",
        "type": "express",
        "range": "interstate",
        "restrictions": "{\"insurance_value\":{\"min\":0,\"max\":10000},\"formats\":{\"box\":{\"weight\":{\"min\":0.001,\"max\":30},\"width\":{\"min\":11,\"max\":105},\"height\":{\"min\":2,\"max\":105},\"length\":{\"min\":16,\"max\":105},\"sum\":200},\"roll\":{\"weight\":{\"min\":0.001,\"max\":30},\"diameter\":{\"min\":5,\"max\":91},\"length\":{"
    }
  ]
}
```

--------------------------------

### Exibir informações de item do carrinho

Source: https://docs.melhorenvio.com.br/reference/exibir-informacoes-de-item-do-carrinho

Recupera informações detalhadas sobre um item específico no carrinho de compras, incluindo detalhes do serviço, remetente e destinatário.

```APIDOC
## GET /api/v2/me/cart/{id}

### Description
Recupera informações detalhadas sobre um item específico no carrinho de compras.

### Method
GET

### Endpoint
/api/v2/me/cart/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - ID do Pedido

#### Header Parameters
- **Accept** (string) - Required - application/json
- **Authorization** (string) - Required - Bearer token
- **User-Agent** (string) - Required - É obritatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

### Response
#### Success Response (200)
- **id** (string) - ID do item no carrinho.
- **protocol** (string) - Protocolo de rastreamento.
- **service_id** (integer) - ID do serviço de envio.
- **agency_id** (integer) - ID da agência.
- **contract** (string) - Contrato.
- **service_code** (string) - Código do serviço.
- **quote** (number) - Valor cotado do frete.
- **price** (number) - Preço final do frete.
- **coupon** (string) - Cupom de desconto aplicado.
- **discount** (number) - Valor do desconto.
- **delivery_min** (integer) - Prazo mínimo de entrega.
- **delivery_max** (integer) - Prazo máximo de entrega.
- **status** (string) - Status do pedido (ex: pending, dispatched, delivered).
- **reminder** (string) - Lembrete.
- **insurance_value** (number) - Valor do seguro.
- **weight** (number) - Peso do pacote.
- **width** (number) - Largura do pacote.
- **height** (number) - Altura do pacote.
- **length** (number) - Comprimento do pacote.
- **diameter** (number) - Diâmetro do pacote.
- **format** (string) - Formato do pacote (ex: box, envelope).
- **billed_weight** (number) - Peso faturado.
- **receipt** (boolean) - Se o recibo foi emitido.
- **own_hand** (boolean) - Se a coleta é própria.
- **collect** (boolean) - Se o item foi coletado.
- **collect_scheduled_at** (string) - Data e hora agendada para coleta.
- **reverse** (boolean) - Se é um envio reverso.
- **non_commercial** (boolean) - Se é uma remessa não comercial.
- **authorization_code** (string) - Código de autorização.
- **tracking** (string) - Código de rastreamento.
- **self_tracking** (string) - Código de rastreamento próprio.
- **delivery_receipt** (string) - Recibo de entrega.
- **additional_info** (string) - Informações adicionais.
- **cte_key** (string) - Chave do CTE.
- **paid_at** (string) - Data e hora do pagamento.
- **generated_at** (string) - Data e hora de geração.
- **posted_at** (string) - Data e hora de postagem.
- **delivered_at** (string) - Data e hora da entrega.
- **canceled_at** (string) - Data e hora do cancelamento.
- **suspended_at** (string) - Data e hora da suspensão.
- **expired_at** (string) - Data e hora de expiração.
- **created_at** (string) - Data e hora de criação.
- **updated_at** (string) - Data e hora de atualização.
- **parse_pi_at** (string) - Data e hora de parse de PI.
- **from** (object) - Informações do remetente.
  - **name** (string) - Nome do remetente.
  - **phone** (string) - Telefone do remetente.
  - **email** (string) - Email do remetente.
  - **document** (string) - CPF/CNPJ do remetente.
  - **company_document** (string) - CNPJ da empresa remetente.
  - **state_register** (string) - Inscrição estadual do remetente.
  - **postal_code** (string) - CEP do remetente.
  - **address** (string) - Endereço do remetente.
  - **location_number** (string) - Número do local do remetente.
  - **complement** (string) - Complemento do endereço do remetente.
  - **district** (string) - Bairro do remetente.
  - **city** (string) - Cidade do remetente.
  - **state_abbr** (string) - Sigla do estado do remetente.
  - **country_id** (string) - ID do país do remetente.
  - **latitude** (string) - Latitude do remetente.
  - **longitude** (string) - Longitude do remetente.
  - **note** (string) - Observações do remetente.
- **to** (object) - Informações do destinatário.
  - **name** (string) - Nome do destinatário.
  - **phone** (string) - Telefone do destinatário.
  - **email** (string) - Email do destinatário.
  - **document** (string) - CPF/CNPJ do destinatário.
  - **company_document** (string) - CNPJ da empresa destinatária.
  - **state_register** (string) - Inscrição estadual do destinatário.
  - **postal_code** (string) - CEP do destinatário.
  - **address** (string) - Endereço do destinatário.
  - **location_number** (string) - Número do local do destinatário.
  - **complement** (string) - Complemento do endereço do destinatário.
  - **district** (string) - Bairro do destinatário.
  - **city** (string) - Cidade do destinatário.
  - **state_abbr** (string) - Sigla do estado do destinatário.
  - **country_id** (string) - ID do país do destinatário.
  - **latitude** (string) - Latitude do destinatário.
  - **longitude** (string) - Longitude do destinatário.
  - **note** (string) - Observações do destinatário.
- **service** (object) - Informações do serviço de envio.
  - **id** (integer) - ID do serviço.
  - **name** (string) - Nome do serviço.
  - **status** (string) - Status do serviço.
  - **type** (string) - Tipo do serviço.
  - **range** (string) - Alcance do serviço.
  - **restrictions** (string) - Restrições do serviço.
  - **requirements** (string) - Requisitos do serviço.
  - **optionals** (string) - Opcionais do serviço.
  - **company** (object) - Informações da transportadora.
    - **id** (integer) - ID da transportadora.
    - **name** (string) - Nome da transportadora.
    - **status** (string) - Status da transportadora.

### Request Example
```json
{
  "example": "request body"
}
```

### Response Example
```json
{
  "example": "{\n  \"id\": \"c7e6f6a1-88a2-4b76-95e1-eb9f344f2885\",\n  \"protocol\": \"ORD-20220397320\",\n  \"service_id\": 3,\n  \"agency_id\": 49,\n  \"contract\": null,\n  \"service_code\": null,\n  \"quote\": 25.35,\n  \"price\": 25.35,\n  \"coupon\": null,\n  \"discount\": 5.71,\n  \"delivery_min\": 5,\n  \"delivery_max\": 6,\n  \"status\": \"pending\",\n  \"reminder\": null,\n  \"insurance_value\": 50,\n  \"weight\": null,\n  \"width\": null,\n  \"height\": null,\n  \"length\": null,\n  \"diameter\": null,\n  \"format\": \"box\",\n  \"billed_weight\": 3.5,\n  \"receipt\": false,\n  \"own_hand\": false,\n  \"collect\": false,\n  \"collect_scheduled_at\": null,\n  \"reverse\": false,\n  \"non_commercial\": false,\n  \"authorization_code\": null,\n  \"tracking\": null,\n  \"self_tracking\": null,\n  \"delivery_receipt\": null,\n  \"additional_info\": null,\n  \"cte_key\": null,\n  \"paid_at\": null,\n  \"generated_at\": null,\n  \"posted_at\": null,\n  \"delivered_at\": null,\n  \"canceled_at\": null,\n  \"suspended_at\": null,\n  \"expired_at\": null,\n  \"created_at\": \"2022-03-29 14:17:08\",\n  \"updated_at\": \"2022-03-29 14:17:08\",\n  \"parse_pi_at\": null,\n  \"from\": {\n    \"name\": \"Teste Magento\",\n    \"phone\": \"5598105050\",\n    \"email\": \"melhorenvio@teste.com\",\n    \"document\": \"16571478358\",\n    \"company_document\": \"04517623000197\",\n    \"state_register\": \"563025255115\",\n    \"postal_code\": \"7110000\",\n    \"address\": \"Rua Teste\",\n    \"location_number\": \"100\",\n    \"complement\": \"CASA\",\n    \"district\": \"Bairro teste\",\n    \"city\": \"Guarulhos\",\n    \"state_abbr\": \"SP\",\n    \"country_id\": \"BR\",\n    \"latitude\": null,\n    \"longitude\": null,\n    \"note\": \"observação\"\n  },\n  \"to\": {\n    \"name\": \"Melhor Envio\",\n    \"phone\": \"1999999999\",\n    \"email\": \"melhorenvio@teste.com\",\n    \"document\": \"73646548010\",\n    \"company_document\": \"89794131000100\",\n    \"state_register\": \"123456\",\n    \"postal_code\": \"26210000\",\n    \"address\": \"Avenida Marechal Floriano Peixoto\",\n    \"location_number\": \"123\",\n    \"complement\": \"ap 2\",\n    \"district\": \"Centro\",\n    \"city\": \"Nova Iguacu\",\n    \"state_abbr\": \"RJ\",\n    \"country_id\": \"BR\",\n    \"latitude\": null,\n    \"longitude\": null,\n    \"note\": \"Observação\"\n  },\n  \"service\": {\n    \"id\": 3,\n    \"name\": ".Package",\n    \"status\": \"available\",\n    \"type\": \"normal\",\n    \"range\": \"interstate\",\n    \"restrictions\": \"{\\\"insurance_value\\\":{\\\"min\\\":0,\\\"max\\\":29900},\\\"formats\\\":{\\\"box\\\":{\\\"weight\\\":{\\\"min\\\":0.001,\\\"max\\\":120},\\\"width\\\":{\\\"min\\\":1,\\\"max\\\":105},\\\"height\\\":{\\\"min\\\":1,\\\"max\\\":100},\\\"length\\\":{\\\"min\\\":1,\\\"max\\\":181},\\\"sum\\\":386}}}\",\n    \"requirements\": \"[\\\"names\\\",\\\"phones\\\",\\\"addresses\\\",\\\"documents\\\",\\\"invoice\\\"]\",\n    \"optionals\": \"[\\\"AR\\\",\\\"VD\\\"]\",\n    \"company\": {\n      \"id\": 2,\n      \"name\": \"Jadlog\",\n      \"status\": \"active\"\n    }\n  }\n}" 
}
```
```

--------------------------------

### Listar informações do usuário

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-do-usuario

Recupera os dados de cadastro do usuário logado.

```APIDOC
## GET /api/v2/me

### Description
Recupera as informações de cadastro do usuário.

### Method
GET

### Endpoint
/api/v2/me

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

### Response
#### Success Response (200)
- **id** (string) - ID do usuário.
- **protocol** (integer) - Protocolo do usuário.
- **firstname** (string) - Primeiro nome do usuário.
- **lastname** (string) - Sobrenome do usuário.
- **email** (string) - Email principal do usuário.
- **picture** (string) - URL da foto do perfil do usuário.
- **thumbnail** (string) - URL da miniatura da foto do perfil do usuário.
- **document** (string) - Documento (CPF/CNPJ) do usuário.
- **birthdate** (string) - Data de nascimento do usuário.
- **email_confirmed_at** (string) - Data e hora de confirmação do email.
- **email_alternative** (string) - Email alternativo do usuário.
- **access_at** (string) - Data e hora do último acesso.
- **created_at** (string) - Data e hora de criação do cadastro.
- **updated_at** (string) - Data e hora da última atualização do cadastro.
- **limit_action** (integer) - Limite de ações do usuário.
- **roles** (array) - Lista de roles associadas ao usuário.
- **status** (object) - Status do usuário.
- **phone** (object) - Informações de contato telefônico do usuário.
- **address** (object) - Endereço principal do usuário.
- **limits** (object) - Limites de uso da plataforma.

#### Response Example
```json
{
  "id": "779f4d62-c5b4-41e3-b0b0-ae2eb1509825",
  "protocol": 3477,
  "firstname": "Magno",
  "lastname": "xxxxxxxxxxxxxxxxxx",
  "email": "x@melhorenvio.com",
  "picture": null,
  "thumbnail": null,
  "document": "xxxxxxxxxxxx",
  "birthdate": "xxxx-xx-xx 00:00:00",
  "email_confirmed_at": "2021-06-22 12:17:00",
  "email_alternative": null,
  "access_at": "2021-09-01 12:31:29",
  "created_at": "2021-06-22 12:17:00",
  "updated_at": "2021-06-22 12:17:38",
  "limit_action": 1,
  "roles": [
    {
      "id": 2,
      "role": "ADMIN",
      "name": "Administrador"
    },
    {
      "id": 3,
      "role": "PHONE",
      "name": "Telefone confirmado"
    },
    {
      "id": 4,
      "role": "IDENTITY",
      "name": "Identidade confirmada (CPF)"
    },
    {
      "id": 9,
      "role": "QUIZ",
      "name": "Quiz aprovado (BigCorp)"
    }
  ],
  "status": {
    "id": 4,
    "status": "Allowed"
  },
  "phone": {
    "id": 39628,
    "label": null,
    "phone": "xxxxxxxxxxxxxxx",
    "type": "mobile",
    "country_id": "BR",
    "confirmed_at": "2021-06-22 12:17:00",
    "created_at": "2021-06-22 12:17:00",
    "updated_at": "2021-06-22 12:17:00"
  },
  "address": {
    "id": 28303,
    "label": "Minha Loja teste",
    "postal_code": "xxxxxxxx",
    "address": "Rua xxxxxxxxxx",
    "number": "100",
    "complement": null,
    "district": "Teste",
    "latitude": null,
    "longitude": null,
    "confirmed_at": null,
    "created_at": "2021-06-22 12:17:38",
    "updated_at": "2021-06-22 12:17:38",
    "city": {
      "id": 4xxx,
      "city": "Pelotas",
      "state": {
        "id": 21,
        "state": "Rio Grande do Sul",
        "state_abbr": "RS",
        "country": {
          "id": "BR",
          "country": "Brazil"
        }
      }
    }
  },
  "limits": {
    "shipments": 1000,
    "addresses": 10,
    "addresses_period": 30,
    "shipments_available": 1000
  }
}
```

#### Error Response (401)
- **message** (string) - Mensagem de erro indicando autenticação falha.

#### Response Example
```json
{
  "message": "Unauthenticated."
}
```
```

--------------------------------

### Exemplo de Resposta de Sucesso - Novo Token

Source: https://docs.melhorenvio.com.br/reference/solicitacao-do-token

Esta resposta JSON indica que um novo token de acesso foi gerado com sucesso. Inclui o tipo do token, o tempo de expiração em segundos, o token de acesso e o token de atualização.

```json
{
  "token_type": "Bearer",
  "expires_in": 2592000,
  "access_token": "eyJ0eXAiOiJKV...9FNA",
  "refresh_token": "def502004257...b5ff"
}
```

--------------------------------

### Erro ao listar informações de aplicativo (JSON)

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-de-aplicativo

Retorna uma mensagem de erro quando não há configurações salvas para o aplicativo. O corpo da resposta indica o erro e a mensagem correspondente.

```json
{
  "error": true,
  "message": "Não há configurações salvas"
}
```

--------------------------------

### Exemplo de Logística Reversa para Envio Original (Terceiros)

Source: https://docs.melhorenvio.com.br/reference/inserir-logistica-reversa-no-carrinho

Este exemplo ilustra a configuração de uma solicitação de logística reversa onde o remetente é um terceiro, detalhando as informações de endereço e contato.

```json
{
  "service": 1,
  "new_sender_mail": "remetente@melhorenvio.com",
  "new_sender_phone": "99 99999-9999",
  "insurance_value": 60.75,
  "from": {
    "name": "Antonio Augusto",
    "document": "86845718008",
    "company_document": "99799989000102",
    "address": "Av. República do Líbano",
    "number": "846",
    "district": "Tres Vendas",
    "city": "Pelotas",
    "state_abbr": "RS",
    "postal_code": "96055710"
  },
  "to": {
    "name": "João Neves",
    "phone": "15997459876",
    "email": "destinatario@melhorenvio.com",
    "document": "26805059054"
  }
}
```

--------------------------------

### Requisição para Devolução (Envio Original Terceiros)

Source: https://docs.melhorenvio.com.br/reference/inserir-logistica-reversa-no-carrinho

Utilize este exemplo se a etiqueta original foi gerada por terceiros. É necessário fornecer todos os dados do novo remetente, destinatário, carga, além de informações do pacote e opções de envio.

```json
{
    "service": 1,
    "new_sender_mail": "remetente@melhorenvio.com",
    "new_sender_phone": "99 99999-9999",
    "insurance_value": 60.75,
    "from": {
        "name": "Antonio Augusto",
        "document": "86845718008",
        "company_document": "99799989000102",
        "address": "Av. República do Líbano",
        "number": "846",
        "district": "Tres Vendas",
        "city": "Pelotas",
        "state_abbr": "RS",
        "postal_code": "96055710"
    },
    "to": {
        "name": "João Neves",
        "phone": "15997459876",
        "email": "destinatario@melhorenvio.com",
        "document": "26805059054",
        "company_document": "62278475000100",
        "state_register": "123456",
        "economic_activity_code": "123456",
        "address": "Rua dos buritis",
        "complement": "segundo andar",
        "number": "128",
        "district": "Jabaquara",
        "city": "São paulo",
        "state_abbr": "SP",
        "postal_code": "4321000",
        "note": "alguma observação"
    },
    "products": [
        {
            "name": "Produto A",
            "quantity": 1,
            "unitary_value": 60.75,
            "weight": 1
        }
    ],
    "package": {
        "weight": 1.2,
        "height": 2,
        "width": 5,
        "length": 12
    },
    "options": {
        "own_hand": false,
        "receipt": false
    }
}
```

--------------------------------

### Exemplo de Requisição para Verificar Cancelamento

Source: https://docs.melhorenvio.com.br/reference/verificar-se-etiqueta-pode-ser-cancelada

Este exemplo demonstra como formatar a requisição para verificar se uma etiqueta pode ser cancelada. Inclua o ID da etiqueta no corpo da requisição.

```json
{
  "orders": [
    "{{id}}"
  ]
}
```

--------------------------------

### Listar Informações de uma Agência por ID

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-de-uma-agencia

Use este endpoint para obter detalhes completos de uma agência específica. É necessário fornecer o `agencyId` no path e o cabeçalho `User-Agent` com informações da sua aplicação.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/shipment/agencies/{agencyId}": {
      "get": {
        "summary": "Listar informações de uma agência",
        "description": "Lista informações detalhadas de uma agência específica",
        "operationId": "listar-informacoes-de-uma-agencia",
        "parameters": [
          {
            "name": "agencyId",
            "in": "path",
            "description": "ID da agência",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": 4,\n  \"name\": \"LJ OSASCO 01\",\n  \"initials\": \"LJ-OSC-01\",\n  \"code\": \"1008139\",\n  \"company_name\": \"MEG LOGISTICA E TRANSPORTES LTDA\",\n  \"status\": \"available\",\n  \"email\": \"meg.osc@jadlog.com.br\",\n  \"note\": null,\n  \"company_id\": 2,\n  \"address\": {\n    \"id\": 4,\n    \"label\": \"Agência JadLog\",\n    \"postal_code\": \"06210130\",\n    \"address\": \"Rua Armenia 259/644\",\n    \"number\": null,\n    \"complement\": null,\n    \"district\": \"Presidente Altino\",\n    \"latitude\": -23.5278746,\n    \"longitude\": -46.7652875,\n    \"confirmed_at\": null,\n    \"created_at\": \"2017-09-11 17:47:13\",\n    \"updated_at\": \"2017-10-19 16:47:31\",\n    \"city\": {\n      \"id\": 5094,\n      \"city\": \"Osasco\",\n      \"state\": {\n        \"id\": 25,\n        \"state\": \"São Paulo\",\n        \"state_abbr\": \"SP\",\n        \"country\": {\n          \"id\": \"BR\",\n          \"country\": \"Brazil\"\n        }\n      }\n    }\n  },\n  \"phone\": {\n    \"id\": 4,\n    \"label\": \"Agência JadLog\",\n    \"phone\": \"1136891717\",\n    \"type\": \"fixed\",\n    \"country_id\": \"BR\",\n    \"confirmed_at\": null,\n    \"created_at\": \"2017-09-11 17:47:13\",\n    \"updated_at\": \"2017-09-11 17:47:13\"\n  }\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "example": 4,
                      "default": 0
                    },
                    "name": {
                      "type": "string",
                      "example": "LJ OSASCO 01"
                    },
                    "initials": {
                      "type": "string",
                      "example": "LJ-OSC-01"
                    },
                    "code": {
                      "type": "string",
                      "example": "1008139"
                    },
                    "company_name": {
                      "type": "string",
                      "example": "MEG LOGISTICA E TRANSPORTES LTDA"
                    },
                    "status": {
                      "type": "string",
                      "example": "available"
                    },
                    "email": {
                      "type": "string",
                      "example": "meg.osc@jadlog.com.br"
                    },
                    "note": {},
                    "company_id": {
                      "type": "integer",
                      "example": 2,
                      "default": 0
                    },
                    "address": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer",
                          "example": 4,
                          "default": 0
                        },
                        "label": {
                          "type": "string",
                          "example": "Agência JadLog"
                        },
                        "postal_code": {
                          "type": "string",
                          "example": "06210130"
                        },
                        "address": {
                          "type": "string",
                          "example": "Rua Armenia 259/644"
                        },
                        "number": {},
                        "complement": {},
                        "district": {
                          "type": "string",
                          "example": "Presidente Altino"
                        },
                        "latitude": {
                          "type": "number",
                          "example": -23.5278746
                        },
                        "longitude": {
                          "type": "number",
                          "example": -46.7652875
                        },
                        "confirmed_at": {},
                        "created_at": {
                          "type": "string",
                          "example": "2017-09-11 17:47:13"
                        },
                        "updated_at": {
                          "type": "string",
                          "example": "2017-10-19 16:47:31"
                        },
                        "city": {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer",
                              "example": 5094,
                              "default": 0
                            },
                            "city": {
                              "type": "string",
                              "example": "Osasco"
                            },
                            "state": {
                              "type": "object",
                              "properties": {
                                "id": {
                                  "type": "integer",
                                  "example": 25,
                                  "default": 0
                                },
                                "state": {
                                  "type": "string",
                                  "example": "São Paulo"
                                },
                                "state_abbr": {
                                  "type": "string",
                                  "example": "SP"
                                },
                                "country": {
                                  "type": "object",
                                  "properties": {
                                    "id": {
                                      "type": "string",
                                      "example": "BR"
                                    },
                                    "country": {
                                      "type": "string",
                                      "example": "Brazil"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "phone": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer",
                          "example": 4,
                          "default": 0
                        },
                        "label": {
                          "type": "string",
                          "example": "Agência JadLog"
                        },
                        "phone": {
                          "type": "string",
                          "example": "1136891717"
                        },
                        "type": {
                          "type": "string",
                          "example": "fixed"
                        },
                        "country_id": {
                          "type": "string",
                          "example": "BR"
                        },
                        "confirmed_at": {},
                        "created_at": {
                          "type": "string",
                          "example": "2017-09-11 17:47:13"
                        },
                        "updated_at": {
                          "type": "string",
                          "example": "2017-09-11 17:47:13"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

--------------------------------

### Listar Serviços Disponíveis

Source: https://docs.melhorenvio.com.br/reference/listar-servicos

Recupera uma lista de todos os serviços de transportadoras disponíveis para envio. É obrigatório incluir o cabeçalho 'User-Agent' com o nome da sua aplicação e um email de contato.

```APIDOC
## GET /api/v2/me/shipment/services

### Description
Lista todos os serviços de transportadoras disponíveis.

### Method
GET

### Endpoint
/api/v2/me/shipment/services

### Parameters
#### Header Parameters
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

### Response
#### Success Response (200)
- **id** (integer) - Identificador único do serviço.
- **name** (string) - Nome do serviço (ex: PAC, SEDEX).
- **type** (string) - Tipo do serviço (ex: normal, express).
- **range** (string) - Faixa de entrega (ex: interstate).
- **restrictions** (object) - Restrições do serviço, incluindo valores de seguro e formatos permitidos (caixa, rolo, carta).
- **requirements** (array) - Lista de requisitos obrigatórios para o serviço (ex: names, addresses).
- **optionals** (array) - Lista de opcionais disponíveis para o serviço (ex: AR, MP, VD).
- **company** (object) - Informações sobre a transportadora.
  - **id** (integer) - Identificador da transportadora.
  - **name** (string) - Nome da transportadora.
  - **picture** (string) - URL da imagem da transportadora.

### Response Example
```json
[
  {
    "id": 1,
    "name": "PAC",
    "type": "normal",
    "range": "interstate",
    "restrictions": {
      "insurance_value": {
        "min": 0,
        "max": 3000
      },
      "formats": {
        "box": {
          "weight": {
            "min": 0.001,
            "max": 30
          },
          "width": {
            "min": 11,
            "max": 105
          },
          "height": {
            "min": 2,
            "max": 105
          },
          "length": {
            "min": 16,
            "max": 105
          },
          "sum": 200
        },
        "roll": {
          "weight": {
            "min": 0.001,
            "max": 30
          },
          "diameter": {
            "min": 5,
            "max": 91
          },
          "length": {
            "min": 18,
            "max": 105
          },
          "sum": 200
        },
        "letter": {
          "weight": {
            "min": 0.001,
            "max": 0.5
          },
          "width": {
            "min": 11,
            "max": 60
          },
          "length": {
            "min": 16,
            "max": 60
          }
        }
      }
    },
    "requirements": [
      "names",
      "addresses"
    ],
    "optionals": [
      "AR",
      "MP",
      "VD"
    ],
    "company": {
      "id": 1,
      "name": "Correios",
      "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png"
    }
  }
]
```

--------------------------------

### Obter detalhes de um item do carrinho

Source: https://docs.melhorenvio.com.br/reference/exibir-informacoes-de-item-do-carrinho

Este endpoint permite recuperar informações completas de um item específico que foi adicionado ao carrinho de compras. Você pode ver detalhes como dimensões, peso e formato.

```APIDOC
## GET /rest/v1/cart/items/{itemId}

### Description
Recupera os detalhes de um item específico no carrinho de compras.

### Method
GET

### Endpoint
/rest/v1/cart/items/{itemId}

### Parameters
#### Path Parameters
- **itemId** (integer) - Required - O ID do item do carrinho a ser consultado.

### Response
#### Success Response (200)
- **id** (integer) - O ID único do item.
- **height** (string) - A altura do item.
- **width** (string) - A largura do item.
- **length** (string) - O comprimento do item.
- **diameter** (string) - O diâmetro do item (se aplicável).
- **weight** (string) - O peso do item.
- **format** (string) - O formato do item (ex: "box").
- **created_at** (string) - Data e hora de criação do registro do item.
- **updated_at** (string) - Data e hora da última atualização do registro do item.

#### Response Example
```json
{
  "id": 101609,
  "height": "10.00",
  "width": "15.00",
  "length": "20.00",
  "diameter": "0.00",
  "weight": "3.50",
  "format": "box",
  "created_at": "2022-03-29 14:17:08",
  "updated_at": "2022-03-29 14:17:08"
}
```

#### Error Response (400)
- **message** (string) - Mensagem de erro indicando que não foram encontrados resultados para o modelo especificado.

#### Error Response Example
```json
{
  "message": "No query results for model [App\\Order]."
}
```
```

--------------------------------

### Visualizar Loja

Source: https://docs.melhorenvio.com.br/reference/visualizar-loja

Recupera informações detalhadas de uma loja específica usando seu ID.

```APIDOC
## GET /api/v2/me/companies/{storeId}

### Description
Recupera informações detalhadas de uma loja específica.

### Method
GET

### Endpoint
/api/v2/me/companies/{storeId}

### Parameters
#### Path Parameters
- **storeId** (string) - Required - ID da loja

#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

### Response
#### Success Response (200)
- **id** (string) - ID da loja
- **protocol** (string) - Protocolo da loja
- **name** (string) - Nome da loja
- **email** (string) - Email da loja
- **website** (string) - Website da loja
- **picture** (string) - URL da imagem da loja
- **thumbnail** (string) - URL da miniatura da imagem da loja
- **description** (string) - Descrição da loja
- **company_name** (string) - Nome da empresa da loja
- **document** (string) - Documento da loja (CNPJ)
- **state_register** (string) - Inscrição estadual da loja
- **created_at** (string) - Data de criação da loja
- **updated_at** (string) - Data de atualização da loja

#### Response Example (200)
{
  "id": "781f86be-c3be-47e7-9bef-70b8675a55c3",
  "protocol": "COM-2022035242",
  "name": "Melhor Loja",
  "email": "contato@melhorloja.me",
  "website": null,
  "picture": null,
  "thumbnail": null,
  "description": "Descrição da loja",
  "company_name": "Nome da Loja",
  "document": "89157108000104",
  "state_register": "476210979481",
  "created_at": "2022-03-30 16:53:56",
  "updated_at": "2022-03-30 16:53:56"
}

#### Error Response (404)
- **message** (string) - Mensagem de erro indicando que a loja não foi encontrada.

#### Response Example (404)
{
  "message": "No query results for model [App\\Company]."
}
```

--------------------------------

### Autorização OAuth com Escopos

Source: https://docs.melhorenvio.com.br/discuss/60e5f49d5cf929004ed4b5d2

Exemplo de código PHP para construir uma URL de autorização OAuth, definindo permissões específicas para a integração. Certifique-se de que o `redirect_uri` esteja corretamente configurado.

```php
$permissions = implode(" ", [
        "cart-read",  //(Visualização dos itens do carrinho)
        "cart-write",  //(Cadastro e edição dos itens do carrinho)
        "companies-read",  //(Visualização das informações de empresas)
        "companies-write",  //(Cadastro e edição das informações de empresas)
        "coupons-read",  //(Visualização dos cupons cadastrados)
        "coupons-write",  //(Cadastro de novos cupons)
        "notifications-read",  //(Visualização das notificações)
        "orders-read",  //(Visualização das etiquetas)
        "products-read",  //(Visualização de produtos)
        "products-write",  //(Cadastro e edição de produtos)
        "purchases-read",  //(Visualização das compras)
        "shipping-calculate",  //(Cotação de fretes)
        "shipping-cancel",  //(Cancelamento de etiquetas)
        "shipping-checkout",  //(Checkout para compra de fretes, utiliza saldo da carteira)
        "shipping-companies",  //(Consulta de transaportadoras)
        "shipping-generate",  //(Geração de novas etiquetas)
        "shipping-preview",  //(Pré-visualização de etiquetas)
        "shipping-print",  //(Impressão de etiquetas)
        "shipping-share",  //(Compartilhamento de etiquetas)
        "shipping-tracking",  //(Rastreio de fretes)
        "ecommerce-shipping",  //(Cotação e compra de fretes para sua loja)
        "transactions-read",  //(Visualização das transações da carteira)
        "users-read",  //(Visualização das informações pessoais)
        "users-write",  //(Edição das informações pessoais)
    ]);

    return redirect()->away("{$this->url}/oauth/authorize?client_id={$client_id->value}&redirect_uri=&response_type=code&scope={$permissions}");
}
```

--------------------------------

### Exemplo de Requisição OpenAPI

Source: https://docs.melhorenvio.com.br/reference/listar-agencias-e-opcoes-de-filtro

Define a estrutura de uma requisição para listar agências com opções de filtro.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/shipment/agencies": {
      "get": {
        "summary": "Listar agências (e opções de filtro)",
        "description": "Lista todas agências de transportadoras disponíveis",
        "operationId": "listar-agencias-e-opcoes-de-filtro",
        "parameters": [
          {
            "name": "company",
            "in": "query",
            "description": "ID da transportadora",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "country",
            "in": "query",
            "description": "País",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "state",
            "in": "query",
            "description": "Estado / Exemplos: RS, SP, RJ, etc.",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "city",
            "in": "query",
            "description": "Cidade / Exemplos: Porto+Alegre, São+Paulo, Rio+de+Janeiro, etc",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

--------------------------------

### Exemplo de Requisição para Cadastrar Loja

Source: https://docs.melhorenvio.com.br/reference/cadastrar-loja

Utilize este exemplo para cadastrar uma nova loja. Certifique-se de incluir todos os campos obrigatórios no corpo da requisição.

```json
{
  "name": "Melhor Loja",
  "email": "contato@melhorloja.me",
  "description": "Descrição da loja",
  "company_name": "Nome da Loja",
  "document": "89.157.108/0001-04",
  "state_register": "476.210.979.481"
}
```

--------------------------------

### Pesquisar Etiqueta

Source: https://docs.melhorenvio.com.br/reference/pesquisar-etiqueta

Este endpoint permite buscar etiquetas com base em diversos critérios e retorna uma lista de etiquetas encontradas com seus detalhes.

```APIDOC
## GET /websites/melhorenvio_br/labels

### Description
Busca etiquetas com base em filtros e retorna uma lista de etiquetas encontradas.

### Method
GET

### Endpoint
/websites/melhorenvio_br/labels

### Query Parameters
- **object_id** (string) - Optional - ID do objeto para filtrar.
- **object_type** (string) - Optional - Tipo do objeto para filtrar (ex: "order", "shipment").
- **filter** (string) - Optional - Critério de filtro adicional.
- **sort** (string) - Optional - Critério de ordenação.
- **page** (integer) - Optional - Número da página para paginação.
- **limit** (integer) - Optional - Número de resultados por página.

### Response
#### Success Response (200)
Retorna um array de objetos, onde cada objeto representa uma etiqueta com os seguintes campos:
- **id** (string) - ID único da etiqueta.
- **protocol** (string) - Protocolo da etiqueta.
- **service_id** (integer) - ID do serviço de transporte.
- **quote** (number) - Valor do frete cotado.
- **price** (number) - Preço final do frete.
- **discount** (number) - Valor do desconto aplicado.
- **delivery_min** (integer) - Prazo mínimo de entrega em dias.
- **delivery_max** (integer) - Prazo máximo de entrega em dias.
- **status** (string) - Status atual da etiqueta (ex: "released").
- **insurance_value** (integer) - Valor do seguro da encomenda.
- **format** (string) - Formato do volume (ex: "box").
- **billed_weight** (number) - Peso faturado da encomenda.
- **receipt** (boolean) - Indica se o comprovante foi gerado.
- **own_hand** (boolean) - Indica se a coleta é feita pelo próprio remetente.
- **collect** (boolean) - Indica se a coleta foi agendada.
- **reverse** (boolean) - Indica se é uma etiqueta de devolução.

#### Response Example
```json
[
  {
    "id": "04c13ada-68e6-41df-a2c6-ff5f3e7560f8",
    "protocol": "ORD-20220395512",
    "service_id": 3,
    "quote": 25.35,
    "price": 25.35,
    "discount": 5.71,
    "delivery_min": 5,
    "delivery_max": 6,
    "status": "released",
    "insurance_value": 50,
    "format": "box",
    "billed_weight": 3.5,
    "receipt": false,
    "own_hand": false,
    "collect": false,
    "reverse": false
  }
]
```
```

--------------------------------

### Consultar Saldo do Usuário

Source: https://docs.melhorenvio.com.br/reference/saldo-do-usuario

Recupere o saldo da carteira do usuário. É necessário incluir o cabeçalho User-Agent com o nome da sua aplicação e um e-mail de contato.

```APIDOC
## GET /api/v2/me/balance

### Description
Recupera o saldo da carteira do usuário.

### Method
GET

### Endpoint
/api/v2/me/balance

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

### Response
#### Success Response (200)
- **balance** (number) - O saldo atual na carteira.
- **reserved** (integer) - Valor reservado na carteira.
- **debts** (integer) - Valor de débitos pendentes.

#### Response Example
```json
{
  "balance": 1624.9,
  "reserved": 0,
  "debts": 87
}
```

#### Error Response (401)
- **message** (string) - Mensagem de erro indicando autenticação falha.

#### Response Example
```json
{
  "message": "Unauthenticated."
}
```
```

--------------------------------

### Inserir fretes no carrinho

Source: https://docs.melhorenvio.com.br/reference/inserir-fretes-no-carrinho

Estrutura JSON para adicionar itens ao carrinho de compras, definindo produtos, volumes e opções de envio. Inclui detalhes como quantidade, valor unitário, dimensões e peso dos volumes, e configurações de envio.

```json
{
    "agency": "string",
    "recipient": {
        "name": "string",
        "document": "string",
        "email": "string",
        "phone": "string",
        "state": "string",
        "city": "string",
        "street": "string",
        "number": "string",
        "complement": "string",
        "district": "string",
        "zipcode": "string",
        "address_type": "string"
    },
    "dispatch": {
        "name": "string",
        "document": "string",
        "email": "string",
        "phone": "string",
        "company_name": "string",
        "state": "string",
        "city": "string",
        "street": "string",
        "number": "string",
        "complement": "string",
        "district": "string",
        "zipcode": "string",
        "address_type": "string"
    },
    "invoice": {
        "number": "string",
        "series": "string",
        "type": "string",
        "used_by": "string"
    },
    "volumes": [
        {
            "height": 15,
            "width": 30,
            "length": 40,
            "weight": 120
        },
        {
            "height": 4,
            "width": 10,
            "length": 10,
            "weight": 0.1
        }
    ],
    "options": {
        "platform": "Minha Loja",
        "reminder": "Compra XYZ",
        "insurance_value": 600,
        "receipt": false,
        "own_hand": false,
        "reverse": false,
        "dce":{
    		"key":""
        },
        "invoice": {
            "key": "422404***1497000123400598762797110***653",
            "xml_content":""
        }
    }
}
```

--------------------------------

### Inserir Saldo na Carteira do Usuário

Source: https://docs.melhorenvio.com.br/reference/inserir-saldo-na-carteira-do-usuario

Permite adicionar fundos à carteira de um usuário. É necessário fornecer detalhes sobre o gateway de pagamento, o valor a ser inserido e o tipo de slug (pix ou boleto).

```APIDOC
## POST /api/v2/me/balance

### Description
Permite adicionar fundos à carteira de um usuário.

### Method
POST

### Endpoint
https://sandbox.melhorenvio.com.br/api/v2/me/balance

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

#### Request Body
- **gateway** (string) - Required - Ex: yapay-transparente
- **value** (string) - Required - Valor. Ex: 10.50
- **slug** (string) - Required - Ex: pix | boleto
- **redirect_url** (string) - Optional - https://seuenderecoderetorno.me
- **finger_print** (string) - Optional - Finger Print
- **company_name** (string) - Optional - Nome Empresa
- **cnpj** (string) - Optional - CNPJ Empresa

### Request Example
```json
{
  "gateway": "yapay-transparente",
  "value": "10.50",
  "slug": "pix",
  "redirect_url": "https://seuenderecoderetorno.me",
  "finger_print": "fingerprint_do_usuario",
  "company_name": "Nome da Empresa",
  "cnpj": "12.345.678/0001-90"
}
```

### Response
#### Success Response (200)
- **message** (string) - Descrição da resposta
- **status** (integer) - Status da resposta
- **data** (object) - Dados da resposta
  - **id** (string) - ID da transação
  - **gateway** (string) - Gateway utilizado
  - **value** (string) - Valor da transação
  - **slug** (string) - Tipo de slug
  - **status** (string) - Status da transação
  - **created_at** (string) - Data de criação
  - **paid_at** (string) - Data de pagamento
  - **redirect_url** (string) - URL de redirecionamento

#### Response Example
```json
{
  "message": "Transação criada com sucesso.",
  "status": 201,
  "data": {
    "id": "txn_1234567890abcdef",
    "gateway": "yapay-transparente",
    "value": "10.50",
    "slug": "pix",
    "status": "pending",
    "created_at": "2023-10-27T10:00:00-03:00",
    "paid_at": null,
    "redirect_url": "https://sandbox.melhorenvio.com.br/pay/1234567890abcdef"
  }
}
```
```

--------------------------------

### Exemplo de Resposta de Sucesso (200)

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-do-usuario

Esta resposta contém os dados de cadastro do usuário, como ID, nome, e-mail, telefone, endereço e informações de conta.

```json
{
  "id": "779f4d62-c5b4-41e3-b0b0-ae2eb1509825",
  "protocol": 3477,
  "firstname": "Magno",
  "lastname": "xxxxxxxxxxxxxxxxxx",
  "email": "x@melhorenvio.com",
  "picture": null,
  "thumbnail": null,
  "document": "xxxxxxxxxxxx",
  "birthdate": "xxxx-xx-xx 00:00:00",
  "email_confirmed_at": "2021-06-22 12:17:00",
  "email_alternative": null,
  "access_at": "2021-09-01 12:31:29",
  "created_at": "2021-06-22 12:17:00",
  "updated_at": "2021-06-22 12:17:38",
  "limit_action": 1,
  "roles": [
    {
      "id": 2,
      "role": "ADMIN",
      "name": "Administrador"
    },
    {
      "id": 3,
      "role": "PHONE",
      "name": "Telefone confirmado"
    },
    {
      "id": 4,
      "role": "IDENTITY",
      "name": "Identidade confirmada (CPF)"
    },
    {
      "id": 9,
      "role": "QUIZ",
      "name": "Quiz aprovado (BigCorp)"
    }
  ],
  "status": {
    "id": 4,
    "status": "Allowed"
  },
  "phone": {
    "id": 39628,
    "label": null,
    "phone": "xxxxxxxxxxxxxxx",
    "type": "mobile",
    "country_id": "BR",
    "confirmed_at": "2021-06-22 12:17:00",
    "created_at": "2021-06-22 12:17:00",
    "updated_at": "2021-06-22 12:17:00"
  },
  "address": {
    "id": 28303,
    "label": "Minha Loja teste",
    "postal_code": "xxxxxxxx",
    "address": "Rua xxxxxxxxxx",
    "number": "100",
    "complement": null,
    "district": "Teste",
    "latitude": null,
    "longitude": null,
    "confirmed_at": null,
    "created_at": "2021-06-22 12:17:38",
    "updated_at": "2021-06-22 12:17:38",
    "city": {
      "id": 4xxx,
      "city": "Pelotas",
      "state": {
        "id": 21,
        "state": "Rio Grande do Sul",
        "state_abbr": "RS",
        "country": {
          "id": "BR",
          "country": "Brazil"
        }
      }
    }
  },
  "limits": {
    "shipments": 1000,
    "addresses": 10,
    "addresses_period": 30,
    "shipments_available": 1000
  }
}
```

--------------------------------

### Detalhes do Item do Carrinho

Source: https://docs.melhorenvio.com.br/reference/exibir-informacoes-de-item-do-carrinho

Obtenha informações completas sobre um item adicionado ao carrinho de compras. Isso inclui detalhes de envio, como peso faturado, se o recebimento é necessário, e informações do remetente e destinatário.

```APIDOC
## GET /carts/{cart_id}/items/{item_id}

### Description
Recupera os detalhes de um item específico dentro de um carrinho de compras.

### Method
GET

### Endpoint
`/carts/{cart_id}/items/{item_id}`

### Parameters
#### Path Parameters
- **cart_id** (string) - Required - O identificador único do carrinho.
- **item_id** (string) - Required - O identificador único do item dentro do carrinho.

### Response
#### Success Response (200)
- **id** (string) - O identificador único do item.
- **quantity** (number) - A quantidade do item.
- **description** (string) - A descrição do item.
- **value** (number) - O valor total do item.
- **weight** (number) - O peso total do item.
- **dimensions** (object) - As dimensões do item.
  - **length** (number) - O comprimento do item.
  - **width** (number) - A largura do item.
  - **height** (number) - A altura do item.
- **format** (string) - O formato do item (ex: "box").
- **billed_weight** (number) - O peso faturado do item.
- **receipt** (boolean) - Indica se o recebimento é necessário.
- **own_hand** (boolean) - Indica se a entrega deve ser feita em mãos.
- **collect** (boolean) - Indica se o item deve ser coletado.
- **collect_scheduled_at** (string) - Data e hora agendada para coleta.
- **reverse** (boolean) - Indica se é uma devolução.
- **non_commercial** (boolean) - Indica se não é uma transação comercial.
- **authorization_code** (string) - Código de autorização.
- **tracking** (string) - Código de rastreamento.
- **self_tracking** (string) - Código de rastreamento próprio.
- **delivery_receipt** (boolean) - Indica se o comprovante de entrega é necessário.
- **additional_info** (string) - Informações adicionais.
- **cte_key** (string) - Chave do CTE.
- **paid_at** (string) - Data e hora do pagamento.
- **generated_at** (string) - Data e hora de geração.
- **posted_at** (string) - Data e hora de postagem.
- **delivered_at** (string) - Data e hora de entrega.
- **canceled_at** (string) - Data e hora de cancelamento.
- **suspended_at** (string) - Data e hora de suspensão.
- **expired_at** (string) - Data e hora de expiração.
- **created_at** (string) - Data e hora de criação.
- **updated_at** (string) - Data e hora de atualização.
- **parse_pi_at** (string) - Data e hora de processamento de PI.
- **from** (object) - Informações do remetente.
  - **name** (string) - Nome do remetente.
  - **phone** (string) - Telefone do remetente.
  - **email** (string) - Email do remetente.
  - **document** (string) - Documento do remetente.
  - **company_document** (string) - Documento da empresa do remetente.
  - **state_register** (string) - Inscrição estadual do remetente.
  - **postal_code** (string) - CEP do remetente.
  - **address** (string) - Endereço do remetente.
  - **location_number** (string) - Número do local do remetente.
  - **complement** (string) - Complemento do endereço do remetente.
  - **district** (string) - Bairro do remetente.
  - **city** (string) - Cidade do remetente.
  - **state_abbr** (string) - Sigla do estado do remetente.
  - **country_id** (string) - ID do país do remetente.
  - **latitude** (string) - Latitude do remetente.
  - **longitude** (string) - Longitude do remetente.
  - **note** (string) - Observações do remetente.
- **to** (object) - Informações do destinatário.
  - **name** (string) - Nome do destinatário.

### Response Example
```json
{
  "id": "item_123",
  "quantity": 1,
  "description": "Produto Exemplo",
  "value": 100.50,
  "weight": 2.5,
  "dimensions": {
    "length": 30,
    "width": 20,
    "height": 10
  },
  "format": "box",
  "billed_weight": 3.5,
  "receipt": false,
  "own_hand": false,
  "collect": false,
  "collect_scheduled_at": null,
  "reverse": false,
  "non_commercial": false,
  "authorization_code": null,
  "tracking": null,
  "self_tracking": null,
  "delivery_receipt": false,
  "additional_info": null,
  "cte_key": null,
  "paid_at": null,
  "generated_at": null,
  "posted_at": null,
  "delivered_at": null,
  "canceled_at": null,
  "suspended_at": null,
  "expired_at": null,
  "created_at": "2022-03-29 14:17:08",
  "updated_at": "2022-03-29 14:17:08",
  "parse_pi_at": null,
  "from": {
    "name": "Teste Magento",
    "phone": "5598105050",
    "email": "melhorenvio@teste.com",
    "document": "16571478358",
    "company_document": "04517623000197",
    "state_register": "563025255115",
    "postal_code": "7110000",
    "address": "Rua Teste",
    "location_number": "100",
    "complement": "CASA",
    "district": "Bairro teste",
    "city": "Guarulhos",
    "state_abbr": "SP",
    "country_id": "BR",
    "latitude": null,
    "longitude": null,
    "note": "observação"
  },
  "to": {
    "name": "Melhor Envio"
  }
}
```
```

--------------------------------

### Resposta de Sucesso - Listar Etiquetas

Source: https://docs.melhorenvio.com.br/reference/listar-etiquetas

Exemplo de resposta bem-sucedida (código 200) ao listar etiquetas, mostrando a estrutura de paginação e um array de dados vazio.

```json
{
  "current_page": 1,
  "data": [],
  "first_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/orders?page=1",
  "from": null,
  "last_page": 1,
  "last_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/orders?page=1",
  "next_page_url": null,
  "path": "https://sandbox.melhorenvio.com.br/api/v2/me/orders",
  "per_page": 10,
  "prev_page_url": null,
  "to": null,
  "total": 0
}
```

--------------------------------

### Verificar se etiqueta pode ser cancelada

Source: https://docs.melhorenvio.com.br/reference/verificar-se-etiqueta-pode-ser-cancelada

Este endpoint permite verificar se uma etiqueta de envio específica pode ser cancelada. Ele requer o ID da etiqueta no corpo da requisição e retorna um objeto indicando se a etiqueta é cancelável e o tempo restante para cancelamento.

```APIDOC
## POST /api/v2/me/shipment/cancellable

### Description
Verifica se uma etiqueta de envio pode ser cancelada.

### Method
POST

### Endpoint
/api/v2/me/shipment/cancellable

### Parameters
#### Header Parameters
- **Content-Type** (string) - Required - Default: application/json
- **Accept** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

#### Request Body
- **orders** (array) - Required - Id do pedido correspondente a etiqueta de envio
  - items: (string)

### Request Example
```json
{
  "orders": [
    "{{id}}"
  ]
}
```

### Response
#### Success Response (200)
- **[order_id]** (object) - O ID do pedido como chave, contendo informações sobre cancelamento.
  - **cancellable** (boolean) - Indica se a etiqueta pode ser cancelada. Default: true
  - **time** (integer) - Tempo restante para cancelamento em segundos. Default: 0

#### Response Example
```json
{
  "04c13ada-68e6-41df-a2c6-ff5f3e7560f8": {
    "cancellable": true,
    "time": 0
  }
}
```

#### Error Response (422)
- **message** (string) - Mensagem de erro geral.
- **errors** (object) - Objeto contendo erros específicos de validação.
  - **orders.0** (array) - Lista de erros para o primeiro item do array 'orders'.
    - items: (string)

#### Error Response Example
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "orders.0": [
      "O campo orders.0 selecionado é inválido."
    ]
  }
}
```
```

--------------------------------

### Impressão de Etiquetas

Source: https://docs.melhorenvio.com.br/reference/impressao-de-etiquetas

Este endpoint permite a impressão de etiquetas de envio. É necessário fornecer os IDs dos pedidos que devem ter suas etiquetas impressas.

```APIDOC
## POST /api/v2/me/shipment/print

### Description
Permite a impressão de etiquetas de envio para um ou mais pedidos.

### Method
POST

### Endpoint
/api/v2/me/shipment/print

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

#### Request Body
- **mode** (string) - Optional - Modo: private / public
- **orders** (array) - Required - Lista de IDs dos pedidos para impressão
  - **items** (string)

### Request Example
```json
{
  "mode": "",
  "orders": [
    "{{id}}"
  ]
}
```

### Response
#### Success Response (200)
- **url** (string) - URL para acesso às etiquetas impressas.

#### Response Example
```json
{
  "url": "https://sandbox.melhorenvio.com.br/imprimir/ixQLaqqjmb2E"
}
```

#### Error Response (400)
- **message** (string) - Mensagem de erro.

#### Error Response Example
```json
{
  "message": "Unauthenticated."
}
```
```

--------------------------------

### Impressão de DACE

Source: https://docs.melhorenvio.com.br/reference/impressao-dace

Gera um link de impressão para o Documento Auxiliar de Conteúdo Eletrônico (DACE) em um formato especificado (zpl, jpeg ou pdf) para um determinado order_id.

```APIDOC
## GET /api/v2/me/imprimir/dace/{arquivo}/{order_id}

### Description
Gerar link de impressão do Documento Auxiliar de Conteúdo Eletrônico.

### Method
GET

### Endpoint
/api/v2/me/imprimir/dace/{arquivo}/{order_id}

### Parameters
#### Path Parameters
- **arquivo** (string) - Required - zpl, jpeg ou pdf
- **order_id** (string) - Required - Order id do envio desejado

#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

### Response
#### Success Response (200)
- **zpl** (string) - URL para download do arquivo ZPL.

#### Response Example
```json
{
  "zpl": "https://me-0047-prod.s3.amazonaws.com/zpl/9fe2xxxx..."
}
```

#### Error Response (401)
- **message** (string) - Mensagem de erro indicando autenticação falha.

#### Error Response Example
```json
{
  "message": "Unauthenticated"
}
```

#### Error Response (404)
- **message** (string) - Mensagem de erro indicando que a etiqueta não foi encontrada.

#### Error Response Example
```json
{
  "message": "No query results for model [App\\Order] {{order_id}}"
}
```
```

--------------------------------

### POST Request to Add Item to Cart (Sandbox)

Source: https://docs.melhorenvio.com.br/discuss/696650e8869234177504f3bd

This `curl` command demonstrates how to send a POST request to the Melhor Envio API's sandbox endpoint to add an item to the cart. Ensure correct authorization headers and a valid JSON payload are used. This is useful for testing cart functionality before production.

```shell
curl --request POST  
--url https://sandbox.melhorenvio.com.br/api/v2/me/cart  
--header 'Accept: application/json'  
--header 'Authorization: Bearer dgfsdgfdsfgdfgfd'  
--header 'Content-Type: application/json'  
--header 'User-Agent: Aplicação (email para contato técnico)'  
--data '  
{"from": {  
"name": "Easy",  
"phone": "51981953828",  
"email": "easyteste01@gmail.com",  
"company_document": "05700792000120",  
"state_register": "ISENTO",  
"address": "Rua Itagua",  
"complement": "Casa",  
"number": "969",  
"district": "Taquara",  
"city": "Rio de Janeiro",  
"postal_code": "22710270",  
"state_abbr": "RJ"  
},  
"to": {  
"name": "Samuel Alves",  
"phone": "55996865250",  
"email": "samuel.oliveiraalves0067@gmail.com",  
"document": "31128953048",  
"state_register": "RJ",  
"address": "Travessa",  
"complement": "Casa",  
"number": "65",  
"district": "Sepetiba",  
"city": "Rio de Janeiro",  
"postal_code": "23548007",  
"state_abbr": "RJ"  
},  
"products": [  
{  
"name": "Real Betis",  
"quantity": "1",  
"unitary_value": "100"  
}  
],  
"volumes": [  
{  
"height": 22,  
"width": 32,  
"length": 16,  
"weight": 1  
}  
],  
"options": {  
"receipt": false,  
"own_hand": false,  
"reverse": false,  
"non_commercial": false,  
"insurance_value": 100  
},  
"service": 4  
}  
'
```

--------------------------------

### Listar Endereços do Usuário

Source: https://docs.melhorenvio.com.br/reference/listar-enderecos-do-usuario

Este endpoint permite que você liste todos os endereços que foram previamente cadastrados pelo usuário na plataforma Melhor Envio. É necessário fornecer os cabeçalhos de autenticação e identificação da aplicação.

```APIDOC
## GET /api/v2/me/addresses

### Description
Lista os endereços cadastrados pelo usuário.

### Method
GET

### Endpoint
/api/v2/me/addresses

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

### Response
#### Success Response (200)
- **current_page** (integer) - The current page number of the results.
- **data** (array) - An array of address objects.
  - **id** (integer) - The unique identifier for the address.
  - **label** (string) - A label for the address (e.g., "Minha Loja teste").
  - **postal_code** (string) - The postal code of the address.
  - **address** (string) - The street address.
  - **number** (string) - The street number.
  - **complement** (string) - Additional address details (e.g., apartment number), can be null.
  - **district** (string) - The neighborhood or district.
  - **latitude** (number) - The latitude coordinate, can be null.
  - **longitude** (number) - The longitude coordinate, can be null.
  - **confirmed_at** (string) - Timestamp when the address was confirmed, can be null.
  - **created_at** (string) - Timestamp when the address was created.
  - **updated_at** (string) - Timestamp when the address was last updated.
  - **city** (object) - An object containing city details.
    - **id** (integer) - The unique identifier for the city.
    - **city** (string) - The name of the city.
    - **state** (object) - An object containing state details.
      - **id** (integer) - The unique identifier for the state.
      - **state** (string) - The name of the state.
      - **state_abbr** (string) - The abbreviation of the state.
      - **country** (object) - An object containing country details.
        - **id** (string) - The unique identifier for the country (e.g., "BR").
        - **country** (string) - The name of the country (e.g., "Brazil").
- **first_page_url** (string) - URL for the first page of results.
- **from** (integer) - The starting item number on the current page.
- **last_page** (integer) - The total number of pages.
- **last_page_url** (string) - URL for the last page of results.
- **next_page_url** (string) - URL for the next page of results, null if on the last page.
- **path** (string) - The base path for the API endpoint.
- **per_page** (integer) - The number of items per page.
- **prev_page_url** (string) - URL for the previous page of results, null if on the first page.
- **to** (integer) - The ending item number on the current page.
- **total** (integer) - The total number of items across all pages.

#### Response Example
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 28xxx,
      "label": "Minha Loja teste",
      "postal_code": "xxxxxxx",
      "address": "Rua teste",
      "number": "100",
      "complement": null,
      "district": "Centro Teste",
      "latitude": null,
      "longitude": null,
      "confirmed_at": null,
      "created_at": "2021-06-22 12:17:38",
      "updated_at": "2021-06-22 12:17:38",
      "city": {
        "id": 4xxx,
        "city": "Pelotas",
        "state": {
          "id": xx,
          "state": "Rio Grande do Sul",
          "state_abbr": "RS",
          "country": {
            "id": "BR",
            "country": "Brazil"
          }
        }
      }
    }
  ],
  "first_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/addresses?page=1",
  "from": 1,
  "last_page": 1,
  "last_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/addresses?page=1",
  "next_page_url": null,
  "path": "https://sandbox.melhorenvio.com.br/api/v2/me/addresses",
  "per_page": 10,
  "prev_page_url": null,
  "to": 1,
  "total": 1
}
```

#### Error Response (401)
- **message** (string) - Description of the error.

#### Error Response Example (401)
```json
{
  "message": "Unauthenticated."
}
```
```

--------------------------------

### Exemplo de volumes para 2 pacotes

Source: https://docs.melhorenvio.com.br/reference/inserir-fretes-no-carrinho

Define the dimensions and weights for multiple packages in a shipment. Note that some carriers do not support multiple volumes per request.

```json
"volumes": [
    { "height": 43, "width": 60, "length": 70, "weight": 30 },
    { "height": 30, "width": 40, "length": 50, "weight": 10 }
    ]
```

--------------------------------

### Exemplo de Requisição para Cadastrar Telefone

Source: https://docs.melhorenvio.com.br/reference/cadastrar-telefones-de-uma-loja

Este é um exemplo de como formatar a requisição para cadastrar um telefone de uma loja. Certifique-se de incluir o tipo de telefone ('mobile' ou 'fixed') e o número.

```json
{
  "type": "mobile",
  "phone": "11987654321"
}
```

--------------------------------

### Listar Telefones de uma Loja (OpenAPI)

Source: https://docs.melhorenvio.com.br/reference/listar-telefones-de-uma-loja

Define o endpoint para listar telefones de uma loja específica. Requer o ID da loja e headers de autenticação e identificação.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/companies/{storeId}/phones": {
      "get": {
        "summary": "Listar telefones de uma loja",
        "description": "Cadastro e visualização de endereços e telefones de lojas",
        "operationId": "listar-telefones-de-uma-loja",
        "parameters": [
          {
            "name": "storeId",
            "in": "path",
            "description": "ID da Loja",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Content-Type",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"current_page\": 1,\n  \"data\": [\n    {\n      \"id\": 42304,\n      \"label\": null,\n      \"phone\": \"5340302030\",\n      \"type\": \"mobile\",\n      \"country_id\": \"BR\",\n      \"confirmed_at\": null,\n      \"created_at\": \"2022-03-30 20:32:31\",\n      \"updated_at\": \"2022-03-30 20:32:31\"\n    },\n    {\n      \"id\": 42303,\n      \"label\": null,\n      \"phone\": \"5530203020\",\n      \"type\": \"mobile\",\n      \"country_id\": \"BR\",\n      \"confirmed_at\": null,\n      \"created_at\": \"2022-03-30 20:28:52\",\n      \"updated_at\": \"2022-03-30 20:28:52\"\n    }\n  ],\n  \"first_page_url\": \"https://sandbox.melhorenvio.com.br/api/v2/me/companies/bde0e453-1d10-4245-a447-d376ae24be55/phones?page=1\",\n  \"from\": 1,\n  \"last_page\": 1,\n  \"last_page_url\": \"https://sandbox.melhorenvio.com.br/api/v2/me/companies/bde0e453-1d10-4245-a447-d376ae24be55/phones?page=1\",\n  \"next_page_url\": null,\n  \"path\": \"https://sandbox.melhorenvio.com.br/api/v2/me/companies/bde0e453-1d10-4245-a447-d376ae24be55/phones\",\n  \"per_page\": 10,\n  \"prev_page_url\": null,\n  \"to\": 2,\n  \"total\": 2\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "current_page": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 42304,
                            "default": 0
                          },
                          "label": {},
                          "phone": {
                            "type": "string",
                            "example": "5340302030"
                          },
                          "type": {
                            "type": "string",
                            "example": "mobile"
                          },
                          "country_id": {
                            "type": "string",
                            "example": "BR"
                          },
                          "confirmed_at": {},
                          "created_at": {
                            "type": "string",
                            "example": "2022-03-30 20:32:31"
                          },
                          "updated_at": {
                            "type": "string",
                            "example": "2022-03-30 20:32:31"
                          }
                        }
                      }
                    },
                    "first_page_url": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

--------------------------------

### Requisição para Devolução (Envio Original Melhor Envio)

Source: https://docs.melhorenvio.com.br/reference/inserir-logistica-reversa-no-carrinho

Use este exemplo quando a etiqueta original foi gerada pelo Melhor Envio. Forneça o ID do envio original, dados do novo remetente, valor segurado, dimensões e peso.

```json
{
    "service": 1,
    "new_sender_mail": "remetente@melhorenvio.com",
    "new_sender_phone": "99 99999-9999",
    "insurance_value": 2.90,
    "order_id": "9c79c7bb-e365-4d92-8553-255d60bc28d0",
    "package": {
        "weight": 1.2,
        "height": 2,
        "width": 5,
        "length": 12
    },
    "options": {
        "own_hand": false,
        "receipt": false
    }
}
```

--------------------------------

### Impressão de Etiquetas em Arquivo

Source: https://docs.melhorenvio.com.br/reference/impressao-de-etiquetas-em-arquivo

Solicita a impressão de uma etiqueta em um arquivo no formato especificado (zpl, jpeg ou pdf) para um determinado ID de envio. É necessário ter solicitado a geração das etiquetas previamente.

```APIDOC
## GET /api/v2/me/imprimir/{arquivo}/{id}

### Description
Solicita a impressão de uma etiqueta em arquivo no formato especificado.

### Method
GET

### Endpoint
/api/v2/me/imprimir/{arquivo}/{id}

### Parameters
#### Path Parameters
- **arquivo** (string) - Required - Formato do arquivo: zpl, jpeg ou pdf.
- **id** (string) - Required - Order id do envio desejado.

#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - Nome da sua aplicação junto a um email de contato/suporte.

### Response
#### Success Response (200)
- **string** (string) - URL para download da etiqueta gerada.

#### Response Example
```json
{
  "https://me-0047-prod.s3.amazonaws.com/...."
}
```

#### Error Response (401)
- **message** (string) - Mensagem de erro indicando autenticação falha.

#### Error Response Example
```json
{
  "message": "Unauthenticated"
}
```

#### Error Response (404)
- **message** (string) - Mensagem de erro indicando que a etiqueta não foi encontrada.

#### Error Response Example
```json
{
  "message": "No query results for model [App\\Order] {{order_id}}"
}
```
```

--------------------------------

### Listar Informações de uma Transportadora

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-de-uma-transportadora

Obtém informações detalhadas de uma transportadora específica através do seu ID.

```APIDOC
## GET /api/v2/me/shipment/companies/{companyId}

### Description
Lista informações detalhadas de uma transportadora específica.

### Method
GET

### Endpoint
/api/v2/me/shipment/companies/{companyId}

### Parameters
#### Path Parameters
- **companyId** (string) - Required - Id da transportadora

#### Header Parameters
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

### Response
#### Success Response (200)
- **id** (integer) - Identificador único da transportadora.
- **name** (string) - Nome da transportadora.
- **picture** (string) - URL da imagem do logo da transportadora.
- **services** (array) - Lista de serviços oferecidos pela transportadora.
  - **id** (integer) - Identificador único do serviço.
  - **name** (string) - Nome do serviço.
  - **type** (string) - Tipo do serviço (ex: normal, express).
  - **range** (string) - Faixa de abrangência do serviço (ex: interstate).
  - **restrictions** (object) - Restrições aplicadas ao serviço.
    - **insurance_value** (object) - Limites para o valor do seguro.
      - **min** (number) - Valor mínimo permitido.
      - **max** (number) - Valor máximo permitido.
    - **formats** (object) - Restrições de formato para embalagens.
      - **box** (object) - Restrições para embalagens em formato de caixa.
        - **weight** (object) - Limites de peso.
          - **min** (number) - Peso mínimo.
          - **max** (number) - Peso máximo.
        - **width** (object) - Limites de largura.
          - **min** (number) - Largura mínima.
          - **max** (number) - Largura máxima.
        - **height** (object) - Limites de altura.
          - **min** (number) - Altura mínima.
          - **max** (number) - Altura máxima.
        - **length** (object) - Limites de comprimento.
          - **min** (number) - Comprimento mínimo.
          - **max** (number) - Comprimento máximo.
        - **sum** (number) - Soma máxima das dimensões (largura + altura + comprimento).
  - **requirements** (array) - Lista de requisitos obrigatórios para o serviço.
  - **optionals** (array) - Lista de opcionais disponíveis para o serviço.
  - **company** (object) - Informações da empresa associada ao serviço.
    - **id** (integer) - Identificador da empresa.
    - **name** (string) - Nome da empresa.
    - **status** (string) - Status da empresa (ex: available).
    - **picture** (string) - Caminho da imagem da empresa.
    - **use_own_contract** (boolean) - Indica se a empresa utiliza contrato próprio.
```

--------------------------------

### Exemplo de Requisição para Cancelamento de Etiqueta

Source: https://docs.melhorenvio.com.br/reference/cancelamento-de-etiquetas

Utilize este exemplo para cancelar uma etiqueta de envio. Certifique-se de substituir '{{id}}' pelo ID real da etiqueta e fornecer uma descrição para o cancelamento.

```json
{
  "order": {
    "id": "{{id}}",
    "reason_id": "2",
    "description": "Descrição do cancelamento"
  }
}
```

--------------------------------

### Exemplo de Resposta de Erro (422)

Source: https://docs.melhorenvio.com.br/reference/geracao-de-etiquetas

Este exemplo ilustra uma resposta de erro quando os dados fornecidos são inválidos. A resposta inclui uma mensagem geral de erro e detalhes sobre os campos específicos que falharam na validação, como o formato ou o comprimento dos IDs de pedido.

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "orders.0": [
      "O campo orders.0 deve ser uma string.",
      "O campo orders.0 deve ter pelo menos 36 caracteres."
    ]
  }
}
```

--------------------------------

### Listar Endereços de Loja (OpenAPI)

Source: https://docs.melhorenvio.com.br/reference/listar-enderecos-de-uma-loja

Define o endpoint da API para listar endereços de uma loja, incluindo os parâmetros necessários e a estrutura da resposta.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/companies/{storeId}/addresses": {
      "get": {
        "summary": "Listar endereços de uma loja",
        "description": "",
        "operationId": "listar-enderecos-de-uma-loja",
        "parameters": [
          {
            "name": "storeId",
            "in": "path",
            "description": "ID da loja",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "Content-type",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"current_page\": 1,\n  \"data\": [\n    {\n      \"id\": 32336,\n      \"label\": \"\",\n      \"postal_code\": \"07110000\",\n      \"address\": \"Av Teste\",\n      \"number\": \"123\",\n      \"complement\": \"ABC\",\n      \"district\": null,\n      \"latitude\": null,\n      \"longitude\": null,\n      \"confirmed_at\": null,\n      \"created_at\": \"2022-03-30 17:08:23\",\n      \"updated_at\": \"2022-03-30 17:08:23\",\n      \"city\": {\n        \"id\": 5269,\n        \"city\": \"São Paulo\",\n        \"state\": {\n          \"id\": 25,\n          \"state\": \"São Paulo\",\n          \"state_abbr\": \"SP\",\n          \"country\": {\n            \"id\": \"BR\",\n            \"country\": \"Brazil\"\n          }\n        }\n      }\n    }\n  ],
  \"first_page_url\": \"https://sandbox.melhorenvio.com.br/api/v2/me/companies/781f86be-c3be-47e7-9bef-70b8675a55c3/addresses?page=1\",\n  \"from\": 1,\n  \"last_page\": 1,\n  \"last_page_url\": \"https://sandbox.melhorenvio.com.br/api/v2/me/companies/781f86be-c3be-47e7-9bef-70b8675a55c3/addresses?page=1\",\n  \"next_page_url\": null,\n  \"path\": \"https://sandbox.melhorenvio.com.br/api/v2/me/companies/781f86be-c3be-47e7-9bef-70b8675a55c3/addresses\",\n  \"per_page\": 10,\n  \"prev_page_url\": null,\n  \"to\": 1,\n  \"total\": 1\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "current_page": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "integer",
                            "example": 32336,
                            "default": 0
                          },
                          "label": {
                            "type": "string",
                            "example": ""
                          },
                          "postal_code": {
                            "type": "string",
                            "example": "07110000"
                          },
                          "address": {
                            "type": "string",
                            "example": "Av Teste"
                          },
                          "number": {
                            "type": "string",
                            "example": "123"
                          },
                          "complement": {
                            "type": "string",
                            "example": "ABC"
                          },
                          "district": {},
                          "latitude": {},
                          "longitude": {},
                          "confirmed_at": {},
                          "created_at": {
                            "type": "string",
                            "example": "2022-03-30 17:08:23"
                          },
                          "updated_at": {
                            "type": "string",
                            "example": "2022-03-30 17:08:23"
                          },
                          "city": {
                            "type": "object",
                            "properties": {
                              "id": {
                                "type": "integer",
                                "example": 5269,
                                "default": 0
                              },
                              "city": {
                                "type": "string",
                                "example": "São Paulo"
                              },
                              "state": {
                                "type": "object",
                                "properties": {
                                  "id": {
                                    "type": "integer",
                                    "example": 25,
                                    "default": 0
                                  },
                                  "state": {
                                    "type": "string",
                                    "example": "São Paulo"
                                  },
                                  "state_abbr": {
                                    "type": "string",
                                    "example": "SP"
                                  },
                                  "country": {
                                    "type": "object",
                                    "properties": {
                                      "id": {
                                        "type": "string",
                                        "example": "BR"
                                      },
                                      "country": {
                                        "type": "string",
                                        "example": "Brazil"
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "first_page_url": {
                      "type": "string",
                      "example": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/781f86be-c3be-47e7-9bef-70b8675a55c3/addresses?page=1"
                    },
                    "from": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "last_page": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "last_page_url": {
                      "type": "string",
                      "example": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/781f86be-c3be-47e7-9bef-70b8675a55c3/addresses?page=1"
                    },
                    "next_page_url": {},
                    "path": {
                      "type": "string",
                      "example": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/781f86be-c3be-47e7-9bef-70b8675a55c3/addresses"
                    },
                    "per_page": {
                      "type": "integer",
                      "example": 10,
                      "default": 0
                    },
                    "prev_page_url": {},
                    "to": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "total": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

--------------------------------

### Insert Balance

Source: https://docs.melhorenvio.com.br/reference/inserir-saldo-na-carteira-do-usuario

This endpoint allows you to add a specified amount to a user's wallet balance.

```APIDOC
## POST /users/{userId}/wallet/balance

### Description
Adds a specified amount to the user's wallet balance.

### Method
POST

### Endpoint
`/users/{userId}/wallet/balance`

### Parameters
#### Path Parameters
- **userId** (integer) - Required - The ID of the user whose wallet balance will be updated.

#### Request Body
- **amount** (number) - Required - The amount to be added to the wallet balance.

### Request Example
{
  "amount": 100.50
}

### Response
#### Success Response (200)
- **balance** (number) - The updated balance of the user's wallet.
- **message** (string) - A confirmation message.

#### Response Example
{
  "balance": 150.75,
  "message": "Balance updated successfully."
}

#### Error Response (400)
- **message** (string) - An error message indicating the issue (e.g., invalid amount, user not found).

#### Error Response Example
{
  "message": "Invalid amount provided."
}
```

--------------------------------

### Estrutura de Erro da API

Source: https://docs.melhorenvio.com.br/discuss/675c1f63c0286a00743be1c9

Formato JSON retornado pela API quando ocorre um erro, como 'unsupported_grant_type'. Contém detalhes sobre o erro e possíveis dicas.

```JSON
{"error":"unsupported_grant_type","error_description":"The authorization grant type is not supported by the authorization server.","hint":"Check that all required parameters have been provided","message":"The authorization grant type is not supported by the authorization server."}
```

--------------------------------

### Detalhes do Item do Carrinho

Source: https://docs.melhorenvio.com.br/reference/exibir-informacoes-de-item-do-carrinho

Obtenha informações completas sobre um item no carrinho, incluindo dados do remetente, destinatário e detalhes do serviço de envio.

```APIDOC
## GET /carts/{cart_id}/items/{item_id}

### Description
Recupera informações detalhadas de um item específico dentro de um carrinho de compras.

### Method
GET

### Endpoint
`/carts/{cart_id}/items/{item_id}`

### Parameters
#### Path Parameters
- **cart_id** (integer) - Required - O identificador único do carrinho.
- **item_id** (integer) - Required - O identificador único do item dentro do carrinho.

### Response
#### Success Response (200)
- **sender** (object) - Informações do remetente.
  - **phone** (string) - Telefone do remetente.
  - **email** (string) - Email do remetente.
  - **document** (string) - CPF ou CNPJ do remetente.
  - **company_document** (string) - CNPJ da empresa remetente.
  - **state_register** (string) - Inscrição estadual do remetente.
  - **postal_code** (string) - CEP do remetente.
  - **address** (string) - Endereço do remetente.
  - **location_number** (string) - Número do local do remetente.
  - **complement** (string) - Complemento do endereço do remetente.
  - **district** (string) - Bairro do remetente.
  - **city** (string) - Cidade do remetente.
  - **state_abbr** (string) - Sigla do estado do remetente.
  - **country_id** (string) - ID do país do remetente.
  - **latitude** (number) - Latitude da localização do remetente.
  - **longitude** (number) - Longitude da localização do remetente.
  - **note** (string) - Observações adicionais do remetente.
- **service** (object) - Informações do serviço de envio.
  - **id** (integer) - ID do serviço.
  - **name** (string) - Nome do serviço.
  - **status** (string) - Status do serviço.
  - **type** (string) - Tipo do serviço.
  - **range** (string) - Alcance do serviço.
  - **restrictions** (string) - Restrições do serviço.
  - **requirements** (array) - Requisitos do serviço.
  - **optionals** (array) - Opcionais do serviço.
  - **company** (object) - Informações da transportadora.
    - **id** (integer) - ID da transportadora.
    - **name** (string) - Nome da transportadora.
    - **status** (string) - Status da transportadora.
    - **picture** (string) - URL da imagem da transportadora.
    - **use_own_contract** (boolean) - Indica se a transportadora usa contrato próprio.

#### Response Example
```json
{
  "sender": {
    "phone": "1999999999",
    "email": "melhorenvio@teste.com",
    "document": "73646548010",
    "company_document": "89794131000100",
    "state_register": "123456",
    "postal_code": "26210000",
    "address": "Avenida Marechal Floriano Peixoto",
    "location_number": "123",
    "complement": "ap 2",
    "district": "Centro",
    "city": "Nova Iguacu",
    "state_abbr": "RJ",
    "country_id": "BR",
    "latitude": null,
    "longitude": null,
    "note": "Observação"
  },
  "service": {
    "id": 3,
    "name": ".Package",
    "status": "available",
    "type": "normal",
    "range": "interstate",
    "restrictions": "{\"insurance_value\":{\"min\":0,\"max\":29900},\"formats\":{\"box\":{\"weight\":{\"min\":0.001,\"max\":120},\"width\":{\"min\":1,\"max\":105},\"height\":{\"min\":1,\"max\":100},\"length\":{\"min\":1,\"max\":181},\"sum\":386}}}",
    "requirements": "[\"names\",\"phones\",\"addresses\",\"documents\",\"invoice\"]",
    "optionals": "[\"AR\",\"VD\"]",
    "company": {
      "id": 2,
      "name": "Jadlog",
      "status": "available",
      "picture": "/images/shipping-companies/jadlog.png",
      "use_own_contract": false
    }
  }
}
```
```

--------------------------------

### Adicionar Frete ao Carrinho

Source: https://docs.melhorenvio.com.br/reference/inserir-fretes-no-carrinho

Esta operação permite adicionar detalhes de frete ao carrinho de compras. É necessário fornecer informações sobre as dimensões e peso do pacote, além de opções complementares como valor do seguro, aviso de recebimento, e se o envio é próprio ou reverso.

```APIDOC
## POST /cart/shipping

### Description
Adiciona informações de frete ao carrinho de compras.

### Method
POST

### Endpoint
/cart/shipping

### Request Body
- **recipient** (object) - Required - Informações do destinatário.
  - **name** (string) - Required - Nome do destinatário.
  - **street** (string) - Required - Rua do destinatário.
  - **complement** (string) - Optional - Complemento do endereço.
  - **number** (string) - Required - Número do endereço.
  - **district** (string) - Required - Bairro do destinatário.
  - **city** (string) - Required - Cidade do destinatário.
  - **state** (string) - Required - Estado do destinatário.
  - **postal_code** (string) - Required - CEP do destinatário.
  - **phone** (string) - Required - Telefone do destinatário.
  - **email** (string) - Required - E-mail do destinatário.
- **volumes** (array) - Required - Lista de volumes do envio.
  - **object** (string) - Optional - Tipo de objeto (ex: "Caixa").
  - **amount** (integer) - Required - Quantidade de volumes.
  - **description** (string) - Optional - Descrição do volume.
  - **weight** (number) - Required - Peso do volume.
  - **length** (integer) - Required - Comprimento do volume.
  - **height** (integer) - Required - Altura do volume.
  - **width** (integer) - Required - Largura do volume.
  - **service** (string) - Optional - Serviço de frete (ex: "SEDEX", "PAC").
  - **service_code** (string) - Optional - Código do serviço de frete.
  - **attributes** (object) - Optional - Atributos do volume.
    - **stamps** (integer) - Optional - Quantidade de selos.
    - **cubic_weight** (number) - Optional - Peso cúbico.
- **options** (object) - Optional - Informações complementares do envio.
  - **insurance_value** (number) - Required - Valor segurado.
  - **receipt** (boolean) - Required - Flag para Aviso de Recebimento.
  - **own_hand** (boolean) - Required - Flag para Mãos Próprias.
  - **reverse** (boolean) - Required - Flag para Envio Reverso.
  - **non_commercial** (boolean) - Required - Flag para Envio Não Comercial.
  - **invoice** (object) - Optional - Informações da Nota Fiscal.
    - **key** (string) - Required - Chave da Nota Fiscal.
  - **dce** (object) - Optional - Informações da DCe.
    - **key** (string) - Required - Chave da DCe.
  - **plataform** (string) - Optional - Plataforma.
  - **tags** (array) - Optional - Tags do envio.
    - **tag** (string) - Optional - Identificação do pedido na plataforma.
    - **Url** (string) - Optional - URL da plataforma.

### Request Example
```json
{
  "recipient": {
    "name": "Destinatário Exemplo",
    "street": "Rua das Flores",
    "complement": "Apto 101",
    "number": "123",
    "district": "Centro",
    "city": "São Paulo",
    "state": "SP",
    "postal_code": "01000-000",
    "phone": "11999999999",
    "email": "destinatario@exemplo.com"
  },
  "volumes": [
    {
      "object": "Caixa",
      "amount": 1,
      "description": "Produto Eletrônico",
      "weight": 2.5,
      "length": 30,
      "height": 20,
      "width": 20,
      "service": "SEDEX",
      "service_code": "04014",
      "attributes": {
        "stamps": 0,
        "cubic_weight": 3.0
      }
    }
  ],
  "options": {
    "insurance_value": 100.00,
    "receipt": true,
    "own_hand": false,
    "reverse": false,
    "non_commercial": false,
    "invoice": {
      "key": "NF-KEY-EXAMPLE-12345678901234567890123456789012345678901234567890"
    },
    "dce": {
      "key": "DCE-KEY-EXAMPLE-12345678901234567890123456789012345678901234567890"
    },
    "plataform": "Minha Plataforma",
    "tags": [
      {
        "tag": "pedido-123",
        "Url": "http://minha-plataforma.com/pedidos/123"
      }
    ]
  }
}
```

### Response
#### Success Response (201)
- **message** (string) - Mensagem de sucesso.
- **order_id** (string) - ID do pedido gerado.

#### Response Example
```json
{
  "message": "Frete adicionado ao carrinho com sucesso.",
  "order_id": "ORD-123456789"
}
```
```

--------------------------------

### Exemplo de Falha na Impressão de Etiquetas - Etiqueta Não Encontrada

Source: https://docs.melhorenvio.com.br/reference/impressao-de-etiquetas-em-arquivo

Esta resposta de erro indica que a etiqueta com o ID de envio especificado não foi encontrada. Verifique se o ID do envio está correto e se a etiqueta já foi gerada.

```json
{
"message": "No query results for model [App\\Order] {{order_id}}"
}
```

--------------------------------

### Listar Lojas do Usuário

Source: https://docs.melhorenvio.com.br/reference/listar-lojas-do-usuario

Recupera uma lista de todas as lojas associadas à conta do usuário autenticado.

```APIDOC
## GET /api/v2/me/companies

### Description
Este endpoint retorna uma lista das lojas cadastradas para o usuário.

### Method
GET

### Endpoint
/api/v2/me/companies

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

### Response
#### Success Response (200)
- **current_page** (integer) - The current page number of the results.
- **data** (array) - An array of store objects.
  - **id** (string) - The unique identifier for the store.
  - **protocol** (string) - The store's protocol number.
  - **name** (string) - The name of the store.
  - **email** (any) - The email address of the store (can be null).
  - **website** (any) - The website of the store (can be null).
  - **picture** (any) - URL to the store's picture (can be null).
  - **thumbnail** (any) - URL to the store's thumbnail image (can be null).
  - **description** (any) - A description of the store (can be null).
  - **company_name** (any) - The company name associated with the store (can be null).
  - **document** (any) - The store's document number (can be null).
  - **state_register** (any) - The store's state registration number (can be null).
  - **created_at** (string) - The timestamp when the store was created.
  - **updated_at** (string) - The timestamp when the store was last updated.
- **first_page_url** (string) - URL to the first page of results.
- **from** (integer) - The starting item number of the current page.
- **last_page** (integer) - The last page number of the results.
- **last_page_url** (string) - URL to the last page of results.
- **next_page_url** (string) - URL to the next page of results (null if on the last page).
- **path** (string) - The base URL path for the results.
- **per_page** (integer) - The number of items per page.
- **prev_page_url** (string) - URL to the previous page of results (null if on the first page).
- **to** (integer) - The ending item number of the current page.
- **total** (integer) - The total number of items across all pages.

#### Response Example
```json
{
  "current_page": 1,
  "data": [
    {
      "id": "bde0e453-1d10-4245-a447-d376ae24be55",
      "protocol": "COM-2021063464",
      "name": "Minha Loja teste",
      "email": null,
      "website": null,
      "picture": null,
      "thumbnail": null,
      "description": null,
      "company_name": null,
      "document": null,
      "state_register": null,
      "created_at": "2021-06-22 12:17:38",
      "updated_at": "2021-06-22 12:17:38"
    }
  ],
  "first_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/companies?page=1",
  "from": 1,
  "last_page": 1,
  "last_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/companies?page=1",
  "next_page_url": null,
  "path": "https://sandbox.melhorenvio.com.br/api/v2/me/companies",
  "per_page": 10,
  "prev_page_url": null,
  "to": 1,
  "total": 1
}
```
```

--------------------------------

### Exemplo de Requisição para Cadastrar Endereço de Loja

Source: https://docs.melhorenvio.com.br/reference/cadastrar-endereco-de-uma-loja

Este é um exemplo de corpo de requisição JSON para cadastrar um endereço de loja. Certifique-se de que todos os campos obrigatórios estejam preenchidos corretamente.

```json
{
  "postal_code": "01010010",
  "address": "Av. Teste",
  "number": "123",
  "complement": "ABC",
  "city": "São Paulo",
  "state": "SP"
}
```

--------------------------------

### Solicitação do Token de Acesso

Source: https://docs.melhorenvio.com.br/reference/solicitacao-do-token

Este endpoint é utilizado para solicitar um token de acesso, que é necessário para autenticar requisições subsequentes à API. É preciso fornecer credenciais e informações de autenticação válidas.

```APIDOC
## POST /oauth/token

### Description
Autenticação para obter um token de acesso.

### Method
POST

### Endpoint
/oauth/token

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

#### Request Body
- **grant_type** (string) - Required - Tipo do modo de solicitação de token
- **client_id** (integer) - Required - Obtido após a criação do aplicativo no painel do Melhor Envio
- **client_secret** (string) - Required - O mesmo do aplicativo gerado no painel Melhor Envio
- **redirect_uri** (string) - Required - Deve ser estática e conforme configurada no app dentro do painel Melhor Envio
- **code** (string) - Required - Resposta da autenticação
- **refresh_token** (string) - Required - Obtido da resposta junto à solicitação de token

### Request Example
```json
{
  "grant_type": "authorization_code",
  "client_id": 12345,
  "client_secret": "YOUR_CLIENT_SECRET",
  "redirect_uri": "http://localhost:3000/callback",
  "code": "AUTHORIZATION_CODE",
  "refresh_token": "REFRESH_TOKEN"
}
```

### Response
#### Success Response (200)
- **token_type** (string) - Tipo do token (ex: Bearer)
- **expires_in** (integer) - Tempo de expiração do token em segundos
- **access_token** (string) - O token de acesso para autenticar requisições
- **refresh_token** (string) - O token para renovar o access_token quando ele expirar

#### Response Example
```json
{
  "token_type": "Bearer",
  "expires_in": 2592000,
  "access_token": "eyJ0eXAiOiJKV...9FNA",
  "refresh_token": "def502004257...b5ff"
}
```

#### Error Response (401)
- **error** (string) - Código do erro (ex: invalid_client)
- **error_description** (string) - Descrição do erro
- **message** (string) - Mensagem detalhada do erro

#### Error Response Example
```json
{
  "error": "invalid_client",
  "error_description": "Client authentication failed",
  "message": "Client authentication failed"
}
```
```

--------------------------------

### Resposta de Erro: Sem Resultados de Consulta

Source: https://docs.melhorenvio.com.br/reference/exibir-informacoes-de-item-do-carrinho

Exibe a estrutura de uma resposta de erro quando nenhuma consulta de resultado é encontrada para um modelo específico. Útil para depuração e tratamento de erros.

```json
{
  "message": "No query results for model [App\\Order]."
}
```

--------------------------------

### Exemplo de Chamada de Autorização

Source: https://docs.melhorenvio.com.br/discuss/67d47a62c76df9005391f59a

Este snippet mostra os parâmetros esperados para uma chamada de autorização bem-sucedida. Verifique se o client_id, redirect_url, response_type e scope estão corretamente configurados.

```json
"client_id": {client_id},
"redirect_url": {callback},
"response_type": "code",
"scope": "shipping-checkout shipping-generate shipping-tracking"
```

--------------------------------

### Exemplo de Resposta de Erro (422 Unprocessable Entity)

Source: https://docs.melhorenvio.com.br/reference/cadastrar-telefones-de-uma-loja

Este exemplo mostra uma resposta de erro quando os dados fornecidos na requisição são inválidos. A resposta detalha a mensagem de erro e os campos específicos que falharam na validação, como o comprimento do número de telefone.

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "phone": [
      "O campo phone não pode ser superior a 11 caracteres."
    ]
  }
}
```

--------------------------------

### List Cart Items

Source: https://docs.melhorenvio.com.br/reference/listar-itens-do-carrinho

Fetches all items present in the shopping cart.

```APIDOC
## GET /api/v2/me/cart

### Description
Retrieves a list of all items currently in the user's shopping cart.

### Method
GET

### Endpoint
/api/v2/me/cart

### Parameters
#### Query Parameters
- **page** (integer) - Optional - The page number to retrieve.

### Response
#### Success Response (200)
- **current_page** (integer) - The current page number of the results.
- **data** (array) - An array of cart items.
  - **id** (string) - The unique identifier of the cart item.
  - **protocol** (string) - The protocol number associated with the item.
  - **service_id** (integer) - The ID of the shipping service.
  - **agency_id** (object) - Details about the shipping agency.
  - **contract** (string) - The contract number.
  - **service_code** (object) - The code for the shipping service.
  - **quote** (number) - The quoted price for the item.
  - **agency** (object) - Information about the shipping agency.
    - **id** (integer) - The agency's unique identifier.
    - **company_id** (integer) - The ID of the shipping company.
    - **name** (string) - The name of the agency.
    - **initials** (string) - The agency's initials.
    - **code** (string) - The agency's code.
    - **status** (string) - The current status of the agency.
    - **company_name** (string) - The name of the shipping company.
    - **email** (string) - The agency's email address.
    - **note** (string) - Any additional notes about the agency.
    - **created_at** (string) - The timestamp when the agency was created.
    - **updated_at** (string) - The timestamp when the agency was last updated.
    - **address** (object) - The agency's address details.
      - **id** (integer) - The address ID.
      - **label** (string) - A label for the address.
      - **postal_code** (string) - The postal code.
      - **address** (string) - The street address.
      - **number** (string) - The building number.
      - **complement** (string) - Address complement.
      - **district** (string) - The neighborhood.
      - **latitude** (number) - The latitude coordinate.
      - **longitude** (number) - The longitude coordinate.
      - **confirmed_at** (string) - Timestamp of address confirmation.
      - **created_at** (string) - Timestamp of address creation.
      - **updated_at** (string) - Timestamp of address update.
      - **city** (object) - City details.
        - **id** (integer) - The city ID.
        - **city** (string) - The name of the city.
        - **state** (object) - State details.
          - **id** (integer) - The state ID.
          - **state** (string) - The name of the state.
          - **state_abbr** (string) - The state abbreviation.
          - **country** (object) - Country details.
            - **id** (string) - The country ID.
            - **country** (string) - The name of the country.
    - **phone** (object) - The agency's phone number details.
      - **id** (integer) - The phone ID.
      - **label** (string) - A label for the phone number.
      - **phone** (string) - The phone number.
      - **type** (string) - The type of phone number (e.g., 'fixed').
      - **country_id** (string) - The country ID.
      - **confirmed_at** (string) - Timestamp of phone confirmation.
      - **created_at** (string) - Timestamp of phone creation.
      - **updated_at** (string) - Timestamp of phone update.
  - **invoice** (object) - Invoice details.
    - **model** (string) - The invoice model.
    - **number** (string) - The invoice number.
    - **serie** (string) - The invoice series.
    - **key** (string) - The invoice key.
    - **value** (number) - The invoice value.
    - **cfop** (string) - The CFOP code.
    - **issued_at** (string) - The date the invoice was issued.
    - **uploaded_at** (string) - Timestamp of invoice upload.
    - **to_document** (string) - The recipient's document number.
  - **tags** (array) - An array of tags associated with the item.
  - **products** (array) - An array of products in the cart item.
    - **name** (string) - The name of the product.
    - **quantity** (integer) - The quantity of the product.
    - **unitary_value** (number) - The value of a single unit of the product.
    - **weight** (number) - The weight of the product.
  - **generated_key** (string) - The generated key for the item.
  - **volumes** (array) - An array of volume details for the item.
    - **id** (integer) - The volume ID.
    - **height** (string) - The height of the volume.
    - **width** (string) - The width of the volume.
    - **length** (string) - The length of the volume.
    - **diameter** (string) - The diameter of the volume.
    - **weight** (string) - The weight of the volume.
    - **format** (string) - The format of the volume (e.g., 'box').
    - **created_at** (string) - Timestamp of volume creation.
    - **updated_at** (string) - Timestamp of volume update.
- **first_page_url** (string) - URL for the first page of results.
- **from** (integer) - The starting item number on the current page.
- **last_page** (integer) - The last page number of the results.
- **last_page_url** (string) - URL for the last page of results.
- **next_page_url** (string) - URL for the next page of results.
- **path** (string) - The API path for the cart items.
- **per_page** (integer) - The number of items per page.
- **prev_page_url** (string) - URL for the previous page of results.
- **to** (integer) - The ending item number on the current page.
- **total** (integer) - The total number of items in the cart.

### Response Example
```json
{
  "data": [
    {
      "id": "4d9a896c-9057-490d-94ea-abb23565463c",
      "protocol": "ORD-20220397315",
      "service_id": 2,
      "agency_id": {
        "id": 49,
        "company_id": 2,
        "name": "CO MIRASSOL 01 ",
        "initials": "CO-MSL-01",
        "code": "1008588",
        "status": "available",
        "company_name": "RODOZELLI EXPRESS LTDA ME",
        "email": "bozelli.msl@jadlog.com.br",
        "note": null,
        "created_at": "2017-09-11 17:47:14",
        "updated_at": "2018-03-12 23:48:11",
        "address": {
          "id": 49,
          "label": "Agência JadLog",
          "postal_code": "15130000",
          "address": "Rua Frei Antonio Zimmermann 2020",
          "number": null,
          "complement": null,
          "district": "Jardim Alvorada",
          "latitude": -20.8201453,
          "longitude": -49.4951883,
          "confirmed_at": null,
          "created_at": "2017-09-11 17:47:14",
          "updated_at": "2017-10-19 16:47:34",
          "city": {
            "id": 5047,
            "city": "Mirassol",
            "state": {
              "id": 25,
              "state": "São Paulo",
              "state_abbr": "SP",
              "country": {
                "id": "BR",
                "country": "Brazil"
              }
            }
          }
        },
        "phone": {
          "id": 49,
          "label": "Agência JadLog",
          "phone": "1732532042",
          "type": "fixed",
          "country_id": "BR",
          "confirmed_at": null,
          "created_at": "2017-09-11 17:47:14",
          "updated_at": "2017-09-11 17:47:14"
        }
      },
      "invoice": {
        "model": "55",
        "number": "9248",
        "serie": "1",
        "key": "31190307586261000184550010000092481404848162",
        "value": null,
        "cfop": null,
        "issued_at": "2019-03-01 00:00:00",
        "uploaded_at": null,
        "to_document": null
      },
      "tags": [],
      "products": [
        {
          "name": "Papel adesivo para etiquetas 1",
          "quantity": 3,
          "unitary_value": 100,
          "weight": null
        },
        {
          "name": "Papel adesivo para etiquetas 2",
          "quantity": 1,
          "unitary_value": 700,
          "weight": null
        }
      ],
      "generated_key": null,
      "volumes": [
        {
          "id": 101602,
          "height": "10.00",
          "width": "15.00",
          "length": "20.00",
          "diameter": "0.00",
          "weight": "3.50",
          "format": "box",
          "created_at": "2022-03-29 13:15:49",
          "updated_at": "2022-03-29 13:15:49"
        }
      ]
    }
  ],
  "first_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/cart?page=1",
  "from": 1,
  "last_page": 1,
  "last_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/cart?page=1",
  "next_page_url": null,
  "path": "https://sandbox.melhorenvio.com.br/api/v2/me/cart",
  "per_page": 10,
  "prev_page_url": null,
  "to": 3,
  "total": 3
}
```
        }
      }
    }
  ],
  "first_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/cart?page=1",
  "from": 1,
  "last_page": 1,
  "last_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/cart?page=1",
  "next_page_url": null,
  "path": "https://sandbox.melhorenvio.com.br/api/v2/me/cart",
  "per_page": 10,
  "prev_page_url": null,
  "to": 3,
  "total": 3
}

```

--------------------------------

### Classe de Resposta para Cálculo de Frete

Source: https://docs.melhorenvio.com.br/discuss/651083c34fd729000d9ff4ba

Representa a estrutura de dados retornada pela API do Melhor Envio após o cálculo de frete. Contém detalhes como ID, nome, preço, moeda, tempo de entrega e dimensões.

```java
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MelhorEnvioResponse implements Serializable {
    private Integer id;
    private String name;
    private String price;
    @JsonProperty(value = "custom_price")
    private String customPrice;
    private String discount;
    private String currency;
    @JsonProperty(value = "delivery_time")
    private Integer deliveryTime;
    @JsonProperty(value = "delivery_range")
    private DeliveryRange deliveryRange;
    private Integer customDeliveryTime;
    private CustomDeliveryRange customDeliveryRange;
    private Packages packages;
    private Dimensions dimensions;

}
```

--------------------------------

### Adicionar Logística Reversa ao Carrinho

Source: https://docs.melhorenvio.com.br/reference/inserir-logistica-reversa-no-carrinho

Este endpoint permite adicionar um item de logística reversa ao carrinho. É necessário fornecer detalhes sobre o serviço, remetente, seguro e informações do pacote.

```APIDOC
## POST /cart/items/reverse-logistics

### Description
Adiciona um item de logística reversa ao carrinho.

### Method
POST

### Endpoint
/cart/items/reverse-logistics

### Request Body
- **service** (integer) - Required - Código do serviço de logística reversa.
- **new_sender_mail** (string) - Required - E-mail do novo remetente.
- **new_sender_phone** (string) - Required - Telefone do novo remetente.
- **insurance_value** (number) - Required - Valor do seguro.
- **order_id** (string) - Optional - ID do pedido original.
- **package** (object) - Required - Informações do pacote.
  - **height** (integer) - Required - Altura do pacote em cm.
  - **width** (integer) - Required - Largura do pacote em cm.
  - **length** (integer) - Required - Comprimento do pacote em cm.
  - **weight** (number) - Required - Peso do pacote em kg.
- **options** (object) - Optional - Opções adicionais para o envio.
  - **own_hand** (boolean) - Optional - Serviço de mãos próprias.
  - **receipt** (boolean) - Optional - Aviso de recebimento.
  - **platform** (string) - Optional - Plataforma de origem.
  - **tags** (array) - Optional - Lista de tags associadas ao envio.
    - **tag** (string) - Required - Identificação do pedido na plataforma.
    - **Url** (string) - Required - URL da plataforma.
- **from** (object) - Optional - Informações do remetente (necessário para logística reversa de terceiros).
  - **name** (string) - Required - Nome do remetente.
  - **document** (string) - Required - CPF ou CNPJ do remetente.
  - **company_document** (string) - Optional - CNPJ da empresa (se aplicável).
  - **address** (string) - Required - Endereço do remetente.
  - **number** (string) - Required - Número do endereço.
  - **district** (string) - Required - Bairro do remetente.
  - **city** (string) - Required - Cidade do remetente.
  - **state_abbr** (string) - Required - Sigla do estado do remetente.
  - **postal_code** (string) - Required - CEP do remetente.
- **to** (object) - Optional - Informações do destinatário (necessário para logística reversa de terceiros).
  - **name** (string) - Required - Nome do destinatário.
  - **phone** (string) - Required - Telefone do destinatário.
  - **email** (string) - Required - E-mail do destinatário.
  - **document** (string) - Required - CPF ou CNPJ do destinatário.

### Request Example
```json
{
  "service": 1,
  "new_sender_mail": "remetente@melhorenvio.com",
  "new_sender_phone": "99 99999-9999",
  "insurance_value": 2.9,
  "order_id": "9c79c7bb-e365-4d92-8553-255d60bc28d0",
  "package": {
    "weight": 1.2,
    "height": 2,
    "width": 5,
    "length": 12
  },
  "options": {
    "own_hand": false,
    "receipt": false
  }
}
```

### Response
#### Success Response (200)
- **message** (string) - Mensagem de sucesso.
- **item_id** (string) - ID do item adicionado ao carrinho.

#### Response Example
```json
{
  "message": "Item de logística reversa adicionado ao carrinho com sucesso.",
  "item_id": "abc123xyz789"
}
```
```

--------------------------------

### Controller REST para Consulta de Frete

Source: https://docs.melhorenvio.com.br/discuss/651083c34fd729000d9ff4ba

Endpoint RESTful que utiliza o MelhorEnvioService para calcular o frete. Retorna a resposta do serviço ou um erro 500 Internal Server Error em caso de falha.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping(value = "/shipment")
public class CalculateShipping {

    @Autowired
    private MelhorEnvioService service;

    @PostMapping("/consult")
    public Mono<ResponseEntity<MelhorEnvioResponse>> calculateShipping() {
        return service.calculateShipping()
                .map(response -> ResponseEntity.ok(response))
                .onErrorResume(error -> Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()));
    }

}
```

--------------------------------

### Listar Telefones de uma Loja

Source: https://docs.melhorenvio.com.br/reference/listar-telefones-de-uma-loja

Recupera uma lista de números de telefone associados a uma loja específica. Você pode paginar os resultados usando o parâmetro `page`.

```APIDOC
## GET /v2/me/companies/{company_id}/phones

### Description
Recupera uma lista de números de telefone associados a uma loja específica.

### Method
GET

### Endpoint
/v2/me/companies/{company_id}/phones

### Parameters
#### Query Parameters
- **page** (integer) - Optional - O número da página a ser recuperada.

### Response
#### Success Response (200)
- **data** (array) - Uma lista de objetos de telefone.
  - **id** (integer) - O ID do telefone.
  - **number** (string) - O número de telefone.
  - **type** (string) - O tipo de telefone (ex: "comercial", "celular").
  - **ddd** (string) - O DDD do número de telefone.
- **links** (object) - Links de paginação.
  - **first** (string) - URL para a primeira página.
  - **last** (string) - URL para a última página.
  - **prev** (string) - URL para a página anterior.
  - **next** (string) - URL para a próxima página.
- **meta** (object) - Metadados da paginação.
  - **current_page** (integer) - O número da página atual.
  - **from** (integer) - O número do primeiro item da página.
  - **last_page** (integer) - O número da última página.
  - **last_page_url** (string) - URL para a última página.
  - **path** (string) - O caminho base da URL.
  - **per_page** (integer) - O número de itens por página.
  - **to** (integer) - O número do último item da página.
  - **total** (integer) - O número total de itens.

#### Response Example (200)
{
  "data": [
    {
      "id": 1,
      "number": "11987654321",
      "type": "celular",
      "ddd": "11"
    },
    {
      "id": 2,
      "number": "1133334444",
      "type": "comercial",
      "ddd": "11"
    }
  ],
  "links": {
    "first": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/bde0e453-1d10-4245-a447-d376ae24be55/phones?page=1",
    "last": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/bde0e453-1d10-4245-a447-d376ae24be55/phones?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "last_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/bde0e453-1d10-4245-a447-d376ae24be55/phones?page=1",
    "path": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/bde0e453-1d10-4245-a447-d376ae24be55/phones",
    "per_page": 10,
    "to": 2,
    "total": 2
  }
}

#### Error Response (404)
- **message** (string) - Mensagem de erro indicando que nenhum resultado foi encontrado.

#### Response Example (404)
{
  "message": "No query results for model [App\\Company]."
}
```

--------------------------------

### Exemplo de Resposta ao Cadastrar Loja

Source: https://docs.melhorenvio.com.br/reference/cadastrar-loja

Esta é a resposta esperada após o cadastro bem-sucedido de uma loja. Ela inclui os detalhes da loja cadastrada, como ID, data de criação e atualização.

```json
{
  "name": "Melhor Loja",
  "email": "contato@melhorenvio.com.br",
  "description": "Descrição da loja",
  "company_name": "Nome da Loja",
  "document": "89157108000104",
  "state_register": "476210979481",
  "id": "781f86be-c3be-47e7-9bef-70b8675a55c3",
  "updated_at": "2022-03-30 16:53:56",
  "created_at": "2022-03-30 16:53:56"
}
```

--------------------------------

### Classe de Requisição para Cálculo de Frete

Source: https://docs.melhorenvio.com.br/discuss/651083c34fd729000d9ff4ba

Define a estrutura de dados para a requisição de cálculo de frete na API do Melhor Envio. Inclui informações de remetente, destinatário, produtos e opções.

```java
import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MelhorEnvioRequest implements Serializable {

    private From from;
    private To to;
    private List<ProductDto> products;
    private Options options;

}
```

--------------------------------

### Exemplo de Resposta de Sucesso (Etiqueta Cancelável)

Source: https://docs.melhorenvio.com.br/reference/verificar-se-etiqueta-pode-ser-cancelada

Esta é uma resposta de sucesso indicando que a etiqueta com o ID fornecido é cancelável. O campo 'cancellable' é true e 'time' indica o tempo restante em segundos.

```json
{
  "04c13ada-68e6-41df-a2c6-ff5f3e7560f8": {
    "cancellable": true,
    "time": 0
  }
}
```

--------------------------------

### Inserir Fretes no Carrinho

Source: https://docs.melhorenvio.com.br/reference/inserir-fretes-no-carrinho

Adiciona uma etiqueta de frete ao carrinho de compras do Melhor Envio. O retorno incluirá o id da etiqueta gerada. Salve este `id` para os próximos passos (como o checkout e geração da etiqueta). Nessa rota, a integração deve utilizar os dados obtidos no retorno de uma cotação realizada previamente, além das informações do remetente, destinatário e dos pacotes.

```APIDOC
## POST /api/v2/me/cart

### Description
Adiciona uma etiqueta de frete ao carrinho de compras do Melhor Envio. O retorno incluirá o id da etiqueta gerada. Salve este `id` para os próximos passos (como o checkout e geração da etiqueta).

### Method
POST

### Endpoint
/api/v2/me/cart

### Request Body
- **service** (integer) - Required - ID do serviço de frete.
- **from** (object) - Required - Informações do remetente.
  - **name** (string) - Required - Nome do remetente.
  - **email** (string) - Required - Email do remetente.
  - **phone** (string) - Required - Telefone do remetente.
  - **document** (string) - Optional - CPF do remetente (Pessoa Física).
  - **company_document** (string) - Optional - CNPJ do remetente (Pessoa Jurídica).
  - **state_register** (string) - Optional - Inscrição Estadual do remetente.
  - **economic_activity_code** (string) - Optional - Código de atividade econômica (CNAE).
  - **address** (string) - Required - Endereço do remetente.
  - **complement** (string) - Optional - Complemento do endereço.
  - **number** (string) - Required - Número do endereço.
  - **district** (string) - Required - Bairro do remetente.
  - **city** (string) - Required - Cidade do remetente.
  - **postal_code** (string) - Required - CEP do remetente.
  - **state_abbr** (string) - Required - Sigla da UF do remetente.
- **to** (object) - Required - Informações do destinatário.
  - **name** (string) - Required - Nome do destinatário.
  - **email** (string) - Required - Email do destinatário.
  - **phone** (string) - Required - Telefone do destinatário.
  - **document** (string) - Optional - CPF do destinatário.
  - **state_register** (string) - Optional - Inscrição Estadual do destinatário.
  - **address** (string) - Required - Endereço do destinatário.
  - **complement** (string) - Optional - Complemento do endereço.
  - **number** (string) - Required - Número do endereço.
  - **district** (string) - Required - Bairro do destinatário.
  - **city** (string) - Required - Cidade do destinatário.
  - **postal_code** (string) - Required - CEP do destinatário.
  - **country_id** (string) - Optional - ID do país do destinatário.
  - **state_abbr** (string) - Required - Sigla da UF do destinatário.
- **volumes** (array) - Required - Array de objetos representando os pacotes.
  - **height** (float) - Required - Altura do pacote em cm.
  - **width** (float) - Required - Largura do pacote em cm.
  - **length** (float) - Required - Comprimento do pacote em cm.
  - **weight** (float) - Required - Peso do pacote em kg.
- **options** (object) - Optional - Opções adicionais para o frete.
  - **invoice** (object) - Optional - Informações da Nota Fiscal.
    - **key** (string) - Required - Chave da Nota Fiscal.
    - **xml_content** (string) - Optional - Conteúdo do XML da NFe.
  - **insurance_value** (float) - Optional - Valor do seguro do envio.
  - **platform** (string) - Optional - Nome da plataforma.
  - **tags** (string) - Optional - Identificação do pedido.
  - **reminder** (string) - Optional - Anotação para impressão da etiqueta.
  - **dce** (object) - Optional - Informações da Declaração de Conteúdo.
    - **key** (string) - Required - Chave da DCe.

### Request Example
```json
{
    "service": 4,
    "from": {
        "name": "Remetente",
        "email": "remetente@email.com",
        "phone": "11912345678",
        "document": "",
        "company_document": "46867029000176",
        "state_register": "",
        "economic_activity_code": "4687701",
        "address": "Rua do Remetente",
        "complement": "",
        "number": "1234",
        "district": "Bairro do Remetente",
        "city": "Cidade do Remetente",
        "postal_code": "09831510",
        "state_abbr": "SP"
    },
    "to": {
        "name": "Destinatário",
        "email": "destinatario@email.com",
        "phone": "41912345678",
        "document": "05596752088",
        "state_register": "ISENTO",
        "address": "Rua do Destinatário",
        "complement": "",
        "number": "1234",
        "district": "Bairro do Destinatário",
        "city": "Cidade do Destinatário",
        "postal_code": "11730000",
        "country_id": "BR",
        "state_abbr": "SP"
    },
    "products": [
        {
            "name": "Teste 1",
            "quantity": "1",
            "unitary_value": "400"
        },
        {
            "name": "Teste 2",
            "quantity": "1",
            "unitary_value": "500"
        }
    ],
    "volumes": [
        { "height": 43, "width": 60, "length": 70, "weight": 30 },
        { "height": 30, "width": 40, "length": 50, "weight": 10 }
    ],
    "options": {
        "insurance_value": 900,
        "platform": "Minha Plataforma",
        "tags": "ID12345",
        "reminder": "Entregar em horário comercial"
    }
}
```

### Response
#### Success Response (200)
- **id** (integer) - ID da etiqueta gerada.
- **url** (string) - URL para o checkout.

#### Response Example
```json
{
  "id": 12345,
  "url": "https://melhorenvio.com.br/checkout/abcdef1234567890"
}
```
```

--------------------------------

### Exemplo de Retorno com Múltiplos Pacotes

Source: https://docs.melhorenvio.com.br/docs/compra-de-fretes

This JSON structure represents the response when a shipping quote includes multiple packages. It details dimensions, weight, and product information for each package.

```json
{
    "packages": [
        {
            "price": "355.64",
            "discount": "88.26",
            "format": "box",
            "dimensions": {
                "height": 43,
                "width": 60,
                "length": 70
            },
            "weight": "30.00",
            "insurance_value": "3000.00",
            "products": [
                {
                    "id": "x",
                    "quantity": 3
                }
            ]
        },
        {
            "price": "100.50",
            "discount": "24.10",
            "format": "box",
            "dimensions": {
                "height": 30,
                "width": 40,
                "length": 50
            },
            "weight": "10.00",
            "insurance_value": "1000.00",
            "products": [
                {
                    "id": "y",
                    "quantity": 1
                }
            ]
        }
    ]
}
```

--------------------------------

### Montagem da URL de Redirecionamento OAuth

Source: https://docs.melhorenvio.com.br/reference/fluxo-de-autoriza%C3%A7%C3%A3o

Utilize esta URL para iniciar o fluxo de autorização OAuth. O usuário será redirecionado para a `redirect_uri` com um parâmetro `code` após autorizar o acesso.

```url
{{url}}/oauth/authorize?client_id={{client_id}}&redirect_uri={{callback}}&response_type=code&state=teste&scope={{permissao1}} {{permissao2}}
```

--------------------------------

### Import Python Requests Library

Source: https://docs.melhorenvio.com.br/discuss/63a19648f2772f01a28bf203

This snippet shows how to import the 'requests' library in Python, commonly used for making HTTP requests to APIs.

```python
import requests
```

--------------------------------

### Listar Transportadoras

Source: https://docs.melhorenvio.com.br/reference/listar-transportadoras

Este endpoint lista todas as transportadoras disponíveis e seus serviços.

```APIDOC
## GET /api/v2/me/shipment/companies

### Description
Lista todas as transportadoras disponíveis.

### Method
GET

### Endpoint
/api/v2/me/shipment/companies

### Parameters
#### Header Parameters
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

### Response
#### Success Response (200)
- **id** (integer) - Identificador único da transportadora.
- **name** (string) - Nome da transportadora.
- **picture** (string) - URL da imagem da transportadora.
- **services** (array) - Lista de serviços oferecidos pela transportadora.
  - **id** (integer) - Identificador único do serviço.
  - **name** (string) - Nome do serviço.
  - **type** (string) - Tipo do serviço (ex: normal, express).
  - **range** (string) - Abrangência do serviço (ex: interstate).
  - **restrictions** (object) - Restrições do serviço.
    - **insurance_value** (object) - Limites de valor para seguro.
      - **min** (number) - Valor mínimo.
      - **max** (number) - Valor máximo.
    - **formats** (object) - Restrições de formato para o envio.
      - **box** (object) - Restrições para caixas.
        - **weight** (object) - Limites de peso.
          - **min** (number) - Peso mínimo.
          - **max** (number) - Peso máximo.
        - **width** (object) - Limites de largura.
          - **min** (number) - Largura mínima.
          - **max** (number) - Largura máxima.
        - **height** (object) - Limites de altura.
          - **min** (number) - Altura mínima.
          - **max** (number) - Altura máxima.
        - **length** (object) - Limites de comprimento.
          - **min** (number) - Comprimento mínimo.
          - **max** (number) - Comprimento máximo.
        - **sum** (integer) - Soma máxima das dimensões (largura + altura + comprimento).
      - **roll** (object) - Restrições para rolos.
        - **weight** (object) - Limites de peso.
          - **min** (number) - Peso mínimo.
          - **max** (number) - Peso máximo.
        - **diameter** (object) - Limites de diâmetro.
          - **min** (number) - Diâmetro mínimo.
          - **max** (number) - Diâmetro máximo.
        - **length** (object) - Limites de comprimento.
          - **min** (number) - Comprimento mínimo.
          - **max** (number) - Comprimento máximo.
        - **sum** (integer) - Soma máxima das dimensões (diâmetro + comprimento).
      - **letter** (object) - Restrições para cartas.
        - **weight** (object) - Limites de peso.
          - **min** (number) - Peso mínimo.
          - **max** (number) - Peso máximo.
        - **width** (object) - Limites de largura.
          - **min** (number) - Largura mínima.
          - **max** (number) - Largura máxima.
        - **length** (object) - Limites de comprimento.
          - **min** (number) - Comprimento mínimo.
          - **max** (number) - Comprimento máximo.
  - **requirements** (array) - Lista de requisitos para o serviço (ex: names, addresses).
  - **optionals** (array) - Lista de opcionais para o serviço (ex: AR, MP, VD).
  - **company** (object) - Informações da transportadora associada ao serviço.
    - **id** (integer) - Identificador único da transportadora.
    - **name** (string) - Nome da transportadora.
    - **status** (string) - Status da transportadora (ex: available).
    - **picture** (string) - URL da imagem da transportadora.
    - **use_own_contract** (boolean) - Indica se a transportadora utiliza contrato próprio.

### Response Example
#### Success Response (200)
```json
[
  {
    "id": 1,
    "name": "Correios",
    "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png",
    "services": [
      {
        "id": 1,
        "name": "PAC",
        "type": "normal",
        "range": "interstate",
        "restrictions": {
          "insurance_value": {
            "min": 0,
            "max": 3000
          },
          "formats": {
            "box": {
              "weight": {
                "min": 0.001,
                "max": 30
              },
              "width": {
                "min": 11,
                "max": 105
              },
              "height": {
                "min": 2,
                "max": 105
              },
              "length": {
                "min": 16,
                "max": 105
              },
              "sum": 200
            },
            "roll": {
              "weight": {
                "min": 0.001,
                "max": 30
              },
              "diameter": {
                "min": 5,
                "max": 91
              },
              "length": {
                "min": 18,
                "max": 105
              },
              "sum": 200
            },
            "letter": {
              "weight": {
                "min": 0.001,
                "max": 0.5
              },
              "width": {
                "min": 11,
                "max": 60
              },
              "length": {
                "min": 16,
                "max": 60
              }
            }
          }
        },
        "requirements": [
          "names",
          "addresses"
        ],
        "optionals": [
          "AR",
          "MP",
          "VD"
        ],
        "company": {
          "id": 1,
          "name": "Correios",
          "status": "available",
          "picture": "/images/shipping-companies/correios.png",
          "use_own_contract": false
        }
      },
      {
        "id": 2,
        "name": "SEDEX",
        "type": "express",
        "range": "interstate",
        "restrictions": {
          "insurance_value": {
            "min": 0,
            "max": 10000
          },
          "formats": {
            "box": {
              "weight": {
                "min": 0.001,
                "max": 30
              },
              "width": {
                "min": 11,
                "max": 105
              },
              "height": {
                "min": 2,
                "max": 105
              },
              "length": {
                "min": 16,
                "max": 105
              },
              "sum": 200
            },
            "roll": {
              "weight": {
                "min": 0.001,
                "max": 30
              },
              "diameter": {
                "min": 5,
                "max": 91
              },
              "length": {
                "min": 18,
                "max": 105
              },
              "sum": 200
            },
            "letter": {
              "weight": {
                "min": 0.001,
                "max": 0.5
              },
              "width": {
                "min": 11,
                "max": 60
              },
              "length": {
                "min": 16,
                "max": 60
              }
            }
          }
        },
        "requirements": [
          "names",
          "addresses"
        ],
        "optionals": [
          "AR",
          "MP"
        ],
        "company": {
          "id": 1,
          "name": "Correios",
          "status": "available",
          "picture": "/images/shipping-companies/correios.png",
          "use_own_contract": false
        }
      }
    ]
  }
]
```
```

--------------------------------

### Inserir Fretes no Carrinho

Source: https://docs.melhorenvio.com.br/reference/inserir-fretes-no-carrinho

Este endpoint permite adicionar um ou mais fretes ao carrinho de compras. É necessário fornecer detalhes completos do remetente, destinatário, serviço de transporte e informações dos produtos.

```APIDOC
## POST /api/v2/me/cart

### Description
Adiciona fretes ao carrinho de compras.

### Method
POST

### Endpoint
/api/v2/me/cart

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - O User-Agent deve conter o nome da sua aplicação e um e-mail de contato técnico.

#### Request Body
- **service** (integer) - Required - Id referente do serviço da transportadora
- **agency** (integer) - Optional - Id da agência/unidade onde será postado o envio (consultar regras das transportadoras)
- **from** (object) - Required - Informações do remetente do envio
  - **name** (string) - Required - Nome
  - **phone** (string) - Required - Telefone
  - **email** (string) - Required - E-mail
  - **document** (string) - Required - CPF
  - **company_document** (string) - Required - CNPJ
  - **state_register** (string) - Optional - Inscrição Estadual
  - **address** (string) - Required - Logradouro
  - **complement** (string) - Optional - Complemento
  - **number** (string) - Required - Número
  - **district** (string) - Required - Bairro
  - **city** (string) - Required - Cidade
  - **country_id** (string) - Required - País
  - **postal_code** (string) - Required - Cep
  - **state_abbr** (string) - Required - Estado
  - **note** (string) - Optional - Observação
- **to** (object) - Required - Informações do destinatário do envio
  - **name** (string) - Required - Nome
  - **phone** (string) - Required - Telefone
  - **email** (string) - Required - E-mail
  - **document** (string) - Required - CPF
  - **company_document** (string) - Optional - CNPJ
  - **state_register** (string) - Optional - Inscrição Estadual
  - **address** (string) - Required - Logradouro
  - **complement** (string) - Optional - Complemento
  - **number** (string) - Required - Número
  - **district** (string) - Required - Bairro
  - **city** (string) - Required - Cidade
  - **country_id** (string) - Required - País
  - **postal_code** (string) - Required - Cep
  - **state_abbr** (string) - Required - Estado
  - **note** (string) - Optional - Observação
- **products** (array) - Required - Lista de produtos a serem enviados
  - **name** (string) - Required - Nome do produto
  - **description** (string) - Optional - Descrição do produto
  - **amount** (integer) - Required - Quantidade de itens
  - **weight** (number) - Required - Peso do produto em kg
  - **value** (number) - Required - Valor do produto
  - **sku** (string) - Optional - Código SKU do produto
  - **height** (number) - Optional - Altura do produto em cm
  - **width** (number) - Optional - Largura do produto em cm
  - **length** (number) - Optional - Comprimento do produto em cm
- **volumes** (array) - Optional - Lista de volumes (se aplicável)
  - **service** (integer) - Required - Id referente do serviço da transportadora
  - **agency** (integer) - Optional - Id da agência/unidade onde será postado o envio (consultar regras das transportadoras)
  - **from** (object) - Required - Informações do remetente do envio
    - **name** (string) - Required - Nome
    - **phone** (string) - Required - Telefone
    - **email** (string) - Required - E-mail
    - **document** (string) - Required - CPF
    - **company_document** (string) - Optional - CNPJ
    - **state_register** (string) - Optional - Inscrição Estadual
    - **address** (string) - Required - Logradouro
    - **complement** (string) - Optional - Complemento
    - **number** (string) - Required - Número
    - **district** (string) - Required - Bairro
    - **city** (string) - Required - Cidade
    - **country_id** (string) - Required - País
    - **postal_code** (string) - Required - Cep
    - **state_abbr** (string) - Required - Estado
    - **note** (string) - Optional - Observação
  - **to** (object) - Required - Informações do destinatário do envio
    - **name** (string) - Required - Nome
    - **phone** (string) - Required - Telefone
    - **email** (string) - Required - E-mail
    - **document** (string) - Required - CPF
    - **company_document** (string) - Optional - CNPJ
    - **state_register** (string) - Optional - Inscrição Estadual
    - **address** (string) - Required - Logradouro
    - **complement** (string) - Optional - Complemento
    - **number** (string) - Required - Número
    - **district** (string) - Required - Bairro
    - **city** (string) - Required - Cidade
    - **country_id** (string) - Required - País
    - **postal_code** (string) - Required - Cep
    - **state_abbr** (string) - Required - Estado
    - **note** (string) - Optional - Observação
  - **products** (array) - Required - Lista de produtos a serem enviados
    - **name** (string) - Required - Nome do produto
    - **description** (string) - Optional - Descrição do produto
    - **amount** (integer) - Required - Quantidade de itens
    - **weight** (number) - Required - Peso do produto em kg
    - **value** (number) - Required - Valor do produto
    - **sku** (string) - Optional - Código SKU do produto
    - **height** (number) - Optional - Altura do produto em cm
    - **width** (number) - Optional - Largura do produto em cm
    - **length** (number) - Optional - Comprimento do produto em cm

### Request Example
```json
{
  "service": 1,
  "from": {
    "name": "Remetente Exemplo",
    "phone": "11999999999",
    "email": "remetente@exemplo.com",
    "document": "11111111111",
    "company_document": "11111111000111",
    "address": "Rua Exemplo",
    "complement": "Apto 101",
    "number": "123",
    "district": "Centro",
    "city": "São Paulo",
    "country_id": "BRA",
    "postal_code": "01000000",
    "state_abbr": "SP"
  },
  "to": {
    "name": "Destinatário Exemplo",
    "phone": "21999999999",
    "email": "destinatario@exemplo.com",
    "document": "22222222222",
    "address": "Avenida Exemplo",
    "number": "456",
    "district": "Copacabana",
    "city": "Rio de Janeiro",
    "country_id": "BRA",
    "postal_code": "20000000",
    "state_abbr": "RJ"
  },
  "products": [
    {
      "name": "Produto Exemplo 1",
      "amount": 1,
      "weight": 0.5,
      "value": 50.00,
      "sku": "SKU001",
      "height": 10,
      "width": 10,
      "length": 10
    },
    {
      "name": "Produto Exemplo 2",
      "amount": 2,
      "weight": 0.2,
      "value": 25.00
    }
  ]
}
```

### Response
#### Success Response (200)
- **id** (integer) - ID do frete no carrinho
- **total** (number) - Valor total do frete
- **object_id** (string) - ID do objeto do frete
- **service_name** (string) - Nome do serviço de transporte
- **company** (string) - Nome da transportadora
- **from** (object) - Informações do remetente
- **to** (object) - Informações do destinatário
- **products** (array) - Lista de produtos
- **volumes** (array) - Lista de volumes

#### Response Example
```json
{
  "id": 12345,
  "total": 75.50,
  "object_id": "xyz789",
  "service_name": "Expresso",
  "company": "Transportadora Exemplo",
  "from": {
    "name": "Remetente Exemplo",
    "phone": "11999999999",
    "email": "remetente@exemplo.com",
    "document": "11111111111",
    "company_document": "11111111000111",
    "address": "Rua Exemplo",
    "complement": "Apto 101",
    "number": "123",
    "district": "Centro",
    "city": "São Paulo",
    "country_id": "BRA",
    "postal_code": "01000000",
    "state_abbr": "SP"
  },
  "to": {
    "name": "Destinatário Exemplo",
    "phone": "21999999999",
    "email": "destinatario@exemplo.com",
    "document": "22222222222",
    "address": "Avenida Exemplo",
    "number": "456",
    "district": "Copacabana",
    "city": "Rio de Janeiro",
    "country_id": "BRA",
    "postal_code": "20000000",
    "state_abbr": "RJ"
  },
  "products": [
    {
      "name": "Produto Exemplo 1",
      "amount": 1,
      "weight": 0.5,
      "value": 50.00,
      "sku": "SKU001",
      "height": 10,
      "width": 10,
      "length": 10
    },
    {
      "name": "Produto Exemplo 2",
      "amount": 2,
      "weight": 0.2,
      "value": 25.00
    }
  ],
  "volumes": []
}
```
```

--------------------------------

### Declaração de Conteúdo sem Nota Fiscal

Source: https://docs.melhorenvio.com.br/discuss/686432bb0b3f610037166eaa

Para emitir uma etiqueta sem nota fiscal, defina a flag "non_commercial" como true e envie o campo "invoice"."key" vazio. É importante informar os dados dos produtos para que a declaração de conteúdo seja preenchida corretamente.

```json
{
"order_uuid": "d0a0164b-e5e6-4513-a936-e65d110778a8",
"service_id": 3,
"from": {
"name" : "Mateus Soares Reis",
"phone":"21 981425950",
"email": "mateus.msr.soares@gmail.com",
"document":"14779686792",
"address":"Rua aldir Pires",
"number":"9",
"district": "Realengo",
"city": "Rio de Janeiro",
"state":"RJ",
"country_id": "BR",
"zip_code":"21720590"
},
"to": {
"name" : "Jorge Wilson de Oliveira Reis",
"phone":"21 981425950",
"email": "jorge@jorge.com",
"document":"68767218768",
"address":"Rua virginia Torezin forte",
"number":"139",
"district": "guarapiranga",
"city": "São Paulo",
"state":"RJ",
"country_id": "BR",
"zip_code":"04910070"
},
"products" : [
{
"id": "PROD-001", 
"name": "PROD-001", 
"width": 15, 
"height": 5, 
"length": 20, 
"weight": 0.5, 
"quantity": 1,
"insurance_value": 24.50 ,
"amount":  24.50 
}
],
"options":{
"reverse": false,
"non_commercial":true
}

}
```

--------------------------------

### Calculate Shipping by Package

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

Calculate shipping costs by providing overall package dimensions and weight. This includes origin and destination postal codes, and package details.

```APIDOC
## POST /shipping/quote

### Description
Calculates shipping costs based on package details.

### Method
POST

### Endpoint
/shipping/quote

### Request Body
- **from** (object) - Required - Origin details.
  - **postal_code** (string) - Required - Origin postal code.
- **to** (object) - Required - Destination details.
  - **postal_code** (string) - Required - Destination postal code.
- **package** (object) - Required - Package details.
  - **height** (integer) - Required - Package height in centimeters.
  - **width** (integer) - Required - Package width in centimeters.
  - **length** (integer) - Required - Package length in centimeters.
  - **weight** (number) - Required - Package weight in kilograms.

### Request Example
```json
{
  "from": {
    "postal_code": "01002001"
  },
  "to": {
    "postal_code": "90570020"
  },
  "package": {
    "height": 4,
    "width": 12,
    "length": 17,
    "weight": 0.3
  }
}
```

### Response
#### Success Response (200)
- **Example**: (Response structure not fully defined in source, but implies a result object)
```json
{
  "example": "response body"
}
```
```

--------------------------------

### Exemplo de Resposta de Erro (Dados Inválidos)

Source: https://docs.melhorenvio.com.br/reference/verificar-se-etiqueta-pode-ser-cancelada

Esta resposta indica que os dados fornecidos na requisição são inválidos. O campo 'errors' detalha os problemas encontrados, como um ID de pedido inválido.

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "orders.0": [
      "O campo orders.0 selecionado é inválido."
    ]
  }
}
```

--------------------------------

### Listar Lojas do Usuário - OpenAPI Definition

Source: https://docs.melhorenvio.com.br/reference/listar-lojas-do-usuario

Definição OpenAPI para o endpoint que lista as lojas do usuário. Requer cabeçalhos específicos como Accept, Content-type, Authorization e User-Agent.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/companies": {
      "get": {
        "summary": "Listar lojas do usuário",
        "description": "Cadastro e informações das lojas",
        "operationId": "listar-lojas-do-usuario",
        "parameters": [
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Content-type",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"current_page\": 1,\n  \"data\": [\n    {\n      \"id\": \"bde0e453-1d10-4245-a447-d376ae24be55\",\n      \"protocol\": \"COM-2021063464\",\n      \"name\": \"Minha Loja teste\",\n      \"email\": null,\n      \"website\": null,\n      \"picture\": null,\n      \"thumbnail\": null,\n      \"description\": null,\n      \"company_name\": null,\n      \"document\": null,\n      \"state_register\": null,\n      \"created_at\": \"2021-06-22 12:17:38\",\n      \"updated_at\": \"2021-06-22 12:17:38\"\n    }\n  ],\n  \"first_page_url\": \"https://sandbox.melhorenvio.com.br/api/v2/me/companies?page=1\",\n  \"from\": 1,\n  \"last_page\": 1,\n  \"last_page_url\": \"https://sandbox.melhorenvio.com.br/api/v2/me/companies?page=1\",\n  \"next_page_url\": null,\n  \"path\": \"https://sandbox.melhorenvio.com.br/api/v2/me/companies\",\n  \"per_page\": 10,\n  \"prev_page_url\": null,\n  \"to\": 1,\n  \"total\": 1\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "current_page": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "bde0e453-1d10-4245-a447-d376ae24be55"
                          },
                          "protocol": {
                            "type": "string",
                            "example": "COM-2021063464"
                          },
                          "name": {
                            "type": "string",
                            "example": "Minha Loja teste"
                          },
                          "email": {},
                          "website": {},
                          "picture": {},
                          "thumbnail": {},
                          "description": {},
                          "company_name": {},
                          "document": {},
                          "state_register": {},
                          "created_at": {
                            "type": "string",
                            "example": "2021-06-22 12:17:38"
                          },
                          "updated_at": {
                            "type": "string",
                            "example": "2021-06-22 12:17:38"
                          }
                        }
                      }
                    },
                    "first_page_url": {
                      "type": "string",
                      "example": "https://sandbox.melhorenvio.com.br/api/v2/me/companies?page=1"
                    },
                    "from": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "last_page": {
                      "type": "integer"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

--------------------------------

### Erro de Cadastro de Webhook

Source: https://docs.melhorenvio.com.br/discuss/680c275b7b1e110045455dda

Este erro indica que a URL do webhook respondeu com um status inválido (403) durante a requisição de teste. Pode ser necessário solicitar o desbloqueio do uso de webhook ou verificar as configurações de rede e segurança.

```text
E-WBH-0002: A URL respondeu a requisição de teste com status inválido 403.

```

--------------------------------

### Exemplo de Resposta de Sucesso na Impressão de Etiquetas

Source: https://docs.melhorenvio.com.br/reference/impressao-de-etiquetas-em-arquivo

Esta resposta indica que a solicitação de impressão de etiquetas foi bem-sucedida. O URL retornado aponta para o arquivo da etiqueta gerada.

```json
{
"https://me-0047-prod.s3.amazonaws.com/...."
}
```

--------------------------------

### Exemplo de Falha na Impressão de Etiquetas - Token Inválido

Source: https://docs.melhorenvio.com.br/reference/impressao-de-etiquetas-em-arquivo

Esta resposta de erro ocorre quando o token de autenticação fornecido não é válido ou expirou. Certifique-se de que o token de acesso esteja correto e ativo.

```json
{
"message": "Unauthenticated"
}
```

--------------------------------

### Estrutura de Dados de Volume do Item

Source: https://docs.melhorenvio.com.br/reference/exibir-informacoes-de-item-do-carrinho

Define a estrutura de dados para volumes de um item no carrinho, incluindo dimensões e peso. Use esta estrutura para representar detalhes físicos de um item.

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "example": 101609,
        "default": 0
      },
      "height": {
        "type": "string",
        "example": "10.00"
      },
      "width": {
        "type": "string",
        "example": "15.00"
      },
      "length": {
        "type": "string",
        "example": "20.00"
      },
      "diameter": {
        "type": "string",
        "example": "0.00"
      },
      "weight": {
        "type": "string",
        "example": "3.50"
      },
      "format": {
        "type": "string",
        "example": "box"
      },
      "created_at": {
        "type": "string",
        "example": "2022-03-29 14:17:08"
      },
      "updated_at": {
        "type": "string",
        "example": "2022-03-29 14:17:08"
      }
    }
  }
}
```

--------------------------------

### Calculate Shipping by Products

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

Calculate shipping costs by providing details for individual products. This includes origin and destination postal codes, and a list of products with their dimensions, weight, insurance value, and quantity.

```APIDOC
## POST /shipping/quote

### Description
Calculates shipping costs based on product details.

### Method
POST

### Endpoint
/shipping/quote

### Request Body
- **from** (object) - Required - Origin details.
  - **postal_code** (string) - Required - Origin postal code.
- **to** (object) - Required - Destination details.
  - **postal_code** (string) - Required - Destination postal code.
- **products** (array) - Required - List of products.
  - **id** (string) - Required - Product identifier.
  - **width** (integer) - Required - Product width in centimeters.
  - **height** (integer) - Required - Product height in centimeters.
  - **length** (integer) - Required - Product length in centimeters.
  - **weight** (number) - Required - Product weight in kilograms.
  - **insurance_value** (number) - Required - Value of the product for insurance calculation.
  - **quantity** (integer) - Required - Number of units of the product.

### Request Example
```json
{
  "from": {
    "postal_code": "96020360"
  },
  "to": {
    "postal_code": "01018020"
  },
  "products": [
    {
      "id": "x",
      "width": 11,
      "height": 17,
      "length": 11,
      "weight": 0.3,
      "insurance_value": 10.1,
      "quantity": 1
    },
    {
      "id": "y",
      "width": 16,
      "height": 25,
      "length": 11,
      "weight": 0.3,
      "insurance_value": 55.05,
      "quantity": 2
    },
    {
      "id": "z",
      "width": 22,
      "height": 30,
      "length": 11,
      "weight": 1,
      "insurance_value": 30,
      "quantity": 1
    }
  ]
}
```

### Response
#### Success Response (200)
- **Example**: (Response structure not fully defined in source, but implies a result object)
```json
{
  "example": "response body"
}
```
```

--------------------------------

### Geração de Etiquetas

Source: https://docs.melhorenvio.com.br/reference/geracao-de-etiquetas

Este endpoint permite a geração de etiquetas de envio em massa, recebendo uma lista de IDs de pedidos.

```APIDOC
## POST /api/v2/me/shipment/generate

### Description
Este endpoint permite a geração de etiquetas de envio em massa, recebendo uma lista de IDs de pedidos.

### Method
POST

### Endpoint
/api/v2/me/shipment/generate

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

#### Request Body
- **orders** (array) - Required - Lista de IDs de pedidos a serem processados.
  - items (string)

### Request Example
```json
{
  "orders": [
    "b1ad6622-50b0-4e96-b395-730544e60085"
  ]
}
```

### Response
#### Success Response (200)
- **status** (boolean) - Indica se a operação foi bem-sucedida.
- **message** (string) - Mensagem de status da operação.

#### Response Example
```json
{
  "b1ad6622-50b0-4e96-b395-730544e60085": {
    "status": true,
    "message": "Envio gerado com sucesso"
  }
}
```

#### Error Response (422)
- **message** (string) - Mensagem de erro geral.
- **errors** (object) - Objeto contendo detalhes dos erros de validação.
  - **orders.0** (array) - Lista de erros específicos para o campo orders.0.

#### Response Example
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "orders.0": [
      "O campo orders.0 deve ser uma string.",
      "O campo orders.0 deve ter pelo menos 36 caracteres."
    ]
  }
}
```
```

--------------------------------

### Response with Insurance Value Applied Only to First Volume

Source: https://docs.melhorenvio.com.br/discuss/67ae194c9c0e48006fc7cddb

This response illustrates the issue where 'insurance_value' in 'options' is applied to the first package, while the second package's insurance value remains at its default.

```json
{
  "id": 34,
  "name": "Loggi Ponto",
  "price": "21.67",
  "custom_price": "21.67",
  "discount": "0.00",
  "currency": "R$",
  "delivery_time": 4,
  "delivery_range": {
    "min": 3,
    "max": 4
  },
  "custom_delivery_time": 4,
  "custom_delivery_range": {
    "min": 3,
    "max": 4
  },
  "packages": [
    {
      "price": "11.17",
      "discount": "0.00",
      "format": "box",
      "weight": "1.00",
      "insurance_value": "150.00",
      "dimensions": {
        "height": 10,
        "width": 10,
        "length": 15
      }
    },
    {
      "price": "10.50",
      "discount": "0.00",
      "format": "box",
      "weight": "2.00",
      "insurance_value": "1.00",
      "dimensions": {
        "height": 20,
        "width": 20,
        "length": 20
      }
    }
  ],
  "additional_services": {
    "receipt": false,
    "own_hand": false,
    "collect": false
  },
  "additional": {
    "unit": {
      "price": 0,
      "delivery": 0
    }
  },
  "company": {
    "id": 14,
    "name": "Loggi",
    "picture": "https://www.melhorenvio.com.br/images/shipping-companies/loggi.png"
  }
}
```

--------------------------------

### Criar Envio

Source: https://docs.melhorenvio.com.br/reference/compra-de-fretes-1

Este endpoint permite a criação de um novo envio, especificando os detalhes do remetente, destinatário e do serviço de frete.

```APIDOC
## POST /api/v2/shipping/calculator

### Description
Calcula e cria um envio com base nos detalhes fornecidos.

### Method
POST

### Endpoint
/api/v2/shipping/calculator

### Request Body
- **from** (object) - Required - Informações do remetente.
  - **name** (string) - Required - Nome do remetente.
  - **phone** (string) - Required - Telefone do remetente.
  - **email** (string) - Required - Email do remetente.
  - **document** (string) - Required - CPF ou CNPJ do remetente.
  - **company_document** (string) - Optional - CNPJ da empresa.
  - **state_register** (string) - Optional - Inscrição estadual.
  - **postal_code** (string) - Required - CEP do remetente.
  - **address** (string) - Required - Endereço do remetente.
  - **location_number** (string) - Required - Número do local.
  - **complement** (string) - Optional - Complemento do endereço.
  - **district** (string) - Required - Bairro do remetente.
  - **city** (string) - Required - Cidade do remetente.
  - **state_abbr** (string) - Required - Sigla do estado do remetente.
  - **country_id** (string) - Required - ID do país.
  - **latitude** (object) - Optional - Coordenadas de latitude.
  - **longitude** (object) - Optional - Coordenadas de longitude.
  - **note** (string) - Optional - Observações sobre o endereço.
- **to** (object) - Required - Informações do destinatário.
  - **name** (string) - Required - Nome do destinatário.
  - **phone** (string) - Required - Telefone do destinatário.
  - **email** (string) - Required - Email do destinatário.
  - **document** (string) - Required - CPF ou CNPJ do destinatário.
  - **company_document** (string) - Optional - CNPJ da empresa.
  - **state_register** (string) - Optional - Inscrição estadual.
  - **postal_code** (string) - Required - CEP do destinatário.
  - **address** (string) - Required - Endereço do destinatário.
  - **location_number** (string) - Required - Número do local.
  - **complement** (string) - Optional - Complemento do endereço.
  - **district** (string) - Required - Bairro do destinatário.
  - **city** (string) - Required - Cidade do destinatário.
  - **state_abbr** (string) - Required - Sigla do estado do destinatário.
  - **country_id** (string) - Required - ID do país.
  - **latitude** (object) - Optional - Coordenadas de latitude.
  - **longitude** (object) - Optional - Coordenadas de longitude.
  - **note** (string) - Optional - Observações sobre o endereço.
- **service** (object) - Required - Detalhes do serviço de frete.
  - **service_code** (string) - Required - Código do serviço de frete.
  - **package_type** (string) - Required - Tipo de pacote.
  - **total_price** (string) - Required - Preço total do frete.
  - **quantity** (integer) - Required - Quantidade de pacotes.
  - **subtotal** (string) - Required - Subtotal do frete.
  - **insurance_value** (string) - Required - Valor do seguro.
  - **receipt** (boolean) - Required - Indica se deseja recibo.
  - **own_hand** (boolean) - Required - Indica se deseja entrega em mãos.
  - **க்கூ** (boolean) - Required - Indica se deseja aviso de recebimento.
  - **platform** (string) - Optional - Plataforma de origem.
  - **platform_code** (string) - Optional - Código da plataforma.
  - **platform_order_number** (string) - Optional - Número do pedido na plataforma.
  - **platform_order_date** (string) - Optional - Data do pedido na plataforma.
  - **platform_order_status** (string) - Optional - Status do pedido na plataforma.
  - **platform_order_total** (string) - Optional - Valor total do pedido na plataforma.
  - **platform_order_weight** (string) - Optional - Peso total do pedido na plataforma.
  - **platform_order_weight_unit** (string) - Optional - Unidade de peso do pedido na plataforma.
  - **platform_order_volume** (string) - Optional - Volume total do pedido na plataforma.
  - **platform_order_volume_unit** (string) - Optional - Unidade de volume do pedido na plataforma.
  - **platform_order_dimensions** (string) - Optional - Dimensões do pedido na plataforma.
  - **platform_order_dimensions_unit** (string) - Optional - Unidade de dimensões do pedido na plataforma.
  - **platform_order_items** (array) - Optional - Itens do pedido na plataforma.
    - **sku** (string) - Required - SKU do item.
    - **description** (string) - Required - Descrição do item.
    - **quantity** (integer) - Required - Quantidade do item.
    - **price** (string) - Required - Preço do item.
    - **weight** (string) - Required - Peso do item.
    - **weight_unit** (string) - Required - Unidade de peso do item.
    - **volume** (string) - Required - Volume do item.
    - **volume_unit** (string) - Required - Unidade de volume do item.
    - **dimensions** (string) - Required - Dimensões do item.
    - **dimensions_unit** (string) - Required - Unidade de dimensões do item.
    - **url** (string) - Optional - URL do item.
    - **image_url** (string) - Optional - URL da imagem do item.
    - **additional_details** (string) - Optional - Detalhes adicionais do item.

### Response
#### Success Response (200)
- **id** (string) - ID do envio.
- **tracking_code** (string) - Código de rastreamento do envio.
- **url** (string) - URL para acompanhamento do envio.
- **status** (string) - Status atual do envio.
- **created_at** (string) - Data de criação do envio.
- **updated_at** (string) - Data de atualização do envio.
- **service** (object) - Detalhes do serviço de frete.
  - **name** (string) - Nome do serviço.
  - **description** (string) - Descrição do serviço.
  - **price** (string) - Preço do serviço.
  - **custom_price** (string) - Preço customizado do serviço.
  - **discount** (string) - Desconto aplicado ao serviço.
  - **insurance_price** (string) - Preço do seguro.
  - **custom_insurance_price** (string) - Preço customizado do seguro.
  - **receipt** (boolean) - Indica se o recibo foi solicitado.
  - **own_hand** (boolean) - Indica se a entrega foi em mãos.
  - **க்கூ** (boolean) - Indica se o aviso de recebimento foi solicitado.
  - **platform** (string) - Plataforma de origem.
  - **platform_code** (string) - Código da plataforma.
  - **platform_order_number** (string) - Número do pedido na plataforma.
  - **platform_order_date** (string) - Data do pedido na plataforma.
  - **platform_order_status** (string) - Status do pedido na plataforma.
  - **platform_order_total** (string) - Valor total do pedido na plataforma.
  - **platform_order_weight** (string) - Peso total do pedido na plataforma.
  - **platform_order_weight_unit** (string) - Unidade de peso do pedido na plataforma.
  - **platform_order_volume** (string) - Volume total do pedido na plataforma.
  - **platform_order_volume_unit** (string) - Unidade de volume do pedido na plataforma.
  - **platform_order_dimensions** (string) - Dimensões do pedido na plataforma.
  - **platform_order_dimensions_unit** (string) - Unidade de dimensões do pedido na plataforma.
  - **platform_order_items** (array) - Itens do pedido na plataforma.
    - **sku** (string) - SKU do item.
    - **description** (string) - Descrição do item.
    - **quantity** (integer) - Quantidade do item.
    - **price** (string) - Preço do item.
    - **weight** (string) - Peso do item.
    - **weight_unit** (string) - Unidade de peso do item.
    - **volume** (string) - Volume do item.
    - **volume_unit** (string) - Unidade de volume do item.
    - **dimensions** (string) - Dimensões do item.
    - **dimensions_unit** (string) - Unidade de dimensões do item.
    - **url** (string) - URL do item.
    - **image_url** (string) - URL da imagem do item.
    - **additional_details** (string) - Detalhes adicionais do item.

### Request Example
```json
{
  "from": {
    "name": "Melhor Envio Teste",
    "phone": "1199999999",
    "email": "melhorenvio@teste.com",
    "document": "11111111111",
    "postal_code": "06230000",
    "address": "Avenida das Nações Unidas",
    "location_number": "100",
    "complement": "CASA",
    "district": "Bairro Teste",
    "city": "Guarulhos",
    "state_abbr": "SP",
    "country_id": "BR",
    "note": "observação"
  },
  "to": {
    "name": "Melhor Envio Teste",
    "phone": "1999999999",
    "email": "melhorenvio@teste.com",
    "document": "73646548010",
    "postal_code": "26210000",
    "address": "Avenida Marechal Floriano Peixoto",
    "location_number": "123",
    "complement": "Ap 2",
    "district": "Centro",
    "city": "Nova Iguacu",
    "state_abbr": "RJ",
    "country_id": "BR",
    "note": "observação"
  },
  "service": {
    "service_code": "sedex",
    "package_type": "custom",
    "total_price": "100.50",
    "quantity": 1,
    "subtotal": "90.00",
    "insurance_value": "10.50",
    "receipt": true,
    "own_hand": false,
    "க்கூ": false
  }
}
```

### Response Example
```json
{
  "id": "12345",
  "tracking_code": "ABC123XYZ",
  "url": "https://melhorenvio.com.br/tracking/ABC123XYZ",
  "status": "pending",
  "created_at": "2023-10-27T10:00:00-03:00",
  "updated_at": "2023-10-27T10:00:00-03:00",
  "service": {
    "name": "Sedex",
    "description": "Serviço de entrega expressa",
    "price": "100.50",
    "custom_price": null,
    "discount": "0.00",
    "insurance_price": "10.50",
    "custom_insurance_price": null,
    "receipt": true,
    "own_hand": false,
    "க்கூ": false,
    "platform": null,
    "platform_code": null,
    "platform_order_number": null,
    "platform_order_date": null,
    "platform_order_status": null,
    "platform_order_total": null,
    "platform_order_weight": null,
    "platform_order_weight_unit": null,
    "platform_order_volume": null,
    "platform_order_volume_unit": null,
    "platform_order_dimensions": null,
    "platform_order_dimensions_unit": null,
    "platform_order_items": []
  }
}
```
```

--------------------------------

### Cadastrar Loja

Source: https://docs.melhorenvio.com.br/reference/cadastrar-loja

Use this endpoint to register a new store. It requires authentication and specific details about the store.

```APIDOC
## POST /api/v2/me/companies

### Description
Cadastro e informações das lojas

### Method
POST

### Endpoint
/api/v2/me/companies

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

#### Request Body
- **name** (string) - Required - Nome / Ex: Melhor Loja
- **email** (string) - Required - Endereço de contato e-mail / Ex: contato@melhorloja.me
- **description** (string) - Required - Descrição da Loja
- **company_name** (string) - Required - Nome da Loja
- **document** (string) - Required - Número do Documento / Ex: 89.157.108/0001-04
- **state_register** (string) - Required - Inscrição Estadual / Ex: 476.210.979.481

### Request Example
```json
{
  "name": "Melhor Loja",
  "email": "contato@melhorloja.me",
  "description": "Descrição da loja",
  "company_name": "Nome da Loja",
  "document": "89.157.108/0001-04",
  "state_register": "476.210.979.481"
}
```

### Response
#### Success Response (200)
- **name** (string) - Example: Melhor Loja
- **email** (string) - Example: contato@melhorloja.me
- **description** (string) - Example: Descrição da loja
- **company_name** (string) - Example: Nome da Loja
- **document** (string) - Example: 89157108000104
- **state_register** (string) - Example: 476210979481
- **id** (string)
- **updated_at** (string)
- **created_at** (string)

#### Response Example
```json
{
  "name": "Melhor Loja",
  "email": "contato@melhorloja.me",
  "description": "Descrição da loja",
  "company_name": "Nome da Loja",
  "document": "89157108000104",
  "state_register": "476210979481",
  "id": "781f86be-c3be-47e7-9bef-70b8675a55c3",
  "updated_at": "2022-03-30 16:53:56",
  "created_at": "2022-03-30 16:53:56"
}
```
```

--------------------------------

### Exemplo de Resposta de Sucesso no Cancelamento

Source: https://docs.melhorenvio.com.br/reference/cancelamento-de-etiquetas

Esta é a resposta esperada quando o cancelamento de uma etiqueta é bem-sucedido. Indica que a etiqueta com o ID fornecido foi cancelada.

```json
{
  "6d4935c4-cc03-43b4-b8c4-beef6f141e14": {
    "canceled": true
  }
}
```

--------------------------------

### Exemplo de Resposta de Erro (400 Bad Request)

Source: https://docs.melhorenvio.com.br/reference/impressao-de-etiquetas

Esta resposta indica um erro de autenticação ou requisição inválida. Verifique suas credenciais e os parâmetros enviados.

```json
{
  "message": "Unauthenticated."
}
```

--------------------------------

### Compra de Fretes (Checkout)

Source: https://docs.melhorenvio.com.br/reference/compra-de-fretes-1

Este endpoint permite o pagamento de envios através do processo de checkout.

```APIDOC
## POST /api/v2/me/shipment/checkout

### Description
Pagamento de envios (Checkout)

### Method
POST

### Endpoint
/api/v2/me/shipment/checkout

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico

#### Request Body
- **orders** (array) - Required - Pedidos
  - items: (string)

### Request Example
```json
{
  "orders": [
    "{{id}}"
  ]
}
```

### Response
#### Success Response (200)
- **Result** (object) - Description: Example of a successful response.
```

--------------------------------

### Pesquisar Etiqueta

Source: https://docs.melhorenvio.com.br/reference/pesquisar-etiqueta

Permite pesquisar etiquetas de envio usando um identificador como código de autorização, protocolo, código de rastreio, ID do envio ou documento.

```APIDOC
## GET /api/v2/me/orders/search

### Description
Pesquisa etiquetas de envio com base em um identificador fornecido.

### Method
GET

### Endpoint
/api/v2/me/orders/search

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

#### Query Parameters
- **q** (string) - Required - Informar o código de autorização, protocolo, código de rastreio, ID do envio ou documento.

### Response
#### Success Response (200)
- **id** (string) - Identificador único da etiqueta.
- **protocol** (string) - Protocolo de envio.
- **service_id** (integer) - ID do serviço de transporte.
- **contract** (string) - Contrato do serviço.
- **service_code** (string) - Código do serviço.
- **quote** (number) - Valor do frete cotado.
- **price** (number) - Preço final do frete.
- **coupon** (string) - Cupom de desconto aplicado.
- **discount** (number) - Valor do desconto.
- **delivery_min** (integer) - Prazo mínimo de entrega em dias.
- **delivery_max** (integer) - Prazo máximo de entrega em dias.
- **status** (string) - Status atual da etiqueta (ex: released, posted, delivered, canceled).
- **reminder** (string) - Lembrete associado à etiqueta.
- **insurance_value** (number) - Valor do seguro da encomenda.
- **weight** (number) - Peso real da encomenda.
- **width** (number) - Largura da embalagem.
- **height** (number) - Altura da embalagem.
- **length** (number) - Comprimento da embalagem.
- **diameter** (number) - Diâmetro da embalagem (para objetos cilíndricos).
- **format** (string) - Formato da embalagem (ex: box, envelope).
- **billed_weight** (number) - Peso faturado da encomenda.
- **receipt** (boolean) - Indica se o comprovante de entrega foi gerado.
- **own_hand** (boolean) - Indica se a coleta foi feita pessoalmente.
- **collect** (boolean) - Indica se a etiqueta é para coleta.
- **collect_scheduled_at** (string) - Data e hora agendada para coleta.
- **reverse** (boolean) - Indica se a etiqueta é para devolução.
- **non_commercial** (boolean) - Indica se o envio é não comercial.
- **authorization_code** (string) - Código de autorização da transportadora.
- **tracking** (string) - Código de rastreamento.
- **self_tracking** (string) - Código de rastreamento interno.
- **delivery_receipt** (string) - URL do comprovante de entrega.
- **additional_info** (string) - Informações adicionais.
- **cte_key** (string) - Chave de acesso do CTE (Conhecimento de Transporte Eletrônico).
- **paid_at** (string) - Data e hora do pagamento.
- **generated_at** (string) - Data e hora de geração da etiqueta.
- **posted_at** (string) - Data e hora de postagem.
- **delivered_at** (string) - Data e hora da entrega.
- **canceled_at** (string) - Data e hora do cancelamento.
- **suspended_at** (string) - Data e hora da suspensão.
- **expired_at** (string) - Data e hora de expiração.
- **created_at** (string) - Data e hora de criação do registro.
- **updated_at** (string) - Data e hora da última atualização.
- **details** (object) - Detalhes financeiros do envio.
  - **balance** (number) - Saldo.
  - **gateway** (string) - Valor do gateway.
  - **discount** (string) - Valor do desconto.
  - **subtotal** (string) - Subtotal.
  - **total** (string) - Total.
- **receipt_code** (string) - Código do recibo.
- **from** (object) - Informações do remetente.
  - **name** (string) - Nome.
  - **phone** (string) - Telefone.
  - **email** (string) - Email.
  - **document** (string) - CPF/CNPJ.
  - **company_document** (string) - CNPJ da empresa.
  - **state_register** (string) - Inscrição estadual.
  - **postal_code** (string) - CEP.
  - **address** (string) - Endereço.
  - **location_number** (string) - Número.
  - **complement** (string) - Complemento.
  - **district** (string) - Bairro.
  - **city** (string) - Cidade.
  - **state_abbr** (string) - Sigla do estado.
  - **country_id** (string) - Código do país.
  - **latitude** (string) - Latitude.
  - **longitude** (string) - Longitude.
  - **note** (string) - Observação.
- **to** (object) - Informações do destinatário.
  - **name** (string) - Nome.
  - **phone** (string) - Telefone.
  - **email** (string) - Email.
  - **document** (string) - CPF/CNPJ.
  - **company_document** (string) - CNPJ da empresa.
  - **state_register** (string) - Inscrição estadual.
  - **postal_code** (string) - CEP.
  - **address** (string) - Endereço.
  - **location_number** (string) - Número.
  - **complement** (string) - Complemento.
  - **district** (string) - Bairro.
  - **city** (string) - Cidade.
  - **state_abbr** (string) - Sigla do estado.
  - **country_id** (string) - Código do país.
  - **latitude** (string) - Latitude.
  - **longitude** (string) - Longitude.
  - **note** (string) - Observação.
- **service** (object) - Informações do serviço de transporte.
  - **id** (integer) - ID do serviço.
  - **name** (string) - Nome do serviço.
  - **type** (string) - Tipo do serviço.
  - **range** (string) - Alcance do serviço.
  - **company** (string) - Nome da transportadora.

#### Response Example
```json
[
  {
    "id": "04c13ada-68e6-41df-a2c6-ff5f3e7560f8",
    "protocol": "ORD-20220395512",
    "service_id": 3,
    "contract": null,
    "service_code": null,
    "quote": 25.35,
    "price": 25.35,
    "coupon": null,
    "discount": 5.71,
    "delivery_min": 5,
    "delivery_max": 6,
    "status": "released",
    "reminder": null,
    "insurance_value": 50,
    "weight": null,
    "width": null,
    "height": null,
    "length": null,
    "diameter": null,
    "format": "box",
    "billed_weight": 3.5,
    "receipt": false,
    "own_hand": false,
    "collect": false,
    "collect_scheduled_at": null,
    "reverse": false,
    "non_commercial": false,
    "authorization_code": "2022032921",
    "tracking": "ME220021P41BR",
    "self_tracking": "ME220021P41BR",
    "delivery_receipt": null,
    "additional_info": null,
    "cte_key": null,
    "paid_at": "2022-03-29 21:17:26",
    "generated_at": "2022-03-29 21:38:30",
    "posted_at": null,
    "delivered_at": null,
    "canceled_at": null,
    "suspended_at": null,
    "expired_at": null,
    "created_at": "2022-03-29 20:24:17",
    "updated_at": "2022-03-29 21:38:30",
    "details": {
      "balance": 0,
      "gateway": "25.35",
      "discount": "0.00",
      "subtotal": "25.35",
      "total": "25.35"
    },
    "receipt_code": null,
    "from": {
      "name": "Teste ME",
      "phone": "5598105050",
      "email": "melhorenvio@teste.com",
      "document": "16571478358",
      "company_document": "04517623000197",
      "state_register": "563025255115",
      "postal_code": "7110000",
      "address": "Rua Teste",
      "location_number": "100",
      "complement": "CASA",
      "district": "Bairro Teste",
      "city": "Guarulhos",
      "state_abbr": "SP",
      "country_id": "BR",
      "latitude": null,
      "longitude": null,
      "note": "observação"
    },
    "to": {
      "name": "Melhor Envio Teste",
      "phone": "1999999999",
      "email": "melhorenvio@teste.com",
      "document": "73646548010",
      "company_document": "89794131000100",
      "state_register": "123456",
      "postal_code": "26210000",
      "address": "Avenida Marechal Floriano Peixoto",
      "location_number": "123",
      "complement": "Ap 2",
      "district": "Centro",
      "city": "Nova Iguacu",
      "state_abbr": "RJ",
      "country_id": "BR",
      "latitude": null,
      "longitude": null,
      "note": "observação"
    },
    "service": {
      "id": 3,
      "name": ".Package",
      "type": "normal",
      "range": "interstate",
      "company": "melhor-envio"
    }
  }
]
```
```

--------------------------------

### Listar Endereços de uma Loja

Source: https://docs.melhorenvio.com.br/reference/listar-enderecos-de-uma-loja

Recupera uma lista de endereços para uma loja específica.

```APIDOC
## GET /api/v2/me/companies/{storeId}/addresses

### Description
Recupera uma lista de endereços associados a uma loja específica.

### Method
GET

### Endpoint
/api/v2/me/companies/{storeId}/addresses

### Parameters
#### Path Parameters
- **storeId** (string) - Required - ID da loja

#### Header Parameters
- **Content-type** (string) - Required - Default: application/json
- **Accept** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

### Response
#### Success Response (200)
- **current_page** (integer) - The current page number of the results.
- **data** (array) - An array of address objects.
  - **id** (integer) - The unique identifier for the address.
  - **label** (string) - A label for the address.
  - **postal_code** (string) - The postal code of the address.
  - **address** (string) - The street address.
  - **number** (string) - The street number.
  - **complement** (string) - The complement of the address.
  - **district** (object) - The district details.
  - **latitude** (object) - The latitude coordinate.
  - **longitude** (object) - The longitude coordinate.
  - **confirmed_at** (string) - The timestamp when the address was confirmed.
  - **created_at** (string) - The timestamp when the address was created.
  - **updated_at** (string) - The timestamp when the address was last updated.
  - **city** (object) - The city details.
    - **id** (integer) - The unique identifier for the city.
    - **city** (string) - The name of the city.
    - **state** (object) - The state details.
      - **id** (integer) - The unique identifier for the state.
      - **state** (string) - The name of the state.
      - **state_abbr** (string) - The abbreviation of the state.
      - **country** (object) - The country details.
        - **id** (string) - The unique identifier for the country.
        - **country** (string) - The name of the country.
- **first_page_url** (string) - URL for the first page of results.
- **from** (integer) - The starting index of the results on the current page.
- **last_page** (integer) - The last page number of the results.
- **last_page_url** (string) - URL for the last page of results.
- **next_page_url** (string) - URL for the next page of results.
- **path** (string) - The base URL path for the results.
- **per_page** (integer) - The number of results per page.
- **prev_page_url** (string) - URL for the previous page of results.
- **to** (integer) - The ending index of the results on the current page.
- **total** (integer) - The total number of results.

#### Response Example
{
  "current_page": 1,
  "data": [
    {
      "id": 32336,
      "label": "",
      "postal_code": "07110000",
      "address": "Av Teste",
      "number": "123",
      "complement": "ABC",
      "district": null,
      "latitude": null,
      "longitude": null,
      "confirmed_at": null,
      "created_at": "2022-03-30 17:08:23",
      "updated_at": "2022-03-30 17:08:23",
      "city": {
        "id": 5269,
        "city": "São Paulo",
        "state": {
          "id": 25,
          "state": "São Paulo",
          "state_abbr": "SP",
          "country": {
            "id": "BR",
            "country": "Brazil"
          }
        }
      }
    }
  ],
  "first_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/781f86be-c3be-47e7-9bef-70b8675a55c3/addresses?page=1",
  "from": 1,
  "last_page": 1,
  "last_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/781f86be-c3be-47e7-9bef-70b8675a55c3/addresses?page=1",
  "next_page_url": null,
  "path": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/781f86be-c3be-47e7-9bef-70b8675a55c3/addresses",
  "per_page": 10,
  "prev_page_url": null,
  "to": 1,
  "total": 1
}
```

--------------------------------

### Shipping Service Details

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

This JSON schema defines the structure for shipping service details, including price, discount, currency, and delivery time estimates. It also specifies package dimensions and weight.

```json
{
  "id": 1,
  "name": "PAC",
  "price": "37.79",
  "custom_price": "37.79",
  "discount": "2.09",
  "currency": "R$",
  "delivery_time": 9,
  "delivery_range": {
    "min": 8,
    "max": 9
  },
  "custom_delivery_time": 9,
  "custom_delivery_range": {
    "min": 8,
    "max": 9
  },
  "packages": [
    {
      "price": "37.79",
      "discount": "2.09",
      "format": "box",
      "dimensions": {
        "height": 2,
        "width": 11,
        "length": 16
      },
      "weight": "0.10"
    }
  ]
}
```

--------------------------------

### Shipping Options OpenAPI Definition

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

This JSON structure represents a list of available shipping options. It includes details such as carrier name, pricing, estimated delivery times, package specifications, and additional services like receipt confirmation.

```json
[
  {
    "id": 1,
    "name": "PAC",
    "price": "37.79",
    "custom_price": "37.79",
    "discount": "2.09",
    "currency": "R$",
    "delivery_time": 9,
    "delivery_range": {
      "min": 8,
      "max": 9
    },
    "custom_delivery_time": 9,
    "custom_delivery_range": {
      "min": 8,
      "max": 9
    },
    "packages": [
      {
        "price": "37.79",
        "discount": "2.09",
        "format": "box",
        "dimensions": {
          "height": 2,
          "width": 11,
          "length": 16
        },
        "weight": "0.10",
        "insurance_value": "50.00",
        "products": [
          {
            "id": "pequeno",
            "quantity": 1
          }
        ]
      }
    ],
    "additional_services": {
      "receipt": true,
      "own_hand": true,
      "collect": false
    },
    "company": {
      "id": 1,
      "name": "Correios",
      "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png"
    }
  },
  {
    "id": 2,
    "name": "SEDEX",
    "price": "46.23",
    "custom_price": "46.23",
    "discount": "3.95",
    "currency": "R$",
    "delivery_time": 4,
    "delivery_range": {
      "min": 3,
      "max": 4
    },
    "custom_delivery_time": 4,
    "custom_delivery_range": {
      "min": 3,
      "max": 4
    },
    "packages": [
      {
        "price": "46.23",
        "discount": "3.95",
        "format": "box",
        "dimensions": {
          "height": 2,
          "width": 11,
          "length": 16
        },
        "weight": "0.10",
        "insurance_value": "50.00",
        "products": [
          {
            "id": "pequeno",
            "quantity": 1
          }
        ]
      }
    ],
    "additional_services": {
      "receipt": true,
      "own_hand": true,
      "collect": false
    },
    "company": {
      "id": 1,
      "name": "Correios",
      "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png"
    }
  },
  {
    "id": 3,
    "name": ".Package",
    "price": "18.60",
    "custom_price": "18.60",
    "discount": "4.16",
    "currency": "R$",
    "delivery_time": 6,
    "delivery_range": {
      "min": 5,
      "max": 6
    },
    "custom_delivery_time": 6,
    "custom_delivery_range": {
      "min": 5,
      "max": 6
    },
    "packages": [
      {
        "format": "box",
        "dimensions": {
          "height": 1,
          "width": 1,
          "length": 1
        },
        "weight": "0.10",
        "insurance_value": "50.00",
        "products": [
          {
            "id": "pequeno",
            "quantity": 1
          }
        ]
      }
    ],
    "additional_services": {
      "receipt": true,
      "own_hand": false,
      "collect": false
    },
    "company": {
      "id": 2,
      "name": "Jadlog",
      "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/jadlog.png"
    }
  },
  {
    "id": 4,
    "name": ".Com",
    "price": "16.44",
    "custom_price": "16.44",
    "discount": "0.00",
    "currency": "R$",
    "delivery_time": 5,
    "delivery_range": {
      "min": 4,
      "max": 5
    },
    "custom_delivery_time": 5,
    "custom_delivery_range": {
      "min": 4,
      "max": 5
    },
    "packages": [
      {
        "format": "box",
        "dimensions": {
          "height": 1,
          "width": 1,
          "length": 1
        },
        "weight": "0.10",
        "insurance_value": "50.00",
        "products": [
          {
            "id": "pequeno",
            "quantity": 1
          }
        ]
      }
    ],
    "additional_services": {
      "receipt": true,
      "own_hand": false,
      "collect": false
    },
    "company": {
      "id": 2,
      "name": "Jadlog",
      "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/jadlog.png"
    }
  },
  {
    "id": 17,
    "name": "Mini Envios",
    "price": "23.44",
    "custom_price": "23.44",
    "discount": "0.00",
    "currency": "R$",
    "delivery_time": 11,
    "delivery_range": {
      "min": 10,
      "max": 11
    },
    "custom_delivery_time": 11,
    "custom_delivery_range": {
      "min": 10,
      "max": 11
    },
    "packages": [
      {
        "price": "23.44",
        "discount": "0.00",
        "format": "box",
        "dimensions": {
          "height": 1

```

--------------------------------

### Cadastrar Endereço de Loja

Source: https://docs.melhorenvio.com.br/reference/cadastrar-endereco-de-uma-loja

Este endpoint permite o cadastro de um novo endereço para uma loja específica, identificada pelo `storeId`. É necessário fornecer detalhes como código postal, endereço, número, complemento, cidade e estado.

```APIDOC
## POST /api/v2/me/companies/{storeId}/addresses

### Description
Cadastro e visualização de endereços e telefones de lojas.

### Method
POST

### Endpoint
/api/v2/me/companies/{storeId}/addresses

### Parameters
#### Path Parameters
- **storeId** (string) - Required - ID da loja

#### Header Parameters
- **Content-type** (string) - Required - Default: application/json
- **Accept** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. | Ex: Aplicação (email para contato técnico)

#### Request Body
- **postal_code** (string) - Required - Código Postal - CEP / EX: 01010010
- **address** (string) - Required - Endereço | Logradouro / Ex: Av. Teste
- **number** (string) - Required - Número / Ex: 123
- **complement** (string) - Required - Complemento / Ex: Casa - Apto - ABC
- **city** (string) - Required - Cidade / Ex: São Paulo
- **state** (string) - Required - Estado / Ex: São Paulo

### Request Example
```json
{
  "postal_code": "01010010",
  "address": "Av. Teste",
  "number": "123",
  "complement": "ABC",
  "city": "São Paulo",
  "state": "SP"
}
```

### Response
#### Success Response (200)
- **id** (integer) - ID do endereço cadastrado.
- **label** (string) - Rótulo do endereço (opcional).
- **postal_code** (string) - Código Postal (CEP) do endereço.
- **address** (string) - Logradouro do endereço.
- **number** (string) - Número do endereço.
- **complement** (string) - Complemento do endereço.
- **district** (string) - Bairro do endereço.
- **latitude** (string) - Coordenada de latitude (opcional).
- **longitude** (string) - Coordenada de longitude (opcional).
- **confirmed_at** (string) - Data de confirmação do endereço (opcional).
- **created_at** (string) - Data de criação do registro.
- **updated_at** (string) - Data da última atualização do registro.
- **city** (object) - Objeto contendo informações da cidade.
  - **id** (integer) - ID da cidade.
  - **city** (string) - Nome da cidade.
  - **state** (object) - Objeto contendo informações do estado.
    - **id** (integer) - ID do estado.
    - **state** (string) - Nome do estado.
    - **state_abbr** (string) - Sigla do estado.
    - **country** (object) - Objeto contendo informações do país.
      - **id** (string) - ID do país.
      - **country** (string) - Nome do país.

#### Response Example
```json
{
  "id": 32336,
  "label": "",
  "postal_code": "07110000",
  "address": "Av Teste",
  "number": "123",
  "complement": "ABC",
  "district": null,
  "latitude": null,
  "longitude": null,
  "confirmed_at": null,
  "created_at": "2022-03-30 17:08:23",
  "updated_at": "2022-03-30 17:08:23",
  "city": {
    "id": 5269,
    "city": "São Paulo",
    "state": {
      "id": 25,
      "state": "São Paulo",
      "state_abbr": "SP",
      "country": {
        "id": "BR",
        "country": "Brazil"
      }
    }
  }
}
```
```

--------------------------------

### URL de Redirecionamento OAuth com Todas as Permissões e State

Source: https://docs.melhorenvio.com.br/reference/fluxo-de-autoriza%C3%A7%C3%A3o

Exemplo de URL de redirecionamento OAuth que inclui todas as permissões disponíveis e o parâmetro `state` para passar informações adicionais.

```url
{{url}}/oauth/authorize?client_id={{client_id}}&redirect_uri={{callback}}&response_type=code&state=teste&scope=cart-read cart-write companies-read companies-write coupons-read coupons-write notifications-read orders-read products-read products-write purchases-read shipping-calculate shipping-cancel shipping-checkout shipping-companies shipping-generate shipping-preview shipping-print shipping-share shipping-tracking ecommerce-shipping transactions-read users-read users-write
```

--------------------------------

### Inserir Logística Reversa no Carrinho

Source: https://docs.melhorenvio.com.br/reference/inserir-logistica-reversa-no-carrinho

Adiciona um item de logística reversa ao carrinho de compras. É necessário fornecer detalhes sobre o serviço, remetente, destinatário e o pacote.

```APIDOC
## POST /api/v2/me/cart/reverse

### Description
Logística Reversa

### Method
POST

### Endpoint
https://sandbox.melhorenvio.com.br/api/v2/me/cart/reverse

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

#### Request Body
- **service** (integer) - Required - Id referente do serviço da transportadora
- **new_sender_mail** (string) - Required - e-mail do remetente que estará realizando a devolução
- **new_sender_phone** (string) - Required - celular do remetente que estará realizando a devolução
- **insurance_value** (number) - Required - Valor declarado. Default: 0
- **agency** (integer) - Optional - Id da agência/unidade onde será postado o envio (consultar regras das transportadoras)
- **from** (object) - Required - Informações do remetente do envio
  - **name** (string) - Description: Nome
  - **phone** (string) - Description: Telefone
  - **email** (string) - Description: E-mail
  - **document** (string) - Description: CPF
  - **company_document** (string) - Description: CNPJ
  - **state_register** (string) - Description: Inscrição Estadual
  - **address** (string) - Description: Logradouro
  - **complement** (string) - Description: Complemento
  - **number** (string) - Description: Número
  - **district** (string) - Description: Bairro
  - **city** (string) - Description: Cidade
- **to** (object) - Required - Informações do destinatário do envio
  - **name** (string) - Description: Nome
  - **phone** (string) - Description: Telefone
  - **email** (string) - Description: E-mail
  - **document** (string) - Description: CPF
  - **company_document** (string) - Description: CNPJ
  - **state_register** (string) - Description: Inscrição Estadual
  - **address** (string) - Description: Logradouro
  - **complement** (string) - Description: Complemento
  - **number** (string) - Description: Número
  - **district** (string) - Description: Bairro
  - **city** (string) - Description: Cidade
- **package** (object) - Required - Informações do pacote
  - **height** (integer) - Description: Altura
  - **width** (integer) - Description: Largura
  - **length** (integer) - Description: Comprimento
  - **weight** (number) - Description: Peso
  - **dimensions_unit** (string) - Description: Unidade de medida das dimensões (cm ou m)
  - **weight_unit** (string) - Description: Unidade de medida do peso (kg ou g)

### Request Example
{
  "service": 1001,
  "new_sender_mail": "sender@email.com",
  "new_sender_phone": "(11) 99999-9999",
  "insurance_value": 50.00,
  "from": {
    "name": "Remetente Exemplo",
    "phone": "(11) 99999-9999",
    "email": "sender@email.com",
    "document": "11111111111",
    "company_document": "11111111000111",
    "state_register": "123456789",
    "address": "Rua de Exemplo",
    "complement": "Apto 1",
    "number": "123",
    "district": "Centro",
    "city": "São Paulo"
  },
  "to": {
    "name": "Destinatário Exemplo",
    "phone": "(21) 98888-8888",
    "email": "recipient@email.com",
    "document": "22222222222",
    "company_document": "22222222000222",
    "state_register": "987654321",
    "address": "Avenida de Exemplo",
    "complement": "Casa 2",
    "number": "456",
    "district": "Centro",
    "city": "Rio de Janeiro"
  },
  "package": {
    "height": 10,
    "width": 20,
    "length": 30,
    "weight": 1.5,
    "dimensions_unit": "cm",
    "weight_unit": "kg"
  }
}

### Response
#### Success Response (200)
- **id** (integer) - Description: ID do item no carrinho
- **service** (integer) - Description: ID do serviço
- **agency** (integer) - Description: ID da agência
- **amount** (number) - Description: Valor do serviço
- **currency** (string) - Description: Moeda
- **insurance_value** (number) - Description: Valor do seguro
- **receipt** (string) - Description: Recibo
- **with_label** (boolean) - Description: Com etiqueta
- **order_max_time** (string) - Description: Tempo máximo do pedido
- **package_max_time** (string) - Description: Tempo máximo do pacote
- **company** (object) - Description: Informações da transportadora
  - **id** (integer) - Description: ID da transportadora
  - **name** (string) - Description: Nome da transportadora
  - **tax_id** (string) - Description: CNPJ da transportadora
- **from** (object) - Description: Informações do remetente
- **to** (object) - Description: Informações do destinatário
- **package** (object) - Description: Informações do pacote
- **options** (object) - Description: Opções adicionais
- **volumes** (array) - Description: Volumes

#### Response Example
{
  "id": 12345,
  "service": 1001,
  "agency": 1,
  "amount": 50.00,
  "currency": "BRL",
  "insurance_value": 50.00,
  "receipt": "123456789",
  "with_label": true,
  "order_max_time": "2023-10-27T10:00:00-03:00",
  "package_max_time": "2023-10-27T10:00:00-03:00",
  "company": {
    "id": 1,
    "name": "Melhor Envio Transportadora",
    "tax_id": "11111111000111"
  },
  "from": {
    "name": "Remetente Exemplo",
    "phone": "(11) 99999-9999",
    "email": "sender@email.com",
    "document": "11111111111",
    "company_document": "11111111000111",
    "state_register": "123456789",
    "address": "Rua de Exemplo",
    "complement": "Apto 1",
    "number": "123",
    "district": "Centro",
    "city": "São Paulo"
  },
  "to": {
    "name": "Destinatário Exemplo",
    "phone": "(21) 98888-8888",
    "email": "recipient@email.com",
    "document": "22222222222",
    "company_document": "22222222000222",
    "state_register": "987654321",
    "address": "Avenida de Exemplo",
    "complement": "Casa 2",
    "number": "456",
    "district": "Centro",
    "city": "Rio de Janeiro"
  },
  "package": {
    "height": 10,
    "width": 20,
    "length": 30,
    "weight": 1.5,
    "dimensions_unit": "cm",
    "weight_unit": "kg"
  },
  "options": {},
  "volumes": []
}
```

--------------------------------

### List Service Information by ID

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-de-um-servico

Fetches detailed information for a specific shipping service using its unique ID.

```APIDOC
## GET /api/v2/me/shipment/services/{serviceId}

### Description
Lists detailed information about a specific shipping service.

### Method
GET

### Endpoint
/api/v2/me/shipment/services/{serviceId}

### Parameters
#### Path Parameters
- **serviceId** (string) - Required - ID of the service

#### Header Parameters
- **User-Agent** (string) - Required - It is mandatory to add the HTTP header User-Agent with your application name and a contact email.

### Response
#### Success Response (200)
- **id** (integer) - The unique identifier of the service.
- **name** (string) - The name of the service (e.g., "PAC").
- **type** (string) - The type of service (e.g., "normal").
- **range** (string) - The service range (e.g., "interstate").
- **restrictions** (object) - Contains details about service restrictions.
  - **insurance_value** (object) - Restrictions related to insurance value.
    - **min** (integer) - Minimum allowed insurance value.
    - **max** (integer) - Maximum allowed insurance value.
  - **formats** (object) - Restrictions for different package formats.
    - **box** (object) - Restrictions for box format.
      - **weight** (object) - Weight restrictions for a box.
        - **min** (number) - Minimum weight.
        - **max** (number) - Maximum weight.
      - **width** (object) - Width restrictions for a box.
        - **min** (integer) - Minimum width.
        - **max** (integer) - Maximum width.
      - **height** (object) - Height restrictions for a box.
        - **min** (integer) - Minimum height.
        - **max** (integer) - Maximum height.
      - **length** (object) - Length restrictions for a box.
        - **min** (integer) - Minimum length.
        - **max** (integer) - Maximum length.
      - **sum** (integer) - Maximum sum of dimensions (width + height + length).
    - **roll** (object) - Restrictions for roll format.
      - **weight** (object) - Weight restrictions for a roll.
        - **min** (number) - Minimum weight.
        - **max** (number) - Maximum weight.
      - **diameter** (object) - Diameter restrictions for a roll.
        - **min** (integer) - Minimum diameter.
        - **max** (integer) - Maximum diameter.
      - **length** (object) - Length restrictions for a roll.
        - **min** (integer) - Minimum length.
        - **max** (integer) - Maximum length.
      - **sum** (integer) - Maximum sum of dimensions (width + height + length).
    - **letter** (object) - Restrictions for letter format.
      - **weight** (object) - Weight restrictions for a letter.
        - **min** (number) - Minimum weight.
        - **max** (number) - Maximum weight.
      - **width** (object) - Width restrictions for a letter.
        - **min** (integer) - Minimum width.
        - **max** (integer) - Maximum width.
      - **length** (object) - Length restrictions for a letter.
        - **min** (integer) - Minimum length.
        - **max** (integer) - Maximum length.
- **requirements** (array) - List of mandatory requirements for the service (e.g., ["names", "addresses"]).
- **optionals** (array) - List of optional services or features (e.g., ["AR", "MP", "VD"]).
- **company** (object) - Information about the shipping company.
  - **id** (integer) - The company's unique identifier.
  - **name** (string) - The company's name (e.g., "Correios").
  - **picture** (string) - URL to the company's logo.

### Response Example
{
  "id": 1,
  "name": "PAC",
  "type": "normal",
  "range": "interstate",
  "restrictions": {
    "insurance_value": {
      "min": 0,
      "max": 3000
    },
    "formats": {
      "box": {
        "weight": {
          "min": 0.001,
          "max": 30
        },
        "width": {
          "min": 11,
          "max": 105
        },
        "height": {
          "min": 2,
          "max": 105
        },
        "length": {
          "min": 16,
          "max": 105
        },
        "sum": 200
      },
      "roll": {
        "weight": {
          "min": 0.001,
          "max": 30
        },
        "diameter": {
          "min": 5,
          "max": 91
        },
        "length": {
          "min": 18,
          "max": 105
        },
        "sum": 200
      },
      "letter": {
        "weight": {
          "min": 0.001,
          "max": 0.5
        },
        "width": {
          "min": 11,
          "max": 60
        },
        "length": {
          "min": 16,
          "max": 60
        }
      }
    }
  },
  "requirements": [
    "names",
    "addresses"
  ],
  "optionals": [
    "AR",
    "MP",
    "VD"
  ],
  "company": {
    "id": 1,
    "name": "Correios",
    "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png"
  }
}
```

--------------------------------

### Cadastrar Telefone de Loja

Source: https://docs.melhorenvio.com.br/reference/cadastrar-telefones-de-uma-loja

Este endpoint permite adicionar um novo número de telefone a uma loja existente. O campo 'phone' deve seguir as regras de validação especificadas.

```APIDOC
## POST /stores/{storeId}/phones

### Description
Adiciona um novo número de telefone a uma loja.

### Method
POST

### Endpoint
/stores/{storeId}/phones

### Request Body
- **phone** (string) - Required - O número de telefone a ser cadastrado.

### Response
#### Success Response (201 Created)
- **message** (string) - Mensagem de sucesso.

#### Error Response (400 Bad Request)
- **errors** (object) - Contém os erros de validação.
  - **phone** (array) - Lista de mensagens de erro para o campo phone.
    - **example** (string) - Exemplo de mensagem de erro: "O campo phone não pode ser superior a 11 caracteres."
```

--------------------------------

### Listar Telefones de uma Loja

Source: https://docs.melhorenvio.com.br/reference/listar-telefones-de-uma-loja

Recupera uma lista de números de telefone associados a uma loja específica.

```APIDOC
## GET /api/v2/me/companies/{storeId}/phones

### Description
Recupera uma lista de números de telefone associados a uma loja específica.

### Method
GET

### Endpoint
/api/v2/me/companies/{storeId}/phones

### Parameters
#### Path Parameters
- **storeId** (string) - Required - ID da Loja

#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

### Response
#### Success Response (200)
- **current_page** (integer) - The current page number of the results.
- **data** (array) - An array of phone objects.
  - **id** (integer) - The unique identifier for the phone number.
  - **label** (any) - A label for the phone number (can be null).
  - **phone** (string) - The phone number.
  - **type** (string) - The type of phone number (e.g., 'mobile').
  - **country_id** (string) - The country code.
  - **confirmed_at** (any) - The timestamp when the phone number was confirmed (can be null).
  - **created_at** (string) - The timestamp when the phone number was created.
  - **updated_at** (string) - The timestamp when the phone number was last updated.
- **first_page_url** (string) - The URL for the first page of results.
- **from** (integer) - The starting index of the results on the current page.
- **last_page** (integer) - The total number of pages.
- **last_page_url** (string) - The URL for the last page of results.
- **next_page_url** (string) - The URL for the next page of results (null if on the last page).
- **path** (string) - The base URL path for the results.
- **per_page** (integer) - The number of results per page.
- **prev_page_url** (string) - The URL for the previous page of results (null if on the first page).
- **to** (integer) - The ending index of the results on the current page.
- **total** (integer) - The total number of results.

#### Response Example
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 42304,
      "label": null,
      "phone": "5340302030",
      "type": "mobile",
      "country_id": "BR",
      "confirmed_at": null,
      "created_at": "2022-03-30 20:32:31",
      "updated_at": "2022-03-30 20:32:31"
    },
    {
      "id": 42303,
      "label": null,
      "phone": "5530203020",
      "type": "mobile",
      "country_id": "BR",
      "confirmed_at": null,
      "created_at": "2022-03-30 20:28:52",
      "updated_at": "2022-03-30 20:28:52"
    }
  ],
  "first_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/bde0e453-1d10-4245-a447-d376ae24be55/phones?page=1",
  "from": 1,
  "last_page": 1,
  "last_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/bde0e453-1d10-4245-a447-d376ae24be55/phones?page=1",
  "next_page_url": null,
  "path": "https://sandbox.melhorenvio.com.br/api/v2/me/companies/bde0e453-1d10-4245-a447-d376ae24be55/phones",
  "per_page": 10,
  "prev_page_url": null,
  "to": 2,
  "total": 2
}
```
```

--------------------------------

### Cancelar Etiqueta

Source: https://docs.melhorenvio.com.br/reference/cancelamento-de-etiquetas

Cancela uma etiqueta de envio específica. É necessário fornecer o ID da etiqueta a ser cancelada.

```APIDOC
## POST /v1/labels/{label_id}/cancel

### Description
Cancela uma etiqueta de envio específica.

### Method
POST

### Endpoint
/v1/labels/{label_id}/cancel

### Parameters
#### Path Parameters
- **label_id** (string) - Required - O ID da etiqueta a ser cancelada.

### Request Example
```json
{
  "reason": "Cliente desistiu da compra"
}
```

### Response
#### Success Response (200)
- **message** (string) - Mensagem de confirmação do cancelamento.

#### Response Example
```json
{
  "message": "Etiqueta cancelada com sucesso."
}
```

#### Error Response (400)
- **error** (string) - Mensagem de erro indicando que o ID da etiqueta é inválido ou a etiqueta já foi cancelada.

#### Response Example
```json
{
  "error": "Etiqueta não encontrada ou já cancelada."
}
```
```

--------------------------------

### OpenAPI Definition Snippet

Source: https://docs.melhorenvio.com.br/reference/cancelamento-de-etiquetas

A portion of the OpenAPI definition showing an array of strings for error messages.

```json
{
                          "type": "array",
                          "items": {
                            "type": "string",
                            "example": "O campo order.reason_id é obrigatório."
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

--------------------------------

### Status da Etiqueta

Source: https://docs.melhorenvio.com.br/reference/rastreio-de-envios

Retorna o status do ciclo de vida das etiquetas de envio. É necessário fornecer uma lista de IDs de pedidos no corpo da requisição.

```APIDOC
## POST /api/v2/me/shipment/tracking

### Description
Retorna o status do ciclo de vida das etiquetas.

### Method
POST

### Endpoint
/api/v2/me/shipment/tracking

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - Description: Aplicação (email para contato técnico) É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

#### Request Body
- **orders** (array) - Required - Items: string

### Request Example
```json
{
  "orders": [
    "164ad792-66db-4ea2-b234-75e632465b53"
  ]
}
```

### Response
#### Success Response (200)
- **164ad792-66db-4ea2-b234-75e632465b53** (object) - Description: Objeto contendo os detalhes do rastreio de uma etiqueta.
  - **id** (string) - Example: 164ad792-66db-4ea2-b234-75e632465b53
  - **protocol** (string) - Example: ORD-202304125603
  - **status** (string) - Example: posted
  - **tracking** (string) - Example: ME23002OWZ7BR
  - **melhorenvio_tracking** (string) - Example: ME23002OWZ7BR
  - **created_at** (string) - Example: 2023-04-14 20:32:15
  - **paid_at** (string) - Example: 2023-04-17 13:36:53
  - **generated_at** (string) - Example: 2023-04-17 13:38:20
  - **posted_at** (string) - Example: 2023-04-17 13:55:05
  - **delivered_at** (any) - Description: Data de entrega (pode ser null)
  - **canceled_at** (any) - Description: Data de cancelamento (pode ser null)
  - **expired_at** (any) - Description: Data de expiração (pode ser null)

#### Response Example
```json
{
  "164ad792-66db-4ea2-b234-75e632465b53": {
    "id": "164ad792-66db-4ea2-b234-75e632465b53",
    "protocol": "ORD-202304125603",
    "status": "posted",
    "tracking": "ME23002OWZ7BR",
    "melhorenvio_tracking": "ME23002OWZ7BR",
    "created_at": "2023-04-14 20:32:15",
    "paid_at": "2023-04-17 13:36:53",
    "generated_at": "2023-04-17 13:38:20",
    "posted_at": "2023-04-17 13:55:05",
    "delivered_at": null,
    "canceled_at": null,
    "expired_at": null
  }
}
```
```

--------------------------------

### Exemplo de Resposta ao Cadastrar Endereço de Loja

Source: https://docs.melhorenvio.com.br/reference/cadastrar-endereco-de-uma-loja

Esta é uma representação do objeto de resposta JSON após o cadastro bem-sucedido de um endereço de loja. Inclui os detalhes do endereço criado e informações de auditoria.

```json
{
  "id": 32336,
  "label": "",
  "postal_code": "07110000",
  "address": "Av Teste",
  "number": "123",
  "complement": "ABC",
  "district": null,
  "latitude": null,
  "longitude": null,
  "confirmed_at": null,
  "created_at": "2022-03-30 17:08:23",
  "updated_at": "2022-03-30 17:08:23",
  "city": {
    "id": 5269,
    "city": "São Paulo",
    "state": {
      "id": 25,
      "state": "São Paulo",
      "state_abbr": "SP",
      "country": {
        "id": "BR",
        "country": "Brazil"
      }
    }
  }
}
```

--------------------------------

### Shipping Quote Request with Insurance Value in Options

Source: https://docs.melhorenvio.com.br/discuss/67ae194c9c0e48006fc7cddb

This request attempts to apply insurance by placing 'insurance_value' within the 'options' object. However, this method appears to only apply the insurance to the first volume.

```json
{
  "from": {
    "postal_code": "18035380"
  },
  "to": {
    "postal_code": "02452001"
  },
  "volumes": [
    {
      "width": 10,
      "length": 10,
      "height": 10,
      "weight": 1,
      "insurance_value": 50
    },
    {
      "width": 20,
      "length": 20,
      "height": 20,
      "weight": 2,
      "insurance_value": 100
    }
  ],
  "options": {
    "insurance_value": 150
  }
}
```

--------------------------------

### Cadastrar Telefone de Loja

Source: https://docs.melhorenvio.com.br/reference/cadastrar-telefones-de-uma-loja

Este endpoint permite o cadastro de números de telefone associados a uma loja específica. É possível especificar o tipo de telefone (celular ou fixo) e o número. O ID da loja é obrigatório para identificar a qual loja o telefone será associado.

```APIDOC
## POST /api/v2/me/companies/{storeId}/phones

### Description
Cadastro e visualização de endereços e telefones de lojas.

### Method
POST

### Endpoint
/api/v2/me/companies/{storeId}/phones

### Parameters
#### Path Parameters
- **storeId** (string) - Required - ID da Loja

#### Header Parameters
- **Content-type** (string) - Required - Default: application/json
- **Accept** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

#### Request Body
- **type** (string) - Required - Tipo de contato: "mobile" ou "fixed". Default: mobile
- **phone** (string) - Required - Número: 11987654321

### Request Example
{
  "type": "mobile",
  "phone": "11987654321"
}

### Response
#### Success Response (200)
- **type** (string) - Tipo de contato: "mobile" ou "fixed"
- **phone** (string) - Número de telefone cadastrado
- **country_id** (string) - Código do país
- **updated_at** (string) - Data e hora da última atualização
- **created_at** (string) - Data e hora da criação
- **id** (integer) - ID do telefone cadastrado

#### Response Example
{
  "type": "mobile",
  "phone": "5530203020",
  "country_id": "BR",
  "updated_at": "2022-03-30 20:28:52",
  "created_at": "2022-03-30 20:28:52",
  "id": 42303
}

#### Error Response (422)
- **message** (string) - Mensagem de erro geral
- **errors** (object) - Objeto contendo os erros específicos de validação
  - **phone** (array) - Lista de erros relacionados ao campo phone

#### Error Response Example
{
  "message": "The given data was invalid.",
  "errors": {
    "phone": [
      "O campo phone não pode ser superior a 11 caracteres."
    ]
  }
}
```

--------------------------------

### Product Shipping Quote Request

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

This snippet demonstrates how to structure a request to the Melhor Envio API for calculating shipping costs based on individual product details. It includes origin and destination postal codes, product specifications (dimensions, weight, insurance value, quantity), and service options.

```APIDOC
## Product Shipping Quote Request

### Description
This endpoint allows you to calculate shipping costs by providing detailed information for each product in the shipment. It considers individual product dimensions, weight, insured value, and quantity to determine the most accurate shipping price.

### Method
POST

### Endpoint
`/api/v2/shipping/quote` (Assumed, as no explicit endpoint is provided in the source)

### Parameters
#### Request Body
- **from** (object) - Required - Origin address information.
  - **postal_code** (string) - Required - Origin postal code.
- **to** (object) - Required - Destination address information.
  - **postal_code** (string) - Required - Destination postal code.
- **products** (array) - Required - List of products to be shipped.
  - **id** (string) - Required - Unique identifier for the product.
  - **width** (number) - Required - Product width in centimeters (cm).
  - **height** (number) - Required - Product height in centimeters (cm).
  - **length** (number) - Required - Product length in centimeters (cm).
  - **weight** (number) - Required - Product weight in kilograms (kg).
  - **insurance_value** (number) - Required - Insured value per unit of product (BRL), with two decimal places.
  - **quantity** (integer) - Required - Number of units of this product.
- **options** (object) - Optional - Additional shipping options.
  - **receipt** (boolean) - Optional - Whether to include a delivery receipt.
  - **own_hand** (boolean) - Optional - Whether to use the 'own hand' delivery service.
- **services** (string) - Optional - Comma-separated list of desired shipping service IDs.

### Request Example
```json
{
  "from": {
    "postal_code": "96020360"
  },
  "to": {
    "postal_code": "01018020"
  },
  "products": [
    {
      "id": "Produto A",
      "width": 11, 
      "height": 17, 
      "length": 11, 
      "weight": 1, 
      "insurance_value": 10.1, 
      "quantity": 1 
    },
    {
      "id": "Produto B",
      "width": 10,
      "height": 10,
      "length": 12,
      "weight": 0.2,
      "insurance_value": 10.1,
      "quantity": 5
    }
  ],
  "options": {
    "receipt": false,
    "own_hand": false
  },
  "services": "1,2,18"
}
```

### Response
#### Success Response (200)
- **custom_price** (number) - The final calculated shipping price with custom adjustments.
- **custom_delivery_time** (integer) - The estimated delivery time in business days with custom adjustments.
- **price** (number) - The original calculated shipping price.
- **delivery_time** (integer) - The original estimated delivery time in business days.

#### Response Example
(Response structure not provided in source, only parameter details for response fields are available.)

### Details
- The total insured value (`insurance_value`) is calculated by the API by multiplying the unit `insurance_value` by the `quantity` of each item.
```

--------------------------------

### Listar Transportadoras - OpenAPI

Source: https://docs.melhorenvio.com.br/reference/listar-transportadoras

Define o endpoint para listar transportadoras disponíveis na API Melhor Envio. É obrigatório incluir o cabeçalho User-Agent.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/shipment/companies": {
      "get": {
        "summary": "Listar transportadoras",
        "description": "Lista todas as transportadoras disponíveis",
        "operationId": "listar-transportadoras",
        "parameters": [
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "[
  {
    \"id\": 1,
    \"name\": \"Correios\",
    \"picture\": \"https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png\",
    \"services\": [
      {
        \"id\": 1,
        \"name\": \"PAC\",
        \"type\": \"normal\",
        \"range\": \"interstate\",
        \"restrictions\": {
          \"insurance_value\": {
            \"min\": 0,
            \"max\": 3000
          },
          \"formats\": {
            \"box\": {
              \"weight\": {
                \"min\": 0.001,
                \"max\": 30
              },
              \"width\": {
                \"min\": 11,
                \"max\": 105
              },
              \"height\": {
                \"min\": 2,
                \"max\": 105
              },
              \"length\": {
                \"min\": 16,
                \"max\": 105
              },
              \"sum\": 200
            },
            \"roll\": {
              \"weight\": {
                \"min\": 0.001,
                \"max\": 30
              },
              \"diameter\": {
                \"min\": 5,
                \"max\": 91
              },
              \"length\": {
                \"min\": 18,
                \"max\": 105
              },
              \"sum\": 200
            },
            \"letter\": {
              \"weight\": {
                \"min\": 0.001,
                \"max\": 0.5
              },
              \"width\": {
                \"min\": 11,
                \"max\": 60
              },
              \"length\": {
                \"min\": 16,
                \"max\": 60
              }
            }
          }
        },
        \"requirements\": [
          \"names\",
          \"addresses\"
        ],
        \"optionals\": [
          \"AR\",
          \"MP\",
          \"VD\"
        ],
        \"company\": {
          \"id\": 1,
          \"name\": \"Correios\",
          \"status\": \"available\",
          \"picture\": \"/images/shipping-companies/correios.png\",
          \"use_own_contract\": false
        }
      },
      {
        \"id\": 2,
        \"name\": \"SEDEX\",
        \"type\": \"express\",
        \"range\": \"interstate\",
        \"restrictions\": {
          \"insurance_value\": {
            \"min\": 0,
            \"max\": 10000
          },
          \"formats\": {
            \"box\": {
              \"weight\": {
                \"min\": 0.001,
                \"max\": 30
              },
              \"width\": {
                \"min\": 11,
                \"max\": 105
              },
              \"height\": {
                \"min\": 2,
                \"max\": 105
              },
              \"length\": {
                \"min\": 16,
                \"max\": 105
              },
              \"sum\": 200
            },
            \"roll\": {
              \"weight\": {
                \"min\": 0.001,
                \"max\": 30
              },
              \"diameter\": {
                \"min\": 5,
                \"max\": 91
              },
              \"length\": {
                \"min\": 18,
                \"max\": 105
              },
              \"sum\": 200
            },
            \"letter\": {
              \"weight\": {
                \"min\": 0.001,
                \"max\": 0.5
              },
              \"width\": {
                \"min\": 11,
                \"max\": 60
              },
              \"length\": {
                \"min\": 16,
                \"max\": 60
              }
            }
          }
        },
        \"requirements\": [
          \"names\",
          \"addresses\"
        ],
        \"optionals\": [
          \"AR\",
          "MP"
        ]
      }
    ]
  }
}

```

--------------------------------

### List Service Information OpenAPI Definition

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-de-um-servico

This OpenAPI definition outlines the structure for retrieving detailed information about a specific shipping service. It specifies the endpoint, required parameters like service ID and User-Agent, and the expected JSON response structure.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/shipment/services/{serviceId}": {
      "get": {
        "summary": "Listar informações de um serviço",
        "description": "Lista informações detalhadas de um serviço específico",
        "operationId": "listar-informacoes-de-um-servico",
        "parameters": [
          {
            "name": "serviceId",
            "in": "path",
            "description": "ID do serviço",
            "schema": {
              "type": "string"
            },
            "required": true
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"id\": 1,\n  \"name\": \"PAC\",\n  \"type\": \"normal\",\n  \"range\": \"interstate\",\n  \"restrictions\": {\n    \"insurance_value\": {\n      \"min\": 0,\n      \"max\": 3000\n    },\n    \"formats\": {\n      \"box\": {\n        \"weight\": {\n          \"min\": 0.001,\n          \"max\": 30\n        },\n        \"width\": {\n          \"min\": 11,\n          \"max\": 105\n        },\n        \"height\": {\n          \"min\": 2,\n          \"max\": 105\n        },\n        \"length\": {\n          \"min\": 16,\n          \"max\": 105\n        },\n        \"sum\": 200\n      },\n      \"roll\": {\n        \"weight\": {\n          \"min\": 0.001,\n          \"max\": 30\n        },\n        \"diameter\": {\n          \"min\": 5,\n          \"max\": 91\n        },\n        \"length\": {\n          \"min\": 18,\n          \"max\": 105\n        },\n        \"sum\": 200\n      },\n      \"letter\": {\n        \"weight\": {\n          \"min\": 0.001,\n          \"max\": 0.5\n        },\n        \"width\": {\n          \"min\": 11,\n          \"max\": 60\n        },\n        \"length\": {\n          \"min\": 16,\n          \"max\": 60\n        }\n      }\n    }\n  },\n  \"requirements\": [\n    \"names\",\n    \"addresses\"\n  ],\n  \"optionals\": [\n    \"AR\",\n    \"MP\",\n    \"VD\"\n  ],\n  \"company\": {\n    \"id\": 1,\n    \"name\": \"Correios\",\n    \"picture\": \"https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png\"\n  }\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "name": {
                      "type": "string",
                      "example": "PAC"
                    },
                    "type": {
                      "type": "string",
                      "example": "normal"
                    },
                    "range": {
                      "type": "string",
                      "example": "interstate"
                    },
                    "restrictions": {
                      "type": "object",
                      "properties": {
                        "insurance_value": {
                          "type": "object",
                          "properties": {
                            "min": {
                              "type": "integer",
                              "example": 0,
                              "default": 0
                            },
                            "max": {
                              "type": "integer",
                              "example": 3000,
                              "default": 0
                            }
                          }
                        },
                        "formats": {
                          "type": "object",
                          "properties": {
                            "box": {
                              "type": "object",
                              "properties": {
                                "weight": {
                                  "type": "object",
                                  "properties": {
                                    "min": {
                                      "type": "number",
                                      "example": 0.001,
                                      "default": 0
                                    },
                                    "max": {
                                      "type": "number",
                                      "example": 30,
                                      "default": 0
                                    }
                                  }
                                },
                                "width": {
                                  "type": "object",
                                  "properties": {
                                    "min": {
                                      "type": "integer",
                                      "example": 11,
                                      "default": 0
                                    },
                                    "max": {
                                      "type": "integer",
                                      "example": 105,
                                      "default": 0
                                    }
                                  }
                                },
                                "height": {
                                  "type": "object",
                                  "properties": {
                                    "min": {
                                      "type": "integer",
                                      "example": 2,
                                      "default": 0
                                    },
                                    "max": {
                                      "type": "integer",
                                      "example": 105,
                                      "default": 0
                                    }
                                  }
                                },
                                "length": {
                                  "type": "object",
                                  "properties": {
                                    "min": {
                                      "type": "integer",
                                      "example": 16,
                                      "default": 0
                                    },
                                    "max": {
                                      "type": "integer",
                                      "example": 105,
                                      "default": 0
                                    }
                                  }
                                },
                                "sum": {
                                  "type": "integer",
                                  "example": 200,
                                  "default": 0
                                }
                              }
                            },
                            "roll": {
                              "type": "object",
                              "properties": {
                                "weight": {
                                  "type": "object",
                                  "properties": {
                                    "min": {
                                      "type": "number",
                                      "example": 0.001,
                                      "default": 0
                                    },
                                    "max": {
                                      "type": "number",
                                      "example": 30,
                                      "default": 0
                                    }
                                  }
                                },
                                "diameter": {
                                  "type": "object",
                                  "properties": {
                                    "min": {
                                      "type": "integer",
                                      "example": 5,
                                      "default": 0
                                    },
                                    "max": {
                                      "type": "integer",
                                      "example": 91,
                                      "default": 0
                                    }
                                  }
                                },
                                "length": {
                                  "type": "object",
                                  "properties": {
                                    "min": {
                                      "type": "integer",
                                      "example": 18,
                                      "default": 0
                                    },
                                    "max": {
                                      "type": "integer",
                                      "example": 105,
                                      "default": 0
                                    }
                                  }
                                },
                                "sum": {
                                  "type": "integer",
                                  "example": 200,
                                  "default": 0
                                }
                              }
                            },
                            "letter": {
                              "type": "object",
                              "properties": {
                                "weight": {
                                  "type": "object",
                                  "properties": {
                                    "min": {
                                      "type": "number",
                                      "example": 0.001,
                                      "default": 0
                                    },
                                    "max": {
                                      "type": "number",
                                      "example": 0.5,
                                      "default": 0
                                    }
                                  }
                                },
                                "width": {
                                  "type": "object",
                                  "properties": {
                                    "min": {
                                      "type": "integer",
                                      "example": 11,
                                      "default": 0
                                    },
                                    "max": {
                                      "type": "integer",
                                      "example": 60,
                                      "default": 0
                                    }
                                  }
                                },
                                "length": {
                                  "type": "object",
                                  "properties": {
                                    "min": {
                                      "type": "integer",
                                      "example": 16,
                                      "default": 0
                                    },
                                    "max": {
                                      "type": "integer",
                                      "example": 60,
                                      "default": 0
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "requirements": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "example": [
                        "names",
                        "addresses"
                      ]
                    },
                    "optionals": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "example": [
                        "AR",
                        "MP",
                        "VD"
                      ]
                    },
                    "company": {
                      "type": "object",
                      "properties": {
                        "id": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "name": {
                          "type": "string",
                          "example": "Correios"
                        },
                        "picture": {
                          "type": "string",
                          "example": "https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

--------------------------------

### Exemplo de Resposta de Erro (Dados Inválidos)

Source: https://docs.melhorenvio.com.br/reference/cancelamento-de-etiquetas

Esta resposta indica que os dados fornecidos na requisição de cancelamento são inválidos. Verifique os campos obrigatórios, como 'order.reason_id'.

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "order.reason_id": [
      "O campo order.reason_id é obrigatório."
    ]
  }
}
```

--------------------------------

### Product Shipping Calculation Request

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

This JSON structure represents a request to calculate shipping costs for products. It includes details about the shipment, such as origin and destination, package dimensions, weight, insurance value, and a list of products with their respective quantities. Additional services like receipt and own-hand delivery can also be specified.

```json
{
  "from": {
    "postal_code": "06230-040"
  },
  "to": {
    "postal_code": "01000-000"
  },
  "products": [
    {
      "id": "pequeno",
      "quantity": 1,
      "sku": "SKU123",
      "price": "100.00",
      "weight": 0.1,
      "dimensions": {
        "height": 2,
        "width": 11,
        "length": 16
      }
    }
  ],
  "additional_services": {
    "receipt": true,
    "own_hand": false,
    "collect": false
  },
  "company": {
    "id": 1,
    "name": "Correios",
    "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png"
  }
}
```

--------------------------------

### Cancelamento de Etiquetas

Source: https://docs.melhorenvio.com.br/reference/cancelamento-de-etiquetas

Utilize este endpoint para cancelar uma etiqueta de envio. É necessário fornecer o ID da etiqueta e um motivo para o cancelamento.

```APIDOC
## POST /api/v2/me/shipment/cancel

### Description
Cancela uma etiqueta de envio.

### Method
POST

### Endpoint
https://sandbox.melhorenvio.com.br/api/v2/me/shipment/cancel

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Content-Type** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. Default: Aplicação (email para contato técnico)

#### Request Body
- **order** (object) - Required - Informações da etiqueta a ser cancelada e o motivo para o cancelamento.
  - **id** (string) - Required - ID da etiqueta a ser cancelada.
  - **reason_id** (string) - Required - Código referente ao tipo de cancelamento, para o propósito de integrações é sempre 2. Default: 2
  - **description** (string) - Optional - Descrição do motivo para cancelar a etiqueta.

### Request Example
```json
{
  "order": {
    "id": "{{id}}",
    "reason_id": "2",
    "description": "Descrição do cancelamento"
  }
}
```

### Response
#### Success Response (200)
- **canceled** (boolean) - Indica se a etiqueta foi cancelada com sucesso.

#### Response Example
```json
{
  "6d4935c4-cc03-43b4-b8c4-beef6f141e14": {
    "canceled": true
  }
}
```

#### Error Response (422)
- **message** (string) - Mensagem de erro geral.
- **errors** (object) - Objeto contendo os erros específicos.
  - **order.reason_id** (array) - Array de strings com os erros relacionados ao campo `order.reason_id`.

#### Error Response Example
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "order.reason_id": [
      "O campo order.reason_id é obrigatório."
    ]
  }
}
```
```

--------------------------------

### Print Response Text in Python

Source: https://docs.melhorenvio.com.br/discuss/63a19648f2772f01a28bf203

This snippet demonstrates how to print the text content of a response object in Python, typically used for debugging API calls.

```python
print(response.text)
```

--------------------------------

### List Cart Items

Source: https://docs.melhorenvio.com.br/reference/listar-itens-do-carrinho

Retrieves a list of all items added to the user's shopping cart.

```APIDOC
## GET /api/v2/me/cart

### Description
Retrieves a list of all items added to the user's shopping cart.

### Method
GET

### Endpoint
/api/v2/me/cart

### Parameters
#### Header Parameters
- **Accept** (string) - Required - application/json
- **Authorization** (string) - Required - Bearer token
- **User-Agent** (string) - Required - It is mandatory to add the HTTP header User-Agent with the name of your application along with a contact/support email.

### Response
#### Success Response (200)
- **current_page** (integer) - The current page number of the results.
- **data** (array) - An array of cart items.
  - **id** (string) - The unique identifier for the cart item.
  - **protocol** (string) - The protocol number associated with the item.
  - **service_id** (integer) - The ID of the shipping service.
  - **agency_id** (null) - The ID of the agency, if applicable.
  - **contract** (string) - The contract number.
  - **service_code** (null) - The service code, if applicable.
  - **quote** (number) - The quoted price for the item.
  - **price** (number) - The final price of the item.
  - **coupon** (null) - Any coupon applied to the item.
  - **discount** (number) - The discount amount applied.
  - **delivery_min** (integer) - The minimum delivery time in days.
  - **delivery_max** (integer) - The maximum delivery time in days.
  - **status** (string) - The current status of the item (e.g., "pending").
  - **reminder** (null) - Reminder information, if any.
  - **insurance_value** (integer) - The insurance value for the shipment.
  - **weight** (null) - The weight of the package.
  - **width** (null) - The width of the package.
  - **height** (null) - The height of the package.
  - **length** (null) - The length of the package.
  - **diameter** (null) - The diameter of the package.
  - **format** (string) - The format of the package (e.g., "box").
  - **billed_weight** (number) - The billed weight of the shipment.
  - **receipt** (boolean) - Indicates if a receipt is required.
  - **own_hand** (boolean) - Indicates if the shipment requires own hand delivery.
  - **collect** (boolean) - Indicates if the shipment requires collection.
  - **collect_scheduled_at** (null) - The scheduled time for collection, if applicable.
  - **reverse** (boolean) - Indicates if the shipment is a reverse logistics.
  - **non_commercial** (boolean) - Indicates if the shipment is non-commercial.
  - **authorization_code** (null) - The authorization code, if applicable.
  - **tracking** (null) - Tracking information.
  - **self_tracking** (null) - Self-tracking information.
  - **delivery_receipt** (null) - Delivery receipt information.
  - **additional_info** (null) - Additional information about the shipment.
  - **cte_key** (null) - The CTE key, if applicable.
  - **paid_at** (null) - The date and time the item was paid.
  - **generated_at** (null) - The date and time the item was generated.
  - **posted_at** (null) - The date and time the item was posted.
  - **delivered_at** (null) - The date and time the item was delivered.
  - **canceled_at** (null) - The date and time the item was canceled.
  - **suspended_at** (null) - The date and time the item was suspended.
  - **expired_at** (null) - The date and time the item expired.
  - **created_at** (string) - The date and time the item was created.
  - **updated_at** (string) - The date and time the item was last updated.
  - **parse_pi_at** (null) - The date and time for parsing PI, if applicable.
  - **from** (object) - Information about the sender.
    - **name** (string) - Sender's name.
    - **phone** (string) - Sender's phone number.
    - **email** (string) - Sender's email address.
    - **document** (string) - Sender's document number.
    - **company_document** (string) - Sender's company document number.
    - **state_register** (string) - Sender's state registration number.
    - **postal_code** (string) - Sender's postal code.
    - **address** (string) - Sender's street address.
    - **location_number** (string) - Sender's street number.
    - **complement** (string) - Sender's address complement.
    - **district** (string) - Sender's district.
    - **city** (string) - Sender's city.
    - **state_abbr** (string) - Sender's state abbreviation.
    - **country_id** (string) - Sender's country ID.
    - **latitude** (null) - Sender's latitude.
    - **longitude** (null) - Sender's longitude.
    - **note** (string) - Additional notes from the sender.
  - **to** (object) - Information about the recipient.
    - **name** (string) - Recipient's name.
    - **phone** (string) - Recipient's phone number.
    - **email** (string) - Recipient's email address.
    - **document** (string) - Recipient's document number.
    - **company_document** (string) - Recipient's company document number.
    - **state_register** (string) - Recipient's state registration number.
    - **postal_code** (string) - Recipient's postal code.
    - **address** (string) - Recipient's street address.
    - **location_number** (string) - Recipient's street number.
    - **complement** (string) - Recipient's address complement.
    - **district** (string) - Recipient's district.
    - **city** (string) - Recipient's city.
    - **state_abbr** (string) - Recipient's state abbreviation.
    - **country_id** (string) - Recipient's country ID.
    - **latitude** (null) - Recipient's latitude.
    - **longitude** (null) - Recipient's longitude.
    - **note** (string) - Additional notes from the recipient.
  - **service** (object) - Information about the shipping service.
    - **id** (integer) - The ID of the shipping service.
    - **name** (string) - The name of the shipping service.
    - **status** (string) - The status of the shipping service.
    - **type** (string) - The type of shipping service.
    - **range** (string) - The shipping range.
    - **restrictions** (object) - Restrictions for the shipping service.

### Request Example
```json
{
  "example": "request body"
}
```

### Response Example
```json
{
  "current_page": 1,
  "data": [
    {
      "id": "4d9a896c-9057-490d-94ea-abb23565463c",
      "protocol": "ORD-20220397315",
      "service_id": 2,
      "agency_id": null,
      "contract": "9912415671",
      "service_code": null,
      "quote": 50.93,
      "price": 50.93,
      "coupon": null,
      "discount": 10.95,
      "delivery_min": 3,
      "delivery_max": 4,
      "status": "pending",
      "reminder": null,
      "insurance_value": 50,
      "weight": null,
      "width": null,
      "height": null,
      "length": null,
      "diameter": null,
      "format": "box",
      "billed_weight": 3.5,
      "receipt": false,
      "own_hand": false,
      "collect": false,
      "collect_scheduled_at": null,
      "reverse": false,
      "non_commercial": false,
      "authorization_code": null,
      "tracking": null,
      "self_tracking": null,
      "delivery_receipt": null,
      "additional_info": null,
      "cte_key": null,
      "paid_at": null,
      "generated_at": null,
      "posted_at": null,
      "delivered_at": null,
      "canceled_at": null,
      "suspended_at": null,
      "expired_at": null,
      "created_at": "2022-03-29 13:17:46",
      "updated_at": "2022-03-29 13:17:46",
      "parse_pi_at": null,
      "from": {
        "name": "Teste ME",
        "phone": "5598105050",
        "email": "melhorenvio@teste.com",
        "document": "16571478358",
        "company_document": "04517623000197",
        "state_register": "563025255115",
        "postal_code": "7110000",
        "address": "Rua Teste",
        "location_number": "100",
        "complement": "CASA",
        "district": "Bairro Teste",
        "city": "Guarulhos",
        "state_abbr": "SP",
        "country_id": "BR",
        "latitude": null,
        "longitude": null,
        "note": "Teste ME"
      },
      "to": {
        "name": "ME Teste",
        "phone": "1999999999",
        "email": "melhorenvio@teste.com",
        "document": "73646548010",
        "company_document": "89794131000100",
        "state_register": "123456",
        "postal_code": "26210000",
        "address": "Avenida Marechal Floriano Peixoto",
        "location_number": "123",
        "complement": "Ap 2",
        "district": "Centro",
        "city": "Nova Iguacu",
        "state_abbr": "RJ",
        "country_id": "BR",
        "latitude": null,
        "longitude": null,
        "note": "ME Teste"
      },
      "service": {
        "id": 2,
        "name": "SEDEX",
        "status": "available",
        "type": "express",
        "range": "interstate",
        "restrictions": {
          "insurance_value": {
            "min": 0,
            "max": 10000
          },
          "formats": {
            "box": {
              "weight": {
                "min": 0.001,
                "max": 30
              },
              "width": {
                "min": 11,
                "max": 105
              },
              "height": {
                "min": 2,
                "max": 105
              },
              "length": {
                "min": 16,
                "max": 105
              },
              "sum": 200
            },
            "roll": {
              "weight": {
                "min": 0.001,
                "max": 30
              },
              "diameter": {
                "min": 5,
                "max": 91
              },
              "length": {
                "min": 16,
                "max": 105
              }
            }
          }
        }
      }
    }
  ]
}
```
```

--------------------------------

### Inserir Fretes no Carrinho - OpenAPI Definition

Source: https://docs.melhorenvio.com.br/reference/inserir-fretes-no-carrinho

Definição OpenAPI para o endpoint de inserção de fretes no carrinho. Inclui detalhes sobre os parâmetros de requisição, corpo da solicitação e esquemas de dados.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/cart": {
      "post": {
        "summary": "Inserir fretes no carrinho",
        "description": "Carrinho de Compras",
        "operationId": "inserir-fretes-no-carrinho",
        "parameters": [
          {
            "name": "Accept",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Content-Type",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "O User-Agent deve conter o nome da sua aplicação e um e-mail de contato técnico.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "service",
                  "from",
                  "to",
                  "products",
                  "volumes"
                ],
                "properties": {
                  "service": {
                    "type": "integer",
                    "description": "Id referente do serviço da transportadora",
                    "format": "int32"
                  },
                  "agency": {
                    "type": "integer",
                    "description": "Id da agência/unidade onde será postado o envio (consultar regras das transportadoras)",
                    "format": "int32"
                  },
                  "from": {
                    "type": "object",
                    "description": "Informações do remetente do envio",
                    "properties": {
                      "name": {
                        "type": "string",
                        "description": "Nome"
                      },
                      "phone": {
                        "type": "string",
                        "description": "Telefone"
                      },
                      "email": {
                        "type": "string",
                        "description": "E-mail"
                      },
                      "document": {
                        "type": "string",
                        "description": "CPF"
                      },
                      "company_document": {
                        "type": "string",
                        "description": "CNPJ"
                      },
                      "state_register": {
                        "type": "string",
                        "description": "Inscrição Estadual"
                      },
                      "address": {
                        "type": "string",
                        "description": "Logradouro"
                      },
                      "complement": {
                        "type": "string",
                        "description": "Complemento"
                      },
                      "number": {
                        "type": "string",
                        "description": "Número"
                      },
                      "district": {
                        "type": "string",
                        "description": "Bairro"
                      },
                      "city": {
                        "type": "string",
                        "description": "Cidade"
                      },
                      "country_id": {
                        "type": "string",
                        "description": "País"
                      },
                      "postal_code": {
                        "type": "string",
                        "description": "Cep"
                      },
                      "state_abbr": {
                        "type": "string",
                        "description": "Estado"
                      },
                      "note": {
                        "type": "string",
                        "description": "Observação"
                      }
                    },
                    "required": [
                      "name",
                      "document",
                      "company_document"
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

```

--------------------------------

### List Orders

Source: https://docs.melhorenvio.com.br/reference/listar-etiquetas

Retrieves a list of orders. You can filter the orders by their status using the `status` query parameter.

```APIDOC
## GET /api/v2/me/orders

### Description
Retrieves a list of orders. You can filter the orders by their status using the `status` query parameter.

### Method
GET

### Endpoint
/api/v2/me/orders

### Parameters
#### Header Parameters
- **Accept** (string) - Required - Default: application/json
- **Authorization** (string) - Required - Default: Bearer token
- **User-Agent** (string) - Required - Description: É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte. - Default: Aplicação (email para contato técnico)

#### Query Parameters
- **status** (string) - Optional - Description: {Pending | Released | Posted | Delivered | Canceled | Not Delivered}

### Response
#### Success Response (200)
- **current_page** (integer) - Description: The current page number of the results.
- **data** (array) - Description: An array of order objects.
- **first_page_url** (string) - Description: The URL for the first page of results.
- **from** (any) - Description: The starting item number for the current page.
- **last_page** (integer) - Description: The total number of pages.
- **last_page_url** (string) - Description: The URL for the last page of results.
- **next_page_url** (any) - Description: The URL for the next page of results, or null if there isn't one.
- **path** (string) - Description: The base URL path for the results.
- **per_page** (integer) - Description: The number of items per page.
- **prev_page_url** (any) - Description: The URL for the previous page of results, or null if there isn't one.
- **to** (any) - Description: The ending item number for the current page.
- **total** (integer) - Description: The total number of items across all pages.

#### Response Example
{
  "current_page": 1,
  "data": [],
  "first_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/orders?page=1",
  "from": null,
  "last_page": 1,
  "last_page_url": "https://sandbox.melhorenvio.com.br/api/v2/me/orders?page=1",
  "next_page_url": null,
  "path": "https://sandbox.melhorenvio.com.br/api/v2/me/orders",
  "per_page": 10,
  "prev_page_url": null,
  "to": null,
  "total": 0
}

#### Error Response (401)
- **message** (string) - Description: Error message indicating authentication failure.

#### Error Response Example
{
  "message": "Unauthenticated."
}
```

--------------------------------

### Listar Agências com Filtros

Source: https://docs.melhorenvio.com.br/reference/listar-agencias-e-opcoes-de-filtro

Esta operação lista todas as agências de transportadoras disponíveis. É possível filtrar os resultados por transportadora, país, estado e cidade.

```APIDOC
## GET /api/v2/me/shipment/agencies

### Description
Lista todas agências de transportadoras disponíveis.

### Method
GET

### Endpoint
/api/v2/me/shipment/agencies

### Parameters
#### Query Parameters
- **company** (string) - Optional - ID da transportadora
- **country** (string) - Optional - País
- **state** (string) - Optional - Estado / Exemplos: RS, SP, RJ, etc.
- **city** (string) - Optional - Cidade / Exemplos: Porto+Alegre, São+Paulo, Rio+de+Janeiro, etc

#### Header Parameters
- **User-Agent** (string) - Required - É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.

### Response
#### Success Response (200)
- **(object)** - Retorna um objeto com as agências encontradas.

#### Error Response (400)
- **(object)** - Retorna um objeto indicando um erro na requisição.
```

--------------------------------

### Requisição para inserir fretes no carrinho

Source: https://docs.melhorenvio.com.br/reference/inserir-fretes-no-carrinho

This JSON payload demonstrates the structure for adding shipping services to the cart. It includes sender and recipient details, product information, and service options.

```json
{
    "service": 4,
    "from": {
        "name": "Remetente",
        "email": "remetente@email.com",
        "phone": "11912345678",
        "document": "",
        "company_document": "46867029000176",
        "state_register": "",
        "economic_activity_code": "4687701",
        "address": "Rua do Remetente",
        "complement": "",
        "number": "1234",
        "district": "Bairro do Remetente",
        "city": "Cidade do Remetente",
        "postal_code": "09831510",
        "state_abbr": "SP"
    },
    "to": {
        "name": "Destinatário",
        "email": "destinatario@email.com",
        "phone": "41912345678",
        "document": "05596752088",
        "state_register": "ISENTO",
        "address": "Rua do Destinatário",
        "complement": "",
        "number": "1234",
        "district": "Bairro do Destinatário",
        "city": "Cidade do Destinatário",
        "postal_code": "11730000",
        "country_id": "BR",
        "state_abbr": "SP"
    },
    "products": [
        {
            "name": "Teste 1",
            "quantity": "1",
            "unitary_value": "400"
        },
        {
            "name": "Teste 2",
            "quantity": "1",
            "unitary_value": "400"
        }
    ]
}
```

--------------------------------

### OpenAPI Definition Snippet

Source: https://docs.melhorenvio.com.br/reference/inserir-fretes-no-carrinho

This snippet shows a portion of the OpenAPI definition, specifically detailing an error response structure for validation failures.

```json
{
                              "type": "string",
                              "example": "Peso do pacote 1 não informado"
                            }
                          }
                        }
                      },
                      "description": "Erro de validação. O corpo da resposta indicará quais campos (ex: `volumes`) contêm erros."
                    }
                  }
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

--------------------------------

### Calculate Shipping Costs

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

This endpoint allows you to calculate shipping costs by providing origin and destination postal codes, along with detailed product information.

```APIDOC
## POST /api/v2/me/shipment/calculate

### Description
Calculates shipping costs based on product details.

### Method
POST

### Endpoint
https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate

### Parameters
#### Header Parameters
- **Accept** (string) - Required - application/json
- **Content-Type** (string) - Required - application/json
- **Authorization** (string) - Required - Bearer token
- **User-Agent** (string) - Required - Your application name and contact email

### Request Body
- **from** (object) - Required - Origin details
  - **postal_code** (string) - Required - Origin postal code
- **to** (object) - Required - Destination details
  - **postal_code** (string) - Required - Destination postal code
- **products** (array) - Required - List of products
  - **id** (string) - Required - Product identifier
  - **width** (integer) - Required - Product width
  - **height** (integer) - Required - Product height
  - **length** (integer) - Required - Product length
  - **weight** (number) - Required - Product weight
  - **insurance_value** (number) - Required - Insurance value for the product
  - **quantity** (integer) - Required - Number of items

### Request Example
```json
{
  "from": {
    "postal_code": "06230-060"
  },
  "to": {
    "postal_code": "06230-060"
  },
  "products": [
    {
      "id": "12345",
      "width": 10,
      "height": 10,
      "length": 10,
      "weight": 1.5,
      "insurance_value": 100.00,
      "quantity": 1
    }
  ]
}
```

### Response
#### Success Response (200)
- **object** - Contains shipping options and details.
```

--------------------------------

### List Agency Information

Source: https://docs.melhorenvio.com.br/reference/listar-informacoes-de-uma-agencia

Retrieves detailed information for a specific agency using its ID.

```APIDOC
## GET /api/v2/me/shipment/agencies/{agencyId}

### Description
Lists detailed information about a specific agency.

### Method
GET

### Endpoint
/api/v2/me/shipment/agencies/{agencyId}

### Parameters
#### Path Parameters
- **agencyId** (string) - Required - ID of the agency.

#### Header Parameters
- **User-Agent** (string) - Required - It is mandatory to add the HTTP header User-Agent with your application name and a contact/support email.

### Response
#### Success Response (200)
- **id** (integer) - The unique identifier of the agency.
- **name** (string) - The name of the agency.
- **initials** (string) - The initials or short code for the agency.
- **code** (string) - The agency's operational code.
- **company_name** (string) - The legal name of the company operating the agency.
- **status** (string) - The current operational status of the agency (e.g., 'available').
- **email** (string) - The contact email address for the agency.
- **note** (any) - Additional notes about the agency (can be null).
- **company_id** (integer) - The identifier of the company associated with the agency.
- **address** (object) - Detailed address information for the agency.
  - **id** (integer) - The unique identifier for the address record.
  - **label** (string) - A label for the address (e.g., 'Agência JadLog').
  - **postal_code** (string) - The postal code of the address.
  - **address** (string) - The street address.
  - **number** (any) - The building number (can be null).
  - **complement** (any) - Additional address details like apartment or suite number (can be null).
  - **district** (string) - The neighborhood or district.
  - **latitude** (number) - The geographical latitude coordinate.
  - **longitude** (number) - The geographical longitude coordinate.
  - **confirmed_at** (any) - Timestamp when the address was confirmed (can be null).
  - **created_at** (string) - Timestamp when the address record was created.
  - **updated_at** (string) - Timestamp when the address record was last updated.
  - **city** (object) - Information about the city.
    - **id** (integer) - The unique identifier for the city.
    - **city** (string) - The name of the city.
    - **state** (object) - Information about the state.
      - **id** (integer) - The unique identifier for the state.
      - **state** (string) - The name of the state.
      - **state_abbr** (string) - The abbreviation for the state (e.g., 'SP').
      - **country** (object) - Information about the country.
        - **id** (string) - The ISO code for the country (e.g., 'BR').
        - **country** (string) - The name of the country.
- **phone** (object) - Contact phone number information for the agency.
  - **id** (integer) - The unique identifier for the phone record.
  - **label** (string) - A label for the phone number (e.g., 'Agência JadLog').
  - **phone** (string) - The phone number.
  - **type** (string) - The type of phone number (e.g., 'fixed').
  - **country_id** (string) - The ISO code for the country the phone number belongs to.
  - **confirmed_at** (any) - Timestamp when the phone number was confirmed (can be null).
  - **created_at** (string) - Timestamp when the phone number record was created.
  - **updated_at** (string) - Timestamp when the phone number record was last updated.

### Request Example
```json
{
  "example": "Request body not applicable for GET request"
}
```

### Response Example
#### Success Response (200)
```json
{
  "id": 4,
  "name": "LJ OSASCO 01",
  "initials": "LJ-OSC-01",
  "code": "1008139",
  "company_name": "MEG LOGISTICA E TRANSPORTES LTDA",
  "status": "available",
  "email": "meg.osc@jadlog.com.br",
  "note": null,
  "company_id": 2,
  "address": {
    "id": 4,
    "label": "Agência JadLog",
    "postal_code": "06210130",
    "address": "Rua Armenia 259/644",
    "number": null,
    "complement": null,
    "district": "Presidente Altino",
    "latitude": -23.5278746,
    "longitude": -46.7652875,
    "confirmed_at": null,
    "created_at": "2017-09-11 17:47:13",
    "updated_at": "2017-10-19 16:47:31",
    "city": {
      "id": 5094,
      "city": "Osasco",
      "state": {
        "id": 25,
        "state": "São Paulo",
        "state_abbr": "SP",
        "country": {
          "id": "BR",
          "country": "Brazil"
        }
      }
    }
  },
  "phone": {
    "id": 4,
    "label": "Agência JadLog",
    "phone": "1136891717",
    "type": "fixed",
    "country_id": "BR",
    "confirmed_at": null,
    "created_at": "2017-09-11 17:47:13",
    "updated_at": "2017-09-11 17:47:13"
  }
}
```
```

--------------------------------

### API Request with Weight Field

Source: https://docs.melhorenvio.com.br/discuss/66855006aa47fd0018911d32

This snippet shows how to send a request to the Melhor Envio API's cart endpoint, specifically demonstrating the 'weight' field within the 'volumes' object. Ensure the weight is provided in kilograms.

```json
{
"width": 11,
"height": 2,
"length": 18,
"weight": 0.01
}
```

--------------------------------

### Decodificar Token JWT em PHP

Source: https://docs.melhorenvio.com.br/discuss/60e5f59c5ee262005523fa68

Utilize este snippet PHP para decodificar um token JWT e extrair informações como o cabeçalho, payload e data de expiração. Requer que o token esteja no formato correto.

```PHP
$tokenParts = explode('.', $token);
$tokenHeader = json_decode(base64_decode($tokenParts[0]));  
$tokenPayload = json_decode(base64_decode($tokenParts[1]));  
$tokenSignature = $tokenParts[2];
$tokenExpirationDate = date('l jS \of F Y h:i:s A', $tokenPayload->exp);
```

--------------------------------

### OpenAPI Definition for Melhor Envio API

Source: https://docs.melhorenvio.com.br/reference/listar-servicos

This JSON object defines the OpenAPI specification for the Melhor Envio API, including server details, security schemes, and the path for listing shipping services. It requires a User-Agent header for identification.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/shipment/services": {
      "get": {
        "summary": "Listar serviços",
        "description": "Lista todos os serviços de transportadoras disponíveis",
        "operationId": "listar-servicos",
        "parameters": [
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "[
  {
    "id": 1,
    "name": "PAC",
    "type": "normal",
    "range": "interstate",
    "restrictions": {
      "insurance_value": {
        "min": 0,
        "max": 3000
      },
      "formats": {
        "box": {
          "weight": {
            "min": 0.001,
            "max": 30
          },
          "width": {
            "min": 11,
            "max": 105
          },
          "height": {
            "min": 2,
            "max": 105
          },
          "length": {
            "min": 16,
            "max": 105
          },
          "sum": 200
        },
        "roll": {
          "weight": {
            "min": 0.001,
            "max": 30
          },
          "diameter": {
            "min": 5,
            "max": 91
          },
          "length": {
            "min": 18,
            "max": 105
          },
          "sum": 200
        },
        "letter": {
          "weight": {
            "min": 0.001,
            "max": 0.5
          },
          "width": {
            "min": 11,
            "max": 60
          },
          "length": {
            "min": 16,
            "max": 60
          }
        }
      }
    },
    "requirements": [
      "names",
      "addresses"
    ],
    "optionals": [
      "AR",
      "MP",
      "VD"
    ],
    "company": {
      "id": 1,
      "name": "Correios",
      "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png"
    }
  },
  {
    "id": 2,
    "name": "SEDEX",
    "type": "express",
    "range": "interstate",
    "restrictions": {
      "insurance_value": {
        "min": 0,
        "max": 10000
      },
      "formats": {
        "box": {
          "weight": {
            "min": 0.001,
            "max": 30
          },
          "width": {
            "min": 11,
            "max": 105
          },
          "height": {
            "min": 2,
            "max": 105
          },
          "length": {
            "min": 16,
            "max": 105
          },
          "sum": 200
        },
        "roll": {
          "weight": {
            "min": 0.001,
            "max": 30
          },
          "diameter": {
            "min": 5,
            "max": 91
          },
          "length": {
            "min": 18,
            "max": 105
          },
          "sum": 200
        },
        "letter": {
          "weight": {
            "min": 0.001,
            "max": 0.5
          },
          "width": {
            "min": 11,
            "max": 60
          },
          "length": {
            "min": 16,
            "max": 60
          }
        }
      }
    },
    "requirements": [
      "names",
      "addresses"
    ],
    "optionals": [
      "AR",
      "MP",
      "VD"
    ],
    "company": {
      "id": 1,
      "name": "Correios",
      "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png"
    }
  },
  {
    "id": 3,
    "name": ".Package",
    "type": "normal",
    "range": "interstate",
    "restrictions": {
      "insurance_value": {
        "min": 0,
        "max": 29900
      },
      "formats": {
        "box": {
          "weight": {
            "min": 0.001,
            "max": 120
          },
          "width": {
            "min": 1,
            "max": 105
          },
          "height": {
            "min": 1,
            "max": 100
          },
          "length": {
            "min":

```

--------------------------------

### OpenAPI Definition for Shipping Calculation

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

This JSON object defines the OpenAPI specification for the /api/v2/me/shipment/calculate endpoint. It details the request method, parameters, and the structure of the request body, including product attributes required for shipping cost calculation.

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "api-melhor-envio-sandbox",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://sandbox.melhorenvio.com.br/"
    }
  ],
  "security": [
    {}
  ],
  "paths": {
    "/api/v2/me/shipment/calculate": {
      "post": {
        "summary": "Cálculo de Fretes",
        "description": "Envios",
        "operationId": "calculo-de-fretes-por-produtos",
        "parameters": [
          {
            "name": "Accept",
            "in": "header",
            "description": "application/json",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Content-Type",
            "in": "header",
            "description": "application/json",
            "required": true,
            "schema": {
              "type": "string",
              "default": "application/json"
            }
          },
          {
            "name": "Authorization",
            "in": "header",
            "description": "Token",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Bearer token"
            }
          },
          {
            "name": "User-Agent",
            "in": "header",
            "description": "É obrigatório que seja adicionado o cabeçalho HTTP User-Agent com o nome da sua aplicação junto a um email de contato/suporte.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "Aplicação (email para contato técnico)"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": [
                  "from",
                  "to",
                  "products"
                ],
                "properties": {
                  "from": {
                    "type": "object",
                    "description": "Local de partida",
                    "required": [
                      "postal_code"
                    ],
                    "properties": {
                      "postal_code": {
                        "type": "string",
                        "description": "Cep Local de Partida"
                      }
                    }
                  },
                  "to": {
                    "type": "object",
                    "description": "Local de Recebimento",
                    "required": [
                      "postal_code"
                    ],
                    "properties": {
                      "postal_code": {
                        "type": "string",
                        "description": "Cep local de Recebimento"
                      }
                    }
                  },
                  "products": {
                    "type": "array",
                    "description": "Listagem dos produtos contidos no pacote.",
                    "items": {
                      "properties": {
                        "id": {
                          "type": "string",
                          "description": "Identificador do Produto"
                        },
                        "width": {
                          "type": "integer",
                          "description": "Largura",
                          "format": "int32"
                        },
                        "height": {
                          "type": "integer",
                          "description": "Altura",
                          "format": "int32"
                        },
                        "length": {
                          "type": "integer",
                          "description": "Comprimento",
                          "format": "int32"
                        },
                        "weight": {
                          "type": "number",
                          "description": "Peso",
                          "format": "float"
                        },
                        "insurance_value": {
                          "type": "number",
                          "description": "Valor do produto que será utilizado para o cálculo do seguro do frete",
                          "format": "float"
                        },
                        "quantity": {
                          "type": "integer",
                          "description": "Número de itens",
                          "format": "int32"
                        }
                      },
                      "required": [
                        "id",
                        "width",
                        "height",
                        "length",
                        "weight",
                        "insurance_value",
                        "quantity"
                      ],
                      "type": "object"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

--------------------------------

### Calculate Shipping Costs

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

This endpoint calculates the shipping costs based on the provided shipment details, including origin and destination, package dimensions, and product information. It returns a list of available shipping options from different carriers.

```APIDOC
## POST /api/v2/shipping/calculator

### Description
Calculates shipping costs based on provided shipment details.

### Method
POST

### Endpoint
/api/v2/shipping/calculator

### Request Body
- **from** (object) - Required - Origin address details.
  - **postal_code** (string) - Required - The postal code of the origin.
- **to** (object) - Required - Destination address details.
  - **postal_code** (string) - Required - The postal code of the destination.
- **products** (array) - Required - A list of products to be shipped.
  - **id** (string) - Required - The ID of the product.
  - **quantity** (integer) - Optional - The quantity of the product. Defaults to 0.
- **additional_services** (object) - Optional - Additional services to include.
  - **receipt** (boolean) - Optional - Whether to include receipt. Defaults to true.
  - **own_hand** (boolean) - Optional - Whether to include own hand delivery. Defaults to true.
  - **collect** (boolean) - Optional - Whether to include collection service. Defaults to true.
- **insurance_value** (string) - Optional - The insurance value for the shipment.

### Request Example
```json
{
  "from": {
    "postal_code": "01000000"
  },
  "to": {
    "postal_code": "01000000"
  },
  "products": [
    {
      "id": "pequeno",
      "quantity": 1
    }
  ],
  "insurance_value": "50.00",
  "additional_services": {
    "receipt": true,
    "own_hand": true,
    "collect": false
  }
}
```

### Response
#### Success Response (200)
- **company** (object) - Information about the shipping company.
  - **id** (integer) - The ID of the company.
  - **name** (string) - The name of the company.
  - **picture** (string) - URL of the company's logo.
- **additional_services** (object) - Details of additional services.
  - **receipt** (boolean) - Indicates if receipt service is included.
  - **own_hand** (boolean) - Indicates if own hand delivery service is included.
  - **collect** (boolean) - Indicates if collection service is included.

#### Response Example
```json
{
  "company": {
    "id": 1,
    "name": "Correios",
    "picture": "https://sandbox.melhorenvio.com.br/images/shipping-companies/correios.png"
  },
  "additional_services": {
    "receipt": true,
    "own_hand": true,
    "collect": false
  }
}
```

#### Error Response (422)
- **message** (string) - General error message.
- **errors** (object) - Object containing specific validation errors.
  - **from.postal_code** (array) - Array of error messages for the origin postal code.
  - **to.postal_code** (array) - Array of error messages for the destination postal code.

#### Error Response Example
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "from.postal_code": [
      "O campo from.postal code é obrigatório."
    ],
    "to.postal_code": [
      "O campo to.postal code é obrigatório."
    ]
  }
}
```
```

--------------------------------

### Freight Purchase OpenAPI Definition

Source: https://docs.melhorenvio.com.br/reference/compra-de-fretes-1

This JSON object represents a detailed OpenAPI definition for a freight purchase. It includes all relevant information about the purchase, associated transactions, and the specific orders within the purchase. Use this as a reference for understanding the structure of freight purchase data.

```json
{
  "purchase": {
    "id": "f1261eb6-fa71-4cae-8267-7d332b42da4d",
    "protocol": "PUR-20220326201",
    "total": 25.35,
    "discount": 5.71,
    "status": "paid",
    "paid_at": "2022-03-29 21:15:53",
    "canceled_at": null,
    "created_at": "2022-03-29 21:15:53",
    "updated_at": "2022-03-29 21:15:53",
    "payment": null,
    "transactions": [
      {
        "id": "8ff6e5b5-92bb-44a6-85f1-576d15c9cb58",
        "protocol": "TRN-20220357400",
        "value": 25.35,
        "type": "debit",
        "status": "authorized",
        "description": "Pagamento de envios (PUR-20220326201)",
        "authorized_at": "2022-03-29 21:15:53",
        "unauthorized_at": null,
        "reserved_at": null,
        "canceled_at": null,
        "created_at": "2022-03-29 21:15:53",
        "description_internal": null,
        "reason": {
          "id": 7,
          "label": "Pagamento de envios",
          "description": ""
        }
      }
    ],
    "orders": [
      {
        "id": "d345836e-061b-490a-b01e-6f7daa2def65",
        "protocol": "ORD-20220395511",
        "service_id": 3,
        "agency_id": 40,
        "contract": null,
        "service_code": null,
        "quote": 25.35,
        "price": 25.35,
        "coupon": null,
        "discount": 5.71,
        "delivery_min": 5,
        "delivery_max": 6,
        "status": "released",
        "reminder": null,
        "insurance_value": 50,
        "weight": null,
        "width": null,
        "height": null,
        "length": null,
        "diameter": null,
        "format": "box",
        "billed_weight": 3.5,
        "receipt": false,
        "own_hand": false,
        "collect": false,
        "collect_scheduled_at": null,
        "reverse": false,
        "non_commercial": false,
        "authorization_code": null,
        "tracking": null,
        "self_tracking": null,
        "delivery_receipt": null,
        "additional_info": null,
        "cte_key": null,
        "paid_at": "2022-03-29 21:15:53",
        "generated_at": null,
        "posted_at": null,
        "delivered_at": null,
        "canceled_at": null,
        "suspended_at": null,
        "expired_at": null,
        "created_at": "2022-03-29 20:24:10",
        "updated_at": "2022-03-29 21:15:53",
        "parse_pi_at": null,
        "from": {
          "name": "Teste ME",
          "phone": "5598105050",
          "email": "melhorenvio@teste.com",
          "document": "16571478358",
          "company_document": "04517623000197",
          "state_register": "563025255115",
          "postal_code": "7110000",
          "address": "Rua Teste",
          "location_number": "100",
          "complement": "CASA",
          "district": "Bairro Teste",
          "city": "Guarulhos",
          "state_abbr": "SP",
          "country_id": "BR",
          "latitude": null,
          "longitude": null,
          "note": "observação"
        },
        "to": {
          "name": "Melhor Envio Teste",
          "phone": "1999999999",
          "email": "melhorenvio@teste.com",
          "document": "73646548010",
          "company_document": "89794131000100",
          "state_register": "123456",
          "postal_code": "26210000",
          "address": "Avenida Marechal Floriano Peixoto",
          "location_number": "123",
          "complement": "Ap 2",
          "district": "Centro",
          "city": "Nova Iguacu",
          "state_abbr": "RJ",
          "country_id": "BR",
          "latitude": null,
          "longitude": null,
          "note": "observação"
        },
        "service": {
          "id": 3,
          "name": ".Package",
          "status": "available",
          "type": "normal",
          "range": "interstate",
          "restrictions": "{\"insurance_value\":{\"min\":0,\"max\":29900},\"formats\":{\"box\":{\"weight\":{\"min\":0.001,\"max\":120},\"width\":{\"min\":1,\"max\":105},\"height\":{\"min\":1,\"max\":100},\"length\":{\"min\":1,\"max\":181},\"sum\":386}}}",
          "requirements": "[\"names\",\"phones\",\"addresses\",\"documents\",\"invoice\"]",
          "optionals": "[\"AR\",\"VD\"]",
          "company": {
            "id": 2,
            "name": "Jadlog",
            "status": "available",
            "picture": "/images/shipping-companies/jadlog.png",
            "use_own_contract": false
          }
        }
      }
    ]
  }
}
```

--------------------------------

### Create Freight Purchase

Source: https://docs.melhorenvio.com.br/reference/compra-de-fretes-1

This endpoint allows for the creation of a new freight purchase. It requires detailed information about the shipment, including sender, recipient, and package details.

```APIDOC
## POST /v1/orders

### Description
Creates a new freight purchase order.

### Method
POST

### Endpoint
/v1/orders

### Request Body
- **orders** (array) - Required - List of orders to be processed.
  - **recipient** (object) - Required - Recipient details.
    - **name** (string) - Required - Recipient's full name.
    - **document** (string) - Required - Recipient's document number (CPF or CNPJ).
    - **email** (string) - Required - Recipient's email address.
    - **phone** (string) - Required - Recipient's phone number.
    - **additional_info** (string) - Optional - Additional information for the recipient.
    - **gender** (string) - Optional - Recipient's gender.
    - **birth_date** (string) - Optional - Recipient's birth date (YYYY-MM-DD).
    - **address** (object) - Required - Recipient's address.
      - **street** (string) - Required - Street name.
      - **number** (string) - Required - House number.
      - **complement** (string) - Optional - Apartment, block, etc.
      - **neighborhood** (string) - Required - Neighborhood.
      - **city** (string) - Required - City name.
      - **state** (string) - Required - State abbreviation (e.g., SP, RJ).
      - **zipcode** (string) - Required - Zip code.
      - **country** (string) - Optional - Country name (default: Brasil).
  - **volumes** (array) - Required - List of volumes in the shipment.
    - **category** (string) - Optional - Category of the volume.
    - **amount** (integer) - Required - Number of items in the volume.
    - **sku** (string) - Optional - Stock Keeping Unit.
    - **description** (string) - Optional - Description of the volume.
    - **amount** (integer) - Required - Quantity of the item.
    - **unitary_value** (integer) - Required - Unitary value of the item.
    - **weight** (object) - Required - Weight details of the volume.
      - **value** (number) - Required - Weight value.
      - **unit** (string) - Required - Unit of weight (e.g., KG, G).
  - **service** (string) - Required - The service code for the freight.
  - **reference** (string) - Required - Your internal reference for the order.
  - **shipping_date** (string) - Optional - The date the shipment is expected to be sent (YYYY-MM-DD).
  - **expiration_date** (string) - Optional - The date the shipment is expected to expire (YYYY-MM-DD).
  - **metadata** (object) - Optional - Additional metadata for the order.

### Response
#### Success Response (200)
- **order_id** (string) - The unique identifier for the created order.
- **status** (string) - The current status of the order.
- **total_price** (integer) - The total price of the freight purchase.
- **payment_url** (string) - URL for payment processing.
- **digitable** (string) - Digitable line for payment (e.g., for Boleto).
- **redirect** (string) - URL to redirect the user after payment.
- **message** (string) - A confirmation message.
- **token** (string) - A token for further operations.
- **payment_id** (string) - The identifier for the payment.

#### Response Example (200)
```json
{
  "order_id": "ord_12345",
  "status": "pending",
  "total_price": 1500,
  "payment_url": "https://example.com/pay?token=xyz",
  "digitable": "00190.00000 00000.000000 00000.000000 1 123456789012345",
  "redirect": "https://example.com/confirmation",
  "message": "Order created successfully.",
  "token": "tok_abcde",
  "payment_id": "pay_67890"
}
```

#### Error Response (422)
- **message** (string) - General error message.
- **errors** (object) - Object containing specific validation errors.
  - **orders** (array) - Array of error messages related to orders.

#### Response Example (422)
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "orders": [
      "Existe uma ou mais orders que já foram pagas."
    ]
  }
}
```
```

--------------------------------

### Requesting Authorization Code

Source: https://docs.melhorenvio.com.br/discuss/64ebd9e3a51f76000b490e73

This JSON payload is used to request an authorization code. Ensure 'redirect_uri' is a valid callback URL, not 'localhost'.

```json
{
  "grant_type": "authorization_code",  
  "client_id": 1234,  
  "client_secret": "a3s2d1as3d21",  
  "redirect_uri": "https://localhost.com/approve/",  
  "code": "?????"
}
```

--------------------------------

### Product Attributes for Freight Calculation

Source: https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos

Defines the properties for individual products used in freight calculation, including dimensions, weight, insurance value, and quantity. Ensure all required fields are provided.

```json
{
  "id": "x",
  "width": 11,
  "height": 17,
  "length": 11,
  "weight": 0.3,
  "insurance_value": 10.1,
  "quantity": 1
}
```

```json
{
  "id": "y",
  "width": 16,
  "height": 25,
  "length": 11,
  "weight": 0.3,
  "insurance_value": 55.05,
  "quantity": 2
}
```

```json
{
  "id": "z",
  "width": 22,
  "height": 30,
  "length": 11,
  "weight": 1,
  "insurance_value": 30,
  "quantity": 1
}
```