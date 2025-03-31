import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client";
import { TodoList } from "../modules/todo-list/todo-list";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
     <TodoList />
    </QueryClientProvider>
  );
};

