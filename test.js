import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import csvToJson from "./csvtojson";

async function readDataFromS3(credentials, region, bucketName, filename) {
  try {
    const s3 = new S3Client({
      region,
      credentials,
    });

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: filename,
    });

    const data = await s3.send(command);
    if (!data) return { error: "Error fetching data..." };
    const csvData = data.Body;

    const jsonData = await csvToJson(csvData);

    return jsonData;
  } catch (error) {
    console.error("Error :", error);
  }
}

const credentials = {
  accessKeyId: "",
  secretAccessKey: "",
};
const region = "ap-south-1";
const bucketName = "test";
const objectKey = "test";

readDataFromS3(credentials, region, bucketName, objectKey);
