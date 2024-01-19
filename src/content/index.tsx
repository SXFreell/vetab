import ReactDOM from 'react-dom/client'
import "./index.less"
import React, { useEffect } from 'react'
import {IconClose} from '@arco-design/web-react/icon'

// 添加vetab
const htmlElement = document.querySelector("html")
const vetab = document.createElement("vetab")
vetab.id = "vetab"
htmlElement?.insertBefore(vetab, htmlElement.firstChild)

function VeTab() {
    const [tabList, setTabList] = React.useState<any[]>([])

    chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
        if (message.type === 'activeTab') {
            setTabList(message.data)
        }
    })

    useEffect(() => {
        chrome.runtime.sendMessage({ type: 'getTabs' })
    }, [])

    return (
        <>
            <div className='vetab-content'>
                {
                    tabList.map((tab) => {
                        return (
                            <div
                                className={`vetab-content-item ${tab.active ? 'active' : ''}`}
                                onClick={() => {
                                    chrome.runtime.sendMessage({ type: 'changeTab', data: tab.id })
                                }}
                                key={tab.id}
                            >
                                <div className='vetab-content-item-icon'>
                                    <img src={tab.favIconUrl} alt="" />    
                                </div>
                                <div className='vetab-content-item-title'>{tab.title}</div>
                                <div className='vetab-content-item-close'>
                                    <IconClose style={{color: '#F7F7F7'}}
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation()
                                            chrome.runtime.sendMessage({ type: 'removeTab', data: tab.id })
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {/* <div className='vetab-footer'></div> */}
        </>
    )
}

ReactDOM.createRoot(document.getElementById('vetab')!).render(
    <VeTab />
)