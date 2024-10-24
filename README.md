# Build an Amazon Lex V2 Chatbot using AWS SDK

This project demonstrates how to build a conversational chatbot using AWS Lex V2 and integrate it with AWS Lambda for custom fulfillment logic.

## Features

- Book flights by providing departure and arrival cities, dates, and passenger count.
- Custom slot types for cities and passenger counts.
- Lambda function integration for handling intents.

## Prerequisites

- AWS Account
- Node.js installed
- AWS CLI configured

## Setup

### Configure Settings

Configure the bot properties in `src/config.ts`. Specify a name for the bot you are building and provide the ARN of the role that has permissions to delete and (re)create the bot. For example:
```plaintext
arn:aws:iam::123456789012:role/aws-service-role/lexv2.amazonaws.com/AWSServiceRoleForLexV2Bots_ABCDEFGHIJK
```

**Caution**: Running this project will delete and re-create the bot with the name specified in `config.ts`. If you specify the name of an existing bot, it will be overwritten.

### Install Dependencies

Install dependencies for the project by running:
```bash
npm install
```

### Build the Bot

Build the bot by running:
```bash
npm run dev
```

This will take a few seconds to complete. Make sure your credentials are accessible in the shell when running the above command.

Examine the `BookTripUsingSDK` bot created in the AWS Console. It should contain the `BookCar` and `BookHotel` intents.

### Build and Test the Bot in the AWS Console

1. Select the `BookTripUsingSDK` bot in the AWS Console and build it.
2. Test the bot using the test panel in the console. It should work just like the default `BookTrip` bot.
3. Examine the Visual Builder diagrams for the intents. They should be identical to the ones for the intents in the `BookTrip` bot.

## Creating Your Own Intents

1. **Add an Intent**:
   - Create a new folder under `Intents` with the name of the new intent.
   - Inside the folder, create a file called `Intent.ts` to define the intent, `slots.ts` to define the slots for the new intent, and `utterances.ts` to specify utterances.
   - If the intent needs new slot types, they can be defined and exported from `SlotTypes/slotTypes.ts`.

2. **Define the Intent**:
   - In `Intent.ts`, create an object of type `Intent` to specify the intent settings, including the `initialResponseSetting`.
   - `Intent.ts` must export the intent object and all the slots required by the intent. Refer to `Intent.ts` for `BookCar` and `BookHotel`.

3. **Define the Slots**:
   - Define the slots required for the intent in `slots.ts`.
   - All slots created in the file must be exported so that they can be referred to and exported from `Intents.ts`. Refer to `slots.ts` for `BookCar` and `BookHotel`.

4. **Export the Intent**:
   - After defining the intent, export it from the `Intents/index.ts` file. This will ensure that the next time you build the bot, the new intent will be included in the bot.

5. **Rebuild the Bot**:
   - Re-run `npm run dev` to rebuild the bot with the new intents.


