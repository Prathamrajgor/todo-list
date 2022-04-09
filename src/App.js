import './App.css';
import Axios from 'axios';
import  {useState, useEffect} from "react"

function App() {
  const [create,Newcreate]=useState("block");
  const [modal,Newmodal]=useState("none");
  const [title,Newtitle]=useState("")
  const [desc,Newdesc]=useState("")
  const [arr,Newarr]=useState([]);
  const [CreatingNew,NewCreatingNew]=useState(false);
  const [id,Newid]=useState("")
  const [alert,Newalert]=useState("none");
  const changeAlert=()=>{
    Newalert("block");
    setTimeout(()=>{
      Newalert("none")
    },2000)
  }
  const reload=()=>{
    setTimeout(()=>{
      window.location.reload();
    },1000)
  }
  useEffect(()=>{
    Axios.get("https://todolist-by-pratham.herokuapp.com/read").then((response)=>{
      console.log('1');
      Newarr(response.data)
      console.log(response.data.title);
    })
  }, [])
  return (
    
    <div  className=" main font-round bg-[#ECECEC] from-[#28FFBF] to-[#F9F9F9] bg-gradient-to-l w-[100vw] h-[150vh] ">
          <div style={{display:`${alert}`}} class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Wrong Input</strong>
        <span class="block sm:inline">Title and Description cannot be empty</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
      <div className="nonmodal" style={{display:`${create}`}}>
            <h1 class=" text-4xl flex justify-center font-normal leading-normal mt-0 mb-2 text-gray-900">
              <span className='' >Todo List</span>
          </h1>

          <div className="btn flex justify-center pt-8">
            <button class="rounded-3xl h-12 w-12 shadow-lg bg-fuchsia-600 hover:bg-fuchsia-700    text-white font-bold py-2 px-4" onClick={()=>{
              Newcreate("none")
              Newmodal("block")
              NewCreatingNew(true)
              Newdesc("");
              Newtitle("");
              
            }}>
            <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div  id="main" className=" mt-2 ml-4   text-2xl flex justify-start">
            <span className='' > Tasks List</span>  
          </div>
            <div className="flex flex-col lg:grid sm:grid lg:grid-rows-3 lg:grid-cols-3 sm:grid-rows-2 sm:grid-cols-2">

            {arr.map((element)=>{
                return(
                  <>
                 <div className="main mx-4 my-4 lg:my-0 ">
                  <div className="max-w-sm lg:max-w-md lg:mr-2 rounded overflow-hidden shadow-lg bg-[#C400FF] text-white">
                  <div className="px-6 py-4 ">
                  <div className="font-bold text-xl mb-2">{element.title}</div>
                  <p className=" text-base text-white">
                    {element.desc}
                  </p>
                  </div>
                  <button type="button" class=" shadow-md ml-5  focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 dark:focus:ring-yellow-900" onClick={()=>{
                    Newmodal("block");
                    Newcreate("none");
                    Newtitle(element.title)
                    Newdesc(element.desc)
                    Newid(element._id)
                  }} >Edit</button>
                  <button type="button" class=" ml-4 shadow-md focus:outline-none text-white bg-red-500 hover:bg-red-600  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>{
                    Axios.delete(`https://todolist-by-pratham.herokuapp.com/delete${element._id}`,()=>{
                    })
                    reload();
                  }}>Delete</button>
                  </div>
                  </div>
                  </>
                )
            })}
              

            </div>
      </div>
      <div className="modal flex justify-center mt-0">
        <div className="modal">
              <div id="defaultModal" tabindex="-1" aria-hidden="true" style={{display:`${modal}`}} className=" overflow-y-auto overflow-x-hidden  top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className=" bg-white rounded-lg shadow dark:bg-white">
                        {/* <!-- Modal body --> */}
                        <div className="p-6 space-y-6">
                            <div className='text-xl'>
                                Title:
                            </div>
                          <textarea type="text" value={title} className='border-2 rounded-lg border-gray-200 md:w-[42vw] w-[70vw]'  rows={1} onChange={(event)=>{
                            Newtitle(event.target.value)
                            console.log(title);
                          }} />
                            <div className='Description text-xl'>
                                Description:
                            </div>
                          <textarea type="text" value={desc} className='border-2 rounded-lg border-gray-200 w-[70vw] md:w-[42vw]'  rows={5} onChange={(event)=>{
                            Newdesc(event.target.value)
                            console.log(desc);
                          }}/>
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button type="button" class=" shadow-md   focus:outline-none text-white
                        bg-red-500   hover:bg-red-600  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4" onClick={()=>{
                          Newcreate("block")
                          Newmodal("none")
                        }}>Discard Changes</button>
                        <button type="button" class=" ml-2 shadow-md focus:outline-none text-white  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 bg-blue-600   hover:bg-blue-700 "
                        onClick={()=>{
                          if(CreatingNew===true){
                            if(title==="" && desc===""){
                              NewCreatingNew(false)
                              changeAlert();
                            }
                            else{
                              Axios.post("https://todolist-by-pratham.herokuapp.com/insert",{
                                "title":String(title),
                                "desc":String(desc)
                              })
                              NewCreatingNew(false)
                              reload();
                            }
                          }
                          else{
                            Axios.put("https://todolist-by-pratham.herokuapp.com/update",{
                              "id": id,
                              "title":title,
                              "desc":desc
                            })
                            reload();
                          }
                          Newcreate("block")
                          Newmodal("none")

                          }
                        }     
                        >Save </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;


