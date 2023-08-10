import React from "react";
import { fireEvent, render, screen } from "@testing-library/react"
import Formulario from "./Formulario";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

describe('o comportamento do formulario.tsx.', () => {
//Jest 
test('quando o input está vazio, novos participantes não podem ser adicionados', () => {

    render(<RecoilRoot>
        <Formulario />
    </RecoilRoot>) //*Renderizar onde será testado

    //encontrar no DOM o input 
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes') //*o input esta na tela , procuramos lá, a busca será pelo placeholder pq é espeço de texto

    //encontrar o botão 
    const botao = screen.getByRole('button') //*vou buscar pela tag 

    //garantir que o input esteja no documento
    expect(input).toBeInTheDocument() //*Espero que esteja no documento

    //garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled() //*espero que esteja desabilitado

})

//*continuando depois de adicionar 

test('adicionar um participante caso exista um nome preenchido', () => {
    render(<RecoilRoot>
        <Formulario />
    </RecoilRoot>)
    //encontrar no DOM o input 
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

    //encontrar o botao
    const botao = screen.getByRole('button')

    //inserir um valor no input 
    fireEvent.change(input, {
        target: {
            value: 'Ana Catarina'
        }
    })

    //clicar no botao submeter
    fireEvent.click(botao)

    //garantir que o input esteja com foco ativo
    expect(input).toHaveFocus()
    //garantir que o input não tenha um valor 
    expect(input).toHaveValue("")
})

test('nomes duplicados não podem ser adicionados na lista', () => {
    render(<RecoilRoot>
        <Formulario />
    </RecoilRoot>)
    //encontrar no DOM o input 
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    //encontrar o botao
    const botao = screen.getByRole('button')
    //inserir um valor no input 
    fireEvent.change(input, {
        target: {
            value: 'Ana Catarina'
        }
    })
    //clicar no botao submeter
    fireEvent.click(botao)
    //repetir ultima ação pois nome repetido nao pode ser adicionado
    fireEvent.change(input, {
        target: {
            value: 'Ana Catarina'
        }
    })
    //clicar no botao submeter
    fireEvent.click(botao)

    const mensagemDeErro = screen.getByRole('alert')

    expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos!')
})

test('a mensagem de erro deve sumir após os timers', () => {
    jest.useFakeTimers()
    render(<RecoilRoot>
        <Formulario />
    </RecoilRoot>)
    //encontrar no DOM o input 
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    //encontrar o botao
    const botao = screen.getByRole('button')
    //inserir um valor no input 
    fireEvent.change(input, {
        target: {
            value: 'Ana Catarina'
        }
    })
    //clicar no botao submeter
    fireEvent.click(botao)
    //repetir ultima ação pois nome repetido nao pode ser adicionado
    fireEvent.change(input, {
        target: {
            value: 'Ana Catarina'
        }
    })
    //clicar no botao submeter
    fireEvent.click(botao)

    let mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeInTheDocument()

    act( () => {
        //esperar N segundos
        jest.runAllTimers()
    })


    mensagemDeErro = screen.queryByRole('alert')
    expect(mensagemDeErro).toBeNull()
})
})

