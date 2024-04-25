import { Navigate, Outlet } from "react-router-dom";
import { useshelter } from "../../../hooks/useShelter";

export function AuthHOC() {
    const { data, isLoading } = useshelter()
    const canAcess = !!data?.shelterWhatsapp

    if (isLoading) return null
    if (!canAcess) return
    <Navigate to='/admin'/>
    return <Outlet/>
}