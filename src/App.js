import React, { Component } from 'react';
import TodoItem from "./components/TodoItem";
import Header from "./components/layouts/Header";
//import AddTodo from "./components/layouts/AddTodo";
import  moment  from "moment";

function cmpTime(start, end) {
	return start - end;
}

function setToMidnithg(date) {
	let retDate = moment(date).date(moment(date).date() + 1);
	retDate = retDate.hour(0); 
	retDate = retDate.minute(0);
	retDate = retDate.second(0);
	retDate = retDate.millisecond(0);
	return retDate.toDate();
}

function addDays(date, days) {
	return moment(date).add(days, 'd').toDate();
}

function compareDays(date1, date2) {
	let retDate1 = moment(date1);
	retDate1 = retDate1.hour(0); 
	retDate1 = retDate1.minute(0);
	retDate1 = retDate1.second(0);
	retDate1 = retDate1.millisecond(0);
	let retDate2 = moment(date2);
	retDate2 = retDate2.hour(0); 
	retDate2 = retDate2.minute(0);
	retDate2 = retDate2.second(0);
	retDate2 = retDate2.millisecond(0);
	return retDate1 - retDate2
}


const daysOfWeek = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];

const monthNames = [
	"January", 
	"February", 
	"March", 
	"April", 
	"May", 
	"June",
	"July", 
	"August", 
	"September", 
	"October", 
	"November", 
	"December"
];

class App extends Component {
	state = {
		todos: [
			{
				id: 0, 
				title: "task 0",
				start_at: addDays(new Date(), 0),
				period: 1,
				del: [], 
				completed: []
			},
			{
				id: 1, 
				title: "task 1",
				start_at: addDays(new Date(), 1),
				period: 2,
				del: [], 
				completed: []
			},
			{
				id: 2, 
				title: "task 2",
				start_at: addDays(new Date(), 2),
				period: 2, 
				del: [], 
				completed: []
			},
			{
				id: 3, 
				title: "task 3",
				start_at: addDays(new Date(), 3),
				period: 1,
				del: [], 
				completed: []
			},
			{
				id: 4, 
				title: "task 4",
				start_at: addDays(new Date(), 4),
				period: 2,
				del: [], 
				completed: []
			},
			{
				id: 5, 
				title: "task 5",
				start_at: addDays(new Date(), 5),
				period: 2, 
				del: [], 
				completed: []
			},
			{
				id: 6, 
				title: "task 6",
				start_at: addDays(new Date(), 6),
				period: 2,
				del: [], 
				completed: []
			},
			{
				id: 7, 
				title: "task 7",
				start_at: addDays(new Date(), 7),
				period: 2, 
				del: [], 
				completed: []
			},
		], 
		len: 3,
		prevTasks: {}
	}	
	
	validateTime = (time) => {
		let now = new Date();
		if(cmpTime(time, now ) >= 0 ) 
			return time;
		
		now = moment(now).hour(moment(time).hour()); 
		now = moment(now).minute(moment(time).minute());
		now = moment(now).second(moment(time).second());
		now = moment(now).millisecond(moment(time).millisecond());
		return now.toDate();
		
	}

	componentDidMount() {
		const now = new Date;
		setInterval( () => {
			this.clean();		
		}, cmpTime(setToMidnithg( now ), now));
	}

	clean = () => {
		console.log("Alarm");
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
		let ret = [];
		let titles = ["Today", "Tomorrow"];
		const now = new Date();
		for(let j = 2; j < 6; j++) {
			let cur = addDays(now, j);
			titles.push(daysOfWeek[cur.getDay()] + " " + monthNames[cur.getMonth()] + " " + cur.getDate());
		}
		titles.push("Upcoming");

		for(let j = 0; j < 6; j++) {
			let jezt = addDays(now, j  );

			ret.push(<div className="todoitem-title">{titles[j]}</div>);
			ret.push(
				this.state.todos.map( (todo) => {
					let difference = Math.round(moment.duration(moment(todo.start_at).diff(jezt)).asDays() );
					
					if(this.state.prevTasks[todo.title] && !j) {
						return ;
					} else if(j === 6) {
						return ;
					} else if(
						(!todo.del.includes(todo.start_at)) && 
						(!(difference % todo.period)) &&
						(compareDays(jezt, todo.start_at) >= 0)
					){
						i++;
						return (
							<TodoItem
								key={i}
								id={todo.id} 
								title={todo.title} 
								time={addDays(todo.start_at, j)} 
								changeComplete={this.changeComplete}
								delTodo={this.delTodo}
								completed={todo.completed.includes(addDays(todo.start_at, j))}
							/>	
						)
					}
				})
			);
		}
		return ret;
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