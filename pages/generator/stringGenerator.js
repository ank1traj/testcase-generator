import { useState } from "react";
import Link from "next/link";

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";

import NavigationBar from "@/component/navigation";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  borderRadius: "12px",
  width: "100%",
  height: "100%",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
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
  height: "100vh",
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

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#fff",
}));

const GenerateString = () => {
  const [stringLength, setStringLength] = useState(10);
  const [numStrings, setNumStrings] = useState(1);
  const [excludedChars, setExcludedChars] = useState("");
  const [generatedStrings, setGeneratedStrings] = useState([]);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState("Click the button to generate values");

  const handleGenerateStrings = () => {
    const startTime = performance.now();
    let newStrings = [];
    for (let i = 0; i < numStrings; i++) {
      let newString = "";
      while (newString.length < stringLength) {
        const char = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
        if (!excludedChars.includes(char)) {
          newString += char;
        }
      }
      newStrings.push(newString);
    }
    const endTime = performance.now();
    const timeDiff = endTime - startTime;
    const formattedTime = timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;
    setTimeTaken(formattedTime);
    setGeneratedStrings(newStrings);
    setCopied(false);
  };

  const handleCopyStrings = () => {
    const stringsString = generatedStrings.join(", ");
    navigator.clipboard.writeText(stringsString);
    setCopied(true);
  };

  const handleResetValues = () => {
    setStringLength(10);
    setNumStrings(1);
    setExcludedChars("");
    setGeneratedStrings([]);
    setCopied(false);
    setTimeTaken(null)
  };

  return (
    <>
      <NavigationBar />
      <StyledGrid container>
        <Grid item xs={12} sm={8} md={6} sx={{ margin: "auto" }}>
          <StyledCard>
            <StyledCardHeader title="Random String Generator" />
            <StyledCardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Tooltip title="Enter the number of string">
                    <StyledTextField
                      label="Number of Strings"
                      type="number"
                      variant="standard"
                      value={numStrings}
                      onChange={(e) => setNumStrings(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Enter the length of the string">
                    <StyledTextField
                      label="string length"
                      type="number"
                      variant="standard"
                      value={stringLength}
                      onChange={(e) => setStringLength(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Enter the number of integers to generate">
                    <StyledTextField
                      label="Excluded Characters"
                      variant="standard"
                      value={excludedChars}
                      onChange={(e) => setExcludedChars(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <StyledButton
                    variant="contained"
                    onClick={handleGenerateStrings}
                    fullWidth
                    startIcon={<GenerateIcon />}
                  >
                    Generate
                  </StyledButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                <Grid item xs={6}>
                  <StyledButton
                    variant="contained"
                    onClick={handleCopyStrings}
                    fullWidth
                    startIcon={
                      <CopyToClipboard
                        text={generatedStrings.join(", ")}
                        onCopy={handleCopyStrings}
                      >
                        <FileCopyIcon />
                      </CopyToClipboard>
                    }
                  >
                    {copied ? "Copied" : "Copy"}
                  </StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton
                    variant="contained"
                    onClick={handleResetValues}
                    fullWidth
                    startIcon={<RefreshIcon />}
                  >
                    Reset
                  </StyledButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                <Grid item xs={6}>
                  <StyledTypography variant="h6">
                    Generated String
                  </StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  {timeTaken && <p>Time taken: {timeTaken}</p>}
                  <StyledTypography variant="body2" my={2}>
                    {generatedStrings.length > 0
                      ? generatedStrings.join(", ")
                      : "No String generated yet"}
                  </StyledTypography>
                </Grid>
              </Grid>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </StyledGrid>
    </>
  );
};

export default GenerateString;
