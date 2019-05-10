
import * as THREE from 'three';
// import TGALoader from '../../common/TGALoader'

export default class Splat {
    constructor(props) {
      this.scene =props.scene;
      this.layer =4;
      this.cu = props.threeScene;
      }
      init(){
        this.initGeometry();
        this.clock = new THREE.Clock();
      }
       initGeometry() {
        this.width =this.cu.width;
        this.height =this.cu.height;
        var geometry = new THREE.PlaneBufferGeometry( 2, 2, 2 );
        var material =this.createShaderMaterial();
        var plane = new THREE.Mesh( geometry, material );
        plane.layers.set(this.layer)
        this.scene.add( plane );
       }
     
       createShaderMaterial(){
        var vertexshaderSource = `
        varying vec2 vUv;
        void main() {
        vUv = uv;
        gl_Position =  vec4( position, 1.0 );
        // gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`;
        var fragmentshaderSource = `
        #ifdef GL_ES
        precision mediump float;
        #endif
        #define PI 3.14159265359
        varying vec2 vUv;
        uniform sampler2D texture;
        uniform sampler2D texture0;
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        uniform sampler2D texture3;
        uniform float u_time;
     
        void main() {
            float y = sin(vUv.y*u_time);
            vec4 color = texture2D(texture0, vUv).rgba;
            vec4 color1 = texture2D(texture0, vUv);
            vec4 color2 = texture2D(texture0, vUv);
            vec4 color3 = texture2D(texture0, vUv);
            vec4 color4 = texture2D(texture0, vUv);

            gl_FragColor = vec4(color1 * color.r + color2 * color.g + color3 * color.b + color4 * color.a );
        }`;

        // let loader = new TGALoader();
        let loader = new THREE.TextureLoader();
        let texture = loader.load( require("../../resources/images/control.png")); //沙子
        let texture0 = loader.load( require("../../resources/images/sand.tga")); //沙子
        let texture1 = loader.load( require("../../resources/images/Bric.tga"));//石砖
        let texture2 = loader.load( require("../../resources/images/Bric_nmp.tga"));//石砖法线贴图
        let texture3 = loader.load( require("../../resources/images/soil.tga"));//土
        
        let  particleUniforms = {
                color:     { type: "c", value: new THREE.Color( 0xffffff ) },
                texture0 :{value:texture0},
                texture1 :{value:texture1},
                texture2 :{value:texture2},
                texture3 :{value:texture3},
                u_time:{value:0.0}
            }; 
        this.particleUniforms =particleUniforms;
      
        var shaderMaterial = new THREE.ShaderMaterial( {
            uniforms:       particleUniforms,
            vertexShader:   vertexshaderSource,
            fragmentShader: fragmentshaderSource,
            transparent:    true
        });
        return shaderMaterial;
      }
    render(){
      
    //   this.particleUniforms[ "offset" ].value+=0.001;
      this.particleUniforms[ "u_time" ].value += 0.02; 
    }
    transformAnimate(layer){
      if(layer ==1){
        this.scene.background = new THREE.Color( 0xffffff );
      }
      this.cu.setAnimateFn((fn)=>{this.render()},layer)
    }
}
