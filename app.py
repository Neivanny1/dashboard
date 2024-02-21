#/usr/bin/python3 
from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.utils import redirect
from flask_mysqldb import MySQL
import MySQLdb.cursors
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
"""
Handles logins to app
"""
msg = ''
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM students WHERE admission = %s AND admission = %s', (username, password,))
        account = cursor.fetchone()

        if account:
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['name']
            session['adm'] = account['admission']
            return redirect(url_for('dashboard'))
        else:
            msg = 'Incorrect username/password!'
            print(msg)

    return render_template('test.html')

@app.route('/dashboard')
def dashboard():
    if 'loggedin' in session:
        admission_number = session['adm'] 
        query = "SELECT * FROM students WHERE admission = %s"
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute(query, (admission_number,))
        user_data = cursor.fetchone()
        cursor.close()
        return render_template('Dashboard.html', user=user_data)
    else:
        return redirect(url_for('login'))

@app.route('/dash')
def dash():
    render_template('Dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)