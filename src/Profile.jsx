import React, {Component} from 'react';
import {Navbar, Button, Glyphicon, Modal, form, FormControl, DropdownButton, MenuItem, Col} from 'react-bootstrap';
import aja from "aja";
import Nav from './navbar.jsx';

const navStyle = {
    borderRadius: "0%",
    backgroundColor: "white",
    borderBottom: "1px solid #333"
};



class Profile extends Component{
    constructor(){
        super();
        this.state={
            imageCount:0
        }
    
    }
    componentDidMount(){
           this.countImages()
       }
       
    countImages(){
        var userID = localStorage.getItem("user")
        console.log(userID)
        var _this = this;
        aja()
            .method("get")
            .url("http://localhost:8080/allimages")
            .on("success", function(data){
                console.log(data)
                for (var i=0;i<data.length;i++){
                    if (data[i].userID==userID){
                        _this.setState({
                            imageCount: _this.state.imageCount + 1
                        })
                    }
                }
            }).go();
    }
  
    render(){
        return(
            <div>
                <Nav />
                <center>
                    <h1 style={{ fontFamily: 'Iowan Old Style' , color:"#424242", paddingTop:"50px"}}>Hello!</h1>
                    You have posted {this.state.imageCount} images
                    <p>good job</p>
                </center>
            </div>
        );
    }
}

export default Profile;