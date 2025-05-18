import { LatLng } from 'leaflet';

export type GetRouteArgs = {
  waypoints: LatLng[];
  token: string;
  onCompleted: (routes: LatLng[][]) => void;
};

export const getRoute = ({ waypoints, token, onCompleted }: GetRouteArgs) => {
  const url = `https://graphhopper.com/api/1/route?key=${token}`;
  const points = waypoints?.map((e) => [e?.lng, e?.lat]);

  const payload = {
    points,
    profile: 'car',
    elevation: false,
    instructions: false,
    locale: 'pt_BR',
    points_encoded: false,
    points_encoded_multiplier: 1000000,
    timeout_ms: 10000,
  };

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }
      return await response.json();
    })
    .then((data) => {
      const routes = data?.paths?.map((route: any) =>
        route?.points?.coordinates?.map((e: any) => ({
          lat: e?.[1],
          lng: e?.[0],
        })),
      );

      onCompleted(routes);
    })
    .catch((error) => {
      console.error('Erro ao fazer a requisição:', error);
    });
};
