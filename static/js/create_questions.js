window.onload = function () {
	// 引数に指定したclassの値をもつ要素をすべて取得
	const menus = document.getElementsByClassName('title');
	// 上記で取得したすべての要素に対してクリックイベントを適用
	for (let i = 0; i < menus.length; i++) {
		menus[i].onclick = resize_content_height;
	}

	var csv_filepath = "static/csv/verb_list.csv";
	var v_list = csvToArray(csv_filepath);
	let ih = [];
	ih.push("");
	ih.push("");
	ih.push("");
	ih.push("");
	for (var item of v_list) {
		if (item[1] == 1) {
			ih[0] += "<label class=\"section_label\"><input type=\"checkbox\" value=\"" + item[0] + "\" class=\"section_input\" onclick=\"DisChecked(this)\">" + item[0] + "</label>"
		} else if (item[1] == 2) {
			ih[1] += "<label class=\"section_label\"><input type=\"checkbox\" value=\"" + item[0] + "\" class=\"section_input\" onclick=\"DisChecked(this)\">" + item[0] + "</label>"
		} else if (item[1] == 3) {
			ih[2] += "<label class=\"section_label\"><input type=\"checkbox\" value=\"" + item[0] + "\" class=\"section_input\" onclick=\"DisChecked(this)\">" + item[0] + "</label>"
		} else if (item[1] == 4) {
			ih[3] += "<label class=\"section_label\"><input type=\"checkbox\" value=\"" + item[0] + "\" class=\"section_input\" onclick=\"DisChecked(this)\">" + item[0] + "</label>"
		}
	}
	var no1_content = document.getElementsByClassName('no1_label')[0].nextElementSibling;
	var no2_content = document.getElementsByClassName('no2_label')[0].nextElementSibling;
	var no3_content = document.getElementsByClassName('no3_label')[0].nextElementSibling;
	var no4_content = document.getElementsByClassName('no4_label')[0].nextElementSibling;
	no1_content.innerHTML += ih[0];
	no2_content.innerHTML += ih[1];
	no3_content.innerHTML += ih[2];
	no4_content.innerHTML += ih[3];
}

function resize_content_height() {
	var title_label = this;
	var checkbox_input = title_label.previousElementSibling;
	var content_div = title_label.nextElementSibling;
	var parent_option_div = title_label.parentNode.parentNode.parentNode;
	let scroll_h = 0;
	if (checkbox_input.checked) {
		scroll_h = 0 - content_div.clientHeight;
		content_div.style.maxHeight = "0pt"
		// 500ptにつき1s
		content_div.style.transitionDuration = String(Math.max(content_div.scrollHeight / 500, 0.5)) + "s"
	} else {
		scroll_h = content_div.scrollHeight - content_div.clientHeight;
		content_div.style.maxHeight = String(content_div.scrollHeight) + "pt";
		content_div.style.transitionDuration = String(Math.max(content_div.scrollHeight / 500, 0.5)) + "s"
	}

	while (true) {
		if (parent_option_div.className == "option") {
			title_label = parent_option_div.getElementsByClassName("title")[0];
			checkbox_input = title_label.previousElementSibling;
			content_div = title_label.nextElementSibling;
			parent_option_div = title_label.parentNode.parentNode.parentNode;
			content_div.style.maxHeight = String(content_div.scrollHeight + scroll_h) + "pt";
			content_div.style.transitionDuration = String(Math.max((content_div.scrollHeight + scroll_h) / 500, 0.5)) + "s"
		} else {
			break;
		}
	}
}

// 「全て選択」チェックで全てにチェック付く
function AllChecked($this) {
	var parent_content_div = $this.parentNode.parentNode;
	var all = $this.checked;
	var section_input = parent_content_div.getElementsByClassName('section_input');
	for (var i = 0; i < section_input.length; i++) {
		section_input[i].checked = all;
	}
}

// 一つでもチェックを外すと「全て選択」のチェック外れる
function DisChecked($this) {
	var parent_content_div = $this.parentNode.parentNode;
	var section_input = parent_content_div.getElementsByClassName('section_input');
	var all_input = parent_content_div.getElementsByClassName('select_all_input')[0];
	var checksCount = 0;
	for (var i = 0; i < section_input.length; i++) {
		if (section_input[i].checked == false) {
			all_input.checked = false;
		} else {
			checksCount += 1;
			if (checksCount == section_input.length) {
				all_input.checked = true;
			}
		}
	}
}

// ボタンを押すと、ブロック内のプログラムが実行される
function submit_form() {
	var test_type = document.getElementById("test_type").getAttribute('content')
	var form = document.createElement('form');
	var request = document.createElement('input');
	form.method = 'POST';
	form.action = 'https://sukaisha.com/p_pp_test/' + test_type;

	var input_list = document.getElementsByClassName('section_input');
	var v_list = ""
	for (var i = 0; i < input_list.length; i++) {
		if (input_list[i].checked) {
			if (v_list !== "") {
				v_list += ",";
			}
			v_list += input_list[i].value;
		}
	}
	request.type = 'hidden'; //入力フォームが表示されないように
	request.name = 'v_list';
	request.value = v_list;
	form.appendChild(request);
	document.body.appendChild(form);

	form.submit();
}