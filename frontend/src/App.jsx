import { Container } from '@mui/material';
import Navbar from './components/navbar/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <Container>
        <h1 className='open-sans-title'>My App</h1>
        <p className='open-sans-text'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga error
          asperiores natus eius possimus, iure unde ut exercitationem in alias
          hic mollitia et quo ipsa maxime expedita veniam? Officiis, temporibus!
        </p>
      </Container>
    </>
  );
}
