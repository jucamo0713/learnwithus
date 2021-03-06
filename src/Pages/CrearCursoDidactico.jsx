import React from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import '../Styles/CrearCursoD.css';
class CrearCursoDidactico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bool: false,
            dataContenidoD: [],
            boleanosRedirect2: {
                bool1: false,
                bool2: false,
                bool3: false
            }, boolReturn: false,
            boolContenidoOtro: false
        }
    }
    componentDidMount = async () => {
        let retorno = await this.contenido_d_text(this.props.location.state.idCursoC);
        let vari = true;
        if (retorno.data[0].d_propio == 1) {
            vari = false;
        }
        this.setState({
            bool: false,
            dataContenidoD: retorno.data,
            boolContenidoOtro: vari
        });
        document.getElementById("tablero1").style.display = "block";
        document.getElementById("tablero2").style.display = "none";
    }
    /*Metodo para cambiar a vista previa*/
    changeVistaPrevia = () => {
        this.setState({
            bool: true
        });
        if (this.state.dataContenidoD[0]?.contenido_d_text != "") {
            document.getElementById("tablero2").innerHTML = '<iframe class="formGames2" src="'+this.props.rback+'/Fil/file-Didactico/' + UsuarioI[0].usuario + '"></iframe>';
        } else {
            document.getElementById("tablero2").innerHTML = '<div class="Porciento100"><img class="Porciento100IMG" src="/Images/ContenidoD.png"></img></div>';
        }
        document.getElementById("tablero2").style.display = "block";
        document.getElementById("tablero1").style.display = "none";
    }
    /*Metodo para cambiar e editar curso*/
    changeEditarCurso = () => {
        this.setState({ bool: false });
        document.getElementById("tablero2").style.display = "none";
        document.getElementById("tablero1").style.display = "block";
    }
    componentWillUnmount() {
        axios.get(`${this.props.rback}/Fil/get-Examne-Contenido-delete/Didactico/${this.props.location.state.idCursoC}&${UsuarioI[0].usuario}`)
            .then(res => { })
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    componentDidUpdate() {
        if (this.state.dataContenidoD[0]?.contenido_d_text != "") {
            document.getElementById("tablero2").innerHTML = '<iframe class="formGames2" src="'+this.props.rback+'/Fil/file-Didactico/' + UsuarioI[0].usuario + '"></iframe>';
        } else {
            document.getElementById("tablero2").innerHTML = '<div class="Porciento100"><img class="Porciento100IMG" src="/Images/ContenidoD.png"></img></div>';
        }
        if (this.state.boolContenidoOtro) {
            document.getElementById("SubirE").disabled = true;
            document.getElementById("contenidoEArea").disabled = true;
            document.getElementById("SelectConteD").disabled = true;
            document.getElementById("idCursoE").disabled = true;
            document.getElementById("DesD").disabled = false;
        }
        document.getElementById("carga").style.display = "none";
    }
    /*METODOS QUE RETORNAN BOTONES*/
    returnBotonesSelect = () => {
        if (this.state.bool) {
            return (
                <>
                    <button className="BotonSelectCrearCurso" onClick={() => this.changeEditarCurso()}>Editar</button>
                    <button className="colorcitoReturnSelectCT BotonSelectCrearCurso">Vista previa</button>
                </>
            );
        } else {
            return (
                <>
                    <button className="colorcitoReturnSelectCT BotonSelectCrearCurso">Editar</button>
                    <button className="BotonSelectCrearCurso" onClick={() => this.changeVistaPrevia()}>Vista previa</button>
                </>
            );
        }
    }
    /*Renderizado del botón guardar*/
    Botones = () => {
        let variable = 0;
        if (this.props.location.state.location == "/misCursos") {
            variable = 1;
        } else if (this.props.location.state.location == "/Clase") {
            variable = 2;
        } else {
            variable = 3;
        }
        return (
            <>
                <button className="button buttonMisCursos hoverCreadorT" onClick={() => { this.ActualizacionContenidoE(variable) }}>Guardar</button>
            </>
        );
    }
    /*Renderizado del botón cancelar*/
    Botones2 = () => {
        if (this.props.location.state.location == "/misCursos") {
            return (
                <Link className="ReanudarCursoTeorico" to={{ pathname: '/CrearCurso', state: { location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }}>
                    <button className="button buttonMisCursos hoverCreadorT">Cancelar</button>
                </Link>
            );
        } else if (this.props.location.state.location == "/Clase") {
            return (
                <Link className="ReanudarCursoTeorico" to={{ pathname: '/CrearCurso', state: { InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }}>
                    <button className="button buttonMisCursos hoverCreadorT">Cancelar</button>
                </Link>
            );
        } else {
            return (
                <Link className="ReanudarCursoTeorico" to={{ pathname: '/CrearCurso', state: { pagina: "Comunidad", idCursoC: this.props.location.state.idCursoC } }}>
                    <button className="button buttonMisCursos hoverCreadorT">Cancelar</button>
                </Link>
            );
        }
    }
    /*TIMER PARA ALERTAS Y DATOS ERRADOS*/
    Time = (Propi, Propi2, Propi3) => {
        Propi.type = "text";
        Propi.style.color = "red";
        Propi.value = Propi3;
        Propi.style.border = "2px solid #ff595e";
        setTimeout(function () {
            Propi.type = Propi2;
            Propi.style.color = "black";
            Propi.value = "";
            Propi.style.border = "1px solid black";
        }, 1500)
    }
    /*Funcion que retorna el orden de los option en el select*/
    select = (prop) => {
        if (this.state.dataContenidoD[0]?.d_permiso == prop) {
            return true;
        } else {
            return false;
        }
    }
    /*Metodo que guarda el contenido didactico del curso*/
    ActualizacionContenidoE = async () => {
        document.getElementById("carga").style.display = "block";
        let contenido_e = document.getElementById("contenidoEArea");
        let permiso = document.getElementById("SelectConteD");
        let form;
        if (!this.state.boolContenidoOtro) {
            form = {
                contenido_d_text: contenido_e.value,
                d_permiso: permiso.value,
                d_propio: 1
            }
        } else {
            form = {
                contenido_d_text: contenido_e.value,
                d_permiso: 1,
                d_propio: 0
            }
        }
        this.guardar(form);
        let retorno = await this.contenido_d_text(this.props.location.state.idCursoC);
        this.setState({
            dataContenidoD: retorno.data
        });
    }
    /*Metodo de subida de un contenido didactico externo*/
    SurbirConteD = async () => {
        let idCursoE = document.getElementById("idCursoE");
        if (idCursoE.value != this.props.location.state.idCursoC) {
            let retorno = await this.contenido_d_text2(idCursoE.value);
            if (retorno.data.length != 0) {
                document.getElementById("carga").style.display = "block";
                document.getElementById("contenidoEArea").disabled = true;
                document.getElementById("SelectConteD").disabled = true;
                document.getElementById("idCursoE").disabled = true;
                document.getElementById("DesD").disabled = false;
                document.getElementById("Si").selected = true;
                let retorno2 = await this.contenido_d_text(idCursoE.value);
                document.getElementById("contenidoEArea").value = retorno2.data[0].contenido_d_text;
                idCursoE.value = "";
                this.setState({
                    boolContenidoOtro: true,
                    dataContenidoD: retorno2.data
                });
            } else {
                this.Time(idCursoE, "number", "Dato invalido");
            }
        } else {
            this.Time(idCursoE, "number", "Dato invalido");
        }
    }
    /*Este metodo sirve para desbloquear el contenido didactico en caso de ser de otra persona*/
    DesbloquearContenidos = async () => {
        if (this.state.boolContenidoOtro) {
            document.getElementById("carga").style.display = "block";
            document.getElementById("contenidoEArea").disabled = false;
            document.getElementById("SelectConteD").disabled = false;
            document.getElementById("idCursoE").disabled = false;
            document.getElementById("SubirE").disabled = false;
            document.getElementById("DesD").disabled = true;
            let retorno2 = await this.contenido_d_text(this.props.location.state.idCursoC);
            if (retorno2.data[0].contenido_d_text == this.state.dataContenidoD[0].contenido_d_text) {
                document.getElementById("contenidoEArea").value = "";
                this.setState({
                    boolContenidoOtro: false,
                    dataContenidoD: [{
                        contenido_d_text: "",
                        d_permiso: 0,
                        d_propio: 1
                    }]
                });
            } else {
                document.getElementById("contenidoEArea").value = retorno2.data[0].contenido_d_text;
                this.setState({
                    boolContenidoOtro: false,
                    dataContenidoD: retorno2.data
                });
            }
        }
    }
    /*AXIOS*/
    /*TODOS LOS GETS*/
    /*Este get sirve para traer el contenido_d_text de un curso*/
    contenido_d_text = async (prop) => {
        console.log(prop);
        return axios.get(`${this.props.rback}/Fil/get-Examne-Contenido/Didactico/${prop}&${UsuarioI[0].usuario}`)
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*Este get sirve para saber si un curso tiene habilitado el d_permiso y/o traer el contenido_e_text de ese curso*/
    contenido_d_text2 = async (prop) => {
        return axios.get(`${this.props.rback}/Cur/get_cursos_contenido-e/CrearContenidoE/${prop}`)
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*TODOS LOS PUT*/
    /*Guardar*/
    guardar = (form) => {
        axios.put(`${this.props.rback}/Cur/put_cursos_contenido-d/CrearCursoD/${this.props.location.state.idCursoC}`, form)
            .then(res => {
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    render() {
        return (
            <>
                <div className="Cargando" id="carga"></div>
                <div className="MainCrearCurso">
                    <div className="TableroCrearC">
                        <div className="EditorSelectCrearCT">
                            {this.returnBotonesSelect()}
                        </div>
                        <div className="MainTablero2" id="tablero1">
                            <textarea className="textArea" id="contenidoEArea" autoFocus="on" spellCheck="false" defaultValue={this.state.dataContenidoD[0]?.contenido_d_text} />
                        </div>
                        <div className="MainTablero" id="tablero2">

                        </div>
                    </div>
                    <div className="InfoCrearC">
                        <img className="LogoCrearCurso" src="https://1.bp.blogspot.com/-4AYfdW1HnGQ/X02wnk_2J_I/AAAAAAAAPPk/znnHlLxw_bINf8jIvcaE3hxEruVJOjcawCLcBGAsYHQ/s16000/Logo.png" />
                        <div className="EditorCrearCurso">
                            <div className="CentradoCrearCurso">
                                <p className="TextLow">Para la creación del contenido didactico puedes seleccionar un código propio o tienes la opción de usar los juegos creados por otras personas. El código de acceso para un contenido didactico se encuentra dentro de los cursos.</p>
                                <div className="Width100">
                                    <p className="Group">Código:</p>
                                    <div className="Group SubirContD">
                                        <input type="number" className="SubirConteD1" min="1" id="idCursoE" placeholder="Escribe aquí" />
                                        <button className="SubirConteD" id="SubirE" onClick={() => this.SurbirConteD()}>

                                        </button>
                                        <button className="SubirConteD2" id="DesD" onClick={() => this.DesbloquearContenidos()}>

                                        </button>
                                    </div>
                                </div>
                                <p className="MarginTop TextLow">¿Quieres que los usuarios puedan usar tu contenido en sus cursos?</p>
                                <select className="SubirConteD1" id="SelectConteD">
                                    <option value="0" selected={this.select(0)} id="No">No</option>
                                    <option value="1" selected={this.select(1)} id="Si">Si</option>
                                </select>
                            </div>
                        </div>
                        {this.Botones()}
                        {this.Botones2()}
                    </div>
                    {this.state.boleanosRedirect2.bool3 && <Redirect to={{ pathname: '/CrearCurso', state: { pagina: "Comunidad", idCursoC: this.props.location.state.idCursoC } }} />}
                    {this.state.boleanosRedirect2.bool2 && <Redirect to={{ pathname: '/CrearCurso', state: { InfoClass: this.props.location.state.InfoClass, location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }} />}
                    {this.state.boleanosRedirect2.bool1 && <Redirect to={{ pathname: '/CrearCurso', state: { location: this.props.location.state.location, idCursoC: this.props.location.state.idCursoC } }} />}
                </div>
            </>
        );
    }
}

export default withRouter(CrearCursoDidactico);