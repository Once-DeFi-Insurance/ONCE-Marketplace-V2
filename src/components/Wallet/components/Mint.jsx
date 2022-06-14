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
import { ethers } from "ethers";

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(`32459721f4b813b4a6a7`, '344be49e109a8d33d12ebd8f7a1a487571dd2c706501c88e28044e69f9c44082');

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
  const [address, setAddress] = useState();
  const { walletAddress } = useMoralisDapp();
  const { chainId, marketAddress, contractABI } = useMoralisDapp();
  const contractProcessor = useWeb3ExecuteFunction(); 
  const contractABIJson = JSON.parse(contractABI);
  const mintFunction = "mint";
  const personalInformation = "fetchPersonalInformation";
  const uriParam = "putTextHere";
  const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/Ro7eQs-KgNh3Itbh2mxAD9oHznDnZ8wQ");
  const signer = new ethers.Wallet("5198b0a7dcca89723ec98c4fedde2cc1875594961e209499daa888c41dd31d8e", provider);
  let finald = "NA";
  let uri = "NA";

  useEffect(() => {
    amount? setTx({ amount }) : setTx();
  }, [amount]);

  async function fetchPerson() {
    const returnContract = new ethers.Contract(marketAddress, contractABI, signer);
    const data = await returnContract.fetchPersonalInformation(walletAddress)
    return data
  }

  async function uploadIPFS() {
    const body = {
      description: finald
    };
    const options = {
      pinataMetadata: {
          name: 'OnceAssurance',
          keyvalues: {
              customKey: 'customValue',
              customKey2: 'customValue2'
          }
      },
      pinataOptions: {
          cidVersion: 0
      }
    };
    await pinata.pinJSONToIPFS(body, options).then((result) => {
       //handle results here
        uri = String(result.IpfsHash);
        console.log(result.IpfsHash);
        return result.IpfsHash
      }).catch((err) => {
        //handle error here
        console.log(err);
      });
    }


  async function transfer() {
    await fetchPerson().then(data =>{
       finald = String(data);
       console.log(finald);
       return String(data)
  });
    await uploadIPFS()
    let finalUri = `https://gateway.pinata.cloud/ipfs/${uri}`
    const ops = {
        contractAddress: marketAddress,
        functionName: mintFunction,
        abi: contractABIJson,
        msgValue: Moralis.Units.ETH((premium).toString()),
        params: {
          uri: finalUri,
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
      <h6 style={{paddingBottom: "0px"}}>*You must go through the KYC before being able to mint an insurance</h6>
    </div>
  );
}

export default Transfer;
