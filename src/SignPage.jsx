import React, {Component} from 'react';
import {Navbar, Button, Glyphicon, Modal, form, FormControl, DropdownButton, MenuItem, Col} from 'react-bootstrap';
import aja from "aja";
import Nav from './navbar.jsx';

const navStyle = {
    borderRadius: "0%",
    backgroundColor: "white",
    borderBottom: "1px solid #333"
};

class SignPage extends Component{
    constructor() {
        super();
        this.state= {
            modalShown: false   
        }
    }
    
    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }
    
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }
    
    handleSignUp() {
        var username = this.state.username;
        var password = this.state.password;
        aja()
            .method('post')
            .url('http://localhost:8080/user/signup')
            .body({username: username, password: password})
            .on('success', function(data) {
                console.log(data)
                if(data.status == 200) {
                    alert("Registration successful! You can sign in now");
                } else {
                    alert("Enter another username/password");
                }
            })
            .go();
    }

    handleLogIn() {
        var _this = this
        var username = this.state.username;
        var password = this.state.password;
        aja()
            .method('post')
            .url('http://localhost:8080/user/login')
            .body({username: username, password: password})
            .on('success', function(data){
                console.log(data)
                if(data.status == 200) {
                    localStorage.setItem("session", data.data.session)
                    localStorage.setItem("user", data.data.userid)
                    alert("Login successful!")
                    console.log(_this.props.history);
                    _this.props.history.push("/")
                } else {
                    alert("Wrong username/password. Try again!")
                }
            })
        .go();
    }
    
    render(){
        
        return(
            <div>
                <center><h1 style={{ fontFamily: 'Iowan Old Style' , color:"#424242", paddingTop:"50px"}}>Welcome to Reactstagram!</h1></center>
                <Col xs={6} style={{padding: '20px'}}>
                    <form >
                    <h3 style={{ fontFamily: 'Iowan Old Style' , color:"#424242"}}>Log In</h3>
                        <strong>Username: </strong>
                        <FormControl
                            id="formControlsText"
                            type="text"
                            onChange={this.handleUsernameChange.bind(this)}
                            placeholder="Enter your username"
                        />
                        <br />
                        <strong>Password: </strong>
                        <FormControl
                            id="formControlsText"
                            type="password"
                            label="password"
                            onChange={this.handlePasswordChange.bind(this)}
                            placeholder="Enter your password"
                        />
                        <Button bsSize="small" bsStyle="success" onClick={this.handleLogIn.bind(this)}>Login!</Button>
                    </form>
                </Col>
                <Col xs={6} style={{padding: '20px'}}>
                     <form>           
                        <h3 style={{ fontFamily: 'Iowan Old Style' , color:"#424242"}}>Or...Sign up!</h3>
                        <strong>Username: </strong>
                            <FormControl
                                id="formControlsText"
                                type="text"
                                onChange={this.handleUsernameChange.bind(this)}
                                placeholder="Enter your username"
                            />
                        <br />
                        <strong>Password: </strong>
                        <FormControl
                            id="formControlsText"
                            type="password"
                            label="password"
                            onChange={this.handlePasswordChange.bind(this)}
                            placeholder="Enter your password"
                        />
    
                        <Button bsSize="small" bsStyle="warning" onClick={this.handleSignUp.bind(this)}>Signup!</Button>
                    </form>
                </Col>
            </div>
        );
    }
}

export default SignPage;