context('sonalake-task-react App', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should display the title', () => {
    cy.get('h1').should('have.text', 'List View');
  });

  it('should display nav and list view link', () => {
    cy.get('.container').then($container=>{
      cy.get('.navbar').children().should('contain', 'List View').and('be.visible')
    })
  });
  
});
