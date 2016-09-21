import React from "react";

export default class Faq extends React.Component {
  render() {
    const styles = {
      padding: '40px',
      margin: '0 auto',
      backgroundColor: '#fff',
      width: '800px'
    };


    return (
      <div style={styles}>
        <h2>Tally FAQ's</h2>
        <p><strong>What is Tally for?</strong></p>
        <p>Tally is a website for..</p>

        <p><strong>How do I know that my payment information is secure?</strong></p>
        <p>No credit card information is ever stored on our servers.  We use Stripe.com, one of the most secure and reputable payment processors available. All card numbers are encrypted on Stripe AES-256 and decryption keys are stored on separate machines. None of Stripe's internal servers and daemons are able to obtain plaintext card numbers; instead, they can just request that cards be sent to a service provider on a static whitelist.</p>
        <p>Stripe's infrastructure for storing, decrypting, and transmitting card numbers runs in separate hosting infrastructure and doesn't share any credentials with Stripe's primary services (API, website, etc.) But you don't have to take it from us. <a href='https://stripe.com/docs/security/stripe' target='_blank'>Go to the source.</a></p>

        <p><strong></strong></p>
        <p><strong></strong></p>
        <p><strong></strong></p>
        <p><strong></strong></p>

      </div>
    );
  }
}
