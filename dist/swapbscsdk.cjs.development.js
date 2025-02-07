'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var JSBI = _interopDefault(require('jsbi'));
var invariant = _interopDefault(require('tiny-invariant'));
var warning = _interopDefault(require('tiny-warning'));
var address = require('@ethersproject/address');
var _Big = _interopDefault(require('big.js'));
var toFormat = _interopDefault(require('toformat'));
var _Decimal = _interopDefault(require('decimal.js-light'));
var solidity = require('@ethersproject/solidity');
var contracts = require('@ethersproject/contracts');
var networks = require('@ethersproject/networks');
var providers = require('@ethersproject/providers');

var _SOLIDITY_TYPE_MAXIMA;

(function (ChainId) {
  ChainId[ChainId["MAINNET"] = 56] = "MAINNET";
  ChainId[ChainId["BSCTESTNET"] = 97] = "BSCTESTNET";
})(exports.ChainId || (exports.ChainId = {}));

(function (TradeType) {
  TradeType[TradeType["EXACT_INPUT"] = 0] = "EXACT_INPUT";
  TradeType[TradeType["EXACT_OUTPUT"] = 1] = "EXACT_OUTPUT";
})(exports.TradeType || (exports.TradeType = {}));

(function (Rounding) {
  Rounding[Rounding["ROUND_DOWN"] = 0] = "ROUND_DOWN";
  Rounding[Rounding["ROUND_HALF_UP"] = 1] = "ROUND_HALF_UP";
  Rounding[Rounding["ROUND_UP"] = 2] = "ROUND_UP";
})(exports.Rounding || (exports.Rounding = {}));

var FACTORY_ADDRESS = '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7';
var INIT_CODE_HASH = '0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3';
var MINIMUM_LIQUIDITY = /*#__PURE__*/JSBI.BigInt(1000); // exports for internal consumption

var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var TWO = /*#__PURE__*/JSBI.BigInt(2);
var THREE = /*#__PURE__*/JSBI.BigInt(3);
var FIVE = /*#__PURE__*/JSBI.BigInt(5);
var TEN = /*#__PURE__*/JSBI.BigInt(10);
var _100 = /*#__PURE__*/JSBI.BigInt(100);
var _997 = /*#__PURE__*/JSBI.BigInt(997);
var _1000 = /*#__PURE__*/JSBI.BigInt(1000);
var SolidityType;

(function (SolidityType) {
  SolidityType["uint8"] = "uint8";
  SolidityType["uint256"] = "uint256";
})(SolidityType || (SolidityType = {}));

var SOLIDITY_TYPE_MAXIMA = (_SOLIDITY_TYPE_MAXIMA = {}, _SOLIDITY_TYPE_MAXIMA[SolidityType.uint8] = /*#__PURE__*/JSBI.BigInt('0xff'), _SOLIDITY_TYPE_MAXIMA[SolidityType.uint256] = /*#__PURE__*/JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'), _SOLIDITY_TYPE_MAXIMA);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// see https://stackoverflow.com/a/41102306
var CAN_SET_PROTOTYPE = ('setPrototypeOf' in Object);
/**
 * Indicates that the pair has insufficient reserves for a desired output amount. I.e. the amount of output cannot be
 * obtained by sending any amount of input.
 */

var InsufficientReservesError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(InsufficientReservesError, _Error);

  function InsufficientReservesError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.isInsufficientReservesError = true;
    _this.name = _this.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof InsufficientReservesError ? this.constructor : void 0).prototype);
    return _this;
  }

  return InsufficientReservesError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Indicates that the input amount is too small to produce any amount of output. I.e. the amount of input sent is less
 * than the price of a single unit of output after fees.
 */

var InsufficientInputAmountError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(InsufficientInputAmountError, _Error2);

  function InsufficientInputAmountError() {
    var _this2;

    _this2 = _Error2.call(this) || this;
    _this2.isInsufficientInputAmountError = true;
    _this2.name = _this2.constructor.name;
    if (CAN_SET_PROTOTYPE) Object.setPrototypeOf(_assertThisInitialized(_this2), (this instanceof InsufficientInputAmountError ? this.constructor : void 0).prototype);
    return _this2;
  }

  return InsufficientInputAmountError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

function validateSolidityTypeInstance(value, solidityType) {
  !JSBI.greaterThanOrEqual(value, ZERO) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
  !JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]) ?  invariant(false, value + " is not a " + solidityType + ".")  : void 0;
} // warns if addresses are not checksummed

function validateAndParseAddress(address$1) {
  try {
    var checksummedAddress = address.getAddress(address$1);
    "development" !== "production" ? warning(address$1 === checksummedAddress, address$1 + " is not checksummed.") : void 0;
    return checksummedAddress;
  } catch (error) {
      invariant(false, address$1 + " is not a valid address.")  ;
  }
}
function parseBigintIsh(bigintIsh) {
  return bigintIsh instanceof JSBI ? bigintIsh : typeof bigintIsh === 'bigint' ? JSBI.BigInt(bigintIsh.toString()) : JSBI.BigInt(bigintIsh);
} // mock the on-chain sqrt function

function sqrt(y) {
  validateSolidityTypeInstance(y, SolidityType.uint256);
  var z = ZERO;
  var x;

  if (JSBI.greaterThan(y, THREE)) {
    z = y;
    x = JSBI.add(JSBI.divide(y, TWO), ONE);

    while (JSBI.lessThan(x, z)) {
      z = x;
      x = JSBI.divide(JSBI.add(JSBI.divide(y, x), x), TWO);
    }
  } else if (JSBI.notEqual(y, ZERO)) {
    z = ONE;
  }

  return z;
} // given an array of items sorted by `comparator`, insert an item into its sort index and constrain the size to
// `maxSize` by removing the last item

function sortedInsert(items, add, maxSize, comparator) {
  !(maxSize > 0) ?  invariant(false, 'MAX_SIZE_ZERO')  : void 0; // this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize

  !(items.length <= maxSize) ?  invariant(false, 'ITEMS_SIZE')  : void 0; // short circuit first item add

  if (items.length === 0) {
    items.push(add);
    return null;
  } else {
    var isFull = items.length === maxSize; // short circuit if full and the additional item does not come before the last item

    if (isFull && comparator(items[items.length - 1], add) <= 0) {
      return add;
    }

    var lo = 0,
        hi = items.length;

    while (lo < hi) {
      var mid = lo + hi >>> 1;

      if (comparator(items[mid], add) <= 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    items.splice(lo, 0, add);
    return isFull ? items.pop() : null;
  }
}

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */

var Currency =
/**
 * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
 * @param decimals decimals of the currency
 * @param symbol symbol of the currency
 * @param name of the currency
 */
function Currency(decimals, symbol, name) {
  validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8);
  this.decimals = decimals;
  this.symbol = symbol;
  this.name = name;
};
/**
 * The only instance of the base class `Currency`.
 */

Currency.ETHER = /*#__PURE__*/new Currency(18, 'BNB', 'binance coin');
var ETHER = Currency.ETHER;

var _WETH;
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */

var Token = /*#__PURE__*/function (_Currency) {
  _inheritsLoose(Token, _Currency);

  function Token(chainId, address, decimals, symbol, name) {
    var _this;

    _this = _Currency.call(this, decimals, symbol, name) || this;
    _this.chainId = chainId;
    _this.address = validateAndParseAddress(address);
    return _this;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */


  var _proto = Token.prototype;

  _proto.equals = function equals(other) {
    // short circuit on reference equality
    if (this === other) {
      return true;
    }

    return this.chainId === other.chainId && this.address === other.address;
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  ;

  _proto.sortsBefore = function sortsBefore(other) {
    !(this.chainId === other.chainId) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(this.address !== other.address) ?  invariant(false, 'ADDRESSES')  : void 0;
    return this.address.toLowerCase() < other.address.toLowerCase();
  };

  return Token;
}(Currency);
/**
 * Compares two currencies for equality
 */

function currencyEquals(currencyA, currencyB) {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB);
  } else if (currencyA instanceof Token) {
    return false;
  } else if (currencyB instanceof Token) {
    return false;
  } else {
    return currencyA === currencyB;
  }
}
var WETH = (_WETH = {}, _WETH[exports.ChainId.MAINNET] = /*#__PURE__*/new Token(exports.ChainId.MAINNET, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'), _WETH[exports.ChainId.BSCTESTNET] = /*#__PURE__*/new Token(exports.ChainId.BSCTESTNET, '0xaE8E19eFB41e7b96815649A6a60785e1fbA84C1e', 18, 'WBNB', 'Wrapped BNB'), _WETH);

var _toSignificantRoundin, _toFixedRounding;
var Decimal = /*#__PURE__*/toFormat(_Decimal);
var Big = /*#__PURE__*/toFormat(_Big);
var toSignificantRounding = (_toSignificantRoundin = {}, _toSignificantRoundin[exports.Rounding.ROUND_DOWN] = Decimal.ROUND_DOWN, _toSignificantRoundin[exports.Rounding.ROUND_HALF_UP] = Decimal.ROUND_HALF_UP, _toSignificantRoundin[exports.Rounding.ROUND_UP] = Decimal.ROUND_UP, _toSignificantRoundin);
var toFixedRounding = (_toFixedRounding = {}, _toFixedRounding[exports.Rounding.ROUND_DOWN] = 0, _toFixedRounding[exports.Rounding.ROUND_HALF_UP] = 1, _toFixedRounding[exports.Rounding.ROUND_UP] = 3, _toFixedRounding);
var Fraction = /*#__PURE__*/function () {
  function Fraction(numerator, denominator) {
    if (denominator === void 0) {
      denominator = ONE;
    }

    this.numerator = parseBigintIsh(numerator);
    this.denominator = parseBigintIsh(denominator);
  } // performs floor division


  var _proto = Fraction.prototype;

  _proto.invert = function invert() {
    return new Fraction(this.denominator, this.numerator);
  };

  _proto.add = function add(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.add(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.add(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.subtract = function subtract(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));

    if (JSBI.equal(this.denominator, otherParsed.denominator)) {
      return new Fraction(JSBI.subtract(this.numerator, otherParsed.numerator), this.denominator);
    }

    return new Fraction(JSBI.subtract(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator)), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.lessThan = function lessThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.lessThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.equalTo = function equalTo(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.equal(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.greaterThan = function greaterThan(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return JSBI.greaterThan(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(otherParsed.numerator, this.denominator));
  };

  _proto.multiply = function multiply(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.numerator), JSBI.multiply(this.denominator, otherParsed.denominator));
  };

  _proto.divide = function divide(other) {
    var otherParsed = other instanceof Fraction ? other : new Fraction(parseBigintIsh(other));
    return new Fraction(JSBI.multiply(this.numerator, otherParsed.denominator), JSBI.multiply(this.denominator, otherParsed.numerator));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(significantDigits) ?  invariant(false, significantDigits + " is not an integer.")  : void 0;
    !(significantDigits > 0) ?  invariant(false, significantDigits + " is not positive.")  : void 0;
    Decimal.set({
      precision: significantDigits + 1,
      rounding: toSignificantRounding[rounding]
    });
    var quotient = new Decimal(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(significantDigits);
    return quotient.toFormat(quotient.decimalPlaces(), format);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_HALF_UP;
    }

    !Number.isInteger(decimalPlaces) ?  invariant(false, decimalPlaces + " is not an integer.")  : void 0;
    !(decimalPlaces >= 0) ?  invariant(false, decimalPlaces + " is negative.")  : void 0;
    Big.DP = decimalPlaces;
    Big.RM = toFixedRounding[rounding];
    return new Big(this.numerator.toString()).div(this.denominator.toString()).toFormat(decimalPlaces, format);
  };

  _createClass(Fraction, [{
    key: "quotient",
    get: function get() {
      return JSBI.divide(this.numerator, this.denominator);
    } // remainder after floor division

  }, {
    key: "remainder",
    get: function get() {
      return new Fraction(JSBI.remainder(this.numerator, this.denominator), this.denominator);
    }
  }]);

  return Fraction;
}();

var Big$1 = /*#__PURE__*/toFormat(_Big);
var CurrencyAmount = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(CurrencyAmount, _Fraction);

  // amount _must_ be raw, i.e. in the native representation
  function CurrencyAmount(currency, amount) {
    var _this;

    var parsedAmount = parseBigintIsh(amount);
    validateSolidityTypeInstance(parsedAmount, SolidityType.uint256);
    _this = _Fraction.call(this, parsedAmount, JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals))) || this;
    _this.currency = currency;
    return _this;
  }
  /**
   * Helper that calls the constructor with the ETHER currency
   * @param amount ether amount in wei
   */


  CurrencyAmount.ether = function ether(amount) {
    return new CurrencyAmount(ETHER, amount);
  };

  var _proto = CurrencyAmount.prototype;

  _proto.add = function add(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !currencyEquals(this.currency, other.currency) ?  invariant(false, 'TOKEN')  : void 0;
    return new CurrencyAmount(this.currency, JSBI.subtract(this.raw, other.raw));
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    return _Fraction.prototype.toSignificant.call(this, significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = this.currency.decimals;
    }

    if (rounding === void 0) {
      rounding = exports.Rounding.ROUND_DOWN;
    }

    !(decimalPlaces <= this.currency.decimals) ?  invariant(false, 'DECIMALS')  : void 0;
    return _Fraction.prototype.toFixed.call(this, decimalPlaces, format, rounding);
  };

  _proto.toExact = function toExact(format) {
    if (format === void 0) {
      format = {
        groupSeparator: ''
      };
    }

    Big$1.DP = this.currency.decimals;
    return new Big$1(this.numerator.toString()).div(this.denominator.toString()).toFormat(format);
  };

  _createClass(CurrencyAmount, [{
    key: "raw",
    get: function get() {
      return this.numerator;
    }
  }]);

  return CurrencyAmount;
}(Fraction);

var TokenAmount = /*#__PURE__*/function (_CurrencyAmount) {
  _inheritsLoose(TokenAmount, _CurrencyAmount);

  // amount _must_ be raw, i.e. in the native representation
  function TokenAmount(token, amount) {
    var _this;

    _this = _CurrencyAmount.call(this, token, amount) || this;
    _this.token = token;
    return _this;
  }

  var _proto = TokenAmount.prototype;

  _proto.add = function add(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.add(this.raw, other.raw));
  };

  _proto.subtract = function subtract(other) {
    !this.token.equals(other.token) ?  invariant(false, 'TOKEN')  : void 0;
    return new TokenAmount(this.token, JSBI.subtract(this.raw, other.raw));
  };

  return TokenAmount;
}(CurrencyAmount);

var Price = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Price, _Fraction);

  // denominator and numerator _must_ be raw, i.e. in the native representation
  function Price(baseCurrency, quoteCurrency, denominator, numerator) {
    var _this;

    _this = _Fraction.call(this, numerator, denominator) || this;
    _this.baseCurrency = baseCurrency;
    _this.quoteCurrency = quoteCurrency;
    _this.scalar = new Fraction(JSBI.exponentiate(TEN, JSBI.BigInt(baseCurrency.decimals)), JSBI.exponentiate(TEN, JSBI.BigInt(quoteCurrency.decimals)));
    return _this;
  }

  Price.fromRoute = function fromRoute(route) {
    var prices = [];

    for (var _iterator = _createForOfIteratorHelperLoose(route.pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      prices.push(route.path[i].equals(pair.token0) ? new Price(pair.reserve0.currency, pair.reserve1.currency, pair.reserve0.raw, pair.reserve1.raw) : new Price(pair.reserve1.currency, pair.reserve0.currency, pair.reserve1.raw, pair.reserve0.raw));
    }

    return prices.slice(1).reduce(function (accumulator, currentValue) {
      return accumulator.multiply(currentValue);
    }, prices[0]);
  };

  var _proto = Price.prototype;

  _proto.invert = function invert() {
    return new Price(this.quoteCurrency, this.baseCurrency, this.numerator, this.denominator);
  };

  _proto.multiply = function multiply(other) {
    !currencyEquals(this.quoteCurrency, other.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    var fraction = _Fraction.prototype.multiply.call(this, other);

    return new Price(this.baseCurrency, other.quoteCurrency, fraction.denominator, fraction.numerator);
  } // performs floor division on overflow
  ;

  _proto.quote = function quote(currencyAmount) {
    !currencyEquals(currencyAmount.currency, this.baseCurrency) ?  invariant(false, 'TOKEN')  : void 0;

    if (this.quoteCurrency instanceof Token) {
      return new TokenAmount(this.quoteCurrency, _Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
    }

    return CurrencyAmount.ether(_Fraction.prototype.multiply.call(this, currencyAmount.raw).quotient);
  };

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 6;
    }

    return this.adjusted.toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 4;
    }

    return this.adjusted.toFixed(decimalPlaces, format, rounding);
  };

  _createClass(Price, [{
    key: "raw",
    get: function get() {
      return new Fraction(this.numerator, this.denominator);
    }
  }, {
    key: "adjusted",
    get: function get() {
      return _Fraction.prototype.multiply.call(this, this.scalar);
    }
  }]);

  return Price;
}(Fraction);

