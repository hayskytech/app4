import React, { useContext, useState } from 'react';
import { signOut, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './conf';
import { Button, Container, Header, Input } from 'semantic-ui-react';
import { MyContext } from '../App';

export default function OTP(p) {
  const [phone, setPhone] = useState('')
  const [otp, setOTP] = useState('')
  const [phoneDiv, showPhone] = useState(true)
  const [otpDiv, showOTP] = useState(false)
  const [captchaDiv, showCaptcha] = useState(true)
  const { user, setUser } = useContext(MyContext)
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        showPhone(true)
        showOTP(false)
      })
      .catch((error) => {
        console.log('Logout error:', error);
      });
  };


  function sendsms() {
    console.log('recaptcha started');
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    window.recaptchaVerifier = recaptchaVerifier
    const phoneNumber = '+91' + phone;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log('sms sent');
        showCaptcha(false)
        showOTP(true)
        showPhone(false)
        window.confirmationResult = confirmationResult;

      }).catch((error) => {
        console.log(error);
      });
  }
  function handleOTP() {
    const code = otp
    const confirmationResult = window.confirmationResult
    confirmationResult.confirm(code)
      .then((result) => {
        setUser(result.user)
        console.log('sign in success');
        setPhone('')
        setOTP('')
      }).catch((error) => {
        console.log(error);
      });
  }


  return (
    <Container>
      {user ? (
        <>
          <h4>User is logged in: {user.phoneNumber}</h4>
          <Button color='red' onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <>
          <Header as='h4'>Login with Phone Number & OTP</Header>

          {phoneDiv && <div>
            <Input label="+91" max='9999999999' min='1111111111' type="number"
              value={phone}
              onChange={e => setPhone(e.target.value)} fluid
              icon={
                <Button color='blue' onClick={sendsms}>Send SMS</Button>
              }
            />
          </div>}

          {captchaDiv && <div id='recaptcha-container'></div>}

          {otpDiv && <div>
            <Input fluid label='OTP' type='number' min='111111' max='999999'
              value={otp}
              onChange={e => setOTP(e.target.value)}
              icon={<Button color='green' onClick={handleOTP}>Submit OTP</Button>}
            />
          </div>}
        </>
      )}

    </Container>
  );
}