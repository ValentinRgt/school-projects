var DOM = document;
let app = {

    dom: {
        getFormFieldValues: function (...formFields) {
            let values = {};

            formFields.forEach(field => {
                values[field] = DOM.getElementById(field).value;
            });

            return values;
        },

        onClick: function (selector, eventHandler) {
            DOM.querySelector(selector).addEventListener('click', eventHandler);
        },
    },
    
    mvc: {
        router: null,

        dispatchRoute: function (controllerInstance) {
            if (!controllerInstance.hasOwnProperty('url') || !controllerInstance.executeHttpRequest) {
                return console.warn(`Le controller ${controllerInstance.constructor.name} est invalide.`);
            }
 
            fetch(controllerInstance.url)
                .then(response => response.text())
                .then(htmlContent => {
                    DOM.querySelector('main').innerHTML = htmlContent;
                    controllerInstance.executeHttpRequest();
                });
        },
        redirectTo: function (url) {app.mvc.router.navigateTo(url);}
    }
};

// L'application est exportée afin d'être accessible par d'autres modules.
export {app, DOM};