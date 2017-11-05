import React from 'react';

class Userboard extends React.Component {
  render() {
    const groups = [{
      id: 12345,
      name: "Б13-508"
    }];
    const groupsToRender = groups.map((el, i) => <option key={i} id={el.id}>{el.name}</option>);
    return (<div>
      <form>
        <label htmlFor="name" >Имя</label>
        <input type="text" id="name" />
        <label htmlFor="surname">Фамилия</label>
        <input type="text" id="surname" />
        <select id="groups_chooser">
          { groupsToRender }
        </select>
        <button role="button">+</button>
      </form>
      <div>
        <p>Здесь будет список существующих юзеров</p>
      </div>
    </div>);
  }
}

export default Userboard;