import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Routes,Link } from 'react-router-dom';
import Counter from './components/Counter';
import UserDataForm from './components/UserDataForm';
import TextEditor from './components/TextEditor';
import Dashboard from './components/Dashboard';
import { Button,Container,Toolbar,AppBar,Box} from '@mui/material';

function App() {
  const [initialData, setInitialData] = useState(null);
  const [counter,setCounter] = useState(0);

  const setCounterValue = (value) => {
    setCounter(value);
  };

  const setUserDataValue = (value) =>{
    setInitialData(value);
    setTimeout(function(){
      window.location.reload();},1000)
  }

  useEffect(() => {
    // Fetch or load initial data (e.g., from localStorage)
    const savedData = localStorage.getItem('editorContent');
    if (savedData) {
      setInitialData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className='App'>
      <Router>
        <Container>
          <AppBar position='static'>
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
            </Toolbar>
          </AppBar>
        <Routes>
          <Route path="/" exact element={
            <Box>
              <div style={{display : 'flex'}}>
                <Counter setCounterValue={setCounterValue}/>
                <TextEditor  initialData={initialData}/>
              </div>
              <UserDataForm  setUserDataValue={setUserDataValue}/>           
            </Box>
          }>
          </Route>
          <Route path="/dashboard" element={<Dashboard
              counter={counter} 
              userData={initialData} />
              } />
        </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
