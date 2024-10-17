'use client';
import styles from './webrtc.module.scss'
import { useRef, useState, useEffect } from 'react'
import { Button, Divider, List, Tag, message } from 'antd'
import CreateModal from './createModal';
import type { Ref } from './createModal';
import type {RefPassword} from './passwordModal'
import io, { Socket } from 'socket.io-client';
import { queryChatRooms } from '@/api/rtc'
import ChatBox from './chat'
import PasswordModal from './passwordModal'


type Rooms = Array<{ name: string, status: number, id: string }>
export default function WebRTC() {

  const createModalRef = useRef<Ref>(null)
  const passwordRef = useRef<RefPassword>(null)
  const roomId = useRef('')

  const [rooms, setRooms] = useState<Rooms>([]);

  const roomStatus = [
    { status: 1, label: '开放', color: 'green' },
    { status: 2, label: '加密', color: 'orange' },
    { status: 3, label: '满人', color: 'red' },
  ];

  const [onlines, setOnlines] = useState(0);
  async function getChatRooms() {
    const { data } = await queryChatRooms();
    console.log('d', data);
    setRooms(data);
  }
  const socket = useRef<Socket>();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    socket.current = io('/vson', { path: '/socket' });
    socket.current.on('connect', () => {
      getChatRooms();
    });
    socket.current.on('online-nums', (nums) => {
      console.log('nums', nums);

      setOnlines(nums);
    });
    socket.current.on('update-rooms', () => {
      getChatRooms();
    });

    return () => {
      socket.current && socket.current.disconnect();
    };
  }, []);


  async function handleOpenCreate() {
    roomId.current = await createModalRef.current!.showModal()
    // console.log('列表刷新接口', roomId.current);
    setVisibleChat(true);
  }

  function getStatus(status: number) {
    const room = roomStatus.find((item) => {
      return item.status === status;
    });
    return <Tag color={room?.color}>{room?.label}</Tag>;
  }


  const [visibleChat, setVisibleChat] = useState(false);
  const [visitor, setVisitor] = useState(false);

  async function handleJoin(item: Rooms[0]) {
    const status = item.status;
    if (status === 1) {
      roomId.current = item.id;
      socket.current!.emit('join-room', { id: roomId.current }, () => { });
      setVisitor(true);
      setVisibleChat(true);
    } else if (status === 2) {
      await passwordRef.current!.showModal(item.id);
      roomId.current = item.id;
      setVisitor(true);
      setVisibleChat(true);
    } else if (status === 3) {
      messageApi.open({
        type: 'error',
        content: '该房间人数已满',
      });
    }
  }

  function handleCloseChat() {
    socket.current!.emit('leave-room', roomId.current);
    setVisibleChat(false);
  }


  return <>
    {contextHolder}
    <div className={styles['page-wrap']}>
      <div className={styles.front}>
        <div className={styles['front-header']}>
          <Button type='primary' onClick={handleOpenCreate}>创建房间</Button>

          {socket && <CreateModal ref={createModalRef} socket={socket} />}

          <span className={styles['front-header-label']}>在线人数：</span><span className={styles['front-header-count']}>{onlines}</span>
        </div>
        <Divider orientation="left"></Divider>
        <List
          header={<div style={{ fontWeight: 'bold' }}>房间列表</div>}
          bordered
          locale={{ emptyText: "暂无房间" }}
          dataSource={rooms}
          renderItem={(item) => (
            <List.Item>
              <div className={styles['list-item']}>
                <div className={styles['list-item-left']}>
                  <span style={{ marginRight: '12px' }}>{item.name}</span>
                  {getStatus(item.status)}
                </div>
                {
                  item.status !== 3 ? <Button type='primary' size='small' onClick={() => handleJoin(item)}>进入</ Button> : ''
                }
              </div>
            </List.Item>
          )}
        />
      </div>
      {visibleChat && <ChatBox closeChat={handleCloseChat} socket={socket} visitor={visitor} />}
      <PasswordModal ref={passwordRef} socket={socket} />
    </div>
  </>
}

