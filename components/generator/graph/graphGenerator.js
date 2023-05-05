import { StyledComponents } from "components/style";
// import { Network } from "vis-network";
import {
  Grid,
  Tooltip,
  FormControlLabel,
  Checkbox,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import DownloadIcon from "@mui/icons-material/GetApp";

import toast, { Toaster } from "react-hot-toast";

import GraphGeneratorFunc from "components/generator/graph/graphGeneratorFunc.js";

const options = [
  "Show Total Cases",
  "Show Total Edges & Vertices",
  "A-Z",
  "a-z",
];

const GenerateGraph = () => {
  const {
    numVertices,
    setNumVertices,
    numEdges,
    setNumEdges,
    numGraph,
    setNumGraph,
    minWeight,
    setMinWeight,
    maxWeight,
    setMaxWeight,
    weightedGraph,
    setWeightedGraph,
    allowMultipleEdges,
    setAllowMultipleEdges,
    allowSelfLoops,
    setAllowSelfLoops,
    allowCycles,
    setAllowCycles,
    isDirected,
    setIsDirected,
    useCharacters,
    setUseCharacters,
    generatedGraph,
    advanceOptions,
    isArrow,
    setIsArrow,
    isColon,
    setIsColon,
    copied,
    handleGenerateValues,
    handleCopyGraphs,
    handleDownloadValues,
    handleResetValues,
    handleAdvanceOptionChange,
    timeTaken,
    isLoading,
  } = GraphGeneratorFunc();

  return (
    <StyledComponents.StyledGrid container>
      <Toaster />
      <Grid item xs={12} sm={8} md={8} sx={{ margin: "auto" }}>
        <StyledComponents.StyledCard>
          <StyledComponents.StyledCardHeader title="Graph Generator" />
          <StyledComponents.StyledCardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Tooltip title="Enter the number of edges of graph">
                  <StyledComponents.StyledTextField
                    label="Number of edges"
                    type="number"
                    value={numEdges}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error("Please enter a positive number");
                        setNumEdges(8);
                      } else {
                        setNumEdges(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the number of vertices of graph">
                  <StyledComponents.StyledTextField
                    label="Number of vertices"
                    type="number"
                    value={numVertices}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error(
                          "Please enter a positive number greater than 0"
                        );
                        setNumVertices(5);
                      } else {
                        setNumVertices(e.target.value);
                      }
                    }}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the number of graph required">
                  <StyledComponents.StyledTextField
                    label="Number of graph"
                    type="number"
                    value={numGraph}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error("Please enter a positive number");
                        setNumGraph(10);
                      } else {
                        setNumGraph(e.target.value);
                      }
                    }}
                    fullWidth
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
                        <MenuItem
                          key={option}
                          value={option}
                          disabled={
                            (!useCharacters &&
                              (option === "A-Z" || option === "a-z")) ||
                            (advanceOptions.includes("a-z") &&
                              option === "A-Z") ||
                            (advanceOptions.includes("A-Z") && option === "a-z")
                          }
                        >
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
                <Tooltip title="Select to generate Weighted Graph">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={weightedGraph}
                        onChange={(e) => setWeightedGraph(e.target.checked)}
                        name="Weighted Graph"
                      />
                    }
                    label="Weighted"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Select for adding -> between edges">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isArrow}
                        onChange={(e) => setIsArrow(e.target.checked)}
                        name="Arrow"
                      />
                    }
                    label="Include Arrow"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Select for adding : for weight">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isColon}
                        onChange={(e) => setIsColon(e.target.checked)}
                        name="Colon"
                        disabled={!weightedGraph}
                      />
                    }
                    label="Include Colon"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Make Graph of chars">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={useCharacters}
                        onChange={(e) => setUseCharacters(e.target.checked)}
                        name="Char"
                      />
                    }
                    label="Include Char"
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={6}>
                <Tooltip title="Enter the minimum weight">
                  <StyledComponents.StyledTextField
                    label="Minimum weight"
                    type="number"
                    value={minWeight}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error("Please enter a positive number");
                        setMinWeight(0);
                      } else {
                        setMinWeight(e.target.value);
                      }
                    }}
                    disabled={!weightedGraph}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={6}>
                <Tooltip title="Enter the maximum weight">
                  <StyledComponents.StyledTextField
                    label="Maximum weight"
                    type="number"
                    value={maxWeight}
                    onChange={(e) => {
                      if (e.target.value < 0) {
                        toast.error("Please enter a positive number");
                        setMaxWeight(100);
                      } else {
                        setMaxWeight(e.target.value);
                      }
                    }}
                    disabled={!weightedGraph}
                    fullWidth
                  />
                </Tooltip>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={3}>
                <Tooltip title="Select to generate Graph of Multiple Edges">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allowMultipleEdges}
                        onChange={(e) =>
                          setAllowMultipleEdges(e.target.checked)
                        }
                        name="Multiple Edges"
                      />
                    }
                    label="Multiple Edges"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Select to generate Graph with Self loop">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allowSelfLoops}
                        onChange={(e) => setAllowSelfLoops(e.target.checked)}
                        name="Self loop"
                      />
                    }
                    label="Self loop"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Select to generate Graph with Cycles">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allowCycles}
                        onChange={(e) => setAllowCycles(e.target.checked)}
                        name="Cycles"
                      />
                    }
                    label="Cycles"
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={3}>
                <Tooltip title="Select to generate Directed Graph">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isDirected}
                        onChange={(e) => setIsDirected(e.target.checked)}
                        name="Directed Graph"
                      />
                    }
                    label="Directed"
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
                  onClick={() => handleGenerateValues(numGraph)}
                  disabled={isLoading}
                >
                  Generate Graph
                </StyledComponents.StyledButton>
              </Grid>
              <Grid item xs={6}>
                <StyledComponents.StyledButton
                  variant="contained"
                  onClick={handleCopyGraphs}
                  disabled={isLoading}
                  fullWidth
                  startIcon={
                    <CopyToClipboard onCopy={handleCopyGraphs}>
                      <FileCopyIcon />
                    </CopyToClipboard>
                  }
                >
                  {copied ? "Copied" : "Copy"}
                </StyledComponents.StyledButton>
              </Grid>
              <Grid item xs={6}>
                <StyledComponents.StyledButton
                  variant="contained"
                  onClick={handleResetValues}
                  fullWidth
                  startIcon={<RefreshIcon />}
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
                  Generated Graph
                </StyledComponents.StyledTypography>
              </Grid>
              <Grid item xs={12}>
                <StyledComponents.StyledTypography variant="subtitle" my={2}>
                  {!generatedGraph ? <div>No Graph generated yet</div> : null}
                  {advanceOptions.includes("Show Total Cases") && generatedGraph
                    ? `${numGraph}`
                    : null}

                  {advanceOptions.includes("Show Total Edges & Vertices") &&
                    generatedGraph &&
                    generatedGraph.map((s, i) => (
                      <div key={i}>
                        {numEdges} {numVertices}
                        {s.nodes.map((n) => (
                          <div key={n.id}>{n.label}</div>
                        ))}
                        {s.edges.map((e, id) => {
                          let label = "";
                          if (weightedGraph && isColon) {
                            label = ` : ${e.label}`;
                          } else if (weightedGraph) {
                            label = ` ${e.label}`;
                          }
                          return (
                            <div key={id}>
                              {`${e.from}${isArrow ? " -> " : " "}${
                                e.to
                              }${label}`}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  {!advanceOptions.includes("Show Total Edges & Vertices") &&
                    generatedGraph &&
                    generatedGraph.map((s, i) => (
                      <div key={i}>
                        {s.nodes.map((n) => (
                          <div key={n.id}>{n.label}</div>
                        ))}
                        {s.edges.map((e, id) => {
                          let label = "";
                          if (weightedGraph && isColon) {
                            label = ` : ${e.label}`;
                          } else if (weightedGraph) {
                            label = ` ${e.label}`;
                          }
                          return (
                            <div key={id}>
                              {`${e.from}${isArrow ? " -> " : " "}${
                                e.to
                              }${label}`}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                </StyledComponents.StyledTypography>
              </Grid>
            </Grid>
          </StyledComponents.StyledCardContent>
        </StyledComponents.StyledCard>
      </Grid>
    </StyledComponents.StyledGrid>
  );
};

export default GenerateGraph;
