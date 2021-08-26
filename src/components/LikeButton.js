import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { Button, Label, Icon, Popup } from "semantic-ui-react";

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button basic >
        <Icon name="heart" color = "red"/>
      </Button>
    ) : (
      <Button basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Popup
      content= {liked ? "unlike event" : "like event"}
      trigger={
        <Button as="div" labelPosition="right" onClick={likePost}>
          {likeButton}
          <Label basic >
            {likeCount} likes
          </Label>
        </Button>
      }
    />
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
