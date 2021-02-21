import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import Header6 from '../Components/Header6';
import Main8 from '../Components/Main8';
class Crearcurso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
                <Header6 rback={this.props.rback}/>
                <Main8 rback={this.props.rback}/>
            </>
         );
    }
}
 
export default withRouter(Crearcurso);