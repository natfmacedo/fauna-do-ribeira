describe("Fauna do Ribeira - Index", () => {
    it("when load, renders the page", () => {
        cy.visit("http://localhost:3000");
        cy.get(".banner__link").click();
        cy.get("#tooltip-description")
            .should("be.hidden")
            .invoke("show")
            .click();
        cy.get(".accordion").click();
        cy.get(".footer__logo").scrollIntoView();
    });
});
