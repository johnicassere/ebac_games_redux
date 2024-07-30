import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, waitFor } from '@testing-library/react';

import { renderizaComProvaider } from "../../utils/tests";
import Produtos from "../Produtos";

const mocks = [
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
    {
        id: 3,
        categoria: 'Ação',
        imagem: '',
        plataformas: ['PS5', 'Xbos Series S/X'],
        preco: 150.90,
        precoAntigo: 200.90,
        titulo: 'Gotham Knights'
    },
    {
        id: 4,
        categoria: 'Aventura',
        imagem: '',
        plataformas: ['Nintendo Switch'],
        preco: 189.90,
        precoAntigo: 299.90,
        titulo: 'Donkey Kong'
    },
    
]

const server = setupServer(
    rest.get('http://localhost:4000/produtos',(requisicao, resposta, contexto) => {
        return resposta(contexto.json(mocks))
    })
)

describe('Teste para ocontainer produtos', () =>{
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('Deve renderizar corretamente com o texto de carregamento', () => {
        renderizaComProvaider(<Produtos/>)
        expect(screen.getByText('Carregando...')).toBeInTheDocument()
    })

    test('Deve renderizar corretamente com a listagem de jogos', async() => {
        renderizaComProvaider(<Produtos/>)
       await waitFor(() =>{
        expect(screen.getByText('Donkey Kong')).toBeInTheDocument()
        })
    })
})