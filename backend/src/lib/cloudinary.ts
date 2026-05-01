import { v2 as cloudinary } from 'cloudinary'

let configured = false

export function getCloudinary() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key:    process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure:     true,
    })
    configured = true
    console.log('[Cloudinary] Configured')
  }
  return cloudinary
}

export async function uploadImage(buffer: Buffer, folder: string): Promise<string> {
  const cl = getCloudinary()
  return new Promise((resolve, reject) => {
    cl.uploader.upload_stream({ folder, resource_type: 'image' }, (err, result) => {
      if (err || !result) return reject(err)
      resolve(result.secure_url)
    }).end(buffer)
  })
}

export async function deleteAsset(publicId: string): Promise<void> {
  const cl = getCloudinary()
  await cl.uploader.destroy(publicId)
}
