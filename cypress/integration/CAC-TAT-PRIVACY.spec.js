describe('Politica de privacidade da CAC-TAT', ()=> {
    it('testa a página da política de privacidade de forma independente', ()=> {
        cy.visit('./src/privacy.html')
        cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.').should('be.visible')
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
    })
})