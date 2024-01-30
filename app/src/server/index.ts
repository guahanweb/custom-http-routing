import { default as express, Express } from "express";
import bodyParser from "body-parser";
export async function createServer(): Promise<Express> {
  const app = express();

  // set up all routes and config here
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  return app;
}