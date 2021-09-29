import useAxiosInstance from '../hooks/use-axios-instance';
import { useState, useEffect } from 'react';

function Admin(props) {
  const { getUsers } = useAxiosInstance();
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    getUsers().then((response) => {
      setUserCount(response.data.users)
    }).catch(function (err) {
      alert(err)
    });
  }, [getUsers])
  return (
    <div className='text-center'>
      <h1 style={{paddingTop: '20rem'}}>Total Users</h1>
      <h1 style={{fontSize: '20rem'}}>{userCount}</h1>
    </div>

  )
}

export default Admin;