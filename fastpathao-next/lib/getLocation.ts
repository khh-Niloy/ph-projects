export async function getLocation(address: string) {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        address
      ).replace(/%20/g, "+")}&key=${process.env.NEXT_PUBLIC_GEO_MAP}`
    );
    const location = await response.json();
    if (location.results.length > 0) {
      const { lat, lng } = location.results[0].geometry;
      return { lat, lng };
    } else {
      throw new Error("Location not found");
    }
  } catch (error) {
    throw new Error("Location not found");
  }
}
