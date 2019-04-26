
import * as THREE from 'three';
export default class Smoking {
    constructor(props) {
      // super(props);
      this.scene =props.scene;
      this.layer =2;
      this.cu = props.threeScene;
      }
      init(){
        this.initGeometry();
        this.clock = new THREE.Clock();
      }
       initGeometry() {
        this.width =this.cu.width;
        this.height =this.cu.height;
        // var mesh =this.makeParticleSystem(3);
        // mesh.layers.set(this.layer)
        var geometry = new THREE.PlaneBufferGeometry( 2, 2, 2 );
        // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
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
        uniform vec3 color;
        varying vec2 vUv;
        uniform sampler2D texture;
        uniform float u_time;
        uniform vec3 color0;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;
        vec3 colorA = vec3(0.149,0.141,0.912);
        vec3 colorB = vec3(1.000,0.833,0.224);
   
        float plot(vec2 st, float pct){
            return  smoothstep( pct, pct, st.y) -
                    smoothstep( pct, pct, st.y);
          }
        void main() {
            float y = sin(vUv.y*u_time);
            // float pct = abs(sin(u_time));
            vec4 color1 = texture2D(texture, vUv);

            vec3 pct = vec3(y);

            pct.r = pow(vUv.y * u_time,2.0);
            pct.g = sin(vUv.x * PI + u_time);
            pct.b = atan(vUv.y * PI * u_time);
        
            vec3 color = mix(color1.rgb, color2, pct);
            // Plot transition lines for each channel
           
            color = mix(color,color3,plot(vUv,pct.r));
            color = mix(color,color4,plot(vUv,pct.g));
            color = mix(color,color0,plot(vUv,pct.b));
            // color = mix(color,color0, pct.g);

            gl_FragColor = vec4(color,color1.a);
        }`;
        let texture =new THREE.TextureLoader().load(require("../../resources/images/smoking.png"));
        let  particleUniforms = {
                color:     { type: "c", value: new THREE.Color( 0xffffff ) },
                texture :{value:texture},
                u_resolution: { type: "v2", value: new THREE.Vector2(this.width,this.height) },
                u_time:{value:0.0},
                color0:     { type: "c", value: new THREE.Color( 0x6a8fdf ) },
                color2:     { type: "c", value: new THREE.Color( 0xfbb100 ) },
                color3:     { type: "c", value: new THREE.Color( 0xeedb8b ) },
                color4:     { type: "c", value: new THREE.Color( 0xdf5b13 ) }
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
      var delta =5 * this.clock.getDelta();
    //   this.particleUniforms[ "offset" ].value+=0.001;
      this.particleUniforms[ "u_time" ].value += 0.02; 
    }
    transformAnimate(layer){
      this.cu.setAnimateFn((fn)=>{this.render()},layer)
    }
}
