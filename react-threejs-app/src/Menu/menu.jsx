
import React, { Component } from 'react';
import './menu.css';

const LogoutButton = (props) => {
     return( <div className="loginout" onClick={props.onClick}>{props.username}</div>)
}
const LoginButton = (props) => {
        return( <div className="login" onClick={props.onClick}>{props.age}</div>)
}
const WarningBanner =(props)=> {
    if (!props.warn) {
      return null;
    }
    return (
      <div className="warning">
        警告!
      </div>
    );
  }
  const InputBanner =(props)=> {
    let hint =props.hint
    if (!hint) {
        hint ="请输入数字"
    }
    return (
      <div><input type="number" className="inputbox"  placeholder={hint} onChange ={props.onChange} value={props.value} /></div>
    );
  }

  export default  class Menu extends Component{
     constructor(props) {
        console.log(props)
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handelChange =this.handelChange.bind(this)
        this.state = { isLoggedIn:true,usename:"wrr",age:"25",showWarning:true,hint:"输入姓名哈",inputval:"12333" };
      }
     componentDidMount(){
    
     }
     handleLogoutClick(){
        this.props.toggleCamera(1);
        this.setState({isLoggedIn: false,age:20,showWarning: !this.state.showWarning}); 
     }
     handleLoginClick(){
        this.props.toggleCamera(0);
        this.setState({isLoggedIn: true,showWarning: !this.state.showWarning});
    }
    handelChange(e){
        this.setState({inputval:e.target.value})
    }
     
    render(){
        const isLoggedIn = this.state.isLoggedIn;
        const inputVal =this.state.inputval
        return(
            <div>{isLoggedIn ? (
                <div><LogoutButton onClick={this.handleLogoutClick} username={this.state.usename} />
                <InputBanner hint ={this.state.hint} onChange={this.handelChange} value={inputVal}/>
                <WarningBanner warn={this.state.showWarning} /></div>
              ) : (
                <LoginButton onClick={this.handleLoginClick}  age ={this.state.age}/>
              )}
              </div>
        )
    }
}

