import React, { Component } from 'react';
import Nav from './navbar.jsx';
import ImageItem from './ImageItem.jsx';
import ImageBoard from './imageBoard.jsx';
import SignPage from './SignPage.jsx'

class App extends Component {
    render() {
        return (
            
            <div style={{fontFamily: "Avenir"}}>
           
                <Nav />
                <ImageBoard />
            </div>
        );
    }
}

export default App;
