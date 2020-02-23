context('sonalake add character test', ()=>{
    it('should contain add button', () => {
        cy.visit('')
        cy.get('.container').should('contain', 'Add New').and('be.visible');
    });

    it('should navigate to addcharacter', ()=>{
        cy.visit('')
        cy.get('a[href="/addcharacter"]').click()
        cy.url().should('eq', 'http://localhost:3001/addcharacter')
    });


    it('should validate all form fields on submit', ()=>{
        cy.visit('http://localhost:3001/addcharacter');
        const validateFormFields = ['name', 'species', 'gender', 'homeworld']
            cy.get('button[type="submit"]').click();
            validateFormFields.forEach((val)=>{
                if(val === 'species'){
                    cy.get(`select[name="${val}"]`).should('have.class', 'is-invalid');
                }else if(val=== 'gender'){
                    cy.get('form').children().should('contain', 'Gender is required.');
                }else{
                    cy.get(`input[name="${val}"]`).should('have.class', 'is-invalid');
                }
            })
            
    })

    // it('should add a record', ()=>{
    //     cy.visit('http://localhost:3001/addcharacter');
    //     cy.get('input[name="name"]').type('Testing e2e');
    //     cy.get('select[name="species"]').select('Aleena');
    //     cy.get('input[name="gender"][value="male"]').check();
    //     cy.get('input[name="homeworld"]').type('Testing e2e Homeworld');
    //     cy.get('button[type="submit"]').click();
    //     cy.get('.container').children().should('contain', 'Character Added Successfully').and('be.visible')
    // });

    it('should validate added entry', ()=>{
        cy.visit('');
        cy.get('#searchInput').type('Testing e2e');
        cy.wait(1000)
        cy.get('.container').should('not.contain', 'No Results Found')
    });

})