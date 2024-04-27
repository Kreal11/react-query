import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";
import { ITodo } from "../types/todo";

const Todos = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<ITodo>();

  const handleCreatedTodoSubmut: SubmitHandler<ITodo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const handleMarkAsDoneSubmit = (data: ITodo | undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true });
    }
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreatedTodoSubmut)}>
        <h4>New Todo</h4>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Submit"}
        />
      </form>
      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id: {data?.id}</div>
            <span>
              <strong>Title: {data?.title}</strong>, {""}
              <strong>Description: {data?.description}</strong>
            </span>
            <div>
              <button
                onClick={() => handleMarkAsDoneSubmit(data)}
                disabled={data?.checked}
              >
                {data?.checked ? "Done" : "Mark as done"}
              </button>
              {data && data?.id && (
                <button onClick={() => handleDeleteTodo(data.id!)}>
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
