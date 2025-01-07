const Footer = () => {
  return (
    <footer className="footer">
      <div
        className="content has-text-centered"
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "rgb(159, 172, 185)",
          textAlign: "center",
        }}
      >
        <p>
          <strong>Pokemon App</strong> by{" "}
          <a href="https://github.com/DeveloperWK">DEVELOPER.WK</a>. The source
          code is licensed{" "}
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
          website content is licensed{" "}
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            CC BY NC SA 4.0
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
