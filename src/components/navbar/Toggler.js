function Toggler() {
  return (
    <button
      className="navbar-toggler me-auto"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbar"
      aria-controls="navbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
}

export default Toggler;