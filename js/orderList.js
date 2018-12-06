var orderIdDivList = $('tr').children('.chk').children('input');
var orderTimeDivList = $('tr').children('.c[nowrap="nowrap"]:even');
var orderUrlDivList = $('tr').children('.icon').children('.opt[target="_blank"]');
var brand_id = $("#keys_b").val();

console.log("brand_id: " + brand_id);

//从storage获取最后一次发送短信的订单编号
chrome.storage.local.get(function (items) {
    var latestIdList = items['latestIdList'];
    console.log(latestIdList);
    if (latestIdList && latestIdList[brand_id]) {
        var latestId = latestIdList[brand_id];

        var newOrderList = Array();

        for (var i = 0; i < orderIdDivList.length; i++) {
            if (orderIdDivList[i].value == latestId) {
                break;
            }
            newOrderList.push({ 'id': orderIdDivList[i].value, 'order_time': orderTimeDivList[i].innerText ,'url': orderUrlDivList[i].href })
        }
        chrome.runtime.sendMessage({ 'brand_id': brand_id, 'newOrderList': newOrderList }, function (response) {

        });

    }

    if (latestIdList == undefined) {
        latestIdList = new Array();
    }
    latestIdList[brand_id] = orderIdDivList[0].value;

    chrome.storage.local.set({ 'latestIdList': latestIdList }, function () {
        console.log(latestIdList);
    });
})


setInterval(refreshWindows, 1000);

function refreshWindows() {
    window.location.reload();
}