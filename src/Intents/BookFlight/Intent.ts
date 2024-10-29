// Importing utility functions and constants from the botUtils.js file
import { endConversation, invokeDialogCodeHook, elicitSlot, startIntent, utterances } from "../../Bot/botUtils.js";

// Importing types for Intent and Slot from the types.js file
import { Intent, Slot } from "../../Bot/types.js";

// Importing slot definitions for the flight booking intent
import { departureCity, departureDate, returnDate, passengerCount, arrivalCity } from "./slots.js";

// Importing sample utterances for the flight booking intent
import sampleUtterances from "./utterances.js";

// Defining the intent object for booking a flight
const intent: Intent = {
  // Name of the intent
  intentName: "BookFlight",

  // Description of what the intent does
  description: "Intent to book a flight",

  // Sample utterances that can trigger this intent
  sampleUtterances: utterances(sampleUtterances),

  // Initial response settings when the intent is triggered
  initialResponseSetting: {
    // The next step is to invoke a dialog code hook
    nextStep: invokeDialogCodeHook(),

    // Configuration for the code hook
    codeHook: {
      // Indicates that the code hook is active
      active: true,

      // Enables invocation of the code hook
      enableCodeHookInvocation: true,

      // Label for the code hook invocation
      invocationLabel: "MAIN_PROMPT",

      // Specification for what happens after the code hook is executed
      postCodeHookSpecification: {
        // If the code hook succeeds, end the conversation
        successNextStep: endConversation(),

        // If the code hook fails, end the conversation
        failureNextStep: endConversation(),

        // If the code hook times out, end the conversation
        timeoutNextStep: endConversation(),
      },
    },
  },

  // Settings for confirming the intent with the user
  intentConfirmationSetting: {
    // Specification for the confirmation prompt
    promptSpecification: {
      // Groups of messages to be used in the confirmation prompt
      messageGroups: [
        {
          // The message to be displayed
          message: {
            // Plain text message for the confirmation prompt
            plainTextMessage: {
              // The actual message text with placeholders for dynamic values
              value: "Okay, I have you booked for a flight from {DepartureCity} to {ArrivalCity} on {DepartureDate}. Shall I proceed?",
            },
          },
        },
      ],

      // Maximum number of retries for the confirmation prompt
      maxRetries: 5,
    },

    // Next step if the user confirms the intent
    confirmationNextStep: endConversation(),

    // Next step if the user declines the intent
    declinationNextStep: endConversation(),

    // Response to be given if the user declines the intent
    declinationResponse: {
      // Groups of messages to be used in the declination response
      messageGroups: [
        {
          // The message to be displayed
          message: {
            // Plain text message for the declination response
            plainTextMessage: {
              // The actual message text
              value: "Alright, if you need anything else, just let me know!",
            },
          },
        },
      ],
    },

    // Next step if the confirmation fails
    failureNextStep: startIntent("FallbackIntent"),
  },
};

// Defining the slots required for the flight booking intent
const slots: Slot[] = [
  // Slot for the departure city with priority 1
  { ...departureCity, priority: 1 },

  // Slot for the departure date with priority 2
  { ...departureDate, priority: 2 },

  // Slot for the return date with priority 3
  { ...returnDate, priority: 3 },

  // Slot for the passenger count with priority 4
  { ...passengerCount, priority: 4 },

  // Slot for the arrival city with priority 5
  { ...arrivalCity, priority: 5 },
];

// Exporting the intent and slots as the default export of the module
export default { intent, slots };
