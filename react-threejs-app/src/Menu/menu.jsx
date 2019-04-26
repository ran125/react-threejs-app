
import React, { Component } from 'react';
import './menu.css';

const LogoutButton = (props) => {
     return( <div className="loginout" onClick={props.onClick}>{props.sceneText1}</div>)
}
const LoginButton = (props) => {
        return( <div className="login" onClick={props.onClick}>{props.sceneText2}</div>)
}
// const WarningBanner =(props)=> {
//     if (!props.warn) {
//       return null;
//     }
//     return (
//       <div className="warning">
//         警告!
//       </div>
//     );
//   }
//   const InputBanner =(props)=> {
//     let hint =props.hint
//     if (!hint) {
//         hint ="请输入数字"
//     }
//     return (
//       <div><input type="number" className="inputbox"  placeholder={hint} onChange ={props.onChange} value={props.value} /></div>
//     );
//   }

  export default  class Menu extends Component{
     constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = { sceneText1:"切换场景",sceneText2:"切换场景",showWarning:true,hint:"输入姓名哈",inputval:"12333",num:0 };
      }
     componentDidMount(){
    
     }
     handleLogoutClick(){
        this.props.toggleCamera(0);
        this.setState({sceneText2:"切换场景一",showWarning: !this.state.showWarning}); 
     }
     handleLoginClick(){
        this.props.toggleCamera(1);
        this.setState({showWarning: !this.state.showWarning});
    }
    handleClick(){
      let num =this.props.data.num;
      num++;
      let le =this.props.data.nums.length;
      let layer = num % le;
      this.setState({num:num});
      this.props.toggleCamera(layer);
    }

    render(){
        return(
              <div className="menubox"><LogoutButton onClick={this.handleClick} sceneText1={this.state.sceneText1}  />
             </div>
      )
        // return(
        //     <div>{isLoggedIn ? (
        //         <div><LogoutButton onClick={this.handleLogoutClick} username={this.state.usename} />
        //         <InputBanner hint ={this.state.hint} onChange={this.handelChange} value={inputVal}/>
        //         <WarningBanner warn={this.state.showWarning} /></div>
        //       ) : (
        //         <LoginButton onClick={this.handleLoginClick}  age ={this.state.age}/>
        //       )}
        //       </div>
        // )
    }
}

