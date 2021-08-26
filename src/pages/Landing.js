import React, { useContext } from "react";
import { Container, Card, Grid, Header, List, Image } from "semantic-ui-react";
import Register from "./Register";
import "./Landing.css";
import img from "../bg.png";
import ppl from "../group.png";

import { AuthContext } from "../context/auth";

const Landing = () => {
  const { user } = useContext(AuthContext);

  return (
    <div
      style={{
        backgroundSize: "100% 100%",
        width: "100%",
        backgroundImage: `url(${img})`,
      }}
    >
      <Grid
        as="div"
        columns={2}
        style={{
          width: "100%",
          marginTop: 50,
        }}
      >
        <Grid.Column centered>
          <h1
            className="fade-in-image"
            style={{
              marginLeft: 200,
              width: 550,
              marginTop: "15%",
              fontSize: 80,
              fontWeight: 600,
              wordWrap: "word-break",
            }}
          >
            communicate with your <p style={{ color: "#4376A6" }}>community.</p>
          </h1>
        </Grid.Column>
        <Grid.Column style={{ width: "40%" }}>
          <br />
          {!user ? (
            <Card className="card" fluid>
              <Card.Content>
                <Register
                  size="large"
                  header="Welcome to KeepUp!"
                  tagline={"Find and host new experiences"}
                />
              </Card.Content>
            </Card>
          ) : (
            <Image style={{ marginTop: 60 }} float="left" src={ppl} />
          )}
        </Grid.Column>
      </Grid>

      <Grid textAlign="centered">
        <Grid.Row verticalAlign="middle">
          <Header
            dividing
            size="huge"
            style={{
              fontSize: 48,
              marginTop: 50,
            }}
          >
            guarantee transparency 🔎
          </Header>
          <List>
            <List.Item as="div" style={{ fontWeight: 900, fontSize: 24 }}>
              {" "}
              KeepUp aims to unite communities by promoting transparency in
              event planning.
            </List.Item>

            <List.Item as="div" style={{ fontWeight: 900, fontSize: 24 }}>
              {" "}
              no more registering for an event and then being out of the loop.
            </List.Item>
          </List>
        </Grid.Row>
        <Grid.Row centered divided stretched verticalAlign="middle">
          <Header
            dividing
            size="huge"
            style={{
              fontSize: 48,
            }}
          >
            start a dialogue 💬
          </Header>
          <List>
            <List.Item as="div" style={{ fontWeight: 900, fontSize: 24 }}>
              {" "}
              become the next public figure.
            </List.Item>

            <List.Item as="div" style={{ fontWeight: 900, fontSize: 24 }}>
              {" "}
              promote your events on KeepUp to build a grassroots community.
            </List.Item>
          </List>
        </Grid.Row>
        <Grid.Row>
          <Header
            dividing
            size="huge"
            style={{
              marginTop: 20,
              fontSize: 48,
            }}
          >
            KeepUp at a glance 👀
          </Header>
        </Grid.Row>
        <List horizontal style={{ marginTop: 20 }}>
          <List.Item>
            <List.Icon size="huge" name="users" />
            <List.Content as="div" style={{ fontWeight: 900, fontSize: 24 }}>
              foster a community
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon size="huge" name="world" />
            <List.Content as="div" style={{ fontWeight: 900, fontSize: 24 }}>
              no barriers, no restrictions
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon size="huge" name="group" />
            <List.Content as="div" style={{ fontWeight: 900, fontSize: 24 }}>
              easy integration
            </List.Content>
          </List.Item>
        </List>
      </Grid>
      <Container
        style={{
          textAlign: "center",
          fontSize: 18,
          bottom: 0,
          marginTop: 75,
        }}
      >
        made with 💙 by Simon Shamoon
      </Container>
    </div>
  );
};

export default Landing;
