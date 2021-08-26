import React, { useContext, useState, useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Grid,
  Card,
  Label,
  Button,
  Segment,
  Dimmer,
  Loader,
  Image,
  Icon,
  Form,
} from "semantic-ui-react";

import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";
import { AuthContext } from "../context/auth";
import moment from "moment";
const SinglePost = (props) => {
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  const postId = props.match.params.postId;
  let postMarkup;

  const [comment, setComment] = useState("");

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const deletePostCallback = () => {
    props.history.push("/");
  };

  if (!getPost) {
    postMarkup = (
      <Segment>
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
        <Image src="/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              float="right"
              size="small"
              src="https://joeschmoe.io/api/v1/random"
            />
          </Grid.Column>
          <Grid.Column width={10} height={5}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => "commented"}
                >
                  <Button basic>
                    <Icon name="comments" color= {commentCount > 0 ?  "blue" :""} />
                  </Button>
                  <Label basic>{commentCount} comments</Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="add comment"
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      likeCount
      createdAt
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default SinglePost;
