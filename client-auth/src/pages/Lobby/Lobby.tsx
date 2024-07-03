import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Lobby = () => {
  const { push } = useHistory();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/test');
        console.log({ data });
      } catch (error) {
        console.log(error);
      }
    },
    retry: false,
    staleTime: 0,
  });

  return (
    <>
      <div>Lobby</div>
      <button onClick={() => push('/')}>Ir al inicio</button>
      <button onClick={() => push('/login')}>Ir al login</button>
    </>
  );
};

export default Lobby;
