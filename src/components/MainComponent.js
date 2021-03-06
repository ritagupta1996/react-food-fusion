import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

//components
import Menu from "./MenuComponents";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import HomeComponent from "./HomeComponent";
import ContactUsComponent from "./ContactUsComponent";
import DishDetailComponent from "../DishDetailComponent.js";
import About from "./AboutUs";

//store
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  postComment,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";

//mapStateToprops= it takes the current state from the store and conerts it into the props tobe used by the respective component

const mapStateToprops = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),

  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null,
    };
  }

  onDishSelected(dishId) {
    this.setState({
      selectedDish: dishId,
    });
    console.log("initial state updated");
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    const HomePage = () => {
      return (
        <HomeComponent
          //featured dish
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishLoading={this.props.dishes.isLoading}
          dishErrmess={this.props.dishes.errmess}
          //promotions
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          //leaders
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishDetail = ({ match }) => {
      return (
        <DishDetailComponent
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errmess={this.props.dishes.errmess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };
    return (
      <div>
        <HeaderComponent />

        <Switch>
          <Route path='/home' component={HomePage} />
          <Route
            exact
            path='/menu'
            component={() => (
              <Menu
                dishes={this.props.dishes.dishes}
                isLoading={this.props.dishes.isLoading}
                errmess={this.props.dishes.errmess}
                onClick={(dishId) => this.onDishSelected(dishId)}
              />
            )}
          />

          <Route exact path='/menu/:dishId' component={DishDetail} />
          <Route
            path='/aboutus'
            component={() => <About leaders={this.props.leaders} />}
          />
          <Route
            path='/ContactUs'
            component={() => (
              <ContactUsComponent resetForm={this.props.resetFeedbackForm} />
            )}
          />

          <Redirect to='/home' />
        </Switch>
        <FooterComponent />
      </div>
    );
  }
}
//installed bootstrap, reactstrap, react-popper

//store has been connected with our component
export default withRouter(connect(mapStateToprops, mapDispatchToProps)(Main));
