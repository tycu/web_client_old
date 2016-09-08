import React from "react";

// https://docs.google.com/document/d/1Cy589LzcQv3vsFAsbO7miB-tiKurKACctHt5EOujZng/edit?ts=57d0da2a

export default class TermsOfService extends React.Component {
  render() {
    const styles = {
      padding: '40px',
      margin: '0 auto',
      backgroundColor: '#fff',
      width: '800px'
    }

    return (
      <div style={styles}>
        <h2>Tally US Terms of Service</h2>
        <hr/>
        <p><strong>Tally Terms of Service</strong></p>
        <p>The following terms and conditions govern all use of the Tally.us website and the Tally mobile applications (taken together, our Services). These services are provided by Tally Us, Corp. (Tally). Our Services are offered subject to your acceptance without modification of all of the terms and conditions contained herein and all other operating rules, policies (including, without limitation, Tally's [Privacy Policy](https://www.tally.us/privacy) and procedures that may be published from time to time by Tally US Corp. (collectively, the “Agreement”). You agree that we may automatically upgrade our Services, and these terms will apply to any upgrades.</p>
        <p>Our Services are not directed to people younger than 18. If you are under 18 years old, you may read content on Tally's website and mobile apps, but you are not permitted to use Tally to make political contributions.</p>
        <p>Our Services are not directed to people residing outside the United States. If you reside outside the United States—even if you are a U.S. citizen or legal resident—you are not permitted to use Tally to make political contributions.</p>
        <p>Use of our Services requires a Tally account. You agree to provide us with complete and accurate information when you register for an account. You will be solely responsible and liable for any activity that occurs under your account. You are responsible for keeping your password secure.</p>

        <p><strong>Links to Third Parties</strong></p>
        <p>Tally links to other websites to provide you with information gathered from the original sources. For example, we provide links to news sites, Twitter accounts, YouTube and other sources of original material (Third Parties) to portray politicians and their actions as accurately as possible. However, we do not control the Third Parties and we are not responsible for their content or the accuracy of their information. In addition, linking to Third Parties does not constitute an endorsement of those sites, the candidate, the political action committee, the publisher, the author or owners.</p>

        <p><strong>Campaign Finance Laws</strong></p>
        <p>When making contributions to political candidates' campaigns and political actions committees through our Services, please be aware that you must obey U.S. campaign finance laws. You can find a summary of these laws at the [Federal Election Commission website](http://www.fec.gov/pages/brochures/citizens.shtml). In particular, the laws place limits on the amount of money you can contribute to campaigns and political action committees during each election cycle. It is your responsibility to abide by these limits, either through Tally alone or in combination with other channels such as the candidates' own websites. Also be aware that contributions to political candidates or political action committees are not tax-deductible.</p>

        <p><strong>Contributions and Refunds</strong></p>
        <p>Tally lets you make contributions to candidates' campaigns and political action committees. You make these contributions through credit card payments. In addition to the contribution, Tally charges a service fee. You authorize Tally to charge the contribution and the fee to your credit card.</p>
        <p>Shortly after receiving your payment, Tally forwards your contribution to candidates' campaigns or political action committees. In the event that the campaigns or political action committees fail to or refuse to accept Tally's disbursement within 90 days, Tally will make its best effort to refund the full amount of your payment back to you.</p>

        <p><strong>Changes</strong></p>
        <p>We are constantly updating our Services, and that means sometimes we have to change the legal terms under which our Services are offered. If we make changes that are material, we will let you know by sending a notification through our application, or by sending you an email or other communication before the changes take effect. The notice will designate a reasonable period of time after which the new terms will take effect. If you disagree with our changes, then you should stop using our Services within the designated notice period. Your continued use of our Services will be subject to the new terms. However, any dispute that arose before the changes shall be governed by the Terms (including the binding individual arbitration clause) that were in place when the dispute arose.</p>

        <p><strong>Termination</strong></p>
        <p>Tally may terminate your access to all or any part of our Services at any time, with or without cause, with or without notice, effective immediately. If you wish to terminate this Agreement or your Tally account (if you have one), you may simply discontinue using our Services. All provisions of this Agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>

        <p><strong>Disclaimer of Warranties</strong></p>
        <p>Our Services are provided “as is.” Tally disclaims all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement. Neither Tally nor its suppliers and licensors, makes any warranty that our Services will be error-free or that access thereto will be continuous or uninterrupted. You understand that you hereby obtain content or services through our Services at your own discretion and risk.</p>

        <p><strong>Limitation of Liability</strong></p>
        <p>In no event will Tally, or its suppliers or licensors, be liable with respect to any subject matter of this Agreement under any contract, negligence, strict liability or other legal or equitable theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement for substitute products or services; (iii) for interruption of use or loss or corruption of data; or (iv) for any amounts that exceed the fees paid by you to Tally under this agreement during the twelve (12) month period prior to the cause of action. Tally shall have no liability for any failure or delay due to matters beyond their reasonable control. The foregoing shall not apply to the extent prohibited by applicable law.</p>

        <p><strong>Indemnification</strong></p>
        <p>You agree to indemnify and hold harmless Tally, its contractors, and its licensors, and their respective directors, officers, employees, and agents from and against any and all claims and expenses, including attorneys' fees, arising out of your use of our Services, including but not limited to your violation of this Agreement.</p>

        <p><strong>Governing Law</strong></p>
        <p>This Agreement, and all legal issues arising from or related to Tally, shall be governed by and construed in accordance with the laws of the State of California without regard to that state's conflict of law provisions.</p>

        <p><strong>Credit Where Credit is Due</strong></p>
        <p>We repurposed portions of this Terms of Service from the good folks at <a href='https://en.wordpress.com/tos/' target='_blank'>Wordpress</a>, who have made their Terms of Service available under a <a href='http://creativecommons.org/licenses/by-sa/4.0/' target='_blank'>Creative Commons Sharealike</a> license.</p>
      </div>
    );
  }
}
