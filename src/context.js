import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const fetchDrinks = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );

      const data = await res.json();
      const { drinks } = data;

      if (drinks) {
        const newCocktails = drinks.map(item => {
          const { idDrink, strDrink, strDrinkThumb, strAlcholic, strGlass } =
            item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcholic,
            glass: strGlass,
          };
        });

        setCocktails(newCocktails);
      } else setCocktails([]);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  const value = {
    loading,
    searchTerm,
    cocktails,
    setSearchTerm,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
