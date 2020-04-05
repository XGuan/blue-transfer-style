<template>
  <!-- <div class="camera"> -->
  <div class="camera">
    <div class="center-align">
      <div class="row">
        <video autoplay></video>
      </div>
      <div class="row">
        <a class="btn-floating btn-large waves-effect waves-light" @click="$emit('takePicture')">
          <i class="large material-icons">camera_alt</i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "camera",
  methods: {
    init() {
      if (
        "mediaDevices" in navigator &&
        "getUserMedia" in navigator.mediaDevices
      ) {
        let constraints = {
          video: {
            width: {
              min: 640 / 4,
              ideal: 1280 / 4,
              max: 1920 / 4
            },
            height: {
              min: 360 / 4,
              ideal: 720 / 4,
              max: 1080 / 4
            }
          }
        };
        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
          const videoPlayer = document.querySelector("video");
          videoPlayer.srcObject = stream;
          videoPlayer.play();
        });
      } else {
        alert("Cannot get media Devices");
      }
    }
  },
  beforeMount() {
    this.init();
  }
};
</script>
