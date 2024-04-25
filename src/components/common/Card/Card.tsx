import { Link } from 'react-router-dom'
import styles from './Card.module.css'
import { ImageBase64 } from '../ImageBase64/ImageBase64'

interface Icard {
    href: string,
    thumb: string,
    text: string
}

export function Card({ href, text, thumb }:Icard) {
    return (
        <Link to={href} className={styles.card}>
            <ImageBase64 src={ thumb }/>
            <span>{text}</span>
        </Link>)
}