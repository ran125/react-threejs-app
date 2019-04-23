
import * as THREE from 'three';
export default class Sphere {
    constructor(props) {
      // super(props);
      this.scene =props.scene;
      this.layer =1;
      this.cu = props.threeScene;
      }
      init(){
        this.group = new THREE.Group()
        // this.group.layers.set(this.layer)
        this.initParticles();
        this.initLine();
        this.cu.setAnimateFn((fn)=>{this.initAnimation()})
        // this.initSphere();
      }
      // initSphere(){
      //   var geometry = new THREE.SphereGeometry( 1, 32, 32 );
      //   var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
      //   var sphere = new THREE.Mesh( geometry, material );
      //   sphere.layers.set(this.layer)
      //   this.scene.add( sphere );
      // }

      initParticles(){
        let maxParticleCount = 1000
        this.particleCount = 500
        let r = 1
        this.rHalf = r;
        this.particlesData =[];
        let segments = maxParticleCount * maxParticleCount
        this.positions = new Float32Array(segments * 3)
        this.colors = new Float32Array(segments * 3)
       
        this.scene.add(this.group)
        var pMaterial = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 3,
          blending: THREE.AdditiveBlending,
          transparent: true,
          sizeAttenuation: false
        })
        //点
       let  particles = new THREE.BufferGeometry()

       this.particlePositions = new Float32Array(maxParticleCount * 3)

        for (var i = 0; i < maxParticleCount; i++) {
          var aa = -1;
          if (i % 2 === 0) {
            aa = 1;
          } else {
            aa = -1;
          }
          var _r = Math.random() * r;
          var a = Math.random() * Math.PI * aa;
          var b = Math.random() * Math.PI * aa;
  
          var x = _r * Math.cos(a) * Math.cos(b)
          var y = _r * Math.cos(a) * Math.sin(b)
          var z = _r * Math.sin(a)
  
          this.particlePositions[i * 3] = x
          this.particlePositions[i * 3 + 1] = y
          this.particlePositions[i * 3 + 2] = z
  
          // add it to the geometry
          this.particlesData.push({
            velocity: new THREE.Vector3(
              -1 + Math.random() * 2,
              -1 + Math.random() * 2,
              -1 + Math.random() * 2
            ),
            numConnections: 0
          })
        }

        particles.addAttribute(
          'position',
          new THREE.BufferAttribute(this.particlePositions, 3).setDynamic(true)
        )
        particles.setDrawRange(0, this.particleCount)
        // create the particle system
      this.pointCloud = new THREE.Points(particles, pMaterial)
      this.pointCloud.layers.set(this.layer)
      this.group.add(this.pointCloud)
      }

      initLine(){
      var linegeometry = new THREE.BufferGeometry()

      linegeometry.addAttribute(
        'position',
        new THREE.BufferAttribute(this.positions, 3).setDynamic(true)
      )
      linegeometry.addAttribute(
        'color',
        new THREE.BufferAttribute(this.colors, 3).setDynamic(true)
      )
      linegeometry.computeBoundingSphere()

      linegeometry.setDrawRange(0, 0)

      var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        blending: THREE.AdditiveBlending,
        transparent: true
      })

      this.linesMesh = new THREE.LineSegments(linegeometry, material)
      
      this.linesMesh.layers.set(this.layer)
      this.group.add(this.linesMesh)
      }

      initAnimation(){
      let numConnected = 0

      for (let i = 0; i < this.particleCount; i++)
      this.particlesData[i].numConnections = 0

      for (let i = 0; i < this.particleCount; i++) {
        // get the particle
        let particleData =  this.particlesData[i]

        this.particlePositions[i * 3] += particleData.velocity.x
        this.particlePositions[i * 3 + 1] += particleData.velocity.y
        this.particlePositions[i * 3 + 2] += particleData.velocity.z

        if (
          this.particlePositions[i * 3 + 1] < -this.rHalf ||
          this.particlePositions[i * 3 + 1] > this.rHalf
        )
          particleData.velocity.y = -particleData.velocity.y;

        if (
          this.particlePositions[i * 3] < -this.rHalf ||
          this.particlePositions[i * 3] > this.rHalf
        )
          particleData.velocity.x = -particleData.velocity.x

        if (
          this.particlePositions[i * 3 + 2] < -this.rHalf ||
          this.particlePositions[i * 3 + 2] > this.rHalf
        )
          particleData.velocity.z = -particleData.velocity.z

        // if (
        //   this.effectController.limitConnections &&
        //   particleData.numConnections >= this.effectController.maxConnections
        // )
          continue
      }

      this.linesMesh.geometry.setDrawRange(0, numConnected * 2)
      this.linesMesh.geometry.attributes.position.needsUpdate = true
      this.linesMesh.geometry.attributes.color.needsUpdate = true

      this.pointCloud.geometry.attributes.position.needsUpdate = true
      // this.group.rotation.y = time * 0.1
      }
}