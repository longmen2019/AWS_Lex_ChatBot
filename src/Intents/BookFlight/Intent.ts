import { endConversation, invokeDialogCodeHook, elicitSlot, startIntent, utterances } from "../../Bot/botUtils.js";
import { Intent, Slot } from "../../Bot/types.js";
import { departureCity, departureDate, returnDate, passengerCount, arrivalCity } from "./slots.js";
import sampleUtterances from "./utterances.js";

const intent: Intent = {
  intentName: "BookFlight",
  description: "Intent to book a flight",
  sampleUtterances: utterances(sampleUtterances),
  initialResponseSetting: {
    nextStep: invokeDialogCodeHook(),
    codeHook: {
      active: true,
      enableCodeHookInvocation: true,
      invocationLabel: "MAIN_PROMPT",
      postCodeHookSpecification: {
        successNextStep: endConversation(),
        failureNextStep: endConversation(),
        timeoutNextStep: endConversation(),
      },
    },
  },
  intentConfirmationSetting: {
    promptSpecification: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "Okay, I have you booked for a flight from {DepartureCity} to {ArrivalCity} on {DepartureDate}. Shall I proceed?",
            },
          },
        },
      ],
      maxRetries: 5,
    },
    confirmationNextStep: endConversation(),
    declinationNextStep: endConversation(),
    declinationResponse: {
      messageGroups: [
        {
          message: {
            plainTextMessage: {
              value: "Alright, if you need anything else, just let me know!",
            },
          },
        },
      ],
    },
    failureNextStep: startIntent("FallbackIntent"),
  },
};

const slots: Slot[] = [
  { ...departureCity, priority: 1 },
  { ...departureDate, priority: 2 },
  { ...returnDate, priority: 3 },
  { ...passengerCount, priority: 4 },
  { ...arrivalCity, priority: 5 },
];

export default { intent, slots };
