import React from 'react';
import BackButton from "../../../components/BackButton/BackButton";

class UserInstruction extends React.Component {

  render() {
    return (
      <div>
        <BackButton/>
        <p>
          Инструкция пользователя.
        </p>
      </div>
    );
  }

}

export default UserInstruction;
