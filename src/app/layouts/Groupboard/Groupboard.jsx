import React from 'react';
import {addGroup, listGroups} from '../../../redux/modules/actions/groups';
import {connect} from 'react-redux';

class Groupboard extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }
  componentWillMount() {
    this.props.listGroups();
  }
  submitForm(e) {
    e.preventDefault();
    const groupName = e.target.name.value;
    this.props.addGroup(groupName, true);
    e.target.name.value = "";
  }
  render() {
    const groups = this.props.groups.map((el, i) => <p key={i}><b>Группа: </b>{el.groupName}</p>);
    return (<div>
      <form onSubmit={this.submitForm}>
        <label htmlFor="name" >Название</label>
        <input type="text" id="name" />
        <button role="button">+</button>
      </form>
      <div>
        {groups}
      </div>
    </div>)
  }
}

const mapStateToProps = state => ({
  groups: state.groups
});

const mapDispatchToProps = {
  addGroup,
  listGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(Groupboard);