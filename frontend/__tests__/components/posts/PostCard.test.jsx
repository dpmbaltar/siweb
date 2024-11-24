import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import PostCard from '../../../src/components/postCard/PostCard';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

const post = {
  id: 1,
  titulo: "Título",
  contenido: "Contenido",
  usuario: {
    nombre: "Diego",
    apellido: "Baltar"
  },
  archivos: [
    { id: 1 }
  ]
};

test('renderiza un post card', () => {
  render(<PostCard datosPublicacion={post} />);

  const textoTitulo = screen.getByText(/Título/i);
  expect(textoTitulo).toBeInTheDocument();
});
