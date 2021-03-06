import React, { Component } from "react";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Icon from "material-ui/Icon";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { create } from "./api-user.js";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  error: {
    verticalAlign: "middle"
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing.unit * 2
  }
});

class Signup extends Component {
  state = {
    name: "",
    password: "",
    email: "",
    gender: "",
    open: false,
    error: ""
  };

  handleChange = name => event => {
    //zzclosure! or "zzpartialApply" ! ((⚪️ zzp._08._y20.0223-1721  zzUseful ))
    this.setState({ [name]: event.target.value });
  };

  clickSubmit = () => {
    const user = {
      name: this.state.name || undefined,
      gender: this.state.gender || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    };
    create(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.setState({ error: "", open: true });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      // need zzdiv here zzgosh ((❇️ zzppp._08._y20.0223-1736 )) // due to zzdialog? hmm
      // zzdialog can be 1st or 2nd, seems sequence does not matter
      <div>
        <Dialog open={this.state.open} disableBackdropClick={false}>
          <DialogTitle>New Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              New account successfully created.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to="/signin">
              <Button color="primary" autoFocus="autoFocus" variant="raised">
                Sign In
              </Button>
            </Link>
          </DialogActions>
        </Dialog>

        <Card className={classes.card}>
          <CardContent>
            <Typography
              type="headline"
              component="h2"
              className={classes.title}
            >
              Sign Up yoyo
            </Typography>
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange("name")}
              margin="normal"
            />
            <br />
            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
            />
            <br />
            <TextField
              id="gender"
              label="Gender"
              className={classes.textField}
              value={this.state.gender}
              onChange={this.handleChange("gender")}
              margin="normal"
            />
            <br />
            <TextField
              id="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange("password")}
              margin="normal"
            />
            <br />
            {/* ans could be - https://stackoverflow.com/a/41142436/4127966 gosh this looks zzpatchy... don't know why it needs, tried removed seems no change */}{" "}
            {this.state.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {this.state.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="raised"
              onClick={this.clickSubmit}
              className={classes.submit}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
