exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `
<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Contact Us</title>
      <style>
        body {
          background-color: #fdfeff;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.4;
          color: #00419c;
          margin: 0;
          padding: 0;
        }
  
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
  
        .logo {
          padding-top: 30px;
          max-width: 200px;
          margin-bottom: 20px;
        }
  
        .message {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          margin-top: 5px;
          flex-direction: column;
        }
  
        .body {
          font-size: 16px;
          margin-bottom: 20px;
        }
  
        .support {
          font-size: 14px;
          color: #250202;
          margin-top: 20px;
        }
  
        .highlight {
          font-weight: bold;
        }
        .header {
          width: 100%;
          background: #3a083b;
          height: auto;
        }
        .second {
          height: 50%;
          background: #edeff1;
        }
        .line {
          width: auto;
          /* margin-left: 190px; */
          background-color: #911c93;
          height: 3px;
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <div class="header">
          <a ref=""
            ><img
              class="logo"
              src="https://i.ibb.co/yS8tdPX/Logo-Light.png"
              alt="Logo"
          /></a>
        </div>
        <div class="second">
          <div class="message">You have succesfully Enrolled in the courses</div>
          <div class="line"></div>
          <div class="body">
           
             <p>Dear ${name},</p>
                  <p>We have received a payment of <span class='highlight'>₹${amount}</span></p>.
                  <p>Your Payment ID is <b>${paymentId}</b></p>
                  <p>Your Order ID is <b>${orderId}</b></p>
          </div>
          <div class="support">
            If you have any questions or need assistance, please feel free to
            reach out to us at
            <a href="mailto:sundram.smn@gmail.com">vidya@sarthi.com</a>. We are
            here to help!
          </div>
        </div>
      </div>
    </body>
  </html>`;
};
