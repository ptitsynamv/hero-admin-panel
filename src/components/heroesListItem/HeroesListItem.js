const HeroesListItem = ({ name, description, element, onDeleteHero }) => {
  let elementClassName;

  switch (element) {
    case 'fire':
      elementClassName = 'bg-danger bg-gradient';
      break;
    case 'water':
      elementClassName = 'bg-primary bg-gradient';
      break;
    case 'wind':
      elementClassName = 'bg-success bg-gradient';
      break;
    case 'earth':
      elementClassName = 'bg-secondary bg-gradient';
      break;
    default:
      elementClassName = 'bg-warning bg-gradient';
  }

  return (
    <li
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
    >
      <img
        src="https://plus.unsplash.com/premium_photo-1673641895483-2119e6d9fd75?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ objectFit: 'cover' }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
        <button
          type="button"
          className="btn-close btn-close"
          aria-label="Close"
          onClick={onDeleteHero}
        ></button>
      </span>
    </li>
  );
};

export default HeroesListItem;
