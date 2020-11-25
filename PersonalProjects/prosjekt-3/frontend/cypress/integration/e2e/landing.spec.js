/// <reference types="cypress" />

context('Landing', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it("has modal and close", () => {
        cy.get('button[id="closemodalbutton"]').click()
    })

    it("Focus on search input", () => {
        cy.get('input').should("be.focused");
    });

    it('get landing', () => {
        cy.get('button[id="closemodalbutton"]').click()
        const movieName = 'harry'
        cy.get('input')
            .type(movieName)
            .should("have.value", movieName)
            .type("{enter}").get('div[id="dashboardWrapper"]').eq(0).children().should('have.length', 5)

        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(0).contains('Harry Potter and the Order of the Phoenix')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(1).contains('Harry Potter and the Prisoner of Azkaban')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(2).contains('Harry Potter and the Chamber of Secrets')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(2).click()

        cy.get('.header').should('contain', 'Harry Potter and the Half-Blood Prince (2009)').then(r => {
            console.log(r)
        })

        cy.url().should('equal', 'http://localhost:3000/movies/c1f8a7bf-c78d-4aca-a5e0-9bbe5d4d2709')
    })

    it('Should open movie and fetch when entering url', () => {
        cy.visit('/movies/82c18872-d4b8-420e-a791-0370a0023e78')
        cy.get('button[id="closemodalbutton"]').click()

        cy.get('.header').should('contain', 'The Adventures of Sharkboy and Lavagirl 3-D (2005)')

        cy.get('div[id="plot"]').should('contain', 'A young boy is recruited by his imaginary friends Sharkboy and Lavagirl to help save their planet.')

    })
})
