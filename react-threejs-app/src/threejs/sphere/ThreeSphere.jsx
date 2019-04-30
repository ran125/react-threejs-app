
import * as THREE from 'three';
export default class Sphere {
    constructor(props) {
      // super(props);
      this.scene =props.scene;
      this.layer =1;
      this.cu = props.threeScene;

      this.maxParticleCount = 300
      this.particleCount = 150
      this.r = 100
      this.rHalf = this.r/2;
      this.particlesData =[];
      this.segments = this.maxParticleCount * this.maxParticleCount
      this.positions = new Float32Array(this.segments * 3)
      this.colors = new Float32Array(this.segments * 3)
      this.effectController = {
        showDots: true,
        showLines: true,
        minDistance: 150,
        limitConnections: false,
        maxConnections: 20,
        particleCount: 500
      }
      }

      init(){
        this.group = new THREE.Group()
        // this.group.layers.set(this.layer)
        this.initParticles();
        this.initLine();
       
        this.initSphere();
      }
      initSphere(){
        var material = new THREE.MeshBasicMaterial({
          color: '#2051a0',
          // color:'#292929',
          wireframe: true
        })
        var helper = new THREE.Mesh(
          new THREE.SphereBufferGeometry(this.r, 18, 18),
          material
        )
        helper.name ='helper';
        helper.layers.set(this.layer)
        this.group.add(helper)
        // this.scene.add( sphere );
      }

      initParticles(){
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

       this.particlePositions = new Float32Array(this.maxParticleCount * 3)
       for (var i = 0; i < this.maxParticleCount; i++) {
        var _r = Math.random() * this.r - this.r / 2;
        var a = Math.random() * Math.PI * 2
        var b = Math.random() * Math.PI

        var x = _r * Math.sin(a) * Math.cos(b)
        var y = _r * Math.sin(a) * Math.sin(b)
        var z = _r * Math.cos(a)

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
      this.pointCloud.name ='pointCloud';
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
      let vertexpos = 0
      let colorpos = 0
      let numConnected = 0
      for (let i = 0; i < this.particleCount; i++)
      this.particlesData[i].numConnections = 0

      for (var i = 0; i < this.particleCount; i++) {
        // get the particle
        let particleData =  this.particlesData[i]
        this.particlePositions[i * 3] += particleData.velocity.x
        this.particlePositions[i * 3 + 1] += particleData.velocity.y
        this.particlePositions[i * 3 + 2] += particleData.velocity.z

        // if (
        //   this.particlePositions[i * 3 + 1] < -this.rHalf ||
        //   this.particlePositions[i * 3 + 1] > this.rHalf
        // )
        //   particleData.velocity.y = -particleData.velocity.y;

        // if (
        //   this.particlePositions[i * 3] < -this.rHalf ||
        //   this.particlePositions[i * 3] > this.rHalf
        // )
        //   particleData.velocity.x = -particleData.velocity.x

        // if (
        //   this.particlePositions[i * 3 + 2] < -this.rHalf ||
        //   this.particlePositions[i * 3 + 2] > this.rHalf
        // )
        //   particleData.velocity.z = -particleData.velocity.z

        if (this.particlePositions[i * 3 + 1] * this.particlePositions[i * 3 + 1] + this.particlePositions[i * 3] * this.particlePositions[
          i *
          3] + this.particlePositions[i * 3 + 2] * this.particlePositions[i * 3 + 2] >= this.r * this.r) {
        particleData.velocity.y = -particleData.velocity.y;
        particleData.velocity.x = -particleData.velocity.x;
        particleData.velocity.z = -particleData.velocity.z;
      }

        if (
          this.effectController.limitConnections &&
          particleData.numConnections >= this.effectController.maxConnections
        )
          continue
           // Check collision
           for (let j = i + 1; j < this.particleCount; j++) {
            this.particleDataB = this.particlesData[j]
            if (
              this.effectController.limitConnections &&
              this.particleDataB.numConnections >= this.effectController.maxConnections
            )
              continue
            var dx =  this.particlePositions[i * 3] -  this.particlePositions[j * 3]
            var dy =  this.particlePositions[i * 3 + 1] -  this.particlePositions[j * 3 + 1]
            var dz =  this.particlePositions[i * 3 + 2] -  this.particlePositions[j * 3 + 2]
            var dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

            if (dist < this.effectController.minDistance) {
              particleData.numConnections++
              this.particleDataB.numConnections++

              var alpha = 1.0 - dist / this.effectController.minDistance

              this.positions[vertexpos++] =  this.particlePositions[i * 3]
              this.positions[vertexpos++] =  this.particlePositions[i * 3 + 1]
              this.positions[vertexpos++] =  this.particlePositions[i * 3 + 2]

              this.positions[vertexpos++] =  this.particlePositions[j * 3]
              this.positions[vertexpos++] =  this.particlePositions[j * 3 + 1]
              this.positions[vertexpos++] =  this.particlePositions[j * 3 + 2]

              this.colors[colorpos++] = alpha
              this.colors[colorpos++] = alpha
              this.colors[colorpos++] = alpha

              this.colors[colorpos++] = alpha
              this.colors[colorpos++] = alpha
              this.colors[colorpos++] = alpha

              numConnected++
            }
          }
      }

      this.linesMesh.geometry.setDrawRange(0, numConnected * 2)
      this.linesMesh.geometry.attributes.position.needsUpdate = true
      this.linesMesh.geometry.attributes.color.needsUpdate = true

      this.pointCloud.geometry.attributes.position.needsUpdate = true
      this.group.rotation.y += 0.01
      }

      transformAnimate(layer){
        if(layer ==1){
          this.cu.camera.position.z = 300 ;
          this.scene.background = new THREE.Color( 0x000000 );
        }
        this.cu.setAnimateFn((fn)=>{this.initAnimation()},layer)
      }
}