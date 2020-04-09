import React, { Component } from "react";
import "./header.css";
import Timekeeper from 'react-timekeeper';
import TimeField from 'react-simple-timefield';

import moment from "moment";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date1: new moment().format("YYYY-MM-DD"),
			time1: new moment().format("HH:mm"), 
			counter: 0,
			modify_period: props.modify_period,
			modify_title: props.modify_title,
			modify_date: new moment(props.modify_date).format("YYYY-MM-DD"),
			modify_time: new moment(props.modify_date).format("HH:mm")
		};

		this.onTimeChange1 = this.onTimeChange1.bind(this);
		this.onTimeChange2 = this.onTimeChange2.bind(this);
	}
	
	open = (e) => {
		const field = e.target.parentElement.querySelector(".standart__options");
		if(field.style.display === "none" || field.style.display === ""){
			field.style.display = "block";
		} else {
			field.style.display = "none";
		}
	}

	mark = (e) => {
		if(e.target.style.background === ""){
			e.target.style.background = "#3266c8";
		} else {
			e.target.style.background = "";
		}
	}

	addPeriod = (e) => {
		const inputs = e.target.parentElement.querySelectorAll(".standart__input");
		this.props.addPeriod.bind(this, inputs[0].value, inputs[1].value, (inputs[2].value + " " + inputs[3].value) );
		this.props.addPeriod(inputs[0].value, inputs[1].value, inputs[2].value);
	}

	onChnage = (e) => {
		this.setState({
			[e.target.name]: e.target.value 
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
												<input name="period" date-name="counter" onChange={this.onChnage} className="standart__input standart__periodinp" type="text" value={this.state.counter} />
												
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
												
												<input onChange={this.onChnage} type="date" name="date1" className="standart__input standart__dateinp" value={this.state.date1} />

											</label>
										</div>
										<button onClick={this.addPeriod} className="standart__submit">Add</button>
									</div>
								</div>
							</div>
							
							<div className="headerNav__modify modify headerNav__field">
								<div className="standart__field">
									<div onClick={this.mark} className="standart__opt">Modify tasks</div>
									<div className="standart__options" style={{display: this.props.modify  }}>	
										<div className="standart__item">
											<label className="standart__title">
												<div className="standart__name">Title</div>
												<input 
													className="standart__input standart__titleinp" 
													type="text" 
													value={this.props.modify_title}
												/>
											</label>
										</div>
										<div className="standart__item">
											<label htmlFor="period" className="standart__period">
												<div className="standart__name">Period</div>
											</label>

											<div className="standart__flex">
												<input date-name="modify_period" name="period" className="standart__input standart__periodinp" type="text" value={this.state.modify_period} />
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
												<input type="date" className="standart__input standart__dateinp" value={this.state.modify_date} /> 
											</label>
										</div>	
										<button className="standart__submit">Modify</button>
									</div>
								</div>
							</div>
							<div className="headerNav__delete headerNav__field"> 
								<div onClick={this.mark} className="standart__opt">Delete period</div>	
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
