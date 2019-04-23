
import * as THREE from 'three';
export default class Sphere {
    constructor(props) {
      // super(props);
      this.scene =props.scene;
      this.layer =0;
      }
        init(){
          this.initRoom();
          this.initGeometry();
          // this.cu.setAnimateFn(null)
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
        var geometry = new THREE.TorusKnotBufferGeometry( 0.75, 0.3, 128, 32, 1 );
        var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.layers.set(this.layer)
        this.scene.add( mesh );
       }
     
       makeParticleMaterial(){
        var vertexshaderSource = [
          'attribute float size;',
          'attribute vec3 customColor;',
          'varying vec3 vColor;',
          'void main() {',
              'vColor = customColor;',
              'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
              'gl_PointSize = size * ( 30.0 / -mvPosition.z );',
              'gl_Position = projectionMatrix * mvPosition;',
          '}'
        ].join("\n");

        var fragmentshaderSource = [
          'uniform vec3 color;',
          'varying vec3 vColor;',
          'void main() {',
              'gl_FragColor = vec4( color * vColor, 1.0 );',
          '}'
        ].join("\n");

        var particleUniforms = {
            color:     { type: "c", value: new THREE.Color( 0xffffff ) }
        };
      
        var shaderMaterial = new THREE.ShaderMaterial( {
      
            uniforms:       particleUniforms,
            vertexShader:   vertexshaderSource,
            fragmentShader: fragmentshaderSource,
      
            blending:       THREE.AdditiveBlending,
            depthTest:      false,
            transparent:    true
      
        });
        console.log(1111111)
        return shaderMaterial;
       
      }
}
