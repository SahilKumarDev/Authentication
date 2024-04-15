import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmailToUser = async ({ email, emailtype, userId }: any) => {
  try {
    // Token cretaed
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    const hashedTokenExpiry = Date.now() + 3600000;

    // Email hashed token verify and reset
    if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashedToken },
        { verifyTokenExpiry: hashedTokenExpiry }
      );
    } else if (emailtype === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        { forgetPasswordToken: hashedToken },
        { forgetPasswordTokenExpiry: hashedTokenExpiry }
      );
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
      from: "Villan",
      to: email,
      subject:
        emailtype === "verify" ? "Verify your email" : "Reset your email",
      html: `<p>Click <a href="${process.env.DOMIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailtype === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser, <br>
      ${process.env.DOMIN}/verifyemail>token=${hashedToken}
      </P>`,
    };

    const mailResopnse = await transport.sendMail(mailOptions);

    return mailResopnse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
