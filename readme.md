Como executar:  
``` npm install```  
``` npm run start:dev```

Este script atende a uma necessidade específica, o objetivo é identificar qual o tamanho das listas são retornadas em payloads:  
Exemplo de requisição:  

#### POST localhost:8080/
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
Deve-se ter a premissa que o caminho dos campos no payload é conhecido, se o campo não existir a contagem retornará 0.
