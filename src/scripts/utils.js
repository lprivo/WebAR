/* global AFRAME */
AFRAME.registerComponent("hide-on-play", {
  schema: { type: "selector" },
  init: function() {
    this.onPlaying = this.onPlaying.bind(this);
    this.onPause = this.onPause.bind(this);
    this.el.object3D.visible = !this.data.playing;
  },
  play: function() {
    if (this.data) {
      this.data.addEventListener("playing", this.onPlaying);
      this.data.addEventListener("pause", this.onPause);
    }
  },
  pause: function() {
    if (this.data) {
      this.data.removeEventListener("playing", this.onPlaying);
      this.data.removeEventListener("pause", this.onPause);
    }
  },
  onPlaying: function(evt) {
    this.el.object3D.visible = false;
  },
  onPause: function(evt) {
    this.el.object3D.visible = true;
  }
});

// AFRAME.registerComponent('rotation-reader', {
//     /**
//      * We use IIFE (immediately-invoked function expression) to only allocate one
//      * vector or euler and not re-create on every tick to save memory.
//      */
//     tick: (function () {
//       var position = new THREE.Vector3();
//       var quaternion = new THREE.Quaternion();

//       return function () {
//         this.el.object3D.getWorldPosition(position);
//         this.el.object3D.getWorldQuaternion(quaternion);
//         // position and rotation now contain vector and quaternion in world space.
//       };
//     })()
//   });

AFRAME.registerComponent("rotation-reader", {
  tick: function() {
    // `this.el` is the element.
    // `object3D` is the three.js object.

    // `rotation` is a three.js Euler using radians. `quaternion` also available.
    console.log(this.el.object3D.rotation);

    // `position` is a three.js Vector3.
    console.log(this.el.object3D.position);
  }
});

AFRAME.registerComponent("triggervideobyorientation", {
  init: function() {
    // this.onClick = this.onClick.bind(this);
    // const camera = document.getElementById("camera");
    const camera = this.el;
    console.log("📮 ~ : triggervideobyorientation -> camera", this);

    const worldPos = new THREE.Vector3();
    worldPos.setFromMatrixPosition(camera.object3D.matrixWorld);
    console.log("📮 ~ : camera worldPos", worldPos);
    console.log(worldPos.x);

    camera.addEventListener("rotation", function() {
      if (video.hasAttribute("autoplay")) {
        video.removeAttribute("autoplay");
      }

      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
});

AFRAME.registerComponent("playpausevideo", {
  init: function() {
    // this.onClick = this.onClick.bind(this);
    console.log("📮 ~ : playpausevideo called");
    const video = document.getElementById("videoFireworks");
    console.log("📮 ~ : playpausevideo -> video", video);
    this.el.addEventListener("click", function() {
      if (video.hasAttribute("autoplay")) {
        video.removeAttribute("autoplay");
      }

      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
});
