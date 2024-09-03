/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/UserData';

export default function NavBar() {
  const [userId, setUserId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user.uid) {
      getSingleUser(user.uid)
        .then((u) => {
          setUserId(u.id);
        });
    }
  }, [user]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>CHANGE ME</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href={`/users/${userId}/order_history`}>
              <Nav.Link>Order History</Nav.Link>
            </Link>
            <Link passHref href={`/users/${userId}/orders?status=open`}>
              <Nav.Link>My Cart</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
