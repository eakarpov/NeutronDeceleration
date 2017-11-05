import React from 'react';
import PropTypes from 'prop-types';

class AdminInstruction extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div>
        <button onClick={ this.context.router.history.goBack }>Вернуться назад</button>
        <p>
          Инструкция администратора.
        </p>
      </div>
    );
  }

}

export default AdminInstruction;
