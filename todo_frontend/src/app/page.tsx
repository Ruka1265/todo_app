'use client';

import { useState, useEffect} from 'react';
import { fetchTodosFromChatGPT, postTodosFromResponse } from './utils/chatgpt';

//Todoの型定義
type Todo = {
    id: number;
    title: string;
    created_at: string;
};

//アクセス時の表示
export default function Home() {

    //useStateを使用して状態を管理
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState('');
    const [genInput, setGenInput] = useState('');
    const [loading, setLoading] = useState(false);

    //APIからTodoリストを取得する関数
    async function fetchTodos() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
        const data = await res.json();
        setTodos(data);
    }

    //useEffectを使用して初期描画時にデータを取得・更新
    useEffect(() => {
        fetchTodos();
    }, []);

    //Todoの追加処理
    const handleAdd = async () => {
        // 入力が空の場合は何もせず終了
        if (!input.trim()) return;

        // APIにPOSTリクエストを送信して新しいTodoを追加
        await fetch((`${process.env.NEXT_PUBLIC_API_URL}/todos`), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: input})
        });
        
        // 入力フィールドをクリアし、Todoリストを再取得
        setInput('');
        fetchTodos();
    };

    //Todoの更新処理
    const handleUpdate = async (id: number, title: string) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title})
        });
        await fetchTodos();
        setEditingId(null);
    }

    //Todoの削除処理
    const handleDelete = async (id: number) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
        method: 'DELETE',
        });

        fetchTodos();
    }

    //ChatGPTを使用してTodoを生成する処理
    const handleGenerateTodos = async () => {
        if (!genInput.trim()) return;

        setLoading(true);
        try {
            const response = await fetchTodosFromChatGPT(genInput);
            if (!response) {
                console.error('ChatGPTからの応答が空です');
                setLoading(false);
                return;
            }
            console.log(response);
            await postTodosFromResponse(response);
            setGenInput('');
            fetchTodos();
        } catch (error) {
            console.error('Todoの生成に失敗しました', error);
        }
        setLoading(false);
    };

    //ページのメインコンテンツを返す
    return (
        <main className="flex flex-col items-center p-8">
            <h1 className="my-2 text-4xl font-bold">My Todos</h1>
            <div className="my-2">
            <input type="text"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="新しいtodoを入力してください" 
                     className="w-sm border border-gray-400 px-2 py-1 rounded" />
            <button onClick={handleAdd} className="ml-2 border border-gray-400 px-2 py-1 rounded" >追加</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {editingId === todo.id ? (
                            <input
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleUpdate(todo.id, editingText);
                                    }
                                }}
                                autoFocus
                                className="my-2 w-md border border-gray-400 px-2 py-1 rounded"
                            />
                        ) : (
                            <div className="my-2">
                            {todo.title}
                            <button onClick={() => {
                                setEditingId(todo.id);
                                setEditingText(todo.title);
                            }}
                            className="ml-2 border border-gray-400 px-2 py-1 rounded" >変更</button>
                            <button onClick={() => handleDelete(todo.id)} className="ml-2 border border-gray-400 px-2 py-1 rounded" >削除</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="my-4">
                <input
                    type="text"
                    value={genInput}
                    onChange={(e) => setGenInput(e.target.value)}
                    placeholder="やるべきことを書いてください（例：明日までに部屋を片付けてレポートを書く）"
                    className="w-2xl border border-blue-400 px-2 py-1 rounded"
                />
                <button
                    onClick={handleGenerateTodos}
                    className="ml-2 border border-blue-400 px-2 py-1 rounded"
                >
                    ChatGPTでTodoを生成
                </button>
                {loading && <p className="text-gray-600">生成中...</p>}
            </div>
        </main>
    );
};