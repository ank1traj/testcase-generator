import { useState } from "react";
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
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

const GenerateArray = () => {
  const [minValue, setMinValue] = useState(-100);
  const [maxValue, setMaxValue] = useState(100);
  const [arraySize, setArraySize] = useState(10);
  const [numArrays, setNumArrays] = useState(1);
  const [generatedValues, setGeneratedValues] = useState([]);
  const [isFloat, setIsFloat] = useState(false);
  const [randomSize, setRandomSize] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );

  const handleGenerateValues = () => {
    const startTime = performance.now();
    let newValues = Array.from({ length: numArrays }, (_, index) => {
      const size = randomSize
        ? Math.floor(Math.random() * arraySize) + 1
        : arraySize;
      return Array.from({ length: size }, () => {
        if (isFloat) {
          return (Math.random() * (maxValue - minValue) + minValue).toFixed(2);
        } else {
          return (
            Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
          );
        }
      });
    });
    const endTime = performance.now();
    const timeDiff = endTime - startTime;
    const formattedTime =
      timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;
    setTimeTaken(formattedTime);
    setGeneratedValues(newValues);
    setCopied(false);
  };

  const handleCopyValues = () => {
    const valuesString = generatedValues.map(
      (array) => "[" + array.join(", ") + "]"
    );
    navigator.clipboard.writeText(valuesString.join("\n"));
    setCopied(true);
  };

  const handleResetValues = () => {
    setMinValue(-100);
    setMaxValue(100);
    setArraySize(10);
    setNumArrays(1);
    setGeneratedValues([]);
    setCopied(false);
    setTimeTaken(null);
    setIsFloat(false);
    setRandomSize(false);
  };

  return (
    <>
      <NavigationBar />
      <StyledGrid container>
        <Grid item xs={12} sm={8} md={6} sx={{ margin: "auto" }}>
          <StyledCard>
            <StyledCardHeader title="Generate Array" />
            <StyledCardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Tooltip title="Enter the minimum value for the array">
                    <StyledTextField
                      label="Min Value"
                      type="number"
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Enter the maximum value for the array">
                    <StyledTextField
                      label="Max Value"
                      type="number"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Enter the size of the array">
                    <StyledTextField
                      label="Array Size"
                      type="number"
                      value={arraySize}
                      onChange={(e) => setArraySize(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Enter the number of arrays to generate">
                    <StyledTextField
                      label="Number of Arrays"
                      type="number"
                      value={numArrays}
                      onChange={(e) => setNumArrays(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title="Check to generate float values">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isFloat}
                          onChange={(e) => setIsFloat(e.target.checked)}
                          name="isFloat"
                        />
                      }
                      label="Generate Float Arrays"
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={randomSize}
                        onChange={(e) => setRandomSize(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Random Size"
                  />
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
                    Generate Array
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
                    >
                      {copied ? "Copied!" : "Copy Tree"}
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
                    Generated Array
                  </StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="body2">
                    {generatedValues.length > 0 && (
                      <>
                        <Typography variant="subtitle1">
                          {numArrays}
                          {generatedValues.map((array, index) => (
                            <div key={index}>
                              <div>{generatedValues[index].length}</div>
                              {array.join(", ")}
                            </div>
                          ))}
                        </Typography>
                      </>
                    )}
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

export default GenerateArray;
