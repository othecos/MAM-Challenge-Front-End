
import Truck from '@models/truck'
import axios from './../index'

export default class TrucksService {
    path = '/trucks'
    constructor() {

    }

    async findAll() {
        try {
            const response = await axios.get(this.path)
            if (response.data && Array.isArray(response.data)) {
                return response.data.map((truck) => {
                    const truckModel = new Truck()
                    truckModel.setDataFromDB(truck)
                    return truckModel
                })
            } else {
                throw { code: 404 }
            }
        } catch (err) {
            console.error(err);
            throw err
        }


    } 


}