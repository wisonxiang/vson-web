'use client';
import styles from './webrtc.module.scss'
import { useRef, useState, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Button, Divider, List, Tag } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import CreateModal from './createModal';
import type { Ref } from './createModal';
import io, { Socket } from 'socket.io-client';
import { queryChatRooms } from '@/api/rtc'
import Draggable from 'react-draggable';

export default function WebRTC() {

  const createModalRef = useRef<Ref>(null)
  const roomId = useRef('')

  const [visibleChat, setVisibleChat] = useState(false);

  async function handleOpenCreate() {
    // roomId.current = await createModalRef.current!.showModal()
    // console.log('列表刷新接口', roomId.current);
    setVisibleChat(true);
  }

  const [rooms, setRooms] = useState<{ name: string, status: number }[]>([]);

  const roomStatus = [
    { status: 1, label: '开放', color: 'green' },
    { status: 2, label: '加密', color: 'orange' },
    { status: 3, label: '满人', color: 'red' },
  ];

  function getStatus(status: number) {
    const room = roomStatus.find((item) => {
      return item.status === status;
    });
    return <Tag color={room?.color}>{room?.label}</Tag>;
  }


  const [onlines, setOnlines] = useState(0);
  async function getChatRooms() {
    const { data } = await queryChatRooms();
    console.log('d', data);
    setRooms(data);
  }
  const socket = useRef<Socket>();

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


  return <div className={styles['page-wrap']}>
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
                item.status !== 3 ? <Button type='primary' size='small'>进入</ Button> : ''
              }
            </div>
          </List.Item>
        )}
      />
    </div>
    {visibleChat && <ContentBox setVisibleChat={setVisibleChat} />}
  </div>
}

interface PropsType {
  setVisibleChat: Dispatch<SetStateAction<boolean>>
}

function ContentBox(props: PropsType) {
  const refVideoMe = useRef<HTMLVideoElement>(null)

  const streamMe = useRef<MediaStream | null>(null);

  const { setVisibleChat } = props

  async function handlePlayMe() {
    if (meFlag.current) return
    meFlag.current = true
    const options = {
      video: true,
      audio: false,
    };
    try {
      streamMe.current = await window.navigator.mediaDevices.getUserMedia(options);
      refVideoMe.current!.srcObject = streamMe.current;
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  }

  const meFlag = useRef(false);
  useEffect(() => {
    handlePlayMe()
    handleBounds();
    return () => {
      handleClose();
    };
  }, [])

  function handleClose() {
    if (streamMe.current) {
      streamMe.current.getTracks().forEach((track) => {
        if (track.readyState == 'live') {
          track.stop();
        }
      });
      streamMe.current = null
    }
  }


  const [bounds, setBounds] = useState({});
  const refDrag = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null)

  function handleBounds() {
    const width = document.body.offsetWidth;
    const right = width - refDrag.current!.offsetWidth * 2;
    const height = document.body.offsetHeight;
    const bottom = height - refDrag.current!.offsetHeight;
    setBounds({ left:0, top:0, right, bottom });
  }

  return <div className={styles.content} ref={refContent}>
    <CloseOutlined style={{ fontSize: '24px', position: 'absolute', right: '12px', top: '12px', cursor: 'pointer' }} onClick={() => setVisibleChat(false)} />

    <div className={styles['box-wrap']}>
      <video className={styles['video-box-me']} ref={refVideoMe} playsInline autoPlay muted></video>
    </div>
    <Draggable nodeRef={refDrag} bounds={bounds}>
      <div className={styles['video-box-other']} ref={refDrag}>
      </div>
    </Draggable>

  </div>
}