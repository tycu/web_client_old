import React from "react";

export default class Footer extends React.Component {
  render() {
    const footerStyles = {
      marginTop: "30px",
    };

    return (
      <footer style={footerStyles}>
        <div class="row container text-center">
          <div class="col-lg-12">
            <p>&copy; 2016 Tally.us</p>
          </div>
        </div>
      </footer>
    );
  }
}
