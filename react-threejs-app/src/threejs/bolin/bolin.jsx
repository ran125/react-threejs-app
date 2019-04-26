
import * as THREE from 'three';
// import FBXLoader from '../../common/FBXLoader';

import FBXLoader from 'three-fbx-loader';
export default class Earth {
    constructor(props) {
      // super(props);
      this.scene =props.scene;
      this.layer =3;
      this.cu = props.threeScene;
      }
      init(){
        this.initEarth();
        // this.initBolin();
        this.clock = new THREE.Clock();
      }
       initEarth() {
        var loader = new THREE.TextureLoader();
       	loader.load(require('../../resources/textures/land_ocean_ice_cloud_2048.jpg') , (texture) =>{
          var geometry = new THREE.SphereBufferGeometry( 20, 20, 20 );
          // var material = new THREE.MeshLambertMaterial( { map: texture } );
          var   material = new THREE.MeshBasicMaterial( { map: texture } ); 
          var mesh = new THREE.Mesh( geometry, material );
          mesh.layers.set(this.layer);
          this.scene.add( mesh );
          });
       }
       //初始化路径漫游
       initPathRoaming(){
         console.log()

       }
      //  initBolin(){
      //   var loader = new FBXLoader();
			// 	loader.load(require('../../resources/models/szc/szc.FBX'), (object)=> {
      //     console.log(object)
      //     // object.traverse((child)=>{this.initlayers(child)})
      //     // object.scale.set(100,100,100);
      //     // object.layers.set(this.layer);
      //     // this.scene.add( object );
      //   })
      //  }
       initlayers(child){
         if(child.type == "Mesh"){
           child.layers.set(this.layer);
         }
       }
      render(){

      }
      transformAnimate(layer){
        if(layer ==1){
          this.scene.background = new THREE.Color( 0xffffff );
          this.cu.camera.position.z = 60;
        }
        this.cu.setAnimateFn((fn)=>{this.render()},layer)
      }
}
