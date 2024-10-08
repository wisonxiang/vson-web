'use client'; // add this part!
import Image from 'next/image'
import styles from './header.module.scss'
import nightIcon from '@img/night.svg'
import homeIcon from '@img/home.svg'
import musicIcon from '@img/music.svg'
import { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group'

// declare global {
//   interface Document {
//     startViewTransition: any;
//   }
// }

export default function Header() {
  const [isDay, setDay] = useState(true)
  function toggleDay() {
    setDay(!isDay)
  }
  function handleSwitchDay(e:any) {
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        document.documentElement.classList.toggle('dark');
        document.documentElement.setAttribute('data-prefers-color-scheme', isDay ? 'dark' : 'light');
        toggleDay();
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
      toggleDay();
    }
  }

  const [isFold, setFold] = useState(true)
  const iconClass = ['iconfont', 'icon-caidan'].join(' ')

  const nodeRef = useRef(null)
  const nodeRef2 = useRef(null)

  return <header className={styles.header}>
    <CSSTransition in={isFold} nodeRef={nodeRef} timeout={500} classNames="fade" unmountOnExit={true}>
      <i ref={nodeRef} className={iconClass} onMouseOver={() => setFold(false)}></i>
    </CSSTransition>
    <CSSTransition in={!isFold} nodeRef={nodeRef2} timeout={200} classNames="fade2" unmountOnExit={true}>
      <div ref={nodeRef2} className={styles.main} onMouseLeave={() => setFold(true)}>
        <Image src={nightIcon} width={30} height={30} alt="night icon" priority onClick={handleSwitchDay} />
        <Image src={homeIcon} width={30} height={30} alt="home icon" priority />
        <Image src={musicIcon} width={30} height={30} alt="music icon" priority />
      </div>
    </CSSTransition>
  </header>
}