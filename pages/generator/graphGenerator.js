import React, { useEffect, useState } from "react";
import { DataSet } from "vis-data";
import { Network } from "vis-network";
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

const options = [
  "Show Total Cases",
  "Show Total Edges & Vertices",
  "A-Z",
  "a-z",
];

const GenerateGraph = () => {
  const [numVertices, setNumVertices] = useState(5);
  const [numEdges, setNumEdges] = useState(8);
  const [numGraph, setNumGraph] = useState(1);
  const [minWeight, setMinWeight] = useState(1);
  const [maxWeight, setMaxWeight] = useState(100);
  const [weightedGraph, setWeightedGraph] = useState(false);
  const [allowMultipleEdges, setAllowMultipleEdges] = useState(false);
  const [allowSelfLoops, setAllowSelfLoops] = useState(false);
  const [allowCycles, setAllowCycles] = useState(false);
  const [isDirected, setIsDirected] = useState(false);
  const [isArrow, setIsArrow] = useState(false);
  const [isColon, setIsColon] = useState(false);
  const [useCharacters, setUseCharacters] = useState(false);

  const [copied, setCopied] = useState(false);
  const [timeTaken, setTimeTaken] = useState(
    "Click the button to generate values"
  );

  const [generatedGraph, setGeneratedGraph] = useState(null);

  const [advanceOptions, setAdvanceOptions] = useState(["Show Total Cases"]);

  useEffect(() => {
    if (
      useCharacters &&
      !advanceOptions.includes("a-z") &&
      !advanceOptions.includes("A-Z")
    ) {
      alert(
        "Please select 'a-z' or 'A-Z' from advanced options when using characters."
      );
    }
  }, [useCharacters, advanceOptions]);

  const handleAdvanceOptionChange = (event) => {
    const { value } = event.target;
    setAdvanceOptions(value);
  };

  const generateGraphs = (numGraphs) => {
    if (numVertices <= 1) {
      alert("Number of vertices must be greater than 0");
      return;
    }
    const maxNumEdges = isDirected
      ? numVertices * (numVertices - 1)
      : (numVertices * (numVertices - 1)) / 2;
    if (numEdges > maxNumEdges) {
      alert(
        `Number of edges must be less than or equal to ${maxNumEdges} for ${numVertices} vertices`
      );
      return;
    }
    if (weightedGraph && minWeight >= maxWeight) {
      alert("Minimum weight must be less than maximum weight");
      return;
    }

    const startTime = performance.now();
    const generatedData = [];

    for (let i = 0; i < numGraphs; i++) {
      const nodes = new DataSet(
        Array.from({ length: numVertices }, (_, i) => ({
          id: i,
          label: i.toString(),
        }))
      );

      const alphabet = "abcdefghijklmnopqrstuvwxyz";
      if (useCharacters && advanceOptions.includes("A-Z")) {
        nodes.forEach((node) => {
          const char = alphabet[node.id];
          node.label = char.toUpperCase();
        });
      }

      if (useCharacters && advanceOptions.includes("a-z")) {
        nodes.forEach((node) => {
          const char = alphabet[node.id];
          node.label = char;
        });
      }

      const edges = new DataSet();
      const graphData = { nodes: nodes.get(), edges: [] };

      while (edges.length < numEdges) {
        const from = Math.floor(Math.random() * numVertices);
        const to = Math.floor(Math.random() * numVertices);
        const isSelfLoop = from === to;
        const isCycle =
          allowCycles &&
          edges.get().some((edge) => edge.from === to && edge.to === from);
        const isMultipleEdge =
          allowMultipleEdges &&
          edges.get().some((edge) => edge.from === from && edge.to === to);

        if (
          !isSelfLoop &&
          !isCycle &&
          (!isMultipleEdge ||
            allowSelfLoops ||
            !edges.get().some((edge) => edge.from === to && edge.to === from))
        ) {
          const type = isDirected ? "arrow" : undefined;
          const weight = weightedGraph
            ? Math.floor(Math.random() * (maxWeight - minWeight + 1)) +
              minWeight
            : undefined;
          const edgeData = { from, to };
          if (type) {
            edgeData.type = type;
          }
          if (weight) {
            edgeData.label = weight;
          }
          if (useCharacters && advanceOptions.includes("A-Z")) {
            const charCodeA = 65; // ASCII code for 'A'
            const charCodeZ = 90; // ASCII code for 'Z'
            const randomChar = () =>
              String.fromCharCode(
                Math.floor(Math.random() * (charCodeZ - charCodeA + 1)) +
                  charCodeA
              );

            edgeData.to = randomChar();
            edgeData.from = randomChar();
          }

          if (useCharacters && advanceOptions.includes("a-z")) {
            const charCodeA = 97; // ASCII code for 'a'
            const charCodeZ = 122; // ASCII code for 'z'
            const randomChar = () =>
              String.fromCharCode(
                Math.floor(Math.random() * (charCodeZ - charCodeA + 1)) +
                  charCodeA
              );

            edgeData.to = randomChar();
            edgeData.from = randomChar();
          }

          edges.add(edgeData);
          graphData.edges.push(edgeData);
        }
      }

      //   const container = document.createElement("div");
      //   container.id = `graph-${i + 1}`;
      //   document.body.appendChild(container);

      const data = { nodes, edges };
      const options = {
        edges: {
          font: {
            size: 16,
          },
        },
      };

      //   const network = new Network(container, data, options);

      generatedData.push(graphData);
    }

    setGeneratedGraph(generatedData);
    const endTime = performance.now();
    const timeDiff = endTime - startTime;
    const formattedTime =
      timeDiff < 1 ? "less than 1 ms" : `${timeDiff.toFixed(2)} ms`;

    setTimeTaken(formattedTime);
    setCopied(false);
  };

  const handleCopyGraphs = () => {
    if (!generatedGraph) {
      alert("Please generate values first");
      return;
    }

    let graphStrings = generatedGraph.map((graph) => {
      const nodes = graph.nodes.map((node) => node.label);
      const edges = graph.edges.map((edge) => {
        const from = edge.from;
        const to = edge.to;
        const type = edge.type;
        const label = edge.label;
        let edgeString = isDirected ? `${from} -> ${to}` : `${from} ${to}`;
        edgeString = isArrow ? `${from} -> ${to}` : `${from} ${to}`;

        if (weightedGraph && label) {
          edgeString += isColon ? ` : ${label}` : ` ${label}`;
        }

        return edgeString;
      });

      const graphString = `${nodes.join("\n")}\n${edges.join("\n")}`;

      if (
        advanceOptions.includes("Show Total Edges & Vertices") &&
        advanceOptions.includes("Show Total Cases")
      ) {
        return `${numGraph}\n${graph.edges.length} ${graph.nodes.length}\n${graphString}\n`;
      }

      if (advanceOptions.includes("Show Total Cases")) {
        return `${numGraph}\n${graphString}`;
      }

      if (advanceOptions.includes("Show Total Edges & Vertices")) {
        return `${graph.edges.length} ${graph.nodes.length}\n${graphString}\n`;
      }

      return graphString;
    });

    const text = graphStrings.join("\n\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const handleDownloadValues = () => {
    if (!generatedGraph) {
      alert("Please generate values first");
      return;
    }

    let graphStrings = generatedGraph.map((graph) => {
      const nodes = graph.nodes.map((node) => node.label);
      const edges = graph.edges.map((edge) => {
        const from = edge.from;
        const to = edge.to;
        const type = edge.type;
        const label = edge.label;
        const edgeString = isDirected
          ? `${from} ${type} ${to}`
          : `${from} ${to} \n`;
        return label ? `${edgeString} : ${label}` : edgeString;
      });
      const graphString = `${nodes.join(" ")}\n${edges.join("")}`;

      if (
        advanceOptions.includes("Show Total Edges & Vertices") &&
        advanceOptions.includes("Show Total Cases")
      ) {
        return `${numGraph}\nTotal Edges: ${graph.edges.length}\nTotal Vertices: ${graph.nodes.length}\n${graphString}\n`;
      }

      if (advanceOptions.includes("Show Total Cases")) {
        return `${numGraph}\n${graphString}\nTotal Cases: ${graph.edges.length}`;
      }

      if (advanceOptions.includes("Show Total Edges & Vertices")) {
        return `Total Edges: ${graph.edges.length}\nTotal Vertices: ${graph.nodes.length}\n${graphString}\n`;
      }

      return graphString;
    });

    const text = graphStrings.join("\n\n");

    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "graph.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const handleResetValues = () => {
    setNumVertices(5);
    setNumEdges(8);
    setNumGraph(1);
    setMinWeight(1);
    setMaxWeight(100);
    setWeightedGraph(false);
    setAllowMultipleEdges(false);
    setAllowSelfLoops(false);
    setAllowCycles(false);
    setIsDirected(false);
    setUseCharacters(false);
    setGeneratedGraph(null);
    setCopied(false);
    setAdvanceOptions(["Show Total Cases"]);
  };

  return (
    <>
      {" "}
      <StyledGrid container>
        <Grid item xs={12} sm={8} md={8} sx={{ margin: "auto" }}>
          <StyledCard>
            <StyledCardHeader title="Graph Generator" />
            <StyledCardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Tooltip title="Enter the number of edges of graph">
                    <StyledTextField
                      label="Number of edges"
                      type="number"
                      value={numEdges}
                      onChange={(e) => {
                        if (e.target.value < 0) {
                          alert("Please enter a positive number");
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
                    <StyledTextField
                      label="Number of vertices"
                      type="number"
                      value={numVertices}
                      onChange={(e) => {
                        if (e.target.value < 0) {
                          alert(
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
                    <StyledTextField
                      label="Number of graph"
                      type="number"
                      value={numGraph}
                      onChange={(e) => {
                        if (e.target.value < 0) {
                          alert("Please enter a positive number");
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
                  <Tooltip title="Advanced options">
                    <StyledFormControl>
                      <InputLabel>Advanced Options</InputLabel>
                      <StyledSelect
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
                              (advanceOptions.includes("A-Z") &&
                                option === "a-z")
                            }
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </StyledSelect>
                    </StyledFormControl>
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                <Grid item xs={3}>
                  <Tooltip title="Weighet Graph">
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
                    <StyledTextField
                      label="Minimum weight"
                      type="number"
                      value={minWeight}
                      onChange={(e) => {
                        if (e.target.value < 0) {
                          alert("Please enter a positive number");
                          setMinWeight(0);
                        } else {
                          setMinWeight(e.target.value);
                        }
                      }}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={6}>
                  <Tooltip title="Enter the maximum weight">
                    <StyledTextField
                      label="Maximum weight"
                      type="number"
                      value={maxWeight}
                      onChange={(e) => {
                        if (e.target.value < 0) {
                          alert("Please enter a positive number");
                          setMaxWeight(100);
                        } else {
                          setMaxWeight(e.target.value);
                        }
                      }}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
                <Grid item xs={3}>
                  <Tooltip title="Multiple Edges">
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
                  <Tooltip title="Self loop">
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
                  <Tooltip title="Cycles">
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
                  <Tooltip title="Directed Graph">
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
                  <StyledButton
                    variant="contained"
                    fullWidth
                    startIcon={<GenerateIcon />}
                    onClick={() => generateGraphs(numGraph)}
                  >
                    Generate Graph
                  </StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton
                    variant="contained"
                    onClick={handleCopyGraphs}
                    fullWidth
                    startIcon={
                      <CopyToClipboard onCopy={handleCopyGraphs}>
                        <FileCopyIcon />
                      </CopyToClipboard>
                    }
                  >
                    {copied ? "Copied" : "Copy"}
                  </StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton
                    variant="contained"
                    onClick={handleResetValues}
                    fullWidth
                    startIcon={<RefreshIcon />}
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
                    Generated Graph
                  </StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant="body2" my={2}>
                    {advanceOptions.includes("Show Total Cases") &&
                    generatedGraph
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

export default GenerateGraph;
