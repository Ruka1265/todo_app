# Next.js & FastAPI製 Todoアプリ

シンプルなTodo管理アプリです。 
フロントエンドに Next.js、バックエンドに FastAPI、データベースに Supabase（PostgreSQL）を使用して構築しています。
デプロイには Vercel（フロントエンド）と Railway（バックエンド）を使用しています。
Todoのcrud機能、ChatGPT APIを利用したTodo自動生成機能 (入力された文章を整理・分割してtodoを複数追加する)を実装済みです。
今後は、レスポンシブ対応・UIの改良・ログイン機能の追加を随時行っていく予定です。

以下のURLから、実際にご使用いただけます。
https://todo-app-pro-pearl.vercel.app/

---

## 🔧 主な機能

- Todoの新規追加、表示、編集、削除（CRUD機能）
- 編集ボタンを押すとその場でインライン編集が可能（Enterキーで反映）
- Tailwind CSSを用いたスタイリング
- フロントエンドとバックエンドがAPI連携で統合
- ChatGPT APIを利用したTodo自動生成機能
