
import * as THREE from 'three';
export default class Sphere {
    constructor(props) {
      // super(props);
      this.scene =props.scene;
      }
      init(){
        let  group = new THREE.Group()
        initParticles();
        initLine();

      }
      initParticles(){
        let maxParticleCount = 1000
        let particleCount = 500
        let r = 500
        let rHalf = r;
        let particlesData =[];
        let segments = maxParticleCount * maxParticleCount
        let positions = new Float32Array(segments * 3)
        let colors = new Float32Array(segments * 3)
       
        scene.add(group)
        var pMaterial = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 3,
          blending: THREE.AdditiveBlending,
          transparent: true,
          sizeAttenuation: false
        })
        //点
       let  particles = new THREE.BufferGeometry()

       let particlePositions = new Float32Array(maxParticleCount * 3)

        for (var i = 0; i < maxParticleCount; i++) {
          var aa = -1;
          if (i % 2 == 0) {
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
  
          particlePositions[i * 3] = x
          particlePositions[i * 3 + 1] = y
          particlePositions[i * 3 + 2] = z
  
          // add it to the geometry
          particlesData.push({
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
          new THREE.BufferAttribute(particlePositions, 3).setDynamic(true)
        )
        particles.setDrawRange(0, particleCount)
        // create the particle system
      let  pointCloud = new THREE.Points(particles, pMaterial)
        group.add(pointCloud)
      }

      initLine(){
      var linegeometry = new THREE.BufferGeometry()

      linegeometry.addAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3).setDynamic(true)
      )
      linegeometry.addAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3).setDynamic(true)
      )
      linegeometry.computeBoundingSphere()

      linegeometry.setDrawRange(0, 0)

      var material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        blending: THREE.AdditiveBlending,
        transparent: true
      })

      linesMesh = new THREE.LineSegments(linegeometry, material)
      group.add(linesMesh)
      }

      initAnimation(){
      let numConnected = 0

      for (let i = 0; i < particleCount; i++)
        particlesData[i].numConnections = 0

      for (let i = 0; i < particleCount; i++) {
        // get the particle
        let particleData = particlesData[i]

        particlePositions[i * 3] += particleData.velocity.x
        particlePositions[i * 3 + 1] += particleData.velocity.y
        particlePositions[i * 3 + 2] += particleData.velocity.z

        if (
          particlePositions[i * 3 + 1] < -rHalf ||
          particlePositions[i * 3 + 1] > rHalf
        )
          particleData.velocity.y = -particleData.velocity.y;

        if (
          particlePositions[i * 3] < -rHalf ||
          particlePositions[i * 3] > rHalf
        )
          particleData.velocity.x = -particleData.velocity.x

        if (
          particlePositions[i * 3 + 2] < -rHalf ||
          particlePositions[i * 3 + 2] > rHalf
        )
          particleData.velocity.z = -particleData.velocity.z

        if (
          effectController.limitConnections &&
          particleData.numConnections >= effectController.maxConnections
        )
          continue
      }

      linesMesh.geometry.setDrawRange(0, numConnected * 2)
      linesMesh.geometry.attributes.position.needsUpdate = true
      linesMesh.geometry.attributes.color.needsUpdate = true

      pointCloud.geometry.attributes.position.needsUpdate = true

      group.rotation.y = time * 0.1
      }

      
}