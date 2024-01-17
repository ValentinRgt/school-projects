import {app, DOM} from '../../app/app.js';
import searchEvent from '../models/searchEvent.js';

class Search {
    constructor() {this.url = 'src/views/search.html';}

    executeHttpRequest() {
        DOM.getElementById('formSearch').addEventListener('submit', event => {
            let params = app.dom.getFormFieldValues('q', 'sortBy');
            this.search(params);
        });
    }

    search(params = {}) {
        new searchEvent().listAll(params.q, params.sortBy).then(function (events) {
            var displayResult = "";
            events.forEach(elem => {
                displayResult += `
                <div class="col-md-4">
                    <div class="card">
                        <img class="card-img-top" src="${elem.image}">
                        <div class="card-body">
                            <h4 class="card-title">${elem.title}</h4>
                            <p class="card-date">${elem.date}</p>
                        </div>
                    </div>
                </div>
                `;
            })
            DOM.getElementById("card-list").innerHTML = displayResult;

           
        }).catch(err => {DOM.getElementById("errorBlock").style.display = ""; DOM.getElementById("error").textContent = err.message || err;});
    }
}

export default Search;