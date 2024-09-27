# Projeto Fauna do Ribeira: operações CRUD com espécies pertencentes à fauna da região do Vale do Ribeira
## Trabalho de Conclusão de Curso da Pontifícia Universidade Católica do Rio Grande do Sul (PUCRS)
### Pós-graduação em Desenvolvimento Full Stack
![FaunaDoRibeira](./public/extra-images/logotipo.png)
Website que exibe alguns dos animais pertences à fauna nativa da região do Vale do Ribeira no Estado de São Paulo. São apresentadas as seguintes informações a respeito de cada espécie: nome científico, características, alimentação, locais de avistamento, estado de conservação segundo a União Internacional para a Conservação da Natureza e dos Recursos Naturais (IUCN) e link para mais informações. 🦜

## Índice
- <a href="#funcionalidades-do-projeto">Funcionalidades do projeto</a>
- <a href="#tecnologias-utilizadas">Tecnologias utilizadas</a>
- <a href="#layout">Layout</a>
- <a href="#demonstração">Demonstração</a>
- <a href="#como-rodar-o-projeto-na-sua-máquina">Como rodar o projeto na sua máquina</a>
- <a href="#pessoas-autoras">Pessoas autoras</a>
- <a href="#próximos-passos">Próximos passos</a>

## Funcionalidades do projeto
- [x] Cadastro das espécies de animais
- [x] Campo de busca das espécies cadastradas
- [x] Edição das espécies 
- [x] Exclusão das espécies
- [x] Exibição das espécies no formato de cards

## Tecnologias utilizadas
- Linguagens de programação

    ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)
    ![JavaScript](https://img.shields.io/badge/JavaScript-%23323330.svg?style=flat-square&logo=javascript&logoColor=%23F7DF1E)

- Framework, biblioteca e ferramenta

    ![Next JS](https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white)
    ![React](https://img.shields.io/badge/React-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB) 
    ![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white)

- Linguagem de estilo

    ![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=flat-square&logo=css3&logoColor=white)

- Banco de Dados

    ![Supabase](https://img.shields.io/badge/Supabase-black?style=flat-square&logo=supabase&logoColor=3ECF8E)

- Testes E2E

    ![Cypresss](https://img.shields.io/badge/-Cypress-%23E5E5E5?style=flat-square&logo=cypress&logoColor=058a5e)
    
- CI/CD

    ![GitHub Actions](https://img.shields.io/badge/Github%20Actions-%232671E5.svg?style=flat-square&logo=githubactions&logoColor=white)

- Deploy/Hospedagem

    ![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?style=flat-square&logo=vercel&logoColor=white)

## Layout 
### 🙋 Usuário 
![Layout do usuário](./public/extra-images/layout-usuario.png)
![Layout do usuário](./public/extra-images/layout-usuario-continuacao.png)

### 👩‍🔧 Administrador
![Layout do administrador](./public/extra-images/layout-admin.png)
![Layout do administrador](./public/extra-images/layout-admin-cadastro.png)
![Layout do administrador](./public/extra-images/layout-admin-edicao.png)
![Layout do administrador](./public/extra-images/layout-admin-exclusao.png)

## Demonstração
[Link da página principal](https://fauna-do-ribeira.vercel.app/) 

[Link da página de gerenciamento](https://fauna-do-ribeira.vercel.app/admin)

## Como rodar o projeto na sua máquina
- Primeira etapa: download do projeto
    - No seu terminal, digite o seguinte comando:
        ```bash
        gh repo clone natfmacedo/fauna-do-ribeira
        ```
- Segunda etapa: criação do Banco de Dados
    - Acesse [ o site do Supabase](https://supabase.io/)
    - Crie uma conta (de preferência vinculada ao seu GitHub)
    - Clique em `Create organization`/`Criar organização` após preencher os campos solicitados
    - Clique em `Create new project`/`Criar novo projeto` após definir o nome, a senha e a região do seu BD
    - Clique em `Table editor`/`Editor de tabela`
    - Crie uma tabela chamada `animal` com as colunas `id`, `date`, `name`, `scientificName`, `image`, `imageDescription`, `characteristics`, `eating`, `location`, `iucnState` e `link` com as confirgurações conforme a imagem abaixo:
    ![AnimalColumns](./public/extra-images/animal-bd.png)
    - Vá em `SQL editor`/`Editor SQL`:
    ![AnimalSQLEditor](./public/extra-images/animal-bd-sql-editor.png)
    - Cole o arquivo `animal_rows.sql` disponível na pasta `core` do projeto
    - Clique em `run`/`rodar` para preencher a tabela com os dados do projeto

- Terceira etapa: definição das variáveis de ambiente
  - Ainda no Supabase, vá em `Project Settings`/`Configurações do Projeto`:
  ![AnimalSettings](./public/extra-images/animal-bd-settings.png)
  - Clique em `API`:

      ![AnimalAPI](./public/extra-images/animal-bd-api.png)
  - Copie a `URL` e a chave `secret`:
  ![AnimalKeys](./public/extra-images/animal-bd-keys.png)
  - Crie um arquivo chamado `.env` na raiz do projeto e defina as variáveis de ambiente da seguinte forma:
    ```bash
    SUPABASE_URL= #cole aqui a URL do projeto
    SUPABASE_SECRET_KEY= #cole aqui a chave secreta do projeto
    ```
- Quarta e última etapa: execução do projeto
    - No terminal, digite os seguintes comandos para instalar as dependências necessárias, rodar o projeto e os testes do projeto, respectivamente:
        ```bash
        npm install
        npm run dev
        npm run test
        ```
## Pessoas autoras
### Natália Félix Macedo
<img src="https://avatars.githubusercontent.com/u/126514540?s=400&u=1912c3c0fed305105e7246b1724daea8a3ed0b1b&v=4" alt="Mulher de 22 anos, branca, com olhos castanhos escuros e cabelo ondulado nas cores preto e vermelho. Na foto, Natália está sorrindo e utilizando uma blusa de alcinha na cor vermelha." style="width: 100px"> 

[![Linkedin: nataliafelixm](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nataliafelixm/)
[![Gmail: nfelixmacedo@gmail.com](https://img.shields.io/badge/Gmail-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:nfelixmacedo@gmail.com)

## Próximos passos

- [ ] Implementação do algoritmo de paginação
- [ ] Aprimoramento do algoritmo de upload das imagens
- [ ] Aprimoramento do Banco de Dados
