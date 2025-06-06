import axios from "axios";
import { SidebarProvider } from "@/components/ui/sidebar"; // SidebarTrigger might not be needed at this level anymore if the funnel button handles it

import Header from "../../my_components/header";
import ContentArea from "./ContentArea";
import SidebarArea from "./sidebar/SidebarArea";
import SearchTitle from "./SearchTitle";
import { useState, useRef, useEffect } from "react";
import MyAlert from "@/app/my_components/MyAlert";
import MyUpload from "@/app/my_components/MyUpload";

const defaultParams = {
  query: '',
  titleMatch: '',
  cuisine: '',
  diet: '',
  intolerances: [],
  includeIngredients: [],
  excludeIngredients: [],
  maxReadyTime: ''
}

export default function SearchRecipies(){
    const [searchParams, setSearchParams] = useState(defaultParams);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(null);
    const [alert, setAlert] = useState({
      isAlert: false, 
      title: "",
      description: {}});
    const [showSidebar, setShowSidebar] = useState(true);

    const [uploadVisible, setUploadVisible] = useState(false);
    const [loadingUplaod, setLoadingUpload] = useState(false);
    
    const [showSearchTitle, setShowSearchTitle] = useState(true);
    const lastScrollY = useRef(0);

    const handleQueryChange = ((newQuery) => {
      setSearchParams((prev) => ({...prev,query:newQuery}));
    });

    const handleParamChange = ((param, newValue) => {
      setSearchParams((prev) => ({...prev,[param]:newValue}));
    });

    const handleIncludeIngredient = ((ingredient, include) =>{
      setSearchParams((prev) =>({
        ...prev,
        includeIngredients: include ?
        [...prev.includeIngredients, ingredient] :
        prev.includeIngredients.filter((item) => item != ingredient)
      }))
    })

    const handleExcludeIngredient = ((ingredient, exclude) =>{
      setSearchParams((prev) =>({
        ...prev,
        excludeIngredients: exclude ?
        [...prev.excludeIngredients, ingredient] :
        prev.excludeIngredients.filter((item) => item != ingredient)
      }))
    })

    const handleIntoleranceChange = ((intolerance, checked) =>{
      setSearchParams((prev) => ({
        ...prev,
        intolerances: checked ?
        [...prev.intolerances, intolerance] :
        prev.intolerances.filter((item) => item !== intolerance)
      }));
    });

    const toggleSidebar = () => {
      setShowSidebar(prev => !prev);
    }

    const handleAlertClose = () => {
      setAlert((prev) => ({
        ...prev,
        isAlert: false,
        title: "",
        description: {}  
        }))
    }

    const handleUploadVisible = () => {
        setUploadVisible(prev => !prev);
    }

    async function fetchRecipes() {
      setRecipes([]);
      setLoading(true);

      const apiParams = {
        instructionsRequired: 'false',
        fillIngredients: 'true',
        addRecipeInformation: 'true',
        addRecipeInstructions: 'false',
        addRecipeNutrition: 'true',
        ignorePantry: 'true',
        sort: searchParams.includeIngredients.length > 0 ? "max-used-ingredients" : "random",
        offset: '0',
        number: '48',
        ...(searchParams.query && {query: searchParams.query, titleMatch: searchParams.query}),
        ...(searchParams.includeIngredients.length > 0 && {includeIngredients: searchParams.includeIngredients.join(',')}),
        ...(searchParams.excludeIngredients.length > 0 && {excludeIngredients: searchParams.excludeIngredients.join(',')}),
        ...(searchParams.cuisine && {cuisine: searchParams.cuisine}),
        ...(searchParams.diet && {diet: searchParams.diet}),
        ...(searchParams.intolerances.length > 0 && {intolerances: searchParams.intolerances.join(',')}),
        ...(searchParams.maxReadyTime && {maxReadyTime: searchParams.maxReadyTime})
      };

      Object.keys(apiParams).forEach((key) => {
        if ( !apiParams[key] || ((Array.isArray(apiParams[key]) && apiParams[key].length === 0))){
          delete apiParams[key];
        }
      });

      console.log("Final Params:", apiParams);

      try {
        const options = {
        method: 'GET',
        url: 'http://localhost:5000/recipes',
        params: apiParams
      };
        const response = await axios.request(options);
        console.log(apiParams);
        console.log(response.data);
        if (response.data.results && response.data.results.length > 0){
          setRecipes(response.data.results);
        } else {
          setAlert({
            isAlert: true,
            title: "No recipes found.",
            description: (
              <>
                <p>Please adjust your filters and try again.</p>
                <ul className="list-inside list-disc text-sm">
                  <li>Try fewer ingredients</li>
                  <li>Be careful at ingredients collision</li>
                  <li>Change cuisine or prep time</li>
                </ul>
              </>
            )
          });
        }
        setLoading(false);
      } catch (error) {
          console.error(error);
          setLoading(false);
      }
    }

    const handleUpload = async() => {
        setLoadingUpload(true);
        const options = {
            method: 'GET',
            url: `http://localhost:5000/images/upload`
            };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            handleUploadVisible();
            setLoadingUpload(false);
        } catch (error) {
            console.error(error);
            setLoadingUpload(false);
        }
    }

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < lastScrollY.current) {
          // Scrolling up
          setShowSearchTitle(true);
        } else {
          // Scrolling down
          setShowSearchTitle(false);
        }

        lastScrollY.current = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-inter bg-background">
          <Header />
          <main className="flex-grow">
            {uploadVisible && (
                <MyUpload
                loading={loadingUplaod}
                onUploadVisible={handleUploadVisible}
                onUpload={handleUpload}
                />
            )}
            <div className="flex flex-row">
              {alert.isAlert && (
                <MyAlert
                typeOfAlert={"destructive"}
                alert={alert}
                onClose={handleAlertClose}
                ></MyAlert>
              )}
              {showSidebar && (
                <div className="hidden shrink-0 top-14 h-[calc(100vh-3.5rem)] w-[240px] border-r border-gray-950/10 overflow-y-auto md:block md:sticky">
                  <SidebarProvider> 
                    <SidebarArea
                      searchParams={searchParams}
                      onParamChange={handleParamChange}
                      onIncludeIngredient={handleIncludeIngredient}
                      onExcludeIngredient={handleExcludeIngredient}
                      onIntoleranceChange={handleIntoleranceChange}
                    />
                  </SidebarProvider>
                </div>
              )}

              <div className="flex flex-col flex-grow min-w-0">
                <div className={`transition-transform duration-300 ease-in-out sticky top-14 bg-background z-10
                  ${showSearchTitle ? 'translate-y-0' : '-translate-y-full'}
                  border-b border-gray-950/10`}>
                  <SearchTitle
                    query={searchParams.query}
                    onQueryChange={handleQueryChange}
                    fetchRecipes={fetchRecipes}
                    isSidebarShown={showSidebar}
                    onToggleSidebar={toggleSidebar}
                    onUploadVisible={handleUploadVisible}
                  />
                </div>
                <div className="flex-grow overflow-auto">
                    <ContentArea
                      recipes={recipes}
                      isLoading={loading}
                    />
                </div>
              </div>
            </div>
          </main>
        </div>
    )
}