import { useQuery } from "@tanstack/react-query";
import { getPets } from "../services/pets/getPets";
import { GetPetsRequest, GetPetsResponse } from "../interfaces/pets";

interface IUSePetsList {
    data?: GetPetsResponse
    isLoading: boolean
}

export function usePetList (params: GetPetsRequest): IUSePetsList {
    const {data, isLoading} = useQuery ({
        queryKey: ['get', params],
        queryFn: () => getPets(params),
    })

    return {data, isLoading}
}