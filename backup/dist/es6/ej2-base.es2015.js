const instances = 'ej2_instances';
let uid = 0;
let isBlazorPlatform = false;
/**
 * Function to check whether the platform is blazor or not.
 *
 * @returns {void} result
 * @private
 */
function disableBlazorMode() {
    isBlazorPlatform = false;
}
/**
 * Create Instance from constructor function with desired parameters.
 *
 * @param {Function} classFunction - Class function to which need to create instance
 * @param {any[]} params - Parameters need to passed while creating instance
 * @returns {any} ?
 * @private
 */
// eslint-disable-next-line
function createInstance(classFunction, params) {
    const arrayParam = params;
    arrayParam.unshift(undefined);
    return new (Function.prototype.bind.apply(classFunction, arrayParam));
}
/**
 * To run a callback function immediately after the browser has completed other operations.
 *
 * @param {Function} handler - callback function to be triggered.
 * @returns {Function} ?
 * @private
 */
function setImmediate(handler) {
    let unbind;
    // eslint-disable-next-line
    const num = new Uint16Array(5);
    const intCrypto = window.msCrypto || window.crypto;
    intCrypto.getRandomValues(num);
    let secret = 'ej2' + combineArray(num);
    // eslint-disable-next-line
    let messageHandler = (event) => {
        if (event.source === window && typeof event.data === 'string' && event.data.length <= 32 && event.data === secret) {
            handler();
            unbind();
        }
    };
    window.addEventListener('message', messageHandler, false);
    window.postMessage(secret, '*');
    return unbind = () => {
        window.removeEventListener('message', messageHandler);
        handler = messageHandler = secret = undefined;
    };
}
/**
 * To get nameSpace value from the desired object.
 *
 * @param {string} nameSpace - String value to the get the inner object
 * @param {any} obj - Object to get the inner object value.
 * @returns {any} ?
 * @private
 */
// eslint-disable-next-line
function getValue(nameSpace, obj) {
    // eslint-disable-next-line
    let value = obj;
    const splits = nameSpace.replace(/\[/g, '.').replace(/\]/g, '').split('.');
    for (let i = 0; i < splits.length && !isUndefined(value); i++) {
        value = value[splits[parseInt(i.toString(), 10)]];
    }
    return value;
}
/**
 * To set value for the nameSpace in desired object.
 *
 * @param {string} nameSpace - String value to the get the inner object
 * @param {any} value - Value that you need to set.
 * @param {any} obj - Object to get the inner object value.
 * @returns {any} ?
 * @private
 */
// eslint-disable-next-line
function setValue(nameSpace, value, obj) {
    const keys = nameSpace.replace(/\[/g, '.').replace(/\]/g, '').split('.');
    // eslint-disable-next-line
    const start = obj || {};
    // eslint-disable-next-line
    let fromObj = start;
    let i;
    const length = keys.length;
    let key;
    for (i = 0; i < length; i++) {
        key = keys[parseInt(i.toString(), 10)];
        if (i + 1 === length) {
            fromObj[`${key}`] = value === undefined ? {} : value;
        }
        else if (isNullOrUndefined(fromObj[`${key}`])) {
            fromObj[`${key}`] = {};
        }
        fromObj = fromObj[`${key}`];
    }
    return start;
}
/**
 * Delete an item from Object
 *
 * @param {any} obj - Object in which we need to delete an item.
 * @param {string} key - String value to the get the inner object
 * @returns {void} ?
 * @private
 */
// eslint-disable-next-line
function deleteObject(obj, key) {
    delete obj[`${key}`];
}
/**
 *@private
 */
// eslint-disable-next-line
const containerObject = typeof window !== 'undefined' ? window : {};
/**
 * Check weather the given argument is only object.
 *
 * @param {any} obj - Object which is need to check.
 * @returns {boolean} ?
 * @private
 */
// eslint-disable-next-line
function isObject(obj) {
    const objCon = {};
    return (!isNullOrUndefined(obj) && obj.constructor === objCon.constructor);
}
/**
 * To get enum value by giving the string.
 *
 * @param {any} enumObject - Enum object.
 * @param {string} enumValue - Enum value to be searched
 * @returns {any} ?
 * @private
 */
// eslint-disable-next-line
function getEnumValue(enumObject, enumValue) {
    // eslint-disable-next-line
    return enumObject[enumValue];
}
/**
 * Merge the source object into destination object.
 *
 * @param {any} source - source object which is going to merge with destination object
 * @param {any} destination - object need to be merged
 * @returns {void} ?
 * @private
 */
function merge(source, destination) {
    if (!isNullOrUndefined(destination)) {
        const temrObj = source;
        const tempProp = destination;
        const keys = Object.keys(destination);
        const deepmerge = 'deepMerge';
        for (const key of keys) {
            if (!isNullOrUndefined(temrObj[`${deepmerge}`]) && (temrObj[`${deepmerge}`].indexOf(key) !== -1) &&
                (isObject(tempProp[`${key}`]) || Array.isArray(tempProp[`${key}`]))) {
                extend(temrObj[`${key}`], temrObj[`${key}`], tempProp[`${key}`], true);
            }
            else {
                temrObj[`${key}`] = tempProp[`${key}`];
            }
        }
    }
}
/**
 * Extend the two object with newer one.
 *
 * @param {any} copied - Resultant object after merged
 * @param {Object} first - First object need to merge
 * @param {Object} second - Second object need to merge
 * @param {boolean} deep ?
 * @returns {Object} ?
 * @private
 */
function extend(copied, first, second, deep) {
    const result = copied && typeof copied === 'object' ? copied : {};
    let length = arguments.length;
    if (deep) {
        length = length - 1;
    }
    for (let i = 1; i < length; i++) {
        // eslint-disable-next-line
        if (!arguments[i]) {
            continue;
        }
        // eslint-disable-next-line
        let obj1 = arguments[i];
        Object.keys(obj1).forEach((key) => {
            const src = result[`${key}`];
            const copy = obj1[`${key}`];
            let clone;
            const isArrayChanged = Array.isArray(copy) && Array.isArray(src) && (copy.length !== src.length);
            // eslint-disable-next-line
            const blazorEventExtend = isBlazor() ? (!(src instanceof Event) && !isArrayChanged) : true;
            if (deep && blazorEventExtend && (isObject(copy) || Array.isArray(copy))) {
                if (isObject(copy)) {
                    clone = src ? src : {};
                    // eslint-disable-next-line
                    if (Array.isArray(clone) && clone.hasOwnProperty('isComplexArray')) {
                        extend(clone, {}, copy, deep);
                    }
                    else {
                        result[`${key}`] = extend(clone, {}, copy, deep);
                    }
                }
                else {
                    /* istanbul ignore next */
                    clone = isBlazor() ? src && Object.keys(copy).length : src ? src : [];
                    // eslint-disable-next-line
                    result[`${key}`] = extend([], clone, copy, (clone && clone.length) || (copy && copy.length));
                }
            }
            else {
                result[`${key}`] = copy;
            }
        });
    }
    return result;
}
/**
 * To check whether the object is null or undefined.
 *
 * @param {Object} value - To check the object is null or undefined
 * @returns {boolean} ?
 * @private
 */
function isNullOrUndefined(value) {
    return value === undefined || value === null;
}
/**
 * To check whether the object is undefined.
 *
 * @param {Object} value - To check the object is undefined
 * @returns {boolean} ?
 * @private
 */
function isUndefined(value) {
    return ('undefined' === typeof value);
}
/**
 * To return the generated unique name
 *
 * @param {string} definedName - To concatenate the unique id to provided name
 * @returns {string} ?
 * @private
 */
function getUniqueID(definedName) {
    return definedName + '_' + uid++;
}
/**
 * It limits the rate at which a function can fire. The function will fire only once every provided second instead of as quickly.
 *
 * @param {Function} eventFunction - Specifies the function to run when the event occurs
 * @param {number} delay - A number that specifies the milliseconds for function delay call option
 * @returns {Function} ?
 * @private
 */
function debounce(eventFunction, delay) {
    // eslint-disable-next-line
    let out;
    return function () {
        // eslint-disable-next-line
        const args = arguments;
        const later = () => {
            out = null;
            return eventFunction.apply(this, args);
        };
        clearTimeout(out);
        out = setTimeout(later, delay);
    };
}
/**
 * To convert the object to string for query url
 *
 * @param  {Object} data ?
 * @returns {string} ?
 * @private
 */
// eslint-disable-next-line
function queryParams(data) {
    const array = [];
    const keys = Object.keys(data);
    for (const key of keys) {
        array.push(encodeURIComponent(key) + '=' + encodeURIComponent('' + data[`${key}`]));
    }
    return array.join('&');
}
/**
 * To check whether the given array contains object.
 *
 * @param {any} value - Specifies the T type array to be checked.
 * @returns {boolean} ?
 * @private
 */
function isObjectArray(value) {
    const parser = Object.prototype.toString;
    if (parser.call(value) === '[object Array]') {
        if (parser.call(value[0]) === '[object Object]') {
            return true;
        }
    }
    return false;
}
/**
 * To check whether the  child element is descendant to parent element or parent and child are same element.
 *
 * @param {Element} child - Specifies the child element to compare with parent.
 * @param {Element} parent - Specifies the parent element.
 * @returns {boolean} ?
 * @private
 */
function compareElementParent(child, parent) {
    const node = child;
    if (node === parent) {
        return true;
    }
    else if (node === document || !node) {
        return false;
    }
    else {
        return compareElementParent(node.parentNode, parent);
    }
}
/**
 * To throw custom error message.
 *
 * @param {string} message - Specifies the error message to be thrown.
 * @returns {void} ?
 * @private
 */
function throwError(message) {
    try {
        throw new Error(message);
    }
    catch (e) {
        // eslint-disable-next-line
        throw e.message + '\n' + e.stack;
    }
}
/**
 * This function is used to print given element
 *
 * @param {Element} element - Specifies the print content element.
 * @param {Window} printWindow - Specifies the print window.
 * @returns {Window} ?
 * @private
 */
function print(element, printWindow) {
    const div = document.createElement('div');
    const links = [].slice.call(document.getElementsByTagName('head')[0].querySelectorAll('base, link, style'));
    const blinks = [].slice.call(document.getElementsByTagName('body')[0].querySelectorAll('link, style'));
    if (blinks.length) {
        for (let l = 0, len = blinks.length; l < len; l++) {
            links.push(blinks[parseInt(l.toString(), 10)]);
        }
    }
    let reference = '';
    if (isNullOrUndefined(printWindow)) {
        printWindow = window.open('', 'print', 'height=452,width=1024,tabbar=no');
    }
    div.appendChild(element.cloneNode(true));
    for (let i = 0, len = links.length; i < len; i++) {
        reference += links[parseInt(i.toString(), 10)].outerHTML;
    }
    printWindow.document.write('<!DOCTYPE html> <html><head>' + reference + '</head><body>' + div.innerHTML +
        '<script> (function() { window.ready = true; })(); </script>' + '</body></html>');
    printWindow.document.close();
    printWindow.focus();
    // eslint-disable-next-line
    const interval = setInterval(() => {
        if (printWindow.ready) {
            printWindow.print();
            printWindow.close();
            clearInterval(interval);
        }
    }, 500);
    return printWindow;
}
/**
 * Function to normalize the units applied to the element.
 *
 * @param {number|string} value ?
 * @returns {string} result
 * @private
 */
function formatUnit(value) {
    const result = value + '';
    if (result.match(/auto|cm|mm|in|px|pt|pc|%|em|ex|ch|rem|vw|vh|vmin|vmax/)) {
        return result;
    }
    return result + 'px';
}
/**
 * Function to check whether the platform is blazor or not.
 *
 * @returns {void} result
 * @private
 */
function enableBlazorMode() {
    isBlazorPlatform = true;
}
/**
 * Function to check whether the platform is blazor or not.
 *
 * @returns {boolean} result
 * @private
 */
function isBlazor() {
    return isBlazorPlatform;
}
/**
 * Function to convert xPath to DOM element in blazor platform
 *
 * @returns {HTMLElement} result
 * @param {HTMLElement | object} element ?
 * @private
 */
function getElement(element) {
    const xPath = 'xPath';
    if (!(element instanceof Node) && isBlazor() && !isNullOrUndefined(element[`${xPath}`])) {
        return document.evaluate(element[`${xPath}`], document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    return element;
}
/**
 * Function to fetch the Instances of a HTML element for the given component.
 *
 * @param {string | HTMLElement} element ?
 * @param {any} component ?
 * @returns {Object} ?
 * @private
 */
// eslint-disable-next-line
function getInstance(element, component) {
    // eslint-disable-next-line
    let elem = (typeof (element) === 'string') ? document.querySelector(element) : element;
    if (elem[`${instances}`]) {
        for (const inst of elem[`${instances}`]) {
            if (inst instanceof component) {
                return inst;
            }
        }
    }
    return null;
}
/**
 * Function to add instances for the given element.
 *
 * @param {string | HTMLElement} element ?
 * @param {Object} instance ?
 * @returns {void} ?
 * @private
 */
function addInstance(element, instance) {
    // eslint-disable-next-line
    let elem = (typeof (element) === 'string') ? document.querySelector(element) : element;
    if (elem[`${instances}`]) {
        elem[`${instances}`].push(instance);
    }
    else {
        elem[`${instances}`] = [instance];
    }
}
/**
 * Function to generate the unique id.
 *
 * @returns {any} ?
 * @private
 */
// eslint-disable-next-line
function uniqueID() {
    if ((typeof window) === 'undefined') {
        return;
    }
    // eslint-disable-next-line
    let num = new Uint16Array(5);
    const intCrypto = window.msCrypto || window.crypto;
    return intCrypto.getRandomValues(num);
}
/**
 *
 * @param {Int16Array} num ?
 * @returns {string} ?
 */
function combineArray(num) {
    let ret = '';
    for (let i = 0; i < 5; i++) {
        ret += (i ? ',' : '') + num[parseInt(i.toString(), 10)];
    }
    return ret;
}

/**
 * Parser
 */
const defaultNumberingSystem = {
    'latn': {
        '_digits': '0123456789',
        '_type': 'numeric'
    }
};
const defaultNumberSymbols = {
    'decimal': '.',
    'group': ',',
    'percentSign': '%',
    'plusSign': '+',
    'minusSign': '-',
    'infinity': '∞',
    'nan': 'NaN',
    'exponential': 'E'
};
const latnNumberSystem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
/**
 * Interface for parser base
 *
 * @private
 */
class ParserBase {
    /**
     * Returns the cldr object for the culture specifies
     *
     * @param {Object} obj - Specifies the object from which culture object to be acquired.
     * @param {string} cName - Specifies the culture name.
     * @returns {Object} ?
     */
    static getMainObject(obj, cName) {
        const value = isBlazor() ? cName : 'main.' + cName;
        return getValue(value, obj);
    }
    /**
     * Returns the numbering system object from given cldr data.
     *
     * @param {Object} obj - Specifies the object from which number system is acquired.
     * @returns {Object} ?
     */
    static getNumberingSystem(obj) {
        return getValue('supplemental.numberingSystems', obj) || this.numberingSystems;
    }
    /**
     * Returns the reverse of given object keys or keys specified.
     *
     * @param {Object} prop - Specifies the object to be reversed.
     * @param {number[]} keys - Optional parameter specifies the custom keyList for reversal.
     * @returns {Object} ?
     */
    static reverseObject(prop, keys) {
        const propKeys = keys || Object.keys(prop);
        const res = {};
        for (const key of propKeys) {
            // eslint-disable-next-line
            if (!res.hasOwnProperty(prop[key])) {
                // eslint-disable-next-line
                res[prop[key]] = key;
            }
        }
        return res;
    }
    /**
     * Returns the symbol regex by skipping the escape sequence.
     *
     * @param {string[]} props - Specifies the array values to be skipped.
     * @returns {RegExp} ?
     */
    static getSymbolRegex(props) {
        const regexStr = props.map((str) => {
            return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
        }).join('|');
        const regExp = RegExp;
        return new regExp(regexStr, 'g');
    }
    /**
     *
     * @param {Object} prop ?
     * @returns {Object} ?
     */
    static getSymbolMatch(prop) {
        const matchKeys = Object.keys(defaultNumberSymbols);
        const ret = {};
        for (const key of matchKeys) {
            // eslint-disable-next-line
            ret[prop[key]] = defaultNumberSymbols[key];
        }
        return ret;
    }
    /**
     * Returns regex string for provided value
     *
     * @param {string} val ?
     * @returns {string} ?
     */
    static constructRegex(val) {
        const len = val.length;
        let ret = '';
        for (let i = 0; i < len; i++) {
            if (i !== len - 1) {
                ret += val[parseInt(i.toString(), 10)] + '|';
            }
            else {
                ret += val[parseInt(i.toString(), 10)];
            }
        }
        return ret;
    }
    /**
     * Returns the replaced value of matching regex and obj mapper.
     *
     * @param {string} value - Specifies the  values to be replaced.
     * @param {RegExp} regex - Specifies the  regex to search.
     * @param {Object} obj - Specifies the  object matcher to be replace value parts.
     * @returns {string} ?
     */
    static convertValueParts(value, regex, obj) {
        return value.replace(regex, (str) => {
            // eslint-disable-next-line
            return obj[str];
        });
    }
    /**
     * Returns default numbering system object for formatting from cldr data
     *
     * @param {Object} obj ?
     * @returns {NumericObject} ?
     */
    static getDefaultNumberingSystem(obj) {
        const ret = {};
        ret.obj = getValue('numbers', obj);
        ret.nSystem = getValue('defaultNumberingSystem', ret.obj);
        return ret;
    }
    /**
     * Returns the replaced value of matching regex and obj mapper.
     *
     * @param {Object} curObj ?
     * @param {Object} numberSystem ?
     * @param {boolean} needSymbols ?
     * @param {boolean} blazorMode ?
     * @returns {Object} ?
     */
    static getCurrentNumericOptions(curObj, numberSystem, needSymbols, blazorMode) {
        const ret = {};
        const cur = this.getDefaultNumberingSystem(curObj);
        if (!isUndefined(cur.nSystem) || blazorMode) {
            const digits = blazorMode ? getValue('obj.mapperDigits', cur) : getValue(cur.nSystem + '._digits', numberSystem);
            if (!isUndefined(digits)) {
                ret.numericPair = this.reverseObject(digits, latnNumberSystem);
                const regExp = RegExp;
                ret.numberParseRegex = new regExp(this.constructRegex(digits), 'g');
                ret.numericRegex = '[' + digits[0] + '-' + digits[9] + ']';
                if (needSymbols) {
                    ret.numericRegex = digits[0] + '-' + digits[9];
                    ret.symbolNumberSystem = getValue(blazorMode ? 'numberSymbols' : 'symbols-numberSystem-' + cur.nSystem, cur.obj);
                    ret.symbolMatch = this.getSymbolMatch(ret.symbolNumberSystem);
                    ret.numberSystem = cur.nSystem;
                }
            }
        }
        return ret;
    }
    /**
     * Returns number mapper object for the provided cldr data
     *
     * @param {Object} curObj ?
     * @param {Object} numberSystem ?
     * @param {boolean} isNumber ?
     * @returns {NumberMapper} ?
     */
    // eslint-disable-next-line
    static getNumberMapper(curObj, numberSystem, isNumber) {
        const ret = { mapper: {} };
        const cur = this.getDefaultNumberingSystem(curObj);
        if (!isUndefined(cur.nSystem)) {
            ret.numberSystem = cur.nSystem;
            ret.numberSymbols = getValue('symbols-numberSystem-' + cur.nSystem, cur.obj);
            ret.timeSeparator = getValue('timeSeparator', ret.numberSymbols);
            const digits = getValue(cur.nSystem + '._digits', numberSystem);
            if (!isUndefined(digits)) {
                for (const i of latnNumberSystem) {
                    // eslint-disable-next-line
                    ret.mapper[i] = digits[i];
                }
            }
        }
        return ret;
    }
}
ParserBase.nPair = 'numericPair';
ParserBase.nRegex = 'numericRegex';
ParserBase.numberingSystems = defaultNumberingSystem;
/**
 * @private
 */
const blazorCurrencyData = {
    'DJF': 'Fdj',
    'ERN': 'Nfk',
    'ETB': 'Br',
    'NAD': '$',
    'ZAR': 'R',
    'XAF': 'FCFA',
    'GHS': 'GH₵',
    'XDR': 'XDR',
    'AED': 'د.إ.',
    'BHD': 'د.ب.',
    'DZD': 'د.ج.',
    'EGP': 'ج.م.',
    'ILS': '₪',
    'IQD': 'د.ع.',
    'JOD': 'د.ا.',
    'KMF': 'CF',
    'KWD': 'د.ك.',
    'LBP': 'ل.ل.',
    'LYD': 'د.ل.',
    'MAD': 'د.م.',
    'MRU': 'أ.م.',
    'OMR': 'ر.ع.',
    'QAR': 'ر.ق.',
    'SAR': 'ر.س.',
    'SDG': 'ج.س.',
    'SOS': 'S',
    'SSP': '£',
    'SYP': 'ل.س.',
    'TND': 'د.ت.',
    'YER': 'ر.ي.',
    'CLP': '$',
    'INR': '₹',
    'TZS': 'TSh',
    'EUR': '€',
    'AZN': '₼',
    'RUB': '₽',
    'BYN': 'Br',
    'ZMW': 'K',
    'BGN': 'лв.',
    'NGN': '₦',
    'XOF': 'CFA',
    'BDT': '৳',
    'CNY': '¥',
    'BAM': 'КМ',
    'UGX': 'USh',
    'USD': '$',
    'CZK': 'Kč',
    'GBP': '£',
    'DKK': 'kr.',
    'KES': 'Ksh',
    'CHF': 'CHF',
    'MVR': 'ރ.',
    'BTN': 'Nu.',
    'XCD': 'EC$',
    'AUD': '$',
    'BBD': '$',
    'BIF': 'FBu',
    'BMD': '$',
    'BSD': '$',
    'BWP': 'P',
    'BZD': '$',
    'CAD': '$',
    'NZD': '$',
    'FJD': '$',
    'FKP': '£',
    'GIP': '£',
    'GMD': 'D',
    'GYD': '$',
    'HKD': '$',
    'IDR': 'Rp',
    'JMD': '$',
    'KYD': '$',
    'LRD': '$',
    'MGA': 'Ar',
    'MOP': 'MOP$',
    'MUR': 'Rs',
    'MWK': 'MK',
    'MYR': 'RM',
    'PGK': 'K',
    'PHP': '₱',
    'PKR': 'Rs',
    'RWF': 'RF',
    'SBD': '$',
    'SCR': 'SR',
    'SEK': 'kr',
    'SGD': '$',
    'SHP': '£',
    'SLL': 'Le',
    'ANG': 'NAf.',
    'SZL': 'E',
    'TOP': 'T$',
    'TTD': '$',
    'VUV': 'VT',
    'WST': 'WS$',
    'ARS': '$',
    'BOB': 'Bs',
    'BRL': 'R$',
    'COP': '$',
    'CRC': '₡',
    'CUP': '$',
    'DOP': '$',
    'GTQ': 'Q',
    'HNL': 'L',
    'MXN': '$',
    'NIO': 'C$',
    'PAB': 'B/.',
    'PEN': 'S/',
    'PYG': '₲',
    'UYU': '$',
    'VES': 'Bs.S',
    'IRR': 'ريال',
    'GNF': 'FG',
    'CDF': 'FC',
    'HTG': 'G',
    'XPF': 'FCFP',
    'HRK': 'kn',
    'HUF': 'Ft',
    'AMD': '֏',
    'ISK': 'kr',
    'JPY': '¥',
    'GEL': '₾',
    'CVE': '​',
    'KZT': '₸',
    'KHR': '៛',
    'KPW': '₩',
    'KRW': '₩',
    'KGS': 'сом',
    'AOA': 'Kz',
    'LAK': '₭',
    'MZN': 'MTn',
    'MKD': 'ден',
    'MNT': '₮',
    'BND': '$',
    'MMK': 'K',
    'NOK': 'kr',
    'NPR': 'रु',
    'AWG': 'Afl.',
    'SRD': '$',
    'PLN': 'zł',
    'AFN': '؋',
    'STN': 'Db',
    'MDL': 'L',
    'RON': 'lei',
    'UAH': '₴',
    'LKR': 'රු.',
    'ALL': 'Lekë',
    'RSD': 'дин.',
    'TJS': 'смн',
    'THB': '฿',
    'TMT': 'm.',
    'TRY': '₺',
    'UZS': 'сўм',
    'VND': '₫',
    'TWD': 'NT$'
};
/**
 *
 * @param {string} currencyCode ?
 * @returns {string} ?
 */
function getBlazorCurrencySymbol(currencyCode) {
    return getValue(currencyCode || '', blazorCurrencyData);
}

/***
 * Hijri parser
 */
// eslint-disable-next-line
var HijriParser;
(function (HijriParser) {
    const dateCorrection = [28607, 28636, 28665, 28695, 28724, 28754, 28783, 28813, 28843, 28872, 28901, 28931, 28960, 28990,
        29019, 29049, 29078, 29108, 29137, 29167, 29196, 29226, 29255, 29285, 29315, 29345, 29375, 29404, 29434, 29463, 29492, 29522,
        29551, 29580, 29610, 29640, 29669, 29699, 29729, 29759, 29788, 29818, 29847, 29876, 29906, 29935, 29964, 29994, 30023, 30053,
        30082, 30112, 30141, 30171, 30200, 30230, 30259, 30289, 30318, 30348, 30378, 30408, 30437, 30467, 30496, 30526, 30555, 30585,
        30614, 30644, 30673, 30703, 30732, 30762, 30791, 30821, 30850, 30880, 30909, 30939, 30968, 30998, 31027, 31057, 31086, 31116,
        31145, 31175, 31204, 31234, 31263, 31293, 31322, 31352, 31381, 31411, 31441, 31471, 31500, 31530, 31559, 31589, 31618, 31648,
        31676, 31706, 31736, 31766, 31795, 31825, 31854, 31884, 31913, 31943, 31972, 32002, 32031, 32061, 32090, 32120, 32150, 32180,
        32209, 32239, 32268, 32298, 32327, 32357, 32386, 32416, 32445, 32475, 32504, 32534, 32563, 32593, 32622, 32652, 32681, 32711,
        32740, 32770, 32799, 32829, 32858, 32888, 32917, 32947, 32976, 33006, 33035, 33065, 33094, 33124, 33153, 33183, 33213, 33243,
        33272, 33302, 33331, 33361, 33390, 33420, 33450, 33479, 33509, 33539, 33568, 33598, 33627, 33657, 33686, 33716, 33745, 33775,
        33804, 33834, 33863, 33893, 33922, 33952, 33981, 34011, 34040, 34069, 34099, 34128, 34158, 34187, 34217, 34247, 34277, 34306,
        34336, 34365, 34395, 34424, 34454, 34483, 34512, 34542, 34571, 34601, 34631, 34660, 34690, 34719, 34749, 34778, 34808, 34837,
        34867, 34896, 34926, 34955, 34985, 35015, 35044, 35074, 35103, 35133, 35162, 35192, 35222, 35251, 35280, 35310, 35340, 35370,
        35399, 35429, 35458, 35488, 35517, 35547, 35576, 35605, 35635, 35665, 35694, 35723, 35753, 35782, 35811, 35841, 35871, 35901,
        35930, 35960, 35989, 36019, 36048, 36078, 36107, 36136, 36166, 36195, 36225, 36254, 36284, 36314, 36343, 36373, 36403, 36433,
        36462, 36492, 36521, 36551, 36580, 36610, 36639, 36669, 36698, 36728, 36757, 36786, 36816, 36845, 36875, 36904, 36934, 36963,
        36993, 37022, 37052, 37081, 37111, 37141, 37170, 37200, 37229, 37259, 37288, 37318, 37347, 37377, 37406, 37436, 37465, 37495,
        37524, 37554, 37584, 37613, 37643, 37672, 37701, 37731, 37760, 37790, 37819, 37849, 37878, 37908, 37938, 37967, 37997, 38027,
        38056, 38085, 38115, 38144, 38174, 38203, 38233, 38262, 38292, 38322, 38351, 38381, 38410, 38440, 38469, 38499, 38528, 38558,
        38587, 38617, 38646, 38676, 38705, 38735, 38764, 38794, 38823, 38853, 38882, 38912, 38941, 38971, 39001, 39030, 39059, 39089,
        39118, 39148, 39178, 39208, 39237, 39267, 39297, 39326, 39355, 39385, 39414, 39444, 39473, 39503, 39532, 39562, 39592, 39621,
        39650, 39680, 39709, 39739, 39768, 39798, 39827, 39857, 39886, 39916, 39946, 39975, 40005, 40035, 40064, 40094, 40123, 40153,
        40182, 40212, 40241, 40271, 40300, 40330, 40359, 40389, 40418, 40448, 40477, 40507, 40536, 40566, 40595, 40625, 40655, 40685,
        40714, 40744, 40773, 40803, 40832, 40862, 40892, 40921, 40951, 40980, 41009, 41039, 41068, 41098, 41127, 41157, 41186, 41216,
        41245, 41275, 41304, 41334, 41364, 41393, 41422, 41452, 41481, 41511, 41540, 41570, 41599, 41629, 41658, 41688, 41718, 41748,
        41777, 41807, 41836, 41865, 41894, 41924, 41953, 41983, 42012, 42042, 42072, 42102, 42131, 42161, 42190, 42220, 42249, 42279,
        42308, 42337, 42367, 42397, 42426, 42456, 42485, 42515, 42545, 42574, 42604, 42633, 42662, 42692, 42721, 42751, 42780, 42810,
        42839, 42869, 42899, 42929, 42958, 42988, 43017, 43046, 43076, 43105, 43135, 43164, 43194, 43223, 43253, 43283, 43312, 43342,
        43371, 43401, 43430, 43460, 43489, 43519, 43548, 43578, 43607, 43637, 43666, 43696, 43726, 43755, 43785, 43814, 43844, 43873,
        43903, 43932, 43962, 43991, 44021, 44050, 44080, 44109, 44139, 44169, 44198, 44228, 44258, 44287, 44317, 44346, 44375, 44405,
        44434, 44464, 44493, 44523, 44553, 44582, 44612, 44641, 44671, 44700, 44730, 44759, 44788, 44818, 44847, 44877, 44906, 44936,
        44966, 44996, 45025, 45055, 45084, 45114, 45143, 45172, 45202, 45231, 45261, 45290, 45320, 45350, 45380, 45409, 45439, 45468,
        45498, 45527, 45556, 45586, 45615, 45644, 45674, 45704, 45733, 45763, 45793, 45823, 45852, 45882, 45911, 45940, 45970, 45999,
        46028, 46058, 46088, 46117, 46147, 46177, 46206, 46236, 46265, 46295, 46324, 46354, 46383, 46413, 46442, 46472, 46501, 46531,
        46560, 46590, 46620, 46649, 46679, 46708, 46738, 46767, 46797, 46826, 46856, 46885, 46915, 46944, 46974, 47003, 47033, 47063,
        47092, 47122, 47151, 47181, 47210, 47240, 47269, 47298, 47328, 47357, 47387, 47417, 47446, 47476, 47506, 47535, 47565, 47594,
        47624, 47653, 47682, 47712, 47741, 47771, 47800, 47830, 47860, 47890, 47919, 47949, 47978, 48008, 48037, 48066, 48096, 48125,
        48155, 48184, 48214, 48244, 48273, 48303, 48333, 48362, 48392, 48421, 48450, 48480, 48509, 48538, 48568, 48598, 48627, 48657,
        48687, 48717, 48746, 48776, 48805, 48834, 48864, 48893, 48922, 48952, 48982, 49011, 49041, 49071, 49100, 49130, 49160, 49189,
        49218, 49248, 49277, 49306, 49336, 49365, 49395, 49425, 49455, 49484, 49514, 49543, 49573, 49602, 49632, 49661, 49690, 49720,
        49749, 49779, 49809, 49838, 49868, 49898, 49927, 49957, 49986, 50016, 50045, 50075, 50104, 50133, 50163, 50192, 50222, 50252,
        50281, 50311, 50340, 50370, 50400, 50429, 50459, 50488, 50518, 50547, 50576, 50606, 50635, 50665, 50694, 50724, 50754, 50784,
        50813, 50843, 50872, 50902, 50931, 50960, 50990, 51019, 51049, 51078, 51108, 51138, 51167, 51197, 51227, 51256, 51286, 51315,
        51345, 51374, 51403, 51433, 51462, 51492, 51522, 51552, 51582, 51611, 51641, 51670, 51699, 51729, 51758, 51787, 51816, 51846,
        51876, 51906, 51936, 51965, 51995, 52025, 52054, 52083, 52113, 52142, 52171, 52200, 52230, 52260, 52290, 52319, 52349, 52379,
        52408, 52438, 52467, 52497, 52526, 52555, 52585, 52614, 52644, 52673, 52703, 52733, 52762, 52792, 52822, 52851, 52881, 52910,
        52939, 52969, 52998, 53028, 53057, 53087, 53116, 53146, 53176, 53205, 53235, 53264, 53294, 53324, 53353, 53383, 53412, 53441,
        53471, 53500, 53530, 53559, 53589, 53619, 53648, 53678, 53708, 53737, 53767, 53796, 53825, 53855, 53884, 53913, 53943, 53973,
        54003, 54032, 54062, 54092, 54121, 54151, 54180, 54209, 54239, 54268, 54297, 54327, 54357, 54387, 54416, 54446, 54476, 54505,
        54535, 54564, 54593, 54623, 54652, 54681, 54711, 54741, 54770, 54800, 54830, 54859, 54889, 54919, 54948, 54977, 55007, 55036,
        55066, 55095, 55125, 55154, 55184, 55213, 55243, 55273, 55302, 55332, 55361, 55391, 55420, 55450, 55479, 55508, 55538, 55567,
        55597, 55627, 55657, 55686, 55716, 55745, 55775, 55804, 55834, 55863, 55892, 55922, 55951, 55981, 56011, 56040, 56070, 56100,
        56129, 56159, 56188, 56218, 56247, 56276, 56306, 56335, 56365, 56394, 56424, 56454, 56483, 56513, 56543, 56572, 56601, 56631,
        56660, 56690, 56719, 56749, 56778, 56808, 56837, 56867, 56897, 56926, 56956, 56985, 57015, 57044, 57074, 57103, 57133, 57162,
        57192, 57221, 57251, 57280, 57310, 57340, 57369, 57399, 57429, 57458, 57487, 57517, 57546, 57576, 57605, 57634, 57664, 57694,
        57723, 57753, 57783, 57813, 57842, 57871, 57901, 57930, 57959, 57989, 58018, 58048, 58077, 58107, 58137, 58167, 58196, 58226,
        58255, 58285, 58314, 58343, 58373, 58402, 58432, 58461, 58491, 58521, 58551, 58580, 58610, 58639, 58669, 58698, 58727, 58757,
        58786, 58816, 58845, 58875, 58905, 58934, 58964, 58994, 59023, 59053, 59082, 59111, 59141, 59170, 59200, 59229, 59259, 59288,
        59318, 59348, 59377, 59407, 59436, 59466, 59495, 59525, 59554, 59584, 59613, 59643, 59672, 59702, 59731, 59761, 59791, 59820,
        59850, 59879, 59909, 59939, 59968, 59997, 60027, 60056, 60086, 60115, 60145, 60174, 60204, 60234, 60264, 60293, 60323, 60352,
        60381, 60411, 60440, 60469, 60499, 60528, 60558, 60588, 60618, 60648, 60677, 60707, 60736, 60765, 60795, 60824, 60853, 60883,
        60912, 60942, 60972, 61002, 61031, 61061, 61090, 61120, 61149, 61179, 61208, 61237, 61267, 61296, 61326, 61356, 61385, 61415,
        61445, 61474, 61504, 61533, 61563, 61592, 61621, 61651, 61680, 61710, 61739, 61769, 61799, 61828, 61858, 61888, 61917, 61947,
        61976, 62006, 62035, 62064, 62094, 62123, 62153, 62182, 62212, 62242, 62271, 62301, 62331, 62360, 62390, 62419, 62448, 62478,
        62507, 62537, 62566, 62596, 62625, 62655, 62685, 62715, 62744, 62774, 62803, 62832, 62862, 62891, 62921, 62950, 62980, 63009,
        63039, 63069, 63099, 63128, 63157, 63187, 63216, 63246, 63275, 63305, 63334, 63363, 63393, 63423, 63453, 63482, 63512, 63541,
        63571, 63600, 63630, 63659, 63689, 63718, 63747, 63777, 63807, 63836, 63866, 63895, 63925, 63955, 63984, 64014, 64043, 64073,
        64102, 64131, 64161, 64190, 64220, 64249, 64279, 64309, 64339, 64368, 64398, 64427, 64457, 64486, 64515, 64545, 64574, 64603,
        64633, 64663, 64692, 64722, 64752, 64782, 64811, 64841, 64870, 64899, 64929, 64958, 64987, 65017, 65047, 65076, 65106, 65136,
        65166, 65195, 65225, 65254, 65283, 65313, 65342, 65371, 65401, 65431, 65460, 65490, 65520, 65549, 65579, 65608, 65638, 65667,
        65697, 65726, 65755, 65785, 65815, 65844, 65874, 65903, 65933, 65963, 65992, 66022, 66051, 66081, 66110, 66140, 66169, 66199,
        66228, 66258, 66287, 66317, 66346, 66376, 66405, 66435, 66465, 66494, 66524, 66553, 66583, 66612, 66641, 66671, 66700, 66730,
        66760, 66789, 66819, 66849, 66878, 66908, 66937, 66967, 66996, 67025, 67055, 67084, 67114, 67143, 67173, 67203, 67233, 67262,
        67292, 67321, 67351, 67380, 67409, 67439, 67468, 67497, 67527, 67557, 67587, 67617, 67646, 67676, 67705, 67735, 67764, 67793,
        67823, 67852, 67882, 67911, 67941, 67971, 68000, 68030, 68060, 68089, 68119, 68148, 68177, 68207, 68236, 68266, 68295, 68325,
        68354, 68384, 68414, 68443, 68473, 68502, 68532, 68561, 68591, 68620, 68650, 68679, 68708, 68738, 68768, 68797, 68827, 68857,
        68886, 68916, 68946, 68975, 69004, 69034, 69063, 69092, 69122, 69152, 69181, 69211, 69240, 69270, 69300, 69330, 69359, 69388,
        69418, 69447, 69476, 69506, 69535, 69565, 69595, 69624, 69654, 69684, 69713, 69743, 69772, 69802, 69831, 69861, 69890, 69919,
        69949, 69978, 70008, 70038, 70067, 70097, 70126, 70156, 70186, 70215, 70245, 70274, 70303, 70333, 70362, 70392, 70421, 70451,
        70481, 70510, 70540, 70570, 70599, 70629, 70658, 70687, 70717, 70746, 70776, 70805, 70835, 70864, 70894, 70924, 70954, 70983,
        71013, 71042, 71071, 71101, 71130, 71159, 71189, 71218, 71248, 71278, 71308, 71337, 71367, 71397, 71426, 71455, 71485, 71514,
        71543, 71573, 71602, 71632, 71662, 71691, 71721, 71751, 71781, 71810, 71839, 71869, 71898, 71927, 71957, 71986, 72016, 72046,
        72075, 72105, 72135, 72164, 72194, 72223, 72253, 72282, 72311, 72341, 72370, 72400, 72429, 72459, 72489, 72518, 72548, 72577,
        72607, 72637, 72666, 72695, 72725, 72754, 72784, 72813, 72843, 72872, 72902, 72931, 72961, 72991, 73020, 73050, 73080, 73109,
        73139, 73168, 73197, 73227, 73256, 73286, 73315, 73345, 73375, 73404, 73434, 73464, 73493, 73523, 73552, 73581, 73611, 73640,
        73669, 73699, 73729, 73758, 73788, 73818, 73848, 73877, 73907, 73936, 73965, 73995, 74024, 74053, 74083, 74113, 74142, 74172,
        74202, 74231, 74261, 74291, 74320, 74349, 74379, 74408, 74437, 74467, 74497, 74526, 74556, 74586, 74615, 74645, 74675, 74704,
        74733, 74763, 74792, 74822, 74851, 74881, 74910, 74940, 74969, 74999, 75029, 75058, 75088, 75117, 75147, 75176, 75206, 75235,
        75264, 75294, 75323, 75353, 75383, 75412, 75442, 75472, 75501, 75531, 75560, 75590, 75619, 75648, 75678, 75707, 75737, 75766,
        75796, 75826, 75856, 75885, 75915, 75944, 75974, 76003, 76032, 76062, 76091, 76121, 76150, 76180, 76210, 76239, 76269, 76299,
        76328, 76358, 76387, 76416, 76446, 76475, 76505, 76534, 76564, 76593, 76623, 76653, 76682, 76712, 76741, 76771, 76801, 76830,
        76859, 76889, 76918, 76948, 76977, 77007, 77036, 77066, 77096, 77125, 77155, 77185, 77214, 77243, 77273, 77302, 77332, 77361,
        77390, 77420, 77450, 77479, 77509, 77539, 77569, 77598, 77627, 77657, 77686, 77715, 77745, 77774, 77804, 77833, 77863, 77893,
        77923, 77952, 77982, 78011, 78041, 78070, 78099, 78129, 78158, 78188, 78217, 78247, 78277, 78307, 78336, 78366, 78395, 78425,
        78454, 78483, 78513, 78542, 78572, 78601, 78631, 78661, 78690, 78720, 78750, 78779, 78808, 78838, 78867, 78897, 78926, 78956,
        78985, 79015, 79044, 79074, 79104, 79133, 79163, 79192, 79222, 79251, 79281, 79310, 79340, 79369, 79399, 79428, 79458, 79487,
        79517, 79546, 79576, 79606, 79635, 79665, 79695, 79724, 79753, 79783, 79812, 79841, 79871, 79900, 79930, 79960, 79990
    ];
    /**
     *
     * @param {Date} gDate ?
     * @returns {Object} ?
     */
    function getHijriDate(gDate) {
        let day = gDate.getDate();
        let month = gDate.getMonth();
        let year = gDate.getFullYear();
        let tMonth = month + 1;
        let tYear = year;
        if (tMonth < 3) {
            tYear -= 1;
            tMonth += 12;
        }
        let yPrefix = Math.floor(tYear / 100.);
        let julilanOffset = yPrefix - Math.floor(yPrefix / 4.) - 2;
        const julianNumber = Math.floor(365.25 * (tYear + 4716)) + Math.floor(30.6001 * (tMonth + 1)) + day - julilanOffset - 1524;
        yPrefix = Math.floor((julianNumber - 1867216.25) / 36524.25);
        julilanOffset = yPrefix - Math.floor(yPrefix / 4.) + 1;
        const b = julianNumber + julilanOffset + 1524;
        let c = Math.floor((b - 122.1) / 365.25);
        const d = Math.floor(365.25 * c);
        const tempMonth = Math.floor((b - d) / 30.6001);
        day = (b - d) - Math.floor(30.6001 * tempMonth);
        month = Math.floor((b - d) / 20.6001);
        if (month > 13) {
            c += 1;
            month -= 12;
        }
        month -= 1;
        year = c - 4716;
        const modifiedJulianDate = julianNumber - 2400000;
        // date calculation for year after 2077
        const iyear = 10631. / 30.;
        let z = julianNumber - 1948084;
        const cyc = Math.floor(z / 10631.);
        z = z - 10631 * cyc;
        const j = Math.floor((z - 0.1335) / iyear);
        const iy = 30 * cyc + j;
        z = z - Math.floor(j * iyear + 0.1335);
        let im = Math.floor((z + 28.5001) / 29.5);
        /* istanbul ignore next */
        if (im === 13) {
            im = 12;
        }
        const tempDay = z - Math.floor(29.5001 * im - 29);
        let i = 0;
        for (; i < dateCorrection.length; i++) {
            if (dateCorrection[parseInt(i.toString(), 10)] > modifiedJulianDate) {
                break;
            }
        }
        const iln = i + 16260;
        const ii = Math.floor((iln - 1) / 12);
        let hYear = ii + 1;
        let hmonth = iln - 12 * ii;
        let hDate = modifiedJulianDate - dateCorrection[i - 1] + 1;
        if ((hDate + '').length > 2) {
            hDate = tempDay;
            hmonth = im;
            hYear = iy;
        }
        return { year: hYear, month: hmonth, date: hDate };
    }
    HijriParser.getHijriDate = getHijriDate;
    /**
     *
     * @param {number} year ?
     * @param {number} month ?
     * @param {number} day ?
     * @returns {Date} ?
     */
    function toGregorian(year, month, day) {
        const iy = year;
        const im = month;
        const id = day;
        const ii = iy - 1;
        const iln = (ii * 12) + 1 + (im - 1);
        const i = iln - 16260;
        const mcjdn = id + dateCorrection[i - 1] - 1;
        const julianDate = mcjdn + 2400000;
        const z = Math.floor(julianDate + 0.5);
        let a = Math.floor((z - 1867216.25) / 36524.25);
        a = z + 1 + a - Math.floor(a / 4);
        const b = a + 1524;
        const c = Math.floor((b - 122.1) / 365.25);
        const d = Math.floor(365.25 * c);
        const e = Math.floor((b - d) / 30.6001);
        const gDay = b - d - Math.floor(e * 30.6001);
        let gMonth = e - (e > 13.5 ? 13 : 1);
        const gYear = c - (gMonth > 2.5 ? 4716 : 4715);
        /* istanbul ignore next */
        if (gYear <= 0) {
            gMonth--;
        } // No year zero
        return new Date(gYear + '/' + (gMonth) + '/' + gDay);
    }
    HijriParser.toGregorian = toGregorian;
})(HijriParser || (HijriParser = {}));

const abbreviateRegexGlobal = /\/MMMMM|MMMM|MMM|a|LLLL|LLL|EEEEE|EEEE|E|K|cccc|ccc|WW|W|G+|z+/gi;
const standalone = 'stand-alone';
const weekdayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const timeSetter = {
    m: 'getMinutes',
    h: 'getHours',
    H: 'getHours',
    s: 'getSeconds',
    d: 'getDate',
    f: 'getMilliseconds'
};
const datePartMatcher = {
    'M': 'month',
    'd': 'day',
    'E': 'weekday',
    'c': 'weekday',
    'y': 'year',
    'm': 'minute',
    'h': 'hour',
    'H': 'hour',
    's': 'second',
    'L': 'month',
    'a': 'designator',
    'z': 'timeZone',
    'Z': 'timeZone',
    'G': 'era',
    'f': 'milliseconds'
};
const timeSeparator = 'timeSeparator';
/* tslint:disable no-any */
/**
 * Date Format is a framework provides support for date formatting.
 *
 * @private
 */
class DateFormat {
    /**
     * Returns the formatter function for given skeleton.
     *
     * @param {string} culture -  Specifies the culture name to be which formatting.
     * @param {DateFormatOptions} option - Specific the format in which date  will format.
     * @param {Object} cldr - Specifies the global cldr data collection.
     * @returns {Function} ?
     */
    static dateFormat(culture, option, cldr) {
        const dependable = IntlBase.getDependables(cldr, culture, option.calendar);
        const numObject = getValue('parserObject.numbers', dependable);
        const dateObject = dependable.dateObject;
        const formatOptions = { isIslamic: IntlBase.islamicRegex.test(option.calendar) };
        if (isBlazor() && option.isServerRendered) {
            option = IntlBase.compareBlazorDateFormats(option, culture);
        }
        let resPattern = option.format ||
            IntlBase.getResultantPattern(option.skeleton, dependable.dateObject, option.type, false, isBlazor() ? culture : '');
        formatOptions.dateSeperator = isBlazor() ? getValue('dateSeperator', dateObject) : IntlBase.getDateSeparator(dependable.dateObject);
        if (isUndefined(resPattern)) {
            throwError('Format options or type given must be invalid');
        }
        else {
            resPattern = IntlBase.ConvertDateToWeekFormat(resPattern);
            if (isBlazor()) {
                resPattern = resPattern.replace(/tt/, 'a');
            }
            formatOptions.pattern = resPattern;
            formatOptions.numMapper = isBlazor() ?
                extend({}, numObject) : ParserBase.getNumberMapper(dependable.parserObject, ParserBase.getNumberingSystem(cldr));
            const patternMatch = resPattern.match(abbreviateRegexGlobal) || [];
            for (const str of patternMatch) {
                const len = str.length;
                let char = str[0];
                if (char === 'K') {
                    char = 'h';
                }
                switch (char) {
                    case 'E':
                    case 'c':
                        if (isBlazor()) {
                            // eslint-disable-next-line
                            formatOptions.weekday = getValue('days.' + IntlBase.monthIndex[len], dateObject);
                        }
                        else {
                            // eslint-disable-next-line
                            formatOptions.weekday = dependable.dateObject[IntlBase.days][standalone][IntlBase.monthIndex[len]];
                        }
                        break;
                    case 'M':
                    case 'L':
                        if (isBlazor()) {
                            // eslint-disable-next-line
                            formatOptions.month = getValue('months.' + IntlBase.monthIndex[len], dateObject);
                        }
                        else {
                            // eslint-disable-next-line
                            formatOptions.month = dependable.dateObject[IntlBase.month][standalone][IntlBase.monthIndex[len]];
                        }
                        break;
                    case 'a':
                        formatOptions.designator = isBlazor() ?
                            getValue('dayPeriods', dateObject) : getValue('dayPeriods.format.wide', dateObject);
                        break;
                    case 'G':
                        // eslint-disable-next-line
                        const eText = (len <= 3) ? 'eraAbbr' : (len === 4) ? 'eraNames' : 'eraNarrow';
                        formatOptions.era = isBlazor() ? getValue('eras', dateObject) : getValue('eras.' + eText, dependable.dateObject);
                        break;
                    case 'z':
                        formatOptions.timeZone = getValue('dates.timeZoneNames', dependable.parserObject);
                        break;
                }
            }
        }
        return (value) => {
            if (isNaN(value.getDate())) {
                return null;
            }
            return this.intDateFormatter(value, formatOptions);
        };
    }
    /**
     * Returns formatted date string based on options passed.
     *
     * @param {Date} value ?
     * @param {FormatOptions} options ?
     * @returns {string} ?
     */
    static intDateFormatter(value, options) {
        const pattern = options.pattern;
        let ret = '';
        const matches = pattern.match(IntlBase.dateParseRegex);
        const dObject = this.getCurrentDateValue(value, options.isIslamic);
        for (const match of matches) {
            const length = match.length;
            let char = match[0];
            if (char === 'K') {
                char = 'h';
            }
            let curval;
            let curvalstr = '';
            let isNumber;
            let processNumber;
            let curstr = '';
            switch (char) {
                case 'M':
                case 'L':
                    curval = dObject.month;
                    if (length > 2) {
                        // eslint-disable-next-line
                        ret += options.month[curval];
                    }
                    else {
                        isNumber = true;
                    }
                    break;
                case 'E':
                case 'c':
                    // eslint-disable-next-line
                    ret += options.weekday[weekdayKey[value.getDay()]];
                    break;
                case 'H':
                case 'h':
                case 'm':
                case 's':
                case 'd':
                case 'f':
                    isNumber = true;
                    if (char === 'd') {
                        curval = dObject.date;
                    }
                    else if (char === 'f') {
                        isNumber = false;
                        processNumber = true;
                        // eslint-disable-next-line
                        curvalstr = value[timeSetter[char]]().toString();
                        curvalstr = curvalstr.substring(0, length);
                        const curlength = curvalstr.length;
                        if (length !== curlength) {
                            if (length > 3) {
                                continue;
                            }
                            for (let i = 0; i < length - curlength; i++) {
                                curvalstr = '0' + curvalstr.toString();
                            }
                        }
                        curstr += curvalstr;
                    }
                    else {
                        // eslint-disable-next-line
                        curval = value[timeSetter[char]]();
                    }
                    if (char === 'h') {
                        curval = curval % 12 || 12;
                    }
                    break;
                case 'y':
                    processNumber = true;
                    curstr += dObject.year;
                    if (length === 2) {
                        curstr = curstr.substr(curstr.length - 2);
                    }
                    break;
                case 'a':
                    // eslint-disable-next-line
                    let desig = value.getHours() < 12 ? 'am' : 'pm';
                    // eslint-disable-next-line
                    ret += options.designator[desig];
                    break;
                case 'G':
                    // eslint-disable-next-line
                    let dec = value.getFullYear() < 0 ? 0 : 1;
                    // eslint-disable-next-line
                    let retu = options.era[dec];
                    if (isNullOrUndefined(retu)) {
                        // eslint-disable-next-line
                        retu = options.era[dec ? 0 : 1];
                    }
                    ret += retu || '';
                    break;
                case '\'':
                    ret += (match === '\'\'') ? '\'' : match.replace(/'/g, '');
                    break;
                case 'z':
                    // eslint-disable-next-line
                    let timezone = value.getTimezoneOffset();
                    // eslint-disable-next-line
                    let pattern = (length < 4) ? '+H;-H' : options.timeZone.hourFormat;
                    pattern = pattern.replace(/:/g, options.numMapper.timeSeparator);
                    if (timezone === 0) {
                        ret += options.timeZone.gmtZeroFormat;
                    }
                    else {
                        processNumber = true;
                        curstr = this.getTimeZoneValue(timezone, pattern);
                    }
                    curstr = options.timeZone.gmtFormat.replace(/\{0\}/, curstr);
                    break;
                case ':':
                    // eslint-disable-next-line
                    ret += options.numMapper.numberSymbols[timeSeparator];
                    break;
                case '/':
                    ret += options.dateSeperator;
                    break;
                case 'W':
                    isNumber = true;
                    curval = IntlBase.getWeekOfYear(value);
                    break;
                default:
                    ret += match;
            }
            if (isNumber) {
                processNumber = true;
                curstr = this.checkTwodigitNumber(curval, length);
            }
            if (processNumber) {
                ret += ParserBase.convertValueParts(curstr, IntlBase.latnParseRegex, options.numMapper.mapper);
            }
        }
        return ret;
    }
    static getCurrentDateValue(value, isIslamic) {
        if (isIslamic) {
            return HijriParser.getHijriDate(value);
        }
        return { year: value.getFullYear(), month: value.getMonth() + 1, date: value.getDate() };
    }
    /**
     * Returns two digit numbers for given value and length
     *
     * @param {number} val ?
     * @param {number} len ?
     * @returns {string} ?
     */
    static checkTwodigitNumber(val, len) {
        const ret = val + '';
        if (len === 2 && ret.length !== 2) {
            return '0' + ret;
        }
        return ret;
    }
    /**
     * Returns the value of the Time Zone.
     *
     * @param {number} tVal ?
     * @param {string} pattern ?
     * @returns {string} ?
     * @private
     */
    static getTimeZoneValue(tVal, pattern) {
        const splt = pattern.split(';');
        let curPattern = splt[tVal > 0 ? 1 : 0];
        const no = Math.abs(tVal);
        return curPattern = curPattern.replace(/HH?|mm/g, (str) => {
            const len = str.length;
            const ishour = str.indexOf('H') !== -1;
            return this.checkTwodigitNumber(Math.floor(ishour ? (no / 60) : (no % 60)), len);
        });
    }
}

const errorText = {
    'ms': 'minimumSignificantDigits',
    'ls': 'maximumSignificantDigits',
    'mf': 'minimumFractionDigits',
    'lf': 'maximumFractionDigits'
};
const percentSign = 'percentSign';
const minusSign = 'minusSign';
const mapper$1 = ['infinity', 'nan', 'group', 'decimal', 'exponential'];
/**
 * Module for number formatting.
 *
 * @private
 */
class NumberFormat {
    /**
     * Returns the formatter function for given skeleton.
     *
     * @param {string} culture -  Specifies the culture name to be which formatting.
     * @param {NumberFormatOptions} option - Specific the format in which number  will format.
     * @param {Object} cldr - Specifies the global cldr data collection.
     * @returns {Function} ?
     */
    static numberFormatter(culture, option, cldr) {
        const fOptions = extend({}, option);
        let cOptions = {};
        const dOptions = {};
        let symbolPattern;
        const dependable = IntlBase.getDependables(cldr, culture, '', true);
        const numObject = dependable.numericObject;
        dOptions.numberMapper = isBlazor() ? extend({}, numObject) :
            ParserBase.getNumberMapper(dependable.parserObject, ParserBase.getNumberingSystem(cldr), true);
        dOptions.currencySymbol = isBlazor() ? getValue('currencySymbol', numObject) : IntlBase.getCurrencySymbol(dependable.numericObject, fOptions.currency || defaultCurrencyCode, option.altSymbol);
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        dOptions.percentSymbol = isBlazor() ? getValue('numberSymbols.percentSign', numObject) :
            dOptions.numberMapper.numberSymbols[`${percentSign}`];
        dOptions.minusSymbol = isBlazor() ? getValue('numberSymbols.minusSign', numObject) :
            dOptions.numberMapper.numberSymbols[`${minusSign}`];
        const symbols = dOptions.numberMapper.numberSymbols;
        if ((option.format) && !(IntlBase.formatRegex.test(option.format))) {
            cOptions = IntlBase.customFormat(option.format, dOptions, dependable.numericObject);
        }
        else {
            extend(fOptions, IntlBase.getProperNumericSkeleton(option.format || 'N'));
            fOptions.isCurrency = fOptions.type === 'currency';
            fOptions.isPercent = fOptions.type === 'percent';
            if (!isBlazor()) {
                symbolPattern = IntlBase.getSymbolPattern(fOptions.type, dOptions.numberMapper.numberSystem, dependable.numericObject, fOptions.isAccount);
            }
            fOptions.groupOne = this.checkValueRange(fOptions.maximumSignificantDigits, fOptions.minimumSignificantDigits, true);
            this.checkValueRange(fOptions.maximumFractionDigits, fOptions.minimumFractionDigits, false, true);
            if (!isUndefined(fOptions.fractionDigits)) {
                fOptions.minimumFractionDigits = fOptions.maximumFractionDigits = fOptions.fractionDigits;
            }
            if (isUndefined(fOptions.useGrouping)) {
                fOptions.useGrouping = true;
            }
            if (fOptions.isCurrency && !isBlazor()) {
                symbolPattern = symbolPattern.replace(/\u00A4/g, IntlBase.defaultCurrency);
            }
            if (!isBlazor()) {
                const split = symbolPattern.split(';');
                cOptions.nData = IntlBase.getFormatData(split[1] || '-' + split[0], true, dOptions.currencySymbol);
                cOptions.pData = IntlBase.getFormatData(split[0], false, dOptions.currencySymbol);
                if (fOptions.useGrouping) {
                    fOptions.groupSeparator = symbols[mapper$1[2]];
                    fOptions.groupData = this.getGroupingDetails(split[0]);
                }
            }
            else {
                cOptions.nData = extend({}, {}, getValue(fOptions.type + 'nData', numObject));
                cOptions.pData = extend({}, {}, getValue(fOptions.type + 'pData', numObject));
                if (fOptions.type === 'currency' && option.currency) {
                    IntlBase.replaceBlazorCurrency([cOptions.pData, cOptions.nData], dOptions.currencySymbol, option.currency);
                }
            }
            const minFrac = isUndefined(fOptions.minimumFractionDigits);
            if (minFrac) {
                fOptions.minimumFractionDigits = cOptions.nData.minimumFraction;
            }
            if (isUndefined(fOptions.maximumFractionDigits)) {
                const mval = cOptions.nData.maximumFraction;
                fOptions.maximumFractionDigits = isUndefined(mval) && fOptions.isPercent ? 0 : mval;
            }
            const mfrac = fOptions.minimumFractionDigits;
            const lfrac = fOptions.maximumFractionDigits;
            if (!isUndefined(mfrac) && !isUndefined(lfrac)) {
                if (mfrac > lfrac) {
                    fOptions.maximumFractionDigits = mfrac;
                }
            }
        }
        extend(cOptions.nData, fOptions);
        extend(cOptions.pData, fOptions);
        return (value) => {
            if (isNaN(value)) {
                return symbols[mapper$1[1]];
            }
            else if (!isFinite(value)) {
                return symbols[mapper$1[0]];
            }
            return this.intNumberFormatter(value, cOptions, dOptions, option);
        };
    }
    /**
     * Returns grouping details for the pattern provided
     *
     * @param {string} pattern ?
     * @returns {GroupDetails} ?
     */
    static getGroupingDetails(pattern) {
        const ret = {};
        const match = pattern.match(IntlBase.negativeDataRegex);
        if (match && match[4]) {
            const pattern = match[4];
            const p = pattern.lastIndexOf(',');
            if (p !== -1) {
                const temp = pattern.split('.')[0];
                ret.primary = (temp.length - p) - 1;
                const s = pattern.lastIndexOf(',', p - 1);
                if (s !== -1) {
                    ret.secondary = p - 1 - s;
                }
            }
        }
        return ret;
    }
    /**
     * Returns if the provided integer range is valid.
     *
     * @param {number} val1 ?
     * @param {number} val2 ?
     * @param {boolean} checkbothExist ?
     * @param {boolean} isFraction ?
     * @returns {boolean} ?
     */
    static checkValueRange(val1, val2, checkbothExist, isFraction) {
        const decide = isFraction ? 'f' : 's';
        let dint = 0;
        const str1 = errorText['l' + decide];
        // eslint-disable-next-line
        let str2 = errorText['m' + decide];
        if (!isUndefined(val1)) {
            this.checkRange(val1, str1, isFraction);
            dint++;
        }
        if (!isUndefined(val2)) {
            this.checkRange(val2, str2, isFraction);
            dint++;
        }
        if (dint === 2) {
            if (val1 < val2) {
                throwError(str2 + 'specified must be less than the' + str1);
            }
            else {
                return true;
            }
        }
        else if (checkbothExist && dint === 1) {
            throwError('Both' + str2 + 'and' + str2 + 'must be present');
        }
        return false;
    }
    /**
     * Check if the provided fraction range is valid
     *
     * @param {number} val ?
     * @param {string} text ?
     * @param {boolean} isFraction ?
     * @returns {void} ?
     */
    static checkRange(val, text, isFraction) {
        const range = isFraction ? [0, 20] : [1, 21];
        if (val < range[0] || val > range[1]) {
            throwError(text + 'value must be within the range' + range[0] + 'to' + range[1]);
        }
    }
    /**
     * Returns formatted numeric string for provided formatting options
     *
     * @param {number} value ?
     * @param {base.GenericFormatOptions} fOptions ?
     * @param {CommonOptions} dOptions ?
     * @param {NumberFormatOptions} [option] ?
     * @returns {string} ?
     */
    static intNumberFormatter(value, fOptions, dOptions, option) {
        let curData;
        if (isUndefined(fOptions.nData.type)) {
            return undefined;
        }
        else {
            if (value < 0) {
                value = value * -1;
                curData = fOptions.nData;
            }
            else if (value === 0) {
                curData = fOptions.zeroData || fOptions.pData;
            }
            else {
                curData = fOptions.pData;
            }
            let fValue = '';
            if (curData.isPercent) {
                value = value * 100;
            }
            if (curData.groupOne) {
                fValue = this.processSignificantDigits(value, curData.minimumSignificantDigits, curData.maximumSignificantDigits);
            }
            else {
                fValue = this.processFraction(value, curData.minimumFractionDigits, curData.maximumFractionDigits, option);
                if (curData.minimumIntegerDigits) {
                    fValue = this.processMinimumIntegers(fValue, curData.minimumIntegerDigits);
                }
                if (dOptions.isCustomFormat && curData.minimumFractionDigits < curData.maximumFractionDigits
                    && /\d+\.\d+/.test(fValue)) {
                    const temp = fValue.split('.');
                    let decimalPart = temp[1];
                    const len = decimalPart.length;
                    for (let i = len - 1; i >= 0; i--) {
                        if (decimalPart[`${i}`] === '0' && i >= curData.minimumFractionDigits) {
                            decimalPart = decimalPart.slice(0, i);
                        }
                        else {
                            break;
                        }
                    }
                    fValue = temp[0] + '.' + decimalPart;
                }
            }
            if (curData.type === 'scientific') {
                fValue = value.toExponential(curData.maximumFractionDigits);
                fValue = fValue.replace('e', dOptions.numberMapper.numberSymbols[mapper$1[4]]);
            }
            fValue = fValue.replace('.', dOptions.numberMapper.numberSymbols[mapper$1[3]]);
            fValue = curData.format === '#,###,,;(#,###,,)' ? this.customPivotFormat(parseInt(fValue, 10)) : fValue;
            if (curData.useGrouping) {
                /* eslint-disable  @typescript-eslint/no-explicit-any */
                fValue = this.groupNumbers(fValue, curData.groupData.primary, curData.groupSeparator || ',', dOptions.numberMapper.numberSymbols[mapper$1[3]] || '.', curData.groupData.secondary);
            }
            fValue = ParserBase.convertValueParts(fValue, IntlBase.latnParseRegex, dOptions.numberMapper.mapper);
            if (curData.nlead === 'N/A') {
                return curData.nlead;
            }
            else {
                if (fValue === '0' && option && option.format === '0') {
                    return fValue + curData.nend;
                }
                return curData.nlead + fValue + curData.nend;
            }
        }
    }
    /**
     * Returns significant digits processed numeric string
     *
     * @param {number} value ?
     * @param {number} min ?
     * @param {number} max ?
     * @returns {string} ?
     */
    static processSignificantDigits(value, min, max) {
        let temp = value + '';
        let tn;
        const length = temp.length;
        if (length < min) {
            return value.toPrecision(min);
        }
        else {
            temp = value.toPrecision(max);
            tn = +temp;
            return tn + '';
        }
    }
    /**
     * Returns grouped numeric string
     *
     * @param {string} val ?
     * @param {number} level1 ?
     * @param {string} sep ?
     * @param {string} decimalSymbol ?
     * @param {number} level2 ?
     * @returns {string} ?
     */
    static groupNumbers(val, level1, sep, decimalSymbol, level2) {
        let flag = !isNullOrUndefined(level2) && level2 !== 0;
        const split = val.split(decimalSymbol);
        const prefix = split[0];
        let length = prefix.length;
        let str = '';
        while (length > level1) {
            str = prefix.slice(length - level1, length) + (str.length ?
                (sep + str) : '');
            length -= level1;
            if (flag) {
                level1 = level2;
                flag = false;
            }
        }
        split[0] = prefix.slice(0, length) + (str.length ? sep : '') + str;
        return split.join(decimalSymbol);
    }
    /**
     * Returns fraction processed numeric string
     *
     * @param {number} value ?
     * @param {number} min ?
     * @param {number} max ?
     * @param {NumberFormatOptions} [option] ?
     * @returns {string} ?
     */
    static processFraction(value, min, max, option) {
        const temp = (value + '').split('.')[1];
        const length = temp ? temp.length : 0;
        if (min && length < min) {
            let ret = '';
            if (length === 0) {
                ret = value.toFixed(min);
            }
            else {
                ret += value;
                for (let j = 0; j < min - length; j++) {
                    ret += '0';
                }
                return ret;
            }
            return value.toFixed(min);
        }
        else if (!isNullOrUndefined(max) && (length > max || max === 0)) {
            return value.toFixed(max);
        }
        let str = value + '';
        if (str[0] === '0' && option && option.format === '###.00') {
            str = str.slice(1);
        }
        return str;
    }
    /**
     * Returns integer processed numeric string
     *
     * @param {string} value ?
     * @param {number} min ?
     * @returns {string} ?
     */
    static processMinimumIntegers(value, min) {
        const temp = value.split('.');
        let lead = temp[0];
        const len = lead.length;
        if (len < min) {
            for (let i = 0; i < min - len; i++) {
                lead = '0' + lead;
            }
            temp[0] = lead;
        }
        return temp.join('.');
    }
    /**
     * Returns custom format for pivot table
     *
     * @param {number} value ?
     * @returns {string} ?
     */
    static customPivotFormat(value) {
        if (value >= 500000) {
            value /= 1000000;
            // eslint-disable-next-line
            const [integer, decimal] = value.toString().split('.');
            return decimal && +decimal.substring(0, 1) >= 5
                ? Math.ceil(value).toString()
                : Math.floor(value).toString();
        }
        return '';
    }
}

const standalone$1 = 'stand-alone';
const latnRegex = /^[0-9]*$/;
const timeSetter$1 = {
    minute: 'setMinutes',
    hour: 'setHours',
    second: 'setSeconds',
    day: 'setDate',
    month: 'setMonth',
    milliseconds: 'setMilliseconds'
};
const month = 'months';
/* tslint:disable no-any */
/**
 * Date Parser.
 *
 * @private
 */
class DateParser {
    /**
     * Returns the parser function for given skeleton.
     *
     * @param {string} culture -  Specifies the culture name to be which formatting.
     * @param {DateFormatOptions} option - Specific the format in which string date  will be parsed.
     * @param {Object} cldr - Specifies the global cldr data collection.
     * @returns {Function} ?
     */
    static dateParser(culture, option, cldr) {
        const dependable = IntlBase.getDependables(cldr, culture, option.calendar);
        const numOptions = ParserBase.getCurrentNumericOptions(dependable.parserObject, ParserBase.getNumberingSystem(cldr), false, isBlazor());
        let parseOptions = {};
        if (isBlazor() && option.isServerRendered) {
            option = IntlBase.compareBlazorDateFormats(option, culture);
        }
        let resPattern = option.format ||
            IntlBase.getResultantPattern(option.skeleton, dependable.dateObject, option.type, false, isBlazor() ? culture : '');
        let regexString = '';
        let hourOnly;
        if (isUndefined(resPattern)) {
            throwError('Format options or type given must be invalid');
        }
        else {
            resPattern = IntlBase.ConvertDateToWeekFormat(resPattern);
            parseOptions = { isIslamic: IntlBase.islamicRegex.test(option.calendar), pattern: resPattern, evalposition: {}, culture: culture };
            const patternMatch = resPattern.match(IntlBase.dateParseRegex) || [];
            const length = patternMatch.length;
            let gmtCorrection = 0;
            let zCorrectTemp = 0;
            let isgmtTraversed = false;
            const nRegx = numOptions.numericRegex;
            // eslint-disable-next-line
            let numMapper = isBlazor() ? dependable.parserObject.numbers :
                ParserBase.getNumberMapper(dependable.parserObject, ParserBase.getNumberingSystem(cldr));
            for (let i = 0; i < length; i++) {
                const str = patternMatch[parseInt(i.toString(), 10)];
                const len = str.length;
                const char = (str[0] === 'K') ? 'h' : str[0];
                let isNumber;
                let canUpdate;
                // eslint-disable-next-line
                let charKey = datePartMatcher[char];
                const optional = (len === 2) ? '' : '?';
                if (isgmtTraversed) {
                    gmtCorrection = zCorrectTemp;
                    isgmtTraversed = false;
                }
                switch (char) {
                    case 'E':
                    case 'c':
                        // eslint-disable-next-line
                        let weekData;
                        if (isBlazor()) {
                            // eslint-disable-next-line
                            weekData = getValue('days.' + IntlBase.monthIndex[len], dependable.dateObject);
                        }
                        else {
                            // eslint-disable-next-line
                            weekData = dependable.dateObject[IntlBase.days][standalone$1][IntlBase.monthIndex[len]];
                        }
                        // eslint-disable-next-line
                        let weekObject = ParserBase.reverseObject(weekData);
                        // tslint:enable
                        regexString += '(' + Object.keys(weekObject).join('|') + ')';
                        break;
                    case 'M':
                    case 'L':
                    case 'd':
                    case 'm':
                    case 's':
                    case 'h':
                    case 'H':
                    case 'f':
                        canUpdate = true;
                        if ((char === 'M' || char === 'L') && len > 2) {
                            let monthData;
                            if (isBlazor()) {
                                // eslint-disable-next-line
                                monthData = getValue('months.' + IntlBase.monthIndex[len], dependable.dateObject);
                            }
                            else {
                                // eslint-disable-next-line
                                monthData = dependable.dateObject[month][standalone$1][IntlBase.monthIndex[len]];
                            }
                            // eslint-disable-next-line
                            parseOptions[charKey] = ParserBase.reverseObject(monthData);
                            // eslint-disable-next-line
                            regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + ')';
                        }
                        else if (char === 'f') {
                            if (len > 3) {
                                continue;
                            }
                            isNumber = true;
                            regexString += '(' + nRegx + nRegx + '?' + nRegx + '?' + ')';
                        }
                        else {
                            isNumber = true;
                            regexString += '(' + nRegx + nRegx + optional + ')';
                        }
                        if (char === 'h') {
                            parseOptions.hour12 = true;
                        }
                        break;
                    case 'W':
                        // eslint-disable-next-line
                        let opt = len === 1 ? '?' : '';
                        regexString += '(' + nRegx + opt + nRegx + ')';
                        break;
                    case 'y':
                        canUpdate = isNumber = true;
                        if (len === 2) {
                            regexString += '(' + nRegx + nRegx + ')';
                        }
                        else {
                            regexString += '(' + nRegx + '{' + len + ',})';
                        }
                        break;
                    case 'a':
                        canUpdate = true;
                        // eslint-disable-next-line
                        let periodValur = isBlazor() ?
                            getValue('dayPeriods', dependable.dateObject) :
                            getValue('dayPeriods.format.wide', dependable.dateObject);
                        // eslint-disable-next-line
                        parseOptions[charKey] = ParserBase.reverseObject(periodValur);
                        // eslint-disable-next-line
                        regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + ')';
                        break;
                    case 'G':
                        canUpdate = true;
                        // eslint-disable-next-line
                        let eText = (len <= 3) ? 'eraAbbr' : (len === 4) ? 'eraNames' : 'eraNarrow';
                        // eslint-disable-next-line
                        parseOptions[charKey] = ParserBase.reverseObject(isBlazor() ?
                            getValue('eras', dependable.dateObject) : getValue('eras.' + eText, dependable.dateObject));
                        // eslint-disable-next-line
                        regexString += '(' + Object.keys(parseOptions[charKey]).join('|') + '?)';
                        break;
                    case 'z':
                        // eslint-disable-next-line
                        let tval = new Date().getTimezoneOffset();
                        canUpdate = (tval !== 0);
                        // eslint-disable-next-line
                        parseOptions[charKey] = getValue('dates.timeZoneNames', dependable.parserObject);
                        // eslint-disable-next-line
                        let tzone = parseOptions[charKey];
                        hourOnly = (len < 4);
                        // eslint-disable-next-line
                        let hpattern = hourOnly ? '+H;-H' : tzone.hourFormat;
                        hpattern = hpattern.replace(/:/g, numMapper.timeSeparator);
                        regexString += '(' + this.parseTimeZoneRegx(hpattern, tzone, nRegx) + ')?';
                        isgmtTraversed = true;
                        zCorrectTemp = hourOnly ? 6 : 12;
                        break;
                    case '\'':
                        // eslint-disable-next-line
                        let iString = str.replace(/'/g, '');
                        regexString += '(' + iString + ')?';
                        break;
                    default:
                        regexString += '([\\D])';
                        break;
                }
                if (canUpdate) {
                    parseOptions.evalposition[`${charKey}`] = { isNumber: isNumber, pos: i + 1 + gmtCorrection, hourOnly: hourOnly };
                }
                if (i === length - 1 && !isNullOrUndefined(regexString)) {
                    const regExp = RegExp;
                    parseOptions.parserRegex = new regExp('^' + regexString + '$', 'i');
                }
            }
        }
        return (value) => {
            const parsedDateParts = this.internalDateParse(value, parseOptions, numOptions);
            if (isNullOrUndefined(parsedDateParts) || !Object.keys(parsedDateParts).length) {
                return null;
            }
            if (parseOptions.isIslamic) {
                let dobj = {};
                let tYear = parsedDateParts.year;
                const tDate = parsedDateParts.day;
                const tMonth = parsedDateParts.month;
                const ystrig = tYear ? (tYear + '') : '';
                const is2DigitYear = (ystrig.length === 2);
                if (!tYear || !tMonth || !tDate || is2DigitYear) {
                    dobj = HijriParser.getHijriDate(new Date());
                }
                if (is2DigitYear) {
                    tYear = parseInt((dobj.year + '').slice(0, 2) + ystrig, 10);
                }
                // tslint:disable-next-line
                const dateObject = HijriParser.toGregorian(tYear || dobj.year, tMonth || dobj.month, tDate || dobj.date);
                parsedDateParts.year = dateObject.getFullYear();
                parsedDateParts.month = dateObject.getMonth() + 1;
                parsedDateParts.day = dateObject.getDate();
            }
            return this.getDateObject(parsedDateParts);
        };
    }
    /* tslint:disable */
    /**
     * Returns date object for provided date options
     *
     * @param {DateParts} options ?
     * @param {Date} value ?
     * @returns {Date} ?
     */
    static getDateObject(options, value) {
        const res = value || new Date();
        res.setMilliseconds(0);
        const tKeys = ['hour', 'minute', 'second', 'milliseconds', 'month', 'day'];
        let y = options.year;
        const desig = options.designator;
        const tzone = options.timeZone;
        if (!isUndefined(y)) {
            const len = (y + '').length;
            if (len <= 2) {
                const century = Math.floor(res.getFullYear() / 100) * 100;
                y += century;
            }
            res.setFullYear(y);
        }
        for (const key of tKeys) {
            // eslint-disable-next-line
            let tValue = options[key];
            if (isUndefined(tValue) && key === 'day') {
                res.setDate(1);
            }
            if (!isUndefined(tValue)) {
                if (key === 'month') {
                    tValue -= 1;
                    if (tValue < 0 || tValue > 11) {
                        return new Date('invalid');
                    }
                    const pDate = res.getDate();
                    res.setDate(1);
                    // eslint-disable-next-line
                    res[timeSetter$1[key]](tValue);
                    const lDate = new Date(res.getFullYear(), tValue + 1, 0).getDate();
                    res.setDate(pDate < lDate ? pDate : lDate);
                }
                else {
                    if (key === 'day') {
                        const lastDay = new Date(res.getFullYear(), res.getMonth() + 1, 0).getDate();
                        if ((tValue < 1 || tValue > lastDay)) {
                            return null;
                        }
                    }
                    // eslint-disable-next-line
                    res[timeSetter$1[key]](tValue);
                }
            }
        }
        if (!isUndefined(desig)) {
            const hour = res.getHours();
            if (desig === 'pm') {
                res.setHours(hour + (hour === 12 ? 0 : 12));
            }
            else if (hour === 12) {
                res.setHours(0);
            }
        }
        if (!isUndefined(tzone)) {
            const tzValue = tzone - res.getTimezoneOffset();
            if (tzValue !== 0) {
                res.setMinutes(res.getMinutes() + tzValue);
            }
        }
        return res;
    }
    /**
     * Returns date parsing options for provided value along with parse and numeric options
     *
     * @param {string} value ?
     * @param {ParseOptions} parseOptions ?
     * @param {NumericOptions} num ?
     * @returns {DateParts} ?
     */
    static internalDateParse(value, parseOptions, num) {
        const matches = value.match(parseOptions.parserRegex);
        const retOptions = { 'hour': 0, 'minute': 0, 'second': 0 };
        if (isNullOrUndefined(matches)) {
            return null;
        }
        else {
            const props = Object.keys(parseOptions.evalposition);
            for (const prop of props) {
                const curObject = parseOptions.evalposition[`${prop}`];
                let matchString = matches[curObject.pos];
                if (curObject.isNumber) {
                    // eslint-disable-next-line
                    retOptions[prop] = this.internalNumberParser(matchString, num);
                }
                else {
                    if (prop === 'timeZone' && !isUndefined(matchString)) {
                        const pos = curObject.pos;
                        let val;
                        const tmatch = matches[pos + 1];
                        const flag = !isUndefined(tmatch);
                        if (curObject.hourOnly) {
                            val = this.getZoneValue(flag, tmatch, matches[pos + 4], num) * 60;
                        }
                        else {
                            val = this.getZoneValue(flag, tmatch, matches[pos + 7], num) * 60;
                            val += this.getZoneValue(flag, matches[pos + 4], matches[pos + 10], num);
                        }
                        if (!isNullOrUndefined(val)) {
                            retOptions[`${prop}`] = val;
                        }
                    }
                    else {
                        const cultureOptions = ['en-US', 'en-MH', 'en-MP'];
                        // eslint-disable-next-line
                        matchString = ((prop === 'month') && (!parseOptions.isIslamic) && (parseOptions.culture === 'en' || parseOptions.culture === 'en-GB' || parseOptions.culture === 'en-US'))
                            ? matchString[0].toUpperCase() + matchString.substring(1).toLowerCase() : matchString;
                        // eslint-disable-next-line
                        matchString = ((prop !== 'month') && (prop === 'designator') && parseOptions.culture && parseOptions.culture.indexOf('en-') !== -1 && cultureOptions.indexOf(parseOptions.culture) === -1)
                            ? matchString.toLowerCase() : matchString;
                        // eslint-disable-next-line
                        retOptions[prop] = parseOptions[prop][matchString];
                    }
                }
            }
            if (parseOptions.hour12) {
                retOptions.hour12 = true;
            }
        }
        return retOptions;
    }
    /**
     * Returns parsed number for provided Numeric string and Numeric Options
     *
     * @param {string} value ?
     * @param {NumericOptions} option ?
     * @returns {number} ?
     */
    static internalNumberParser(value, option) {
        value = ParserBase.convertValueParts(value, option.numberParseRegex, option.numericPair);
        if (latnRegex.test(value)) {
            return +value;
        }
        return null;
    }
    /**
     * Returns parsed time zone RegExp for provided hour format and time zone
     *
     * @param {string} hourFormat ?
     * @param {base.TimeZoneOptions} tZone ?
     * @param {string} nRegex ?
     * @returns {string} ?
     */
    static parseTimeZoneRegx(hourFormat, tZone, nRegex) {
        const pattern = tZone.gmtFormat;
        let ret;
        const cRegex = '(' + nRegex + ')' + '(' + nRegex + ')';
        let splitStr;
        ret = hourFormat.replace('+', '\\+');
        if (hourFormat.indexOf('HH') !== -1) {
            ret = ret.replace(/HH|mm/g, '(' + cRegex + ')');
        }
        else {
            ret = ret.replace(/H|m/g, '(' + cRegex + '?)');
        }
        // eslint-disable-next-line
        splitStr = (ret.split(';').map((str) => {
            return pattern.replace('{0}', str);
        }));
        ret = splitStr.join('|') + '|' + tZone.gmtZeroFormat;
        return ret;
    }
    /**
     * Returns zone based value.
     *
     * @param {boolean} flag ?
     * @param {string} val1 ?
     * @param {string} val2 ?
     * @param {NumericOptions} num ?
     * @returns {number} ?
     */
    static getZoneValue(flag, val1, val2, num) {
        const ival = flag ? val1 : val2;
        if (!ival) {
            return 0;
        }
        const value = this.internalNumberParser(ival, num);
        if (flag) {
            return -value;
        }
        return value;
    }
}

const regExp$1 = RegExp;
// eslint-disable-next-line
const parseRegex = new regExp$1('^([^0-9]*)' + '(([0-9,]*[0-9]+)(\.[0-9]+)?)' + '([Ee][+-]?[0-9]+)?([^0-9]*)$');
const groupRegex = /,/g;
const keys = ['minusSign', 'infinity'];
/**
 * Module for Number Parser.
 *
 * @private
 */
class NumberParser {
    /**
     * Returns the parser function for given skeleton.
     *
     * @param {string} culture -  Specifies the culture name to be which formatting.
     * @param {NumberFormatOptions} option - Specific the format in which number  will parsed.
     * @param {Object} cldr - Specifies the global cldr data collection.
     * @returns {Function} ?
     */
    static numberParser(culture, option, cldr) {
        const dependable = IntlBase.getDependables(cldr, culture, '', true);
        const parseOptions = { custom: true };
        let numOptions;
        if ((IntlBase.formatRegex.test(option.format)) || !(option.format)) {
            extend(parseOptions, IntlBase.getProperNumericSkeleton(option.format || 'N'));
            parseOptions.custom = false;
            if (!parseOptions.fractionDigits) {
                if (option.maximumFractionDigits) {
                    parseOptions.maximumFractionDigits = option.maximumFractionDigits;
                }
            }
        }
        else {
            extend(parseOptions, IntlBase.customFormat(option.format, null, null));
        }
        const numbers = getValue('numbers', dependable.parserObject);
        // eslint-disable-next-line
        numOptions = ParserBase.getCurrentNumericOptions(dependable.parserObject, ParserBase.getNumberingSystem(cldr), true, isBlazor());
        parseOptions.symbolRegex = ParserBase.getSymbolRegex(Object.keys(numOptions.symbolMatch));
        // eslint-disable-next-line
        parseOptions.infinity = numOptions.symbolNumberSystem[keys[1]];
        let symbolpattern;
        if (!isBlazor()) {
            symbolpattern = IntlBase.getSymbolPattern(parseOptions.type, numOptions.numberSystem, dependable.numericObject, parseOptions.isAccount);
            if (symbolpattern) {
                symbolpattern = symbolpattern.replace(/\u00A4/g, IntlBase.defaultCurrency);
                const split = symbolpattern.split(';');
                parseOptions.nData = IntlBase.getFormatData(split[1] || '-' + split[0], true, '');
                parseOptions.pData = IntlBase.getFormatData(split[0], true, '');
            }
        }
        else {
            parseOptions.nData = extend({}, {}, getValue(parseOptions.type + 'nData', numbers));
            parseOptions.pData = extend({}, {}, getValue(parseOptions.type + 'pData', numbers));
            if (parseOptions.type === 'currency' && option.currency) {
                IntlBase.replaceBlazorCurrency([parseOptions.pData, parseOptions.nData], getValue('currencySymbol', numbers), option.currency);
            }
        }
        return (value) => {
            return this.getParsedNumber(value, parseOptions, numOptions);
        };
    }
    /**
     * Returns parsed number for the provided formatting options
     *
     * @param {string} value ?
     * @param {NumericParts} options ?
     * @param {NumericOptions} numOptions ?
     * @returns {number} ?
     */
    static getParsedNumber(value, options, numOptions) {
        let isNegative;
        let isPercent;
        let tempValue;
        let lead;
        let end;
        let ret;
        if (value.indexOf(options.infinity) !== -1) {
            return Infinity;
        }
        else {
            value = ParserBase.convertValueParts(value, options.symbolRegex, numOptions.symbolMatch);
            value = ParserBase.convertValueParts(value, numOptions.numberParseRegex, numOptions.numericPair);
            value = value.indexOf('-') !== -1 ? value.replace('-.', '-0.') : value;
            if (value.indexOf('.') === 0) {
                value = '0' + value;
            }
            const matches = value.match(parseRegex);
            if (isNullOrUndefined(matches)) {
                return NaN;
            }
            lead = matches[1];
            tempValue = matches[2];
            const exponent = matches[5];
            end = matches[6];
            isNegative = options.custom ? ((lead === options.nData.nlead) && (end === options.nData.nend)) :
                ((lead.indexOf(options.nData.nlead) !== -1) && (end.indexOf(options.nData.nend) !== -1));
            isPercent = isNegative ?
                options.nData.isPercent :
                options.pData.isPercent;
            tempValue = tempValue.replace(groupRegex, '');
            if (exponent) {
                tempValue += exponent;
            }
            ret = +tempValue;
            if (options.type === 'percent' || isPercent) {
                ret = ret / 100;
            }
            if (options.custom || options.fractionDigits) {
                ret = parseFloat(ret.toFixed(options.custom ?
                    (isNegative ? options.nData.maximumFractionDigits : options.pData.maximumFractionDigits) : options.fractionDigits));
            }
            if (options.maximumFractionDigits) {
                ret = this.convertMaxFracDigits(tempValue, options, ret, isNegative);
            }
            if (isNegative) {
                ret *= -1;
            }
            return ret;
        }
    }
    static convertMaxFracDigits(value, options, ret, isNegative) {
        const decimalSplitValue = value.split('.');
        if (decimalSplitValue[1] && decimalSplitValue[1].length > options.maximumFractionDigits) {
            ret = +(ret.toFixed(options.custom ?
                (isNegative ? options.nData.maximumFractionDigits : options.pData.maximumFractionDigits) : options.maximumFractionDigits));
        }
        return ret;
    }
}

class Observer {
    constructor(context) {
        this.ranArray = [];
        this.boundedEvents = {};
        if (isNullOrUndefined(context)) {
            return;
        }
        this.context = context;
    }
    /**
     * To attach handler for given property in current context.
     *
     * @param {string} property - specifies the name of the event.
     * @param {Function} handler - Specifies the handler function to be called while event notified.
     * @param {Object} context - Specifies the context binded to the handler.
     * @param {string} id - specifies the random generated id.
     * @returns {void}
     */
    on(property, handler, context, id) {
        if (isNullOrUndefined(handler)) {
            return;
        }
        const cntxt = context || this.context;
        if (this.notExist(property)) {
            this.boundedEvents[`${property}`] = [{ handler: handler, context: cntxt, id: id }];
            return;
        }
        if (!isNullOrUndefined(id)) {
            if (this.ranArray.indexOf(id) === -1) {
                this.ranArray.push(id);
                this.boundedEvents[`${property}`].push({ handler: handler, context: cntxt, id: id });
            }
        }
        else if (!this.isHandlerPresent(this.boundedEvents[`${property}`], handler)) {
            this.boundedEvents[`${property}`].push({ handler: handler, context: cntxt });
        }
    }
    /**
     * To remove handlers from a event attached using on() function.
     *
     * @param {string} property - specifies the name of the event.
     * @param {Function} handler - Optional argument specifies the handler function to be called while event notified.
     * @param {string} id - specifies the random generated id.
     * @returns {void} ?
     */
    off(property, handler, id) {
        if (this.notExist(property)) {
            return;
        }
        const curObject = getValue(property, this.boundedEvents);
        if (handler) {
            for (let i = 0; i < curObject.length; i++) {
                if (id) {
                    if (curObject[parseInt(i.toString(), 10)].id === id) {
                        curObject.splice(i, 1);
                        const indexLocation = this.ranArray.indexOf(id);
                        if (indexLocation !== -1) {
                            this.ranArray.splice(indexLocation, 1);
                        }
                        break;
                    }
                }
                else if (handler === curObject[parseInt(i.toString(), 10)].handler) {
                    curObject.splice(i, 1);
                    break;
                }
            }
        }
        else {
            delete this.boundedEvents[`${property}`];
        }
    }
    /**
     * To notify the handlers in the specified event.
     *
     * @param {string} property - Specifies the event to be notify.
     * @param {Object} argument - Additional parameters to pass while calling the handler.
     * @param {Function} successHandler - this function will invoke after event successfully triggered
     * @param {Function} errorHandler - this function will invoke after event if it was failure to call.
     * @returns {void} ?
     */
    notify(property, argument, successHandler, errorHandler) {
        if (this.notExist(property)) {
            if (successHandler) {
                successHandler.call(this, argument);
            }
            return;
        }
        if (argument) {
            argument.name = property;
        }
        const blazor = 'Blazor';
        const curObject = getValue(property, this.boundedEvents).slice(0);
        if (window[`${blazor}`]) {
            return this.blazorCallback(curObject, argument, successHandler, errorHandler, 0);
        }
        else {
            for (const cur of curObject) {
                cur.handler.call(cur.context, argument);
            }
            if (successHandler) {
                successHandler.call(this, argument);
            }
        }
    }
    blazorCallback(objs, argument, successHandler, errorHandler, index) {
        const isTrigger = index === objs.length - 1;
        if (index < objs.length) {
            const obj = objs[parseInt(index.toString(), 10)];
            const promise = obj.handler.call(obj.context, argument);
            if (promise && typeof promise.then === 'function') {
                if (!successHandler) {
                    return promise;
                }
                promise.then((data) => {
                    data = typeof data === 'string' && this.isJson(data) ? JSON.parse(data, this.dateReviver) : data;
                    extend(argument, argument, data, true);
                    if (successHandler && isTrigger) {
                        successHandler.call(obj.context, argument);
                    }
                    else {
                        return this.blazorCallback(objs, argument, successHandler, errorHandler, index + 1);
                    }
                }).catch((data) => {
                    if (errorHandler) {
                        errorHandler.call(obj.context, typeof data === 'string' &&
                            this.isJson(data) ? JSON.parse(data, this.dateReviver) : data);
                    }
                });
            }
            else if (successHandler && isTrigger) {
                successHandler.call(obj.context, argument);
            }
            else {
                return this.blazorCallback(objs, argument, successHandler, errorHandler, index + 1);
            }
        }
    }
    // eslint-disable-next-line
    dateReviver(key, value) {
        const dPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
        if (isBlazor && typeof value === 'string' && value.match(dPattern) !== null) {
            return (new Date(value));
        }
        return (value);
    }
    isJson(value) {
        try {
            JSON.parse(value);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    /**
     * To destroy handlers in the event
     *
     * @returns {void} ?
     */
    destroy() {
        this.boundedEvents = this.context = undefined;
    }
    /**
     * To remove internationalization events
     *
     * @returns {void} ?
     */
    offIntlEvents() {
        // eslint-disable-next-line
        const eventsArr = this.boundedEvents['notifyExternalChange'];
        if (eventsArr) {
            for (let i = 0; i < eventsArr.length; i++) {
                // eslint-disable-next-line
                const curContext = eventsArr[`${i}`].context;
                if (curContext && curContext.detectFunction && curContext.randomId && !curContext.isRendered) {
                    this.off('notifyExternalChange', curContext.detectFunction, curContext.randomId);
                    i--;
                }
            }
            if (!this.boundedEvents['notifyExternalChange'].length) {
                delete this.boundedEvents['notifyExternalChange'];
            }
        }
    }
    /**
     * Returns if the property exists.
     *
     * @param {string} prop ?
     * @returns {boolean} ?
     */
    notExist(prop) {
        // eslint-disable-next-line
        return this.boundedEvents.hasOwnProperty(prop) === false || this.boundedEvents[prop].length <= 0;
    }
    /**
     * Returns if the handler is present.
     *
     * @param {BoundOptions[]} boundedEvents ?
     * @param {Function} handler ?
     * @returns {boolean} ?
     */
    isHandlerPresent(boundedEvents, handler) {
        for (const cur of boundedEvents) {
            if (cur.handler === handler) {
                return true;
            }
        }
        return false;
    }
}

/**
 * Specifies the observer used for external change detection.
 */
const onIntlChange = new Observer();
/**
 * Specifies the default rtl status for EJ2 components.
 */
let rightToLeft = false;
/**
 * Specifies the CLDR data loaded for internationalization functionalities.
 *
 * @private
 */
const cldrData = {};
/**
 * Specifies the default culture value to be considered.
 *
 * @private
 */
let defaultCulture = 'en-US';
/**
 * Specifies default currency code to be considered
 *
 * @private
 */
let defaultCurrencyCode = 'USD';
const mapper = ['numericObject', 'dateObject'];
/**
 * Internationalization class provides support to parse and format the number and date object to the desired format.
 * ```typescript
 * // To set the culture globally
 * setCulture('en-GB');
 *
 * // To set currency code globally
 * setCurrencyCode('EUR');
 *
 * //Load cldr data
 * loadCldr(gregorainData);
 * loadCldr(timeZoneData);
 * loadCldr(numbersData);
 * loadCldr(numberSystemData);
 *
 * // To use formatter in component side
 * let Intl:Internationalization = new Internationalization();
 *
 * // Date formatting
 * let dateFormatter: Function = Intl.getDateFormat({skeleton:'long',type:'dateTime'});
 * dateFormatter(new Date('11/2/2016'));
 * dateFormatter(new Date('25/2/2030'));
 * Intl.formatDate(new Date(),{skeleton:'E'});
 *
 * //Number formatting
 * let numberFormatter: Function = Intl.getNumberFormat({skeleton:'C5'})
 * numberFormatter(24563334);
 * Intl.formatNumber(123123,{skeleton:'p2'});
 *
 * // Date parser
 * let dateParser: Function = Intl.getDateParser({skeleton:'short',type:'time'});
 * dateParser('10:30 PM');
 * Intl.parseDate('10',{skeleton:'H'});
 * ```
 */
class Internationalization {
    constructor(cultureName) {
        if (cultureName) {
            this.culture = cultureName;
        }
    }
    /**
     * Returns the format function for given options.
     *
     * @param {DateFormatOptions} options - Specifies the format options in which the format function will return.
     * @returns {Function} ?
     */
    getDateFormat(options) {
        return DateFormat.dateFormat(this.getCulture(), options || { type: 'date', skeleton: 'short' }, cldrData);
    }
    /**
     * Returns the format function for given options.
     *
     * @param {NumberFormatOptions} options - Specifies the format options in which the format function will return.
     * @returns {Function} ?
     */
    getNumberFormat(options) {
        if (options && !options.currency) {
            options.currency = defaultCurrencyCode;
        }
        if (isBlazor() && options && !options.format) {
            options.minimumFractionDigits = 0;
        }
        return NumberFormat.numberFormatter(this.getCulture(), options || {}, cldrData);
    }
    /**
     * Returns the parser function for given options.
     *
     * @param {DateFormatOptions} options - Specifies the format options in which the parser function will return.
     * @returns {Function} ?
     */
    getDateParser(options) {
        return DateParser.dateParser(this.getCulture(), options || { skeleton: 'short', type: 'date' }, cldrData);
    }
    /**
     * Returns the parser function for given options.
     *
     * @param {NumberFormatOptions} options - Specifies the format options in which the parser function will return.
     * @returns {Function} ?
     */
    getNumberParser(options) {
        if (isBlazor() && options && !options.format) {
            options.minimumFractionDigits = 0;
        }
        return NumberParser.numberParser(this.getCulture(), options || { format: 'N' }, cldrData);
    }
    /**
     * Returns the formatted string based on format options.
     *
     * @param {number} value - Specifies the number to format.
     * @param {NumberFormatOptions} option - Specifies the format options in which the number will be formatted.
     * @returns {string} ?
     */
    formatNumber(value, option) {
        return this.getNumberFormat(option)(value);
    }
    /**
     * Returns the formatted date string based on format options.
     *
     * @param {Date} value - Specifies the number to format.
     * @param {DateFormatOptions} option - Specifies the format options in which the number will be formatted.
     * @returns {string} ?
     */
    formatDate(value, option) {
        return this.getDateFormat(option)(value);
    }
    /**
     * Returns the date object for given date string and options.
     *
     * @param {string} value - Specifies the string to parse.
     * @param {DateFormatOptions} option - Specifies the parse options in which the date string will be parsed.
     * @returns {Date} ?
     */
    parseDate(value, option) {
        return this.getDateParser(option)(value);
    }
    /**
     * Returns the number object from the given string value and options.
     *
     * @param {string} value - Specifies the string to parse.
     * @param {NumberFormatOptions} option - Specifies the parse options in which the  string number  will be parsed.
     * @returns {number} ?
     */
    parseNumber(value, option) {
        return this.getNumberParser(option)(value);
    }
    /**
     * Returns Native Date Time Pattern
     *
     * @param {DateFormatOptions} option - Specifies the parse options for resultant date time pattern.
     * @param {boolean} isExcelFormat - Specifies format value to be converted to excel pattern.
     * @returns {string} ?
     * @private
     */
    getDatePattern(option, isExcelFormat) {
        return IntlBase.getActualDateTimeFormat(this.getCulture(), option, cldrData, isExcelFormat);
    }
    /**
     * Returns Native Number Pattern
     *
     * @param {NumberFormatOptions} option - Specifies the parse options for resultant number pattern.
     * @param {boolean} isExcel ?
     * @returns {string} ?
     * @private
     */
    getNumberPattern(option, isExcel) {
        return IntlBase.getActualNumberFormat(this.getCulture(), option, cldrData, isExcel);
    }
    /**
     * Returns the First Day of the Week
     *
     * @returns {number} ?
     */
    getFirstDayOfWeek() {
        return IntlBase.getWeekData(this.getCulture(), cldrData);
    }
    /**
     * Returns the culture
     *
     * @returns {string} ?
     */
    getCulture() {
        return this.culture || defaultCulture;
    }
}
/**
 * Set the default culture to all EJ2 components
 *
 * @param {string} cultureName - Specifies the culture name to be set as default culture.
 * @returns {void} ?
 */
function setCulture(cultureName) {
    defaultCulture = cultureName;
    onIntlChange.notify('notifyExternalChange', { 'locale': defaultCulture });
}
/**
 * Set the default currency code to all EJ2 components
 *
 * @param {string} currencyCode Specifies the culture name to be set as default culture.
 * @returns {void} ?
 */
function setCurrencyCode(currencyCode) {
    defaultCurrencyCode = currencyCode;
    onIntlChange.notify('notifyExternalChange', { 'currencyCode': defaultCurrencyCode });
}
/**
 * Load the CLDR data into context
 *
 * @param {Object[]} data Specifies the CLDR data's to be used for formatting and parser.
 * @returns {void} ?
 */
function loadCldr(...data) {
    for (const obj of data) {
        extend(cldrData, obj, {}, true);
    }
}
/**
 * To enable or disable RTL functionality for all components globally.
 *
 * @param {boolean} status - Optional argument Specifies the status value to enable or disable rtl option.
 * @returns {void} ?
 */
function enableRtl(status = true) {
    rightToLeft = status;
    onIntlChange.notify('notifyExternalChange', { enableRtl: rightToLeft });
}
/**
 * To get the numeric CLDR object for given culture
 *
 * @param {string} locale - Specifies the locale for which numericObject to be returned.
 * @param {string} type ?
 * @returns {Object} ?
 * @ignore
 * @private
 */
function getNumericObject(locale, type) {
    // eslint-disable-next-line
    let numObject = IntlBase.getDependables(cldrData, locale, '', true)[mapper[0]];
    // eslint-disable-next-line
    const dateObject = IntlBase.getDependables(cldrData, locale, '')[mapper[1]];
    const numSystem = getValue('defaultNumberingSystem', numObject);
    const symbPattern = isBlazor() ? getValue('numberSymbols', numObject) : getValue('symbols-numberSystem-' + numSystem, numObject);
    const pattern = IntlBase.getSymbolPattern(type || 'decimal', numSystem, numObject, false);
    return extend(symbPattern, IntlBase.getFormatData(pattern, true, '', true), { 'dateSeparator': IntlBase.getDateSeparator(dateObject) });
}
/**
 * To get the numeric CLDR  number base object for given culture
 *
 * @param {string} locale - Specifies the locale for which numericObject to be returned.
 * @param {string} currency - Specifies the currency for which numericObject to be returned.
 * @returns {string} ?
 * @ignore
 * @private
 */
function getNumberDependable(locale, currency) {
    // eslint-disable-next-line
    const numObject = IntlBase.getDependables(cldrData, locale, '', true);
    // eslint-disable-next-line
    return IntlBase.getCurrencySymbol(numObject.numericObject, currency);
}
/**
 * To get the default date CLDR object.
 *
 * @param {string} mode ?
 * @returns {Object} ?
 * @ignore
 * @private
 */
function getDefaultDateObject(mode) {
    // eslint-disable-next-line
    return IntlBase.getDependables(cldrData, '', mode, false)[mapper[1]];
}

const regExp = RegExp;
const blazorCultureFormats = {
    'en-US': {
        'd': 'M/d/y',
        'D': 'EEEE, MMMM d, y',
        'f': 'EEEE, MMMM d, y h:mm a',
        'F': 'EEEE, MMMM d, y h:mm:s a',
        'g': 'M/d/y h:mm a',
        'G': 'M/d/yyyy h:mm:ss tt',
        'm': 'MMMM d',
        'M': 'MMMM d',
        'r': 'ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'',
        'R': 'ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'',
        's': 'yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss',
        't': 'h:mm tt',
        'T': 'h:m:s tt',
        'u': 'yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'',
        'U': 'dddd, MMMM d, yyyy h:mm:ss tt',
        'y': 'MMMM yyyy',
        'Y': 'MMMM yyyy'
    }
};
/**
 * Date base common constants and function for date parser and formatter.
 */
// eslint-disable-next-line
var IntlBase;
(function (IntlBase) {
    /* eslint-disable */
    // tslint:disable-next-line:max-line-length.
    IntlBase.negativeDataRegex = /^(('[^']+'|''|[^*#@0,.E])*)(\*.)?((([#,]*[0,]*0+)(\.0*[0-9]*#*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
    IntlBase.customRegex = /^(('[^']+'|''|[^*#@0,.])*)(\*.)?((([0#,]*[0,]*[0#]*[0#\ ]*)(\.[0#]*)?)|([#,]*@+#*))(E\+?0+)?(('[^']+'|''|[^*#@0,.E])*)$/;
    IntlBase.latnParseRegex = /0|1|2|3|4|5|6|7|8|9/g;
    const fractionRegex = /[0-9]/g;
    IntlBase.defaultCurrency = '$';
    const mapper = ['infinity', 'nan', 'group', 'decimal'];
    const patternRegex = /G|M|L|H|c|'| a|yy|y|EEEE|E/g;
    const patternMatch = {
        'G': '',
        'M': 'm',
        'L': 'm',
        'H': 'h',
        'c': 'd',
        '\'': '"',
        ' a': ' AM/PM',
        'yy': 'yy',
        'y': 'yyyy',
        'EEEE': 'dddd',
        'E': 'ddd'
    };
    IntlBase.dateConverterMapper = /dddd|ddd/ig;
    const defaultFirstDay = 'sun';
    IntlBase.islamicRegex = /^islamic/;
    const firstDayMapper = {
        'sun': 0,
        'mon': 1,
        'tue': 2,
        'wed': 3,
        'thu': 4,
        'fri': 5,
        'sat': 6
    };
    IntlBase.formatRegex = new regExp("(^[ncpae]{1})([0-1]?[0-9]|20)?$", "i");
    IntlBase.currencyFormatRegex = new regExp("(^[ca]{1})([0-1]?[0-9]|20)?$", "i");
    IntlBase.curWithoutNumberRegex = /(c|a)$/ig;
    const typeMapper = {
        '$': 'isCurrency',
        '%': 'isPercent',
        '-': 'isNegative',
        0: 'nlead',
        1: 'nend'
    };
    IntlBase.dateParseRegex = /([a-z])\1*|'([^']|'')+'|''|./gi;
    IntlBase.basicPatterns = ['short', 'medium', 'long', 'full'];
    /* tslint:disable:quotemark */
    IntlBase.defaultObject = {
        'dates': {
            'calendars': {
                'gregorian': {
                    'months': {
                        'stand-alone': {
                            'abbreviated': {
                                '1': 'Jan',
                                '2': 'Feb',
                                '3': 'Mar',
                                '4': 'Apr',
                                '5': 'May',
                                '6': 'Jun',
                                '7': 'Jul',
                                '8': 'Aug',
                                '9': 'Sep',
                                '10': 'Oct',
                                '11': 'Nov',
                                '12': 'Dec'
                            },
                            'narrow': {
                                '1': 'J',
                                '2': 'F',
                                '3': 'M',
                                '4': 'A',
                                '5': 'M',
                                '6': 'J',
                                '7': 'J',
                                '8': 'A',
                                '9': 'S',
                                '10': 'O',
                                '11': 'N',
                                '12': 'D'
                            },
                            'wide': {
                                '1': 'January',
                                '2': 'February',
                                '3': 'March',
                                '4': 'April',
                                '5': 'May',
                                '6': 'June',
                                '7': 'July',
                                '8': 'August',
                                '9': 'September',
                                '10': 'October',
                                '11': 'November',
                                '12': 'December'
                            }
                        }
                    },
                    'days': {
                        'stand-alone': {
                            'abbreviated': {
                                'sun': 'Sun',
                                'mon': 'Mon',
                                'tue': 'Tue',
                                'wed': 'Wed',
                                'thu': 'Thu',
                                'fri': 'Fri',
                                'sat': 'Sat'
                            },
                            'narrow': {
                                'sun': 'S',
                                'mon': 'M',
                                'tue': 'T',
                                'wed': 'W',
                                'thu': 'T',
                                'fri': 'F',
                                'sat': 'S'
                            },
                            'short': {
                                'sun': 'Su',
                                'mon': 'Mo',
                                'tue': 'Tu',
                                'wed': 'We',
                                'thu': 'Th',
                                'fri': 'Fr',
                                'sat': 'Sa'
                            },
                            'wide': {
                                'sun': 'Sunday',
                                'mon': 'Monday',
                                'tue': 'Tuesday',
                                'wed': 'Wednesday',
                                'thu': 'Thursday',
                                'fri': 'Friday',
                                'sat': 'Saturday'
                            }
                        }
                    },
                    'dayPeriods': {
                        'format': {
                            'wide': {
                                'am': 'AM',
                                'pm': 'PM'
                            }
                        }
                    },
                    'eras': {
                        'eraNames': {
                            '0': 'Before Christ',
                            '0-alt-variant': 'Before Common Era',
                            '1': 'Anno Domini',
                            '1-alt-variant': 'Common Era'
                        },
                        'eraAbbr': {
                            '0': 'BC',
                            '0-alt-variant': 'BCE',
                            '1': 'AD',
                            '1-alt-variant': 'CE'
                        },
                        'eraNarrow': {
                            '0': 'B',
                            '0-alt-variant': 'BCE',
                            '1': 'A',
                            '1-alt-variant': 'CE'
                        }
                    },
                    'dateFormats': {
                        'full': 'EEEE, MMMM d, y',
                        'long': 'MMMM d, y',
                        'medium': 'MMM d, y',
                        'short': 'M/d/yy'
                    },
                    'timeFormats': {
                        'full': 'h:mm:ss a zzzz',
                        'long': 'h:mm:ss a z',
                        'medium': 'h:mm:ss a',
                        'short': 'h:mm a'
                    },
                    'dateTimeFormats': {
                        'full': '{1} \'at\' {0}',
                        'long': '{1} \'at\' {0}',
                        'medium': '{1}, {0}',
                        'short': '{1}, {0}',
                        'availableFormats': {
                            'd': 'd',
                            'E': 'ccc',
                            'Ed': 'd E',
                            'Ehm': 'E h:mm a',
                            'EHm': 'E HH:mm',
                            'Ehms': 'E h:mm:ss a',
                            'EHms': 'E HH:mm:ss',
                            'Gy': 'y G',
                            'GyMMM': 'MMM y G',
                            'GyMMMd': 'MMM d, y G',
                            'GyMMMEd': 'E, MMM d, y G',
                            'h': 'h a',
                            'H': 'HH',
                            'hm': 'h:mm a',
                            'Hm': 'HH:mm',
                            'hms': 'h:mm:ss a',
                            'Hms': 'HH:mm:ss',
                            'hmsv': 'h:mm:ss a v',
                            'Hmsv': 'HH:mm:ss v',
                            'hmv': 'h:mm a v',
                            'Hmv': 'HH:mm v',
                            'M': 'L',
                            'Md': 'M/d',
                            'MEd': 'E, M/d',
                            'MMM': 'LLL',
                            'MMMd': 'MMM d',
                            'MMMEd': 'E, MMM d',
                            'MMMMd': 'MMMM d',
                            'ms': 'mm:ss',
                            'y': 'y',
                            'yM': 'M/y',
                            'yMd': 'M/d/y',
                            'yMEd': 'E, M/d/y',
                            'yMMM': 'MMM y',
                            'yMMMd': 'MMM d, y',
                            'yMMMEd': 'E, MMM d, y',
                            'yMMMM': 'MMMM y'
                        }
                    }
                },
                'islamic': {
                    'months': {
                        'stand-alone': {
                            'abbreviated': {
                                '1': 'Muh.',
                                '2': 'Saf.',
                                '3': 'Rab. I',
                                '4': 'Rab. II',
                                '5': 'Jum. I',
                                '6': 'Jum. II',
                                '7': 'Raj.',
                                '8': 'Sha.',
                                '9': 'Ram.',
                                '10': 'Shaw.',
                                '11': 'Dhuʻl-Q.',
                                '12': 'Dhuʻl-H.'
                            },
                            'narrow': {
                                '1': '1',
                                '2': '2',
                                '3': '3',
                                '4': '4',
                                '5': '5',
                                '6': '6',
                                '7': '7',
                                '8': '8',
                                '9': '9',
                                '10': '10',
                                '11': '11',
                                '12': '12'
                            },
                            'wide': {
                                '1': 'Muharram',
                                '2': 'Safar',
                                '3': 'Rabiʻ I',
                                '4': 'Rabiʻ II',
                                '5': 'Jumada I',
                                '6': 'Jumada II',
                                '7': 'Rajab',
                                '8': 'Shaʻban',
                                '9': 'Ramadan',
                                '10': 'Shawwal',
                                '11': 'Dhuʻl-Qiʻdah',
                                '12': 'Dhuʻl-Hijjah'
                            }
                        }
                    },
                    'days': {
                        'stand-alone': {
                            'abbreviated': {
                                'sun': 'Sun',
                                'mon': 'Mon',
                                'tue': 'Tue',
                                'wed': 'Wed',
                                'thu': 'Thu',
                                'fri': 'Fri',
                                'sat': 'Sat'
                            },
                            'narrow': {
                                'sun': 'S',
                                'mon': 'M',
                                'tue': 'T',
                                'wed': 'W',
                                'thu': 'T',
                                'fri': 'F',
                                'sat': 'S'
                            },
                            'short': {
                                'sun': 'Su',
                                'mon': 'Mo',
                                'tue': 'Tu',
                                'wed': 'We',
                                'thu': 'Th',
                                'fri': 'Fr',
                                'sat': 'Sa'
                            },
                            'wide': {
                                'sun': 'Sunday',
                                'mon': 'Monday',
                                'tue': 'Tuesday',
                                'wed': 'Wednesday',
                                'thu': 'Thursday',
                                'fri': 'Friday',
                                'sat': 'Saturday'
                            }
                        }
                    },
                    'dayPeriods': {
                        'format': {
                            'wide': {
                                'am': 'AM',
                                'pm': 'PM'
                            }
                        }
                    },
                    'eras': {
                        'eraNames': {
                            '0': 'AH'
                        },
                        'eraAbbr': {
                            '0': 'AH'
                        },
                        'eraNarrow': {
                            '0': 'AH'
                        }
                    },
                    'dateFormats': {
                        'full': 'EEEE, MMMM d, y G',
                        'long': 'MMMM d, y G',
                        'medium': 'MMM d, y G',
                        'short': 'M/d/y GGGGG'
                    },
                    'timeFormats': {
                        'full': 'h:mm:ss a zzzz',
                        'long': 'h:mm:ss a z',
                        'medium': 'h:mm:ss a',
                        'short': 'h:mm a'
                    },
                    'dateTimeFormats': {
                        'full': '{1} \'at\' {0}',
                        'long': '{1} \'at\' {0}',
                        'medium': '{1}, {0}',
                        'short': '{1}, {0}',
                        'availableFormats': {
                            'd': 'd',
                            'E': 'ccc',
                            'Ed': 'd E',
                            'Ehm': 'E h:mm a',
                            'EHm': 'E HH:mm',
                            'Ehms': 'E h:mm:ss a',
                            'EHms': 'E HH:mm:ss',
                            'Gy': 'y G',
                            'GyMMM': 'MMM y G',
                            'GyMMMd': 'MMM d, y G',
                            'GyMMMEd': 'E, MMM d, y G',
                            'h': 'h a',
                            'H': 'HH',
                            'hm': 'h:mm a',
                            'Hm': 'HH:mm',
                            'hms': 'h:mm:ss a',
                            'Hms': 'HH:mm:ss',
                            'M': 'L',
                            'Md': 'M/d',
                            'MEd': 'E, M/d',
                            'MMM': 'LLL',
                            'MMMd': 'MMM d',
                            'MMMEd': 'E, MMM d',
                            'MMMMd': 'MMMM d',
                            'ms': 'mm:ss',
                            'y': 'y G',
                            'yyyy': 'y G',
                            'yyyyM': 'M/y GGGGG',
                            'yyyyMd': 'M/d/y GGGGG',
                            'yyyyMEd': 'E, M/d/y GGGGG',
                            'yyyyMMM': 'MMM y G',
                            'yyyyMMMd': 'MMM d, y G',
                            'yyyyMMMEd': 'E, MMM d, y G',
                            'yyyyMMMM': 'MMMM y G',
                            'yyyyQQQ': 'QQQ y G',
                            'yyyyQQQQ': 'QQQQ y G'
                        }
                    }
                }
            },
            'timeZoneNames': {
                'hourFormat': '+HH:mm;-HH:mm',
                'gmtFormat': 'GMT{0}',
                'gmtZeroFormat': 'GMT'
            }
        },
        'numbers': {
            'currencies': {
                'USD': {
                    'displayName': 'US Dollar',
                    'symbol': '$',
                    'symbol-alt-narrow': '$'
                },
                'EUR': {
                    'displayName': 'Euro',
                    'symbol': '€',
                    'symbol-alt-narrow': '€'
                },
                'GBP': {
                    'displayName': 'British Pound',
                    'symbol-alt-narrow': '£'
                }
            },
            'defaultNumberingSystem': 'latn',
            'minimumGroupingDigits': '1',
            'symbols-numberSystem-latn': {
                'decimal': '.',
                'group': ',',
                'list': ';',
                'percentSign': '%',
                'plusSign': '+',
                'minusSign': '-',
                'exponential': 'E',
                'superscriptingExponent': '×',
                'perMille': '‰',
                'infinity': '∞',
                'nan': 'NaN',
                'timeSeparator': ':'
            },
            'decimalFormats-numberSystem-latn': {
                'standard': '#,##0.###'
            },
            'percentFormats-numberSystem-latn': {
                'standard': '#,##0%'
            },
            'currencyFormats-numberSystem-latn': {
                'standard': '¤#,##0.00',
                'accounting': '¤#,##0.00;(¤#,##0.00)'
            },
            'scientificFormats-numberSystem-latn': {
                'standard': '#E0'
            }
        }
    };
    IntlBase.blazorDefaultObject = {
        'numbers': {
            'mapper': {
                '0': '0',
                '1': '1',
                '2': '2',
                '3': '3',
                '4': '4',
                '5': '5',
                '6': '6',
                '7': '7',
                '8': '8',
                '9': '9'
            },
            'mapperDigits': '0123456789',
            'numberSymbols': {
                'decimal': '.',
                'group': ',',
                'plusSign': '+',
                'minusSign': '-',
                'percentSign': '%',
                'nan': 'NaN',
                'timeSeparator': ':',
                'infinity': '∞'
            },
            'timeSeparator': ':',
            'currencySymbol': '$',
            'currencypData': {
                'nlead': '$',
                'nend': '',
                'groupSeparator': ',',
                'groupData': {
                    'primary': 3
                },
                'maximumFraction': 2,
                'minimumFraction': 2
            },
            'percentpData': {
                'nlead': '',
                'nend': '%',
                'groupSeparator': ',',
                'groupData': {
                    'primary': 3
                },
                'maximumFraction': 2,
                'minimumFraction': 2
            },
            'percentnData': {
                'nlead': '-',
                'nend': '%',
                'groupSeparator': ',',
                'groupData': {
                    'primary': 3
                },
                'maximumFraction': 2,
                'minimumFraction': 2
            },
            'currencynData': {
                'nlead': '($',
                'nend': ')',
                'groupSeparator': ',',
                'groupData': {
                    'primary': 3
                },
                'maximumFraction': 2,
                'minimumFraction': 2
            },
            'decimalnData': {
                'nlead': '-',
                'nend': '',
                'groupData': {
                    'primary': 3
                },
                'maximumFraction': 2,
                'minimumFraction': 2
            },
            'decimalpData': {
                'nlead': '',
                'nend': '',
                'groupData': {
                    'primary': 3
                },
                'maximumFraction': 2,
                'minimumFraction': 2
            }
        },
        'dates': {
            'dayPeriods': {
                'am': 'AM',
                'pm': 'PM'
            },
            'dateSeperator': '/',
            'days': {
                'abbreviated': {
                    'sun': 'Sun',
                    'mon': 'Mon',
                    'tue': 'Tue',
                    'wed': 'Wed',
                    'thu': 'Thu',
                    'fri': 'Fri',
                    'sat': 'Sat'
                },
                'short': {
                    'sun': 'Su',
                    'mon': 'Mo',
                    'tue': 'Tu',
                    'wed': 'We',
                    'thu': 'Th',
                    'fri': 'Fr',
                    'sat': 'Sa'
                },
                'wide': {
                    'sun': 'Sunday',
                    'mon': 'Monday',
                    'tue': 'Tuesday',
                    'wed': 'Wednesday',
                    'thu': 'Thursday',
                    'fri': 'Friday',
                    'sat': 'Saturday'
                }
            },
            'months': {
                'abbreviated': {
                    '1': 'Jan',
                    '2': 'Feb',
                    '3': 'Mar',
                    '4': 'Apr',
                    '5': 'May',
                    '6': 'Jun',
                    '7': 'Jul',
                    '8': 'Aug',
                    '9': 'Sep',
                    '10': 'Oct',
                    '11': 'Nov',
                    '12': 'Dec'
                },
                'wide': {
                    '1': 'January',
                    '2': 'February',
                    '3': 'March',
                    '4': 'April',
                    '5': 'May',
                    '6': 'June',
                    '7': 'July',
                    '8': 'August',
                    '9': 'September',
                    '10': 'October',
                    '11': 'November',
                    '12': 'December'
                }
            },
            'eras': {
                '1': 'AD'
            }
        }
    };
    /* tslint:enable:quotemark */
    IntlBase.monthIndex = {
        3: 'abbreviated',
        4: 'wide',
        5: 'narrow',
        1: 'abbreviated'
    };
    /**
     *
     */
    IntlBase.month = 'months';
    IntlBase.days = 'days';
    /**
     * Default numerber Object
     */
    IntlBase.patternMatcher = {
        C: 'currency',
        P: 'percent',
        N: 'decimal',
        A: 'currency',
        E: 'scientific'
    };
    /**
     * Returns the resultant pattern based on the skeleton, dateObject and the type provided
     *
     * @private
     * @param {string} skeleton ?
     * @param {Object} dateObject ?
     * @param {string} type ?
     * @param {boolean} isIslamic ?
     * @param {string} blazorCulture ?
     * @returns {string} ?
     */
    function getResultantPattern(skeleton, dateObject, type, isIslamic, blazorCulture) {
        let resPattern;
        const iType = type || 'date';
        if (blazorCulture) {
            resPattern = compareBlazorDateFormats({ skeleton: skeleton }, blazorCulture).format ||
                compareBlazorDateFormats({ skeleton: 'd' }, 'en-US').format;
        }
        else {
            if (IntlBase.basicPatterns.indexOf(skeleton) !== -1) {
                resPattern = getValue(iType + 'Formats.' + skeleton, dateObject);
                if (iType === 'dateTime') {
                    const dPattern = getValue('dateFormats.' + skeleton, dateObject);
                    const tPattern = getValue('timeFormats.' + skeleton, dateObject);
                    resPattern = resPattern.replace('{1}', dPattern).replace('{0}', tPattern);
                }
            }
            else {
                resPattern = getValue('dateTimeFormats.availableFormats.' + skeleton, dateObject);
            }
            if (isUndefined(resPattern) && skeleton === 'yMd') {
                resPattern = 'M/d/y';
            }
        }
        return resPattern;
    }
    IntlBase.getResultantPattern = getResultantPattern;
    /**
     * Returns the dependable object for provided cldr data and culture
     *
     * @private
     * @param {Object} cldr ?
     * @param {string} culture ?
     * @param {string} mode ?
     * @param {boolean} isNumber ?
     * @returns {any} ?
     */
    function getDependables(cldr, culture, mode, isNumber) {
        const ret = {};
        const calendartype = mode || 'gregorian';
        ret.parserObject = ParserBase.getMainObject(cldr, culture) || (isBlazor() ? IntlBase.blazorDefaultObject : IntlBase.defaultObject);
        if (isNumber) {
            ret.numericObject = getValue('numbers', ret.parserObject);
        }
        else {
            const dateString = isBlazor() ? 'dates' : ('dates.calendars.' + calendartype);
            ret.dateObject = getValue(dateString, ret.parserObject);
        }
        return ret;
    }
    IntlBase.getDependables = getDependables;
    /**
     * Returns the symbol pattern for provided parameters
     *
     * @private
     * @param {string} type ?
     * @param {string} numSystem ?
     * @param {Object} obj ?
     * @param {boolean} isAccount ?
     * @returns {string} ?
     */
    function getSymbolPattern(type, numSystem, obj, isAccount) {
        return getValue(type + 'Formats-numberSystem-' +
            numSystem + (isAccount ? '.accounting' : '.standard'), obj) || (isAccount ? getValue(type + 'Formats-numberSystem-' +
            numSystem + '.standard', obj) : '');
    }
    IntlBase.getSymbolPattern = getSymbolPattern;
    /**
     *
     * @param {string} format ?
     * @returns {string} ?
     */
    function ConvertDateToWeekFormat(format) {
        const convertMapper = format.match(IntlBase.dateConverterMapper);
        if (convertMapper && isBlazor()) {
            const tempString = convertMapper[0].length === 3 ? 'EEE' : 'EEEE';
            return format.replace(IntlBase.dateConverterMapper, tempString);
        }
        return format;
    }
    IntlBase.ConvertDateToWeekFormat = ConvertDateToWeekFormat;
    /**
     *
     * @param {DateFormatOptions} formatOptions ?
     * @param {string} culture ?
     * @returns {DateFormatOptions} ?
     */
    function compareBlazorDateFormats(formatOptions, culture) {
        const format = formatOptions.format || formatOptions.skeleton;
        let curFormatMapper = getValue((culture || 'en-US') + '.' + format, blazorCultureFormats);
        if (!curFormatMapper) {
            curFormatMapper = getValue('en-US.' + format, blazorCultureFormats);
        }
        if (curFormatMapper) {
            curFormatMapper = ConvertDateToWeekFormat(curFormatMapper);
            formatOptions.format = curFormatMapper.replace(/tt/, 'a');
        }
        return formatOptions;
    }
    IntlBase.compareBlazorDateFormats = compareBlazorDateFormats;
    /**
     * Returns proper numeric skeleton
     *
     * @private
     * @param {string} skeleton ?
     * @returns {any} ?
     */
    function getProperNumericSkeleton(skeleton) {
        const matches = skeleton.match(IntlBase.formatRegex);
        const ret = {};
        const pattern = matches[1].toUpperCase();
        ret.isAccount = (pattern === 'A');
        ret.type = IntlBase.patternMatcher[pattern];
        if (skeleton.length > 1) {
            ret.fractionDigits = parseInt(matches[2], 10);
        }
        return ret;
    }
    IntlBase.getProperNumericSkeleton = getProperNumericSkeleton;
    /**
     * Returns format data for number formatting like minimum fraction, maximum fraction, etc..,
     *
     * @private
     * @param {string} pattern ?
     * @param {boolean} needFraction ?
     * @param {string} cSymbol ?
     * @param {boolean} fractionOnly ?
     * @returns {any} ?
     */
    function getFormatData(pattern, needFraction, cSymbol, fractionOnly) {
        const nData = fractionOnly ? {} : { nlead: '', nend: '' };
        const match = pattern.match(IntlBase.customRegex);
        if (match) {
            if (!fractionOnly) {
                nData.nlead = changeCurrencySymbol(match[1], cSymbol);
                nData.nend = changeCurrencySymbol(match[10], cSymbol);
                nData.groupPattern = match[4];
            }
            const fraction = match[7];
            if (fraction && needFraction) {
                const fmatch = fraction.match(fractionRegex);
                if (!isNullOrUndefined(fmatch)) {
                    nData.minimumFraction = fmatch.length;
                }
                else {
                    nData.minimumFraction = 0;
                }
                nData.maximumFraction = fraction.length - 1;
            }
        }
        return nData;
    }
    IntlBase.getFormatData = getFormatData;
    /**
     * Changes currency symbol
     *
     * @private
     * @param {string} val ?
     * @param {string} sym ?
     * @returns {string} ?
     */
    function changeCurrencySymbol(val, sym) {
        if (val) {
            val = val.replace(IntlBase.defaultCurrency, sym);
            return (sym === '') ? val.trim() : val;
        }
        return '';
    }
    IntlBase.changeCurrencySymbol = changeCurrencySymbol;
    /**
     * Returns currency symbol based on currency code ?
     *
     * @private
     * @param {Object} numericObject ?
     * @param {string} currencyCode ?
     * @param {string} altSymbol ?
     * @returns {string} ?
     */
    function getCurrencySymbol(numericObject, currencyCode, altSymbol) {
        const symbol = altSymbol ? ('.' + altSymbol) : '.symbol';
        const getCurrency = getValue('currencies.' + currencyCode + symbol, numericObject) ||
            getValue('currencies.' + currencyCode + '.symbol-alt-narrow', numericObject) || '$';
        return getCurrency;
    }
    IntlBase.getCurrencySymbol = getCurrencySymbol;
    /**
     * Returns formatting options for custom number format
     *
     * @private
     * @param {string} format ?
     * @param {CommonOptions} dOptions ?
     * @param {any} obj ?
     * @returns {any} ?
     */
    function customFormat(format, dOptions, obj) {
        const options = {};
        const formatSplit = format.split(';');
        const data = ['pData', 'nData', 'zeroData'];
        for (let i = 0; i < formatSplit.length; i++) {
            options[data[i]] = customNumberFormat(formatSplit[i], dOptions, obj);
        }
        if (isNullOrUndefined(options.nData)) {
            options.nData = extend({}, options.pData);
            options.nData.nlead = isNullOrUndefined(dOptions) ? '-' + options.nData.nlead : dOptions.minusSymbol + options.nData.nlead;
        }
        return options;
    }
    IntlBase.customFormat = customFormat;
    /**
     * Returns custom formatting options
     *
     * @private
     * @param {string} format ?
     * @param {CommonOptions} dOptions ?
     * @param {Object} numObject ?
     * @returns {any} ?
     */
    function customNumberFormat(format, dOptions, numObject) {
        const cOptions = { type: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 };
        const pattern = format.match(IntlBase.customRegex);
        if (isNullOrUndefined(pattern) || (pattern[5] === '' && format !== 'N/A')) {
            cOptions.type = undefined;
            return cOptions;
        }
        cOptions.nlead = pattern[1];
        cOptions.nend = pattern[10];
        let integerPart = pattern[6];
        const spaceCapture = integerPart.match(/\ $/g) ? true : false;
        const spaceGrouping = integerPart.replace(/\ $/g, '').indexOf(' ') !== -1;
        cOptions.useGrouping = integerPart.indexOf(',') !== -1 || spaceGrouping;
        integerPart = integerPart.replace(/,/g, '');
        const fractionPart = pattern[7];
        if (integerPart.indexOf('0') !== -1) {
            cOptions.minimumIntegerDigits = integerPart.length - integerPart.indexOf('0');
        }
        if (!isNullOrUndefined(fractionPart)) {
            cOptions.minimumFractionDigits = fractionPart.lastIndexOf('0');
            cOptions.maximumFractionDigits = fractionPart.lastIndexOf('#');
            if (cOptions.minimumFractionDigits === -1) {
                cOptions.minimumFractionDigits = 0;
            }
            if (cOptions.maximumFractionDigits === -1 || cOptions.maximumFractionDigits < cOptions.minimumFractionDigits) {
                cOptions.maximumFractionDigits = cOptions.minimumFractionDigits;
            }
        }
        if (!isNullOrUndefined(dOptions)) {
            dOptions.isCustomFormat = true;
            extend(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '$', dOptions.currencySymbol));
            if (!cOptions.isCurrency) {
                extend(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '%', dOptions.percentSymbol));
            }
        }
        else {
            extend(cOptions, isCurrencyPercent([cOptions.nlead, cOptions.nend], '%', '%'));
        }
        if (!isNullOrUndefined(numObject)) {
            const symbolPattern = getSymbolPattern(cOptions.type, dOptions.numberMapper.numberSystem, numObject, false);
            if (cOptions.useGrouping) {
                cOptions.groupSeparator = spaceGrouping ? ' ' : dOptions.numberMapper.numberSymbols[mapper[2]];
                cOptions.groupData = NumberFormat.getGroupingDetails(symbolPattern.split(';')[0]);
            }
            cOptions.nlead = cOptions.nlead.replace(/'/g, '');
            cOptions.nend = spaceCapture ? ' ' + cOptions.nend.replace(/'/g, '') : cOptions.nend.replace(/'/g, '');
        }
        return cOptions;
    }
    IntlBase.customNumberFormat = customNumberFormat;
    /**
     * Returns formatting options for currency or percent type
     *
     * @private
     * @param {string[]} parts ?
     * @param {string} actual ?
     * @param {string} symbol ?
     * @returns {any} ?
     */
    function isCurrencyPercent(parts, actual, symbol) {
        const options = { nlead: parts[0], nend: parts[1] };
        for (let i = 0; i < 2; i++) {
            const part = parts[parseInt(i.toString(), 10)];
            const loc = part.indexOf(actual);
            if ((loc !== -1) && ((loc < part.indexOf('\'')) || (loc > part.lastIndexOf('\'')))) {
                options[typeMapper[i]] = part.substr(0, loc) + symbol + part.substr(loc + 1);
                options[typeMapper[actual]] = true;
                options.type = options.isCurrency ? 'currency' : 'percent';
                break;
            }
        }
        return options;
    }
    IntlBase.isCurrencyPercent = isCurrencyPercent;
    /**
     * Returns culture based date separator
     *
     * @private
     * @param {Object} dateObj ?
     * @returns {string} ?
     */
    function getDateSeparator(dateObj) {
        const value = (getValue('dateFormats.short', dateObj) || '').match(/[d‏M‏]([^d‏M])[d‏M‏]/i);
        return value ? value[1] : '/';
    }
    IntlBase.getDateSeparator = getDateSeparator;
    /**
     * Returns Native Date Time pattern
     *
     * @private
     * @param {string} culture ?
     * @param {DateFormatOptions} options ?
     * @param {Object} cldr ?
     * @param {boolean} isExcelFormat ?
     * @returns {string} ?
     */
    function getActualDateTimeFormat(culture, options, cldr, isExcelFormat) {
        const dependable = getDependables(cldr, culture, options.calendar);
        if (isBlazor()) {
            options = compareBlazorDateFormats(options, culture);
        }
        let actualPattern = options.format || getResultantPattern(options.skeleton, dependable.dateObject, options.type);
        if (isExcelFormat) {
            actualPattern = actualPattern.replace(patternRegex, (pattern) => {
                return patternMatch[pattern];
            });
            if (actualPattern.indexOf('z') !== -1) {
                const tLength = actualPattern.match(/z/g).length;
                let timeZonePattern;
                const options = { 'timeZone': {} };
                options.numMapper = ParserBase.getNumberMapper(dependable.parserObject, ParserBase.getNumberingSystem(cldr));
                options.timeZone = getValue('dates.timeZoneNames', dependable.parserObject);
                const value = new Date();
                const timezone = value.getTimezoneOffset();
                let pattern = (tLength < 4) ? '+H;-H' : options.timeZone.hourFormat;
                pattern = pattern.replace(/:/g, options.numMapper.timeSeparator);
                if (timezone === 0) {
                    timeZonePattern = options.timeZone.gmtZeroFormat;
                }
                else {
                    timeZonePattern = DateFormat.getTimeZoneValue(timezone, pattern);
                    timeZonePattern = options.timeZone.gmtFormat.replace(/\{0\}/, timeZonePattern);
                }
                actualPattern = actualPattern.replace(/[z]+/, '"' + timeZonePattern + '"');
            }
            actualPattern = actualPattern.replace(/ $/, '');
        }
        return actualPattern;
    }
    IntlBase.getActualDateTimeFormat = getActualDateTimeFormat;
    /**
     *
     * @param {string} actual ?
     * @param {any} option ?
     * @returns {any} ?
     */
    function processSymbol(actual, option) {
        if (actual.indexOf(',') !== -1) {
            let split = actual.split(',');
            actual = (split[0] + getValue('numberMapper.numberSymbols.group', option) +
                split[1].replace('.', getValue('numberMapper.numberSymbols.decimal', option)));
        }
        else {
            actual = actual.replace('.', getValue('numberMapper.numberSymbols.decimal', option));
        }
        return actual;
    }
    /**
     * Returns Native Number pattern
     *
     * @private
     * @param {string} culture ?
     * @param {NumberFormatOptions} options ?
     * @param {Object} cldr ?
     * @param {boolean} isExcel ?
     * @returns {string} ?
     */
    function getActualNumberFormat(culture, options, cldr, isExcel) {
        const dependable = getDependables(cldr, culture, '', true);
        const parseOptions = { custom: true };
        const numrericObject = dependable.numericObject;
        let minFrac;
        const curObj = {};
        const curMatch = (options.format || '').match(IntlBase.currencyFormatRegex);
        const type = IntlBase.formatRegex.test(options.format) ? getProperNumericSkeleton(options.format || 'N') : {};
        const dOptions = {};
        if (curMatch) {
            dOptions.numberMapper = isBlazor() ?
                extend({}, dependable.numericObject) :
                ParserBase.getNumberMapper(dependable.parserObject, ParserBase.getNumberingSystem(cldr), true);
            const curCode = isBlazor() ? getValue('currencySymbol', dependable.numericObject) :
                getCurrencySymbol(dependable.numericObject, options.currency || defaultCurrencyCode, options.altSymbol);
            let symbolPattern = getSymbolPattern('currency', dOptions.numberMapper.numberSystem, dependable.numericObject, (/a/i).test(options.format));
            symbolPattern = symbolPattern.replace(/\u00A4/g, curCode);
            const split = symbolPattern.split(';');
            curObj.hasNegativePattern = isBlazor() ? true : (split.length > 1);
            curObj.nData = isBlazor() ? getValue(type.type + 'nData', numrericObject) :
                getFormatData(split[1] || '-' + split[0], true, curCode);
            curObj.pData = isBlazor() ? getValue(type.type + 'pData', numrericObject) :
                getFormatData(split[0], false, curCode);
            if (!curMatch[2] && !options.minimumFractionDigits && !options.maximumFractionDigits) {
                minFrac = getFormatData(symbolPattern.split(';')[0], true, '', true).minimumFraction;
            }
        }
        let actualPattern;
        if ((IntlBase.formatRegex.test(options.format)) || !(options.format)) {
            extend(parseOptions, getProperNumericSkeleton(options.format || 'N'));
            parseOptions.custom = false;
            actualPattern = '###0';
            if (parseOptions.fractionDigits || options.minimumFractionDigits || options.maximumFractionDigits || minFrac) {
                const defaultMinimum = 0;
                if (parseOptions.fractionDigits) {
                    options.minimumFractionDigits = options.maximumFractionDigits = parseOptions.fractionDigits;
                }
                actualPattern = fractionDigitsPattern(actualPattern, minFrac || parseOptions.fractionDigits ||
                    options.minimumFractionDigits || defaultMinimum, options.maximumFractionDigits || defaultMinimum);
            }
            if (options.minimumIntegerDigits) {
                actualPattern = minimumIntegerPattern(actualPattern, options.minimumIntegerDigits);
            }
            if (options.useGrouping) {
                actualPattern = groupingPattern(actualPattern);
            }
            if (parseOptions.type === 'currency' || (parseOptions.type && isBlazor())) {
                if (isBlazor() && parseOptions.type !== 'currency') {
                    curObj.pData = getValue(parseOptions.type + 'pData', numrericObject);
                    curObj.nData = getValue(parseOptions.type + 'nData', numrericObject);
                }
                const cPattern = actualPattern;
                actualPattern = curObj.pData.nlead + cPattern + curObj.pData.nend;
                if (curObj.hasNegativePattern || isBlazor()) {
                    actualPattern += ';' + curObj.nData.nlead + cPattern + curObj.nData.nend;
                }
            }
            if (parseOptions.type === 'percent' && !isBlazor()) {
                actualPattern += ' %';
            }
        }
        else {
            actualPattern = options.format.replace(/'/g, '"');
        }
        if (Object.keys(dOptions).length > 0) {
            actualPattern = !isExcel ? processSymbol(actualPattern, dOptions) : actualPattern;
        }
        return actualPattern;
    }
    IntlBase.getActualNumberFormat = getActualNumberFormat;
    /**
     *
     * @param {string} pattern ?
     * @param {number} minDigits ?
     * @param {number} maxDigits ?
     * @returns {string} ?
     */
    function fractionDigitsPattern(pattern, minDigits, maxDigits) {
        pattern += '.';
        for (let a = 0; a < minDigits; a++) {
            pattern += '0';
        }
        if (minDigits < maxDigits) {
            const diff = maxDigits - minDigits;
            for (let b = 0; b < diff; b++) {
                pattern += '#';
            }
        }
        return pattern;
    }
    IntlBase.fractionDigitsPattern = fractionDigitsPattern;
    /**
     *
     * @param {string} pattern ?
     * @param {number} digits ?
     * @returns {string} ?
     */
    function minimumIntegerPattern(pattern, digits) {
        const temp = pattern.split('.');
        let integer = '';
        for (let x = 0; x < digits; x++) {
            integer += '0';
        }
        return temp[1] ? (integer + '.' + temp[1]) : integer;
    }
    IntlBase.minimumIntegerPattern = minimumIntegerPattern;
    /**
     *
     * @param {string} pattern ?
     * @returns {string} ?
     */
    function groupingPattern(pattern) {
        const temp = pattern.split('.');
        let integer = temp[0];
        const no = 3 - integer.length % 3;
        const hash = (no && no === 1) ? '#' : (no === 2 ? '##' : '');
        integer = hash + integer;
        pattern = '';
        for (let x = integer.length - 1; x > 0; x = x - 3) {
            pattern = ',' + integer[x - 2] + integer[x - 1] + integer[parseInt(x.toString(), 10)] + pattern;
        }
        pattern = pattern.slice(1);
        return temp[1] ? (pattern + '.' + temp[1]) : pattern;
    }
    IntlBase.groupingPattern = groupingPattern;
    /**
     *
     * @param {string} culture ?
     * @param {Object} cldr ?
     * @returns {number} ?
     */
    function getWeekData(culture, cldr) {
        let firstDay = defaultFirstDay;
        const mapper = getValue('supplemental.weekData.firstDay', cldr);
        let iCulture = culture;
        if ((/en-/).test(iCulture)) {
            iCulture = iCulture.slice(3);
        }
        iCulture = iCulture.slice(0, 2).toUpperCase() + iCulture.substr(2);
        if (mapper) {
            firstDay = mapper[`${iCulture}`] || mapper[iCulture.slice(0, 2)] || defaultFirstDay;
        }
        return firstDayMapper[`${firstDay}`];
    }
    IntlBase.getWeekData = getWeekData;
    /**
     * @private
     * @param {any} pData ?
     * @param {string} aCurrency ?
     * @param {string} rCurrency ?
     * @returns {void} ?
     */
    function replaceBlazorCurrency(pData, aCurrency, rCurrency) {
        const iCurrency = getBlazorCurrencySymbol(rCurrency);
        if (aCurrency !== iCurrency) {
            for (const data of pData) {
                data.nend = data.nend.replace(aCurrency, iCurrency);
                data.nlead = data.nlead.replace(aCurrency, iCurrency);
            }
        }
    }
    IntlBase.replaceBlazorCurrency = replaceBlazorCurrency;
    /**
     * @private
     * @param {Date} date ?
     * @returns {number} ?
     */
    function getWeekOfYear(date) {
        const newYear = new Date(date.getFullYear(), 0, 1);
        let day = newYear.getDay();
        let weeknum;
        day = (day >= 0 ? day : day + 7);
        const daynum = Math.floor((date.getTime() - newYear.getTime() -
            (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
        if (day < 4) {
            weeknum = Math.floor((daynum + day - 1) / 7) + 1;
            if (weeknum > 52) {
                const nYear = new Date(date.getFullYear() + 1, 0, 1);
                let nday = nYear.getDay();
                nday = nday >= 0 ? nday : nday + 7;
                weeknum = nday < 4 ? 1 : 53;
            }
        }
        else {
            weeknum = Math.floor((daynum + day - 1) / 7);
        }
        return weeknum;
    }
    IntlBase.getWeekOfYear = getWeekOfYear;
})(IntlBase || (IntlBase = {}));

const headerRegex = /^(.*?):[ \t]*([^\r\n]*)$/gm;
const defaultType = 'GET';
/**
 * Ajax class provides ability to make asynchronous HTTP request to the server
 * ```typescript
 *   var ajax = new Ajax("index.html", "GET", true);
 *   ajax.send().then(
 *               function (value) {
 *                   console.log(value);
 *               },
 *               function (reason) {
 *                   console.log(reason);
 *               });
 * ```
 */
class Ajax {
    /**
     * Constructor for Ajax class
     *
     * @param  {string|Object} options ?
     * @param  {string} type ?
     * @param  {boolean} async ?
     * @returns defaultType any
     */
    constructor(options, type, async, contentType) {
        /**
         * A boolean value indicating whether the request should be sent asynchronous or not.
         *
         * @default true
         */
        this.mode = true;
        /**
         * A boolean value indicating whether to ignore the promise reject.
         *
         * @private
         * @default true
         */
        this.emitError = true;
        this.options = {};
        if (typeof options === 'string') {
            this.url = options;
            this.type = type ? type.toUpperCase() : defaultType;
            this.mode = !isNullOrUndefined(async) ? async : true;
        }
        else if (typeof options === 'object') {
            this.options = options;
            merge(this, this.options);
        }
        this.type = this.type ? this.type.toUpperCase() : defaultType;
        this.contentType = (this.contentType !== undefined) ? this.contentType : contentType;
    }
    /**
     *
     * Send the request to server.
     *
     * @param {any} data - To send the user data
     * @return {Promise} ?
     */
    send(data) {
        this.data = isNullOrUndefined(data) ? this.data : data;
        const eventArgs = {
            cancel: false,
            httpRequest: null
        };
        const promise = new Promise((resolve, reject) => {
            this.httpRequest = new XMLHttpRequest();
            this.httpRequest.onreadystatechange = () => { this.stateChange(resolve, reject); };
            if (!isNullOrUndefined(this.onLoad)) {
                this.httpRequest.onload = this.onLoad;
            }
            if (!isNullOrUndefined(this.onProgress)) {
                this.httpRequest.onprogress = this.onProgress;
            }
            /* istanbul ignore next */
            if (!isNullOrUndefined(this.onAbort)) {
                this.httpRequest.onabort = this.onAbort;
            }
            /* istanbul ignore next */
            if (!isNullOrUndefined(this.onError)) {
                this.httpRequest.onerror = this.onError;
            }
            //** Upload Events **/
            /* istanbul ignore next */
            if (!isNullOrUndefined(this.onUploadProgress)) {
                this.httpRequest.upload.onprogress = this.onUploadProgress;
            }
            this.httpRequest.open(this.type, this.url, this.mode);
            // Set default headers
            if (!isNullOrUndefined(this.data) && this.contentType !== null) {
                this.httpRequest.setRequestHeader('Content-Type', this.contentType || 'application/json; charset=utf-8');
            }
            if (this.beforeSend) {
                eventArgs.httpRequest = this.httpRequest;
                this.beforeSend(eventArgs);
            }
            if (!eventArgs.cancel) {
                this.httpRequest.send(!isNullOrUndefined(this.data) ? this.data : null);
            }
        });
        return promise;
    }
    successHandler(data) {
        if (this.onSuccess) {
            this.onSuccess(data, this);
        }
        return data;
    }
    failureHandler(reason) {
        if (this.onFailure) {
            this.onFailure(this.httpRequest);
        }
        return reason;
    }
    stateChange(resolve, reject) {
        let data = this.httpRequest.responseText;
        if (this.dataType && this.dataType.toLowerCase() === 'json') {
            if (data === '') {
                data = undefined;
            }
            else {
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                    // no exception handle
                }
            }
        }
        if (this.httpRequest.readyState === 4) {
            //success range should be 200 to 299
            if ((this.httpRequest.status >= 200 && this.httpRequest.status <= 299) || this.httpRequest.status === 304) {
                resolve(this.successHandler(data));
            }
            else {
                if (this.emitError) {
                    reject(new Error(this.failureHandler(this.httpRequest.statusText)));
                }
                else {
                    resolve();
                }
            }
        }
    }
    /**
     * To get the response header from XMLHttpRequest
     *
     * @param  {string} key Key to search in the response header
     * @returns {string} ?
     */
    getResponseHeader(key) {
        let responseHeaders;
        let header;
        // eslint-disable-next-line
        responseHeaders = {};
        let headers = headerRegex.exec(this.httpRequest.getAllResponseHeaders());
        while (headers) {
            responseHeaders[headers[1].toLowerCase()] = headers[2];
            headers = headerRegex.exec(this.httpRequest.getAllResponseHeaders());
        }
        // eslint-disable-next-line
        header = responseHeaders[key.toLowerCase()];
        return isNullOrUndefined(header) ? null : header;
    }
}

/**
 * The Fetch class provides a way to make asynchronous network requests, typically to retrieve resources from a server.
 * ```typescript
 *   var fetchApi = new Fetch('index.html', 'GET');
 *   fetchApi.send()
 *      .then((value) => {
 *          console.log(value);
 *      }).catch((error) => {
 *          console.log(error);
 *      });
 * ```
 */
class Fetch {
    /**
     * Constructor for Fetch class.
     *
     * @param {string|Object} options - Specifies the URL or Request object with URL to which the request is to be sent.
     * @param {string} type - Specifies which request method is to be used, such as GET, POST, etc.
     * @param {string} contentType - Specifies the content type of the request, which is used to indicate the original media type of the resource.
     */
    constructor(options, type, contentType) {
        /**
         * Specifies which request method is to be used, such as GET, POST, etc.
         *
         * @default GET
         */
        this.type = 'GET';
        /**
         * A boolean value indicating whether to reject the promise or not.
         *
         * @private
         * @default true
         */
        this.emitError = true;
        if (typeof options === 'string') {
            this.url = options;
            this.type = !isNullOrUndefined(type) ? type.toUpperCase() : this.type;
            this.contentType = contentType;
        }
        else if (isObject(options) && Object.keys(options).length > 0) {
            merge(this, options);
        }
        this.contentType = !isNullOrUndefined(this.contentType) ? this.contentType : 'application/json; charset=utf-8';
    }
    /**
     * Send the request to server.
     *
     * @param {string|Object} data - Specifies the data that needs to be added to the request.
     * @returns {Promise<Response>} - Returns the response to a request.
     */
    send(data) {
        const contentTypes = {
            'application/json': 'json',
            'multipart/form-data': 'formData',
            'application/octet-stream': 'blob',
            'application/x-www-form-urlencoded': 'formData'
        };
        try {
            if (isNullOrUndefined(this.fetchRequest) && this.type === 'GET') {
                this.fetchRequest = new Request(this.url, { method: this.type });
            }
            else if (isNullOrUndefined(this.fetchRequest)) {
                this.data = !isNullOrUndefined(data) ? data : this.data;
                this.fetchRequest = new Request(this.url, {
                    method: this.type,
                    headers: { 'Content-Type': this.contentType },
                    body: this.data
                });
            }
            const eventArgs = { cancel: false, fetchRequest: this.fetchRequest };
            this.triggerEvent(this['beforeSend'], eventArgs);
            if (eventArgs.cancel) {
                return null;
            }
            this.fetchResponse = fetch(this.fetchRequest);
            return this.fetchResponse.then((response) => {
                this.triggerEvent(this['onLoad'], response);
                if (!response.ok) {
                    throw response;
                }
                let responseType = 'text';
                for (const key of Object.keys(contentTypes)) {
                    if (response.headers.get('Content-Type') && response.headers.get('Content-Type').indexOf(key) !== -1) {
                        responseType = contentTypes[key];
                    }
                }
                return response[responseType]();
                // eslint-disable-next-line
            }).then((data) => {
                this.triggerEvent(this['onSuccess'], data, this);
                return data;
                // eslint-disable-next-line
            }).catch((error) => {
                let returnVal = {};
                if (this.emitError) {
                    this.triggerEvent(this['onFailure'], error);
                    returnVal = Promise.reject(error);
                }
                return returnVal;
            });
        }
        catch (error) {
            return error;
        }
    }
    triggerEvent(callback, data, instance) {
        if (!isNullOrUndefined(callback) && typeof callback === 'function') {
            callback(data, instance);
        }
    }
}

const REGX_MOBILE = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;
const REGX_IE = /msie|trident/i;
const REGX_IE11 = /Trident\/7\./;
const REGX_IOS = /(ipad|iphone|ipod touch)/i;
const REGX_IOS7 = /(ipad|iphone|ipod touch);.*os 7_\d|(ipad|iphone|ipod touch);.*os 8_\d/i;
const REGX_ANDROID = /android/i;
const REGX_WINDOWS = /trident|windows phone|edge/i;
const REGX_VERSION = /(version)[ /]([\w.]+)/i;
const REGX_BROWSER = {
    OPERA: /(opera|opr)(?:.*version|)[ /]([\w.]+)/i,
    EDGE: /(edge)(?:.*version|)[ /]([\w.]+)/i,
    CHROME: /(chrome|crios)[ /]([\w.]+)/i,
    PANTHOMEJS: /(phantomjs)[ /]([\w.]+)/i,
    SAFARI: /(safari)[ /]([\w.]+)/i,
    WEBKIT: /(webkit)[ /]([\w.]+)/i,
    MSIE: /(msie|trident) ([\w.]+)/i,
    MOZILLA: /(mozilla)(?:.*? rv:([\w.]+)|)/i
};
/* istanbul ignore else  */
if (typeof window !== 'undefined') {
    window.browserDetails = window.browserDetails || {};
}
/**
 * Get configuration details for Browser
 *
 * @private
 */
class Browser {
    static extractBrowserDetail() {
        const browserInfo = { culture: {} };
        const keys = Object.keys(REGX_BROWSER);
        let clientInfo = [];
        for (const key of keys) {
            clientInfo = Browser.userAgent.match(REGX_BROWSER[`${key}`]);
            if (clientInfo) {
                browserInfo.name = (clientInfo[1].toLowerCase() === 'opr' ? 'opera' : clientInfo[1].toLowerCase());
                browserInfo.name = (clientInfo[1].toLowerCase() === 'crios' ? 'chrome' : browserInfo.name);
                browserInfo.version = clientInfo[2];
                browserInfo.culture.name = browserInfo.culture.language = navigator.language;
                // eslint-disable-next-line
                if (!!Browser.userAgent.match(REGX_IE11)) {
                    browserInfo.name = 'msie';
                    break;
                }
                const version = Browser.userAgent.match(REGX_VERSION);
                if (browserInfo.name === 'safari' && version) {
                    browserInfo.version = version[2];
                }
                break;
            }
        }
        return browserInfo;
    }
    /**
     * To get events from the browser
     *
     * @param {string} event - type of event triggered.
     * @returns {boolean}
     */
    static getEvent(event) {
        // eslint-disable-next-line
        const events = {
            start: {
                isPointer: 'pointerdown', isTouch: 'touchstart', isDevice: 'mousedown'
            },
            move: {
                isPointer: 'pointermove', isTouch: 'touchmove', isDevice: 'mousemove'
            },
            end: {
                isPointer: 'pointerup', isTouch: 'touchend', isDevice: 'mouseup'
            },
            cancel: {
                isPointer: 'pointercancel', isTouch: 'touchcancel', isDevice: 'mouseleave'
            }
        };
        return (Browser.isPointer ? events[`${event}`].isPointer :
            (Browser.isTouch ? events[`${event}`].isTouch + (!Browser.isDevice ? ' ' + events[`${event}`].isDevice : '')
                : events[`${event}`].isDevice));
    }
    /**
     * To get the Touch start event from browser
     *
     * @returns {string}
     */
    static getTouchStartEvent() {
        return Browser.getEvent('start');
    }
    /**
     * To get the Touch end event from browser
     *
     * @returns {string}
     */
    static getTouchEndEvent() {
        return Browser.getEvent('end');
    }
    /**
     * To get the Touch move event from browser
     *
     * @returns {string}
     */
    static getTouchMoveEvent() {
        return Browser.getEvent('move');
    }
    /**
     * To cancel the touch event from browser
     *
     * @returns {string}
     */
    static getTouchCancelEvent() {
        return Browser.getEvent('cancel');
    }
    /**
     * Check whether the browser on the iPad device is Safari or not
     *
     * @returns {boolean}
     */
    static isSafari() {
        return (Browser.isDevice && Browser.isIos && Browser.isTouch && typeof window !== 'undefined'
            && window.navigator.userAgent.toLowerCase().indexOf('iphone') === -1
            && window.navigator.userAgent.toLowerCase().indexOf('safari') > -1);
    }
    /**
     * To get the value based on provided key and regX
     *
     * @param {string} key ?
     * @param {RegExp} regX ?
     * @returns {Object} ?
     */
    static getValue(key, regX) {
        const browserDetails = typeof window !== 'undefined' ? window.browserDetails : {};
        if (typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 && Browser.isTouch === true && !REGX_BROWSER.CHROME.test(navigator.userAgent)) {
            browserDetails['isIos'] = true;
            browserDetails['isDevice'] = true;
            browserDetails['isTouch'] = true;
            browserDetails['isPointer'] = true;
        }
        if ('undefined' === typeof browserDetails[`${key}`]) {
            return browserDetails[`${key}`] = regX.test(Browser.userAgent);
        }
        return browserDetails[`${key}`];
    }
    //Properties
    /**
     * Property specifies the userAgent of the browser. Default userAgent value is based on the browser.
     * Also we can set our own userAgent.
     *
     * @param {string} uA ?
     */
    static set userAgent(uA) {
        Browser.uA = uA;
        window.browserDetails = {};
    }
    static get userAgent() {
        return Browser.uA;
    }
    //Read Only Properties
    /**
     * Property is to get the browser information like Name, Version and Language
     *
     * @returns {BrowserInfo} ?
     */
    static get info() {
        if (isUndefined(window.browserDetails.info)) {
            return window.browserDetails.info = Browser.extractBrowserDetail();
        }
        return window.browserDetails.info;
    }
    /**
     * Property is to get whether the userAgent is based IE.
     *
     * @returns {boolean} ?
     */
    static get isIE() {
        return Browser.getValue('isIE', REGX_IE);
    }
    /**
     * Property is to get whether the browser has touch support.
     *
     * @returns {boolean} ?
     */
    static get isTouch() {
        if (isUndefined(window.browserDetails.isTouch)) {
            return (window.browserDetails.isTouch =
                ('ontouchstart' in window.navigator) ||
                    (window &&
                        window.navigator &&
                        (window.navigator.maxTouchPoints > 0)) || ('ontouchstart' in window));
        }
        return window.browserDetails.isTouch;
    }
    /**
     * Property is to get whether the browser has Pointer support.
     *
     * @returns {boolean} ?
     */
    static get isPointer() {
        if (isUndefined(window.browserDetails.isPointer)) {
            return window.browserDetails.isPointer = ('pointerEnabled' in window.navigator);
        }
        return window.browserDetails.isPointer;
    }
    /**
     * Property is to get whether the browser has MSPointer support.
     *
     * @returns {boolean} ?
     */
    static get isMSPointer() {
        if (isUndefined(window.browserDetails.isMSPointer)) {
            return window.browserDetails.isMSPointer = ('msPointerEnabled' in window.navigator);
        }
        return window.browserDetails.isMSPointer;
    }
    /**
     * Property is to get whether the userAgent is device based.
     *
     * @returns {boolean} ?
     */
    static get isDevice() {
        return Browser.getValue('isDevice', REGX_MOBILE);
    }
    /**
     * Property is to get whether the userAgent is IOS.
     *
     * @returns {boolean} ?
     */
    static get isIos() {
        return Browser.getValue('isIos', REGX_IOS);
    }
    /**
     * Property is to get whether the userAgent is Ios7.
     *
     * @returns {boolean} ?
     */
    static get isIos7() {
        return Browser.getValue('isIos7', REGX_IOS7);
    }
    /**
     * Property is to get whether the userAgent is Android.
     *
     * @returns {boolean} ?
     */
    static get isAndroid() {
        return Browser.getValue('isAndroid', REGX_ANDROID);
    }
    /**
     * Property is to identify whether application ran in web view.
     *
     * @returns {boolean} ?
     */
    static get isWebView() {
        if (isUndefined(window.browserDetails.isWebView)) {
            window.browserDetails.isWebView = !(isUndefined(window.cordova) && isUndefined(window.PhoneGap)
                && isUndefined(window.phonegap) && window.forge !== 'object');
            return window.browserDetails.isWebView;
        }
        return window.browserDetails.isWebView;
    }
    /**
     * Property is to get whether the userAgent is Windows.
     *
     * @returns {boolean} ?
     */
    static get isWindows() {
        return Browser.getValue('isWindows', REGX_WINDOWS);
    }
    /**
     * Property is to get the touch start event. It returns event name based on browser.
     *
     * @returns {string} ?
     */
    static get touchStartEvent() {
        if (isUndefined(window.browserDetails.touchStartEvent)) {
            return window.browserDetails.touchStartEvent = Browser.getTouchStartEvent();
        }
        return window.browserDetails.touchStartEvent;
    }
    /**
     * Property is to get the touch move event. It returns event name based on browser.
     *
     * @returns {string} ?
     */
    static get touchMoveEvent() {
        if (isUndefined(window.browserDetails.touchMoveEvent)) {
            return window.browserDetails.touchMoveEvent = Browser.getTouchMoveEvent();
        }
        return window.browserDetails.touchMoveEvent;
    }
    /**
     * Property is to get the touch end event. It returns event name based on browser.
     *
     * @returns {string} ?
     */
    static get touchEndEvent() {
        if (isUndefined(window.browserDetails.touchEndEvent)) {
            return window.browserDetails.touchEndEvent = Browser.getTouchEndEvent();
        }
        return window.browserDetails.touchEndEvent;
    }
    /**
     * Property is to cancel the touch end event.
     *
     * @returns {string} ?
     */
    static get touchCancelEvent() {
        if (isUndefined(window.browserDetails.touchCancelEvent)) {
            return window.browserDetails.touchCancelEvent = Browser.getTouchCancelEvent();
        }
        return window.browserDetails.touchCancelEvent;
    }
}
/* istanbul ignore next */
Browser.uA = typeof navigator !== 'undefined' ? navigator.userAgent : '';

/**
 * EventHandler class provides option to add, remove, clear and trigger events to a HTML DOM element
 * ```html
 * <div id="Eventdiv">  </div>
 * <script>
 *   let node: HTMLElement = document.querySelector("#Eventdiv");
 *   EventHandler.addEventListener(node, "click", function(){
 *       // click handler function code
 *   });
 *   EventHandler.addEventListener(node, "onmouseover", function(){
 *       // mouseover handler function code
 *   });
 *   EventHandler.removeEventListener(node, "click", function(){
 *       // click handler function code
 *   });
 *   eventObj.clearEvents();
 * </script>
 * ```
 */
class EventHandler {
    // to get the event data based on element
    static addOrGetEventData(element) {
        if ('__eventList' in element) {
            return element.__eventList.events;
        }
        else {
            element.__eventList = {};
            return element.__eventList.events = [];
        }
    }
    /**
     * Add an event to the specified DOM element.
     *
     * @param {any} element - Target HTML DOM element
     * @param {string} eventName - A string that specifies the name of the event
     * @param {Function} listener - Specifies the function to run when the event occurs
     * @param {Object} bindTo - A object that binds 'this' variable in the event handler
     * @param {number} intDebounce - Specifies at what interval given event listener should be triggered.
     * @returns {Function} ?
     */
    static add(element, eventName, listener, bindTo, intDebounce) {
        const eventData = EventHandler.addOrGetEventData(element);
        let debounceListener;
        if (intDebounce) {
            debounceListener = debounce(listener, intDebounce);
        }
        else {
            debounceListener = listener;
        }
        if (bindTo) {
            debounceListener = debounceListener.bind(bindTo);
        }
        const event = eventName.split(' ');
        for (let i = 0; i < event.length; i++) {
            eventData.push({
                name: event[parseInt(i.toString(), 10)],
                listener: listener,
                debounce: debounceListener
            });
            if (Browser.isIE) {
                element.addEventListener(event[parseInt(i.toString(), 10)], debounceListener);
            }
            else {
                element.addEventListener(event[parseInt(i.toString(), 10)], debounceListener, { passive: false });
            }
        }
        return debounceListener;
    }
    /**
     * Remove an event listener that has been attached before.
     *
     * @param {any} element - Specifies the target html element to remove the event
     * @param {string} eventName - A string that specifies the name of the event to remove
     * @param {Function} listener - Specifies the function to remove
     * @returns {void} ?
     */
    static remove(element, eventName, listener) {
        const eventData = EventHandler.addOrGetEventData(element);
        const event = eventName.split(' ');
        for (let j = 0; j < event.length; j++) {
            let index = -1;
            let debounceListener;
            if (eventData && eventData.length !== 0) {
                eventData.some((x, i) => {
                    return x.name === event[parseInt(j.toString(), 10)] && x.listener === listener ?
                        (index = i, debounceListener = x.debounce, true) : false;
                });
            }
            if (index !== -1) {
                eventData.splice(index, 1);
            }
            if (debounceListener) {
                element.removeEventListener(event[parseInt(j.toString(), 10)], debounceListener);
            }
        }
    }
    /**
     * Clear all the event listeners that has been previously attached to the element.
     *
     * @param {any} element - Specifies the target html element to clear the events
     * @returns {void} ?
     */
    static clearEvents(element) {
        let eventData;
        let copyData;
        // eslint-disable-next-line
        eventData = EventHandler.addOrGetEventData(element);
        // eslint-disable-next-line
        copyData = extend([], copyData, eventData);
        for (let i = 0; i < copyData.length; i++) {
            const parseValue = copyData[parseInt(i.toString(), 10)];
            element.removeEventListener(parseValue.name, parseValue.debounce);
            eventData.shift();
        }
    }
    /**
     * Trigger particular event of the element.
     *
     * @param {any} element - Specifies the target html element to trigger the events
     * @param {string} eventName - Specifies the event to trigger for the specified element.
     * Can be a custom event, or any of the standard events.
     * @param {any} eventProp - Additional parameters to pass on to the event properties
     * @returns {void} ?
     */
    static trigger(element, eventName, eventProp) {
        const eventData = EventHandler.addOrGetEventData(element);
        for (const event of eventData) {
            if (event.name === eventName) {
                event.debounce.call(this, eventProp);
            }
        }
    }
}

/**
 * Functions related to dom operations.
 */
const SVG_REG = /^svg|^path|^g/;
/**
 * Function to create Html element.
 *
 * @param {string} tagName - Name of the tag, id and class names.
 * @param {ElementProperties} properties - Object to set properties in the element.
 * @param {ElementProperties} properties.id - To set the id to the created element.
 * @param {ElementProperties} properties.className - To add classes to the element.
 * @param {ElementProperties} properties.innerHTML - To set the innerHTML to element.
 * @param {ElementProperties} properties.styles - To set the some custom styles to element.
 * @param {ElementProperties} properties.attrs - To set the attributes to element.
 * @returns {any} ?
 * @private
 */
function createElement(tagName, properties) {
    const element = (SVG_REG.test(tagName) ? document.createElementNS('http://www.w3.org/2000/svg', tagName) : document.createElement(tagName));
    if (typeof (properties) === 'undefined') {
        return element;
    }
    element.innerHTML = (properties.innerHTML ? properties.innerHTML : '');
    if (properties.className !== undefined) {
        element.className = properties.className;
    }
    if (properties.id !== undefined) {
        element.id = properties.id;
    }
    if (properties.styles !== undefined) {
        element.setAttribute('style', properties.styles);
    }
    if (properties.attrs !== undefined) {
        attributes(element, properties.attrs);
    }
    return element;
}
/**
 * The function used to add the classes to array of elements
 *
 * @param  {Element[]|NodeList} elements - An array of elements that need to add a list of classes
 * @param  {string|string[]} classes - String or array of string that need to add an individual element as a class
 * @returns {any} .
 * @private
 */
function addClass(elements, classes) {
    const classList = getClassList(classes);
    const regExp = RegExp;
    for (const ele of elements) {
        for (const className of classList) {
            if (isObject(ele)) {
                const curClass = getValue('attributes.className', ele);
                if (isNullOrUndefined(curClass)) {
                    setValue('attributes.className', className, ele);
                }
                else if (!new regExp('\\b' + className + '\\b', 'i').test(curClass)) {
                    setValue('attributes.className', curClass + ' ' + className, ele);
                }
            }
            else {
                if (!ele.classList.contains(className)) {
                    ele.classList.add(className);
                }
            }
        }
    }
    return elements;
}
/**
 * The function used to add the classes to array of elements
 *
 * @param  {Element[]|NodeList} elements - An array of elements that need to remove a list of classes
 * @param  {string|string[]} classes - String or array of string that need to add an individual element as a class
 * @returns {any} .
 * @private
 */
function removeClass(elements, classes) {
    const classList = getClassList(classes);
    for (const ele of elements) {
        const flag = isObject(ele);
        const canRemove = flag ? getValue('attributes.className', ele) : ele.className !== '';
        if (canRemove) {
            for (const className of classList) {
                if (flag) {
                    const classes = getValue('attributes.className', ele);
                    const classArr = classes.split(' ');
                    const index = classArr.indexOf(className);
                    if (index !== -1) {
                        classArr.splice(index, 1);
                    }
                    setValue('attributes.className', classArr.join(' '), ele);
                }
                else {
                    ele.classList.remove(className);
                }
            }
        }
    }
    return elements;
}
/**
 * The function used to get classlist.
 *
 * @param  {string | string[]} classes - An element the need to check visibility
 * @returns {string[]} ?
 * @private
 */
function getClassList(classes) {
    let classList = [];
    if (typeof classes === 'string') {
        classList.push(classes);
    }
    else {
        classList = classes;
    }
    return classList;
}
/**
 * The function used to check element is visible or not.
 *
 * @param  {Element|Node} element - An element the need to check visibility
 * @returns {boolean} ?
 * @private
 */
function isVisible(element) {
    const ele = element;
    return (ele.style.visibility === '' && ele.offsetWidth > 0);
}
/**
 * The function used to insert an array of elements into a first of the element.
 *
 * @param  {Element[]|NodeList} fromElements - An array of elements that need to prepend.
 * @param  {Element} toElement - An element that is going to prepend.
 * @param {boolean} isEval - ?
 * @returns {Element[] | NodeList} ?
 * @private
 */
function prepend(fromElements, toElement, isEval) {
    const docFrag = document.createDocumentFragment();
    for (const ele of fromElements) {
        docFrag.appendChild(ele);
    }
    toElement.insertBefore(docFrag, toElement.firstElementChild);
    if (isEval) {
        executeScript(toElement);
    }
    return fromElements;
}
/**
 * The function used to insert an array of elements into last of the element.
 *
 * @param  {Element[]|NodeList} fromElements - An array of elements that need to append.
 * @param  {Element} toElement - An element that is going to prepend.
 * @param {boolean} isEval - ?
 * @returns {Element[] | NodeList} ?
 * @private
 */
function append(fromElements, toElement, isEval) {
    const docFrag = document.createDocumentFragment();
    if (fromElements instanceof NodeList) {
        while (fromElements.length > 0) {
            docFrag.appendChild(fromElements[0]);
        }
    }
    else {
        for (const ele of fromElements) {
            docFrag.appendChild(ele);
        }
    }
    toElement.appendChild(docFrag);
    if (isEval) {
        executeScript(toElement);
    }
    return fromElements;
}
/**
 * The function is used to evaluate script from Ajax request
 *
 * @param {Element} ele - An element is going to evaluate the script
 * @returns {void} ?
 */
function executeScript(ele) {
    const eleArray = ele.querySelectorAll('script');
    eleArray.forEach((element) => {
        const script = document.createElement('script');
        script.text = element.innerHTML;
        document.head.appendChild(script);
        detach(script);
    });
}
/**
 * The function used to remove the element from parentnode
 *
 * @param  {Element|Node|HTMLElement} element - An element that is going to detach from the Dom
 * @returns {any} ?
 * @private
 */
// eslint-disable-next-line
function detach(element) {
    const parentNode = element.parentNode;
    if (parentNode) {
        return parentNode.removeChild(element);
    }
}
/**
 * The function used to remove the element from Dom also clear the bounded events
 *
 * @param  {Element|Node|HTMLElement} element - An element remove from the Dom
 * @returns {void} ?
 * @private
 */
function remove(element) {
    const parentNode = element.parentNode;
    EventHandler.clearEvents(element);
    parentNode.removeChild(element);
}
/**
 * The function helps to set multiple attributes to an element
 *
 * @param  {Element|Node} element - An element that need to set attributes.
 * @param  {string} attributes - JSON Object that is going to as attributes.
 * @returns {Element} ?
 * @private
 */
// eslint-disable-next-line
function attributes(element, attributes) {
    const keys = Object.keys(attributes);
    const ele = element;
    for (const key of keys) {
        if (isObject(ele)) {
            let iKey = key;
            if (key === 'tabindex') {
                iKey = 'tabIndex';
            }
            ele.attributes[`${iKey}`] = attributes[`${key}`];
        }
        else {
            ele.setAttribute(key, attributes[`${key}`]);
        }
    }
    return ele;
}
/**
 * The function selects the element from giving context.
 *
 * @param  {string} selector - Selector string need fetch element
 * @param  {Document|Element} context - It is an optional type, That specifies a Dom context.
 * @param {boolean} needsVDOM ?
 * @returns {any} ?
 * @private
 */
// eslint-disable-next-line
function select(selector, context = document, needsVDOM) {
    selector = querySelectId(selector);
    return context.querySelector(selector);
}
/**
 * The function selects an array of element from the given context.
 *
 * @param  {string} selector - Selector string need fetch element
 * @param  {Document|Element} context - It is an optional type, That specifies a Dom context.
 * @param {boolean} needsVDOM ?
 * @returns {HTMLElement[]} ?
 * @private
 */
// eslint-disable-next-line
function selectAll(selector, context = document, needsVDOM) {
    selector = querySelectId(selector);
    const nodeList = context.querySelectorAll(selector);
    return nodeList;
}
/**
 * The function selects an id of element from the given context.
 *
 * @param  {string} selector - Selector string need fetch element
 * @returns {string} ?
 * @private
 */
function querySelectId(selector) {
    const charRegex = /(!|"|\$|%|&|'|\(|\)|\*|\/|:|;|<|=|\?|@|\]|\^|`|{|}|\||\+|~)/g;
    if (selector.match(/#[0-9]/g) || selector.match(charRegex)) {
        const idList = selector.split(',');
        for (let i = 0; i < idList.length; i++) {
            const list = idList[parseInt(i.toString(), 10)].split(' ');
            for (let j = 0; j < list.length; j++) {
                if (list[parseInt(j.toString(), 10)].indexOf('#') > -1) {
                    if (!list[parseInt(j.toString(), 10)].match(/\[.*\]/)) {
                        const splitId = list[parseInt(j.toString(), 10)].split('#');
                        if (splitId[1].match(/^\d/) || splitId[1].match(charRegex)) {
                            const setId = list[parseInt(j.toString(), 10)].split('.');
                            setId[0] = setId[0].replace(/#/, '[id=\'') + '\']';
                            list[parseInt(j.toString(), 10)] = setId.join('.');
                        }
                    }
                }
            }
            idList[parseInt(i.toString(), 10)] = list.join(' ');
        }
        return idList.join(',');
    }
    return selector;
}
/**
 * Returns single closest parent element based on class selector.
 *
 * @param  {Element} element - An element that need to find the closest element.
 * @param  {string} selector - A classSelector of closest element.
 * @returns {Element} ?
 * @private
 */
function closest(element, selector) {
    let el = element;
    if (typeof el.closest === 'function') {
        return el.closest(selector);
    }
    while (el && el.nodeType === 1) {
        if (matches(el, selector)) {
            return el;
        }
        el = el.parentNode;
    }
    return null;
}
/**
 * Returns all sibling elements of the given element.
 *
 * @param  {Element|Node} element - An element that need to get siblings.
 * @returns {Element[]} ?
 * @private
 */
function siblings(element) {
    const siblings = [];
    const childNodes = Array.prototype.slice.call(element.parentNode.childNodes);
    for (const curNode of childNodes) {
        if (curNode.nodeType === Node.ELEMENT_NODE && element !== curNode) {
            siblings.push(curNode);
        }
    }
    return siblings;
}
/**
 * set the value if not exist. Otherwise set the existing value
 *
 * @param  {HTMLElement} element - An element to which we need to set value.
 * @param  {string} property - Property need to get or set.
 * @param  {string} value - value need to set.
 * @returns {string} ?
 * @private
 */
function getAttributeOrDefault(element, property, value) {
    let attrVal;
    const isObj = isObject(element);
    if (isObj) {
        attrVal = getValue('attributes.' + property, element);
    }
    else {
        attrVal = element.getAttribute(property);
    }
    if (isNullOrUndefined(attrVal) && value) {
        if (!isObj) {
            element.setAttribute(property, value.toString());
        }
        else {
            element.attributes[`${property}`] = value;
        }
        attrVal = value;
    }
    return attrVal;
}
/**
 * Set the style attributes to Html element.
 *
 * @param {HTMLElement} element - Element which we want to set attributes
 * @param {any} attrs - Set the given attributes to element
 * @returns {void} ?
 * @private
 */
function setStyleAttribute(element, attrs) {
    if (attrs !== undefined) {
        Object.keys(attrs).forEach((key) => {
            // eslint-disable-next-line
            element.style[key] = attrs[key];
        });
    }
}
/**
 * Method for add and remove classes to a dom element.
 *
 * @param {Element} element - Element for add and remove classes
 * @param {string[]} addClasses - List of classes need to be add to the element
 * @param {string[]} removeClasses - List of classes need to be remove from the element
 * @returns {void} ?
 * @private
 */
function classList(element, addClasses, removeClasses) {
    addClass([element], addClasses);
    removeClass([element], removeClasses);
}
/**
 * Method to check whether the element matches the given selector.
 *
 * @param {Element} element - Element to compare with the selector.
 * @param {string} selector - String selector which element will satisfy.
 * @returns {void} ?
 * @private
 */
function matches(element, selector) {
    // eslint-disable-next-line
    let matches = element.matches || element.msMatchesSelector || element.webkitMatchesSelector;
    if (matches) {
        return matches.call(element, selector);
    }
    else {
        return [].indexOf.call(document.querySelectorAll(selector), element) !== -1;
    }
}
/**
 * Method to get the html text from DOM.
 *
 * @param {HTMLElement} ele - Element to compare with the selector.
 * @param {string} innerHTML - String selector which element will satisfy.
 * @returns {void} ?
 * @private
 */
function includeInnerHTML(ele, innerHTML) {
    ele.innerHTML = innerHTML;
}
/**
 * Method to get the containsclass.
 *
 * @param {HTMLElement} ele - Element to compare with the selector.
 * @param {string} className - String selector which element will satisfy.
 * @returns {any} ?
 * @private
 */
// eslint-disable-next-line
function containsClass(ele, className) {
    if (isObject(ele)) {
        // eslint-disable-next-line
        return new RegExp('\\b' + className + '\\b', 'i').test(ele.attributes.className);
    }
    else {
        return ele.classList.contains(className);
    }
}
/**
 * Method to check whether the element matches the given selector.
 *
 * @param {Object} element - Element to compare with the selector.
 * @param {boolean} deep ?
 * @returns {any} ?
 * @private
 */
// eslint-disable-next-line
function cloneNode(element, deep) {
    if (isObject(element)) {
        if (deep) {
            return extend({}, {}, element, true);
        }
    }
    else {
        return element.cloneNode(deep);
    }
}

const isColEName = new RegExp(']');
/* tslint:enable:no-any */
/**
 * Base library module is common module for Framework modules like touch,keyboard and etc.,
 *
 * @private
 */
class Base {
    /**
     * Base constructor accept options and element
     *
     * @param {Object} options ?
     * @param {string} element ?
     */
    constructor(options, element) {
        this.isRendered = false;
        this.isComplexArraySetter = false;
        this.isServerRendered = false;
        this.allowServerDataBinding = true;
        this.isProtectedOnChange = true;
        this.properties = {};
        this.changedProperties = {};
        this.oldProperties = {};
        this.bulkChanges = {};
        this.refreshing = false;
        this.ignoreCollectionWatch = false;
        // eslint-disable-next-line
        this.finalUpdate = () => { };
        this.childChangedProperties = {};
        this.modelObserver = new Observer(this);
        if (!isUndefined(element)) {
            if ('string' === typeof (element)) {
                this.element = document.querySelector(element);
            }
            else {
                this.element = element;
            }
            if (!isNullOrUndefined(this.element)) {
                this.isProtectedOnChange = false;
                this.addInstance();
            }
        }
        if (!isUndefined(options)) {
            this.setProperties(options, true);
        }
        this.isDestroyed = false;
    }
    /** Property base section */
    /**
     * Function used to set bunch of property at a time.
     *
     * @private
     * @param  {Object} prop - JSON object which holds components properties.
     * @param  {boolean} muteOnChange ? - Specifies to true when we set properties.
     * @returns {void} ?
     */
    setProperties(prop, muteOnChange) {
        const prevDetection = this.isProtectedOnChange;
        this.isProtectedOnChange = !!muteOnChange;
        merge(this, prop);
        if (muteOnChange !== true) {
            merge(this.changedProperties, prop);
            this.dataBind();
        }
        else if (isBlazor() && this.isRendered) {
            this.serverDataBind(prop);
        }
        this.finalUpdate();
        this.changedProperties = {};
        this.oldProperties = {};
        this.isProtectedOnChange = prevDetection;
    }
    /**
     * Calls for child element data bind
     *
     * @param {Object} obj ?
     * @param {Object} parent ?
     * @returns {void} ?
     */
    // tslint:disable-next-line:no-any
    static callChildDataBind(obj, parent) {
        const keys = Object.keys(obj);
        for (const key of keys) {
            if (parent[`${key}`] instanceof Array) {
                for (const obj of parent[`${key}`]) {
                    if (obj.dataBind !== undefined) {
                        obj.dataBind();
                    }
                }
            }
            else {
                parent[`${key}`].dataBind();
            }
        }
    }
    clearChanges() {
        this.finalUpdate();
        this.changedProperties = {};
        this.oldProperties = {};
        this.childChangedProperties = {};
    }
    /**
     * Bind property changes immediately to components
     *
     * @returns {void} ?
     */
    dataBind() {
        Base.callChildDataBind(this.childChangedProperties, this);
        if (Object.getOwnPropertyNames(this.changedProperties).length) {
            const prevDetection = this.isProtectedOnChange;
            const newChanges = this.changedProperties;
            const oldChanges = this.oldProperties;
            this.clearChanges();
            this.isProtectedOnChange = true;
            this.onPropertyChanged(newChanges, oldChanges);
            this.isProtectedOnChange = prevDetection;
        }
    }
    /* tslint:disable:no-any */
    serverDataBind(newChanges) {
        if (!isBlazor()) {
            return;
        }
        newChanges = newChanges ? newChanges : {};
        extend(this.bulkChanges, {}, newChanges, true);
        const sfBlazor = 'sfBlazor';
        if (this.allowServerDataBinding && window[`${sfBlazor}`].updateModel) {
            window[`${sfBlazor}`].updateModel(this);
            this.bulkChanges = {};
        }
    }
    /* tslint:enable:no-any */
    saveChanges(key, newValue, oldValue) {
        if (isBlazor()) {
            // tslint:disable-next-line:no-any
            const newChanges = {};
            newChanges[`${key}`] = newValue;
            this.serverDataBind(newChanges);
        }
        if (this.isProtectedOnChange) {
            return;
        }
        this.oldProperties[`${key}`] = oldValue;
        this.changedProperties[`${key}`] = newValue;
        this.finalUpdate();
        this.finalUpdate = setImmediate(this.dataBind.bind(this));
    }
    /** Event Base Section */
    /**
     * Adds the handler to the given event listener.
     *
     * @param {string} eventName - A String that specifies the name of the event
     * @param {Function} handler - Specifies the call to run when the event occurs.
     * @returns {void} ?
     */
    addEventListener(eventName, handler) {
        this.modelObserver.on(eventName, handler);
    }
    /**
     * Removes the handler from the given event listener.
     *
     * @param {string} eventName - A String that specifies the name of the event to remove
     * @param {Function} handler - Specifies the function to remove
     * @returns {void} ?
     */
    removeEventListener(eventName, handler) {
        this.modelObserver.off(eventName, handler);
    }
    /**
     * Triggers the handlers in the specified event.
     *
     * @private
     * @param {string} eventName - Specifies the event to trigger for the specified component properties.
     * Can be a custom event, or any of the standard events.
     * @param {Event} eventProp - Additional parameters to pass on to the event properties
     * @param {Function} successHandler - this function will invoke after event successfully triggered
     * @param {Function} errorHandler - this function will invoke after event if it failured to call.
     * @returns {void} ?
     */
    trigger(eventName, eventProp, successHandler, errorHandler) {
        if (this.isDestroyed !== true) {
            const prevDetection = this.isProtectedOnChange;
            this.isProtectedOnChange = false;
            let data = this.modelObserver.notify(eventName, eventProp, successHandler, errorHandler);
            if (isColEName.test(eventName)) {
                const handler = getValue(eventName, this);
                if (handler) {
                    const blazor = 'Blazor';
                    if (window[`${blazor}`]) {
                        const promise = handler.call(this, eventProp);
                        if (promise && typeof promise.then === 'function') {
                            if (!successHandler) {
                                data = promise;
                            }
                            else {
                                promise.then((data) => {
                                    if (successHandler) {
                                        data = typeof data === 'string' && this.modelObserver.isJson(data) ?
                                            JSON.parse(data) : data;
                                        successHandler.call(this, data);
                                    }
                                }).catch((data) => {
                                    if (errorHandler) {
                                        data = typeof data === 'string' && this.modelObserver.isJson(data) ? JSON.parse(data) : data;
                                        errorHandler.call(this, data);
                                    }
                                });
                            }
                        }
                        else if (successHandler) {
                            successHandler.call(this, eventProp);
                        }
                    }
                    else {
                        handler.call(this, eventProp);
                        if (successHandler) {
                            successHandler.call(this, eventProp);
                        }
                    }
                }
                else if (successHandler) {
                    successHandler.call(this, eventProp);
                }
            }
            this.isProtectedOnChange = prevDetection;
            return data;
        }
    }
    /**
     * To maintain instance in base class
     *
     * @returns {void} ?
     */
    addInstance() {
        // Add module class to the root element
        const moduleClass = 'e-' + this.getModuleName().toLowerCase();
        addClass([this.element], ['e-lib', moduleClass]);
        if (!isNullOrUndefined(this.element.ej2_instances)) {
            this.element.ej2_instances.push(this);
        }
        else {
            setValue('ej2_instances', [this], this.element);
        }
    }
    /**
     * To remove the instance from the element
     *
     * @returns {void} ?
     */
    destroy() {
        // eslint-disable-next-line
        this.element.ej2_instances =
            this.element.ej2_instances ?
                this.element.ej2_instances.filter((i) => {
                    if (proxyToRaw) {
                        return proxyToRaw(i) !== proxyToRaw(this);
                    }
                    return i !== this;
                })
                : [];
        removeClass([this.element], ['e-' + this.getModuleName()]);
        if (this.element.ej2_instances.length === 0) {
            // Remove module class from the root element
            removeClass([this.element], ['e-lib']);
        }
        this.clearChanges();
        this.modelObserver.destroy();
        this.isDestroyed = true;
    }
}
/**
 * Global function to get the component instance from the rendered element.
 *
 * @param {HTMLElement} elem Specifies the HTMLElement or element id string.
 * @param {string} comp Specifies the component module name or Component.
 * @returns {any} ?
 */
// tslint:disable-next-line:no-any
function getComponent(elem, comp) {
    let instance;
    let i;
    const ele = typeof elem === 'string' ? document.getElementById(elem) : elem;
    for (i = 0; i < ele.ej2_instances.length; i++) {
        instance = ele.ej2_instances[parseInt(i.toString(), 10)];
        if (typeof comp === 'string') {
            const compName = instance.getModuleName();
            if (comp === compName) {
                return instance;
            }
        }
        else {
            // tslint:disable-next-line:no-any
            if (instance instanceof comp) {
                return instance;
            }
        }
    }
    return undefined;
}
/**
 * Function to remove the child instances.
 *
 * @param {HTMLElement} element ?
 * @return {void}
 * @private
 */
// tslint:disable-next-line:no-any
function removeChildInstance(element) {
    // tslint:disable-next-line:no-any
    const childEle = [].slice.call(element.getElementsByClassName('e-control'));
    for (let i = 0; i < childEle.length; i++) {
        const compName = childEle[parseInt(i.toString(), 10)].classList[1].split('e-')[1];
        // tslint:disable-next-line:no-any
        const compInstance = getComponent(childEle[parseInt(i.toString(), 10)], compName);
        if (!isUndefined(compInstance)) {
            compInstance.destroy();
        }
    }
}
let proxyToRaw;
const setProxyToRaw = (toRaw) => { proxyToRaw = toRaw; };

/**
 * Returns the Class Object
 *
 * @param {ClassObject} instance - instance of ClassObject
 * @param {string} curKey - key of the current instance
 * @param {Object} defaultValue - default Value
 * @param {Object[]} type ?
 * @returns {ClassObject} ?
 */
// eslint-disable-next-line
function getObject(instance, curKey, defaultValue, type) {
    // eslint-disable-next-line
    if (!instance.properties.hasOwnProperty(curKey) || !(instance.properties[curKey] instanceof type)) {
        instance.properties[`${curKey}`] = createInstance(type, [instance, curKey, defaultValue]);
    }
    return instance.properties[`${curKey}`];
}
/**
 * Returns object array
 *
 * @param {ClassObject} instance ?
 * @param {string} curKey ?
 * @param {Object[]} defaultValue ?
 * @param {Object} type ?
 * @param {boolean} isSetter ?
 * @param {boolean} isFactory ?
 * @returns {Object[]} ?
 */
// eslint-disable-next-line
function getObjectArray(instance, curKey, defaultValue, type, isSetter, isFactory) {
    const result = [];
    const len = defaultValue ? defaultValue.length : 0;
    for (let i = 0; i < len; i++) {
        let curType = type;
        if (isFactory) {
            curType = type(defaultValue[parseInt(i.toString(), 10)], instance);
        }
        if (isSetter) {
            const inst = createInstance(curType, [instance, curKey, {}, true]);
            inst.setProperties(defaultValue[parseInt(i.toString(), 10)], true);
            result.push(inst);
        }
        else {
            result.push(createInstance(curType, [instance, curKey, defaultValue[parseInt(i.toString(), 10)], false]));
        }
    }
    return result;
}
/**
 * Returns the properties of the object
 *
 * @param {Object} defaultValue ?
 * @param {string} curKey ?
 * @returns {void} ?
 */
function propertyGetter(defaultValue, curKey) {
    return function () {
        // eslint-disable-next-line
        if (!this.properties.hasOwnProperty(curKey)) {
            this.properties[`${curKey}`] = defaultValue;
        }
        return this.properties[`${curKey}`];
    };
}
/**
 * Set the properties for the object
 *
 * @param {Object} defaultValue ?
 * @param {string} curKey ?
 * @returns {void} ?
 */
function propertySetter(defaultValue, curKey) {
    return function (newValue) {
        if (this.properties[`${curKey}`] !== newValue) {
            // eslint-disable-next-line
            let oldVal = this.properties.hasOwnProperty(curKey) ? this.properties[curKey] : defaultValue;
            this.saveChanges(curKey, newValue, oldVal);
            this.properties[`${curKey}`] = newValue;
        }
    };
}
/**
 * Returns complex objects
 *
 * @param {Object} defaultValue ?
 * @param {string} curKey ?
 * @param {Object[]} type ?
 * @returns {void} ?
 */
// eslint-disable-next-line
function complexGetter(defaultValue, curKey, type) {
    return function () {
        return getObject(this, curKey, defaultValue, type);
    };
}
/**
 * Sets complex objects
 *
 * @param {Object} defaultValue ?
 * @param {string} curKey ?
 * @param {Object[]} type ?
 * @returns {void} ?
 */
function complexSetter(defaultValue, curKey, type) {
    return function (newValue) {
        getObject(this, curKey, defaultValue, type).setProperties(newValue);
    };
}
/**
 *
 * @param {Object} defaultValue ?
 * @param {string} curKey ?
 * @param {FunctionConstructor} type ?
 * @returns {void} ?
 */
// eslint-disable-next-line
function complexFactoryGetter(defaultValue, curKey, type) {
    return function () {
        const curType = type({});
        // eslint-disable-next-line
        if (this.properties.hasOwnProperty(curKey)) {
            return this.properties[`${curKey}`];
        }
        else {
            return getObject(this, curKey, defaultValue, curType);
        }
    };
}
/**
 *
 * @param {Object} defaultValue ?
 * @param {string} curKey ?
 * @param {Object[]} type ?
 * @returns {void} ?
 */
function complexFactorySetter(defaultValue, curKey, type) {
    return function (newValue) {
        const curType = type(newValue, this);
        getObject(this, curKey, defaultValue, curType).setProperties(newValue);
    };
}
/**
 *
 * @param {Object[]} defaultValue ?
 * @param {string} curKey ?
 * @param {Object[]} type ?
 * @returns {void} ?
 */
function complexArrayGetter(defaultValue, curKey, type) {
    return function () {
        // eslint-disable-next-line
        if (!this.properties.hasOwnProperty(curKey)) {
            const defCollection = getObjectArray(this, curKey, defaultValue, type, false);
            this.properties[`${curKey}`] = defCollection;
        }
        const ignore = ((this.controlParent !== undefined && this.controlParent.ignoreCollectionWatch)
            || this.ignoreCollectionWatch);
        // eslint-disable-next-line
        if (!this.properties[curKey].hasOwnProperty('push') && !ignore) {
            ['push', 'pop'].forEach((extendFunc) => {
                const descriptor = {
                    value: complexArrayDefinedCallback(extendFunc, curKey, type, this.properties[`${curKey}`]).bind(this),
                    configurable: true
                };
                Object.defineProperty(this.properties[`${curKey}`], extendFunc, descriptor);
            });
        }
        // eslint-disable-next-line
        if (!this.properties[curKey].hasOwnProperty('isComplexArray')) {
            Object.defineProperty(this.properties[`${curKey}`], 'isComplexArray', { value: true });
        }
        return this.properties[`${curKey}`];
    };
}
/**
 *
 * @param {Object[]} defaultValue ?
 * @param {string} curKey ?
 * @param {Object[]} type ?
 * @returns {void} ?
 */
function complexArraySetter(defaultValue, curKey, type) {
    return function (newValue) {
        this.isComplexArraySetter = true;
        const oldValueCollection = getObjectArray(this, curKey, defaultValue, type, false);
        const newValCollection = getObjectArray(this, curKey, newValue, type, true);
        this.isComplexArraySetter = false;
        this.saveChanges(curKey, newValCollection, oldValueCollection);
        this.properties[`${curKey}`] = newValCollection;
    };
}
/**
 *
 * @param {Object[]} defaultValue ?
 * @param {string} curKey ?
 * @param {Object[]} type ?
 * @returns {void} ?
 */
function complexArrayFactorySetter(defaultValue, curKey, type) {
    return function (newValue) {
        // eslint-disable-next-line
        const oldValueCollection = this.properties.hasOwnProperty(curKey) ? this.properties[curKey] : defaultValue;
        const newValCollection = getObjectArray(this, curKey, newValue, type, true, true);
        this.saveChanges(curKey, newValCollection, oldValueCollection);
        this.properties[`${curKey}`] = newValCollection;
    };
}
/**
 *
 * @param {Object[]} defaultValue ?
 * @param {string} curKey ?
 * @param {FunctionConstructor} type ?
 * @returns {void} ?
 */
function complexArrayFactoryGetter(defaultValue, curKey, type) {
    return function () {
        const curType = type({});
        // eslint-disable-next-line
        if (!this.properties.hasOwnProperty(curKey)) {
            const defCollection = getObjectArray(this, curKey, defaultValue, curType, false);
            this.properties[`${curKey}`] = defCollection;
        }
        return this.properties[`${curKey}`];
    };
}
/**
 *
 * @param {string} dFunc ?
 * @param {string} curKey ?
 * @param {Object} type ?
 * @param {Object} prop ?
 * @returns {Object} ?
 */
function complexArrayDefinedCallback(dFunc, curKey, type, prop) {
    /* tslint:disable no-function-expression */
    return function (...newValue) {
        const keyString = this.propName ? this.getParentKey() + '.' + curKey + '-' : curKey + '-';
        switch (dFunc) {
            case 'push':
                for (let i = 0; i < newValue.length; i++) {
                    const newValueParse = newValue[parseInt(i.toString(), 10)];
                    Array.prototype[`${dFunc}`].apply(prop, [newValueParse]);
                    const model = getArrayModel(keyString + (prop.length - 1), newValueParse, !this.controlParent, dFunc);
                    this.serverDataBind(model, newValue[parseInt(i.toString(), 10)], false, dFunc);
                }
                break;
            case 'pop':
                Array.prototype[`${dFunc}`].apply(prop);
                // eslint-disable-next-line
                let model = getArrayModel(keyString + prop.length, null, !this.controlParent, dFunc);
                this.serverDataBind(model, { ejsAction: 'pop' }, false, dFunc);
                break;
        }
        return prop;
    };
}
/**
 *
 * @param {string} keyString ?
 * @param {Object} value ?
 * @param {boolean} isControlParent ?
 * @param {string} arrayFunction ?
 * @returns {Object} ?
 */
function getArrayModel(keyString, value, isControlParent, arrayFunction) {
    let modelObject = keyString;
    if (isControlParent) {
        modelObject = {};
        modelObject[`${keyString}`] = value;
        if (value && typeof value === 'object') {
            const action = 'ejsAction';
            modelObject[`${keyString}`][`${action}`] = arrayFunction;
        }
    }
    return modelObject;
}
// eslint-disable-next-line
/**
 * Method used to create property. General syntax below.
 *
 * @param {Object} defaultValue - Specifies the default value of property.
 * @returns {PropertyDecorator} ?
 * ```
 * @Property('TypeScript')
 * propertyName: Type;
 * ```
 * @private
 */
function Property(defaultValue) {
    return (target, key) => {
        const propertyDescriptor = {
            set: propertySetter(defaultValue, key),
            get: propertyGetter(defaultValue, key),
            enumerable: true,
            configurable: true
        };
        //new property creation
        Object.defineProperty(target, key, propertyDescriptor);
        addPropertyCollection(target, key, 'prop', defaultValue);
    };
}
/**
 * Method used to create complex property. General syntax below.
 *
 * @param  {any} defaultValue - Specifies the default value of property.
 * @param  {Function} type - Specifies the class type of complex object.
 * @returns {PropertyDecorator} ?
 * ```
 * @Complex<Type>({},Type)
 * propertyName: Type;
 * ```
 * @private
 */
function Complex(defaultValue, type) {
    return (target, key) => {
        const propertyDescriptor = {
            set: complexSetter(defaultValue, key, type),
            get: complexGetter(defaultValue, key, type),
            enumerable: true,
            configurable: true
        };
        //new property creation
        Object.defineProperty(target, key, propertyDescriptor);
        addPropertyCollection(target, key, 'complexProp', defaultValue, type);
    };
}
/**
 * Method used to create complex Factory property. General syntax below.
 *
 * @param  {Function} type - Specifies the class factory type of complex object.
 * @returns {PropertyDecorator} ?
 * ```
 * @ComplexFactory(defaultType, factoryFunction)
 * propertyName: Type1 | Type2;
 * ```
 * @private
 */
function ComplexFactory(type) {
    return (target, key) => {
        const propertyDescriptor = {
            set: complexFactorySetter({}, key, type),
            get: complexFactoryGetter({}, key, type),
            enumerable: true,
            configurable: true
        };
        //new property creation
        Object.defineProperty(target, key, propertyDescriptor);
        addPropertyCollection(target, key, 'complexProp', {}, type);
    };
}
/**
 * Method used to create complex array property. General syntax below.
 *
 * @param  {any} defaultValue - Specifies the default value of property.
 * @param  {Function} type - Specifies the class type of complex object.
 * @returns {PropertyDecorator} ?
 * ```
 * @Collection([], Type);
 * propertyName: Type;
 * ```
 * @private
 */
function Collection(defaultValue, type) {
    return (target, key) => {
        const propertyDescriptor = {
            set: complexArraySetter(defaultValue, key, type),
            get: complexArrayGetter(defaultValue, key, type),
            enumerable: true,
            configurable: true
        };
        //new property creation
        Object.defineProperty(target, key, propertyDescriptor);
        addPropertyCollection(target, key, 'colProp', defaultValue, type);
    };
}
/**
 * Method used to create complex factory array property. General syntax below.
 *
 * @param  {Function} type - Specifies the class type of complex object.
 * @returns {PropertyCollectionInfo} ?
 * ```
 * @Collection([], Type);
 * propertyName: Type;
 * ```
 * @private
 */
function CollectionFactory(type) {
    return (target, key) => {
        const propertyDescriptor = {
            set: complexArrayFactorySetter([], key, type),
            get: complexArrayFactoryGetter([], key, type),
            enumerable: true,
            configurable: true
        };
        //new property creation
        Object.defineProperty(target, key, propertyDescriptor);
        addPropertyCollection(target, key, 'colProp', {}, type);
    };
}
/**
 * Method used to create event property. General syntax below.
 *
 * @returns {PropertyDecorator} ?
 * ```
 * @Event(()=>{return true;})
 * ```
 * @private
 */
function Event$1() {
    return (target, key) => {
        const eventDescriptor = {
            set: function (newValue) {
                const oldValue = this.properties[`${key}`];
                if (oldValue !== newValue) {
                    const finalContext = getParentContext(this, key);
                    if (isUndefined(oldValue) === false) {
                        finalContext.context.removeEventListener(finalContext.prefix, oldValue);
                    }
                    finalContext.context.addEventListener(finalContext.prefix, newValue);
                    this.properties[`${key}`] = newValue;
                }
            },
            get: propertyGetter(undefined, key),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, eventDescriptor);
        addPropertyCollection(target, key, 'event');
    };
}
/**
 * NotifyPropertyChanges is triggers the call back when the property has been changed.
 *
 * @param {Function} classConstructor ?
 * @returns {void} ?
 * ```
 *  @NotifyPropertyChanges
 * class DemoClass implements INotifyPropertyChanged {
 *
 *     @Property()
 *     property1: string;
 *
 *     dataBind: () => void;
 *
 *     constructor() { }
 *
 *     onPropertyChanged(newProp: any, oldProp: any) {
 *         // Called when property changed
 *     }
 * }
 * ```
 * @private
 */
// eslint-disable-next-line
function NotifyPropertyChanges(classConstructor) {
    /** Need to code */
}
/**
 * Method  used to create the builderObject for the target component.
 *
 * @param {BuildInfo} target ?
 * @param {string} key ?
 * @param {string} propertyType ?
 * @param {Object} defaultValue ?
 * @param {Function} type ?
 * @returns {void} ?
 * @private
 */
function addPropertyCollection(target, key, propertyType, defaultValue, type) {
    if (isUndefined(target.propList)) {
        target.propList = {
            props: [],
            complexProps: [],
            colProps: [],
            events: [],
            propNames: [],
            complexPropNames: [],
            colPropNames: [],
            eventNames: []
        };
    }
    // eslint-disable-next-line
    target.propList[propertyType + 's'].push({
        propertyName: key,
        defaultValue: defaultValue,
        type: type
    });
    // eslint-disable-next-line
    target.propList[propertyType + 'Names'].push(key);
}
/**
 * Returns an object containing the builder properties
 *
 * @param {Function} component ?
 * @returns {Object} ?
 * @private
 */
function getBuilderProperties(component) {
    if (isUndefined(component.prototype.builderObject)) {
        component.prototype.builderObject = {
            properties: {}, propCollections: [], add: function () {
                this.isPropertyArray = true;
                this.propCollections.push(extend({}, this.properties, {}));
            }
        };
        const rex = /complex/;
        for (const key of Object.keys(component.prototype.propList)) {
            for (const prop of component.prototype.propList[`${key}`]) {
                if (rex.test(key)) {
                    component.prototype.builderObject[prop.propertyName] = function (value) {
                        const childType = {};
                        merge(childType, getBuilderProperties(prop.type));
                        value(childType);
                        let tempValue;
                        if (!childType.isPropertyArray) {
                            tempValue = extend({}, childType.properties, {});
                        }
                        else {
                            tempValue = childType.propCollections;
                        }
                        this.properties[prop.propertyName] = tempValue;
                        childType.properties = {};
                        childType.propCollections = [];
                        childType.isPropertyArray = false;
                        return this;
                    };
                }
                else {
                    component.prototype.builderObject[prop.propertyName] = function (value) {
                        this.properties[prop.propertyName] = value;
                        return this;
                    };
                }
            }
        }
    }
    return component.prototype.builderObject;
}
/**
 * Method used to create builder for the components
 *
 * @param {any} component -specifies the target component for which builder to be created.
 * @returns {Object} ?
 * @private
 */
function CreateBuilder(component) {
    const builderFunction = function (element) {
        this.element = element;
        return this;
    };
    const instanceFunction = (element) => {
        // eslint-disable-next-line
        if (!builderFunction.prototype.hasOwnProperty('create')) {
            builderFunction.prototype = getBuilderProperties(component);
            builderFunction.prototype.create = function () {
                const temp = extend({}, {}, this.properties);
                this.properties = {};
                return new component(temp, this.element);
            };
        }
        return new builderFunction(element);
    };
    return instanceFunction;
}
/**
 * Returns parent options for the object
 *
 * @param {Object} context ?
 * @param {string} prefix ?
 * @returns {ParentOption} ?
 * @private
 */
function getParentContext(context, prefix) {
    // eslint-disable-next-line
    if (context.hasOwnProperty('parentObj') === false) {
        return { context: context, prefix: prefix };
    }
    else {
        const curText = getValue('propName', context);
        if (curText) {
            prefix = curText + '-' + prefix;
        }
        return getParentContext(getValue('parentObj', context), prefix);
    }
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Animation_1;
/**
 * The Animation framework provide options to animate the html DOM elements
 * ```typescript
 *   let animeObject = new Animation({
 *      name: 'SlideLeftIn',
 *      duration: 1000
 *   });
 *   animeObject.animate('#anime1');
 *   animeObject.animate('#anime2', { duration: 500 });
 * ```
 */
let Animation = Animation_1 = class Animation extends Base {
    constructor(options) {
        super(options, undefined);
        /**
         * @private
         */
        this.easing = {
            ease: 'cubic-bezier(0.250, 0.100, 0.250, 1.000)',
            linear: 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
            easeIn: 'cubic-bezier(0.420, 0.000, 1.000, 1.000)',
            easeOut: 'cubic-bezier(0.000, 0.000, 0.580, 1.000)',
            easeInOut: 'cubic-bezier(0.420, 0.000, 0.580, 1.000)',
            elasticInOut: 'cubic-bezier(0.5,-0.58,0.38,1.81)',
            elasticIn: 'cubic-bezier(0.17,0.67,0.59,1.81)',
            elasticOut: 'cubic-bezier(0.7,-0.75,0.99,1.01)'
        };
    }
    /**
     * Applies animation to the current element.
     *
     * @param {string | HTMLElement} element - Element which needs to be animated.
     * @param {AnimationModel} options - Overriding default animation settings.
     * @returns {void} ?
     */
    animate(element, options) {
        options = !options ? {} : options;
        const model = this.getModel(options);
        if (typeof element === 'string') {
            const elements = Array.prototype.slice.call(selectAll(element, document));
            for (const element of elements) {
                model.element = element;
                Animation_1.delayAnimation(model);
            }
        }
        else {
            model.element = element;
            Animation_1.delayAnimation(model);
        }
    }
    /**
     * Stop the animation effect on animated element.
     *
     * @param {HTMLElement} element - Element which needs to be stop the animation.
     * @param {AnimationOptions} model - Handling the animation model at stop function.
     * @return {void}
     */
    static stop(element, model) {
        element.style.animation = '';
        element.removeAttribute('e-animate');
        const animationId = element.getAttribute('e-animation-id');
        if (animationId) {
            const frameId = parseInt(animationId, 10);
            cancelAnimationFrame(frameId);
            element.removeAttribute('e-animation-id');
        }
        if (model && model.end) {
            model.end.call(this, model);
        }
    }
    /**
     * Set delay to animation element
     *
     * @param {AnimationModel} model ?
     * @returns {void}
     */
    static delayAnimation(model) {
        if (animationMode === 'Disable' || animationMode === GlobalAnimationMode.Disable) {
            if (model.begin) {
                model.begin.call(this, model);
            }
            if (model.end) {
                model.end.call(this, model);
            }
        }
        else {
            if (model.delay) {
                setTimeout(() => { Animation_1.applyAnimation(model); }, model.delay);
            }
            else {
                Animation_1.applyAnimation(model);
            }
        }
    }
    /**
     * Triggers animation
     *
     * @param {AnimationModel} model ?
     * @returns {void}
     */
    static applyAnimation(model) {
        model.timeStamp = 0;
        let step = 0;
        let timerId = 0;
        let prevTimeStamp = 0;
        const duration = model.duration;
        model.element.setAttribute('e-animate', 'true');
        const startAnimation = (timeStamp) => {
            try {
                if (timeStamp) {
                    // let step: number = model.timeStamp = timeStamp - startTime;
                    /** phantomjs workaround for timestamp fix */
                    prevTimeStamp = prevTimeStamp === 0 ? timeStamp : prevTimeStamp;
                    model.timeStamp = (timeStamp + model.timeStamp) - prevTimeStamp;
                    prevTimeStamp = timeStamp;
                    /** phantomjs workaround end */
                    // trigger animation begin event
                    if (!step && model.begin) {
                        model.begin.call(this, model);
                    }
                    step = step + 1;
                    const avg = model.timeStamp / step;
                    if (model.timeStamp < duration && model.timeStamp + avg < duration && model.element.getAttribute('e-animate')) {
                        // apply animation effect to the current element
                        model.element.style.animation = model.name + ' ' + model.duration + 'ms ' + model.timingFunction;
                        if (model.progress) {
                            model.progress.call(this, model);
                        }
                        // repeat requestAnimationFrame
                        requestAnimationFrame(startAnimation);
                    }
                    else {
                        // clear requestAnimationFrame
                        cancelAnimationFrame(timerId);
                        model.element.removeAttribute('e-animation-id');
                        model.element.removeAttribute('e-animate');
                        model.element.style.animation = '';
                        if (model.end) {
                            model.end.call(this, model);
                        }
                    }
                }
                else {
                    //startTime = performance.now();
                    // set initial requestAnimationFrame
                    timerId = requestAnimationFrame(startAnimation);
                    model.element.setAttribute('e-animation-id', timerId.toString());
                }
            }
            catch (e) {
                cancelAnimationFrame(timerId);
                model.element.removeAttribute('e-animation-id');
                if (model.fail) {
                    model.fail.call(this, e);
                }
            }
        };
        startAnimation();
    }
    /**
     * Returns Animation Model
     *
     * @param {AnimationModel} options ?
     * @returns {AnimationModel} ?
     */
    getModel(options) {
        return {
            name: options.name || this.name,
            delay: options.delay || this.delay,
            duration: (options.duration !== undefined ? options.duration : this.duration),
            begin: options.begin || this.begin,
            end: options.end || this.end,
            fail: options.fail || this.fail,
            progress: options.progress || this.progress,
            timingFunction: this.easing[options.timingFunction] ? this.easing[options.timingFunction] :
                (options.timingFunction || this.easing[this.timingFunction])
        };
    }
    /**
     * @private
     * @param {AnimationModel} newProp ?
     * @param {AnimationModel} oldProp ?
     * @returns {void} ?
     */
    // eslint-disable-next-line
    onPropertyChanged(newProp, oldProp) {
        // no code needed
    }
    /**
     * Returns module name as animation
     *
     * @private
     * @returns {void} ?
     */
    getModuleName() {
        return 'animation';
    }
    /**
     *
     * @private
     * @returns {void} ?
     */
    destroy() {
        //Override base destroy;
    }
};
__decorate([
    Property('FadeIn')
], Animation.prototype, "name", void 0);
__decorate([
    Property(400)
], Animation.prototype, "duration", void 0);
__decorate([
    Property('ease')
], Animation.prototype, "timingFunction", void 0);
__decorate([
    Property(0)
], Animation.prototype, "delay", void 0);
__decorate([
    Event$1()
], Animation.prototype, "progress", void 0);
__decorate([
    Event$1()
], Animation.prototype, "begin", void 0);
__decorate([
    Event$1()
], Animation.prototype, "end", void 0);
__decorate([
    Event$1()
], Animation.prototype, "fail", void 0);
Animation = Animation_1 = __decorate([
    NotifyPropertyChanges
], Animation);
/**
 * Ripple provides material theme's wave effect when an element is clicked
 * ```html
 * <div id='ripple'></div>
 * <script>
 *   rippleEffect(document.getElementById('ripple'));
 * </script>
 * ```
 *
 * @private
 * @param {HTMLElement} element - Target element
 * @param {RippleOptions} rippleOptions - Ripple options .
 * @param {Function} done .
 * @returns {void} .
 */
function rippleEffect(element, rippleOptions, done) {
    const rippleModel = getRippleModel(rippleOptions);
    if (rippleModel.rippleFlag === false || (rippleModel.rippleFlag === undefined && !isRippleEnabled)) {
        return (() => {
            // do nothing.
        });
    }
    element.setAttribute('data-ripple', 'true');
    EventHandler.add(element, 'mousedown', rippleHandler, { parent: element, rippleOptions: rippleModel });
    EventHandler.add(element, 'mouseup', rippleUpHandler, { parent: element, rippleOptions: rippleModel, done: done });
    EventHandler.add(element, 'mouseleave', rippleLeaveHandler, { parent: element, rippleOptions: rippleModel });
    if (Browser.isPointer) {
        EventHandler.add(element, 'transitionend', rippleLeaveHandler, { parent: element, rippleOptions: rippleModel });
    }
    return (() => {
        element.removeAttribute('data-ripple');
        EventHandler.remove(element, 'mousedown', rippleHandler);
        EventHandler.remove(element, 'mouseup', rippleUpHandler);
        EventHandler.remove(element, 'mouseleave', rippleLeaveHandler);
        EventHandler.remove(element, 'transitionend', rippleLeaveHandler);
    });
}
/**
 * Handler for ripple model
 *
 * @param {RippleOptions} rippleOptions ?
 * @returns {RippleOptions} ?
 */
function getRippleModel(rippleOptions) {
    const rippleModel = {
        selector: rippleOptions && rippleOptions.selector ? rippleOptions.selector : null,
        ignore: rippleOptions && rippleOptions.ignore ? rippleOptions.ignore : null,
        rippleFlag: rippleOptions && rippleOptions.rippleFlag,
        isCenterRipple: rippleOptions && rippleOptions.isCenterRipple,
        duration: rippleOptions && rippleOptions.duration ? rippleOptions.duration : 350
    };
    return rippleModel;
}
/**
 * Handler for ripple event
 *
 * @param {MouseEvent} e ?
 * @returns {void} ?
 * @private
 */
function rippleHandler(e) {
    const target = (e.target);
    const selector = this.rippleOptions.selector;
    const element = selector ? closest(target, selector) : target;
    if (!element || (this.rippleOptions && closest(target, this.rippleOptions.ignore))) {
        return;
    }
    const offset = element.getBoundingClientRect();
    const offsetX = e.pageX - document.body.scrollLeft;
    const offsetY = e.pageY - ((!document.body.scrollTop && document.documentElement) ?
        document.documentElement.scrollTop : document.body.scrollTop);
    const pageX = Math.max(Math.abs(offsetX - offset.left), Math.abs(offsetX - offset.right));
    const pageY = Math.max(Math.abs(offsetY - offset.top), Math.abs(offsetY - offset.bottom));
    const radius = Math.sqrt(pageX * pageX + pageY * pageY);
    let diameter = radius * 2 + 'px';
    let x = offsetX - offset.left - radius;
    let y = offsetY - offset.top - radius;
    if (this.rippleOptions && this.rippleOptions.isCenterRipple) {
        x = 0;
        y = 0;
        diameter = '100%';
    }
    element.classList.add('e-ripple');
    const duration = this.rippleOptions.duration.toString();
    const styles = 'width: ' + diameter + ';height: ' + diameter + ';left: ' + x + 'px;top: ' + y + 'px;' +
        'transition-duration: ' + duration + 'ms;';
    const rippleElement = createElement('div', { className: 'e-ripple-element', styles: styles });
    element.appendChild(rippleElement);
    window.getComputedStyle(rippleElement).getPropertyValue('opacity');
    rippleElement.style.transform = 'scale(1)';
    if (element !== this.parent) {
        EventHandler.add(element, 'mouseleave', rippleLeaveHandler, { parent: this.parent, rippleOptions: this.rippleOptions });
    }
}
/**
 * Handler for ripple element mouse up event
 *
 * @param {MouseEvent} e ?
 * @returns {void} ?
 * @private
 */
function rippleUpHandler(e) {
    removeRipple(e, this);
}
/**
 * Handler for ripple element mouse move event
 *
 * @param {MouseEvent} e ?
 * @returns {void} ?
 * @private
 */
function rippleLeaveHandler(e) {
    removeRipple(e, this);
}
/**
 * Handler for removing ripple element
 *
 * @param {MouseEvent} e ?
 * @param {RippleArgs} eventArgs ?
 * @returns {void} ?
 * @private
 */
function removeRipple(e, eventArgs) {
    const duration = eventArgs.rippleOptions.duration;
    const target = (e.target);
    const selector = eventArgs.rippleOptions.selector;
    const element = selector ? closest(target, selector) : target;
    if (!element || (element && element.className.indexOf('e-ripple') === -1)) {
        return;
    }
    const rippleElements = selectAll('.e-ripple-element', element);
    const rippleElement = rippleElements[rippleElements.length - 1];
    if (rippleElement) {
        rippleElement.style.opacity = '0.5';
    }
    if (eventArgs.parent !== element) {
        EventHandler.remove(element, 'mouseleave', rippleLeaveHandler);
    }
    /* tslint:disable:align */
    setTimeout(() => {
        if (rippleElement && rippleElement.parentNode) {
            rippleElement.parentNode.removeChild(rippleElement);
        }
        if (!element.getElementsByClassName('e-ripple-element').length) {
            element.classList.remove('e-ripple');
        }
        if (eventArgs.done) {
            eventArgs.done(e);
        }
    }, duration);
}
let isRippleEnabled = false;
/**
 * Animation Module provides support to enable ripple effect functionality to Essential JS 2 components.
 *
 * @param {boolean} isRipple Specifies the boolean value to enable or disable ripple effect.
 * @returns {boolean} ?
 */
function enableRipple(isRipple) {
    isRippleEnabled = isRipple;
    return isRippleEnabled;
}
/**
 * Defines the Modes of Global animation.
 *
 * @private
 */
let animationMode;
/**
 * This method is used to enable or disable the animation for all components.
 *
 * @param {string|GlobalAnimationMode} value - Specifies the value to enable or disable the animation for all components. When set to 'enable', it enables the animation for all components, regardless of the individual component's animation settings. When set to 'disable', it disables the animation for all components, regardless of the individual component's animation settings.
 * @returns {void}
 */
function setGlobalAnimation(value) {
    animationMode = value;
}
/**
 * Defines the global animation modes for all components.
 */
var GlobalAnimationMode;
(function (GlobalAnimationMode) {
    /**
     * Defines the global animation mode as Default. Animation is enabled or disabled based on the component's animation settings.
     */
    GlobalAnimationMode["Default"] = "Default";
    /**
     * Defines the global animation mode as Enable. Enables the animation for all components, regardless of the individual component's animation settings.
     */
    GlobalAnimationMode["Enable"] = "Enable";
    /**
     * Defines the global animation mode as Disable. Disables the animation for all components, regardless of the individual component's animation settings.
     */
    GlobalAnimationMode["Disable"] = "Disable";
})(GlobalAnimationMode || (GlobalAnimationMode = {}));

/**
 * Module loading operations
 */
const MODULE_SUFFIX = 'Module';
class ModuleLoader {
    constructor(parent) {
        this.loadedModules = [];
        this.parent = parent;
    }
    /**
     * Inject required modules in component library
     *
     * @returns {void} ?
     * @param {ModuleDeclaration[]} requiredModules - Array of modules to be required
     * @param {Function[]} moduleList - Array of modules to be injected from sample side
     */
    inject(requiredModules, moduleList) {
        const reqLength = requiredModules.length;
        if (reqLength === 0) {
            this.clean();
            return;
        }
        if (this.loadedModules.length) {
            this.clearUnusedModule(requiredModules);
        }
        for (let i = 0; i < reqLength; i++) {
            const modl = requiredModules[parseInt(i.toString(), 10)];
            for (const module of moduleList) {
                const modName = modl.member;
                if (module && module.prototype.getModuleName() === modl.member && !this.isModuleLoaded(modName)) {
                    const moduleObject = createInstance(module, modl.args);
                    const memberName = this.getMemberName(modName);
                    if (modl.isProperty) {
                        setValue(memberName, module, this.parent);
                    }
                    else {
                        setValue(memberName, moduleObject, this.parent);
                    }
                    const loadedModule = modl;
                    loadedModule.member = memberName;
                    this.loadedModules.push(loadedModule);
                }
            }
        }
    }
    /**
     * To remove the created object while destroying the control
     *
     * @returns {void}
     */
    clean() {
        for (const modules of this.loadedModules) {
            if (!modules.isProperty) {
                getValue(modules.member, this.parent).destroy();
            }
        }
        this.loadedModules = [];
    }
    /**
     * Returns the array of modules that are not loaded in the component library.
     *
     * @param {ModuleDeclaration[]} requiredModules - Array of modules to be required
     * @returns {ModuleDeclaration[]} ?
     * @private
     */
    getNonInjectedModules(requiredModules) {
        return requiredModules.filter((module) => !this.isModuleLoaded(module.member));
    }
    /**
     * Removes all unused modules
     *
     * @param {ModuleDeclaration[]} moduleList ?
     * @returns {void} ?
     */
    clearUnusedModule(moduleList) {
        const usedModules = moduleList.map((arg) => { return this.getMemberName(arg.member); });
        const removableModule = this.loadedModules.filter((module) => {
            return usedModules.indexOf(module.member) === -1;
        });
        for (const mod of removableModule) {
            if (!mod.isProperty) {
                getValue(mod.member, this.parent).destroy();
            }
            this.loadedModules.splice(this.loadedModules.indexOf(mod), 1);
            deleteObject(this.parent, mod.member);
        }
    }
    /**
     * To get the name of the member.
     *
     * @param {string} name ?
     * @returns {string} ?
     */
    getMemberName(name) {
        return name[0].toLowerCase() + name.substring(1) + MODULE_SUFFIX;
    }
    /**
     * Returns boolean based on whether the module specified is loaded or not
     *
     * @param {string} modName ?
     * @returns {boolean} ?
     */
    isModuleLoaded(modName) {
        for (const mod of this.loadedModules) {
            if (mod.member === this.getMemberName(modName)) {
                return true;
            }
        }
        return false;
    }
}

/**
 * To detect the changes for inner properties.
 *
 * @private
 */
class ChildProperty {
    constructor(parent, propName, defaultValue, isArray) {
        this.isComplexArraySetter = false;
        this.properties = {};
        this.changedProperties = {};
        this.childChangedProperties = {};
        this.oldProperties = {};
        // eslint-disable-next-line
        this.finalUpdate = () => { };
        this.callChildDataBind = getValue('callChildDataBind', Base);
        this.parentObj = parent;
        this.controlParent = this.parentObj.controlParent || this.parentObj;
        this.propName = propName;
        this.isParentArray = isArray;
        this.setProperties(defaultValue, true);
    }
    /**
     * Updates the property changes
     *
     * @param {boolean} val ?
     * @param {string} propName ?
     * @returns {void} ?
     */
    updateChange(val, propName) {
        if (val === true) {
            this.parentObj.childChangedProperties[`${propName}`] = val;
        }
        else {
            delete this.parentObj.childChangedProperties[`${propName}`];
        }
        if (this.parentObj.updateChange) {
            this.parentObj.updateChange(val, this.parentObj.propName);
        }
    }
    /**
     * Updates time out duration
     *
     * @returns {void} ?
     */
    updateTimeOut() {
        if (this.parentObj.updateTimeOut) {
            this.parentObj.finalUpdate();
            this.parentObj.updateTimeOut();
        }
        else {
            const changeTime = setTimeout(this.parentObj.dataBind.bind(this.parentObj));
            const clearUpdate = () => {
                clearTimeout(changeTime);
            };
            this.finalUpdate = clearUpdate;
        }
    }
    /**
     * Clears changed properties
     *
     * @returns {void} ?
     */
    clearChanges() {
        this.finalUpdate();
        this.updateChange(false, this.propName);
        this.oldProperties = {};
        this.changedProperties = {};
    }
    /**
     * Set property changes
     *
     * @param {Object} prop ?
     * @param {boolean} muteOnChange ?
     * @returns {void} ?
     */
    setProperties(prop, muteOnChange) {
        if (muteOnChange === true) {
            merge(this, prop);
            this.updateChange(false, this.propName);
            this.clearChanges();
        }
        else {
            merge(this, prop);
        }
    }
    /**
     * Binds data
     *
     * @returns {void} ?
     */
    dataBind() {
        this.callChildDataBind(this.childChangedProperties, this);
        if (this.isParentArray) {
            const curIndex = this.parentObj[this.propName].indexOf(this);
            if (Object.keys(this.changedProperties).length) {
                setValue(this.propName + '.' + curIndex, this.changedProperties, this.parentObj.changedProperties);
                setValue(this.propName + '.' + curIndex, this.oldProperties, this.parentObj.oldProperties);
            }
        }
        else {
            this.parentObj.changedProperties[this.propName] = this.changedProperties;
            this.parentObj.oldProperties[this.propName] = this.oldProperties;
        }
        this.clearChanges();
    }
    /**
     * Saves changes to newer values
     *
     * @param {string} key ?
     * @param {Object} newValue ?
     * @param {Object} oldValue ?
     * @param {boolean} restrictServerDataBind ?
     * @returns {void} ?
     */
    saveChanges(key, newValue, oldValue, restrictServerDataBind) {
        if (this.controlParent.isProtectedOnChange) {
            return;
        }
        if (!restrictServerDataBind) {
            this.serverDataBind(key, newValue, true);
        }
        this.oldProperties[`${key}`] = oldValue;
        this.changedProperties[`${key}`] = newValue;
        this.updateChange(true, this.propName);
        this.finalUpdate();
        this.updateTimeOut();
    }
    serverDataBind(key, value, isSaveChanges, action) {
        if (isBlazor() && !this.parentObj.isComplexArraySetter) {
            let parent;
            const newChanges = {};
            const parentKey = isSaveChanges ? this.getParentKey(true) + '.' + key : key;
            /* istanbul ignore else  */
            if (parentKey.indexOf('.') !== -1) {
                const complexKeys = parentKey.split('.');
                parent = newChanges;
                for (let i = 0; i < complexKeys.length; i++) {
                    const isFinal = i === complexKeys.length - 1;
                    parent[complexKeys[parseInt(i.toString(), 10)]] = isFinal ? value : {};
                    parent = isFinal ? parent : parent[complexKeys[parseInt(i.toString(), 10)]];
                }
            }
            else {
                newChanges[`${parentKey}`] = {};
                parent = newChanges[`${parentKey}`];
                newChanges[`${parentKey}`][`${key}`] = value;
            }
            /* istanbul ignore next */
            if (this.isParentArray) {
                const actionProperty = 'ejsAction';
                parent[`${actionProperty}`] = action ? action : 'none';
            }
            this.controlParent.serverDataBind(newChanges);
        }
    }
    getParentKey(isSaveChanges) {
        // eslint-disable-next-line
        let index = '';
        let propName = this.propName;
        /* istanbul ignore next */
        if (this.isParentArray) {
            index = this.parentObj[this.propName].indexOf(this);
            let valueLength = this.parentObj[this.propName].length;
            valueLength = isSaveChanges ? valueLength : (valueLength > 0 ? valueLength - 1 : 0);
            index = index !== -1 ? '-' + index : '-' + valueLength;
            propName = propName + index;
        }
        if (this.controlParent !== this.parentObj) {
            propName = this.parentObj.getParentKey() + '.' + this.propName + index;
        }
        return propName;
    }
}

const componentList = ['grid', 'pivotview', 'treegrid', 'spreadsheet', 'rangeNavigator', 'DocumentEditor', 'listbox', 'inplaceeditor', 'PdfViewer', 'richtexteditor', 'DashboardLayout', 'chart', 'stockChart', 'circulargauge', 'diagram', 'heatmap', 'lineargauge', 'maps', 'slider', 'smithchart', 'barcode', 'sparkline', 'treemap', 'bulletChart', 'kanban', 'daterangepicker', 'schedule', 'gantt', 'signature', 'query-builder', 'drop-down-tree', 'carousel', 'filemanager', 'uploader', 'accordion', 'tab', 'treeview'];
const bypassKey = [115, 121, 110, 99, 102, 117, 115, 105,
    111, 110, 46, 105, 115, 76, 105, 99, 86, 97, 108,
    105, 100, 97, 116, 101, 100];
let accountURL;
/**
 * License validation module
 *
 * @private
 */
class LicenseValidator {
    constructor(key) {
        this.isValidated = false;
        this.isLicensed = true;
        this.version = '25';
        this.platform = /JavaScript|ASPNET|ASPNETCORE|ASPNETMVC|FileFormats|essentialstudio/i;
        this.errors = {
            noLicense: '<span>This application was built using a trial version of Syncfusion Essential Studio.' +
                ' To remove the license validation message permanently, a valid license key must be included.</span>',
            trailExpired: '<span>This application was built using a trial version of Syncfusion Essential Studio.' +
                ' To remove the license validation message permanently, a valid license key must be included.</span>',
            versionMismatched: '<span>The included Syncfusion license key is invalid.</span>',
            platformMismatched: '<span>The included Syncfusion license key is invalid.</span>',
            invalidKey: '<span>The included Syncfusion license key is invalid.</span>'
        };
        /**
         * To manage licensing operation.
         */
        this.manager = (() => {
            let licKey = null;
            /**
             * Sets the license key.
             *
             * @param {string} key - Specifies the license key.
             * @returns {void}
             */
            function set(key) { licKey = key; }
            /**
             * Gets the license key.
             *
             * @returns {string} -Gets the license key.
             */
            function get() { return licKey; }
            return {
                setKey: set,
                getKey: get
            };
        })();
        /**
         * To manage npx licensing operation.
         */
        this.npxManager = (() => {
            const npxLicKey = 'npxKeyReplace';
            /**
             * Gets the license key.
             *
             * @returns {string} - Gets the license key.
             */
            function get() { return npxLicKey; }
            return {
                getKey: get
            };
        })();
        this.manager.setKey(key);
    }
    /**
     * To validate the provided license key.
     *
     * @returns {boolean} ?
     */
    validate() {
        return this.isLicensed;
    }
    getDecryptedData(key) {
        try {
            return atob(key);
        }
        catch (error) {
            return '';
        }
    }
    /**
     * Get license information from key.
     *
     * @returns {IValidator} - Get license information from key.
     */
    getInfoFromKey() {
        try {
            let licKey = '';
            const pkey = [5439488, 7929856, 5111808, 6488064, 4587520, 7667712, 5439488,
                6881280, 5177344, 7208960, 4194304, 4456448, 6619136, 7733248, 5242880, 7077888,
                6356992, 7602176, 4587520, 7274496, 7471104, 7143424];
            let decryptedStr = [];
            const resultArray = [];
            let invalidPlatform = false;
            let isNpxKey = false;
            if (this.manager.getKey()) {
                licKey = this.manager.getKey();
            }
            else {
                isNpxKey = true;
                licKey = this.npxManager.getKey().split('npxKeyReplace')[1];
            }
            const licKeySplit = licKey.split(';');
            for (const lKey of licKeySplit) {
                const decodeStr = this.getDecryptedData(lKey);
                if (!decodeStr) {
                    continue;
                }
                let k = 0;
                let buffr = '';
                if (!isNpxKey) {
                    for (let i = 0; i < decodeStr.length; i++, k++) {
                        if (k === pkey.length) {
                            k = 0;
                        }
                        const c = decodeStr.charCodeAt(i);
                        buffr += String.fromCharCode(c ^ (pkey[parseInt(k.toString(), 10)] >> 16));
                    }
                }
                else {
                    const charKey = decodeStr[decodeStr.length - 1];
                    const decryptedKey = [];
                    for (let i = 0; i < decodeStr.length; i++) {
                        decryptedKey[`${i}`] = decodeStr[`${i}`].charCodeAt(0) - charKey.charCodeAt(0);
                    }
                    for (let i = 0; i < decryptedKey.length; i++) {
                        buffr += String.fromCharCode(decryptedKey[parseInt(i.toString(), 10)]);
                    }
                }
                if (this.platform.test(buffr)) {
                    decryptedStr = buffr.split(';');
                    invalidPlatform = false;
                    // checked the length to verify the key in proper strucutre
                    if (decryptedStr.length > 3) {
                        resultArray.push({ platform: decryptedStr[0],
                            version: decryptedStr[1],
                            expiryDate: decryptedStr[2] });
                    }
                }
                else if (buffr && buffr.split(';').length > 3) {
                    invalidPlatform = true;
                }
            }
            if (invalidPlatform && !resultArray.length) {
                return [{ invalidPlatform: invalidPlatform }];
            }
            else {
                return resultArray.length ? resultArray : null;
            }
        }
        catch (error) {
            return null;
        }
    }
}
let licenseValidator = new LicenseValidator();
/**
 * Converts the given number to characters.
 *
 * @param {number} cArr - Specifies the license key as number.
 * @returns {string} ?
 */
function convertToChar(cArr) {
    let ret = '';
    for (const arr of cArr) {
        ret += String.fromCharCode(arr);
    }
    return ret;
}
/**
 * To set license key.
 *
 * @param {string} key - license key
 * @returns {void}
 */
function registerLicense(key) {
    licenseValidator = new LicenseValidator(key);
}
const validateLicense = (key) => {
    if (key) {
        registerLicense(key);
    }
    return licenseValidator.validate();
};
const getVersion = () => {
    return licenseValidator.version;
};
// Method for create overlay over the sample
const createLicenseOverlay = () => {
    const bannerTemplate = `
    <div style="
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99999;
    ">
        <div style="
    background: #FFFFFF;
    height: 455px;
    width: 840px;
    font-family: Helvetica Neue, Helvetica, Arial;
    color: #000000;
    box-shadow: 0px 4.8px 14.4px rgb(0 0 0 / 18%), 0px 25.6px 57.6px rgb(0 0 0 / 22%);
    display: block;
    margin: 8% auto;
    border-radius: 20px;
    ">
            <div style="
    position: absolute;
width: 838px;
height: 62px;
background-color: #F9F9F9;
border: 1px solid #EEEEEE;
border-top-left-radius: 20px;
border-top-right-radius: 20px;
">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ2IiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTQ2IDMyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNDAuNTk2NSAxNS4wMDc4SDMyLjQyNUMzMS41NTU3IDE1LjAwNzggMzAuOTAzNyAxNS4xODEyIDMwLjUxMjUgMTUuNDg0NkMzMC4xMjEzIDE1LjgzMTQgMjkuOTA0IDE2LjMwODIgMjkuOTA0IDE3LjA0NTFDMjkuOTA0IDE3LjYwODYgMzAuMDc3OCAxOC4wNDIxIDMwLjQyNTYgMTguMzAyMkMzMC43NzMzIDE4LjYwNTYgMzEuMjk0OSAxOC43MzU2IDMxLjk5MDMgMTguNzM1NkgzNi4zMzY5QzM4LjExODkgMTguNzM1NiAzOS40MjI5IDE5LjA4MjQgNDAuMTYxOCAxOS43MzI2QzQwLjk0NDIgMjAuNDI2MiA0MS4yOTE5IDIxLjU1MzIgNDEuMjkxOSAyMy4xMTM3QzQxLjI5MTkgMjQuNzE3NiA0MC44NTcyIDI1Ljg4OCAzOS45ODc5IDI2LjY2ODJDMzkuMTE4NiAyNy40MDUxIDM3LjcyNzcgMjcuNzk1MyAzNS44NTg3IDI3Ljc5NTNIMjcuMDc4N1YyNS4wMjFIMzUuMzM3MkMzNi4yOTM0IDI1LjAyMSAzNi45NDU0IDI0Ljg5MSAzNy4zMzY2IDI0LjYzMDlDMzcuNzI3NyAyNC4zNzA4IDM3LjkwMTYgMjMuODk0IDM3LjkwMTYgMjMuMjg3MUMzNy45MDE2IDIyLjYzNjkgMzcuNzI3NyAyMi4xNjAxIDM3LjM4IDIxLjlDMzcuMDMyMyAyMS42Mzk5IDM2LjQyMzggMjEuNDY2NSAzNS41NTQ1IDIxLjQ2NjVIMzEuNjQyNkMyOS44NjA1IDIxLjQ2NjUgMjguNTEzMSAyMS4xMTk4IDI3LjY4NzMgMjAuMzgyOEMyNi44NjE0IDE5LjY0NTkgMjYuNDI2OCAxOC41MTg5IDI2LjQyNjggMTcuMDAxN0MyNi40MjY4IDE1LjM1NDUgMjYuODYxNCAxNC4xNDA4IDI3LjczMDcgMTMuMzYwNkMyOC42IDEyLjU4MDMgMjkuOTkwOSAxMi4yMzM1IDMxLjkwMzQgMTIuMjMzNUg0MC41OTY1VjE1LjAwNzhaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik00OC4wNzI3IDI1LjI4MTFINTAuNTA2OFYxNi4zOTQ5SDUzLjU0OTNWMjcuNTM1MkM1My41NDkzIDI5LjA1MjQgNTMuMjAxNiAzMC4xNzk0IDUyLjUwNjIgMzAuOTE2M0M1MS44MTA3IDMxLjY1MzIgNTAuNzI0MSAzMiA0OS4yNDYzIDMySDQzLjMzNVYyOS42NTkySDQ4LjcyNDdDNDkuMjg5NyAyOS42NTkyIDQ5Ljc2NzkgMjkuNTI5MiA1MC4wNzIxIDI5LjIyNThDNTAuMzc2NCAyOC45NjU3IDUwLjU1MDIgMjguNTMyMiA1MC41NTAyIDI4LjAxMlYyNy44Mzg2SDQ3Ljg5ODlDNDYuMjAzNyAyNy44Mzg2IDQ0Ljk0MzIgMjcuNDkxOSA0NC4yNDc4IDI2Ljg0MTZDNDMuNTA4OSAyNi4xNDgxIDQzLjE2MTEgMjUuMDY0NCA0My4xNjExIDIzLjQ2MDVWMTYuMzk0OUg0Ni4xNjAyVjIzLjIwMDVDNDYuMTYwMiAyNC4wNjc0IDQ2LjI5MDYgMjQuNjMwOSA0Ni41NTE0IDI0Ljg5MUM0Ni43MjUzIDI1LjE1MTEgNDcuMjQ2OSAyNS4yODExIDQ4LjA3MjcgMjUuMjgxMVoiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTU1Ljg5NjUgMTYuMzk0OUg2MS41OTA0QzYzLjMyOTEgMTYuMzk0OSA2NC41NDYxIDE2LjY5ODMgNjUuMjg1IDE3LjM0ODVDNjYuMDIzOSAxNy45OTg4IDY2LjM3MTYgMTkuMDgyNCA2Ni4zNzE2IDIwLjU1NjNWMjcuNzk1M0g2My4zMjkxVjIwLjk0NjRDNjMuMzI5MSAyMC4wNzk0IDYzLjE5ODcgMTkuNTE1OSA2Mi45Mzc5IDE5LjI5OTJDNjIuNjc3MSAxOS4wMzkxIDYyLjE1NTUgMTguOTA5MSA2MS4zMjk3IDE4LjkwOTFINTguODk1NlYyNy44Mzg2SDU1Ljg1M1YxNi4zOTQ5SDU1Ljg5NjVaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik03NC45MzQyIDI1LjM2NzhINzguMTUwNlYyNy43OTUySDc0LjAyMTRDNzIuOTc4MiAyNy43OTUyIDcyLjEwODkgMjcuNjY1MiA3MS40NTcgMjcuNDkxOEM3MC44MDUgMjcuMjc1IDcwLjE5NjUgMjYuOTI4MyA2OS43MTgzIDI2LjQ1MTRDNjkuMTk2OCAyNS45MzEzIDY4Ljc2MjEgMjUuMjgxMSA2OC40NTc4IDI0LjU0NDJDNjguMTUzNiAyMy44MDcyIDY4LjAyMzIgMjIuOTgzNiA2OC4wMjMyIDIyLjE2QzY4LjAyMzIgMjEuMjkzMSA2OC4xNTM2IDIwLjQ2OTUgNjguNDU3OCAxOS42ODkyQzY4Ljc2MjEgMTguOTA5IDY5LjE1MzMgMTguMzAyMSA2OS43MTgzIDE3Ljc4MTlDNzAuMjM5OSAxNy4zMDUxIDcwLjgwNSAxNi45NTgzIDcxLjUwMDQgMTYuNzQxNkM3Mi4xOTU5IDE2LjUyNDkgNzMuMDIxNyAxNi40MzgyIDc0LjA2NDkgMTYuNDM4Mkg3OC4xOTQxVjE4LjkwOUg3NC45MzQyQzczLjQ5OTggMTguOTA5IDcyLjU0MzYgMTkuMTY5MSA3MS45Nzg1IDE5LjY0NTlDNzEuNDU2OSAyMC4xMjI3IDcxLjE1MjcgMjAuOTg5NyA3MS4xNTI3IDIyLjIwMzRDNzEuMTUyNyAyMi44OTY5IDcxLjI4MzEgMjMuNDYwNSA3MS41MDA0IDIzLjkzNzNDNzEuNzE3NyAyNC40MTQxIDcyLjA2NTUgMjQuNzYwOSA3Mi41MDAxIDI1LjA2NDNDNzIuNzE3NCAyNS4xOTQ0IDcyLjk3ODIgMjUuMjgxMSA3My4yODI1IDI1LjM2NzhDNzMuNjMwMiAyNS4zMjQ0IDc0LjE1MTggMjUuMzY3OCA3NC45MzQyIDI1LjM2NzhaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik04MC44NDU2IDE4LjY0ODlINzguNjcyNFYxNi4zNTE1SDgwLjg0NTZWMTUuMTgxMUM4MC44NDU2IDE0LjAxMDggODEuMDYzIDEzLjIzMDUgODEuNDk3NiAxMi44NDA0QzgxLjkzMjMgMTIuNDUwMyA4Mi43NTgxIDEyLjIzMzUgODMuOTc1MSAxMi4yMzM1SDg2Ljg0MzhWMTQuNDAwOUg4NS40MDk1Qzg0Ljg4NzkgMTQuNDAwOSA4NC41NDAyIDE0LjQ4NzYgODQuMzIyOSAxNC42NjFDODQuMTA1NSAxNC44MzQ0IDgzLjk3NTEgMTUuMDk0NSA4My45NzUxIDE1LjQ0MTJWMTYuMzUxNUg4Ni44NDM4VjE4LjY0ODlIODMuOTc1MVYyNy43OTUzSDgwLjg0NTZWMTguNjQ4OVoiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTk4LjQwNTYgMjcuNzk1M0g5Mi43MTE2QzkxLjAxNjUgMjcuNzk1MyA4OS44NDI5IDI3LjQ0ODUgODkuMDYwNSAyNi43OTgzQzg4LjMyMTYgMjYuMTQ4MSA4Ny45MzA0IDI1LjA2NDQgODcuOTMwNCAyMy41OTA2VjE2LjM5NDlIOTAuOTI5NVYyMy40MTcyQzkwLjkyOTUgMjQuMTk3NCA5MS4wNTk5IDI0LjY3NDMgOTEuMzIwNyAyNC45MzQ0QzkxLjU4MTUgMjUuMTk0NCA5Mi4xMDMxIDI1LjMyNDUgOTIuOTI4OSAyNS4zMjQ1SDk1LjM2M1YxNi4zOTQ5SDk4LjQwNTZWMjcuNzk1M1oiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTEwMC42MjIgMjUuNDExMkgxMDcuMDExQzEwNy41NzcgMjUuNDExMiAxMDguMDExIDI1LjMyNDUgMTA4LjI3MiAyNS4xNTExQzEwOC41MzMgMjQuOTc3NyAxMDguNjYzIDI0LjY3NDMgMTA4LjY2MyAyNC4zMjc1QzEwOC42NjMgMjMuOTM3NCAxMDguNTMzIDIzLjY3NzMgMTA4LjI3MiAyMy40NjA1QzEwOC4wMTEgMjMuMjg3MSAxMDcuNTc3IDIzLjIwMDUgMTA3LjA1NSAyMy4yMDA1SDEwNC40NDdDMTAyLjg4MiAyMy4yMDA1IDEwMS44MzkgMjIuOTgzNyAxMDEuMzE4IDIyLjUwNjlDMTAwLjc1MiAyMi4wMzAxIDEwMC40OTIgMjEuMjA2NSAxMDAuNDkyIDE5Ljk5MjdDMTAwLjQ5MiAxOC43NzkgMTAwLjgzOSAxNy44Njg3IDEwMS40OTEgMTcuMjYxOEMxMDIuMTQzIDE2LjY5ODMgMTAzLjE4NyAxNi4zOTQ5IDEwNC41MzQgMTYuMzk0OUgxMTEuMDU0VjE4Ljc3OUgxMDUuNzA4QzEwNC44MzggMTguNzc5IDEwNC4yNzMgMTguODY1NyAxMDQuMDEyIDE4Ljk5NTdDMTAzLjc1MiAxOS4xNjkxIDEwMy42MjEgMTkuNDI5MiAxMDMuNjIxIDE5LjgxOTRDMTAzLjYyMSAyMC4xNjYxIDEwMy43NTIgMjAuNDI2MiAxMDMuOTY5IDIwLjU5OTZDMTA0LjE4NiAyMC43NzMgMTA0LjU3NyAyMC44NTk3IDEwNS4wNTYgMjAuODU5N0gxMDcuNzk0QzEwOS4wNTQgMjAuODU5NyAxMTAuMDExIDIxLjE2MzEgMTEwLjY2MyAyMS43MjY2QzExMS4zMTUgMjIuMjkwMiAxMTEuNjYyIDIzLjE1NzEgMTExLjY2MiAyNC4yNDA4QzExMS42NjIgMjUuMjgxMSAxMTEuMzU4IDI2LjE0ODEgMTEwLjc5MyAyNi43OTgzQzExMC4yMjggMjcuNDQ4NSAxMDkuNDQ2IDI3Ljc5NTMgMTA4LjUzMyAyNy43OTUzSDEwMC43MDlWMjUuNDExMkgxMDAuNjIyWiIgZmlsbD0iIzM1NDNBOCIvPgo8cGF0aCBkPSJNMTE2LjU3NCAxNS4wOTQ0SDExMy40MDFWMTIuMjc2OUgxMTYuNTc0VjE1LjA5NDRaTTExNi41NzQgMjcuNzk1M0gxMTMuNDAxVjE2LjM5NDlIMTE2LjU3NFYyNy43OTUzWiIgZmlsbD0iIzM1NDNBOCIvPgo8cGF0aCBkPSJNMTMwLjMwOSAyMi4xMTY3QzEzMC4zMDkgMjMuODkzOSAxMjkuNzQ0IDI1LjMyNDQgMTI4LjY1NyAyNi40MDgxQzEyNy41NzEgMjcuNDkxOCAxMjYuMDkzIDI4LjAxMiAxMjQuMjI0IDI4LjAxMkMxMjIuMzU1IDI4LjAxMiAxMjAuODc3IDI3LjQ5MTggMTE5Ljc5IDI2LjQwODFDMTE4LjcwNCAyNS4zMjQ0IDExOC4xMzkgMjMuODkzOSAxMTguMTM5IDIyLjExNjdDMTE4LjEzOSAyMC4zMzk0IDExOC43MDQgMTguOTA5IDExOS43OSAxNy44MjUzQzEyMC44NzcgMTYuNzQxNiAxMjIuMzk4IDE2LjIyMTQgMTI0LjIyNCAxNi4yMjE0QzEyNi4wNDkgMTYuMjIxNCAxMjcuNTI3IDE2Ljc0MTYgMTI4LjY1NyAxNy44MjUzQzEyOS43NDQgMTguODY1NiAxMzAuMzA5IDIwLjI5NjEgMTMwLjMwOSAyMi4xMTY3Wk0xMjEuMjY4IDIyLjExNjdDMTIxLjI2OCAyMy4yMDA0IDEyMS41MjkgMjQuMDY3MyAxMjIuMDUxIDI0LjY3NDJDMTIyLjU3MiAyNS4yODExIDEyMy4yNjggMjUuNTg0NSAxMjQuMTggMjUuNTg0NUMxMjUuMDkzIDI1LjU4NDUgMTI1Ljc4OSAyNS4yODExIDEyNi4zMSAyNC42NzQyQzEyNi44MzIgMjQuMDY3MyAxMjcuMDkzIDIzLjIwMDQgMTI3LjA5MyAyMi4xMTY3QzEyNy4wOTMgMjEuMDMzIDEyNi44MzIgMjAuMTY2MSAxMjYuMzEgMTkuNjAyNUMxMjUuNzg5IDE4Ljk5NTcgMTI1LjA5MyAxOC42OTIyIDEyNC4xMzcgMTguNjkyMkMxMjMuMjI0IDE4LjY5MjIgMTIyLjUyOSAxOC45OTU3IDEyMi4wMDcgMTkuNjAyNUMxMjEuNTI5IDIwLjE2NjEgMTIxLjI2OCAyMS4wMzMgMTIxLjI2OCAyMi4xMTY3WiIgZmlsbD0iIzM1NDNBOCIvPgo8cGF0aCBkPSJNMTMxLjc4NyAxNi4zOTQ5SDEzNy40ODFDMTM5LjIxOSAxNi4zOTQ5IDE0MC40MzYgMTYuNjk4MyAxNDEuMTc1IDE3LjM0ODVDMTQxLjkxNCAxNy45OTg4IDE0Mi4yNjIgMTkuMDgyNCAxNDIuMjYyIDIwLjU1NjNWMjcuNzk1M0gxMzkuMjE5VjIwLjk0NjRDMTM5LjIxOSAyMC4wNzk0IDEzOS4wODkgMTkuNTE1OSAxMzguODI4IDE5LjI5OTJDMTM4LjU2NyAxOS4wMzkxIDEzOC4wNDYgMTguOTA5MSAxMzcuMjIgMTguOTA5MUgxMzQuNzg2VjI3LjgzODZIMTMxLjc0M1YxNi4zOTQ5SDEzMS43ODdaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik03LjEyODMxIDMuNzM3NDNIMFYxMC44NDY0SDcuMTI4MzFWMy43Mzc0M1oiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTIzLjI1MTMgLTIuMTU3MjVlLTA1TDE4LjU1MTMgNS41MTY4NUwyNC4wODMxIDEwLjIwNDFMMjguNzgzMSA0LjY4NzI1TDIzLjI1MTMgLTIuMTU3MjVlLTA1WiIgZmlsbD0iI0ZGODYwMCIvPgo8cGF0aCBkPSJNMTUuNjA0MSAzLjczNzQzSDguNDc1ODNWMTAuODQ2NEgxNS42MDQxVjMuNzM3NDNaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik03LjEyODMxIDEyLjE5MDJIMFYxOS4yOTkySDcuMTI4MzFWMTIuMTkwMloiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTE1LjYwNDEgMTIuMTkwMkg4LjQ3NTgzVjE5LjI5OTJIMTUuNjA0MVYxMi4xOTAyWiIgZmlsbD0iIzM1NDNBOCIvPgo8cGF0aCBkPSJNMjQuMDc5NyAxMi4xOTAySDE2Ljk1MTRWMTkuMjk5MkgyNC4wNzk3VjEyLjE5MDJaIiBmaWxsPSIjRkY4NjAwIi8+CjxwYXRoIGQ9Ik03LjEyODMxIDIwLjY4NjNIMFYyNy43OTUzSDcuMTI4MzFWMjAuNjg2M1oiIGZpbGw9IiMzNTQzQTgiLz4KPHBhdGggZD0iTTE1LjYwNDEgMjAuNjg2M0g4LjQ3NTgzVjI3Ljc5NTNIMTUuNjA0MVYyMC42ODYzWiIgZmlsbD0iIzM1NDNBOCIvPgo8cGF0aCBkPSJNMjQuMTIzMiAyMC42ODYzSDE2Ljk5NDlWMjcuNzk1M0gyNC4xMjMyVjIwLjY4NjNaIiBmaWxsPSIjMzU0M0E4Ii8+CjxwYXRoIGQ9Ik0xNDYgMTUuODMxM0MxNDYgMTYuODcxNyAxNDUuMTc0IDE3LjY5NTMgMTQ0LjEzMSAxNy42OTUzQzE0My4wODggMTcuNjk1MyAxNDIuMjYyIDE2Ljg3MTcgMTQyLjI2MiAxNS44MzEzQzE0Mi4yNjIgMTQuNzkxIDE0My4wODggMTQuMDEwNyAxNDQuMTMxIDE0LjAxMDdDMTQ1LjEzMSAxMy45Njc0IDE0NiAxNC43OTEgMTQ2IDE1LjgzMTNaTTE0Mi45NTcgMTQuNzkxQzE0Mi42OTcgMTUuMDUxMSAxNDIuNTY2IDE1LjQ0MTIgMTQyLjU2NiAxNS44MzEzQzE0Mi41NjYgMTYuNjk4MyAxNDMuMjYyIDE3LjM5MTggMTQ0LjEzMSAxNy4zOTE4QzE0NSAxNy4zOTE4IDE0NS42OTYgMTYuNjk4MyAxNDUuNjk2IDE1LjgzMTNDMTQ1LjY5NiAxNS4wMDc3IDE0NSAxNC4yNzA4IDE0NC4xNzQgMTQuMjcwOEMxNDMuNjUzIDE0LjI3MDggMTQzLjI2MiAxNC40NDQyIDE0Mi45NTcgMTQuNzkxWk0xNDQuODcgMTYuOTE1SDE0NC40NzlMMTQzLjkxNCAxNi4wOTE0VjE2LjkxNUgxNDMuNjA5VjE0Ljc0NzZIMTQzLjk1N0MxNDQuNDM1IDE0Ljc0NzYgMTQ0LjY1MyAxNC45NjQ0IDE0NC42NTMgMTUuMzU0NUMxNDQuNjUzIDE1LjY1NzkgMTQ0LjQ3OSAxNS44NzQ3IDE0NC4xNzQgMTUuOTYxNEwxNDQuODcgMTYuOTE1Wk0xNDQuMDQ0IDE1LjY1NzlDMTQ0LjI2MSAxNS42NTc5IDE0NC4zOTIgMTUuNTI3OSAxNDQuMzkyIDE1LjM1NDVDMTQ0LjM5MiAxNS4xMzc4IDE0NC4yNjEgMTUuMDUxMSAxNDQuMDAxIDE1LjA1MTFIMTQzLjkxNFYxNS42NTc5SDE0NC4wNDRaIiBmaWxsPSIjMzU0M0E4Ii8+Cjwvc3ZnPgo=" style="
    text-align: left;
    width: 146px;
    position: absolute;
    top: 14px;
    left: 31px;
">
            </div>
            <div style="
    position: relative;
    top: 80px;
    left: 32px;
    font-size: 20px;
    text-align: left;
    font-weight: 700;
    letter-spacing: 0.02em;
    font-style: normal;
    line-height: 125%;
    ">Claim your FREE account and get a key in less than a minute</div>
            <ul style="
        font-size: 15px;
        font-weight: 400;
        color: #333333;
        letter-spacing: 0.01em;
        position: relative;
        left: 32px;
        top: 88px;
        line-height: 180%;
        ">
                <li><span>Access to a 30-day free trial of any of our products.</span></li>
                <li><span>Access to 24x5 support by developers via the <a href="https://support.syncfusion.com/create?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information" style="text-decoration: none;
                color: #0D6EFD;
                font-weight: 500;">support tickets</a>, <a href="https://www.syncfusion.com/forums?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information" style="text-decoration: none;
                color: #0D6EFD;
                font-weight: 500;">forum</a>, <a href="https://www.syncfusion.com/feedback?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information
                " style="text-decoration: none;
                color: #0D6EFD;
                font-weight: 500;">feature &amp; feedback page</a> and chat.</span></li>
                <li><span>200+ <a href="https://www.syncfusion.com/succinctly-free-ebooks?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information" style="text-decoration: none;
                color: #0D6EFD;
                font-weight: 500;">ebooks </a>on the latest technologies, industry trends, and research topics.</span>
                </li>
                <li><span>Largest collection of over 7,000 flat and wireframe icons for free with Syncfusion <a href="https://www.syncfusion.com/downloads/metrostudio?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information
                " style="text-decoration: none;
                color: #0D6EFD;
                font-weight: 500;">Metro Studio.</a></span></li>
                <li><span>Free and unlimited access to Syncfusion technical <a href="https://www.syncfusion.com/blogs/?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information
                " style="text-decoration: none;
                color: #0D6EFD;
                font-weight: 500;">blogs</a> and <a href="https://www.syncfusion.com/resources/techportal/whitepapers?utm_source=es_license_validation_banner&utm_medium=listing&utm_campaign=license-information" style="text-decoration: none;
                color: #0D6EFD;
                font-weight: 500;">whitepapers.</a></span></li>
            </ul>
            <div style="
            font-size: 18px;
            font-weight: 700;
            position: relative;
            line-height: 125%;
            letter-spacing: 0.02em;
            top: 90px;
            left: 32px;
    ">Syncfusion is trusted by 29,000+ businesses worldwide</div>
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODIwIiBoZWlnaHQ9IjU2IiB2aWV3Qm94PSIwIDAgODIwIDU2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MjcuNjE3IDIyLjU2NTlWMjQuNzIyNkM0MjYuNTU4IDI0LjM2MzggNDI1LjM5OCAyNC4xNTQ0IDQyNC40NzQgMjQuMTU0NEM0MjMuMzMzIDI0LjE1NDQgNDIyLjY5OCAyNC40OTEyIDQyMi42OTggMjUuMDk2M0M0MjIuNjk4IDI1LjQ4MjQgNDIyLjk3NiAyNS43MzgzIDQyMy43NzMgMjYuMDg1NEw0MjUuOTE3IDI3LjAxNzRDNDI3LjYzMyAyNy43NjM5IDQyOC40OTcgMjguODUzIDQyOC40OTcgMzAuMjY4MUM0MjguNDk3IDMyLjQ1MjIgNDI2LjU0NiAzMy44MyA0MjMuNDUyIDMzLjgzQzQyMi4zMjQgMzMuODMgNDIxLjAxOCAzMy42NzM2IDQxOS42MzYgMzMuMzcwOVYzMS4xNDE2QzQyMS4wMDYgMzEuNTAyOCA0MjIuMjYyIDMxLjY5NTcgNDIzLjIzOSAzMS42OTU3QzQyNC41MTggMzEuNjk1NyA0MjUuMjAzIDMxLjM1MDYgNDI1LjIwMyAzMC43MDc0QzQyNS4yMDMgMzAuMzIwOCA0MjQuOTM1IDMwLjAzNjcgNDI0LjMyMiAyOS43NzE3TDQyMS45NzUgMjguNzU5M0M0MjAuMjM2IDI4LjAwNzggNDE5LjQzMyAyNi45OTU0IDQxOS40MzMgMjUuNTUyMUM0MTkuNDMzIDIzLjQ4MzcgNDIxLjMxNCAyMi4xNjQ5IDQyNC4yNjUgMjIuMTY0OUM0MjUuMjk4IDIyLjE2NDkgNDI2LjU3IDIyLjMxNzEgNDI3LjYxNyAyMi41NjU5VjIyLjU2NTlaTTQzMC4xNjcgMjIuMzkwOUg0MzMuNjM1VjMzLjYwMzlINDMwLjE2N1YyMi4zOTA5Wk00NDQuOTExIDIyLjM5MDlWMjQuNDQ1MUg0MzkuNjc1VjI2Ljk3NDJINDQ0LjI0OVYyOC44MzIzSDQzOS42NzVWMzEuNDU0M0g0NDQuOTc4VjMzLjYwMzlINDM2LjMwNVYyMi4zOTA5SDQ0NC45MTFaTTQ2MS4yOTQgMjIuMzkwOVYzMy42MDM5SDQ1Ny45MzlWMjYuMjIzNkw0NTQuNjUyIDMzLjY5MTVINDUyLjUzMUw0NDkuMjY2IDI2LjIyMzZWMzMuNjAzOUg0NDYuOTQ5VjIyLjM5MDlINDUxLjE4NEw0NTQuMTc4IDI5LjIxMTRMNDU3LjE1NiAyMi4zOTA5SDQ2MS4yOTRWMjIuMzkwOVpNNDcyLjU3OSAyMi4zOTA5VjI0LjQ0NTFINDY3LjMzNVYyNi45NzQySDQ3MS45MDhWMjguODMyM0g0NjcuMzM1VjMxLjQ1NDNINDcyLjYzOFYzMy42MDM5SDQ2My45NTdWMjIuMzkwOUg0NzIuNTc5Wk00ODQuNzk0IDIyLjM5MDlWMzMuNjAzOUg0ODEuMDkzTDQ3Ni45MjYgMjYuNDEyM1YzMy42MDM5SDQ3NC42MDhWMjIuMzkwOUg0NzguNDA3TDQ4Mi40ODQgMjkuNDg3NlYyMi4zOTA5SDQ4NC43OTRaTTQ5NC44NTggMjIuNTY1OVYyNC43MjI2QzQ5My44MDcgMjQuMzY2MyA0OTIuNjQgMjQuMTU0NCA0OTEuNzMyIDI0LjE1NDRDNDkwLjU3MyAyNC4xNTQ0IDQ4OS45MzkgMjQuNDg1OCA0ODkuOTM5IDI1LjA5M0M0ODkuOTM5IDI1LjQ4ODYgNDkwLjE5OCAyNS43MjUgNDkxLjAyMyAyNi4wODU5TDQ5My4xNTcgMjcuMDE3OEM0OTQuODg1IDI3Ljc3MjIgNDk1LjczOSAyOC44NTE4IDQ5NS43MzkgMzAuMjgzNUM0OTUuNzM5IDMyLjQ1NTkgNDkzLjc4NiAzMy44MzA4IDQ5MC42OTkgMzMuODMwOEM0ODkuNTY5IDMzLjgzMDggNDg4LjI1OSAzMy42NzM2IDQ4Ni44NzggMzMuMzcxN1YzMS4xNDI0QzQ4OC4yNDcgMzEuNTAyOCA0ODkuNDk5IDMxLjY5NjUgNDkwLjQ3IDMxLjY5NjVDNDkxLjc0IDMxLjY5NjUgNDkyLjQ0NCAzMS4zNTE1IDQ5Mi40NDQgMzAuNzI4NUM0OTIuNDQ0IDMwLjMxNjMgNDkyLjE5NyAzMC4wNTA0IDQ5MS41NTUgMjkuNzcyNUw0ODkuMjE4IDI4Ljc2MDFDNDg3LjQ2NyAyOC4wMDI4IDQ4Ni42NzQgMjcuMDAyIDQ4Ni42NzQgMjUuNTUzM0M0ODYuNjc0IDIzLjQ4NjIgNDg4LjU1NiAyMi4xNjY1IDQ5MS41IDIyLjE2NjVDNDkyLjUzNiAyMi4xNjUzIDQ5My44MTMgMjIuMzE3MSA0OTQuODU4IDIyLjU2NTlWMjIuNTY1OVoiIGZpbGw9IiMwMEEwQjAiLz4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzUyLjQxMyAyNi44MTlDMzUwLjk5MiAyNS4yNzU5IDM0OS42MzggMjMuODMxNSAzNDguMzQ5IDIyLjE1NzRMMzQ3LjkyIDIxLjU5OTVDMzQ5LjQwNiAyMS4zNjkzIDM1MC42OTUgMjAuMzg0OCAzNTAuNjk1IDE4Ljc0MzNDMzUwLjY5NSAxNy4yMzMxIDM0OS41MzkgMTYuMjQ4MiAzNDcuODIxIDE2LjI0ODJDMzQ2LjU5OCAxNi4yNDgyIDM0NS43MDYgMTYuMzEzNyAzNDUuMjQzIDE2LjMxMzdDMzQ0LjcxNSAxNi4zMTM3IDM0NC4yODUgMTYuMzEzNyAzNDMuNzkgMTYuMjgwOEMzNDMuODU2IDE4LjE1MjEgMzQzLjg4OSAxOC4yODM0IDM0My44ODkgMTkuNDMyMlYyMy42MzQzQzM0My44ODkgMjQuNDU1MyAzNDMuODU2IDI1LjI3NTkgMzQzLjc5IDI2LjgxODZDMzQ0LjE1MyAyNi43MjAyIDM0NC41MTcgMjYuNzIwMiAzNDQuNzgxIDI2LjcyMDJDMzQ1LjA0NSAyNi43MjAyIDM0NS40MDkgMjYuNzUzMSAzNDUuNzA2IDI2LjgxODZDMzQ1LjY0IDI1Ljc2NzkgMzQ1LjYwNyAyNC4wMjgzIDM0NS42MDcgMjMuNjM0M1YyMS4yMDUxQzM0Ny4xNiAyMy4yMDc3IDM0OS4yMDkgMjUuNjY5NSAzNTAuMDAxIDI2LjgxODZDMzUwLjM5OCAyNi43MjAyIDM1MC43MjggMjYuNzIwMiAzNTEuMTI0IDI2LjcyMDJDMzUxLjQ1NSAyNi43MjA2IDM1MS45MTggMjYuNzIwNiAzNTIuNDEzIDI2LjgxOVYyNi44MTlaTTM0OC44NzggMTkuMDA2QzM0OC44NzggMjAuMDIzNCAzNDguMzE3IDIxLjIwNTQgMzQ2Ljc5NyAyMS4yMDU0QzM0Ni40IDIxLjIwNTQgMzQ2LjAwMyAyMS4yMDU0IDM0NS42MDcgMjEuMTcyNVYxNy4wNjg4QzM0Ni4wMDMgMTYuOTcwNCAzNDYuNDk5IDE2LjkwNDYgMzQ2Ljc2MyAxNi45MDQ2QzM0OC4wODUgMTYuOTA0OSAzNDguODc4IDE3LjY2IDM0OC44NzggMTkuMDA2VjE5LjAwNlpNMzgyLjM4IDI2Ljg4NDVDMzgxLjgxOSAyNi4yOTM2IDM4MC45NiAyNS4zNDE3IDM4MC4xMzQgMjQuNDIyM0MzODAuODI4IDIzLjY2NzIgMzgxLjU1NSAyMi41NTEgMzgxLjk4NCAyMS41OTkxQzM4MS43MTkgMjEuNDY3OCAzODEuMzU2IDIxLjIwNTEgMzgxLjA5MiAyMC45NzUzQzM4MC45OTMgMjEuNzk1OSAzODAuNDMyIDIyLjg3OTIgMzc5LjYzOSAyMy44MzE1QzM3OC41MTUgMjIuNTE4NSAzNzguMjE4IDIyLjE1NzQgMzc3LjE5MyAyMC43Nzg1QzM3OC41ODEgMTkuODkyMSAzNzkuMjQyIDE4Ljg3NDMgMzc5LjI0MiAxOC4wNTM3QzM3OS4yNDIgMTcuMTAxNyAzNzguNTgxIDE2LjExNjkgMzc2Ljk2MiAxNi4xMTY5QzM3NS4yMTEgMTYuMTE2OSAzNzQuMzUyIDE3LjIwMDIgMzc0LjM1MiAxOC40ODAzQzM3NC4zNTIgMTkuMjM1NCAzNzQuNTUgMTkuODkxNyAzNzUuMzc2IDIwLjk3NTNDMzc0LjA1NCAyMS42OTc1IDM3Mi43NjYgMjIuNzQ3OSAzNzIuNzY2IDI0LjQyMjNDMzcyLjc2NiAyNi4wNjM5IDM3NC4wODcgMjYuOTE3NCAzNzUuNzA3IDI2LjkxNzRDMzc3LjE5MyAyNi45MTc0IDM3OC4xNTEgMjYuMzI2NiAzNzguOTEyIDI1LjYzNjlMMzc5LjkwMiAyNi44MTlDMzgwLjIgMjYuNzg2MSAzODAuNTMxIDI2LjcyMDYgMzgwLjg2MSAyNi43MjA2QzM4MS4zMjQgMjYuNzIwNiAzODEuODUyIDI2Ljc4NjEgMzgyLjM4IDI2Ljg4NDVWMjYuODg0NVpNMzgzLjM3MiA0MC4wMTU4QzM4MS45MTggMzguNDczIDM4MC41OTcgMzcuMDYxMiAzNzkuMzA4IDM1LjM4NzFMMzc4Ljg3OCAzNC44Mjg4QzM4MC4zMzIgMzQuNTk5MSAzODEuNjU0IDMzLjYxNSAzODEuNjU0IDMxLjk0MDFDMzgxLjY1NCAzMC40NjMyIDM4MC40OTggMjkuNDQ1NCAzNzguNzc5IDI5LjQ0NTRDMzc3LjU1NyAyOS40NDU0IDM3Ni42MzIgMjkuNTQzNSAzNzYuMTY5IDI5LjU0MzVDMzc1LjY3MyAyOS41NDM1IDM3NS4yNDQgMjkuNTQzNSAzNzQuNzQ4IDI5LjQ3NzZDMzc0LjgxNCAzMS4zODIyIDM3NC44NDggMzEuNDgwMiAzNzQuODQ4IDMyLjYyOTRWMzYuODMxMUMzNzQuODQ4IDM3LjY1MjQgMzc0LjgxNCAzOC41MDUyIDM3NC43NDggNDAuMDE1NEMzNzUuMTEyIDM5Ljk0OTYgMzc1LjQ3NSAzOS45NDk2IDM3NS43MDcgMzkuOTQ5NkMzNzYuMDA0IDM5Ljk0OTYgMzc2LjM2OCAzOS45NDk2IDM3Ni42MzIgNDAuMDE1NEMzNzYuNTY1IDM4Ljk5OCAzNzYuNTMzIDM3LjI1ODEgMzc2LjUzMyAzNi44MzExVjM0LjQzNDhDMzc4LjExOSAzNi40MDQyIDM4MC4xNjcgMzguODk5NiAzODAuOTYgNDAuMDE1NEMzODEuMzU2IDM5Ljk0OTYgMzgxLjY4NyAzOS45NDk2IDM4Mi4wODMgMzkuOTQ5NkMzODIuMzggMzkuOTUgMzgyLjg3NiAzOS45NSAzODMuMzcyIDQwLjAxNThaTTM2Mi4xNiAyNi44MTlDMzYwLjk3MSAyNS41NzE1IDM1OC44ODkgMjIuOTc4IDM1OC4wNjMgMjEuOTkzNUwzNTcuMjM3IDIwLjk3NTdDMzU4LjA5NiAxOS45NTgzIDM1OC42OSAxOS4zMzQxIDM1OS4zMTkgMTguNTc5QzM2MC4wNDUgMTcuNzkxIDM2MC43MDYgMTYuOTcwNCAzNjEuNDk5IDE2LjI0ODJDMzYxLjEzNiAxNi4zMTM3IDM2MC45MzcgMTYuMzEzNyAzNjAuNzM5IDE2LjMxMzdDMzYwLjU0MSAxNi4zMTM3IDM2MC4zNDMgMTYuMzEzNyAzNjAuMTQ0IDE2LjI0ODJDMzU5LjkxMyAxNi42MDkzIDM1OS41NSAxNy4wNjg4IDM1OS4xNTMgMTcuNTI4N0MzNTguNzU2IDE3Ljk1NTYgMzU4LjM2IDE4LjM4MjIgMzU4LjA2MyAxOC43NDMzQzM1Ny4yMzYgMTkuNjk1MiAzNTYuNzc0IDIwLjE1NDcgMzU1LjU4NSAyMS4yNzA5VjE5LjQ2NTVDMzU1LjU4NSAxOC40MTUxIDM1NS41ODUgMTcuNzI1NSAzNTUuNjUxIDE2LjI0ODJDMzU1LjMyMSAxNi4zMTM3IDM1NC45NTcgMTYuMzEzNyAzNTQuNzI2IDE2LjMxMzdDMzU0LjQ2MSAxNi4zMTM3IDM1NC4wMzIgMTYuMzEzNyAzNTMuNzY4IDE2LjI0ODJDMzUzLjgzMyAxNy44MjM5IDM1My44NjcgMTguMjgzNCAzNTMuODY3IDE5LjQzMjVWMjMuNjM0N0MzNTMuODY3IDI0LjY4NSAzNTMuODMzIDI1LjMwODggMzUzLjc2OCAyNi44MTlDMzU0LjE2NCAyNi43MjA2IDM1NC40OTUgMjYuNzIwNiAzNTQuNzI2IDI2LjcyMDZDMzU0Ljk1NyAyNi43MjA2IDM1NS4zNTMgMjYuNzUzNSAzNTUuNjUxIDI2LjgxOUMzNTUuNTg1IDI1LjE0NDkgMzU1LjU4NSAyNC4xNTk3IDM1NS41ODUgMjMuNjM0N1YyMS40MzUyQzM1Ni44MDcgMjIuODc5NiAzNTguNjkgMjUuMjQzMyAzNTkuNzQ4IDI2LjgxOUMzNjAuMTMgMjYuNzU2MyAzNjAuNTE3IDI2LjcyMzQgMzYwLjkwNSAyNi43MjA2QzM2MS4yMDIgMjYuNzIwNiAzNjEuNjY1IDI2LjcyMDYgMzYyLjE2IDI2LjgxOVYyNi44MTlaTTM3Mi42MDEgNDAuMDE1OEMzNzIuNTY4IDM5Ljg1MTkgMzcyLjUzNSAzOS43MjA2IDM3Mi41MzUgMzkuNTIzNEMzNzIuNTM1IDM5LjM5MjggMzcyLjU2OCAzOS4yMjgxIDM3Mi42MDEgMzkuMDk2NEMzNzEuMjggMzkuMTI5NyAzNjguOTAxIDM5LjE5NTIgMzY4LjM3MiAzOS4xOTUyVjM0LjY2NDlDMzY5LjY5NCAzNC42NjQ5IDM3MC45ODIgMzQuNjY0OSAzNzIuMjcgMzQuNzk2M0MzNzIuMjM4IDM0LjYzMjQgMzcyLjIwNCAzNC40Njc3IDM3Mi4yMDQgMzQuMzM2NEMzNzIuMjA0IDM0LjIwNTggMzcyLjIwNCAzNC4wNDE5IDM3Mi4yNyAzMy44NDQ3QzM3MS4zNDYgMzMuOTQyOCAzNjkuMTk4IDMzLjk3NiAzNjguMzcyIDMzLjk3NlYzMC4yNjZDMzY5LjgyNiAzMC4yNjYgMzcwLjY4NSAzMC4yNjYgMzcxLjE4IDMwLjI5OTNMMzcyLjUwMiAzMC4zNjUxQzM3Mi40MzYgMzAuMTY3OSAzNzIuNDM2IDMwLjA2OTIgMzcyLjQzNiAyOS45MDUzQzM3Mi40MzYgMjkuNzQxNCAzNzIuNDM2IDI5LjcwODEgMzcyLjUwMiAyOS40NDU4QzM3MS40MTEgMjkuNDc4MyAzNjkuOTI1IDI5LjU0MzggMzY5LjI2NCAyOS41NDM4QzM2OC44MDIgMjkuNTQzOCAzNjcuMzQ4IDI5LjUxMTMgMzY2LjU4NyAyOS40NDU4QzM2Ni42NTQgMzAuMjY2NCAzNjYuNjg2IDMxLjYxMjMgMzY2LjY4NiAzMi41NjQyVjM2Ljg2NTFDMzY2LjY4NiAzNy40ODg1IDM2Ni42MiAzOC43MzU3IDM2Ni41ODcgNDAuMDE2MkMzNjcuNTEzIDM5Ljk1MDMgMzY4LjgwMiAzOS45NTAzIDM2OS4yNjQgMzkuOTUwM0MzNzAuMDI0IDM5Ljk1IDM3MS42NDMgMzkuOTUgMzcyLjYwMSA0MC4wMTU4Wk0zNjQuNjA1IDM5LjEyOTRDMzY0LjQ0IDM4LjgwMDggMzY0LjM0MSAzOC4zMDg4IDM2NC4yNzUgMzguMDQ2MUMzNjIuOTIgMzkuMTYxOSAzNjEuOTk1IDM5LjM5MjQgMzYwLjkzOCAzOS4zOTI0QzM1OC41OTIgMzkuMzkyNCAzNTcuMzM3IDM3LjI5MTMgMzU3LjMzNyAzNC42NjQ5QzM1Ny4zMzcgMzEuNzQzNiAzNTguNzU3IDMwLjAzNjIgMzYxLjE2OSAzMC4wMzYyQzM2Mi40MjUgMzAuMDM2MiAzNjMuNjE0IDMwLjU5NDUgMzY0LjE3NiAzMS4xNTI4QzM2NC4yMDggMzAuODg5OCAzNjQuMzA4IDMwLjM2NDggMzY0LjQ3MyAzMC4wNjg4QzM2My4zMTYgMjkuNTExMyAzNjIuMjU5IDI5LjM0NjYgMzYxLjEwMiAyOS4zNDY2QzM1Ny4yMzcgMjkuMzQ2NiAzNTUuNDUzIDMxLjc0MzYgMzU1LjQ1MyAzNC44Mjg4QzM1NS40NTMgMzguMzA5MSAzNTcuNzk4IDQwLjE0NzEgMzYwLjczOSA0MC4xNDcxQzM2Mi40MjUgNDAuMTQ3MSAzNjMuODEyIDM5LjYyMjIgMzY0LjYwNSAzOS4xMjk0VjM5LjEyOTRaTTM0Mi4zMDMgMjYuODE5QzM0MC41MTkgMjMuNDA0OSAzMzguOCAxOS4xMzczIDMzNy41NzggMTYuMTE2OUgzMzcuMzhDMzM2LjU4NyAxOC4wMjA3IDMzNS4xMzMgMjEuMjcwOSAzMzQuNzM3IDIyLjE4OTlDMzM0LjI3NCAyMy4zMDYxIDMzMy4yNSAyNS41MDU2IDMzMi41ODkgMjYuODE4NkMzMzIuODAzIDI2Ljc1MzggMzMzLjAyNiAyNi43MjA2IDMzMy4yNSAyNi43MjAyQzMzMy40NDggMjYuNzIwMiAzMzMuNjEzIDI2Ljc1MzEgMzMzLjg0NSAyNi44MTg2QzMzNC4xNzUgMjUuOTMyMiAzMzQuNjM4IDI0LjgxNiAzMzUuMTMzIDIzLjYzNDNDMzM1Ljc5NCAyMy42MDE0IDMzNi4zODkgMjMuNTY4OCAzMzYuOTg0IDIzLjU2ODhDMzM3LjYxMiAyMy41Njg4IDMzOC4yNzIgMjMuNjAxNCAzMzguOTMzIDIzLjYzNDNMMzM5LjU5NCAyNS4yMUwzNDAuMjU1IDI2LjgxODZDMzQwLjcxNyAyNi43MjAyIDM0MS4wOCAyNi43MjAyIDM0MS4zMTIgMjYuNzIwMkMzNDEuNjA5IDI2LjcyMDYgMzQxLjg3MyAyNi43MjA2IDM0Mi4zMDMgMjYuODE5VjI2LjgxOVpNMzUzLjYzNiAyOS40NDU0QzM1My40MzggMjkuNTExMyAzNTMuMjczIDI5LjU0MzUgMzUzLjEwNyAyOS41NDM1QzM1Mi45MDkgMjkuNTQzNSAzNTIuNzQ0IDI5LjUxMDkgMzUyLjU0NiAyOS40NDU0QzM1Mi42NDQgMzAuNzU4NCAzNTIuNjc4IDMyLjA3MTQgMzUyLjY3OCAzMy4zNTE5VjM2LjczMzRDMzUyLjE0OSAzNi4yNzM2IDM1MC44NiAzNS4wOTE5IDM0OS4zNzQgMzMuNzEzQzM0Ny44NiAzMi4zMDc0IDM0Ni4zOTQgMzAuODUxMSAzNDQuOTc5IDI5LjM0NjZIMzQ0Ljc0OEMzNDQuNzgxIDMwLjgyNDMgMzQ0LjgxNCAzMi40IDM0NC44MTQgMzMuODExNFYzNS44Nzk5QzM0NC44MTQgMzcuNjUyOCAzNDQuODE0IDM4LjYwNDcgMzQ0LjcxNSA0MC4wMTYyQzM0NC45OCAzOS45NTAzIDM0NS4xMTIgMzkuOTUwMyAzNDUuMzEgMzkuOTUwM0MzNDUuNDQyIDM5Ljk1MDMgMzQ1LjU3NSAzOS45NTAzIDM0NS44MDYgNDAuMDE2MkMzNDUuNzQgMzguNjcwNiAzNDUuNzA3IDM2LjQ3MDggMzQ1LjcwNyAzNS44Nzk5VjMyLjU5NjhDMzQ4LjE4NSAzNC44NjI1IDM1MS4yMjQgMzcuODgyNiAzNTMuNDcxIDQwLjE0NzVIMzUzLjYwM0MzNTMuNjAzIDM4LjkzMjkgMzUzLjUzNyAzNy43MTc5IDM1My41MzcgMzYuNTA0VjM0LjYzMjdDMzUzLjUzNiAzMi40MzI1IDM1My41MzYgMzEuMzQ5MyAzNTMuNjM2IDI5LjQ0NTRaTTM0Mi41NjcgNDAuMDE1OEMzNDIuNTM0IDM5Ljg1MTkgMzQyLjUwMSAzOS43MjA2IDM0Mi41MDEgMzkuNTIzNEMzNDIuNTAxIDM5LjM5MjggMzQyLjUzNCAzOS4yMjgxIDM0Mi41NjcgMzkuMDk2NEMzNDEuMjQ2IDM5LjEyOTcgMzM4Ljg2NyAzOS4xOTUyIDMzOC4zNzEgMzkuMTk1MlYzNC42NjQ5QzMzOS42NiAzNC42NjQ5IDM0MC45NDggMzQuNjY0OSAzNDIuMjM3IDM0Ljc5NjNDMzQyLjIwNCAzNC42MzI0IDM0Mi4xNzEgMzQuNDY3NyAzNDIuMTcxIDM0LjMzNjRDMzQyLjE3MSAzNC4yMDU4IDM0Mi4xNzEgMzQuMDQxOSAzNDIuMjM3IDMzLjg0NDdDMzQxLjMxMiAzMy45NDI4IDMzOS4xOTcgMzMuOTc2IDMzOC4zNzEgMzMuOTc2VjMwLjI2NkMzMzkuNzkyIDMwLjI2NiAzNDAuNjUxIDMwLjI2NiAzNDEuMTc5IDMwLjI5OTNMMzQyLjQ2OCAzMC4zNjUxQzM0Mi40MzUgMzAuMTY3OSAzNDIuNDM1IDMwLjA2OTIgMzQyLjQzNSAyOS45MDUzQzM0Mi40MzUgMjkuNzQxNCAzNDIuNDM1IDI5LjY3NTUgMzQyLjQ2OCAyOS40NDU4QzM0MS4zNzggMjkuNDc4MyAzMzkuODkxIDI5LjU0MzggMzM5LjIzIDI5LjU0MzhDMzM4Ljc2NyAyOS41NDM4IDMzNy4zMTQgMjkuNTExMyAzMzYuNTU0IDI5LjQ0NThDMzM2LjYyIDMwLjI2NjQgMzM2LjY1MyAzMS42MTIzIDMzNi42NTMgMzIuNTY0MlYzNi44NjUxQzMzNi42NTMgMzcuNDg4NSAzMzYuNTg3IDM4LjczNTcgMzM2LjU1NCA0MC4wMTYyQzMzNy41MTIgMzkuOTUwMyAzMzguNzY3IDM5Ljk1MDMgMzM5LjIzIDM5Ljk1MDNDMzM5Ljk5IDM5Ljk1IDM0MS42NDIgMzkuOTUgMzQyLjU2NyA0MC4wMTU4VjQwLjAxNThaTTMzMS4yMDEgMjYuODE5QzMzMC42NzMgMjMuMjQwNiAzMzAuMjEgMTkuNDk4NCAzMjkuODQ3IDE2LjExNjlDMzI5Ljc0OCAxNi4xNDk4IDMyOS43MTQgMTYuMTQ5OCAzMjkuNjQ5IDE2LjExNjlDMzI4Ljk1NSAxNy4zMzE1IDMyOC4xNjIgMTguNjQ0NSAzMjcuNTY3IDE5LjU2MzlDMzI3LjAwNiAyMC40NTAzIDMyNi4zNDUgMjEuNTAwNyAzMjUuNTg1IDIyLjYxNjlDMzIzLjk5OSAyMC41ODE3IDMyMi4zNDcgMTguMDIxMSAzMjEuMjU2IDE2LjExNjlDMzIxLjE5IDE2LjE0OTggMzIxLjE1NyAxNi4xMTY5IDMyMS4wOTEgMTYuMTE2OUMzMjAuNzI4IDE5LjQ5OCAzMjAuMjMyIDIzLjI3MzIgMzE5LjczNiAyNi44MTlDMzIwLjAwMSAyNi43MjA2IDMyMC4xNjYgMjYuNzIwNiAzMjAuMjk4IDI2LjcyMDZDMzIwLjQ5NiAyNi43MjA2IDMyMC42MjggMjYuNzUzNSAzMjAuODU5IDI2LjgxOUMzMjAuOTkyIDI0LjQ1NTMgMzIxLjI1NiAyMi4xMjQ0IDMyMS41NTMgMTkuNjYyM0MzMjIuODQyIDIxLjUzMzYgMzIzLjk2NSAyMy4xNDIyIDMyNS4yMjEgMjQuODQ5M0MzMjYuMjc4IDIzLjIwNzcgMzI3LjM2OCAyMS40MzQ4IDMyOC41NTggMTkuNjI5NEMzMjguODg4IDIyLjE1NyAzMjkuMTg2IDI0LjQ1NTMgMzI5LjM1MSAyNi44MTlDMzI5Ljc4IDI2LjcyMDYgMzMwLjA3OCAyNi43MjA2IDMzMC4yNzYgMjYuNzIwNkMzMzAuNTQgMjYuNzIwNiAzMzAuODA1IDI2LjcyMDYgMzMxLjIwMSAyNi44MTlWMjYuODE5Wk0zMzQuOTY4IDMyLjIwMjhDMzM0Ljk2OCAzMC4yOTg5IDMzMy40NDggMjkuNDQ1NCAzMzEuNTk4IDI5LjQ0NTRDMzMwLjc3MiAyOS40NDU0IDMyOS44OCAyOS41NDM1IDMyOS4yNTIgMjkuNTQzNUMzMjkuMDIxIDI5LjU0MzUgMzI4LjUyNSAyOS41NDM1IDMyNy45OTcgMjkuNDc3NkMzMjguMDMgMzAuNTI4MyAzMjguMDk2IDMxLjQxNDggMzI4LjA5NiAzMi40MzIyVjM2LjkyOTVDMzI4LjA5NiAzNy45MTQ4IDMyOC4wMyAzOC45OTggMzI3Ljk5NyA0MC4wMTU0QzMyOC40MjYgMzkuOTQ5NiAzMjguNzI0IDM5Ljk0OTYgMzI4LjkyMiAzOS45NDk2QzMyOS4xNTMgMzkuOTQ5NiAzMjkuNDg0IDM5Ljk0OTYgMzI5Ljg4IDQwLjAxNTRDMzI5LjgxNSAzOS4wMzE5IDMyOS43ODIgMzguMDQ2NSAzMjkuNzgxIDM3LjA2MDlWMzUuNDJDMzMwLjE0NSAzNS40NTI2IDMzMC41MDggMzUuNDUyNiAzMzAuOTA1IDM1LjQ1MjZDMzMyLjgyIDM1LjQ1MjYgMzM0Ljk2OCAzNC43MzA0IDMzNC45NjggMzIuMjAyOFYzMi4yMDI4Wk0zMjYuMDE0IDM2Ljg5NzNDMzI2LjAxNCAzNS4yNTU4IDMyNC45MjQgMzQuNTMzNiAzMjMuMDQgMzMuNzQ1NkMzMjEuNjg2IDMzLjE4OCAzMjAuOTkyIDMyLjY5NTYgMzIwLjk5MiAzMS42NDQ1QzMyMC45OTIgMzAuNjYgMzIxLjc1MiAzMC4wMzYyIDMyMy4wMDggMzAuMDM2MkMzMjMuODM0IDMwLjAzNjIgMzI0LjU2MSAzMC4zMzE1IDMyNS4yMjIgMzAuODU2OEMzMjUuMjg3IDMwLjQ5NTcgMzI1LjQ1MyAzMC4xMzQ3IDMyNS42NTEgMjkuODM5NEMzMjQuODU4IDI5LjQ3ODMgMzIzLjk5OSAyOS4zNDcgMzIzLjA3NCAyOS4zNDdDMzIwLjM2NSAyOS4zNDcgMzE5LjUwNSAzMC44OTA1IDMxOS41MDUgMzIuMjAzNUMzMTkuNTA1IDMzLjgxMTggMzIwLjI5OSAzNC41NjcyIDMyMi4zNDcgMzUuMzU1M0MzMjMuNjM2IDM1Ljg0NyAzMjQuMjk2IDM2LjQ3MTEgMzI0LjI5NiAzNy41NTQ0QzMyNC4yOTYgMzguNzAzNSAzMjMuNDM3IDM5LjQyNTcgMzIyLjI0OCAzOS40MjU3QzMyMS41NTQgMzkuNDI1NyAzMjAuMzY1IDM5LjA2NDYgMzE5LjUzOSAzOC4zMDk5QzMxOS41MDUgMzguNzM2MSAzMTkuNTA1IDM5LjEzMDQgMzE5LjM3MyAzOS40OTE1QzMxOS45MDIgMzkuNzU0NiAzMjEuMTI1IDQwLjE0NzkgMzIyLjIxNSA0MC4xNDc5QzMyNC45OSA0MC4xNDcxIDMyNi4wMTQgMzguNDM5NyAzMjYuMDE0IDM2Ljg5NzNWMzYuODk3M1pNMzc4LjE1MiAxNy45ODgyQzM3OC4xNTIgMTguOTczIDM3Ny40NTggMTkuNjYyMyAzNzYuNzY0IDIwLjIyMDJDMzc2LjMwMSAxOS41NjM5IDM3NS43NCAxOC42NzcxIDM3NS43NCAxNy45ODgyQzM3NS43NCAxNy4yMzMxIDM3Ni4yNjggMTYuODA2MSAzNzYuOTk1IDE2LjgwNjFDMzc3Ljk4NyAxNi44MDY1IDM3OC4xNTIgMTcuNjkyNiAzNzguMTUyIDE3Ljk4ODJWMTcuOTg4MlpNMzc4LjQ4MiAyNS4wMTMyQzM3OC4xMTkgMjUuMzQxNyAzNzcuMjYgMjUuOTY1NSAzNzYuNTMzIDI1Ljk2NTVDMzc1LjU3NCAyNS45NjU1IDM3NC40MTggMjUuMjc1OSAzNzQuNDE4IDIzLjc5ODZDMzc0LjQxOCAyMi40ODU1IDM3NS4yNzcgMjEuODk0NyAzNzUuODA2IDIxLjU2NjVDMzc3LjAyOCAyMy4yNDA2IDM3Ny4wOTUgMjMuMzM5MSAzNzguNDgyIDI1LjAxMzJaTTM3OS44MDQgMzIuMjAyOEMzNzkuODA0IDMzLjI1MzUgMzc5LjI3NSAzNC40MDI2IDM3Ny43NTUgMzQuNDAyNkMzNzcuMzI2IDM0LjQwMjYgMzc2LjkyOSAzNC40MDI2IDM3Ni41MzMgMzQuMzY5M1YzMC4yNjU2QzM3Ni45MjkgMzAuMTY3NiAzNzcuNDI1IDMwLjEzNDMgMzc3LjcyMiAzMC4xMzQzQzM3OS4wMTEgMzAuMTM0MyAzNzkuODA0IDMwLjg4OTggMzc5LjgwNCAzMi4yMDI4Wk0zMzguNjAyIDIyLjgxNDFDMzM3LjkwOSAyMi44NDY2IDMzNy41NDUgMjIuODQ2NiAzMzcuMDgyIDIyLjg0NjZDMzM2LjUyMSAyMi44NDY2IDMzNi4xOSAyMi44NDY2IDMzNS40NjMgMjIuODE0MUwzMzcuMDgyIDE5LjAwNkwzMzguNjAyIDIyLjgxNDFaTTMzMy4xNTEgMzIuMzAwOEMzMzMuMTUxIDMzLjgxMTEgMzMyLjI1OCAzNC43OTU5IDMzMC44MDUgMzQuNzk1OUMzMzAuNTA3IDM0Ljc5NTkgMzMwLjE3NyAzNC43OTU5IDMyOS43OCAzNC43MzAxVjMwLjIzMjdDMzMwLjI0MyAzMC4xNjY5IDMzMC42MzkgMzAuMTMzOSAzMzEuMDM2IDMwLjEzMzlDMzMyLjQyNCAzMC4xMzQzIDMzMy4xNTEgMzEuMDIxMSAzMzMuMTUxIDMyLjMwMDhaTTM2OS41MjggMjMuNjY3NkMzNjkuNTI4IDIyLjAyNiAzNjguNDM4IDIxLjMwMzkgMzY2LjU1NSAyMC41MTYyQzM2NS4yIDE5Ljk1ODMgMzY0LjUwNiAxOS40OTg4IDM2NC41MDYgMTguNDE1MUMzNjQuNTA2IDE3LjQ2MzIgMzY1LjI2NiAxNi44MDY1IDM2Ni41MjEgMTYuODA2NUMzNjcuMzQ4IDE2LjgwNjUgMzY4LjA3NSAxNy4xMDE3IDM2OC43MzUgMTcuNjI3NUMzNjguODAyIDE3LjI2NjQgMzY4Ljk2NyAxNi45MDQ5IDM2OS4xMzEgMTYuNjQyMkMzNjguMzcyIDE2LjI4MTEgMzY3LjQ3OSAxNi4xMTcyIDM2Ni41ODcgMTYuMTE3MkMzNjMuOTQ0IDE2LjExNzIgMzYyLjk4NiAxNy42NiAzNjIuOTg2IDE5LjAwNkMzNjIuOTg2IDIwLjU4MTcgMzYzLjgxMiAyMS4zMzY4IDM2NS44NjEgMjIuMTI0NEMzNjcuMTQ5IDIyLjYxNjkgMzY3LjgxIDIzLjI0MDYgMzY3LjgxIDI0LjM1NjhDMzY3LjgxIDI1LjQ3MyAzNjYuOTUxIDI2LjE5NTIgMzY1Ljc2MiAyNi4xOTUyQzM2NS4wMzUgMjYuMTk1MiAzNjMuODc5IDI1LjgzNDEgMzYzLjA1MiAyNS4xMTE5QzM2My4wMiAyNS41Mzg5IDM2Mi45ODYgMjUuOSAzNjIuODg3IDI2LjI2MTFDMzYzLjM4MyAyNi41MjM4IDM2NC42MDYgMjYuOTE3NCAzNjUuNzI5IDI2LjkxNzRDMzY4LjUwNCAyNi45MTc0IDM2OS41MjggMjUuMjQzMyAzNjkuNTI4IDIzLjY2NzZWMjMuNjY3NloiIGZpbGw9IiMwMzY1NTUiLz4NCjxwYXRoIGQ9Ik02NDAuNDE2IDIwLjU1NzNDNjM4LjY3MSAxOS44MzU0IDYzNy42MzEgMTkuNTU1MSA2MzYuNTk4IDE5LjU1NTFDNjM1LjUxNCAxOS41NTUxIDYzNC44MTkgMTkuOTE3IDYzNC44MTkgMjAuNDc2NUM2MzQuODE5IDIyLjE2NDUgNjQwLjk2MiAyMS42ODkzIDY0MC45NjIgMjUuNTkzNkM2NDAuOTYyIDI3Ljc0NjQgNjM5LjAyNCAyOC45OTc0IDYzNi4zMzIgMjguOTk3NEM2MzQuMjIgMjguOTk3NCA2MzMuMTggMjguNDg4IDYzMS45ODMgMjcuOTExNlYyNS40OTYyQzYzMy43MSAyNi41NjM1IDYzNC43NjggMjYuOTQwMSA2MzYuMTAxIDI2Ljk0MDFDNjM3LjI1NiAyNi45NDAxIDYzNy44NzkgMjYuNTYzNSA2MzcuODc5IDI1LjkwNjNDNjM3Ljg3OSAyNC4wNjg1IDYzMS43MzcgMjQuNzQxNSA2MzEuNzM3IDIwLjcyMTNDNjMxLjczNyAxOC43ODI3IDYzMy41MzQgMTcuNDk5IDYzNi4zMzIgMTcuNDk5QzYzNy42ODIgMTcuNDk5IDYzOC45MDEgMTcuNzYzNSA2NDAuNDE2IDE4LjM3MDdWMjAuNTU3M1pNNjQ5LjAxNiAyOC40ODQxQzY0Ny45OTIgMjguODMwNiA2NDcuMTI2IDI4Ljk5NTQgNjQ2LjI2MiAyOC45OTU0QzY0My40MDIgMjguOTk1NCA2NDEuNTUyIDI3LjQ0MjIgNjQxLjU1MiAyNS4wNzkyQzY0MS41NTIgMjIuNzU5NCA2NDMuNDczIDIxLjEyMDIgNjQ2LjE1NiAyMS4xMjAyQzY0Ni45ODUgMjEuMTIwMiA2NDguMDQ0IDIxLjMxODIgNjQ4Ljg5MSAyMS42MTIzVjIzLjM4ODFDNjQ4LjIyMSAyMy4wNTYyIDY0Ny40NDQgMjIuODc0MSA2NDYuODA5IDIyLjg3NDFDNjQ1LjI3MyAyMi44NzQxIDY0NC4yODYgMjMuNzM0MyA2NDQuMjg2IDI1LjA2MTlDNjQ0LjI4NiAyNi40MDggNjQ1LjI1NiAyNy4yOTQgNjQ2LjcyIDI3LjI5NEM2NDcuMzM3IDI3LjI5NCA2NDcuODg2IDI3LjE2MjMgNjQ5LjAxNiAyNi43NjhMNjQ5LjAxNiAyOC40ODQxWk02NzEuMzIgMjQuMjA5QzY3MS40MjUgMjMuMTU0OCA2NzIuMDgxIDIyLjU0NTcgNjczLjA4NyAyMi41NDU3QzY3NC4wNzYgMjIuNTQ1NyA2NzQuNzQ2IDIzLjE3MjEgNjc0Ljg1MiAyNC4yMDlINjcxLjMyWk02NzIuOTEgMjEuMTIyOUM2NzAuNCAyMS4xMjI5IDY2OC42MTQgMjIuNzc1NSA2NjguNjE0IDI1LjEwMTJDNjY4LjYxNCAyNy40NDQxIDY3MC40NzEgMjguOTk1NCA2NzMuMzM1IDI4Ljk5NTRDNjczLjk3IDI4Ljk5NTQgNjc1LjUwNCAyOC45OTU0IDY3Ni45NjYgMjcuOTg3VjI2LjUwNDJDNjc1Ljc2OSAyNy4yOTkzIDY3NC45NzcgMjcuNTczMSA2NzMuOTU1IDI3LjU3MzFDNjcyLjM0MSAyNy41NzMxIDY3MS4zNTQgMjYuNzk0OSA2NzEuMjY1IDI1LjQ2NjZINjc3LjExQzY3Ny4yMzIgMjIuNjkzOSA2NzUuMjc5IDIxLjEyMjkgNjcyLjkxIDIxLjEyMjlWMjEuMTIyOVpNNjc4LjA5OSAyOC44NTcySDY4MC42NTRWMjEuMjYyN0g2NzguMDk5VjI4Ljg1NzJaTTY4Ny43NjcgMjYuNzgxNUM2ODcuMjM0IDI3LjIyODEgNjg2Ljc5MiAyNy40MDcyIDY4Ni4yNDYgMjcuNDA3MkM2ODUuMDQzIDI3LjQwNzIgNjg0LjI4MSAyNi40ODM4IDY4NC4yODEgMjUuMTAwNEM2ODQuMjgxIDIzLjU4NDEgNjg1LjA0MyAyMi43MTAxIDY4Ni4zMzEgMjIuNzEwMUM2ODYuNzkyIDIyLjcxMDEgNjg3LjM5NCAyMi45MDggNjg3Ljc2NyAyMy4xNTU5VjI2Ljc4MTVaTTY4Ny43NjcgMTcuNjM5MVYyMS41OTU4QzY4Ny4wNzYgMjEuMjg0NyA2ODYuMzg4IDIxLjEyMDIgNjg1LjY0NCAyMS4xMjAyQzY4My4zMTMgMjEuMTIwMiA2ODEuNyAyMi43MjY2IDY4MS43IDI1LjA1MDdDNjgxLjcgMjcuMzI0OCA2ODMuMzEzIDI4Ljk5NzQgNjg1LjUgMjguOTk3NEM2ODYuMzY3IDI4Ljk5NzQgNjg3LjAzNyAyOC43ODU2IDY4Ny43NjcgMjguMjQzNVYyOC44NTQ5SDY5MC4zMjJWMTcuNjM5MUg2ODcuNzY3Wk02OTQuMTA1IDI0LjIwOUM2OTQuMjExIDIzLjE1NDggNjk0Ljg2NCAyMi41NDU3IDY5NS44NjggMjIuNTQ1N0M2OTYuODU4IDIyLjU0NTcgNjk3LjUzNSAyMy4xNzIxIDY5Ny42NDEgMjQuMjA5SDY5NC4xMDVaTTY5NS42OTQgMjEuMTIyOUM2OTMuMTg0IDIxLjEyMjkgNjkxLjQgMjIuNzc1NSA2OTEuNCAyNS4xMDEyQzY5MS40IDI3LjQ0NDEgNjkzLjI1OSAyOC45OTU0IDY5Ni4xMTkgMjguOTk1NEM2OTYuNzUzIDI4Ljk5NTQgNjk4LjI5IDI4Ljk5NTQgNjk5Ljc1NSAyNy45ODdWMjYuNTA0MkM2OTguNTU3IDI3LjI5OTMgNjk3Ljc2MyAyNy41NzMxIDY5Ni43MzYgMjcuNTczMUM2OTUuMTMxIDI3LjU3MzEgNjk0LjE0IDI2Ljc5NDkgNjk0LjA1MSAyNS40NjY2SDY5OS44OTRDNzAwLjAxNSAyMi42OTM5IDY5OC4wNjEgMjEuMTIyOSA2OTUuNjk0IDIxLjEyMjkiIGZpbGw9IiMwMDlFNEQiLz4NCjxwYXRoIGQ9Ik03MDMuNzIxIDIzLjQzNjhINzAzLjc1OEM3MDQuNTE3IDIxLjg1NjIgNzA1LjM2NiAyMS4xMTUgNzA2LjM1MiAyMS4xMTVDNzA2Ljg2MiAyMS4xMTUgNzA3LjMwMyAyMS4yOTY0IDcwOC4wNDQgMjEuODA3Nkw3MDcuMzQxIDIzLjkxMzNDNzA2LjY3IDIzLjUxODYgNzA2LjIyOSAyMy4zNTM1IDcwNS44MjMgMjMuMzUzNUM3MDQuODg2IDIzLjM1MzUgNzA0LjI4NiAyNC4xNzc1IDcwMy43MjEgMjUuNTcwNFYyOC44NDY2SDcwMS4xNjJWMjEuMjU0MUg3MDMuNzIxVjIzLjQzNjhaTTY4MC43NzUgMTguMDY3NEM2ODEuMDE1IDE4LjY1NzUgNjgwLjU4MyAxOS40ODA1IDY3OS44MTQgMTkuOTA0QzY3OS4wNDEgMjAuMzI3MSA2NzguMjI0IDIwLjE5MjggNjc3Ljk4NiAxOS42MDI3QzY3Ny43NDMgMTkuMDExNyA2NzguMTczIDE4LjE4NzcgNjc4Ljk0NSAxNy43NjY2QzY3OS43MTYgMTcuMzQxMSA2ODAuNTMzIDE3LjQ3NTkgNjgwLjc3NSAxOC4wNjc0WiIgZmlsbD0iIzAwOUU0RCIvPg0KPHBhdGggZD0iTTY1OC4yMiAyNC4wMjMxQzY1OC4yMiAyMS45NjUxIDY1Ni43MTkgMjEuMTIyNiA2NTUuMjM5IDIxLjEyMjZDNjU0LjIzMiAyMS4xMjI2IDY1My40MDQgMjEuNTE4NCA2NTIuNjY0IDIyLjM5MjFINjUyLjYyOVYxNy42MzkySDY1MC4wNzFWMjguODM1M0g2NTIuNjI5VjI0LjAyMzFDNjUzLjIyOCAyMy4yMTYxIDY1My43MzggMjIuODcxMSA2NTQuMzM4IDIyLjg3MTFDNjU1LjEzNCAyMi44NzExIDY1NS42NjIgMjMuMzk4NiA2NTUuNjYyIDI0LjUzMjlWMjcuMjAwOEM2NTYuNTIgMjYuNzg5NiA2NTcuMzkzIDI2LjUzNzQgNjU4LjIyIDI2LjQ0MzhWMjQuMDIzMVpNNjY0LjYzNiAyMS4xMTk5QzY2My41OTQgMjEuMTE5OSA2NjIuNzk5IDIxLjQ4MTEgNjYxLjk4NCAyMi4zNDkzVjIxLjI2MjRINjU5LjQyOFYyNi40MjM0QzY2MC4zMTMgMjYuNTA1OCA2NjEuNDQzIDI2Ljg4NDcgNjYxLjk4NCAyNy41MTA0VjIzLjk2MzRDNjYyLjY1NyAyMy4wMjMyIDY2My4xMzQgMjIuNzA5NyA2NjMuNzcgMjIuNzA5N0M2NjQuNDk0IDIyLjcwOTcgNjY1LjA0NSAyMy4xNTU2IDY2NS4wNDUgMjQuMjI2NFYyOC44MzcySDY2Ny42MDJWMjQuMDI4OUM2NjcuNjAyIDIxLjc5MjYgNjY1LjkwOCAyMS4xMTk5IDY2NC42MzYgMjEuMTE5OVYyMS4xMTk5Wk02NjkuMDE1IDMxLjAxODFINjY2LjA0M1YzMi45ODY0SDY2OC45MDlWMzMuODMxMkg2NjYuMDQzVjM1Ljg2MTlINjY5LjEwM1YzNi43MDU1SDY2NS4wNDZWMzAuMTc1Mkg2NjkuMDE1TDY2OS4wMTUgMzEuMDE4MVpNNjcxLjQ0MiAzNi43MDkzSDY3Mi4zNTJWMzAuMTczM0g2NzEuNDQyVjM2LjcwOTNaTTY3Ni44NTkgMzMuMDQ4NEM2NzcuNTA0IDMzLjA0ODQgNjc3LjkwNCAzMy40NjMxIDY3Ny45MzUgMzQuMTE0Mkg2NzUuNjE2QzY3NS43NDIgMzMuNDM0MiA2NzYuMTYxIDMzLjA0ODQgNjc2Ljg1OSAzMy4wNDg0Wk02NzUuNiAzNC42ODFINjc4Ljg0MkM2NzguODQyIDMzLjA4NjkgNjc4LjA2MiAzMi4zMTggNjc2LjgzOCAzMi4zMThDNjc1LjU2OSAzMi4zMTggNjc0LjY4OCAzMy4xOTI0IDY3NC42ODggMzQuNDk2OUM2NzQuNjg4IDM1LjY4OSA2NzUuNDg0IDM2Ljc4OTggNjc2LjkxNyAzNi43ODk4QzY3Ny42OTggMzYuNzg5OCA2NzguMjAzIDM2LjYyODEgNjc4Ljc2MyAzNi4yODJWMzUuNDU2QzY3OC4yMjIgMzUuNzg1NiA2NzcuNjk4IDM1Ljk3NTggNjc3LjE0NyAzNS45NzU4QzY3Ni4yNjUgMzUuOTc1OCA2NzUuNzQyIDM1LjUzNSA2NzUuNiAzNC42ODA2VjM0LjY4MVpNNjg0Ljc4NiAzMy41MzA5QzY4NC4yNjMgMzMuMTk2NiA2ODMuOTE0IDMzLjA5ODUgNjgzLjUxNSAzMy4wOTg1QzY4Mi42ODIgMzMuMDk4NSA2ODIuMTA1IDMzLjY5NDUgNjgyLjEwNSAzNC41NjdDNjgyLjEwNSAzNS40NTYgNjgyLjcxOSAzNS45OTE2IDY4My42NjggMzUuOTkxNkM2ODQuMDU4IDM1Ljk5MTYgNjg0LjQzIDM1Ljg5NzMgNjg0Ljg4OCAzNS43MDU5VjM2LjU0MjZDNjg0LjU4MiAzNi42Nzc0IDY4My45OTcgMzYuNzg5OCA2ODMuNTE1IDM2Ljc4OThDNjgyLjEzNiAzNi43ODk4IDY4MS4xOCAzNS45MDYyIDY4MS4xOCAzNC42NDMyQzY4MS4xOCAzMy4yMTc4IDY4Mi4wNTQgMzIuMzE4IDY4My40NTMgMzIuMzE4QzY4My45ODcgMzIuMzE4IDY4NC4zNDYgMzIuNDMzOSA2ODQuNzg3IDMyLjYxNDVMNjg0Ljc4NiAzMy41MzA5Wk02ODguOTM0IDMyLjQwMDRINjkwLjM5NVYzMy4xNjUxSDY4OC45MzRWMzUuMzc1MkM2ODguOTM0IDM1Ljg4MTEgNjg5LjMyNyAzNi4wMjc0IDY4OS41OTMgMzYuMDI3NEM2ODkuOTIyIDM2LjAyNzQgNjkwLjI2MiAzNS45MiA2OTAuNjMgMzUuNzA3OVYzNi41MDM3QzY5MC4zMSAzNi42Njc4IDY4OS44MiAzNi43ODk4IDY4OS41MTkgMzYuNzg5OEM2ODguNTI4IDM2Ljc4OTggNjg4LjAyNyAzNi4yMTYxIDY4OC4wMjcgMzUuNDM5MVYzMy4xNjUxSDY4Ny4yMjRWMzMuMDcwM0w2ODguOTM0IDMxLjUxMDJWMzIuNDAwNFpNNjkzLjg3NiAzMi40MDA0VjMzLjM5NjlINjkzLjg5NUM2OTQuMzU5IDMyLjYzNDUgNjk0LjggMzIuMzE4IDY5NS4yMyAzMi4zMThDNjk1LjYwMSAzMi4zMTggNjk1Ljk0NyAzMi40ODAxIDY5Ni4zMjkgMzIuODE2Nkw2OTUuODQ3IDMzLjU2NDRDNjk1LjU3IDMzLjMwOTEgNjk1LjIxMSAzMy4xMzMxIDY5NC45OTUgMzMuMTMzMUM2OTQuMzY4IDMzLjEzMzEgNjkzLjg3NiAzMy43MjY4IDY5My44NzYgMzQuNDYyNlYzNi43MDkzSDY5Mi45NjdWMzIuNDAwNEg2OTMuODc2Wk03MDUuNjU3IDMzLjUzMDlDNzA1LjEzMSAzMy4xOTY2IDcwNC43ODIgMzMuMDk4NSA3MDQuMzgxIDMzLjA5ODVDNzAzLjU0OSAzMy4wOTg1IDcwMi45NzcgMzMuNjk0NSA3MDIuOTc3IDM0LjU2N0M3MDIuOTc3IDM1LjQ1NiA3MDMuNTkyIDM1Ljk5MTYgNzA0LjUzNSAzNS45OTE2QzcwNC45MjUgMzUuOTkxNiA3MDUuMjk1IDM1Ljg5NzMgNzA1Ljc2IDM1LjcwNTlWMzYuNTQyNkM3MDUuNDQ3IDM2LjY3NzQgNzA0Ljg2MiAzNi43ODk4IDcwNC4zOCAzNi43ODk4QzcwMy4wMDQgMzYuNzg5OCA3MDIuMDQ0IDM1LjkwNjIgNzAyLjA0NCAzNC42NDMyQzcwMi4wNDQgMzMuMjE3OCA3MDIuOTIyIDMyLjMxOCA3MDQuMzIgMzIuMzE4QzcwNC44NTUgMzIuMzE4IDcwNS4yMTIgMzIuNDMzOSA3MDUuNjU3IDMyLjYxNDVMNzA1LjY1NyAzMy41MzA5Wk02OTguNzQyIDM2LjcwOTNINjk5LjY1MlYzMi40MDA4SDY5OC43NDJWMzYuNzA5M1oiIGZpbGw9IiMwMDlFNEQiLz4NCjxwYXRoIGQ9Ik02OTkuNjg0IDMwLjg1MjVDNjk5Ljc3MyAzMS4wNjA0IDY5OS42MTggMzEuMzU0NCA2OTkuMzQ0IDMxLjUwNDFDNjk5LjA2OCAzMS42NTQzIDY5OC43NzYgMzEuNjA2MiA2OTguNjkzIDMxLjM5NzhDNjk4LjYxIDMxLjE4NzQgNjk4Ljc2MSAzMC44OTU4IDY5OS4wMzggMzAuNzQ1NkM2OTkuMzExIDMwLjU5MzUgNjk5LjYwMSAzMC42NDIxIDY5OS42ODQgMzAuODUyNVYzMC44NTI1Wk02NTguOTQgMzEuMjAwOUM2NTguNzc5IDMxLjIwMDkgNjU4LjcxMSAzMS4yMjU1IDY1OC42NDYgMzEuMjkzOEM2NTguNjIgMzEuMzIwMyA2NTguNjEgMzEuMzQ3MiA2NTguNiAzMS40MDExTDY1Ny43ODQgMzQuMjg3QzY1Ny41OTMgMzUuMjk5MiA2NTYuMjU5IDM2LjMwOTkgNjU0LjUyMSAzNi4zMDk5SDY1Mi4xMDRMNjUyLjUyMyAzNC44MjdINjU0LjA3NkM2NTQuMjM0IDM0LjgyNyA2NTQuMzU4IDM0Ljc3MjEgNjU0LjQ2MiAzNC42NjQzQzY1NC41IDM0LjYyMjUgNjU0LjU1IDM0LjU1NyA2NTQuNTU2IDM0LjQ4OTZMNjU1LjIwMSAzMS45NjgxQzY1NS4zOTEgMzAuOTU1NSA2NTYuNTM4IDI5LjgzNjkgNjU4LjI3NiAyOS44MzY5SDY2MC43NTFMNjYwLjQzNSAzMS4yMDA5SDY1OC45NFpNNjU5LjQ5NyAzMi45NTk2TDY1OS43NzMgMzIuMDI1OUg2NjIuMjg4QzY2Mi41OTggMzAuNjcyIDY2Mi4zNTQgMjkuNDE3NyA2NjEuNDczIDI4LjU5NjFDNjU5LjY4OSAyNi45MzMyIDY1NS45NTcgMjcuNDk4MyA2NTMuMTc3IDI5Ljk3NzlDNjUyLjc0MyAzMC4zNjMgNjUyLjM3NiAzMC43NzkzIDY1Mi4wNDIgMzEuMjA0OEg2NTMuNTU2TDY1My4yMDQgMzIuMTQwNEg2NTEuMzk1QzY1MS4yMjIgMzIuNDM1NCA2NTEuMDYgMzIuNzI4MSA2NTAuOTM2IDMzLjAyNUg2NTMuMDgxTDY1Mi43MzcgMzMuOTYwN0g2NTAuNjNDNjUwLjI2OSAzNS4zOTAxIDY1MC40OTkgMzYuNzIzMyA2NTEuNDA2IDM3LjU2OTlDNjUzLjE2NyAzOS4yMTE2IDY1Ni44ODggMzguNjM0NiA2NTkuNjY3IDM2LjE1NTRDNjYwLjE1MyAzNS43MjQyIDY2MC41NTUgMzUuMjU4NyA2NjAuOTE4IDM0Ljc4MDhINjU4Ljk3M0w2NTkuMjY5IDMzLjg0NzFINjYxLjU0M0M2NjEuNzEgMzMuNTUwMSA2NjEuODYzIDMzLjI1NjUgNjYxLjk4MyAzMi45NTk2SDY1OS40OTdaIiBmaWxsPSIjMDA5RTREIi8+DQo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNThfMTExKSI+DQo8cGF0aCBkPSJNNzc1LjA2OCA0MS4yMjc0Qzc2Ni4yODUgNDIuMDQ2MyA3NTcuMTMxIDQwLjc1NjQgNzU1Ljg0OCAzMy44MTlDNzU1LjIyMSAzMC4zOTkgNzU2Ljc2NSAyNi43NzI1IDc1OC44MSAyNC41MTg0VjIzLjMxNDhDNzU1LjEyNiAyNi41OCA3NTMuMTMgMzAuNzExNSA3NTQuMjggMzUuNTkyQzc1NS43NDggNDEuODUxOCA3NjMuNjAzIDQ1LjM5NjcgNzc1LjU5NSA0NC4yMTk1Qzc4MC4zNDIgNDMuNzU0NSA3ODYuNTUgNDIuMjEyIDc5MC44NjkgMzkuODE0NFYzNi40MTA5Qzc4Ni45NDkgMzguNzcxMyA3ODAuNDY4IDQwLjcyMTEgNzc1LjA2OCA0MS4yMjc0VjQxLjIyNzRaTTc5OC4yMDUgMjMuMjMzNUM3OTYuMTIyIDEyLjk1MzMgNzc2LjM3MyAxMi4zMDE2IDc2My42NDMgMjAuMTMzOFYyMC45OTg5Qzc3Ni4zNTkgMTQuMzkxNSA3OTQuMzk1IDE0LjQzMTcgNzk2LjAzNyAyMy45MDE2Qzc5Ni41ODkgMjcuMDM0MiA3OTQuODQzIDMwLjI5NzggNzkxLjcyMyAzMi4xNzdWMzQuNjM0MkM3OTUuNDc2IDMzLjI0MzIgNzk5LjMyNCAyOC43NDQyIDc5OC4yMDUgMjMuMjMzNVYyMy4yMzM1WiIgZmlsbD0iIzBFN0RDMiIvPg0KPHBhdGggZD0iTTc5MC4xNTkgMjEuNzM2OEg3ODcuODU2VjMyLjEwM0M3ODcuODU2IDMzLjMxNzkgNzg4LjQzNyAzNC4zNzQ0IDc5MC4xNTkgMzQuNTQzMlYyMS43MzY4Wk03NjIuNzM5IDI1LjUyMTdINzYwLjQzMkw3NjAuNDMxIDMyLjI5NDNDNzYwLjQzMSAzMy41MTM0IDc2MS4wMTMgMzQuNTY4OCA3NjIuNzM5IDM0LjczNDRWMjUuNTIxN1YyNS41MjE3Wk03NjAuNDMyIDIyLjA1MjFINzYyLjczMlYyNC4yNTg0SDc2MC40MzJWMjIuMDUyMVpNNzc2LjUzIDM0LjYyNzJDNzc0LjY2NiAzNC42MjcyIDc3My44NzcgMzMuMzE3NyA3NzMuODc3IDMyLjAyOFYyMy4wMzU1SDc3Ni4xNlYyNS41MjE3SDc3Ny44NzlWMjcuMzg1M0g3NzYuMTZWMzEuODg1NEM3NzYuMTYgMzIuNDExMyA3NzYuNDA3IDMyLjcwNDQgNzc2Ljk1IDMyLjcwNDRINzc3Ljg3OVYzNC42MjcyTDc3Ni41MyAzNC42MjcyVjM0LjYyNzJaTTc4MC43MzEgMzAuNzk2MUM3ODAuNzMxIDMxLjk3NjggNzgxLjQ2MSAzMi44NDQ2IDc4Mi43NTQgMzIuODQ0NkM3ODMuNzY2IDMyLjg0NDYgNzg0LjI2NiAzMi41NjA1IDc4NC44NSAzMS45NzY4TDc4Ni4yNjEgMzMuMzM0OUM3ODUuMzU3IDM0LjIzNzkgNzg0LjQwOSAzNC43ODcgNzgyLjczNyAzNC43ODdDNzgwLjU1MiAzNC43ODcgNzc4LjQ1OSAzMy41ODE5IDc3OC40NTkgMzAuMDY4NkM3NzguNDU5IDI3LjA2NTEgNzgwLjI4OCAyNS4zNjczIDc4Mi42ODYgMjUuMzY3M0M3ODUuMTI0IDI1LjM2NzMgNzg2LjUyNSAyNy4zNTQ5IDc4Ni41MjUgMjkuOTYzOVYzMC43OTYzSDc4MC43MzFWMzAuNzk2MVpNNzgyLjU4NiAyNy4yNzU2Qzc4MS44MDUgMjcuMjc1NiA3ODEuMjA0IDI3LjY4MjMgNzgwLjk1IDI4LjIzMDlDNzgwLjgwMiAyOC41NjA3IDc4MC43NDcgMjguODE3NyA3ODAuNzMxIDI5LjIyMjlINzg0LjI0OUM3ODQuMjA0IDI4LjIzMDkgNzgzLjc1OSAyNy4yNzU2IDc4Mi41ODYgMjcuMjc1NlpNNzY4LjkzOSAyNy4zODUzQzc2OS42MDggMjcuMzg1MyA3NjkuODg3IDI3LjcxOTggNzY5Ljg4NyAyOC4yNjI2VjM0LjY0MDZINzcyLjE3VjI4LjI0OTJDNzcyLjE3IDI2Ljk1NDIgNzcxLjQ4NyAyNS41MjQxIDc2OS40ODIgMjUuNTI0MUw3NjQuNzY2IDI1LjUyMTdWMzQuNjQwNkg3NjcuMDVWMjcuMzg1M0g3NjguOTM5VjI3LjM4NTNaTTc5Mi42MzcgMjMuNTg5MUM3OTIuMTI5IDIzLjU4OTEgNzkxLjcyNCAyMy4xNzU0IDc5MS43MjQgMjIuNjYyOUM3OTEuNzI0IDIyLjE1MjkgNzkyLjEyOSAyMS43MzY4IDc5Mi42MzcgMjEuNzM2OEM3OTMuMTQyIDIxLjczNjggNzkzLjU1NiAyMi4xNTI5IDc5My41NTYgMjIuNjYyOUM3OTMuNTU2IDIzLjE3NTQgNzkzLjE0MiAyMy41ODkxIDc5Mi42MzcgMjMuNTg5MVpNNzkyLjYzNyAyMS44OTEyQzc5Mi4yMTggMjEuODkxMiA3OTEuODgyIDIyLjI0MDcgNzkxLjg4MiAyMi42NjI5Qzc5MS44ODIgMjMuMDg3NiA3OTIuMjE4IDIzLjQzMDkgNzkyLjYzNyAyMy40MzA5Qzc5My4wNTUgMjMuNDMwOSA3OTMuNDAyIDIzLjA4NzYgNzkzLjQwMiAyMi42NjI5Qzc5My40MDIgMjIuMjQwNyA3OTMuMDU1IDIxLjg5MTIgNzkyLjYzNyAyMS44OTEyWk03OTMuMDQzIDIzLjIxOEg3OTIuODcyQzc5Mi44NjQgMjMuMjE3OSA3OTIuODU3IDIzLjIxNTcgNzkyLjg1MSAyMy4yMTE2Qzc5Mi44NDUgMjMuMjA3NSA3OTIuODQgMjMuMjAxNyA3OTIuODM3IDIzLjE5NDlMNzkyLjYwNSAyMi43OTdDNzkyLjU5OCAyMi43ODg1IDc5Mi41NzkgMjIuNzc4OCA3OTIuNTczIDIyLjc3ODhINzkyLjQ2N1YyMy4xNzU0Qzc5Mi40NjcgMjMuMTk1IDc5Mi40NTMgMjMuMjE4MSA3OTIuNDI4IDIzLjIxODFINzkyLjI3NEM3OTIuMjUxIDIzLjIxODEgNzkyLjIzNSAyMy4xOTUgNzkyLjIzNSAyMy4xNzU0VjIyLjE3NDlDNzkyLjIzNSAyMi4xMTY0IDc5Mi4yNTQgMjIuMDkyNCA3OTIuMzA1IDIyLjA4NUM3OTIuMzYxIDIyLjA3OSA3OTIuNTA1IDIyLjA3MTYgNzkyLjU4NiAyMi4wNzE2Qzc5Mi44NzIgMjIuMDcxNiA3OTMuMDM5IDIyLjE1NjYgNzkzLjAzOSAyMi40MjQ0VjIyLjQ0NEM3OTMuMDM5IDIyLjYwOTQgNzkyLjk1OSAyMi42OTk1IDc5Mi44MzMgMjIuNzM5N0w3OTMuMDc0IDIzLjE1NDdDNzkzLjA3OCAyMy4xNjQgNzkzLjA4IDIzLjE3MzkgNzkzLjA4IDIzLjE4NEM3OTMuMDggMjMuMTk5NyA3OTMuMDcyIDIzLjIxOCA3OTMuMDQzIDIzLjIxOFYyMy4yMThaTTc5Mi44MjEgMjIuNDI0NEM3OTIuODIxIDIyLjMxMjcgNzkyLjc1MiAyMi4yNzczIDc5Mi42MDUgMjIuMjc3M0g3OTIuNDU5VjIyLjU5NDdDNzkyLjQ4MiAyMi41OTQ3IDc5Mi41ODYgMjIuNTk5NiA3OTIuNjA1IDIyLjU5OTZDNzkyLjc1MiAyMi41OTk2IDc5Mi44MjEgMjIuNTUgNzkyLjgyMSAyMi40NDRWMjIuNDI0NFoiIGZpbGw9IiMwRTdEQzIiLz4NCjwvZz4NCjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMV81OF8xMTEpIj4NCjxwYXRoIGQ9Ik01MzMuNzczIDIwLjk5MTFDNTI5LjI2MyAyMC45OTExIDUyNS41OTkgMjQuNjU0NyA1MjUuNTk5IDI5LjE2NDRDNTI1LjU5OSAzMy42NzQxIDUyOS4yNjMgMzcuMzM3NyA1MzMuNzczIDM3LjMzNzdDNTM4LjI4MiAzNy4zMzc3IDU0MS45NDYgMzMuNjc0MSA1NDEuOTQ2IDI5LjE2NDRDNTQxLjk0NiAyNC42NTQ3IDUzOC4yODIgMjAuOTkxMSA1MzMuNzczIDIwLjk5MTFaTTUzMy43NzMgMzYuNTE4NkM1MjkuNzEzIDM2LjUxODYgNTI2LjQxOSAzMy4yMTUgNTI2LjQxOSAyOS4xNjQ0QzUyNi40MTkgMjUuMTEzNyA1MjkuNzEzIDIxLjgxMDIgNTMzLjc3MyAyMS44MTAyQzUzNy44MzIgMjEuODEwMiA1NDEuMTI3IDI1LjExMzcgNTQxLjEyNyAyOS4xNjQ0QzU0MS4xMjcgMzMuMjE1IDUzNy44MzIgMzYuNTE4NiA1MzMuNzczIDM2LjUxODZaIiBmaWxsPSJibGFjayIvPg0KPHBhdGggZD0iTTUzNi42OSAyMy45MjUyQzUzNi42NjMgMjMuOTA3MiA1MzYuNjI3IDIzLjg5ODIgNTM2LjU5MSAyMy44OTgyQzUzNi40ODMgMjMuODk4MiA1MzYuNDAyIDIzLjk3OTIgNTM2LjQwMiAyNC4wODczVjI2LjY0MzdDNTM2LjQwMiAyNi43MzM3IDUzNi4zMyAyNi44MDU3IDUzNi4yNCAyNi44MDU3SDUzMS4yOUM1MzEuMiAyNi44MDU3IDUzMS4xMzcgMjYuNzMzNyA1MzEuMTI4IDI2LjY0MzdWMjQuMDg3M0M1MzEuMTI4IDI0LjA1MTMgNTMxLjExOSAyNC4wMjQyIDUzMS4xMDEgMjMuOTg4MkM1MzEuMDQ3IDIzLjg5ODIgNTMwLjkzIDIzLjg3MTIgNTMwLjgzOSAyMy45MjUyQzUyOS4wMTIgMjUuMDUwNCA1MjcuOTA1IDI3LjAwMzcgNTI3LjkwNSAyOS4xNjQxQzUyNy45MDUgMzEuMzI0NCA1MjkuMDEyIDMzLjI3NzcgNTMwLjg1NyAzNC40MDI5QzUzMC44ODUgMzQuNDIwOSA1MzAuOTIxIDM0LjQyOTkgNTMwLjk1NyAzNC40Mjk5QzUzMS4wNjUgMzQuNDI5OSA1MzEuMTQ2IDM0LjM0ODkgNTMxLjE0NiAzNC4yNDA5VjMxLjY4NDVDNTMxLjE0NiAzMS41OTQ0IDUzMS4yMTggMzEuNTMxNCA1MzEuMzA4IDMxLjUyMjRINTM2LjI1OEM1MzYuMzQ4IDMxLjUyMjQgNTM2LjQyIDMxLjU5NDQgNTM2LjQyIDMxLjY4NDVWMzQuMjQwOUM1MzYuNDIgMzQuMjc2OSA1MzYuNDI5IDM0LjMwMzkgNTM2LjQ0NyAzNC4zMzk5QzUzNi41MDEgMzQuNDI5OSA1MzYuNjE4IDM0LjQ1NjkgNTM2LjcwOCAzNC40MDI5QzUzOC41NTQgMzMuMjc3NyA1MzkuNjYxIDMxLjMyNDQgNTM5LjY2MSAyOS4xNjQxQzUzOS42NjEgMjcuMDAzNyA1MzguNTM2IDI1LjA1MDQgNTM2LjY5IDIzLjkyNTJWMjMuOTI1MlpNNTMwLjE5MSAzMi4zNjg2TDUzMC4yMTggMzIuNjc0Nkw1MzAuMDIgMzIuNDMxNkM1MjguNDk5IDMwLjUxNDMgNTI4LjQ5OSAyNy44MDQ4IDUzMC4wMiAyNS44ODc1TDUzMC4xOTEgMjUuNjcxNUw1MzAuMjE4IDI1LjY0NDVMNTMwLjE5MSAyNS45NTk2QzUzMC4xNjQgMjYuMjExNiA1MzAuMTU1IDI2LjQ3MjYgNTMwLjE1NSAyNi43MzM3VjMxLjU4NTRDNTMwLjE1NSAzMS44NDY1IDUzMC4xNzMgMzIuMTA3NSA1MzAuMTkxIDMyLjM2ODZaTTUzNi40MDIgMzAuMzg4M0M1MzYuNDAyIDMwLjQ3ODMgNTM2LjMzIDMwLjU1MDMgNTM2LjI0IDMwLjU1MDNINTMxLjI5QzUzMS4yIDMwLjU1MDMgNTMxLjEzNyAzMC40NzgzIDUzMS4xMjggMzAuMzg4M1YyNy45Mzk5QzUzMS4xMjggMjcuODQ5OSA1MzEuMiAyNy43Nzc4IDUzMS4yOSAyNy43Nzc4SDUzNi4yNEM1MzYuMzMgMjcuNzc3OCA1MzYuNDAyIDI3Ljg0OTkgNTM2LjQwMiAyNy45Mzk5VjMwLjM4ODNaTTUzNy41MTkgMzIuNDMxNkw1MzcuMzIxIDMyLjY3NDZMNTM3LjM0OCAzMi4zNjg2QzUzNy4zNzUgMzIuMTE2NSA1MzcuMzg0IDMxLjg1NTUgNTM3LjM4NCAzMS41OTQ0VjI2LjczMzdDNTM3LjM4NCAyNi40NzI2IDUzNy4zNzUgMjYuMjExNiA1MzcuMzQ4IDI1Ljk1OTZMNTM3LjMzOSAyNS44MjQ1TDUzNy4zMyAyNS42ODA1VjI1LjY0NDVMNTM3LjUxOSAyNS44ODc1QzUzOC4yNTcgMjYuODA1NyA1MzguNjYyIDI3Ljk3NTkgNTM4LjY2MiAyOS4xNTUxQzUzOC42NjIgMzAuMzM0MiA1MzguMjU3IDMxLjUxMzQgNTM3LjUxOSAzMi40MzE2VjMyLjQzMTZaIiBmaWxsPSJibGFjayIvPg0KPHBhdGggZD0iTTU1NC4yNzYgMjkuMDIwMkM1NTQuMjMxIDI5LjAwMjIgNTU0LjE3NyAyOC45ODQyIDU1NC4xNzcgMjguOTMwMkM1NTQuMTc3IDI4Ljg5NDIgNTU0LjE5NSAyOC44NjcyIDU1NC4yMzEgMjguODQ5MkM1NTQuMjk0IDI4LjgyMjIgNTU1Ljg1MSAyOC4yNjQxIDU1NS44NTEgMjYuNDI3OEM1NTUuODUxIDI0LjM4NDUgNTU0LjQ3NCAyMy4xNjkzIDU1Mi4xNTIgMjMuMTY5M0g1NDYuNTI2VjM1LjE3NzJINTUyLjY2NUM1NTQuNDU2IDM1LjE3NzIgNTU2LjM4MiAzMy45MDggNTU2LjM4MiAzMS44NjQ2QzU1Ni4zODIgMjkuOTExMyA1NTQuOTA2IDI5LjIyNzIgNTU0LjI3NiAyOS4wMjAyVjI5LjAyMDJaTTU0OS4zNjEgMjUuNjI2N0M1NDkuMzYxIDI1LjU4MTcgNTQ5LjM5NyAyNS41NDU2IDU0OS40NDIgMjUuNTQ1Nkg1NTEuNjc1QzU1Mi40MTMgMjUuNTQ1NiA1NTIuOTE3IDI2LjA0MDcgNTUyLjkxNyAyNi43Nzg4QzU1Mi45MTcgMjcuMzU0OSA1NTIuNDY3IDI3Ljk3NiA1NTEuNjIxIDI3Ljk3Nkg1NDkuNDQyQzU0OS4zOTcgMjcuOTc2IDU0OS4zNjEgMjcuOTQgNTQ5LjM2MSAyNy44OTVWMjUuNjI2N1pNNTUxLjY3NSAzMi44MDk4SDU0OS40NDJDNTQ5LjM5NyAzMi44MDk4IDU0OS4zNjEgMzIuNzczOCA1NDkuMzYxIDMyLjcyODhWMzAuMzM0NEM1NDkuMzYxIDMwLjI4OTQgNTQ5LjM5NyAzMC4yNTM0IDU0OS40NDIgMzAuMjUzNEg1NTEuNjIxQzU1Mi42OTIgMzAuMjUzNCA1NTMuMzA0IDMwLjcxMjUgNTUzLjMwNCAzMS41MjI2QzU1My4zMDQgMzIuMzU5NyA1NTIuNzM3IDMyLjgwOTggNTUxLjY3NSAzMi44MDk4VjMyLjgwOThaTTU3NS4zODQgMjcuOTQ5TDU3NC45NTIgMjcuODU5QzU3My45OCAyNy42NTIgNTczLjAzNSAyNy4zOTA5IDU3My4wMzUgMjYuNTUzOEM1NzMuMDM1IDI1LjcxNjcgNTczLjgxOCAyNS4zMzg2IDU3NC41OTIgMjUuMzM4NkM1NzUuNTAxIDI1LjMzODYgNTc2LjQwMSAyNS43NDM3IDU3Ny4wODYgMjYuNDQ1OEw1NzguODY4IDI0LjY4MTVDNTc4LjEwMyAyMy44MzU0IDU3Ni43NDQgMjIuODYzMiA1NzQuNTQ3IDIyLjg2MzJDNTcxLjkwMSAyMi44NjMyIDU3MC4xMTggMjQuMzY2NSA1NzAuMTE4IDI2LjYwNzhDNTcwLjExOCAyOC45NzUyIDU3MS45ODIgMjkuODY2MyA1NzMuNTQ4IDMwLjE5OTRMNTczLjk3MSAzMC4yODk0QzU3NS40OTIgMzAuNjEzNSA1NzYuMjEyIDMwLjg1NjUgNTc2LjIxMiAzMS43MjA2QzU3Ni4yMTIgMzIuNDk0NyA1NzUuNTE5IDMzLjAwNzggNTc0LjQ5MyAzMy4wMDc4QzU3My4yODcgMzMuMDA3OCA1NzIuMjE2IDMyLjQ3NjcgNTcxLjQwNiAzMS40Nzc2TDU2OS41NzggMzMuMjY4OUM1NzAuNTUxIDM0LjQyMTEgNTcxLjgzOCAzNS40NjUyIDU3NC41MjkgMzUuNDY1MkM1NzYuODI1IDM1LjQ2NTIgNTc5LjE1NiAzNC4xMzMgNTc5LjE1NiAzMS41NzY2QzU3OS4xNDcgMjguOTU3MiA1NzcuMzY1IDI4LjM2MzEgNTc1LjM4NCAyNy45NDlWMjcuOTQ5Wk01OTkuMTAzIDIzLjE2OTNWMjcuNTYyQzU5OS4xMDMgMjcuNjA3IDU5OS4wNjcgMjcuNjQzIDU5OS4wMjIgMjcuNjQzSDU5NS4zMzFDNTk1LjI4NiAyNy42NDMgNTk1LjI1IDI3LjYwNyA1OTUuMjUgMjcuNTYyVjIzLjE2OTNINTkyLjIyNlYzNS4xNzcySDU5NS4yNVYzMC40NjA0QzU5NS4yNSAzMC40MTU0IDU5NS4yODYgMzAuMzc5NCA1OTUuMzMxIDMwLjM3OTRINTk5LjAyMkM1OTkuMDY3IDMwLjM3OTQgNTk5LjEwMyAzMC40MTU0IDU5OS4xMDMgMzAuNDYwNFYzNS4xNzcySDYwMi4xNDZWMjMuMTY5M0g1OTkuMTAzWk01ODYuMTQxIDMyLjcxOThDNTg0Ljc4MiAzMi43MTk4IDU4My4zMTUgMzEuNTg1NiA1ODMuMzE1IDI5LjA5MjJDNTgzLjMxNSAyNi44MTQ4IDU4NC42OTIgMjUuNjI2NyA1ODYuMDUxIDI1LjYyNjdDNTg3LjA0MSAyNS42MjY3IDU4Ny43MzQgMjYuMDQwNyA1ODguMjgzIDI2Ljk1ODlMNTkwLjYwNiAyNS40MTk2QzU4OS40MTggMjMuNjczMyA1ODguMDA0IDIyLjg4MTIgNTg2LjAzMyAyMi44ODEyQzU4Mi4xNzEgMjIuODgxMiA1ODAuNDQzIDI2LjAwNDcgNTgwLjQ0MyAyOS4wOTIyQzU4MC40NDMgMzIuODQ1OCA1ODIuNzI5IDM1LjQ2NTIgNTg1Ljk5NyAzNS40NjUyQzU4OC40MjcgMzUuNDY1MiA1ODkuNTM1IDM0LjU3NDEgNTkwLjY5NiAzMi45MjY4TDU4OC4zNTUgMzEuMzUxNkM1ODcuODMzIDMyLjE5NzcgNTg3LjI2NiAzMi43MTk4IDU4Ni4xNDEgMzIuNzE5OFpNNTYzLjE3OCAyMi44NjMyQzU1OS44NzUgMjIuODYzMiA1NTcuNjYxIDI1LjM5MjYgNTU3LjY2MSAyOS4xNjQyQzU1Ny42NjEgMzIuOTM1OCA1NTkuODc1IDM1LjQ2NTIgNTYzLjE3OCAzNS40NjUyQzU2Ni40ODIgMzUuNDY1MiA1NjguNjk2IDMyLjkzNTggNTY4LjY5NiAyOS4xNjQyQzU2OC42OTYgMjUuMzkyNiA1NjYuNDgyIDIyLjg2MzIgNTYzLjE3OCAyMi44NjMyVjIyLjg2MzJaTTU2My4xNzggMzIuNzE5OEM1NjEuNTU4IDMyLjcxOTggNTYwLjUxNCAzMS4zMjQ2IDU2MC41MTQgMjkuMTY0MkM1NjAuNTE0IDI3LjAxMjkgNTYxLjU1OCAyNS42MjY3IDU2My4xNzggMjUuNjI2N0M1NjQuODA4IDI1LjYyNjcgNTY1Ljg2MSAyNy4wMTI5IDU2NS44NjEgMjkuMTY0MkM1NjUuODYxIDMxLjMyNDYgNTY0LjgwOCAzMi43MTk4IDU2My4xNzggMzIuNzE5OFoiIGZpbGw9IiNGODAwMDAiLz4NCjwvZz4NCjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQ2LjM0NCAyMi4xODExQzE0Ny41OTUgMjIuMjg1NCAxNDguODQ1IDIxLjU1NTMgMTQ5LjYyNyAyMC42Mjk4QzE1MC4zOTUgMTkuNjc4MSAxNTAuOTAzIDE4LjQwMDUgMTUwLjc3MyAxNy4wOTY5QzE0OS42NjYgMTcuMTQ5MSAxNDguMjk4IDE3LjgyNjkgMTQ3LjUxNyAxOC43Nzg2QzE0Ni44IDE5LjU5OTkgMTQ2LjE4OCAyMC45Mjk2IDE0Ni4zNDQgMjIuMTgxMVpNMTQ3Ljg0MSAyMy4wNzk3QzE0OC42NTMgMjIuNzYwNiAxNDkuNjU4IDIyLjM2NTYgMTUwLjc2IDIyLjQyOTFDMTUxLjQ2MyAyMi40ODEyIDE1My40OTUgMjIuNjg5OCAxNTQuNzk4IDI0LjYxOTJDMTU0Ljc5MiAyNC42MjM3IDE1NC43NzggMjQuNjMyMyAxNTQuNzU5IDI0LjY0NUMxNTQuNDM2IDI0Ljg1NDggMTUyLjM5IDI2LjE4NzEgMTUyLjQxNCAyOC44MTY5QzE1Mi40MzkgMzEuOTQ5OSAxNTQuOTg4IDMzLjExODMgMTU1LjMyMiAzMy4yNzExQzE1NS4zNDQgMzMuMjgxMSAxNTUuMzU2IDMzLjI4NjcgMTU1LjM1OCAzMy4yODgzQzE1NS4zNTYgMzMuMjkyNiAxNTUuMzU0IDMzLjMwMSAxNTUuMzUgMzMuMzEzM0MxNTUuMjgzIDMzLjUyODggMTU0Ljg0NSAzNC45NDg5IDE1My44NDcgMzYuNDA0QzE1Mi45MjIgMzcuNzU5OCAxNTEuOTcxIDM5LjA4OTUgMTUwLjQ2IDM5LjExNTZDMTQ5Ljc0OSAzOS4xMjgzIDE0OS4yNyAzOC45MjExIDE0OC43NzIgMzguNzA1NEMxNDguMjQ3IDM4LjQ3ODUgMTQ3LjcwMSAzOC4yNDIyIDE0Ni44NCAzOC4yNDIyQzE0NS45NDcgMzguMjQyMiAxNDUuMzc2IDM4LjQ4NDggMTQ0LjgyNiAzOC43MTg0QzE0NC4zNDggMzguOTIxNCAxNDMuODg3IDM5LjExNzQgMTQzLjI0NSAzOS4xNDE3QzE0MS43ODYgMzkuMTkzOCAxNDAuNjc5IDM3LjcwNzcgMTM5Ljc1NCAzNi4zNTE5QzEzNy44NjYgMzMuNjE0MyAxMzYuNDIgMjguNjM0NCAxMzguMzc0IDI1LjI3MUMxMzkuMzI1IDIzLjU4OTMgMTQxLjA1NyAyMi41MzM0IDE0Mi45MTkgMjIuNTA3M0MxNDMuNzMyIDIyLjQ5MjUgMTQ0LjUwNyAyMi44MDA2IDE0NS4xODQgMjMuMDcwMUMxNDUuNzAyIDIzLjI3NTggMTQ2LjE2MiAyMy40NTg5IDE0Ni41NCAyMy40NTg5QzE0Ni44NzcgMjMuNDU4OSAxNDcuMzE5IDIzLjI4NTEgMTQ3Ljg0MSAyMy4wNzk3WiIgZmlsbD0iYmxhY2siLz4NCjxwYXRoIGQ9Ik0zNi44NTg3IDM3LjUyNDFIMzEuOTg3NEwzNS4wMzQyIDE5LjY2NjhIMzkuOTA1MkwzNi44NTg3IDM3LjUyNDFaIiBmaWxsPSIjMDA1NzlGIi8+DQo8cGF0aCBkPSJNNTQuNTE1NyAyMC4xMDQxQzUzLjU1NDkgMTkuNzQyOCA1Mi4wMzA5IDE5LjM0MzggNTAuMTQ2NiAxOS4zNDM4QzQ1LjMzNjEgMTkuMzQzOCA0MS45NDg2IDIxLjc3NTMgNDEuOTI3OCAyNS4yNTE2QzQxLjg4NzggMjcuODE2NSA0NC4zNTMxIDI5LjI0MSA0Ni4xOTcgMzAuMDk2MkM0OC4wODE2IDMwLjk3MDEgNDguNzIyMyAzMS41NDA1IDQ4LjcyMjMgMzIuMzE5NEM0OC43MDMxIDMzLjUxNTcgNDcuMTk5NCAzNC4wNjcyIDQ1Ljc5NjkgMzQuMDY3MkM0My44NTIxIDM0LjA2NzIgNDIuODEgMzMuNzgyOSA0MS4yMjY0IDMzLjExNzNMNDAuNTg1IDMyLjgzMkwzOS45MDMzIDM2Ljg0MDZDNDEuMDQ1OCAzNy4zMzM5IDQzLjE1MDcgMzcuNzcxNyA0NS4zMzYxIDM3Ljc5MDlDNTAuNDQ3MyAzNy43OTA5IDUzLjc3NDkgMzUuMzk3MSA1My44MTQzIDMxLjY5MjVDNTMuODMzOCAyOS42NTk3IDUyLjUzMiAyOC4xMDIgNDkuNzI1NCAyNi44MjkyQzQ4LjAyMTcgMjYuMDEyMSA0Ni45NzgzIDI1LjQ2MTIgNDYuOTc4MyAyNC42MjUyQzQ2Ljk5ODMgMjMuODY1MiA0Ny44NjA4IDIzLjA4NjggNDkuNzg0IDIzLjA4NjhDNTEuMzY3NyAyMy4wNDg2IDUyLjUzMTIgMjMuNDA5NCA1My40MTI2IDIzLjc3MDVMNTMuODUzMiAyMy45NjAxTDU0LjUxNTcgMjAuMTA0MVoiIGZpbGw9IiMwMDU3OUYiLz4NCjxwYXRoIGQ9Ik02MC45OTI0IDMxLjE5NzlDNjEuMzkzNiAzMC4xNzIgNjIuOTM3MiAyNi4yMDE2IDYyLjkzNzIgMjYuMjAxNkM2Mi45MTcgMjYuMjM5NyA2My4zMzc2IDI1LjE1NjggNjMuNTc4MSAyNC40OTE5TDYzLjkxODYgMjYuMDMwNkM2My45MTg2IDI2LjAzMDYgNjQuODQxIDMwLjMwNTEgNjUuMDQxNCAzMS4xOTc5QzY0LjI4IDMxLjE5NzkgNjEuOTU0NiAzMS4xOTc5IDYwLjk5MjQgMzEuMTk3OVpNNjcuMDA1NCAxOS42NjY4SDYzLjIzNzRDNjIuMDc1NSAxOS42NjY4IDYxLjE5MjcgMTkuOTg5NSA2MC42OTE0IDIxLjE0ODRMNTMuNDU1OCAzNy41MjM5SDU4LjU2NzFDNTguNTY3MSAzNy41MjM5IDU5LjQwODUgMzUuMzE5OSA1OS41ODk0IDM0Ljg0NTJDNjAuMTUwMSAzNC44NDUyIDY1LjEyMjMgMzQuODQ1MiA2NS44NDM3IDM0Ljg0NTJDNjUuOTgzNSAzNS40NzIxIDY2LjQyNDkgMzcuNTIzOSA2Ni40MjQ5IDM3LjUyMzlINzAuOTM1Mkw2Ny4wMDU0IDE5LjY2NjhWMTkuNjY2OFoiIGZpbGw9IiMwMDU3OUYiLz4NCjxwYXRoIGQ9Ik0yNy45MTggMTkuNjY2OEwyMy4xNDc1IDMxLjg0MzhMMjIuNjI2MiAyOS4zNzQxQzIxLjc0NDIgMjYuNTI0NSAxOC45NzgxIDIzLjQyODQgMTUuODkxNCAyMS44ODlMMjAuMjYxIDM3LjUwNTJIMjUuNDEyMkwzMy4wNjkgMTkuNjY2OEgyNy45MThWMTkuNjY2OFoiIGZpbGw9IiMwMDU3OUYiLz4NCjxwYXRoIGQ9Ik0xOC43MTg0IDE5LjY2NjhIMTAuODgxMUwxMC44MDA5IDIwLjAyNzZDMTYuOTE0NSAyMS41MDk1IDIwLjk2MzUgMjUuMDgxNSAyMi42MjcgMjkuMzc0OUwyMC45MjMyIDIxLjE2NzlDMjAuNjQyNyAyMC4wMjc0IDE5Ljc4MDcgMTkuNzA0NCAxOC43MTg0IDE5LjY2NjhaIiBmaWxsPSIjRkFBNjFBIi8+DQo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDJfNThfMTExKSI+DQo8cGF0aCBkPSJNMjIxLjE1OCAxNy40OTlWMTguOTM1NkgyMzEuMzA2VjE3LjQ5OUgyMjEuMTU4Wk0yMzIuNzQ0IDE3LjQ5OVYxOC45MzU2SDI0Ny4yMDZDMjQ3LjIwNiAxOC45MzU2IDI0NS43MjkgMTcuNDk5IDI0My43NzMgMTcuNDk5SDIzMi43NDRaTTI1MC4wNDMgMTcuNDk5VjE4LjkzNTZIMjU4Ljc5M0wyNTguMjczIDE3LjQ5OUgyNTAuMDQzWk0yNjUuMDY1IDE3LjQ5OUwyNjQuNTQ2IDE4LjkzNTZIMjczLjIxNlYxNy40OTlIMjY1LjA2NVpNMjIxLjE1OCAyMC4yOTI5VjIxLjcyOTZIMjMxLjMwNlYyMC4yOTI5SDIyMS4xNThaTTIzMi43NDQgMjAuMjk1VjIxLjcyOTdIMjQ4Ljg4NEMyNDguODg0IDIxLjcyOTcgMjQ4LjY5NiAyMC42MjM5IDI0OC4zNjcgMjAuMjk1SDIzMi43NDRaTTI1MC4wNDMgMjAuMjk1VjIxLjcyOTdIMjU5Ljc1MkwyNTkuMjcxIDIwLjI5NUgyNTAuMDQzWk0yNjQuMDI3IDIwLjI5NUwyNjMuNTQ2IDIxLjcyOTdIMjczLjIxNlYyMC4yOTVIMjY0LjAyN1YyMC4yOTVaTTIyNC4wNzQgMjMuMDg2OVYyNC41MjU3SDIyOC40NjlWMjMuMDg2OUgyMjQuMDc0VjIzLjA4NjlaTTIzNS42NjEgMjMuMDg2OVYyNC41MjU3SDI0MC4wNTZWMjMuMDg2OUgyMzUuNjYxVjIzLjA4NjlaTTI0NC4zMzEgMjMuMDg2OVYyNC41MjU3SDI0OC43MjZDMjQ4LjcyNiAyNC41MjU3IDI0OS4wMDUgMjMuNzY1OSAyNDkuMDA1IDIzLjA4NjlIMjQ0LjMzMVYyMy4wODY5Wk0yNTIuOTYgMjMuMDg2OVYyNC41MjU3SDI2MC43NTJMMjYwLjIzMiAyMy4wODY5SDI1Mi45NlYyMy4wODY5Wk0yNjMuMDY5IDIzLjA4NjlMMjYyLjU0OCAyNC41MjU3SDI3MC4zNzlWMjMuMDg2OUgyNjMuMDY5VjIzLjA4NjlaTTIyNC4wNzQgMjUuODgzVjI3LjMxOTdIMjI4LjQ2OVYyNS44ODNIMjI0LjA3NFYyNS44ODNaTTIzNS42NjEgMjUuODgzVjI3LjMxOTdIMjQ2Ljg4N0MyNDYuODg3IDI3LjMxOTcgMjQ3LjgyNiAyNi41ODI1IDI0OC4xMjUgMjUuODgzSDIzNS42NjFaTTI1Mi45NiAyNS44ODNWMjcuMzE5N0gyNTcuMzU1VjI2LjUyTDI1Ny42MzQgMjcuMzE5N0gyNjUuNjg0TDI2NS45ODQgMjYuNTJWMjcuMzE5N0gyNzAuMzc5VjI1Ljg4M0gyNjIuMTI5TDI2MS42OTEgMjcuMDk5OUwyNjEuMjUxIDI1Ljg4M0gyNTIuOTZaTTIyNC4wNzQgMjguNjc3VjMwLjExMzdIMjI4LjQ2OVYyOC42NzdIMjI0LjA3NFpNMjM1LjY2MSAyOC42NzdWMzAuMTEzN0gyNDguMTI1QzI0Ny44MjYgMjkuNDE2NSAyNDYuODg3IDI4LjY3NyAyNDYuODg3IDI4LjY3N0gyMzUuNjYxWk0yNTIuOTYgMjguNjc3VjMwLjExMzdIMjU3LjM1NVYyOC42NzdIMjUyLjk2Wk0yNTguMTUzIDI4LjY3N0wyNTguNjg1IDMwLjExMzdIMjY0LjcyMUwyNjUuMjI2IDI4LjY3N0gyNTguMTUzWk0yNjUuOTg0IDI4LjY3N1YzMC4xMTM3SDI3MC4zNzlWMjguNjc3SDI2NS45ODRaTTIyNC4wNzQgMzEuNDcxVjMyLjkwNzZIMjI4LjQ2OVYzMS40NzFIMjI0LjA3NFpNMjM1LjY2MSAzMS40NzFWMzIuOTA3NkgyNDAuMDU2VjMxLjQ3MUgyMzUuNjYxWk0yNDQuMzMxIDMxLjQ3MVYzMi45MDc2SDI0OS4wMDVDMjQ5LjAwNSAzMi4yMjk2IDI0OC43MjYgMzEuNDcxIDI0OC43MjYgMzEuNDcxSDI0NC4zMzFWMzEuNDcxWk0yNTIuOTYgMzEuNDcxVjMyLjkwNzZIMjU3LjM1NVYzMS40NzFIMjUyLjk2Wk0yNTkuMTUxIDMxLjQ3MUwyNTkuNjY2IDMyLjkwNzZIMjYzLjcxM0wyNjQuMjMyIDMxLjQ3MUgyNTkuMTUxWk0yNjUuOTg0IDMxLjQ3MVYzMi45MDc2SDI3MC4zNzlWMzEuNDcxSDI2NS45ODRaTTIyMS4yMzcgMzQuMjY1VjM1LjcwMzdIMjMxLjM4NlYzNC4yNjVIMjIxLjIzN1pNMjMyLjc0NCAzNC4yNjVWMzUuNzAzN0gyNDguMzY3QzI0OC42OTYgMzUuMzc0MyAyNDguODg0IDM0LjI2NSAyNDguODg0IDM0LjI2NUgyMzIuNzQ0VjM0LjI2NVpNMjUwLjEyMyAzNC4yNjVWMzUuNzAzN0gyNTcuMzU1VjM0LjI2NUgyNTAuMTIzWk0yNjAuMTUxIDM0LjI2NUwyNjAuNjggMzUuNzAzN0gyNjIuNzM5TDI2My4yMzYgMzQuMjY1SDI2MC4xNTFaTTI2NS45ODQgMzQuMjY1VjM1LjcwMzdIMjczLjI5NVYzNC4yNjVIMjY1Ljk4NFpNMjIxLjIzNyAzNy4wNjFWMzguNDk3N0gyMzEuMzg2VjM3LjA2MUgyMjEuMjM3Wk0yMzIuNzQ0IDM3LjA2MVYzOC40OTU2SDI0My43NzNDMjQ1LjcyOSAzOC40OTU2IDI0Ny4yMDYgMzcuMDYxIDI0Ny4yMDYgMzcuMDYxSDIzMi43NDRaTTI1MC4xMjMgMzcuMDYxVjM4LjQ5NzdIMjU3LjM1NVYzNy4wNjFIMjUwLjEyM1pNMjYxLjE1NSAzNy4wNjFMMjYxLjY2NCAzOC40OTM2TDI2MS43NTIgMzguNDk1NkwyNjIuMjY5IDM3LjA2MUgyNjEuMTU1VjM3LjA2MVpNMjY1Ljk4NCAzNy4wNjFWMzguNDk3N0gyNzMuMjk1VjM3LjA2MUgyNjUuOTg0WiIgZmlsbD0iIzFGNzBDMSIvPg0KPC9nPg0KPGRlZnM+DQo8Y2xpcFBhdGggaWQ9ImNsaXAwXzU4XzExMSI+DQo8cmVjdCB3aWR0aD0iNDQuNDQ3MyIgaGVpZ2h0PSIyOS42MzE1IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzUzLjk1NSAxNC44MTU1KSIvPg0KPC9jbGlwUGF0aD4NCjxjbGlwUGF0aCBpZD0iY2xpcDFfNThfMTExIj4NCjxyZWN0IHdpZHRoPSI3Ni41NDgxIiBoZWlnaHQ9IjE2LjM1MDciIGZpbGw9IndoaXRlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MjUuNTk5IDIwLjk4ODkpIi8+DQo8L2NsaXBQYXRoPg0KPGNsaXBQYXRoIGlkPSJjbGlwMl81OF8xMTEiPg0KPHJlY3Qgd2lkdGg9IjUyLjEzNzIiIGhlaWdodD0iMjAuOTk4NyIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyMS4xNTggMTcuNDk5KSIvPg0KPC9jbGlwUGF0aD4NCjwvZGVmcz4NCjwvc3ZnPg0K" style="
            width: 742.5px;
            position: relative;
            top: 107px;
            left: 32px;
            ">
            <a href=${accountURL} style="
        float: left;
        border-radius: 56px;
        background: #0D6EFD;
        padding-top: 8px;
        width: 280px;
        height: 38px;
        text-align: center;
        position: relative;
        top: 127px;
        left: 274px;
        font-size: 16px;
        color: white;
        text-decoration: none;
        letter-spacing: 0.02em;
    ">Claim your FREE account</a>
            <div style="
    font-size: 14px;
    position: relative;
    top: 180px;
    left: 19px;
    letter-spacing: 0.02em;
    font-weight: 500;
    line-height: 125%;
">have a Syncfusion account? <a href="https://www.syncfusion.com/account/login?ReturnUrl=/account/login" style="text-decoration: none;
color: #0D6EFD;
font-weight: 500;">Sign In</a></div>
        </div>
    </div>`;
    if (typeof document !== 'undefined' && !isNullOrUndefined(document)) {
        const errorBackground = createElement('div', {
            innerHTML: bannerTemplate
        });
        document.body.appendChild(errorBackground);
    }
};

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let componentCount = 0;
let lastPageID;
let lastHistoryLen = 0;
// Decalre the static variable to count the instance
let instancecount = 0;
// Decalre the static variable to find if control limit exceed or not
let isvalid = true;
// We have added styles to inline type so here declare the static variable to detect if banner is added or not
let isBannerAdded = false;
let versionBasedStatePersistence = false;
/**
 * To enable or disable version based statePersistence functionality for all components globally.
 *
 * @param {boolean} status - Optional argument Specifies the status value to enable or disable versionBasedStatePersistence option.
 * @returns {void}
 */
function enableVersionBasedPersistence(status) {
    versionBasedStatePersistence = status;
}
/**
 * Base class for all Essential JavaScript components
 */
let Component = class Component extends Base {
    /**
     * Initialize the constructor for component base
     *
     * @param {Object} options ?
     * @param {string} selector ?
     */
    constructor(options, selector) {
        super(options, selector);
        this.randomId = uniqueID();
        /**
         * string template option for Blazor template rendering
         *
         * @private
         */
        this.isStringTemplate = false;
        this.needsID = false;
        this.isReactHybrid = false;
        if (isNullOrUndefined(this.enableRtl)) {
            this.setProperties({ 'enableRtl': rightToLeft }, true);
        }
        if (isNullOrUndefined(this.locale)) {
            this.setProperties({ 'locale': defaultCulture }, true);
        }
        this.moduleLoader = new ModuleLoader(this);
        this.localObserver = new Observer(this);
        // tslint:disable-next-line:no-function-constructor-with-string-args
        onIntlChange.on('notifyExternalChange', this.detectFunction, this, this.randomId);
        // Based on the considered control list we have count the instance
        if (typeof window !== 'undefined' && typeof document !== 'undefined' && !validateLicense()) {
            if (componentList.indexOf(this.getModuleName()) !== -1) {
                instancecount = instancecount + 1;
                if (instancecount > 5) {
                    isvalid = false;
                }
            }
        }
        if (!isUndefined(selector)) {
            this.appendTo();
        }
    }
    requiredModules() {
        return [];
    }
    /**
     * Destroys the sub modules while destroying the widget
     *
     * @returns {void} ?
     */
    destroy() {
        if (this.isDestroyed) {
            return;
        }
        if (this.enablePersistence) {
            this.setPersistData();
            this.detachUnloadEvent();
        }
        this.localObserver.destroy();
        if (this.refreshing) {
            return;
        }
        removeClass([this.element], ['e-control']);
        this.trigger('destroyed', { cancel: false });
        super.destroy();
        this.moduleLoader.clean();
        onIntlChange.off('notifyExternalChange', this.detectFunction, this.randomId);
    }
    /**
     * Applies all the pending property changes and render the component again.
     *
     * @returns {void} ?
     */
    refresh() {
        this.refreshing = true;
        this.moduleLoader.clean();
        this.destroy();
        this.clearChanges();
        this.localObserver = new Observer(this);
        this.preRender();
        this.injectModules();
        this.render();
        this.refreshing = false;
    }
    accessMount() {
        if (this.mount && !this.isReactHybrid) {
            this.mount();
        }
    }
    /**
     * Returns the route element of the component
     *
     * @returns {HTMLElement} ?
     */
    getRootElement() {
        if (this.isReactHybrid) {
            // eslint-disable-next-line
            return this.actualElement;
        }
        else {
            return this.element;
        }
    }
    /**
     * Returns the persistence data for component
     *
     * @returns {any} ?
     */
    // eslint-disable-next-line
    getLocalData() {
        const eleId = this.getModuleName() + this.element.id;
        if (versionBasedStatePersistence) {
            return window.localStorage.getItem(eleId + this.ej2StatePersistenceVersion);
        }
        else {
            return window.localStorage.getItem(eleId);
        }
    }
    /**
     * Adding unload event to persist data when enable persistence true
     *
     * @returns {void}
     */
    attachUnloadEvent() {
        this.handleUnload = this.handleUnload.bind(this);
        window.addEventListener('unload', this.handleUnload);
    }
    /**
     * Handling unload event to persist data when enable persistence true
     *
     * @returns {void}
     */
    handleUnload() {
        this.setPersistData();
    }
    /**
     * Removing unload event to persist data when enable persistence true
     *
     * @returns {void}
     */
    detachUnloadEvent() {
        window.removeEventListener('unload', this.handleUnload);
    }
    /**
     * Appends the control within the given HTML element
     *
     * @param {string | HTMLElement} selector - Target element where control needs to be appended
     * @returns {void} ?
     */
    appendTo(selector) {
        if (!isNullOrUndefined(selector) && typeof (selector) === 'string') {
            this.element = select(selector, document);
        }
        else if (!isNullOrUndefined(selector)) {
            this.element = selector;
        }
        if (!isNullOrUndefined(this.element)) {
            const moduleClass = 'e-' + this.getModuleName().toLowerCase();
            addClass([this.element], ['e-control', moduleClass]);
            this.isProtectedOnChange = false;
            if (this.needsID && !this.element.id) {
                this.element.id = this.getUniqueID(this.getModuleName());
            }
            if (this.enablePersistence) {
                this.mergePersistData();
                this.attachUnloadEvent();
            }
            const inst = getValue('ej2_instances', this.element);
            if (!inst || inst.indexOf(this) === -1) {
                super.addInstance();
            }
            this.preRender();
            this.injectModules();
            // Throw a warning for the required modules to be injected.
            const ignoredComponents = {
                schedule: 'all',
                diagram: 'all',
                PdfViewer: 'all',
                grid: ['logger'],
                richtexteditor: ['link', 'table', 'image', 'audio', 'video', 'formatPainter', 'emojiPicker', 'pasteCleanup', 'htmlEditor', 'toolbar'],
                treegrid: ['filter'],
                gantt: ['tooltip'],
                chart: ['Export', 'Zoom'],
                accumulationchart: ['Export']
            };
            const component = this.getModuleName();
            if (this.requiredModules && (!ignoredComponents[`${component}`] || ignoredComponents[`${component}`] !== 'all')) {
                const modulesRequired = this.requiredModules();
                for (const module of this.moduleLoader.getNonInjectedModules(modulesRequired)) {
                    const moduleName = module.name ? module.name : module.member;
                    if (ignoredComponents[`${component}`] && ignoredComponents[`${component}`].indexOf(module.member) !== -1) {
                        continue;
                    }
                    const componentName = component.charAt(0).toUpperCase() + component.slice(1); // To capitalize the component name
                    console.warn(`[WARNING] :: Module "${moduleName}" is not available in ${componentName} component! You either misspelled the module name or forgot to load it.`);
                }
            }
            // Checked weather cases are valid or not. If control leads to more than five counts
            if (!isvalid && !isBannerAdded) {
                createLicenseOverlay();
                isBannerAdded = true;
            }
            this.render();
            if (!this.mount) {
                this.trigger('created');
            }
            else {
                this.accessMount();
            }
        }
    }
    /**
     * It is used to process the post rendering functionalities to a component.
     *
     * @param {Node} wrapperElement ?
     * @returns {void} ?
     */
    renderComplete(wrapperElement) {
        if (isBlazor()) {
            const sfBlazor = 'sfBlazor';
            // eslint-disable-next-line
            window[sfBlazor].renderComplete(this.element, wrapperElement);
        }
        this.isRendered = true;
    }
    /**
     * When invoked, applies the pending property changes immediately to the component.
     *
     * @returns {void} ?
     */
    dataBind() {
        this.injectModules();
        super.dataBind();
    }
    /**
     * Attach one or more  event handler to the current component context.
     * It is used for internal handling event internally within the component only.
     *
     * @param {BoundOptions[]| string} event - It is  optional type either to  Set the collection of event list or the eventName.
     * @param {Function} handler - optional parameter Specifies the handler to run when the event occurs
     * @param {Object} context - optional parameter Specifies the context to be bind in the handler.
     * @returns {void} ?
     * @private
     */
    on(event, handler, context) {
        if (typeof event === 'string') {
            this.localObserver.on(event, handler, context);
        }
        else {
            for (const arg of event) {
                this.localObserver.on(arg.event, arg.handler, arg.context);
            }
        }
    }
    /**
     * To remove one or more event handler that has been attached with the on() method.
     *
     * @param {BoundOptions[]| string} event - It is  optional type either to  Set the collection of event list or the eventName.
     * @param {Function} handler - optional parameter Specifies the function to run when the event occurs
     * @returns {void} ?
     * @private
     */
    off(event, handler) {
        if (typeof event === 'string') {
            this.localObserver.off(event, handler);
        }
        else {
            for (const arg of event) {
                this.localObserver.off(arg.event, arg.handler);
            }
        }
    }
    /**
     * To notify the handlers in the specified event.
     *
     * @param {string} property - Specifies the event to be notify.
     * @param {Object} argument - Additional parameters to pass while calling the handler.
     * @returns {void} ?
     * @private
     */
    notify(property, argument) {
        if (this.isDestroyed !== true) {
            this.localObserver.notify(property, argument);
        }
    }
    /**
     * Get injected modules
     *
     * @returns {Function} ?
     * @private
     */
    getInjectedModules() {
        return this.injectedModules;
    }
    /**
     * Dynamically injects the required modules to the component.
     *
     * @param {Function} moduleList ?
     * @returns {void} ?
     */
    static Inject(...moduleList) {
        if (!this.prototype.injectedModules) {
            this.prototype.injectedModules = [];
        }
        for (let i = 0; i < moduleList.length; i++) {
            if (this.prototype.injectedModules.indexOf(moduleList[parseInt(i.toString(), 10)]) === -1) {
                this.prototype.injectedModules.push(moduleList[parseInt(i.toString(), 10)]);
            }
        }
    }
    /**
     * This is a instance method to create an element.
     *
     * @param {string} tagName ?
     * @param {ElementProperties} prop ?
     * @param {boolean} isVDOM ?
     * @returns {any} ?
     * @private
     */
    // eslint-disable-next-line
    createElement(tagName, prop, isVDOM) {
        return createElement(tagName, prop);
    }
    /**
     *
     * @param {Function} handler - handler to be triggered after state Updated.
     * @param {any} argument - Arguments to be passed to caller.
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    triggerStateChange(handler, argument) {
        if (this.isReactHybrid) {
            // eslint-disable-next-line
            this.setState();
            this.currentContext = { calls: handler, args: argument };
        }
    }
    // tslint: enable: no-any
    injectModules() {
        if (this.injectedModules && this.injectedModules.length) {
            this.moduleLoader.inject(this.requiredModules(), this.injectedModules);
        }
    }
    detectFunction(args) {
        const prop = Object.keys(args);
        if (prop.length) {
            this[prop[0]] = args[prop[0]];
        }
    }
    mergePersistData() {
        let data;
        if (versionBasedStatePersistence) {
            data = window.localStorage.getItem(this.getModuleName() + this.element.id + this.ej2StatePersistenceVersion);
        }
        else {
            data = window.localStorage.getItem(this.getModuleName() + this.element.id);
        }
        if (!(isNullOrUndefined(data) || (data === ''))) {
            this.setProperties(JSON.parse(data), true);
        }
    }
    setPersistData() {
        if (!this.isDestroyed) {
            if (versionBasedStatePersistence) {
                window.localStorage.setItem(this.getModuleName() +
                    this.element.id + this.ej2StatePersistenceVersion, this.getPersistData());
            }
            else {
                window.localStorage.setItem(this.getModuleName() + this.element.id, this.getPersistData());
            }
        }
    }
    // eslint-disable-next-line
    renderReactTemplates(callback) {
        if (!isNullOrUndefined(callback)) {
            callback();
        }
    }
    // eslint-disable-next-line
    clearTemplate(templateName, index) {
        //No Code
    }
    getUniqueID(definedName) {
        if (this.isHistoryChanged()) {
            componentCount = 0;
        }
        lastPageID = this.pageID(location.href);
        lastHistoryLen = history.length;
        return definedName + '_' + lastPageID + '_' + componentCount++;
    }
    pageID(url) {
        let hash = 0;
        if (url.length === 0) {
            return hash;
        }
        for (let i = 0; i < url.length; i++) {
            const char = url.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }
    isHistoryChanged() {
        return lastPageID !== this.pageID(location.href) || lastHistoryLen !== history.length;
    }
    addOnPersist(options) {
        const persistObj = {};
        for (const key of options) {
            let objValue;
            // eslint-disable-next-line
            objValue = getValue(key, this);
            if (!isUndefined(objValue)) {
                setValue(key, this.getActualProperties(objValue), persistObj);
            }
        }
        return JSON.stringify(persistObj, (key, value) => {
            return this.getActualProperties(value);
        });
    }
    getActualProperties(obj) {
        if (obj instanceof ChildProperty) {
            return getValue('properties', obj);
        }
        else {
            return obj;
        }
    }
    ignoreOnPersist(options) {
        return JSON.stringify(this.iterateJsonProperties(this.properties, options));
    }
    iterateJsonProperties(obj, ignoreList) {
        const newObj = {};
        for (const key of Object.keys(obj)) {
            if (ignoreList.indexOf(key) === -1) {
                // eslint-disable-next-line
                const value = obj[key];
                if (typeof value === 'object' && !(value instanceof Array)) {
                    const newList = ignoreList.filter((str) => {
                        const regExp = RegExp;
                        return new regExp(key + '.').test(str);
                    }).map((str) => {
                        return str.replace(key + '.', '');
                    });
                    newObj[`${key}`] = this.iterateJsonProperties(this.getActualProperties(value), newList);
                }
                else {
                    newObj[`${key}`] = value;
                }
            }
        }
        return newObj;
    }
};
__decorate$1([
    Property(false)
], Component.prototype, "enablePersistence", void 0);
__decorate$1([
    Property()
], Component.prototype, "enableRtl", void 0);
__decorate$1([
    Property()
], Component.prototype, "locale", void 0);
Component = __decorate$1([
    NotifyPropertyChanges
], Component);
//Function handling for page navigation detection
/* istanbul ignore next */
(() => {
    if (typeof window !== 'undefined') {
        window.addEventListener('popstate', 
        /* istanbul ignore next */
        () => {
            componentCount = 0;
        });
    }
})();

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Draggable_1;
const defaultPosition = { left: 0, top: 0, bottom: 0, right: 0 };
const isDraggedObject = { isDragged: false };
/**
 * Specifies the position coordinates
 */
class Position extends ChildProperty {
}
__decorate$2([
    Property(0)
], Position.prototype, "left", void 0);
__decorate$2([
    Property(0)
], Position.prototype, "top", void 0);
/**
 * Draggable Module provides support to enable draggable functionality in Dom Elements.
 * ```html
 * <div id='drag'>Draggable</div>
 * <script>
 * var ele = document.getElementById('drag');
 * var drag:Draggable = new Draggable(ele,{
 *     clone:false,
 *     drag: function(e) {
 *      //drag handler code.
 *      },
 *     handle:'.class'
 * });
 * </script>
 * ```
 */
let Draggable = Draggable_1 = class Draggable extends Base {
    constructor(element, options) {
        super(options, element);
        this.dragLimit = Draggable_1.getDefaultPosition();
        this.borderWidth = Draggable_1.getDefaultPosition();
        this.padding = Draggable_1.getDefaultPosition();
        this.diffX = 0;
        this.prevLeft = 0;
        this.prevTop = 0;
        this.dragProcessStarted = false;
        this.eleTop = 0;
        /* eslint-disable @typescript-eslint/no-explicit-any */
        this.tapHoldTimer = 0;
        this.externalInitialize = false;
        this.diffY = 0;
        this.parentScrollX = 0;
        this.parentScrollY = 0;
        this.droppables = {};
        this.bind();
    }
    bind() {
        this.toggleEvents();
        if (Browser.isIE) {
            addClass([this.element], 'e-block-touch');
        }
        this.droppables[this.scope] = {};
    }
    static getDefaultPosition() {
        return extend({}, defaultPosition);
    }
    toggleEvents(isUnWire) {
        let ele;
        if (!isUndefined(this.handle)) {
            ele = select(this.handle, this.element);
        }
        const handler = (this.enableTapHold && Browser.isDevice && Browser.isTouch) ? this.mobileInitialize : this.initialize;
        if (isUnWire) {
            EventHandler.remove(ele || this.element, Browser.isSafari() ? 'touchstart' : Browser.touchStartEvent, handler);
        }
        else {
            EventHandler.add(ele || this.element, Browser.isSafari() ? 'touchstart' : Browser.touchStartEvent, handler, this);
        }
    }
    /* istanbul ignore next */
    mobileInitialize(evt) {
        const target = evt.currentTarget;
        this.tapHoldTimer = setTimeout(() => {
            this.externalInitialize = true;
            this.removeTapholdTimer();
            this.initialize(evt, target);
        }, this.tapHoldThreshold);
        EventHandler.add(document, Browser.isSafari() ? 'touchmove' : Browser.touchMoveEvent, this.removeTapholdTimer, this);
        EventHandler.add(document, Browser.isSafari() ? 'touchend' : Browser.touchEndEvent, this.removeTapholdTimer, this);
    }
    /* istanbul ignore next */
    removeTapholdTimer() {
        clearTimeout(this.tapHoldTimer);
        EventHandler.remove(document, Browser.isSafari() ? 'touchmove' : Browser.touchMoveEvent, this.removeTapholdTimer);
        EventHandler.remove(document, Browser.isSafari() ? 'touchend' : Browser.touchEndEvent, this.removeTapholdTimer);
    }
    /* istanbul ignore next */
    getScrollableParent(element, axis) {
        const scroll = { 'vertical': 'scrollHeight', 'horizontal': 'scrollWidth' };
        const client = { 'vertical': 'clientHeight', 'horizontal': 'clientWidth' };
        if (isNullOrUndefined(element)) {
            return null;
        }
        if (element[scroll[`${axis}`]] > element[client[`${axis}`]]) {
            if (axis === 'vertical' ? element.scrollTop > 0 : element.scrollLeft > 0) {
                if (axis === 'vertical') {
                    this.parentScrollY = this.parentScrollY +
                        (this.parentScrollY === 0 ? element.scrollTop : element.scrollTop - this.parentScrollY);
                    this.tempScrollHeight = element.scrollHeight;
                }
                else {
                    this.parentScrollX = this.parentScrollX +
                        (this.parentScrollX === 0 ? element.scrollLeft : element.scrollLeft - this.parentScrollX);
                    this.tempScrollWidth = element.scrollWidth;
                }
                if (!isNullOrUndefined(element)) {
                    return this.getScrollableParent(element.parentNode, axis);
                }
                else {
                    return element;
                }
            }
            else {
                return this.getScrollableParent(element.parentNode, axis);
            }
        }
        else {
            return this.getScrollableParent(element.parentNode, axis);
        }
    }
    /* eslint-disable */
    getScrollableValues() {
        this.parentScrollX = 0;
        this.parentScrollY = 0;
        const isModalDialog = this.element.classList.contains('e-dialog') && this.element.classList.contains('e-dlg-modal');
        const verticalScrollParent = this.getScrollableParent(this.element.parentNode, 'vertical');
        const horizontalScrollParent = this.getScrollableParent(this.element.parentNode, 'horizontal');
    }
    /* eslint-enable */
    initialize(evt, curTarget) {
        this.currentStateTarget = evt.target;
        if (this.isDragStarted()) {
            return;
        }
        else {
            this.isDragStarted(true);
            this.externalInitialize = false;
        }
        this.target = (evt.currentTarget || curTarget);
        this.dragProcessStarted = false;
        if (this.abort) {
            /* tslint:disable no-any */
            // eslint-disable-next-line
            let abortSelectors = this.abort;
            if (typeof abortSelectors === 'string') {
                abortSelectors = [abortSelectors];
            }
            for (let i = 0; i < abortSelectors.length; i++) {
                if (!isNullOrUndefined(closest(evt.target, abortSelectors[parseInt(i.toString(), 10)]))) {
                    /* istanbul ignore next */
                    if (this.isDragStarted()) {
                        this.isDragStarted(true);
                    }
                    return;
                }
            }
        }
        if (this.preventDefault && !isUndefined(evt.changedTouches) && evt.type !== 'touchstart') {
            evt.preventDefault();
        }
        this.element.setAttribute('aria-grabbed', 'true');
        const intCoord = this.getCoordinates(evt);
        this.initialPosition = { x: intCoord.pageX, y: intCoord.pageY };
        if (!this.clone) {
            const pos = this.element.getBoundingClientRect();
            this.getScrollableValues();
            if (evt.clientX === evt.pageX) {
                this.parentScrollX = 0;
            }
            if (evt.clientY === evt.pageY) {
                this.parentScrollY = 0;
            }
            this.relativeXPosition = intCoord.pageX - (pos.left + this.parentScrollX);
            this.relativeYPosition = intCoord.pageY - (pos.top + this.parentScrollY);
        }
        if (this.externalInitialize) {
            this.intDragStart(evt);
        }
        else {
            EventHandler.add(document, Browser.isSafari() ? 'touchmove' : Browser.touchMoveEvent, this.intDragStart, this);
            EventHandler.add(document, Browser.isSafari() ? 'touchend' : Browser.touchEndEvent, this.intDestroy, this);
        }
        this.toggleEvents(true);
        if (evt.type !== 'touchstart' && this.isPreventSelect) {
            document.body.classList.add('e-prevent-select');
        }
        this.externalInitialize = false;
        EventHandler.trigger(document.documentElement, Browser.isSafari() ? 'touchstart' : Browser.touchStartEvent, evt);
    }
    intDragStart(evt) {
        this.removeTapholdTimer();
        const isChangeTouch = !isUndefined(evt.changedTouches);
        if (isChangeTouch && (evt.changedTouches.length !== 1)) {
            return;
        }
        const intCordinate = this.getCoordinates(evt);
        let pos;
        const styleProp = getComputedStyle(this.element);
        this.margin = {
            left: parseInt(styleProp.marginLeft, 10),
            top: parseInt(styleProp.marginTop, 10),
            right: parseInt(styleProp.marginRight, 10),
            bottom: parseInt(styleProp.marginBottom, 10)
        };
        let element = this.element;
        if (this.clone && this.dragTarget) {
            const intClosest = closest(evt.target, this.dragTarget);
            if (!isNullOrUndefined(intClosest)) {
                element = intClosest;
            }
        }
        /* istanbul ignore next */
        if (this.isReplaceDragEle) {
            // eslint-disable-next-line
            element = this.currentStateCheck(evt.target, element);
        }
        this.offset = this.calculateParentPosition(element);
        this.position = this.getMousePosition(evt, this.isDragScroll);
        const x = this.initialPosition.x - intCordinate.pageX;
        const y = this.initialPosition.y - intCordinate.pageY;
        const distance = Math.sqrt((x * x) + (y * y));
        if ((distance >= this.distance || this.externalInitialize)) {
            const ele = this.getHelperElement(evt);
            if (!ele || isNullOrUndefined(ele)) {
                return;
            }
            if (isChangeTouch) {
                evt.preventDefault();
            }
            const dragTargetElement = this.helperElement = ele;
            this.parentClientRect = this.calculateParentPosition(dragTargetElement.offsetParent);
            if (this.dragStart) {
                const curTarget = this.getProperTargetElement(evt);
                const args = {
                    event: evt,
                    element: element,
                    target: curTarget,
                    bindEvents: isBlazor() ? this.bindDragEvents.bind(this) : null,
                    dragElement: dragTargetElement
                };
                this.trigger('dragStart', args);
            }
            if (this.dragArea) {
                this.setDragArea();
            }
            else {
                this.dragLimit = { left: 0, right: 0, bottom: 0, top: 0 };
                this.borderWidth = { top: 0, left: 0 };
            }
            pos = { left: this.position.left - this.parentClientRect.left, top: this.position.top - this.parentClientRect.top };
            if (this.clone && !this.enableTailMode) {
                this.diffX = this.position.left - this.offset.left;
                this.diffY = this.position.top - this.offset.top;
            }
            this.getScrollableValues();
            // when drag element has margin-top
            const styles = getComputedStyle(element);
            const marginTop = parseFloat(styles.marginTop);
            /* istanbul ignore next */
            if (this.clone && marginTop !== 0) {
                pos.top += marginTop;
            }
            this.eleTop = !isNaN(parseFloat(styles.top)) ? parseFloat(styles.top) - this.offset.top : 0;
            /* istanbul ignore next */
            // if (this.eleTop > 0) {
            //     pos.top += this.eleTop;
            // }
            if (this.enableScrollHandler && !this.clone) {
                pos.top -= this.parentScrollY;
                pos.left -= this.parentScrollX;
            }
            const posValue = this.getProcessedPositionValue({
                top: (pos.top - this.diffY) + 'px',
                left: (pos.left - this.diffX) + 'px'
            });
            if (this.dragArea && typeof this.dragArea !== 'string' && this.dragArea.classList.contains('e-kanban-content') && this.dragArea.style.position === 'relative') {
                pos.top += this.dragArea.scrollTop;
            }
            this.dragElePosition = { top: pos.top, left: pos.left };
            setStyleAttribute(dragTargetElement, this.getDragPosition({ position: 'absolute', left: posValue.left, top: posValue.top }));
            EventHandler.remove(document, Browser.isSafari() ? 'touchmove' : Browser.touchMoveEvent, this.intDragStart);
            EventHandler.remove(document, Browser.isSafari() ? 'touchend' : Browser.touchEndEvent, this.intDestroy);
            if (!isBlazor()) {
                this.bindDragEvents(dragTargetElement);
            }
        }
    }
    bindDragEvents(dragTargetElement) {
        if (isVisible(dragTargetElement)) {
            EventHandler.add(document, Browser.isSafari() ? 'touchmove' : Browser.touchMoveEvent, this.intDrag, this);
            EventHandler.add(document, Browser.isSafari() ? 'touchend' : Browser.touchEndEvent, this.intDragStop, this);
            this.setGlobalDroppables(false, this.element, dragTargetElement);
        }
        else {
            this.toggleEvents();
            document.body.classList.remove('e-prevent-select');
        }
    }
    elementInViewport(el) {
        this.top = el.offsetTop;
        this.left = el.offsetLeft;
        this.width = el.offsetWidth;
        this.height = el.offsetHeight;
        while (el.offsetParent) {
            el = el.offsetParent;
            this.top += el.offsetTop;
            this.left += el.offsetLeft;
        }
        return (this.top >= window.pageYOffset &&
            this.left >= window.pageXOffset &&
            (this.top + this.height) <= (window.pageYOffset + window.innerHeight) &&
            (this.left + this.width) <= (window.pageXOffset + window.innerWidth));
    }
    getProcessedPositionValue(value) {
        if (this.queryPositionInfo) {
            return this.queryPositionInfo(value);
        }
        return value;
    }
    calculateParentPosition(ele) {
        if (isNullOrUndefined(ele)) {
            return { left: 0, top: 0 };
        }
        const rect = ele.getBoundingClientRect();
        const style = getComputedStyle(ele);
        return {
            left: (rect.left + window.pageXOffset) - parseInt(style.marginLeft, 10),
            top: (rect.top + window.pageYOffset) - parseInt(style.marginTop, 10)
        };
    }
    // tslint:disable-next-line:max-func-body-length
    intDrag(evt) {
        if (!isUndefined(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
            return;
        }
        if (this.clone && evt.changedTouches && Browser.isDevice && Browser.isTouch) {
            evt.preventDefault();
        }
        let left;
        let top;
        this.position = this.getMousePosition(evt, this.isDragScroll);
        const docHeight = this.getDocumentWidthHeight('Height');
        if (docHeight < this.position.top) {
            this.position.top = docHeight;
        }
        const docWidth = this.getDocumentWidthHeight('Width');
        if (docWidth < this.position.left) {
            this.position.left = docWidth;
        }
        if (this.drag) {
            const curTarget = this.getProperTargetElement(evt);
            this.trigger('drag', { event: evt, element: this.element, target: curTarget });
        }
        const eleObj = this.checkTargetElement(evt);
        if (eleObj.target && eleObj.instance) {
            /* tslint:disable no-any */
            let flag = true;
            if (this.hoverObject) {
                if (this.hoverObject.instance !== eleObj.instance) {
                    this.triggerOutFunction(evt, eleObj);
                }
                else {
                    flag = false;
                }
            }
            if (flag) {
                // eslint-disable-next-line
                eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
                eleObj.instance.intOver(evt, eleObj.target);
                this.hoverObject = eleObj;
            }
        }
        else if (this.hoverObject) {
            this.triggerOutFunction(evt, eleObj);
        }
        const helperElement = this.droppables[this.scope].helper;
        this.parentClientRect = this.calculateParentPosition(this.helperElement.offsetParent);
        const tLeft = this.parentClientRect.left;
        const tTop = this.parentClientRect.top;
        const intCoord = this.getCoordinates(evt);
        const pagex = intCoord.pageX;
        const pagey = intCoord.pageY;
        const dLeft = this.position.left - this.diffX;
        const dTop = this.position.top - this.diffY;
        const styles = getComputedStyle(helperElement);
        if (this.dragArea) {
            if (this.enableAutoScroll) {
                this.setDragArea();
            }
            if (this.pageX !== pagex || this.skipDistanceCheck) {
                const helperWidth = helperElement.offsetWidth + (parseFloat(styles.marginLeft)
                    + parseFloat(styles.marginRight));
                if (this.dragLimit.left > dLeft && dLeft > 0) {
                    left = this.dragLimit.left;
                }
                else if (this.dragLimit.right + window.pageXOffset < dLeft + helperWidth && dLeft > 0) {
                    left = dLeft - (dLeft - this.dragLimit.right) + window.pageXOffset - helperWidth;
                }
                else {
                    left = dLeft < 0 ? this.dragLimit.left : dLeft;
                }
            }
            if (this.pageY !== pagey || this.skipDistanceCheck) {
                const helperHeight = helperElement.offsetHeight + (parseFloat(styles.marginTop)
                    + parseFloat(styles.marginBottom));
                if (this.dragLimit.top > dTop && dTop > 0) {
                    top = this.dragLimit.top;
                }
                else if (this.dragLimit.bottom + window.pageYOffset < dTop + helperHeight && dTop > 0) {
                    top = dTop - (dTop - this.dragLimit.bottom) + window.pageYOffset - helperHeight;
                }
                else {
                    top = dTop < 0 ? this.dragLimit.top : dTop;
                }
            }
        }
        else {
            left = dLeft;
            top = dTop;
        }
        const iTop = tTop + this.borderWidth.top;
        const iLeft = tLeft + this.borderWidth.left;
        if (this.dragProcessStarted) {
            if (isNullOrUndefined(top)) {
                top = this.prevTop;
            }
            if (isNullOrUndefined(left)) {
                left = this.prevLeft;
            }
        }
        let draEleTop;
        let draEleLeft;
        if (this.helperElement.classList.contains('e-treeview')) {
            if (this.dragArea) {
                this.dragLimit.top = this.clone ? this.dragLimit.top : 0;
                draEleTop = (top - iTop) < 0 ? this.dragLimit.top : (top - this.borderWidth.top);
                draEleLeft = (left - iLeft) < 0 ? this.dragLimit.left : (left - this.borderWidth.left);
            }
            else {
                draEleTop = top - this.borderWidth.top;
                draEleLeft = left - this.borderWidth.left;
            }
        }
        else {
            if (this.dragArea) {
                const isDialogEle = this.helperElement.classList.contains('e-dialog');
                this.dragLimit.top = this.clone ? this.dragLimit.top : 0;
                draEleTop = (top - iTop) < 0 ? this.dragLimit.top : (top - iTop);
                draEleLeft = (left - iLeft) < 0 ? isDialogEle ? (left - (iLeft - this.borderWidth.left)) :
                    this.dragElePosition.left : (left - iLeft);
            }
            else {
                draEleTop = top - iTop;
                draEleLeft = left - iLeft;
            }
        }
        const marginTop = parseFloat(getComputedStyle(this.element).marginTop);
        // when drag-element has margin-top
        /* istanbul ignore next */
        if (marginTop > 0) {
            if (this.clone) {
                draEleTop += marginTop;
                if (dTop < 0) {
                    if ((marginTop + dTop) >= 0) {
                        draEleTop = marginTop + dTop;
                    }
                    else {
                        draEleTop -= marginTop;
                    }
                }
                if (this.dragArea) {
                    draEleTop = (this.dragLimit.bottom < draEleTop) ? this.dragLimit.bottom : draEleTop;
                }
            }
            if ((top - iTop) < 0) {
                if (dTop + marginTop + (helperElement.offsetHeight - iTop) >= 0) {
                    const tempDraEleTop = this.dragLimit.top + dTop - iTop;
                    if ((tempDraEleTop + marginTop + iTop) < 0) {
                        draEleTop -= marginTop + iTop;
                    }
                    else {
                        draEleTop = tempDraEleTop;
                    }
                }
                else {
                    draEleTop -= marginTop + iTop;
                }
            }
        }
        if (this.dragArea && this.helperElement.classList.contains('e-treeview')) {
            const helperHeight = helperElement.offsetHeight + (parseFloat(styles.marginTop)
                + parseFloat(styles.marginBottom));
            draEleTop = (draEleTop + helperHeight) > this.dragLimit.bottom ? (this.dragLimit.bottom - helperHeight) : draEleTop;
        }
        /* istanbul ignore next */
        // if(this.eleTop > 0) {
        //      draEleTop += this.eleTop;
        // }
        if (this.enableScrollHandler && !this.clone) {
            draEleTop -= this.parentScrollY;
            draEleLeft -= this.parentScrollX;
        }
        if (this.dragArea && typeof this.dragArea !== 'string' && this.dragArea.classList.contains('e-kanban-content') && this.dragArea.style.position === 'relative') {
            draEleTop += this.dragArea.scrollTop;
        }
        const dragValue = this.getProcessedPositionValue({ top: draEleTop + 'px', left: draEleLeft + 'px' });
        setStyleAttribute(helperElement, this.getDragPosition(dragValue));
        if (!this.elementInViewport(helperElement) && this.enableAutoScroll && !this.helperElement.classList.contains('e-treeview')) {
            this.helperElement.scrollIntoView();
        }
        let elements = document.querySelectorAll(':hover');
        if (this.enableAutoScroll && this.helperElement.classList.contains('e-treeview')) {
            if (elements.length === 0) {
                elements = this.getPathElements(evt);
            }
            /* tslint:disable no-any */
            // eslint-disable-next-line
            let scrollParent = this.getScrollParent(elements, false);
            if (this.elementInViewport(this.helperElement)) {
                this.getScrollPosition(scrollParent, draEleTop);
            }
            else if (!this.elementInViewport(this.helperElement)) {
                elements = [].slice.call(document.querySelectorAll(':hover'));
                if (elements.length === 0) {
                    elements = this.getPathElements(evt);
                }
                scrollParent = this.getScrollParent(elements, true);
                this.getScrollPosition(scrollParent, draEleTop);
            }
        }
        this.dragProcessStarted = true;
        this.prevLeft = left;
        this.prevTop = top;
        this.position.left = left;
        this.position.top = top;
        this.pageX = pagex;
        this.pageY = pagey;
    }
    /* tslint:disable no-any */
    // eslint-disable-next-line
    getScrollParent(node, reverse) {
        /* tslint:disable no-any */
        // eslint-disable-next-line
        const nodeEl = reverse ? node.reverse() : node;
        let hasScroll;
        for (let i = nodeEl.length - 1; i >= 0; i--) {
            hasScroll = window.getComputedStyle(nodeEl[parseInt(i.toString(), 10)])['overflow-y'];
            if ((hasScroll === 'auto' || hasScroll === 'scroll')
                && nodeEl[parseInt(i.toString(), 10)].scrollHeight > nodeEl[parseInt(i.toString(), 10)].clientHeight) {
                return nodeEl[parseInt(i.toString(), 10)];
            }
        }
        hasScroll = window.getComputedStyle(document.scrollingElement)['overflow-y'];
        if (hasScroll === 'visible') {
            document.scrollingElement.style.overflow = 'auto';
            return document.scrollingElement;
        }
    }
    getScrollPosition(nodeEle, draEleTop) {
        if (nodeEle && nodeEle === document.scrollingElement) {
            if ((nodeEle.clientHeight + document.scrollingElement.scrollTop - this.helperElement.clientHeight) < draEleTop
                && nodeEle.getBoundingClientRect().height + this.parentClientRect.top > draEleTop) {
                nodeEle.scrollTop += this.helperElement.clientHeight;
            }
            else if (nodeEle.scrollTop > draEleTop - this.helperElement.clientHeight) {
                nodeEle.scrollTop -= this.helperElement.clientHeight;
            }
        }
        else if (nodeEle && nodeEle !== document.scrollingElement) {
            const docScrollTop = document.scrollingElement.scrollTop;
            const helperClientHeight = this.helperElement.clientHeight;
            if ((nodeEle.clientHeight + nodeEle.getBoundingClientRect().top - helperClientHeight + docScrollTop) < draEleTop) {
                nodeEle.scrollTop += this.helperElement.clientHeight;
            }
            else if (nodeEle.getBoundingClientRect().top > (draEleTop - helperClientHeight - docScrollTop)) {
                nodeEle.scrollTop -= this.helperElement.clientHeight;
            }
        }
    }
    getPathElements(evt) {
        const elementTop = evt.clientX > 0 ? evt.clientX : 0;
        const elementLeft = evt.clientY > 0 ? evt.clientY : 0;
        return document.elementsFromPoint(elementTop, elementLeft);
    }
    triggerOutFunction(evt, eleObj) {
        this.hoverObject.instance.intOut(evt, eleObj.target);
        this.hoverObject.instance.dragData[this.scope] = null;
        this.hoverObject = null;
    }
    getDragPosition(dragValue) {
        const temp = extend({}, dragValue);
        if (this.axis) {
            if (this.axis === 'x') {
                delete temp.top;
            }
            else if (this.axis === 'y') {
                delete temp.left;
            }
        }
        return temp;
    }
    getDocumentWidthHeight(str) {
        const docBody = document.body;
        const docEle = document.documentElement;
        const returnValue = Math.max(docBody['scroll' + str], docEle['scroll' + str], docBody['offset' + str], docEle['offset' + str], docEle['client' + str]);
        return returnValue;
    }
    intDragStop(evt) {
        this.dragProcessStarted = false;
        if (!isUndefined(evt.changedTouches) && (evt.changedTouches.length !== 1)) {
            return;
        }
        const type = ['touchend', 'pointerup', 'mouseup'];
        if (type.indexOf(evt.type) !== -1) {
            if (this.dragStop) {
                const curTarget = this.getProperTargetElement(evt);
                this.trigger('dragStop', { event: evt, element: this.element, target: curTarget, helper: this.helperElement });
            }
            this.intDestroy(evt);
        }
        else {
            this.element.setAttribute('aria-grabbed', 'false');
        }
        const eleObj = this.checkTargetElement(evt);
        if (eleObj.target && eleObj.instance) {
            eleObj.instance.dragStopCalled = true;
            // eslint-disable-next-line
            eleObj.instance.dragData[this.scope] = this.droppables[this.scope];
            eleObj.instance.intDrop(evt, eleObj.target);
        }
        this.setGlobalDroppables(true);
        document.body.classList.remove('e-prevent-select');
    }
    /**
     * @param {MouseEvent | TouchEvent} evt ?
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line
    intDestroy(evt) {
        this.dragProcessStarted = false;
        this.toggleEvents();
        document.body.classList.remove('e-prevent-select');
        this.element.setAttribute('aria-grabbed', 'false');
        EventHandler.remove(document, Browser.isSafari() ? 'touchmove' : Browser.touchMoveEvent, this.intDragStart);
        EventHandler.remove(document, Browser.isSafari() ? 'touchend' : Browser.touchEndEvent, this.intDragStop);
        EventHandler.remove(document, Browser.isSafari() ? 'touchend' : Browser.touchEndEvent, this.intDestroy);
        EventHandler.remove(document, Browser.isSafari() ? 'touchmove' : Browser.touchMoveEvent, this.intDrag);
        if (this.isDragStarted()) {
            this.isDragStarted(true);
        }
    }
    // triggers when property changed
    // eslint-disable-next-line
    onPropertyChanged(newProp, oldProp) {
        //No Code to handle
    }
    getModuleName() {
        return 'draggable';
    }
    isDragStarted(change) {
        if (change) {
            isDraggedObject.isDragged = !isDraggedObject.isDragged;
        }
        return isDraggedObject.isDragged;
    }
    setDragArea() {
        let eleWidthBound;
        let eleHeightBound;
        let top = 0;
        let left = 0;
        let ele;
        const type = typeof this.dragArea;
        if (type === 'string') {
            ele = select(this.dragArea);
        }
        else {
            ele = this.dragArea;
        }
        if (ele) {
            const elementArea = ele.getBoundingClientRect();
            eleWidthBound = ele.scrollWidth ? ele.scrollWidth : elementArea.right - elementArea.left;
            eleHeightBound = ele.scrollHeight ? (this.dragArea && !isNullOrUndefined(this.helperElement) && this.helperElement.classList.contains('e-treeview')) ? ele.clientHeight : ele.scrollHeight : elementArea.bottom - elementArea.top;
            const keys = ['Top', 'Left', 'Bottom', 'Right'];
            /* eslint-disable */
            const styles = getComputedStyle(ele);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[parseInt(i.toString(), 10)];
                const tborder = styles['border' + key + 'Width'];
                const tpadding = styles['padding' + key];
                const lowerKey = key.toLowerCase();
                this.borderWidth[`${lowerKey}`] = isNaN(parseFloat(tborder)) ? 0 : parseFloat(tborder);
                this.padding[`${lowerKey}`] = isNaN(parseFloat(tpadding)) ? 0 : parseFloat(tpadding);
            }
            /* eslint-enable */
            if (this.dragArea && !isNullOrUndefined(this.helperElement) && this.helperElement.classList.contains('e-treeview')) {
                top = elementArea.top + document.scrollingElement.scrollTop;
            }
            else {
                top = elementArea.top;
            }
            left = elementArea.left;
            this.dragLimit.left = left + this.borderWidth.left + this.padding.left;
            this.dragLimit.top = ele.offsetTop + this.borderWidth.top + this.padding.top;
            this.dragLimit.right = left + eleWidthBound - (this.borderWidth.right + this.padding.right);
            this.dragLimit.bottom = top + eleHeightBound - (this.borderWidth.bottom + this.padding.bottom);
        }
    }
    getProperTargetElement(evt) {
        const intCoord = this.getCoordinates(evt);
        let ele;
        const prevStyle = this.helperElement.style.pointerEvents || '';
        const isPointer = evt.type.indexOf('pointer') !== -1 && Browser.info.name === 'safari' && parseInt(Browser.info.version, 10) > 12;
        if (compareElementParent(evt.target, this.helperElement) || evt.type.indexOf('touch') !== -1 || isPointer) {
            this.helperElement.style.pointerEvents = 'none';
            ele = document.elementFromPoint(intCoord.clientX, intCoord.clientY);
            this.helperElement.style.pointerEvents = prevStyle;
        }
        else {
            ele = evt.target;
        }
        return ele;
    }
    /* istanbul ignore next */
    currentStateCheck(ele, oldEle) {
        let elem;
        if (!isNullOrUndefined(this.currentStateTarget) && this.currentStateTarget !== ele) {
            elem = this.currentStateTarget;
        }
        else {
            elem = !isNullOrUndefined(oldEle) ? oldEle : ele;
        }
        return elem;
    }
    getMousePosition(evt, isdragscroll) {
        /* tslint:disable no-any */
        // eslint-disable-next-line
        const dragEle = evt.srcElement !== undefined ? evt.srcElement : evt.target;
        const intCoord = this.getCoordinates(evt);
        let pageX;
        let pageY;
        const isOffsetParent = isNullOrUndefined(dragEle.offsetParent);
        /* istanbul ignore next */
        if (isdragscroll) {
            pageX = this.clone ? intCoord.pageX :
                (intCoord.pageX + (isOffsetParent ? 0 : dragEle.offsetParent.scrollLeft)) - this.relativeXPosition;
            pageY = this.clone ? intCoord.pageY :
                (intCoord.pageY + (isOffsetParent ? 0 : dragEle.offsetParent.scrollTop)) - this.relativeYPosition;
        }
        else {
            pageX = this.clone ? intCoord.pageX : (intCoord.pageX + window.pageXOffset) - this.relativeXPosition;
            pageY = this.clone ? intCoord.pageY : (intCoord.pageY + window.pageYOffset) - this.relativeYPosition;
        }
        if (document.scrollingElement && (!isdragscroll && !this.clone)) {
            const ele = document.scrollingElement;
            const isVerticalScroll = ele.scrollHeight > 0 && ele.scrollHeight > ele.clientHeight && ele.scrollTop > 0;
            const isHorrizontalScroll = ele.scrollWidth > 0 && ele.scrollWidth > ele.clientWidth && ele.scrollLeft > 0;
            pageX = isHorrizontalScroll ? pageX - ele.scrollLeft : pageX;
            pageY = isVerticalScroll ? pageY - ele.scrollTop : pageY;
        }
        return {
            left: pageX - (this.margin.left + this.cursorAt.left),
            top: pageY - (this.margin.top + this.cursorAt.top)
        };
    }
    getCoordinates(evt) {
        if (evt.type.indexOf('touch') > -1) {
            return evt.changedTouches[0];
        }
        return evt;
    }
    getHelperElement(evt) {
        let element;
        if (this.clone) {
            if (this.helper) {
                element = this.helper({ sender: evt, element: this.target });
            }
            else {
                element = createElement('div', { className: 'e-drag-helper e-block-touch', innerHTML: 'Draggable' });
                document.body.appendChild(element);
            }
        }
        else {
            element = this.element;
        }
        return element;
    }
    setGlobalDroppables(reset, drag, helper) {
        this.droppables[this.scope] = reset ? null : {
            draggable: drag,
            helper: helper,
            draggedElement: this.element
        };
    }
    checkTargetElement(evt) {
        const target = this.getProperTargetElement(evt);
        let dropIns = this.getDropInstance(target);
        if (!dropIns && target && !isNullOrUndefined(target.parentNode)) {
            const parent = closest(target.parentNode, '.e-droppable') || target.parentElement;
            if (parent) {
                dropIns = this.getDropInstance(parent);
            }
        }
        return { target: target, instance: dropIns };
    }
    getDropInstance(ele) {
        const name = 'getModuleName';
        let drop;
        const eleInst = ele && ele.ej2_instances;
        if (eleInst) {
            for (const inst of eleInst) {
                if (inst[`${name}`]() === 'droppable') {
                    drop = inst;
                    break;
                }
            }
        }
        return drop;
    }
    destroy() {
        this.toggleEvents(true);
        super.destroy();
    }
};
__decorate$2([
    Complex({}, Position)
], Draggable.prototype, "cursorAt", void 0);
__decorate$2([
    Property(true)
], Draggable.prototype, "clone", void 0);
__decorate$2([
    Property()
], Draggable.prototype, "dragArea", void 0);
__decorate$2([
    Property()
], Draggable.prototype, "isDragScroll", void 0);
__decorate$2([
    Property()
], Draggable.prototype, "isReplaceDragEle", void 0);
__decorate$2([
    Property(true)
], Draggable.prototype, "isPreventSelect", void 0);
__decorate$2([
    Event$1()
], Draggable.prototype, "drag", void 0);
__decorate$2([
    Event$1()
], Draggable.prototype, "dragStart", void 0);
__decorate$2([
    Event$1()
], Draggable.prototype, "dragStop", void 0);
__decorate$2([
    Property(1)
], Draggable.prototype, "distance", void 0);
__decorate$2([
    Property()
], Draggable.prototype, "handle", void 0);
__decorate$2([
    Property()
], Draggable.prototype, "abort", void 0);
__decorate$2([
    Property()
], Draggable.prototype, "helper", void 0);
__decorate$2([
    Property('default')
], Draggable.prototype, "scope", void 0);
__decorate$2([
    Property('')
], Draggable.prototype, "dragTarget", void 0);
__decorate$2([
    Property()
], Draggable.prototype, "axis", void 0);
__decorate$2([
    Property()
], Draggable.prototype, "queryPositionInfo", void 0);
__decorate$2([
    Property(false)
], Draggable.prototype, "enableTailMode", void 0);
__decorate$2([
    Property(false)
], Draggable.prototype, "skipDistanceCheck", void 0);
__decorate$2([
    Property(true)
], Draggable.prototype, "preventDefault", void 0);
__decorate$2([
    Property(false)
], Draggable.prototype, "enableAutoScroll", void 0);
__decorate$2([
    Property(false)
], Draggable.prototype, "enableTapHold", void 0);
__decorate$2([
    Property(750)
], Draggable.prototype, "tapHoldThreshold", void 0);
__decorate$2([
    Property(false)
], Draggable.prototype, "enableScrollHandler", void 0);
Draggable = Draggable_1 = __decorate$2([
    NotifyPropertyChanges
], Draggable);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Droppable Module provides support to enable droppable functionality in Dom Elements.
 * ```html
 * <div id='drop'>Droppable</div>
 * <script>
 * let ele:HTMLElement = document.getElementById('drop');
 * var drag:Droppable = new Droppable(ele,{
 *     accept:'.drop',
 *     drop: function(e) {
 *      //drop handler code.
 *     }
 * });
 * </script>
 * ```
 */
let Droppable = class Droppable extends Base {
    constructor(element, options) {
        super(options, element);
        this.mouseOver = false;
        this.dragData = {};
        this.dragStopCalled = false;
        this.bind();
    }
    bind() {
        this.wireEvents();
    }
    wireEvents() {
        EventHandler.add(this.element, Browser.isSafari() ? 'touchend' : Browser.touchEndEvent, this.intDrop, this);
    }
    // triggers when property changed
    // eslint-disable-next-line
    onPropertyChanged(newProp, oldProp) {
        //No Code to handle
    }
    getModuleName() {
        return 'droppable';
    }
    intOver(event, element) {
        if (!this.mouseOver) {
            const drag = this.dragData[this.scope];
            this.trigger('over', { event: event, target: element, dragData: drag });
            this.mouseOver = true;
        }
    }
    intOut(event, element) {
        if (this.mouseOver) {
            this.trigger('out', { evt: event, target: element });
            this.mouseOver = false;
        }
    }
    intDrop(evt, element) {
        if (!this.dragStopCalled) {
            return;
        }
        else {
            this.dragStopCalled = false;
        }
        let accept = true;
        const drag = this.dragData[this.scope];
        const isDrag = drag ? (drag.helper && isVisible(drag.helper)) : false;
        let area;
        if (isDrag) {
            area = this.isDropArea(evt, drag.helper, element);
            if (this.accept) {
                accept = matches(drag.helper, this.accept);
            }
        }
        if (isDrag && this.drop && area.canDrop && accept) {
            this.trigger('drop', { event: evt, target: area.target, droppedElement: drag.helper, dragData: drag });
        }
        this.mouseOver = false;
    }
    isDropArea(evt, helper, element) {
        const area = { canDrop: true, target: element || evt.target };
        const isTouch = evt.type === 'touchend';
        if (isTouch || area.target === helper) {
            helper.style.display = 'none';
            const coord = isTouch ? (evt.changedTouches[0]) : evt;
            const ele = document.elementFromPoint(coord.clientX, coord.clientY);
            area.canDrop = false;
            area.canDrop = compareElementParent(ele, this.element);
            if (area.canDrop) {
                area.target = ele;
            }
            helper.style.display = '';
        }
        return area;
    }
    destroy() {
        EventHandler.remove(this.element, Browser.isSafari() ? 'touchend' : Browser.touchEndEvent, this.intDrop);
        super.destroy();
    }
};
__decorate$3([
    Property()
], Droppable.prototype, "accept", void 0);
__decorate$3([
    Property('default')
], Droppable.prototype, "scope", void 0);
__decorate$3([
    Event$1()
], Droppable.prototype, "drop", void 0);
__decorate$3([
    Event$1()
], Droppable.prototype, "over", void 0);
__decorate$3([
    Event$1()
], Droppable.prototype, "out", void 0);
Droppable = __decorate$3([
    NotifyPropertyChanges
], Droppable);

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KeyboardEvents_1;
const keyCode = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'control': 17,
    'alt': 18,
    'pause': 19,
    'capslock': 20,
    'space': 32,
    'escape': 27,
    'pageup': 33,
    'pagedown': 34,
    'end': 35,
    'home': 36,
    'leftarrow': 37,
    'uparrow': 38,
    'rightarrow': 39,
    'downarrow': 40,
    'insert': 45,
    'delete': 46,
    'f1': 112,
    'f2': 113,
    'f3': 114,
    'f4': 115,
    'f5': 116,
    'f6': 117,
    'f7': 118,
    'f8': 119,
    'f9': 120,
    'f10': 121,
    'f11': 122,
    'f12': 123,
    'semicolon': 186,
    'plus': 187,
    'comma': 188,
    'minus': 189,
    'dot': 190,
    'forwardslash': 191,
    'graveaccent': 192,
    'openbracket': 219,
    'backslash': 220,
    'closebracket': 221,
    'singlequote': 222
};
/**
 * KeyboardEvents class enables you to bind key action desired key combinations for ex., Ctrl+A, Delete, Alt+Space etc.
 * ```html
 * <div id='testEle'>  </div>;
 * <script>
 *   let node: HTMLElement = document.querySelector('#testEle');
 *   let kbInstance = new KeyboardEvents({
 *       element: node,
 *       keyConfigs:{ selectAll : 'ctrl+a' },
 *       keyAction: function (e:KeyboardEvent, action:string) {
 *           // handler function code
 *       }
 *   });
 * </script>
 * ```
 */
let KeyboardEvents = KeyboardEvents_1 = class KeyboardEvents extends Base {
    /**
     * Initializes the KeyboardEvents
     *
     * @param {HTMLElement} element ?
     * @param {KeyboardEventsModel} options ?
     */
    constructor(element, options) {
        super(options, element);
        /**
         * To handle a key press event returns null
         *
         * @param {KeyboardEventArgs} e ?
         * @returns {void} ?
         */
        this.keyPressHandler = (e) => {
            const isAltKey = e.altKey;
            const isCtrlKey = e.ctrlKey;
            const isShiftKey = e.shiftKey;
            const curkeyCode = e.which;
            const keys = Object.keys(this.keyConfigs);
            for (const key of keys) {
                const configCollection = this.keyConfigs[`${key}`].split(',');
                for (const rconfig of configCollection) {
                    const rKeyObj = KeyboardEvents_1.getKeyConfigData(rconfig.trim());
                    if (isAltKey === rKeyObj.altKey && isCtrlKey === rKeyObj.ctrlKey &&
                        isShiftKey === rKeyObj.shiftKey && curkeyCode === rKeyObj.keyCode) {
                        e.action = key;
                        if (this.keyAction) {
                            this.keyAction(e);
                        }
                    }
                }
            }
        };
        this.bind();
    }
    /**
     * Unwire bound events and destroy the instance.
     *
     * @returns {void} ?
     */
    destroy() {
        this.unwireEvents();
        super.destroy();
    }
    /**
     * Function can be used to specify certain action if a property is changed
     *
     * @param {KeyboardEventsModel} newProp ?
     * @param {KeyboardEventsModel} oldProp ?
     * @returns {void} ?
     * @private
     */
    // eslint-disable-next-line
    onPropertyChanged(newProp, oldProp) {
        // No code are needed
    }
    bind() {
        this.wireEvents();
    }
    /**
     * To get the module name, returns 'keyboard'.
     *
     * @returns {string} ?
     * @private
     */
    getModuleName() {
        return 'keyboard';
    }
    /**
     * Wiring event handlers to events
     *
     * @returns {void} ?
     * @private
     */
    wireEvents() {
        this.element.addEventListener(this.eventName, this.keyPressHandler);
    }
    /**
     * Unwiring event handlers to events
     *
     * @returns {void} ?
     * @private
     */
    unwireEvents() {
        this.element.removeEventListener(this.eventName, this.keyPressHandler);
    }
    /**
     * To get the key configuration data
     *
     * @param {string} config - configuration data
     * @returns {KeyData} ?
     */
    static getKeyConfigData(config) {
        if (config in this.configCache) {
            return this.configCache[`${config}`];
        }
        const keys = config.toLowerCase().split('+');
        const keyData = {
            altKey: (keys.indexOf('alt') !== -1 ? true : false),
            ctrlKey: (keys.indexOf('ctrl') !== -1 ? true : false),
            shiftKey: (keys.indexOf('shift') !== -1 ? true : false),
            keyCode: null
        };
        if (keys[keys.length - 1].length > 1 && !!Number(keys[keys.length - 1])) {
            keyData.keyCode = Number(keys[keys.length - 1]);
        }
        else {
            keyData.keyCode = KeyboardEvents_1.getKeyCode(keys[keys.length - 1]);
        }
        KeyboardEvents_1.configCache[`${config}`] = keyData;
        return keyData;
    }
    // Return the keycode value as string
    static getKeyCode(keyVal) {
        return keyCode[`${keyVal}`] || keyVal.toUpperCase().charCodeAt(0);
    }
};
KeyboardEvents.configCache = {};
__decorate$4([
    Property({})
], KeyboardEvents.prototype, "keyConfigs", void 0);
__decorate$4([
    Property('keyup')
], KeyboardEvents.prototype, "eventName", void 0);
__decorate$4([
    Event$1()
], KeyboardEvents.prototype, "keyAction", void 0);
KeyboardEvents = KeyboardEvents_1 = __decorate$4([
    NotifyPropertyChanges
], KeyboardEvents);

/**
 * L10n modules provides localized text for different culture.
 * ```typescript
 * import {setCulture} from '@syncfusion/ts-base-library';
 * //load global locale object common for all components.
 * L10n.load({
 *    'fr-BE': {
 *       'button': {
 *            'check': 'vérifié'
 *        }
 *    }
 * });
 * //set globale default locale culture.
 * setCulture('fr-BE');
 * let instance: L10n = new L10n('button', {
 *    check: 'checked'
 * });
 * //Get locale text for current property.
 * instance.getConstant('check');
 * //Change locale culture in a component.
 * instance.setLocale('en-US');
 * ```
 */
class L10n {
    /**
     * Constructor
     *
     * @param {string} controlName ?
     * @param {Object} localeStrings ?
     * @param {string} locale ?
     */
    constructor(controlName, localeStrings, locale) {
        this.controlName = controlName;
        this.localeStrings = localeStrings;
        this.setLocale(locale || defaultCulture);
    }
    /**
     * Sets the locale text
     *
     * @param {string} locale ?
     * @returns {void} ?
     */
    setLocale(locale) {
        const intLocale = this.intGetControlConstant(L10n.locale, locale);
        this.currentLocale = intLocale || this.localeStrings;
    }
    /**
     * Sets the global locale for all components.
     *
     * @param {Object} localeObject - specifies the localeObject to be set as global locale.
     * @returns {void} ?
     */
    static load(localeObject) {
        this.locale = extend(this.locale, localeObject, {}, true);
    }
    /**
     * Returns current locale text for the property based on the culture name and control name.
     *
     * @param {string} prop - specifies the property for which localize text to be returned.
     * @returns {string} ?
     */
    getConstant(prop) {
        // Removed conditional operator because this method does not return correct value when passing 0 as value in localization
        if (!isNullOrUndefined(this.currentLocale[`${prop}`])) {
            return this.currentLocale[`${prop}`];
        }
        else {
            return this.localeStrings[`${prop}`] || '';
        }
    }
    /**
     * Returns the control constant object for current object and the locale specified.
     *
     * @param {Object} curObject ?
     * @param {string} locale ?
     * @returns {Object} ?
     */
    intGetControlConstant(curObject, locale) {
        if ((curObject)[`${locale}`]) {
            return (curObject)[`${locale}`][this.controlName];
        }
        return null;
    }
}
L10n.locale = {};

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * SwipeSettings is a framework module that provides support to handle swipe event like swipe up, swipe right, etc..,
 */
class SwipeSettings extends ChildProperty {
}
__decorate$5([
    Property(50)
], SwipeSettings.prototype, "swipeThresholdDistance", void 0);
const swipeRegex = /(Up|Down)/;
/**
 * Touch class provides support to handle the touch event like tap, double tap, tap hold, etc..,
 * ```typescript
 *    let node: HTMLElement;
 * let touchObj: Touch = new Touch({
 *    element: node,
 *    tap: function (e) {
 *        // tap handler function code
 *    }
 *    tapHold: function (e) {
 *        // tap hold handler function code
 *    }
 *    scroll: function (e) {
 *        // scroll handler function code
 *    }
 *    swipe: function (e) {
 *        // swipe handler function code
 *    }
 * });
 * ```
 */
let Touch = class Touch extends Base {
    /* End-Properties */
    constructor(element, options) {
        super(options, element);
        this.touchAction = true;
        this.tapCount = 0;
        /**
         *
         * @param {MouseEventArgs | TouchEventArgs} evt ?
         * @returns {void} ?
         */
        this.startEvent = (evt) => {
            if (this.touchAction === true) {
                const point = this.updateChangeTouches(evt);
                if (evt.changedTouches !== undefined) {
                    this.touchAction = false;
                }
                this.isTouchMoved = false;
                this.movedDirection = '';
                this.startPoint = this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
                this.startEventData = point;
                this.hScrollLocked = this.vScrollLocked = false;
                this.tStampStart = Date.now();
                this.timeOutTapHold = setTimeout(() => { this.tapHoldEvent(evt); }, this.tapHoldThreshold);
                EventHandler.add(this.element, Browser.touchMoveEvent, this.moveEvent, this);
                EventHandler.add(this.element, Browser.touchEndEvent, this.endEvent, this);
                EventHandler.add(this.element, Browser.touchCancelEvent, this.cancelEvent, this);
            }
        };
        /**
         *
         * @param {MouseEventArgs | TouchEventArgs} evt ?
         * @returns {void} ?
         */
        this.moveEvent = (evt) => {
            const point = this.updateChangeTouches(evt);
            this.movedPoint = point;
            this.isTouchMoved = !(point.clientX === this.startPoint.clientX && point.clientY === this.startPoint.clientY);
            let eScrollArgs = {};
            if (this.isTouchMoved) {
                clearTimeout(this.timeOutTapHold);
                this.calcScrollPoints(evt);
                const scrollArg = {
                    startEvents: this.startEventData,
                    originalEvent: evt, startX: this.startPoint.clientX,
                    startY: this.startPoint.clientY, distanceX: this.distanceX,
                    distanceY: this.distanceY, scrollDirection: this.scrollDirection,
                    velocity: this.getVelocity(point)
                };
                eScrollArgs = extend(eScrollArgs, {}, scrollArg);
                this.trigger('scroll', eScrollArgs);
                this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
            }
        };
        /**
         *
         * @param {MouseEventArgs | TouchEventArgs} evt ?
         * @returns {void} ?
         */
        this.cancelEvent = (evt) => {
            clearTimeout(this.timeOutTapHold);
            clearTimeout(this.timeOutTap);
            this.tapCount = 0;
            this.swipeFn(evt);
            EventHandler.remove(this.element, Browser.touchCancelEvent, this.cancelEvent);
        };
        /**
         *
         * @param {MouseEventArgs | TouchEventArgs} evt ?
         * @returns {void} ?
         */
        this.endEvent = (evt) => {
            this.swipeFn(evt);
            if (!this.isTouchMoved) {
                if (typeof this.tap === 'function') {
                    this.trigger('tap', { originalEvent: evt, tapCount: ++this.tapCount });
                    this.timeOutTap = setTimeout(() => {
                        this.tapCount = 0;
                    }, this.tapThreshold);
                }
            }
            this.modeclear();
        };
        /**
         *
         * @param {MouseEventArgs | TouchEventArgs} evt ?
         * @returns {void} ?
         */
        this.swipeFn = (evt) => {
            clearTimeout(this.timeOutTapHold);
            clearTimeout(this.timeOutTap);
            const point = this.updateChangeTouches(evt);
            let diffX = point.clientX - this.startPoint.clientX;
            let diffY = point.clientY - this.startPoint.clientY;
            diffX = Math.floor(diffX < 0 ? -1 * diffX : diffX);
            diffY = Math.floor(diffY < 0 ? -1 * diffY : diffX);
            this.isTouchMoved = diffX > 1 || diffY > 1;
            const isFirefox = (/Firefox/).test(Browser.userAgent);
            if (isFirefox && point.clientX === 0 && point.clientY === 0 && evt.type === 'mouseup') {
                this.isTouchMoved = false;
            }
            this.endPoint = point;
            this.calcPoints(evt);
            const swipeArgs = {
                originalEvent: evt,
                startEvents: this.startEventData,
                startX: this.startPoint.clientX,
                startY: this.startPoint.clientY,
                distanceX: this.distanceX, distanceY: this.distanceY, swipeDirection: this.movedDirection,
                velocity: this.getVelocity(point)
            };
            if (this.isTouchMoved) {
                let eSwipeArgs;
                const tDistance = this.swipeSettings.swipeThresholdDistance;
                // eslint-disable-next-line
                eSwipeArgs = extend(eSwipeArgs, this.defaultArgs, swipeArgs);
                let canTrigger = false;
                const ele = this.element;
                const scrollBool = this.isScrollable(ele);
                const moved = swipeRegex.test(this.movedDirection);
                if ((tDistance < this.distanceX && !moved) || (tDistance < this.distanceY && moved)) {
                    if (!scrollBool) {
                        canTrigger = true;
                    }
                    else {
                        canTrigger = this.checkSwipe(ele, moved);
                    }
                }
                if (canTrigger) {
                    this.trigger('swipe', eSwipeArgs);
                }
            }
            this.modeclear();
        };
        this.modeclear = () => {
            this.modeClear = setTimeout(() => {
                this.touchAction = true;
            }, (typeof this.tap !== 'function' ? 0 : 20));
            this.lastTapTime = new Date().getTime();
            EventHandler.remove(this.element, Browser.touchMoveEvent, this.moveEvent);
            EventHandler.remove(this.element, Browser.touchEndEvent, this.endEvent);
            EventHandler.remove(this.element, Browser.touchCancelEvent, this.cancelEvent);
        };
        this.bind();
    }
    // triggers when property changed
    /**
     *
     * @private
     * @param {TouchModel} newProp ?
     * @param {TouchModel} oldProp ?
     * @returns {void} ?
     */
    // eslint-disable-next-line
    onPropertyChanged(newProp, oldProp) {
        //No Code to handle
    }
    bind() {
        this.wireEvents();
        if (Browser.isIE) {
            this.element.classList.add('e-block-touch');
        }
    }
    /**
     * To destroy the touch instance.
     *
     * @returns {void}
     */
    destroy() {
        this.unwireEvents();
        super.destroy();
    }
    // Need to changes the event binding once we updated the event handler.
    wireEvents() {
        EventHandler.add(this.element, Browser.touchStartEvent, this.startEvent, this);
    }
    unwireEvents() {
        EventHandler.remove(this.element, Browser.touchStartEvent, this.startEvent);
    }
    /**
     * Returns module name as touch
     *
     * @returns {string} ?
     * @private
     */
    getModuleName() {
        return 'touch';
    }
    /**
     * Returns if the HTML element is Scrollable.
     *
     * @param {HTMLElement} element - HTML Element to check if Scrollable.
     * @returns {boolean} ?
     */
    isScrollable(element) {
        const eleStyle = getComputedStyle(element);
        const style = eleStyle.overflow + eleStyle.overflowX + eleStyle.overflowY;
        if ((/(auto|scroll)/).test(style)) {
            return true;
        }
        return false;
    }
    /**
     *
     * @param {MouseEventArgs | TouchEventArgs} evt ?
     * @returns {void} ?
     */
    tapHoldEvent(evt) {
        this.tapCount = 0;
        this.touchAction = true;
        let eTapArgs;
        EventHandler.remove(this.element, Browser.touchMoveEvent, this.moveEvent);
        EventHandler.remove(this.element, Browser.touchEndEvent, this.endEvent);
        // eslint-disable-next-line
        eTapArgs = { originalEvent: evt };
        this.trigger('tapHold', eTapArgs);
        EventHandler.remove(this.element, Browser.touchCancelEvent, this.cancelEvent);
    }
    calcPoints(evt) {
        const point = this.updateChangeTouches(evt);
        this.defaultArgs = { originalEvent: evt };
        this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.startPoint.clientX)));
        this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.startPoint.clientY)));
        if (this.distanceX > this.distanceY) {
            this.movedDirection = (point.clientX > this.startPoint.clientX) ? 'Right' : 'Left';
        }
        else {
            this.movedDirection = (point.clientY < this.startPoint.clientY) ? 'Up' : 'Down';
        }
    }
    calcScrollPoints(evt) {
        const point = this.updateChangeTouches(evt);
        this.defaultArgs = { originalEvent: evt };
        this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.lastMovedPoint.clientX)));
        this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.lastMovedPoint.clientY)));
        if ((this.distanceX > this.distanceY || this.hScrollLocked === true) && this.vScrollLocked === false) {
            this.scrollDirection = (point.clientX > this.lastMovedPoint.clientX) ? 'Right' : 'Left';
            this.hScrollLocked = true;
        }
        else {
            this.scrollDirection = (point.clientY < this.lastMovedPoint.clientY) ? 'Up' : 'Down';
            this.vScrollLocked = true;
        }
    }
    getVelocity(pnt) {
        const newX = pnt.clientX;
        const newY = pnt.clientY;
        const newT = Date.now();
        const xDist = newX - this.startPoint.clientX;
        const yDist = newY - this.startPoint.clientX;
        const interval = newT - this.tStampStart;
        return Math.sqrt(xDist * xDist + yDist * yDist) / interval;
    }
    // eslint-disable-next-line
    checkSwipe(ele, flag) {
        const keys = ['scroll', 'offset'];
        const temp = flag ? ['Height', 'Top'] : ['Width', 'Left'];
        if ((ele[keys[0] + temp[0]] <= ele[keys[1] + temp[0]])) {
            return true;
        }
        return (ele[keys[0] + temp[1]] === 0) ||
            (ele[keys[1] + temp[0]] + ele[keys[0] + temp[1]] >= ele[keys[0] + temp[0]]);
    }
    updateChangeTouches(evt) {
        const point = evt.changedTouches && evt.changedTouches.length !== 0 ? evt.changedTouches[0] : evt;
        return point;
    }
};
__decorate$5([
    Event$1()
], Touch.prototype, "tap", void 0);
__decorate$5([
    Event$1()
], Touch.prototype, "tapHold", void 0);
__decorate$5([
    Event$1()
], Touch.prototype, "swipe", void 0);
__decorate$5([
    Event$1()
], Touch.prototype, "scroll", void 0);
__decorate$5([
    Property(350)
], Touch.prototype, "tapThreshold", void 0);
__decorate$5([
    Property(750)
], Touch.prototype, "tapHoldThreshold", void 0);
__decorate$5([
    Complex({}, SwipeSettings)
], Touch.prototype, "swipeSettings", void 0);
Touch = __decorate$5([
    NotifyPropertyChanges
], Touch);

/**
 * Template Engine
 */
const LINES = new RegExp('\\n|\\r|\\s\\s+', 'g');
const QUOTES = new RegExp(/'|"/g);
const IF_STMT = new RegExp('if ?\\(');
const ELSEIF_STMT = new RegExp('else if ?\\(');
const ELSE_STMT = new RegExp('else');
const FOR_STMT = new RegExp('for ?\\(');
const IF_OR_FOR = new RegExp('(/if|/for)');
const CALL_FUNCTION = new RegExp('\\((.*)\\)', '');
const NOT_NUMBER = new RegExp('^[0-9]+$', 'g');
const WORD = new RegExp('[\\w"\'.\\s+]+', 'g');
const DBL_QUOTED_STR = new RegExp('"(.*?)"', 'g');
const WORDIF = new RegExp('[\\w"\'@#$.\\s-+]+', 'g');
let exp = new RegExp('\\${([^}]*)}', 'g');
// let cachedTemplate: Object = {};
const ARR_OBJ = /^\..*/gm;
const SINGLE_SLASH = /\\/gi;
const DOUBLE_SLASH = /\\\\/gi;
const WORDFUNC = new RegExp('[\\w"\'@#$.\\s+]+', 'g');
const WINDOWFUNC = /\window\./gm;
/**
 * The function to set regular expression for template expression string.
 *
 * @param {RegExp} value - Value expression.
 * @returns {RegExp} ?
 * @private
 */

// /**
//  * To render the template string from the given data.
//  * @param  {string} template - String Template.
//  * @param  {Object[]|JSON} data - DataSource for the template.
//  * @param  {Object} helper? - custom helper object.
//  */
// export function template(template: string, data: JSON, helper?: Object): string {
//     let hash: string = hashCode(template);
//     let tmpl: Function;
//     if (!cachedTemplate[hash]) {
//         tmpl = cachedTemplate[hash] = compile(template, helper);
//     } else {
//         tmpl = cachedTemplate[hash];
//     }
//     return tmpl(data);
// }
/**
 * Compile the template string into template function.
 *
 * @param {string | Function} template - The template string which is going to convert.
 * @param {Object} helper - Helper functions as an object.
 * @param {boolean} ignorePrefix ?
 * @returns {string} ?
 * @private
 */
function compile$1(template, helper, ignorePrefix) {
    if (typeof template === 'function') {
        return template;
    }
    else {
        const argName = 'data';
        const evalExpResult = evalExp(template, argName, helper, ignorePrefix);
        /* eslint-disable */
        const condtion = `var valueRegEx = (/value=\\'([A-Za-z0-9 _]*)((.)([\\w)(!-;?-■\\s]+)['])/g);
        var hrefRegex = (/(?:href)([\\s='"./]+)([\\w-./?=&\\\\#"]+)((.)([\\w)(!-;/?-■\\s]+)['])/g);
        if(str.match(valueRegEx)){
            var check = str.match(valueRegEx);
            var str1 = str;
            for (var i=0; i < check.length; i++) {
                var check1 = str.match(valueRegEx)[i].split('value=')[1];
                var change = check1.match(/^'/) !== null ? check1.replace(/^'/, '\"') : check1;
                change =change.match(/.$/)[0] === '\\'' ? change.replace(/.$/,'\"') : change;
                str1 = str1.replace(check1, change);
            }
            str = str.replace(str, str1);
        }
        else if (str.match(/(?:href='')/) === null) {
            if(str.match(hrefRegex)) {
                var check = str.match(hrefRegex);
                var str1 = str;
                for (var i=0; i < check.length; i++) {
                    var check1 = str.match(hrefRegex)[i].split('href=')[1];
                    if (check1) {
                        var change = check1.match(/^'/) !== null ? check1.replace(/^'/, '\"') : check1;
                        change =change.match(/.$/)[0] === '\\'' ? change.replace(/.$/,'\"') : change;
                        str1 = str1.replace(check1, change);
                    }
                }
                str = str.replace(str, str1);
            }
        }
        `;
        const fnCode = 'var str=\"' + evalExpResult + '\";' + condtion + ' return str;';
        /* eslint-enable */
        const fn = new Function(argName, fnCode);
        return fn.bind(helper);
    }
}
/** function used to evaluate the function expression
 *
 * @param {string} str ?
 * @param {string} nameSpace ?
 * @param {Object} helper ?
 * @param {boolean} ignorePrefix ?
 * @returns {string} ?
 */
function evalExp(str, nameSpace, helper, ignorePrefix) {
    let varCOunt = 0;
    /**
     * Variable containing Local Keys
     */
    const localKeys = [];
    const isClass = str.match(/class="([^"]+|)\s{2}/g);
    let singleSpace = '';
    if (isClass) {
        isClass.forEach((value) => {
            singleSpace = value.replace(/\s\s+/g, ' ');
            str = str.replace(value, singleSpace);
        });
    }
    if (exp.test(str)) {
        let insideBraces = false;
        let outputString = '';
        for (let i = 0; i < str.length; i++) {
            if (str[i + ''] === '$' && str[i + 1] === '{') {
                insideBraces = true;
            }
            else if (str[i + ''] === '}') {
                insideBraces = false;
            }
            outputString += (str[i + ''] === '"' && !insideBraces) ? '\\"' : str[i + ''];
        }
        str = outputString;
    }
    else {
        str = str.replace(/\\?"/g, '\\"');
    }
    return str.replace(LINES, '').replace(DBL_QUOTED_STR, '\'$1\'').replace(exp, 
    // eslint-disable-next-line
    (match, cnt, offset, matchStr) => {
        const SPECIAL_CHAR = /@|#|\$/gm;
        const matches = cnt.match(CALL_FUNCTION);
        // matches to detect any function calls
        if (matches) {
            const rlStr = matches[1];
            if (ELSEIF_STMT.test(cnt)) {
                //handling else-if condition
                cnt = '";} ' + cnt.replace(matches[1], rlStr.replace(WORD, (str) => {
                    str = str.trim();
                    return addNameSpace(str, !(QUOTES.test(str)) && (localKeys.indexOf(str) === -1), nameSpace, localKeys, ignorePrefix);
                })) + '{ \n str = str + "';
            }
            else if (IF_STMT.test(cnt)) {
                //handling if condition
                cnt = '"; ' + cnt.replace(matches[1], rlStr.replace(WORDIF, (strs) => {
                    return HandleSpecialCharArrObj(strs, nameSpace, localKeys, ignorePrefix);
                })) + '{ \n str = str + "';
            }
            else if (FOR_STMT.test(cnt)) {
                //handling for condition
                const rlStr = matches[1].split(' of ');
                // replace for each into actual JavaScript
                // eslint-disable-next-line
                cnt = '"; ' + cnt.replace(matches[1], (mtc) => {
                    localKeys.push(rlStr[0]);
                    localKeys.push(rlStr[0] + 'Index');
                    varCOunt = varCOunt + 1;
                    // tslint:disable-next-line
                    return 'var i' + varCOunt + '=0; i' + varCOunt + ' < ' + addNameSpace(rlStr[1], true, nameSpace, localKeys, ignorePrefix) + '.length; i' + varCOunt + '++';
                }) + '{ \n ' + rlStr[0] + '= ' + addNameSpace(rlStr[1], true, nameSpace, localKeys, ignorePrefix)
                    + '[i' + varCOunt + ']; \n var ' + rlStr[0] + 'Index=i' + varCOunt + '; \n str = str + "';
            }
            else {
                //helper function handling
                const fnStr = cnt.split('(');
                // eslint-disable-next-line
                let fNameSpace = (helper && helper.hasOwnProperty(fnStr[0]) ? 'this.' : 'global');
                fNameSpace = (/\./.test(fnStr[0]) ? '' : fNameSpace);
                const ftArray = matches[1].split(',');
                if (matches[1].length !== 0 && !(/data/).test(ftArray[0]) && !(/window./).test(ftArray[0])) {
                    matches[1] = (fNameSpace === 'global' ? nameSpace + '.' + matches[1] : matches[1]);
                }
                const splRegexp = /@|\$|#/gm;
                const arrObj = /\]\./gm;
                if (WINDOWFUNC.test(cnt) && arrObj.test(cnt) || splRegexp.test(cnt)) {
                    const splArrRegexp = /@|\$|#|\]\./gm;
                    if (splArrRegexp.test(cnt)) {
                        // tslint:disable-next-line
                        cnt = '"+ ' + (fNameSpace === 'global' ? '' : fNameSpace) + cnt.replace(matches[1], rlStr.replace(WORDFUNC, (strs) => {
                            return HandleSpecialCharArrObj(strs, nameSpace, localKeys, ignorePrefix);
                        })) + '+ "';
                    }
                }
                else {
                    cnt = '" + ' + (fNameSpace === 'global' ? '' : fNameSpace) +
                        cnt.replace(rlStr, addNameSpace(matches[1].replace(/,( |)data.|,/gi, ',' + nameSpace + '.').replace(/,( |)data.window/gi, ',window'), (fNameSpace === 'global' ? false : true), nameSpace, localKeys, ignorePrefix)) +
                        '+"';
                }
            }
        }
        else if (ELSE_STMT.test(cnt)) {
            // handling else condition
            cnt = '"; ' + cnt.replace(ELSE_STMT, '} else { \n str = str + "');
            // eslint-disable-next-line
        }
        else if (!!cnt.match(IF_OR_FOR)) {
            // close condition
            cnt = cnt.replace(IF_OR_FOR, '"; \n } \n str = str + "');
        }
        else if (SPECIAL_CHAR.test(cnt)) {
            // template string with double slash with special character
            if (cnt.match(SINGLE_SLASH)) {
                cnt = SlashReplace(cnt);
            }
            cnt = '"+' + NameSpaceForspecialChar(cnt, (localKeys.indexOf(cnt) === -1), nameSpace, localKeys) + '"]+"';
        }
        else {
            // template string with double slash
            if (cnt.match(SINGLE_SLASH)) {
                cnt = SlashReplace(cnt);
                cnt = '"+' + NameSpaceForspecialChar(cnt, (localKeys.indexOf(cnt) === -1), nameSpace, localKeys) + '"]+"';
            }
            else {
                // evaluate normal expression
                cnt = cnt !== '' ? '"+' + addNameSpace(cnt.replace(/,/gi, '+' + nameSpace + '.'), (localKeys.indexOf(cnt) === -1), nameSpace, localKeys, ignorePrefix) + '+"' : '${}';
            }
        }
        return cnt;
    });
}
/**
 *
 * @param {string} str ?
 * @param {boolean} addNS ?
 * @param {string} nameSpace ?
 * @param {string[]} ignoreList ?
 * @param {boolean} ignorePrefix ?
 * @returns {string} ?
 */
function addNameSpace(str, addNS, nameSpace, ignoreList, ignorePrefix) {
    return ((addNS && !(NOT_NUMBER.test(str)) && ignoreList.indexOf(str.split('.')[0]) === -1 && !ignorePrefix && str !== 'true' && str !== 'false') ? nameSpace + '.' + str : str);
}
/**
 *
 * @param {string} str ?
 * @param {boolean} addNS ?
 * @param {string} nameSpace ?
 * @param {string[]} ignoreList ?
 * @returns {string} ?
 */
function NameSpaceArrObj(str, addNS, nameSpace, ignoreList) {
    const arrObjReg = /^\..*/gm;
    return ((addNS && !(NOT_NUMBER.test(str)) &&
        ignoreList.indexOf(str.split('.')[0]) === -1 && !(arrObjReg.test(str))) ? nameSpace + '.' + str : str);
}
// // Create hashCode for template string to storeCached function
// function hashCode(str: string): string {
//     return str.split('').reduce((a: number, b: string) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0).toString();
// }
/**
 *
 * @param {string} str ?
 * @param {boolean} addNS ?
 * @param {string} nameSpace ?
 * @param {string[]} ignoreList ?
 * @returns {string} ?
 */
function NameSpaceForspecialChar(str, addNS, nameSpace, ignoreList) {
    return ((addNS && !(NOT_NUMBER.test(str)) && ignoreList.indexOf(str.split('.')[0]) === -1) ? nameSpace + '["' + str : str);
}
// eslint-disable-next-line
function SlashReplace(tempStr) {
    const double = '\\\\';
    if (tempStr.match(DOUBLE_SLASH)) {
        // eslint-disable-next-line
        tempStr = tempStr;
    }
    else {
        tempStr = tempStr.replace(SINGLE_SLASH, double);
    }
    return tempStr;
}
/**
 *
 * @param {string} str ?
 * @param {string} nameSpaceNew ?
 * @param {string[]} keys ?
 * @param {boolean} ignorePrefix ?
 * @returns {string} ?
 */
function HandleSpecialCharArrObj(str, nameSpaceNew, keys, ignorePrefix) {
    str = str.trim();
    const windowFunc = /\window\./gm;
    if (!windowFunc.test(str)) {
        const quotes = /'|"/gm;
        const splRegexp = /@|\$|#/gm;
        if (splRegexp.test(str)) {
            str = NameSpaceForspecialChar(str, (keys.indexOf(str) === -1), nameSpaceNew, keys) + '"]';
        }
        if (ARR_OBJ.test(str)) {
            return NameSpaceArrObj(str, !(quotes.test(str)) && (keys.indexOf(str) === -1), nameSpaceNew, keys);
        }
        else {
            return addNameSpace(str, !(quotes.test(str)) && (keys.indexOf(str) === -1), nameSpaceNew, keys, ignorePrefix);
        }
    }
    else {
        return str;
    }
}

/**
 * Template Engine Bridge
 */
const HAS_ROW = /^[\n\r.]+<tr|^<tr/;
const HAS_SVG = /^[\n\r.]+<svg|^<path|^<g/;
const blazorTemplates = {};
/**
 *
 * @returns {string} ?
 */
function getRandomId() {
    return '-' + Math.random().toString(36).substr(2, 5);
}
/**
 * Compile the template string into template function.
 *
 * @param {string | Function} templateString - The template string which is going to convert.
 * @param {Object} helper - Helper functions as an object.
 * @param {boolean} ignorePrefix ?
 * @returns {NodeList} ?
 * @private
 */
// eslint-disable-next-line
function compile$$1(templateString, helper, ignorePrefix) {
    const compiler = engineObj.compile(templateString, helper, ignorePrefix);
    // eslint-disable-next-line
    return (data, component, propName, templateId, isStringTemplate, index, element, root) => {
        const result = compiler(data, component, propName, element, root);
        const blazorTemplateId = 'BlazorTemplateId';
        if (isBlazor() && !isStringTemplate) {
            const randomId = getRandomId();
            let blazorId = templateId + randomId;
            if (!blazorTemplates[`${templateId}`]) {
                blazorTemplates[`${templateId}`] = [];
            }
            if (!isNullOrUndefined(index)) {
                const keys = Object.keys(blazorTemplates[`${templateId}`][parseInt(index.toString(), 10)]);
                for (const key of keys) {
                    if (key !== blazorTemplateId && data[`${key}`]) {
                        blazorTemplates[`${templateId}`][parseInt(index.toString(), 10)][`${key}`] = data[`${key}`];
                    }
                    if (key === blazorTemplateId) {
                        blazorId = blazorTemplates[`${templateId}`][parseInt(index.toString(), 10)][`${key}`];
                    }
                }
            }
            else {
                data[`${blazorTemplateId}`] = blazorId;
                blazorTemplates[`${templateId}`].push(data);
            }
            // eslint-disable-next-line
            return propName === 'rowTemplate' ? [createElement('tr', { id: blazorId, className: 'e-blazor-template' })] :
                // eslint-disable-next-line
                [createElement('div', { id: blazorId, className: 'e-blazor-template' })];
        }
        if (typeof result === 'string') {
            if (HAS_SVG.test(result)) {
                const ele = createElement('svg', { innerHTML: result });
                return ele.childNodes;
            }
            else {
                const ele = createElement((HAS_ROW.test(result) ? 'table' : 'div'), { innerHTML: result });
                return ele.childNodes;
            }
        }
        else {
            return result;
        }
    };
}
/**
 *
 * @param {string} templateId ?
 * @param {string} templateName ?
 * @param {string} comp ?
 * @param {boolean} isEmpty ?
 * @param {Function} callBack ?
 * @returns {void} ?
 */
function updateBlazorTemplate(templateId, templateName, comp, isEmpty, callBack) {
    if (isBlazor()) {
        const ejsIntrop = 'sfBlazor';
        window[`${ejsIntrop}`].updateTemplate(templateName, blazorTemplates[`${templateId}`], templateId, comp, callBack);
        if (isEmpty !== false) {
            blazorTemplates[`${templateId}`] = [];
        }
    }
}
/**
 *
 * @param {string} templateId ?
 * @param {string} templateName ?
 * @param {number} index ?
 * @returns {void} ?
 */
function resetBlazorTemplate(templateId, templateName, index) {
    const templateDiv = document.getElementById(templateId);
    if (templateDiv) {
        // eslint-disable-next-line
        const innerTemplates = templateDiv.getElementsByClassName('blazor-inner-template');
        for (let i = 0; i < innerTemplates.length; i++) {
            let tempId = ' ';
            if (!isNullOrUndefined(index)) {
                tempId = innerTemplates[parseInt(index.toString(), 10)].getAttribute('data-templateId');
            }
            else {
                tempId = innerTemplates[parseInt(i.toString(), 10)].getAttribute('data-templateId');
            }
            const tempElement = document.getElementById(tempId);
            if (tempElement) {
                const length = tempElement.childNodes.length;
                for (let j = 0; j < length; j++) {
                    if (!isNullOrUndefined(index)) {
                        innerTemplates[parseInt(index.toString(), 10)].appendChild(tempElement.childNodes[0]);
                        i = innerTemplates.length;
                    }
                    else {
                        innerTemplates[parseInt(i.toString(), 10)].appendChild(tempElement.childNodes[0]);
                    }
                }
            }
        }
    }
}
/**
 * Set your custom template engine for template rendering.
 *
 * @param  {ITemplateEngine} classObj - Class object for custom template.
 * @returns {void} ?
 * @private
 */
function setTemplateEngine(classObj) {
    engineObj.compile = classObj.compile;
}
/**
 * Get current template engine for template rendering
 *
 * @returns {string} ?
 * @private
 */
function getTemplateEngine() {
    return engineObj.compile;
}
/**
 * Set the current template function to support Content Security Policy.
 *
 * @param {Function} template - The template function that is going to render.
 * @param {any} helper - The data utilized by the template from the helper.
 * @returns {Function} ?
 * @private
 */
// eslint-disable-next-line
function initializeCSPTemplate(template, helper) {
    let boundFunc;
    template.prototype.CSPTemplate = true;
    if (!isNullOrUndefined(helper)) {
        boundFunc = template.bind(helper);
        boundFunc.prototype = Object.create(template.prototype);
    }
    else {
        boundFunc = template;
    }
    return boundFunc;
}
//Default Engine Class
class Engine {
    // eslint-disable-next-line
    compile(templateString, helper = {}, ignorePrefix) {
        return compile$1(templateString, helper);
    }
}
const engineObj = { compile: new Engine().compile };

/**
 * SanitizeHtmlHelper for sanitize the value.
 */
const removeTags = [
    'script',
    'style',
    'iframe[src]',
    'link[href*="javascript:"]',
    'object[type="text/x-scriptlet"]',
    'object[data^="data:text/html;base64"]',
    'img[src^="data:text/html;base64"]',
    '[src^="javascript:"]',
    '[dynsrc^="javascript:"]',
    '[lowsrc^="javascript:"]',
    '[type^="application/x-shockwave-flash"]'
];
const removeAttrs = [
    { attribute: 'href', selector: '[href*="javascript:"]' },
    { attribute: 'background', selector: '[background^="javascript:"]' },
    { attribute: 'style', selector: '[style*="javascript:"]' },
    { attribute: 'style', selector: '[style*="expression("]' },
    { attribute: 'href', selector: 'a[href^="data:text/html;base64"]' }
];
const jsEvents = ['onchange',
    'onclick',
    'onmouseover',
    'onmouseout',
    'onkeydown',
    'onload',
    'onerror',
    'onblur',
    'onfocus',
    'onbeforeload',
    'onbeforeunload',
    'onkeyup',
    'onsubmit',
    'onafterprint',
    'onbeforeonload',
    'onbeforeprint',
    'oncanplay',
    'oncanplaythrough',
    'oncontextmenu',
    'ondblclick',
    'ondrag',
    'ondragend',
    'ondragenter',
    'ondragleave',
    'ondragover',
    'ondragstart',
    'ondrop',
    'ondurationchange',
    'onemptied',
    'onended',
    'onformchange',
    'onforminput',
    'onhaschange',
    'oninput',
    'oninvalid',
    'onkeypress',
    'onloadeddata',
    'onloadedmetadata',
    'onloadstart',
    'onmessage',
    'onmousedown',
    'onmousemove',
    'onmouseup',
    'onmousewheel',
    'onoffline',
    'onoine',
    'ononline',
    'onpagehide',
    'onpageshow',
    'onpause',
    'onplay',
    'onplaying',
    'onpopstate',
    'onprogress',
    'onratechange',
    'onreadystatechange',
    'onredo',
    'onresize',
    'onscroll',
    'onseeked',
    'onseeking',
    'onselect',
    'onstalled',
    'onstorage',
    'onsuspend',
    'ontimeupdate',
    'onundo',
    'onunload',
    'onvolumechange',
    'onwaiting',
    'onmouseenter',
    'onmouseleave',
    'onstart',
    'onpropertychange',
    'oncopy',
    'ontoggle',
    'onpointerout',
    'onpointermove',
    'onpointerleave',
    'onpointerenter',
    'onpointerrawupdate',
    'onpointerover',
    'onbeforecopy',
    'onbeforecut',
    'onbeforeinput'
];
class SanitizeHtmlHelper {
    static beforeSanitize() {
        return {
            selectors: {
                tags: removeTags,
                attributes: removeAttrs
            }
        };
    }
    static sanitize(value) {
        if (isNullOrUndefined(value)) {
            return value;
        }
        const item = this.beforeSanitize();
        const output = this.serializeValue(item, value);
        return output;
    }
    static serializeValue(item, value) {
        this.removeAttrs = item.selectors.attributes;
        this.removeTags = item.selectors.tags;
        this.wrapElement = document.createElement('div');
        this.wrapElement.innerHTML = value;
        this.removeXssTags();
        this.removeJsEvents();
        this.removeXssAttrs();
        const tempEleValue = this.wrapElement.innerHTML;
        this.removeElement();
        this.wrapElement = null;
        return tempEleValue.replace(/&amp;/g, '&');
    }
    static removeElement() {
        // Removes an element's attibute to avoid html tag validation
        const nodes = this.wrapElement.children;
        for (let j = 0; j < nodes.length; j++) {
            const attribute = nodes[parseInt(j.toString(), 10)].attributes;
            for (let i = 0; i < attribute.length; i++) {
                this.wrapElement.children[parseInt(j.toString(), 10)].removeAttribute(attribute[parseInt(i.toString(), 10)].localName);
            }
        }
    }
    static removeXssTags() {
        const elements = this.wrapElement.querySelectorAll(this.removeTags.join(','));
        if (elements.length > 0) {
            elements.forEach((element) => {
                detach(element);
            });
        }
        else {
            return;
        }
    }
    static removeJsEvents() {
        const elements = this.wrapElement.querySelectorAll('[' + jsEvents.join('],[') + ']');
        if (elements.length > 0) {
            elements.forEach((element) => {
                jsEvents.forEach((attr) => {
                    if (element.hasAttribute(attr)) {
                        element.removeAttribute(attr);
                    }
                });
            });
        }
        else {
            return;
        }
    }
    static removeXssAttrs() {
        // eslint-disable-next-line
        this.removeAttrs.forEach((item, index) => {
            const elements = this.wrapElement.querySelectorAll(item.selector);
            if (elements.length > 0) {
                elements.forEach((element) => {
                    element.removeAttribute(item.attribute);
                });
            }
        });
    }
}

/**
 * Base modules
 */

export { blazorCultureFormats, IntlBase, Ajax, Fetch, Animation, rippleEffect, isRippleEnabled, enableRipple, animationMode, setGlobalAnimation, GlobalAnimationMode, Base, getComponent, removeChildInstance, proxyToRaw, setProxyToRaw, Browser, versionBasedStatePersistence, enableVersionBasedPersistence, Component, ChildProperty, Position, Draggable, Droppable, EventHandler, onIntlChange, rightToLeft, cldrData, defaultCulture, defaultCurrencyCode, Internationalization, setCulture, setCurrencyCode, loadCldr, enableRtl, getNumericObject, getNumberDependable, getDefaultDateObject, KeyboardEvents, L10n, ModuleLoader, Property, Complex, ComplexFactory, Collection, CollectionFactory, Event$1 as Event, NotifyPropertyChanges, CreateBuilder, SwipeSettings, Touch, HijriParser, blazorTemplates, getRandomId, compile$$1 as compile, updateBlazorTemplate, resetBlazorTemplate, setTemplateEngine, getTemplateEngine, initializeCSPTemplate, disableBlazorMode, createInstance, setImmediate, getValue, setValue, deleteObject, containerObject, isObject, getEnumValue, merge, extend, isNullOrUndefined, isUndefined, getUniqueID, debounce, queryParams, isObjectArray, compareElementParent, throwError, print, formatUnit, enableBlazorMode, isBlazor, getElement, getInstance, addInstance, uniqueID, createElement, addClass, removeClass, isVisible, prepend, append, detach, remove, attributes, select, selectAll, closest, siblings, getAttributeOrDefault, setStyleAttribute, classList, matches, includeInnerHTML, containsClass, cloneNode, Observer, SanitizeHtmlHelper, componentList, registerLicense, validateLicense, getVersion, createLicenseOverlay };
//# sourceMappingURL=ej2-base.es2015.js.map
