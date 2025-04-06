import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function streamUpload(fileBuffer: Buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "turk-masale" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    Readable.from(fileBuffer).pipe(stream);
  });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as Blob;

  if (!file) {
    return NextResponse.json(
      { success: false, error: "No file uploaded" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const uploadResult = (await streamUpload(buffer)) as any;
    return NextResponse.json({ success: true, url: uploadResult.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
}
