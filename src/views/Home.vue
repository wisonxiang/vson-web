<template>
  <div class="page-wrapper">
    <div class="content">
      <p class="title">满江红·小院深深 <span class="auth">作者：岳珂</span></p>
      <p class="article">
        小院深深，悄镇日、阴晴无据。春未足，闺愁难寄，琴心谁与？曲径穿花寻蛱蝶，虚阑傍日教鹦鹉。笑十三杨柳女儿腰，东风舞。云外月，风前絮。情与恨，长如许。想绮窗今夜，为谁凝伫？洛浦梦回留佩客，秦楼声断吹箫侣。正黄昏时候杏花寒，廉纤雨。
      </p>
      <el-row type="flex" justify="center">
        <el-col :md="24" :lg="18">
          <img src="@/assets/images/peitu.jpg" class="img" />
        </el-col>
      </el-row>
    </div>

    <a href="https://beian.miit.gov.cn" class="icp">粤ICP备17015084号-3</a>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  .content {
    padding-top: 50px;
    width: 60%;
    margin-left: 20%;
    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .article {
      margin-bottom: 20px;
      line-height: 25px;
      text-align: left;
      text-indent:2em;
    }
  }
  .img {
    width: 100%;
  }
}
.icp {
  position: absolute;
  bottom: 10px;
  right: 10px;
  text-decoration: none;
  color: #333;
  font-size: 12px;
  opacity: 0.8;
}
</style>
