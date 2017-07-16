import React, {Component} from 'react';
import {Row, Panel, Col, Grid, Glyphicon, Modal, Button} from 'react-bootstrap';
import aja from "aja";
import ImageItem from './ImageItem'


class ImageBoard extends Component{
    componentDidMount(){
        this.getImage()
    
    }

    
    constructor(){
        super();
        this.state={
            allImages:[],
        }
       
    }
    
    getImage(){
        var _this = this;
        aja()
            .method("get")
            .url("http://localhost:8080/allimages")
            .on("success", function(data){
                _this.setState({
                    
                    allImages: data
                })
            }).go();
    }
    
    handleImageModal(){
        
    }
 
    render(){
        return(
            <Grid>
                <Row>
                    {this.state.allImages.map(function(image){
                        return(
                            <Col xs={4}>
                                <Panel>
                                    <img src={"http://localhost:8080/public/"+ image._id +".jpg"} 
                                        className="img-responsive" 
                                        alt="Responsive image"
                                        />
                                    
                                </Panel>
                            </Col>
                            
                            )
                    })}
                </Row>
            </Grid>
        )
    }
}

export default ImageBoard;