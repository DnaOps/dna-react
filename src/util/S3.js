import AWS from "aws-sdk";
import { v1, v3, v4, v5 } from "uuid";

const awsConfig = {
  bucketName: process.env.AWS_BUCKET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
}

const s3 = new AWS.S3(awsConfig);

const uploadParams = {
  Bucket: process.env.AWS_BUCKET,
  Body: file,
  Key: `image/${v1().toString().replace("-", "")}.${
    file.type.split("/")[1]
  }`,
  ContentType: file.type,
  ACL: "public-read",
};

const uploadImage = ()