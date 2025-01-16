import express from "express";
import { client } from "./client.js";
import { getFilters } from "./test.js";
const app = express();

const index = "hotels";
const port = 3001;
app.get("/hotels", (req, res) => {
  const { query } = req;
  //   const filters =
  //   console.log(filters, "filters...");
  const searchData = async () => {
    try {
      const hits = await client.search({
        index,
        body: {
          query: {
            bool: {
              filter: {
                terms: {
                  "hotelName.keyword": query.hotelName,
                },
              },
            },
          },
        },
      });
      const data = hits;
      res.json(data);
    } catch (error) {
      console.log("Error is : ", error);
    }
  };
  if (query) searchData();
});

app.post("", (req, res) => {
  const createIndex = async () => {
    try {
      const data = await client.indices.create({
        index,
        mappings: {
          properties: {
            hotelName: { type: "text" },
            address: { type: "text" },
            roomTypes: { type: "text" },
            priceRange: { type: "float" },
            ratings: { type: "float" },
            reviewsCount: { type: "integer" },
          },
        },
      });
      console.log(data);
      res.json(data);
    } catch (error) {
      console.log("Error is : ", error);
    }
  };
  createIndex();
});

app.post("/add", (req, res) => {
  const documents = [
    { index: { _index: index } },
    {
      hotelName: "Hotel A",
      address: "New York",
      roomTypes: "Excellent",
      priceRange: 200,
      ratings: 4.5,
      reviewsCount: 1000,
    },

    { index: { _index: index } },
    {
      hotelName: "Hotel B",
      address: "Los Angeles",
      roomTypes: "Excellent",
      priceRange: 250,
      ratings: 4.5,
      reviewsCount: 1000,
    },

    { index: { _index: index } },
    {
      hotelName: "Hotel C",
      address: "Chicago",
      roomTypes: "Excellent",
      priceRange: 150,
      ratings: 4.5,
      reviewsCount: 1000,
    },
  ];
  const addData = async () => {
    try {
      const data = await client.bulk({
        body: documents,
      });
      res.json(data);
    } catch (error) {
      console.log("Error is :", error);
    }
  };
  addData();
});

app.delete("/delete", (req, res) => {
  const deleteIndex = async () => {
    try {
      const deletedIndex = await client.indices.delete({
        index,
      });
      res.json(deletedIndex);
    } catch (error) {}
  };
  deleteIndex();
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
export { index, app };
