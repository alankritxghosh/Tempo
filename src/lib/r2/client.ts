import { S3Client, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

function extractKey(videoUrl: string): string {
  return videoUrl.startsWith('http') ? new URL(videoUrl).pathname.slice(1) : videoUrl
}

export async function generateSignedUrl(videoUrl: string, expiresIn: number): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME || 'tempo-videos',
    Key: extractKey(videoUrl),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return getSignedUrl(s3Client as any, command as any, { expiresIn })
}

export async function deleteR2Object(videoUrl: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME || 'tempo-videos',
    Key: extractKey(videoUrl),
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await s3Client.send(command as any)
}
