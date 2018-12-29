function openUrl(url, type, name) {
    $.ajax({
        method: "post",
        url: "/click",
        data: {
            name: name
        },
        success: function (data) {
            if (type == 1) {
                window.location.href = url;
            }
        }
    });
}