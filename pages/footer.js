import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "inherit",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  fontSize: "16px",
  fontFamily: "Verdana",
  textAlign: "center",
  width: "100%",
  color: "#FFFFFF",
  " & a ": {
    textDecoration: "none",
    color: "inherit",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "inherit",
  color: "white",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  padding: "7px 24px",
  borderRadius: "0px",
  transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
  "&:hover": {
    transform: "scale(1.2)",
    backgroundColor: "inherit",
    color: "white",
    boxShadow: `0 0 20px 4px ${"#393646"}`,
    "&::after": {
      filter: "blur(10px)",
      boxShadow: `0 0 20px 4px ${"#393646"}`,
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
}));

const Footer = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (data && data.length > 0) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [data]);

  // const classes = useStyles();
  return (
    <div
      style={{
        flexGrow: 1,
        padding: "20px",
      }}
    >
      <br />
      <br />
      <br />
      <br />
      {/* footer section  */}

      <Grid container spacing={0}>
        <Grid item xs={12} md={4}>
          <a href="#">
            <Item>About</Item>
          </a>
        </Grid>

        <Grid item xs={12} md={4}>
          <a href="#">
            <Item>Terms and Conditions</Item>
          </a>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            placeholder="Stay Tuned(Enter Email Id)"
            variant="outlined"
            size="small"
            className={classes.textField}
            inputProps={{
              style: {
                color: "black",
                backgroundColor: "white",
                borderRadius: "0px",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <StyledButton
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Subscribe
          </StyledButton>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container>
        <IconButton color="primary" style={{ color: "#FFF" }}>
          <FaGithub />
        </IconButton>
        <IconButton color="primary">
          <FaLinkedinIn />
        </IconButton>
      </Grid>
    </div>
  );
};

export default Footer;
