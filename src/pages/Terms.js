import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the Crynance Lottery. By participating in this lottery, you agree to the following terms and conditions. These terms govern your participation in the promotional lottery event organized by Crynance, a fictional cryptocurrency company. Please read these terms carefully before proceeding with registration.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Eligibility
        </Typography>
        <Typography variant="body1" paragraph>
          Participants must be at least 18 years old and reside in a country where cryptocurrency is legal. By entering, you confirm that cryptocurrency is legal in your jurisdiction. Participants must provide accurate and truthful information during registration. Crynance reserves the right to verify eligibility and disqualify any participant found to be ineligible or in violation of these terms.
        </Typography>
        <Typography variant="body1" paragraph>
          Employees, contractors, and affiliates of Crynance are not eligible to participate. This lottery is open only to individuals and not to corporations or other entities. Multiple entries from the same person are not permitted. Any attempt to circumvent these eligibility rules may result in disqualification.
        </Typography>
        <Typography variant="h6" gutterBottom>
          How to Enter
        </Typography>
        <Typography variant="body1" paragraph>
          To enter the lottery, participants must complete the online registration form with all required fields. Upon successful registration and confirmation of eligibility, participants will be directed to the scratch card page. Scratching the card will reveal whether a prize has been won. Entries must be submitted by the deadline specified on the website.
        </Typography>
        <Typography variant="body1" paragraph>
          Crynance is not responsible for lost, late, incomplete, or misdirected entries. All entries become the property of Crynance and will not be returned. By entering, participants agree to receive communications from Crynance regarding the lottery.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Prize
        </Typography>
        <Typography variant="body1" paragraph>
          The grand prize is 10 BTC. Other prizes may be awarded at the discretion of Crynance. Prizes are subject to availability and may be substituted with equivalent value. Winners will be notified via email within 7 days of the lottery draw. Prizes must be claimed within 30 days of notification, or they may be forfeited.
        </Typography>
        <Typography variant="body1" paragraph>
          All taxes and fees associated with the prize are the responsibility of the winner. Crynance will not provide any tax advice or assistance. Winners may be required to provide identification and sign a release form before receiving the prize.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Odds and Selection
        </Typography>
        <Typography variant="body1" paragraph>
          The odds of winning depend on the number of eligible entries received. Winners are selected randomly from all eligible participants. Crynance uses a random selection process to ensure fairness. The lottery draw will occur at the end of the promotional period.
        </Typography>
        <Typography variant="body1" paragraph>
          Participants acknowledge that the lottery is based on chance, and no skill or strategy can improve their chances of winning. Crynance reserves the right to modify the odds or selection process at any time without notice.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Data Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          We collect your name, phone, email, date of birth, and country for lottery purposes. Your data will not be shared with third parties without your consent. We use industry-standard security measures to protect your personal information. By entering, you consent to the collection and use of your data as described in our privacy policy.
        </Typography>
        <Typography variant="body1" paragraph>
          Participants may request to access, update, or delete their personal information by contacting us. We retain data for as long as necessary to fulfill the purposes outlined in these terms or as required by law. For more details, please refer to our full privacy policy available upon request.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Disclaimers
        </Typography>
        <Typography variant="body1" paragraph>
          This is a promotional lottery. Participation does not guarantee a prize. Crynance is not responsible for any technical issues, network failures, or other disruptions that may affect participation. We do not warrant that the website will be error-free or uninterrupted.
        </Typography>
        <Typography variant="body1" paragraph>
          Participants enter at their own risk. Crynance shall not be liable for any damages, losses, or injuries arising from participation in the lottery, including but not limited to computer malfunctions, viruses, or unauthorized access to personal information.
        </Typography>
        <Typography variant="body1" paragraph>
          All prizes are provided "as is" without warranty of any kind. Crynance disclaims all warranties, express or implied, including merchantability and fitness for a particular purpose. Winners assume all risk associated with the use of the prize.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          To the fullest extent permitted by law, Crynance's total liability for any claims arising out of or related to the lottery shall not exceed the value of the prize won. Participants agree to indemnify and hold harmless Crynance, its affiliates, and their respective officers, directors, and employees from any claims, damages, or expenses.
        </Typography>
        <Typography variant="body1" paragraph>
          This limitation of liability applies to all causes of action, including breach of contract, tort, negligence, and strict liability. Participants waive any right to participate in class action lawsuits against Crynance.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These terms are governed by the laws of [Jurisdiction], without regard to conflict of law principles. Any disputes arising from these terms or the lottery shall be resolved in the courts of [Jurisdiction]. Participants consent to the exclusive jurisdiction of these courts.
        </Typography>
        <Typography variant="body1" paragraph>
          If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect. Crynance may amend these terms at any time without notice.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Contact
        </Typography>
        <Typography variant="body1" paragraph>
          For questions, contact us at support@crynance.com. We will respond to inquiries within 5 business days. Participants may also visit our website for more information about Crynance and our services.
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for participating in the Crynance Lottery. We wish you the best of luck!
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Back to Registration
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}