import React, { Component } from "react";

class AddTodo extends Component  {
	state={
		title: ""
	}

	onChange = (e) => {
		this.setState( { [e.target.name]: e.target.value });
	}		

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addTodo(this.state.title);
		this.setState( { title: '' } );
	}

	render() {
		return (
			<div style={{display: "flex"}}>
				<input 
					type="text"
					placeholder="Add Todo ..."
					name="title"	
					style={{flex: "10", padding:"5px"}}
					value={this.state.title} 
					onChange={this.onChange} 
				/> 
				<input 
					type="submit"
					value="submit" 
					className="btn" 
					style={{flex: "1"}}
					onClick={this.onSubmit}
				/>
			</div>
		);
	}

}

export default AddTodo;