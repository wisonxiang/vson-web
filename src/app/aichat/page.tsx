'use client';
import Image from "next/image";
import styles from './aichat.module.scss'
import girlImg from '@img/ai-girl.jpg'
import boyImg from '@img/ai-boy.jpg'
import { useRef, useState, useEffect } from "react";
import { Input, message as antMessage } from 'antd';
import { useImmer } from 'use-immer';
import { fetchEventSource } from '@microsoft/fetch-event-source';

const { TextArea } = Input;


export default function AiChat() {
  const [role, setRole] = useState<string>('')

  return <div className={styles['page-wrap']}>
    {role ? <ChatBox role={role} /> : <RoleBox setRole={setRole} />}
  </div>
}


function RoleBox(props: any) {
  const { setRole } = props
  return <div className={styles.role}>
    <span className={styles.text}>想跟谁聊呢？</span>
    <div className={styles['role-inner']}>
      <Image src={girlImg} className={styles['role-img']} alt="my avatar" onClick={() => setRole('girl')} priority />
      <Image src={boyImg} className={styles['role-img']} alt="my avatar" onClick={() => setRole('boy')} priority />
    </div>
  </div>
}

function ChatBox(props: { role: string }) {
  const { role } = props
  const isGirl = role === 'girl';
  const [chatList, upDateChatList] = useImmer([
    {
      role: 'ai',
      content: role === 'girl' ? '亲爱哒~，我是你的女朋友梅梅' : '亲爱的，我是你的男朋友雷雷',
      isEnd: true,
    },
    // {
    //   role: 'assistant',
    //   content: '亲爱哒~,我是你的女朋友伊伊 snengenngenbebfebf ',
    //   isEnd: false,
    // },
    // {
    //   role: 'user',
    //   content: '哈哈',
    //   isEnd: true,
    // },
  ]);

  const refContent = useRef<HTMLDivElement>(null)

  useEffect(() => {
    refContent.current?.scrollTo(0, refContent.current.scrollHeight);
  }, [chatList]);

  function exportCons(item: typeof chatList[0]) {
    const end = !item.isEnd ? `<i class='--ai-cursor'></i>` : '';
    return item.content + end;
  }


  return <div className={styles['chat-wrap']}>
    <div className={styles['chat-inner']} ref={refContent} >
      {chatList.map((item, idx) =>
        item.role === 'user' ? (
          <div key={idx} className={[styles['chat-item'], styles['chat-question']].join(' ')}>
            <pre className={styles['chat-content']}>{item.content}</pre>
            <Image src={isGirl ? boyImg : girlImg} className={styles['chat-icon']} alt="my avatar" />
          </div>
        ) : (
          <div key={idx} className={styles['chat-item']}>
            <Image src={isGirl ? girlImg : boyImg} className={styles['chat-icon']} alt="my avatar" />
            <pre className={styles['chat-content-left']} dangerouslySetInnerHTML={{ __html: exportCons(item) }}></pre>
          </div>
        ),
      )}
    </div>
    <ChatInput role={role} upDateChatList={upDateChatList} chatList={chatList} />
  </div>
}

function ChatInput({ upDateChatList, role, chatList }: any) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = antMessage.useMessage();
  const refInput = useRef<any>()



  function handleEnter(event: any) {
    if (event.keyCode == 13) {
      if (!event.ctrlKey) {
        event.preventDefault();
        // 发送
        handleSend();
      } else {
        setMessage(message + '\n')
      }
    }
  }

  function handleSend() {
    if (!message || loading) return;
    upDateChatList((draft: any) => {
      draft.push({ role: 'user', content: message });
    });
    setMessage('');
  }

  useEffect(() => {
    if (chatList.at(-1).role === 'user') {
      connectSSE();
    }
  }, [chatList]);

  useEffect(() => {
    if (!loading) {
      refInput.current.focus()
    }
  }, [loading])

  let controller = useRef<any>(null);
  function connectSSE() {
    setLoading(true);
    controller.current = new AbortController();

    const list = chatList.filter((item: any) => item.role !== 'ai');
    const contents = list.map((item: any) => ({ role: item.role, content: item.content }));
    upDateChatList((draft: any) => {
      draft.push({ role: 'assistant', content: '', isEnd: false });
    });

    fetchEventSource(`/api/v1/gpt`, {
      method: 'POST',
      signal: controller.current.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        role,
      }),
      async onopen(response) {
        if (response.ok && response.headers.get('content-type') === 'text/event-stream') {
          return;
        } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
          if (response.status == 401) {
            messageApi.open({
              type: 'error',
              content: '您的会话已过期，请重新登录',
            });
          } else {
            messageApi.open({
              type: 'error',
              content: '服务器错误',
            });
          }
          handleErrorSSE();
        } else {
          messageApi.open({
            type: 'error',
            content: '服务器错误',
          });
          handleErrorSSE();
        }
      },
      onmessage(msg) {
        if (msg.event === 'char') {
          const result = msg.data;
          upDateChatList((draft: any) => {
            draft.at(-1).content += result;
          });
        } else if (msg.event === 'close') {
          controller.current.abort();
        }
      },
      onerror(err) {
        console.log(err);
        messageApi.open({
          type: 'error',
          content: err,
        });
        handleErrorSSE();
      },
      onclose() {
        upDateChatList((draft: any) => {
          draft.at(-1).isEnd = true;
        });
        setLoading(false);
        controller.current.abort();
        return;
      },
      openWhenHidden: true,
    });
  }

  function handleErrorSSE() {
    upDateChatList((draft: any) => {
      draft.at(-1).isEnd = true;
    });
    setLoading(false);
    throw new Error();
  }


  return <>
    {contextHolder}
    <div className={styles['input-wrap']}>
      <div className={styles['input-tool']}>
        <i className={['iconfont', 'icon-fasong', styles['fasong']].join(' ')} onClick={handleSend}></i>
      </div>
      <TextArea rows={4} ref={refInput} placeholder="聊点什么呢" maxLength={200} value={message} disabled={loading}
        onChange={(e) => setMessage(e.target.value)} onPressEnter={handleEnter} />
    </div >
  </>

}