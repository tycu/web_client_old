import React from "react";

export default class Faq extends React.Component {
  render() {
    const styles = {
      padding: '40px',
      margin: '0 auto',
      backgroundColor: '#fff',
      width: '800px',
      height: '400px'
    }


    return (
      <div style={styles}>
        <h2>Tally FAQ's</h2>
        <p>Q: What is Tally for?</p>
        <p>A: Tally is a website for..</p>

        <p>Q: How do I know that my payment information is secure?</p>
        <p>A: We use Stripe... (see trello task for stripe faq/secure payments.</p>
      </div>
    );
  }
}
