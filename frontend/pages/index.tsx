import {Inter} from 'next/font/google'
import {Box, Typography} from "@mui/material";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} mt={5}>
      <Typography color="primary" fontWeight={300}>Strategia school with primary color and light fw</Typography>
      <Typography color="secondary" fontWeight={400}>Strategia school with secondary color and regular fw</Typography>
      <Typography color="custom.main" fontWeight={700}>Strategia school with custom color and bald fw </Typography>
      <h1>Strategia school</h1>
    </Box>

  )
}
