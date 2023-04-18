import {
  Grid,
  Typography,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Radio,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { StyledComponents } from "../style";

import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/GetApp";

import toast, { Toaster } from "react-hot-toast";

import ArrayGeneratorFunc from "components/generatorFunc/arrayGeneratorFunc.js";

const options = [
  "Negative Outputs",
  "Hide Array Size",
  "Distinct Elements",
  "Show Total Cases",
];

const GenerateArray = () => {
  const {
    minValue,
    setMinValue,
    maxValue,
    setMaxValue,
    arraySize,
    setArraySize,
    numArrays,
    setNumArrays,
    generatedValues,
    copied,
    timeTaken,
    isFloat,
    setIsFloat,
    randomSize,
    setRandomSize,
    advanceOptions,
    isLoading,
    handleGenerateValues,
    handleCopyValues,
    handleDownloadValues,
    handleResetValues,
    handleAdvanceOptionChange,
    handleSortChange,
    handleOptionChange,
    any,
    odd,
    even,
    prime,
    increasing,
    decreasing,
    random,
  } = ArrayGeneratorFunc();

  console.log(isFloat);

  return (
    <StyledComponents.StyledGrid container>
      <Toaster />
      <Grid item xs={12} sm={8} md={8} sx={{ margin: "auto" }}>
        <StyledComponents.StyledCard>
          <StyledComponents.StyledCardHeader title="Generate Array" />
          <StyledComponents.StyledCardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Tooltip title="Enter the minimum value for the array">
                  <StyledComponents.StyledTextField
                    label="Min Value"
                    type="number"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the maximum value for the array">
                  <StyledComponents.StyledTextField
                    label="Max Value"
                    type="number"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the size of the array">
                  <StyledComponents.StyledTextField
                    label="Array Size"
                    type="number"
                    value={arraySize}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error("Please enter a positive number");
                        setArraySize(10);
                      } else {
                        setArraySize(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the number of arrays to generate">
                  <StyledComponents.StyledTextField
                    label="Number of Arrays"
                    type="number"
                    value={numArrays}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error("Please enter a positive number");
                        setNumArrays(1);
                      } else {
                        setNumArrays(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={3}>
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
              <Grid item xs={2}>
                <Tooltip title="Check to generate random size arry">
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
              <Grid item xs={2}>
                <Tooltip title="Check to generate any values">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={any}
                        onChange={handleOptionChange}
                        value="any"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "any" }}
                      />
                    }
                    label="any"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Check to generate even values">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={even}
                        onChange={handleOptionChange}
                        value="even"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "even" }}
                      />
                    }
                    label="Even"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Check to generate odd values">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={odd}
                        onChange={handleOptionChange}
                        value="odd"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "odd" }}
                      />
                    }
                    label="Odd"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Check to generate prime values">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={prime}
                        onChange={handleOptionChange}
                        value="prime"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "prime" }}
                      />
                    }
                    label="Prime"
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={4}>
                <Tooltip title="Check to generate increasing values">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={increasing}
                        onChange={handleSortChange}
                        value="increasing"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "increasing" }}
                      />
                    }
                    label="Increasing"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={4}>
                <Tooltip title="Check to generate decreasing values">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={decreasing}
                        onChange={handleSortChange}
                        value="decreasing"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "decreasing" }}
                      />
                    }
                    label="Decreasing"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={4}>
                <Tooltip title="Check to generate random values">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={random}
                        onChange={handleSortChange}
                        value="random"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "random" }}
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
                  fullWidth
                  startIcon={<GenerateIcon />}
                  onClick={handleGenerateValues}
                  disabled={isLoading}
                >
                  Generate Array
                </StyledComponents.StyledButton>
              </Grid>
              <Grid item xs={6}>
                <CopyToClipboard onCopy={handleCopyValues}>
                  <StyledComponents.StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<FileCopyIcon />}
                    disabled={isLoading}
                  >
                    {copied ? "Copied" : "Copy to clipboard"}
                  </StyledComponents.StyledButton>
                </CopyToClipboard>
              </Grid>
              <Grid item xs={6}>
                <StyledComponents.StyledButton
                  variant="contained"
                  fullWidth
                  startIcon={<RefreshIcon />}
                  onClick={handleResetValues}
                  disabled={isLoading}
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
                  Generated Array
                </StyledComponents.StyledTypography>
              </Grid>
              <Grid item xs={12}>
                <StyledComponents.StyledTypography variant="subtitle">
                  {generatedValues.length === 0 ? (
                    <div>No Array generated yet</div>
                  ) : null}
                  {generatedValues.length > 0 && (
                    <>
                      <Typography variant="subtitle">
                        {advanceOptions.includes("Show Total Cases") &&
                          generatedValues.length}
                        {generatedValues.map((array, index) => (
                          <div key={index}>
                            {!advanceOptions.includes("Hide Array Size") && (
                              <div>{array.length}</div>
                            )}
                            {array.join(", ")}
                          </div>
                        ))}
                      </Typography>
                    </>
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

export default GenerateArray;
