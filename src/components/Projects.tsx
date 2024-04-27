import { useState } from "react";
import { useProjects } from "../services/queries";

const Projects = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isFetching, error, isError, isPlaceholderData } =
    useProjects(page);

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {isError && <div>{error.message}</div>}
      {!isPending && !isError && (
        <div>
          {data.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current page: {page}</span>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
        Previous page
      </button>{" "}
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((prev) => prev + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        Next page
      </button>
      {isFetching ? <span>Loading...</span> : null}{" "}
    </div>
  );
};

export default Projects;
