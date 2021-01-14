import React, { Component } from 'react';
import '../App.css';

class MyFavesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      favourites: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.deleteFave = this.deleteFave.bind(this);
  }
    
  //Display list of favourite media (on page load)
  componentDidMount() {
    fetch("/favesList") //Send GET request to server
    .then(res => res.json()) //read fetched JSON data
    .then(
      (result) => {
        this.setState({
          favourites: JSON.parse(result.message), //set 'favourites' state as fetched JSON data
          isLoaded: true
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  //Delete item from favourites list
  deleteFave(item) {
    fetch("/favesList", {
      method: "DELETE", //Send DELETE request to server
      headers: {
        "Content-Type": "application/json"
      }, // send server 'trackName' of item user wants to delete
      body: JSON.stringify({ trackName: item.trackName }),
    })
    .then(res => res.json())
    .catch(error => console.log('Error:', error));
    alert('Deleted from favourites!'); //alert user that item was deleted from favourites
    window.location.reload() //reload window to display updated 'favourites' list
  }

  //Display content depending on whether fetch has failed, fetch is loading or fetch is successful
  render() {
    const { error, isLoaded, favourites } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    else if (!isLoaded) {
      return <div>LOADING...</div>;
    }
    else {
      return (
        <div className="App">
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossorigin="anonymous"/>
          <h3 className="pageTitle">My Favourites</h3>
          <br></br>
          <ul id="favouriteList">
            {favourites.map(favourite => { //map through array of 'favourite' media + include delete button for each item
              return (
                <li key={favourite.trackName}>
                  <p><b>{favourite.trackName}</b>        ({favourite.contentAdvisory})</p>
                  <p>By: {favourite.artistName} </p>
                  <p><small>{favourite.mediaKind} ({favourite.genre}) - released {favourite.releaseDate}</small></p>
                  <p><b>${favourite.trackPrice} USD</b></p>
                  <button id="delButton" onClick={(e) => this.deleteFave(favourite)}>Delete</button>
                  <hr></hr>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default MyFavesList;
