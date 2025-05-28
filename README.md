# Organize Backend

Bem-vindo ao repositório do **Organize Backend**! Este projeto serve como a base para o gerenciamento e organização de dados e eventos de domínio.

## 🚀 Funcionalidades

### Funcionalidades Implementadas

- **Sistema de Eventos de Domínio**:
  - Implementação de eventos de domínio para entidades, permitindo o disparo e o consumo de eventos.
  - Registro de subscritores para manipular eventos, como a criação de novas entidades.

### Funcionalidades Planejadas

- **Gestão de Clientes (Customers)**:

  - Cadastro de usuários como clientes.
  - Listagem de clientes.

- **Gestão de Vendas**:

  - Criação de vínculo entre um cliente e uma venda.

- **Rotas para Itens**:
  - Rota para buscar ID e nome de todos os itens com `/all`.
  - Rota geral configurável com parâmetros em `/`.

## 🛠️ Tecnologias Utilizadas

- **Linguagem de Programação:** Typescript
- **Framework:** Nestjs
- **Banco de Dados:** PostgreSql
- **Outras Dependências:** Prisma ORM

## 📦 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/eduardobertozi/organize-backend.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd organize-backend
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` com base no modelo `.env.example`.
   - Configure as variáveis necessárias, como credenciais do banco de dados.

5. Inicie o servidor:
   ```bash
   npm start
   ```

## 🔧 Uso

- **Rota `/all`:** Retorna todos os itens com ID e nome.
- **Rota `/`:** Rota geral configurável com parâmetros.
- [Adicione outras rotas e funcionalidades conforme necessário.]

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir, siga estas etapas:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ou correção (`git checkout -b minha-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona minha feature'`).
4. Envie para a branch principal (`git push origin minha-feature`).
5. Abra um Pull Request.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

_Criado por [eduardobertozi](https://github.com/eduardobertozi)._
