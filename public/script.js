

async function loadSnus(){
try{
    const response = await fetch("http://localhost:3000/client/snuslager")
    const snus = await response.json();
    const container = document.getElementById("snus-container");
    container.innerHTML = "";
    snus.forEach(item => {
        const snusDiv = document.createElement("div");
        snusDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Type: ${item.type}</p>
            <p>Strength: ${item.strength}</p>
            <p>Tobacco: ${item.tobak}</p>
            <p>Price: ${item.price}kr</p>
        `;
        container.appendChild(snusDiv);
    });
    console.log("snus retrieved successfully.");
}
catch (error){
    console.error("did not retrieve snus.",  error.message);
    alert("failed to retrieve snus.");

}};

async function createSnus(event){

    event.preventDefault();
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const strength = document.getElementById("strength").value;
    const tobak = document.getElementById("tobak").value;
    const price = document.getElementById("price").value;
    try{

        const response = await fetch("http://localhost:3000/snuslager/snus",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, type, strength, tobak, price}),
        });
        if (response.ok){
            alert("Gz Haywan you made a POST req with 2 APIS.")
            document.getElementById("createSnusForm").reset();
            event.target.reset();
        } 
        else{
            alert("failed to create snus. try again, gypsy code.");
        }

    }
    catch (error){
        response.status(400)
        alert("there was a problem trying to do the POST request.", error.message);
    }
};



document.getElementById("createSnusForm").addEventListener("submit", createSnus);

const getButton = document.getElementById("getButton");
getButton.addEventListener("click", loadSnus);