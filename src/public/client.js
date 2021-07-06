const store = Immutable.Map({
  user: { name: "Student" },
  photos: {},
  rovers: ["Curiosity", "Opportunity", "Spirit"],
});

const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = store.set("photos", newState);
  console.log(store.toJS());

  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  let photos = state.get("photos");
  return `
     <header>
     ${Buttons()}
     </header>
        <main>
           ${infoAboutRovers(photos[0])} 
            <section>
                ${ImagesComp(photos)}
            </section>
        </main>
        
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", async () => {
  getRoverData(store, "curiosity");
});

// ------------------------------------------------------  COMPONENTS

const Buttons = () => {
  return `
  <button  onclick="getRoverData(store,'curiosity')" >Curiosity</button>
  <button onclick="getRoverData(store,'opportunity')">Opportunity</button>
  <button  onclick="getRoverData(store,'spirit')" >Spirit</button>
  `;
};

const infoAboutRovers = (info) => `
<div id="riverInfo">
  <img id="rover" src = ${info.img_src}>
  <div id="informations">
    <p  class ="info">Name : ${info.rover.name}</p>
    <p class ="info">Status : ${info.rover.status}</p>
    <p  class = "info">Launch Date :${info.rover.launch_date}</p>
    <p  class = "info">Landing Date : ${info.rover.landing_date}</p>
    <p  class = "info">sol : ${info.sol}</p>
  </div>
</div>`;

const ImagesComp = (imageInfo) => {
  let images = imageInfo.map((image) => {
    return `
    <div class="images">
      <img class="image"  src="${image.img_src}">
      <p class= "camName">camera Name : ${image.camera.full_name}</p>
    </div>
    `;
  });

  // return `<div id= "imagesContainer">${images}</div>`;
  return images;
};

// ------------------------------------------------------  API CALLS

const getRoverData = (state, RoverName) => {
  fetch(`http://localhost:3002/rovers`, {
    headers: { roverName: RoverName },
  }).then((res) => {
    res.json().then((info) => {
      updateStore(state, info.photos);
    });
  });
};
