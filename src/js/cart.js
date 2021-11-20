$(function () {
    render()
    // total()
});

function render() {
    $.get("../php/getShoppingCart.php", {
            "vipName": getCookie("vipName")
        },
        function (data, textStatus, jqXHR) {
            let str = ""
            $.each(data, function (i, v) {
                let price = parseInt(v.beiyong1);
                //    console.log(price);
                str += `
                <div class="list-item">
                <div class="col col-check">
                    <input type="checkbox" name="checkbox">
                </div>
                <div class="col col-img">
                    <img src=".${v.goodsImg}"
                        width="80" height="80"></div>
                <div class="col col-name">
                    <h3 class="name"><a href="javascript:void(0)">${v.goodsName}</a></h3>
                </div>
                <div class="col col-price">${price}</div>
                <div class="col col-num">
                    <div class="change-goods-num">
                        <a href="javascript:void(0)" class="min">-</a>
                        <input type="text" index=${v.goodsId} class="goods-num" value="${v.goodsCount}">
                        <a href="javascript:void(0)" class="add">+</a>
                    </div>
                </div>
                <div class="col col-total xj">${price*v.goodsCount}元</div>
                <div class="col col-action">
                    <a href="javascript:void(0);" class="del" index=${v.goodsId}> x</a></div>
            </div>
            `
                $(".list-body").html(str)
            });

            total()


            $(function () {
                let len = $("input[name=checkbox]").length;
                let length = $("input[name=checkbox]:checked").length;
                $(".cart-total-1").html(len)

                $("#allcheck").click(function () {
                    let flag = this.checked
                    $("input[name=checkbox]").each(function () {
                        this.checked = flag;
                    });

                    total()
                });

                $("input[name=checkbox]").click(function () {
                    let length = $("input[name=checkbox]:checked").length;
                    let len = $("input[name=checkbox]").length;
                    $(".cart-total-2").html(length)
                    if (length == len) {
                        $("#allcheck").get(0).checked = true;
                    } else {
                        $("#allcheck").get(0).checked = false;
                    }
                    total()
                });
            })
        },
        "json"
    );
}


for (let index = 0; index < 8; index++) {
    $.get("../php/getGoodsList.php",
        `typeId=00${index+1}`,
        function (data, textStatus, jqXHR) {
            $.each(data, function (i, v) {
                $(`<li class="recommend-item">
                <a href="#"><img  width="140px" src=".${v.goodsImg}">
                    <div class="recommend-name">${v.goodsName}</div>
                    <div class="recommend-price">${v.beiyong1}</div>
                    <div class="recommend-tips">${(Math.random()*100).toFixed(0)}万人好评</div>
                </a>
                <div class="recommend-action" index=${v.goodsId}><a href="javascript:void(0);" class="btn-add" >加入购物车</a></div>
                <div class="recommend-notice"><a class="btn-success">成功加入购物车</a></div>
            </li>`).appendTo(".recommend-list")
            });
        },
        "json"
    );

}




$(".list-body").on("click", ".del", function () {
    if (confirm("真的要删除吗")) {
        $.ajax({
            type: "get",
            url: "../php/deleteGoods.php",
            data: {
                "vipName": getCookie("vipName"),
                "goodsId": $(this).attr("index")
            },
            dataType: "json",
            success: function (res) {
                if (res == 1) {
                    render()
                }
            }
        });
    }

})



$(".recommend-list").on("click", ".recommend-action", function () {
    $(this).siblings(".recommend-notice").css("opacity", 1)
    setTimeout(() => {
        $(this).siblings(".recommend-notice").css("opacity", 0)
    }, 500);

    $.ajax({
        type: "post",
        url: "../php/addShoppingCart.php",
        data: {
            "vipName": getCookie("vipName"),
            "goodsId": $(this).attr("index"),
            "goodsCount": 1

        },
        dataType: "json",
        success: function (res) {
            // console.log(res);
            render()
        }
    });

})

$(".list-body").on("change", ".goods-num", function () {
    let n = $(this).val()
    let price = $(this).parents(".col-num").siblings(".col-price").html()
    let num = n * price
    $(this).parents(".col-num").siblings(".col-total").html(num + '元')

    $.get("../php/updateGoodsCount.php", {
            "vipName": getCookie("vipName"),
            "goodsId": $(this).attr("index"),
            "goodsCount": $(this).val()
        },
        function (data, textStatus, jqXHR) {
            // console.log(data);
        },
        "json"
    );
    total()
})


$(".list-body").on("click", ".min", function () {
    let n = $(this).siblings(".goods-num").val()
    if (n <= 1) {
        n = 1
    } else {
        let price = $(this).parents(".col-num").siblings(".col-price").html()
        let n = $(this).siblings(".goods-num").val()
        n--
        let num = n * price
        $(this).siblings(".goods-num").val(n)
        $(this).parents(".col-num").siblings(".col-total").html(num + '元')
        $.get("../php/updateGoodsCount.php", {
                "vipName": getCookie("vipName"),
                "goodsId": $(this).siblings(".goods-num").attr("index"),
                "goodsCount": $(this).siblings(".goods-num").val()
            },
            function (data, textStatus, jqXHR) {
                // console.log(data);
            },
            "json"
        );
        total()
    }
})

$(".list-body").on("click", ".add", function () {

    let price = $(this).parents(".col-num").siblings(".col-price").html()
    let n = $(this).siblings(".goods-num").val()
    n++
    let num = n * price
    $(this).siblings(".goods-num").val(n)
    $(this).parents(".col-num").siblings(".col-total").html(num + '元')
    $.get("../php/updateGoodsCount.php", {
            "vipName": getCookie("vipName"),
            "goodsId": $(this).siblings(".goods-num").attr("index"),
            "goodsCount": $(this).siblings(".goods-num").val()
        },
        function (data, textStatus, jqXHR) {
            // console.log(data);
        },
        "json"
    );

    total()
})










$(function () {
    let len = $("input[name=checkbox]").length;
    let length = $("input[name=checkbox]:checked").length;
    $(".cart-total-1").html(len)

    $("#allcheck").click(function () {
        let flag = this.checked
        $("input[name=checkbox]").each(function () {
            this.checked = flag;
        });

        total()
    });

    $("input[name=checkbox]").click(function () {
        let length = $("input[name=checkbox]:checked").length;
        let len = $("input[name=checkbox]").length;
        $(".cart-total-2").html(length)
        if (length == len) {
            $("#allcheck").get(0).checked = true;
        } else {
            $("#allcheck").get(0).checked = false;
        }
        total()
    });
})




function total() {
    let sum = 0
    let heji = $("input[name=checkbox]:checked").parents().siblings(".xj")
    $.each($(heji), function (i, v) {
        let a = v.innerHTML
        sum += parseInt(a)
    });
    $(".total-price em").html(sum)
}