const Footer = ({ author, subject, teacher, commission }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <strong>{author}</strong> — {subject}
        </p>
        <p>
          Docente: {teacher} | Comisión: {commission}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
