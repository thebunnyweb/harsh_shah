context('sonalake delete test', () => {
  beforeEach(() => {
    cy.visit('');
  });
  it('should have test record', () => {
    cy.get('#searchInput').type('Testing e2e');
    cy.wait(1000);
    cy.get('.container').should('not.contain', 'No Results Found');
  });

  it('should show modal dialog', () => {
    cy.get('#searchInput').type('Testing e2e');
    cy.wait(1000);
    cy.get('tbody > tr:first-child')
      .find('button.btn-danger')
      .click();
    cy.get('#modal')
      .should('contain', 'Are you sure you want to delete this record ?')
      .and('be.visible');
  });

  it('should delete test record', () => {
    cy.get('#searchInput').type('Testing e2e');
    cy.wait(1000);
    cy.get('tbody > tr:first-child')
      .find('button.btn-danger')
      .click();
    cy.get('#modal')
      .find('button.btn-primary')
      .click();
  });
});
