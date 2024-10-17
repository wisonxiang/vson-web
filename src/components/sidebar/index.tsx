'use client';
import useMobile from '@/hooks/useMobile';
import { Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { useRouter,usePathname } from 'next/navigation';

export default function Sidebar() {
  const menus = [{ label: "首页", icon: 'icon-shouye', color: '#0891b2', path: '/' }, { label: "AI聊天", icon: 'icon-duihua', color: '#22c55e', path: '/aichat' }, { label: "在线文档", icon: 'icon-word', color: '#0891b2', path: '/word' },{ label: "娱乐互动", icon: 'icon-hudong', color: '#f87171', path: '/webrtc' }, { label: "3D效果", icon: 'icon-3D', color: '#eab308', path: '/three' }, { label: "管理", icon: 'icon-shezhi', color: '#4ade80', path: 'https://www.baidu.com',link:true }]

  const pathname = usePathname()
  const index = menus.findIndex(item=>item.path === pathname)
  const [activeidx, setActiveIdx] = useState(index)
  const router = useRouter()


  const isMobile = useMobile()

  function handleChange(idx: number) {
    if (idx === activeidx) return
    if(menus[idx].link){
      return window.open(menus[idx].path)
    }
    setActiveIdx(idx)
    router.push(menus[idx].path)
  }

  return <aside className={styles.sidebar}>


    <section className={styles.menus}>
      {menus.map((item, idx) => <nav key={idx} onClick={() => handleChange(idx)} className={[styles['menus-item'], activeidx === idx ? styles['menus-item-active'] : ''].join(' ')}>
        <Tooltip placement="right" title={item.label} open={isMobile ? undefined : false}><i className={['iconfont', styles['menus-icon'], item.icon].join(' ')} style={{ 'color': item.color }}></i></Tooltip><span className={styles['menus-text']}>{item.label}</span></nav>)}
    </section>
  </aside>
}