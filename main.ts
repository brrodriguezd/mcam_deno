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
function getRestaurants(body: UserLocation) {
  const locations: RestaurantLocation[] = [];
  for (let i = -0.01; i <= 0.01; i += 0.005) {
    for (let j = -0.01; j <= 0.01; j += 0.005) {
      const restaurant_point: RestaurantLocation = {
        lat: body.lat + i,
        lng: body.lng + j,
        name: `nombre ${
          (i + 0.01) / 0.005 + (j + 0.01) / 0.005 * 4
        }`,
      };
      locations.push(restaurant_point);
    }
  }
  return locations;
}
