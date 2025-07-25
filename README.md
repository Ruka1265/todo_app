# Next.js & FastAPI製 ChatGPT APIを利用したTodoアプリ

シンプルなTodo管理アプリです。 
フロントエンドに Next.js、バックエンドに FastAPI、データベースに Supabase（PostgreSQL）を使用して構築しています。
デプロイには Vercel（フロントエンド）と Render（バックエンド）を使用しています。
Todoのcrud機能、ChatGPT APIを利用したTodo自動生成機能 (入力された文章を整理・分割してtodoを複数追加する)を実装済みです。
今後は、レスポンシブ対応・UIの改良・ログイン機能の追加を随時行っていく予定です。

以下のURLから、実際にご使用いただけます。(**ユーザー登録/ログイン機能は今後実装予定のため、Todoは全利用者に共有されます。また、レスポンシブ対応に関しても現時点では未実装のため、スマホやタブレットなどから利用すると表示が崩れることにご注意ください)

https://todo-app-pro-pearl.vercel.app/

---

## 🔧 主な機能

- Todoの新規追加、表示、編集、削除（CRUD機能）
- 編集ボタンを押すとその場でインライン編集が可能（Enterキーで反映）
- Tailwind CSSを用いたスタイリング
- フロントエンドとバックエンドがAPI連携で統合
- ChatGPT APIを利用したTodo自動生成機能(モデルは4oを利用)

## 📝 ライセンス

MIT License

## 👤 作成者

**Ruka1265** - [GitHub](https://github.com/Ruka1265)
