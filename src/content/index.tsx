import ReactDOM from 'react-dom/client'
import "./index.less"
import React from 'react'

// 添加vetab
const htmlElement = document.querySelector("html")
const vetab = document.createElement("vetab")
vetab.id = "vetab"
htmlElement?.insertBefore(vetab, htmlElement.firstChild)

function VeTab() {
    const [tabList, setTabList] = React.useState<any[]>([])

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log(message, sender, sendResponse)
        if (message.type === 'activeTab') {
            setTabList(message.data)
        }
    })

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