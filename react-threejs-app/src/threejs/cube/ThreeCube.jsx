
import * as THREE from 'three';

export default class Sphere {
    constructor(props) {
      // super(props);
      this.scene =props.scene;
      this.layer =0;
      this.cu = props.threeScene;
      }
      init(){
        this.initRoom();
        this.initGeometry();
        this.clock = new THREE.Clock();
        
      }
       initRoom(){
        var materials = [];
        for ( var i = 0; i < 8; i ++ ) {
            materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, side: THREE.BackSide } ) );
        }
        var geometry = new THREE.BoxBufferGeometry( 3, 3, 3 );
        var mesh = new THREE.Mesh( geometry, materials );
        mesh.layers.set(this.layer)
        this.scene.add(mesh);               
       }
       initGeometry() {
        // var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
        // var material =this.makeParticleMaterial();
        // var mesh = new THREE.Mesh( geometry, material );
        var mesh =this.makeParticleSystem(3);
        mesh.layers.set(this.layer)
        this.scene.add( mesh );
       }
     
       makeParticleMaterial(){
        var vertexshaderSource = `
        attribute float size;
        attribute vec3 customColor;
        uniform float time;
        uniform float offset;
        uniform vec3  tagposition;
        varying vec3 vColor;
        varying float _offset;
        varying vec3 pos;
        void main() {
          vColor = customColor;
          _offset = offset;
          pos = vec3(position);
          // if(pos.x <_offset){
          //   pos.y =1.0;
          // }
          vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
          gl_Position = projectionMatrix * mvPosition;
        }`;
        var fragmentshaderSource = `
        uniform vec3 color;
        varying vec3 vColor;
        varying float _offset;
        varying vec3 pos;
        void main() {
          if(pos.x > _offset){
            gl_FragColor = vec4(1.0,1.0,1.0, 1.0 );
          }else{
            gl_FragColor = vec4( color * vColor, 1.0 );
          }
        }`;

       let  particleUniforms = {
            color:     { type: "c", value: new THREE.Color( 0xffffff ) },
            time:{value:1.0},
            offset:{value:-0.8},
            tagposition:{value:new Float32Array(0)}
        };
        this.particleUniforms =particleUniforms;
      
        var shaderMaterial = new THREE.ShaderMaterial( {
            uniforms:       particleUniforms,
            vertexShader:   vertexshaderSource,
            fragmentShader: fragmentshaderSource,
            // blending:       THREE.AdditiveBlending,
            // depthTest:      false,
            transparent:    true
        });
        return shaderMaterial;
      }
      makeParticleSystem( radius) {

        var geometry = new THREE.TorusKnotBufferGeometry( 0.75, 0.3, 128, 32, 1 );
        var counts =geometry.attributes.position.count;
        //
  
        var tagpositions = new THREE.TorusKnotBufferGeometry( 0.80, 0.3, 128, 32, 1 );

        var colors = new Float32Array( counts * 3 );
        var sizes = new Float32Array( counts );
    
        var color = new THREE.Color();
    
        for ( var i = 0, i3 = 0; i < counts/2; i ++, i3 += 3 ) {
            color.setHSL( i / counts, 1.0, 0.5 );
            colors[ i3 + 0 ] = color.r;
            colors[ i3 + 1 ] = color.g;
            colors[ i3 + 2 ] = color.b;
            sizes[ i ] = 1;
        }
        // geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
        geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
    
        var shaderMaterial = this.makeParticleMaterial();
        this.geometry =geometry;
        this.tagposition =tagpositions.attributes.position;
        this.geometry.addAttribute( 'tagposition',new THREE.BufferAttribute(this.tagposition,3));
       
        // geometry.morphAttributes.position =  this.tagposition;
        // var particleSystem = new THREE.Points( geometry, shaderMaterial );

        var mesh = new THREE.Mesh( geometry, shaderMaterial );
        return mesh;
    }
    render(){
      var delta =5 * this.clock.getDelta();
      this.particleUniforms[ "offset" ].value+=0.001;
      this.particleUniforms[ "time" ].value += 0.02 * delta;
    }
    transformAnimate(layer){
      if(layer ==1){
        this.cu.camera.position.z = 4 ;
      }
      this.cu.setAnimateFn((fn)=>{this.render()},layer)
    }
}
