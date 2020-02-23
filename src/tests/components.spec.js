import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { Alert, Navbar, ListView, Modal, TableRenderer } from '../components';

describe('Alert Component Check', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Alert data={{ message: 'Test' }} flag="success" />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it('changes class according to flag', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Alert data={{ message: 'Test' }} flag="success" />
      </MemoryRouter>,
      div
    );
    expect(div.innerHTML).toEqual(
      `<div class="alert alert-success">Test</div>`
    );
  });
});

describe('Navbar Component Check', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('ListView Component Check', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <ListView />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('ModalComponent Component Check', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <Modal />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('TableRendererComponent Component Check', () => {
  it('renders without crashing', () => {
    let data = [
      {
        id: 1,
        name: 'Test',
        species: 'Test Species',
        gender: 'male',
        homeworld: 'Test World'
      }
    ];
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <TableRenderer data={data} />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
