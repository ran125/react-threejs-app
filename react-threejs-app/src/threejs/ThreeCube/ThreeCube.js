/***threejs cube shader */
import React, { Component } from 'react';
import './ThreeCube.css';
import * as THREE from 'three';
import orbtCtrls from 'three-orbit-controls'
// import staus from "../common/stats.min.js"
var _this =null;
const OrbitControls = orbtCtrls(THREE);
class ThreeCube extends Component{
  constructor(props) {
    super(props);
    this.name = {date: new Date()};
  }
  //在组建输出到dom 后会执行componentdidmount() 钩子
  componentDidMount(){
   this.initThree();
 }
 initThree(){
  _this =this;
 
  // this.width = window.innerWidth;
  // this.height = window.innerHeight;
  this.width =document.getElementById('WebGL-output').clientWidth;
  this.height =document.getElementById('WebGL-output').clientHeight;
  this.initScene();
  this.initCamera();
  this.initGeometry();
  this.initRoom();
  this.initRender()
  this.animate();
  this.initControls();
  window.addEventListener( 'resize', this.onWindowResize, false );
 }
initScene() {
  this.scene = new THREE.Scene();
 }
 initCamera() {
  this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 1000000 );
   this.camera.position.z = 4;
 }
 initGroup(){
  this.group = new THREE.Group();
  this.scene.add( this.group );
 }
 initControls() {
  this.orbitControls = new OrbitControls(this.camera,this.renderer.domElement);
  // this.orbitControls.autoRotate = false;
 }

 initGeometry() {
  var geometry = new THREE.TorusKnotBufferGeometry( 0.75, 0.3, 128, 32, 1 );
  var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
  var mesh = new THREE.Mesh( geometry, material );
  this.scene.add( mesh );
 }
 initRender() {
  let canvas = document.getElementById( 'webgl' );
  this.renderer = new THREE.WebGLRenderer({
    antialias: true, canvas: canvas
  });
  this.renderer.setPixelRatio( window.devicePixelRatio );
  this.renderer.setSize( this.width, this.height );
  
 }
 initRoom(){
  var materials = [];
  for ( var i = 0; i < 8; i ++ ) {
      materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, side: THREE.BackSide } ) );
  }
  var geometry = new THREE.BoxBufferGeometry( 3, 3, 3 );

  var mesh = new THREE.Mesh( geometry, materials );

  this.scene.add(mesh);               
 }
 animate() {
  requestAnimationFrame(_this.animate);
  _this.renderer.render(_this.scene, _this.camera );
}

onWindowResize(){

  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();

  this.renderer.setSize( window.innerWidth, window.innerHeight );
}
 //组建从dom 中移除会调用componentWillUnmount 钩子函数
 componentWillUnmount(){
  //  _this =null;
 }
 render(props){
   return(
     <div id='WebGL-output'><canvas id="webgl" ></canvas></div>
   )
 }
}
export default ThreeCube;
