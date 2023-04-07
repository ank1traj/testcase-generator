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

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: "300px",
  "& .MuiSelect-select": {
    paddingRight: theme.spacing(4),
  },
  "& .MuiSelect-icon": {
    right: 0,
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  "&.Mui-selected:hover": {
    backgroundColor: theme.palette.primary.light,
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
  const [max, setMax] = useState(100);
  const [generatedValues, setGeneratedValues] = useState([]);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );

  const [stringPalindrome, setStringPalindrome] = useState(true);
  const [integerPalindrome, setIntegerPalindrome] = useState(false);

  const [advanceOptions, setAdvanceOptions] = useState(["Show Total Cases"]);

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

  const handleGenerateValues = () => {
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
          alert("Please select at least one character type");
        } else if (isNaN(length)) {
          alert("Please enter a valid palindrome length");
        } else if (length < 2) {
          alert("Palindrome length must be at least 2");
        } else if (isNaN(numPalindromes)) {
          alert("Please enter a valid number of palindromes to generate");
        }
        return;
      }
      if (
        selectedOptions.includes("numbers") &&
        selectedOptions.includes("uppercase") &&
        length === 2
      ) {
        setLength(3);
        alert("Cannot generate palindromes of length 2 with selected options");
        return;
      }

      if (
        selectedOptions.includes("numbers") &&
        selectedOptions.includes("lowercase") &&
        length === 2
      ) {
        setLength(3);
        alert("Cannot generate palindromes of length 2 with selected options");
        return;
      }

      if (
        selectedOptions.includes("uppercase") &&
        selectedOptions.includes("lowercase") &&
        length === 2
      ) {
        setLength(3);
        alert("Cannot generate palindromes of length 2 with selected options");
        return;
      }

      if (
        selectedOptions.includes("numbers") &&
        selectedOptions.includes("uppercase") &&
        selectedOptions.includes("lowercase") &&
        length === 3
      ) {
        setLength(4);
        alert("Cannot generate palindromes of length 3 with selected options");
        return;
      }

      for (let i = 0; i < numPalindromes; i++) {
        let palindrome = "";
        const numChars = length % 2 === 0 ? length / 2 : (length - 1) / 2 + 1;
        for (let j = 0; j < numChars; j++) {
          const char =
            allowedChars[Math.floor(Math.random() * allowedChars.length)];
          palindrome += char;
        }
        palindrome += [...palindrome]
          .reverse()
          .join("")
          .substr(length % 2 === 0 ? 0 : 1);
        values.push(palindrome);
      }
    } else if (integerPalindrome) {
      if (length === 1 && min > 9) {
        alert(
          "It's impossible to create palindromes with length 1 and a minimum value greater than 9."
        );
      } else if (min >= max) {
        alert("The minimum value must be less than the maximum value.");
      } else if (min >= 10 ** length || max < 10 ** (length - 1)) {
        alert(
          `It's impossible to create palindromes with length ${length}, minimum value ${min}, and maximum value ${max}.`
        );
      } else {
        while (values.length < numPalindromes) {
          let palindromeArr = [];
          const numDigits = integerPalindrome
            ? length / 2
            : Math.floor(length / 2) + 1;

          for (let j = 0; j < numDigits; j++) {
            const minDigit = j === 0 && min === 0 ? 1 : 0;
            const maxDigit = j === numDigits - 1 && !integerPalindrome ? 9 : 10;
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
    setCopied(false);
  };

  const handleCopyValues = () => {
    if (!generatedValues.length) {
      alert("Please generate values first");
      return;
    }

    let values = "";

    if (
      advanceOptions.includes("Show Length") &&
      advanceOptions.includes("Show Total Cases")
    ) {
      values += `${generatedValues.length}\n`;
      values += generatedValues
        .map((value) => {
          return `${value.length}\n${
            integerPalindrome ? value.join("") : value
          }\n`;
        })
        .join("");
    } else if (advanceOptions.includes("Show Length")) {
      values = generatedValues
        .map((value) => {
          return `${value.length}\n${
            integerPalindrome ? value.join("") : value
          }\n`;
        })
        .join("");
    } else if (advanceOptions.includes("Show Total Cases")) {
      values = `${generatedValues.length}\n`;
      values += generatedValues
        .map((value) => {
          return `${integerPalindrome ? value.join("") : value}\n`;
        })
        .join("");
    } else {
      values = generatedValues
        .map((value) => {
          return `${integerPalindrome ? value.join("") : value}\n`;
        })
        .join("");
    }

    navigator.clipboard.writeText(values);
    setCopied(true);
  };

  const handleDownloadValues = () => {
    if (!generatedValues.length) {
      alert("Please generate values first");
      return;
    }

    let values = "";

    if (
      advanceOptions.includes("Show Length") &&
      advanceOptions.includes("Show Total Cases")
    ) {
      values += `${generatedValues.length}\n`;
      values += generatedValues
        .map(
          (value) =>
            `${value.length}\n${integerPalindrome ? value.join("") : value}\n`
        )
        .join("");
    } else if (advanceOptions.includes("Show Length")) {
      values = generatedValues
        .map(
          (value) =>
            `${value.length}\n${integerPalindrome ? value.join("") : value}\n`
        )
        .join("");
    } else if (advanceOptions.includes("Show Total Cases")) {
      values += `${generatedValues.length}\n`;
      values += generatedValues
        .map((value) => `${integerPalindrome ? value.join("") : value}\n`)
        .join("");
    } else {
      values = generatedValues
        .map((value) => `${integerPalindrome ? value.join("") : value}\n`)
        .join("");
    }

    const element = document.createElement("a");
    const file = new Blob([values], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "palindromes.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleResetValues = () => {
    setLength(2);
    setNumPalindromes(1);
    setMin(0);
    setMax(100);
    setGeneratedValues([]);
    setCopied(false);
    setSelectedOptions(["lowercase"]);
    setStringPalindrome(true);
    setIntegerPalindrome(false);
    setAdvanceOptions(["Show Total Cases"]);
  };

  return (
    <StyledGrid container>
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
                        alert("Please enter a number greater than 1");
                        setLength(1);
                      } else {
                        setLength(e.target.value);
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
                        alert("Please enter a positive number");
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
                <Tooltip title="Click to generate integer palindromes">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={integerPalindrome}
                        onChange={(e) => {
                          setIntegerPalindrome(true);
                          setStringPalindrome(false);
                        }}
                        value="integer"
                        name="radio-button-demo"
                        inputProps={{
                          "aria-label": "integer",
                        }}
                      />
                    }
                    label="Integer"
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
                          setIntegerPalindrome(false);
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
                            alert("Please enter a positive number");
                            setMin(1);
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
                            alert("Please enter a positive number");
                            setMax(100);
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
                >
                  Generate Palindromes
                </StyledButton>
              </Grid>
              <Grid item xs={6}>
                <CopyToClipboard onCopy={handleCopyValues}>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<FileCopyIcon />}
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
                  !advanceOptions.includes("Show Length")
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
