// Import the DialogActionType from the AWS SDK for Lex Models V2
import { DialogActionType } from "@aws-sdk/client-lex-models-v2";

// Import necessary functions from botUtils.js
import {
  confirmIntent, // Function to confirm the user's intent
  elicitIntent, // Function to prompt the user for their intent
  elicitSlot, // Function to prompt the user for a specific slot value
  startIntent, // Function to start a new intent
} from "../../Bot/botUtils.js";

// Import the Slot type from types.js
import { Slot } from "../../Bot/types.js";

// Define the carType slot
export const carType: Slot = {
  slotName: "CarType", // Name of the slot
  slotTypeName: "CarTypeValues", // Type of values the slot can take
  description: "Type of car being reserved.", // Description of the slot
  priority: 1, // Priority of the slot
  valueElicitationSetting: {
    slotConstraint: "Required", // Indicates that this slot is required
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What type of car would you like to rent? Our most popular options are economy, midsize, and luxury", // Prompt message to elicit the slot value
            },
          },
        },
      ],
      maxRetries: 5, // Maximum number of retries for prompting the user
    },
    slotCaptureSetting: {
      captureNextStep: confirmIntent(), // Next step if the slot is successfully captured
      failureNextStep: startIntent("FallbackIntent"), // Next step if capturing the slot fails
    },
  },
};

// Define the driverAge slot
export const driverAge: Slot = {
  slotName: "DriverAge", // Name of the slot
  slotTypeName: "AMAZON.Number", // Type of values the slot can take (number)
  description: "Age of the driver during the car rental.", // Description of the slot
  priority: 1, // Priority of the slot
  valueElicitationSetting: {
    slotConstraint: "Required", // Indicates that this slot is required
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "How old is the driver for this rental?", // Prompt message to elicit the slot value
            },
          },
        },
      ],
      maxRetries: 5, // Maximum number of retries for prompting the user
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(carType), // Next step if the slot is successfully captured
      failureNextStep: startIntent("FallbackIntent"), // Next step if capturing the slot fails
    },
  },
};

// Define the returnDate slot
export const returnDate: Slot = {
  slotName: "ReturnDate", // Name of the slot
  slotTypeName: "AMAZON.Date", // Type of values the slot can take (date)
  description: "Date of return. Should be required when the flight is not one way.", // Description of the slot
  priority: 1, // Priority of the slot
  valueElicitationSetting: {
    slotConstraint: "Required", // Indicates that this slot is required
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What day do you want to return the car?", // Prompt message to elicit the slot value
            },
          },
        },
      ],
      maxRetries: 5, // Maximum number of retries for prompting the user
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(driverAge), // Next step if the slot is successfully captured
      failureNextStep: startIntent("FallbackIntent"), // Next step if capturing the slot fails
    },
  },
};

// Define the pickupDate slot
export const pickupDate: Slot = {
  slotName: "PickUpDate", // Name of the slot
  slotTypeName: "AMAZON.Date", // Type of values the slot can take (date)
  description: "Date to start the rental", // Description of the slot
  priority: 1, // Priority of the slot
  valueElicitationSetting: {
    slotConstraint: "Required", // Indicates that this slot is required
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What day do you want to start your rental?", // Prompt message to elicit the slot value
            },
          },
        },
      ],
      maxRetries: 5, // Maximum number of retries for prompting the user
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(returnDate), // Next step if the slot is successfully captured
      failureNextStep: startIntent("FallbackIntent"), // Next step if capturing the slot fails
    },
  },
};

// Define the pickupCity slot
export const pickupCity: Slot = {
  slotName: "PickUpCity", // Name of the slot
  slotTypeName: "AMAZON.City", // Type of values the slot can take (city)
  description: "City in which the car reservation is being made", // Description of the slot
  priority: 1, // Priority of the slot
  valueElicitationSetting: {
    slotConstraint: "Required", // Indicates that this slot is required
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "In what city do you need to rent a car?", // Prompt message to elicit the slot value
            },
          },
        },
      ],
      maxRetries: 5, // Maximum number of retries for prompting the user
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(pickupDate), // Next step if the slot is successfully captured
      failureNextStep: startIntent("FallbackIntent"), // Next step if capturing the slot fails
    },
  },
};
