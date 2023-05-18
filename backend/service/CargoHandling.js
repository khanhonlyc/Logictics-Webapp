import CargoHandling from "../model/CargoHandling.js"

export const genaratCargoHandlingID = async () => {
    try {
        while (true) {
            const CargoHandlingId = Math.floor(100000 + Math.random() * 900000).toString()
            const isExist = await CargoHandling.exists({
               cargohandlingId: CargoHandlingId
            })
            if (!isExist) {
                return CargoHandlingId
            }
        }
    } catch (error) {
        console.log(error)
        return null
    }
}