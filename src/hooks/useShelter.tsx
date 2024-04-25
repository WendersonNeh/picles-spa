import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getShelter } from "../services/shelter/getShelter";
import { IShelter } from "../interfaces/shelter";

export function useshelter(options?: Partial<UseQueryOptions<IShelter, Error>>) {
    const result = useQuery({
        staleTime: Infinity,
        ...options,
        queryKey: ['get-shelter'],
        queryFn: () => getShelter()
    })
    return result
}