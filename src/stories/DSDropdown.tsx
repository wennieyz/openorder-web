import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import styles from './styles.module.css'

const DSDropdown = () => {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} error>
      <FormHelperText>Without label</FormHelperText>

        <Select className={styles.select}
          value={10}
          // onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>Without label</FormHelperText>
      </FormControl>
    </>
  );
};

export default DSDropdown;
