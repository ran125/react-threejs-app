
import * as THREE from 'three';
// import FBXLoader from '../../common/FBXLoader';
import  FBXLoader from 'three-fbxloader-offical';
import SimplifyModifier from '../../common/modifiers/SimplifyModifier';
import LineGeometry from '../../common/lines/LineGeometry'
import Line2 from '../../common/lines/Line2'
import LineMaterial from '../../common/lines/LineMaterial'
const TWEEN = require('@tweenjs/tween.js');
const modifier = new SimplifyModifier();
let _this =null;
export default class Earth {
    constructor(props) {
      // super(props);
      this.scene =props.scene;
      this.layer =3;
      this.cu = props.threeScene;
      this.progress = 0;
      _this = this;
      this.start =new THREE.Vector3();
      this.end =new THREE.Vector3();
      this.count =0;
      this.positions =[];
      this.colors =[];
      this.lineY =0.3;
      }
      init(){
        this.initEarth();
        // this.initBolin();
        this.clock = new THREE.Clock();
        // this.addSphere(new THREE.Vector3(0,0,0))
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
          mesh.name='earth';
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
       //Vector3 {x: 0.17204823682234968, y: -21.941742194514937, z:12.052053002017162}
       }
       initTween(){
        // new TWEEN.Tween(this.cu.camera.position)
        // .to({ x: 1, y: 1.8, z: 30.7 }, 1000)
        // .easing(TWEEN.Easing.Quadratic.Out)
        // .onUpdate(function(object) {
        //   this.cu.camera.lookAt(new THREE.Vector3(this.x,this.y,this.z))
        // })
        // .start();
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
        hemisphereLight.position.set( 0, 200, 0 );
        hemisphereLight.layers.set(this.layer);
        this.group.add( hemisphereLight );
        var loader = new FBXLoader();
				loader.load(require('../../resources/models/bolin/bolin_3.FBX'), (object)=> {
          object.name ='bolin';
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
         },3000)
       }
      render(){
      }
      //点击事件
      distanceMeasure(obj){
        _this.addSphere(obj.point);
        _this.positions.push(obj.point.x,_this.lineY,obj.point.z);
        _this.colors.push(1.0,1.0,1.0);
        if(_this.count % 2 ==0){
         _this.start = obj.point;//世界坐标下的点
       }else{
         _this.end =obj.point;
         _this.drawLine(_this.start,_this.end);
       }
      _this.count++;
      }
      drawLine(){
        var geometry = new LineGeometry();
        let le =_this.positions.length;
        let linepos =_this.positions.slice(le-6,le)
        let color =_this.colors.slice(le-6,le)
        geometry.setPositions(linepos );
        geometry.setColors(color );
        // geometry.vertices.push(start );
        // geometry.vertices.push(end );
        // geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        var material = new LineMaterial( {
          color: 0xff0000,
					linewidth: 0.008, // in pixels
					vertexColors: THREE.VertexColors
        } );
        var line = new Line2( geometry, material );
        // line.computeLineDistances();
        line.layers.set(_this.layer);
        this.scene.add( line );

        let tex =this.makecanvas();
        var materialC = new THREE.SpriteMaterial( { map: tex, color: 0xffffff, fog: true } );
        var sprite = new THREE.Sprite( materialC );
        sprite.position.set(_this.positions[le-2], _this.positions[le-1], _this.positions[le] );
        sprite.position.normalize();
        sprite.layers.set(_this.layer);
        this.scene.add( sprite );
        // sprite.position.multiplyScalar( radius );
      }
      addSphere(pos){
        let sphere =new THREE.SphereGeometry(0.3,32,32);
        let material = new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff} );
        let mesh =new THREE.Mesh( sphere, material );
        mesh.position.copy(pos);
        mesh.position.y =_this.lineY;
        mesh.layers.set(_this.layer);
        mesh.name ='redsphere';
        _this.group.add(mesh);
      }
      makecanvas(){
				let canvas = document.createElement( 'canvas' );
				canvas.width = 128;
				canvas.height = 128;

				var context = canvas.getContext( '2d' );
				var gradient = context.createRadialGradient(
					canvas.width / 2,
					canvas.height / 2,
					0,
					canvas.width / 2,
					canvas.height / 2,
					canvas.width / 2
				);
				gradient.addColorStop( 0.1, 'rgba(210,210,210,1)' );
				gradient.addColorStop( 1, 'rgba(255,255,255,1)' );

				context.fillStyle = gradient;
				context.fillRect( 0, 0, canvas.width, canvas.height );

        var texture = new THREE.CanvasTexture( canvas );

        return texture;
      }
      transformAnimate(layer){
        if(layer ==1){
          this.scene.background = new THREE.Color( 0xffffff );
          this.cu.camera.position.z = 100;
          this.initBolin();
          // this.cu.camera.position.z = 50000;
        }
        this.cu.setAnimateFn((fn)=>{this.render()},layer)
      }
}
