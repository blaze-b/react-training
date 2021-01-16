
import './App.css';
import { Component } from 'react';
import axios from 'axios';
import Loading from "./component/Loading";
// Stateful
class App extends Component {
  constructor(props) {
    super(props);
    // Create State
    // Get all the users and store in the state
    this.state = {
      users: [],
      loading: false
    }
    // bind the methods
    this.handleSubmit = this.handleSubmit.bind;
  }


  componentWillMount() {
    this.getUsers();
  }

  getUsers() {
    this.setState({
      loading: true
    });
    axios('https://randomuser.me/api/?nat=us&results=5')
      .then(response => {
        console.log(response);
        this.setState({
          users: [...this.state.users, ...response.data.results],
          loading: false
        })
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
    console.log("More user loaded");
  }

  // JSX Html plus javascript {} curly braces for using the javascript
  render() {
    // Destructuring
    const { loading, users } = this.state;
    return (
      <div className="App">

        <div className = "form">
          <form onSubmit={this.handleSubmit}>
            <input type="text"/>
          </form>
        </div>
        <hr />
        {!loading
          ? users.map(user =>
            <div key={user.id.value}>
              {/* Inline styling */}
              <h1 style={{ color: 'red' }}> Name: {user.name.first}</h1>
              <p>Email Address: {user.email}</p>
              <p>Cell Phone : {user.cell}</p>
              <p>Location: {user.location.city}</p>
              <hr />
            </div>
          ) : (<Loading message='Loading.....' />)
        }
      </div>
    );
  }
}

export default App;
