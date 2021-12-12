import React from 'react';
import { useQuery } from '@apollo/client';

import ProfileList from '../components/ProfileList';
import { QUERY_USER } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const users = data?.users || [];

  // console.log(users);

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProfileList
              users={users}
              title="Placeholder Title"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
