import { CreditCardOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "helpers/networks";
import { useWeb3ExecuteFunction } from "react-moralis";
import AddressInput from "../../AddressInput";
import AssetSelector from "./AssetSelector";
import { PolygonCurrency} from "../../Chains/Logos";

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    outline: "none",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textverflow: "ellipsis",
    appearance: "textfield",
    color: "#041836",
    fontWeight: "700",
    border: "none",
    backgroundColor: "transparent",
  },
  select: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
  },
  textWrapper: { maxWidth: "80px", width: "100%" },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexDirection: "row",
  },
};

function Transfer() {
  const { Moralis } = useMoralis();
  const [receiver, setReceiver] = useState();
  const [asset, setAsset] = useState();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [premium, setPremium] = useState();
  const [isPending, setIsPending] = useState(false);
  const { chainId, marketAddress, contractABI } = useMoralisDapp();
  const contractProcessor = useWeb3ExecuteFunction(); 
  const contractABIJson = JSON.parse(contractABI);
  const mintFunction = "mint";
  const uriParam = "putTextHere";

  useEffect(() => {
    amount? setTx({ amount }) : setTx();
  }, [amount]);

  async function transfer() {
    const ops = {
        contractAddress: marketAddress,
        functionName: mintFunction,
        abi: contractABIJson,
        msgValue: Moralis.Units.ETH((premium).toString()),
        params: {
          uri: uriParam,
          _payout: Moralis.Units.ETH((amount).toString()),
        },
      };

      await contractProcessor.fetch({
        params: ops,
        onSuccess: () => {
          console.log("success");
          setIsPending(false);       
        },
        onError: (error) => {
          setIsPending(false);
          alert(error);
        },
      });
    
  }

  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Set the payout amount in case of death:</h3>
        </div>
        <div style={styles.select}>
          <Input
            size="large"
            prefix={<PolygonCurrency/>}
            onChange={(e) => {
              setAmount(`${e.target.value}`);
            }}
          />
        </div>
        <div style={styles.header}>
          <h3 style={{color: '#fff'}}>...</h3>
        </div>
        <div style={styles.header}>
          <h3 style={{paddingBottom: "0px"}}>Set the insurance premium (msg.value):</h3>
        </div>
        <div style={styles.select}>
          <Input
            size="large"
            prefix={<PolygonCurrency/>}
            onChange={(e) => {
              setPremium(`${e.target.value}`);
            }}
          />
        </div>
        <Button
          type="primary"
          size="large"
          loading={isPending}
          style={{ width: "100%", marginTop: "25px" }}
          onClick={() => transfer()}
          disabled={!tx}
        >
          Mint your insurance NFT🕺
        </Button>
      </div>
    </div>
  );
}

export default Transfer;
