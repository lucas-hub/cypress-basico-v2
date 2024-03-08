/// <reference types="Cypress" />

describe('Central de atendimento ao cliente TAT', ()=>{
    const textao = Cypress._.repeat('Ola classe ', 50)
    beforeEach(()=> {
        cy.visit('./src/index.html')
    })

    Cypress._.times(2, ()=> it('Verificar o titulo da aplicação', ()=> {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    }))

    Cypress._.times(3, ()=> it('preenche os campos obrigatórios e envia o formulário', ()=> {
        cy.clock()
        cy.get('#firstName').type('Lucas', {delay:0})
        cy.get('#lastName').type('Marco', {delay:0})
        cy.get('#email').type('Jooj@gmail.com', {delay:0})
        cy.get('#phone').type('1199999999', {delay:0})
        cy.get('#open-text-area').type(textao, {delay:0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible') 

        cy.tick(3000) // em milissegundos

        cy.get('.success').should('not.be.visible')
    }))

    it('preenche os campos obrigatórios de forma errada e envia o formulário', ()=> {
        cy.clock()
        cy.get('#firstName').type('Lucas', {delay:0})
        cy.get('#lastName').type('Marco', {delay:0})
        cy.get('#email').type('Jooj@.com', {delay:0})
        cy.get('#phone').type('2', {delay:0})
        cy.get('#open-text-area').type(textao, {delay:0})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible') 

        cy.tick(3000)

        cy.get('.error').should('not.be.visible')
    })

    it('numero telefonico foi digitado usando valores não-numericos', ()=>{
        cy.get('#phone').type('ABCDEFGteste').should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
        cy.get('#phone-checkbox').check()
        cy.get('#firstName').type('Lucas', {delay:0})
        cy.get('#lastName').type('Marco', {delay:0})
        cy.get('#email').type('Jooj@gmail.com', {delay:0})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    
    it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
        cy.get('#firstName').type('Lucas', {delay:0}).should('have.value', 'Lucas').clear().should('have.value','')
        cy.get('#lastName').type('Marco', {delay:0}).should('have.value', 'Marco').clear().should('have.value','')
        cy.get('#email').type('Jooj@gmail.com', {delay:0}).should('have.value', 'Jooj@gmail.com').clear().should('have.value','')
        cy.get('#phone').type('1199999999', {delay:0}).should('have.value', '1199999999').clear().should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
        cy.clock()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

        cy.tick(3000)

        cy.get('.error').should('not.be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', ()=> {
        cy.FillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('usando cy.contains', ()=> {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', ()=> {
        cy.get('#product').select('YouTube').should('have.value', 'youtube') //selecionado por texto 'YouTube' na opção
    })

    it('seleciona um produto (mentoria) por seu valor (value)', ()=> {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria') //selecionado por value no HTML na opção
    })

    it('seleciona um produto (Blog) por seu índice', ()=> {
        cy.get('#product').select(1).should('have.value', 'blog') //selecionado por índice no dropdown
    })

    it('marca o tipo de atendimento "Feedback"', ()=> {
        cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
        // ou pode ser cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', ()=> {
        // forma mais simples e menos técnica cy.get('input[type="radio"]').check().each(()=> {}).should('be.checked')
        cy.get('input[type="radio"]').should('have.length', 3).each(($radio)=>{
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', ()=> {
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', ()=> {
        cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        }).should('have.length', 1)
    })

    it('seleciona um arquivo simulando um drag-and-drop', ()=> {
        cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json', {action:"drag-drop"}).
        should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        }).should('have.length', 1)
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=> {
        cy.fixture('example.json').as('testFile')
        cy.get('input[type="file"]').should('not.have.value').selectFile('@testFile').
        should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        }).should('have.length', 1)
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=> {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=> {
        cy.get('#privacy a').invoke('removeAttr', 'target').click() // o invoke removeu a propriedade 'target' para que o link seja aberto na mesma pagina
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', ()=> {
        cy.get('.success').should('not.be.visible').invoke('show').should('be.visible')
        .should('contain', 'Mensagem enviada com sucesso').invoke('hide').should('not.be.visible')

        cy.get('.error').should('not.be.visible').invoke('show').should('be.visible')
        .should('contain', 'Valide os campos obrigatórios!').invoke('hide').should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', ()=> {
        cy.get('#open-text-area').invoke('val', textao).should('have.value', textao)
    })

    it('faz uma requisição HTTP', ()=> {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html').should((response)=>{
        console.log(response)
        const {status, statusText, body} = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.contain('CAC TAT')
        })
    })

    it('achar o gato escondido', ()=> {
        cy.get('#cat').invoke('show').should('be.visible')
        cy.get('#title').invoke('text', 'CAT TAT')
        cy.get('#subtitle').invoke('text', 'Curso daora, eu <3 gatos!')
    })
})