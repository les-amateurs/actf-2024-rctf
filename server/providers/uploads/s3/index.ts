import AWS from 'aws-sdk'
import crypto from 'crypto'
import { Provider } from '../../../uploads/provider'

interface S3ProviderOptions {
  endpoint: string;
  bucketName: string;
  accessKeyId: string;
  secretAccessKey: string;
  overridePublicHost: string | null;
}

export default class S3Provider implements Provider {
  private s3: AWS.S3
  private bucketName: string
  opts: Partial<S3ProviderOptions> = {};

  constructor (_options: Partial<S3ProviderOptions>) {
    const options: Required<S3ProviderOptions> = {
      endpoint: _options.endpoint || process.env.RCTF_S3_ENDPOINT as string,
      bucketName: _options.bucketName || process.env.RCTF_S3_BUCKET as string,
      accessKeyId: _options.accessKeyId || process.env.RCTF_S3_ACCESS_KEY_ID as string,
      secretAccessKey: _options.secretAccessKey || process.env.RCTF_S3_SECRET_ACCESS_KEY as string,
      overridePublicHost: _options.overridePublicHost || process.env.RCTF_S3_OVERRIDE_PUBLIC_HOST as string,
    }

    console.log(options);

    this.s3 = new AWS.S3({
      endpoint: options.endpoint,
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey
    });

    this.opts = options;

    console.log("Setup S3 support using endpoint at",this.opts.endpoint);
    
    this.bucketName = options.bucketName
  }

  private getS3Key = (sha256: string, name: string): string => {
    return `uploads/${sha256}/${name}`
  }

  upload = async (data: Buffer, name: string): Promise<string> => {
    const hash = crypto.createHash('sha256').update(data).digest('hex')
    console.log("Uploading", name, " to S3 storage");
    const key = this.getS3Key(hash, name)

    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: data,
      ACL: 'public-read',
      ContentDisposition: 'download'
    }

    await this.s3.upload(params).promise();

    console.log("Uploaded",name, " to S3 storage");

    return this.toUrl(hash, name)
  }

  private toUrl (sha256: string, name: string): string {
    let host = `${this.bucketName}.${this.opts.endpoint}`;
    if(this.opts.overridePublicHost){
      host = this.opts.overridePublicHost;
    }
    return `https://${host}/uploads/${sha256}/${encodeURIComponent(name)}`
  }

  async getUrl (sha256: string, name: string): Promise<string|null> {
    const key = this.getS3Key(sha256, name)

    const params = {
      Bucket: this.bucketName,
      Key: key
    }

    try {
      await this.s3.headObject(params).promise()
      return this.toUrl(sha256, name)
    } catch (error) {
        // i don't know how to properly typescript so whatev
        let error2 = error as any;
      if (error2 && error2["code"] === 'NotFound') {
        return null
      } else {
        throw error
      }
    }
  }
}
