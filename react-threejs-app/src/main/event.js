const THREE = global.THREE;
const mouse = new THREE.Vector2();
export default class Event {
    constructor(props) {
        this.state ={}
        this.camera =props.threeScene.camera;
        this.scene =props.threeScene.scene;
        this.width =props.threeScene.width;
        this.height =props.threeScene.height;
        this.canvas =document.getElementById('webgl');
        this.raycaster  =new THREE.Raycaster();
        this.init();
        this.callback =props.callback;
      }
      //事件注册
      init(){ 
          this.initTouch();
          this.initMouse();
          this.initRay();
      }
      //初始化射线
      initRay(){
      //    raycaster.setFromCamera(mouse, this.camera);
      //     //    //计算射线相机到的对象，可能有多个对象，因此返回的是一个数组，按离相机远近排列
      //    let   intersectscube = raycaster.intersectObjects(this.scene, true);
      }
      //事件处理
      processing(){
      //  return callback 
      }
      //touch 事件注册
      initTouch(){
        this.canvas.addEventListener(
            'touchstart',
            (e)=>{this.onTouchstart(e)},
            false
        );
        this.canvas.addEventListener(
            'touchmove',
            (e)=>{this.onTouchmove(e)},
            false
        );
        this.canvas.addEventListener(
            'touchend',
            (e)=>{this.onTouchend(e)},
            false
        );
      }
      // mouse 事件注册
      initMouse(){
        // cubecontainer.addEventListener(
        //     'mousedown',
        //     onDocumentMousedowncube,
        //     false
        // );
        // cubecontainer.addEventListener(
        //     'mousemove',
        //     onDocumentMousemovecube,
        //     false
        // );
        // cubecontainer.addEventListener(
        //     'mouseup',
        //     onDocumentMouseupcube,
        //     false
        // );
      }
      onTouchstart(event){ 
        event.preventDefault();
        mouse.x = event.touches[0].clientX / this.width * 2 - 1;
        mouse.y = -(event.touches[0].clientY /this.height) * 2 + 1;
        this.raycaster.setFromCamera(mouse,this.camera);
        // //计算射线相机到的对象，可能有多个对象，因此返回的是一个数组，按离相机远近排列
        let  intersects = this.raycaster.intersectObjects(this.scene.children, true);
        if(intersects.length > 0){
            this.callback(intersects[0])
        }else{
          console.log('没有拾取到物体')
        }
      }
      onTouchmove(event) {
            // endX = event.touches[0].pageX,
            //     endY = event.touches[0].pageY;
            // goMove = true;
        }
        
        onTouchend() {
            //判断滑动方向
            // distanceX = endX - startX;
            // distanceY = endY - startY;
            // distanceX = parseInt(distanceX);
            // distanceY = parseInt(distanceY);
            // if ((Math.abs(distanceX) > 5 || Math.abs(distanceY) > 5) && goMove) {} else {
            //     if (intersectscube.length > 0) {
            //         if (intersectscube[0].object.name) {
            //             changeMaterial(intersectscube[0].object.name);
            //         } else if (
            //             intersectscube[1] &&
            //             intersectscube[1].object &&
            //             intersectscube[1].object.name
            //         ) {
            //             changeMaterial(intersectscube[1].object.name);
            //         }
            //     }
            // }
            // goMove = false;
        
        }
}