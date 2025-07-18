export const fetchTodosFromChatGPT = async (text: string) => {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'あなたはユーザーがやるべきことをToDoリスト形式に分解するAIアシスタントです。ユーザーの文章から実行すべきToDoを、各行に分けて出力してください。ただし、出力には番号や-を付けず、単なる文章として出力してください。また、なるべく行数（todoの数)は少なくまとめてください。'
                    },
                    {
                        role: 'user',
                        content: text
                    },
                ],
            }),
        })
        const data = await response.json();
        return data.choices?.[0]?.message?.content || '';
    }

export const postTodosFromResponse = async (response: string) => {
        const todos = response
            .split('\n')
            .map( todo => todo.trim())
            .filter(todo => todo.length > 0 && !todo.startsWith('```')
        );

        for (const todo of todos) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title: todo})
            });
        }
    }