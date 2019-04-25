
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
        this.handelChange =this.handelChange.bind(this)
        this.state = { isLoggedIn:true,sceneText1:"切换场景二",sceneText2:"切换场景一",showWarning:true,hint:"输入姓名哈",inputval:"12333" };
      }
     componentDidMount(){
    
     }
     handleLogoutClick(){
        this.props.toggleCamera(0);
        this.setState({isLoggedIn: false,sceneText2:"切换场景一",showWarning: !this.state.showWarning}); 
     }
     handleLoginClick(){
        this.props.toggleCamera(1);
        this.setState({isLoggedIn: true,showWarning: !this.state.showWarning});
    }
    handelChange(e){
        this.setState({inputval:e.target.value})
    }
     
    render(){
        const isLoggedIn = this.state.isLoggedIn;
        // const inputVal =this.state.inputval
        return(
          <div>{isLoggedIn ? (
              <div><LogoutButton onClick={this.handleLogoutClick} sceneText1={this.state.sceneText1} />
             </div>
            ) : (
              <LoginButton onClick={this.handleLoginClick}  sceneText2 ={this.state.sceneText2}/>
            )}
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

