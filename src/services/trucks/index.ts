 
import axios from './../index' 
import { trucks } from './data'
import { clone } from '../../utils/object'
import Truck from '../../models/truck'

export default class TrucksService {
    path = '/trucks'
    constructor() {

    }

    async findAll() {
        const trucksMock = clone(trucks)  as Array<any>
        try{
            const response = await axios.get(this.path)
            if(response.data && Array.isArray(response.data)){
                return response.data.map((truck)=>{
                    const truckModel = new Truck()
                    truckModel.setDataFromDB(truck)
                    return truckModel
                })
            }else{
                throw {code: 404}
            }
        }catch(err){
            console.error(err);
            return []
        }
        

    }
    async findByLicensePlate() {

    }
    
     
}