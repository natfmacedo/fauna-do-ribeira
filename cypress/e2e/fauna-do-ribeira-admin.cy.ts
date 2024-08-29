describe("Fauna do Ribeira - Admin", () => {
    it("to register a new animal, it's necessary to visit the admin page, click on the register animal button, fill the fields in the registration form and click 'register'", () => {
        cy.visit("http://localhost:3000/admin", { timeout: 60000 });
        cy.get("#createAnimalTableButton").click();
        cy.get("[name='animalName']", { timeout: 100000 }).type("Queixada");
        cy.get("[name='animalScientificName'").type("Tayassu pecari");
        cy.get("[name='animalCharacteristics'").type(
            "Pertencente ao Reino Animalia e à Ordem Artiodactyla, o Queixada é o maior animal da família de porcos selvagens da América do Sul. Possui cerca de 1,1 metro de comprimento e pesa entre 20 e 40 quilos."
        );
        cy.get("[name='animalEating'").type(
            "Frutos, raízes, sementes, larvas de insetos e minhocas."
        );
        cy.get("[name='animalLocation'").type(
            "Cananéia, Juquiá, Miracatu e Tapiraí."
        );
        cy.get("[name='animalIucnState'").select("Em perigo (EN)");
        cy.get("[name='animalImage']").selectFile(
            "cypress/fixtures/image/queixada.png"
        );
        cy.get("[name='animalImageDescription']").type(
            "Quatro mamíferos adultos parecidos com porcos domésticos com cerca de cento e treze centímetros de comprimento, três centímetros de cauda e cinquenta e cinco de altura, possuem pelagem em tons de castanho-acinzentado e preto com uma mancha branca na mandíbula inferior que vai até o focinho, há também a presença de grandes presas na boca. A imagem também conta com um filhote de queixada. Foto via Thinkstock."
        );
        cy.get("[name='animalLink']").type(
            "https://oncafari.org/especie_fauna/queixada/"
        );
        cy.get("[name='createAnimal']").click();
        cy.get("#backToTable", { timeout: 100000 }).click();
        cy.get(".table__body__content", { timeout: 100000 }).contains(
            "Queixada"
        );
    });
    it("to edit animal's data, it's necessary to click on the edit button from the table, change the desired data and click on 'update'", () => {
        cy.visit("http://localhost:3000/admin", { timeout: 60000 });
        cy.get("#updateAnimalTableButton").click();
        cy.get("[name='animalIucnState'", { timeout: 100000 }).select(
            "Vulnerável (VU)"
        );
        cy.get("[name='updateAnimal']").click();
        cy.get("#backToTable").click();
        cy.get(".table__body__content", { timeout: 100000 }).contains(
            "Vulnerável (VU)"
        );
    });
    it("to delete an animal, it's necessary to click on the delete button from the table and confirm the exclusion by clicking 'delete'", () => {
        cy.visit("http://localhost:3000/admin", { timeout: 60000 });
        cy.get("#deleteAnimalTableButton").click();
        cy.get("[name='deleteAnimal']", { timeout: 100000 }).click();
    });
});
