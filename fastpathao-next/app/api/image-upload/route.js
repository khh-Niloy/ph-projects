import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const transformedImageUrl = cloudinary.image(result.public_id, {
      transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
    });

    return NextResponse.json({
      url: result.secure_url,
      qualityImage: transformedImageUrl,
    });
  } catch (error) {
    // console.log("UPload image failed", error);
    return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
  }
}
