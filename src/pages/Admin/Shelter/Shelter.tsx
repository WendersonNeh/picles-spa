import { useForm } from "react-hook-form";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Panel } from "../../../components/layout/Panel/Panel";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormMask } from "use-mask-input";
import { updateShelter } from "../../../services/shelter/updateShelter";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "../../../components/common/Skeleton";
import { useshelter } from "../../../hooks/useShelter";
import { toast } from "sonner";
import styles from './Shelter.module.css'
import { useEffect } from "react";
import { ButtonVariant } from "../../../components/common/Button/Button.constants";



const shelterSchema = z.object({
    name: z
        .string()
        .min(2, "Nome deve ter no mínimo 2 caracteres.")
        .max(30, "Nome deve ter no máximo 30 caracteres."),
    email: z.string().email("Campo deve ser um email."),
    phone: z.string().refine((value) => {
        const digits = value.replace(/\D/g, '').length
        return digits >= 10 && digits <= 11
    }, 'Número deve ter entre 10 a 11 caracteres.'),
    whatsApp: z.string().refine((value) => {
        const digits = value.replace(/\D/g, '').length
        return digits >= 10 && digits <= 11
    }, 'Número deve ter entre 10 a 11 caracteres.'),

})

type ShelterSchema = z.infer<typeof shelterSchema>

export function Shelter() {

    const { handleSubmit, register, formState, reset } = useForm<ShelterSchema>({
        resolver: zodResolver(shelterSchema),
    })

    const registerWithMask = useHookFormMask(register)

    const queryClient = useQueryClient()

    const { data, isLoading } = useshelter()

    useEffect(() => {
        if (!isLoading && data) {
            reset({
                name: data.shelterName,
                email: data.shelterEmail,
                phone: data.shelterPhone,
                whatsApp: data.shelterWhatsApp,
            })
        }
    }, [data, isLoading, reset])


    async function submit({ name, phone, email, whatsApp }: ShelterSchema) {
        const toastId = toast.loading('Salvando dados')
        try {
            await updateShelter({
                name,
                email,
                phone: phone.replace(/\D/g, ''),
                whatsApp: whatsApp.replace(/\D/g, ''),
            })
            queryClient.invalidateQueries({ queryKey: ['get-shelter'] })
            toast.success('Dados salvos com sucesso', {
                id: toastId,
                closeButton: true,
            })
        } catch {
            toast.error('Não foi possível salvar os dados', {
                id: toastId,
                closeButton: true,
            })
        }

    }
    return (
        <>
            <Panel>
                {isLoading && <Skeleton count={4} width={320} height={32} />}
                {!isLoading && (
                    <form className={styles.container} onSubmit={handleSubmit(submit)}>
                        <div>
                            <Input label="Nome" {...register('name')} />
                            {formState.errors?.name && (
                                <p className={styles.formError}>
                                    {formState.errors.name.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Input label="Email" {...register('email')} />
                            {formState.errors?.email && (
                                <p className={styles.formError}>
                                    {formState.errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Input
                                label="Telefone"
                                {...registerWithMask('phone', ['99 9999-9999', '99 99999-9999'])}
                            />
                            {formState.errors?.phone && (
                                <p className={styles.formError}>
                                    {formState.errors.phone.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <Input
                                label="WhatsApp"
                                {...registerWithMask('whatsApp', [
                                    '99 9999-9999',
                                    '99 99999-9999',
                                ])}
                            />
                            {formState.errors?.whatsApp && (
                                <p className={styles.formError}>
                                    {formState.errors.whatsApp.message}
                                </p>
                            )}
                        </div>


                        <Button type="submit" variant={
                            !formState.isDirty || formState.isSubmitting
                                ? ButtonVariant.Disabled
                                : ButtonVariant.Default
                        }
                        >
                            Salvar dados</Button>
                    </form>
                )}

            </Panel>
        </>
    )

}

