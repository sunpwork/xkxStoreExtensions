chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    // 只有打开百度才显示pageAction
                    new chrome.declarativeContent.PageStateMatcher({ pageUrl: { urlContains: 'yuange.s7.ya-mai.com' } })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    request.newOrderList.forEach(function (element, index) {
        $.get(element.url, function (result) {
            var userInfo = $(result).find('.content-bd.table_list2').children('div')[0].innerText;

            var orderInfoDivList = $(result).find('.cnt').children('.data-table').children('tbody').children('tr').children('.c');

            var orderInfo = {};
            for (var i = 0; i < orderInfoDivList.length; i+=4) {
                orderInfo['name'] = orderInfoDivList[i].innerText;
                orderInfo['price'] = orderInfoDivList[i+1].innerText;
                orderInfo['count'] = orderInfoDivList[i+2].innerText;
            }
            orderInfo['userInfo'] = userInfo;

            $.get("http://127.0.0.1/sendMsgToUser")
        })
    });
});