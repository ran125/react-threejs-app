import React, { Component } from 'react';
import * as THREE from 'three';
import orbtCtrls from 'three-orbit-controls'
import ThreeScene from '../ThreeScene/ThreeScene'

export default class Sphere extends React{
    constructor(props) {
        super(props);
        console.log(props)
      }
      //在组建输出到dom 后会执行componentdidmount() 钩子
      componentDidMount(){
      
      }
    initRoom(){
        var materials = [];
        for ( var i = 0; i < 8; i ++ ) {
            materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, side: THREE.BackSide } ) );
        }
        var geometry = new THREE.BoxBufferGeometry( 3, 3, 3 );
      
        var mesh = new THREE.Mesh( geometry, materials );
      
        this.scene.add(mesh);               
       }

    render(props){
        console.log(props)
        // //initRoom
        return(<div></div>)
      }
}