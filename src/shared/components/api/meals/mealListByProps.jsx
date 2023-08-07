import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function MealListByProps(props) {
    const arr = props.arr
    const nav = useNavigate();
    return (
        <div className="row flex flex-wrap">
            {arr.map((item)=>{
                return(
                    <div className="box md:w-[48%] w-[100%] lg:w-[31%]  p-3  md:m-1 m-5  shadow bg-white" key={item.idMeal}>
                    <Link to={`/singleMeal/${item.idMeal}`}>
                    <img width={"100%"} src={item.strMealThumb} alt={item.strMeal} />
                    <h2 className='text-lg text-center'>{item.strMeal}</h2>
                    </Link>
                    </div>
                )                
            })
            }
        </div>
    )
}
