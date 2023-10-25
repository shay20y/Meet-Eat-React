import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApiHooks } from '../../../hooks/useApiHooks';
import { API_MEAL_BY_ID } from '../../../constant/constant';

export default function SingleMeal() {
    const [isHighResolution, setIsHighResolution] = useState(false);

    const params = useParams();
    const [ar, setAr] = useState([])
    const [str, setStr] = useState("")

    const nav = useNavigate();

    


    useEffect(() => {

        doApi();


        const handleResize = () => {
            const resolutionThreshold = 1200; 
            const isHighRes = window.innerWidth >= resolutionThreshold;
            setIsHighResolution(isHighRes);
          };
          handleResize();
          window.addEventListener('resize', handleResize);
          return () => {
            window.removeEventListener('resize', handleResize);
          };
    }, [params])

    const doApi = async () => {
        const url = API_MEAL_BY_ID + params["id"];
        const { data } = await axios(url)
        setAr(data.meals[0])
        setStr((data.meals[0].strYoutube))

        // changeing youtube url string to make it compatiable with iframe
        // console.log(str.replace("watch?v=", "embed/"))
    }

    return (
        <div className={`min-h-full bg-t-white w-auto m-5 p-3`}>
            <div className="detils-card flex flex-col-reverse md:flex-row text-black" >

                <div className=" md:mr-4 items-center flex flex-col">
                    <h2 className="text-3xl font-bold mb-2 text-center font-size border-b-2 border-main">{ar.strMeal}</h2>
                    {ar.strArea == "Unknown" || <p className="text-center text-xl mb-3">{ar.strArea}</p>}
                    <img width={"80%"} src={ar.strMealThumb} alt={ar.strMeal} className="rounded-lg" />
                    <div>
                        {ar.strSource != null ?
                            <button onClick={() => { window.open(ar.strSource, "_blank") }} className="bg-secondary hover:bg-btn-hover  text-t-white font-bold py-2 px-4 rounded">
                                View Recipe
                            </button>
                            :
                            <></>
                        }
                        &nbsp;
                        <button onClick={() => { nav(-1) }} className="bg-main hover:bg-btn-hover  text-t-white font-bold py-2 px-4 rounded mt-5">
                            go back
                        </button>
                    </div>
                </div>

                <div>
                    
                    <div className={isHighResolution?"":"aspect-w-16 aspect-h-9"}>
                        <iframe width={isHighResolution?"784":"588"} height={isHighResolution?"441":"331"} src={str.replace("watch?v=", "embed/")} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
