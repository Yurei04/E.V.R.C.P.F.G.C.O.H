export function krakoth(tag) {
    return document.createElement(tag);
}

export function gnothkr(parent, child) {
    parent.appendChild(child);
}

export function xaGu(id) {
    return document.getElementById(id);
}

export function ythRilk(selector) {
    return document.querySelector(selector);
}

export function khaZa(element, attribute, value) {
    element.setAttribute(attribute, value);
}

export function zbhrak(element, className) {
    element.classList.add(className);
}

export function yxakra(element, className) {
    element.classList.remove(className);
}

export function naXor(element, className) {
    element.classList.toggle(className);
}

export function rahKha(element, styleName, value) {
    element.style[styleName] = value;
}

export function vothRaG(element, styleName) {
    return window.getComputedStyle(element)[styleName];
}

export function kthra(element, event, handler) {
    element.addEventListener(event, handler);
}

export function thryla(element, event, handler) {
    element.removeEventListener(event, handler);
}

export function haZur(element, eventName) {
    const event = new Event(eventName);
    element.dispatchEvent(event);
}

export function zurxa(element, htmlContent) {
    element.innerHTML = htmlContent;
}

export function khaRa(element) {
    return element.innerHTML;
}

export function raZur(element, textContent) {
    element.textContent = textContent;
}

export function raZhor(element) {
    return element.textContent;
}

export function kraza(text) {
    return document.createTextNode(text);
}

export function kaSha(inputElement, value) {
    inputElement.value = value;
}

export function khraZa(inputElement) {
    return inputElement.value;
}

export function khaRaF(inputElement) {
    inputElement.focus();
}

export function thraZaB(inputElement) {
    inputElement.blur();
}

export function krakoth(tag) {
    return document.createElement(tag); 
}

export function gnothkr(parent, child) {
    parent.appendChild(child); 
}

export function xaGu(id) {
    return document.getElementById(id); 
}

export function ythRilk(selector) {
    return document.querySelector(selector); 
}

export function khaZaS(element, attribute, value) {
    element.setAttribute(attribute, value);
}
