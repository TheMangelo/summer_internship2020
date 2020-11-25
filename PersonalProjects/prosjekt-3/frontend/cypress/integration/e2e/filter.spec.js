/// <reference types="cypress" />

context('Landing', () => {
    beforeEach(() => {
        cy.visit('/')
    })



    it('search sort', () => {
        cy.get('button[id="closemodalbutton"]').click()
        const movieName = 'harry'
        cy.get('input')
            .type(movieName)
            .should("have.value", movieName)
            .type("{enter}")

        cy.get('div.divider').eq(1).click()
        cy.get('input.search').eq(0).type('Action').type('{enter}')
        cy.get('input.search').eq(0).type('{esc}')
        cy.get('button[id="executeButton"]').click()
        cy.get('div[id="dashboardWrapper"]').eq(0).children().should('have.length', 2)

    })

    // it('Should open movie and fetch when entering url', () => {
    //     cy.visit('/movies/82c18872-d4b8-420e-a791-0370a0023e78')
    //     cy.get('button[id="closemodalbutton"]').click()

    //     cy.get('.header').should('contain', 'The Adventures of Sharkboy and Lavagirl 3-D (2005)')

    //     cy.get('div[id="plot"]').should('contain', 'A young boy is recruited by his imaginary friends Sharkboy and Lavagirl to help save their planet.')

    // })
})
