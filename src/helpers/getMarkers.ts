import { Marker } from "../types"

export const getMarkers = (): Marker[] => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('../files/maps/markers.json')?.markers
}