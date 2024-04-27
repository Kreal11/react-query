import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateTodo } from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";
import { ITodo } from "../types/todo";

const Todos = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const createTodoMutation = useCreateTodo();

  const { register, handleSubmit } = useForm<ITodo>();

  const handleCreatedTodoSubmut: SubmitHandler<ITodo> = (data) => {
    createTodoMutation.mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreatedTodoSubmut)}>
        <h4>New Todo</h4>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id: {data?.id}</div>
            <span>
              <strong>Title: {data?.title}</strong>, {""}
              <strong>Description: {data?.description}</strong>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
