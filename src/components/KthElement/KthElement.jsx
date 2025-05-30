import React, { useState, useMemo } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";

// --- MinHeap class ---
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this._bubbleUp();
  }

  pop() {
    const top = this.peek();
    const bottom = this.heap.pop();
    console.log("top", top, "bottom", bottom, this.heap);
    if (this.size()) {
      this.heap[0] = bottom;
      this._sinkDown();
    }
    return top;
  }

  _bubbleUp() {
    let index = this.heap.length - 1;
    const element = this.heap[index];
    while (index > 0) {
      let parentIdx = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIdx];
      if (element >= parent) break;
      this.heap[index] = parent;
      index = parentIdx;
    }
    this.heap[index] = element;
  }

  _sinkDown() {
    let index = 0;
    const element = this.heap[0];
    const length = this.heap.length;
    while (true) {
      let leftIdx = 2 * index + 1;
      let rightIdx = 2 * index + 2;
      let swap = null;
      if (leftIdx < length && this.heap[leftIdx] < element) {
        swap = leftIdx;
      }
      if (
        rightIdx < length &&
        this.heap[rightIdx] < (swap === null ? element : this.heap[leftIdx])
      ) {
        swap = rightIdx;
      }
      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      index = swap;
    }
    this.heap[index] = element;
  }
}

// --- KthLargest logic ---
class KthLargest {
  constructor(k, nums) {
    this.k = k;
    this.minHeap = new MinHeap();
    nums.forEach((num) => this.add(num));
  }

  add(val) {
    this.minHeap.push(val);
    if (this.minHeap.size() > this.k) {
      this.minHeap.pop();
    }
    return this.minHeap.peek();
  }

  getKthLargest() {
    return this.minHeap.peek();
  }
}

// --- React Function Component ---
const KthElement = () => {
  const [initialInput, setInitialInput] = useState("");
  const [kInput, setKInput] = useState("");
  const [newVal, setNewVal] = useState("");
  const [stream, setStream] = useState([]);
  const [k, setK] = useState(null);
  const [error, setError] = useState("");

  const kth = useMemo(() => {
    if (!k || k > stream.length || k <= 0) return "N/A";
    const instance = new KthLargest(k, stream);
     return instance.getKthLargest();
  }, [stream, k]);

  const handleInitialArray = () => {
    const nums = initialInput
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n));
    setStream(nums);
    setInitialInput("");
    setK(null);
  };

  const handleSetK = () => {
    const num = parseInt(kInput);
    if (isNaN(num) || num <= 0 || num > stream.length) {
      setError(`K must be between 1 and ${stream.length}`);
      return;
    }
    setError("");
    setK(num);
    setKInput("");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const val = parseInt(newVal);
    if (!isNaN(val)) {
      setStream((prev) => [...prev, val]);
      setNewVal("");
    }
  };

  return (
    <Paper sx={{ maxWidth: 700, mx: "auto", mt: 6, p: 4 }} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Dynamic Kth Largest in Stream
      </Typography>

      {/* Initial Array Input */}
      <Stack spacing={2} mt={2}>
        <TextField
          label="Initial Array (comma-separated)"
          value={initialInput}
          onChange={(e) => setInitialInput(e.target.value)}
        />
        <Button variant="contained" onClick={handleInitialArray}>
          Set Initial Array
        </Button>
      </Stack>

      {/* Set K value */}
      {stream.length > 0 && (
        <Stack spacing={2} mt={3}>
          <TextField
            label="Set K"
            value={kInput}
            onChange={(e) => setKInput(e.target.value)}
            type="number"
          />
          <Button variant="contained" onClick={handleSetK}>
            Set K
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      )}

      {/* Add to Stream */}
      {k && (
        <form onSubmit={handleAdd}>
          <Stack spacing={2} mt={4} direction="row">
            <TextField
              label="Add Number to Stream"
              type="number"
              value={newVal}
              onChange={(e) => setNewVal(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Stack>
        </form>
      )}

      {/* Output */}
      {k && (
        <Box mt={4}>
          <Typography variant="h6">Current Kth Largest: {kth}</Typography>
          <Typography variant="subtitle1" mt={2}>
            Stream:
          </Typography>
          {stream.map((val, idx) => (
            <Typography key={idx}>
              #{idx + 1}: {val}
            </Typography>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default KthElement;
