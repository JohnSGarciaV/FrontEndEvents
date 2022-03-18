import { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment';
import axios from 'axios';


class Calendario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: [],
            eventos: [],
            localizer: momentLocalizer(moment)
        }
    }

    componentDidMount() {
        const readEvents = async () => {
            const options = {
                method: 'GET',
                url: 'https://sleepy-coast-57812.herokuapp.com/actividades'
            }

            await axios.request(options).then((response) => {
                this.setState({ actividades: response.data });
                var allEventos = [];
                var cont = 0;
                this.state.actividades.map((element) => {
                    allEventos.push({ title: element.nombre, allDay: true, start: Date.parse(element.fechainicio), end: Date.parse(element.fechafinal), index: cont });
                    cont++;
                });
                this.setState({eventos: allEventos});

            }).catch((error) => {
                    console.error(error);
                });
        };
        readEvents();
    }

    render() {
        return (
            <div style={{ justifyContent: "center", alignItems:"center", display:"flex", paddingTop:"10vh" }}>
                <Calendar localizer={this.state.localizer}
                 events={this.state.eventos} 
                 startAccessor="start" 
                 endAccessor="end" 
                 style={{ width: "80%", height: "80vh" }} 
                    //onSelectEvent={(event) => { showEvent(event.index) }}
                    eventPropGetter={(event) => {
                      const backgroundColor = this.state.actividades[event.index].tipo === "Voluntariado" ? 'green' : 'blue';
                      return { style: { backgroundColor } }
                    }}
                />
            </div>
        );
    }
}

export default Calendario;