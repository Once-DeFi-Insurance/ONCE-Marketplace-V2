import React, { useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Card, Timeline, Typography } from "antd";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { Table, Tag, Space } from "antd";
import { PolygonCurrency} from "./Chains/Logos";
import moment from "moment";
import PremiumCalculator from "./PremiumCalculator";

const { Text } = Typography;

const styles = {
  table: {
    margin: "0 auto",
    width: "1000px",
  },
  calculator: {
    marginLeft: "27%",
    marginBottom: "10%"
  },
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

function NFTMarketTransactions() {
  const { walletAddress } = useMoralisDapp();
  const { Moralis } = useMoralis();
  const queryItemImages = useMoralisQuery("ItemImages");
  const fetchItemImages = JSON.parse(
    JSON.stringify(queryItemImages.data, [
      "nftContract",
      "tokenId",
      "name",
      "image",
    ])
  );
  const queryMarketItems = useMoralisQuery("itemAddedForSale");
  const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      "updatedAt",
      "price",
      "nftContract",
      "itemId",
      "sold",
      "tokenId",
      "seller",
      "owner",
    ])
  )
    .filter(
      (item) => item.seller === walletAddress || item.owner === walletAddress
    )
    .sort((a, b) =>
      a.updatedAt < b.updatedAt ? 1 : b.updatedAt < a.updatedAt ? -1 : 0
    );

  function getImage(addrs, id) {
    const img = fetchItemImages.find(
      (element) =>
        element.nftContract === addrs &&
        element.tokenId === id
    );
    return img?.image;
  }

  function getName(addrs, id) {
    const nme = fetchItemImages.find(
      (element) =>
        element.nftContract === addrs &&
        element.tokenId === id
    );
    return nme?.name;
  }



  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Item",
      key: "item",
      render: (text, record) => (
        <Space size="middle">
          <img src={getImage(record.collection, record.item)} style={{ width: "40px", borderRadius:"4px"}} />
          <span>#{record.item}</span>
        </Space>
      ),
    },
    {
      title: "Collection",
      key: "collection",
      render: (text, record) => (
        <Space size="middle">
          <span> Once Assurance NFTs </span>
        </Space>
      ),
    },
    {
      title: "Transaction Status",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = "geekblue";
            let status = "BUY";
            if (tag === false) {
              color = "volcano";
              status = "waiting";
            } else if (tag === true) {
              color = "green";
              status = "confirmed";
            }
            if (tag === walletAddress) {
              status = "SELL";
            }
            return (
              <Tag color={color} key={tag}>
                {status.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (e) => (
        <Space size="middle">
          <PolygonCurrency/>
          <span>{e}</span>
        </Space>
      ),
    }
  ];

  const data = fetchMarketItems?.map((item, index) => ({
    key: index,
    date: moment(item.updatedAt).format("DD-MM-YYYY HH:mm"),
    collection: item.nftContract,
    item: item.tokenId,
    tags: [item.seller, item.sold],
    price: item.price / ("1e" + 18)
  }));

  return (
    <>
    <div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "40px" }}>
      <Card style={styles.card} title={<h1 style={styles.title}>💻 Insurance Premium calculator</h1>}>
        <Timeline mode="left" style={styles.timeline}>
          <Timeline.Item dot="📄">
            <Text  style={styles.text}>
            An <Text code>insurance premium</Text> is the amount you pay for an insurance policy. 
            </Text>
          </Timeline.Item>
          <Timeline.Item dot="🔏">
            <Text  style={styles.text}>
            The once assurance protocol has a risk management algorithm based on its liquidity pool, thus having an automated calculator to assign your premium.
            </Text>
          </Timeline.Item>
          <Timeline.Item dot="🧰">
            <Text  style={styles.text}>
              This is a demonstration, set your age and gender and get the premium percentage based on the total insured amount.
            </Text>
          </Timeline.Item>
        </Timeline>
      </Card>
      <div>
      </div>
    </div>
      
        
      <div style={styles.calculator}>
        <PremiumCalculator />
        </div>
        <div style={styles.table}>
          <Table columns={columns} dataSource={data} />
        </div>
        
      </div>
    </>
  );
}

export default NFTMarketTransactions;
const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Item",
    key: "item",

  },
  {
    title: "Collection",
    key: "collection",
  },
  {
    title: "Transaction Status",
    key: "tags",
    dataIndex: "tags",
  },
  {
    title: "Price",
    key: "price",
    dataIndex: "price",
  }
];