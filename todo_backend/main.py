from fastapi import FastAPI, HTTPException, Path
from database import database
from models import Todo, TodoCreate
import crud


app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

# CORSミドルウェアの設定
# 本番環境では適切なオリジンを設定すること
# ここでは開発中のため全てのオリジンを許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番ではセキュリティのために絞るべき
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# データベース接続の初期化
@app.on_event("startup")
async def startup():
    await database.connect()
    crud.database = database

# データベース接続の切断
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

# todosを取得、追加、更新、削除するエンドポイントの定義
@app.get("/todos", response_model=list[Todo])
async def select_todos():
    try:
        todos = await crud.get_todos()
        return todos
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/todos", response_model=Todo)
async def post_todo(todo: TodoCreate):
    try:
        new_todo = await crud.create_todo(todo)
        return new_todo
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.put("/todos/{id}", response_model=Todo)
async def update_todo(id: int, todo:TodoCreate):
    try:
        updated_todo = await crud.update_todo(id, todo)
        return updated_todo
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/todos/{id}")
async def delete_todo(id: int = Path(..., description="削除するTodoのID")):
    try:
        await crud.delete_todo(id)
        return{"message": "Todo with ID {id} deleted successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))