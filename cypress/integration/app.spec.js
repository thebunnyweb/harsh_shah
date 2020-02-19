context('sonalake-task-react App', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should display the title', () => {
    cy.get('h1').should('have.text', 'List View');
  });
});
