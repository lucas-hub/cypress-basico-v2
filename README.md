-- Documentação do projeto CAC-TAT testes automatizados -- 

### O projeto CAC-TAT é um projeto de estudo, utilizando o framework Cypress e testando uma aplicação web com múltiplas funcionalidades

### Pré-requisitos para o projeto:
- Cypress v9.5.1
- Npm e NODE.js pelo menos na v10.0.0
- Github e git
- Um code.IDE de sua confiança

### Instalação das dependências:
- Como instalar cada ferramenta utilizada no projeto

### Passos para rodar um teste:
- Crie um arquivo .js dentro da pasta ./cypress/integration
- Escreva os testes nesse arquivo
- No arquivo "package.json" escreva alguns scripts para facilitar a inicialização do teste pelo CMD 
- "scripts": {
    "cy:open":"cypress open",
    "cy:open:mobile":"cypress open --config viewportWidth=410 viewportHeight=860",
    "test":"cypress run",
    "test:mobile":"cypress run --config viewportWidth=410 viewportHeight=860"
  },
- No CMD, use algum desses comandos para rodar da forma que necessário, tanto em modo interativo no cypress ou modo headless, além da resolução padrão de PC ou Mobile.

### Informações adicionais:
- Quebre tudo o que for possível :) no mercy upon the developers
