import React, { Component } from 'react';
import '../Menu/menu.css'
// import '../threejs/cube/ThreeCube.css';

import ThreeScene from '../threejs/ThreeScene/ThreeScene'
import Cube from '../threejs/cube/ThreeCube'
import Sphere from '../threejs/sphere/ThreeSphere'
import Smoking from '../threejs/smoking/ThreeSmoking'
import Earth  from '../threejs/bolin/bolin'
import Menu from '../Menu/menu'

export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state ={
          nums:[0,1,2,3],
          num:3,
          title:'动态更换颜色'
        }
      }
      //在组建输出到dom 后会执行componentdidmount() 钩子
      componentDidMount(){
        let threeScene  = new ThreeScene();
        threeScene.initScene();
        this.animate = threeScene.animate;
        this.scene =threeScene.scene;
        this.camera =threeScene.camera;
        this.cube = new Cube({scene:this.scene,threeScene:threeScene});
        this.sphere =new Sphere({scene:this.scene,threeScene:threeScene});
        this.smoking =new Smoking({scene:this.scene,threeScene:threeScene})
        this.earth = new Earth({scene:this.scene,threeScene:threeScene})
        this.init();
        // this.cube.transformAnimate(1);
        this.toggleCamera(this.state.num);
      }
      init(){
        this.cube.init();
        this.sphere.init();
        this.smoking.init();
        this.earth.init();
      }
      toggleCamera(num){
        let title ="";
        if(num ==0){
          title ="动态更换颜色"
        }
        if(num ==1){
          title ="球体drawcall"
        }
        if(num ==2){
          title ="夕阳"
        }
        if(num ==3){
          title ="地球"
        }
        this.setState({num:num,title:title},()=>{this.state.nums.forEach((a)=>{this.initlayers(a)})}); 
        this.resetScene(num);
      }
      initlayers(num){
        if(num == this.state.num){
          this.camera.layers.enable(num); // enabled by default
          console.log(num,'显示')
        }else{
          this.camera.layers.disable(num);
        }
      }
      //初始化场景
      resetScene(num){
        let rules ={
          0:'cube',
          1:"sphere",
          2:"smoking",
          3:"earth"
        }
        for(let prop in rules){
          if(num ==prop){
            this[rules[num]].transformAnimate(1);
          }else{
            this[rules[num]].transformAnimate(0);
          }
        }
      }
      render(){
          return(<div id="webgl-box">{this.state.title}<div id='WebGL-output'><canvas id="webgl" ></canvas></div><Menu toggleCamera = {(num)=>{this.toggleCamera(num)}} data={this.state} /></div>)
        }
}