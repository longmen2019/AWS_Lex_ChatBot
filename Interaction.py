import boto3
import json

# Create a client for Amazon Lex V2 runtime
lex_client = boto3.client('lexv2-runtime', region_name='us-east-1')

# Details of your bot
BOT_ID = '5KLAHDIPRU'
BOT_ALIAS_ID = 'TSTALIASID'
LOCALE_ID = 'en_US'
SESSION_ID = 'testSession'

def start_conversation():
    # Initial bot greeting
    print("Bot: Hi! How can I assist you today?")

    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit']:
            print("Exiting conversation.")
            break

        # Call Lex Bot
        response = lex_client.recognize_text(
            botId=BOT_ID,
            botAliasId=BOT_ALIAS_ID,
            localeId=LOCALE_ID,
            sessionId=SESSION_ID,
            text=user_input
        )

        handle_response(response)

def handle_response(response):
    # Check if there are messages from the bot
    if 'messages' in response:
        for message in response['messages']:
            print("Bot:", message['content'])
    else:
        print("Bot: I didn't catch that. Could you please rephrase?")
        print("\nNo response from bot. Here's the full response for debugging:")
        print(json.dumps(response, indent=2))

if __name__ == '__main__':
    start_conversation()
