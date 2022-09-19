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
