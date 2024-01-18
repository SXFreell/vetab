let activeTabId: number = 0
let tabList: any[] = []

type Message = {
    type: string,
    data: any
}

function sendMessageToTab(tabId: number, message: Message) {
    chrome.tabs.sendMessage(tabId, message)
}

function sendTabsToTab(tabId: number) {
    chrome.tabs.query({ url:["<all_urls>"] }, (tabs) => {
        tabList = tabs
        sendMessageToTab(tabId, { type: 'activeTab', data: tabList })
    })
}

chrome.tabs.onActivated.addListener((activeInfo) => {
    activeTabId = activeInfo.tabId
    sendTabsToTab(activeTabId)
})

chrome.tabs.query({active: true}, (tabs) => {
    tabs[0].id && (activeTabId = tabs[0].id)
    sendTabsToTab(activeTabId)
})

// 通知content
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message, sender, sendResponse)
    if (message.type === 'changeTab') {
        chrome.tabs.update(message.data, { active: true })
    }
})

chrome.tabs.onCreated.addListener((tab) => {
    console.log(tab)
    sendTabsToTab(activeTabId)
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tabId, changeInfo, tab)
    sendTabsToTab(activeTabId)
})