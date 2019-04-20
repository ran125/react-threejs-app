/***threejs cube shader */

import '../ThreeCube/ThreeCube.css';
import * as THREE from 'three';
import orbtCtrls from 'three-orbit-controls'
  const OrbitControls = orbtCtrls(THREE);

  //export default class ThreeScene extends Component{
  export default class ThreeScene {
 
  // constructor(props) {
  //   this.setState({scene:null})
  // }

  //在组建输出到dom 后会执行componentdidmount() 钩子
  // componentDidMount(){
  // }

  initScene(){
    let _this =this;
    this.width =document.getElementById('WebGL-output').clientWidth;
    this.height =document.getElementById('WebGL-output').clientHeight;
    this.scene = new THREE.Scene();
    this.initCamera();
    this.initRender()
    this.animate(_this);
    this.initControls();
    this.onWindowResize();
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
    window.requestAnimationFrame(()=>{this.animate();});
    this.renderer.render(this.scene, this.camera );
  }
  onWindowResize(){
    this.camera.aspect = this.width/this.height;
    this.camera.updateProjectionMatrix();
  
    this.renderer.setSize( this.width, this.height );
  }

 //组建从dom 中移除会调用componentWillUnmount 钩子函数
//  componentWillUnmount(){
//   //  _this =null;
//  }
//  render(){
//    return(
//      <div id='scene'>
//      <Sphere  scene={this.scene} />
//      </div>
//    )
//  }
}

