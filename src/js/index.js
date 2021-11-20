// app
var J_app = document.getElementById("j-app"),
    appCode = document.querySelector(".appcode");
J_app.onmouseover = function () {
    appCode.style.height = "148px";
    J_app.classList.add('active');
}
J_app.onmouseout = function () {
    appCode.style.height = "0";
    J_app.classList.remove('active');
}

/*购物车*/
var j_menu = document.querySelector(".j-menu"),
    site_Shop = document.querySelector(".site-shop"),
    cartColor = document.querySelector(".cart");
site_Shop.onmouseover = function () {
    j_menu.style.height = "99px";
    cartColor.classList.add("cart-color");
}
site_Shop.onmouseout = function () {
    j_menu.style.height = "0";
    cartColor.classList.remove("cart-color");
}

/*搜索框*/
var searchText = document.querySelector(".search-text"),
    searchBtn = document.querySelector(".search-btn");
searchText.onfocus = function () {
    searchText.classList.add("allBorder");
    searchBtn.classList.add("allBorder");
}
searchText.onblur = function () {
    searchText.classList.remove("allBorder");
    searchBtn.classList.remove("allBorder");
}

/*nav - js*/
var headerNavMenu = document.querySelectorAll(".header-nav-menu"),
    navItem = document.querySelectorAll(".nav-item");
for (var i = 0; i < navItem.length; i++) {
    navItem[i].index = i;
    navItem[i].onmouseover = function () {
        for (var i = 0; i < headerNavMenu.length; i++) {
            headerNavMenu[i].style.display = "none";
        }
        headerNavMenu[this.index].style.display = "block";
        headerNavMenu[this.index].style.borderTop = "1px solid #e0e0e0";
        headerNavMenu[this.index].classList.add("menuHeight");
    }
    navItem[i].onmouseout = function () {
        headerNavMenu[this.index].classList.remove("menuHeight");
        headerNavMenu[this.index].style.border = "none";
    }
}

// 全部商品分类
var category_list = document.querySelectorAll(".category-list"),
    commodity = document.querySelectorAll(".commodity");
for (var i = 0; i < category_list.length; i++) {
    category_list[i].index = i;
    category_list[i].onmouseover = function () {
        for (var i = 0; i < commodity.length; i++) {
            commodity[i].style.display = "none";
        }
        commodity[this.index].style.display = "block";
        category_list[this.index].classList.add("listBcolor");

    }
    category_list[i].onmouseout = function () {
        category_list[this.index].classList.remove("listBcolor");
        commodity[this.index].style.display = "none";
    }
}

//微信
var J_followWxImg = document.getElementById("J_followWxImg"),
    J_followWx = document.getElementById("J_followWx");
J_followWx.onmouseover = function () {
    J_followWxImg.style.display = "block";
}
J_followWx.onmouseout = function () {
    J_followWxImg.style.display = "none";
}

//底部图片切换
var J_safeAuth = document.querySelector(".J_safeAuth");
setInterval(function () {
    J_safeAuth.classList.add("active");
}, 2000);
setInterval(function () {
    J_safeAuth.classList.remove("active");
}, 4000);

//回顶部
var J_atop = document.getElementById("J_atop");
// 当网页向下滑动 854px 出现"返回顶部" 按钮
window.onscroll = function () {
    scrollFun()
    if (document.documentElement.clientHeight <= 700) {
        $('.home-tool-bar').hide()
    } else {
        $('.home-tool-bar').show()

    }
};

function scrollFun() {
    if (document.body.scrollTop > 854 || document.documentElement.scrollTop > 854) {
        J_atop.classList.add("active");
    } else {
        J_atop.classList.remove("active");
    }
}


function topFun() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//点击返回顶部
J_atop.onclick = function () {
    topFun();
}

for (let i = 0; i < 8; i++) {
    $.ajax({
        type: "get",
        url: "php/getGoodsList.php",
        data: {
            "typeId": `00${i+1}`
        },
        dataType: "json",
        success: function (res) {
            $.each(res, function (index, v) {
                $(`<li class="menu-nav">
                    <em></em>
                    <a href="javascript:;">
                        <div class="figure figure-none">
                            <img src="${v.goodsImg}"
                                alt="${v.goodsName}" width="160" height="110">
                        </div>
                        <div class="title">${v.goodsName}</div>
                        <p>${v.beiyong1}</p>
                    </a>
                </li>`).appendTo('.header-nav-' + i + '')
            });
        }
    });
}


for (let i = 9; i <= 18; i++) {
    $.ajax({
        type: "get",
        url: "php/getGoodsList.php",
        data: {
            "typeId": i >= 10 ? `0${i}` : `00${i}`
        },
        dataType: "json",
        success: function (res) {
            // console.log(res);
            let len = Math.ceil(res.length / 6);
            let str = ''
            let index = -1
            for (let i = 0; i < len; i++) {
                str += '<ul class="com-ul">'
                for (let j = 0; j <= 5; j++) {
                    index++
                    if (index < res.length) {
                        str += ` <li class="com-li">
                            <a href="javascript:;" class="link clearfix">
                            <img src="${res[index]["goodsImg"]}" width="40" height="40">
                            <span class="text">${res[index]["goodsName"]}</span>
                            </a>
                        </li>`
                    } else {
                        break
                    }
                }
                str += '</ul>'
            }
            // console.log(str);
            $('.commodity-' + i + '').html(str)
        }

    });
}


$.ajax({
    type: "get",
    url: "php/getGoodsType.php",
    // data: "data",
    dataType: "json",
    success: function (res) {
        // console.log(res);
    }
});

$.ajax({
    type: "get",
    url: "php/getGoodsListNew.php",
    data: {
        "typeId": "001",
        "count": "7"
    },
    dataType: "json",
    success: function (res) {
        // console.log(res);
    }
});


$.ajax({
    type: "get",
    url: "php/getGoodsList.php",
    data: {
        "typeId": "019"
    },
    dataType: "json",
    success: function (res) {
        $.each(res, function (i, v) {
            // console.log(v);
            $(`<li class="brick-item brick-item-m brick-item-m-2">
                <a href="html/detail.html?${v.goodsId}">
                    <div class="figure figure-img">
                        <img src="${v.goodsImg}" alt="">
                    </div>
                    <h3 class="title">${v.goodsName}</h3>
                    <p class="desc">${v.goodsDesc}</p>
                    <p class="price">
                        <span class="num">${v.beiyong1}</span>
                    </p>
                </a>
            </li>`).appendTo(".brick-list-1")
        });
    }
});
$.ajax({
    type: "get",
    url: "php/getGoodsList.php",
    data: {
        "typeId": "013"
    },
    dataType: "json",
    success: function (res) {
        $.each(res, function (i, v) {
            // console.log(v);
            $(`<li class="brick-item brick-item-m brick-item-m-2">
                <a href="html/detail.html?${v.goodsId}">
                    <div class="figure figure-img">
                        <img src="${v.goodsImg}" alt="">
                    </div>
                    <h3 class="title">${v.goodsName}</h3>
                    <p class="desc">${v.goodsDesc}</p>
                    <p class="price">
                        <span class="num">${v.beiyong1}</span>
                    </p>
                </a>
            </li>`).appendTo(".brick-list-2")
        });
    }
});

let username = $.cookie("vipName")
if (username) {
    console.log(1);
    $(".topbar-info-1").hide()
    $(".topbar-info-2").show()
    $(".user").html(`欢迎你${username}`)
} else {
    console.log(2);
    $(".topbar-info-1").show()
    $(".topbar-info-2").hide()
}

