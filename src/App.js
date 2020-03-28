import React, { Component } from 'react';
import TodoItem from "./components/TodoItem";
import Header from "./components/layouts/Header";
//import AddTodo from "./components/layouts/AddTodo";

//Date(year, month, day, hour, minute, second)
const oneday = 86400000;
function cmpTime(start, end) {
	return start - end;
}

class App extends Component {
	state = {
		todos: [
			{
				id: 0, 
				title: "take out the trash",
				start_at: new Date("October 13, 2020 13:00:00"),
				period: 1,
				del: [], 
				completed: []
			},
			{
				id: 1, 
				title: "Dummy dum dum dum",
				start_at: new Date("October 13, 2020 13:00:00"),
				period: 2,
				del: [], 
				completed: []
			},
			{
				id: 2, 
				title: "A meeting",
				start_at: new Date("October 13, 2020 13:00:00"),
				period: 2, 
				del: [], 
				completed: []
			}
		], 
		lastId: 3, //change to len
	}

	addPeriod = () => {

	}

	delPeriod = (id) => {

	}

	setDel = (id, time) => {
		let ret = this.state.todos;
		const index_complete = ret[id]["completed"].indexOf(time);

		if(index_complete > -1)
			ret[id]["completed"].splice(index_complete, 1);

		ret[id]["del"] = [...ret[id]["del"], ...[time]]
		return ret;
	}

	delTodo = (id, time) => {
		this.setState( { todos: this.setDel(id, time) } );

	}

	setCompleted = (id, time) => {
		let ret = this.state.todos;
		const index = ret[id]["completed"].indexOf(time);
		if(index > -1){
			ret[id]["completed"].splice(index, 1);
		} else
			ret[id]["completed"] = [...ret[id]["completed"], ...[time]]
		return ret;
	}	

	changeComplete = (id, time) => {
		this.setState( { todos: this.setCompleted(id, time) } );
	}

	getItems = () => {
		let i = -1;
		return this.state.todos.map( (todo) => {
			if(!todo.del.includes(todo.start_at)){
				i++;
				return (
					<TodoItem
						key={i}
						id={todo.id} 
						title={todo.title} 
						time={todo.start_at} 
						changeComplete={this.changeComplete}
						delTodo={this.delTodo}
						completed={todo.completed.includes(todo.start_at)}
					/>	
				)
			}
		});
	}
	
	render() {
		return (
			<React.Fragment>	
				<Header 
					addPeriod={this.addPeriod} 
					delPeriod={this.delPeriod}
				/>

				<div className="container">
					<div className="containerS">
						{this.getItems()}
					</div>	
				</div>
			</React.Fragment>
		);
	}
}

export default App;