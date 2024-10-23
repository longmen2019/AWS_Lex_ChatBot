import boto3
import json

# Create a client for Amazon Lex V2 runtime
lex_runtime = boto3.client('lexv2-runtime', region_name='us-east-1')

# Call your bot
response = lex_runtime.recognize_text(
    botId='VPR6NNEBNX',
    botAliasId='TSTALIASID',
    localeId='en_US',
    sessionId='testSession',
    text='I want to book a flight'
)

# Pretty print function for better readability
def pretty_print_response(response):
    print("Response Metadata:")
    print(f"  - Request ID: {response['ResponseMetadata']['RequestId']}")
    print(f"  - HTTP Status Code: {response['ResponseMetadata']['HTTPStatusCode']}")
    print(f"  - HTTP Headers:")
    for key, value in response['ResponseMetadata']['HTTPHeaders'].items():
        print(f"    - {key}: {value}")
    print(f"  - Retry Attempts: {response['ResponseMetadata']['RetryAttempts']}")

    print("\nMessages:")
    for message in response['messages']:
        print(f"  - {message['content']} ({message['contentType']})")

    session_state = response['sessionState']
    print("\nSession State:")
    print(f"  - Dialog Action: {session_state['dialogAction']['type']}")
    print(f"  - Slot to Elicit: {session_state['dialogAction'].get('slotToElicit', 'N/A')}")
    intent = session_state['intent']
    print(f"  - Intent: {intent['name']}")
    print(f"  - Slots:")
    for slot, value in intent['slots'].items():
        print(f"    - {slot}: {value}")
    print(f"  - State: {intent['state']}")
    print(f"  - Confirmation State: {intent['confirmationState']}")
    print(f"  - Session Attributes: {json.dumps(session_state['sessionAttributes'], indent=4)}")
    print(f"  - Originating Request ID: {session_state['originatingRequestId']}")

    print("\nInterpretations:")
    for i, interpretation in enumerate(response['interpretations'], 1):
        intent = interpretation['intent']
        print(f"  {i}. Intent: {intent['name']}")
        print(f"     Slots:")
        for slot, value in intent['slots'].items():
            print(f"       - {slot}: {value}")
        if 'nluConfidence' in interpretation:
            print(f"     NLU Confidence: {interpretation['nluConfidence']['score']}")
        print(f"     Interpretation Source: {interpretation['interpretationSource']}")

    print(f"\nSession ID: {response['sessionId']}")


# Call the pretty print function
pretty_print_response(response)
