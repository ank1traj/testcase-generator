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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/GetApp";
import { styled } from "@mui/material/styles";

import toast, { Toaster } from "react-hot-toast";

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

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: "300px",
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

const options = ["Show Total Cases"];

const GenerateInteger = () => {
  const [min, setMin] = useState(-100);
  const [max, setMax] = useState(100);
  const [numValues, setNumValues] = useState(10);
  const [generatedValues, setGeneratedValues] = useState([]);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );

  const [advanceOptions, setAdvanceOptions] = useState(["Show Total Cases"]);

  const [isLoading, setIsLoading] = useState(false);

  const handleAdvanceOptionChange = (event) => {
    const { value } = event.target;
    setAdvanceOptions(value);
  };

  const handleGenerateValues = async () => {
    setIsLoading(true); // set isLoading to true
    const errorOccurred = false; // add this flag variable

    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          // add reject parameter to the promise
          setTimeout(() => {
            const startTime = performance.now();
            if (min > max) {
              reject(
                new Error("Minimum value cannot be greater than maximum value")
              );
              return;
            }
            const newValues = Array.from(
              { length: numValues },
              () =>
                Math.floor(
                  Math.random() * (parseInt(max) - parseInt(min) + 1)
                ) + parseInt(min)
            );
            const endTime = performance.now();
            const timeDiff = endTime - startTime;
            const formattedTime =
              timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;
            setTimeTaken(formattedTime);
            setGeneratedValues(newValues);
            setCopied(false);
            resolve();
          }, 2000);
        }),
        {
          loading: "Generating values...",
          success: "Values generated successfully!",
          error: (error) => {
            if (errorOccurred) {
              // show toast error if flag variable is true
              return error.message;
            } else {
              return "An error occurred while generating values";
            }
          },
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false); // set isLoading to false
  };

  const handleCopyValues = () => {
    if (!generatedValues.length) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true);
    const totalCases = advanceOptions.includes("Show Total Cases")
      ? `${numValues}\n`
      : "";

    const valuesString = `${totalCases}${generatedValues.join(" ")}`;

    navigator.clipboard.writeText(valuesString);

    toast.promise(
      navigator.clipboard.writeText(valuesString),
      {
        loading: "Copying values...",
        success: "Values copied!",
        error: "Failed to copy values",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );
    setCopied(true);
    setIsLoading(false);
  };

  const handleDownloadValues = () => {
    if (!generatedValues.length) {
      toast.error("Please generate values first");
      return;
    }

    setIsLoading(true);
    const totalCases = advanceOptions.includes("Show Total Cases")
      ? `${numValues}\n`
      : "";
    const valuesString = `${totalCases}${generatedValues.join(" ")}`;
    const element = document.createElement("a");
    const file = new Blob([valuesString], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "generated_values.txt";
    document.body.appendChild(element);
    element.click();
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: "Downloading values...",
      success: "Values downloaded!",
      error: "Failed to download values",
    });
    setIsLoading(false);
  };

  const handleResetValues = () => {
    setIsLoading(true);
    setMin(-100);
    setMax(100);
    setNumValues(10);
    setGeneratedValues([]);
    setCopied(false);
    setTimeTaken(null);
    setAdvanceOptions(["Show Total Cases"]);
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: "Resetting values...",
      success: "Values reset successfully!",
      error: "Error resetting values",
    });
    setIsLoading(false);
  };

  return (
    <StyledGrid container>
      <Toaster />
      <Grid item xs={12} sm={8} md={8} sx={{ margin: "auto" }}>
        <StyledCard>
          <StyledCardHeader title="Random Integer Generator" />
          <StyledCardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={4}>
                <Tooltip title="Advanced options">
                  <StyledFormControl>
                    <InputLabel>Advanced Options</InputLabel>
                    <StyledSelect
                      value={advanceOptions}
                      onChange={handleAdvanceOptionChange}
                      multiple
                    >
                      {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </StyledSelect>
                  </StyledFormControl>
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
                  disabled={isLoading}
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
                    disabled={isLoading}
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
                  disabled={isLoading}
                >
                  Reset
                </StyledButton>
              </Grid>
              <Grid item xs={12}>
                <StyledButton
                  variant="contained"
                  fullWidth
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadValues}
                  disabled={isLoading}
                >
                  Download
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
                <StyledTypography variant="subtitle" my={2}>
                  {advanceOptions.includes("Show Total Cases") &&
                  generatedValues.length > 0 ? (
                    <div>{generatedValues.length}</div>
                  ) : null}
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
  );
};

export default GenerateInteger;
