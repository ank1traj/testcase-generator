import { StyledComponents } from "components/style";

import {
  Grid,
  Tooltip,
  FormControlLabel,
  Checkbox,
  Radio,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/GetApp";

import toast, { Toaster } from "react-hot-toast";

import PalindromeGeneratorFunc from "components/generator/palindrome/palindromeGeneratorFunc.js";

const options = ["Show Total Cases", "Show Length"];

const PalindromeGenerator = () => {
  const {
    length,
    setLength,
    numPalindromes,
    setNumPalindromes,
    min,
    setMin,
    max,
    setMax,
    generatedValues,
    copied,
    selectedOptions,
    stringPalindrome,
    setStringPalindrome,
    arrayPalindrome,
    setArrayPalindrome,
    advanceOptions,
    timeTaken,
    isLoading,
    handleGenerateValues,
    handleCopyValues,
    handleDownloadValues,
    handleResetValues,
    handleAdvanceOptionChange,
    stringOptions,
    handleOptionChange,
  } = PalindromeGeneratorFunc();

  return (
    <StyledComponents.StyledGrid container>
      <Toaster />
      <Grid item xs={12} sm={8} md={8} sx={{ margin: "auto" }}>
        <StyledComponents.StyledCard>
          <StyledComponents.StyledCardHeader title="Palindrome Generator" />
          <StyledComponents.StyledCardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Tooltip title="Enter the length of Palindrome ">
                  <StyledComponents.StyledTextField
                    label="Lenght of Palindrome"
                    type="number"
                    value={length}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error("Please enter a number greater than 1");
                        setLength(1);
                      } else {
                        const value = Number(e.target.value);
                        setLength(value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the number of Palindrome ">
                  <StyledComponents.StyledTextField
                    label="Number of Palindrome"
                    type="number"
                    value={numPalindromes}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error("Please enter a positive number");
                        setNumPalindromes(1);
                      } else {
                        setNumPalindromes(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={6}>
                <Tooltip title="Click to generate array palindromes">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={arrayPalindrome}
                        onChange={(e) => {
                          setArrayPalindrome(true);
                          setStringPalindrome(false);
                        }}
                        value="array"
                        name="radio-button-demo"
                        inputProps={{
                          "aria-label": "array",
                        }}
                      />
                    }
                    label="Array"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Click to generate string palindromes">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={stringPalindrome}
                        onChange={(e) => {
                          setStringPalindrome(true);
                          setArrayPalindrome(false);
                        }}
                        value="string"
                        name="radio-button-demo"
                        inputProps={{
                          "aria-label": "string",
                        }}
                      />
                    }
                    label="String"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
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
              {stringPalindrome ? (
                stringOptions.map((option) => (
                  <Grid
                    key={option.value}
                    item
                    xs={3}
                    sx={{ display: "inline-block" }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedOptions.includes(option.value)}
                          onChange={() => handleOptionChange(option.value)}
                        />
                      }
                      label={option.label}
                    />
                  </Grid>
                ))
              ) : (
                <>
                  <Grid item xs={6}>
                    <Tooltip title="Enter the minimum number ">
                      <StyledComponents.StyledTextField
                        label="min"
                        type="number"
                        value={min}
                        onChange={(e) => {
                          if (e.target.value < 0) {
                            toast.error("Please enter a positive number");
                            setMin(0);
                          } else {
                            setMin(e.target.value);
                          }
                        }}
                        fullWidth
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <Tooltip title="Enter the maximum number ">
                      <StyledComponents.StyledTextField
                        label="max"
                        type="number"
                        value={max}
                        onChange={(e) => {
                          if (e.target.value < 0) {
                            toast.error("Please enter a positive number");
                            setMax(99);
                          } else {
                            setMax(e.target.value);
                          }
                        }}
                        fullWidth
                      />
                    </Tooltip>
                  </Grid>
                </>
              )}
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={12}>
                <StyledComponents.StyledButton
                  variant="contained"
                  fullWidth
                  startIcon={<GenerateIcon />}
                  onClick={() => handleGenerateValues()}
                  disabled={isLoading}
                >
                  Generate Palindromes
                </StyledComponents.StyledButton>
              </Grid>
              <Grid item xs={6}>
                <CopyToClipboard>
                  <StyledComponents.StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<FileCopyIcon />}
                    onClick={handleCopyValues}
                    disabled={isLoading}
                  >
                    {copied ? "Copied" : "Copy"}
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
                  Generated Palindrome
                </StyledComponents.StyledTypography>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <StyledComponents.StyledTypography variant="subtitle">
                    {generatedValues.length > 0 &&
                    advanceOptions.includes("Show Total Cases")
                      ? `${numPalindromes}`
                      : null}
                  </StyledComponents.StyledTypography>
                </Grid>
                <Grid item xs={6}>
                  <StyledComponents.StyledTypography variant="subtitle">
                    {generatedValues.length > 0 &&
                    advanceOptions.includes("Show Length")
                      ? generatedValues.map((palindrome, index) => (
                          <div key={index}>
                            <div>{palindrome.length}</div>
                            <div>{palindrome}</div>
                          </div>
                        ))
                      : null}
                  </StyledComponents.StyledTypography>
                </Grid>
                <StyledComponents.StyledTypography variant="subtitle">
                  {generatedValues.length === 0 ? (
                    <div>No Palindrome generated yet</div>
                  ) : null}
                  {generatedValues.length > 0 &&
                  !advanceOptions.includes("Show Length") &&
                  arrayPalindrome
                    ? generatedValues.map((palindrome) => (
                        <>
                          <div key={palindrome}>
                            {Array.isArray(palindrome) &&
                              `[${palindrome.join(", ")}]`}
                          </div>
                        </>
                      ))
                    : null}
                </StyledComponents.StyledTypography>

                <StyledComponents.StyledTypography variant="subtitle">
                  {generatedValues.length > 0 &&
                  !advanceOptions.includes("Show Length") &&
                  stringPalindrome
                    ? generatedValues.map((palindrome) => (
                        <>
                          <div key={palindrome}>{palindrome}</div>
                        </>
                      ))
                    : null}
                </StyledComponents.StyledTypography>
              </Grid>
            </Grid>
          </StyledComponents.StyledCardContent>
        </StyledComponents.StyledCard>
      </Grid>
    </StyledComponents.StyledGrid>
  );
};

export default PalindromeGenerator;
