import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/UserData';
import { signOut } from '../utils/auth';

export default function Profile() {
  const [userInfo, setUserInfo] = useState();
  const { user } = useAuth();

  const getUser = () => {
    getSingleUser(user.uid).then(setUserInfo);
  };

  useEffect(() => {
    getUser();
  }, [user.uid]);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Header>About You</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <p>
              Name
            </p>
            {userInfo?.firstName} {userInfo?.lastName}
          </ListGroup.Item>
          <ListGroup.Item>
            <p>
              Display Name
            </p>
            {userInfo?.username}
          </ListGroup.Item>
          <ListGroup.Item>
            <p>
              Address
            </p>
            {userInfo?.address}
          </ListGroup.Item>
          <ListGroup.Item>
            <p>
              Email
            </p>
            {userInfo?.email}
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={userInfo?.image} />
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Account</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href={`/profile/edit/${userInfo?.id}`}>Edit Account</Card.Link>
          <Card.Link href="#" onClick={signOut}>Logout</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}
