import React from 'react';
import PropTypes from 'prop-types';

class UserInstruction extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div>
        <button onClick={ this.context.router.history.goBack }>Вернуться назад</button>
        <p>
          Инструкция пользователя.
        </p>
      </div>
    );
  }

}

export default UserInstruction;
