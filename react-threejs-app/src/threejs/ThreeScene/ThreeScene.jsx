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
    this.setState({scene:null})
  }
  //在组建输出到dom 后会执行componentdidmount() 钩子
  componentDidMount(){
  
  }
  initScene(){
    this.width =document.getElementById('WebGL-output').clientWidth;
    this.height =document.getElementById('WebGL-output').clientHeight;
    this.initScene();
    this.initCamera();
    this.initRender()
    this.animate();
    this.initControls();
  }
  initScene() {
    this.scene = new THREE.Scene();
   }
   initCamera() {
    this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 1000000 );
    this.camera.position.z = 4;
   }
   initControls() {
    this.orbitControls = new OrbitControls(this.camera,this.renderer.domElement);
    // this.orbitControls.autoRotate = false;
   }
   initRender() {
    let canvas = document.getElementById( 'webgl' );
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, canvas: canvas
    });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.width, this.height );
   }
   animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera );
  }

 //组建从dom 中移除会调用componentWillUnmount 钩子函数
 componentWillUnmount(){
  //  _this =null;
 }
 render(){
   return(
     <div id='scene'>
     <Sphere  scene={this.scene} />
     </div>
   )
 }
}
export default ThreeScene;
