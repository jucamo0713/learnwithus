import React from 'react';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import '../Styles/Cursos.css';
class Header3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
     componentWillMount(){
         axios.get(`${this.props.rback}/Cur/get_cursos-Comunidad_Integrado/Curso/${this.props.location.state.id}`)
            .then(res => {
                this.setState({data: res.data})
                console.log();
            }).catch(err => {
                console.error(err);
            })
    }
    render() {
        return (
            <>
                <div id="Header3Container">
                    <div className="linkAtrasCurso">
                    <Link to={this.props.location.state.pagina} >
                        <div id="AtrasCurso">

                        </div>
                    </Link>
                    </div>
                    <h2 id="TitleCurso">{this.state.data[0]?.titulo}</h2>
                </div>
            </>
        );
    }
}

export default withRouter(Header3);