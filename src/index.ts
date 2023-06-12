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

app.post('/', async (req: Request, res: Response) => {
  let data = req.body;
  res.send(await getDataWithPost(data));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

async function getDataWithPost(body) {

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