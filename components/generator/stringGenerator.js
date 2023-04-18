import { StyledComponents } from "components/style";

import {
  Grid,
  Typography,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Radio,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/GetApp";

import toast, { Toaster } from "react-hot-toast";

import StringGeneratorFunc from "components/generatorFunc/stringGeneratorFunc";

const options = [
  "Hide Length",
  "Hide Number of Strings",
  "Distinct Strings",
  "Distinct Strings (Case Insensitive)",
  "Distinct Characters",
];

const GenerateString = () => {
  const {
    stringLength,
    setStringLength,
    numStrings,
    setNumStrings,
    excludedChars,
    setExcludedChars,
    includedChars,
    setIncludedChars,
    generatedStrings,
    copied,
    timeTaken,
    smallAlphabets,
    setSmallAlphabets,
    capitalAlphabets,
    setCapitalAlphabets,
    numbers,
    setNumbers,
    specialChars,
    setSpecialChars,
    randomSize,
    setRandomSize,
    advanceOptions,
    isLoading,
    handleGenerateStrings,
    handleCopyStrings,
    handleDownloadValues,
    handleResetValues,
    handleAdvanceOptionChange,
    increasing,
    decreasing,
    random,
    handleSortChange,
  } = StringGeneratorFunc();

  return (
    <StyledComponents.StyledGrid container>
      <Toaster />
      <Grid item xs={12} sm={8} md={8} sx={{ margin: "auto" }}>
        <StyledComponents.StyledCard>
          <StyledComponents.StyledCardHeader title="Random String Generator" />
          <StyledComponents.StyledCardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Tooltip title="Enter the number of string">
                  <StyledComponents.StyledTextField
                    label="Number of Strings"
                    type="number"
                    value={numStrings}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error("Please enter a positive number");
                        setNumStrings(1);
                      } else {
                        setNumStrings(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the length of the string">
                  <StyledComponents.StyledTextField
                    label="string length"
                    type="number"
                    value={stringLength}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error("Please enter a positive number");
                        setStringLength(10);
                      } else {
                        setStringLength(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={2}>
                <Tooltip title="Check for random size">
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
                </Tooltip>
              </Grid>
              <Grid item xs={4}>
                <Tooltip title="Select Advanced options">
                  <StyledComponents.StyledFormControl>
                    <InputLabel>Advanced Options</InputLabel>
                    <StyledComponents.StyledSelect
                      value={advanceOptions}
                      onChange={handleAdvanceOptionChange}
                      multiple
                    >
                      {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </StyledComponents.StyledSelect>
                  </StyledComponents.StyledFormControl>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={3}>
                <Tooltip title="Check to include a-z">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={smallAlphabets}
                        onChange={(e) => setSmallAlphabets(e.target.checked)}
                        name="a-z"
                      />
                    }
                    label="a-z"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Check to include A-Z">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={capitalAlphabets}
                        onChange={(e) => setCapitalAlphabets(e.target.checked)}
                        name="A-Z"
                      />
                    }
                    label="A-Z"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Check to include 0-9">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={numbers}
                        onChange={(e) => setNumbers(e.target.checked)}
                        name="0-9"
                      />
                    }
                    label="0-9"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Check to include special chars">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={specialChars}
                        onChange={(e) => setSpecialChars(e.target.checked)}
                        name="special chars"
                      />
                    }
                    label="special chars"
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={6}>
                <Tooltip title="Enter the chars to be exclude">
                  <StyledComponents.StyledTextField
                    label="Exclude Characters"
                    value={excludedChars}
                    onChange={(e) => setExcludedChars(e.target.value)}
                    fullWidth
                  />
                </Tooltip>
              </Grid>

              <Grid item xs={6}>
                <Tooltip title="Enter the chars to be include">
                  <StyledComponents.StyledTextField
                    label="Include Characters"
                    value={includedChars}
                    onChange={(e) => setIncludedChars(e.target.value)}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={4}>
                <Tooltip title="Check to generate increasing values(Only work with multiple strings)">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={increasing}
                        onChange={handleSortChange}
                        value="increasing"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "increasing" }}
                        disabled={numStrings <= 1}
                      />
                    }
                    label="Increasing"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={4}>
                <Tooltip title="Check to generate decreasing values(Only work with multiple strings)">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={decreasing}
                        onChange={handleSortChange}
                        value="decreasing"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "decreasing" }}
                        disabled={numStrings <= 1}
                      />
                    }
                    label="Decreasing"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={4}>
                <Tooltip title="Check to generate random values(Only work with multiple strings)">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={random}
                        onChange={handleSortChange}
                        value="random"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "random" }}
                        disabled={numStrings <= 1}
                      />
                    }
                    label="Random"
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={12}>
                <StyledComponents.StyledButton
                  variant="contained"
                  onClick={handleGenerateStrings}
                  disabled={isLoading}
                  fullWidth
                  startIcon={<GenerateIcon />}
                >
                  Generate
                </StyledComponents.StyledButton>
              </Grid>
              <Grid item xs={6}>
                <StyledComponents.StyledButton
                  variant="contained"
                  onClick={handleCopyStrings}
                  disabled={isLoading}
                  fullWidth
                  startIcon={
                    <CopyToClipboard onCopy={handleCopyStrings}>
                      <FileCopyIcon />
                    </CopyToClipboard>
                  }
                >
                  {copied ? "Copied" : "Copy to clipboard"}
                </StyledComponents.StyledButton>
              </Grid>
              <Grid item xs={6}>
                <StyledComponents.StyledButton
                  variant="contained"
                  onClick={handleResetValues}
                  disabled={isLoading}
                  fullWidth
                  startIcon={<RefreshIcon />}
                >
                  Reset
                </StyledComponents.StyledButton>
              </Grid>
              <Grid item xs={12}>
                <StyledComponents.StyledButton
                  variant="contained"
                  fullWidth
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadValues}
                  disabled={isLoading}
                >
                  Download
                </StyledComponents.StyledButton>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={6}>
                {timeTaken && <p>Time taken: {timeTaken}</p>}
                <StyledComponents.StyledTypography variant="h6">
                  Generated String
                </StyledComponents.StyledTypography>
              </Grid>
              <Grid item xs={12}>
                <StyledComponents.StyledTypography variant="subtitle">
                  {generatedStrings.length === 0 ? (
                    <div>No Strings generated yet</div>
                  ) : null}
                  {generatedStrings.length > 0 && (
                    <Typography variant="subtitle">
                      {!advanceOptions.includes("Hide Number of Strings") &&
                        generatedStrings.length}
                      {generatedStrings.map((str, index) => (
                        <div key={index}>
                          {!advanceOptions.includes("Hide Length") && (
                            <div>{str.length}</div>
                          )}
                          {str}
                        </div>
                      ))}
                    </Typography>
                  )}
                </StyledComponents.StyledTypography>
              </Grid>
            </Grid>
          </StyledComponents.StyledCardContent>
        </StyledComponents.StyledCard>
      </Grid>
    </StyledComponents.StyledGrid>
  );
};

export default GenerateString;
