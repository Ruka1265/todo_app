from sqlalchemy import create_engine, MetaData
from databases import Database
import os
from dotenv import load_dotenv

#.envから環境変数を読み込む
load_dotenv()

# データベースのURLを取得
DATABASE_URL = os.getenv("DATABASE_URL")

#非同期データベース接続とSQLAlchemyエンジンの作成
database = Database(DATABASE_URL)
engine = create_engine(DATABASE_URL)
metadata = MetaData()