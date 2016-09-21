import React from "react";

export default class Footer extends React.Component {
  render() {
    const style = {
      container: {
        margin: "0 auto",
        padding: "20px"
      },
      ul: {
        clear: 'both'
      },
      li: {
        display: 'inline',
        padding: '0px 10px'
      }
    };

    return (
      <footer style={style.container}>
        <div className="container text-center">
          <ul style={style.ul} className="list-inline">
            <li><a style={style.li} href='privacy_policy'>Privacy Policy</a></li>
            <li><a style={style.li} href='terms_of_service'>TOS</a></li>
            <li><a style={style.li} href='careers'>Careers</a></li>
            <li><a style={style.li} href='faq'>FAQ</a></li>
          </ul>
          <p>&copy; 2016 Tally US Inc.</p>
        </div>
      </footer>
    );
  }
}
