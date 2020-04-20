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

	getCompletetyle = () => {
		return {
			textDecoration: this.props.completed ? "line-through" : "none"
		};
	}
	
	getButtonStyle = () => {
		return {
			display: (this.props.completed !== null) ? "block" : "none"
		};
	}

	getTime = () => {
		return (this.props.completed !== null) ? moment(this.props.time).format("YYYY-MM-DD HH:mm:ss") : ""; 
	}

	render() {
		return (
			<div className={"todoitem " + this.props.addClass} style={ this.getCompletetyle() } title={this.getTime()} onClick={ this.changeComplete }>
				<p>
					<label>
						<input 
							className="checkboxStyle" 
							type="checkbox" {...(this.props.completed ? {checked:"checked"} : {})} 
							 
						/> 
						{ this.props.title }
					</label>
					<button style={this.getButtonStyle()} onClick={ this.delTodo } className="buttonStyle">
					</button>
						<span className="buttonSpanStyle">X</span>
				</p>
			</div>
		);
	}
}

export default todoItem;