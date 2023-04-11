import { useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  Tooltip,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import { styled } from "@mui/material/styles";

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

const GenerateInteger = () => {
  const [min, setMin] = useState(-100);
  const [max, setMax] = useState(100);
  const [numValues, setNumValues] = useState(10);
  const [generatedValues, setGeneratedValues] = useState([]);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );

  const handleGenerateValues = () => {
    const startTime = performance.now();
    const newValues = Array.from(
      { length: numValues },
      () =>
        Math.floor(Math.random() * (parseInt(max) - parseInt(min) + 1)) +
        parseInt(min)
    );
    const endTime = performance.now();
    const timeDiff = endTime - startTime;
    const formattedTime =
      timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;
    setTimeTaken(formattedTime);
    setGeneratedValues(newValues);
    setCopied(false);
  };

  const handleCopyValues = () => {
    const valuesString = generatedValues.join(", ");
    navigator.clipboard.writeText(valuesString);
    setCopied(true);
  };

  const handleResetValues = () => {
    setMin(-100);
    setMax(100);
    setNumValues(10);
    setGeneratedValues([]);
    setCopied(false);
    setTimeTaken(null);
  };

  return (
    <>
      <StyledGrid container>
        <Grid item xs={12} sm={8} md={6} sx={{ margin: "auto" }}>
          <StyledCard>
            <StyledCardHeader title="Random Integer Generator" />
            <StyledCardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Tooltip title="Enter the minimum value for the generated integers">
                    <StyledTextField
                      label="Min"
                      type="number"
                      value={min}
                      onChange={(e) => setMin(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Enter the maximum value for the generated integers">
                    <StyledTextField
                      label="Max"
                      type="number"
                      value={max}
                      onChange={(e) => setMax(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Enter the number of integers to generate">
                    <StyledTextField
                      label="Number of Integers"
                      type="number"
                      value={numValues}
                      onChange={(e) => setNumValues(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                <Grid item xs={12}>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<GenerateIcon />}
                    onClick={handleGenerateValues}
                  >
                    Generate Integers
                  </StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <CopyToClipboard
                    text={generatedValues.join(", ")}
                    onCopy={handleCopyValues}
                  >
                    <StyledButton
                      variant="contained"
                      fullWidth
                      startIcon={<FileCopyIcon />}
                      onClick={() => {
                        throw new Error("Sentry Frontend Error");
                      }}
                    >
                      {copied ? "Copied!" : "Copy Integers"}
                    </StyledButton>
                  </CopyToClipboard>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<RefreshIcon />}
                    onClick={handleResetValues}
                  >
                    Reset
                  </StyledButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                <Grid item xs={6}>
                  {timeTaken && <p>Time taken: {timeTaken}</p>}
                  <StyledTypography variant="h6">
                    Generated Integer
                  </StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="body2" my={2}>
                    {generatedValues.length > 0
                      ? generatedValues.map((value, index) => (
                          <div key={index}>{value}</div>
                        ))
                      : "No Integer generated yet"}
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

export default GenerateInteger;
