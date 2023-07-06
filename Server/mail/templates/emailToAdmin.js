const sendEmailToAdmin = (userDetails) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Contact Form Confirmation</title>
      <style>
        body {
          background-color: #fafafa;
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
          text-align: center;
        }
  
        .logo {
          padding-top: 20px;
          max-width: 200px;
          margin-bottom: 20px;
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
          background-color: #16022b;
        }
        .card {
          background-color: rgb(245, 245, 245);
          width: 500px;
          margin-left: 45px;
          /* padding-bottom: 80px; */
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <div class="header">
          <a href=""
            ><img
              class="logo"
              src="https://i.ibb.co/yS8tdPX/Logo-Light.png"
              alt="ogo"
          /></a>
        </div>
        <div class="card">
          <div class="message">Contact Form Confirmation</div>
          <div class="body">
            <p>Dear Admin</p>
            <p>
              A User is trying to contact you. Here are the details he/she provided:
            </p>
            <hr />
            <p>Name:${userDetails.name}</p>
            <p>Email: ${userDetails.email}</p>
            <p>Phone Number: ${userDetails.phoneNumber}</p>
            <p></p>
            <hr />
            <p>Message: ${userDetails.message}</p>
          </div>
          <div class="support">
            To reply him back just click on
            <a href="${userDetails.email}">${userDetails.email}</a>
          </div>
        </div>
      </div>
    </body>
  </html>`;
};

module.exports = sendEmailToAdmin;
