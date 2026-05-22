// Express responsável por: criar e monitorar as rotas da aplicação
import express from "express";
 
// Todas as requisições para aplicação por padrão vão vir como JSON {}
const app = express();
app.use(express.json());
 
/*
    Métodos:
    GET - Buscar, listar dados de algo.
    GET/:nome - Busca algo pelo nome que esta vindo via paramêtro.
    GET/?nome='MATHEUS' - Busca algo pelo nome que esta vindo via query Params.
 
    POST - Enviar dados para o backend, por exemplo dados do aluno:
    {
        "nome": "JOÃO DA SILVA",
        "RA": "000012178417831",
        "dataNascimento": "1999-03-09"
    }
        request.body.nome .... assim para pegar os demais dados
        const { nome, RA, dataNascimento } = request.body;
 
    PUT - Atualizar os dados, por exemplo de um aluno:
    put/:id - Atualizar o aluno pelo id
    {
        "NOME": "JOÃO DA SILVA PEREIRA",
        "RA": "000012178417831",
        "dataNascimento": "2009-05-04"
    }
 
    PATCH - Atualizar um único dado, atualizar somente o RA do aluno
    patch/:id
    {
        "RA": "000012178417832"  
    }
 
    DELETE - Serve para deletar algo, por exemplo um aluno
    delete/:id
*/
 
const PRODUTOS = [
    { id: 1, nome: 'MOUSE RAZER NAGA', valor: 899.99 },
    { id: 2, nome: 'ALBUM DE FIGURINHAS DA COPA', valor: 24.00 },
];
 
app.get('/produtos', async (request, response) => {
    try {
        // const { nome } = request.params;
        return response.status(200).send(PRODUTOS);
    } catch (error) {
        return response.status(400).send(error.message);
    }
});
 
//CADASTRAR UM PRODUTO
app.post('/produtos', async (request, response) => {
    try {
        const { id, nome, valor } = request.body;
        // const id = request.body.id;
        // const nome = request.body.nome;
        // const valor = request.body.valor;
        PRODUTOS.push({ id, nome, valor });
        return response.status(201).send({
            message: 'Produto adicionado com sucesso.'
        });
    } catch (error) {
        return response.status(400).send(error.message);
    }
});
 
app.put('/produtos/:id', async(request, response) => {
    try {
        const id = request.params.id;
        const { nome, valor } = request.body;
        const index = PRODUTOS.findIndex(produto => produto.id == Number(id));

        if (index === -1) {
            return response.status(404).send({
                message: 'Produto não encontrado.'
            });
        }

        PRODUTOS[index].nome = nome;
        PRODUTOS[index].valor = valor;
        return response.status(200).send({
            message: 'Produto atualizado com sucesso.'
        });
       
    } catch (error) {
        return response.status(400).send(error.message);
    }
});

app.delete('/produtos/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const index = PRODUTOS.findIndex(produto => produto.id == Number(id));

        if (index === -1) {
            return response.status(404).send({
                message: 'Produto não encontrado.'
            });
        }

        PRODUTOS.splice(index, 1);
        return response.status(204).send();
    } catch (error) {
        return response.status(400).send(error.message);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});