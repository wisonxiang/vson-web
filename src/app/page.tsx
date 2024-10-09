import styles from "./page.module.scss";
import Image from "next/image";
import imgMe from '@img/me.jpeg'
import { Tag, Timeline } from 'antd'
import Link from "next/link";

export default function Home() {
  const lists = [
    { date: '2021/4--至今',company:'深圳法大大网络科技有限公司／Web 前端高级工程师',industy:'互联网 saas 平台', project: '智审系统 iTerms',content:'<div style="display:flex;flex-direction: column;text-indent:28px;line-height:28px"><span>智审系统 iTerms，是一款主要用于审查合同风险点的软件平台系统，解决了公司管理者、法务人员、财务人员管控合同风险的痛点。支持 word 文档、pdf 文档和扫描件等类型的合同审查，支持千页以上的合同审查；</span><span>针对不同场景可选用模版审查或大模型审查；在固定格式合同的场景，可使用平台提供的模版完成一份合同，然后进行模版审查，达到高准确性风险提示；在非固定格式合同场景可选用大模型审查，大模型基于公司海量合同数据进行训练，并对 prompts 深入优化，目前准确性在 80%以上。</span><span>借助 OnlyOffice 能力，对于 word 合同可同时预览、修改和审查，也可进行多人的合同在线协作审查；</span>系统也发散了其他一些相关功能，如合同起草功能，可通过系统提供的海量模版起草一份合同，且系统提供海量法律条款，方便快速生成合同条款内容；合同归档功能，对审查通过的合同进行入库管理，方便搜索调取；文本比对功能，对修改过的合同，方便查看具体做了哪些内容修改，结合公司主营电子签业务，做到了合同的全流程管理。iTerms 也是公司发展法律科技打造的一款重要产品。</span><span>鉴于系统的大模型、OCR 等能力依赖较高的硬件性能，特别是显卡 GPU 性能，使用成本高，目前主要服务于 B 端用户如顺丰、龙源、长安汽车、财信等。</span></div>' },
    { date: '2019/5--2021/4',company:'深圳市传音科技有限公司／Web 前端开发',industy:'移动互联网', project: '',content:'<div style="display:flex;flex-direction: column;text-indent:28px;line-height:28px"><span>1、开发者平台官网开发（https://dev.transsion.com），开发者用户可以通过平台将 APP 或游戏投放到传音系手机上的应用商店或游戏平台，为用户打开非洲互联网市场提供有效途径；</span><span>2、H5游戏平台，承载用户投放的H5游戏，并提供SDK为用户提供完善的管理服务；</span><span>3、生活充值服务，是一款提供给移动端用户话费、流量、电视费等生活缴费的 H5 应用，目前支持了尼日利亚、加纳、肯尼亚三个国家服务，通过 ga 上统计到日活在 5000 以上，日订单量在 100 以上。</span></div>'},
    { date: '2015/9--2019/4',company:'千寻万物(深圳)科技有限公司／Web 前端开发',industy:'移动互联网', project: '',content:'<div style="display:flex;flex-direction: column;text-indent:28px;line-height:28px"><span>1、“千寻万物官网&运营管理平台”，是公司新媒体电商项目的支撑系统，主要提供在不同渠道如抖音、快手、火山等上面的运营各项数据展示和趋势分析，包括实时的 GMV、浏览数、粉丝数、订单数等统计和日表、周表及月表的统计分析。同事也对在销商品的库存不足和推迟发货商品的监控警报</span><span>2、微信小程序“魔性点点点”，是一款健康的益智类游戏程序，主要面向青少年儿童，里面集合了多款有趣且创意的小游戏，可单机玩也可与朋友在线对战，可以充分达到在好玩中又开发了智力；</span><span>该项目前端基于 WEPY 框架，使用 ES6 规范进行开发；运用 socket.io 进行对战功能通讯，在项目中主要负责部分小游戏和功能页面开发。</span></div>'},
    { date: '2012/8--2015/8',company:'微创软件股份公司 驻腾讯 SNG 项目组 / 软件测试',industy:'移动互联网', project: '',content:'<div style="display:flex;flex-direction: column;text-indent:28px;line-height:28px"><span>“兴趣部落”是腾讯手机 QQ 推出的基于兴趣的公开主题社区，并与拥有共同兴趣标签的 QQ 群实现了打通和关联，形成以兴趣聚合的社区生态系统。</span><span>在项目中主要负责 UI 自动化测试，用到 python 脚本和 selenium 框架；接口自动化测试,用到 jmeter 等相关工具和技术；压力测试，用到 loadRunner monkey 等技术和工具。</span></div>'},
  ]

  // function handleGithub(){
  //   window.open('https://github.com/wisonxiang')
  // }

  return <div className={styles['page-wrap']}>
    <section className={styles['page-top']}>
      <Image src={imgMe} className={styles['me-img']} alt="my avatar" />
      <div className={styles['me-intro']}>
        <span style={{ 'fontSize': '24px' }}>向文城</span>
        <span>男 | 现居深圳宝安</span>
        <span>9年web前端开发经验</span>
        <span>16620816068</span>
        <span>E-mail：vson@vson.top</span>
      </div>
      {/* <i className={['iconfont','icon-github-fill', styles['github']].join(' ')} onClick={handleGithub}></i> */}
      <Link rel="stylesheet" href="https://github.com/wisonxiang" target="_blank" className={['iconfont','icon-github-fill', styles['github']].join(' ')} />
    </section>
    <section className={[styles['page-top'], styles['page-educate']].join(' ')}>
      <Tag color="green">教育背景</Tag>
      <div style={{ marginTop: '16px' }} className={styles['me-educate']}>
        <span>西南民族大学（2008年9月 - 2012年7月）</span>
        <span>全日制统招本科（一本）</span>
        <span>自动化（专业）</span>
        <span>英语4级</span>
      </div>
    </section>
    <section className={[styles['page-top'], styles['page-educate']].join(' ')}>
      <Tag color="cyan">技能专长</Tag>
      <div style={{ marginTop: '16px' }} className={styles['me-intro']}>
        <span>1、精通 javascript、html、css ，熟悉 typescript</span>
        <span>2、精通 vue2、vue3 框架，熟悉 react</span>
        <span>3、熟悉 element ui、antd 等 UI 组件库</span>
        <span>4、熟悉 node.js 及 webpack、vite、rollup、gulp 等前端工程化打包工具</span>
        <span>5、熟悉 koa，了解linux系统</span>
        <span>6、了解 webRTC、socket.io、three.js 等前端技术</span>
      </div>
    </section>
    <section className={[styles['page-top'], styles['page-educate']].join(' ')}>
      <Tag color="blue">项目经验</Tag>
      <div style={{height:'24px'}}></div>
      <Timeline
        items={
          lists.map(item => ({ children: <CardBox intro={item} /> }))
        }
      />
    </section>
  </div>
}

type PropsType={
  date:string,
  company: string,
  industy: string,
  project: string,
  content: string,
}
function CardBox(props: { intro: PropsType }) {
  const { intro } = props
  return <div className={styles['card']}>
    <span className={styles['card-title']} >{intro.date}</span>
    <span className={styles['card-title']} >{intro.company}</span>
    <span>
      <span className={styles['card-title']} >所属行业： </span>
      <span>{intro.industy}</span>
    </span>
    <span>
      <span className={styles['card-title']} >项目经验： </span>
      <span dangerouslySetInnerHTML={{__html: intro.content}}></span>
    </span>
  </div>
}
