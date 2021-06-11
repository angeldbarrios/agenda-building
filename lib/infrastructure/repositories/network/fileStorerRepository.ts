import environment from '../../config/environment';
import { S3 } from 'aws-sdk';
import stream from 'stream';

const s3 = new S3({
  accessKeyId: environment.amazon.amazonS3AccessKeyId,
  secretAccessKey: environment.amazon.amazonS3SecretAccessKey,
});

export default class FileStorerRepository {
  upload(readStream: NodeJS.ReadableStream, filename: string) {
    return new Promise(function (resolve, reject) {
      const writeStream = new stream.PassThrough();

      s3.upload(
        { Bucket: environment.amazon.amazonS3Bucket, Key: filename, Body: writeStream },
        null,
        function (err, data) {
          if (err) {
            return reject(err);
          }
          resolve(data);
        },
      );

      stream.pipeline(readStream, writeStream, function (error) {
        if (error) {
          return reject(error);
        }
      });
    });
  }

  async download(filename: string) {
    const options = { Bucket: environment.amazon.amazonS3Bucket, Key: filename };
    const s3Object = s3.getObject(options);
    const fileStream = s3Object.createReadStream();
    return fileStream;
  }
}
