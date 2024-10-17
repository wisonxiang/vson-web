import styles from './webrtc.module.scss'
import Draggable from 'react-draggable';
import { CloseOutlined } from '@ant-design/icons'
import { useRef, useState, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Spin } from 'antd'
import type { Socket } from 'socket.io-client';
import type { MutableRefObject } from 'react'

interface PropsType {
  closeChat: () => void;
  socket: MutableRefObject<Socket | undefined>,
  visitor: boolean
}
type Sign = {
   desc:string, type: string, side: string
}

export default function ChatBox(props: PropsType) {
  const refVideoMe = useRef<HTMLVideoElement | null>(null)
  const refVideoOther = useRef<HTMLVideoElement | null>(null)

  const streamMe = useRef<MediaStream | null>(null);
  const streamOther = useRef<MediaStream | null>(null);
  const peer = useRef<RTCPeerConnection | null>(null);
  const [isConnect, setIsConnect] = useState(false);

  const [bounds, setBounds] = useState({});
  const refDrag = useRef<HTMLDivElement>(null);

  const meFlag = useRef(false);

  const { closeChat, socket, visitor } = props

  useEffect(() => {
    createPeerConnection()
    handleBounds();
    return () => {
      handleClose();
    };
  }, [])

  useEffect(() => {
    socket.current!.on('create-offer', createOffer);
    socket.current!.on('create-answer', postAnswer);
    socket.current!.on('leave-room', closeChat);

    handleBounds();

    return () => {
      socket.current!.off('create-offer', createOffer);
      socket.current!.off('create-answer', postAnswer);
      socket.current!.off('leave-room', closeChat);
    };
  }, []);

  async function createPeerConnection() {
    if (meFlag.current) return;
    meFlag.current = true;
    await handlePlayMe();
    if (!peer.current) {
      const peerConfig = {
        iceServers: [
          {
            urls: 'turn:120.25.78.219:3478',
            credential: 'test123',
            username: 'test',
          },
        ],
      };
      peer.current = new RTCPeerConnection(peerConfig);
    }
    if (streamMe.current) {
      streamMe.current.getTracks().forEach((track) => {
        peer.current!.addTrack(track, streamMe.current as MediaStream);
      });
    }

    peer.current.onicecandidate = (e: any) => {
      console.log('e', e.candidate);
      if (e.candidate) {
        socket.current!.emit('rtc-sign', {
          sdpMLineIndex: e.sdpMLineIndex,
          candidate: e.candidate,
          sdpMid: e.sdpMid,
          type: 'ice',
          side: 'create',
        });
      }
    };
    peer.current.ontrack = (e) => {
      console.log('ab~~~8');
      setIsConnect(true);
      setTimeout(() => {
        handlePlayOther(e);
      }, 500);
    };
    console.log('pppfff', peer.current);
    if (visitor) {
      console.log('b~~~4');
      socket.current!.emit('rtc-ready');
    }
  }

  function createOffer() {
    const offerOptions = {
      offerToRecieveAudio: 0,
      offerToRecieveVideo: 1,
    };
    console.log('peer.current', peer.current);
    peer.current!.createOffer(offerOptions as RTCOfferOptions).then((desc) => {
      console.log('a~~~5');
      peer.current!.setLocalDescription(desc);
      socket.current!.emit('rtc-sign', { desc, type: 'dsp', side: 'create' });
    });
  }

  function createAnswer(data:Sign) {
    peer.current!.setRemoteDescription(new RTCSessionDescription(data.desc as any ));
    if (data.side == 'create') {
      console.log('b~~~6');
      peer.current!.createAnswer().then((desc) => {
        peer.current!.setLocalDescription(desc);
        socket.current!.emit('rtc-sign', {
          desc,
          type: 'dsp',
          side: 'answer',
        });
      });
    }
  }

  function postAnswer(data : any) {
    if (data.type == 'dsp') {
      createAnswer(data);
    } else if (data.type == 'ice') {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: data.candidate.sdpMLineIndex,
        candidate: data.candidate.candidate,
      });
      peer.current!.addIceCandidate(candidate);
    }
  }

  async function handlePlayMe() {
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
  async function handlePlayOther(e: RTCTrackEvent) {
    console.log('ab~~~7');
    try {
      refVideoOther.current!.srcObject = e.streams[0];
      streamOther.current = e.streams[0];
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  }

  function handleClose() {
    if (streamMe.current) {
      streamMe.current.getTracks().forEach((track) => {
        if (track.readyState == 'live') {
          track.stop();
        }
      });
      streamMe.current = null
    }
    if (streamOther.current) {
      streamOther.current.getTracks().forEach((track) => track.stop());
      streamOther.current = null;
    }
    if (peer.current) {
      peer.current.close();
      peer.current = null;
    }
  }

  function handleBounds() {
    const width = document.body.offsetWidth;
    const right = width - refDrag.current!.offsetWidth * 2;
    const height = document.body.offsetHeight;
    const bottom = height - refDrag.current!.offsetHeight;
    setBounds({ left: 0, top: 0, right, bottom });
  }

  return <div className={styles.content}>
    <CloseOutlined style={{ fontSize: '24px', position: 'absolute', right: '12px', top: '12px', cursor: 'pointer' }} onClick={closeChat} />

    <div className={styles['box-wrap']}>
      {isConnect ? <video className={styles['video-box-other']} ref={refVideoOther} playsInline autoPlay muted></video>: <Spin tip="等待加入">
        <div  style={{ padding: '300px 300px 150px', background: 'gray',width:'100%',height:'100%' }}></div>
      </Spin>}
    </div>
    <Draggable nodeRef={refDrag} bounds={bounds}>
      <div className={styles['video-box-me']} ref={refDrag}>
        <video ref={refVideoMe} playsInline autoPlay muted></video>
      </div>
    </Draggable>

  </div>
}