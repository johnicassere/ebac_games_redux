import { screen } from "@testing-library/react";
import Header from "..";
import { renderizaComProvaider } from "../../../utils/tests";

describe('Testes para o header', () => {
    test('Deve renderizar corretamente', () => {
       renderizaComProvaider(<Header/>)
        expect(screen.getByText('EBAC Games')).toBeInTheDocument()
    })
    test('Deve redenrizar com 2 itens no carrinho', () => {
        renderizaComProvaider(<Header/>, {
            preloadedState: {
                carrinho: {
                    itens: [
                        {
                            id: 1,
                            categoria: 'RPG',
                            imagem: '',
                            plataformas: ['windowns'],
                            preco: 150.90,
                            precoAntigo: 199.90,
                            titulo: 'Elden Ring'
                        },
                        {
                            id: 2,
                            categoria: 'RPG',
                            imagem: '',
                            plataformas: ['windowns', 'PS5', 'Xbos Series S/X'],
                            preco: 199.90,
                            precoAntigo: 299.90,
                            titulo: 'Hogwarts Legacy'
                        },

                    ]
                }
            }
        })

        expect(screen.getByTestId('qtd-carrinho').innerHTML).toContain('2 itens')
    })
})