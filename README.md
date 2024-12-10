# Diet Tracker API

## Descrição
O **Diet Tracker API** é um sistema projetado para o gerenciamento de usuários e suas refeições. Ele permite que os usuários monitorem sua alimentação e acompanhem metas relacionadas à dieta. A API será desenvolvida utilizando **Fastify**, **Knex**, **Zod**, **SQLite3** e **cookies** para identificação de usuários.

## Funcionalidades

### Usuários
- **Criação de usuários:** Permite criar um novo usuário.
- **Identificação do usuário:** Utiliza cookies para associar cada requisição ao usuário autenticado.

### Refeições
- **Registrar refeição:** Um usuário pode registrar refeições com as seguintes informações:
  - Nome
  - Descrição
  - Data e hora
  - Informação se está dentro ou fora da dieta
- **Relacionamento com usuário:** Cada refeição está vinculada a um usuário específico.
- **Editar refeição:** Um usuário pode atualizar qualquer informação da refeição.
- **Excluir refeição:** Um usuário pode remover uma refeição.
- **Listar refeições:** Um usuário pode visualizar todas as suas refeições registradas.
- **Visualizar refeição:** É possível visualizar os detalhes de uma refeição específica.

### Métricas do Usuário
- **Quantidade total de refeições registradas.**
- **Quantidade total de refeições dentro da dieta.**
- **Quantidade total de refeições fora da dieta.**
- **Melhor sequência de refeições dentro da dieta:** A sequência máxima de refeições consecutivas dentro da dieta.

### Regras de Acesso
- Um usuário só pode visualizar, editar ou excluir as refeições que ele mesmo criou.

## Tecnologias Utilizadas
- **Fastify:** Framework web rápido e eficiente para construir APIs.
- **Knex:** Query builder para interação com o banco de dados.
- **Zod:** Biblioteca para validação e definição de esquemas.
- **SQLite3:** Banco de dados leve e eficiente para armazenamento local.
- **Cookies:** Utilizados para autenticar e identificar o usuário em cada requisição.
- **TypeScript:** Linguagem para adicionar tipagem estática ao JavaScript, garantindo maior segurança e clareza no código.


