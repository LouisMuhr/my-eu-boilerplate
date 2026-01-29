import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface VerifyEmailProps {
  verifyLink: string;
}

export const VerifyEmail = ({ verifyLink }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Bestätige deine E-Mail-Adresse</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Willkommen! 🎉</Heading>
          <Text style={text}>
            Danke für deine Registrierung. Bitte bestätige deine E-Mail-Adresse, 
            um deinen Account zu aktivieren:
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={verifyLink}>
              E-Mail bestätigen
            </Button>
          </Section>
          <Text style={text}>
            Falls der Button nicht funktioniert, kopiere diesen Link in deinen Browser:
          </Text>
          <Text style={link}>{verifyLink}</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Dieser Link ist 24 Stunden gültig. Wenn du dich nicht registriert hast, 
            ignoriere diese E-Mail.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default VerifyEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
  color: "#111",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "20px 0",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const link = {
  color: "#2563eb",
  fontSize: "14px",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};