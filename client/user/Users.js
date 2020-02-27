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
import Typography from "material-ui/Typography";
import ArrowForward from "material-ui-icons/ArrowForward";
// this is really from an icon, I need to know this? gosh zzreact zzMUI, then how to know which to zzimport? ((⚪️ zzp._08._y20.0223-1658))
// zzref - https://material-ui.com/components/icons/#material-icons
import Person from "material-ui-icons/Person";
import { Link } from "react-router-dom";
import { list } from "./api-user.js";

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: theme.spacing.unit,
    margin: theme.spacing.unit * 5
  }),
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    color: theme.palette.openTitle
  }
});

class Users extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  render() {
    //desctructuring, only take this.props "classes" out
    const { classes } = this.props;
    return (
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          All Users
        </Typography>
        <List dense>
          {this.state.users.map((item, i) => {
            return (
              <Link to={"/user/" + item._id} key={i}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar>
                      {/* wow this is like an icon? */}
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <ArrowForward />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Paper>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Users);
