import React from "react";

export default class Footer extends React.Component {
  render() {
    const footerStyles = {
      margin: "0 auto",
      padding: "25px"
    };

    return (
      <footer style={footerStyles}>
        <div class="container text-center">
          <p>&copy; 2016 Tally.us</p>
        </div>
      </footer>
    );
  }
}
