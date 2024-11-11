let allPets = [];
let catagoryPet = [];

const loadAData = async () => {
  let promise = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  let data = await promise.json();
  allPets = data.pets;
  document.getElementById("spinner").style.display = "block";
  setTimeout(() => {
    displayCard(data.pets);
    document.getElementById("spinner").style.display = "none";
  }, 2000);
};
loadAData();

function displayCard(pets, isSortClicked) {
  if (pets.length == 0) {
    document.getElementById("card-container").classList.remove("grid");
    document
      .getElementById("card-container")
      .classList.add("bg-[#1313130c]", "w-full", "rounded-2xl");

    document.getElementById("card-container").innerHTML = `
    <div class="flex flex-col justify-center items-center py-20">
    <div class="lg:w-[13%] w-[45%]"><img class="w-full" src="./images/error.webp" alt=""></div>
    <h1 class="font-extrabold text-2xl text-center">No Information Available</h1>
    <p class="text-xs text-center mt-2 font-medium leading-[1.5]">Unfortunately, there are currently no birds available for adoption.
    <br> Please check back later as we frequently update our listings.</p>
    </div>
    `;
  } else {
    document.getElementById("card-container").innerHTML = "";
    document.getElementById("card-container").classList.add("grid");
    document
      .getElementById("card-container")
      .classList.remove("bg-[#1313130c]", "w-full");
  }

  let mainPetsArray = pets;
  if (isSortClicked) {
    mainPetsArray = pets.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  mainPetsArray.forEach((element) => {
    const cardDiv = document.createElement("div");
    const { image, pet_name, breed, date_of_birth, gender, price, petId } =
      element;

    cardDiv.innerHTML = `
        <div class="card bg-base-100 border-[1.3px] border-[#131313]/10 p-4">

            <figure class="">
                <img
                src="${image}"
                alt="Shoes"
                class="rounded-xl w-full" />
            </figure>


            <div class="mt-4">
                <h2 class="font-extrabold text-lg mb-1">${
                  pet_name != null ? pet_name : "Not Available"
                }</h2>

                <div class="flex items-center justify-start mb-0.5">
                    <div class="lg:w-[6%] w-[6%] md:w-[4%] mr-0.5"><img class="w-full" src="./images/breed.png" alt="" /></div>
                    <p class="text-[13.5px] ml-1">Breed: ${
                      breed != null ? breed : "Not Available"
                    }</p>
                </div>

                <div class="flex items-center justify-start mb-0.5">
                    <div class="lg:w-[5%] w-[5%] md:w-[3.5%] mr-1"><img class="w-full" src="./images/date.png" alt="" /></div>
                    <p class="text-[13.5px] ml-1">Birth: ${
                      date_of_birth != null
                        ? date_of_birth.split("-")[0]
                        : "Not Available"
                    }</p>
                </div>

                <div class="flex items-center justify-start mb-0.5">
                    <div class="lg:w-[6.7%] w-[6.7%] md:w-[4.5%]"><img class="w-full -translate-x-[1.5px]" src="./images/gender.png" alt="" /></div>
                    <p class="text-[13.5px] ml-1">Gender: ${
                      gender != null ? gender : "Not Available"
                    }</p>
                </div>

                <div class="flex items-center justify-start mb-0.5">
                    <div class="lg:w-[6%] w-[6%] md:w-[4%]"><img class="w-full" src="./images/price.png" alt="" /></div>
                    <p class="text-[13.5px] ml-1">Price: ${
                      price != null ? `${price}$` : "Not Available"
                    }</p>
                </div>

            </div>

            <hr class="my-2.5 border-[1px]">

            <div class="flex justify-between">
              <button onclick="loadLikedPetPhoto('${image}')" class="hover:bg-[#0E7A81] hover:text-white  border border-[#0E7A81]/15 md:px-3 md:py-1.5 px-2.5 sm:px-4 lg:px-2.5 py-1 rounded-lg">
            
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                  </svg>

              </button>
              <button id="adoptButton${petId}" onclick="adoptModalButton('adoptButton${petId}')" class="hover:bg-[#0E7A81] hover:text-white text-xs text-[#0E7A81] font-bold border border-[#0E7A81]/15 md:px-4 md:py-1.5 px-2.5 lg:px-2.5 sm:px-4 py-1 rounded-lg">Adopt</button>
              <button onclick="loadPetDetailesInfo('${petId}')" class="hover:bg-[#0E7A81] hover:text-white text-xs text-[#0E7A81] font-bold border border-[#0E7A81]/15 md:px-4 md:py-1.5 lg:px-2.5 sm:px-4 px-2.5 py-1 rounded-lg">Details</button>
            </div>


        </div>
        `;

    document.getElementById("card-container").appendChild(cardDiv);
  });
}

// +++++++++++++++++++++++++++++++ adopt modal
function adoptModalButton(buttonId) {
  document.getElementById(buttonId).disabled = true;
  document.getElementById(buttonId).innerText = "Adopted";

  document
    .getElementById(buttonId)
    .classList.remove("text-[#0E7A81]", "hover:bg-[#0E7A81]");
  document
    .getElementById(buttonId)
    .classList.add("adoptDisabledButton", "border-none");
  // console.log(petId);

  let sum = 3;
  document.getElementById("adoptModal").showModal();
  setCountdown(sum);
  const clockId = setInterval((e) => {
    sum--;
    setCountdown(sum);
    if (sum == 0) {
      clearInterval(clockId);
      document.getElementById("adoptModal").close();
    }
  }, 1000);
}

function setCountdown(sum) {
  document.getElementById("number").innerText = sum;
}

// +++++++++++++++++++++++++++++++ Sort
document.getElementById("sortButton").addEventListener("click", (e) => {
  document.getElementById("spinner").style.display = "block";
  document.getElementById("card-container").classList.add("hidden");
  setTimeout(() => {
    catagoryPet.length == 0
      ? displayCard(allPets, true)
      : displayCard(catagoryPet, true);
    document.getElementById("spinner").style.display = "none";
    document.getElementById("card-container").classList.remove("hidden");
  }, 2000);
});

// +++++++++++++++++++++++++++++++ detailes button (modal) functionality.. take info from displayInfo
const loadPetDetailesInfo = async (petId) => {
  let promise = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  let data = await promise.json();
  detailesInfoModal(data.petData);
};

function detailesInfoModal(petInfo) {
  console.log(petInfo);

  document.getElementById("customModal").showModal();

  const {
    image,
    pet_name,
    breed,
    date_of_birth,
    gender,
    price,
    vaccinated_status,
    pet_details,
  } = petInfo;
  document.getElementById("modalContent").innerHTML = `
  <div class="bg-base-100">

      <div>
        <img class="rounded-lg w-full" src="${image}">
      </div>

      <div class="mt-4">
          <h2 class="font-extrabold text-lg mb-1">${
            pet_name != null ? pet_name : "Not Available"
          }</h2>

          <div class="flex gap-10">
            <div>
              <div class="flex items-center justify-start mb-0.5">
                  <div class="w-[7%] mr-0.5"><img class="w-full" src="./images/breed.png" alt="" /></div>
                  <p class="text-[13.5px] ml-1">Breed: ${
                    breed != null ? breed : "Not Available"
                  }</p>
              </div>
    
              <div class="flex items-center justify-start mb-0.5">
                  <div class="w-[9.5%]"><img class="w-full -translate-x-[1.5px]" src="./images/gender.png" alt="" /></div>
                  <p class="text-[13.5px] ml-1">Gender: ${
                    gender != null ? gender : "Not Available"
                  }</p>
              </div>
              
              <div class="flex items-center justify-start mb-0.5">
                  <i class="fa-solid fa-syringe text-[12px] text-black/50"></i>
                  <p class="text-[13.5px] ml-1.5">Vaccinated status: ${
                    vaccinated_status != null
                      ? vaccinated_status
                      : "Not Available"
                  }</p>
              </div>
            </div>
  
  
            <div>
              <div class="flex items-center justify-start mb-0.5">
                  <div class="w-[10.5%] mr-1"><img class="w-full" src="./images/date.png" alt="" /></div>
                  <p class="text-[13.5px] ml-1">Birth: ${
                    date_of_birth != null
                      ? new Date(date_of_birth).getFullYear()
                      : "Not Available"
                  }</p>
              </div>
    
    
              <div class="flex items-center justify-start mb-0.5">
                  <div class="w-[13%]"><img class="w-full" src="./images/price.png" alt="" /></div>
                  <p class="text-[13.5px] ml-1">Price: ${
                    price != null ? `${price}$` : "Not Available"
                  }</p>
              </div>
            </div>
          </div>


        <div class="py-5">
        <hr>

        <h3 class="text-base mt-3 font-bold">Details Information</h3>

        <p class="mt-3 text-sm ">${pet_details}</p>

        </div>

      </div>

      
  </div>
  `;
}

// +++++++++++++++++++++++++++++++ like button functionality.. take info from displayInfo
function loadLikedPetPhoto(petImage) {
  const newImageDiv = document.createElement("div");
  newImageDiv.innerHTML = `
  <img class="rounded-lg" src="${petImage}">
  `;
  document.getElementById("petImageContainer").appendChild(newImageDiv);
}

// +++++++++++++++++++++++++++++++ showing all catagory button
const allButtonDiv = async () => {
  let promise = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  let data = await promise.json();
  createButtonDiv(data.categories);
};
allButtonDiv();

function createButtonDiv(buttonsDiv) {
  buttonsDiv.forEach((element) => {
    const newButtonDiv = document.createElement("div");
    newButtonDiv.classList.add("activeButtonStyling");
    newButtonDiv.classList.remove("activeButtonStyling");
    const { category, category_icon } = element;
    newButtonDiv.innerHTML = `
        <div id="${category}" class="flex cursor-pointer w-full items-center justify-center px-10 py-3 gap-4 font-bold  text-lg inactiveButtonBorder" 
        onclick="loadCatagoryPets('${category}')">
            <div class="lg:w-[40%] "><img class="w-full" src="${category_icon}"></div>
            <h3>${category}s</h3>
        </div>
        `;
    document
      .getElementById("catagoryButtonContainer")
      .appendChild(newButtonDiv);
  });
}

// +++++++++++++++++++++++++++++++ button color toggle
function removeAllButtonColor() {
  document
    .getElementById("Dog")
    .classList.remove("activeButtonStyling", "inactiveButtonBorder");
  document
    .getElementById("Cat")
    .classList.remove("activeButtonStyling", "inactiveButtonBorder");
  document
    .getElementById("Rabbit")
    .classList.remove("activeButtonStyling", "inactiveButtonBorder");
  document
    .getElementById("Bird")
    .classList.remove("activeButtonStyling", "inactiveButtonBorder");
}

function addAllBorder() {
  document.getElementById("Dog").classList.add("inactiveButtonBorder");
  document.getElementById("Cat").classList.add("inactiveButtonBorder");
  document.getElementById("Rabbit").classList.add("inactiveButtonBorder");
  document.getElementById("Bird").classList.add("inactiveButtonBorder");
}

// +++++++++++++++++++++++++++++++ showing all catagory info
const loadCatagoryPets = async (category) => {
  removeAllButtonColor();
  addAllBorder();
  document.getElementById(category).classList.add("activeButtonStyling");
  document.getElementById(category).classList.remove("inactiveButtonBorder");

  document.getElementById("card-container").innerHTML = "";
  let promise = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  let data = await promise.json();
  catagoryPet = data.data;
  document.getElementById("spinner").style.display = "block";
  setTimeout(() => {
    displayCard(data.data);
    document.getElementById("spinner").style.display = "none";
  }, 2000);
};