var PAIR_ADDRESS_CACHE = {};
var Pair = /*#__PURE__*/function () {
  function Pair(tokenAmountA, tokenAmountB) {
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    this.liquidityToken = new Token(tokenAmounts[0].token.chainId, Pair.getAddress(tokenAmounts[0].token, tokenAmounts[1].token), 18, 'UNI-V2', 'Uniswap V2');
    this.tokenAmounts = tokenAmounts;
  }

  Pair.getAddress = function getAddress(tokenA, tokenB) {
    var _PAIR_ADDRESS_CACHE, _PAIR_ADDRESS_CACHE$t;

    var tokens = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]; // does safety checks

    if (((_PAIR_ADDRESS_CACHE = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE === void 0 ? void 0 : (_PAIR_ADDRESS_CACHE$t = _PAIR_ADDRESS_CACHE[tokens[0].address]) === null || _PAIR_ADDRESS_CACHE$t === void 0 ? void 0 : _PAIR_ADDRESS_CACHE$t[tokens[1].address]) === undefined) {
      var _PAIR_ADDRESS_CACHE2, _extends2, _extends3;

      PAIR_ADDRESS_CACHE = _extends({}, PAIR_ADDRESS_CACHE, (_extends3 = {}, _extends3[tokens[0].address] = _extends({}, (_PAIR_ADDRESS_CACHE2 = PAIR_ADDRESS_CACHE) === null || _PAIR_ADDRESS_CACHE2 === void 0 ? void 0 : _PAIR_ADDRESS_CACHE2[tokens[0].address], (_extends2 = {}, _extends2[tokens[1].address] = address.getCreate2Address(FACTORY_ADDRESS, solidity.keccak256(['bytes'], [solidity.pack(['address', 'address'], [tokens[0].address, tokens[1].address])]), INIT_CODE_HASH), _extends2)), _extends3));
    }

    return PAIR_ADDRESS_CACHE[tokens[0].address][tokens[1].address];
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token to check
   */
  ;

  var _proto = Pair.prototype;

  _proto.involvesToken = function involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pair in terms of token0, i.e. the ratio of reserve1 to reserve0
   */
  ;

  /**
   * Return the price of the given token in terms of the other token in the pair.
   * @param token token to return price of
   */
  _proto.priceOf = function priceOf(token) {
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Returns the chain ID of the tokens in the pair.
   */
  ;

  _proto.reserveOf = function reserveOf(token) {
    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    return token.equals(this.token0) ? this.reserve0 : this.reserve1;
  };

  _proto.getOutputAmount = function getOutputAmount(inputAmount) {
    !this.involvesToken(inputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO)) {
      throw new InsufficientReservesError();
    }

    var inputReserve = this.reserveOf(inputAmount.token);
    var outputReserve = this.reserveOf(inputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var inputAmountWithFee = JSBI.multiply(inputAmount.raw, _997);
    var numerator = JSBI.multiply(inputAmountWithFee, outputReserve.raw);
    var denominator = JSBI.add(JSBI.multiply(inputReserve.raw, _1000), inputAmountWithFee);
    var outputAmount = new TokenAmount(inputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.divide(numerator, denominator));

    if (JSBI.equal(outputAmount.raw, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return [outputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };

  _proto.getInputAmount = function getInputAmount(outputAmount) {
    !this.involvesToken(outputAmount.token) ?  invariant(false, 'TOKEN')  : void 0;

    if (JSBI.equal(this.reserve0.raw, ZERO) || JSBI.equal(this.reserve1.raw, ZERO) || JSBI.greaterThanOrEqual(outputAmount.raw, this.reserveOf(outputAmount.token).raw)) {
      throw new InsufficientReservesError();
    }

    var outputReserve = this.reserveOf(outputAmount.token);
    var inputReserve = this.reserveOf(outputAmount.token.equals(this.token0) ? this.token1 : this.token0);
    var numerator = JSBI.multiply(JSBI.multiply(inputReserve.raw, outputAmount.raw), _1000);
    var denominator = JSBI.multiply(JSBI.subtract(outputReserve.raw, outputAmount.raw), _997);
    var inputAmount = new TokenAmount(outputAmount.token.equals(this.token0) ? this.token1 : this.token0, JSBI.add(JSBI.divide(numerator, denominator), ONE));
    return [inputAmount, new Pair(inputReserve.add(inputAmount), outputReserve.subtract(outputAmount))];
  };

  _proto.getLiquidityMinted = function getLiquidityMinted(totalSupply, tokenAmountA, tokenAmountB) {
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var tokenAmounts = tokenAmountA.token.sortsBefore(tokenAmountB.token) // does safety checks
    ? [tokenAmountA, tokenAmountB] : [tokenAmountB, tokenAmountA];
    !(tokenAmounts[0].token.equals(this.token0) && tokenAmounts[1].token.equals(this.token1)) ?  invariant(false, 'TOKEN')  : void 0;
    var liquidity;

    if (JSBI.equal(totalSupply.raw, ZERO)) {
      liquidity = JSBI.subtract(sqrt(JSBI.multiply(tokenAmounts[0].raw, tokenAmounts[1].raw)), MINIMUM_LIQUIDITY);
    } else {
      var amount0 = JSBI.divide(JSBI.multiply(tokenAmounts[0].raw, totalSupply.raw), this.reserve0.raw);
      var amount1 = JSBI.divide(JSBI.multiply(tokenAmounts[1].raw, totalSupply.raw), this.reserve1.raw);
      liquidity = JSBI.lessThanOrEqual(amount0, amount1) ? amount0 : amount1;
    }

    if (!JSBI.greaterThan(liquidity, ZERO)) {
      throw new InsufficientInputAmountError();
    }

    return new TokenAmount(this.liquidityToken, liquidity);
  };

  _proto.getLiquidityValue = function getLiquidityValue(token, totalSupply, liquidity, feeOn, kLast) {
    if (feeOn === void 0) {
      feeOn = false;
    }

    !this.involvesToken(token) ?  invariant(false, 'TOKEN')  : void 0;
    !totalSupply.token.equals(this.liquidityToken) ?  invariant(false, 'TOTAL_SUPPLY')  : void 0;
    !liquidity.token.equals(this.liquidityToken) ?  invariant(false, 'LIQUIDITY')  : void 0;
    !JSBI.lessThanOrEqual(liquidity.raw, totalSupply.raw) ?  invariant(false, 'LIQUIDITY')  : void 0;
    var totalSupplyAdjusted;

    if (!feeOn) {
      totalSupplyAdjusted = totalSupply;
    } else {
      !!!kLast ?  invariant(false, 'K_LAST')  : void 0;
      var kLastParsed = parseBigintIsh(kLast);

      if (!JSBI.equal(kLastParsed, ZERO)) {
        var rootK = sqrt(JSBI.multiply(this.reserve0.raw, this.reserve1.raw));
        var rootKLast = sqrt(kLastParsed);

        if (JSBI.greaterThan(rootK, rootKLast)) {
          var numerator = JSBI.multiply(totalSupply.raw, JSBI.subtract(rootK, rootKLast));
          var denominator = JSBI.add(JSBI.multiply(rootK, FIVE), rootKLast);
          var feeLiquidity = JSBI.divide(numerator, denominator);
          totalSupplyAdjusted = totalSupply.add(new TokenAmount(this.liquidityToken, feeLiquidity));
        } else {
          totalSupplyAdjusted = totalSupply;
        }
      } else {
        totalSupplyAdjusted = totalSupply;
      }
    }

    return new TokenAmount(token, JSBI.divide(JSBI.multiply(liquidity.raw, this.reserveOf(token).raw), totalSupplyAdjusted.raw));
  };

  _createClass(Pair, [{
    key: "token0Price",
    get: function get() {
      return new Price(this.token0, this.token1, this.tokenAmounts[0].raw, this.tokenAmounts[1].raw);
    }
    /**
     * Returns the current mid price of the pair in terms of token1, i.e. the ratio of reserve0 to reserve1
     */

  }, {
    key: "token1Price",
    get: function get() {
      return new Price(this.token1, this.token0, this.tokenAmounts[1].raw, this.tokenAmounts[0].raw);
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.token0.chainId;
    }
  }, {
    key: "token0",
    get: function get() {
      return this.tokenAmounts[0].token;
    }
  }, {
    key: "token1",
    get: function get() {
      return this.tokenAmounts[1].token;
    }
  }, {
    key: "reserve0",
    get: function get() {
      return this.tokenAmounts[0];
    }
  }, {
    key: "reserve1",
    get: function get() {
      return this.tokenAmounts[1];
    }
  }]);

  return Pair;
}();

var Route = /*#__PURE__*/function () {
  function Route(pairs, input, output) {
    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !pairs.every(function (pair) {
      return pair.chainId === pairs[0].chainId;
    }) ?  invariant(false, 'CHAIN_IDS')  : void 0;
    !(input instanceof Token && pairs[0].involvesToken(input) || input === ETHER && pairs[0].involvesToken(WETH[pairs[0].chainId])) ?  invariant(false, 'INPUT')  : void 0;
    !(typeof output === 'undefined' || output instanceof Token && pairs[pairs.length - 1].involvesToken(output) || output === ETHER && pairs[pairs.length - 1].involvesToken(WETH[pairs[0].chainId])) ?  invariant(false, 'OUTPUT')  : void 0;
    var path = [input instanceof Token ? input : WETH[pairs[0].chainId]];

    for (var _iterator = _createForOfIteratorHelperLoose(pairs.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pair = _step$value[1];
      var currentInput = path[i];
      !(currentInput.equals(pair.token0) || currentInput.equals(pair.token1)) ?  invariant(false, 'PATH')  : void 0;

      var _output = currentInput.equals(pair.token0) ? pair.token1 : pair.token0;

      path.push(_output);
    }

    this.pairs = pairs;
    this.path = path;
    this.midPrice = Price.fromRoute(this);
    this.input = input;
    this.output = output !== null && output !== void 0 ? output : path[path.length - 1];
  }

  _createClass(Route, [{
    key: "chainId",
    get: function get() {
      return this.pairs[0].chainId;
    }
  }]);

  return Route;
}();

var _100_PERCENT = /*#__PURE__*/new Fraction(_100);

var Percent = /*#__PURE__*/function (_Fraction) {
  _inheritsLoose(Percent, _Fraction);

  function Percent() {
    return _Fraction.apply(this, arguments) || this;
  }

  var _proto = Percent.prototype;

  _proto.toSignificant = function toSignificant(significantDigits, format, rounding) {
    if (significantDigits === void 0) {
      significantDigits = 5;
    }

    return this.multiply(_100_PERCENT).toSignificant(significantDigits, format, rounding);
  };

  _proto.toFixed = function toFixed(decimalPlaces, format, rounding) {
    if (decimalPlaces === void 0) {
      decimalPlaces = 2;
    }

    return this.multiply(_100_PERCENT).toFixed(decimalPlaces, format, rounding);
  };

  return Percent;
}(Fraction);

/**
 * Returns the percent difference between the mid price and the execution price, i.e. price impact.
 * @param midPrice mid price before the trade
 * @param inputAmount the input amount of the trade
 * @param outputAmount the output amount of the trade
 */

function computePriceImpact(midPrice, inputAmount, outputAmount) {
  var exactQuote = midPrice.raw.multiply(inputAmount.raw); // calculate slippage := (exactQuote - outputAmount) / exactQuote

  var slippage = exactQuote.subtract(outputAmount.raw).divide(exactQuote);
  return new Percent(slippage.numerator, slippage.denominator);
} // comparator function that allows sorting trades by their output amounts, in decreasing order, and then input amounts
// in increasing order. i.e. the best trades have the most outputs for the least inputs and are sorted first


function inputOutputComparator(a, b) {
  // must have same input and output token for comparison
  !currencyEquals(a.inputAmount.currency, b.inputAmount.currency) ?  invariant(false, 'INPUT_CURRENCY')  : void 0;
  !currencyEquals(a.outputAmount.currency, b.outputAmount.currency) ?  invariant(false, 'OUTPUT_CURRENCY')  : void 0;

  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      return 0;
    } // trade A requires less input than trade B, so A should come first


    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
} // extension of the input output comparator that also considers other dimensions of the trade in ranking them

function tradeComparator(a, b) {
  var ioComp = inputOutputComparator(a, b);

  if (ioComp !== 0) {
    return ioComp;
  } // consider lowest slippage next, since these are less likely to fail


  if (a.priceImpact.lessThan(b.priceImpact)) {
    return -1;
  } else if (a.priceImpact.greaterThan(b.priceImpact)) {
    return 1;
  } // finally consider the number of hops since each hop costs gas


  return a.route.path.length - b.route.path.length;
}
/**
 * Given a currency amount and a chain ID, returns the equivalent representation as the token amount.
 * In other words, if the currency is ETHER, returns the WETH token amount for the given chain. Otherwise, returns
 * the input currency amount.
 */

function wrappedAmount(currencyAmount, chainId) {
  if (currencyAmount instanceof TokenAmount) return currencyAmount;
  if (currencyAmount.currency === ETHER) return new TokenAmount(WETH[chainId], currencyAmount.raw);
    invariant(false, 'CURRENCY')  ;
}

function wrappedCurrency(currency, chainId) {
  if (currency instanceof Token) return currency;
  if (currency === ETHER) return WETH[chainId];
    invariant(false, 'CURRENCY')  ;
}
/**
 * Represents a trade executed against a list of pairs.
 * Does not account for slippage, i.e. trades that front run this trade and move the price.
 */


var Trade = /*#__PURE__*/function () {
  function Trade(route, amount, tradeType) {
    var amounts = new Array(route.path.length);
    var nextPairs = new Array(route.pairs.length);

    if (tradeType === exports.TradeType.EXACT_INPUT) {
      !currencyEquals(amount.currency, route.input) ?  invariant(false, 'INPUT')  : void 0;
      amounts[0] = wrappedAmount(amount, route.chainId);

      for (var i = 0; i < route.path.length - 1; i++) {
        var pair = route.pairs[i];

        var _pair$getOutputAmount = pair.getOutputAmount(amounts[i]),
            outputAmount = _pair$getOutputAmount[0],
            nextPair = _pair$getOutputAmount[1];

        amounts[i + 1] = outputAmount;
        nextPairs[i] = nextPair;
      }
    } else {
      !currencyEquals(amount.currency, route.output) ?  invariant(false, 'OUTPUT')  : void 0;
      amounts[amounts.length - 1] = wrappedAmount(amount, route.chainId);

      for (var _i = route.path.length - 1; _i > 0; _i--) {
        var _pair = route.pairs[_i - 1];

        var _pair$getInputAmount = _pair.getInputAmount(amounts[_i]),
            inputAmount = _pair$getInputAmount[0],
            _nextPair = _pair$getInputAmount[1];

        amounts[_i - 1] = inputAmount;
        nextPairs[_i - 1] = _nextPair;
      }
    }

    this.route = route;
    this.tradeType = tradeType;
    this.inputAmount = tradeType === exports.TradeType.EXACT_INPUT ? amount : route.input === ETHER ? CurrencyAmount.ether(amounts[0].raw) : amounts[0];
    this.outputAmount = tradeType === exports.TradeType.EXACT_OUTPUT ? amount : route.output === ETHER ? CurrencyAmount.ether(amounts[amounts.length - 1].raw) : amounts[amounts.length - 1];
    this.executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.raw, this.outputAmount.raw);
    this.nextMidPrice = Price.fromRoute(new Route(nextPairs, route.input));
    this.priceImpact = computePriceImpact(route.midPrice, this.inputAmount, this.outputAmount);
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */


  Trade.exactIn = function exactIn(route, amountIn) {
    return new Trade(route, amountIn, exports.TradeType.EXACT_INPUT);
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @param route route of the exact out trade
   * @param amountOut the amount returned by the trade
   */
  ;

  Trade.exactOut = function exactOut(route, amountOut) {
    return new Trade(route, amountOut, exports.TradeType.EXACT_OUTPUT);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  var _proto = Trade.prototype;

  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_OUTPUT) {
      return this.outputAmount;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(this.outputAmount.raw).quotient;
      return this.outputAmount instanceof TokenAmount ? new TokenAmount(this.outputAmount.token, slippageAdjustedAmountOut) : CurrencyAmount.ether(slippageAdjustedAmountOut);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the execution price of this trade
   */
  ;

  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance) {
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;

    if (this.tradeType === exports.TradeType.EXACT_INPUT) {
      return this.inputAmount;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(this.inputAmount.raw).quotient;
      return this.inputAmount instanceof TokenAmount ? new TokenAmount(this.inputAmount.token, slippageAdjustedAmountIn) : CurrencyAmount.ether(slippageAdjustedAmountIn);
    }
  }
  /**
   * Given a list of pairs, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactIn = function bestTradeExactIn(pairs, currencyAmountIn, currencyOut, _temp, // used in recursion.
  currentPairs, originalAmountIn, bestTrades) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$maxNumResults = _ref.maxNumResults,
        maxNumResults = _ref$maxNumResults === void 0 ? 3 : _ref$maxNumResults,
        _ref$maxHops = _ref.maxHops,
        maxHops = _ref$maxHops === void 0 ? 3 : _ref$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountIn === void 0) {
      originalAmountIn = currencyAmountIn;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountIn === currencyAmountIn || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountIn instanceof TokenAmount ? currencyAmountIn.token.chainId : currencyOut instanceof Token ? currencyOut.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountIn = wrappedAmount(currencyAmountIn, chainId);
    var tokenOut = wrappedCurrency(currencyOut, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountIn.token) && !pair.token1.equals(amountIn.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountOut = void 0;

      try {
        ;

        var _pair$getOutputAmount2 = pair.getOutputAmount(amountIn);

        amountOut = _pair$getOutputAmount2[0];
      } catch (error) {
        // input too low
        if (error.isInsufficientInputAmountError) {
          continue;
        }

        throw error;
      } // we have arrived at the output token, so this is the final trade of one of the paths


      if (amountOut.token.equals(tokenOut)) {
        sortedInsert(bestTrades, new Trade(new Route([].concat(currentPairs, [pair]), originalAmountIn.currency, currencyOut), originalAmountIn, exports.TradeType.EXACT_INPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops

        Trade.bestTradeExactIn(pairsExcludingThisPair, amountOut, currencyOut, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [].concat(currentPairs, [pair]), originalAmountIn, bestTrades);
      }
    }

    return bestTrades;
  }
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pairs, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pairs the pairs to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pair
   * @param currentPairs used in recursion; the current list of pairs
   * @param originalAmountOut used in recursion; the original value of the currencyAmountOut parameter
   * @param bestTrades used in recursion; the current list of best trades
   */
  ;

  Trade.bestTradeExactOut = function bestTradeExactOut(pairs, currencyIn, currencyAmountOut, _temp2, // used in recursion.
  currentPairs, originalAmountOut, bestTrades) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$maxNumResults = _ref2.maxNumResults,
        maxNumResults = _ref2$maxNumResults === void 0 ? 3 : _ref2$maxNumResults,
        _ref2$maxHops = _ref2.maxHops,
        maxHops = _ref2$maxHops === void 0 ? 3 : _ref2$maxHops;

    if (currentPairs === void 0) {
      currentPairs = [];
    }

    if (originalAmountOut === void 0) {
      originalAmountOut = currencyAmountOut;
    }

    if (bestTrades === void 0) {
      bestTrades = [];
    }

    !(pairs.length > 0) ?  invariant(false, 'PAIRS')  : void 0;
    !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
    !(originalAmountOut === currencyAmountOut || currentPairs.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
    var chainId = currencyAmountOut instanceof TokenAmount ? currencyAmountOut.token.chainId : currencyIn instanceof Token ? currencyIn.chainId : undefined;
    !(chainId !== undefined) ?  invariant(false, 'CHAIN_ID')  : void 0;
    var amountOut = wrappedAmount(currencyAmountOut, chainId);
    var tokenIn = wrappedCurrency(currencyIn, chainId);

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i]; // pair irrelevant

      if (!pair.token0.equals(amountOut.token) && !pair.token1.equals(amountOut.token)) continue;
      if (pair.reserve0.equalTo(ZERO) || pair.reserve1.equalTo(ZERO)) continue;
      var amountIn = void 0;

      try {
        ;

        var _pair$getInputAmount2 = pair.getInputAmount(amountOut);

        amountIn = _pair$getInputAmount2[0];
      } catch (error) {
        // not enough liquidity in this pair
        if (error.isInsufficientReservesError) {
          continue;
        }

        throw error;
      } // we have arrived at the input token, so this is the first trade of one of the paths


      if (amountIn.token.equals(tokenIn)) {
        sortedInsert(bestTrades, new Trade(new Route([pair].concat(currentPairs), currencyIn, originalAmountOut.currency), originalAmountOut, exports.TradeType.EXACT_OUTPUT), maxNumResults, tradeComparator);
      } else if (maxHops > 1 && pairs.length > 1) {
        var pairsExcludingThisPair = pairs.slice(0, i).concat(pairs.slice(i + 1, pairs.length)); // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops

        Trade.bestTradeExactOut(pairsExcludingThisPair, currencyIn, amountIn, {
          maxNumResults: maxNumResults,
          maxHops: maxHops - 1
        }, [pair].concat(currentPairs), originalAmountOut, bestTrades);
      }
    }

    return bestTrades;
  };

  return Trade;
}();

function toHex(currencyAmount) {
  return "0x" + currencyAmount.raw.toString(16);
}

var ZERO_HEX = '0x0';
/**
 * Represents the Uniswap V2 Router, and has static methods for helping execute trades.
 */

var Router = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Router() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */


  Router.swapCallParameters = function swapCallParameters(trade, options) {
    var etherIn = trade.inputAmount.currency === ETHER;
    var etherOut = trade.outputAmount.currency === ETHER; // the router does not support both ether in and out

    !!(etherIn && etherOut) ?  invariant(false, 'ETHER_IN_OUT')  : void 0;
    !(options.ttl > 0) ?  invariant(false, 'TTL')  : void 0;
    var to = validateAndParseAddress(options.recipient);
    var amountIn = toHex(trade.maximumAmountIn(options.allowedSlippage));
    var amountOut = toHex(trade.minimumAmountOut(options.allowedSlippage));
    var path = trade.route.path.map(function (token) {
      return token.address;
    });
    var deadline = "0x" + (Math.floor(new Date().getTime() / 1000) + options.ttl).toString(16);
    var useFeeOnTransfer = Boolean(options.feeOnTransfer);
    var methodName;
    var args;
    var value;

    switch (trade.tradeType) {
      case exports.TradeType.EXACT_INPUT:
        if (etherIn) {
          methodName = useFeeOnTransfer ? 'swapExactBNBForTokensSupportingFeeOnTransferTokens' : 'swapExactBNBForTokens'; // (uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = useFeeOnTransfer ? 'swapExactTokensForBNBSupportingFeeOnTransferTokens' : 'swapExactTokensForBNB'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = useFeeOnTransfer ? 'swapExactTokensForTokensSupportingFeeOnTransferTokens' : 'swapExactTokensForTokens'; // (uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)

          args = [amountIn, amountOut, path, to, deadline];
          value = ZERO_HEX;
        }

        break;

      case exports.TradeType.EXACT_OUTPUT:
        !!useFeeOnTransfer ?  invariant(false, 'EXACT_OUT_FOT')  : void 0;

        if (etherIn) {
          methodName = 'swapBNBForExactTokens'; // (uint amountOut, address[] calldata path, address to, uint deadline)

          args = [amountOut, path, to, deadline];
          value = amountIn;
        } else if (etherOut) {
          methodName = 'swapTokensForExactBNB'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        } else {
          methodName = 'swapTokensForExactTokens'; // (uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)

          args = [amountOut, amountIn, path, to, deadline];
          value = ZERO_HEX;
        }

        break;
    }

    return {
      methodName: methodName,
      args: args,
      value: value
    };
  };

  return Router;
}();

var abi = [
	{
		inputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "_reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "_reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "_blockTimestampLast",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "_token0",
				type: "address"
			},
			{
				internalType: "address",
				name: "_token1",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "swap",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
];
var evm = {
	bytecode: {
		linkReferences: {
		},
		object: "60806040526001600c5534801561001557600080fd5b506040514690806052612c9f8239604080519182900360520182208282018252600a83526942616b657279204c507360b01b6020938401528151808301835260018152603160f81b908401528151808401919091527f5ed039ad5f03c2661cf61a8d716c2a77f59bd0432e1ff6204eaae6153df7eacc818301527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606082015260808101949094523060a0808601919091528151808603909101815260c09094019052825192019190912060035550600580546001600160a01b03191633179055612b9a806101056000396000f3fe608060405234801561001057600080fd5b50600436106101b95760003560e01c80636d9a640a116100f9578063ba9a7a5611610097578063d21220a711610071578063d21220a714610580578063d505accf14610588578063dd62ed3e146105e6578063fff6cae914610621576101b9565b8063ba9a7a561461053d578063bc25cf7714610545578063c45a015514610578576101b9565b80637ecebe00116100d35780637ecebe001461047d57806389afcb44146104b057806395d89b41146104fc578063a9059cbb14610504576101b9565b80636d9a640a1461040357806370a08231146104425780637464fc3d14610475576101b9565b806330adf81f11610166578063485cc95511610140578063485cc955146103835780635909c0d5146103c05780635a3d5493146103c85780636a627842146103d0576101b9565b806330adf81f14610355578063313ce5671461035d5780633644e5151461037b576101b9565b80630dfe1681116101975780630dfe1681146102c757806318160ddd146102f857806323b872dd14610312576101b9565b806306fdde03146101be5780630902f1ac1461023b578063095ea7b31461027a575b600080fd5b6101c6610629565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102005781810151838201526020016101e8565b50505050905090810190601f16801561022d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610243610662565b604080516dffffffffffffffffffffffffffff948516815292909316602083015263ffffffff168183015290519081900360600190f35b6102b36004803603604081101561029057600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356106b7565b604080519115158252519081900360200190f35b6102cf6106ce565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6103006106ea565b60408051918252519081900360200190f35b6102b36004803603606081101561032857600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602081013590911690604001356106f0565b6103006107cf565b6103656107f3565b6040805160ff9092168252519081900360200190f35b6103006107f8565b6103be6004803603604081101561039957600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160200135166107fe565b005b6103006108d7565b6103006108dd565b610300600480360360208110156103e657600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166108e3565b6103be6004803603606081101561041957600080fd5b508035906020810135906040013573ffffffffffffffffffffffffffffffffffffffff16610ca9565b6103006004803603602081101561045857600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661128d565b61030061129f565b6103006004803603602081101561049357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166112a5565b6104e3600480360360208110156104c657600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166112b7565b6040805192835260208301919091528051918290030190f35b6101c6611754565b6102b36004803603604081101561051a57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813516906020013561178d565b61030061179a565b6103be6004803603602081101561055b57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166117a0565b6102cf611996565b6102cf6119b2565b6103be600480360360e081101561059e57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c001356119ce565b610300600480360360408110156105fc57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020013516611c84565b6103be611ca1565b6040518060400160405280600a81526020017f42616b657279204c50730000000000000000000000000000000000000000000081525081565b6008546dffffffffffffffffffffffffffff808216926e0100000000000000000000000000008304909116917c0100000000000000000000000000000000000000000000000000000000900463ffffffff1690565b60006106c4338484611e87565b5060015b92915050565b60065473ffffffffffffffffffffffffffffffffffffffff1681565b60005481565b73ffffffffffffffffffffffffffffffffffffffff831660009081526002602090815260408083203384529091528120547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff146107ba5773ffffffffffffffffffffffffffffffffffffffff84166000908152600260209081526040808320338452909152902054610788908363ffffffff611ef616565b73ffffffffffffffffffffffffffffffffffffffff851660009081526002602090815260408083203384529091529020555b6107c5848484611f3f565b5060019392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601281565b60035481565b60055473ffffffffffffffffffffffffffffffffffffffff16331461088457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f42616b65727953776170506169723a20464f5242494444454e00000000000000604482015290519081900360640190fd5b6006805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff00000000000000000000000000000000000000009182161790915560078054929093169116179055565b60095481565b600a5481565b6000600c5460011461095657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c81905580610966610662565b50600654604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905193955091935060009273ffffffffffffffffffffffffffffffffffffffff909116916370a08231916024808301926020929190829003018186803b1580156109e057600080fd5b505afa1580156109f4573d6000803e3d6000fd5b505050506040513d6020811015610a0a57600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905192935060009273ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b158015610a8357600080fd5b505afa158015610a97573d6000803e3d6000fd5b505050506040513d6020811015610aad57600080fd5b505190506000610ad3836dffffffffffffffffffffffffffff871663ffffffff611ef616565b90506000610af7836dffffffffffffffffffffffffffff871663ffffffff611ef616565b90506000610b058787612020565b60005490915080610b4e57610b3a6103e8610b2e610b29878763ffffffff6121ac16565b61221f565b9063ffffffff611ef616565b9850610b4960006103e8612271565b610bab565b610ba86dffffffffffffffffffffffffffff8916610b72868463ffffffff6121ac16565b81610b7957fe5b046dffffffffffffffffffffffffffff8916610b9b868563ffffffff6121ac16565b81610ba257fe5b04612321565b98505b60008911610c04576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602d815260200180612a50602d913960400191505060405180910390fd5b610c0e8a8a612271565b610c1a86868a8a612337565b8115610c5c57600854610c58906dffffffffffffffffffffffffffff808216916e01000000000000000000000000000090041663ffffffff6121ac16565b600b555b6040805185815260208101859052815133927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a250506001600c5550949695505050505050565b600c54600114610d1a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c5582151580610d2d5750600082115b610d82576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180612a7d602a913960400191505060405180910390fd5b600080610d8d610662565b5091509150816dffffffffffffffffffffffffffff1685108015610dc05750806dffffffffffffffffffffffffffff1684105b610e15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180612af26026913960400191505060405180910390fd5b600654600754600091829173ffffffffffffffffffffffffffffffffffffffff918216919081169087168214801590610e7a57508073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614155b610ee557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f42616b65727953776170506169723a20494e56414c49445f544f000000000000604482015290519081900360640190fd5b8815610ef657610ef682888b6125f3565b8715610f0757610f0781888a6125f3565b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8416916370a08231916024808301926020929190829003018186803b158015610f7357600080fd5b505afa158015610f87573d6000803e3d6000fd5b505050506040513d6020811015610f9d57600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191955073ffffffffffffffffffffffffffffffffffffffff8316916370a0823191602480820192602092909190829003018186803b15801561100f57600080fd5b505afa158015611023573d6000803e3d6000fd5b505050506040513d602081101561103957600080fd5b5051925060009150506dffffffffffffffffffffffffffff85168890038311611063576000611079565b87856dffffffffffffffffffffffffffff160383035b9050600087856dffffffffffffffffffffffffffff1603831161109d5760006110b3565b87856dffffffffffffffffffffffffffff160383035b905060008211806110c45750600081115b611119576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180612aa76029913960400191505060405180910390fd5b600061114161112f84600363ffffffff6121ac16565b610b2e876103e863ffffffff6121ac16565b9050600061115961112f84600363ffffffff6121ac16565b9050611191620f42406111856dffffffffffffffffffffffffffff8b8116908b1663ffffffff6121ac16565b9063ffffffff6121ac16565b6111a1838363ffffffff6121ac16565b101561120e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f42616b65727953776170506169723a204b000000000000000000000000000000604482015290519081900360640190fd5b505061121c84848888612337565b60408051838152602081018390528082018b9052606081018a9052905173ffffffffffffffffffffffffffffffffffffffff89169133917fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d8229181900360800190a350506001600c5550505050505050565b60016020526000908152604090205481565b600b5481565b60046020526000908152604090205481565b600080600c5460011461132b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c8190558061133b610662565b50600654600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905194965092945073ffffffffffffffffffffffffffffffffffffffff9182169391169160009184916370a08231916024808301926020929190829003018186803b1580156113bd57600080fd5b505afa1580156113d1573d6000803e3d6000fd5b505050506040513d60208110156113e757600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191925060009173ffffffffffffffffffffffffffffffffffffffff8516916370a08231916024808301926020929190829003018186803b15801561145b57600080fd5b505afa15801561146f573d6000803e3d6000fd5b505050506040513d602081101561148557600080fd5b5051306000908152600160205260408120549192506114a48888612020565b600054909150806114bb848763ffffffff6121ac16565b816114c257fe5b049a50806114d6848663ffffffff6121ac16565b816114dd57fe5b04995060008b1180156114f0575060008a115b611545576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602d815260200180612b39602d913960400191505060405180910390fd5b61154f3084612800565b61155a878d8d6125f3565b611565868d8c6125f3565b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8916916370a08231916024808301926020929190829003018186803b1580156115d157600080fd5b505afa1580156115e5573d6000803e3d6000fd5b505050506040513d60208110156115fb57600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191965073ffffffffffffffffffffffffffffffffffffffff8816916370a0823191602480820192602092909190829003018186803b15801561166d57600080fd5b505afa158015611681573d6000803e3d6000fd5b505050506040513d602081101561169757600080fd5b505193506116a785858b8b612337565b81156116e9576008546116e5906dffffffffffffffffffffffffffff808216916e01000000000000000000000000000090041663ffffffff6121ac16565b600b555b604080518c8152602081018c9052815173ffffffffffffffffffffffffffffffffffffffff8f169233927fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496929081900390910190a35050505050505050506001600c81905550915091565b6040518060400160405280600381526020017f424c50000000000000000000000000000000000000000000000000000000000081525081565b60006106c4338484611f3f565b6103e881565b600c5460011461181157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c55600654600754600854604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff94851694909316926118ed92859287926118e8926dffffffffffffffffffffffffffff169185916370a0823191602480820192602092909190829003018186803b1580156118b057600080fd5b505afa1580156118c4573d6000803e3d6000fd5b505050506040513d60208110156118da57600080fd5b50519063ffffffff611ef616565b6125f3565b600854604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905161198c92849287926118e8926e01000000000000000000000000000090046dffffffffffffffffffffffffffff169173ffffffffffffffffffffffffffffffffffffffff8616916370a0823191602480820192602092909190829003018186803b1580156118b057600080fd5b50506001600c5550565b60055473ffffffffffffffffffffffffffffffffffffffff1681565b60075473ffffffffffffffffffffffffffffffffffffffff1681565b42841015611a3d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f42616b6572795377617042455032303a20455850495245440000000000000000604482015290519081900360640190fd5b60035473ffffffffffffffffffffffffffffffffffffffff80891660008181526004602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958d166060860152608085018c905260a085019590955260c08085018b90528151808603909101815260e0850182528051908301207f19010000000000000000000000000000000000000000000000000000000000006101008601526101028501969096526101228085019690965280518085039096018652610142840180825286519683019690962095839052610162840180825286905260ff89166101828501526101a284018890526101c28401879052519193926101e2808201937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081019281900390910190855afa158015611b9e573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff811615801590611c1957508873ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b611c6e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180612ad06022913960400191505060405180910390fd5b611c79898989611e87565b505050505050505050565b600260209081526000928352604080842090915290825290205481565b600c54600114611d1257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c55600654604080517f70a082310000000000000000000000000000000000000000000000000000000081523060048201529051611e809273ffffffffffffffffffffffffffffffffffffffff16916370a08231916024808301926020929190829003018186803b158015611d8957600080fd5b505afa158015611d9d573d6000803e3d6000fd5b505050506040513d6020811015611db357600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b158015611e2657600080fd5b505afa158015611e3a573d6000803e3d6000fd5b505050506040513d6020811015611e5057600080fd5b50516008546dffffffffffffffffffffffffffff808216916e010000000000000000000000000000900416612337565b6001600c55565b73ffffffffffffffffffffffffffffffffffffffff808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6000611f3883836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506128c5565b9392505050565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260016020526040902054611f75908263ffffffff611ef616565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152600160205260408082209390935590841681522054611fb7908263ffffffff61297616565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b15801561208b57600080fd5b505afa15801561209f573d6000803e3d6000fd5b505050506040513d60208110156120b557600080fd5b5051600b5473ffffffffffffffffffffffffffffffffffffffff821615801594509192509061219857801561219357600061210c610b296dffffffffffffffffffffffffffff88811690881663ffffffff6121ac16565b905060006121198361221f565b905080821115612190576000612147612138848463ffffffff611ef616565b6000549063ffffffff6121ac16565b9050600061216c8361216086600563ffffffff6121ac16565b9063ffffffff61297616565b9050600081838161217957fe5b049050801561218c5761218c8782612271565b5050505b50505b6121a4565b80156121a4576000600b555b505092915050565b6000826121bb575060006106c8565b828202828482816121c857fe5b0414611f38576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180612b186021913960400191505060405180910390fd5b60006003821115612262575080600160028204015b8181101561225c5780915060028182858161224b57fe5b04018161225457fe5b049050612234565b5061226c565b811561226c575060015b919050565b600054612284908263ffffffff61297616565b600090815573ffffffffffffffffffffffffffffffffffffffff83168152600160205260409020546122bc908263ffffffff61297616565b73ffffffffffffffffffffffffffffffffffffffff831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b60008183106123305781611f38565b5090919050565b6dffffffffffffffffffffffffffff841180159061236357506dffffffffffffffffffffffffffff8311155b6123ce57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f42616b65727953776170506169723a204f564552464c4f570000000000000000604482015290519081900360640190fd5b60085463ffffffff428116917c01000000000000000000000000000000000000000000000000000000009004811682039081161580159061241e57506dffffffffffffffffffffffffffff841615155b801561243957506dffffffffffffffffffffffffffff831615155b156124e9578063ffffffff1661247c85612452866129ea565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169063ffffffff612a0e16565b600980547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff929092169290920201905563ffffffff81166124bc84612452876129ea565b600a80547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff92909216929092020190555b600880547fffffffffffffffffffffffffffffffffffff0000000000000000000000000000166dffffffffffffffffffffffffffff888116919091177fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff166e0100000000000000000000000000008883168102919091177bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167c010000000000000000000000000000000000000000000000000000000063ffffffff871602179283905560408051848416815291909304909116602082015281517f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1929181900390910190a1505050505050565b604080518082018252601981527f7472616e7366657228616464726573732c75696e743235362900000000000000602091820152815173ffffffffffffffffffffffffffffffffffffffff85811660248301526044808301869052845180840390910181526064909201845291810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001781529251815160009460609489169392918291908083835b602083106126f957805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe090920191602091820191016126bc565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d806000811461275b576040519150601f19603f3d011682016040523d82523d6000602084013e612760565b606091505b509150915081801561278e57508051158061278e575080806020019051602081101561278b57600080fd5b50515b6127f957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f42616b65727953776170506169723a205452414e534645525f4641494c454400604482015290519081900360640190fd5b5050505050565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902054612836908263ffffffff611ef616565b73ffffffffffffffffffffffffffffffffffffffff831660009081526001602052604081209190915554612870908263ffffffff611ef616565b600090815560408051838152905173ffffffffffffffffffffffffffffffffffffffff8516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef919081900360200190a35050565b6000818484111561296e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561293357818101518382015260200161291b565b50505050905090810190601f1680156129605780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015611f3857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6dffffffffffffffffffffffffffff166e0100000000000000000000000000000290565b60006dffffffffffffffffffffffffffff82167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff841681612a4757fe5b04939250505056fe42616b65727953776170506169723a20494e53554646494349454e545f4c49515549444954595f4d494e54454442616b65727953776170506169723a20494e53554646494349454e545f4f55545055545f414d4f554e5442616b65727953776170506169723a20494e53554646494349454e545f494e5055545f414d4f554e5442616b6572795377617042455032303a20494e56414c49445f5349474e415455524542616b65727953776170506169723a20494e53554646494349454e545f4c4951554944495459536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f7742616b65727953776170506169723a20494e53554646494349454e545f4c49515549444954595f4255524e4544a265627a7a72315820a6507fdfb8085d6a2c98676353425072170469f2ad9d8b6ffcabacd193ce769864736f6c63430005100032454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c75696e7432353620636861696e49642c6164647265737320766572696679696e67436f6e747261637429",
		opcodes: "PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x1 PUSH1 0xC SSTORE CALLVALUE DUP1 ISZERO PUSH2 0x15 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD CHAINID SWAP1 DUP1 PUSH1 0x52 PUSH2 0x2C9F DUP3 CODECOPY PUSH1 0x40 DUP1 MLOAD SWAP2 DUP3 SWAP1 SUB PUSH1 0x52 ADD DUP3 KECCAK256 DUP3 DUP3 ADD DUP3 MSTORE PUSH1 0xA DUP4 MSTORE PUSH10 0x42616B657279204C5073 PUSH1 0xB0 SHL PUSH1 0x20 SWAP4 DUP5 ADD MSTORE DUP2 MLOAD DUP1 DUP4 ADD DUP4 MSTORE PUSH1 0x1 DUP2 MSTORE PUSH1 0x31 PUSH1 0xF8 SHL SWAP1 DUP5 ADD MSTORE DUP2 MLOAD DUP1 DUP5 ADD SWAP2 SWAP1 SWAP2 MSTORE PUSH32 0x5ED039AD5F03C2661CF61A8D716C2A77F59BD0432E1FF6204EAAE6153DF7EACC DUP2 DUP4 ADD MSTORE PUSH32 0xC89EFDAA54C0F20C7ADF612882DF0950F5A951637E0307CDCB4C672F298B8BC6 PUSH1 0x60 DUP3 ADD MSTORE PUSH1 0x80 DUP2 ADD SWAP5 SWAP1 SWAP5 MSTORE ADDRESS PUSH1 0xA0 DUP1 DUP7 ADD SWAP2 SWAP1 SWAP2 MSTORE DUP2 MLOAD DUP1 DUP7 SUB SWAP1 SWAP2 ADD DUP2 MSTORE PUSH1 0xC0 SWAP1 SWAP5 ADD SWAP1 MSTORE DUP3 MLOAD SWAP3 ADD SWAP2 SWAP1 SWAP2 KECCAK256 PUSH1 0x3 SSTORE POP PUSH1 0x5 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND CALLER OR SWAP1 SSTORE PUSH2 0x2B9A DUP1 PUSH2 0x105 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x1B9 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x6D9A640A GT PUSH2 0xF9 JUMPI DUP1 PUSH4 0xBA9A7A56 GT PUSH2 0x97 JUMPI DUP1 PUSH4 0xD21220A7 GT PUSH2 0x71 JUMPI DUP1 PUSH4 0xD21220A7 EQ PUSH2 0x580 JUMPI DUP1 PUSH4 0xD505ACCF EQ PUSH2 0x588 JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x5E6 JUMPI DUP1 PUSH4 0xFFF6CAE9 EQ PUSH2 0x621 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0xBA9A7A56 EQ PUSH2 0x53D JUMPI DUP1 PUSH4 0xBC25CF77 EQ PUSH2 0x545 JUMPI DUP1 PUSH4 0xC45A0155 EQ PUSH2 0x578 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0x7ECEBE00 GT PUSH2 0xD3 JUMPI DUP1 PUSH4 0x7ECEBE00 EQ PUSH2 0x47D JUMPI DUP1 PUSH4 0x89AFCB44 EQ PUSH2 0x4B0 JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x4FC JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x504 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0x6D9A640A EQ PUSH2 0x403 JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0x442 JUMPI DUP1 PUSH4 0x7464FC3D EQ PUSH2 0x475 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0x30ADF81F GT PUSH2 0x166 JUMPI DUP1 PUSH4 0x485CC955 GT PUSH2 0x140 JUMPI DUP1 PUSH4 0x485CC955 EQ PUSH2 0x383 JUMPI DUP1 PUSH4 0x5909C0D5 EQ PUSH2 0x3C0 JUMPI DUP1 PUSH4 0x5A3D5493 EQ PUSH2 0x3C8 JUMPI DUP1 PUSH4 0x6A627842 EQ PUSH2 0x3D0 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0x30ADF81F EQ PUSH2 0x355 JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0x35D JUMPI DUP1 PUSH4 0x3644E515 EQ PUSH2 0x37B JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0xDFE1681 GT PUSH2 0x197 JUMPI DUP1 PUSH4 0xDFE1681 EQ PUSH2 0x2C7 JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0x2F8 JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x312 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0x1BE JUMPI DUP1 PUSH4 0x902F1AC EQ PUSH2 0x23B JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x27A JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x1C6 PUSH2 0x629 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH1 0x20 DUP1 DUP3 MSTORE DUP4 MLOAD DUP2 DUP4 ADD MSTORE DUP4 MLOAD SWAP2 SWAP3 DUP4 SWAP3 SWAP1 DUP4 ADD SWAP2 DUP6 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x200 JUMPI DUP2 DUP2 ADD MLOAD DUP4 DUP3 ADD MSTORE PUSH1 0x20 ADD PUSH2 0x1E8 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x22D JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x243 PUSH2 0x662 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP5 DUP6 AND DUP2 MSTORE SWAP3 SWAP1 SWAP4 AND PUSH1 0x20 DUP4 ADD MSTORE PUSH4 0xFFFFFFFF AND DUP2 DUP4 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x60 ADD SWAP1 RETURN JUMPDEST PUSH2 0x2B3 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x290 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD AND SWAP1 PUSH1 0x20 ADD CALLDATALOAD PUSH2 0x6B7 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP2 ISZERO ISZERO DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST PUSH2 0x2CF PUSH2 0x6CE JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP1 SWAP3 AND DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST PUSH2 0x300 PUSH2 0x6EA JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP2 DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST PUSH2 0x2B3 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x60 DUP2 LT ISZERO PUSH2 0x328 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD DUP2 AND SWAP2 PUSH1 0x20 DUP2 ADD CALLDATALOAD SWAP1 SWAP2 AND SWAP1 PUSH1 0x40 ADD CALLDATALOAD PUSH2 0x6F0 JUMP JUMPDEST PUSH2 0x300 PUSH2 0x7CF JUMP JUMPDEST PUSH2 0x365 PUSH2 0x7F3 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH1 0xFF SWAP1 SWAP3 AND DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST PUSH2 0x300 PUSH2 0x7F8 JUMP JUMPDEST PUSH2 0x3BE PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x399 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD DUP2 AND SWAP2 PUSH1 0x20 ADD CALLDATALOAD AND PUSH2 0x7FE JUMP JUMPDEST STOP JUMPDEST PUSH2 0x300 PUSH2 0x8D7 JUMP JUMPDEST PUSH2 0x300 PUSH2 0x8DD JUMP JUMPDEST PUSH2 0x300 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x3E6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x8E3 JUMP JUMPDEST PUSH2 0x3BE PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x60 DUP2 LT ISZERO PUSH2 0x419 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 DUP2 ADD CALLDATALOAD SWAP1 PUSH1 0x40 ADD CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0xCA9 JUMP JUMPDEST PUSH2 0x300 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x458 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x128D JUMP JUMPDEST PUSH2 0x300 PUSH2 0x129F JUMP JUMPDEST PUSH2 0x300 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x493 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x12A5 JUMP JUMPDEST PUSH2 0x4E3 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x4C6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x12B7 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP3 DUP4 MSTORE PUSH1 0x20 DUP4 ADD SWAP2 SWAP1 SWAP2 MSTORE DUP1 MLOAD SWAP2 DUP3 SWAP1 SUB ADD SWAP1 RETURN JUMPDEST PUSH2 0x1C6 PUSH2 0x1754 JUMP JUMPDEST PUSH2 0x2B3 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x51A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD AND SWAP1 PUSH1 0x20 ADD CALLDATALOAD PUSH2 0x178D JUMP JUMPDEST PUSH2 0x300 PUSH2 0x179A JUMP JUMPDEST PUSH2 0x3BE PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x55B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x17A0 JUMP JUMPDEST PUSH2 0x2CF PUSH2 0x1996 JUMP JUMPDEST PUSH2 0x2CF PUSH2 0x19B2 JUMP JUMPDEST PUSH2 0x3BE PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0xE0 DUP2 LT ISZERO PUSH2 0x59E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD DUP2 AND SWAP2 PUSH1 0x20 DUP2 ADD CALLDATALOAD SWAP1 SWAP2 AND SWAP1 PUSH1 0x40 DUP2 ADD CALLDATALOAD SWAP1 PUSH1 0x60 DUP2 ADD CALLDATALOAD SWAP1 PUSH1 0xFF PUSH1 0x80 DUP3 ADD CALLDATALOAD AND SWAP1 PUSH1 0xA0 DUP2 ADD CALLDATALOAD SWAP1 PUSH1 0xC0 ADD CALLDATALOAD PUSH2 0x19CE JUMP JUMPDEST PUSH2 0x300 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x5FC JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD DUP2 AND SWAP2 PUSH1 0x20 ADD CALLDATALOAD AND PUSH2 0x1C84 JUMP JUMPDEST PUSH2 0x3BE PUSH2 0x1CA1 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0xA DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x42616B657279204C507300000000000000000000000000000000000000000000 DUP2 MSTORE POP DUP2 JUMP JUMPDEST PUSH1 0x8 SLOAD PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP3 AND SWAP3 PUSH15 0x10000000000000000000000000000 DUP4 DIV SWAP1 SWAP2 AND SWAP2 PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x6C4 CALLER DUP5 DUP5 PUSH2 0x1E87 JUMP JUMPDEST POP PUSH1 0x1 JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x6 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP JUMPDEST PUSH1 0x0 SLOAD DUP2 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 CALLER DUP5 MSTORE SWAP1 SWAP2 MSTORE DUP2 KECCAK256 SLOAD PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF EQ PUSH2 0x7BA JUMPI PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP5 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 CALLER DUP5 MSTORE SWAP1 SWAP2 MSTORE SWAP1 KECCAK256 SLOAD PUSH2 0x788 SWAP1 DUP4 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP6 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 CALLER DUP5 MSTORE SWAP1 SWAP2 MSTORE SWAP1 KECCAK256 SSTORE JUMPDEST PUSH2 0x7C5 DUP5 DUP5 DUP5 PUSH2 0x1F3F JUMP JUMPDEST POP PUSH1 0x1 SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH32 0x6E71EDAE12B1B97F4D1F60370FEF10105FA2FAAE0126114A169C64845D6126C9 DUP2 JUMP JUMPDEST PUSH1 0x12 DUP2 JUMP JUMPDEST PUSH1 0x3 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x5 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND CALLER EQ PUSH2 0x884 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x19 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A20464F5242494444454E00000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x6 DUP1 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP4 DUP5 AND PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFF0000000000000000000000000000000000000000 SWAP2 DUP3 AND OR SWAP1 SWAP2 SSTORE PUSH1 0x7 DUP1 SLOAD SWAP3 SWAP1 SWAP4 AND SWAP2 AND OR SWAP1 SSTORE JUMP JUMPDEST PUSH1 0x9 SLOAD DUP2 JUMP JUMPDEST PUSH1 0xA SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 PUSH1 0xC SLOAD PUSH1 0x1 EQ PUSH2 0x956 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x16 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204C4F434B454400000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0xC DUP2 SWAP1 SSTORE DUP1 PUSH2 0x966 PUSH2 0x662 JUMP JUMPDEST POP PUSH1 0x6 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP4 SWAP6 POP SWAP2 SWAP4 POP PUSH1 0x0 SWAP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP1 SWAP2 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x9E0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x9F4 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0xA0A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x7 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP3 SWAP4 POP PUSH1 0x0 SWAP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP1 SWAP3 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0xA83 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0xA97 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0xAAD JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD SWAP1 POP PUSH1 0x0 PUSH2 0xAD3 DUP4 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP8 AND PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH2 0xAF7 DUP4 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP8 AND PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH2 0xB05 DUP8 DUP8 PUSH2 0x2020 JUMP JUMPDEST PUSH1 0x0 SLOAD SWAP1 SWAP2 POP DUP1 PUSH2 0xB4E JUMPI PUSH2 0xB3A PUSH2 0x3E8 PUSH2 0xB2E PUSH2 0xB29 DUP8 DUP8 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST PUSH2 0x221F JUMP JUMPDEST SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST SWAP9 POP PUSH2 0xB49 PUSH1 0x0 PUSH2 0x3E8 PUSH2 0x2271 JUMP JUMPDEST PUSH2 0xBAB JUMP JUMPDEST PUSH2 0xBA8 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP10 AND PUSH2 0xB72 DUP7 DUP5 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST DUP2 PUSH2 0xB79 JUMPI INVALID JUMPDEST DIV PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP10 AND PUSH2 0xB9B DUP7 DUP6 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST DUP2 PUSH2 0xBA2 JUMPI INVALID JUMPDEST DIV PUSH2 0x2321 JUMP JUMPDEST SWAP9 POP JUMPDEST PUSH1 0x0 DUP10 GT PUSH2 0xC04 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x2D DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2A50 PUSH1 0x2D SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0xC0E DUP11 DUP11 PUSH2 0x2271 JUMP JUMPDEST PUSH2 0xC1A DUP7 DUP7 DUP11 DUP11 PUSH2 0x2337 JUMP JUMPDEST DUP2 ISZERO PUSH2 0xC5C JUMPI PUSH1 0x8 SLOAD PUSH2 0xC58 SWAP1 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP3 AND SWAP2 PUSH15 0x10000000000000000000000000000 SWAP1 DIV AND PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST PUSH1 0xB SSTORE JUMPDEST PUSH1 0x40 DUP1 MLOAD DUP6 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP6 SWAP1 MSTORE DUP2 MLOAD CALLER SWAP3 PUSH32 0x4C209B5FC8AD50758F13E2E1088BA56A560DFF690A1C6FEF26394F4C03821C4F SWAP3 DUP3 SWAP1 SUB ADD SWAP1 LOG2 POP POP PUSH1 0x1 PUSH1 0xC SSTORE POP SWAP5 SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0xC SLOAD PUSH1 0x1 EQ PUSH2 0xD1A JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x16 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204C4F434B454400000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0xC SSTORE DUP3 ISZERO ISZERO DUP1 PUSH2 0xD2D JUMPI POP PUSH1 0x0 DUP3 GT JUMPDEST PUSH2 0xD82 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x2A DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2A7D PUSH1 0x2A SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 DUP1 PUSH2 0xD8D PUSH2 0x662 JUMP JUMPDEST POP SWAP2 POP SWAP2 POP DUP2 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP6 LT DUP1 ISZERO PUSH2 0xDC0 JUMPI POP DUP1 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP5 LT JUMPDEST PUSH2 0xE15 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x26 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2AF2 PUSH1 0x26 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x6 SLOAD PUSH1 0x7 SLOAD PUSH1 0x0 SWAP2 DUP3 SWAP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP2 DUP3 AND SWAP2 SWAP1 DUP2 AND SWAP1 DUP8 AND DUP3 EQ DUP1 ISZERO SWAP1 PUSH2 0xE7A JUMPI POP DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP8 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO JUMPDEST PUSH2 0xEE5 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1A PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A20494E56414C49445F544F000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST DUP9 ISZERO PUSH2 0xEF6 JUMPI PUSH2 0xEF6 DUP3 DUP9 DUP12 PUSH2 0x25F3 JUMP JUMPDEST DUP8 ISZERO PUSH2 0xF07 JUMPI PUSH2 0xF07 DUP2 DUP9 DUP11 PUSH2 0x25F3 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP5 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0xF73 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0xF87 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0xF9D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP2 SWAP6 POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x100F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x1023 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x1039 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD SWAP3 POP PUSH1 0x0 SWAP2 POP POP PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP6 AND DUP9 SWAP1 SUB DUP4 GT PUSH2 0x1063 JUMPI PUSH1 0x0 PUSH2 0x1079 JUMP JUMPDEST DUP8 DUP6 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SUB DUP4 SUB JUMPDEST SWAP1 POP PUSH1 0x0 DUP8 DUP6 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SUB DUP4 GT PUSH2 0x109D JUMPI PUSH1 0x0 PUSH2 0x10B3 JUMP JUMPDEST DUP8 DUP6 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SUB DUP4 SUB JUMPDEST SWAP1 POP PUSH1 0x0 DUP3 GT DUP1 PUSH2 0x10C4 JUMPI POP PUSH1 0x0 DUP2 GT JUMPDEST PUSH2 0x1119 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x29 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2AA7 PUSH1 0x29 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH2 0x1141 PUSH2 0x112F DUP5 PUSH1 0x3 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST PUSH2 0xB2E DUP8 PUSH2 0x3E8 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH2 0x1159 PUSH2 0x112F DUP5 PUSH1 0x3 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 POP PUSH2 0x1191 PUSH3 0xF4240 PUSH2 0x1185 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP12 DUP2 AND SWAP1 DUP12 AND PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST PUSH2 0x11A1 DUP4 DUP4 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST LT ISZERO PUSH2 0x120E JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x11 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204B000000000000000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST POP POP PUSH2 0x121C DUP5 DUP5 DUP9 DUP9 PUSH2 0x2337 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD DUP4 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP4 SWAP1 MSTORE DUP1 DUP3 ADD DUP12 SWAP1 MSTORE PUSH1 0x60 DUP2 ADD DUP11 SWAP1 MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP10 AND SWAP2 CALLER SWAP2 PUSH32 0xD78AD95FA46C994B6551D0DA85FC275FE613CE37657FB8D5E3D130840159D822 SWAP2 DUP2 SWAP1 SUB PUSH1 0x80 ADD SWAP1 LOG3 POP POP PUSH1 0x1 PUSH1 0xC SSTORE POP POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD DUP2 JUMP JUMPDEST PUSH1 0xB SLOAD DUP2 JUMP JUMPDEST PUSH1 0x4 PUSH1 0x20 MSTORE PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0xC SLOAD PUSH1 0x1 EQ PUSH2 0x132B JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x16 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204C4F434B454400000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0xC DUP2 SWAP1 SSTORE DUP1 PUSH2 0x133B PUSH2 0x662 JUMP JUMPDEST POP PUSH1 0x6 SLOAD PUSH1 0x7 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP5 SWAP7 POP SWAP3 SWAP5 POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP2 DUP3 AND SWAP4 SWAP2 AND SWAP2 PUSH1 0x0 SWAP2 DUP5 SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x13BD JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x13D1 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x13E7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP2 SWAP3 POP PUSH1 0x0 SWAP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP6 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x145B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x146F JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x1485 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD ADDRESS PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 SLOAD SWAP2 SWAP3 POP PUSH2 0x14A4 DUP9 DUP9 PUSH2 0x2020 JUMP JUMPDEST PUSH1 0x0 SLOAD SWAP1 SWAP2 POP DUP1 PUSH2 0x14BB DUP5 DUP8 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST DUP2 PUSH2 0x14C2 JUMPI INVALID JUMPDEST DIV SWAP11 POP DUP1 PUSH2 0x14D6 DUP5 DUP7 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST DUP2 PUSH2 0x14DD JUMPI INVALID JUMPDEST DIV SWAP10 POP PUSH1 0x0 DUP12 GT DUP1 ISZERO PUSH2 0x14F0 JUMPI POP PUSH1 0x0 DUP11 GT JUMPDEST PUSH2 0x1545 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x2D DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2B39 PUSH1 0x2D SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x154F ADDRESS DUP5 PUSH2 0x2800 JUMP JUMPDEST PUSH2 0x155A DUP8 DUP14 DUP14 PUSH2 0x25F3 JUMP JUMPDEST PUSH2 0x1565 DUP7 DUP14 DUP13 PUSH2 0x25F3 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP10 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x15D1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x15E5 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x15FB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP2 SWAP7 POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP9 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x166D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x1681 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x1697 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD SWAP4 POP PUSH2 0x16A7 DUP6 DUP6 DUP12 DUP12 PUSH2 0x2337 JUMP JUMPDEST DUP2 ISZERO PUSH2 0x16E9 JUMPI PUSH1 0x8 SLOAD PUSH2 0x16E5 SWAP1 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP3 AND SWAP2 PUSH15 0x10000000000000000000000000000 SWAP1 DIV AND PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST PUSH1 0xB SSTORE JUMPDEST PUSH1 0x40 DUP1 MLOAD DUP13 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP13 SWAP1 MSTORE DUP2 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP16 AND SWAP3 CALLER SWAP3 PUSH32 0xDCCD412F0B1252819CB1FD330B93224CA42612892BB3F4F789976E6D81936496 SWAP3 SWAP1 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 LOG3 POP POP POP POP POP POP POP POP POP PUSH1 0x1 PUSH1 0xC DUP2 SWAP1 SSTORE POP SWAP2 POP SWAP2 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x3 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x424C500000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP DUP2 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x6C4 CALLER DUP5 DUP5 PUSH2 0x1F3F JUMP JUMPDEST PUSH2 0x3E8 DUP2 JUMP JUMPDEST PUSH1 0xC SLOAD PUSH1 0x1 EQ PUSH2 0x1811 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x16 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204C4F434B454400000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0xC SSTORE PUSH1 0x6 SLOAD PUSH1 0x7 SLOAD PUSH1 0x8 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP5 DUP6 AND SWAP5 SWAP1 SWAP4 AND SWAP3 PUSH2 0x18ED SWAP3 DUP6 SWAP3 DUP8 SWAP3 PUSH2 0x18E8 SWAP3 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP2 DUP6 SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x18B0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x18C4 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x18DA JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH2 0x25F3 JUMP JUMPDEST PUSH1 0x8 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH2 0x198C SWAP3 DUP5 SWAP3 DUP8 SWAP3 PUSH2 0x18E8 SWAP3 PUSH15 0x10000000000000000000000000000 SWAP1 DIV PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP7 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x18B0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP POP PUSH1 0x1 PUSH1 0xC SSTORE POP JUMP JUMPDEST PUSH1 0x5 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP JUMPDEST TIMESTAMP DUP5 LT ISZERO PUSH2 0x1A3D JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x18 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B6572795377617042455032303A20455850495245440000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x3 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP10 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 DUP1 SLOAD PUSH1 0x1 DUP1 DUP3 ADD SWAP1 SWAP3 SSTORE DUP3 MLOAD PUSH32 0x6E71EDAE12B1B97F4D1F60370FEF10105FA2FAAE0126114A169C64845D6126C9 DUP2 DUP7 ADD MSTORE DUP1 DUP5 ADD SWAP7 SWAP1 SWAP7 MSTORE SWAP6 DUP14 AND PUSH1 0x60 DUP7 ADD MSTORE PUSH1 0x80 DUP6 ADD DUP13 SWAP1 MSTORE PUSH1 0xA0 DUP6 ADD SWAP6 SWAP1 SWAP6 MSTORE PUSH1 0xC0 DUP1 DUP6 ADD DUP12 SWAP1 MSTORE DUP2 MLOAD DUP1 DUP7 SUB SWAP1 SWAP2 ADD DUP2 MSTORE PUSH1 0xE0 DUP6 ADD DUP3 MSTORE DUP1 MLOAD SWAP1 DUP4 ADD KECCAK256 PUSH32 0x1901000000000000000000000000000000000000000000000000000000000000 PUSH2 0x100 DUP7 ADD MSTORE PUSH2 0x102 DUP6 ADD SWAP7 SWAP1 SWAP7 MSTORE PUSH2 0x122 DUP1 DUP6 ADD SWAP7 SWAP1 SWAP7 MSTORE DUP1 MLOAD DUP1 DUP6 SUB SWAP1 SWAP7 ADD DUP7 MSTORE PUSH2 0x142 DUP5 ADD DUP1 DUP3 MSTORE DUP7 MLOAD SWAP7 DUP4 ADD SWAP7 SWAP1 SWAP7 KECCAK256 SWAP6 DUP4 SWAP1 MSTORE PUSH2 0x162 DUP5 ADD DUP1 DUP3 MSTORE DUP7 SWAP1 MSTORE PUSH1 0xFF DUP10 AND PUSH2 0x182 DUP6 ADD MSTORE PUSH2 0x1A2 DUP5 ADD DUP9 SWAP1 MSTORE PUSH2 0x1C2 DUP5 ADD DUP8 SWAP1 MSTORE MLOAD SWAP2 SWAP4 SWAP3 PUSH2 0x1E2 DUP1 DUP3 ADD SWAP4 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0 DUP2 ADD SWAP3 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 DUP6 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x1B9E JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP PUSH1 0x40 MLOAD PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0 ADD MLOAD SWAP2 POP POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 AND ISZERO DUP1 ISZERO SWAP1 PUSH2 0x1C19 JUMPI POP DUP9 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ JUMPDEST PUSH2 0x1C6E JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x22 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2AD0 PUSH1 0x22 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x1C79 DUP10 DUP10 DUP10 PUSH2 0x1E87 JUMP JUMPDEST POP POP POP POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x2 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x0 SWAP3 DUP4 MSTORE PUSH1 0x40 DUP1 DUP5 KECCAK256 SWAP1 SWAP2 MSTORE SWAP1 DUP3 MSTORE SWAP1 KECCAK256 SLOAD DUP2 JUMP JUMPDEST PUSH1 0xC SLOAD PUSH1 0x1 EQ PUSH2 0x1D12 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x16 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204C4F434B454400000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0xC SSTORE PUSH1 0x6 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH2 0x1E80 SWAP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x1D89 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x1D9D JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x1DB3 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x7 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP1 SWAP3 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x1E26 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x1E3A JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x1E50 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x8 SLOAD PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP3 AND SWAP2 PUSH15 0x10000000000000000000000000000 SWAP1 DIV AND PUSH2 0x2337 JUMP JUMPDEST PUSH1 0x1 PUSH1 0xC SSTORE JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP5 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP5 DUP8 AND DUP1 DUP5 MSTORE SWAP5 DUP3 MSTORE SWAP2 DUP3 SWAP1 KECCAK256 DUP6 SWAP1 SSTORE DUP2 MLOAD DUP6 DUP2 MSTORE SWAP2 MLOAD PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 SWAP3 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1F38 DUP4 DUP4 PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x1E DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x536166654D6174683A207375627472616374696F6E206F766572666C6F770000 DUP2 MSTORE POP PUSH2 0x28C5 JUMP JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH2 0x1F75 SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP6 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP1 DUP3 KECCAK256 SWAP4 SWAP1 SWAP4 SSTORE SWAP1 DUP5 AND DUP2 MSTORE KECCAK256 SLOAD PUSH2 0x1FB7 SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x2976 AND JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP5 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP2 DUP3 SWAP1 KECCAK256 SWAP5 SWAP1 SWAP5 SSTORE DUP1 MLOAD DUP6 DUP2 MSTORE SWAP1 MLOAD SWAP2 SWAP4 SWAP3 DUP8 AND SWAP3 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 SWAP2 DUP3 SWAP1 SUB ADD SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x5 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x17E7E58 PUSH1 0x40 MLOAD DUP2 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x208B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x209F JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x20B5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0xB SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND ISZERO DUP1 ISZERO SWAP5 POP SWAP2 SWAP3 POP SWAP1 PUSH2 0x2198 JUMPI DUP1 ISZERO PUSH2 0x2193 JUMPI PUSH1 0x0 PUSH2 0x210C PUSH2 0xB29 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP9 DUP2 AND SWAP1 DUP9 AND PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH2 0x2119 DUP4 PUSH2 0x221F JUMP JUMPDEST SWAP1 POP DUP1 DUP3 GT ISZERO PUSH2 0x2190 JUMPI PUSH1 0x0 PUSH2 0x2147 PUSH2 0x2138 DUP5 DUP5 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH1 0x0 SLOAD SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH2 0x216C DUP4 PUSH2 0x2160 DUP7 PUSH1 0x5 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x2976 AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 DUP2 DUP4 DUP2 PUSH2 0x2179 JUMPI INVALID JUMPDEST DIV SWAP1 POP DUP1 ISZERO PUSH2 0x218C JUMPI PUSH2 0x218C DUP8 DUP3 PUSH2 0x2271 JUMP JUMPDEST POP POP POP JUMPDEST POP POP JUMPDEST PUSH2 0x21A4 JUMP JUMPDEST DUP1 ISZERO PUSH2 0x21A4 JUMPI PUSH1 0x0 PUSH1 0xB SSTORE JUMPDEST POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH2 0x21BB JUMPI POP PUSH1 0x0 PUSH2 0x6C8 JUMP JUMPDEST DUP3 DUP3 MUL DUP3 DUP5 DUP3 DUP2 PUSH2 0x21C8 JUMPI INVALID JUMPDEST DIV EQ PUSH2 0x1F38 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x21 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2B18 PUSH1 0x21 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x3 DUP3 GT ISZERO PUSH2 0x2262 JUMPI POP DUP1 PUSH1 0x1 PUSH1 0x2 DUP3 DIV ADD JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0x225C JUMPI DUP1 SWAP2 POP PUSH1 0x2 DUP2 DUP3 DUP6 DUP2 PUSH2 0x224B JUMPI INVALID JUMPDEST DIV ADD DUP2 PUSH2 0x2254 JUMPI INVALID JUMPDEST DIV SWAP1 POP PUSH2 0x2234 JUMP JUMPDEST POP PUSH2 0x226C JUMP JUMPDEST DUP2 ISZERO PUSH2 0x226C JUMPI POP PUSH1 0x1 JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 SLOAD PUSH2 0x2284 SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x2976 AND JUMP JUMPDEST PUSH1 0x0 SWAP1 DUP2 SSTORE PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH2 0x22BC SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x2976 AND JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP5 SWAP1 SWAP5 SSTORE DUP4 MLOAD DUP6 DUP2 MSTORE SWAP4 MLOAD SWAP3 SWAP4 SWAP2 SWAP3 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 DUP4 LT PUSH2 0x2330 JUMPI DUP2 PUSH2 0x1F38 JUMP JUMPDEST POP SWAP1 SWAP2 SWAP1 POP JUMP JUMPDEST PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP5 GT DUP1 ISZERO SWAP1 PUSH2 0x2363 JUMPI POP PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 GT ISZERO JUMPDEST PUSH2 0x23CE JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x18 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204F564552464C4F570000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x8 SLOAD PUSH4 0xFFFFFFFF TIMESTAMP DUP2 AND SWAP2 PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV DUP2 AND DUP3 SUB SWAP1 DUP2 AND ISZERO DUP1 ISZERO SWAP1 PUSH2 0x241E JUMPI POP PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP5 AND ISZERO ISZERO JUMPDEST DUP1 ISZERO PUSH2 0x2439 JUMPI POP PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND ISZERO ISZERO JUMPDEST ISZERO PUSH2 0x24E9 JUMPI DUP1 PUSH4 0xFFFFFFFF AND PUSH2 0x247C DUP6 PUSH2 0x2452 DUP7 PUSH2 0x29EA JUMP JUMPDEST PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x2A0E AND JUMP JUMPDEST PUSH1 0x9 DUP1 SLOAD PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP3 SWAP1 SWAP3 AND SWAP3 SWAP1 SWAP3 MUL ADD SWAP1 SSTORE PUSH4 0xFFFFFFFF DUP2 AND PUSH2 0x24BC DUP5 PUSH2 0x2452 DUP8 PUSH2 0x29EA JUMP JUMPDEST PUSH1 0xA DUP1 SLOAD PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP3 SWAP1 SWAP3 AND SWAP3 SWAP1 SWAP3 MUL ADD SWAP1 SSTORE JUMPDEST PUSH1 0x8 DUP1 SLOAD PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000000000000000000000000000 AND PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP9 DUP2 AND SWAP2 SWAP1 SWAP2 OR PUSH32 0xFFFFFFFF0000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH15 0x10000000000000000000000000000 DUP9 DUP4 AND DUP2 MUL SWAP2 SWAP1 SWAP2 OR PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH29 0x100000000000000000000000000000000000000000000000000000000 PUSH4 0xFFFFFFFF DUP8 AND MUL OR SWAP3 DUP4 SWAP1 SSTORE PUSH1 0x40 DUP1 MLOAD DUP5 DUP5 AND DUP2 MSTORE SWAP2 SWAP1 SWAP4 DIV SWAP1 SWAP2 AND PUSH1 0x20 DUP3 ADD MSTORE DUP2 MLOAD PUSH32 0x1C411E9A96E071241C2F21F7726B17AE89E3CAB4C78BE50E062B03A9FFFBBAD1 SWAP3 SWAP2 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 LOG1 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD DUP1 DUP3 ADD DUP3 MSTORE PUSH1 0x19 DUP2 MSTORE PUSH32 0x7472616E7366657228616464726573732C75696E743235362900000000000000 PUSH1 0x20 SWAP2 DUP3 ADD MSTORE DUP2 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP6 DUP2 AND PUSH1 0x24 DUP4 ADD MSTORE PUSH1 0x44 DUP1 DUP4 ADD DUP7 SWAP1 MSTORE DUP5 MLOAD DUP1 DUP5 SUB SWAP1 SWAP2 ADD DUP2 MSTORE PUSH1 0x64 SWAP1 SWAP3 ADD DUP5 MSTORE SWAP2 DUP2 ADD DUP1 MLOAD PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xA9059CBB00000000000000000000000000000000000000000000000000000000 OR DUP2 MSTORE SWAP3 MLOAD DUP2 MLOAD PUSH1 0x0 SWAP5 PUSH1 0x60 SWAP5 DUP10 AND SWAP4 SWAP3 SWAP2 DUP3 SWAP2 SWAP1 DUP1 DUP4 DUP4 JUMPDEST PUSH1 0x20 DUP4 LT PUSH2 0x26F9 JUMPI DUP1 MLOAD DUP3 MSTORE PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0 SWAP1 SWAP3 ADD SWAP2 PUSH1 0x20 SWAP2 DUP3 ADD SWAP2 ADD PUSH2 0x26BC JUMP JUMPDEST PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB DUP1 NOT DUP3 MLOAD AND DUP2 DUP5 MLOAD AND DUP1 DUP3 OR DUP6 MSTORE POP POP POP POP POP POP SWAP1 POP ADD SWAP2 POP POP PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP7 GAS CALL SWAP2 POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x275B JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x2760 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP SWAP2 POP SWAP2 POP DUP2 DUP1 ISZERO PUSH2 0x278E JUMPI POP DUP1 MLOAD ISZERO DUP1 PUSH2 0x278E JUMPI POP DUP1 DUP1 PUSH1 0x20 ADD SWAP1 MLOAD PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x278B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD JUMPDEST PUSH2 0x27F9 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1F PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A205452414E534645525F4641494C454400 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST POP POP POP POP POP JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH2 0x2836 SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 SWAP2 SWAP1 SWAP2 SSTORE SLOAD PUSH2 0x2870 SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH1 0x0 SWAP1 DUP2 SSTORE PUSH1 0x40 DUP1 MLOAD DUP4 DUP2 MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP6 AND SWAP2 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP2 SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 DUP5 DUP5 GT ISZERO PUSH2 0x296E JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x2933 JUMPI DUP2 DUP2 ADD MLOAD DUP4 DUP3 ADD MSTORE PUSH1 0x20 ADD PUSH2 0x291B JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x2960 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST POP POP POP SWAP1 SUB SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 ADD DUP4 DUP2 LT ISZERO PUSH2 0x1F38 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1B PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x536166654D6174683A206164646974696F6E206F766572666C6F770000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH15 0x10000000000000000000000000000 MUL SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP5 AND DUP2 PUSH2 0x2A47 JUMPI INVALID JUMPDEST DIV SWAP4 SWAP3 POP POP POP JUMP INVALID TIMESTAMP PUSH2 0x6B65 PUSH19 0x7953776170506169723A20494E535546464943 0x49 GASLIMIT 0x4E SLOAD 0x5F 0x4C 0x49 MLOAD SSTORE 0x49 DIFFICULTY 0x49 SLOAD MSIZE 0x5F 0x4D 0x49 0x4E SLOAD GASLIMIT DIFFICULTY TIMESTAMP PUSH2 0x6B65 PUSH19 0x7953776170506169723A20494E535546464943 0x49 GASLIMIT 0x4E SLOAD 0x5F 0x4F SSTORE SLOAD POP SSTORE SLOAD 0x5F COINBASE 0x4D 0x4F SSTORE 0x4E SLOAD TIMESTAMP PUSH2 0x6B65 PUSH19 0x7953776170506169723A20494E535546464943 0x49 GASLIMIT 0x4E SLOAD 0x5F 0x49 0x4E POP SSTORE SLOAD 0x5F COINBASE 0x4D 0x4F SSTORE 0x4E SLOAD TIMESTAMP PUSH2 0x6B65 PUSH19 0x795377617042455032303A20494E56414C4944 0x5F MSTORE8 0x49 SELFBALANCE 0x4E COINBASE SLOAD SSTORE MSTORE GASLIMIT TIMESTAMP PUSH2 0x6B65 PUSH19 0x7953776170506169723A20494E535546464943 0x49 GASLIMIT 0x4E SLOAD 0x5F 0x4C 0x49 MLOAD SSTORE 0x49 DIFFICULTY 0x49 SLOAD MSIZE MSTORE8 PUSH2 0x6665 0x4D PUSH2 0x7468 GASPRICE KECCAK256 PUSH14 0x756C7469706C69636174696F6E20 PUSH16 0x766572666C6F7742616B657279537761 PUSH17 0x506169723A20494E53554646494349454E SLOAD 0x5F 0x4C 0x49 MLOAD SSTORE 0x49 DIFFICULTY 0x49 SLOAD MSIZE 0x5F TIMESTAMP SSTORE MSTORE 0x4E GASLIMIT DIFFICULTY LOG2 PUSH6 0x627A7A723158 KECCAK256 0xA6 POP PUSH32 0xDFB8085D6A2C98676353425072170469F2AD9D8B6FFCABACD193CE769864736F PUSH13 0x63430005100032454950373132 DIFFICULTY PUSH16 0x6D61696E28737472696E67206E616D65 0x2C PUSH20 0x7472696E672076657273696F6E2C75696E743235 CALLDATASIZE KECCAK256 PUSH4 0x6861696E 0x49 PUSH5 0x2C61646472 PUSH6 0x737320766572 PUSH10 0x6679696E67436F6E7472 PUSH2 0x6374 0x29 ",
		sourceMap: "258:9793:4:-;;;1107:1;1080:28;;2304:58;8:9:-1;5:2;;;30:1;27;20:12;5:2;-1:-1;1159:95:2;;1063:7;;1159:95;;;;;;;;;;;;;;;;1288:4;;;;;;;;-1:-1:-1;1288:4:2;;;;;1322:10;;;;;;;;;;-1:-1:-1;1322:10:2;;;;1131:272;;;;;;;;;1272:22;1131:272;;;;1312:21;1131:272;;;;;;;;;;;1384:4;1131:272;;;;;;;;;;26:21:-1;;;22:32;;;6:49;;1131:272:2;;;;;;1108:305;;;;;;;;1089:16;:324;-1:-1:-1;2335:7:4;:20;;-1:-1:-1;2335:20:4;2345:10;2335:20;;;-1:-1:-1;;258:9793:4;-1:-1:-1;258:9793:4;;"
	},
	deployedBytecode: {
		linkReferences: {
		},
		object: "608060405234801561001057600080fd5b50600436106101b95760003560e01c80636d9a640a116100f9578063ba9a7a5611610097578063d21220a711610071578063d21220a714610580578063d505accf14610588578063dd62ed3e146105e6578063fff6cae914610621576101b9565b8063ba9a7a561461053d578063bc25cf7714610545578063c45a015514610578576101b9565b80637ecebe00116100d35780637ecebe001461047d57806389afcb44146104b057806395d89b41146104fc578063a9059cbb14610504576101b9565b80636d9a640a1461040357806370a08231146104425780637464fc3d14610475576101b9565b806330adf81f11610166578063485cc95511610140578063485cc955146103835780635909c0d5146103c05780635a3d5493146103c85780636a627842146103d0576101b9565b806330adf81f14610355578063313ce5671461035d5780633644e5151461037b576101b9565b80630dfe1681116101975780630dfe1681146102c757806318160ddd146102f857806323b872dd14610312576101b9565b806306fdde03146101be5780630902f1ac1461023b578063095ea7b31461027a575b600080fd5b6101c6610629565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102005781810151838201526020016101e8565b50505050905090810190601f16801561022d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610243610662565b604080516dffffffffffffffffffffffffffff948516815292909316602083015263ffffffff168183015290519081900360600190f35b6102b36004803603604081101561029057600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356106b7565b604080519115158252519081900360200190f35b6102cf6106ce565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6103006106ea565b60408051918252519081900360200190f35b6102b36004803603606081101561032857600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602081013590911690604001356106f0565b6103006107cf565b6103656107f3565b6040805160ff9092168252519081900360200190f35b6103006107f8565b6103be6004803603604081101561039957600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160200135166107fe565b005b6103006108d7565b6103006108dd565b610300600480360360208110156103e657600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166108e3565b6103be6004803603606081101561041957600080fd5b508035906020810135906040013573ffffffffffffffffffffffffffffffffffffffff16610ca9565b6103006004803603602081101561045857600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661128d565b61030061129f565b6103006004803603602081101561049357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166112a5565b6104e3600480360360208110156104c657600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166112b7565b6040805192835260208301919091528051918290030190f35b6101c6611754565b6102b36004803603604081101561051a57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813516906020013561178d565b61030061179a565b6103be6004803603602081101561055b57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166117a0565b6102cf611996565b6102cf6119b2565b6103be600480360360e081101561059e57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c001356119ce565b610300600480360360408110156105fc57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020013516611c84565b6103be611ca1565b6040518060400160405280600a81526020017f42616b657279204c50730000000000000000000000000000000000000000000081525081565b6008546dffffffffffffffffffffffffffff808216926e0100000000000000000000000000008304909116917c0100000000000000000000000000000000000000000000000000000000900463ffffffff1690565b60006106c4338484611e87565b5060015b92915050565b60065473ffffffffffffffffffffffffffffffffffffffff1681565b60005481565b73ffffffffffffffffffffffffffffffffffffffff831660009081526002602090815260408083203384529091528120547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff146107ba5773ffffffffffffffffffffffffffffffffffffffff84166000908152600260209081526040808320338452909152902054610788908363ffffffff611ef616565b73ffffffffffffffffffffffffffffffffffffffff851660009081526002602090815260408083203384529091529020555b6107c5848484611f3f565b5060019392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601281565b60035481565b60055473ffffffffffffffffffffffffffffffffffffffff16331461088457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f42616b65727953776170506169723a20464f5242494444454e00000000000000604482015290519081900360640190fd5b6006805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff00000000000000000000000000000000000000009182161790915560078054929093169116179055565b60095481565b600a5481565b6000600c5460011461095657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c81905580610966610662565b50600654604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905193955091935060009273ffffffffffffffffffffffffffffffffffffffff909116916370a08231916024808301926020929190829003018186803b1580156109e057600080fd5b505afa1580156109f4573d6000803e3d6000fd5b505050506040513d6020811015610a0a57600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905192935060009273ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b158015610a8357600080fd5b505afa158015610a97573d6000803e3d6000fd5b505050506040513d6020811015610aad57600080fd5b505190506000610ad3836dffffffffffffffffffffffffffff871663ffffffff611ef616565b90506000610af7836dffffffffffffffffffffffffffff871663ffffffff611ef616565b90506000610b058787612020565b60005490915080610b4e57610b3a6103e8610b2e610b29878763ffffffff6121ac16565b61221f565b9063ffffffff611ef616565b9850610b4960006103e8612271565b610bab565b610ba86dffffffffffffffffffffffffffff8916610b72868463ffffffff6121ac16565b81610b7957fe5b046dffffffffffffffffffffffffffff8916610b9b868563ffffffff6121ac16565b81610ba257fe5b04612321565b98505b60008911610c04576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602d815260200180612a50602d913960400191505060405180910390fd5b610c0e8a8a612271565b610c1a86868a8a612337565b8115610c5c57600854610c58906dffffffffffffffffffffffffffff808216916e01000000000000000000000000000090041663ffffffff6121ac16565b600b555b6040805185815260208101859052815133927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a250506001600c5550949695505050505050565b600c54600114610d1a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c5582151580610d2d5750600082115b610d82576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180612a7d602a913960400191505060405180910390fd5b600080610d8d610662565b5091509150816dffffffffffffffffffffffffffff1685108015610dc05750806dffffffffffffffffffffffffffff1684105b610e15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180612af26026913960400191505060405180910390fd5b600654600754600091829173ffffffffffffffffffffffffffffffffffffffff918216919081169087168214801590610e7a57508073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614155b610ee557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f42616b65727953776170506169723a20494e56414c49445f544f000000000000604482015290519081900360640190fd5b8815610ef657610ef682888b6125f3565b8715610f0757610f0781888a6125f3565b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8416916370a08231916024808301926020929190829003018186803b158015610f7357600080fd5b505afa158015610f87573d6000803e3d6000fd5b505050506040513d6020811015610f9d57600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191955073ffffffffffffffffffffffffffffffffffffffff8316916370a0823191602480820192602092909190829003018186803b15801561100f57600080fd5b505afa158015611023573d6000803e3d6000fd5b505050506040513d602081101561103957600080fd5b5051925060009150506dffffffffffffffffffffffffffff85168890038311611063576000611079565b87856dffffffffffffffffffffffffffff160383035b9050600087856dffffffffffffffffffffffffffff1603831161109d5760006110b3565b87856dffffffffffffffffffffffffffff160383035b905060008211806110c45750600081115b611119576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180612aa76029913960400191505060405180910390fd5b600061114161112f84600363ffffffff6121ac16565b610b2e876103e863ffffffff6121ac16565b9050600061115961112f84600363ffffffff6121ac16565b9050611191620f42406111856dffffffffffffffffffffffffffff8b8116908b1663ffffffff6121ac16565b9063ffffffff6121ac16565b6111a1838363ffffffff6121ac16565b101561120e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f42616b65727953776170506169723a204b000000000000000000000000000000604482015290519081900360640190fd5b505061121c84848888612337565b60408051838152602081018390528082018b9052606081018a9052905173ffffffffffffffffffffffffffffffffffffffff89169133917fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d8229181900360800190a350506001600c5550505050505050565b60016020526000908152604090205481565b600b5481565b60046020526000908152604090205481565b600080600c5460011461132b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c8190558061133b610662565b50600654600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905194965092945073ffffffffffffffffffffffffffffffffffffffff9182169391169160009184916370a08231916024808301926020929190829003018186803b1580156113bd57600080fd5b505afa1580156113d1573d6000803e3d6000fd5b505050506040513d60208110156113e757600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191925060009173ffffffffffffffffffffffffffffffffffffffff8516916370a08231916024808301926020929190829003018186803b15801561145b57600080fd5b505afa15801561146f573d6000803e3d6000fd5b505050506040513d602081101561148557600080fd5b5051306000908152600160205260408120549192506114a48888612020565b600054909150806114bb848763ffffffff6121ac16565b816114c257fe5b049a50806114d6848663ffffffff6121ac16565b816114dd57fe5b04995060008b1180156114f0575060008a115b611545576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602d815260200180612b39602d913960400191505060405180910390fd5b61154f3084612800565b61155a878d8d6125f3565b611565868d8c6125f3565b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8916916370a08231916024808301926020929190829003018186803b1580156115d157600080fd5b505afa1580156115e5573d6000803e3d6000fd5b505050506040513d60208110156115fb57600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191965073ffffffffffffffffffffffffffffffffffffffff8816916370a0823191602480820192602092909190829003018186803b15801561166d57600080fd5b505afa158015611681573d6000803e3d6000fd5b505050506040513d602081101561169757600080fd5b505193506116a785858b8b612337565b81156116e9576008546116e5906dffffffffffffffffffffffffffff808216916e01000000000000000000000000000090041663ffffffff6121ac16565b600b555b604080518c8152602081018c9052815173ffffffffffffffffffffffffffffffffffffffff8f169233927fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496929081900390910190a35050505050505050506001600c81905550915091565b6040518060400160405280600381526020017f424c50000000000000000000000000000000000000000000000000000000000081525081565b60006106c4338484611f3f565b6103e881565b600c5460011461181157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c55600654600754600854604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff94851694909316926118ed92859287926118e8926dffffffffffffffffffffffffffff169185916370a0823191602480820192602092909190829003018186803b1580156118b057600080fd5b505afa1580156118c4573d6000803e3d6000fd5b505050506040513d60208110156118da57600080fd5b50519063ffffffff611ef616565b6125f3565b600854604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905161198c92849287926118e8926e01000000000000000000000000000090046dffffffffffffffffffffffffffff169173ffffffffffffffffffffffffffffffffffffffff8616916370a0823191602480820192602092909190829003018186803b1580156118b057600080fd5b50506001600c5550565b60055473ffffffffffffffffffffffffffffffffffffffff1681565b60075473ffffffffffffffffffffffffffffffffffffffff1681565b42841015611a3d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f42616b6572795377617042455032303a20455850495245440000000000000000604482015290519081900360640190fd5b60035473ffffffffffffffffffffffffffffffffffffffff80891660008181526004602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958d166060860152608085018c905260a085019590955260c08085018b90528151808603909101815260e0850182528051908301207f19010000000000000000000000000000000000000000000000000000000000006101008601526101028501969096526101228085019690965280518085039096018652610142840180825286519683019690962095839052610162840180825286905260ff89166101828501526101a284018890526101c28401879052519193926101e2808201937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081019281900390910190855afa158015611b9e573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff811615801590611c1957508873ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b611c6e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180612ad06022913960400191505060405180910390fd5b611c79898989611e87565b505050505050505050565b600260209081526000928352604080842090915290825290205481565b600c54600114611d1257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c55600654604080517f70a082310000000000000000000000000000000000000000000000000000000081523060048201529051611e809273ffffffffffffffffffffffffffffffffffffffff16916370a08231916024808301926020929190829003018186803b158015611d8957600080fd5b505afa158015611d9d573d6000803e3d6000fd5b505050506040513d6020811015611db357600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b158015611e2657600080fd5b505afa158015611e3a573d6000803e3d6000fd5b505050506040513d6020811015611e5057600080fd5b50516008546dffffffffffffffffffffffffffff808216916e010000000000000000000000000000900416612337565b6001600c55565b73ffffffffffffffffffffffffffffffffffffffff808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6000611f3883836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506128c5565b9392505050565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260016020526040902054611f75908263ffffffff611ef616565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152600160205260408082209390935590841681522054611fb7908263ffffffff61297616565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b15801561208b57600080fd5b505afa15801561209f573d6000803e3d6000fd5b505050506040513d60208110156120b557600080fd5b5051600b5473ffffffffffffffffffffffffffffffffffffffff821615801594509192509061219857801561219357600061210c610b296dffffffffffffffffffffffffffff88811690881663ffffffff6121ac16565b905060006121198361221f565b905080821115612190576000612147612138848463ffffffff611ef616565b6000549063ffffffff6121ac16565b9050600061216c8361216086600563ffffffff6121ac16565b9063ffffffff61297616565b9050600081838161217957fe5b049050801561218c5761218c8782612271565b5050505b50505b6121a4565b80156121a4576000600b555b505092915050565b6000826121bb575060006106c8565b828202828482816121c857fe5b0414611f38576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180612b186021913960400191505060405180910390fd5b60006003821115612262575080600160028204015b8181101561225c5780915060028182858161224b57fe5b04018161225457fe5b049050612234565b5061226c565b811561226c575060015b919050565b600054612284908263ffffffff61297616565b600090815573ffffffffffffffffffffffffffffffffffffffff83168152600160205260409020546122bc908263ffffffff61297616565b73ffffffffffffffffffffffffffffffffffffffff831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b60008183106123305781611f38565b5090919050565b6dffffffffffffffffffffffffffff841180159061236357506dffffffffffffffffffffffffffff8311155b6123ce57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f42616b65727953776170506169723a204f564552464c4f570000000000000000604482015290519081900360640190fd5b60085463ffffffff428116917c01000000000000000000000000000000000000000000000000000000009004811682039081161580159061241e57506dffffffffffffffffffffffffffff841615155b801561243957506dffffffffffffffffffffffffffff831615155b156124e9578063ffffffff1661247c85612452866129ea565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169063ffffffff612a0e16565b600980547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff929092169290920201905563ffffffff81166124bc84612452876129ea565b600a80547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff92909216929092020190555b600880547fffffffffffffffffffffffffffffffffffff0000000000000000000000000000166dffffffffffffffffffffffffffff888116919091177fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff166e0100000000000000000000000000008883168102919091177bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167c010000000000000000000000000000000000000000000000000000000063ffffffff871602179283905560408051848416815291909304909116602082015281517f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1929181900390910190a1505050505050565b604080518082018252601981527f7472616e7366657228616464726573732c75696e743235362900000000000000602091820152815173ffffffffffffffffffffffffffffffffffffffff85811660248301526044808301869052845180840390910181526064909201845291810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001781529251815160009460609489169392918291908083835b602083106126f957805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe090920191602091820191016126bc565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d806000811461275b576040519150601f19603f3d011682016040523d82523d6000602084013e612760565b606091505b509150915081801561278e57508051158061278e575080806020019051602081101561278b57600080fd5b50515b6127f957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f42616b65727953776170506169723a205452414e534645525f4641494c454400604482015290519081900360640190fd5b5050505050565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902054612836908263ffffffff611ef616565b73ffffffffffffffffffffffffffffffffffffffff831660009081526001602052604081209190915554612870908263ffffffff611ef616565b600090815560408051838152905173ffffffffffffffffffffffffffffffffffffffff8516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef919081900360200190a35050565b6000818484111561296e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561293357818101518382015260200161291b565b50505050905090810190601f1680156129605780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015611f3857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6dffffffffffffffffffffffffffff166e0100000000000000000000000000000290565b60006dffffffffffffffffffffffffffff82167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff841681612a4757fe5b04939250505056fe42616b65727953776170506169723a20494e53554646494349454e545f4c49515549444954595f4d494e54454442616b65727953776170506169723a20494e53554646494349454e545f4f55545055545f414d4f554e5442616b65727953776170506169723a20494e53554646494349454e545f494e5055545f414d4f554e5442616b6572795377617042455032303a20494e56414c49445f5349474e415455524542616b65727953776170506169723a20494e53554646494349454e545f4c4951554944495459536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f7742616b65727953776170506169723a20494e53554646494349454e545f4c49515549444954595f4255524e4544a265627a7a72315820a6507fdfb8085d6a2c98676353425072170469f2ad9d8b6ffcabacd193ce769864736f6c63430005100032",
		opcodes: "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x1B9 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x6D9A640A GT PUSH2 0xF9 JUMPI DUP1 PUSH4 0xBA9A7A56 GT PUSH2 0x97 JUMPI DUP1 PUSH4 0xD21220A7 GT PUSH2 0x71 JUMPI DUP1 PUSH4 0xD21220A7 EQ PUSH2 0x580 JUMPI DUP1 PUSH4 0xD505ACCF EQ PUSH2 0x588 JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x5E6 JUMPI DUP1 PUSH4 0xFFF6CAE9 EQ PUSH2 0x621 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0xBA9A7A56 EQ PUSH2 0x53D JUMPI DUP1 PUSH4 0xBC25CF77 EQ PUSH2 0x545 JUMPI DUP1 PUSH4 0xC45A0155 EQ PUSH2 0x578 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0x7ECEBE00 GT PUSH2 0xD3 JUMPI DUP1 PUSH4 0x7ECEBE00 EQ PUSH2 0x47D JUMPI DUP1 PUSH4 0x89AFCB44 EQ PUSH2 0x4B0 JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x4FC JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x504 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0x6D9A640A EQ PUSH2 0x403 JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0x442 JUMPI DUP1 PUSH4 0x7464FC3D EQ PUSH2 0x475 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0x30ADF81F GT PUSH2 0x166 JUMPI DUP1 PUSH4 0x485CC955 GT PUSH2 0x140 JUMPI DUP1 PUSH4 0x485CC955 EQ PUSH2 0x383 JUMPI DUP1 PUSH4 0x5909C0D5 EQ PUSH2 0x3C0 JUMPI DUP1 PUSH4 0x5A3D5493 EQ PUSH2 0x3C8 JUMPI DUP1 PUSH4 0x6A627842 EQ PUSH2 0x3D0 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0x30ADF81F EQ PUSH2 0x355 JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0x35D JUMPI DUP1 PUSH4 0x3644E515 EQ PUSH2 0x37B JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0xDFE1681 GT PUSH2 0x197 JUMPI DUP1 PUSH4 0xDFE1681 EQ PUSH2 0x2C7 JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0x2F8 JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x312 JUMPI PUSH2 0x1B9 JUMP JUMPDEST DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0x1BE JUMPI DUP1 PUSH4 0x902F1AC EQ PUSH2 0x23B JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x27A JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x1C6 PUSH2 0x629 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH1 0x20 DUP1 DUP3 MSTORE DUP4 MLOAD DUP2 DUP4 ADD MSTORE DUP4 MLOAD SWAP2 SWAP3 DUP4 SWAP3 SWAP1 DUP4 ADD SWAP2 DUP6 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x200 JUMPI DUP2 DUP2 ADD MLOAD DUP4 DUP3 ADD MSTORE PUSH1 0x20 ADD PUSH2 0x1E8 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x22D JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x243 PUSH2 0x662 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP5 DUP6 AND DUP2 MSTORE SWAP3 SWAP1 SWAP4 AND PUSH1 0x20 DUP4 ADD MSTORE PUSH4 0xFFFFFFFF AND DUP2 DUP4 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x60 ADD SWAP1 RETURN JUMPDEST PUSH2 0x2B3 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x290 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD AND SWAP1 PUSH1 0x20 ADD CALLDATALOAD PUSH2 0x6B7 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP2 ISZERO ISZERO DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST PUSH2 0x2CF PUSH2 0x6CE JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP1 SWAP3 AND DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST PUSH2 0x300 PUSH2 0x6EA JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP2 DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST PUSH2 0x2B3 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x60 DUP2 LT ISZERO PUSH2 0x328 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD DUP2 AND SWAP2 PUSH1 0x20 DUP2 ADD CALLDATALOAD SWAP1 SWAP2 AND SWAP1 PUSH1 0x40 ADD CALLDATALOAD PUSH2 0x6F0 JUMP JUMPDEST PUSH2 0x300 PUSH2 0x7CF JUMP JUMPDEST PUSH2 0x365 PUSH2 0x7F3 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH1 0xFF SWAP1 SWAP3 AND DUP3 MSTORE MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 RETURN JUMPDEST PUSH2 0x300 PUSH2 0x7F8 JUMP JUMPDEST PUSH2 0x3BE PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x399 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD DUP2 AND SWAP2 PUSH1 0x20 ADD CALLDATALOAD AND PUSH2 0x7FE JUMP JUMPDEST STOP JUMPDEST PUSH2 0x300 PUSH2 0x8D7 JUMP JUMPDEST PUSH2 0x300 PUSH2 0x8DD JUMP JUMPDEST PUSH2 0x300 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x3E6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x8E3 JUMP JUMPDEST PUSH2 0x3BE PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x60 DUP2 LT ISZERO PUSH2 0x419 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP DUP1 CALLDATALOAD SWAP1 PUSH1 0x20 DUP2 ADD CALLDATALOAD SWAP1 PUSH1 0x40 ADD CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0xCA9 JUMP JUMPDEST PUSH2 0x300 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x458 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x128D JUMP JUMPDEST PUSH2 0x300 PUSH2 0x129F JUMP JUMPDEST PUSH2 0x300 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x493 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x12A5 JUMP JUMPDEST PUSH2 0x4E3 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x4C6 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x12B7 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP3 DUP4 MSTORE PUSH1 0x20 DUP4 ADD SWAP2 SWAP1 SWAP2 MSTORE DUP1 MLOAD SWAP2 DUP3 SWAP1 SUB ADD SWAP1 RETURN JUMPDEST PUSH2 0x1C6 PUSH2 0x1754 JUMP JUMPDEST PUSH2 0x2B3 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x51A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD AND SWAP1 PUSH1 0x20 ADD CALLDATALOAD PUSH2 0x178D JUMP JUMPDEST PUSH2 0x300 PUSH2 0x179A JUMP JUMPDEST PUSH2 0x3BE PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x55B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x17A0 JUMP JUMPDEST PUSH2 0x2CF PUSH2 0x1996 JUMP JUMPDEST PUSH2 0x2CF PUSH2 0x19B2 JUMP JUMPDEST PUSH2 0x3BE PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0xE0 DUP2 LT ISZERO PUSH2 0x59E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD DUP2 AND SWAP2 PUSH1 0x20 DUP2 ADD CALLDATALOAD SWAP1 SWAP2 AND SWAP1 PUSH1 0x40 DUP2 ADD CALLDATALOAD SWAP1 PUSH1 0x60 DUP2 ADD CALLDATALOAD SWAP1 PUSH1 0xFF PUSH1 0x80 DUP3 ADD CALLDATALOAD AND SWAP1 PUSH1 0xA0 DUP2 ADD CALLDATALOAD SWAP1 PUSH1 0xC0 ADD CALLDATALOAD PUSH2 0x19CE JUMP JUMPDEST PUSH2 0x300 PUSH1 0x4 DUP1 CALLDATASIZE SUB PUSH1 0x40 DUP2 LT ISZERO PUSH2 0x5FC JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 CALLDATALOAD DUP2 AND SWAP2 PUSH1 0x20 ADD CALLDATALOAD AND PUSH2 0x1C84 JUMP JUMPDEST PUSH2 0x3BE PUSH2 0x1CA1 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0xA DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x42616B657279204C507300000000000000000000000000000000000000000000 DUP2 MSTORE POP DUP2 JUMP JUMPDEST PUSH1 0x8 SLOAD PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP3 AND SWAP3 PUSH15 0x10000000000000000000000000000 DUP4 DIV SWAP1 SWAP2 AND SWAP2 PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV PUSH4 0xFFFFFFFF AND SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x6C4 CALLER DUP5 DUP5 PUSH2 0x1E87 JUMP JUMPDEST POP PUSH1 0x1 JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x6 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP JUMPDEST PUSH1 0x0 SLOAD DUP2 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 CALLER DUP5 MSTORE SWAP1 SWAP2 MSTORE DUP2 KECCAK256 SLOAD PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF EQ PUSH2 0x7BA JUMPI PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP5 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 CALLER DUP5 MSTORE SWAP1 SWAP2 MSTORE SWAP1 KECCAK256 SLOAD PUSH2 0x788 SWAP1 DUP4 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP6 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 CALLER DUP5 MSTORE SWAP1 SWAP2 MSTORE SWAP1 KECCAK256 SSTORE JUMPDEST PUSH2 0x7C5 DUP5 DUP5 DUP5 PUSH2 0x1F3F JUMP JUMPDEST POP PUSH1 0x1 SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH32 0x6E71EDAE12B1B97F4D1F60370FEF10105FA2FAAE0126114A169C64845D6126C9 DUP2 JUMP JUMPDEST PUSH1 0x12 DUP2 JUMP JUMPDEST PUSH1 0x3 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x5 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND CALLER EQ PUSH2 0x884 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x19 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A20464F5242494444454E00000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x6 DUP1 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP4 DUP5 AND PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFF0000000000000000000000000000000000000000 SWAP2 DUP3 AND OR SWAP1 SWAP2 SSTORE PUSH1 0x7 DUP1 SLOAD SWAP3 SWAP1 SWAP4 AND SWAP2 AND OR SWAP1 SSTORE JUMP JUMPDEST PUSH1 0x9 SLOAD DUP2 JUMP JUMPDEST PUSH1 0xA SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 PUSH1 0xC SLOAD PUSH1 0x1 EQ PUSH2 0x956 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x16 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204C4F434B454400000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0xC DUP2 SWAP1 SSTORE DUP1 PUSH2 0x966 PUSH2 0x662 JUMP JUMPDEST POP PUSH1 0x6 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP4 SWAP6 POP SWAP2 SWAP4 POP PUSH1 0x0 SWAP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP1 SWAP2 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x9E0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x9F4 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0xA0A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x7 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP3 SWAP4 POP PUSH1 0x0 SWAP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP1 SWAP3 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0xA83 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0xA97 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0xAAD JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD SWAP1 POP PUSH1 0x0 PUSH2 0xAD3 DUP4 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP8 AND PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH2 0xAF7 DUP4 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP8 AND PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH2 0xB05 DUP8 DUP8 PUSH2 0x2020 JUMP JUMPDEST PUSH1 0x0 SLOAD SWAP1 SWAP2 POP DUP1 PUSH2 0xB4E JUMPI PUSH2 0xB3A PUSH2 0x3E8 PUSH2 0xB2E PUSH2 0xB29 DUP8 DUP8 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST PUSH2 0x221F JUMP JUMPDEST SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST SWAP9 POP PUSH2 0xB49 PUSH1 0x0 PUSH2 0x3E8 PUSH2 0x2271 JUMP JUMPDEST PUSH2 0xBAB JUMP JUMPDEST PUSH2 0xBA8 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP10 AND PUSH2 0xB72 DUP7 DUP5 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST DUP2 PUSH2 0xB79 JUMPI INVALID JUMPDEST DIV PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP10 AND PUSH2 0xB9B DUP7 DUP6 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST DUP2 PUSH2 0xBA2 JUMPI INVALID JUMPDEST DIV PUSH2 0x2321 JUMP JUMPDEST SWAP9 POP JUMPDEST PUSH1 0x0 DUP10 GT PUSH2 0xC04 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x2D DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2A50 PUSH1 0x2D SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0xC0E DUP11 DUP11 PUSH2 0x2271 JUMP JUMPDEST PUSH2 0xC1A DUP7 DUP7 DUP11 DUP11 PUSH2 0x2337 JUMP JUMPDEST DUP2 ISZERO PUSH2 0xC5C JUMPI PUSH1 0x8 SLOAD PUSH2 0xC58 SWAP1 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP3 AND SWAP2 PUSH15 0x10000000000000000000000000000 SWAP1 DIV AND PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST PUSH1 0xB SSTORE JUMPDEST PUSH1 0x40 DUP1 MLOAD DUP6 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP6 SWAP1 MSTORE DUP2 MLOAD CALLER SWAP3 PUSH32 0x4C209B5FC8AD50758F13E2E1088BA56A560DFF690A1C6FEF26394F4C03821C4F SWAP3 DUP3 SWAP1 SUB ADD SWAP1 LOG2 POP POP PUSH1 0x1 PUSH1 0xC SSTORE POP SWAP5 SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0xC SLOAD PUSH1 0x1 EQ PUSH2 0xD1A JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x16 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204C4F434B454400000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0xC SSTORE DUP3 ISZERO ISZERO DUP1 PUSH2 0xD2D JUMPI POP PUSH1 0x0 DUP3 GT JUMPDEST PUSH2 0xD82 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x2A DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2A7D PUSH1 0x2A SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 DUP1 PUSH2 0xD8D PUSH2 0x662 JUMP JUMPDEST POP SWAP2 POP SWAP2 POP DUP2 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP6 LT DUP1 ISZERO PUSH2 0xDC0 JUMPI POP DUP1 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP5 LT JUMPDEST PUSH2 0xE15 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x26 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2AF2 PUSH1 0x26 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x6 SLOAD PUSH1 0x7 SLOAD PUSH1 0x0 SWAP2 DUP3 SWAP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP2 DUP3 AND SWAP2 SWAP1 DUP2 AND SWAP1 DUP8 AND DUP3 EQ DUP1 ISZERO SWAP1 PUSH2 0xE7A JUMPI POP DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP8 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO JUMPDEST PUSH2 0xEE5 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1A PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A20494E56414C49445F544F000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST DUP9 ISZERO PUSH2 0xEF6 JUMPI PUSH2 0xEF6 DUP3 DUP9 DUP12 PUSH2 0x25F3 JUMP JUMPDEST DUP8 ISZERO PUSH2 0xF07 JUMPI PUSH2 0xF07 DUP2 DUP9 DUP11 PUSH2 0x25F3 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP5 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0xF73 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0xF87 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0xF9D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP2 SWAP6 POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x100F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x1023 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x1039 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD SWAP3 POP PUSH1 0x0 SWAP2 POP POP PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP6 AND DUP9 SWAP1 SUB DUP4 GT PUSH2 0x1063 JUMPI PUSH1 0x0 PUSH2 0x1079 JUMP JUMPDEST DUP8 DUP6 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SUB DUP4 SUB JUMPDEST SWAP1 POP PUSH1 0x0 DUP8 DUP6 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SUB DUP4 GT PUSH2 0x109D JUMPI PUSH1 0x0 PUSH2 0x10B3 JUMP JUMPDEST DUP8 DUP6 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SUB DUP4 SUB JUMPDEST SWAP1 POP PUSH1 0x0 DUP3 GT DUP1 PUSH2 0x10C4 JUMPI POP PUSH1 0x0 DUP2 GT JUMPDEST PUSH2 0x1119 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x29 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2AA7 PUSH1 0x29 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH2 0x1141 PUSH2 0x112F DUP5 PUSH1 0x3 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST PUSH2 0xB2E DUP8 PUSH2 0x3E8 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH2 0x1159 PUSH2 0x112F DUP5 PUSH1 0x3 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 POP PUSH2 0x1191 PUSH3 0xF4240 PUSH2 0x1185 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP12 DUP2 AND SWAP1 DUP12 AND PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST PUSH2 0x11A1 DUP4 DUP4 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST LT ISZERO PUSH2 0x120E JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x11 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204B000000000000000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST POP POP PUSH2 0x121C DUP5 DUP5 DUP9 DUP9 PUSH2 0x2337 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD DUP4 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP4 SWAP1 MSTORE DUP1 DUP3 ADD DUP12 SWAP1 MSTORE PUSH1 0x60 DUP2 ADD DUP11 SWAP1 MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP10 AND SWAP2 CALLER SWAP2 PUSH32 0xD78AD95FA46C994B6551D0DA85FC275FE613CE37657FB8D5E3D130840159D822 SWAP2 DUP2 SWAP1 SUB PUSH1 0x80 ADD SWAP1 LOG3 POP POP PUSH1 0x1 PUSH1 0xC SSTORE POP POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD DUP2 JUMP JUMPDEST PUSH1 0xB SLOAD DUP2 JUMP JUMPDEST PUSH1 0x4 PUSH1 0x20 MSTORE PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD DUP2 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0xC SLOAD PUSH1 0x1 EQ PUSH2 0x132B JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x16 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204C4F434B454400000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0xC DUP2 SWAP1 SSTORE DUP1 PUSH2 0x133B PUSH2 0x662 JUMP JUMPDEST POP PUSH1 0x6 SLOAD PUSH1 0x7 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP5 SWAP7 POP SWAP3 SWAP5 POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP2 DUP3 AND SWAP4 SWAP2 AND SWAP2 PUSH1 0x0 SWAP2 DUP5 SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x13BD JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x13D1 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x13E7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP2 SWAP3 POP PUSH1 0x0 SWAP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP6 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x145B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x146F JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x1485 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD ADDRESS PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 SLOAD SWAP2 SWAP3 POP PUSH2 0x14A4 DUP9 DUP9 PUSH2 0x2020 JUMP JUMPDEST PUSH1 0x0 SLOAD SWAP1 SWAP2 POP DUP1 PUSH2 0x14BB DUP5 DUP8 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST DUP2 PUSH2 0x14C2 JUMPI INVALID JUMPDEST DIV SWAP11 POP DUP1 PUSH2 0x14D6 DUP5 DUP7 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST DUP2 PUSH2 0x14DD JUMPI INVALID JUMPDEST DIV SWAP10 POP PUSH1 0x0 DUP12 GT DUP1 ISZERO PUSH2 0x14F0 JUMPI POP PUSH1 0x0 DUP11 GT JUMPDEST PUSH2 0x1545 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x2D DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2B39 PUSH1 0x2D SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x154F ADDRESS DUP5 PUSH2 0x2800 JUMP JUMPDEST PUSH2 0x155A DUP8 DUP14 DUP14 PUSH2 0x25F3 JUMP JUMPDEST PUSH2 0x1565 DUP7 DUP14 DUP13 PUSH2 0x25F3 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP10 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x15D1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x15E5 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x15FB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD SWAP2 SWAP7 POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP9 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x166D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x1681 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x1697 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD SWAP4 POP PUSH2 0x16A7 DUP6 DUP6 DUP12 DUP12 PUSH2 0x2337 JUMP JUMPDEST DUP2 ISZERO PUSH2 0x16E9 JUMPI PUSH1 0x8 SLOAD PUSH2 0x16E5 SWAP1 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP3 AND SWAP2 PUSH15 0x10000000000000000000000000000 SWAP1 DIV AND PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST PUSH1 0xB SSTORE JUMPDEST PUSH1 0x40 DUP1 MLOAD DUP13 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP13 SWAP1 MSTORE DUP2 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP16 AND SWAP3 CALLER SWAP3 PUSH32 0xDCCD412F0B1252819CB1FD330B93224CA42612892BB3F4F789976E6D81936496 SWAP3 SWAP1 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 LOG3 POP POP POP POP POP POP POP POP POP PUSH1 0x1 PUSH1 0xC DUP2 SWAP1 SSTORE POP SWAP2 POP SWAP2 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x3 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x424C500000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP DUP2 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x6C4 CALLER DUP5 DUP5 PUSH2 0x1F3F JUMP JUMPDEST PUSH2 0x3E8 DUP2 JUMP JUMPDEST PUSH1 0xC SLOAD PUSH1 0x1 EQ PUSH2 0x1811 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x16 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204C4F434B454400000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0xC SSTORE PUSH1 0x6 SLOAD PUSH1 0x7 SLOAD PUSH1 0x8 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP5 DUP6 AND SWAP5 SWAP1 SWAP4 AND SWAP3 PUSH2 0x18ED SWAP3 DUP6 SWAP3 DUP8 SWAP3 PUSH2 0x18E8 SWAP3 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP2 DUP6 SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x18B0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x18C4 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x18DA JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH2 0x25F3 JUMP JUMPDEST PUSH1 0x8 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH2 0x198C SWAP3 DUP5 SWAP3 DUP8 SWAP3 PUSH2 0x18E8 SWAP3 PUSH15 0x10000000000000000000000000000 SWAP1 DIV PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP7 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x18B0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP POP PUSH1 0x1 PUSH1 0xC SSTORE POP JUMP JUMPDEST PUSH1 0x5 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 JUMP JUMPDEST TIMESTAMP DUP5 LT ISZERO PUSH2 0x1A3D JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x18 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B6572795377617042455032303A20455850495245440000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x3 SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP10 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x4 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 DUP1 SLOAD PUSH1 0x1 DUP1 DUP3 ADD SWAP1 SWAP3 SSTORE DUP3 MLOAD PUSH32 0x6E71EDAE12B1B97F4D1F60370FEF10105FA2FAAE0126114A169C64845D6126C9 DUP2 DUP7 ADD MSTORE DUP1 DUP5 ADD SWAP7 SWAP1 SWAP7 MSTORE SWAP6 DUP14 AND PUSH1 0x60 DUP7 ADD MSTORE PUSH1 0x80 DUP6 ADD DUP13 SWAP1 MSTORE PUSH1 0xA0 DUP6 ADD SWAP6 SWAP1 SWAP6 MSTORE PUSH1 0xC0 DUP1 DUP6 ADD DUP12 SWAP1 MSTORE DUP2 MLOAD DUP1 DUP7 SUB SWAP1 SWAP2 ADD DUP2 MSTORE PUSH1 0xE0 DUP6 ADD DUP3 MSTORE DUP1 MLOAD SWAP1 DUP4 ADD KECCAK256 PUSH32 0x1901000000000000000000000000000000000000000000000000000000000000 PUSH2 0x100 DUP7 ADD MSTORE PUSH2 0x102 DUP6 ADD SWAP7 SWAP1 SWAP7 MSTORE PUSH2 0x122 DUP1 DUP6 ADD SWAP7 SWAP1 SWAP7 MSTORE DUP1 MLOAD DUP1 DUP6 SUB SWAP1 SWAP7 ADD DUP7 MSTORE PUSH2 0x142 DUP5 ADD DUP1 DUP3 MSTORE DUP7 MLOAD SWAP7 DUP4 ADD SWAP7 SWAP1 SWAP7 KECCAK256 SWAP6 DUP4 SWAP1 MSTORE PUSH2 0x162 DUP5 ADD DUP1 DUP3 MSTORE DUP7 SWAP1 MSTORE PUSH1 0xFF DUP10 AND PUSH2 0x182 DUP6 ADD MSTORE PUSH2 0x1A2 DUP5 ADD DUP9 SWAP1 MSTORE PUSH2 0x1C2 DUP5 ADD DUP8 SWAP1 MSTORE MLOAD SWAP2 SWAP4 SWAP3 PUSH2 0x1E2 DUP1 DUP3 ADD SWAP4 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0 DUP2 ADD SWAP3 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 DUP6 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x1B9E JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP PUSH1 0x40 MLOAD PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0 ADD MLOAD SWAP2 POP POP PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP2 AND ISZERO DUP1 ISZERO SWAP1 PUSH2 0x1C19 JUMPI POP DUP9 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ JUMPDEST PUSH2 0x1C6E JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x22 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2AD0 PUSH1 0x22 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x1C79 DUP10 DUP10 DUP10 PUSH2 0x1E87 JUMP JUMPDEST POP POP POP POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x2 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x0 SWAP3 DUP4 MSTORE PUSH1 0x40 DUP1 DUP5 KECCAK256 SWAP1 SWAP2 MSTORE SWAP1 DUP3 MSTORE SWAP1 KECCAK256 SLOAD DUP2 JUMP JUMPDEST PUSH1 0xC SLOAD PUSH1 0x1 EQ PUSH2 0x1D12 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x16 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204C4F434B454400000000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0xC SSTORE PUSH1 0x6 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH2 0x1E80 SWAP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP4 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x1D89 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x1D9D JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x1DB3 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x7 SLOAD PUSH1 0x40 DUP1 MLOAD PUSH32 0x70A0823100000000000000000000000000000000000000000000000000000000 DUP2 MSTORE ADDRESS PUSH1 0x4 DUP3 ADD MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP1 SWAP3 AND SWAP2 PUSH4 0x70A08231 SWAP2 PUSH1 0x24 DUP1 DUP3 ADD SWAP3 PUSH1 0x20 SWAP3 SWAP1 SWAP2 SWAP1 DUP3 SWAP1 SUB ADD DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x1E26 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x1E3A JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x1E50 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0x8 SLOAD PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP3 AND SWAP2 PUSH15 0x10000000000000000000000000000 SWAP1 DIV AND PUSH2 0x2337 JUMP JUMPDEST PUSH1 0x1 PUSH1 0xC SSTORE JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP5 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP5 DUP8 AND DUP1 DUP5 MSTORE SWAP5 DUP3 MSTORE SWAP2 DUP3 SWAP1 KECCAK256 DUP6 SWAP1 SSTORE DUP2 MLOAD DUP6 DUP2 MSTORE SWAP2 MLOAD PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 SWAP3 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1F38 DUP4 DUP4 PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x1E DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x536166654D6174683A207375627472616374696F6E206F766572666C6F770000 DUP2 MSTORE POP PUSH2 0x28C5 JUMP JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH2 0x1F75 SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP6 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP1 DUP3 KECCAK256 SWAP4 SWAP1 SWAP4 SSTORE SWAP1 DUP5 AND DUP2 MSTORE KECCAK256 SLOAD PUSH2 0x1FB7 SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x2976 AND JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP1 DUP5 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP2 DUP3 SWAP1 KECCAK256 SWAP5 SWAP1 SWAP5 SSTORE DUP1 MLOAD DUP6 DUP2 MSTORE SWAP1 MLOAD SWAP2 SWAP4 SWAP3 DUP8 AND SWAP3 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 SWAP2 DUP3 SWAP1 SUB ADD SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x5 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x17E7E58 PUSH1 0x40 MLOAD DUP2 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 DUP7 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x208B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x209F JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x20B5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD PUSH1 0xB SLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND ISZERO DUP1 ISZERO SWAP5 POP SWAP2 SWAP3 POP SWAP1 PUSH2 0x2198 JUMPI DUP1 ISZERO PUSH2 0x2193 JUMPI PUSH1 0x0 PUSH2 0x210C PUSH2 0xB29 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP9 DUP2 AND SWAP1 DUP9 AND PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH2 0x2119 DUP4 PUSH2 0x221F JUMP JUMPDEST SWAP1 POP DUP1 DUP3 GT ISZERO PUSH2 0x2190 JUMPI PUSH1 0x0 PUSH2 0x2147 PUSH2 0x2138 DUP5 DUP5 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH1 0x0 SLOAD SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH2 0x216C DUP4 PUSH2 0x2160 DUP7 PUSH1 0x5 PUSH4 0xFFFFFFFF PUSH2 0x21AC AND JUMP JUMPDEST SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x2976 AND JUMP JUMPDEST SWAP1 POP PUSH1 0x0 DUP2 DUP4 DUP2 PUSH2 0x2179 JUMPI INVALID JUMPDEST DIV SWAP1 POP DUP1 ISZERO PUSH2 0x218C JUMPI PUSH2 0x218C DUP8 DUP3 PUSH2 0x2271 JUMP JUMPDEST POP POP POP JUMPDEST POP POP JUMPDEST PUSH2 0x21A4 JUMP JUMPDEST DUP1 ISZERO PUSH2 0x21A4 JUMPI PUSH1 0x0 PUSH1 0xB SSTORE JUMPDEST POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH2 0x21BB JUMPI POP PUSH1 0x0 PUSH2 0x6C8 JUMP JUMPDEST DUP3 DUP3 MUL DUP3 DUP5 DUP3 DUP2 PUSH2 0x21C8 JUMPI INVALID JUMPDEST DIV EQ PUSH2 0x1F38 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE PUSH1 0x21 DUP2 MSTORE PUSH1 0x20 ADD DUP1 PUSH2 0x2B18 PUSH1 0x21 SWAP2 CODECOPY PUSH1 0x40 ADD SWAP2 POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x3 DUP3 GT ISZERO PUSH2 0x2262 JUMPI POP DUP1 PUSH1 0x1 PUSH1 0x2 DUP3 DIV ADD JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0x225C JUMPI DUP1 SWAP2 POP PUSH1 0x2 DUP2 DUP3 DUP6 DUP2 PUSH2 0x224B JUMPI INVALID JUMPDEST DIV ADD DUP2 PUSH2 0x2254 JUMPI INVALID JUMPDEST DIV SWAP1 POP PUSH2 0x2234 JUMP JUMPDEST POP PUSH2 0x226C JUMP JUMPDEST DUP2 ISZERO PUSH2 0x226C JUMPI POP PUSH1 0x1 JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 SLOAD PUSH2 0x2284 SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x2976 AND JUMP JUMPDEST PUSH1 0x0 SWAP1 DUP2 SSTORE PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH2 0x22BC SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x2976 AND JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 SWAP1 DUP2 MSTORE PUSH1 0x40 DUP1 DUP4 KECCAK256 SWAP5 SWAP1 SWAP5 SSTORE DUP4 MLOAD DUP6 DUP2 MSTORE SWAP4 MLOAD SWAP3 SWAP4 SWAP2 SWAP3 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP3 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 DUP4 LT PUSH2 0x2330 JUMPI DUP2 PUSH2 0x1F38 JUMP JUMPDEST POP SWAP1 SWAP2 SWAP1 POP JUMP JUMPDEST PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP5 GT DUP1 ISZERO SWAP1 PUSH2 0x2363 JUMPI POP PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 GT ISZERO JUMPDEST PUSH2 0x23CE JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x18 PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A204F564552464C4F570000000000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH1 0x8 SLOAD PUSH4 0xFFFFFFFF TIMESTAMP DUP2 AND SWAP2 PUSH29 0x100000000000000000000000000000000000000000000000000000000 SWAP1 DIV DUP2 AND DUP3 SUB SWAP1 DUP2 AND ISZERO DUP1 ISZERO SWAP1 PUSH2 0x241E JUMPI POP PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP5 AND ISZERO ISZERO JUMPDEST DUP1 ISZERO PUSH2 0x2439 JUMPI POP PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND ISZERO ISZERO JUMPDEST ISZERO PUSH2 0x24E9 JUMPI DUP1 PUSH4 0xFFFFFFFF AND PUSH2 0x247C DUP6 PUSH2 0x2452 DUP7 PUSH2 0x29EA JUMP JUMPDEST PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 PUSH4 0xFFFFFFFF PUSH2 0x2A0E AND JUMP JUMPDEST PUSH1 0x9 DUP1 SLOAD PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP3 SWAP1 SWAP3 AND SWAP3 SWAP1 SWAP3 MUL ADD SWAP1 SSTORE PUSH4 0xFFFFFFFF DUP2 AND PUSH2 0x24BC DUP5 PUSH2 0x2452 DUP8 PUSH2 0x29EA JUMP JUMPDEST PUSH1 0xA DUP1 SLOAD PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SWAP3 SWAP1 SWAP3 AND SWAP3 SWAP1 SWAP3 MUL ADD SWAP1 SSTORE JUMPDEST PUSH1 0x8 DUP1 SLOAD PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000000000000000000000000000 AND PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP9 DUP2 AND SWAP2 SWAP1 SWAP2 OR PUSH32 0xFFFFFFFF0000000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH15 0x10000000000000000000000000000 DUP9 DUP4 AND DUP2 MUL SWAP2 SWAP1 SWAP2 OR PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH29 0x100000000000000000000000000000000000000000000000000000000 PUSH4 0xFFFFFFFF DUP8 AND MUL OR SWAP3 DUP4 SWAP1 SSTORE PUSH1 0x40 DUP1 MLOAD DUP5 DUP5 AND DUP2 MSTORE SWAP2 SWAP1 SWAP4 DIV SWAP1 SWAP2 AND PUSH1 0x20 DUP3 ADD MSTORE DUP2 MLOAD PUSH32 0x1C411E9A96E071241C2F21F7726B17AE89E3CAB4C78BE50E062B03A9FFFBBAD1 SWAP3 SWAP2 DUP2 SWAP1 SUB SWAP1 SWAP2 ADD SWAP1 LOG1 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD DUP1 DUP3 ADD DUP3 MSTORE PUSH1 0x19 DUP2 MSTORE PUSH32 0x7472616E7366657228616464726573732C75696E743235362900000000000000 PUSH1 0x20 SWAP2 DUP3 ADD MSTORE DUP2 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP6 DUP2 AND PUSH1 0x24 DUP4 ADD MSTORE PUSH1 0x44 DUP1 DUP4 ADD DUP7 SWAP1 MSTORE DUP5 MLOAD DUP1 DUP5 SUB SWAP1 SWAP2 ADD DUP2 MSTORE PUSH1 0x64 SWAP1 SWAP3 ADD DUP5 MSTORE SWAP2 DUP2 ADD DUP1 MLOAD PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xA9059CBB00000000000000000000000000000000000000000000000000000000 OR DUP2 MSTORE SWAP3 MLOAD DUP2 MLOAD PUSH1 0x0 SWAP5 PUSH1 0x60 SWAP5 DUP10 AND SWAP4 SWAP3 SWAP2 DUP3 SWAP2 SWAP1 DUP1 DUP4 DUP4 JUMPDEST PUSH1 0x20 DUP4 LT PUSH2 0x26F9 JUMPI DUP1 MLOAD DUP3 MSTORE PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE0 SWAP1 SWAP3 ADD SWAP2 PUSH1 0x20 SWAP2 DUP3 ADD SWAP2 ADD PUSH2 0x26BC JUMP JUMPDEST PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB DUP1 NOT DUP3 MLOAD AND DUP2 DUP5 MLOAD AND DUP1 DUP3 OR DUP6 MSTORE POP POP POP POP POP POP SWAP1 POP ADD SWAP2 POP POP PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP7 GAS CALL SWAP2 POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x275B JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x2760 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP SWAP2 POP SWAP2 POP DUP2 DUP1 ISZERO PUSH2 0x278E JUMPI POP DUP1 MLOAD ISZERO DUP1 PUSH2 0x278E JUMPI POP DUP1 DUP1 PUSH1 0x20 ADD SWAP1 MLOAD PUSH1 0x20 DUP2 LT ISZERO PUSH2 0x278B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP MLOAD JUMPDEST PUSH2 0x27F9 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1F PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x42616B65727953776170506169723A205452414E534645525F4641494C454400 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST POP POP POP POP POP JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH2 0x2836 SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP4 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 SWAP2 SWAP1 SWAP2 SSTORE SLOAD PUSH2 0x2870 SWAP1 DUP3 PUSH4 0xFFFFFFFF PUSH2 0x1EF6 AND JUMP JUMPDEST PUSH1 0x0 SWAP1 DUP2 SSTORE PUSH1 0x40 DUP1 MLOAD DUP4 DUP2 MSTORE SWAP1 MLOAD PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP6 AND SWAP2 PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF SWAP2 SWAP1 DUP2 SWAP1 SUB PUSH1 0x20 ADD SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 DUP5 DUP5 GT ISZERO PUSH2 0x296E JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x2933 JUMPI DUP2 DUP2 ADD MLOAD DUP4 DUP3 ADD MSTORE PUSH1 0x20 ADD PUSH2 0x291B JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH2 0x2960 JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST POP POP POP SWAP1 SUB SWAP1 JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 ADD DUP4 DUP2 LT ISZERO PUSH2 0x1F38 JUMPI PUSH1 0x40 DUP1 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1B PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x536166654D6174683A206164646974696F6E206F766572666C6F770000000000 PUSH1 0x44 DUP3 ADD MSTORE SWAP1 MLOAD SWAP1 DUP2 SWAP1 SUB PUSH1 0x64 ADD SWAP1 REVERT JUMPDEST PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH15 0x10000000000000000000000000000 MUL SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH14 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP5 AND DUP2 PUSH2 0x2A47 JUMPI INVALID JUMPDEST DIV SWAP4 SWAP3 POP POP POP JUMP INVALID TIMESTAMP PUSH2 0x6B65 PUSH19 0x7953776170506169723A20494E535546464943 0x49 GASLIMIT 0x4E SLOAD 0x5F 0x4C 0x49 MLOAD SSTORE 0x49 DIFFICULTY 0x49 SLOAD MSIZE 0x5F 0x4D 0x49 0x4E SLOAD GASLIMIT DIFFICULTY TIMESTAMP PUSH2 0x6B65 PUSH19 0x7953776170506169723A20494E535546464943 0x49 GASLIMIT 0x4E SLOAD 0x5F 0x4F SSTORE SLOAD POP SSTORE SLOAD 0x5F COINBASE 0x4D 0x4F SSTORE 0x4E SLOAD TIMESTAMP PUSH2 0x6B65 PUSH19 0x7953776170506169723A20494E535546464943 0x49 GASLIMIT 0x4E SLOAD 0x5F 0x49 0x4E POP SSTORE SLOAD 0x5F COINBASE 0x4D 0x4F SSTORE 0x4E SLOAD TIMESTAMP PUSH2 0x6B65 PUSH19 0x795377617042455032303A20494E56414C4944 0x5F MSTORE8 0x49 SELFBALANCE 0x4E COINBASE SLOAD SSTORE MSTORE GASLIMIT TIMESTAMP PUSH2 0x6B65 PUSH19 0x7953776170506169723A20494E535546464943 0x49 GASLIMIT 0x4E SLOAD 0x5F 0x4C 0x49 MLOAD SSTORE 0x49 DIFFICULTY 0x49 SLOAD MSIZE MSTORE8 PUSH2 0x6665 0x4D PUSH2 0x7468 GASPRICE KECCAK256 PUSH14 0x756C7469706C69636174696F6E20 PUSH16 0x766572666C6F7742616B657279537761 PUSH17 0x506169723A20494E53554646494349454E SLOAD 0x5F 0x4C 0x49 MLOAD SSTORE 0x49 DIFFICULTY 0x49 SLOAD MSIZE 0x5F TIMESTAMP SSTORE MSTORE 0x4E GASLIMIT DIFFICULTY LOG2 PUSH6 0x627A7A723158 KECCAK256 0xA6 POP PUSH32 0xDFB8085D6A2C98676353425072170469F2AD9D8B6FFCABACD193CE769864736F PUSH13 0x63430005100032000000000000 ",
		sourceMap: "258:9793:4:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;258:9793:4;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;224:42:2;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8:100:-1;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;224:42:2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1256:301:4;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2306:147:2;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;2306:147:2;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;568:21:4;;;:::i;:::-;;;;;;;;;;;;;;;;;;;356:26:2;;;:::i;:::-;;;;;;;;;;;;;;;;2604:331;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;2604:331:2;;;;;;;;;;;;;;;;;;:::i;650:108::-;;;:::i;315:35::-;;;:::i;:::-;;;;;;;;;;;;;;;;;;;509:31;;;:::i;2424:211:4:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;2424:211:4;;;;;;;;;;;:::i;:::-;;891:35;;;:::i;932:::-;;;:::i;4664:1255::-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;4664:1255:4;;;;:::i;7546:1926::-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;7546:1926:4;;;;;;;;;;;;;;:::i;388:44:2:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;388:44:2;;;;:::i;973:20:4:-;;;:::i;764:41:2:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;764:41:2;;;;:::i;6028:1409:4:-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;6028:1409:4;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;272:37:2;;;:::i;2459:139::-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;2459:139:2;;;;;;;;;:::i;390:49:4:-;;;:::i;9518:329::-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;9518:329:4;;;;:::i;540:22::-;;;:::i;595:21::-;;;:::i;2941:742:2:-;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;-1:-1;2941:742:2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;438:64::-;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;438:64:2;;;;;;;;;;;:::i;9893:156:4:-;;;:::i;224:42:2:-;;;;;;;;;;;;;;;;;;;:::o;1256:301:4:-;1462:8;;;;;;;1492;;;;;;;1532:18;;;;;;1256:301::o;2306:147:2:-;2373:4;2389:36;2398:10;2410:7;2419:5;2389:8;:36::i;:::-;-1:-1:-1;2442:4:2;2306:147;;;;;:::o;568:21:4:-;;;;;;:::o;356:26:2:-;;;;:::o;2604:331::-;2735:15;;;2715:4;2735:15;;;:9;:15;;;;;;;;2751:10;2735:27;;;;;;;;2774:2;2735:42;2731:141;;2823:15;;;;;;;:9;:15;;;;;;;;2839:10;2823:27;;;;;;;;:38;;2855:5;2823:38;:31;:38;:::i;:::-;2793:15;;;;;;;:9;:15;;;;;;;;2809:10;2793:27;;;;;;;:68;2731:141;2881:26;2891:4;2897:2;2901:5;2881:9;:26::i;:::-;-1:-1:-1;2924:4:2;2604:331;;;;;:::o;650:108::-;692:66;650:108;:::o;315:35::-;348:2;315:35;:::o;509:31::-;;;;:::o;2424:211:4:-;2519:7;;;;2505:10;:21;2497:59;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2586:6;:16;;;;;;;;;;;;;;2612:6;:16;;;;;;;;;;;2424:211::o;891:35::-;;;;:::o;932:::-;;;;:::o;4664:1255::-;4713:17;1148:8;;1160:1;1148:13;1140:48;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1209:1;1198:8;:12;;;1209:1;4785:13;:11;:13::i;:::-;-1:-1:-1;4849:6:4;;4842:39;;;;;;4875:4;4842:39;;;;;;4742:56;;-1:-1:-1;4742:56:4;;-1:-1:-1;4823:16:4;;4849:6;;;;;4842:24;;:39;;;;;;;;;;;;;;4849:6;4842:39;;;5:2:-1;;;;30:1;27;20:12;5:2;4842:39:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;4842:39:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;4842:39:4;4917:6;;4910:39;;;;;;4943:4;4910:39;;;;;;4842;;-1:-1:-1;4891:16:4;;4917:6;;;;;4910:24;;:39;;;;;4842;;4910;;;;;;;;4917:6;4910:39;;;5:2:-1;;;;30:1;27;20:12;5:2;4910:39:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;4910:39:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;4910:39:4;;-1:-1:-1;4959:15:4;4977:23;:8;:23;;;;:12;:23;:::i;:::-;4959:41;-1:-1:-1;5010:15:4;5028:23;:8;:23;;;;:12;:23;:::i;:::-;5010:41;;5062:10;5075:30;5084:9;5095;5075:8;:30::i;:::-;5115:20;5138:11;5062:43;;-1:-1:-1;5241:17:4;5237:356;;5286:58;434:5;5286:35;5300:20;:7;5312;5300:20;:11;:20;:::i;:::-;5286:13;:35::i;:::-;:39;:58;:39;:58;:::i;:::-;5274:70;;5358:36;5372:1;434:5;5358;:36::i;:::-;5237:356;;;5492:90;5505:37;;;:25;:7;5517:12;5505:25;:11;:25;:::i;:::-;:37;;;;;;5544;;;:25;:7;5556:12;5544:25;:11;:25;:::i;:::-;:37;;;;;;5492:12;:90::i;:::-;5480:102;;5237:356;5622:1;5610:9;:13;5602:71;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5683:20;5689:2;5693:9;5683:5;:20::i;:::-;5714:49;5722:8;5732;5742:9;5753;5714:7;:49::i;:::-;5777:5;5773:50;;;5814:8;;5792:31;;5814:8;5800;;;;5814;;;;5792:31;:21;:31;:::i;:::-;5784:5;:39;5773:50;5878:34;;;;;;;;;;;;;;5883:10;;5878:34;;;;;;;;-1:-1:-1;;1242:1:4;1231:8;:12;-1:-1:-1;4664:1255:4;;;-1:-1:-1;;;;;;4664:1255:4:o;7546:1926::-;1148:8;;1160:1;1148:13;1140:48;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1209:1;1198:8;:12;7674:14;;;;:32;;;7705:1;7692:10;:14;7674:32;7666:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7764:17;7783;7806:13;:11;:13::i;:::-;7763:56;;;;;7865:9;7852:22;;:10;:22;:48;;;;;7891:9;7878:22;;:10;:22;7852:48;7844:99;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8105:6;;8143;;7954:16;;;;8105:6;;;;;8143;;;;8171:13;;;;;;;:30;;;8194:7;8188:13;;:2;:13;;;;8171:30;8163:69;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8250:14;;8246:58;;8266:38;8280:7;8289:2;8293:10;8266:13;:38::i;:::-;8356:14;;8352:58;;8372:38;8386:7;8395:2;8399:10;8372:13;:38::i;:::-;8469:40;;;;;;8503:4;8469:40;;;;;;:25;;;;;;:40;;;;;;;;;;;;;;:25;:40;;;5:2:-1;;;;30:1;27;20:12;5:2;8469:40:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;8469:40:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;8469:40:4;8534;;;;;;8568:4;8534:40;;;;;;8469;;-1:-1:-1;8534:25:4;;;;;;:40;;;;;8469;;8534;;;;;;;;:25;:40;;;5:2:-1;;;;30:1;27;20:12;5:2;8534:40:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;8534:40:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;8534:40:4;;-1:-1:-1;8594:17:4;;-1:-1:-1;;8625:22:4;;;;;;8614:33;;:75;;8688:1;8614:75;;;8674:10;8662:9;:22;;;8650:8;:35;8614:75;8594:95;;8699:17;8742:10;8730:9;:22;;;8719:8;:33;:75;;8793:1;8719:75;;;8779:10;8767:9;:22;;;8755:8;:35;8719:75;8699:95;;8824:1;8812:9;:13;:30;;;;8841:1;8829:9;:13;8812:30;8804:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;8988:24;9015:40;9038:16;:9;9052:1;9038:16;:13;:16;:::i;:::-;9015:18;:8;9028:4;9015:18;:12;:18;:::i;:40::-;8988:67;-1:-1:-1;9069:24:4;9096:40;9119:16;:9;9133:1;9119:16;:13;:16;:::i;9096:40::-;9069:67;-1:-1:-1;9217:46:4;9255:7;9217:33;;:18;;;;:33;;;:22;:33;:::i;:::-;:37;:46;:37;:46;:::i;:::-;9175:38;:16;9196;9175:38;:20;:38;:::i;:::-;:88;;9150:164;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1220:1;;9335:49;9343:8;9353;9363:9;9374;9335:7;:49::i;:::-;9399:66;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;9404:10;;9399:66;;;;;;;;;-1:-1:-1;;1242:1:4;1231:8;:12;-1:-1:-1;;;;;;;7546:1926:4:o;388:44:2:-;;;;;;;;;;;;;:::o;973:20:4:-;;;;:::o;764:41:2:-;;;;;;;;;;;;;:::o;6028:1409:4:-;6077:15;6094;1148:8;;1160:1;1148:13;1140:48;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1209:1;1198:8;:12;;;1209:1;6164:13;:11;:13::i;:::-;-1:-1:-1;6220:6:4;;6269;;6319:40;;;;;;6353:4;6319:40;;;;;;6121:56;;-1:-1:-1;6121:56:4;;-1:-1:-1;6220:6:4;;;;;6269;;;6202:15;;6220:6;;6319:25;;:40;;;;;;;;;;;;;;6220:6;6319:40;;;5:2:-1;;;;30:1;27;20:12;5:2;6319:40:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;6319:40:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;6319:40:4;6388;;;;;;6422:4;6388:40;;;;;;6319;;-1:-1:-1;6369:16:4;;6388:25;;;;;;:40;;;;;6319;;6388;;;;;;;:25;:40;;;5:2:-1;;;;30:1;27;20:12;5:2;6388:40:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;6388:40:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;6388:40:4;6476:4;6438:17;6458:24;;;:9;6388:40;6458:24;;;;;6388:40;;-1:-1:-1;6506:30:4;6515:9;6526;6506:8;:30::i;:::-;6546:20;6569:11;6493:43;;-1:-1:-1;6569:11:4;6678:23;:9;6692:8;6678:23;:13;:23;:::i;:::-;:38;;;;;;;-1:-1:-1;6810:12:4;6784:23;:9;6798:8;6784:23;:13;:23;:::i;:::-;:38;;;;;;6774:48;;6898:1;6888:7;:11;:26;;;;;6913:1;6903:7;:11;6888:26;6880:84;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6974:31;6988:4;6995:9;6974:5;:31::i;:::-;7015:35;7029:7;7038:2;7042:7;7015:13;:35::i;:::-;7060;7074:7;7083:2;7087:7;7060:13;:35::i;:::-;7116:40;;;;;;7150:4;7116:40;;;;;;:25;;;;;;:40;;;;;;;;;;;;;;:25;:40;;;5:2:-1;;;;30:1;27;20:12;5:2;7116:40:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;7116:40:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;7116:40:4;7177;;;;;;7211:4;7177:40;;;;;;7116;;-1:-1:-1;7177:25:4;;;;;;:40;;;;;7116;;7177;;;;;;;;:25;:40;;;5:2:-1;;;;30:1;27;20:12;5:2;7177:40:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;7177:40:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;7177:40:4;;-1:-1:-1;7228:49:4;7236:8;7177:40;7256:9;7267;7228:7;:49::i;:::-;7291:5;7287:50;;;7328:8;;7306:31;;7328:8;7314;;;;7328;;;;7306:31;:21;:31;:::i;:::-;7298:5;:39;7287:50;7392:38;;;;;;;;;;;;;;;;;;7397:10;;7392:38;;;;;;;;;;;1220:1;;;;;;;;;1242;1231:8;:12;;;;6028:1409;;;:::o;272:37:2:-;;;;;;;;;;;;;;;;;;;:::o;2459:139::-;2522:4;2538:32;2548:10;2560:2;2564:5;2538:9;:32::i;390:49:4:-;434:5;390:49;:::o;9518:329::-;1148:8;;1160:1;1148:13;1140:48;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1209:1;1198:8;:12;9586:6;;9635;;9738:8;;9693:40;;;;;;9727:4;9693:40;;;;;;9586:6;;;;;9635;;;;9666:82;;9586:6;;9689:2;;9693:54;;9738:8;;;9586:6;;9693:25;;:40;;;;;;;;;;;;;;;9586:6;9693:40;;;5:2:-1;;;;30:1;27;20:12;5:2;9693:40:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;9693:40:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;9693:40:4;;:54;:44;:54;:::i;:::-;9666:13;:82::i;:::-;9830:8;;9785:40;;;;;;9819:4;9785:40;;;;;;9758:82;;9772:7;;9781:2;;9785:54;;9830:8;;;;;;9785:25;;;;;;:40;;;;;;;;;;;;;;;:25;:40;;;5:2:-1;;;;30:1;27;20:12;9758:82:4;-1:-1:-1;;1242:1:4;1231:8;:12;-1:-1:-1;9518:329:4:o;540:22::-;;;;;;:::o;595:21::-;;;;;;:::o;2941:742:2:-;3154:15;3142:8;:27;;3134:64;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3310:16;;3405:13;;;;3208:14;3405:13;;;:6;:13;;;;;;;;:15;;;;;;;;;3354:77;;692:66;3354:77;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;26:21:-1;;;22:32;;;6:49;;3354:77:2;;;;;3344:88;;;;;;3248:198;;;;;;;;;;;;;;;;;;;;;;26:21:-1;;;22:32;;;6:49;;3248:198:2;;;;;;3225:231;;;;;;;;;3493:26;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3208:14;;3405:15;3493:26;;;;;-1:-1:-1;3493:26:2;;;;;;;;;;3405:15;3493:26;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;-1:-1;;3493:26:2;;;;;;-1:-1:-1;;3537:30:2;;;;;;;:59;;;3591:5;3571:25;;:16;:25;;;3537:59;3529:106;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3645:31;3654:5;3661:7;3670:5;3645:8;:31::i;:::-;2941:742;;;;;;;;;:::o;438:64::-;;;;;;;;;;;;;;;;;;;;;;;;:::o;9893:156:4:-;1148:8;;1160:1;1148:13;1140:48;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1209:1;1198:8;:12;9948:6;;9941:39;;;;;;9974:4;9941:39;;;;;;9933:109;;9948:6;;;9941:24;;:39;;;;;;;;;;;;;;9948:6;9941:39;;;5:2:-1;;;;30:1;27;20:12;5:2;9941:39:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;9941:39:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;9941:39:4;9989:6;;9982:39;;;;;;10015:4;9982:39;;;;;;9989:6;;;;;9982:24;;:39;;;;;9941;;9982;;;;;;;;9989:6;9982:39;;;5:2:-1;;;;30:1;27;20:12;5:2;9982:39:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;9982:39:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;9982:39:4;10023:8;;;;;;;10033;;;;9933:7;:109::i;:::-;1242:1;1231:8;:12;9893:156::o;1846:199:2:-;1959:16;;;;;;;;:9;:16;;;;;;;;:25;;;;;;;;;;;;;:33;;;2007:31;;;;;;;;;;;;;;;;;1846:199;;;:::o;1322:134:0:-;1380:7;1406:43;1410:1;1413;1406:43;;;;;;;;;;;;;;;;;:3;:43::i;:::-;1399:50;1322:134;-1:-1:-1;;;1322:134:0:o;2051:249:2:-;2177:15;;;;;;;:9;:15;;;;;;:26;;2197:5;2177:26;:19;:26;:::i;:::-;2159:15;;;;;;;;:9;:15;;;;;;:44;;;;2229:13;;;;;;;:24;;2247:5;2229:24;:17;:24;:::i;:::-;2213:13;;;;;;;;:9;:13;;;;;;;;;:40;;;;2268:25;;;;;;;2213:13;;2268:25;;;;;;;;;;;;;2051:249;;;:::o;3706:849:4:-;3779:10;3801:13;3836:7;;;;;;;;;;;3817:33;;;:35;;;;;;;;;;;;;;;;;;;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;3817:35:4;;;;8:9:-1;5:2;;;45:16;42:1;39;24:38;77:16;74:1;67:27;5:2;3817:35:4;;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;3817:35:4;3916:5;;3870:19;;;;;;;-1:-1:-1;3817:35:4;;-1:-1:-1;3916:5:4;3946:603;;3975:11;;3971:511;;4006:13;4022:48;4036:33;;:18;;;;:33;;;:22;:33;:::i;4022:48::-;4006:64;;4088:17;4108:21;4122:6;4108:13;:21::i;:::-;4088:41;;4159:9;4151:5;:17;4147:321;;;4192:17;4212:37;4228:20;:5;4238:9;4228:20;:9;:20;:::i;:::-;4212:11;;;:37;:15;:37;:::i;:::-;4192:57;-1:-1:-1;4271:19:4;4293:27;4310:9;4293:12;:5;4303:1;4293:12;:9;:12;:::i;:::-;:16;:27;:16;:27;:::i;:::-;4271:49;;4342:17;4374:11;4362:9;:23;;;;;;;-1:-1:-1;4411:13:4;;4407:42;;4426:23;4432:5;4439:9;4426:5;:23::i;:::-;4147:321;;;;3971:511;;;3946:603;;;4502:11;;4498:51;;4537:1;4529:5;:9;4498:51;3706:849;;;;;;:::o;2211:459:0:-;2269:7;2510:6;2506:45;;-1:-1:-1;2539:1:0;2532:8;;2506:45;2573:5;;;2577:1;2573;:5;:1;2596:5;;;;;:10;2588:56;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5513:301;5561:9;5590:1;5586;:5;5582:226;;;-1:-1:-1;5611:1:0;5646;5642;5638:5;;:9;5661:89;5672:1;5668;:5;5661:89;;;5697:1;5693:5;;5734:1;5729;5725;5721;:5;;;;;;:9;5720:15;;;;;;5716:19;;5661:89;;;5582:226;;;;5770:6;;5766:42;;-1:-1:-1;5796:1:0;5766:42;5513:301;;;:::o;1426:200:2:-;1501:11;;:22;;1517:5;1501:22;:15;:22;:::i;:::-;1487:11;:36;;;1549:13;;;;;:9;:13;;;;;;:24;;1567:5;1549:24;:17;:24;:::i;:::-;1533:13;;;;;;;:9;:13;;;;;;;;:40;;;;1588:31;;;;;;;1533:13;;;;1588:31;;;;;;;;;;1426:200;;:::o;5295:103:0:-;5353:9;5382:1;5378;:5;:13;;5390:1;5378:13;;;-1:-1:-1;5386:1:0;;5374:17;-1:-1:-1;5295:103:0:o;2717:902:4:-;2872:23;;;;;;:50;;-1:-1:-1;2899:23:4;;;;2872:50;2864:87;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3064:18;;2992:23;:15;:23;;;3064:18;;;;;3047:35;;;3119:15;;;;;;:33;;-1:-1:-1;3138:14:4;;;;;3119:33;:51;;;;-1:-1:-1;3156:14:4;;;;;3119:51;3115:338;;;3326:11;3270:67;;3278:44;3312:9;3278:27;3295:9;3278:16;:27::i;:::-;:33;;;:44;:33;:44;:::i;:::-;3246:20;:91;;3270:53;;;;;:67;;;;3246:91;;;3375:67;;;3383:44;3417:9;3383:27;3400:9;3383:16;:27::i;:44::-;3351:20;:91;;3375:53;;;;;:67;;;;3351:91;;;3115:338;3462:8;:28;;;;;;;;;;;;3500;;;;;;;;;;;;3538:35;;;;;;;;;;;;3588:24;;;3593:8;;;3588:24;;3603:8;;;;;;;3588:24;;;;;;;;;;;;;;;;;2717:902;;;;;;:::o;1563:322::-;497:34;;;;;;;;;;;;;;;;;1723:43;;1712:10;1723:43;;;;;;;;;;;;;;;;26:21:-1;;;22:32;;;6:49;;1723:43:4;;;;;;25:18:-1;;;61:17;;1723:43:4;182:15:-1;1723:43:4;179:29:-1;160:49;;1712:55:4;;;;1677:12;;1691:17;;1712:10;;;1723:43;1712:55;;;25:18:-1;1712:55:4;;25:18:-1;36:153;66:2;61:3;58:11;36:153;;176:10;;164:23;;139:12;;;;;98:2;89:12;;;;114;36:153;;;274:1;267:3;263:2;259:12;254:3;250:22;246:30;315:4;311:9;305:3;299:10;295:26;356:4;350:3;344:10;340:21;389:7;380;377:20;372:3;365:33;3:399;;;1712:55:4;;;;;;;;;;;;;;;;;;;;;;;;14:1:-1;21;16:31;;;;75:4;69:11;64:16;;144:4;140:9;133:4;115:16;111:27;107:43;104:1;100:51;94:4;87:65;169:16;166:1;159:27;225:16;222:1;215:4;212:1;208:12;193:49;7:242;;16:31;36:4;31:9;;7:242;;1676:91:4;;;;1785:7;:57;;;;-1:-1:-1;1797:11:4;;:16;;:44;;;1828:4;1817:24;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;-1:-1;1817:24:4;1797:44;1777:101;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1563:322;;;;;:::o;1632:208:2:-;1713:15;;;;;;;:9;:15;;;;;;:26;;1733:5;1713:26;:19;:26;:::i;:::-;1695:15;;;;;;;:9;:15;;;;;:44;;;;1763:11;:22;;1779:5;1763:22;:15;:22;:::i;:::-;1749:11;:36;;;1800:33;;;;;;;;;;;;;;;;;;;;;;1632:208;;:::o;1747:217:0:-;1863:7;1898:12;1890:6;;;;1882:29;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;90:11;;;84:18;71:11;;;64:39;52:2;45:10;8:100;;;12:14;1882:29:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;1933:5:0;;;1747:217::o;875:176::-;933:7;964:5;;;987:6;;;;979:46;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;283:118:8;358:10;;231:6;358:17;;283:118::o;469:106::-;529:9;558:10;;;554:14;;;558:10;554:14;;;;;;469:106;-1:-1:-1;;;469:106:8:o"
	}
};
var metadata = "{\"compiler\":{\"version\":\"0.5.16+commit.9c3226ce\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"Burn\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0In\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1In\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0Out\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1Out\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"Swap\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint112\",\"name\":\"reserve0\",\"type\":\"uint112\"},{\"indexed\":false,\"internalType\":\"uint112\",\"name\":\"reserve1\",\"type\":\"uint112\"}],\"name\":\"Sync\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"constant\":true,\"inputs\":[],\"name\":\"DOMAIN_SEPARATOR\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"MINIMUM_LIQUIDITY\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"PERMIT_TYPEHASH\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"burn\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"factory\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getReserves\",\"outputs\":[{\"internalType\":\"uint112\",\"name\":\"_reserve0\",\"type\":\"uint112\"},{\"internalType\":\"uint112\",\"name\":\"_reserve1\",\"type\":\"uint112\"},{\"internalType\":\"uint32\",\"name\":\"_blockTimestampLast\",\"type\":\"uint32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"_token0\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_token1\",\"type\":\"address\"}],\"name\":\"initialize\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"kLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"mint\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"liquidity\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"nonces\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"deadline\",\"type\":\"uint256\"},{\"internalType\":\"uint8\",\"name\":\"v\",\"type\":\"uint8\"},{\"internalType\":\"bytes32\",\"name\":\"r\",\"type\":\"bytes32\"},{\"internalType\":\"bytes32\",\"name\":\"s\",\"type\":\"bytes32\"}],\"name\":\"permit\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"price0CumulativeLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"price1CumulativeLast\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"skim\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0Out\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1Out\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"}],\"name\":\"swap\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"sync\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"token0\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"token1\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"methods\":{}},\"userdoc\":{\"methods\":{}}},\"settings\":{\"compilationTarget\":{\"contracts/BakerySwapPair.sol\":\"BakerySwapPair\"},\"evmVersion\":\"istanbul\",\"libraries\":{},\"optimizer\":{\"enabled\":true,\"runs\":999999},\"remappings\":[]},\"sources\":{\"@BakeryProject/bakery-swap-lib/contracts/math/SafeMath.sol\":{\"keccak256\":\"0xd4b1686c1494213666dc1423cea64333c3063f334327216d69ca3d59f75a2517\",\"urls\":[\"bzz-raw://3a3c967dc005a8966266b6052724b7cd04231c6d95abcc03f49e1cbb9ffb890a\",\"dweb:/ipfs/QmRWofmmac5HLRYpMTDQLzmgZyJYeYLB2MY8uTFRKfJuJL\"]},\"@BakeryProject/bakery-swap-lib/contracts/token/BEP20/IBEP20.sol\":{\"keccak256\":\"0xcca9eeefad9d3c8a68e426833a5c790d055beebc3f1cefbeac20b096456c9aef\",\"urls\":[\"bzz-raw://61090ac66da4fcf117cb95119cda4c45b5bcf9f8a48203444b0f97b39a9ccbd1\",\"dweb:/ipfs/Qmb1XnfUGdZ7ma31WqhGMaE9mWug1erEUh8xEYvvjZ5v4r\"]},\"contracts/BakerySwapBEP20.sol\":{\"keccak256\":\"0xb952fad89321faac664acf8fcf5cba4e1ae18ce30755b337ac3b6d298205684b\",\"urls\":[\"bzz-raw://d247ddb22e020b1134b3f4f89c2427697398a531668d3a747e446dc7b1ed9f5e\",\"dweb:/ipfs/QmRaiD5jdcjpizRbHh65RBmA29J8a5KCot4UKs3PazHBi4\"]},\"contracts/BakerySwapPair.sol\":{\"keccak256\":\"0x50b3b2344896481ccbff99df26a01e0fff378fffead401e5950e9529c7f4a6db\",\"urls\":[\"bzz-raw://7c2c4dae91f7b12f871d52560e410acd3bee9136d0d34ea690c4a31beaf89b98\",\"dweb:/ipfs/QmWoJspn8GDwwUJkSfzLiXyckbrJWTZ1bZVLNYmCRcUKFe\"]},\"contracts/interfaces/IBakerySwapBEP20.sol\":{\"keccak256\":\"0x52c1f2284f849be93bd034ac0d6cf5b8f989a32a667e20fa0113df8765f7eaeb\",\"urls\":[\"bzz-raw://513d9171593f569ae97afc787943274fc60a3d2614a8027d9e04854c3946fbd1\",\"dweb:/ipfs/QmW85VWAcrSU8NzANhZvTbT7dzU9hc7bnRWMpKAoDG49zd\"]},\"contracts/interfaces/IBakerySwapFactory.sol\":{\"keccak256\":\"0x21f9a7e656e2428096f0f6385d652f17058b4f03142c7ee6938607bf1fd835db\",\"urls\":[\"bzz-raw://a6c9129bbc8515293f29ee37f775a1c93a7ee3024cf2495b19291456b05c663d\",\"dweb:/ipfs/QmXHAcZnaLsXjtfJNvVAftgq5SBfz81j8EdDsB63Q3ohit\"]},\"contracts/interfaces/IBakerySwapPair.sol\":{\"keccak256\":\"0xd84b4e98b998421ffbc317d2380e9740c7f88c07c26737ef0b91defef740bb04\",\"urls\":[\"bzz-raw://3800968ca3ac8cc14c249076074f9022f0542ef7ec43879899f1284d9fed11ab\",\"dweb:/ipfs/Qmf5pf9NCqPVnrEBqMkxrKePQBJRHqh3ctntiRwhgmk3gf\"]},\"contracts/libraries/UQ112x112.sol\":{\"keccak256\":\"0x2240694530251ab376ae468d0a2d3ee8b3109e56f2acadbc203cdf341506dd31\",\"urls\":[\"bzz-raw://56f55c411faa2924df0915ff77129b9d8c64d3e4d28554e7234f3774ac95958a\",\"dweb:/ipfs/QmYrzUurXL8ijzS8EnLtQTVD7fKPReosg2DsEPXXCY7ec3\"]}},\"version\":1}";
var bytecode = "60806040526001600c5534801561001557600080fd5b506040514690806052612c9f8239604080519182900360520182208282018252600a83526942616b657279204c507360b01b6020938401528151808301835260018152603160f81b908401528151808401919091527f5ed039ad5f03c2661cf61a8d716c2a77f59bd0432e1ff6204eaae6153df7eacc818301527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606082015260808101949094523060a0808601919091528151808603909101815260c09094019052825192019190912060035550600580546001600160a01b03191633179055612b9a806101056000396000f3fe608060405234801561001057600080fd5b50600436106101b95760003560e01c80636d9a640a116100f9578063ba9a7a5611610097578063d21220a711610071578063d21220a714610580578063d505accf14610588578063dd62ed3e146105e6578063fff6cae914610621576101b9565b8063ba9a7a561461053d578063bc25cf7714610545578063c45a015514610578576101b9565b80637ecebe00116100d35780637ecebe001461047d57806389afcb44146104b057806395d89b41146104fc578063a9059cbb14610504576101b9565b80636d9a640a1461040357806370a08231146104425780637464fc3d14610475576101b9565b806330adf81f11610166578063485cc95511610140578063485cc955146103835780635909c0d5146103c05780635a3d5493146103c85780636a627842146103d0576101b9565b806330adf81f14610355578063313ce5671461035d5780633644e5151461037b576101b9565b80630dfe1681116101975780630dfe1681146102c757806318160ddd146102f857806323b872dd14610312576101b9565b806306fdde03146101be5780630902f1ac1461023b578063095ea7b31461027a575b600080fd5b6101c6610629565b6040805160208082528351818301528351919283929083019185019080838360005b838110156102005781810151838201526020016101e8565b50505050905090810190601f16801561022d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610243610662565b604080516dffffffffffffffffffffffffffff948516815292909316602083015263ffffffff168183015290519081900360600190f35b6102b36004803603604081101561029057600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81351690602001356106b7565b604080519115158252519081900360200190f35b6102cf6106ce565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6103006106ea565b60408051918252519081900360200190f35b6102b36004803603606081101561032857600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135811691602081013590911690604001356106f0565b6103006107cf565b6103656107f3565b6040805160ff9092168252519081900360200190f35b6103006107f8565b6103be6004803603604081101561039957600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160200135166107fe565b005b6103006108d7565b6103006108dd565b610300600480360360208110156103e657600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166108e3565b6103be6004803603606081101561041957600080fd5b508035906020810135906040013573ffffffffffffffffffffffffffffffffffffffff16610ca9565b6103006004803603602081101561045857600080fd5b503573ffffffffffffffffffffffffffffffffffffffff1661128d565b61030061129f565b6103006004803603602081101561049357600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166112a5565b6104e3600480360360208110156104c657600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166112b7565b6040805192835260208301919091528051918290030190f35b6101c6611754565b6102b36004803603604081101561051a57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813516906020013561178d565b61030061179a565b6103be6004803603602081101561055b57600080fd5b503573ffffffffffffffffffffffffffffffffffffffff166117a0565b6102cf611996565b6102cf6119b2565b6103be600480360360e081101561059e57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c001356119ce565b610300600480360360408110156105fc57600080fd5b5073ffffffffffffffffffffffffffffffffffffffff81358116916020013516611c84565b6103be611ca1565b6040518060400160405280600a81526020017f42616b657279204c50730000000000000000000000000000000000000000000081525081565b6008546dffffffffffffffffffffffffffff808216926e0100000000000000000000000000008304909116917c0100000000000000000000000000000000000000000000000000000000900463ffffffff1690565b60006106c4338484611e87565b5060015b92915050565b60065473ffffffffffffffffffffffffffffffffffffffff1681565b60005481565b73ffffffffffffffffffffffffffffffffffffffff831660009081526002602090815260408083203384529091528120547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff146107ba5773ffffffffffffffffffffffffffffffffffffffff84166000908152600260209081526040808320338452909152902054610788908363ffffffff611ef616565b73ffffffffffffffffffffffffffffffffffffffff851660009081526002602090815260408083203384529091529020555b6107c5848484611f3f565b5060019392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601281565b60035481565b60055473ffffffffffffffffffffffffffffffffffffffff16331461088457604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601960248201527f42616b65727953776170506169723a20464f5242494444454e00000000000000604482015290519081900360640190fd5b6006805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff00000000000000000000000000000000000000009182161790915560078054929093169116179055565b60095481565b600a5481565b6000600c5460011461095657604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c81905580610966610662565b50600654604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905193955091935060009273ffffffffffffffffffffffffffffffffffffffff909116916370a08231916024808301926020929190829003018186803b1580156109e057600080fd5b505afa1580156109f4573d6000803e3d6000fd5b505050506040513d6020811015610a0a57600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905192935060009273ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b158015610a8357600080fd5b505afa158015610a97573d6000803e3d6000fd5b505050506040513d6020811015610aad57600080fd5b505190506000610ad3836dffffffffffffffffffffffffffff871663ffffffff611ef616565b90506000610af7836dffffffffffffffffffffffffffff871663ffffffff611ef616565b90506000610b058787612020565b60005490915080610b4e57610b3a6103e8610b2e610b29878763ffffffff6121ac16565b61221f565b9063ffffffff611ef616565b9850610b4960006103e8612271565b610bab565b610ba86dffffffffffffffffffffffffffff8916610b72868463ffffffff6121ac16565b81610b7957fe5b046dffffffffffffffffffffffffffff8916610b9b868563ffffffff6121ac16565b81610ba257fe5b04612321565b98505b60008911610c04576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602d815260200180612a50602d913960400191505060405180910390fd5b610c0e8a8a612271565b610c1a86868a8a612337565b8115610c5c57600854610c58906dffffffffffffffffffffffffffff808216916e01000000000000000000000000000090041663ffffffff6121ac16565b600b555b6040805185815260208101859052815133927f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f928290030190a250506001600c5550949695505050505050565b600c54600114610d1a57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c5582151580610d2d5750600082115b610d82576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180612a7d602a913960400191505060405180910390fd5b600080610d8d610662565b5091509150816dffffffffffffffffffffffffffff1685108015610dc05750806dffffffffffffffffffffffffffff1684105b610e15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180612af26026913960400191505060405180910390fd5b600654600754600091829173ffffffffffffffffffffffffffffffffffffffff918216919081169087168214801590610e7a57508073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614155b610ee557604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f42616b65727953776170506169723a20494e56414c49445f544f000000000000604482015290519081900360640190fd5b8815610ef657610ef682888b6125f3565b8715610f0757610f0781888a6125f3565b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8416916370a08231916024808301926020929190829003018186803b158015610f7357600080fd5b505afa158015610f87573d6000803e3d6000fd5b505050506040513d6020811015610f9d57600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191955073ffffffffffffffffffffffffffffffffffffffff8316916370a0823191602480820192602092909190829003018186803b15801561100f57600080fd5b505afa158015611023573d6000803e3d6000fd5b505050506040513d602081101561103957600080fd5b5051925060009150506dffffffffffffffffffffffffffff85168890038311611063576000611079565b87856dffffffffffffffffffffffffffff160383035b9050600087856dffffffffffffffffffffffffffff1603831161109d5760006110b3565b87856dffffffffffffffffffffffffffff160383035b905060008211806110c45750600081115b611119576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526029815260200180612aa76029913960400191505060405180910390fd5b600061114161112f84600363ffffffff6121ac16565b610b2e876103e863ffffffff6121ac16565b9050600061115961112f84600363ffffffff6121ac16565b9050611191620f42406111856dffffffffffffffffffffffffffff8b8116908b1663ffffffff6121ac16565b9063ffffffff6121ac16565b6111a1838363ffffffff6121ac16565b101561120e57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f42616b65727953776170506169723a204b000000000000000000000000000000604482015290519081900360640190fd5b505061121c84848888612337565b60408051838152602081018390528082018b9052606081018a9052905173ffffffffffffffffffffffffffffffffffffffff89169133917fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d8229181900360800190a350506001600c5550505050505050565b60016020526000908152604090205481565b600b5481565b60046020526000908152604090205481565b600080600c5460011461132b57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c8190558061133b610662565b50600654600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905194965092945073ffffffffffffffffffffffffffffffffffffffff9182169391169160009184916370a08231916024808301926020929190829003018186803b1580156113bd57600080fd5b505afa1580156113d1573d6000803e3d6000fd5b505050506040513d60208110156113e757600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191925060009173ffffffffffffffffffffffffffffffffffffffff8516916370a08231916024808301926020929190829003018186803b15801561145b57600080fd5b505afa15801561146f573d6000803e3d6000fd5b505050506040513d602081101561148557600080fd5b5051306000908152600160205260408120549192506114a48888612020565b600054909150806114bb848763ffffffff6121ac16565b816114c257fe5b049a50806114d6848663ffffffff6121ac16565b816114dd57fe5b04995060008b1180156114f0575060008a115b611545576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602d815260200180612b39602d913960400191505060405180910390fd5b61154f3084612800565b61155a878d8d6125f3565b611565868d8c6125f3565b604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff8916916370a08231916024808301926020929190829003018186803b1580156115d157600080fd5b505afa1580156115e5573d6000803e3d6000fd5b505050506040513d60208110156115fb57600080fd5b5051604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905191965073ffffffffffffffffffffffffffffffffffffffff8816916370a0823191602480820192602092909190829003018186803b15801561166d57600080fd5b505afa158015611681573d6000803e3d6000fd5b505050506040513d602081101561169757600080fd5b505193506116a785858b8b612337565b81156116e9576008546116e5906dffffffffffffffffffffffffffff808216916e01000000000000000000000000000090041663ffffffff6121ac16565b600b555b604080518c8152602081018c9052815173ffffffffffffffffffffffffffffffffffffffff8f169233927fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496929081900390910190a35050505050505050506001600c81905550915091565b6040518060400160405280600381526020017f424c50000000000000000000000000000000000000000000000000000000000081525081565b60006106c4338484611f3f565b6103e881565b600c5460011461181157604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c55600654600754600854604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff94851694909316926118ed92859287926118e8926dffffffffffffffffffffffffffff169185916370a0823191602480820192602092909190829003018186803b1580156118b057600080fd5b505afa1580156118c4573d6000803e3d6000fd5b505050506040513d60208110156118da57600080fd5b50519063ffffffff611ef616565b6125f3565b600854604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905161198c92849287926118e8926e01000000000000000000000000000090046dffffffffffffffffffffffffffff169173ffffffffffffffffffffffffffffffffffffffff8616916370a0823191602480820192602092909190829003018186803b1580156118b057600080fd5b50506001600c5550565b60055473ffffffffffffffffffffffffffffffffffffffff1681565b60075473ffffffffffffffffffffffffffffffffffffffff1681565b42841015611a3d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f42616b6572795377617042455032303a20455850495245440000000000000000604482015290519081900360640190fd5b60035473ffffffffffffffffffffffffffffffffffffffff80891660008181526004602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958d166060860152608085018c905260a085019590955260c08085018b90528151808603909101815260e0850182528051908301207f19010000000000000000000000000000000000000000000000000000000000006101008601526101028501969096526101228085019690965280518085039096018652610142840180825286519683019690962095839052610162840180825286905260ff89166101828501526101a284018890526101c28401879052519193926101e2808201937fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081019281900390910190855afa158015611b9e573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff811615801590611c1957508873ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b611c6e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526022815260200180612ad06022913960400191505060405180910390fd5b611c79898989611e87565b505050505050505050565b600260209081526000928352604080842090915290825290205481565b600c54600114611d1257604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f42616b65727953776170506169723a204c4f434b454400000000000000000000604482015290519081900360640190fd5b6000600c55600654604080517f70a082310000000000000000000000000000000000000000000000000000000081523060048201529051611e809273ffffffffffffffffffffffffffffffffffffffff16916370a08231916024808301926020929190829003018186803b158015611d8957600080fd5b505afa158015611d9d573d6000803e3d6000fd5b505050506040513d6020811015611db357600080fd5b5051600754604080517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152905173ffffffffffffffffffffffffffffffffffffffff909216916370a0823191602480820192602092909190829003018186803b158015611e2657600080fd5b505afa158015611e3a573d6000803e3d6000fd5b505050506040513d6020811015611e5057600080fd5b50516008546dffffffffffffffffffffffffffff808216916e010000000000000000000000000000900416612337565b6001600c55565b73ffffffffffffffffffffffffffffffffffffffff808416600081815260026020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6000611f3883836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f7700008152506128c5565b9392505050565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260016020526040902054611f75908263ffffffff611ef616565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152600160205260408082209390935590841681522054611fb7908263ffffffff61297616565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526001602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663017e7e586040518163ffffffff1660e01b815260040160206040518083038186803b15801561208b57600080fd5b505afa15801561209f573d6000803e3d6000fd5b505050506040513d60208110156120b557600080fd5b5051600b5473ffffffffffffffffffffffffffffffffffffffff821615801594509192509061219857801561219357600061210c610b296dffffffffffffffffffffffffffff88811690881663ffffffff6121ac16565b905060006121198361221f565b905080821115612190576000612147612138848463ffffffff611ef616565b6000549063ffffffff6121ac16565b9050600061216c8361216086600563ffffffff6121ac16565b9063ffffffff61297616565b9050600081838161217957fe5b049050801561218c5761218c8782612271565b5050505b50505b6121a4565b80156121a4576000600b555b505092915050565b6000826121bb575060006106c8565b828202828482816121c857fe5b0414611f38576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526021815260200180612b186021913960400191505060405180910390fd5b60006003821115612262575080600160028204015b8181101561225c5780915060028182858161224b57fe5b04018161225457fe5b049050612234565b5061226c565b811561226c575060015b919050565b600054612284908263ffffffff61297616565b600090815573ffffffffffffffffffffffffffffffffffffffff83168152600160205260409020546122bc908263ffffffff61297616565b73ffffffffffffffffffffffffffffffffffffffff831660008181526001602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b60008183106123305781611f38565b5090919050565b6dffffffffffffffffffffffffffff841180159061236357506dffffffffffffffffffffffffffff8311155b6123ce57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601860248201527f42616b65727953776170506169723a204f564552464c4f570000000000000000604482015290519081900360640190fd5b60085463ffffffff428116917c01000000000000000000000000000000000000000000000000000000009004811682039081161580159061241e57506dffffffffffffffffffffffffffff841615155b801561243957506dffffffffffffffffffffffffffff831615155b156124e9578063ffffffff1661247c85612452866129ea565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169063ffffffff612a0e16565b600980547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff929092169290920201905563ffffffff81166124bc84612452876129ea565b600a80547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff92909216929092020190555b600880547fffffffffffffffffffffffffffffffffffff0000000000000000000000000000166dffffffffffffffffffffffffffff888116919091177fffffffff0000000000000000000000000000ffffffffffffffffffffffffffff166e0100000000000000000000000000008883168102919091177bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167c010000000000000000000000000000000000000000000000000000000063ffffffff871602179283905560408051848416815291909304909116602082015281517f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1929181900390910190a1505050505050565b604080518082018252601981527f7472616e7366657228616464726573732c75696e743235362900000000000000602091820152815173ffffffffffffffffffffffffffffffffffffffff85811660248301526044808301869052845180840390910181526064909201845291810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001781529251815160009460609489169392918291908083835b602083106126f957805182527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe090920191602091820191016126bc565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d806000811461275b576040519150601f19603f3d011682016040523d82523d6000602084013e612760565b606091505b509150915081801561278e57508051158061278e575080806020019051602081101561278b57600080fd5b50515b6127f957604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f42616b65727953776170506169723a205452414e534645525f4641494c454400604482015290519081900360640190fd5b5050505050565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260016020526040902054612836908263ffffffff611ef616565b73ffffffffffffffffffffffffffffffffffffffff831660009081526001602052604081209190915554612870908263ffffffff611ef616565b600090815560408051838152905173ffffffffffffffffffffffffffffffffffffffff8516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef919081900360200190a35050565b6000818484111561296e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561293357818101518382015260200161291b565b50505050905090810190601f1680156129605780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015611f3857604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b6dffffffffffffffffffffffffffff166e0100000000000000000000000000000290565b60006dffffffffffffffffffffffffffff82167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff841681612a4757fe5b04939250505056fe42616b65727953776170506169723a20494e53554646494349454e545f4c49515549444954595f4d494e54454442616b65727953776170506169723a20494e53554646494349454e545f4f55545055545f414d4f554e5442616b65727953776170506169723a20494e53554646494349454e545f494e5055545f414d4f554e5442616b6572795377617042455032303a20494e56414c49445f5349474e415455524542616b65727953776170506169723a20494e53554646494349454e545f4c4951554944495459536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f7742616b65727953776170506169723a20494e53554646494349454e545f4c49515549444954595f4255524e4544a265627a7a72315820a6507fdfb8085d6a2c98676353425072170469f2ad9d8b6ffcabacd193ce769864736f6c63430005100032454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c75696e7432353620636861696e49642c6164647265737320766572696679696e67436f6e747261637429";
var SwapPair = {
	abi: abi,
	evm: evm,
	metadata: metadata,
	"interface": [
	{
		inputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Burn",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		name: "Mint",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "sender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1In",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "Swap",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve0",
				type: "uint112"
			},
			{
				indexed: false,
				internalType: "uint112",
				name: "reserve1",
				type: "uint112"
			}
		],
		name: "Sync",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "Transfer",
		type: "event"
	},
	{
		constant: true,
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "MINIMUM_LIQUIDITY",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "PERMIT_TYPEHASH",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "approve",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "burn",
		outputs: [
			{
				internalType: "uint256",
				name: "amount0",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				internalType: "uint8",
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "factory",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "getReserves",
		outputs: [
			{
				internalType: "uint112",
				name: "_reserve0",
				type: "uint112"
			},
			{
				internalType: "uint112",
				name: "_reserve1",
				type: "uint112"
			},
			{
				internalType: "uint32",
				name: "_blockTimestampLast",
				type: "uint32"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "_token0",
				type: "address"
			},
			{
				internalType: "address",
				name: "_token1",
				type: "address"
			}
		],
		name: "initialize",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "kLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "mint",
		outputs: [
			{
				internalType: "uint256",
				name: "liquidity",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "name",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "nonces",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "deadline",
				type: "uint256"
			},
			{
				internalType: "uint8",
				name: "v",
				type: "uint8"
			},
			{
				internalType: "bytes32",
				name: "r",
				type: "bytes32"
			},
			{
				internalType: "bytes32",
				name: "s",
				type: "bytes32"
			}
		],
		name: "permit",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price0CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "price1CumulativeLast",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "skim",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "uint256",
				name: "amount0Out",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "amount1Out",
				type: "uint256"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			}
		],
		name: "swap",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "symbol",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
		],
		name: "sync",
		outputs: [
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token0",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "token1",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
		],
		name: "totalSupply",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transfer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		constant: false,
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "value",
				type: "uint256"
			}
		],
		name: "transferFrom",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool"
			}
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function"
	}
],
	bytecode: bytecode
};

