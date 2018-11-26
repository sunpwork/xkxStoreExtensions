
var orderIdDivList = $('tr').children('.chk').children('input');
var orderUrlDivList = $('tr').children('.icon').children('.opt[target="_blank"]');
var brandId = $("#keys_b").val();

console.log("brandId: " + brandId);

//从storage获取最后一次发送短信的订单编号
chrome.storage.local.get(function (items) {
    var latestIdList = items['latestIdList'];
    console.log(latestIdList);
    if (latestIdList && latestIdList[brandId]) {
        var latestId = latestIdList[brandId];

        var newOrderList = Array();

        for (var i = 0; i < orderIdDivList.length; i++) {
            // if (orderIdDivList[i].value == latestId) {
            //     break;
            // }
            newOrderList.push({ 'id': orderIdDivList[i].value, 'url': orderUrlDivList[i].href })
        }
        chrome.runtime.sendMessage({ 'brandId': brandId, 'newOrderList': newOrderList }, function (response) {

        });

    }

    // if (latestIdList == undefined) {
    //     latestIdList = new Array();
    // }
    // latestIdList[brandId] = orderIdDivList[0].value;

    // chrome.storage.local.set({ 'latestIdList': latestIdList }, function () {
    //     console.log(latestIdList);
    // });
})


// setInterval(refreshWindows, 1000);

// function refreshWindows() {
//     window.location.reload();
// }