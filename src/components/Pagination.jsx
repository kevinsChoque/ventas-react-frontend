const Pagination = ({ currentPage, lastPage, total, fetchClients }) => {
  return (
    <div className="d-flex justify-content-between align-items-center my-3 px-2">
      {/* Total */}
      <div>Total {total}</div>
      {/* Controles */}
      <div className="d-flex align-items-center gap-2">
        {/* Anterior */}
        <button
          className="btn btn-light"
          disabled={currentPage === 1}
          onClick={() => fetchClients(currentPage - 1)}
        >
          ‹
        </button>
        {/* Números */}
        {Array.from({ length: lastPage }, (_, i) => i + 1)
          .slice(Math.max(0, currentPage - 3), currentPage + 2)
          .map(page => (
            <button
              key={page}
              className={`btn ${
                currentPage === page ? "btn-primary" : "btn-light"
              }`}
              onClick={() => fetchClients(page)}
            >
              {page}
            </button>
          ))}
        {/* Siguiente */}
        <button
          className="btn btn-light"
          disabled={currentPage === lastPage}
          onClick={() => fetchClients(currentPage + 1)}
        >
          ›
        </button>
      </div>
    </div>
  )
}
export default Pagination;
