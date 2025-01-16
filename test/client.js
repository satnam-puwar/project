import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "https://my-elasticsearch-project-fd3284.es.us-east-1.aws.elastic.cloud:443",
  auth: {
    apiKey: "ZHdhdVk1UUJQZ0VveWNwNWt1SlQ6amdpaWdmbzZRbzItZWxxbnZXaFpGdw==",
  },
});
export { client };
