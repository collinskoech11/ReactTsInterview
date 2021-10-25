import * as React from 'react';
import './App.css';
import axios from "axios";

const {useEffect, useState} = React;

interface UserName{
  first: string;
  last: string;
  title: string;
}

interface UserPicture {
  thumbnail: string;
}

interface UserInfo {
  name: UserName;
  picture: UserPicture;
}

//https://randomuser.me/api
const getFullUserName = (userInfo: UserInfo) => {
  const {name: {first, last}} = userInfo;
  return `${first} ${last}`;
}

function App() {
  const [counter, setCounter] = useState(0);
  const [userInfos, setUserInfos] = useState<any>([]);//first store the data before rendering it as UI
  const [randomUserDataJSON, setRandomUserDataJSON] = useState('');
  useEffect(() => {
    //mimic component didmount
    fetchRandomData().then((randomData:any) => {
      setRandomUserDataJSON(JSON.stringify(randomData, null, 2) || "No user data found");
      setUserInfos(randomData.results);//incase of future error get rid of .results & :any on randomData
    });
  }, []);
  return (
    <div className="App">
      <h1>Hello code sandbox</h1>
      <h2>Start coding to see what happens</h2>
      <p>{counter}</p>
      <button onClick={() => {
        setCounter(counter + 1);
        console.log('foo');
      }}>Increase Counter</button><br/>
      {
        userInfos.map((userInfo: UserName, idx:number) => (
          <div key={idx}>
            <p>{getFullUserName(userInfo)}</p>
            <img src={userInfo.picture.thumbnail}/>
          </div>
        ))
      }
      <pre>{randomUserDataJSON}<br/></pre>
    </div>
  );
}
const fetchRandomData = () => {
  return axios.get('https://randomuser.me/api')
  .then(({data})=> {
    //handle access
    console.log(data);
    return data
  })
  .catch(err => {
    // handle error
    console.error(err);
  });
}
export default App;
