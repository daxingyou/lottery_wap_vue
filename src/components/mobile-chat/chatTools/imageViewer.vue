<template>
  <div id="imageViewer" ref="imageViewer">
    <div id="overlayHotspot" ref="overlayHotspot" v-on:click="viewImageDeactivate" v-show="activateClose"></div>
    <!-- <img v-if="imageViewerActive" v-for="(value, index) in imageList" v-bind:key="index" v-bind:id="`image${index}`" v-bind:class="{image: true, active: (index == activeImageId)}" v-bind:src="value.url" v-on:load="imageLoad" alt="" /> -->
    <div v-if="imageViewerActive" v-for="(value, index) in imageList" v-bind:key="index" v-bind:id="`image${index}`" v-bind:class="{image: true, active: (index == activeImageId)}" v-bind:style="{'background-image': `url('${value.url}')`}" v-on:click="viewImageDeactivate" v-show="activateClose"></div>
  </div>
</template>

<script>
  import eventBus from '@/assets/js/event-bus';

  export default {
    name: 'imageViewer',
    props: [
      'imageViewerActive',
      'imageList'
    ],
    data() {
      return {
        activateClose: false,
        activeImageId: 0,
        firstTouchClientX: 0,
        firstTouchClientY: 0
      }
    },
    methods: {
      initiate() {
        this.events();
        this.imageLoad();
      },
      events() {
        eventBus.$on('imageViewer:activate', (index) => {
          this.activeImageId = index;
          setTimeout(() => {
            this.activateClose = true;
          }, 50);
        });

        this.$refs.imageViewer.ontouchstart = this.swipeMethod;
        this.$refs.imageViewer.ontouchmove = this.swipeMethod;
        this.$refs.imageViewer.ontouchend = this.swipeMethod;
      },
      viewImageDeactivate() {
        eventBus.$emit('imageViewer:deactivate');
        this.activateClose = false;
      },
      imageLoad(event) {
        // console.log(event);
      },
      swipeMethod(event) {
        // console.log(event);

        var touchClientX = event.changedTouches[0].clientX,
            touchClientY = event.changedTouches[0].clientY;

        // Record The First X & Y Coordinate
        if (event.type == 'touchstart') {
          this.firstTouchClientX = touchClientX;
          this.firstTouchClientY = touchClientY;
        }

        // console.log('First Touch Client X:', this.firstTouchClientX, 'First Touch Client Y:', this.firstTouchClientY);
        // console.log('Touch Client X:', touchClientX, 'Touch Client Y:', touchClientY);

        if (event.type == 'touchend') {
          if (this.firstTouchClientY < touchClientY) {
            // console.log('Swipe From Top.');
          }

          if (this.firstTouchClientX < touchClientX) {
            console.log('Swipe From Left.');

            if (this.activeImageId <= 0) {
              this.activeImageId = (this.imageList.length - 1);
            } else {
              this.activeImageId--;
            }
          }

          if (this.firstTouchClientY > touchClientY) {
            // console.log('Swipe From Bottom.');
          }

          if (this.firstTouchClientX > touchClientX) {
            console.log('Swipe From Right.');

            if (this.activeImageId >= (this.imageList.length - 1)) {
              this.activeImageId = 0;
            } else {
              this.activeImageId++;
            }
          }
        }
      }
    },
    mounted() {
      this.initiate();
    },
    beforeDestroy() {
      eventBus.$off('imageViewer:activate');
      eventBus.$off('chat:reset');
    }
  }
</script>

<style lang="scss" scoped>
  #imageViewer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;

    #overlayHotspot {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
    }

    .image {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 85%;
      height: 90%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      display: none;

      &.active {
        display: block;
      }
    }
  }
</style>