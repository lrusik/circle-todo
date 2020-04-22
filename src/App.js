import React, { Component } from 'react';
import TodoItem from "./components/TodoItem";
import Header from "./components/layouts/Header";
import Auth from "./components/layouts/Auth";
import { v4 as uuidv4 } from 'uuid';
import  moment  from "moment";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import serverAdr from "./demo";
import axios from 'axios';

// clean function

/* -------------------- unnecessary ---------------------- */ 
// error handling
// modify save to db
// styling
// responsive
// dates near title

// the ability to close and open tabs 
// drag and drop
// readme

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


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [],
			prevTasks: [],
			mode: 0,
			shift: 0, 
			name: "",
			modify: {
				status: "none",
				id: null,
				title: "",
				time: "",
				period: null
			},
			length: 0
		}

		this.setToken(this.getLocalToken());
	}
	
	setLocalToken = (token) => {
		window.localStorage.setItem('token', token);
	}

	getLocalToken = () => {
		return window.localStorage.getItem('token');
	}
	
	setToken = (newToken) => {
		this.setLocalToken(newToken);
		this.setName()
		this.getAllTodos();
	}

	getAllTodos = () => {
		axios.get(serverAdr + "/api/db/get", {headers: {"auth-token": this.getLocalToken()}})
		.then((res) => {
			this.setState({todos: res.data.todos});
			this.setState({prevTasks: res.data.prevTasks});
      }).catch((err) => {
			console.log(err);
         //this.showError(err.response.data);
		})
	}

	changeMode = (mode_num) => {
		/*
			* available modes 
			* * default any number
			* * delete 1  
			* * modify 2
		*/

		this.setState( { mode: parseInt(mode_num, 10) } );
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

	saveToDb = (data) => {
		console.log("Here i am");
		axios({
         method: 'post',
         url: serverAdr + "/api/db/set",
			data: data,
			headers: {
				'auth-token': this.getLocalToken()
		 	},
      }).then((res) => {
         console.log("everything is fine");
      }).catch((err) => {
			console.log("There is an error out thee");
         //this.showError(err.response.data);
      })
	}

	addPeriod = (title, period, time) => {
		time = moment(moment(time, "YYYY-MM-DD HH:mm:ss").toDate());
		try { 
			const newTodos = [ ...this.state.todos, ...[{
				id: this.state.length + 1, 
				title: title,
				start_at: time,
				period: parseInt(period, 10),
				del: [],
				completed: []
			}] ];
			this.setState( { todos: newTodos});
			this.saveToDb({
				todos: newTodos,
				field: 0
			})
		}
		catch(err) {
			console.log(err);
			return 0;
		}
		this.setState( {length: this.state.length + 1} );
	}

	delPeriod = (id, zero) => {
		zero = zero;
		const index = this.getItemIndex(id);
		
		if(index === -1)
			return;
		
		let newTodos = this.state.todos;
		newTodos.splice(index, 1);
		let newPrevTasks = this.state.prevTasks.filter((item) => {
			if(item.parent !== id){
				return item;
			}
		});
		
		this.saveToDb({
			todos: newTodos,
			field: 0
		})
		this.setState({ prevTasks: newPrevTasks });
		this.setState({todos: newTodos});
	}
	
	setModifyPeriod = (id, zero) => {
		zero = zero;
		const index = this.getItemIndex(id);
		
		if(index === -1)
			return;

		this.setState({ modify: {
			status: "block",
			id: id,
			title: this.state.todos[index].title,
			time: this.state.todos[index].start_at,
			period: this.state.todos[index].period
		}});

		this.setState( {mode: 0} );
	}
	
	getItemIndex = (id) => {
		let index = -1;
		for(let i = 0; i < this.state.todos.length; i++)
			try {
				if(this.state.todos[i].id === id) {
					index = i;
					break;
				}
			}
			catch(err) {
				console.log("Formating error: ", err);
			}

		return index;
	}
	
	
	findIfInOpts = (type, id, time) => {
		let index = -1;
		let pos = this.getItemIndex(id);
		for (let i = 0; i < this.state.todos[pos][type].length; i++) {
			if(moment(time).isSame(this.state.todos[pos][type][i]))
				index = i;
		}
		return index;
	}
	
	checkIfInOpts = (type, pos, time) => {
		let index = -1;
		for (let i = 0; i < this.state.todos[pos][type].length; i++) {
			if(moment(time).isSame(this.state.todos[pos][type][i]))
				index = i;
		}
		return index;
	}

	modifyFunc = (id, todo) => {
		const index = this.getItemIndex(id);
		
		if(index === -1)
			return;
		
		let newTodos = this.state.todos;
		newTodos[index] = {
			id: id, 
			title: todo.title,
			start_at: new moment(todo.time),
			period: todo.period, 
			del: newTodos[index].del,
			completed: newTodos[index].completed
		};

		let newPrevTasks = this.state.prevTasks.filter((item) => {
			if(item.parent !== id){
				return item;
			}
		});
		
		this.setState({ prevTasks: newPrevTasks });
		this.setState({todos: newTodos});
	}

	stModify = ( obj ) => {
		this.setState({ modify: obj });
	}

	setDel = (id, time) => {
		let ret = this.state.todos;
		const pos = this.getItemIndex(id);
		const index = this.checkIfInOpts("del", pos, time);

		if(index === -1)
			ret[pos]["del"] = [...ret[pos]["del"], ...[time]]
		
		return ret;
	}

	delTodo = (id, time) => {
		this.setState( { todos: this.setDel(id, time) } );
	}

	setCompleted = (id, time) => {
		let ret = this.state.todos;
		const pos = this.getItemIndex(id);
		const index = this.checkIfInOpts("completed", pos, time);

		if(index > -1){
			ret[pos]["completed"].splice(index, 1);
		} else {
			ret[pos]["completed"] = [...ret[pos]["completed"], ...[time]]
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
		return this.isInTimeArray(this.state.todos[this.getItemIndex(id)].completed, time);
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
							title={todo.title} 
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

	zeroFunction = (a, b) =>  {
		return;
	}

	getUpcomingItems = () => {
		let ret = [];
		
		this.state.todos.forEach( (todo) => 
			{
				if(todo.period || ( (todo.start_at - addDays(new moment(), 5)) >= 0  ) ){
					ret.push(
						<TodoItem
							key={uuidv4()}
							id={todo.id} 
							title={todo.title} 
							completed={null}
							delTodo={this.zeroFunction}
							changeComplete={this.zeroFunction}
							time={todo.time} 
						/>	
					)
				}	
			}
		) 

		return ret;
	}

	getItems = () => {
		const titles = this.getItemsTitles();
		const now = new moment().format("YYYY-MM-DD HH:mm:ss");

		let ret = [<div className="todoitem-title">{titles[0]}</div>];
		ret = ret.concat(this.getNotFinishedTasks());
		
		for(let j = 0; j < 6; j++) {
			let jezt = addDays(now, j);
			
			if(j)
				ret.push(<div className="todoitem-title">{titles[j]}</div>);
			
			ret.push(
				this.state.todos.map( (todo) => {
					try {
						let difference = Math.round(moment.duration(moment(todo.start_at).diff(jezt)).asDays() );
						if(
							(this.findIfInOpts("del", todo.id, addDays(todo.start_at, j)) === -1) && 
							(
								(
									(!todo.period && !compareDays(jezt, todo.start_at) )  
								) ||
								(	
									(todo.period) &&
									(!(difference % todo.period)) &&
									(compareDays(jezt, todo.start_at) >= 0)		
								)
							)
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
					}
					catch(err) {
						console.log("item format error: ", err);
					}
				})
			);
		}

		ret.push(<div className="todoitem-title">Upcoming</div>);
		ret = ret.concat(this.getUpcomingItems())
		return ret;
	}	

	getTodosList = (callback) => {
		let ret = [];
		for (let todo of Array.from(this.state.todos).reverse()) {
			try {
				ret.push(
					
					<TodoItem
						key={uuidv4()}
						id={todo.id} 
						title={todo.title} 
						time={""} 
						changeComplete={callback}
						delTodo={this.delTodo}
						completed={null}
						addClass="animate"
					/>	
				);
			}
			catch(err) {
				console.log("item format error: ", err);
			}
		}
		return ret;
	}

	selector = (mode) => {
		switch(mode) {
			case 1:
				return this.getTodosList(this.delPeriod);
			case 2: 
				return this.getTodosList(this.setModifyPeriod);;
			default: 
				return this.getItems();
		}
	}
	setName = () => {
		axios.get(serverAdr + "/api/db/getName", {headers: {"auth-token": this.getLocalToken()}})
		.then((res) => {
			this.setState({name: res.data.name});
		}).catch((err) => {
			console.log(err);
			//this.showError(err.response.data);
		})
	} 

	render() {
		return (
			<Router>
				<Switch>
					<Route path="/auth">
						<Auth setToken={this.setToken}/>
					</Route>
					<Route path="/">
						<div className="app">	
							<Header 
								addPeriod={this.addPeriod} 
								changeMode={this.changeMode}	
								modify={this.state.modify.status}
								modify_id={this.state.modify.id}
								modify_title={this.state.modify.title}
								modify_date={this.state.modify.time}
								modify_period={this.state.modify.period}
								name={this.state.name}
								mode={this.state.mode}
								shift={this.state.shift}
								modifyFunc={this.modifyFunc}
								stModify={this.stModify}
							/>

							<div className="container">
								{this.selector(this.state.mode)}
							</div>	
						</div>
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;