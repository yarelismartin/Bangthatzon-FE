import React, { useEffect, useState } from 'react';
import RegisterForm from '../../../components/RegisterForm';
import { getSingleUser } from '../../../api/UserData';
import { useAuth } from '../../../utils/context/authContext';

export default function EditProfile() {
  const [profileToEdit, setProfileToEdit] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;

    if (user.uid) {
      getSingleUser(user.uid).then((data) => {
        if (isMounted) {
          setProfileToEdit(data);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [user.uid]);

  const handleUpdate = () => {
    getSingleUser(user.uid).then(setProfileToEdit);
  };

  return (
    <div>
      <RegisterForm profileObj={profileToEdit} onUpdate={handleUpdate} />
    </div>
  );
}
