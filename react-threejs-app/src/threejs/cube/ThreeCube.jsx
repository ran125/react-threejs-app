
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

}