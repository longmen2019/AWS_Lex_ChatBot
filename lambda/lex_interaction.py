import json

def lambda_handler(event, context):
    # Logging the event for debugging purposes
    print("Received event: " + json.dumps(event, indent=2))

    intent_name = event['sessionState']['intent']['name']

    # Handle different intents
    if intent_name == "BookFlight":
        return book_flight_handler(event)
    elif intent_name == "GreetUserIntent":
        return greet_user_handler(event)
    else:
        return default_handler(event)

def book_flight_handler(event):
    slots = event['sessionState']['intent']['slots']
    departure_city = slots['DepartureCity']['value']['interpretedValue']
    arrival_city = slots['ArrivalCity']['value']['interpretedValue']
    departure_date = slots['DepartureDate']['value']['interpretedValue']
    return_date = slots['ReturnDate']['value']['interpretedValue']
    passenger_count = slots['PassengerCount']['value']['interpretedValue']

    response_message = f"Flight booked from {departure_city} to {arrival_city} on {departure_date}. Returning on {return_date} for {passenger_count} passengers."

    return {
        "sessionState": {
            "dialogAction": {
                "type": "Close"
            },
            "intent": {
                "name": "BookFlight",
                "state": "Fulfilled"
            }
        },
        "messages": [
            {
                "contentType": "PlainText",
                "content": response_message
            }
        ]
    }

def greet_user_handler(event):
    response_message = "Hello! How can I assist you today?"

    return {
        "sessionState": {
            "dialogAction": {
                "type": "Close"
            },
            "intent": {
                "name": "GreetUserIntent",
                "state": "Fulfilled"
            }
        },
        "messages": [
            {
                "contentType": "PlainText",
                "content": response_message
            }
        ]
    }

def default_handler(event):
    response_message = "I didn't understand that. Can you please rephrase?"

    return {
        "sessionState": {
            "dialogAction": {
                "type": "Close"
            },
            "intent": {
                "name": event['sessionState']['intent']['name'],
                "state": "Failed"
            }
        },
        "messages": [
            {
                "contentType": "PlainText",
                "content": response_message
            }
        ]
    }
