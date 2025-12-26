import { useEffect, useState } from 'react';
import styled from 'styled-components'
import SearchResult from './components/SearchResults/SearchResult';

const App = () => {

 const BASE_URL = "http://localhost:9000";




  const [data, setData] = useState(null);
  const [filterdData,setFilterdData] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [selectedBtn,setselectedBtn] = useState("all");


  
  // fetchFoodData();

  useEffect(()=>{
    const fetchFoodData =async () =>{
    setLoading (true);
  try {
  const response = await fetch(BASE_URL);
  const json = await response.json();

  setData(json);
  setFilterdData(json);
  setLoading(false);

} catch (error) {
  setError("Unable to fetch data");
}

  };
  fetchFoodData();
  },[]);

  //console.log(data);

  const searchFood =(e)=>{
    const searchValue = e.target.value;
    
    console.log(searchValue);
    if (searchValue == ""){
      setFilterdData(null);
    }
    const filter = data?.filter((food)=>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  setFilterdData(filter);
    
  }

  const filterFood =(type)=>{
    if(type === "all"){
      setFilterdData(data);
      setselectedBtn("all");
      return
    }
    const filter = data?.filter((food)=>
      food.type.toLowerCase().includes(type.toLowerCase())
  );
  setFilterdData(filter)
  setselectedBtn(type);

  }



  if(error) return <div>{error}</div>;
  if (loading) return <div>loading....</div>;


  return (
    <Container>
      <TopContainer>
        <div className="log">
          <img src="./Foody Zone.svg" alt="logo" />
        </div>

        <div className="search">
          <input onChange={searchFood} placeholder="Search Food" />
        </div>
      </TopContainer>

      <FilterContainer>
        <Button onClick={()=> filterFood("all")}>All</Button>
        <Button onClick={()=> filterFood("breakfast")}>Breakfast</Button>
        <Button onClick={()=> filterFood("lunch")}>Lunch</Button>
        <Button onClick={()=> filterFood("dinner")}>Dinner</Button>



      </FilterContainer>
      <SearchResult data ={filterdData}/>

      
    </Container>
  );
};

export default App;

const Container = styled.div `
  max-width: 1200px;
  margin:0 auto;
`;
const TopContainer = styled.section`
   height:140px;
   display: flex;
   justify-content: space-between;
   padding: 16px;
   align-items: center;

  .search{
    input{
      background-color:transparent;
      border: 1px solid red;
      color:white;
      border-radius:5px;
      height: 40px;
      font-size:16px;
      padding: 0 10px;
      }
   }

   @media (0 < width < 600px){
    flex-direction: column;
    height: 120px;
   }
`;

const FilterContainer = styled.section`
   display: flex;
   justify-content: center;
   gap: 12px
  

`;

export const Button = styled.button`
  background: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
`;


