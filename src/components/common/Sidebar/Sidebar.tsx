import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { toast, Toaster } from 'sonner'
import { useshelter } from '../../../hooks/useShelter'

export function Sidebar() {
    const {data} = useshelter()
    function Validate(event: React.MouseEvent) {
        const canAcess = !!data?.shelterWhatsapp

        if (!canAcess) {
            event.preventDefault()
            toast.error('Insira os dados do abrigo!')
        }
    }

    return (
        <>
            <nav className={styles.sidebar}>  
                <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to="/admin" end> Meu abrigo</NavLink>
                <NavLink onClick={Validate} className={({ isActive }) => (isActive ? styles.active : '')} to="/admin/pets" end>Pets</NavLink>
                <NavLink to="/" end>Sair</NavLink>

            </nav>
            <Toaster position="top-center" richColors={true} />
        </>
    )



}