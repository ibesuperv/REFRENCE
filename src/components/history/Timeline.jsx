import { Chrono } from "react-chrono";
import data from "./data1"



function Timeline() {
    return ( <>
    <div className="timeline w-full h-auto mt-5">
    <p>Time Line (Post Independence)</p>
    <div className="flex justify-center items-center">
      <div  style={{ width: "95%",cursor:'pointer'}}>
        <Chrono
          items={data}
          mode="HORIZONTAL"
          showAllCardsHorizontal
          cardWidth={450}
          cardHeight={300}
          contentDetailsHeight={100}
          fontSizes={{
            title: "1rem"
          }}
          theme={{
            secondary: 'black',
            cardBgColor: 'white',
            titleColor: 'black',
            titleColorActive: 'white',
          }}
          slideShow
        />
      </div>
    </div>


</div>

    
    
    </> );
}

export default Timeline;