var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,//事件名称
    number: { type: Number, default: 0 },//事件点击次数
    clickTime: String,//事件点击日期
    createTime: { type: Date, default: Date.now } //创建时间
});

module.exports = mongoose.model("User", UserSchema);