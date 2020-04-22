import "./auth.css";
import React, { Component } from "react";
import serverAdr from "../../demo";
import axios from 'axios';
import  { Redirect } from 'react-router-dom'

class Auth extends Component {
   state = {
      error: {
         text: ""
      }, 
      finished: false
   }

   hideError = () => {
      document.querySelector(".auth__error").style.transform = "translateY(-100%)";
   }

   showError = (error) => {
      this.setState( {error: {text: error} });
      document.querySelector(".auth__error").style.transform = "translateY(0)";
   }

   register = () => {
      const inputs = document.querySelectorAll(".register__input");
      this.hideError();

      if(inputs[3].value !== inputs[2].value)
         return this.showError("Passwords don't match"); 

      axios({
         method: 'post',
         url: serverAdr + "/api/user/register",
         data: {
            name: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value
         }
      }).then((res) => {
         this.setState({finished:true});
      }).catch((err) => {
         this.showError(err.response.data);
      })
   }

   login = () => {      
      const inputs = document.querySelectorAll(".login__input");
      this.hideError();
      axios({
         method: 'post',
         url: serverAdr + "/api/user/login",
         data: {
            email: inputs[0].value,
            password: inputs[1].value
         }
      }).then((res) => {
         this.props.setToken.bind(this, "");
         this.props.setToken(res.data);
         this.setState({finished:true});
      }).catch((err) => {
         this.showError(err.response.data);
      })
   }

   render() {
      if(this.state.finished) {
         this.setState({finished: false});
         return <Redirect to = {{ pathname: "/" }} />
      }
      return (
         <div className="auth">
            <div className="auth__error">
               <span style={this.state.error.style}>{this.state.error.text}</span>
            </div>
            <div className="auth__item register">
              <input type="text" className="register__input" placeholder="Your name"/>
              <input type="text" className="register__input" placeholder="Your email"/>
              <input type="text" className="register__input" placeholder="Password"/>
              <input type="text" className="register__input" placeholder="Password"/>
              <button className="register__input register__button" onClick={this.register}>Register</button>
            </div>   
            <div className="auth__or">OR</div>
            <div className="auth__item login"> 
               <input type="text" className="login__input register__input" placeholder="Your email"/>
              <input type="text" className="login__input register__input" placeholder="Password"/>
              <button className="register__input register__button" onClick={this.login}>Register</button>
            </div>
         </div>
      );
   }
}

export default Auth;