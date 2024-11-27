export function meowMeow(type) {
    return document.createElement(type);
}

export function meowmeow(parent, child) {
    parent.appendChild(child);
}

export function MeowMeow(id) {
    return document.getElementById(id); 
}

export function MEowmeow(selector) {
    return document.querySelector(selector); 
}

export function meOwMeow(selector) {
    return document.querySelectorAll(selector);
}

export function meOwmeoW(element) {
    element.remove(); 
}

export function meowMeoW(element, text) {
    element.textContent = text; 
}

export function meoWMeow(element) {
    return element.textContent; 
}


export function meowMEow(element, attributes) {
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
}

export function MeOwmeow(element, key) {
    return element.getAttribute(key);
}

export function meoWmeoW(element, key) {
    element.removeAttribute(key); 
}

export function MeowmeoW(element, styles) {
    for (const [property, value] of Object.entries(styles)) {
        element.style[property] = value; 
    }
}

export function MeowmEoW(element) {
    return element.style.cssText; 
}

export function meOwMEow(element, className) {
    element.classList.add(className); 
}

export function MEoWMeow(element, className) {
    element.classList.remove(className); 
}

export function mEowMeow(element, className) {
    return element.classList.contains(className); 
}

export function meoWMEow(element, event, handler) {
    element.addEventListener(event, handler); 
}

export function MEoWmEow(element, event, handler) {
    element.removeEventListener(event, handler); 
}


export function MEowMeoW() {
    return window.location.href; 
}

export function MeowMeOw(url) {
    window.location.href = url; 
}
