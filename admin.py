from flask import Flask, render_template, request, url_for, flash
from werkzeug.utils import redirect
from flask_mysqldb import MySQL
import json

"""
Loading creds
"""
with open('conf.json', 'r') as file:
    config_data = json.load(file)

app = Flask(__name__)

app.config['MYSQL_HOST'] = config_data["MYSQL_HOST"]
app.config['MYSQL_USER'] = config_data["MYSQL_USER"]
app.config['MYSQL_PASSWORD'] = config_data["MYSQL_PASSWORD"]
app.config['MYSQL_DB'] = config_data["MYSQL_DB"]
app.secret_key = config_data["SECRET_KEY"]

mysql = MySQL(app)

@app.route('/')
def Index():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM students")
    data = cur.fetchall()
    cur.close()

    return render_template('admin.html', students=data)


@app.route('/insert', methods = ['POST'])
def insert():
    if request.method == "POST":
        flash("Data Inserted Successfully")
        name = request.form['name'].upper()
        admission = request.form['adm']
        passport = request.form['passport']
        gender = request.form['gender']
        dob = request.form['dob']
        email = request.form['email']
        phone = request.form['phone']
        postal = request.form['postal']
        stage = request.form['stage']
        billed = request.form['billed']
        paid = request.form['paid']
        balance = request.form['balance']
        course = request.form['course']
        degree = request.form['degree']
        cur = mysql.connection.cursor()
        sql_insert = """
                    INSERT INTO students 
                    (name, admission, passport, gender, dob, email, phone, postal, stage, billed, paid, balance, course, degree) 
                    VALUES 
                    (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """
        data = (name, admission, passport, gender, dob, email, phone, postal, stage, billed, paid, balance, course, degree)
        cur.execute(sql_insert, data)
        mysql.connection.commit()
        return redirect(url_for('Index'))

@app.route('/delete/<string:id_data>', methods = ['GET'])
def delete(id_data):
    flash("Record Has Been Deleted Successfully")
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM students WHERE id=%s", (id_data,))
    mysql.connection.commit()
    return redirect(url_for('Index'))



@app.route('/update', methods= ['POST', 'GET'])
def update():
    if request.method == 'POST':
        flash("Data Inserted Successfully")
        id_data = request.form['id']
        name = request.form['name']
        admission = request.form['adm']
        passport = request.form['passport']
        gender = request.form['gender']
        dob = request.form['dob']
        email = request.form['email']
        phone = request.form['phone']
        postal = request.form['postal']
        stage = request.form['stage']
        billed = request.form['billed']
        paid = request.form['paid']
        balance = request.form['balance']
        course = request.form['course'].upper()
        course = request.form['degree']
        cur = mysql.connection.cursor()
        cur.execute("""
        UPDATE students 
        SET name=%s, admission=%s, passport=%s, gender=%s, dob=%s, email=%s, 
            phone=%s, postal=%s, stage=%s, billed=%s, paid=%s, balance=%s, course=%s, degree=%s
        WHERE id=%s
        """, (name, admission, passport, gender, dob, email, phone, postal, 
              stage, billed, paid, balance, course, degree, id_data))

        flash("Data Updated Successfully")
        return redirect(url_for('Index'))


if __name__ == "__main__":
    app.run(debug=True)