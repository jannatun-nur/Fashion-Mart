

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-base-200 text-white p-10">
  <aside>

    <p>
      Fashion Mart
      <br />
      Providing services since 2003
    </p>
  </aside>
  <nav>
    <h6 className="footer-title text-white">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Delivering</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title text-white">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Updates</a>
  </nav>
  <nav>
    <h6 className="footer-title text-white">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
        </div>
    );
};

export default Footer;