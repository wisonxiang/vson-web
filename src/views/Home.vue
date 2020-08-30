<template>
    <div class="container home">
        <div class="row content">
            <p class="col-sm-12 title">满江红·小院深深 <span class="auth">作者：岳珂</span></p>
            <p class="col-sm-12">小院深深，悄镇日、阴晴无据。春未足，闺愁难寄，琴心谁与？曲径穿花寻蛱蝶，虚阑傍日教鹦鹉。笑十三杨柳女儿腰，东风舞。云外月，风前絮。情与恨，长如许。想绮窗今夜，为谁凝伫？洛浦梦回留佩客，秦楼声断吹箫侣。正黄昏时候杏花寒，廉纤雨。</p>
            <img src="@/assets/images/peitu.jpg" class="img-responsive 	col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12" alt="响应式图像">
        </div>

        <a href="https://beian.miit.gov.cn" class="row col-sm-12 icp">粤ICP备17015084号-3</a>
    </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  position: relative;
  
}
.content {
    padding-top: 50px;
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .article {
    margin-bottom: 20px;
  }
}
.icp {
  position: absolute;
  bottom: 10px;
  text-decoration: none;
  color: #333;
  font-size: 12px;
  opacity: 0.8;
}
</style>
