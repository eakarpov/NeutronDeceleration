import React from 'react';
import BackButton from "../../../components/BackButton/BackButton";

class AdminInstruction extends React.Component {

  render() {
    return (
      <div>
        <BackButton/>
        <p>
          Инструкция администратора.
        </p>
      </div>
    );
  }

}

export default AdminInstruction;
