/***threejs cube shader */

// import '../ThreeCube/ThreeCube.css';
import * as THREE from 'three';
import orbtCtrls from 'three-orbit-controls'
  const OrbitControls = orbtCtrls(THREE);

  //export default class ThreeScene extends Component{
  export default class ThreeScene {
  constructor(props) {
  this.animatefn=null;
  this.layer =0;
  }

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
    let canvas = document.getElementById('webgl');
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, canvas: canvas
    });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.width, this.height );
   }

   animate() {
    window.requestAnimationFrame(()=>{this.animate();});
    this.renderer.render(this.scene, this.camera );
    if(this.isFn(this.animatefn)){
      this.animatefn();
    }
  }
  onWindowResize(){
    this.camera.aspect = this.width/this.height;
    this.camera.updateProjectionMatrix();
  
    this.renderer.setSize( this.width, this.height );
  }
  isFn(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }
  setAnimateFn(fn,layer){
    if(layer>this.layer){
      this.animatefn =fn;
    }
  }
  getAnimateFn(){
   return this.animatefn
  }

  // limitFPS(){
  //   window.requestAnimFrame = (function () {
  //     return  window.requestAnimationFrame ||
  //         window.webkitRequestAnimationFrame ||
  //         window.mozRequestAnimationFrame ||
  //         window.oRequestAnimationFrame ||
  //         window.msRequestAnimationFrame
  //   })();
  //   var FPS = 30;//30 fps ，maximun 300 FPS   300 = requestAnimCount*5
  //   var duration = 1/FPS*1000;//duration
  //   var requestAnimCount = 5;//counter
  //   var updateRequestAnimTime = function(t){//
  //     if(requestAnimCount<5){
  //         requestAnimCount+=5;//maximun 300 FPS  = requestAnimCount*5
  //     }
  //     window.requestAnimFrame(updateRequestAnimTime);
  //   }
  //   window.requestAnimFrame(updateRequestAnimTime);
  //   setInterval(function(){
  //     if(requestAnimCount < 0){
  //         console.log('idle~');
  //         return;
  //     }
  //     requestAnimCount--;
  //     console.log('running');})
  // }
  //your main loop~;

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

