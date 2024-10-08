import styles from "./page.module.scss";

export default function Home() {
  const menus = [
    { name: 'AI聊天', url: '/gpt', id: 1 },
    { name: '娱乐互联', url: '/rtc', id: 2 },
    { name: '3D特效', url: '', id: 3, disabled: true },
    { name: '我的分享', url: '', id: 4, disabled: true },
  ];
  return (
    <main className={styles.main}>
      <div className={styles.items}>
        {menus.map((item,idx) => (<div key={item.id} className={[styles.item,styles['item'+(idx+1)]].join(' ')}>{item.name}</div>))}
      </div>
    </main> 
  );
}
