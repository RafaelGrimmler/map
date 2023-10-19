import { UserRoleEnum } from "../Enums"

export const getUsers = () => {
    return [
        {
            id: 'map_rafael',
            name: "Rafael",
            image: "rafael_profile.jpeg",
            vehicle: "Yamaha - Ténéré 250",
            role: UserRoleEnum.DEV,
        },
        {
            id: 'map_erik',
            name: "Érik",
            image: "erik_profile.jpg",
            vehicle: "Honda - CB 500F",
            role: UserRoleEnum.USER,
        },
        {
            id: 'map_leandro',
            name: "Leandro",
            image: "leandro_profile.jpg",
            vehicle: "Yamaha - Factor 150",
            role: UserRoleEnum.USER,
        },
    ]
}