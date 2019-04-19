/***threejs cube shader */
import React, { Component } from 'react';
import './ThreeCube.css';
import * as THREE from 'three';
import orbtCtrls from 'three-orbit-controls'
var _this =null;
const OrbitControls = orbtCtrls(THREE);
class ThreeScene extends Component{
  constructor(props) {
    super(props);
    this.name = {date: new Date()};
  }
  //在组建输出到dom 后会执行componentdidmount() 钩子
  componentDidMount(){
  
 }
 //组建从dom 中移除会调用componentWillUnmount 钩子函数
 componentWillUnmount(){
  //  _this =null;
 }
 render(props){
   return(
     <div id='scene'></div>
   )
 }
}
export default ThreeScene;
