import { AddPetRequest } from '../../interfaces/pets'
import httpClient from '../api/httpclient'

export async function addPet(params: AddPetRequest) {
  try {
    const response = await httpClient.post('/pet', params)
    return response.data
  } catch (error) {
    console.error('Erro ao adicionar pet:', error)
    throw error
  }
}