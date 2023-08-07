import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApiHooks } from '../../../hooks/useApiHooks';
import { API_MEAL_BY_ID } from '../../../constant/constant';

export default function SingleMeal() {
    const params = useParams();
    const [ar, setAr] = useState([])
    const [str, setStr] = useState("")

    const nav = useNavigate();


    useEffect(() => {
        doApi();
    }, [params])

    const doApi = async () => {
        const url = API_MEAL_BY_ID+ params["id"];
        const { data } = await axios(url)
        setAr(data.meals[0])
        setStr((data.meals[0].strYoutube))

        // changeing youtube url string to make it compatiable with iframe
        console.log(str.replace("watch?v=", "embed/"))
    }

    return (
        <div className={`min-h-full bg-white w-auto m-5 p-3`}>
            <div className="detils-card flex flex-col-reverse md:flex-row text-black" >

                <div className=" md:mr-4 items-center">
                    <h2 className="text-xl font-bold mb-2 text-center">{ar.strMeal}</h2>
                    {ar.strArea == "Unknown" ||
                        <p className="text-center">{ar.strArea}</p>

                    }
                    <img
                        width={"80%"}
                        src={ar.strMealThumb}
                        alt={ar.strMeal}
                        className="rounded-lg"
                    />
                    <button
                        onClick={() => {
                            window.open(ar.strSource,"_blank")
                            
                        }}
                    >
                        View Recipe
                    </button>
                </div>

                <div>
                    <div className="text-center w-auto">
                        <iframe width="784" height="441" src={str.replace("watch?v=", "embed/")} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
