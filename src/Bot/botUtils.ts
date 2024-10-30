// Import necessary types and constants from the AWS SDK for Lex Models V2
import {
  ConditionalBranch,
  ConditionalSpecification,
  DefaultConditionalBranch,
  DialogActionType,
  DialogState,
  SampleUtterance,
} from "@aws-sdk/client-lex-models-v2"

// Import the Slot type from a local module
import { Slot } from "./types.js"

// Function to create a DialogState for eliciting a slot
export const elicitSlot = (
  slot: Slot, // The slot to elicit
  intent?: DialogState["intent"], // Optional intent information
  sessionAttributes?: DialogState["sessionAttributes"] // Optional session attributes
): DialogState => ({
  // Return a DialogState object
  dialogAction: {
    type: DialogActionType.ElicitSlot, // Set the action type to ElicitSlot
    slotToElicit: slot.slotName, // Specify the slot to elicit
  },
  intent, // Include the intent if provided
  sessionAttributes, // Include session attributes if provided
})

// Function to create a ConditionalBranch object
export const conditionalBranch = (
  name: ConditionalBranch["name"], // The name of the conditional branch
  expressionString: NonNullable<ConditionalBranch["condition"]>["expressionString"], // The condition expression string
  nextStep: NonNullable<ConditionalBranch["nextStep"]>, // The next step to execute
  response?: ConditionalBranch["response"] // Optional response
): ConditionalBranch => ({
  // Return a ConditionalBranch object
  name, // Set the name
  condition: { expressionString }, // Set the condition with the expression string
  nextStep, // Set the next step
  response, // Include the response if provided
})

// Function to create a DefaultConditionalBranch object
export const defaultBranch = (
  nextStep: DefaultConditionalBranch["nextStep"], // The next step to execute
  response?: DefaultConditionalBranch["response"] // Optional response
): DefaultConditionalBranch => ({
  // Return a DefaultConditionalBranch object
  nextStep, // Set the next step
  response, // Include the response if provided
})

// Function to create a ConditionalSpecification object
export const conditions = (
  conditionalBranches: ConditionalSpecification["conditionalBranches"], // Array of conditional branches
  defaultBranch: ConditionalSpecification["defaultBranch"], // Default branch
  active: ConditionalSpecification["active"] = true // Whether the condition is active (default to true)
): ConditionalSpecification => ({
  // Return a ConditionalSpecification object
  conditionalBranches, // Set the conditional branches
  defaultBranch, // Set the default branch
  active, // Set the active status
})

// Function to create a DialogState for evaluating a conditional
export const evaluateConditional = (
  sessionAttributes?: DialogState["sessionAttributes"], // Optional session attributes
  intent?: DialogState["intent"] // Optional intent information
): DialogState => ({
  // Return a DialogState object
  dialogAction: {
    type: DialogActionType.EvaluateConditional, // Set the action type to EvaluateConditional
  },
  sessionAttributes, // Include session attributes if provided
  intent, // Include the intent if provided
})

// Function to create a DialogState for starting an intent
export const startIntent = (
  intent: NonNullable<DialogState["intent"]>["name"], // The name of the intent to start
  sessionAttributes?: DialogState["sessionAttributes"] // Optional session attributes
): DialogState => ({
  // Return a DialogState object
  intent: {
    name: intent, // Set the intent name
  },
  sessionAttributes, // Include session attributes if provided
  dialogAction: {
    type: "StartIntent", // Set the action type to StartIntent
  },
})

// Function to create a DialogState for ending a conversation
export const endConversation = (
  sessionAttributes?: DialogState["sessionAttributes"] // Optional session attributes
): DialogState => ({
  // Return a DialogState object
  sessionAttributes, // Include session attributes if provided
  dialogAction: {
    type: DialogActionType.EndConversation, // Set the action type to EndConversation
  },
})

// Function to create a DialogState for invoking a dialog code hook
export const invokeDialogCodeHook = (
  intent?: DialogState["intent"], // Optional intent information
  sessionAttributes?: DialogState["sessionAttributes"] // Optional session attributes
): DialogState => ({
  // Return a DialogState object
  dialogAction: {
    type: DialogActionType.InvokeDialogCodeHook, // Set the action type to InvokeDialogCodeHook
  },
  intent, // Include the intent if provided
  sessionAttributes, // Include session attributes if provided
})

// Function to create a DialogState for closing an intent
export const closeIntent = (
  intent?: DialogState["intent"], // Optional intent information
  sessionAttributes?: DialogState["sessionAttributes"] // Optional session attributes
): DialogState => ({
  // Return a DialogState object
  dialogAction: {
    type: DialogActionType.CloseIntent, // Set the action type to CloseIntent
  },
  intent, // Include the intent if provided
  sessionAttributes, // Include session attributes if provided
})

// Function to create a DialogState for confirming an intent
export const confirmIntent = (
  intent?: DialogState["intent"], // Optional intent information
  sessionAttributes?: DialogState["sessionAttributes"] // Optional session attributes
): DialogState => ({
  // Return a DialogState object
  dialogAction: {
    type: DialogActionType.ConfirmIntent, // Set the action type to ConfirmIntent
  },
  intent, // Include the intent if provided
  sessionAttributes, // Include session attributes if provided
})

// Function to create a DialogState for eliciting an intent
export const elicitIntent = (
  intent?: DialogState["intent"], // Optional intent information
  sessionAttributes?: DialogState["sessionAttributes"] // Optional session attributes
): DialogState => ({
  // Return a DialogState object
  dialogAction: {
    type: "ElicitIntent", // Set the action type to ElicitIntent
  },
  intent, // Include the intent if provided
  sessionAttributes, // Include session attributes if provided
})

// Function to create a DialogState for fulfilling an intent
export const fulfillIntent = (
  intent?: DialogState["intent"], // Optional intent information
  sessionAttributes?: DialogState["sessionAttributes"] // Optional session attributes
): DialogState => ({
  // Return a DialogState object
  dialogAction: {
    type: DialogActionType.FulfillIntent, // Set the action type to FulfillIntent
  },
  intent, // Include the intent if provided
  sessionAttributes, // Include session attributes if provided
})

// Function to create an array of SampleUtterance objects from an array of strings
export const utterances = (utterances: string[]): SampleUtterance[] =>
  utterances.map((utterance) => ({ utterance })) // Map each string to a SampleUtterance object

// Function to create a plain text message object
export const plainTextMessage = (message: string) => ({
  messageGroups: [
    {
      message: {
        plainTextMessage: {
          value: message, // Set the message value
        },
      },
    },
  ],
})
