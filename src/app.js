import {validate} from './vaildate';
import {showMessage} from './vaildate';
import fetchJsonp from 'fetch-jsonp';



const form = document.getElementById('pet-form')
const animal = document.getElementById('animal')
const postal = document.getElementById('postal');
let selectedAnimal;
let selectedPostal;

form.addEventListener('submit', fetchAnimals)

function fetchAnimals(e){
    e.preventDefault();
    selectedAnimal = animal.value;
    selectedPostal = postal.value;

    if(!validate(selectedPostal))
    showMessage('Please put a valid zip code', 'alert-danger')

    fetchJsonp(`http://api.petfinder.com/pet.find?format=json&key=f8d0a976c3ecad2ab6c2c6e1c7f0c51a&animal=${selectedAnimal}&location=${selectedPostal}`)
    .then(res => res.json())
    .then(data => showAnimals(data.petfinder.pets.pet))
    .catch(err => console.log(err))
}

function showAnimals(pets){
    console.log(pets)
    const results = document.getElementById('results')
    results.innerHTML = ''
    pets.forEach(pet => {
        const images = pet.media.photos.photo
        const div = document.createElement('div')
        div.classList.add('card','card-body','mb-3')
        div.innerHTML = `
            <div class="row">
            <div class="col-sm-6">
                <h4>${pet.name.$t} ${pet.age.$t}</h4>
                <p>${truncateText(pet.description.$t,100)}</p>
                <ul class="list-group">
                    <li class="list-group-item">${pet.contact.city.$t}</li>
                    ${pet.contact.phone.$t ? `<li class="list-group-item">${pet.contact.phone.$t}</li>`: ``}
                    ${pet.contact.email.$t ? `<li class="list-group-item">${pet.contact.email.$t}</li>` : ``}
                </ul>
            </div>
            <div class="col-sm-6">
                <img class="img-fluid rounded-circle mt-2" src="${images[3].$t}">
            </div>
            </div>
        </div>`

        results.appendChild(div);
    });

}

function truncateText(text, limit){
    const reduceText = text.indexOf(' ',limit)
    if(reduceText == -1){
        return text
    } 
    return text.substring(0,reduceText)
}