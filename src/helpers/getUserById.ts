export const getUserById = (id: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const profile = require(`../files/users/${id}/profile.json`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const map = require(`../files/users/${id}/map.json`);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const vehicles = require(`../files/users/${id}/vehicles.json`);

    return { profile, map, vehicles };
  } catch {
    return null;
  }
};