var ERC20 = [
	{
		constant: true,
		inputs: [
		],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	},
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "address"
			}
		],
		name: "balanceOf",
		outputs: [
			{
				name: "",
				type: "uint256"
			}
		],
		payable: false,
		stateMutability: "view",
		type: "function"
	}
];

var _TOKEN_DECIMALS_CACHE;
var TOKEN_DECIMALS_CACHE = (_TOKEN_DECIMALS_CACHE = {}, _TOKEN_DECIMALS_CACHE[exports.ChainId.MAINNET] = {
  '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A': 9 // DGD

}, _TOKEN_DECIMALS_CACHE);
/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */

var Fetcher = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Fetcher() {}
  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */


  Fetcher.fetchTokenData = function fetchTokenData(chainId, address, provider, symbol, name) {
    try {
      var _TOKEN_DECIMALS_CACHE2, _TOKEN_DECIMALS_CACHE3;

      var _temp3 = function _temp3(parsedDecimals) {
        return new Token(chainId, address, parsedDecimals, symbol, name);
      };

      if (provider === undefined) provider = providers.getDefaultProvider(networks.getNetwork(chainId));

      var _temp4 = typeof ((_TOKEN_DECIMALS_CACHE2 = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE2 === void 0 ? void 0 : (_TOKEN_DECIMALS_CACHE3 = _TOKEN_DECIMALS_CACHE2[chainId]) === null || _TOKEN_DECIMALS_CACHE3 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE3[address]) === 'number';

      return Promise.resolve(_temp4 ? _temp3(TOKEN_DECIMALS_CACHE[chainId][address]) : Promise.resolve(new contracts.Contract(address, ERC20, provider).decimals().then(function (decimals) {
        var _TOKEN_DECIMALS_CACHE4, _extends2, _extends3;

        TOKEN_DECIMALS_CACHE = _extends({}, TOKEN_DECIMALS_CACHE, (_extends3 = {}, _extends3[chainId] = _extends({}, (_TOKEN_DECIMALS_CACHE4 = TOKEN_DECIMALS_CACHE) === null || _TOKEN_DECIMALS_CACHE4 === void 0 ? void 0 : _TOKEN_DECIMALS_CACHE4[chainId], (_extends2 = {}, _extends2[address] = decimals, _extends2)), _extends3));
        return decimals;
      })).then(_temp3));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  ;

  Fetcher.fetchPairData = function fetchPairData(tokenA, tokenB, provider) {
    try {
      if (provider === undefined) provider = providers.getDefaultProvider(networks.getNetwork(tokenA.chainId));
      !(tokenA.chainId === tokenB.chainId) ? "development" !== "production" ? invariant(false, 'CHAIN_ID') : invariant(false) : void 0;
      var address = Pair.getAddress(tokenA, tokenB);
      return Promise.resolve(new contracts.Contract(address, SwapPair.abi, provider).getReserves()).then(function (_ref) {
        var reserves0 = _ref[0],
            reserves1 = _ref[1];
        var balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
        return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Fetcher;
}();

exports.JSBI = JSBI;
exports.Currency = Currency;
exports.CurrencyAmount = CurrencyAmount;
exports.ETHER = ETHER;
exports.FACTORY_ADDRESS = FACTORY_ADDRESS;
exports.Fetcher = Fetcher;
exports.Fraction = Fraction;
exports.INIT_CODE_HASH = INIT_CODE_HASH;
exports.InsufficientInputAmountError = InsufficientInputAmountError;
exports.InsufficientReservesError = InsufficientReservesError;
exports.MINIMUM_LIQUIDITY = MINIMUM_LIQUIDITY;
exports.Pair = Pair;
exports.Percent = Percent;
exports.Price = Price;
exports.Route = Route;
exports.Router = Router;
exports.Token = Token;
exports.TokenAmount = TokenAmount;
exports.Trade = Trade;
exports.WETH = WETH;
exports.currencyEquals = currencyEquals;
exports.inputOutputComparator = inputOutputComparator;
exports.tradeComparator = tradeComparator;
//# sourceMappingURL=swapbscsdk.cjs.development.js.map
