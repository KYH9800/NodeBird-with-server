const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // react-nodebird-s3
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // original/12312312_abc.png, decodeURIComponent: 한글 깨짐현상 해결
  console.log('Bucket: ', Bucket, 'Key: ', Key);
  const filename = Key.split('/')[Key.split('/').length - 1]; // 파일이름 추출
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase(); // 확장자 추출.toLowerCase(), 확장자 대문자를 소문자로
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;
  console.log('filename', filename, 'ext', ext);

  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise();
    console.log('original', s3Object.Body.length);
    const resizedImage = await sharp(s3Object.Body)
      .resize(400, 400, { fit: 'inside' })
      .toFormat(requiredFormat)
      .toBuffer();
    await s3
      .putObject({
        Bucket,
        Key: `thumb/${filename}`,
        Body: resizedImage,
      })
      .promise();
    console.log('put', resizedImage.length);
    return callback(null, `thumb/${filename}`);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};
