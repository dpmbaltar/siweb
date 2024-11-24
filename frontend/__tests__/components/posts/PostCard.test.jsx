import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import PostCard from '../../../src/components/postCard/PostCard';
import posts from '../../../__mocks__/posts';

const mockPost = posts[0];
const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

test('muestra los datos de una publicación en un PostCard', () => {
  render(<PostCard datosPublicacion={mockPost} />);

  const nombreUsuario = screen.getByText(/Perra perdida/i);
  const fechaPublicacion = screen.getByText(/2024-11-18/i);
  const textoTitulo = screen.getByText(/Juan Pérez/i);
  const textoContenido = screen.getByText(/Perdida en zona centro/i);

  expect(nombreUsuario).toBeInTheDocument();
  expect(fechaPublicacion).toBeInTheDocument();
  expect(textoTitulo).toBeInTheDocument();
  expect(textoContenido).toBeInTheDocument();
});

test('renderiza imagen de una publicación en un PostCard', () => {
  render(<PostCard datosPublicacion={mockPost} />);

  const imagen = screen.getByRole('img', { alt: 'Perra perdida' });
  expect(imagen).toBeInTheDocument();
});

test('renderiza el botón para ver más acerca de una publicación en un PostCard', () => {
  render(<PostCard datosPublicacion={mockPost} />);

  const botones = screen.getAllByRole('button');
  const botonVerMas = botones[botones.length - 1];

  expect(botonVerMas).toBeInTheDocument();
  expect(botonVerMas).toHaveTextContent('Ver más');
});
