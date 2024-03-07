Cypress.Commands.add('FillMandatoryFieldsAndSubmit', ()=>{
    cy.get('#firstName').type('Lucas', {delay:0})
    cy.get('#lastName').type('Marco', {delay:0})
    cy.get('#email').type('Jooj@gmail.com', {delay:0})
    cy.get('#phone').type('2', {delay:0})
    cy.get('#open-text-area').type('"Lorem ipsum dolor sit amet, consectetur"', {delay:0})
    cy.get('button[type="submit"]').click()
})