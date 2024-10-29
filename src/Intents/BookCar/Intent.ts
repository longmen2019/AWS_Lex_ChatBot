// Import necessary functions and constants from botUtils.js
import {
  elicitSlot, // Function to prompt the user for a specific slot value
  endConversation, // Function to end the conversation
  startIntent, // Function to start a new intent
  utterances // Function to handle sample utterances
} from "../../Bot/botUtils.js";

// Import types for Intent and Slot from types.js
import { Intent, Slot } from "../../Bot/types.js";

// Import specific slot definitions from slots.js
import {
  carType, // Slot for the type of car
  driverAge, // Slot for the driver's age
  pickupCity, // Slot for the city where the car will be picked up
  pickupDate, // Slot for the date when the car will be picked up
  returnDate // Slot for the date when the car will be returned
} from "./slots.js";

// Import sample utterances for the intent from utterances.js
import sampleUtterances from "./utterances.js";

// Define the intent for booking a car
const intent: Intent = {
  intentName: "BookCar", // Name of the intent
  description: "Intent to book a car", // Description of the intent
  sampleUtterances: utterances(sampleUtterances), // Sample utterances for the intent
  initialResponseSetting: {
    nextStep: elicitSlot(pickupCity), // Initial step to prompt the user for the pickup city
  },
  intentConfirmationSetting: {
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "Okay, I have you down for a {CarType} rental in {PickUpCity} from {PickUpDate} to {ReturnDate}. Should I book the reservation?", // Confirmation message template
            },
          },
        },
      ],
      maxRetries: 5, // Maximum number of retries for confirmation
    },
    confirmationNextStep: endConversation(), // Next step if the user confirms the booking
    declinationNextStep: endConversation(), // Next step if the user declines the booking
    declinationResponse: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "Okay, I have cancelled your reservation in progress.", // Message if the user cancels the booking
            },
          },
        },
      ],
    },
    failureNextStep: startIntent("FallbackIntent"), // Next step if the confirmation fails
  },
};

// Define the slots required for the intent
const slots: Slot[] = [pickupCity, pickupDate, returnDate, driverAge, carType];

// Export the intent and slots as the default export
export default { intent, slots };
