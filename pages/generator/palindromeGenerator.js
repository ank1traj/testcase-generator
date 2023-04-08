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
  Radio,
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

const options = ["Show Total Cases", "Show Length"];

const PalindromeGenerator = () => {
  const [length, setLength] = useState(2);
  const [numPalindromes, setNumPalindromes] = useState(1);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(99);
  const [generatedValues, setGeneratedValues] = useState([]);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );

  const [stringPalindrome, setStringPalindrome] = useState(true);
  const [arrayPalindrome, setArrayPalindrome] = useState(false);

  const [advanceOptions, setAdvanceOptions] = useState(["Show Total Cases"]);

  const [isLoading, setIsLoading] = useState(false);

  // Define options for string type
  const stringOptions = [
    { value: "lowercase", label: "a-z" },
    { value: "uppercase", label: "A-Z" },
    { value: "numbers", label: "0-9" },
  ];

  // Define state for selected options
  const [selectedOptions, setSelectedOptions] = useState(["lowercase"]);

  // Define function to handle checkbox changes
  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleAdvanceOptionChange = (event) => {
    const { value } = event.target;
    setAdvanceOptions(value);
  };

  const handleGenerateValues = async () => {
    setIsLoading(true); // set isLoading to true
    let errorOccurred = false; // add this flag variable

    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          // add reject parameter to the promise
          setTimeout(() => {
            let values = [];

            const startTime = performance.now();

            if (stringPalindrome) {
              const allowedChars =
                selectedOptions.length > 0
                  ? selectedOptions
                      .map((option) => {
                        switch (option) {
                          case "lowercase":
                            return "abcdefghijklmnopqrstuvwxyz";
                          case "uppercase":
                            return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                          case "numbers":
                            return "0123456789";
                          default:
                            return "";
                        }
                      })
                      .join("")
                  : "";
              if (
                allowedChars === "" ||
                isNaN(length) ||
                isNaN(numPalindromes) ||
                length < 2
              ) {
                setGeneratedValues([]);
                if (allowedChars === "") {
                  reject(
                    new Error("Please select at least one character type")
                  );
                } else if (isNaN(length)) {
                  reject(new Error("Please enter a valid palindrome length"));
                } else if (length < 2) {
                  reject(new Error("Palindrome length must be at least 2"));
                } else if (isNaN(numPalindromes)) {
                  reject(
                    new Error(
                      "Please enter a valid number of palindromes to generate"
                    )
                  );
                }
                return;
              }
              if (
                selectedOptions.includes("numbers") &&
                selectedOptions.includes("uppercase") &&
                length === 2
              ) {
                setLength(3);
                reject(
                  new Error(
                    "Cannot generate palindromes of length 2 with selected options"
                  )
                );
                return;
              }

              if (
                selectedOptions.includes("numbers") &&
                selectedOptions.includes("lowercase") &&
                length === 2
              ) {
                setLength(3);
                reject(
                  new Error(
                    "Cannot generate palindromes of length 2 with selected options"
                  )
                );
                return;
              }

              if (
                selectedOptions.includes("uppercase") &&
                selectedOptions.includes("lowercase") &&
                length === 2
              ) {
                setLength(3);
                reject(
                  new Error(
                    "Cannot generate palindromes of length 2 with selected options"
                  )
                );
                return;
              }

              if (
                selectedOptions.includes("numbers") &&
                selectedOptions.includes("uppercase") &&
                selectedOptions.includes("lowercase") &&
                length === 3
              ) {
                setLength(4);
                reject(
                  new Error(
                    "Cannot generate palindromes of length 3 with selected options"
                  )
                );
                return;
              }

              for (let i = 0; i < numPalindromes; i++) {
                let palindrome = "";
                const numChars =
                  length % 2 === 0 ? length / 2 : (length - 1) / 2 + 1;
                for (let j = 0; j < numChars; j++) {
                  const char =
                    allowedChars[
                      Math.floor(Math.random() * allowedChars.length)
                    ];
                  palindrome += char;
                }
                palindrome += [...palindrome]
                  .reverse()
                  .join("")
                  .substr(length % 2 === 0 ? 0 : 1);
                values.push(palindrome);
              }
            } else if (arrayPalindrome) {
              if (length !== ("" + max).length) {
                reject(
                  new Error(
                    `The length of the array must be equal to the number of digits in the maximum value. Here the length is ${length} and the number of digits in the maximum value is ${
                      ("" + max).length
                    }.`
                  )
                );
                return;
              } else if (length === 1 && min > 9) {
                reject(
                  new Error(
                    "It's impossible to create palindromes with length 1 and a minimum value greater than 9."
                  )
                );
                return;
              } else if (min >= max) {
                reject(
                  new Error(
                    "The minimum value must be less than the maximum value."
                  )
                );
                return;
              } else if (min >= 10 ** length || max < 10 ** (length - 1)) {
                reject(
                  new Error(
                    `It's impossible to create palindromes with length ${length}, minimum value ${min}, and maximum value ${max}.`
                  )
                );
                return;
              } else {
                while (values.length < numPalindromes) {
                  let palindromeArr = [];
                  const numDigits = arrayPalindrome
                    ? length / 2
                    : Math.floor(length / 2) + 1;

                  for (let j = 0; j < numDigits; j++) {
                    const minDigit = j === 0 && min === 0 ? 1 : 0;
                    const maxDigit =
                      j === numDigits - 1 && !arrayPalindrome ? 9 : 10;
                    const digit = Math.floor(
                      Math.random() * (maxDigit - minDigit) + minDigit
                    );
                    palindromeArr.push(digit);
                  }

                  let secondHalf = palindromeArr
                    .slice(0, Math.floor(length / 2))
                    .reverse();
                  palindromeArr = [...palindromeArr, ...secondHalf];

                  const num = parseInt(palindromeArr.join(""));
                  if (num >= min && num <= max) {
                    values.push(palindromeArr);
                  }
                }
              }
            }
            const endTime = performance.now();
            const timeDiff = endTime - startTime;
            const formattedTime =
              timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;

            setTimeTaken(formattedTime);
            setGeneratedValues(values);
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

    let values = "";

    if (
      advanceOptions.includes("Show Length") &&
      advanceOptions.includes("Show Total Cases")
    ) {
      values += `${generatedValues.length}\n`;
      values += generatedValues
        .map((value) => {
          return `${value.length}\n${
            arrayPalindrome ? value.join("") : value
          }\n`;
        })
        .join("");
    } else if (advanceOptions.includes("Show Length")) {
      values = generatedValues
        .map((value) => {
          return `${value.length}\n${
            arrayPalindrome ? value.join("") : value
          }\n`;
        })
        .join("");
    } else if (advanceOptions.includes("Show Total Cases")) {
      values = `${generatedValues.length}\n`;
      values += generatedValues
        .map((value) => {
          return `${arrayPalindrome ? value.join("") : value}\n`;
        })
        .join("");
    } else {
      values = generatedValues
        .map((value) => {
          return `${arrayPalindrome ? value.join("") : value}\n`;
        })
        .join("");
    }

    navigator.clipboard.writeText(values);
    toast.promise(
      navigator.clipboard.writeText(values),
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

    let values = "";

    if (
      advanceOptions.includes("Show Length") &&
      advanceOptions.includes("Show Total Cases")
    ) {
      values += `${generatedValues.length}\n`;
      values += generatedValues
        .map(
          (value) =>
            `${value.length}\n${arrayPalindrome ? value.join("") : value}\n`
        )
        .join("");
    } else if (advanceOptions.includes("Show Length")) {
      values = generatedValues
        .map(
          (value) =>
            `${value.length}\n${arrayPalindrome ? value.join("") : value}\n`
        )
        .join("");
    } else if (advanceOptions.includes("Show Total Cases")) {
      values += `${generatedValues.length}\n`;
      values += generatedValues
        .map((value) => `${arrayPalindrome ? value.join("") : value}\n`)
        .join("");
    } else {
      values = generatedValues
        .map((value) => `${arrayPalindrome ? value.join("") : value}\n`)
        .join("");
    }

    const element = document.createElement("a");
    const file = new Blob([values], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "palindromes.txt";
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
    setLength(2);
    setNumPalindromes(1);
    setMin(0);
    setMax(99);
    setGeneratedValues([]);
    setCopied(false);
    setSelectedOptions(["lowercase"]);
    setStringPalindrome(true);
    setArrayPalindrome(false);
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
      <Toaster reverseOrder={true} />
      <Grid item xs={12} sm={8} md={8} sx={{ margin: "auto" }}>
        <StyledCard>
          <StyledCardHeader title="Palindrome Generator" />
          <StyledCardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Tooltip title="Enter the length of Palindrome ">
                  <StyledTextField
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
                  <StyledTextField
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
              <Grid item xs={2}>
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
              <Grid item xs={2}>
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
              {stringPalindrome ? (
                stringOptions.map((option) => (
                  <Grid
                    key={option.value}
                    item
                    xs={2}
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
                      <StyledTextField
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
                      <StyledTextField
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
                <StyledButton
                  variant="contained"
                  fullWidth
                  startIcon={<GenerateIcon />}
                  onClick={() => handleGenerateValues()}
                  disabled={isLoading}
                >
                  Generate Palindromes
                </StyledButton>
              </Grid>
              <Grid item xs={6}>
                <CopyToClipboard>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<FileCopyIcon />}
                    onClick={handleCopyValues}
                    disabled={isLoading}
                  >
                    {copied ? "Copied!" : "Copy Array"}
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
                  Generated Palindrome
                </StyledTypography>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={6}>
                  <StyledTypography variant="subtitle">
                    {generatedValues.length > 0 &&
                    advanceOptions.includes("Show Total Cases")
                      ? `${numPalindromes}`
                      : null}
                  </StyledTypography>
                </Grid>
                <Grid item xs={6}>
                  <StyledTypography variant="subtitle">
                    {generatedValues.length > 0 &&
                    advanceOptions.includes("Show Length")
                      ? generatedValues.map((palindrome, index) => (
                          <div key={index}>
                            <div>{palindrome.length}</div>
                            <div>{palindrome}</div>
                          </div>
                        ))
                      : null}
                  </StyledTypography>
                </Grid>
                <StyledTypography variant="subtitle">
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
                </StyledTypography>

                <StyledTypography variant="subtitle">
                  {generatedValues.length > 0 &&
                  !advanceOptions.includes("Show Length") &&
                  stringPalindrome
                    ? generatedValues.map((palindrome) => (
                        <>
                          <div key={palindrome}>{palindrome}</div>
                        </>
                      ))
                    : null}
                </StyledTypography>
              </Grid>
            </Grid>
          </StyledCardContent>
        </StyledCard>
      </Grid>
    </StyledGrid>
  );
};

export default PalindromeGenerator;
