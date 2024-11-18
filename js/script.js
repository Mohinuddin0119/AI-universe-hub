const loadData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const value = await res.json();
  const data = await value.data.tools
  console.log(data);
  displayInfo(data)
};

// display
const displayInfo = (values) =>{
    // console.log(values)
    values.forEach(element => {
        console.log(element)       

        // 
        const aiInfoContainer = document.getElementById('ai-info-container')
        aiInfoContainer.innerHTML =`
        <div>
            <div>
                <img src="${element?.image}" alt="">
            </div>
            <ol type="1">
                <li>1. ${element?.features[0]} </li>
                <li>2. ${element?.features[1]} </li>
                <li>3. ${element?.features[2]} </li>
                <li>4. ${element?.features[3]} </li>
            </ol>
        </div>
        `
    });
}
loadData();
