<template>
  <div id="app">
    <Header />
    <div class="row camera-grid">
      <div class="col s4">
        <p class="center-align">
          <b>Take a Profile of you</b>
        </p>
        <Camera v-on:takePicture="takePicture()" />
      </div>

      <div class="col s4">
        <div align="center" class="row add-top-margin">
          <div class="col s12">
            <img class="style-type-img" src="../img/mosaic.jpg" />
            <img class="style-type-img column-margin" src="../img/candy.jpg" />
          </div>
          <div class="col s6">
            <p>mosaic</p>
          </div>
          <div class="col s6">
            <p>candy</p>
          </div>
        </div>
        <div align="center" class="row">
          <div class="col s12">
            <img class="style-type-img" src="../img/rain_princess.jpg" />
            <img class="style-type-img column-margin" src="../img/udnie.jpg" />
          </div>
          <div class="col s6">
            <p align="center">rain princess</p>
          </div>
          <div class="col s6">
            <p align="center">udnie</p>
          </div>
        </div>

        <p class="center-align">
          <b>Please select the style you want</b>
        </p>

        <div class="input-field col s12">
          <select v-model="selected_style" class="browser-default" style="display:block">
            <option v-for="style in style_types" :key="style" :value="style" v-text="style"></option>
          </select>
        </div>

        <div class="center-align">
          <button class="btn waves-effect waves-light" v-on:click="transformImage">
            Transform
            <i class="material-icons right">account_box</i>
          </button>
        </div>
      </div>

      <div class="col s4">
        <p class="center-align">
          <b>Your profile shows here</b>
        </p>
        <canvas id="canvas-captured-profile"></canvas>
        <p class="center-align">
          <b>Stylish</b>
        </p>
        <canvas id="canvas-styled-profile"></canvas>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Camera from "./components/Camera";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";

// axios.defaults.baseURL = "https://blue-style-transfer.mybluemix.net/";

axios.defaults.baseURL = "http://localhost:3000/";

export default {
  name: "App",
  components: {
    Camera,
    Header,
    Footer
  },

  data() {
    return {
      selectedFile: null,
      image: null,
      image_2: null,
      transfer_image: null,
      context: null,
      formData: null,
      returned_image: null,
      img_name: "candy",
      style_types: ["mosaic", "candy", "rain_princess", "udnie"],
      selected_style: "mosaic",
      selected: ""
    };
  },

  methods: {
    testBackendApi() {
      axios.get("/model/meta").then(res => {
        console.log(res);
      });
    },

    test() {
      alert("yes");
    },

    async transformImage() {
      await this.onUpload();
      this.setCanvas();
    },

    onUpload() {
      return axios
        .post("/model/predict", {
          data: this.image,
          styleType: this.selected_style
        })
        .then(res => {
          console.log("receive response base64");
          this.returned_image = "data:image/png;base64," + res.data;
        })
        .catch(ex => {
          console.error(ex);
        });
    },

    takePicture() {
      const captured_profile = document.getElementById(
        "canvas-captured-profile"
      );
      const ctx = captured_profile.getContext("2d");
      captured_profile.width = 1280 / 4;
      captured_profile.height = 720 / 4;
      ctx.drawImage(
        document.querySelector("video"),
        0,
        0,
        captured_profile.width,
        captured_profile.height
      );

      this.context = ctx;
      var dataURL = captured_profile.toDataURL("image/png", 0.5);
      this.image = dataURL.split(",")[1];
    },

    setCanvas() {
      var styled_profile = document.getElementById("canvas-styled-profile");
      styled_profile.width = 1280 / 4;
      styled_profile.height = 720 / 4;
      var ctx = styled_profile.getContext("2d");
      var image = new Image();
      image.src = this.returned_image;
      image.onload = function() {
        ctx.drawImage(image, 0, 0, styled_profile.width, styled_profile.height);
      };
    }
  }
};
</script>

<style>
#canvas-captured-profile {
  display: block;
  margin: 0 auto;
}

#canvas-styled-profile {
  display: block;
  margin: 0 auto;
}

.add-top-margin {
  margin-top: 5%;
}

.style-type-img {
  width: 35%;
  margin: 0.1% auto;
  border: 2px solid black;
}

.column-margin {
  margin-left: 5%;
}
</style>
