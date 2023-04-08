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
  Radio,
  // MenuItem,
  // Select,
  // FormControl,
} from "@mui/material";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import FileCopyIcon from "@mui/icons-material/FileCopy";
// import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
// import DownloadIcon from "@mui/icons-material/GetApp";
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

// const StyledFormControl = styled(FormControl)(({ theme }) => ({
//   minWidth: "300px",
//   "& .MuiSelect-select": {
//     paddingRight: theme.spacing(4),
//   },
//   "& .MuiSelect-icon": {
//     right: 0,
//   },
// }));

// const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
//   color: theme.palette.secondary.main,
//   backgroundColor: theme.palette.background.paper,
//   "&:hover": {
//     backgroundColor: theme.palette.secondary.light,
//   },
//   "&.Mui-selected": {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//   },
//   "&.Mui-selected:hover": {
//     backgroundColor: theme.palette.primary.light,
//   },
// }));

// const StyledSelect = styled(Select)(({ theme }) => ({
//   "&.MuiSelect-select": {
//     paddingRight: theme.spacing(2),
//     "&:focus": {
//       backgroundColor: "transparent",
//     },
//   },
//   "& .MuiSelect-icon": {
//     color: theme.palette.secondary.main,
//   },
// }));

const GenerateMatrix = () => {
  const [numMatrix, setNumMatrix] = useState(1);
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(100);
  const [matrix, setMatrix] = useState([]);
  const [copied, setCopied] = useState(false);

  const [any, setAny] = useState(true);
  const [isOdd, setIsOdd] = useState(false);
  const [isEven, setIsEven] = useState(false);
  const [prime, setPrime] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );
  const [selectedOption, setSelectedOption] = useState("any");

  const [increasing, setIncreasing] = useState(false); // for sorting in increasing order
  const [decreasing, setDecreasing] = useState(false); // for sorting in decreasing order
  const [random, setRandom] = useState(true); // for random order

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
        setIsEven(true);
        setIsOdd(false);
        setPrime(false);
        setAny(false);
        break;
      case "odd":
        setIsEven(false);
        setIsOdd(true);
        setPrime(false);
        setAny(false);
        break;
      case "prime":
        setIsEven(false);
        setIsOdd(false);
        setPrime(true);
        setAny(false);
        break;
      default:
        setIsEven(false);
        setIsOdd(false);
        setPrime(false);
        setAny(true);
        break;
    }
  };

  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    const limit = Math.sqrt(num);
    for (let i = 3; i <= limit; i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const handleGenerateValues = () => {
    const startTime = performance.now();
    let matrix = [];

    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < columns; j++) {
        let value;

        // Generate odd numbers only
        if (isOdd) {
          do {
            value = getRandomNumber(minValue, maxValue);
          } while (value % 2 === 0);
        }

        // Generate even numbers only
        if (isEven) {
          do {
            value = getRandomNumber(minValue, maxValue);
          } while (value % 2 !== 0);
        }

        // Generate prime numbers only
        if (isPrime) {
          do {
            value = getRandomNumber(minValue, maxValue);
          } while (!isPrime(value));
        }

        row.push(value);
      }
      matrix.push(row);
    }

    // Sort the matrix if requested by user
    if (increasing) {
      matrix = matrix.map((row) => {
        return row.sort((a, b) => a - b);
      });
    } else if (decreasing) {
      matrix = matrix.map((row) => {
        return row.sort((a, b) => b - a);
      });
    } else if (random) {
      matrix = matrix.map((row) => {
        return row.sort(() => Math.random() - 0.5);
      });
    }

    const endTime = performance.now();
    const timeDiff = endTime - startTime;
    const formattedTime =
      timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;
    setTimeTaken(`Time taken: ${formattedTime}`);
    setMatrix(matrix);
  };

  //   const handleGenerateValues = () => {
  //     const startTime = performance.now();
  //     let matrix = [];
  //     let value;
  //     let count = minValue % 2 === 0 ? minValue + 1 : minValue; // Start with the next odd number after minValue
  //     const range = maxValue - minValue + 1;
  //     let attempts = 0;

  //     for (let i = 0; i < rows; i++) {
  //       let row = [];
  //       for (let j = 0; j < columns; j++) {
  //         if (isOdd) {
  //           // Generate odd numbers only
  //           while (
  //             (count % 2 === 0 || count < minValue || count > maxValue) &&
  //             attempts < 10 * range
  //           ) {
  //             count++;
  //             attempts++;
  //           }
  //           if (attempts >= 10 * range) {
  //             // Unable to generate a valid value after 10 times the range of values
  //             value = getRandomNumber(minValue, maxValue);
  //           } else {
  //             value = count;
  //             count += 2;
  //           }
  //         } else if (isEven) {
  //           // Generate even numbers only
  //           while (
  //             (count % 2 !== 0 || count < minValue || count > maxValue) &&
  //             attempts < 10 * range
  //           ) {
  //             count++;
  //             attempts++;
  //           }
  //           if (attempts >= 10 * range) {
  //             // Unable to generate a valid value after 10 times the range of values
  //             value = getRandomNumber(minValue, maxValue);
  //           } else {
  //             value = count;
  //             count += 2;
  //           }
  //         } else if (prime) {
  //           // Generate prime numbers
  //           while (
  //             (!isPrime(count) || count < minValue || count > maxValue) &&
  //             attempts < 10 * range
  //           ) {
  //             count++;
  //             attempts++;
  //           }
  //           if (attempts >= 10 * range) {
  //             // Unable to generate a valid value after 10 times the range of values
  //             value = getRandomNumber(minValue, maxValue);
  //           } else {
  //             value = count;
  //             count++;
  //           }
  //         } else {
  //           // Generate random numbers
  //           value = getRandomNumber(minValue, maxValue);
  //         }
  //         row.push(value);
  //         attempts = 0; // Reset the attempts counter for the next iteration
  //       }
  //       matrix.push(row);
  //     }

  //     // Sort the matrix if requested by user
  //     if (increasing) {
  //       matrix = matrix.map((row) => {
  //         return row.sort((a, b) => a - b);
  //       });
  //     } else if (decreasing) {
  //       matrix = matrix.map((row) => {
  //         return row.sort((a, b) => b - a);
  //       });
  //     } else if (random) {
  //       matrix = matrix.map((row) => {
  //         return row.sort(() => Math.random() - 0.5);
  //       });
  //     }

  //     const endTime = performance.now();
  //     const timeDiff = endTime - startTime;
  //     const formattedTime =
  //       timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;
  //     setTimeTaken(`Time taken: ${formattedTime}`);

  //     setMatrix(matrix);
  //   };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + parseInt(min);
  };

  return (
    <StyledGrid container>
      <Grid item xs={12} sm={8} md={8} sx={{ margin: "auto" }}>
        <StyledCard>
          <StyledCardHeader title="Matrix Generator" />
          <StyledCardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Tooltip title="Enter the number of matrix ">
                  <StyledTextField
                    label="Number of Matrix"
                    type="number"
                    value={numMatrix}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        alert("Please enter a positive number");
                        setNumMatrix(1);
                      } else {
                        setNumEdges(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the number of rows">
                  <StyledTextField
                    label="Number of Rows"
                    type="number"
                    value={rows}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        alert("Please enter a positive number");
                        setRows(1);
                      } else {
                        setRows(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the number of columns">
                  <StyledTextField
                    label="Number of Columns"
                    type="number"
                    value={columns}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        alert("Please enter a positive number");
                        setColumns(1);
                      } else {
                        setColumns(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the minimum value">
                  <StyledTextField
                    label="Minimum Value"
                    type="number"
                    value={minValue}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        alert("Please enter a positive number");
                        setMinValue(1);
                      } else {
                        setMinValue(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the maximum value">
                  <StyledTextField
                    label="Maximum Value"
                    type="number"
                    value={maxValue}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        alert("Please enter a positive number");
                        setMaxValue(1);
                      } else {
                        setMaxValue(e.target.value);
                      }
                    }}
                    fullWidth
                  />
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
                        checked={isEven}
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
                        checked={isOdd}
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
                <StyledButton
                  variant="contained"
                  fullWidth
                  startIcon={<GenerateIcon />}
                  onClick={handleGenerateValues}
                >
                  Generate Array
                </StyledButton>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={6}>
                {timeTaken && <p>Time taken: {timeTaken}</p>}
                <StyledTypography variant="h6">
                  Generated Matrix
                </StyledTypography>
              </Grid>
              <Grid item xs={12}>
                <StyledTypography variant="subtitle">
                  {matrix.map((row, rowIndex) => {
                    return (
                      <p key={rowIndex}>
                        {row.map((col, colIndex) => {
                          return col + " ";
                        })}
                      </p>
                    );
                  })}
                </StyledTypography>
              </Grid>
            </Grid>
          </StyledCardContent>
        </StyledCard>
      </Grid>
    </StyledGrid>
  );
};

export default GenerateMatrix;
