import { useRef } from "react";


export function NavComponent({pages, activePage, setActivePage} : {
    pages : string[],
    activePage : number,
    setActivePage : (index : number) => void,
}) {
    const overlay = useRef<HTMLDivElement | null>(null);
    const navigation = useRef<HTMLDivElement | null>(null);
    const navMenu = useRef<HTMLElement | null>(null);
    const navName = useRef<HTMLParagraphElement | null>(null);

    return (
        <>
            <div ref={navigation} className="flex flex-col gap-[clamp(10px,4vh,40px)] w-min bg-plate-muted min-h-screen h-auto py-[40px] px-[20px] z-3">
                <div className='flex flex-row justify-between'>
                    <p className="text-nav text-center text-[clamp(1em,2vw,3em)] font-semibold hidden md:inline" ref={navName}>Навигация</p>
                    <span className="material-symbols-outlined scale-[2] md:!hidden cursor-pointer self-center" onClick={() => {                    
                        if (navMenu.current !== null && navName.current !== null && navigation.current !== null && overlay.current !== null) {
                            navMenu.current.style.display = (navMenu.current.style.display == "flex" ? "none" : "flex");
                            navName.current.style.display = (navName.current.style.display == "inline" ? "none" : "inline");   
                            navigation.current.style.width = (navName.current.style.display == "inline" ? "50vw" : "min-content");
                            navigation.current.style.position = (navName.current.style.display == "inline" ? "absolute" : "relative");
                            overlay.current.style.display = (navName.current.style.display != "inline" ? "none" : "inline");
                        }
                    }}>menu</span>
                </div>
                <nav className="md:flex flex-col gap-[clamp(5px,2vh,20px)] hidden" ref={navMenu}>
                    {
                        pages.map((el : string, index : number) => (
                            <div 
                                className={`text-[clamp(1rem,1.5vw,2.5rem)] font-semibold h-fit py-[clamp(5px,2vh,20px)] px-[clamp(5px,1vw,20px)] hover:bg-plate-nav hover:text-hover-nav hover:scale-110 rounded-[15px] transition-all ease-in duration-300 ${activePage == index ? "bg-plate-nav text-hover-nav" : "text-nav"}`} 
                                key={index}
                                onClick={() => {setActivePage(index)}}
                                >{el}</div>
                        ))
                    }    
                </nav>
            </div>
            <div ref={overlay} className="bg-black/66 absolute w-[100vw] h-[100vh] z-2 hidden"></div>
        </>
    )
}
