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

        cy.url().should('equal', 'http://localhost:3000/search?title=harry&page=0&sorttype=TITLE&sortvalue=ASC')

        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(0).contains('Harry Potter and the Chamber of Secrets')  // could also use should('contain'), however, this will throw assertion error
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(1).contains('Harry Potter and the Goblet of Fire')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(2).contains('Harry Potter and the Half-Blood Prince')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(3).contains('Harry Potter and the Order of the Phoenix')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(4).contains('Harry Potter and the Prisoner of Azkaban')

        cy.get('img[src="/sort.png"]').click()

        cy.url().should('equal', 'http://localhost:3000/search?title=harry&page=0&sorttype=TITLE&sortvalue=DESC')

        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(4).contains('Harry Potter and the Chamber of Secrets')  // could also use should('contain'), however, this will throw assertion error
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(3).contains('Harry Potter and the Goblet of Fire')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(2).contains('Harry Potter and the Half-Blood Prince')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(1).contains('Harry Potter and the Order of the Phoenix')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(0).contains('Harry Potter and the Prisoner of Azkaban')

        cy.get('div[role="listbox"]').eq(0).click()
        cy.get('div[role="option"]').eq(2).click()

        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(0).contains('Harry Potter and the Prisoner of Azkaban')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(1).contains('Harry Potter and the Goblet of Fire')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(2).contains('Harry Potter and the Half-Blood Prince')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(3).contains('Harry Potter and the Order of the Phoenix')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(4).contains('Harry Potter and the Chamber of Secrets')  // could also use should('contain'), however, this will throw assertion error

        cy.get('div[role="listbox"]').eq(0).click()
        cy.get('div[role="option"]').eq(1).click()

        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(0).contains('Harry Potter and the Half-Blood Prince')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(1).contains('Harry Potter and the Order of the Phoenix')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(2).contains('Harry Potter and the Goblet of Fire')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(3).contains('Harry Potter and the Prisoner of Azkaban')
        cy.get('div[id="dashboardWrapper"]').eq(0).children().eq(4).contains('Harry Potter and the Chamber of Secrets')  // could also use should('contain'), however, this will throw assertion error
    })

    // it('Should open movie and fetch when entering url', () => {
    //     cy.visit('/movies/82c18872-d4b8-420e-a791-0370a0023e78')
    //     cy.get('button[id="closemodalbutton"]').click()

    //     cy.get('.header').should('contain', 'The Adventures of Sharkboy and Lavagirl 3-D (2005)')

    //     cy.get('div[id="plot"]').should('contain', 'A young boy is recruited by his imaginary friends Sharkboy and Lavagirl to help save their planet.')

    // })
})
