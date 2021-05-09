import React,{Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Disclaimer from '../../components/Disclaimer/Disclaimer';
import FloatingIcon from '../../components/FloatingIcon/FloatingIcon';
import Tweets from '../../components/Tweets/Tweets';
import {Modal,Button} from 'react-bootstrap';

class Layout extends Component {

    state = {
        showTweets: false
    }

    handleClose = () => this.setState({showTweets:false});
    handleShow = () => this.setState({showTweets:true});

    componentDidMount() {
        console.log("Layout Component Mounted... State =  ", this.state);
    }

    componentDidUpdate() {
        console.log("Layout Component Updated... State =  ", this.state);
    }

    render() {
        let modalData = <Modal show={this.state.showTweets} onHide={this.handleClose}>
                            {/* <Modal.Header closeButton>
                             <Modal.Title>Modal heading</Modal.Title> 
                            </Modal.Header> */}
                            <Modal.Body><Tweets/></Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>
        return (
            <React.Fragment>
                <Navbar/>
                <main>
                    {this.props.children}
                </main>

                <Disclaimer/>
                <Footer/>
                {this.state.showTweets ? modalData : null}
                <FloatingIcon iconClassNames="fab fa-twitter" onClicked={() => this.setState({showTweets:true})}/>
            </React.Fragment>
        )
    }
}

export default React.memo(Layout);