import { Box, Card, Typography, Button } from "@mui/material";

const files = ["Project_Plan.pdf", "Sprint_Notes.docx", "Demo_Video.mp4"];

export default function FileManager() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Files</Typography>

      <Button variant="contained" sx={{ mt: 2 }}>
        Upload File
      </Button>

      {files.map((file) => (
        <Card key={file} sx={{ p: 2, bgcolor: "#020617", mt: 2 }}>
          {file}
        </Card>
      ))}
    </Box>
  );
}
