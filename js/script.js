const loadData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const value = await res.json();
  const data = await value.data.tools
//   console.log(data);
  displayInfo(data)
};

// display
const displayInfo = (values) =>{
    // console.log(values)
    // values.splice(0,5)

    values.forEach(element => {
        console.log(element)       

        // get container
        const aiContainer = document.getElementById('ai-info-container')
        // 
        const aiInfoContainer = document.createElement('div');
        aiInfoContainer.innerHTML =`
        <div class=" rounded-lg p-5 shadow-md">
            <div class=" mb-5">
                <img class="rounded-lg w-96" src="${element?.image}" alt="">
            </div>
            <h3 class="font-bold text-xl py-2">Features</h3>
            <ol type="1">
                <li>${element?.features[0] ? "1. " + (element.features[0]) : ''} </li>
                <li>${element?.features[1] ? "2. " + (element.features[1]) : ''} </li>
                <li>${element?.features[2] ? "3. " + (element.features[2]) : ''} </li>
                <li> ${element?.features[3] ? "4. " + (element.features[3]) : '' } </li>
            </ol>
            <hr class="my-2">
            <h3 class="font-bold text-xl py-2">${element.name}</h3>
            <div class="flex justify-between">
                <p>
                    <span><i class="fa-regular fa-calendar"></i></span>
                     ${element?.published_in}
                </p>
                <button onclick="handleSeeMore('${element?.id}'); seeMore.showModal()" class=" ">
                    <span class="text-red-500 bg-gray-100 rounded-full px-3 py-2"><i  class="fa-solid fa-arrow-right"></i></span>
                </button>
            </div>
        </div>
        `
        aiContainer.appendChild(aiInfoContainer)
    });
}
const handleSeeMore = async(id) =>{
    // single data load
    const resp = await fetch(` https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const info = await resp.json()
    const value =await info.data;
    console.log(value);
    SeeMoreDetails(value);
}

const SeeMoreDetails = (info) =>{
    // console.log('get',info)
    const seeMoreContainer = document.getElementById('seeMoreContainer');
    // const div = document.createElement('div');
    seeMoreContainer.innerHTML = `
        <dialog id="seeMore" class="modal">
            <div class="modal-box">
                <form method="dialog">
                    <button
                        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                    ✕
                    </button>
                </form>
                <h3 class="text-lg font-bold">${info.name}</h3>
                <p class="py-4">Press ESC key or click on ✕ button to close</p>
            </div>
        </dialog>
    `
    // seeMoreContainer.appendChild(div)
}
loadData()
