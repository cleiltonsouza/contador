import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { HttpService } from './service/HttpService'
import { DataHandler } from './service/DataHandler'
const bodyParser = require('body-parser');
dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
const port = process.env.PORT;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const httpService = new HttpService()
const dataHandler = new DataHandler()

app.post('/fields', async (req: Request, res: Response) => {
  let data = req.body;
  res.send(await countArrayFieldsInResponse(data));
});

app.post('/endpoints', async (req: Request, res: Response) => {
  let data = req.body;
  res.send(await discoveryEndpoints(data.searchString));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

async function countArrayFieldsInResponse(body) {

  const urls = body.urls
  const fields = body.fields

  let values: any[] = []

  for (const url of urls) {
    let data = await httpService.get(url)
    let counterResultByField: Map<string, number> = dataHandler.countMaxItemsOfArrayFields(data, fields)
    let result = { "url": url, "fields": Object.fromEntries(counterResultByField) }
    values.push(result)
  }

  return values
}

async function discoveryEndpoints(searchPattern: string) {
  const jsonObject = await httpService.get("https://data.directory.openbankingbrasil.org.br/participants")

  function findOccurrences(obj, pattern, occurrences: any[] = []) {
    if (typeof obj === 'object' && obj !== null) {
      if (Array.isArray(obj)) {
        obj.forEach(item => findOccurrences(item, pattern, occurrences));
      } else {
        for (const key in obj) {
          if (key === 'ApiEndpoint' && obj[key].includes(pattern)) {
            occurrences.push(obj[key]);
          }
          findOccurrences(obj[key], pattern, occurrences);
        }
      }
    }
  }
  const matchedOccurrences = [];
  findOccurrences(jsonObject, searchPattern, matchedOccurrences);

  return Array.from(new Set(matchedOccurrences));
}