import React, { Component } from 'react';
import {Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import '../App.css';

class searchAPI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            searchTerm: '',
            media: '',
            dropdownTitle: 'Select Media',
            searchResult: []
        };
        this.searchTerm = this.searchTerm.bind(this);
        this.mediaSelect = this.mediaSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.addToFave = this.addToFave.bind(this);
    }

    //Change 'searchTerm' state depending on what text was entered into form
    searchTerm(e) {
        this.setState({
            searchTerm: e
        });
    }
    //Change 'media' state to selected dropdown item's name,
    //Change 'dropdownTitle' state to selected dropdown item's text
    mediaSelect(name, text) {
        this.setState({
            media: name,
            dropdownTitle: text
        });
    }

    //Search iTunes Store for media
    handleSearch(e) {
        this.setState({
            searchResult: [] //Set 'searchResult' state to [] so it displays only new search results
        });
        fetch("/search", { //send POST request to server (as request requires body to be sent to server)
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, // send server search terms to enter in API
            body: JSON.stringify({
                searchTerm: this.state.searchTerm,
                media: this.state.media
            }),
        })
        .then(res => res.json()) //Get results from server
        .then(
            (result) => {
                if (result.resultCount == 0) { //If no results, don't update 'searchResult[]'
                    this.setState({
                        isLoaded: true
                    });
                }
                else if (this.state.media == 'audiobook') { // audiobook data has 'collectionName' & 'collectionPrice' instead of 'trackName' & 'trackPrice'
                    for (let i = 0; i < result.resultCount; i++) { //Loop through results, add each result object to 'searchResult[]' array
                        console.log(result);
                        let searchItem = {};
                        searchItem.id = i;
                        searchItem.artistName = result.results[i].artistName;
                        searchItem.mediaKind = result.results[i].kind;
                        searchItem.trackName = result.results[i].collectionName;
                        searchItem.trackPrice = result.results[i].collectionPrice;
                        searchItem.releaseDate = result.results[i].releaseDate;
                        searchItem.genre = result.results[i].primaryGenreName;
                        searchItem.contentAdvisory = result.results[i].contentAdvisoryRating;
                        this.state.searchResult.push(searchItem);
                    }
                    this.setState({
                        isLoaded: true
                    });
                }
                else {
                    for (let i = 0; i < result.resultCount; i++) { //Loop through results, add each result object to 'searchResult[]' array
                        console.log(result);
                        let searchItem = {};
                        searchItem.id = i;
                        searchItem.artistName = result.results[i].artistName;
                        searchItem.mediaKind = result.results[i].kind;
                        searchItem.trackName = result.results[i].trackName;
                        searchItem.trackPrice = result.results[i].trackPrice;
                        searchItem.releaseDate = result.results[i].releaseDate;
                        searchItem.genre = result.results[i].primaryGenreName;
                        searchItem.contentAdvisory = result.results[i].contentAdvisoryRating;
                        this.state.searchResult.push(searchItem);
                    }
                    this.setState({
                        isLoaded: true
                    });
                }
            }
        )
        .catch(error => console.log('Error:', error));
        e.preventDefault(); //To stop page reloading before displaying fetch results
    }

    //Add search result item to 'favourites' list 
    addToFave(item) {
        fetch("/addFave", { //send POST request to server
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, // send server search result 'item' details, which user wants to add to favourites
            body: JSON.stringify({
                artistName: item.artistName, 
                mediaKind: item.mediaKind, 
                trackName: item.trackName, 
                trackPrice: item.trackPrice, 
                releaseDate: item.releaseDate, 
                genre: item.genre, 
                contentAdvisory: item.contentAdvisory
            }),
        })
        .then(res => res.json())
        .catch(error => console.log('Error:', error));
        alert('Added to favourites!'); //alert user that item was added to favourites
    }

    render() {
        const { searchResult } = this.state;
        return (
            <div className="App">
                <h3 className="pageTitle">Search Itunes and Apple Books Store</h3>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                    integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
                    crossorigin="anonymous"/>
                <Form className="searchForm">
                    <Form.Group>
                        <Form.Label>Search For:</Form.Label>
                        <Form.Control type="text" placeholder="search for..." onChange={(e) => this.searchTerm(e.target.value)}/>
                        <br></br>
                        <Form.Label>Type of Media:</Form.Label>
                        <Dropdown  className="dropdownMenu" id="formDropdown" >
                            <DropdownButton title={this.state.dropdownTitle}>
                                <Dropdown.Item name="movie" onClick={(e) => this.mediaSelect(e.target.name, e.target.textContent)}>Movie</Dropdown.Item>
                                <Dropdown.Item name="podcast" onClick={(e) => this.mediaSelect(e.target.name, e.target.textContent)}>Podcast</Dropdown.Item>
                                <Dropdown.Item name="music" onClick={(e) => this.mediaSelect(e.target.name, e.target.textContent)}>Music</Dropdown.Item>
                                <Dropdown.Item name="audiobook" onClick={(e) => this.mediaSelect(e.target.name, e.target.textContent)}>Audiobook</Dropdown.Item>
                                <Dropdown.Item name="shortFilm" onClick={(e) => this.mediaSelect(e.target.name, e.target.textContent)}>Short Film</Dropdown.Item>
                                <Dropdown.Item name="tvShow" onClick={(e) => this.mediaSelect(e.target.name, e.target.textContent)}>TV Show</Dropdown.Item>
                                <Dropdown.Item name="software" onClick={(e) => this.mediaSelect(e.target.name, e.target.textContent)}>Software</Dropdown.Item>
                                <Dropdown.Item name="ebook" onClick={(e) => this.mediaSelect(e.target.name, e.target.textContent)}>eBook</Dropdown.Item>
                                <Dropdown.Item name="" onClick={(e) => this.mediaSelect(e.target.name, e.target.textContent)}><b>All</b></Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                    </Form.Group>
                    <br></br>
                    <button className="formButton" variant="primary" type="submit" onClick={this.handleSearch} >
                    Search
                    </button>
                </Form>
                <br></br>
                <h2>Results</h2>
                <ul id="resultList">
                    {searchResult.map(result => { //map through array of 'searchResult's + include 'add to fave' button for each item
                        return (
                            <li id="resultList" key={result.id}>
                                
                                <p><b>{result.trackName}</b>         ({result.contentAdvisory})</p>
                                <p>By: {result.artistName}</p>
                                <p><small>{result.mediaKind} ({result.genre}) - released {result.releaseDate}</small></p>
                                <p><b>${result.trackPrice} USD</b></p>
                                <button id="addButton" onClick={(e) => this.addToFave(result)}>Add to iFaves</button>
                                <hr></hr>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default searchAPI;

/*
REFERENCES:
Dropdown Menu:  https://stackoverflow.com/questions/56388220/how-can-i-properly-change-the-title-of-react-bootstrap-dropdownbutton-on-click
Add fetched data to searchResult array:  https://www.codegrepper.com/code-examples/javascript/add+a+new+key+value+pair+js
*/
