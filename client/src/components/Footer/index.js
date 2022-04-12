import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        background: "#D3D3D3",
      }}
    >
      <Grid
        elevation={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          width: "100%",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>copyright</h2>
          <h2>Email me for any questions</h2>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
