import React from "react";
import "./header.css";

function Header(props) {
	return (
		<div className="headerStyle">
			<p className="headerSign">Todo App</p>
			<div className="headerNav container">
				<div className="headerNav__inner">
					<div className="headerNav__item">
						<div className="headerNav__add headerNav__field add">
							<div className="standart__field">
								<div className="standart__opt">Add task</div>
								<div className="standart__options">	
									<div className="standart__item">
										<label className="standart__title">
											<div className="standart__name">Title</div>
											<input className="standart__input standart__titleinp" type="text"/>
										</label>
									</div>

									<div className="standart__item">
										<label forHtml="period" className="standart__period">
											<div className="standart__name">Period</div>
										</label>
										<div className="standart__flex">
											<input name="period" className="standart__input standart__periodinp" type="text" value="0" />
											
											<div className="standart__arrows">
												<div className="standart__plus"><div></div></div>
												<div className="standart__minus"><div></div></div>
											</div>
										</div>

									</div>
									
									<div className="standart__item">
										<label className="standart__date">
											<div className="standart__name">Date</div>
											<input type="date" className="standart__input standart__dateinp" /> 
										</label>
									</div>
									<button className="standart__submit">Add</button>
								</div>
							</div>
						</div>
						
						<div className="headerNav__modify modify headerNav__field">
							<div className="standart__field">
								<div className="standart__opt">Modify tasks</div>
								<div className="standart__options" style={{display: props.modify}}>	
									<div className="standart__item">
										<label className="standart__title">
											<div className="standart__name">Title</div>
											<input className="standart__input standart__titleinp" type="text" value={props.modify_title}/>
										</label>
									</div>
									<div className="standart__item">
										<label forHtml="period" className="standart__period">
											<div className="standart__name">Period</div>
										</label>

										<div className="standart__flex">
											<input name="period" className="standart__input standart__periodinp" type="text" value={props.modify_period} />
											
											<div className="standart__arrows">
												<div className="standart__plus"><div></div></div>
												<div className="standart__minus"><div></div></div>
											</div>
										</div>
									</div>
									<div className="standart__item">
										<label className="standart__date">
											<div className="standart__name">Date</div>
											<input type="date" className="standart__input standart__dateinp" value={props.modify_date} /> 
										</label>
									</div>	
									<button className="standart__submit">Modify</button>
								</div>
							</div>
						</div>
						<div className="headerNav__delete headerNav__field"> 
							<div className="standart__opt">Delete period</div>	
						</div>
					</div>

					<div className="headerNav__item">
						<div className="headerNav__greeting greeting headerNav__field">Hi, {props.name}</div>
						<div className="headerNav__profile profile headerNav__field">
							<div className="standart__field">
								<div className="standart__opt">Options</div>
								<div className="standart__options">	
									<div className="standart__item standart__hover">
										<div className="standart__name">Something</div>
									</div>
									<div className="standart__line"></div>
									<div className="standart__item">
										<label forHtml="period" className="standart__period">
											<div className="standart__name">Something</div>	
										</label>

										<div className="standart__flex">
											<input name="period" className="standart__input standart__periodinp" type="text" value={props.shift} />

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
	);
}

export default Header;
