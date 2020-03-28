import React, { Component } from 'react';
import Proptypes from "prop-types";
import "./todoitem.css";
import { todoItem, fakeTodoItem } from "./TodoItem";


class Todos extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			todos: this.props.todos 
		};
	}
	
	getItems = () => {
		return this.state.todos.map( (todo) => {
			return todo.item.getItem()
		}) 
	}
	
	/*
	componentDidUpdate = (prevProps) => {
      if (prevProps.label !== this.props.label) {
         this.setState( {label: this.props.label} );
      }
	}
	*/

	render() {
		return (
			<div>
			{ this.getItems() } 
			</div>	
		);
	}
}

//PropTypes
Todos.Proptypes = {
	todos: Proptypes.array.isRequired
}

export default Todos;