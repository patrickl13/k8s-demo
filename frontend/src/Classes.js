import React, { Component } from 'react';
import axios from 'axios';

class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
        classes:[]
    };
  }

  componentDidMount() {
    this.fetchClasses();
  }

  async fetchClasses() {
    const data = await axios.get('/backend/classes');
    this.setState({ classes: data.data.classes });
  }

  renderClasses() {
    return this.state.classes.map( item => {
      return (
        <div key={item.id}>
          <p> Class: {item.class}</p>
          <ul>
            <p> Prerequisities </p>
          {
            item.prerequisites.map( prereq => {
              return (
                <li> {prereq.class} </li>
              );
            })
          }
          </ul>
        </div>
      );
    })
  }

  render() {

      return(
        <div>
          {this.renderClasses()}
        </div>
      );
  }
}

export default Classes;