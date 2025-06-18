import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { api } from '../src/services/api' //importando meu axios
import { useEffect, useRef, useState, type FormEvent } from "react";
import { IoCloseSharp } from "react-icons/io5";


interface ClientsProps{
  id: string,
  name: string,
  phone: string,
  carModel: string,
  plate: string,
  typeWashing: string,
  imageCar: string,
  createdAt: string
}


export function App() {
  const [clients, setClients  ] = useState <ClientsProps[]>([])
  
  //respondendo meus inputs: 
  const nameRef = useRef<HTMLInputElement | null>(null)
  const phoneRef = useRef<HTMLInputElement | null>(null)
  const carRef = useRef<HTMLInputElement | null>(null)
  const plateRef = useRef<HTMLInputElement | null>(null)
  const typeRef = useRef<HTMLInputElement | null>(null)
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [isUpdate, setIsUpdate] = useState <boolean>(false)
  const [editingClients, setEditClients] = useState <ClientsProps>({} as ClientsProps)

  //Chamando e lidando com meu backend
const handleCustomer = async () => {
  try{
  const response = await api.get('/customers');
  setClients(response.data); //Atualiza o state com os dados da API 
}catch (err) {
       console.error("Erro ao buscar clientes:", err);}}
//Ouvindo meus inputs: inserindo onSubmit={handleSubmit} no meu form.
async function handleSubmit(event: FormEvent){
  event.preventDefault();
  
  // Verificação de preenchimento dos campos
  if(
    !nameRef.current?.value ||
    !phoneRef.current?.value ||
    !carRef.current?.value ||
    !plateRef.current?.value ||
    !typeRef.current?.value ||
    !imageRef.current?.files?.[0]
  ){
    alert("Please, fill in all the fields.");
    return;
  }
//Criação do corpo da requisição com FormData.
const formData = new FormData();
formData.append("name", nameRef.current.value);
formData.append("phone", phoneRef.current.value);
formData.append("carModel", carRef.current.value);
formData.append("plate", plateRef.current.value);
formData.append("typeWashing", typeRef.current.value);
formData.append("imageCar", imageRef.current.files[0]);
try{
  await api.post("/customer", formData, {
    headers: {
      "Content-type": "multipart/form-data"
    }
  });
  alert("Registered client!") 
//Limpando os campos pós cadastros.
    nameRef.current.value ="";
    phoneRef.current.value ="";
    carRef.current.value ="";
    plateRef.current.value ="";
    typeRef.current.value ="";
    imageRef.current.value ="";  
   
    //Atualizando a lista
    handleCustomer(); 
} catch (error){
  console.error("Error when registering client:", error);
  alert("Error when registering client. Check the data!.");
}};


//Função de Edit para meu icon pencil 
async function handleEditingSubmit(event: FormEvent) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("name", nameRef.current!.value);
  formData.append("phone", phoneRef.current!.value);
  formData.append("carModel", carRef.current!.value);
  formData.append("plate", plateRef.current!.value);
  formData.append("typeWashing", typeRef.current!.value);

  if (imageRef.current?.files?.[0]) {
    formData.append("image", imageRef.current.files[0]);
  }

  try {
    await api.put(`/customer/${editingClients.plate}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Client update!");
    setIsUpdate(false);
    handleCustomer(); // atualiza a lista na tela

  } catch (error) {
    console.error("update error:", error);
    alert("update error.");
  }
}





//função delete para meu icon de lixeira.
async function handleDelete(plate: string){
  try {
     await api.delete('customer', { params :{ plate: plate }
    })

    const allClients = clients.filter((client) => client.plate !== plate);
    setClients(allClients)

  }catch(err){
    alert(err)
  }
}



useEffect(()=>{
  handleCustomer()
},[]);


     //Criação do formulario
  return (
    <div className="w-full min-h-screen bg-slate-800 flex justify-center px-4"> 
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl text-slate-100"><strong>PrimeWash</strong></h1>


        <form  className="flex flex-col my-6" action="/upload" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <label className="text-slate-50 font-medium">Name:</label>
        <input type="text" placeholder="Client's name" className="w-full mb-5 p-2 rounded bg-amber-50"  ref={nameRef}/>
        
        <label className="text-slate-50 font-medium">Phone:</label>
        <input type="text" placeholder="Client's phone" className="w-full mb-5 p-2 rounded bg-amber-50"  ref={phoneRef}/>

        <label className="text-slate-50 font-medium">Car:</label>
        <input type="text" placeholder="Car model" className="w-full mb-5 p-2 rounded bg-amber-50" ref={carRef}/>

        <label className="text-slate-50 font-medium">Plate:</label>
        <input type="text" placeholder="Car plate" className="w-full mb-5 p-2 rounded bg-amber-50"  ref={plateRef}/>


        <label className="text-slate-50 font-medium">Type:</label>
        <input type="text" placeholder="Type of washing" className="w-full mb-5 p-2 rounded bg-amber-50" ref={typeRef}/>

        <label className="cursor-pointer bg-amber-200 text-shadow-slate-600 p-3 rounded w-full text-center mb-7 hover:opacity-80 duration-200">Image of the car<input type="file" name="imagem"   accept="image/*" className="hidden" ref={imageRef} required={!isUpdate}/></label>  
        
        {/* Criando meu botão e dando valor a ele. com submit no botão*/}
        <input type="submit" value="Register" className="text-amber-50 cursor-pointer w-full p-3 rounded bg-blue-400 hover:opacity-80 duration-200"/>
        </form>


        {/* Criando minha apresentação de clientes */}
        <section className="flex flex-col my-12 gap-6" >
          {clients.map((client) => (
            
           <article key={client.plate} className="flex items-center gap-8 w-full rounded bg-neutral-100/[.8] p-2 relative">
            <header className=" flex gap-2 justify-center absolute right-1 top-1">
              <button className="w-7 h-7 flex items-center justify-center hover:scale-125 duration-200">
              <FaPencil onClick={()=> {setEditClients(client); setIsUpdate(true)}} size={18}/>
              </button>    
              <button  className="w-7 h-7 flex items-center justify-center hover:scale-125 duration-200">
              <FaTrashAlt size={18} color={ 'red' } onClick={()=> handleDelete(client.plate)} />
              </button>
            </header>


          {/* ligando meus inputs com backend e apresentando-os: */}
            <figure >
              <img className="rounded w-30 h-30 " src={client.imageCar} alt="Image of the car" />
            </figure>
            <div className="flex flex-col gap-1">
              <p>{client.name}</p>
              <p>{client.phone}</p>
              <p>{client.carModel}</p>
              <p>{client.plate}</p>
              <p>{client.typeWashing}</p>
            </div>
          </article>
          ))}
          </section>





           {/* Area de Edit */}


           {isUpdate &&

          <section className="fixed top-0 left-0 h-screen w-full p-40 bg-neutral-950/[.8]">
            <div className="rounded-lg relative p-4 bg-slate-400">
                <IoCloseSharp onClick={()=>  setIsUpdate(false)}    className="absolute right-6 hover:scale-150 duration-200 cursor-pointer"/>

        <form  className="flex flex-col my-6" method="post" encType="multipart/form-data" onSubmit={handleEditingSubmit}>
        <label className="text-slate-50 font-medium">Name:</label>
        <input type="text" placeholder="Client's name" className="w-full mb-5 p-2 rounded bg-amber-50"  ref={nameRef} defaultValue={editingClients.name} />
        
        <label className="text-slate-50 font-medium">Phone:</label>
        <input type="text" placeholder="Client's phone" className="w-full mb-5 p-2 rounded bg-amber-50"  ref={phoneRef} defaultValue={editingClients.phone} />

        <label className="text-slate-50 font-medium">Car:</label>
        <input type="text" placeholder="Car model" className="w-full mb-5 p-2 rounded bg-amber-50" ref={carRef} defaultValue={editingClients.carModel} />

        <label className="text-slate-50 font-medium">Plate:</label>
        <input type="text" placeholder="Car plate" className="w-full mb-5 p-2 rounded bg-amber-50"  ref={plateRef} defaultValue={editingClients.plate} disabled />

        <label className="text-slate-50 font-medium">Type:</label>
        <input type="text" placeholder="Type of washing" className="w-full mb-5 p-2 rounded bg-amber-50" ref={typeRef} defaultValue={editingClients.typeWashing}/>

        
        {/* Criando meu botão de update */}
        <input type="submit" value="Update" className="text-amber-50 cursor-pointer w-full p-3 rounded bg-blue-400 hover:opacity-80 duration-200"/>
        </form>
              </div>
          </section>  
          } 





      
       
      </main>
    </div>
  )
}

