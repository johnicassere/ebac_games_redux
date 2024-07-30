import { fireEvent, screen } from "@testing-library/react";
import Produto from "..";
import { renderizaComProvaider } from "../../../utils/tests";

const jogo = {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['windowns', 'PS5', 'Xbos Series S/X'],
    preco: 199.90,
    precoAntigo: 299.90,
    titulo: 'Hogwarts Legacy'
}

describe('Teste para o componente produto', () => {
    test('Deve renderizar corretamente', () => {
        renderizaComProvaider(<Produto game={jogo}/>)
        expect(screen.getByText('Hogwarts Legacy')).toBeInTheDocument()
    })

    test('Deve adicionar um item ao carrinho', () => {
        const { store } = renderizaComProvaider(<Produto game={jogo}/>)
        const botao = screen.getByTestId('btn-adicionar-produto')
        fireEvent.click(botao)
        expect(store.getState().carrinho.itens).toHaveLength(1)
    })
})