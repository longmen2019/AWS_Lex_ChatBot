// Importing the DialogActionType from AWS SDK for Lex Models V2
import { DialogActionType } from "@aws-sdk/client-lex-models-v2";

// Importing utility functions for bot interactions
import {
  confirmIntent,  // Function to confirm the user's intent
  elicitIntent,   // Function to elicit the user's intent
  elicitSlot,     // Function to elicit a specific slot value from the user
  startIntent,    // Function to start a new intent
} from "../../Bot/botUtils.js";

// Importing the Slot type definition
import { Slot } from "../../Bot/types.js";

// Defining the 'roomType' slot
export const roomType: Slot = {
  slotName: "RoomType",  // Name of the slot
  slotTypeName: "RoomTypeValues",  // Type of values the slot can take
  description: "Enumeration of types of rooms that are offered by a hotel.",  // Description of the slot
  priority: 1,  // Priority of the slot in the dialog
  valueElicitationSetting: {
    slotConstraint: "Required",  // Indicates that this slot is required
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What type of room would you like, queen, king or deluxe?",  // Prompt message to elicit the slot value
            },
          },
        },
      ],
      maxRetries: 5,  // Maximum number of retries to elicit the slot value
    },
    slotCaptureSetting: {
      captureNextStep: confirmIntent(),  // Next step if the slot value is successfully captured
      failureNextStep: startIntent("FallbackIntent"),  // Next step if the slot value capture fails
    },
  },
};

// Defining the 'nights' slot
export const nights: Slot = {
  slotName: "Nights",  // Name of the slot
  slotTypeName: "AMAZON.Number",  // Type of values the slot can take (number)
  description: "Number of nights in the hotel stay.",  // Description of the slot
  priority: 1,  // Priority of the slot in the dialog
  valueElicitationSetting: {
    slotConstraint: "Required",  // Indicates that this slot is required
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "How many nights will you be staying?",  // Prompt message to elicit the slot value
            },
          },
        },
      ],
      maxRetries: 5,  // Maximum number of retries to elicit the slot value
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(roomType),  // Next step if the slot value is successfully captured
      failureNextStep: startIntent("FallbackIntent"),  // Next step if the slot value capture fails
    },
  },
};

// Defining the 'checkInDate' slot
export const checkInDate: Slot = {
  slotName: "CheckInDate",  // Name of the slot
  slotTypeName: "AMAZON.Date",  // Type of values the slot can take (date)
  description: "Date of check-in",  // Description of the slot
  priority: 1,  // Priority of the slot in the dialog
  valueElicitationSetting: {
    slotConstraint: "Required",  // Indicates that this slot is required
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What day do you want to check in?",  // Prompt message to elicit the slot value
            },
          },
        },
      ],
      maxRetries: 5,  // Maximum number of retries to elicit the slot value
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(nights),  // Next step if the slot value is successfully captured
      failureNextStep: startIntent("FallbackIntent"),  // Next step if the slot value capture fails
    },
  },
};

// Defining the 'location' slot
export const location: Slot = {
  slotName: "Location",  // Name of the slot
  slotTypeName: "AMAZON.City",  // Type of values the slot can take (city)
  description: "Location of the city in which the hotel is located",  // Description of the slot
  priority: 1,  // Priority of the slot in the dialog
  valueElicitationSetting: {
    slotConstraint: "Required",  // Indicates that this slot is required
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "What city will you be staying in?",  // Prompt message to elicit the slot value
            },
          },
        },
      ],
      maxRetries: 5,  // Maximum number of retries to elicit the slot value
    },
    slotCaptureSetting: {
      captureNextStep: elicitSlot(checkInDate),  // Next step if the slot value is successfully captured
      failureNextStep: startIntent("FallbackIntent"),  // Next step if the slot value capture fails
    },
  },
};
