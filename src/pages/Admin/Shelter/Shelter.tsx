import { useForm } from "react-hook-form";
import { Button } from "../../../components/common/Button";
import { Input } from "../../../components/common/Input";
import { Panel } from "../../../components/layout/Panel/Panel";
import style from './Shelter.module.css'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormMask } from "use-mask-input";
import { Toaster, toast } from "sonner";
import { updateShelter } from "../../../services/shelter/updateShelter";


const shelterSchema = z.object({
    name: z
        .string()
        .min(2, "Nome deve ter no mínimo 2 caracteres.")
        .max(30, "Nome deve ter no máximo 30 caracteres."),
    email: z.string().email("Campo deve ser um email."),
    phone: z.string().refine((value)=>{
        const digits = value.replace(/\D/g,'').length
        return digits >= 10 && digits <= 11
    }, 'Número deve ter entre 10 a 11 caracteres.'),
    whatsapp: z.string().refine((value)=>{
        const digits = value.replace(/\D/g,'').length
        return digits >= 10 && digits <= 11
    }, 'Número deve ter entre 10 a 11 caracteres.'),

})

type ShelterSchema = z.infer<typeof shelterSchema>

export function Shelter() {

    const { handleSubmit, register, formState } = useForm<ShelterSchema>({
        resolver: zodResolver(shelterSchema)
    })

    const registerWithMask = useHookFormMask(register)

     async function submit({ name, phone, email, whatsapp }: ShelterSchema) {
        const toastId = toast.loading('Salvando dados')
        try{
            await updateShelter({
            name, 
            email,
            phone: phone.replace(/\D/g,''),
            whatsapp:whatsapp.replace(/\D/g,''),
        })
        toast.success('Dados salvos com sucesso',{
            id: toastId,
            closeButton: true,
        })
        } catch{
            toast.error('Não foi possível salvar os dados',{
                id: toastId,
                closeButton: true,
            })
        }
       
    }
    return (
        <>
            <Panel>
                <form className={style.container} onSubmit={handleSubmit(submit)}>
                    <div>
                        <Input label='Nome' {...register('name')} />
                        {formState.errors?.name && (<p className={style.formError}> {formState.errors.name.message}</p>)}
                    </div>

                    <div>
                        <Input label='Email' {...register('email')} />
                        {formState.errors?.email && (<p className={style.formError}> {formState.errors.email.message}</p>)}
                    </div>

                    <div>
                        <Input label='Telefone' {...registerWithMask('phone', ['99 [9]9999-9999'])} />
                        {formState.errors?.phone && (<p className={style.formError}> {formState.errors.phone.message}</p>)}
                    </div>

                    <div>
                        <Input label='whatsapp' {...registerWithMask('whatsapp', ['99 [9]9999-9999'])} />
                        {formState.errors?.whatsapp && (<p className={style.formError}> {formState.errors.whatsapp.message}</p>)}
                    </div>


                    <Button type="submit">Salvar Dados</Button>
                </form>

            </Panel>
        </>
    )

}