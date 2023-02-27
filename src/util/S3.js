import AWS from "aws-sdk";
import { v1, v3, v4, v5 } from "uuid";

const awsConfig = {
  bucketName: process.env.AWS_BUCKET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
};

const s3 = new AWS.S3(awsConfig);

const uploadImage = () => {};
