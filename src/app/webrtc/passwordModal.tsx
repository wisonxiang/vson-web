'use client';
import { Modal, Form, Input, message } from 'antd'
import { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import type { MutableRefObject } from 'react'
import type { FormProps, FormInstance } from 'antd';
import { Socket } from 'socket.io-client';

export type Props = {
  socket: MutableRefObject<Socket | undefined>
}

export interface RefPassword {
  showModal: (id: string) => Promise<string>
}

const CreateModal = forwardRef<RefPassword, Props>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { socket } = props
  const resolve = useRef<any>(null);

  const [id, setId] = useState('');

  const [messageApi, contextHolder] = message.useMessage();


  function showModal(id: string) {
    setId(id)
    setIsModalOpen(true)
    return new Promise<string>((reso) => {
      resolve.current = reso;
    });
  }


  type FieldType = {
    name?: string;
    password?: string;
  };
  const refForm = useRef<FormInstance>(null)


  function handleOk() {
    refForm.current?.validateFields().then((values) => {
      const params = { ...values, id };
      socket.current && socket.current.emit('join-room', params, (res: boolean) => {
        if (!res) {
          return messageApi.open({
            type: 'error',
            content: '密码错误',
          });
        } else {
          resolve.current();
          handleCancel()
        }

      });
    })
  }

  function handleCancel() {
    refForm.current?.resetFields()
    setIsModalOpen(false)
  }

  useImperativeHandle(ref, () => {
    return {
      showModal
    }
  })


  return <>
    {contextHolder}
    <Modal title="进入房间" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        ref={refForm}
      >
        <Form.Item<FieldType>
          label="密码"
          name="password"
        >
          <Input.Password placeholder='请输入密码' />
        </Form.Item>
      </Form>
    </Modal>
  </>
})

export default CreateModal;
