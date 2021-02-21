import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Pages/Home.jsx';
import Principal from './Pages/Principal.jsx';
import Principal_ from './Pages/Principal_.jsx';
import Perfil from './Pages/Perfil.jsx';
import Integrados from './Pages/Inte_Comu.jsx';
import Curso from './Pages/Curso.jsx';
import Didactico from './Pages/Didactico.jsx';
import MisCursos from './Pages/MisCursos.jsx';
import Clases from './Pages/Clases.jsx';
import Clase from './Pages/Clase.jsx';
import CrearCursoTeorico from './Pages/CrearCursoTeorico.jsx';
import CrearCurso from './Pages/CrearCurso.jsx';
import Examen from './Pages/Examen.jsx';
import Notificaciones from './Pages/Notificaciones.jsx';
import CrearContenidoDidactico from './Pages/CrearCursoDidactico.jsx';
import CalificacionesClaseCurso from './Pages/CalificacionesClaseCurso.jsx';
import CrearExamen from './Pages/CrearCursoExamen.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
let ruta = "https://learnback.herokuapp.com";
ReactDOM.render(
    <React.StrictMode >
        <Router >
            <Switch >
                <Route path="/Perfíl" >
                    <Perfil rback={ruta} />
                </Route>
                <Route path="/Principal"  >
                    <Principal rback={ruta} />
                </Route>
                <Route path="/Principal_" >
                    <Principal_ rback={ruta} />
                </Route>
                <Route path="/Integrados" >
                    <Integrados rback={ruta} />
                </Route>
                <Route path="/Examen" >
                    <Examen rback={ruta} />
                </Route>
                <Route path="/misCursos">
                    <MisCursos rback={ruta} />
                </Route>
                <Route path="/CalificacionesClaseCurso" rback={ruta} component={CalificacionesClaseCurso} />
                <Route path="/Clases" >
                    <Clases rback={ruta} />
                </Route>
                <Route path="/Curso">
                    <Curso rback={ruta} />
                </Route>
                <Route path="/Didactico">
                    <Didactico rback={ruta} />
                </Route>
                <Route path="/CrearExamen">
                    <CrearExamen rback={ruta} />
                </Route>
                <Route path="/CrearCurso" rback={ruta} component={CrearCurso} />
                <Route path="/CrearCursoTeorico" rback={ruta} component={CrearCursoTeorico} />
                <Route path="/CrearCursoDidactico" rback={ruta} component={CrearContenidoDidactico} />
                <Route path="/Clase" rback={ruta} component={Clase} />
                <Route path="/Notificaciones" rback={ruta} component={Notificaciones} />
                <Route path="/" >
                    <Home rback={ruta} />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);