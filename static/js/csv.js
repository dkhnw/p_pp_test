// CSVファイル読み込み
function csvToArray(filename) {

    // CSVファイルを文字列として取得
    var srt = new XMLHttpRequest();
    srt.open("GET", filename, false);
    try {
        srt.send(null);
    } catch (err) {
        console.log(err)
    }

    // 配列を用意
    var csvArr = [];

    // 改行ごとに配列化
    var lines = srt.responseText.split("\n");

    // 1行ごとに処理
    for (var i = 0; i < lines.length; ++i) {
        var cells = lines[i].split(",");
        if (cells.length != 1) {
            csvArr.push(cells);
        }
    }
    return csvArr;
}
