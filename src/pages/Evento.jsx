import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Form, Col, Row, Modal, ModalTitle, Card } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";


const Evento = () => {
    let location = useLocation();
    const [cedula, setCedula] = useState("");
    const [nombre, setNombre] = useState("");
    const [evento, setEvento] = useState({ fechainicio: "0000-00-00", fechafinal: "0000-00-00" });

    const [mensaje, setMensaje] = useState([]);
    const [titulo, setTitulo] = useState([]);
    const [show, setShow] = useState(false);
    const modalOpen = () => setShow(true);
    const modalClose = () => setShow(false);


    const comprobarCampos = () => {
        setMensaje([]);
        setTitulo("Error");
        var good = true;
        var mnuevo = [];
        if (cedula.valueOf() <= 0) {
            good = false;
            mnuevo.push({ valor: "Debe escribir un numero de cedula" });
        }

        if (nombre.toString().length <= 0) {
            good = false;
            mnuevo.push({ valor: "Debe escribir su nombre" });
        }

        setMensaje(mnuevo);
        return good;
    }

    const cambiarDB = async () => {
        if (comprobarCampos() && evento != null) {
            const options = {
                method: 'PATCH',
                url: 'https://sleepy-coast-57812.herokuapp.com/actividades/add',
                headers: { 'Content-Type': 'application/json' },
                data: { nombre: nombre, cedula: cedula, id: evento._id },
            };

            await axios.request(options).then((response) => {
                setMensaje([]);
                setTitulo("Exitoso");
                setMensaje([{ valor: "Se ha agregado como participante dela actividad" }]);
                modalOpen();
                setCedula(0);
                setNombre("");

            }).catch(function (error) {
                setMensaje([]);
                setTitulo("Error");
                setMensaje([{ valor: error.toString() }]);
                modalOpen();
            });
        } else {
            modalOpen();
        }
    }

    useEffect(() => {
        setEvento(location.state.params);
    }, [])




    return (
        <div style={{paddingTop:"2vh"}}>
            <h4> INFORMACIÓN SOBRE EL EVENTO </h4>
            <div>
                <Modal show={show} onHide={modalClose}>
                    <Modal.Header>
                        <ModalTitle>
                            {titulo}
                        </ModalTitle>
                        <button type="button" class="btn btn-danger" onClick={modalClose}> Cerrar</button>
                    </Modal.Header>
                    <Modal.Body>
                        {mensaje.map((elemento) =>
                            <p>{elemento.valor}</p>

                        )}
                    </Modal.Body>
                </Modal>
            </div>



            <Form.Group as={Row} className="grupo" controlId="nombre_actividad">
                <Form.Label column sm="2">Nombre de la actvidad</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" value={evento.nombre} disabled="true" ></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="grupo" controlId="detalles">
                <Form.Label column sm="2">Detalles de la actividad</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" value={evento.detalles} disabled="true" ></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="grupo" controlId="lugar">
                <Form.Label column sm="2">Lugar de la actividad</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" value={evento.lugar} disabled="true"></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="grupo" controlId="punto_partidad">
                <Form.Label column sm="2">Punto de Partidad</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" value={evento.puntopartida} disabled="true"></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="grupo" controlId="tipo">
                <Form.Label column sm="2">Tipo de actvidad</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" value={evento.tipo} disabled="true" ></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="grupo" controlId="fecha_ini">
                <Form.Label column sm="2">Fecha de Inicio</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" value={evento.fechainicio.substr(0, 10)} disabled="true"></Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="grupo" controlId="fecha_final" >
                <Form.Label column sm="2">Fecha de Finalización</Form.Label>
                <Col sm="10">
                    <Form.Control type="text" value={evento.fechafinal.substr(0, 10)} disabled="true"></Form.Control>
                </Col>
            </Form.Group>

            <div style={{ justifyContent: "center", display: "flex", width: "100%", paddingTop: "5vh" }}>

                <Card style={{ height: "35vh", width: "80%" }}>
                    <div style={{ paddingBottom: "20px", paddingTop: "15px", textAlign: "center" }}>
                        <h4>Inscribirse en la actividad</h4>
                    </div>


                    <Form.Group as={Row} controlId="nombre" style={{ justifyContent: "center", paddingBottom: "2vh" }}>
                        <Form.Label column sm="2" >Nombre</Form.Label>
                        <Col sm="5">
                            <Form.Control type="text" value={nombre} onChange={(value) => setNombre(value.target.value)} placeholder="Escriba su nombre" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="cedula" style={{ paddin: "0px", justifyContent: "center", marginBottom: 50 }}>
                        <Form.Label column sm="2">Cedula</Form.Label>
                        <Col sm="5">
                            <Form.Control type="text" value={cedula} onChange={(value) => setCedula(value.target.value)} placeholder="Escriba su numero de cedula" />
                        </Col>
                    </Form.Group>

                    <div style={{paddingTop:"0vh"}}>
                        <button type="submit" class="btn btn-success btn-lg" onClick={cambiarDB}>Inscribirse</button>
                    </div>

                </Card>
            </div>

        </div>
    )
}

export default Evento;
