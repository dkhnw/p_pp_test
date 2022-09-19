var v_list = []
var pro_v = ""
var pas_v = ""
var meaning = ""
var pas_v_arr = []
const p_or_pp = document.getElementById("p_or_pp").getAttribute('content')
const t_or_p = document.getElementById("test_or_practice").getAttribute('content')
var fail = false
var ca_music = new Audio('static/audio/Quiz_Correct_Answer02_1.mp3');
var wb_music = new Audio('static/audio/Quiz_Wrong_Buzzer02_1.mp3');
var pro_read_audio = new Audio('static/audio/read_prototype.mp3');
var pas_read_audio = new Audio('static/audio/read_past_tense.mp3');

// ボタンを押すと、ブロック内のプログラムが実行される
$("#check").on("click", function () {
    const answer = document.getElementById("answer").value
    let pass_or_fail = ""
    const next_btn = document.getElementById("next")
    if (pas_v_arr.indexOf(answer.toLowerCase()) >= 0) {
        pass_or_fail = "正解です。"
        next_btn.style.visibility = 'visible';
        next_btn.focus();
        document.getElementById('correct_img').style.display = "none";
        document.getElementById('incorrect_img').style.display = "none";
        ca_music.play();
        $('#correct_img').fadeIn();
    } else {
        pass_or_fail = "不正解です。"
        next_btn.style.visibility = 'hidden';
        t_input = document.getElementById('nisemono_answer');
        t_input.focus();
        t_input.setSelectionRange(t_input.value.length, t_input.value.length);
        fail = true
        document.getElementById('correct_img').style.display = "none";
        document.getElementById('incorrect_img').style.display = "none";
        wb_music.play();
        $('#incorrect_img').fadeIn();
    }
    // jQueryを使って画面にメッセージを表示する
    document.getElementById("collect_answer").textContent = pas_v;
    document.getElementById("meaning").textContent = meaning;
    document.getElementById('ca_div').style.visibility = 'visible';
    answer_pronounce()
});

// ボタンを押すと、ブロック内のプログラムが実行される
$("#next").on("click", function () {
    if (t_or_p === "test" && !fail) {
        v_list.shift();
    }
    set_question();
});

window.onload = function () {
    var csv_filepath = ""
    if (p_or_pp === "p") {
        csv_filepath = "static/csv/p_test.csv"
    } else {
        csv_filepath = "static/csv/pp_test.csv"
    }
    var q_list = []
    for (var item of document.getElementsByClassName('q_list')) {
        q_list.push(item.getAttribute('content'))
    }
    var tmp_v_list = csvToArray(csv_filepath);
    for (var i = 0; i < tmp_v_list.length; ++i) {
        if (q_list.includes(tmp_v_list[i][0])) {
            v_list.push(tmp_v_list[i]);
        }
    }
    if (v_list.length == 0) {
        window.location.href = 'https://sukaisha.com/p_pp_test';
    } else {
        set_question();
    }
}

function set_question() {
    if (v_list.length > 0) {
        v_list = arrayShuffle(v_list)
        pro_v = v_list[0][0]
        pas_v = DeleteNewLine(v_list[0][1])
        pas_v_arr = pas_v.split("/")
        meaning = DeleteNewLine(v_list[0][2])
        fail = false

        document.getElementById("prototype_verb").textContent = pro_v;
        document.getElementById("answer").value = ""
        document.getElementById("nisemono_answer").value = ""
        document.getElementById('nisemono_answer').focus();
        document.getElementById("collect_answer").textContent = "";
        document.getElementById("next").style.visibility = 'hidden';
        document.getElementById('correct_img').style.display = "none";
        document.getElementById('incorrect_img').style.display = "none";
        document.getElementById('ca_div').style.visibility = 'hidden';

        question_pronounce()
    } else {
        alert("全問正解！")
        window.location.reload();
    }
}

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

// 配列のシャッフル
function arrayShuffle(array) {
    for (var i = (array.length - 1); 0 < i; i--) {

        // 0〜(i+1)の範囲で値を取得
        var r = Math.floor(Math.random() * (i + 1));

        // 要素の並び替えを実行
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}

function DeleteNewLine(myLen) {
    var newLen = '';
    for (var i = 0; i < myLen.length; i++) {
        text = escape(myLen.substring(i, i + 1));
        if (text != "%0D" && text != "%0A") {
            newLen += myLen.substring(i, i + 1);
        }
    }
    return (newLen);
}

function checkForm($this) {
    document.getElementById("answer").value = $this.value;
}

'use strict'
function pronounce(script) {
    var u = new SpeechSynthesisUtterance();
    if (speechSynthesis.getVoices().filter(voice => voice.name === "Google US English").length) {
        u.voice = speechSynthesis.getVoices().filter(voice => voice.name === "Google US English")[0]
    } else if (speechSynthesis.getVoices().filter(voice => voice.lang === "en-US").length > 0) {
        u.voice = speechSynthesis.getVoices().filter(voice => voice.lang === "en-US")[0]
    }
    u.text = script;
    speechSynthesis.speak(u);
}

'use strict'
function pronounce_smartphone(script) {
    var u = new SpeechSynthesisUtterance();
    u.lang = 'en-US';
    u.text = script;
    speechSynthesis.speak(u);
}

function isSmartphone() {
    var regexp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    if (window.navigator.userAgent.search(regexp) !== -1) {
        return true;
    } else {
        return false;
    }
}
function question_pronounce() {
    if (pro_v === "read") {
        pro_read_audio.play();
    } else if (isSmartphone()) {
        pronounce(pro_v);
    }
    else {
        // pronounce_smartphone(pro_v);
        pronounce(pro_v);
    }
}

function answer_pronounce() {
    if (pas_v === "read") {
        pas_read_audio.play();
    } else if (isSmartphone()) {
        pronounce(pas_v);
    }
    else {
        // pronounce_smartphone(pas_v);
        pronounce(pas_v);
    }
}