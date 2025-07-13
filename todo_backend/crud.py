from databases import Database
from models import Todo, TodoCreate
from typing import List
from datetime import datetime

database: Database = None

#Todosを取得する関数
async def get_todos() -> List[Todo]:
    query = "SELECT * FROM todos ORDER BY created_at DESC;"
    rows = await database.fetch_all(query=query)
    return [Todo(**row) for row in rows]

#Todoを追加する関数
async def create_todo(todo: TodoCreate) ->Todo:
    query = "INSERT INTO todos (title, created_at) VALUES (:title, :created_at) RETURNING *;"
    values = {"title": todo.title, "created_at": datetime.utcnow()}
    row = await database.fetch_one(query=query, values=values)
    return Todo(**row)

#Todoを更新する関数
async def update_todo(todo_id: int, todo: TodoCreate) -> Todo:
    query ="UPDATE todos SET title = :title WHERE id = :id RETURNING *;"
    values = {"title": todo.title, "id": todo_id}
    row = await database.fetch_one(query=query, values=values)
    return Todo(**row)

#Todoを削除する関数
async def delete_todo(todo_id: int) -> None:
    query = "DELETE FROM todos where id = :id;"
    await database.execute(query=query, values={"id": todo_id})