import { FETCH_POSTS_QUERY } from "../util/graphql";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { useMutation } from "@apollo/client";

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <div>
      <Form style={{ marginBottom: 20 }} onSubmit={onSubmit}>
        <h2>create new event:</h2>
        <Form.Field>
          <Form.TextArea
            placeholder="make sure to include a link to an external group like Discord, Telegram, or an email list to ensure your event attendants are always updated!"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit">create event</Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      createdAt
      username
      body
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
export default PostForm;
