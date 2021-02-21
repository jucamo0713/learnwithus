import React from 'react';
import Header2 from '../Components/Header2';
import Main5 from '../Components/Main5';
import Footer from '../Components/Footer';
import {withRouter} from 'react-router-dom';

class Curso extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <Header2 Componente="/Clases" rback={this.props.rback}/>
            <Main5 rback={this.props.rback}/>
            <Footer rback={this.props.rback}/>
            </>
         );
    }
}
 
export default withRouter(Curso);