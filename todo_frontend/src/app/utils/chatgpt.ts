export const fetchTodosFromChatGPT = async (text: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: text }),
        });
        const data = await response.json();
        return data.result || '';
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