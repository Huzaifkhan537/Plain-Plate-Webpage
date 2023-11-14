import styled from 'styled-components'
import './styling.css'
import axios from 'axios';
import { useState } from 'react';
import { set } from 'mongoose';
import { useEffect } from 'react';



const App = () => {
  const [Images, setImages] = useState([])
  const [FilteredData, setFilteredData] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [Selectedbtn, setSelectedbtn] = useState("all")


  const searchFood = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchValue(searchValue);
    console.log(searchValue)

    if (searchValue === "") {
      setFilteredData([]);
    } else {
      const filter = Images.filter((food) =>
        food.name.toLowerCase().includes(searchValue)
      );
      setFilteredData(filter);
    }
  };

  const filterFood = (type) => {
    setSelectedbtn(type);
  };

  const API = async () => {
    try {
      const img = await axios.get('http://localhost:9000');
      const allimg = img.data;
      setImages(allimg);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    API();
  }, []);

  const filteredImages =
    Selectedbtn === 'all'
      ? Images
      : Images.filter((food) => food.type.toLowerCase() === Selectedbtn.toLowerCase());

  const displayedImages = searchValue === '' ? filteredImages : FilteredData &&
    FilteredData;




  return (
    <>
      <MainContainer>
        <TopContainer>
          
          <div>
            <h1 className='name'>Plain Plate</h1>
          </div>
          <div className='note'>
            <marquee>Note: This Webpage is only for Demo © Huzaif Khan.   </marquee>
            </div>
          <div className='search'>
            <input onChange={searchFood} placeholder="Search For Food...." />
          </div>
        </TopContainer>

      

        <FilterContainer>

        
          <Button onClick={() => filterFood("all")}>All</Button>
          <Button onClick={() => filterFood("breakfast")}>Breakfast</Button>
          <Button onClick={() => filterFood("lunch")}>Lunch</Button>
          <Button onClick={() => filterFood("dinner")}>Dinner</Button>

        </FilterContainer>

        <FoodContainer>
          <Cards >
            {displayedImages.map((img, i) => (
              <div className='box' key={img.name}>
                <img
                  src={`http://localhost:9000${img.image}`}
                  width={100}
                  height={100}
                  alt={img.name}
                />
                <p className='desc'> {img.text}</p>
                <h4 className='head'> {img.name}</h4>
                <button className='button'>$ {img.price}</button>
              </div>
              
            ))}



          </Cards>
        </FoodContainer>
      </MainContainer>
    </>
  )
};

export default App;


const MainContainer = styled.div`
max-width:1200px;
margin:0px auto`;


const TopContainer = styled.section`
height:140px;
display:flex;
justify-content:space-between;
padding:80px;
align-items:center;
font-size: 25px;

@media (0 < width < 600px) {
  flex-direction: column;
  height: 60px;
  background-color: transparent;
  gap: 13px;
  .search{
    input{
width: 300px;
    }
  scale: 0.75;
  margin-top: 50px;

  }
  .name{
    margin-top: -45px;
    scale: 0.8;
  }
  
}

.search{
  input{
background-color: transparent;
border: 2px solid black;
color: black;
border-radius: 7px;
height: 40px;
padding: 10px 10px;
font-size:14px;
  }
}


`;

const FilterContainer = styled.section`
display:flex;
justify-content: center;
gap: 12px;
`;
const Button = styled.button`
background-color: black;
border-radius: 8px;
padding:6px 12px;
height: 30px;
width: 100px;
color: white;
box-shadow: 2px 5px 5px black;
transition: 0.1s ease-in;
cursor: pointer;

:hover{
  color: #ababab;
}





`;

const FoodContainer = styled.section`
height:calc(104vh - 235px ) ;
background-image: url("/photo-1478144592103-25e218a04891.avif");
background-size: cover;
margin-top: 10px;
filter: grayscale(20%);
`;

const Cards = styled.div`
display: flex;
row-gap:20px;
column-gap:70px;
justify-content: center;
flex-wrap: wrap;


`;



