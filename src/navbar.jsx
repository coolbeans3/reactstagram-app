import React, {Component} from 'react';
import {Navbar, Button, Glyphicon, Modal, form, FormControl, DropdownButton, MenuItem} from 'react-bootstrap';
import aja from "aja";
import Webcam from 'react-webcam';
import './imageFilters.css'

const navStyle = {
    borderRadius: "0%",
    backgroundColor: "white",
    borderBottom: "1px solid #333"
};

const bStyle = {
    marginLeft: "4px",
    marginRight: "4px",
    marginTop: "2px",
    marginBottom: "2px",
    padding: "1px",
    backgroundColor: "white",
    border: "1px white"
};

const filters = [
    "none",
    "grayscale",
    "sepia",
    "saturate",
    "hue-rotate",
    "invert",
    "bright",
    "contrast",
    "blur"
];

class Nav extends Component{
    constructor() {
        super();
        this.state = {
          modalShown: false,
          webcamModalShown: false,
          username: "",
          password: "",
          imageSrc: "",
          caption: "",
          filter: filters[0]
        };
    }
    

    
    handleOpenWebcamModal() {
        this.setState({
            webcamModalShown: true
        });
    }

    handleCloseWebcamModal() {
        this.setState({
            webcamModalShown: false
        });
    }

    setRef = (webcam) => {//reactjs id
        this.webcam = webcam;
    }
    capture = () => {
        const imageSrc = this.webcam.getScreenshot();//constant: cannot change no more
        this.setState({imageSrc: imageSrc});
    };
      
    handleCaptionChange(e) {
        this.setState({
            caption: e.target.value
        });
    }
      
    handleSubmitImage() {
        var userID = localStorage.getItem("user")
        var text = "text!"
        var image = this.state.imageSrc;

        aja()
            .method("post")
            .url("http://localhost:8080/image")
            .body({userID:userID, text: text, image: image})
            .on("success", function(data){
                if(data.status==200){
                    alert("Image uploaded successfully!")
                } else {
                    alert("Image not uploaded.rip")
                }
            })
            .go();
    }

    render() {
        var _this = this;
        return (
            <Navbar style={navStyle}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/" style={{ fontFamily: 'Iowan Old Style' , color:"#424242"}}>Reactstagram</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Text pullRight>
                    <Button style={bStyle} bsSize="large">
                        <Glyphicon glyph="camera" style={{color: "grey"}} onClick={this.handleOpenWebcamModal.bind(this)}/>
                    </Button>
                    <Modal id="webcamModal" show={this.state.webcamModalShown}>
                        <Modal.Header>
                            <Modal.Title style={{ fontFamily: 'Iowan Old Style', color:"#424242"}}>Take a picture!</Modal.Title>
                        </Modal.Header>
                
                        <Modal.Body>
                            <center>
                                <DropdownButton title="Filters" id={`dropdown-basic-default`}>
                                    {filters.map(function(item){
                                            return(
                                                <MenuItem onClick={()=>_this.setState({filter:item})}>{item}</MenuItem>
                                            )
                                     })} 
                                    
                                </DropdownButton>
                        
                                <Webcam
                                    audio={false}
                                    height={400}
                                    ref={this.setRef}
                                    screenshotFormat="image/jpeg"
                                    width={400}
                                    className={this.state.filter}
                                />
                                <img src={this.state.imageSrc} className={this.state.filter}/>
                            </center>
                            <FormControl
                                id="caption"
                                type="text"
                                onChange={this.handleCaptionChange.bind(this)}
                                placeholder="Write a caption!"
                            />
                        </Modal.Body>
                
                        <Modal.Footer>
                            <Button bsSize="small" onClick={this.handleCloseWebcamModal.bind(this)}>Close</Button>
                            <Button bsSize="small" bsStyle="warning" onClick={this.capture.bind(this)}>Capture!</Button>
                            <Button bsSize="small" bsStyle="success" onClick={this.handleSubmitImage.bind(this)}>Upload!</Button>
                        </Modal.Footer>
                
                    </Modal>        
                    <a href="/profile"><Button style={bStyle} bsSize="large"><Glyphicon glyph="user" style={{color: "grey"}}/></Button></a>
                </Navbar.Text>
                
            </Navbar>
        );
    }
}

export default Nav;