'use client';
import styles from './word.module.scss'
import { Button, Upload } from 'antd'
import Onlyword from "./onlyword"
import { useState, useEffect } from 'react';
import type { GetProp, UploadFile, UploadProps } from 'antd';

export default function Word() {
  const [loading, setLoading] = useState(false)
  const [docUrl, setDocUrl] = useState<string|undefined>()

  const props: UploadProps = {
    beforeUpload: (file) => {
      return false;
    },
  }

  // useEffect(() => {
  //   setLoading(false)
  // }, [docUrl])

  return <div className={styles['page-wrap']}>
    {
      loading ? <div className={styles['doc-wrap']}></div> : <Onlyword docUrl={docUrl} />
    }
    <div className={styles['page-right']}>
      <Upload {...props}>
        <Button type="primary">开发中</Button>
      </Upload>
    </div>
  </div>
}