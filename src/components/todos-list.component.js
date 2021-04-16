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
        axios.get('http://localhost:4000/tareas/')
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
            .get("http://localhost:4000/tareas/") //cirrus
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
        /* return this.state.todos.data.map(function (currentTodo, i) {
             return <Todo tarea={currentTodo} key={i} />;
         });*/
        var t = { id: 1, name: "tarea1" }
        var x = this.state.todos;
        console.log(x);
        return <Todo tarea={t} key={1} />;
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