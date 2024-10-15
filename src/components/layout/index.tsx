'use client';
import Sidebar from '@/components/sidebar'
import styles from './index.module.scss'
import { ConfigProvider, theme } from 'antd'
import { useState } from 'react';
import zhCN from 'antd/locale/zh_CN';
// for date-picker i18n
import 'dayjs/locale/zh-cn';


const { defaultAlgorithm, darkAlgorithm } = theme

export default function Layout(props: { children: React.ReactNode }) {
  const [isDay, setDay] = useState(true)

  function handleSwitchDay(e: any) {
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        document.documentElement.classList.toggle('dark');
        document.documentElement.setAttribute('data-prefers-color-scheme', isDay ? 'dark' : 'light');
        setDay(!isDay)
      });
      transition.ready.then(() => {
        const { clientX, clientY } = e;
        const radius = Math.hypot(Math.max(clientX, innerWidth - clientX), Math.max(clientY, innerHeight - clientY));
        document.documentElement.animate(
          {
            clipPath: [`circle(0% at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`],
          },
          {
            duration: 600,
            pseudoElement: '::view-transition-new(root)',
          },
        );
      });
    } else {
      document.documentElement.classList.toggle('dark');
      document.documentElement.setAttribute('data-prefers-color-scheme', isDay ? 'dark' : 'light');
      setDay(!isDay)
    }
  }
  return <ConfigProvider theme={{ algorithm: isDay ? defaultAlgorithm : darkAlgorithm }}  locale={zhCN}>
    <main className={styles.page}>
      {
        isDay ? <i className={['iconfont', 'icon-night', styles['night']].join(' ')} onClick={handleSwitchDay}></i> : <i className={['iconfont', 'icon-day', styles['day']].join(' ')} onClick={handleSwitchDay}></i>
      }
      <Sidebar />
      <section className={styles.content}>
        {props.children}
      </section>
    </main>
  </ConfigProvider>

}