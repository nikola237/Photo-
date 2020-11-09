import React from 'react';
import Navigation from '../../components/Navigation/Navigation';

const User = (props) => {
  console.log(props);
  return (
    <div>
      <Navigation />
      <div>
        <form>
          <input placeholder="search item" />
          <div>
            <input name="audio" type="checkbox" />
            <input name="video" type="checkbox" />
            <input name="images" type="checkbox" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
