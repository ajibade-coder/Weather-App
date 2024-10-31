 //////////////////////func to get geolocation
  export async function getCity(latitude, longitude) {
  const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${import.meta.env.VITE_GEO_ID}`);
  const data = await response.json();
  
  if (data.results && data.results.length > 0) {
    const city = data.results[0].components.city || data.results[0].components.town;
    console.log("City:", city);
    return city;
  } else {
    console.log("City not found, returning default Lagos");
    return "lagos"
  }
}

