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
            var userInfoDiv = $(result).find('.content-bd.table_list2').children('div')[0];
            var goodsDivList = $(result).find('.cnt').children('.data-table').children('tbody').children('tr').children('.c');
            var goodsList = new Array();
            for (var i = 0; i < goodsDivList.length; i += 4) {
                goodsList.push({
                    'name': goodsDivList[i].innerText,
                    'price': goodsDivList[i + 1].innerText,
                    'count': goodsDivList[i + 2].innerText
                });
            }

            var user_info = userInfoDiv.innerText.replace(/((\s)*\n(\s)*)+/g,'\n').split('\n');

            var orderInfo = {
                'brand_id': request.brand_id,
                'platform_id': element.id,
                'order_time': element.order_time,
                'goodsList': goodsList,                
                'user_remark': user_info[0],
                'user_name': user_info[1],
                'user_tel': user_info[2],
                'user_address':user_info[3] 
            }

            $.ajax({
                url: "http://xkxshopserver.test/order/store",
                data: JSON.stringify(orderInfo),
                contentType: "application/json; charset=utf-8",
                type: "POST",
                success: function (result) {

                }
            });

            console.log(orderInfo);

        })
    });
});