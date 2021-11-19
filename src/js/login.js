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
        e.preventDefault();
        $.post("../php/login.php", {
                "username": $("#user").val(),
                "userpass": $("#pass").val()
            },
            function (data, textStatus, jqXHR) {
                $.cookie('vipName', $("#user").val(), { expires: 7 });
                console.log(data);
                if (data == "success") {
                    location.href = "../index.html"
                } else {
                    alert("登录失败请重新登录")
                };
            },
            // "json"
        );
    } else {
        alert("请你同意用户条款")
    }

});

