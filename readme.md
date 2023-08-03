Como executar:  
``` npm install```  
``` npm run start:dev```

Este script atende a uma necessidade específica, o objetivo é identificar qual o tamanho das listas são retornadas em payloads:  
Exemplo de requisição: 

#### GET /endpoints?search=
    - Faz uma busca nos endpoints cadastrados no diretório e retorna os resultados. o campo search é o texto pelo qual deseja pesquisar
    - Por exemplo: /endpoints?search=personal-accounts irá buscar todas as ocorrências de 'personal-accounts' e retornará a lista de endpoints que contém o texto pesquisado

##### Payload de resposta
```json
[
    "https://api.itau/open-banking/products-services/v1/personal-accounts",
    "https://api.sulcredi.coop.br/open-banking/products-services/v1/personal-accounts",
    "https://opendata.api.bb.com.br/open-banking/products-services/v1/personal-accounts",
    "https://api-openbanking.bancopan.com.br/open-banking/products-services/v1/personal-accounts",
    "https://api.bradesco.com/Next/open-banking/products-services/v1/personal-accounts",
    "https://api.bradesco.com/bradesco/open-banking/products-services/v1/personal-accounts",
    "https://banking-openfinance.xpi.com.br/open-banking/products-services/v1/personal-accounts",
    "https://banking-openfinance.rico.com.vc/open-banking/products-services/v1/personal-accounts"
]
```
#### POST /fields
##### Payload da request
```json
{
    "urls": [
        "https://openbanking.banrisul.com.br/open-banking/products-services/v1/personal-loans",
        "https://api.sicredi.com.br/open-banking/products-services/v1/personal-loans"
    ],
    "fields": [
        "/data/brand/companies",
        "/data/brand/companies/personalLoans/fees/services",
        "/data/brand/companies/personalLoans/interestRates"
    ]
}
```
Como resultado será retornado a contagem de ocorrências das fields passadas para cada uma das respostas das chamadas nas urls:

##### Payload de resposta
```json
[
    {
        "url": "https://openbanking.banrisul.com.br/open-banking/products-services/v1/personal-loans",
        "fields": {
            "/data/brand/companies": 1,
            "/data/brand/companies/personalLoans/fees/services": 2,
            "/data/brand/companies/personalLoans/interestRates": 2
        }
    },
    {
        "url": "https://api.sicredi.com.br/open-banking/products-services/v1/personal-loans",
        "fields": {
            "/data/brand/companies": 1,
            "/data/brand/companies/personalLoans/fees/services": 1,
            "/data/brand/companies/personalLoans/interestRates": 2
        }
    }
]
```
Pontos de atençao:  
Deve-se ter a premissa que o caminho dos campos no payload é conhecido, se o campo não existir a contagem retornará 0.  
A implementação atual não prevê o cenário em que se existe paginação da resposta, ou seja, o script realiza a contagem do payload de resposta da primeira requisição. Um possível contorno é enviar na listagem de urls os links com a paginação aplicada.