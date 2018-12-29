var User = require("../schemas/user");
var dayjs = require("dayjs");

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.get("/", function (req, res) {
        res.render("index");
    });
    app.get("/video", function (req, res) {
        res.render("video");
    });
    app.get("/charts", function (req, res) {
        res.render("charts");
    });
    app.get("/admin", function (req, res) {
        var currentPage = req.query.page || 1;
        var gotoUrl = "/admin/?page=";
        var data = {};
        //一页最大条数
        var pageSize = 50;
        var skipNum = (currentPage - 1) * pageSize;
        //页面跳转字符
        data.goto = gotoUrl;
        //当前页码
        data.currentPage = currentPage;
        User.find({}).skip(skipNum).limit(pageSize).sort({ 'createTime': -1 }).exec(function (err, user) {
            data.user = user;
            User.count({}, function (err, q) {
                data.allPage = (q % pageSize == 0) ? ~~(q / pageSize) : ~~((q / pageSize) + 1);
                if (data.allPage == 0) {
                    data.allPage = 1;
                }
                res.render("admin", {
                    data,
                });
            });
        });
    });
    app.post("/click", function (req, res) {
        var name = req.body.name;
        var date = dayjs().format('YYYY-MM-DD');
        User.findOne({ name: name, clickTime: date }, function (err, u) {
            if (u == null) {
                var user = new User({
                    name: name,
                    clickTime: date
                });
                user.save(function () {
                    addNumber(name, date);
                });
            } else {
                addNumber(name, date);
            }
        });
        res.json({ result: 1 });
    });
    app.post("/clear-data", function (req, res) {
        User.remove({}, function (err, user) { res.json({ result: 1 }); });
    });
    app.post("/getChartsData", function (req, res) {
        User.find({}, function (err, user) {
            res.json({ result: user });
        });
    });
}

function addNumber(name, date) {
    User.findOneAndUpdate({ name: name, clickTime: date }, { '$inc': { number: 1 } }, function (err, user) { });
}