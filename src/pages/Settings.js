import SelectField from "../components/SelectField";
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Typography } from '@mui/material';
import useAxios from "../hooks/useAxios";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
  button: {
    width:'350px',
    border: '1px solid black',
    marginLeft: '40px',
    backgroundColor: '#8d79e9',
    borderRadius: "20px"
  },
})

const Settings = () => {
  const { response, error, loading } = useAxios({ url: "/api_category.php"});
  const navigate = useNavigate();
  const classes = useStyles();

  if(loading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  if(error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something when wrong !
      </Typography>
    );
  }

  const categoryOptions = [
    {id: 24, name: "Politics"},
    {id: 23, name: "History"},
    {id: 26, name: "Celebrities"},
  ];

  const amountOptions = [
    {id: 10, name: '10'},
    {id: 15, name: '15'},
    {id: 20, name: '20'},
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("./questions");
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2 className="title">Quiz</h2>
      <SelectField options={categoryOptions} label="SELECT CATEGORY"/>
      <SelectField options={amountOptions} label="AMOUNT"/>
      <Box mt={3} width="100%">
        <Button fullWidth variant="contained" type="submit" className={classes.button}> 
          Get started
        </Button>
      </Box>
    </form>
  )
}

export default Settings;