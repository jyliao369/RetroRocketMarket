import React from "react";
// import { Link } from 'react-router-dom';

const ProfileList = ({ users, title }) => {
  if (!users.length) {
    return <h3>No Profiles Yet</h3>;
  }

  return (
    <div className="profilepage">
      {users &&
        users.map((user) => (
          <div key={user._id} className="usercard">
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        ))}
    </div>
  );
};

export default ProfileList;
