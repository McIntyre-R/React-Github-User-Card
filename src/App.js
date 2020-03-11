import React from 'react';
import Card from './Components/Card'
import './App.css';
import axios from 'axios'

class App extends React.Component {
  state= {
    user: [],
    followersArray: [],
    userName: 'mcintyre-r',
    userNameSearch: ''
  }

componentDidMount() {
  axios.get(`https://api.github.com/users/${this.state.userName}`)
  .then(response => {
  //  console.log(response.data);
      this.setState({
        user: [response.data]
      })
  })
  .catch(error => {
    console.log("the data was not returned", error);
  })
  
  
   
}

componentDidUpdate() {
  if (this.state.followersArray.length < 1) {
    axios.get(`https://api.github.com/users/${this.state.userName}/followers`)
  .then(response => {
    response.data.map(e => {
     this.setState({
       followersArray: [...this.state.followersArray, e.url]
     })
     })
    //  console.log(this.state.followersArray)
}) 
} else if (this.state.followersArray.length === 10 && this.state.user.length !== 10) {
  // console.log(this.state.followersArray.length, this.state.user.length)
  // console.log(this.state.followersArray)
  this.state.followersArray.map(e => {
    axios.get(e)
    .then(response => {
      this.setState({
        user: [...this.state.user, response.data] 
       })
      //  console.log(response)
  })
    .catch(error => {
      console.log("the data was not returned", error);
    })
  })
}
    
}

handleChanges = e => {
    this.setState({
      userNameSearch: e.target.value

    });
    console.log(this.state.userNameSearch)
  };
 
  userChange = e => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.userNameSearch}/followers`)
      .then(response => {
        this.setState({
          user: response.data
        });
      })
      .catch(err => console.log(err.message));
    this.setState({
      followersArray: [],
      userName: this.state.userNameSearch
    })
    console.log(this.state.userName, this.state.followersArray)
  };


  render(){
    return (
      <div className="App">
        <header className="App-header">
        <input value={this.state.userNameSearch} onChange={this.handleChanges} />
        <button onClick={this.userChange}>New User</button>
          {this.state.user.map(user => {
            return(
              <Card user={user} />
            )
              
          })}
            
        </header>
      </div>
    );
  }
  
}

export default App;
