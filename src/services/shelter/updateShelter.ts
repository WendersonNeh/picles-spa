import { IUpdateShelterRequest, IUpdateShelterResponse } from "../../interfaces/shelter";
import httpClient from '../api/httpclient'


export async function updateShelter(params: IUpdateShelterRequest): Promise<IUpdateShelterResponse> {
    try {
        const response = await httpClient.put<IUpdateShelterResponse>('/shelter', params)
        return response.data
    } catch (error) {
        console.error('Error ao atualizar abrigo', error)
        throw error
    }
}