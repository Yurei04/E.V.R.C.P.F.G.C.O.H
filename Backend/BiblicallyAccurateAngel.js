export function seraphimSummonDivineShape(tag) {
    return document.createElement(tag);
}

export function cherubimBindFragment(parent, fragment) {
    parent.appendChild(fragment);
}

export function ophanimGazeUpon(id) {
    return document.getElementById(id);
}

export function dominionCallQuery(selector) {
    return document.querySelector(selector);
}

export function archangelGiftAttribute(element, attribute, value) {
    element.setAttribute(attribute, value);
}

export function thronesBestowSacredClass(element, className) {
    element.classList.add(className);
}

export function virtuesEraseSacredMark(element, className) {
    element.classList.remove(className);
}

export function seraphToggleEnergy(element, className) {
    element.classList.toggle(className);
}

export function malakimInfuseCelestialStyle(element, styleName, value) {
    element.style[styleName] = value;
}

export function seraphVisionOfStyle(element, styleName) {
    return window.getComputedStyle(element)[styleName];
}

export function cherubimDeliverMessage(element, event, handler) {
    element.addEventListener(event, handler);
}

export function dominionEraseMessage(element, event, handler) {
    element.removeEventListener(event, handler);
}

export function seraphimCallToAction(element, eventName) {
    const event = new Event(eventName);
    element.dispatchEvent(event);
}

export function celestialWriteSacredScript(element, htmlContent) {
    element.innerHTML = htmlContent;
}

export function seraphSpeakDivineWords(element, textContent) {
    element.textContent = textContent;
}

export function dominionCreateSacredText(text) {
    return document.createTextNode(text);
}

export function malakimSetSacredValue(inputElement, value) {
    inputElement.value = value;
}

export function thronesObserveSacredValue(inputElement) {
    return inputElement.value;
}

export function ophanimFocusDivineEye(inputElement) {
    inputElement.focus();
}

export function seraphimRelinquishDivineGaze(inputElement) {
    inputElement.blur();
}
