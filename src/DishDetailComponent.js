import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  BreadcrumbItem,
  Breadcrumb,
} from "reactstrap";
import { Link } from "react-router-dom";
import CommentForm from "./components/CommetForm";
import LoadingComponent from "./components/LoadingComponent";
import { baseUrl } from "./shared/baseUrl";

const RenderItem = ({ dish }) => {
  return (
    <Card>
      <CardImg top src={baseUrl + dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name} </CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
};

const RenderComment = ({ comments, dishId, postComment }) => {
  return (
    <div>
      {comments.map((comment) => (
        <ul className='list-unstyled'>
          <li>{comment.comment}</li>
          <li>
            {`--${comment.author}`},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </li>
        </ul>
      ))}

      {/* dishId={dishId} dishDetailComponent -> dishId stored in a new var or prop that is dishID */}
      <CommentForm dishId={dishId} postComment={postComment} />
    </div>
  );
};

const DishDetailComponent = (props) => {
  if (props.isLoading) {
    return <LoadingComponent />;
  } else if (props.errmess) {
    return <h4>{props.errmess}</h4>;
  } else {
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>

          <div className='row'>
            <div className='col-12 col-md-5 m-1'>
              <RenderItem dish={props.dish} />
            </div>
            <div className='col-12 col-md-5 m-1'>
              <h2>Comments</h2>
              <RenderComment
                comments={props.comments}
                dishId={props.dish.id}
                postComment={props.postComment}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DishDetailComponent;
