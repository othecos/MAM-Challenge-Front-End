import {isNil} from 'lodash'
 
export default class Location {

    private lat: number | null
    private lon: number | null
    private insertDate: Date | null = null

    /**
     *
     * @param {number} lat
     * @param {number} lon
     */
    constructor(lat = 0, lon = 0) {
        this.lat = lat
        this.lon = lon
    }


    setDataFromDB(location: any): void {
        if (location) {
            if (!isNil(location.lat)) this.lat = location.lat
            if (!isNil(location.lon)) this.lon = location.lon
            if (!isNil(location.insertDate)) this.insertDate = location.insertDate

        }
    }

   
    toJSON(): any {
        return {
            lat: this.lat,
            lon: this.lon,
            insertDate: this.insertDate
        }
    }
}
