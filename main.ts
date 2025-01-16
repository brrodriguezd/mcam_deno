interface RestaurantLocation {
  lat: number;
  lng: number;
  name: string;
}

interface UserLocation {
  lat: number;
  lng: number;
}

Deno.serve(
  { hostname: "localhost", port: 8080 },
  async (req) => {
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*"); // Permitir todos los orígenes
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    headers.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }
    const body = await req.json();
    const locations = getRestaurants(body);
    return new Response(JSON.stringify(locations), { status: 200, headers });
  },
);

//pruebas
function getRestaurants(_body: UserLocation) {
  const locations: RestaurantLocation[] = [
    {
      "lat": 4.641626791849464,
      "lng": -74.07512751649837,
      "name": "La media naranja",
    },
    {
      "lat": 4.630669258358839,
      "lng": -74.0749593146456,
      "name": "El zaguan del parkway",
    },
    {
      "lat": 4.63186009635935,
      "lng": -74.09390848198326,
      "name": "Una buena receta",
    },
    {
      "lat": 4.624252940357937,
      "lng": -74.07620385961566,
      "name": "Bogota food company",
    },
    {
      "lat": 4.63995356434823,
      "lng": -74.06891515381666,
      "name": "Nuestra tierra",
    },
  ];
  return locations;
}
