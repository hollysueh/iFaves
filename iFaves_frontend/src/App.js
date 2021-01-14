import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

//Import Components
import DropdownMenu from './Components/DropdownMenu';
import MyFavesList from './Components/MyFavesList';
import SearchAPI from './Components/SearchAPI';

//Render Components
class App extends Component {
  render() {
    return (
      <div className="App">
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossorigin="anonymous"/>
        <h1 id="appHeader">iFaves</h1>   
        <h6 id="appSubHeader">View, save and manage a list of your favourite iMedia!</h6> 
        <hr></hr>  
        <BrowserRouter>
          <DropdownMenu />
          <Route path="/SearchAPI" component={SearchAPI}>
            <SearchAPI />
          </Route>
          <Route path="/MyFavesList" component={MyFavesList}>
            <MyFavesList />
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
