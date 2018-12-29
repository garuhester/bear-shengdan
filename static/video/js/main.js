
var playvideo = $(".playvideo");
var close = $(".close");

initClick();

function initVideo(src) {
    document.getElementById("bear-video").src = '/video/' + src;
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
    $(".video .right .view").click(function () {
        var right = $(this).parent();
        var pic = $(this).parent().parent().children(".left").children(".pic");
        var imgName = pic.attr("src");
        imgName = imgName.substring(imgName.indexOf("video/")).replace("video/", "").split(".")[0];

        var title = right.children(".title").text();
        var info = right.children(".info").text();
        $(".playvideo .infos .title").text(title);
        $(".playvideo .infos .info").text(info);

        //统计
        openUrl('', 0, '视频 - ' + title);

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

var NUMBER_OF_LEAVES = 50;
function init() {
    var container = document.getElementById('leafContainer');
    for (var i = 0; i < NUMBER_OF_LEAVES; i++) {
        container.appendChild(createALeaf());
    }
}

function randomInteger(low, high) {
    return low + Math.floor(Math.random() * (high - low));
}
function randomFloat(low, high) {
    return low + Math.random() * (high - low);
}
function pixelValue(value) {
    return value + 'px';
}
function durationValue(value) {
    return value + 's';
}
function createALeaf() {
    var leafDiv = document.createElement('div');
    var image = document.createElement('img');
    image.src = '/video/img/s' + randomInteger(1, 5) + '.png';
    leafDiv.style.top = "-10px";
    leafDiv.style.left = pixelValue(randomInteger(0, 1000));
    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
    leafDiv.style.webkitAnimationName = 'fade, drop';
    image.style.webkitAnimationName = spinAnimationName;
    var fadeAndDropDuration = durationValue(randomFloat(10, 15));
    var spinDuration = durationValue(randomFloat(10, 15));
    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;
    var leafDelay = durationValue(randomFloat(0, 5));
    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;
    image.style.webkitAnimationDuration = spinDuration;
    leafDiv.appendChild(image);
    return leafDiv;
}

window.addEventListener('load', init);