import Card from '../Components/Card'

function Home({
    Searching,
    searchValue,
    prods,
    onAddToy,
    onAddFave,
    isLoading
}){
  const renderProds = () => {
   const filteredProds = prods.filter((item) =>  item.title.toLowerCase().includes(searchValue.toLowerCase()),
   );
    
    return (isLoading ? [...Array(8)] : filteredProds).map((item, index) => (
        <Card
          key={index}
          {...item}
          onPlus={(obj) => onAddToy(obj)} 
          onLike={(obj) => onAddFave(obj)}
          loading={isLoading}
          
        />
      ))
  }

    return (
    <div className="content">
            
    <div className="contentHead">
      <h1>Все игрушки</h1>
      <div className="search-block">
        <img width={10} src='search.png' alt='search' />
        <input onChange={Searching} value={searchValue} className="search" placeholder="Поиск..." />
      </div>
    </div>
    
    <div className="cards">
      {renderProds()}
    </div>
      
    
  </div>
    )}

export default Home;