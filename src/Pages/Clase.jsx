import React from 'react';
import {withRouter} from 'react-router-dom';
import Header4 from '../Components/Header4';
import Footer from '../Components/Footer';
import Main7 from '../Components/Main7';
class Clase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <>
            <Header4 rback={this.props.rback}/>
            <Main7 rback={this.props.rback}/>
            <Footer rback={this.props.rback}/>
            </>
          );
    }
}
 
export default withRouter(Clase);