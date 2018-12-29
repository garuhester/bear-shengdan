
var playvideo = $(".playvideo");
var close = $(".close");

initClick();

function initVideo(src) {
    console.log(src);
    document.getElementById("bear-video").src = '/yuandan/video/' + src;
}

function initClick() {
    close.click(function () {
        closeVideo();
    });
    playvideo.click(function () {
        closeVideo();
    });
    $("#chimee-container .infos").click(function () {
        closeVideo();
    });
    $("#chimee-container").click(function () {
        window.event.stopPropagation();
    });
    $(".bearvideos .videos .video .left").click(function () {
        var pic = $(this).children(".pic");
        var imgName = pic.attr("src");
        imgName = imgName.replace("/yuandan/video/", "").split(".")[0];

        $(".playvideo .infos .title").text("元旦跨年礼物");
        $(".playvideo .infos .info").text("");

        //统计
        openUrl('', 0, '视频 - 元旦跨年礼物');

        initVideo(imgName + ".mp4");

        playvideo.addClass("active");
        $("#chimee-container").removeClass("disactive");
        $("#bear-video").removeClass("disactive");
    });
}

function closeVideo() {
    document.getElementById("bear-video").pause();
    playvideo.removeClass("active");
    $("#chimee-container").addClass("disactive");
    $("#bear-video").addClass("disactive");
}
