import React from 'react';

export default class Groupboard extends React.Component {
  render() {
    return (<div>
      <form>
        <label htmlFor="name" >Название</label>
        <input type="text" id="name" />
        <button role="button">+</button>
      </form>
      <div>
        <p>Здесь будет список существующих юзеров</p>
      </div>
    </div>)
  }
}