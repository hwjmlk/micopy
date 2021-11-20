    let goodsId = location.search.split('?')[1];
    // console.log(location.search.split('?')[1]);

    // $.get("../php/getGoodsInfo.php", "goodsId=" + goodsId, function (goods) {
    //     $(".goodsName").html(goods.goodsName);
    //     $(".goodsDesc").html(goods.goodsDesc);
    //     $(".goodsPrice").html(goods.goodsPrice);
    //     $(".howMoney").html(goods.goodsPrice);
    //     $(".img2").prop("src",goods.goodsImg);


    // },"json");

$.get("../php/getGoodsInfo.php", "goodsId=" + goodsId,
    function (data, textStatus, jqXHR) {
        // console.log(data);
        $(".titlename").html(data.goodsName)
        $(".goodsName").html(data.goodsName)
        $(".sale-desc").html(`<font color="#ff4a00">「至高享24期免息；信用卡分期最高减216元；加299元得无线充套装」</font>${data.goodsDesc}`)
        $(".price-info").html(`<span>${data.beiyong1}</span>`)
        $(".J_imgList img").prop("src","."+data.goodsImg)
        $(".selected-list ul").html(`<li>${data.goodsName} 8GB+128GB 陶瓷黑<span>${data.beiyong1}</span></li>`)
        $(".total-price").html(`总计：${data.beiyong1}`)
    },
    "json"
);

$(".btn-primary").click(function(){
    // console.log(getCookie("vipName"));
    $.ajax({
        type: "post",
        url: "../php/addShoppingCart.php",
        data: {
            "vipName":getCookie("vipName"),
            "goodsId":goodsId,
            "goodsCount":1

        },
        dataType: "json",
        success: function (res) {
            console.log(res);
        }
    });
})

let option =  $(".option")
// console.log(option);
for (let i = 0; i < option.length; i++) {
    const ele = option[i];
    // console.log(ele);

}