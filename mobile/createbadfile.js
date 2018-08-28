var fs = require('fs'), crypto = require('crypto'), path = "www/assets", subpath = "/" + process.argv[2];
if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    fs.mkdirSync(path + subpath);
    fs.mkdirSync(path + "/img");
    fs.mkdirSync(path + "/data");
}
let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let chr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
num.forEach((element) => {
    let time0 = path + "/img/dataUser." + element + "X" + element + ".jpg";
    let time1 = path + subpath + "/data-" + process.argv[2] + element + "" + element + ".data";
    let time2 = path + subpath + "/data_temp_" + 2 * element + ".jpg";
    let time3 = path + "/data/data-" + process.argv[2] + "." + chr[element] + ".json";
    let hex3 = crypto.createHash('md5').update(time0 + time1 + time2 + time3 + new Date().getTime()).digest("hex");
    fs.writeFile(time0, "data:image/jpeg;base64," + new Buffer(time0 + time1 + time2 + time3 + new Date().getTime()).toString('base64'), function (err) {
        if (err) { return console.log(err); }
    });
    fs.writeFile(time1, new Buffer(time0 + time1 + new Date().getTime(), 'base64'), function (err) {
        if (err) { return console.log(err); }
    });
    fs.writeFile(time2, new Buffer(time2 + time3 + new Date().getTime(), 'base64'), function (err) {
        if (err) { return console.log(err); }
    });
    fs.writeFile(time3, JSON.stringify({ ["temp" + chr[element]]: hex3 }), function (err) {
        if (err) { return console.log(err); }
    });
});

console.log("The file was saved!");