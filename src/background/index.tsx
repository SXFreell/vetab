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

// chrome.tabs.query({active: true}, (tabs) => {
//     if (tabs[0].id) {
//         activeTabId = tabs[0].id
//         sendTabsToTab(activeTabId)
//     }
// })

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    switch (message.type) {
        case 'changeTab':
            chrome.tabs.update(message.data, { active: true })
            break
        case 'getTabs':
            sendTabsToTab(activeTabId)
            break
        case 'removeTab':
            chrome.tabs.remove(message.data)
            break
        case 'createNewTab':
            chrome.tabs.create({})
            break
    }
})

chrome.tabs.onCreated.addListener(() => {
    sendTabsToTab(activeTabId)
})

chrome.tabs.onMoved.addListener(() => {
    sendTabsToTab(activeTabId)
})

chrome.tabs.onUpdated.addListener(() => {
    sendTabsToTab(activeTabId)
})

chrome.tabs.onRemoved.addListener(() => {
    sendTabsToTab(activeTabId)
})
