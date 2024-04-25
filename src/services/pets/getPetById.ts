import { IPet } from "../../interfaces/pets"
import httpClient from '../api/httpclient'


export async function  getPetByID ( id: string): Promise <IPet>{
    try{

        const response = await httpClient.get (`/pet/${id}`)
        return response.data
    } catch (error) {
        console.error ('Erro ao buscar Pet', error)
        throw error
    }
}