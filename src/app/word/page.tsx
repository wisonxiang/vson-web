'use client';
import styles from './word.module.scss'
import { Button, Upload } from 'antd'
import Onlyword from "./onlyword"
import { useState, useEffect } from 'react';

export default function Word() {
  const [loading, setLoading] = useState(false)
  const [docUrl, setDocUrl] = useState<string|undefined>()
  function handleUpload(file: any) {
    // let blob = new Blob([file], {
    //   type: `${file.type};charset=utf-8`,
    // });
    // const url = URL.createObjectURL(blob);
    // setLoading(true)
    // setDocUrl(url)
  }

  // useEffect(() => {
  //   setLoading(false)
  // }, [docUrl])

  return <div className={styles['page-wrap']}>
    {
      loading ? <div className={styles['doc-wrap']}></div> : <Onlyword docUrl={docUrl} />
    }
    <div className={styles['page-right']}>
      <Upload beforeUpload={handleUpload}>
        <Button type="primary">开发中</Button>
      </Upload>
    </div>
  </div>
}