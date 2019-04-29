
import * as THREE from 'three';
// import FBXLoader from '../../common/FBXLoader';

import  FBXLoader from 'three-fbxloader-offical';
import SimplifyModifier from '../../common/modifiers/SimplifyModifier';
const TWEEN = require('@tweenjs/tween.js');
const modifier = new SimplifyModifier();
export default class Earth {
    constructor(props) {
      // super(props);
      this.scene =props.scene;
      this.layer =3;
      this.cu = props.threeScene;
	  	this.progress = 0;
      }
      init(){
        this.initEarth();
        this.initBolin();
        this.clock = new THREE.Clock();
        // this.getcameraPos();
        // this.initPathRoaming();
      }
       initEarth() {
        this.group = new THREE.Group();
        var loader = new THREE.TextureLoader();
       	loader.load(require('../../resources/textures/land_ocean_ice_cloud_2048.jpg') , (texture) =>{
          var geometry = new THREE.SphereBufferGeometry( 35, 35, 35 );
          var material = new THREE.MeshBasicMaterial( { map: texture } ); 
          var mesh = new THREE.Mesh( geometry, material );
          mesh.layers.set(this.layer);
          this.group.add( mesh );
          });
       }
       //初始化路径漫游
       initPathRoaming(){
         let material =new THREE.MeshBasicMaterial({color:0xff0000})
         let positions =[];
         for(var i =0 ;i<50;i++){
          var _r = 40;
          var a = i / 8 * Math.PI * Math.pow(-1, i);
          var b = (i / 8) * Math.PI * 2;
          var y = 0;
          var x = _r * Math.cos(b);
          var z = _r * Math.sin(b);
          var point =new THREE.Vector3(x, y, z);
          positions.push(point);
         }
        this.curve = new THREE.CatmullRomCurve3(positions);
        // 通过曲线生成一个管道几何体
        var geometry = new THREE.TubeGeometry(this.curve, 64, 1); 
        var mesh = new THREE.Mesh(geometry,material);
        mesh.layers.set(this.layer)
        this.group.add(mesh);
        // 从曲线上获得501个顶点，数量根据需要自己设置
        // this.points = curve.getPoints(500);
        // this.cu.camera.position.set(points[j].x, points[j].y, points[j].z);
        // this.cu.camera.lookAt(new THREE.Vector3(points[j + 1].x, points[j + 1].y, points[j + 1].z));
        // 相机位置设置为曲线上第i个顶点
        // // 相机观察点设置为第i个点的下一个点
        //{x: 0, y: 1.6985212642025218e-15, z: 27.738957312183373}
       //Vector3 {x: 0.17204823682234968, y: -21.941742194514937, z: 12.052053002017162}
       }
       initTween(){
        new TWEEN.Tween(this.cu.camera.position)
        .to({ x: 1, y: 1.8, z: 30.7 }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function(object) {
          this.cu.camera.lookAt(new THREE.Vector3(this.x,this.y,this.z))
        })
        .start();
        this.cu.camera.position.set(-2.9,3.12, 23.3);
        // this.cu.orbitControls.maxDistance = 35;
        // let lookBolinHouse = new TWEEN.Tween(this.cu.camera.position)
        // .to({ x: -0.15, y: -19.2, z: 6.6 }, 1000)
        // .onComplete(()=>{
        //  console.log('tween 完成')
        // })
        // .easing(TWEEN.Easing.Quadratic.Out)
        // .onUpdate(function(object) {
        //   console.log('更新')
        // });;
        // lookBolin.chain(lookBolinHouse);
        // lookBolin.start();
       }
       initBolin(){
        let  hemisphereLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        hemisphereLight.position.set( 0, 0, 200 );
        hemisphereLight.layers.set(this.layer);
        this.group.add( hemisphereLight );
        var loader = new FBXLoader();
				loader.load(require('../../resources/models/bolin/bolin_3.FBX'), (object)=> {
          //new BufferGeometry().fromGeometry( geom );
          console.log(object);
          object.traverse((child)=>{this.initlayers(child)})
          object.scale.set(0.01,0.01,0.01);
          object.layers.set(this.layer);
          this.group.add( object );
          this.initTween();
        });
        this.scene.add(this.group);
       }
       initlayers(child){
         if(child.type == "Mesh"){
           child.layers.set(this.layer);
          //  let geo = new THREE.BufferGeometry().fromGeometry( child.geometry )
          //  var count = Math.floor( geo.attributes.position.count * 0.875 ); // number of vertices to remove
          //  child.geometry = modifier.modify( geo, count );
         }
       }
       getcameraPos(){
         setInterval(()=>{
          console.log(this.cu.camera.position);
          console.log(this.cu.orbitControls);
         },3000)
       }
      render(){
      }
      transformAnimate(layer){
        if(layer ==1){
          this.scene.background = new THREE.Color( 0xffffff );
          this.cu.camera.position.z = 100;
          // this.cu.camera.position.z = 50000;
        }
        this.cu.setAnimateFn((fn)=>{this.render()},layer)
      }
}
