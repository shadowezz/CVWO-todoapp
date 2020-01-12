import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker'
import NavBar from './NavBar'


class EditForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.todo.id,
            title: this.props.todo.title,
            description: this.props.todo.description,
            category: this.props.todo.category,
            deadline: this.props.todo.deadline

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (!localStorage.getItem('logged_in')) {
          this.props.history.push('/')
        }
    }

    editTodo = (id, todo) => {
        axios.put(`api/v1/update/${id}`, {todo}, {withCredentials: true})
            .then(response => {
                console.log(response.data.status)
            })
            .then(this.props.updateTodo)
            .catch(error => console.log(error))
        
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    dateChange = (deadline) => {
        this.setState({deadline: deadline})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { id, title, description, category, deadline } = this.state
        let todo = {
            title: title,
            description: description,
            category: category,
            deadline: deadline,
        }
        this.editTodo(id, todo)
        
    }



    render() {
        return(
            <div className="container-fluid">
                <NavBar handleLogout={this.props.handleLogout}/>
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-3 row-6 border border-dark rounded-lg">
                        <h3>Update Todo Item</h3>
                        <form role="form" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input  className="form-control"
                                        name="title"
                                        type="text"
                                        value={this.state.title}
                                        onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea  className="form-control"
                                        name="description"
                                        type="text"
                                        value={this.state.description}
                                        onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input  className="form-control"
                                        name="category"
                                        type="text"
                                        value={this.state.category}
                                        onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Deadline</label>
                                <br></br>
                                <DateTimePicker onChange={this.dateChange} value={new Date(this.state.deadline)} 
                                    name="deadline" disableClock={true} minDate={new Date()}/>
                            </div>
                            <button className="btn btn-success" placeholder="submit" type="submit">
                                Update
                            </button>
                            <button onClick={this.props.cancelUpdate} 
                                className="btn btn-secondary">
                                    Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>  
        )
    }

}

export default EditForm;