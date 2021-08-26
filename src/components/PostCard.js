import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
function PostCard({ image,
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="left"
          size="mini"
          src={image}
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Popup
          trigger={<LikeButton user={user} post={{ id, likes, likeCount }} />}
          content="like post"
          basic
        />
        <Popup
          trigger={
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button basic>
                <Icon name="comments" color = {commentCount > 0 ?  "blue" : ""}/>
              </Button>
              <Label basic>
                {commentCount} comments
              </Label>
            </Button>
          }
          content="add a comment"
          basic
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
