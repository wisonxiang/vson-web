'use client';
import { useEffect,useRef } from "react";
import styles from './word.module.scss'

declare global {
  interface Window {
    DocsAPI: any;
  }
}

export default function Onlyword({docUrl}:any) {
  const config = {
    document: {
      fileType: "docx",
      key: 'abcdefghijk',
      title: "在线文档.docx",
      url: docUrl ?? "https://cdn.vson.top/pc/only.docx",
    },
    documentType: "word",
    type:"desktop",
    width: '100%',
    height: '100%',
    editorConfig: {
      lang:'zh',
      user: {
        group: undefined, id: 'admin', name: '文城'
      },
      customization: {
        spellcheck: false,
      },
      mode: 'edit',
    },
    events: {
      onDocumentReady,
    }
  }

function onDocumentReady() {
  console.log('ready');
}

const docEditor = useRef<any>()
function handleLoad() {
  docEditor.current = new window.DocsAPI.DocEditor('iframeEditor', config);
}


useEffect(() => {
  const script = document.createElement('script');
  script.src = "http://vson.top:8088/web-apps/apps/api/documents/api.js";
  script.async = true;
  script.onload = () => {
    handleLoad()
  }
  document.body.appendChild(script);
  return () => {
    document.body.removeChild(script);
    docEditor.current && docEditor.current.destroyEditor();
    docEditor.current = null
  }
}, []);

  return <div className={styles['doc-wrap']}>
    <div id="iframeEditor"></div>
  </div>

}