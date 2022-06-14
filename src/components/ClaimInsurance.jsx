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
      <Card style={styles.card} title={<h1 style={styles.title}>👨‍💻 Claiming your NFT insurance</h1>}>
        <Timeline mode="left" style={styles.timeline}>
          <Timeline.Item dot="📄">
            <Text delete={isServerInfo} style={styles.text}>
            After an insured has died, the owner of the NFT attached to the insured can open a <Text code>claiming request</Text>.
            </Text>
          </Timeline.Item>
          <Timeline.Item dot="🔏">
            <Text delete={isServerInfo} style={styles.text}>
            The claiming request initialize the votation workflow in the <Text code>Once Oracle</Text>, where it will be ensured that the insured actually died.
            </Text>
          </Timeline.Item>
          <Timeline.Item dot="🧰">
            <Text delete={isServerInfo} style={styles.text}>
              The Once Oracle relies on a stakeholder voting system with the Anima token, fundamentally following the concept of <Text code>skin in the game</Text> and <Text code>descentralization</Text> for the protocol operation.
            </Text>
          </Timeline.Item>
          <Timeline.Item dot="🔁">
            <Text delete={isServerInfo} style={styles.text}>
              Read more about the <a
                href="https://docs.google.com/document/d/1aDMai2FkkQTBwlwHJxJ_cItVAijImMY8I7EvdT-1I3o/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Once Oracle
              </a> 
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
          Soon...
        </Button>

      </Card>
      <div>
      </div>
    </div>
  );
}
