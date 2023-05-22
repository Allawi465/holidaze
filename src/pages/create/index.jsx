import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { CreateVenueForm } from '../../form';
import { AuthContext } from '../../api';
import { load } from '../../utils/localStorage';

function Create() {
  const { dataLogin } = useContext(AuthContext);
  const token = dataLogin?.token || load('token');
  const venueManger =
    load('venueManger') || (dataLogin && dataLogin.venueManger);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (token && venueManger) {
      setLoggedIn(true);
    } else {
      navigate('/', { replace: true });
      setLoggedIn(false);
    }
  }, [navigate, token, venueManger]);

  if (!loggedIn) {
    return null;
  }

  return (
    <Container>
      <div className="create my-5">
        <div className="create-container">
          <h1 className="h4 mx-1">Host your own place</h1>
          <p className="mx-1">Earn passive income by renting properties!</p>
          <CreateVenueForm />
        </div>
      </div>
    </Container>
  );
}

export default Create;
