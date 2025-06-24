import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function POST(req) {
  try {
    const { file, fileName } = await req.json(); // file should be base64 or URL

    const result = await imagekit.upload({
      file,         // base64 string or file URL
      fileName,     // your image name
      folder: "products",
    });

    console.log("ImageKit Upload Result:", result); // ✅ move above return

    return NextResponse.json({ url: result.url }, { status: 200 });
  } catch (err) {
    console.error("Image upload error:", err);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
