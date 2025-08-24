import os
import json
from typing import cast
from datetime import date
from flask import Flask, render_template, request, jsonify
from todo_api.domain.entity.entity import Task
from todo_api.domain.usecase import OperationInteractor

from todo_api.memdb.memdb import MemDB

def date_serializer(obj):
    if isinstance(obj, date):
        return obj.isoformat()
    raise TypeError(f"Object of type {type(obj)} is not JSON serializable")

webroot = os.environ.get("WEBROOT", "./public")

db = MemDB()
op = OperationInteractor(db)

app = Flask(
    __name__,
    static_url_path="",
    static_folder=webroot,
    template_folder=webroot,
)

# index.html
@app.route("/")
def index():
    return render_template("index.html")


# 未完了のタスクの一覧を表示する
# GET /api/tasks
@app.route("/api/tasks", methods=["GET"])
def show_remained_tasks():
    tasks = op.show_tasks()
    # 日付をISO形式の文字列に変換
    result = []
    for task in tasks:
        task_dict = dict(task)
        if task_dict.get('expire') and isinstance(task_dict['expire'], date):
            task_dict['expire'] = task_dict['expire'].isoformat()
        result.append(task_dict)
    return jsonify(result)


# タスクを登録する
# POST /api/tasks
@app.route("/api/tasks", methods=["POST"])
def append_task():
    task_data = request.get_json()
    task = cast(Task, task_data)
    
    # 文字列の日付をdate型に変換
    if task.get('expire') and isinstance(task['expire'], str):
        try:
            task['expire'] = date.fromisoformat(task['expire'])
        except ValueError:
            task['expire'] = None
    
    new_task = op.create_task(task)
    
    # レスポンス用に日付を文字列に変換
    result = dict(new_task)
    if result.get('expire') and isinstance(result['expire'], date):
        result['expire'] = result['expire'].isoformat()
    
    return jsonify(result)


# タスクを完了にする
# PATCH /api/tasks/<タスクのID>/done
@app.route("/api/tasks/<int:task_id>/done", methods=["PATCH"])
def done_task(task_id: int):
    task = op.done_task(task_id)
    
    # レスポンス用に日付を文字列に変換
    result = dict(task)
    if result.get('expire') and isinstance(result['expire'], date):
        result['expire'] = result['expire'].isoformat()
    
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)