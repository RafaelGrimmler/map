import { UserProfile } from "../types"

export const useUser = () => {
    const userIds = ['map_rafael', 'map_erik', 'map_leandro']

    const handleLoadUserProfiles = () => {
        return userIds?.map(userId => require(`../files/maps/${userId}.json`))
    }

    const userProfiles: UserProfile[] = handleLoadUserProfiles()

    return { userProfiles }
}