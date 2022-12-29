import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);

    const getCocktail = async () => {
      try {
        const res = await fetch(`${url}${id}`);
        const data = await res.json();

        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };

          setCocktail(newCocktail);
        } else setCocktail(null);
      } catch (err) {
        console.log(err);
      }
    };

    getCocktail();
    setLoading(false);
  }, [id]);

  const newLocal = "section-title";
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back to home
      </Link>
      {loading ? (
        <Loading />
      ) : !cocktail ? (
        <h2 className="section-title">no cocktail to display</h2>
      ) : (
        <>
          <h2 className="section-title">{cocktail.name}</h2>
          <div className="drink">
            <img src={cocktail.image} alt={cocktail.name} />
            <div className="drink-info">
              <p>
                <span className="drink-data">name : {cocktail.name}</span>
              </p>
              <p>
                <span className="drink-data">
                  category : {cocktail.category}
                </span>
              </p>
              <p>
                <span className="drink-data">info : {cocktail.info}</span>
              </p>
              <p>
                <span className="drink-data">glass : {cocktail.glass}</span>
              </p>
              <p>
                <span className="drink-data">
                  instructions : {cocktail.instructions}
                </span>
              </p>
              <p>
                <span className="drink-data">
                  ingredients :{" "}
                  {cocktail.ingredients.map(
                    (item, index) => item && <span key={index}>{item}</span>
                  )}
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default SingleCocktail;
