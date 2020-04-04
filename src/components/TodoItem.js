import React, { Component } from 'react';
import  moment  from "moment";
import "./todoitem.css";

class todoItem extends Component {
	constructor(props) {
		super(props);
		this.props.delTodo.bind(this);
		this.props.changeComplete.bind(this);
	}

	delTodo = () => {
		this.props.delTodo(this.props.id, this.props.time);
	} 

	changeComplete = () => {
		this.props.changeComplete(this.props.id, this.props.time)
	}

	getItemStyle = () => {
		return {
			textDecoration: this.props.completed ? "line-through" : "none"
		};
	}
	
	render() {
		return (
			<div className="todoitem" style={ this.getItemStyle() } title={moment(this.props.time).format("YYYY-MM-DD HH:mm:ss")}>
				<p>
					<label>
						<input 
							className="checkboxStyle" 
							type="checkbox" {...(this.props.completed ? {checked:"checked"} : {})} 
							onChange={ this.changeComplete } 
						/> 
						{ this.props.title }
					</label>
					<button onClick={ this.delTodo } className="buttonStyle">
						<span className="buttonSpanStyle">X</span>
					</button>
					
				</p>
			</div>
		);
	}
}

export default todoItem;