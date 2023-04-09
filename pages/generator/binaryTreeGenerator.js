import React, { useState } from "react";
import { Grid, Tooltip } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import GenerateIcon from "@mui/icons-material/PlayArrow";
import {
  StyledButton,
  StyledCard,
  StyledCardContent,
  StyledCardHeader,
  StyledGrid,
  StyledTextField,
  StyledTypography,
} from "@/lib/styles";

const BinaryTreeGenerator = () => {
  const [height, setHeight] = useState(5)
  const [numNodes, setNumNodes] = useState(31)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(100)
  const [generatedTree, setGeneratedTree] = useState(null)
  const [copied, setCopied] = useState(false)
  const [timeTaken, setTimeTaken] = useState(
    'Click the button to generate values'
  )

  const TreeNode = function (val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }

  const generateTreeHelper = (height, numNodes, minValue, maxValue) => {
    if (height === 0 || numNodes === 0) {
      return null
    }

    const val =
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    const node = new TreeNode(val)

    const numNodesLeft = Math.floor(Math.random() * (numNodes - 1) + 1)
    const numNodesRight = numNodes - 1 - numNodesLeft

    node.left = generateTreeHelper(height - 1, numNodesLeft, minValue, val - 1)
    node.right = generateTreeHelper(
      height - 1,
      numNodesRight,
      val + 1,
      maxValue
    )

    return node
  }

  const handleGenerateTree = () => {
    const startTime = performance.now()
    const tree = generateTreeHelper(height, numNodes, minValue, maxValue)
    setGeneratedTree(tree)
    setCopied(false)
    const endTime = performance.now()
    const timeDiff = endTime - startTime
    const formattedTime =
      timeDiff < 1 ? 'less than 1 ms' : `${timeDiff.toFixed(2)} ms`
    setTimeTaken(formattedTime)
  }

  const generateJSONTree = (node) => {
    if (node === null) {
      return null
    }

    const jsonNode = { name: node.val }
    jsonNode.children = [
      generateJSONTree(node.left),
      generateJSONTree(node.right)
    ]

    return jsonNode
  }

  const getTreeValuesBFS = (root) => {
    const queue = [root]
    const values = []

    while (queue.length > 0) {
      const node = queue.shift()
      if (node !== null) {
        values.push(node.val)
        queue.push(node.left)
        queue.push(node.right)
      }
    }

    return values
  }

  const tree = generateTreeHelper(height, numNodes, minValue, maxValue)
  const values = getTreeValuesBFS(tree)

  const handleCopyTree = () => {
    const treeString = values.join(',')
    navigator.clipboard.writeText(treeString)
    setCopied(true)
  }

  const handleResetTree = () => {
    setHeight(5)
    setNumNodes(31)
    setMinValue(0)
    setMaxValue(100)
    setGeneratedTree(null)
    setCopied(false)
    setTimeTaken(null)
  }

  return (
    <>
      <StyledGrid container>
        <Grid item xs={12} sm={8} md={6} sx={{ margin: 'auto' }}>
          <StyledCard>
            <StyledCardHeader title='Binary Tree Generator' />
            <StyledCardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Tooltip title='Enter the height of the tree'>
                    <StyledTextField
                      label='Height'
                      type='number'
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      fullWidth
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    label='Number of Nodes'
                    type='number'
                    value={numNodes}
                    onChange={(e) => setNumNodes(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    label='Min Value'
                    type='number'
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    label='Max Value'
                    type='number'
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
                <Grid item xs={12}>
                  <StyledButton
                    variant='contained'
                    fullWidth
                    startIcon={<GenerateIcon />}
                    onClick={handleGenerateTree}
                  >
                    Generate Tree
                  </StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <CopyToClipboard
                    text={values.join(', ')}
                    onCopy={handleCopyTree}
                  >
                    <StyledButton
                      variant='contained'
                      fullWidth
                      startIcon={<FileCopyIcon />}
                    >
                      {copied ? 'Copied!' : 'Copy Tree'}
                    </StyledButton>
                  </CopyToClipboard>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton
                    variant='contained'
                    fullWidth
                    startIcon={<RefreshIcon />}
                    onClick={handleResetTree}
                  >
                    Reset
                  </StyledButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
                <Grid item xs={6}>
                  {timeTaken && <p>Time taken: {timeTaken}</p>}
                  <StyledTypography variant='h6'>
                    Generated Tree
                  </StyledTypography>
                </Grid>
                <Grid item xs={12}>
                  <StyledTypography variant='body2' my={2}>
                    {generatedTree
                      ? values.join(', ')
                      : 'No tree generated yet'}
                  </StyledTypography>
                </Grid>
              </Grid>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </StyledGrid>
    </>
  )
}

export default BinaryTreeGenerator
