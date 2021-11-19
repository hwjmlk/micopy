$('#user').blur(function () {
    $('.user-p').show()
    $.ajax({
        type: "get",
        url: "../php/checkUser.php",
        data: "$('#user').val()",
        success: function (res) {
            if (res == 1) {
                $('.user-p').css({
                    "color": "green"
                })
                $('.user-p').html("该用户名可以使用")
            } else {
                $('.user-p').html("该用户名已经被人注册过了")
            }

            if ($('#user').val() == "") {
                $('.user-p').css({
                    "color": "#6f2e09"
                })
                $('.user-p').html("请输入账号")
            }
        }
    });
});



$(".checkbox-input").change(function (e) {
    if ($('#user').val() != "" && $('#pass').val() != "" && $(".checkbox-input").attr("checked", true)) {
        $(".submit").css({
            "background": "#e3641d",
            "color": "#fff"
        })
    } else {
        $(".submit").css({
            "background": "#633114",
            "color": "#636160"
        })
    }
});


$(".submit").click(function (e) {
    if ($(".checkbox-input").prop("checked") == true) {
        $.ajax({
            type: "post",
            url: "../php/addUser.php",
            data: {
                "username": $("#user").val(),
                "userpass": $("#pass").val()
            },
            // dataType: "dataType",
            success: function (res) {
                if (res=="success") {
                    alert("注册成功")
                    location.href = "../html/login.html"
                } else {
                    alert("你已经有账号,可以直接登录")
                    location.href = "../html/login.html"
                };
            }
        });
    } else {
        alert("请你同意用户条款")
    }
});