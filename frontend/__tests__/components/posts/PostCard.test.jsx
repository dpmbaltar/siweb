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

  const nombreUsuario = screen.getByText(/Juan Pérez/i);
  const fechaPublicacion = screen.getByText(/2024-11-22/i);
  const textoTitulo = screen.getByText(/Perrita perdida llamada India/i);
  const textoContenido = screen.getByText(/India, nuestra perrita, se ha perdido/i);

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

test('renderiza el título y contenido correctamente en el PostCard', () => {
  render(<PostCard datosPublicacion={mockPost} />);

  const titulo = screen.getByRole('heading');
  const contenido = screen.getByRole('paragraph');

  expect(titulo).toBeInTheDocument();
  expect(contenido).toBeInTheDocument();
  expect(titulo).toHaveTextContent(mockPost.titulo);
  expect(contenido).toHaveTextContent(mockPost.contenido);
});

test('renderiza el botón para ver más acerca de una publicación en un PostCard', () => {
  render(<PostCard datosPublicacion={mockPost} />);

  const botones = screen.getAllByRole('button');
  const botonVerMas = botones[botones.length - 1];

  expect(botonVerMas).toBeInTheDocument();
  expect(botonVerMas).toHaveTextContent('Ver más');

  fireEvent.click(botonVerMas);
  expect(mockUseNavigate).toHaveBeenCalledTimes(1);
});

test('no debería renderizar con datos incompletos', () => {
  render(<PostCard datosPublicacion={{}} />);

  const titulo = screen.getByRole('heading');

  expect(titulo).toBeInTheDocument();
  expect(titulo).toHaveTextContent('Error');
});
