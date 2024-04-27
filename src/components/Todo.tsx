import { useTodos, useTodosIds } from "../services/queries";

const Todo = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  return (
    <div>
      {/* {todosIdsQuery.data.map((id) => (
        <p key={id}>id: {id}</p>
      ))} */}

      {todosQueries.map(({ data }) => (
        <li key={data?.id}>
          <div>Id: {data?.id}</div>
          <span>
            <strong>Title: {data?.title}</strong>, {""}
            <strong>Description: {data?.description}</strong>
          </span>
        </li>
      ))}
    </div>
  );
};

export default Todo;
