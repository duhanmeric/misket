export default function TaskControl({ filter, setFilter, setTasks }) {
  return (
    <>
      <div className="filter-group">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "filter-active" : null}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "filter-active" : null}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("done")}
          className={filter === "done" ? "filter-active" : null}
        >
          Done
        </button>
      </div>
      <button className="clear-btn" onClick={() => setTasks([])}>
        Clear
      </button>
    </>
  );
}
