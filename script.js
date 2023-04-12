async function savetoserver(event) {
  event.preventDefault();

  const price = document.getElementById('price').value;
  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
 
  const obj = {
    name,
    price,
    category
  }
  try {
    await axios.post("https://crudcrud.com/api/f22653c6bcd04a4a9dd8dffc52c22d1e/productlist", obj);
     window.location.reload();
    event.target.reset();
  }
  catch (err) {
    console.log(err);
  }
}

//Creating function for displaying items
async function displayItems() {
  try {
    const response = await axios.get("https://crudcrud.com/api/f22653c6bcd04a4a9dd8dffc52c22d1e/productlist");
    const list = response.data;

    for (let i = 0; i < list.length; i++) {
      //Storing the key as item
      const item = list[i];

      //Collecting all ul
      let electric = document.getElementById("Electronics"); // Get the "Electronics" list element
      let Food = document.getElementById("Food"); // Get the "Food" list element
      let Skincare = document.getElementById("Skincare"); // Get the "Skincare" list element

      let li = document.createElement("li");

      //Delete button
      let dltbtn = document.createElement('button');
      dltbtn.innerText = 'DELETE ORDER';
      dltbtn.onclick = async () => {


        axios.delete(
          `https://crudcrud.com/api/f22653c6bcd04a4a9dd8dffc52c22d1e/productlist/${item._id}`
        );
        // Remove the list item from the appropriate category list
        if (item.category === "ElectronicsItems") { 
          electric.removeChild(li);
        }
        if (item.category === "FoodItems") {
          Food.removeChild(li);
        }
        if (item.category === "SkincareItems") {
          Skincare.removeChild(li);
        }

      };
      li.innerText = `Product-Price : ${item.price} ₹  ----- Product-Name : ${item.name} ---- Product-Category : ${item.category}`;
      li.appendChild(dltbtn);

      //Adding the data in particular list after checking category
      if (item.category === "ElectronicsItems") {
        electric.append(li);
      }
      if (item.category === "FoodItems") {
        Food.append(li);
      }
      if (item.category === "SkincareItems") {
        Skincare.append(li);
      }
    }
  }
  catch (err) { console.log(err) };
}

document.addEventListener('DOMContentLoaded', () => {
  displayItems();
});
