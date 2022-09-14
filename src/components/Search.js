import React, { useState } from "react";

const Search = ({productsList, setProductsList, setFilteredProducts, element}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isShown2, setIsShown2] = useState(false);
    const [roastShown, setIsRoastShow] = useState(false)
    const [countryShown, setCountryShown] = useState(false)
    const [grindShown, setGrindShown] = useState(false)


    function postMatches(element, text) {
        if (element.description.toLowerCase().includes(text.toLowerCase()) || element.name.toLowerCase().includes(text.toLowerCase()) || element.roast.toLowerCase().includes(text.toLowerCase()) || element.country.toLowerCase().includes(text.toLowerCase()) || element.grind.toLowerCase().includes(text.toLowerCase()))  {
          return true;
        }
      }
    
      function handleSubmit(event) {
        event.preventDefault()
        const filteredProducts = productsList.filter((element) => postMatches(element, searchTerm));
        {
          filteredProducts.length
            ? setFilteredProducts(filteredProducts)
            : setFilteredProducts([]);
        }
    
    }

    async function buttonClick2() {
        setIsShown2((current) => !current);
      }

      async function roastClick () {
          setIsRoastShow((current) => !current)
      }

      function handleLightClick (event) {
          event.preventDefault()
          const filterLight = productsList.filter((element) => element.roast === 'Light')
          {
              filterLight.length ?
              setFilteredProducts(filterLight) :
              setFilteredProducts([])
          }
      }
      function handleMediumClick (event) {
        event.preventDefault()
        const filterMedium = productsList.filter((element) => element.roast === 'Medium')
        {
            filterMedium.length ?
            setFilteredProducts(filterMedium) :
            setFilteredProducts([])
        }
    }

    function handleMildClick (event) {
        event.preventDefault()
        const filterMild = productsList.filter((element) => element.roast === 'Mild')
        {
            filterMild.length ?
            setFilteredProducts(filterMild) :
            setFilteredProducts([])
        }
    }

    function handleDarkClick (event) {
        event.preventDefault()
        const filterDark = productsList.filter((element) => element.roast === 'Dark')
        {
            filterDark.length ?
            setFilteredProducts(filterDark) :
            setFilteredProducts([])
        }
    }

    async function countryClick () {
        setCountryShown((current) => !current)
    }

    function handleBrazilClick (event) {
        event.preventDefault()
        const filterBrazil = productsList.filter((element) => element.country === 'Brazil')
        {
            filterBrazil.length ?
            setFilteredProducts(filterBrazil) :
            setFilteredProducts([])
        }
    }

    function handleVietnamClick (event) {
        event.preventDefault()
        const filterVietnam = productsList.filter((element) => element.country === 'Vietnam')
        {
            filterVietnam.length ?
            setFilteredProducts(filterVietnam) :
            setFilteredProducts([])
        }
    }

    function handleColombiaClick (event) {
        event.preventDefault()
        const filterColombia = productsList.filter((element) => element.country === 'Colombia')
        {
            filterColombia.length ?
            setFilteredProducts(filterColombia) :
            setFilteredProducts([])
        }
    }

    function handleIndonesiaClick (event) {
        event.preventDefault()
        const filterIndonesia = productsList.filter((element) => element.country === 'Indonesia')
        {
            filterIndonesia.length ?
            setFilteredProducts(filterIndonesia) :
            setFilteredProducts([])
        }
    }

    function handleEthiopiaClick (event) {
        event.preventDefault()
        const filterEthiopia = productsList.filter((element) => element.country === 'Ethiopia')
        {
            filterEthiopia.length ?
            setFilteredProducts(filterEthiopia) :
            setFilteredProducts([])
        }
    }

    function handleHondurasClick (event) {
        event.preventDefault()
        const filterHonduras = productsList.filter((element) => element.country === 'Honduras')
        {
            filterHonduras.length ?
            setFilteredProducts(filterHonduras) :
            setFilteredProducts([])
        }
    }

    function handleIndiaClick (event) {
        event.preventDefault()
        const filterIndia = productsList.filter((element) => element.country === 'India')
        {
            filterIndia.length ?
            setFilteredProducts(filterIndia) :
            setFilteredProducts([])
        }
    }

    function handleUgandaClick (event) {
        event.preventDefault()
        const filterUganda = productsList.filter((element) => element.country === 'Uganda')
        {
            filterUganda.length ?
            setFilteredProducts(filterUganda) :
            setFilteredProducts([])
        }
    }

    async function grindClick () {
        setGrindShown((current) => !current)
    }

    function handleWholeBeansClick (event) {
        event.preventDefault()
        const filterWholeBeans = productsList.filter((element) => element.grind === 'Whole Beans')
        {
            filterWholeBeans.length ?
            setFilteredProducts(filterWholeBeans) :
            setFilteredProducts([])
        }
    }

    function handleGroundClick (event) {
        event.preventDefault()
        const filterGround = productsList.filter((element) => element.grind === 'Ground')
        {
            filterGround.length ?
            setFilteredProducts(filterGround) :
            setFilteredProducts([])
        }
    }

    function handleInstantClick (event) {
        event.preventDefault()
        const filterInstant = productsList.filter((element) => element.grind === 'Instant')
        {
            filterInstant.length ?
            setFilteredProducts(filterInstant) :
            setFilteredProducts([])
        }
    }
    
    
    return (
      <form className="searching"onSubmit={handleSubmit}>
        <input
         id="searchBar"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        ></input>
        <button id="searchButton" type="submit">SEARCH</button>
        <button onClick={buttonClick2}>Filter</button>
        {isShown2 && (
            <div>
                <p onClick={roastClick}>Roast</p>
                {roastShown && (
                    <div>
                        <p onClick={handleLightClick}>Light</p>
                        <p onClick={handleMildClick}>Mild</p>
                        <p onClick={handleMediumClick}>Medium</p>
                        <p onClick={handleDarkClick}>Dark</p>
                    </div>
                )}
                <p onClick={countryClick}>Country</p>
                {countryShown && (
                    <div>
                        <p onClick={handleBrazilClick}>Brazil</p>
                        <p onClick={handleVietnamClick}>Vietnam</p>
                        <p onClick={handleColombiaClick}>Colombia</p>
                        <p onClick={handleIndonesiaClick}>Indonesia</p>
                        <p onClick={handleEthiopiaClick}>Ethiopia</p>
                        <p onClick={handleHondurasClick}>Honduras</p>
                        <p onClick={handleIndiaClick}>India</p>
                        <p onClick={handleUgandaClick}>Uganda</p>
                    </div>
                )}
                <p onClick={grindClick}>Grind</p>
                {grindShown && (
                    <div>
                        <p onClick={handleWholeBeansClick}>Whole Beans</p>
                        <p onClick={handleGroundClick}>Ground</p>
                        <p onClick={handleInstantClick}>Instant</p>
                    </div>
                )}
            </div>
        )}
      </form>
    
    );
        }
export default Search 