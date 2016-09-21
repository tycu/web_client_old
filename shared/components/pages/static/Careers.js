import React from "react";

export default class Careers extends React.Component {
  render() {
    const styles = {
      padding: '40px',
      margin: '0 auto',
      backgroundColor: '#fff',
      width: '800px'
    };

    return (
      <div style={styles}>
        <h2>Work at Tally US</h2>
        <hr/>
        <p>Tally is a small team, but we're always on the hunt for top Talent. We have needs in the following areas:</p>
        <ul>
          <li><strong>Full Stack Engineer</strong></li>
          <li><strong>Design</strong></li>
          <li><strong>Journalism/Media</strong></li>
          <li><strong>Marketing and Community Management</strong></li>
          <li><strong>Sales</strong></li>
        </ul>

        <h3>Full Stack Engineers</h3>
        <p>We use node and postgresql, and redis on the backend. We're running react, webpack, es6, babel, and flux on the front end. We use git and work on a distributed team. We are open to remote hires and pride outselves on getting a lot done with a small team. We do not waste time arguing about who is right, just what works.</p><p>Please include a link to your github profile along with your resume.</p>

        <h3>Designers</h3>
        <p>Unless you are Craigslist, design matters. We are looking for someone to lead the design future at Tally. Ideally your css chops are strong and you're not afraid to jump into the codebase. Fortunately, react was designed with designers in mind. You will need to run ahead of the dev team and deliver mocks. We are looking for more mid-century modern than eclectic.</p><p>Please include a link to your dribbble profile along with your resume.</p>

        <h3>Journalism/Media</h3>
        <p>The newspaper is dead. Publishing has changed for good. Online ad revenue is down with pervasive ad blocking on desktop and mobile. If you have a background in political journalism and are proficient in the ecosphere of the modern web and modern web publishing.
        </p>

        <h3>Marketing and Community Management</h3>
        <p>We are looking for someone to build our enterprise customer pipeline. You will work with our sales team on lead passing, helping with content production, and working with our leadership team on strategy. You will also own our social accounts. Ideally you are familiar with Facebook appliations and open graph posting permissions. You will eventually help us hire a social media professional and email marketing expert. Ideally, you are familiar with FEC rules, the political cycle, and have a deep interest in the future of US politics.</p>

        <h3>Sales</h3>
        <p>We are looking for a self starter to lead our sales efforts. You should have familiarity with news organizations and their sales processes and cycles. You should expect travel, and have a strong desire to work with a variety of organizations. </p>
        <br/>

        <p><strong>For all openings, please email us careers@tally.us and include a link to your LinkedIn profile.</strong></p><br/>

        <p><strong>Tally US is an Equal Opportunity Employeer</strong></p>
        <p>Tally US provides equal employment opportunities (EEO) to all employees and applicants for employment without regard to race, color, religion, sex, national origin, age, disability or genetics. In addition to federal law requirements, Tally US complies with applicable state and local laws governing nondiscrimination in employment in every location in which the company has facilities. This policy applies to all terms and conditions of employment, including recruiting, hiring, placement, promotion, termination, layoff, recall, transfer, leaves of absence, compensation and training.</p>
        <p>Tally US expressly prohibits any form of workplace harassment based on race, color, religion, gender, sexual orientation, gender identity or expression, national origin, age, genetic information, disability, or veteran status. Improper interference with the ability of Tally's employees to perform their job duties may result in discipline up to and including discharge.</p>
      </div>
    );
  }
}
