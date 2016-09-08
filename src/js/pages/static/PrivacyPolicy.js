import React from "react";

// https://docs.google.com/document/d/1Swf8VdP3FOHHTO4ENO0-tch9_GxEAddpnTZPYlFV31Y/edit?ts=57d0da47

export default class PrivacyPolicy extends React.Component {
  render() {
    const styles = {
      padding: '40px',
      margin: '0 auto',
      backgroundColor: '#fff',
      width: '800px'
    }

    return (
      <div style={styles}>
        <h2>Tally US Privacy Policy</h2>
        <hr/>
        <p><strong>Your privacy is critically important to us.</strong></p>

        <p>Here is what is important to know:</p>
        <p>We do not ask for your personal information unless we truly need it.</p>
        <p>The Federal Election Commission and U.S. campaign finance laws require us to collect certain information from you. We collect only the information required by law—no more, no less.</p>
        <p>You may choose to use Tally to make a financial contribution to a political candidate or organization. If you do so, we need to collect information about your credit card. To process the payment, we must share this information with our credit card processor.</p>

        <p>If you make a financial contribution to a candidate or organization, we are required to share your personal information with them as well, as required by campaign finance laws.</p>
        <p>We will not sell, rent or otherwise share your personal information with anyone else.</p>

        <p><strong>Information We Collect</strong></p>
        <p>Our Service lets users make financial contributions to political candidate campaigns and political action committees. Federal campaign finance laws require us to collect your name, postal address, phone number, email address, occupation, employer and employer address. As required by law, we pass this information along to the candidates or political action committees to which you contribute.</p>
        <p>We may also use your email address to communicate with you about our products and services. We promise to minimize emails from Tally itself. We will send emails only to provide information about critical situations, or to provide you with customer service.</p>

        <p><strong>Credit Card Information</strong></p>
        <p>To make contributions to political candidates through Tally, we collect certain information about your credit card. This includes the cardholder name, credit card number, expiration date and security code (Card Verification Value, or CVV). We do not store this information. It never hits our servers. This information goes straight over a https connection to <a href='https://www.stripe.com' target='_blank'>Stripe</a>, our credit card processor.</p>

        <p><strong>Analytics</strong></p>
        <p>Like many modern online services, we use analytics software and technologies to operate and improve our Service. Our website uses web storage, a technology that lets us store persistent information inside your browser. Most typically, we use this technology to check to see if you are logged in, or to access information you have provided us before, such as your name.</p>
        <p>We also record <a href='https://en.wikipedia.org/wiki/IP_address' target='_blank'>internet protocol (IP) addresses</a>and <a href='https://en.wikipedia.org/wiki/UDID' target='_blank'>Unique Device IDs (UDIDs)</a>. Logs of IP addresses and UDIDs are typically used for analytic purposes, such as estimating how many people use Tally. We cannot glean personal information from these.</p>
        <p>Lastly, we use third-party analytics vendors, such as <a href='https://www.mixpanel.com' target='_blank'>Mixpanel</a>. These vendors allow us to understand how people use our products. They help us improve features, troubleshoot broken mechanisms and meet business goals. To provide this service, these third-party vendors automatically gather non-identifying information about our users. This information includes operating systems, browser types and geographic locations. Neither we nor the third parties can glean personal information from this data.</p>
      </div>
    );
  }
}
