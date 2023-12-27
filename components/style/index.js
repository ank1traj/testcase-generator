import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  Select,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(45deg, #545354 70%, #3a2c38 100%)",
  boxShadow: "0 3px 5px 2px black",
  borderRadius: "12px",
  width: "100%",
  height: "100%",
  margin: "50px auto",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  [theme.breakpoints.up('md')]: {
    // Media query styles for screens with width >= 900px
    margin:"0px auto",
    width:"80%"
  },
  [theme.breakpoints.down('md')]: {
    // Media query styles for screens with width <900px
    margin:"0px auto",
    width:"100%"
  },
  [theme.breakpoints.down(700)]: {
    // Media query styles for screens with width <700px
    margin:"60px auto",
    width:"100%"
  },
  [theme.breakpoints.down('sm')]: {
    // Media query styles for screens with width <600px
    margin:"120px auto",
    width:"100%"
  },
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  textAlign: "center",
  color: "#fff",
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  height: "100%",
  overflow: "hidden",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontWeight: "bold",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label": {
    color: "#fff",
    fontWeight: "bold",
  },
  "& input": {
    color: "#fff",
    fontWeight: "bold",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#fff",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: "#fff",
  color: "#FF8E53",
  fontWeight: "bold",
  "&:hover": {
    background: "#FF8E53",
    color: "#fff",
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  position: "relative",
  width: "100%",
  "& .MuiSelect-select": {
    paddingRight: theme.spacing(4),
  },
  "& .MuiSelect-icon": {
    right: 0,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  "&.MuiSelect-select": {
    paddingRight: theme.spacing(2),
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiSelect-icon": {
    color: theme.palette.secondary.main,
  },
}));

export const StyledComponents = {
  StyledCard,
  StyledCardHeader,
  StyledCardContent,
  StyledGrid,
  StyledTypography,
  StyledTextField,
  StyledButton,
  StyledFormControl,
  StyledSelect,
};
