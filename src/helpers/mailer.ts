import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmailToUser = async ({ email, emailtype, userId }: any) => {
  try {
    // Token cretaed
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    // Email hashed token verify and reset
    if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailtype === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "239d0a6b6b52d3", // 🔥❌
        pass: "ccb229702661cc", // ❌
      },
    });

    const mailOptions = {
      from: "Villan@gmail.com",
      to: email,
      subject:
        emailtype === "VERIFY" ? "VERIFY your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailtype === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser, <br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </P>`,
    };

    const mailResopnse = await transport.sendMail(mailOptions);

    // console.log(mailResopnse);
    
    return mailResopnse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
