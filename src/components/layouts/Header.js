import React, { Component } from "react";
import "./header.css";
import TimeField from 'react-simple-timefield';

import moment from "moment";

// close all tabs on click not in tab
// check if field empty

class Header extends Component {
	constructor(props) {
		super(props);		
		this.onTimeChange1 = this.onTimeChange1.bind(this);
		this.onTimeChange2 = this.onTimeChange2.bind(this);
	}
	
	state = {
		date1: new moment().format("YYYY-MM-DD"),
		time1: new moment().format("HH:mm"), 
		counter: 0,
		modify_id: this.props.modify_id,
		modify_period: this.props.modify_period,
		modify_title: this.props.modify_title,
		modify_date: new moment(this.props.modify_date).format("YYYY-MM-DD"),
		modify_time: new moment(this.props.modify_date).format("HH:mm")
	};


	open = (e) => {
		const field = e.target.parentElement.querySelector(".standart__options");
		if(field.style.display === "none" || field.style.display === ""){
			field.style.display = "block";
		} else {
			field.style.display = "none";
		}
	}
	
	delete = (e) => {
		this.props.changeMode.bind(this, 1);
		if(e.target.style.background === ""){
			e.target.style.background = "#3266c8";
			this.props.changeMode(1);
		} else {
			e.target.style.background = "";
			this.props.changeMode(0);
		}
	}

	modify = (e) => {
		this.props.changeMode.bind(this, 2);
		if(e.target.style.background === ""){
			e.target.style.background = "#3266c8";
			this.props.changeMode(2);
		} else {
			e.target.style.background = "";
			this.props.changeMode(0);
			this.props.stModify.bind(this, {});
			this.props.stModify({
				status: "none",
				id: null,
				title: "",
				time: "",
				period: null
			});
		}

	}

	modifyFunc = (e) => {
		this.props.modifyFunc.bind(this, 0, {});
		this.props.modifyFunc(this.state.modify_id, {
			title: this.state.modify_title,
			time: (this.state.modify_date + " " + this.state.modify_time),
			period: this.state.modify_period
		});

		this.props.stModify.bind(this, {});
		this.props.stModify({
			status: "none",
			id: null,
			title: "",
			time: "",
			period: null
		});

		e.target.parentElement.parentElement.querySelector(".standart__opt").style.background = "";
	}

	mark = (e) => {
		if(e.target.style.background === ""){
			e.target.style.background = "#3266c8";
		} else {
			e.target.style.background = "";
		}
	}

	addPeriod = (e) => {
		const inputs = e.target.parentElement.querySelectorAll("input");
		this.props.addPeriod.bind(this, inputs[0].value, inputs[1].value, (inputs[3].value + " " + inputs[2].value) );
		this.props.addPeriod(inputs[0].value, inputs[1].value, (inputs[3].value + " " + inputs[2].value) );
		e.target = e.target.parentElement
		this.open(e);
	}

	onChange = (e) => {
		this.setState({
			[e.target.getAttribute('data-name')]: e.target.value 
		});
	}

	onChangeInt = (e) => {
		const newValue = parseInt(e.target.value, 10);
		this.setState({
			[e.target.getAttribute('data-name')]: (isNaN(newValue)) ? "" : newValue 
		});
	}

	onTimeChange1 = (time) => {
		this.setState({
			time1: time 
		});
	}

	onTimeChange2 = (time) => {
		this.setState({
			modify_time: time 
		});
	}

	incCounter = (e) => {
		const value = Math.round(parseInt(this.state[e.currentTarget.getAttribute('data-name')], 10) + 1);
		this.setState({
			[e.currentTarget.getAttribute('data-name')]: ( (value) > 0 ) ? (value) : 0
		});
	}

	decCounter = (e) => {
		const value = Math.round(parseInt(this.state[e.currentTarget.getAttribute('data-name')], 10) - 1);
		this.setState({
			[e.currentTarget.getAttribute('data-name')]: ( (value) > 0 ) ? (value) : 0 
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ modify_id: nextProps.modify_id });
		this.setState({ modify_period: nextProps.modify_period });
		this.setState({ modify_title: nextProps.modify_title });
		this.setState({ modify_date: new moment(nextProps.modify_date).format("YYYY-MM-DD") });
		this.setState({ modify_time: new moment(nextProps.modify_date).format("HH:mm") });
	}

