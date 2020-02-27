import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import Typography from "material-ui/Typography";
import seashellImg from "./../assets/images/seashell.jpg";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme
      .spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Typography type="headline" component="h2" className={classes.title}>
          Home Page
        </Typography>
        <CardMedia
          className={classes.media}
          image={seashellImg}
          title="Unicorn Shells"
        />
        <CardContent>
          <Typography type="body1" component="p">
            Welcome to the MERN Skeleton home page.
          </Typography>
          <br />
          {/* now working! so it must be zzlink zzreac-router stuff then the zzlocation and zzlocation.state can work! ((ℹ️ zzpp._08._y20.0223-2128 )) */}
          <Link to={"/user/edit/:userId"}>
            {" "}
            private route /user/edit/:userid{" "}
          </Link>
        </CardContent>
      </Card>
    );
  }
}
//gosh where does this propType (lower camel case, NOT PropType) come from? zzQ _05._y20.0129-2207+0100
Home.propTypes = {
  classes: PropTypes.object.isRequired
};
//export default Home;
export default withStyles(styles)(Home);
