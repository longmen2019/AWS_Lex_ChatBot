import { confirmIntent, elicitSlot, startIntent } from "../../Bot/botUtils.js";
import { Slot } from "../../Bot/types.js";

export const departureCity: Slot = {
  slotName: "DepartureCity",
  slotTypeName: "DepartureCityValues",  // Assuming this is defined in SlotTypes
  description: "The city from which the flight departs.",
  priority: 1,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What city are you departing from?",
            },
          },
        },
      ],
      maxRetries: 3,
    },
    slotCaptureSetting: {
      captureNextStep: confirmIntent(),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
};

export const departureDate: Slot = {
  slotName: "DepartureDate",
  slotTypeName: "AMAZON.Date",
  description: "The date of departure.",
  priority: 2,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "When do you want to depart?",
            },
          },
        },
      ],
      maxRetries: 3,
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(departureCity),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
};

export const returnDate: Slot = {
  slotName: "ReturnDate",
  slotTypeName: "AMAZON.Date",
  description: "The date of return.",
  priority: 3,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "When will you be returning?",
            },
          },
        },
      ],
      maxRetries: 3,
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(departureDate),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
};

export const passengerCount: Slot = {
  slotName: "PassengerCount",
  slotTypeName: "PassengerCountValues",  // Assuming this is defined in SlotTypes
  description: "The number of passengers traveling.",
  priority: 4,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "How many passengers are traveling?",
            },
          },
        },
      ],
      maxRetries: 3,
    },
    slotCaptureSetting: {
      captureNextStep: confirmIntent(),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
};

export const arrivalCity: Slot = {
  slotName: "ArrivalCity",
  slotTypeName: "ArrivalCityValues",  // Assuming this is defined in SlotTypes
  description: "The city to which the flight is arriving.",
  priority: 5,
  valueElicitationSetting: {
    slotConstraint: "Required",
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What city are you arriving in?",
            },
          },
        },
      ],
      maxRetries: 3,
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(passengerCount),
      failureNextStep: startIntent("FallbackIntent"),
    },
  },
};
