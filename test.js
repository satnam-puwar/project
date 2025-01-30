const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "-KTwgIN+P_uhKpSPLnz2",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function searchDocuments(indexName, query) {
    const result = await client.search({
      index: indexName,
      body: {
        query: {
          match: query
        }
      }
    });
  
    console.log('Search Results:', result.hits.hits);
  }
  
  searchDocuments('my_index', { city: 'New York' });
  
  
