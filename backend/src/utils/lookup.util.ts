import maxmind, { CityResponse } from "maxmind";

const lookup = await maxmind.open<CityResponse>("./GeoLite/GeoLite2-City.mmdb");

export async function geoFromIp(ip: string) {
  const res = lookup.get(ip);
  if (!res) return null;

  return {
    city: res.city?.names?.en ?? null,
    country: res.country?.names?.en ?? null,
    countryCode: res.country?.iso_code ?? null,
  };
}
