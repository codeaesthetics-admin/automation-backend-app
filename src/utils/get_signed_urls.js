var AWS = require("aws-sdk");
const credentials = {
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};
AWS.config.update({ credentials, region: process.env.region });
const s3 = new AWS.S3();
exports.getSignedURL = async (key) => {
    try {
        let file = s3.getSignedUrl("getObject", {
            Bucket: process.env.bucket,
            Key: key,
            Expires: 3600,
        });
        return file
    } catch (err) {
        console.log(err)
    }
}