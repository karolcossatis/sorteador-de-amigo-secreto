import ListaParticipantes from "../../componentes/ListaParticipantes"
import { useListaDeParticipantes } from "./useListaDeParticipantes"
import { resultadoAmigoSecreto } from "../atom"
import {useSetRecoilState} from "recoil"
import { realizarSorteio } from "../helpers/realizarSorteio"

export const useSorteador = () => {
    const participantes = useListaDeParticipantes()
    const setResultado = useSetRecoilState(resultadoAmigoSecreto)
    return () => {
        const resultado = realizarSorteio(participantes)
        setResultado(resultado)        
    }
}