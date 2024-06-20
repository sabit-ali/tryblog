import React from "react";
import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
import { Hr } from "@react-email/hr";

export default function ForgotPasswordEmail({email,resetPasswordToken}:{
  email:string,
  resetPasswordToken:string
}) {
  return (
    <Html>
      <Heading as="h2"> Hello </Heading>
      <Text>
        We received the reset password request. If it's not you then please ignore
        it.
      </Text>
      <Button
        href={`http://localhost:3000/reset-password/?token=${resetPasswordToken}`}
        style={{ background: "#000", color: "#FFFFFF", padding: '10px 20px' }}
      >
        Reset Password
      </Button>
      <Hr />
      <Heading as="h3">Regards</Heading>
      <Text>Coding with Sabit Ali </Text>
    </Html>
  );
}
