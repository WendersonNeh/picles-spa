import { Link, useParams } from "react-router-dom";
import { Header } from "../../components/common/Header/Header";
import { Grid } from "../../components/layout/Grid/Grid";
import styles from './PetDetails.module.css'
import { useQuery } from "@tanstack/react-query";
import { getPetByID } from "../../services/pets/getPetById";
import { ImageBase64 } from "../../components/common/ImageBase64/ImageBase64";
import { Skeleton } from "../../components/common/Skeleton";
import { useshelter } from "../../hooks/useShelter";
import { Button } from "../../components/common/Button";
import { ButtonVariant } from "../../components/common/Button/Button.constants";
import whatsapp from '../../assets/whatsapp.svg';

export function PetDetails() {
    const { id } = useParams()

    const { data: shelterData, isError: shelterError } = useshelter()

    const { data: petData, isLoading, isError: petIsError } = useQuery({
        queryKey: ['get-pet-by-id', id],
        queryFn: async () => {
            return await getPetByID(id ?? '')
        }
    })


    return (
        <>
            <Grid>
                <div className={styles.container}>
                    <Header ShowReturn={true} />
                    <main className={styles.content}>
                        {

                            isLoading && (
                                <div className={styles.Skeleton}>
                                    <Skeleton circle={true} width={200} height={200}></Skeleton>
                                    <Skeleton width={180} height={24} style={{ margin: 16 }}></Skeleton>

                                </div>
                            )

                        }
                        {

                            !isLoading && (
                                <>
                                    {petIsError && (
                                        <>
                                            <h1> Pet Não encontrado</h1>
                                            <Link to='/pets/'>Voltar para a listagem</Link>
                                        </>
                                    )}
                                    {!petIsError && (
                                        <>
                                            <ImageBase64 src={petData?.photo} className={styles.picture} />
                                            <h1>{petData?.name}</h1>
                                            <span>Sobre o pet:</span>
                                            <p>{petData?.bio}</p>
                                            {!shelterError && (

                                                <a href={`https://wa.me/${shelterData?.shelterWhatsapp}?text='Olá gostaria de falar sobre${petData?.name}'`}
                                                    target='_blank'>
                                                    <Button variant={ButtonVariant.Text}>
                                                        <span className={styles.buttonWhatsapp}>
                                                            {<img src={whatsapp} />}
                                                            Entre em contato com o abrigo
                                                        </span>
                                                    </Button>

                                                </a>

                                            )}
                                        </>

                                    )}



                                </>
                            )

                        }

                    </main>

                </div>
            </Grid>

        </>
    )
}