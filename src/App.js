import React, { Component } from 'react';
import TodoItem from "./components/TodoItem";
import Header from "./components/layouts/Header";
//import AddTodo from "./components/layouts/AddTodo";
import { v4 as uuidv4 } from 'uuid';
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
	return retDate;
}

function addDays(date, days) {
	return moment(date).add(days, 'd');
}

function subDays(date, days) {
	return moment(date).subtract(days, 'days');
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

function showTest() {
	console.log(new moment().format("YYYY-MM-DD HH:mm:ss"));
	console.log();
}

class App extends Component {
	constructor(props) {
		super(props);
		//showTest();
	}

	state = {
		todos: [
			{
				id: 0, 
				title: "task 0",
				start_at: addDays(new moment().format("YYYY-MM-DD HH:mm:ss"), 0),
				period: 1,
				del: [],
				completed: []
			},
			{
				id: 1, 
				title: "task 1",
				start_at: addDays(new moment().format("YYYY-MM-DD HH:mm:ss"), 1),
				period: 2,
				del: [], 
				completed: []
			},
			{
				id: 2, 
				title: "task 2",
				start_at: addDays(new moment().format("YYYY-MM-DD HH:mm:ss"), 2),
				period: 2, 
				del: [], 
				completed: []
			},
			{
				id: 3, 
				title: "task 3",
				start_at: addDays(new moment().format("YYYY-MM-DD HH:mm:ss"), 3),
				period: 1,
				del: [], 
				completed: []
			},
			{
				id: 4, 
				title: "task 4",
				start_at: addDays(new moment().format("YYYY-MM-DD HH:mm:ss"), 4),
				period: 2,
				del: [], 
				completed: []
			},
			{
				id: 5, 
				title: "task 5",
				start_at: addDays(new moment().format("YYYY-MM-DD HH:mm:ss"), 5),
				period: 2, 
				del: [], 
				completed: []
			},
			{
				id: 6, 
				title: "task 6",
				start_at: addDays(new moment().format("YYYY-MM-DD HH:mm:ss"), 6),
				period: 2,
				del: [], 
				completed: []
			},
			{
				id: 7, 
				title: "task 7",
				start_at: addDays(new moment().format("YYYY-MM-DD HH:mm:ss"), 7),
				period: 2, 
				del: [], 
				completed: []
			},
			{
				id: 8, 
				title: "Not finished yet",
				start_at: new moment().format("YYYY-MM-DD HH:mm:ss"),
				period: 1,
				del: [],
				completed: []
			},
		], 
		prevTasks: [
			{
				id: 8,
				time: subDays(new moment(), 1).format("YYYY-MM-DD HH:mm:ss"),
				completed: false, 
				del: false
			}
		],
		length: 8
	}	
	
	validateTime = (time) => {
		let now = new moment().format("YYYY-MM-DD HH:mm:ss");
		if(cmpTime(time, now ) >= 0 ) 
			return time;
		
		now = moment(now).hour(moment(time).hour()); 
		now = moment(now).minute(moment(time).minute());
		now = moment(now).second(moment(time).second());
		now = moment(now).millisecond(moment(time).millisecond());
		return now;
		
	}

	componentDidMount() {
		let now = new moment().format("YYYY-MM-DD HH:mm:ss");
		setInterval( () => {
			//this.clean();
		}, cmpTime(setToMidnithg( now ), now));
	}

	clean = () => {
		console.log("Alarm");
	}

	addPeriod = () => {

	}

	delPeriod = (id) => {

	}

	getItemIndex = (type, id, time) => {
		let index = -1;
		for (let i = 0; i < this.state.todos[id][type].length; i++) {
			if(moment(time).isSame(this.state.todos[id][type][i]))
				index = i;
		}
		return index;
	}
	
	setDel = (id, time) => {
		let ret = this.state.todos;
		const index = this.getItemIndex("del", id, time);

		if(index === -1)
			ret[id]["del"] = [...ret[id]["del"], ...[time]]
		
		return ret;
	}

	delTodo = (id, time) => {
		this.setState( { todos: this.setDel(id, time) } );
	}

	setCompleted = (id, time) => {
		let ret = this.state.todos;
		const index = this.getItemIndex("completed", id, time);

		if(index > -1){
			ret[id]["completed"].splice(index, 1);
		} else {
			ret[id]["completed"] = [...ret[id]["completed"], ...[time]]
		}
		return ret;
	}	

	changeComplete = (id, time) => {
		this.setState( { todos: this.setCompleted(id, time) } );
	}

	isInTimeArray = (array, time) => {
		let BreakException = {"name": "BreakException", "ret": false};
		
		try {
			array.forEach(function(el) {
				if (moment(el).isSame(time)){ 
					BreakException.ret = true;
					throw BreakException.name;
				}
			});
		} catch (e) {
			if (e !== BreakException.name) throw e;
		}

		return BreakException.ret;
	}

	isComplete = (id, time) => {
		return this.isInTimeArray(this.state.todos[id].completed, time);
	}

	getItemsTitles = () => {
		let titles = ["Today", "Tomorrow"];
		const now = new moment().format("YYYY-MM-DD HH:mm:ss");
		for(let j = 2; j < 6; j++) {
			let cur = addDays(now, j);
			titles.push(moment(cur).format("ddd") + " " + moment(cur).format("MMMM") + " " + cur.date());
		}
		titles.push("Upcoming");
		return titles;
	}


	findNfItem = (id, time) => {
		for(let i = 0; i < this.state.prevTasks.length; i++)
			if(this.state.prevTasks[i].id === id && moment(this.state.prevTasks[i].time).isSame(time))
				return i;
		console.error("Item not found. id:", id, "time:", moment(time).format("YYYY-MM-DD HH:mm:ss"));
		return null;
	}

	setNfComplete = (id, time) => {
		const index = this.findNfItem(id, time);
		if(index === null)
			return ;			
		
		let newPrevTasks = this.state.prevTasks;
		newPrevTasks[index].completed = ~this.state.prevTasks[index].completed;

		this.setState({ prevTasks: newPrevTasks });
	}

	delNf = (id, time) => {
		const index = this.findNfItem(id, time);
		if(index === null)
			return ;			
		
		let newPrevTasks = this.state.prevTasks;
		newPrevTasks[index].del = ~this.state.prevTasks[index].del;

		this.setState({ prevTasks: newPrevTasks });
	}

	getNotFinishedTasks = () => {
		let ret = [];
		
		this.state.prevTasks.forEach( (todo) => 
			{
				const index = this.findNfItem(todo.id, todo.time)
				if(index !== null && !this.state.prevTasks[index].del){
					ret.push(
						<TodoItem
							key={uuidv4()}
							id={todo.id} 
							title={this.state.todos[todo.id].title} 
							time={todo.time} 
							changeComplete={this.setNfComplete}
							delTodo={this.delNf}
							completed={this.state.prevTasks[index].completed}
						/>	
					)
				}	
			}
		) 

		return ret;
	}

	getUpcomingItems = () => {
		//uuidv4()
		return [];
	}

	getItems = () => {
		const titles = this.getItemsTitles();
		const now = new moment().format("YYYY-MM-DD HH:mm:ss");

		let ret = [<div className="todoitem-title">{titles[0]}</div>];
		ret = ret.concat(this.getNotFinishedTasks());
		
		for(let j = 0; j < 6; j++) {
			let jezt = addDays(now, j  );
			
			if(j)
				ret.push(<div className="todoitem-title">{titles[j]}</div>);
			
			ret.push(
				this.state.todos.map( (todo) => {
					let difference = Math.round(moment.duration(moment(todo.start_at).diff(jezt)).asDays() );
					
					if(
						(this.getItemIndex("del", todo.id, addDays(todo.start_at, j)) === -1) && 
						(!(difference % todo.period)) &&
						(compareDays(jezt, todo.start_at) >= 0)
					){
						return (
							<TodoItem
								key={uuidv4()}
								id={todo.id} 
								title={todo.title} 
								time={addDays(todo.start_at, j)} 
								changeComplete={this.changeComplete}
								delTodo={this.delTodo}
								completed={this.isComplete(todo.id, addDays(todo.start_at, j))}
							/>	
						)
					}
				})
			);
		}

		ret = ret.concat(this.getUpcomingItems())
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