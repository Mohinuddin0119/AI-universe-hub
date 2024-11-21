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
        // console.log(element)       

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
                <button onclick="handleSeeMore('${element?.id}');" class=" ">
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
    // console.log(value);
    SeeMoreDetails(value);
    document.getElementById('seeMore').showModal()
}

const SeeMoreDetails = (info) =>{
    console.log('get',info)
    const seeMoreContainer = document.getElementById('seeMoreContainer');
    // seeMoreContainer.classList= 'bg-white p-5'
    seeMoreContainer.innerHTML = `
        <dialog id="seeMore" class="modal">
            <div class="relative bg-white modal-box lg:max-w-full">
                <form method="dialog">
                    <button
                        class="btn btn-sm btn-circle bg-red-500 btn-ghost absolute right-2 top-2"
                    >
                    ✕
                    </button>
                    <div class ='flex flex-col lg:flex-row justify-between md:p-6 gap-5 '>
                        <div class='flex-1 border border-red-400 px-5 md:p-5  bg-[#EB575733]'>
                            <div class ='text-center flex justify-center'>
                                <h3 class='font-bold lg:w-80 text-xl p-2'>${info?.description}</h3>
                            </div>
                            <div class='flex flex-col md:flex-row justify-center items-center px-5 gap-5 '>
                                <div class='text-green-500 p-5 shadow-lg rounded-lg font-bold'>
                                    <h3 class=''>${info?.pricing[0]?.price}</h3>
                                    <h3>${info?.pricing[0]?.plan}</h3>
                                </div>
                                <div class='text-orange-500 p-5 shadow-lg rounded-lg font-bold'>
                                    <h3>${info?.pricing[1]?.price}</h3>
                                    <h3>${info?.pricing[1]?.plan}</h3>
                                </div>
                                <div class='text-red-500 p-5 shadow-lg rounded-lg font-bold'>
                                    <h3>${info?.pricing[2]?.price}</h3>
                                    <h3>${info?.pricing[2]?.plan}</h3>
                                </div>
                            </div>
                            <div>
                            </div>
                            <div class='flex flex-col md:flex-row justify-between p-5'>
                                <div>                                                                    
                                    <h3 class='font-bold text-xl'>Features</h3>
                                    <ul class='list-disc'>
                                        <li>${info?.features?.['1']?.feature_name}</li>
                                        <li>${info?.features?.['2']?.feature_name}</li>
                                        <li>${info?.features?.['3']?.feature_name}</li>
                                    </ul>
                                </div>
                                <div>                                                                    
                                    <h3 class='font-bold text-xl'>Integrations</h3>
                                    <ul class='list-disc'>
                                        <li>${info?.integrations?.[0]}</li>
                                        <li>${info?.integrations?.[1]}</li>
                                        <li>${info?.integrations?.[2]}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class='flex-1 px-5 py-5'>
                            <div class=' '>
                                <img class='' src="${info?.image_link[0]}" alt="">
                            </div>
                            <h3 class="font-bold text-xl py-2">Hi, how are you doing today?</h3>
                            <p>I'm doing well, thank you for asking. How can I assist you today?</p>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    `
}
loadData()
