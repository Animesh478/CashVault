const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadToS3 = async function (fileContent, fileName) {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME;
    // putting the data as text file into s3
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: Buffer.from(fileContent), // Uploading the string as a Buffer
      ContentType: "text/plain",
    });
    await s3Client.send(putCommand);

    // getting the text file from s3
    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ResponseContentDisposition: 'attachment; filename="My_Expenses.txt"',
    });

    // generating a pre-signed url that will expire in 5 minutes
    const downloadUrl = await getSignedUrl(s3Client, getCommand, {
      expiresIn: 300,
    });

    return downloadUrl;
  } catch (error) {
    throw error;
  }
};

module.exports = uploadToS3;
