import { Card, Timeline, Typography } from "antd";
import { Button, Input } from "antd";
import React, { useMemo } from "react";
import { useMoralis } from "react-moralis";

const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function QuickStart({ isServerInfo }) {
  const { Moralis } = useMoralis();

  const isInchDex = useMemo(
    () => (Moralis.Plugins?.oneInch ? true : false),
    [Moralis.Plugins?.oneInch]
  );

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card style={styles.card} title={<h1 style={styles.title}>👨‍💻 KYC workflow</h1>}>
        <Timeline mode="left" style={styles.timeline}>
          <Timeline.Item dot="📄">
            <Text delete={isServerInfo} style={styles.text}>
            Before you are able to mint a NFT insurance, you may to go through a KYC process so  we can ensure the credibility and security of the protocol.
            </Text>
          </Timeline.Item>
          <Timeline.Item dot="🔏">
            <Text delete={isServerInfo} style={styles.text}>
            Once Assurance believes and strives to maintain user <Text code>privacy</Text>: sensitive information will not be shared.
            </Text>
          </Timeline.Item>
          <Timeline.Item dot="🧰">
            <Text delete={isServerInfo} style={styles.text}>
              The information provided by the KYC will be used as a <Text code>"life validation"</Text>, ensuring that policyholders are real people and linking your data with your Polygon Address.
            </Text>
          </Timeline.Item>
          <Timeline.Item dot="🔁">
            <Text delete={isServerInfo} style={styles.text}>
              For the <a
                href="https://verify-with.blockpass.org/?clientId=once_assurance_1031d&serviceName=Once%20Assurance&env=prod"
                target="_blank"
                rel="noopener noreferrer"
              >
                KYC
              </a> process, in addition to all the information asked, you SHALL take your picture holding a piece of paper with your <Text code>Polygon Address</Text> written on it to.

            </Text>
            <Text delete={isServerInfo} style={{ display: "block", fontSize: "16px"}}>
              Furthermore, in the field <Text code>"Family Name"</Text> you SHALL write you <Text code>Polygon Address</Text>.
            </Text>
          </Timeline.Item>

          <Timeline.Item dot="🤝">
            <Text delete={isServerInfo} style={styles.text}>
            We ask for 24 hours to validate your order and approve your address for the NFT minting feature 😊.
            </Text>
          </Timeline.Item>
        </Timeline>
        <Button
          type="primary"
          size="large"
          style={{ width: "30%", marginTop: "25px", marginLeft: "34%" }}
          href="https://verify-with.blockpass.org/?clientId=once_assurance_1031d&serviceName=Once%20Assurance&env=prod"
          target="_blank"
          rel="noopener noreferrer"
        >
          KYC🚀
        </Button>

      </Card>
      <div>
      </div>
    </div>
  );
}
