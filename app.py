from crypt import methods
from flask import Flask
from flask import render_template, request, redirect

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/p_test", methods=['GET', 'POST'])
def p_test():
    if request.method == 'GET':
        return redirect("/p_pp_test")
    elif request.method == 'POST':
        v_list = request.form.get("v_list").split(",")
        return render_template("p_test.html", v_list=v_list)

@app.route("/p_practice", methods=['GET', 'POST'])
def p_practice():
    if request.method == 'GET':
        return redirect("/p_pp_test")
    elif request.method == 'POST':
        v_list = request.form.get("v_list").split(",")
        return render_template("p_practice.html", v_list=v_list)

@app.route("/pp_test", methods=['GET', 'POST'])
def pp_test():
    if request.method == 'GET':
        return redirect("/p_pp_test")
    elif request.method == 'POST':
        v_list = request.form.get("v_list").split(",")
        return render_template("pp_test.html", v_list=v_list)

@app.route("/pp_practice", methods=['GET', 'POST'])
def pp_practice():
    if request.method == 'GET':
        return redirect("/p_pp_test")
    elif request.method == 'POST':
        v_list = request.form.get("v_list").split(",")
        return render_template("pp_practice.html", v_list=v_list)

@app.route("/voice")
def voice():
    return render_template("voice.html")

@app.route("/qanavi")
def qanavi():
    return render_template("qanavi.html")

@app.route("/create_<test_type>")
def create_questions(test_type):
    if test_type in ["p_test", "p_practice", "pp_test", "pp_practice"]:
        return render_template("create_questions.html", test_type=test_type)
    else:
        return redirect("/p_pp_test")

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404