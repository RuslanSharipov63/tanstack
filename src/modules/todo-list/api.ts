const BASE_URL = 'http://localhost:3000';

export type PaginatedResult<T> = {
        first: number,
        prev: number | null,
        next: number | null,
        last: number,
        pages: number,
        items: number,
        data: T[],  
} 

export type TodoDto = {
    id: string;
    text: string;
    done: boolean;
  };

export const todoListApi = {
    getTodoList: (
        {page}:{page: number}, 
        {signal}: {signal: AbortSignal}) => {
        return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=10`, {
            signal
        }).then(res => res.json() as Promise <PaginatedResult<TodoDto>>);
    }
}