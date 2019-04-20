import React, { Component } from 'react';
import '../Menu/menu.css'
import '../threejs/ThreeCube/ThreeCube.css';

import ThreeScene from '../threejs/ThreeScene/ThreeScene'
import Cube from '../threejs/cube/ThreeCube'
import Sphere from '../threejs/sphere/ThreeSphere'
import Menu from '../Menu/menu'

export default class Main extends Component{
    constructor(props) {
        super(props);
      }
      //在组建输出到dom 后会执行componentdidmount() 钩子
      componentDidMount(){
        let threeScene  = new ThreeScene();
        threeScene.initScene();
        this.scene =threeScene.scene;
        
        let cube = new Cube({scene:this.scene});
        cube.init();
      }
    render(){
        return(<div id="webgl-box"><div id='WebGL-output'><canvas id="webgl" ></canvas></div><Menu/></div>)
      }
}