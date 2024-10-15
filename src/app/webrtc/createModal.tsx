'use client';
import { Modal, Form, Input } from 'antd'
import { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import type { MutableRefObject } from 'react'
import type { FormProps, FormInstance } from 'antd';
import { Socket } from 'socket.io-client';

export type Props = {
  socket: MutableRefObject<Socket|undefined>
}

export interface Ref {
  showModal: () => Promise<string>
}

const CreateModal = forwardRef<Ref, Props>((props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { socket } = props
  const resolve = useRef<any>(null);


  function showModal() {
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
      const params = { ...values };
      socket.current && socket.current.emit('create-room', params, (id: string) => {
        resolve.current(id);
        setIsModalOpen(false)
        refForm.current?.resetFields()
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


  return <Modal title="创建房间" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      ref={refForm}
    >
      <Form.Item<FieldType>
        label="房间名"
        name="name"
        rules={[{ required: true, message: '请输入房间名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
      >
        <Input.Password placeholder='未输入密码则为开放房间' />
      </Form.Item>
    </Form>
  </Modal>
})

export default CreateModal;
