import { UserRoleEnum } from "../Enums"

export const getUsers = () => {
    return [
        {
            id: 'map_rafael',
            name: "Rafael",
            vehicle: "Yamaha - Ténéré 250",
            role: UserRoleEnum.DEV,
        },
        {
            id: 'map_erik',
            name: "Érik",
            vehicle: "Honda - CB 500F",
            role: UserRoleEnum.USER,
        },
        {
            id: 'map_leandro',
            name: "Leandro",
            vehicle: "Yamaha - Factor 150",
            role: UserRoleEnum.USER,
        },
    ]
}