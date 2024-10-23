import boto3

# Create a client for Amazon Lex V2 runtime
lex_runtime = boto3.client('lexv2-runtime', region_name='us-east-1')

# Call your bot
response = lex_runtime.recognize_text(
    botId='VPR6NNEBNX',       # Replace with your bot's actual ID
    botAliasId='TSTALIASID',  # Replace with your bot alias's actual ID
    localeId='en_US',
    sessionId='testSession',
    text='I want to book a flight'
)

print(response)
