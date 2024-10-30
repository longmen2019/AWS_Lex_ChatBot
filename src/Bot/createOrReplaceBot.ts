// Import necessary types and commands from the AWS SDK for Lex Models V2
import {
  BotFilterName, // Enum for bot filter names
  BotFilterOperator, // Enum for bot filter operators
  BotSummary, // Type for bot summary
  CreateBotCommand, // Command to create a bot
  CreateBotLocaleCommand, // Command to create a bot locale
  DeleteBotCommand, // Command to delete a bot
  IntentFilterName, // Enum for intent filter names
  IntentFilterOperator, // Enum for intent filter operators
  IntentSummary, // Type for intent summary
  ListBotsCommand, // Command to list bots
  ListIntentsCommand, // Command to list intents
  ListSlotTypesCommand, // Command to list slot types
  SlotTypeFilterName, // Enum for slot type filter names
  SlotTypeFilterOperator, // Enum for slot type filter operators
  SlotTypeSummary, // Type for slot type summary
  waitUntilBotAvailable, // Function to wait until a bot is available
  waitUntilBotLocaleCreated, // Function to wait until a bot locale is created
} from "@aws-sdk/client-lex-models-v2"

// Import the lexClient instance from a local module
import { lexClient } from "../bot.js"

// Import configuration settings from a local module
import config from "../config.js"

// Import the createIntents function from a local module
import { createIntents } from "./intents.js"

// Import the Config type from a local module
import { Config } from "./types.js"

// Import the oraPromise function from the ora library for better CLI experience
import { oraPromise } from "ora"

// Function to get a summary of a bot by its name
export const getBotSummary = async (
  botName: string // The name of the bot to get the summary for
): Promise<BotSummary | undefined> => {
  // Create a command to list bots with a filter for the bot name
  const listCommand = new ListBotsCommand({
    filters: [
      {
        name: BotFilterName.BotName, // Filter by bot name
        operator: BotFilterOperator.Equals, // Use the equals operator
        values: [botName], // The value to filter by
      },
    ],
  })
  // Send the command using the lexClient and destructure the response to get botSummaries
  const { botSummaries } = await lexClient.send(listCommand)
  // If botSummaries is defined and has at least one element, return the first one
  if (botSummaries !== undefined && botSummaries.length > 0)
    return botSummaries[0]
  else return undefined // Otherwise, return undefined
}

// Function to get a summary of an intent by its name and bot ID
export const getIntentSummary = async (
  botId: string, // The ID of the bot
  intentName: string // The name of the intent to get the summary for
): Promise<IntentSummary | undefined> => {
  // Create a command to list intents with a filter for the intent name
  const listCommand = new ListIntentsCommand({
    filters: [
      {
        name: IntentFilterName.IntentName, // Filter by intent name
        operator: IntentFilterOperator.Equals, // Use the equals operator
        values: [intentName], // The value to filter by
      },
    ],
    botId: botId, // The ID of the bot
    botVersion: "DRAFT", // The version of the bot
    localeId: config.locale, // The locale ID from the config
  })
  // Send the command using the lexClient and destructure the response to get intentSummaries
  const { intentSummaries } = await lexClient.send(listCommand)
  // If intentSummaries is defined and has at least one element, return the first one
  if (intentSummaries !== undefined && intentSummaries.length > 0)
    return intentSummaries[0]
  else return undefined // Otherwise, return undefined
}

// Function to get a summary of a slot type by its name and bot ID
export const getSlotTypeSummary = async (
  botId: string, // The ID of the bot
  slotTypeName: string // The name of the slot type to get the summary for
): Promise<SlotTypeSummary | undefined> => {
  // Create a command to list slot types with a filter for the slot type name
  const listCommand = new ListSlotTypesCommand({
    filters: [
      {
        name: SlotTypeFilterName.SlotTypeName, // Filter by slot type name
        operator: SlotTypeFilterOperator.Equals, // Use the equals operator
        values: [slotTypeName], // The value to filter by
      },
    ],
    botId: botId, // The ID of the bot
    botVersion: "DRAFT", // The version of the bot
    localeId: config.locale, // The locale ID from the config
  })
  // Send the command using the lexClient and destructure the response to get slotTypeSummaries
  const { slotTypeSummaries } = await lexClient.send(listCommand)
  // If slotTypeSummaries is defined and has at least one element, return the first one
  if (slotTypeSummaries !== undefined && slotTypeSummaries.length > 0)
    return slotTypeSummaries[0]
  else return undefined // Otherwise, return undefined
}

// Function to delete a bot by its name
const deleteBot = async (botName: string) => {
  // Get the summary of the bot
  const botSummary = await getBotSummary(botName)
  // If the bot summary is undefined, return early
  if (botSummary == undefined) return
  // Create a command to delete the bot using its ID
  const deleteBotCommand = new DeleteBotCommand({
    botId: botSummary?.botId,
  })
  // Send the command using the lexClient
  await lexClient.send(deleteBotCommand)
  // Function to check the bot's status at intervals
  const checkInterval = async () => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(async () => {
        // Get the bot summary status
        const botSummaryStatus = await getBotSummary(botName)
        try {
          // If the bot summary status is undefined, clear the interval and resolve the promise
          if (botSummaryStatus === undefined) {
            clearInterval(interval)
            resolve()
          }
        } catch (error) {
          // Log any errors that occur
          console.error("Error checking Bot status:", error)
        }
      }, 1000) // Check every 1000 milliseconds (1 second)
    })
  }
  // Wait for the check interval to complete
  await checkInterval()
}

// Function to create a bot using the provided configuration
const createBot = async (config: Config) => {
  // Create a command to create a bot with the specified configuration
  const createBotCommand = new CreateBotCommand({
    botName: config.botName, // The name of the bot
    dataPrivacy: { childDirected: false }, // Data privacy settings
    idleSessionTTLInSeconds: config.TTLInSeconds, // Idle session TTL in seconds
    roleArn: config.roleArn, // The role ARN
  })
  // Send the command using the lexClient and get the output
  const createBotCommandOutput = await lexClient.send(createBotCommand)
  // Wait until the bot is available
  await waitUntilBotAvailable(
    { client: lexClient, maxWaitTime: 60 }, // Wait for up to 60 seconds
    { botId: createBotCommandOutput.botId } // The ID of the bot
  )

  // Send a command to create a bot locale
  await lexClient.send(
    new CreateBotLocaleCommand({
      botId: createBotCommandOutput.botId, // The ID of the bot
      botVersion: "DRAFT", // The version of the bot
      localeId: config.locale, // The locale ID from the config
      nluIntentConfidenceThreshold: 0.4, // NLU intent confidence threshold
    })
  )
  // Wait until the bot locale is created
  await waitUntilBotLocaleCreated(
    {
      client: lexClient,
      maxWaitTime: 60, // Wait for up to 60 seconds
    },
    {
      botId: createBotCommandOutput.botId, // The ID of the bot
      botVersion: "DRAFT", // The version of the bot
      localeId: config.locale, // The locale ID from the config
    }
  )

  // Create intents for the bot
  await createIntents()
}

// Default export function to manage bot creation and deletion
export default async () => {
  // Get the summary of the bot
  const botSummary = await getBotSummary(config.botName)
  // If the bot exists, delete it
  if (botSummary?.botId) {
    console.log(`Deleting ${config.botName}`) // Log the deletion
    await oraPromise(deleteBot(config.botName), { successText: "Deleted" }) // Delete the bot with a loading spinner
  }
  console.log(`Creating ${config.botName}`) // Log the creation
  await oraPromise(createBot(config), { successText: "Created" }) // Create the bot with a loading spinner
}
