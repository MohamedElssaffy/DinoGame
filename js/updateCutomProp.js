export function getCustomProp(ele, prop) {
  return parseFloat(getComputedStyle(ele).getPropertyValue(prop)) || 0;
}

export function setCustomProp(ele, prop, val) {
  ele.style.setProperty(prop, val);
}

export function incrementCustomProp(ele, prop, inc) {
  setCustomProp(ele, prop, getCustomProp(ele, prop) + inc);
}
