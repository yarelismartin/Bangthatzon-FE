import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { useAuth } from '../utils/context/authContext';
import { updateSingleUser } from '../api/UserData';

const nullProfile = {
  username: '',
  firstName: '',
  lastName: '',
  address: '',
  email: '',
  image: '',
};

export default function RegisterForm({ onUpdate, profileObj }) {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  // const router = useRouter();
  const [formData, setFormData] = useState(nullProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileObj?.id) {
      updateSingleUser(profileObj.id, formData).then(() => {
        onUpdate();
        router.push('/profile');
      });
    } else {
      registerUser({
        ...formData,
        uid: user.fbUser.uid,
      }).then(() => updateUser(user.fbUser.uid).then(() => {
        onUpdate();
        router.push('/products');
      }));
    }
  };

  useEffect(() => {
    if (profileObj?.id) {
      setFormData(profileObj);
    }
  }, [profileObj, user.fbUser.uid]);

  return (
    <Form onSubmit={handleSubmit} className="mt-10">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridfirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridlastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your Last Name" name="lastName" value={formData.lastName} required onChange={handleChange} />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formGridDisplayName">
        <Form.Label>Display Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your Display Name" name="username" value={formData.username} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridemail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter your Email Address" name="email" value={formData.email} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Apartment, studio, or floor" name="address" value={formData.address} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridImage">
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" placeholder="Enter Image URL of yourself" name="image" value={formData.image} onChange={handleChange} required />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  profileObj: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
  profileObj: nullProfile,
};
