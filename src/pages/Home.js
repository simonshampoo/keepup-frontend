import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import {
  Grid,
  Dimmer,
  Loader,
  Image,
  Segment,
  Transition,
} from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

const Home = () => {
  const { loading, data: { getPosts: posts } = {} } =
    useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);
  return (
    <Grid columns={1}>
      <Grid.Row>
        <h1 className="page-title">recent events🌎</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted />
            </Dimmer>
            <Image src="/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : (
          <Transition.Group animation="jiggle" duration={900}>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard image = {`https://joeschmoe.io/api/v1/${post.id}`} post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};
export default Home;
