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

const GenerateLinkedList = () => {
  const [headValue, setHeadValue] = useState(0);
  const [listSize, setListSize] = useState(10);
  const [minValue, setMinValue] = useState(-100);
  const [maxValue, setMaxValue] = useState(100);
  const [numLists, setNumLists] = useState(1);
  const [generatedLists, setGeneratedLists] = useState([]);
  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate linked lists"
  );

  const generateLinkedList = (head, size, min, max) => {
    const randomNum = () => Math.floor(Math.random() * (max - min + 1) + min);
    const nodes = [];
    let currentNode = { value: head, next: null };
    for (let i = 1; i < size; i++) {
      currentNode.next = { value: randomNum(), next: null };
      currentNode = currentNode.next;
      nodes.push(currentNode.value);
    }
    return nodes;
  };

  const handleGenerate = () => {
    const startTime = performance.now();
    const generatedLists = [];
    for (let i = 0; i < numLists; i++) {
      generatedLists.push(
        generateLinkedList(headValue, listSize, minValue, maxValue)
      );
    }
    setGeneratedLists(generatedLists);
    const endTime = performance.now();
    const timeDiff = endTime - startTime;

    const formattedTime =
      timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;
    setTimeTaken(formattedTime);
    setCopied(false);
  };

  const handleCopyValues = () => {
    const text = generatedLists
      .map((list) => `[${list.join(", ")}]`)
      .join(", ");
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const handleResetValues = () => {
    setHeadValue(0);
    setListSize(10);
    setMinValue(-100);
    setMaxValue(100);
    setNumLists(1);
    setGeneratedLists([]);
    setTimeTaken("Click the button to generate linked lists");
    setCopied(false);
  };

  return (
    <>
      <StyledGrid container>
        <Grid item xs={12} sm={8} md={6} sx={{ margin: "auto" }}>
          <StyledCard>
            <StyledCardHeader title="Linked List Generator" />
            <StyledCardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Tooltip title="Enter the value of the head node.">
                    <StyledTextField
                      label="Head Value"
                      type="number"
                      value={headValue}
                      onChange={(e) => setHeadValue(parseInt(e.target.value))}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Enter the number of nodes in the linked list.">
                    <StyledTextField
                      label="List Size"
                      type="number"
                      value={listSize}
                      onChange={(e) => setListSize(parseInt(e.target.value))}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Enter the minimum value of the nodes in the linked list.">
                    <StyledTextField
                      label="Min Value"
                      type="number"
                      value={minValue}
                      onChange={(e) => setMinValue(parseInt(e.target.value))}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Enter the maximum value of the nodes in the linked list.">
                    <StyledTextField
                      label="Max Value"
                      type="number"
                      value={maxValue}
                      onChange={(e) => setMaxValue(parseInt(e.target.value))}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Enter the number of linked lists to generate.">
                    <StyledTextField
                      label="Number of Lists"
                      type="number"
                      value={numLists}
                      onChange={(e) => setNumLists(parseInt(e.target.value))}
                      fullWidth
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
                    onClick={handleGenerate}
                  >
                    Generate Linked Lists
                  </StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <CopyToClipboard
                    text={generatedLists.join(", ")}
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
                    Generated Linked Lists
                  </StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="body2">
                    {generatedLists.length > 0 && (
                      <>
                        <Typography variant="subtitle1">
                          {numLists}
                          {generatedLists.map((array, index) => (
                            <div key={index}>
                              <div>{generatedLists[index].length}</div>
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
export default GenerateLinkedList;
