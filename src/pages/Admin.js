import useAxiosInstance from '../hooks/use-axios-instance';
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";

function Admin(props) {
  const { getUsers } = useAxiosInstance();
  const [userCount, setUserCount] = useState(null);
  useEffect(() => {
    getUsers().then((response) => {
      setUserCount(response.data.users)
    }).catch(function (err) {
      alert(err)
    });
  }, [getUsers])
  return (
    <div className='text-center'>
      <Helmet>
        <title>Admin</title>
        <meta
          name="description"
          content="Dashboard for admin users only" />
      </Helmet>
      <h1 style={{ paddingTop: '20rem' }}>Total Users</h1>
      <h1 style={{ fontSize: '20rem' }}>{userCount}</h1>
    </div>

  )
}

export default Admin;