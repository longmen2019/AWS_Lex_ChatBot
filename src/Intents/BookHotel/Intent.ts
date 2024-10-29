// Import necessary functions from botUtils.js
import {
  elicitSlot, // Function to prompt the user for a specific slot value
  endConversation, // Function to end the conversation
  invokeDialogCodeHook, // Function to invoke a code hook during the dialog
  startIntent, // Function to start a new intent
  utterances // Function to handle sample utterances
} from "../../Bot/botUtils.js";

// Import types for Intent and Slot from types.js
import { Intent, Slot } from "../../Bot/types.js";

// Import sample utterances for the intent from utterances.js
import sampleUtterances from "./utterances.js";

// Import specific slot definitions from slots.js
import { checkInDate, location, nights, roomType } from "./slots.js";

// Define the intent for booking a hotel
const intent: Intent = {
  intentName: "BookHotel", // Name of the intent
  description: "Intent to book a hotel", // Description of the intent
  sampleUtterances: utterances(sampleUtterances), // Sample utterances for the intent
  initialResponseSetting: {
    nextStep: invokeDialogCodeHook(), // Initial step to invoke a code hook
    codeHook: {
      active: true, // Indicates that the code hook is active
      enableCodeHookInvocation: true, // Enables the invocation of the code hook
      invocationLabel: "MAIN_PROMPT", // Label for the code hook invocation
      postCodeHookSpecification: {
        successNextStep: elicitSlot(location), // Next step if the code hook succeeds
        failureNextStep: endConversation(), // Next step if the code hook fails
        timeoutNextStep: endConversation(), // Next step if the code hook times out
      },
    },
  },
  intentConfirmationSetting: {
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "Okay, I have you down for a {Nights} night stay in {Location} starting {CheckInDate}. Shall I book the reservation?", // Confirmation message template
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
const slots: Slot[] = [location, checkInDate, nights, roomType];

// Export the intent and slots as the default export
export default { intent, slots };
