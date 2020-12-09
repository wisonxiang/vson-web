<template>
  <div class="page-wrapper">
    <div class="content">
      <p class="title">望海潮·东南形胜 <span class="auth">作者：柳永</span></p>
      <p class="article">
        东南形胜，三吴都会，钱塘自古繁华。 烟柳画桥，风帘翠幕，参差十万人家。
        云树绕堤沙，怒涛卷霜雪，天堑无涯。 市列珠玑，户盈罗绮，竞豪奢。
        重湖叠巘清嘉，有三秋桂子，十里荷花。 羌管弄晴，菱歌泛夜，嬉嬉钓叟莲娃。
        千骑拥高牙，乘醉听箫鼓，吟赏烟霞。 异日图将好景，归去凤池夸。
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
  methods: {},
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
      text-indent: 2em;
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
