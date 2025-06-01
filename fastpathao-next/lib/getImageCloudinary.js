export default async function getImageCloudinary(formData) {
  try {
    const res = await fetch("/api/image-upload", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();

    if (result.url) {
      return { res: result.url, res2: result.qualityImage };
      // console.log(result.url);
      // console.log(result.qualityImage);
    } else {
      console.log("Failed to upload image");
    }
  } catch (error) {
    console.log(error);
  }
}
