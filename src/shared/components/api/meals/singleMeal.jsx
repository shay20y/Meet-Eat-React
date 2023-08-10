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
        const url = API_MEAL_BY_ID + params["id"];
        const { data } = await axios(url)
        console.log(data);
        setAr(data.meals[0])
        setStr((data.meals[0].strYoutube))

        // changeing youtube url string to make it compatiable with iframe
        console.log(str.replace("watch?v=", "embed/"))
    }

    return (
        <div className={`min-h-full bg-white w-auto m-5 p-3`}>
            <div className="detils-card flex flex-col-reverse md:flex-row text-black" >

                <div className=" md:mr-4 items-center flex flex-col">
                    <h2 className="text-3xl font-bold mb-2 text-center font-size border-b-2 border-blue-500">{ar.strMeal}</h2>
                    {ar.strArea == "Unknown" || <p className="text-center text-xl mb-3">{ar.strArea}</p>}
                    <img width={"80%"} src={ar.strMealThumb} alt={ar.strMeal} className="rounded-lg" />
                    <div>
                        {ar.strSource != null ?
                            <button onClick={() => { window.open(ar.strSource, "_blank") }} className="bg-blue-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
                                View Recipe
                            </button>
                            :
                            <></>
                        }
                        &nbsp;
                        <button onClick={() => { nav(-1) }} className="bg-blue-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-5">
                            go back
                        </button>
                    </div>
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
