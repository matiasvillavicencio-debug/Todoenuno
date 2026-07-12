const Card = ({ title, subtitle, tag, accentClass = 'accent-default', children }) => {
  return (
    <article className={`card ${accentClass}`}>
      <div className="card-header">
        {tag && <span className="card-tag">{tag}</span>}
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      <div className="card-body">{children}</div>
    </article>
  );
};

export default Card;