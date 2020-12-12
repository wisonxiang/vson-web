<template>
  <div class="page-wrapper">
    <div class="wrapper" @click="play">
      <div class="pai A">
        <img src="@/assets/images/front.png" alt="" />
      </div>
      <div class="pai B">
        <div class="name">{{ name }}</div>
        <img src="@/assets/images/back.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  name: "Song",
  data() {
    return {
      frontAnime: null,
      backAnime: null,
      ready: true,
      name: "",
      nameList: [
        "张以琛",
        "车宇轩",
        "陈和康",
        "陈泓臻",
        "陈晋",
        "陈可儿",
        "陈希僖",
        "程光华",
        "郭雨豪",
        "洪梓乔",
        "侯一宁",
        "胡乔梓",
        "黄开启",
        "江玉麒",
        "孔雨萱",
        "李晨",
        "李睿儿",
        "李依陈",
        "林文博",
        "林文欣",
        "刘溢恭",
        "刘祉彤",
        "陆婉芸",
        "罗敏之",
        "罗宇桐",
        "裴崇一",
        "彭相宁",
        "王麒桦",
        "王禹",
        "吴斯宇",
        "肖瑞娜",
        "徐榆烽",
        "尤俊之",
        "余泓成",
        "张佳轩",
        "赵韵涵",
        "钟靖瑶",
        "钟可欣",
      ],
    };
  },
  methods: {
    play() {
      if (this.ready) {
        this.setName();
        this.frontAnime.play();
      } else {
        this.backAnime.play();
      }
    },
    setName() {
      let len = this.nameList.length;
      let idx = Math.floor(Math.random() * len);
      this.name = this.nameList[idx];
    },
  },
  mounted() {
    let that = this;
    this.frontAnime = anime
      .timeline({
        targets: ".wrapper",
        loop: false,
        autoplay: false,
        complete: function(anim) {
          that.ready = !that.ready;
        },
      })
      .add({
        duration: 2000,
        rotate: "1turn",
      })
      .add({
        duration: 600,
        rotateY: "180deg",
      });
    this.backAnime = anime
      .timeline({
        targets: ".wrapper",
        loop: false,
        autoplay: false,
        complete: function(anim) {
          that.ready = !that.ready;
        },
      })
      .add({
        duration: 1000,
        rotateY: "90deg",
      })
      .add({
        duration: 300,
        rotateY: "0deg",
      });
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eedc82;
}
.wrapper {
  width: 80vh;
  height: 80vh;
  transform-style: preserve-3d;

  .pai {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;

    img {
      width: 100%;
    }
  }
  .A {
    z-index: 2;
  }

  .B {
    transform: rotateY(180deg);
    .name {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 80vh;
      font-size: 7rem;
      font-weight: bold;
    }
  }
}
</style>
