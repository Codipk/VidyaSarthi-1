exports.courseEnrollmentEmail = (courseName, name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charSet="UTF-8" />
    <title>Course Registration Confirmation</title>
    <style>
      body {
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.4;
        color: #333333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        /* background-color: #ffd60a; */
        text-align: center;
      }

      .logo {
        max-width: 200px;
        margin-bottom: 20px;
        padding-top: 40px;
        background-color: black;
      }

      .message {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .body {
        font-size: 16px;
        margin-bottom: 20px;
      }

      .cta {
        display: inline-block;
        padding: 10px 20px;
        background-color: #ffd60a;
        color: #000000;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
      }

      .support {
        font-size: 14px;
        color: #999999;
        margin-top: 20px;
      }

      .highlight {
        font-weight: bold;
      }
      .header {
        width: 600px;
        background-color: #000000;
      }
    </style>
  

  
    <div className="container">
      <div className="header">
        <a href=""><img className="logo" src="https://i.ibb.co/yS8tdPX/Logo-Light.png" alt="Logo" /></a>
      </div>
      <div className="message">Course Registration Confirmation</div>
      <div className="body">
        <p>Dear ${name},</p>
        <p>
          You have successfully registered for the course
          <span className="highlight">"${courseName}"</span>. We are excited to have
          you as a participant!
        </p>
        <p>
          Please log in to your learning dashboard to access the course
          materials and start your learning journey.
        </p>
        <a className="cta" href="">Go to Dashboard</a>
      </div>
      <div className="support">
        If you have any questions or need assistance, please feel free to reach
        out to us at
        <a href="mailto:sundram.smn@gmail.com">vidya@sarthi.com</a>. We are here
        to help!
      </div>
    </div>
  
</>`;
};
