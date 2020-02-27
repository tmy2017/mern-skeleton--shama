import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import Edit from "material-ui-icons/Edit";
import Person from "material-ui-icons/Person";
import Divider from "material-ui/Divider";
import DeleteUser from "./DeleteUser";
import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import { Redirect, Link } from "react-router-dom";

const styles = theme => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.protectedTitle
  }
});

class Profile extends Component {
  //actually this is where zzcomponent got zzprops! zzcore-zzconcept-zzdev-zzlrn-zzinnerworking ((☢️ zzppppp._09._y20.0227-1526
  //and he just zzdestructuring the propos (from zzroute component), only take out the zzmatch part! zzwow zzintrst
  constructor({ match }) {
    super();
    this.state = {
      user: "",
      redirectToSignin: false
    };
    //also does NOT put into zzthis.state NOR zzthis.props hmm zzintrst
    this.match = match;
  }
  init = userId => {
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
      }
    });
  };
  // this relates to zzderivedstate https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops ((ℹ️ zzpp._09._y20.0227-1452))
  componentWillReceiveProps = props => {
    this.init(props.match.params.userId);
  };
  componentDidMount = () => {
    //zzPowerful zzreact-router the zzmatch can be the zzget zzurl zzparameter so to pass the userId here into zzchild zzcomponent! ((ℹ️ zzpp._09._y20.0227-1433))
    this.init(this.match.params.userId);
  };
  render() {
    const { classes } = this.props;
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={this.state.user.name}
              secondary={this.state.user.email}
            />{" "}
            {auth.isAuthenticated().user &&
              auth.isAuthenticated().user._id == this.state.user._id && (
                <ListItemSecondaryAction>
                  <Link to={"/user/edit/" + this.state.user._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <Edit />
                    </IconButton>
                  </Link>
                  <DeleteUser userId={this.state.user._id} />
                </ListItemSecondaryAction>
              )}
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={
                "Joined: " + new Date(this.state.user.created).toDateString()
              }
            />
          </ListItem>
        </List>
      </Paper>
    );
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