	render() {
		return (
			<div className="headerStyle">
				<p className="headerSign">Todo App</p>
				<div className="headerNav container">
					<div className="headerNav__inner">
						<div className="headerNav__item">
							<div className="headerNav__add headerNav__field add">
								<div className="standart__field">
									<div onClick={this.open} className="standart__opt">Add task</div>
									<div className="standart__options">	
										<div className="standart__item">
											<label className="standart__title">
												<div className="standart__name">Title</div>
												<input className="standart__input standart__titleinp" type="text"/>
											</label>
										</div>
									
										<div className="standart__item">
											<label htmlFor="period" className="standart__period">
												<div className="standart__name">Period</div>
											</label>
											<div className="standart__flex">
												<input name="period" data-name="counter" onChange={this.onChangeInt} className="standart__input standart__periodinp" type="text" value={this.state.counter} />
												
												<div className="standart__arrows">
													<div data-name="counter" className="standart__plus" onClick={this.incCounter}><div></div></div>
													<div data-name="counter" className="standart__minus" onClick={this.decCounter}><div></div></div>
												</div>
											</div>
										</div>
										<div className="standart__item">
											<label className="standart__time">
												<div className="standart__name">Time</div>
												<TimeField value={this.state.time1} onChange={this.onTimeChange1} className="standart__input standart__timeinp" style={{width: "180px"}} />
											</label>
										</div>
										<div className="standart__item">
											<label className="standart__date">
												<div className="standart__name">Date</div>
												
												<input onChange={this.onChange} type="date" data-name="date1" className="standart__input standart__dateinp" value={this.state.date1} />

											</label>
										</div>
										<button onClick={this.addPeriod} className="standart__submit">Add</button>
									</div>
								</div>
							</div>
							
							<div className="headerNav__modify modify headerNav__field">
								<div className="standart__field">
									<div onClick={this.modify} className="standart__opt">Edit tasks</div>
									<div className="standart__options" style={{display: this.props.modify  }}>	
										<div className="standart__item">
											<label className="standart__title">
												<div className="standart__name">Title</div>
												<input 
													data-name="modify_title"
													onChange={this.onChange}
													className="standart__input standart__titleinp" 
													type="text" 
													value={this.state.modify_title}
												/>
											</label>
										</div>
										<div className="standart__item">
											<label htmlFor="period" className="standart__period">
												<div className="standart__name">Period</div>
											</label>

											<div className="standart__flex">
												<input data-name="modify_period" name="period" className="standart__input standart__periodinp" type="text" onChange={this.onChangeInt} value={this.state.modify_period} />
												<div className="standart__arrows">
													<div data-name="modify_period" className="standart__plus" onClick={this.incCounter}><div></div></div>
													<div data-name="modify_period" className="standart__minus" onClick={this.decCounter}><div></div></div>
												</div>
											</div>
										</div>
										<div className="standart__item">
											<label className="standart__time">
												<div className="standart__name">Time</div>
												<TimeField value={this.state.modify_time} onChange={this.onTimeChange2} className="standart__input standart__timeinp" style={{width: "180px"}} />
											</label>
										</div>
										<div className="standart__item">
											<label className="standart__date">
												<div className="standart__name">Date</div>
												<input type="date" onChange={this.onChange} data-name="modify_date" className="standart__input standart__dateinp" value={this.state.modify_date} /> 
											</label>
										</div>	
										<button onClick={this.modifyFunc} className="standart__submit">Modify</button>
									</div>
								</div>
							</div>
							<div className="headerNav__delete headerNav__field"> 
								<div onClick={this.delete} className="standart__opt">Delete period</div>	
							</div>
						</div>

						<div className="headerNav__item">
							<div className="headerNav__greeting greeting headerNav__field">Hi, {this.props.name}</div>
							<div className="headerNav__profile profile headerNav__field">
								<div className="standart__field">
									<div onClick={this.open} className="standart__opt">Options</div>
									<div className="standart__options">	
										<div className="standart__item standart__hover">
											<div className="standart__name">Something</div>
										</div>
										<div className="standart__line"></div>
										<div className="standart__item">
											<label htmlFor="period" className="standart__period">
												<div className="standart__name">Something</div>	
											</label>

											<div className="standart__flex">
												<input name="period" className="standart__input standart__periodinp" type="text" value={this.props.shift} />

												<div className="standart__arrows">
													<div className="standart__plus"><div></div></div>
													<div className="standart__minus"><div></div></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>		
				</div>
			</div>
		)
	}
}

export default Header;
