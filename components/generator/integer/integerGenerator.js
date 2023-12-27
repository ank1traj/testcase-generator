import { StyledComponents } from "components/style";

import { Grid, Tooltip, MenuItem, InputLabel } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/GetApp";

import toast, { Toaster } from "react-hot-toast";
import IntegerGeneratorFunc from "components/generator/integer/integerGeneratorFunc";
import Nav from "@/pages/nav";
import Footer from "@/pages/footer";

const options = ["Show Total Cases"];

const GenerateInteger = () => {
  const {
    min,
    setMin,
    max,
    setMax,
    numValues,
    setNumValues,
    generatedValues,
    copied,
    timeTaken,
    isLoading,
    handleGenerateValues,
    handleCopyValues,
    handleDownloadValues,
    handleResetValues,
    advanceOptions,
    handleAdvanceOptionChange,
  } = IntegerGeneratorFunc();

  return (
    <div>
      <Nav />
      <StyledComponents.StyledGrid container>
        <Toaster />
        <Grid item xs={12} sm={8} md={8} sx={{ margin: "auto" }}>
          <StyledComponents.StyledCard>
            <StyledComponents.StyledCardHeader title="Random Integer Generator" />
            <StyledComponents.StyledCardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Tooltip title="Enter the minimum value for the generated integers">
                    <StyledComponents.StyledTextField
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
                    <StyledComponents.StyledTextField
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
                    <StyledComponents.StyledTextField
                      label="Number of Integers"
                      type="number"
                      value={numValues}
                      onChange={(e) => {
                        if (e.target.value < 0) {
                          toast.error("Please enter a positive number");
                          setNumValues(1);
                        } else {
                          setNumValues(e.target.value);
                        }
                      }}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title="Select Advanced options" style={{width:"100%", position:"relative"}}>
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
                <Grid item xs={12}>
                  <StyledComponents.StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<GenerateIcon />}
                    onClick={handleGenerateValues}
                    disabled={isLoading}
                  >
                    Generate Integers
                  </StyledComponents.StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <CopyToClipboard
                    text={generatedValues.join(", ")}
                    onCopy={handleCopyValues}
                  >
                    <StyledComponents.StyledButton
                      variant="contained"
                      fullWidth
                      startIcon={<FileCopyIcon />}
                      disabled={isLoading}
                    >
                      {copied ? "Copied!" : "Copy Integers"}
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
                    Generated Integer
                  </StyledComponents.StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledComponents.StyledTypography variant="subtitle" my={2}>
                    {advanceOptions.includes("Show Total Cases") &&
                    generatedValues.length > 0 ? (
                      <div>{generatedValues.length}</div>
                    ) : null}
                    {generatedValues.length > 0
                      ? generatedValues.map((value, index) => (
                          <div key={index}>{value}</div>
                        ))
                      : "No Integer generated yet"}
                  </StyledComponents.StyledTypography>
                </Grid>
              </Grid>
            </StyledComponents.StyledCardContent>
          </StyledComponents.StyledCard>
        </Grid>
      </StyledComponents.StyledGrid>
      <Footer />
    </div>
  );
};

export default GenerateInteger;
