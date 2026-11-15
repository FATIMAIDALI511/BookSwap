let loader=document.getElementById("loader")
fetch('http://127.0.0.1:8000/api/v1/exchange-requests').then(response => {
  if (!response.ok) {
    throw new Error("you could not access to data")
  }

  return response.json()

}
).then(data => {
  const getData = data.data
  main(getData)

}).catch(err=>{
  console.log(err)
}).finally(()=>{
  loader.classList.add("hidden")
})


main=(data)=>{
  console.log(data.length)
afficherData(data);
searchBookName(data);
filterBooks(data)

}

afficherData = (data) => {
  NbrDemandeDisponible(data)
  let cards_livres = document.querySelector('.cards-livres')
  let swap_livre = document.getElementsByClassName('swap-livre')
  data.forEach(element => {
    // console.log(element.book.image_url)
    cards_livres.innerHTML += `<div class=" bg-[#E3E4EA] border p-6 flex flex-col gap-3 rounded-xl">
    <p class="border px-2 rounded-xl w-max text-sm">${element.exchange_type}</p>
  <div class="flex ">
                <div  class="flex gap-3 w-1/2">

                    <img src="http://127.0.0.1:8000${element.book.image_url}" alt="" class="w-20 h-30">
                    <div class="livre-info>
                        <h4 class="text-sm font-bold">${element.book.author}</h4>
                        <h2 class="font-bold">${element.book.title}</h2>
                        <p class="text-sm">${element.book.category.name}</p>
                        <p>${element.book.description}</p>
                        <div class="flex gap-3 mt-2">${afficherTags(element.book.tags)}
                        </div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                    stroke="currentColor" class="size-6 self-center border rounded-xl mr-2 bg-[#C6F24E] ">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                <div  class="flex gap-3 w-1/2 justify-center flex-col ">${afficherOffre(element.offers, element.offers_count)}
                </div>
            </div>
            <button class="border w-max p-2 rounded-xl cursor-pointer">voir les details</button>
            </div>
  
  ` ;
    
  });
}

afficherTags = (tags) => {
let container="";
  tags.forEach((tag) => {
    container+=`<p class="border px-2 rounded-xl w-max text-sm bg-[#F5FFFA]">${tag}</p>`
  })
  return container;
}

afficherOffre = (offers, nbrOffers) => {
  let container = "";
  if ( nbrOffers!= 0) {
    offers.forEach(ele => {

      container+= `<div class="flex gap-3 flex-col">
    <div  class="flex gap-3">
     <img src="http://127.0.0.1:8000${ele.offered_book.image_url}" alt="" class="w-20 h-30">
                    <div>
                        <h4 class="text-sm font-bold">${ele.offered_book.author}</h4>
                        <h2 class="font-bold">${ele.offered_book.title}</h2>
                        <p class="text-sm">${ele.offered_book.category.name}</p>
                        <p>${ele.offered_book.description}</p>
                    </div>
                    </div>
                    </div>
                    `
                  })
                 
  }
  if (nbrOffers == 0) {
    container= `<div class="flex flex-col gap-3 w-1/2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" class="w-20">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                        </svg>
                        <p class="">no book offered for swap</p>
                        <div><button class="border w-max p-2 rounded-xl cursor-pointer">proposer un offre</button></div>
                        </div>
                    `

  }
  return container
}

searchBookName=(data)=>{
  let searchBar=document.getElementById("search")
  let cards_livres = document.querySelector('.cards-livres')
  searchBar.addEventListener("input",()=>{
cards_livres.innerHTML=""
let boukFound=data.filter(ele=>ele.book.title.toUpperCase().includes(searchBar.value.toUpperCase()))
if(boukFound.length!=0){
afficherData(boukFound)
}
if(boukFound.length==0){
  cards_livres.innerHTML= `<div class="flex flex-col gap-3  items-center justify-center h-[20rem] border">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" class="w-20">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                        </svg>
                        <p class="">no result found </p>
                        
                        </div>
                    `

}

  })
  
  
}

filterBooks=(data)=>{
  let fillterbtns=document.querySelectorAll(".fillterbtn")
  let cards_livres = document.querySelector('.cards-livres')
  fillterbtns.forEach(btn=>{
    btn.addEventListener("click",(event)=>{
cards_livres.innerHTML=""
      let Bookfound=data.filter(ele=>ele.exchange_type==event.target.dataset.type)
      if(Bookfound.length==0){
        afficherData(data)
      }
      if(Bookfound.length!=0){
        afficherData(Bookfound)
      }

    })
  })

}

NbrDemandeDisponible=(data)=>{
  let NbrDemandeDisponible= document.getElementById("NbrDemandeDisponible")
  let nbr=0;
  data.forEach(ele=>{
    nbr++;
    NbrDemandeDisponible.textContent=`${nbr} demandes disponibles`
    NbrDemandeDisponible.classList=`text-4xl font-bold `
  }


  )


}