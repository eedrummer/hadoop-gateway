/**
@namespace scoping into the hquery namespace
*/var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
this.hQuery || (this.hQuery = {});
/**
Converts a a number in UTC Seconds since the epoch to a date.
@param {number} utcSeconds seconds since the epoch in UTC
@returns {Date}
@function
@exports dateFromUtcSeconds as hQuery.dateFromUtcSeconds 
*/
hQuery.dateFromUtcSeconds = function(utcSeconds) {
  return new Date(utcSeconds * 1000);
};
/**
@class Scalar - a representation of a unit and value
@exports Scalar as hQuery.Scalar
*/
hQuery.Scalar = (function() {
  function Scalar(json) {
    this.json = json;
  }
  Scalar.prototype.unit = function() {
    return this.json['unit'];
  };
  Scalar.prototype.value = function() {
    return this.json['value'];
  };
  return Scalar;
})();
/**
@class A code with its corresponding code system
@exports CodedValue as hQuery.CodedValue 
*/
hQuery.CodedValue = (function() {
  /**
  @param {String} c value of the code
  @param {String} csn name of the code system that the code belongs to
  @constructs
  */  function CodedValue(c, csn) {
    this.c = c;
    this.csn = csn;
  }
  /**
  @returns {String} the code
  */
  CodedValue.prototype.code = function() {
    return this.c;
  };
  /**
  @returns {String} the code system name
  */
  CodedValue.prototype.codeSystemName = function() {
    return this.csn;
  };
  /**
  Returns true if the contained code and codeSystemName match a code in the supplied codeSet.
  @param {Object} codeSet a hash with code system names as keys and an array of codes as values
  @returns {boolean}
  */
  CodedValue.prototype.includedIn = function(codeSet) {
    var code, codeSystemName, codes, _i, _len;
    for (codeSystemName in codeSet) {
      codes = codeSet[codeSystemName];
      if (this.csn === codeSystemName) {
        for (_i = 0, _len = codes.length; _i < _len; _i++) {
          code = codes[_i];
          if (code === this.c) {
            return true;
          }
        }
      }
    }
    return false;
  };
  return CodedValue;
})();
/**
Status as defined by value set 2.16.840.1.113883.5.14,
the ActStatus vocabulary maintained by HL7

@class Status
@augments hQuery.CodedEntry
@exports Status as hQuery.Status
*/
hQuery.Status = (function() {
  var ABORTED, ACTIVE, CANCELLED, COMPLETED, HELD, NEW, NORMAL, NULLIFIED, OBSOLETE, SUSPENDED;
  __extends(Status, hQuery.CodedValue);
  function Status() {
    Status.__super__.constructor.apply(this, arguments);
  }
  NORMAL = "normal";
  ABORTED = "aborted";
  ACTIVE = "active";
  CANCELLED = "cancelled";
  COMPLETED = "completed";
  HELD = "held";
  NEW = "new";
  SUSPENDED = "suspended";
  NULLIFIED = "nullified";
  OBSOLETE = "obsolete";
  Status.prototype.isNormal = function() {
    return this.c === NORMAL;
  };
  Status.prototype.isAborted = function() {
    return this.c === ABORTED;
  };
  Status.prototype.isActive = function() {
    return this.c === ACTIVE;
  };
  Status.prototype.isCancelled = function() {
    return this.c === CANCELLED;
  };
  Status.prototype.isCompleted = function() {
    return this.c === COMPLETED;
  };
  Status.prototype.isHeld = function() {
    return this.c === HELD;
  };
  Status.prototype.isNew = function() {
    return this.c === NEW;
  };
  Status.prototype.isSuspended = function() {
    return this.c === SUSPENDED;
  };
  Status.prototype.isNullified = function() {
    return this.c === NULLIFIED;
  };
  Status.prototype.isObsolete = function() {
    return this.c === OBSOLETE;
  };
  return Status;
})();
/**
@class an Address for a person or organization 
@exports Address as hQuery.Address 
*/
hQuery.Address = (function() {
  function Address(json) {
    this.json = json;
  }
  /**
  @returns {String} the street address
  */
  Address.prototype.streetAddress = function() {
    return this.json['streetAddress'];
  };
  /**
  @returns {String} the city
  */
  Address.prototype.city = function() {
    return this.json['city'];
  };
  /**
  @returns {String} the State or province
  */
  Address.prototype.stateOrProvince = function() {
    return this.json['stateOrProvince'];
  };
  /**
  @returns {String} the zip code
  */
  Address.prototype.zip = function() {
    return this.json['zip'];
  };
  /**
  @returns {String} the country
  */
  Address.prototype.country = function() {
    return this.json['country'];
  };
  return Address;
})();
/**
@class An object that describes a means to contact an entity.  This is used to represent 
phone numbers, email addresses,  instant messaging accounts etc.
@exports Telecom as hQuery.Telecom   
*/
hQuery.Telecom = (function() {
  function Telecom(json) {
    this.json = json;
  }
  /**
  @returns {String} the type of telecom entry, phone, sms, email ....
  */
  Telecom.prototype.type = function() {
    return this.json['type'];
  };
  /**
  @returns {String} the value of the entry -  the actual phone number , email address , ....
  */
  Telecom.prototype.value = function() {
    return this.json['value'];
  };
  /**
  @returns {String} the use of the entry. Is it a home, office, .... type of contact
  */
  Telecom.prototype.use = function() {
    return this.json['use'];
  };
  /**
  @returns {Boolean} is this a preferred form of contact
  */
  Telecom.prototype.preferred = function() {
    return this.json['preferred'];
  };
  return Telecom;
})();
/**
@class an object that describes a person.  includes a persons name, addresses, and contact information
@exports Person as hQuery.Person 
*/
hQuery.Person = (function() {
  function Person(json) {
    this.json = json;
  }
  /**
   @returns {String} the given name of the person
  */
  Person.prototype.given = function() {
    return this.json['given'];
  };
  /**
   @returns {String} the last/family name of the person
   */
  Person.prototype.last = function() {
    return this.json['last'];
  };
  /**
   @returns {Array} an array of {@link hQuery.Address} objects associated with the person
   */
  Person.prototype.addresses = function() {
    var address, _i, _len, _ref, _results;
    _ref = this.json['addresses'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      address = _ref[_i];
      _results.push(new hQuery.Address(address));
    }
    return _results;
  };
  /**
  @returns {Array} an array of {@link hQuery.Telecom} objects associated with the person
  */
  Person.prototype.telecoms = function() {
    var tel, _i, _len, _ref, _results;
    _ref = this.json['telecoms'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tel = _ref[_i];
      _results.push(new hQuery.Telecom(tel));
    }
    return _results;
  };
  return Person;
})();
/**
@class an actor is either a person or an organization
@exports Actor as hQuery.Actor 
*/
hQuery.Actor = (function() {
  function Actor(json) {
    this.json = json;
  }
  Actor.prototype.person = function() {
    if (this.json['person']) {
      return new hQuery.Person(this.json['person']);
    }
  };
  Actor.prototype.organization = function() {
    if (this.json['organization']) {
      return new hQuery.Organization(this.json['organization']);
    }
  };
  return Actor;
})();
/**
@class an Organization
@exports Organization as hQuery.Organization 
*/
hQuery.Organization = (function() {
  function Organization(json) {
    this.json = json;
  }
  return Organization;
})();
/**
@class represents a DateRange in the form of hi and low date values.
@exports DateRange as hQuery.DateRange 
*/
hQuery.DateRange = (function() {
  function DateRange(json) {
    this.json = json;
  }
  DateRange.prototype.hi = function() {
    if (this.json['hi']) {
      return dateFromUtcSeconds(this.json['hi']);
    }
  };
  DateRange.prototype.low = function() {
    return dateFromUtcSeconds(this.json['low']);
  };
  return DateRange;
})();
/**
@class Class used to describe an entity that is providing some form of information.  This does not mean that they are 
providing any treatment just that they are providing information.
@exports Informant as hQuery.Informant 
*/
hQuery.Informant = (function() {
  function Informant(json) {
    this.json = json;
  }
  /**
  an array of hQuery.Person objects as points of contact
  @returns {Array}  
  */
  Informant.prototype.contacts = function() {
    var contact, _i, _len, _ref, _results;
    _ref = this.json['contacts'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      contact = _ref[_i];
      _results.push(new hQuery.Person(contact));
    }
    return _results;
  };
  /**
   @returns {hQuery.Organization} the organization providing the information
  */
  Informant.prototype.organization = function() {
    return new hQuery.Organization(this.json['organization']);
  };
  return Informant;
})();
/**
@class
@exports CodedEntry as hQuery.CodedEntry 
*/
hQuery.CodedEntry = (function() {
  function CodedEntry(json) {
    this.json = json;
  }
  /**
  Date and time at which the coded entry took place
  @returns {Date}
  */
  CodedEntry.prototype.date = function() {
    return hQuery.dateFromUtcSeconds(this.json['time']);
  };
  /**
  An Array of CodedValues which describe what kind of coded entry took place
  @returns {Array}
  */
  CodedEntry.prototype.type = function() {
    return hQuery.createCodedValues(this.json['codes']);
  };
  /**
  A free text description of the type of coded entry
  @returns {String}
  */
  CodedEntry.prototype.freeTextType = function() {
    return this.json['description'];
  };
  /**
  Unique identifier for this coded entry
  @returns {String}
  */
  CodedEntry.prototype.id = function() {
    return this.json['id'];
  };
  /**
  Returns true if any of this entry's codes match a code in the supplied codeSet.
  @param {Object} codeSet a hash with code system names as keys and an array of codes as values
  @returns {boolean}
  */
  CodedEntry.prototype.includesCodeFrom = function(codeSet) {
    var codedValue, _i, _len, _ref;
    _ref = this.type();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      codedValue = _ref[_i];
      if (codedValue.includedIn(codeSet)) {
        return true;
      }
    }
    return false;
  };
  return CodedEntry;
})();
/**
@class Represents a list of hQuery.CodedEntry instances. Offers utility methods for matching
entries based on codes and date ranges
@exports CodedEntryList as hQuery.CodedEntryList
*/
hQuery.CodedEntryList = (function() {
  __extends(CodedEntryList, Array);
  function CodedEntryList() {
    this.push.apply(this, arguments);
  }
  /**
  Return the number of entries that match the
  supplied code set where those entries occur between the supplied time bounds
  @param {Object} codeSet a hash with code system names as keys and an array of codes as values
  @param {Date} start the start of the period during which the entry must occur, a null value will match all times
  @param {Date} end the end of the period during which the entry must occur, a null value will match all times
  @return {int} the count of matching entries
  */
  CodedEntryList.prototype.match = function(codeSet, start, end) {
    var afterStart, beforeEnd, entry, matchingEntries, _i, _len;
    matchingEntries = 0;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      entry = this[_i];
      afterStart = !start || entry.date() >= start;
      beforeEnd = !end || entry.date() <= end;
      if (afterStart && beforeEnd && entry.includesCodeFrom(codeSet)) {
        matchingEntries++;
      }
    }
    return matchingEntries;
  };
  return CodedEntryList;
})();
/**
@private
@function

*/
hQuery.createCodedValues = function(jsonCodes) {
  var code, codeSystem, codedValues, codes, _i, _len;
  codedValues = [];
  for (codeSystem in jsonCodes) {
    codes = jsonCodes[codeSystem];
    for (_i = 0, _len = codes.length; _i < _len; _i++) {
      code = codes[_i];
      codedValues.push(new hQuery.CodedValue(code, codeSystem));
    }
  }
  return codedValues;
};/**
@namespace scoping into the hquery namespace
*/var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
this.hQuery || (this.hQuery = {});
/**
@class MedicationInformation
@exports MedicationInformation as hQuery.MedicationInformation
*/
hQuery.MedicationInformation = (function() {
  function MedicationInformation(json) {
    this.json = json;
  }
  /**
  An array of hQuery.CodedValue describing the medication
  @returns {Array}
  */
  MedicationInformation.prototype.codedProduct = function() {
    return hQuery.createCodedValues(this.json['codes']);
  };
  MedicationInformation.prototype.freeTextProductName = function() {
    return this.json['description'];
  };
  MedicationInformation.prototype.codedBrandName = function() {
    return this.json['codedBrandName'];
  };
  MedicationInformation.prototype.freeTextBrandName = function() {
    return this.json['brandName'];
  };
  MedicationInformation.prototype.drugManufacturer = function() {
    if (this.json['drugManufacturer']) {
      return new hQuery.Organization(this.json['drugManufacturer']);
    }
  };
  return MedicationInformation;
})();
/**
@class AdministrationTiming - the
@exports AdministrationTiming as hQuery.AdministrationTiming
*/
hQuery.AdministrationTiming = (function() {
  function AdministrationTiming(json) {
    this.json = json;
  }
  /**
  Provides the period of medication administration as a Scalar. An example
  Scalar that would be returned would be with value = 8 and units = 8. This would
  mean that the medication should be taken every 8 hours.
  @returns {hQuery.Scalar}
  */
  AdministrationTiming.prototype.period = function() {
    return new hQuery.Scalar(this.json['period']);
  };
  return AdministrationTiming;
})();
/**
@class DoseRestriction -  restrictions on the medications dose, represented by a upper and lower dose
@exports DoseRestriction as hQuery.DoseRestriction
*/
hQuery.DoseRestriction = (function() {
  function DoseRestriction(json) {
    this.json = json;
  }
  DoseRestriction.prototype.numerator = function() {
    return new hQuery.Scalar(this.json['numerator']);
  };
  DoseRestriction.prototype.denominator = function() {
    return new hQuery.Scalar(this.json['denominator']);
  };
  return DoseRestriction;
})();
/**
@class Fulfillment - information about when and who fulfilled an order for the medication
@exports Fulfillment as hQuery.Fullfilement
*/
hQuery.Fulfillment = (function() {
  function Fulfillment(json) {
    this.json = json;
  }
  Fulfillment.prototype.dispenseDate = function() {
    return hQuery.dateFromUtcSeconds(this.json['dispenseDate']);
  };
  Fulfillment.prototype.provider = function() {
    return new hQuery.Actor(this.json['provider']);
  };
  Fulfillment.prototype.dispensingPharmacyLocation = function() {
    return new hQuery.Address(this.json['dispensingPharmacyLocation']);
  };
  Fulfillment.prototype.quantityDispensed = function() {
    return new hQuery.Scalar(this.json['quantityDispensed']);
  };
  Fulfillment.prototype.prescriptionNumber = function() {
    return this.json['prescriptionNumber'];
  };
  Fulfillment.prototype.fillNumber = function() {
    return this.json['fillNumber'];
  };
  Fulfillment.prototype.fillStatus = function() {
    return new hQuery.Status(this.json['fillStatus']);
  };
  return Fulfillment;
})();
/**
@class OrderInformation - information abour an order for a medication
@exports OrderInformation as hQuery.OrderInformation
*/
hQuery.OrderInformation = (function() {
  function OrderInformation(json) {
    this.json = json;
  }
  OrderInformation.prototype.orderNumber = function() {
    return this.json['orderNumber'];
  };
  OrderInformation.prototype.fills = function() {
    return this.json['fills'];
  };
  OrderInformation.prototype.quantityOrdered = function() {
    return new hQuery.Scalar(this.json['quantityOrdered']);
  };
  OrderInformation.prototype.orderExpirationDateTime = function() {
    return hQuery.dateFromUtcSeconds(this.json['orderExpirationDateTime']);
  };
  OrderInformation.prototype.orderDateTime = function() {
    return hQuery.dateFromUtcSeconds(this.json['orderDateTime']);
  };
  return OrderInformation;
})();
/**
TypeOfMedication as defined by value set 2.16.840.1.113883.3.88.12.3221.8.19
which pulls two values from SNOMED to describe whether a medication is
prescription or over the counter

@class TypeOfMedication - describes whether a medication is prescription or
       over the counter
@augments hQuery.CodedEntry
@exports TypeOfMedication as hQuery.TypeOfMedication
*/
hQuery.TypeOfMedication = (function() {
  var OTC, PRESECRIPTION;
  __extends(TypeOfMedication, hQuery.CodedValue);
  function TypeOfMedication() {
    TypeOfMedication.__super__.constructor.apply(this, arguments);
  }
  PRESECRIPTION = "73639000";
  OTC = "329505003";
  /**
  @returns {Boolean}
  */
  TypeOfMedication.prototype.isPrescription = function() {
    return this.c === PRESECRIPTION;
  };
  /**
  @returns {Boolean}
  */
  TypeOfMedication.prototype.isOverTheCounter = function() {
    return this.c === OTC;
  };
  return TypeOfMedication;
})();
/**
StatusOfMedication as defined by value set 2.16.840.1.113883.1.11.20.7
The terms come from SNOMED and are managed by HL7

@class StatusOfMedication - describes the status of the medication
@augments hQuery.CodedEntry
@exports StatusOfMedication as hQuery.StatusOfMedication
*/
hQuery.StatusOfMedication = (function() {
  var ACTIVE, NO_LONGER_ACTIVE, ON_HOLD, PRIOR_HISTORY;
  __extends(StatusOfMedication, hQuery.CodedValue);
  function StatusOfMedication() {
    StatusOfMedication.__super__.constructor.apply(this, arguments);
  }
  ON_HOLD = "392521001";
  NO_LONGER_ACTIVE = "421139008";
  ACTIVE = "55561003";
  PRIOR_HISTORY = "73425007";
  /**
  @returns {Boolean}
  */
  StatusOfMedication.prototype.isOnHold = function() {
    return this.c === ON_HOLD;
  };
  /**
  @returns {Boolean}
  */
  StatusOfMedication.prototype.isNoLongerActive = function() {
    return this.c === NO_LONGER_ACTIVE;
  };
  /**
  @returns {Boolean}
  */
  StatusOfMedication.prototype.isActive = function() {
    return this.c === ACTIVE;
  };
  /**
  @returns {Boolean}
  */
  StatusOfMedication.prototype.isPriorHistory = function() {
    return this.c === PRIOR_HISTORY;
  };
  return StatusOfMedication;
})();
/**
@class represents a medication entry for a patient.
@augments hQuery.CodedEntry
@exports Medication as hQuery.Medication
*/
hQuery.Medication = (function() {
  __extends(Medication, hQuery.CodedEntry);
  function Medication() {
    Medication.__super__.constructor.apply(this, arguments);
  }
  /**
  @returns {String}
  */
  Medication.prototype.freeTextSig = function() {
    return this.json['freeTextSig'];
  };
  /**
  The actual or intended start of a medication. Slight deviation from greenCDA for C32 since
  it combines this with medication stop
  @returns {Date}
  */
  Medication.prototype.indicateMedicationStart = function() {
    return hQuery.dateFromUtcSeconds(this.json['start_time']);
  };
  /**
  The actual or intended stop of a medication. Slight deviation from greenCDA for C32 since
  it combines this with medication start
  @returns {Date}
  */
  Medication.prototype.indicateMedicationStop = function() {
    return hQuery.dateFromUtcSeconds(this.json['end_time']);
  };
  Medication.prototype.administrationTiming = function() {
    return new hQuery.AdministrationTiming(this.json['administrationTiming']);
  };
  /**
  @returns {CodedValue}  Contains routeCode or adminstrationUnitCode information.
    Route code shall have a a value drawn from FDA route of adminstration,
    and indicates how the medication is received by the patient.
    See http://www.fda.gov/Drugs/DevelopmentApprovalProcess/UCM070829
    The administration unit code shall have a value drawn from the FDA
    dosage form, source NCI thesaurus and represents the physical form of the
    product as presented to the patient.
    See http://www.fda.gov/Drugs/InformationOnDrugs/ucm142454.htm
  */
  Medication.prototype.route = function() {
    return new hQuery.CodedValue(this.json['route']['code'], this.json['route']['codeSystem']);
  };
  /**
  @returns {hQuery.Scalar} the dose
  */
  Medication.prototype.dose = function() {
    return new hQuery.Scalar(this.json['dose']);
  };
  /**
  @returns {CodedValue}
  */
  Medication.prototype.site = function() {
    return new hQuery.CodedValue(this.json['site']['code'], this.json['site']['codeSystem']);
  };
  /**
  @returns {hQuery.DoseRestriction}
  */
  Medication.prototype.doseRestriction = function() {
    return new hQuery.DoseRestriction(this.json['doseRestriction']);
  };
  /**
  @returns {String}
  */
  Medication.prototype.doseIndicator = function() {
    return this.json['doseIndicator'];
  };
  /**
  @returns {String}
  */
  Medication.prototype.fulfillmentInstructions = function() {
    return this.json['fulfillmentInstructions'];
  };
  /**
  @returns {CodedValue}
  */
  Medication.prototype.indication = function() {
    return new hQuery.CodedValue(this.json['indication']['code'], this.json['indication']['codeSystem']);
  };
  /**
  @returns {CodedValue}
  */
  Medication.prototype.productForm = function() {
    return new hQuery.CodedValue(this.json['productForm']['code'], this.json['productForm']['codeSystem']);
  };
  /**
  @returns {CodedValue}
  */
  Medication.prototype.vehicle = function() {
    return new hQuery.CodedValue(this.json['vehicle']['code'], this.json['vehicle']['codeSystem']);
  };
  /**
  @returns {CodedValue}
  */
  Medication.prototype.reaction = function() {
    return new hQuery.CodedValue(this.json['reaction']['code'], this.json['reaction']['codeSystem']);
  };
  /**
  @returns {CodedValue}
  */
  Medication.prototype.deliveryMethod = function() {
    return new hQuery.CodedValue(this.json['deliveryMethod']['code'], this.json['deliveryMethod']['codeSystem']);
  };
  /**
  @returns {hQuery.MedicationInformation}
  */
  Medication.prototype.medicationInformation = function() {
    return new hQuery.MedicationInformation(this.json);
  };
  /**
  @returns {hQuery.TypeOfMedication} Indicates whether this is an over the counter or prescription medication
  */
  Medication.prototype.typeOfMedication = function() {
    return new hQuery.TypeOfMedication(this.json['typeOfMedication']['code'], this.json['typeOfMedication']['codeSystem']);
  };
  /**
  Values conform to value set 2.16.840.1.113883.1.11.20.7 - Medication Status
  Values may be: On Hold, No Longer Active, Active, Prior History
  @returns {hQuery.StatusOfMedication}   Used to indicate the status of the medication.
  */
  Medication.prototype.statusOfMedication = function() {
    return new hQuery.StatusOfMedication(this.json['statusOfMedication']['code'], this.json['statusOfMedication']['codeSystem']);
  };
  /**
  @returns {String} free text instructions to the patient
  */
  Medication.prototype.patientInstructions = function() {
    return this.json['patientInstructions'];
  };
  /**
  @returns {Array} an array of {@link FulFillment} objects
  */
  Medication.prototype.fulfillmentHistory = function() {
    var order, _i, _len, _ref, _results;
    _ref = this.json['fulfillmentHistory'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      order = _ref[_i];
      _results.push(new hQuery.Fulfillment(order));
    }
    return _results;
  };
  /**
  @returns {Array} an array of {@link OrderInformation} objects
  */
  Medication.prototype.orderInformation = function() {
    var order, _i, _len, _ref, _results;
    _ref = this.json['orderInformation'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      order = _ref[_i];
      _results.push(new hQuery.OrderInformation(order));
    }
    return _results;
  };
  return Medication;
})();/**
@namespace scoping into the hquery namespace
*/var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
this.hQuery || (this.hQuery = {});
/**
@class Provider

Describes a person/organization that has provided treatment for the given condition. 

The dateRange element describes the last range that the actor provided treatment for the 
condition.

The provider is represented by the core:actor substitution group which equates to either a 
person element or and organization element being present.
@exports Provider as hQuery.Provider 
*/
hQuery.Provider = (function() {
  function Provider(json) {
    this.json = json;
  }
  /**
   @returns {hQuery.DateRange} the date range this provider provided treatment
  */
  Provider.prototype.effectiveDate = function() {
    return new hQuery.DateRange(this.json['effectiveDate']);
  };
  /**
   @returns {hQuery.Actor} the person or organization the provided the treatment
  */
  Provider.prototype.actor = function() {
    return new hQuery.Actor(this.json['actor']);
  };
  /**
   @returns {hQuery.Informant} the person or organization that is providing the information about this provider
  */
  Provider.prototype.informant = function() {
    return new hQuery.Informant(this.json['informant']);
  };
  /**
   @returns {String} Free text block
  */
  Provider.prototype.narrative = function() {
    return this.json['narrative'];
  };
  return Provider;
})();
/**
@class hQuery.Condition

This section is used to describe a patients problems/conditions. The types of conditions
described have been constrained to the SNOMED CT Problem Type code set. An unbounded
number of treating providers for the particular condition can be supplied.
@exports Condition as hQuery.Condition 
@augments hQuery.CodedEntry
*/
hQuery.Condition = (function() {
  __extends(Condition, hQuery.CodedEntry);
  function Condition(json) {
    this.json = json;
  }
  /**
   @returns {Array, hQuery.Provider} an array of providers for the condition
  */
  Condition.prototype.providers = function() {
    var provider, _i, _len, _ref, _results;
    _ref = this.json['treatingProviders'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      provider = _ref[_i];
      _results.push(new Provider(provider));
    }
    return _results;
  };
  return Condition;
})();/**
@namespace scoping into the hquery namespace
*/var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
this.hQuery || (this.hQuery = {});
/**
An Encounter is an interaction, regardless of the setting, between a patient and a
practitioner who is vested with primary responsibility for diagnosing, evaluating,
or treating the patient's condition. It may include visits, appointments, as well
as non face-to-face interactions. It is also a contact between a patient and a
practitioner who has primary responsibility for assessing and treating the
patient at a given contact, exercising independent judgment.
@class An Encounter is an interaction, regardless of the setting, between a patient and a
practitioner 
@augments hQuery.CodedEntry
@exports Encounter as hQuery.Encounter 
*/
hQuery.Encounter = (function() {
  __extends(Encounter, hQuery.CodedEntry);
  function Encounter() {
    Encounter.__super__.constructor.apply(this, arguments);
  }
  return Encounter;
})();/**
@namespace scoping into the hquery namespace
*/var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
this.hQuery || (this.hQuery = {});
/**
This represents all interventional, surgical, diagnostic, or therapeutic procedures or 
treatments pertinent to the patient.
@class
@augments hQuery.CodedEntry
@exports Procedure as hQuery.Procedure 
*/
hQuery.Procedure = (function() {
  __extends(Procedure, hQuery.CodedEntry);
  function Procedure() {
    Procedure.__super__.constructor.apply(this, arguments);
  }
  /**
  @returns {hQuery.Person} The entity that performed the procedure
  */
  Procedure.prototype.performer = function() {
    return new hQuery.Actor(this.json['performer']);
  };
  return Procedure;
})();/**
@namespace scoping into the hquery namespace
*/var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
this.hQuery || (this.hQuery = {});
/**
Observations generated by laboratories, imaging procedures, and other procedures. The scope
includes hematology, chemistry, serology, virology, toxicology, microbiology, plain x-ray,
ultrasound, CT, MRI, angiography, cardiac echo, nuclear medicine, pathology, and procedure
observations.
@class
@augments hQuery.CodedEntry
@exports Result as hQuery.Result 
*/
hQuery.Result = (function() {
  __extends(Result, hQuery.CodedEntry);
  function Result() {
    Result.__super__.constructor.apply(this, arguments);
  }
  /**
  A status from the HL7 ActStatusNormal vocabulary
  @returns {String}
  */
  Result.prototype.status = function() {
    return this.json['status'];
  };
  /**
  Returns the value of the result. This will return an object. The properties of this
  object are dependent on the type of result.
  */
  Result.prototype.value = function() {
    return this.json['value'];
  };
  /**
  @returns {CodedValue}
  */
  Result.prototype.interpretation = function() {
    return new hQuery.CodedValue(this.json['interpretation'].codeSystem, this.json['interpretation'].code);
  };
  /**
  @returns {String}
  */
  Result.prototype.referenceRange = function() {
    return this.json['referenceRange'];
  };
  return Result;
})();/**
@namespace scoping into the hquery namespace
*/this.hQuery || (this.hQuery = {});
/**
@class Representation of a patient
@exports Patient as hQuery.Patient
*/
hQuery.Patient = (function() {
  /**
  @constructor
  */  function Patient(json) {
    this.json = json;
  }
  /**
  @returns {String} containing M or F representing the gender of the patient
  */
  Patient.prototype.gender = function() {
    return this.json['gender'];
  };
  /**
  @returns {String} containing the patient's given name
  */
  Patient.prototype.given = function() {
    return this.json['first'];
  };
  /**
  @returns {String} containing the patient's family name
  */
  Patient.prototype.family = function() {
    return this.json['last'];
  };
  /**
  @returns {Date} containing the patient's birthdate
  */
  Patient.prototype.birthtime = function() {
    return hQuery.dateFromUtcSeconds(this.json['birthdate']);
  };
  /**
  @param (Date) date the date at which the patient age is calculated, defaults to now.
  @returns {number} the patient age in years
  */
  Patient.prototype.age = function(date) {
    var oneDay, oneYear;
    if (date == null) {
      date = new Date();
    }
    oneDay = 24 * 60 * 60 * 1000;
    oneYear = 365 * oneDay;
    return (date.getTime() - this.birthtime().getTime()) / oneYear;
  };
  /**
  @returns {hQuery.CodedEntryList} A list of {@link hQuery.Encounter} objects
  */
  Patient.prototype.encounters = function() {
    var encounter, list, _i, _len, _ref;
    list = new hQuery.CodedEntryList;
    if (this.json['encounters']) {
      _ref = this.json['encounters'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        encounter = _ref[_i];
        list.push(new hQuery.Encounter(encounter));
      }
    }
    return list;
  };
  /**
  @returns {hQuery.CodedEntryList} A list of {@link Medication} objects
  */
  Patient.prototype.medications = function() {
    var list, medication, _i, _len, _ref;
    list = new hQuery.CodedEntryList;
    if (this.json['medications']) {
      _ref = this.json['medications'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        medication = _ref[_i];
        list.push(new hQuery.Medication(medication));
      }
    }
    return list;
  };
  /**
  @returns {hQuery.CodedEntryList} A list of {@link Condition} objects
  */
  Patient.prototype.conditions = function() {
    var condition, list, _i, _len, _ref;
    list = new hQuery.CodedEntryList;
    if (this.json['conditions']) {
      _ref = this.json['conditions'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        condition = _ref[_i];
        list.push(new hQuery.Condition(condition));
      }
    }
    return list;
  };
  /**
  @returns {hQuery.CodedEntryList} A list of {@link Procedure} objects
  */
  Patient.prototype.procedures = function() {
    var list, procedure, _i, _len, _ref;
    list = new hQuery.CodedEntryList;
    if (this.json['procedures']) {
      _ref = this.json['procedures'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        procedure = _ref[_i];
        list.push(new hQuery.Procedure(procedure));
      }
    }
    return list;
  };
  /**
  @returns {hQuery.CodedEntryList} A list of {@link Result} objects
  */
  Patient.prototype.results = function() {
    var list, result, _i, _len, _ref;
    list = new hQuery.CodedEntryList;
    if (this.json['results']) {
      _ref = this.json['results'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        result = _ref[_i];
        list.push(new hQuery.Result(result));
      }
    }
    return list;
  };
  /**
  @returns {hQuery.CodedEntryList} A list of {@link Result} objects
  */
  Patient.prototype.vitalSigns = function() {
    var list, vital, _i, _len, _ref;
    list = new hQuery.CodedEntryList;
    if (this.json['vital_signs']) {
      _ref = this.json['vital_signs'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vital = _ref[_i];
        list.push(new hQuery.Result(vital));
      }
    }
    return list;
  };
  /**      
  @returns {hQuery.CodedEntryList} A list of {@link Immunization} objects
  */
  /**
  immunization: ->
    list = new hQuery.CodedEntryList
    if @json['immunization']
      for immunization in @json['immunization']
        list.push(new hQuery.Immunization(immunization))
    list
  */
  return Patient;
})();