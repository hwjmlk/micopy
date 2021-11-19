$(function () {
    for (let index = 0; index < 8; index++) {
        $.get("../php/getGoodsList.php",
        // {"typeId": `001`},
        `typeId=00${index+1}`,
        function (data, textStatus, jqXHR) {
            $.each(data, function (i, v) {
                console.log(v);
                $(`<li class="recommend-item">
                <a href="#"><img  width="140px" src=".${v.goodsImg}">
                    <div class="recommend-name">${v.goodsName}</div>
                    <div class="recommend-price">${v.beiyong1}</div>
                    <div class="recommend-tips">${(Math.random()*100).toFixed(0)}万人好评</div>
                </a>
                <div class="recommend-action"><a href="javascript:void(0);" class="btn-add">加入购物车</a></div>
                <div class="recommend-notice"><a class="btn-success">成功加入购物车</a></div>
            </li>`).appendTo(".recommend-list")
            });
        },
        "json"
    );

    }
});


