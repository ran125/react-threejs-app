import React, { Component } from 'react';
import '../Menu/menu.css'
// import '../threejs/cube/ThreeCube.css';

import ThreeScene from '../threejs/ThreeScene/ThreeScene'
import Cube from '../threejs/cube/ThreeCube'
import Sphere from '../threejs/sphere/ThreeSphere'
import Menu from '../Menu/menu'

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state ={
          num:0
        }
      }
      //在组建输出到dom 后会执行componentdidmount() 钩子
      componentDidMount(){
        let threeScene  = new ThreeScene();
        threeScene.initScene();
        this.animate = threeScene.animate;
        this.scene =threeScene.scene;
        this.camera =threeScene.camera;
        let cube = new Cube({scene:this.scene});
        cube.init();
        let sphere =new Sphere({scene:this.scene,threeScene:threeScene});
        sphere.init();
        this.camera.layers.enable(0); // enabled by default
        this.camera.layers.disable(1);
      }
      toggleCamera(num){
        this.setState({num:num});
        let hide_l =num =="0"?"1":"0"
        this.camera.layers.enable(num);
        this.camera.layers.disable(hide_l);
      }
      render(){
          return(<div id="webgl-box"><div id='WebGL-output'><canvas id="webgl" ></canvas></div><Menu toggleCamera = {(num)=>{this.toggleCamera(num)}} /></div>)
        }
}