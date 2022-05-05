import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Todo = props => (
    <tr>
        <td>{props.tarea.id}</td>
        <td>{props.tarea.name}</td>
        <td>{props.tarea.puntos}</td>
        <td>{props.tarea.materia}</td>
        <td>{props.tarea.fechaEntrega}</td>
        <td>{props.tarea.fechaCreacion}</td>
    </tr>
)


export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    componentDidMount() {
        //this.getAllTareas();
        axios.get('https://api-tareas-test.azurewebsites.net/tareas/')
            .then(response => {
                //console.log(this.state.todos);
                this.setState({ todos: response.data });
                //console.log(this.state.todos);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    getAllTareas = () => {
        axios
            //.get("https://api-rpm-delightful-hyrax.w3ibm.mybluemix.net/api/today")
            //.get("http://rpm-api-buena.tds-test-cluster.containers.ciocloudservices.ibm.com/api/today") //kubernetes
            .get("https://api-tareas-test.azurewebsites.net/tareas/") //cirrus
            .then(response => response.data)
            .then(data => {
                console.log(this.state.todos);
                this.setState({ todos: data });
                //console.log(this.state.items)
            })
            .catch(error => {
                console.log(error);
            });
    };
    /*
        componentDidUpdate() {
            axios.get('http://localhost:4000/tareas/')
                .then(response => {
                    this.setState({ todos: response.data });
                })
                .catch(function (error) {
                    console.log(error);
                })
        }*/

    todoList() {
       if (this.state.todos.data) {
            /*var t = { id: 1, name: "tarea1" }
            console.log(this.state.todos.data);
            var x = this.state.todos.data[0];
            console.log(x);
            return <Todo tarea={t} key={1} />;*/
            return this.state.todos.data.map(function (currentTodo, i) {
                return <Todo tarea={currentTodo} key={i} />;
            });
        }
    }

    render() {


        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
