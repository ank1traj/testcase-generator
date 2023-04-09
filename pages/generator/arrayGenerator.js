import { useState } from "react";
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
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/GetApp";
import toast, { Toaster } from "react-hot-toast";
import {
  StyledButton,
  StyledCard,
  StyledCardContent,
  StyledCardHeader,
  StyledFormControl,
  StyledGrid,
  StyledSelect,
  StyledTextField,
  StyledTypography,
} from "@/lib/styles";

const options = [
  "Negative Outputs",
  "Hide Array Size",
  "Distinct Elements",
  "Show Total Cases",
];

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

  const [any, setAny] = useState(true);
  const [odd, setOdd] = useState(false);
  const [even, setEven] = useState(false);
  const [prime, setPrime] = useState(false);
  const [selectedOption, setSelectedOption] = useState("any");

  const [increasing, setIncreasing] = useState(false); // for sorting in increasing order
  const [decreasing, setDecreasing] = useState(false); // for sorting in decreasing order
  const [random, setRandom] = useState(true); // for random order

  const [advanceOptions, setAdvanceOptions] = useState(["Show Total Cases"]);

  const [isLoading, setIsLoading] = useState(false);

  const handleAdvanceOptionChange = (event) => {
    const { value } = event.target;
    setAdvanceOptions(value);
  };

  const handleSortChange = (event) => {
    switch (event.target.value) {
      case "increasing":
        setIncreasing(true);
        setDecreasing(false);
        setRandom(false);
        break;
      case "decreasing":
        setIncreasing(false);
        setDecreasing(true);
        setRandom(false);
        break;
      case "random":
        setIncreasing(false);
        setDecreasing(false);
        setRandom(true);
        break;
      default:
        setIncreasing(false);
        setDecreasing(false);
        setRandom(false);
        break;
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    switch (event.target.value) {
      case "even":
        setEven(true);
        setOdd(false);
        setPrime(false);
        setAny(false);
        break;
      case "odd":
        setEven(false);
        setOdd(true);
        setPrime(false);
        setAny(false);
        break;
      case "prime":
        setEven(false);
        setOdd(false);
        setPrime(true);
        setAny(false);
        break;
      default:
        setEven(false);
        setOdd(false);
        setPrime(false);
        setAny(true);
        break;
    }
  };

  function isPrime(n) {
    if (n <= 1) {
      return false;
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  const handleGenerateValues = async () => {
    setIsLoading(true); // set isLoading to true
    let errorOccurred = false; // add this flag variable

    try {
      await toast.promise(
        new Promise((resolve, reject) => {
          // add reject parameter to the promise
          setTimeout(() => {
            const startTime = performance.now();
            let newValues = Array.from({ length: numArrays }, (_, index) => {
              const size = randomSize
                ? Math.floor(Math.random() * arraySize) + 1
                : arraySize;
              return Array.from({ length: size }, () => {
                if (odd) {
                  let num = Math.floor(
                    Math.random() * (maxValue - minValue + 1)
                  );
                  if (num % 2 === 0) {
                    num += 1;
                  }
                  return num + parseInt(minValue);
                } else if (even) {
                  let num = Math.floor(
                    Math.random() * (maxValue - minValue + 1)
                  );
                  if (num % 2 !== 0) {
                    num += 1;
                  }
                  return num + parseInt(minValue);
                } else if (prime) {
                  let num = 0;
                  while (true) {
                    num =
                      2 *
                        Math.floor(
                          Math.random() * ((maxValue - minValue + 1) / 2)
                        ) +
                      parseInt(minValue) +
                      1;
                    let isPrime = true;
                    for (let i = 2; i <= Math.sqrt(num); i++) {
                      if (num % i === 0) {
                        isPrime = false;
                        break;
                      }
                    }
                    if (isPrime) {
                      break;
                    }
                  }
                  return num;
                } else if (isFloat) {
                  return (
                    Math.random() * (maxValue - minValue) +
                    minValue
                  ).toFixed(2);
                } else {
                  return (
                    Math.floor(Math.random() * (maxValue - minValue + 1)) +
                    parseInt(minValue)
                  );
                }
              });
            });

            if (advanceOptions.includes("Negative Outputs")) {
              newValues = newValues.map((array) => {
                array.forEach((element, index) => {
                  if (element > 0) {
                    array[index] = -element;
                  }
                });
                return array;
              });
            }

            if (advanceOptions.includes("Distinct Elements") && randomSize) {
              newValues = newValues.map((array) => {
                const set = new Set(array);
                return Array.from(set);
              });
            } else if (advanceOptions.includes("Distinct Elements")) {
              reject(
                new Error(
                  "Distinct Elements option is only available for random size"
                )
              ); // reject the promise with an error
            }

            if (increasing) {
              newValues = newValues.map((array) => array.sort((a, b) => a - b));
            } else if (decreasing) {
              newValues = newValues.map((array) => array.sort((a, b) => b - a));
            } else if (random) {
              newValues = newValues.map((array) => {
                for (let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
              });
            }

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
      ? `${numArrays}\n`
      : "";
    const valuesString = generatedValues
      .map((array) => {
        const lengthString = advanceOptions.includes("Hide Array Size")
          ? ""
          : `${array.length}\n`;
        return totalCases + lengthString + array.join(", ");
      })
      .join("\n");

    navigator.clipboard.writeText(`${totalCases}\n${valuesString}\n`);
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

    let valuesString = "";
    let totalCases = 0;
    if (
      advanceOptions.includes("Show Total Cases") &&
      advanceOptions.includes("Hide Array Size")
    ) {
      totalCases = numArrays;
      valuesString =
        `${totalCases} \n` +
        generatedValues.map((array) => array.join(", ")).join("\n");
    }

    if (
      advanceOptions.includes("Show Total Cases") &&
      !advanceOptions.includes("Hide Array Size")
    ) {
      valuesString =
        `${numArrays}\n` +
        generatedValues
          .map((array) => array.length + "\n" + array.join(", "))
          .join("\n");
    }

    if (
      !advanceOptions.includes("Show Total Cases") &&
      !advanceOptions.includes("Hide Array Size")
    ) {
      valuesString = generatedValues
        .map((array) => array.length + "\n" + array.join(", "))
        .join("\n");
    }
    const element = document.createElement("a");
    const file = new Blob([valuesString], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "generated_values.txt";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
    document.body.removeChild(element);
    toast.promise(new Promise((resolve) => setTimeout(() => resolve(), 500)), {
      pending: "Downloading values...",
      success: "Values downloaded!",
      error: "Failed to download values",
    });
    setIsLoading(false);
  };

  const handleResetValues = () => {
    setIsLoading(true);
    setMinValue(-100);
    setMaxValue(100);
    setArraySize(10);
    setNumArrays(1);
    setGeneratedValues([]);
    setCopied(false);
    setTimeTaken(null);
    setIsFloat(false);
    setRandomSize(false);
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
          <StyledCardHeader title="Generate Array" />
          <StyledCardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <Tooltip title="Enter the size of the array">
                  <StyledTextField
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
                  <StyledTextField
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
                        color="warning"
                      />
                    }
                    label="Generate Float Arrays"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={randomSize}
                      onChange={(e) => setRandomSize(e.target.checked)}
                      color="warning"
                    />
                  }
                  label="Random Size"
                />
              </Grid>
              <Grid item xs={4}>
                <Tooltip title="Advanced options">
                  <StyledFormControl>
                    <InputLabel>Advanced Options</InputLabel>
                    <StyledSelect
                      value={advanceOptions}
                      onChange={handleAdvanceOptionChange}
                      multiple
                      color="warning"
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
              <Grid item xs={2}>
                <Tooltip title="Check to generate any values">
                  <FormControlLabel
                    control={
                      <Radio
                        checked={any}
                        onChange={handleOptionChange}
                        value="any"
                        color="warning"
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
                        color="warning"
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
                        color="warning"
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
                        color="warning"
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
                        color="warning"
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
                        color="warning"
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
                        color="warning"
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
                <StyledButton
                  variant="contained"
                  fullWidth
                  startIcon={<GenerateIcon />}
                  onClick={handleGenerateValues}
                  disabled={isLoading}
                >
                  Generate Array
                </StyledButton>
              </Grid>
              <Grid item xs={6}>
                <CopyToClipboard onCopy={handleCopyValues}>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<FileCopyIcon />}
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
                  Generated Array
                </StyledTypography>
              </Grid>
              <Grid item xs={12}>
                <StyledTypography variant="subtitle">
                  {generatedValues.length > 0 && (
                    <>
                      <Typography variant="subtitle">
                        <p>
                          {advanceOptions.includes("Show Total Cases") &&
                            generatedValues.length}
                        </p>
                        {generatedValues.map((array, index) => (
                          <div key={index}>
                            {!advanceOptions.includes("Hide Array Size") && (
                              <div>{array.length}</div>
                            )}
                            <br />
                            <p>{array.join(", ")}</p>
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
  );
};

export default GenerateArray;
