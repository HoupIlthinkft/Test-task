import { useState } from "react";


export function NavComponent({pages, activePage, setActivePage}) {

    return (
        <div className="flex flex-col gap-[clamp(10px,4vh,40px)] w-min bg-plate-muted min-h-screen h-auto py-[40px] px-[20px]">
            <div>
                <p className="text-nav text-center text-[clamp(1em,2vw,3em)] font-semibold">Навигация</p>
                <i></i>
            </div>
            <nav className="flex flex-col gap-[clamp(5px,2vh,20px)]">
                {
                    pages.map((el, index) => (
                        <div 
                            className={`text-[clamp(1rem,1.5vw,2.5rem)] font-semibold h-fit py-[16px] px-[9px] hover:bg-plate-nav hover:text-hover-nav hover:scale-110 rounded-[15px] transition-all ease-in duration-300 ${activePage == index ? "bg-plate-nav text-hover-nav" : "text-nav"}`} 
                            key={index}
                            onClick={() => {setActivePage(index)}}
                            >{el}</div>
                    ))
                }    
            </nav>
        </div>
    )
}
